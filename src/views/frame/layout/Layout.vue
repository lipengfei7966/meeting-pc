<template>
  <div class="app-wrapper" :class="classObj">
    <div class="app-header">
      <navbar @selectModule='moduleChange'></navbar>
    </div>
    <div class="main-wrapper">
      <!-- 搜索 -->
      <!-- <div class='search' v-if='!isCollapse'>
        <el-input v-model="input" class='input-search-style' clearable @keyup.enter.native="doSearch" @clear="doSearch">
          <i class='el-icon-search' slot='append' @click='doSearch'></i>
        </el-input>
      </div> -->
      <div id="left-menu" class="left-menu" ref="leftMenu">
        <sidebar class="sidebar-container"></sidebar>
        <!-- 收缩左侧菜单栏 -->
        <div :class="['hamburger-container', {'is-active': !sidebar.opened}]" @click='toggleSideBar' :title='sidebar.opened ? "收缩" : "展开"'>
          <img src="@/assets/frame/img/shrink.png" alt="">
        </div>
      </div>
      <div class="main-container">
        <div class="tags-view" :style="{'left': isCollapse ? '50px' : '192px', 'display': isScreenFull ? 'none' : 'block'}">
          <tags-view ref='tagsView'></tags-view>
        </div>
        <div id="app-main" :style="{height: contentHeight}">
          <app-main></app-main>
        </div>
      </div>
    </div>

    <!-- 若token失效则在当前页面弹出登录框 -->
    <div class='bs-new-container dialog-wrapper relogin-dialog' id='relogin-dialog' v-show='loginVisible'>
      <div class='dialog-container' type='miniColumnsDialog'>
        <!-- 头部 -->
        <title-contain :titleName="$t('login.login')" :isShowClose='false' />
        <el-form class="header-form-inline" :show-message="false" label-position="left" :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="username" :label="$t('login.username')">
            <el-input name="username" :disabled="true" type="text" v-model="loginForm.username" :placeholder="$t('login.username')" />
          </el-form-item>

          <el-form-item prop="password" :label="$t('login.password')" data-key='password'>
            <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off" :placeholder="$t('login.password')" />
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-form-item prop="captcha" :label="$t('login.captcha')" data-key='captcha'>
                <el-input type="text" v-model="loginForm.captcha" @keyup.enter.native="handleLogin" auto-complete="off" :placeholder="$t('login.captcha')" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-image style="height:30px;vertical-align:top;" :src="loginForm.src">
                  <div slot="placeholder" class="image-slot">
                    {{$t('biz.route.load')}}<span class="dot">...</span>
                  </div>
                </el-image>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <i class='el-icon-refresh pointer' style='font-size:16px;margin-top:5px;' @click="loadCaptcha"></i>
            </el-col>
          </el-row>
        </el-form>

        <div class="dialog-footer">
          <el-button class='login-btn' v-db-click type="primary" :loading="loading" @click.native.prevent="handleLogin">
            {{$t('login.login')}}
          </el-button>
        </div>

      </div>
      <div class="mask"></div>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import { encriptPwd, md5Two } from '@/utils/frame/base/encript.js'
import session from '@/utils/frame/base/sessionStorage'
import storage from '@/utils/frame/base/localStorage'
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import request from '@/utils/frame/base/request'

export default {
  name: 'layout',
  data() {
    return {
      isActive: true,
      dictData: [],
      input: '',
      // Token失效登录页展示
      loginVisible: false,
      loading: false,
      isScreenFull: false,
      loginForm: {
        username: session.get('username'),
        password: '',
        captcha: '',
        src: '',
        captchaToken: ''
      },
      loginRules: {
        password: [{ required: true, trigger: 'blur' }],
        captcha: [{ required: true, trigger: 'blur' }]
      },
      moduleName: ''
    }
  },
  provide() {
    return {
      app: this
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    ...mapGetters(['permissionMenus', 'sidebar', 'clientWidth', 'clientHeight']),
    contentHeight() {
      return this.isScreenFull ? this.clientHeight + 'px' : this.clientHeight - 76 + 'px'
    },
    classObj() {
      return [
        {
          'hide-sidebar': !this.sidebar.opened
        },
        {
          'app-screen-full': this.isScreenFull
        }
      ]
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    if (this.permissionMenus[0]) {
      this.moduleName = this.permissionMenus[0].name
      this.getFirstParentName(this.permissionMenus)
      console.log(this.permissionMenus)
    }
    // 全屏显示监控
    if (screenfull.enabled) {
      screenfull.on('change', this.screenChange)
    }
    this.$store.dispatch('setModuleNames', this.moduleName)
  },
  methods: {
    loadCaptcha() {
      request({
        url: '/captcha',
        method: 'POST',
        data: {}
      })
        .then(response => {
          if (response.data) {
            this.loginForm.captchaToken = response.data.token
            this.loginForm.src = 'data:image/jpeg;base64,' + response.data.img
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    moduleChange(moduleName) {
      this.moduleName = moduleName
      this.$store.dispatch('setModuleNames', this.moduleName)
    },
    getFirstParentName(list) {
      list.forEach(l => {
        if (l.name !== this.$route.name) {
          if (l.children) this.getFirstParentName(l.children)
        } else {
          this.moduleName = l.meta.firstParent
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    // 关闭通用事件
    close() {
      this.loginVisible = false
    },
    // 弹窗登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const userInfo = {
            username: session.get('username'),
            password: encriptPwd(this.loginForm.password),
            captcha: this.loginForm.captcha,
            captchaToken: this.loginForm.captchaToken
          }

          const loginType = session.get('loginType')

          if (loginType === 'plat') {
            this.$store
              .dispatch('PlatLogin', userInfo)
              .then(() => {
                this.loading = false
                session.set('userPwd', md5Two(this.loginForm.password))
                $('#relogin-dialog').hide()
                this.loginForm.password = ''
                this.loginForm.captcha = ''
              })
              .catch(() => {
                this.loading = false
              })
          } else if (loginType === 'group') {
            this.$store
              .dispatch('GroupLogin', userInfo)
              .then(() => {
                this.loading = false
                session.set('userPwd', md5Two(this.loginForm.password))
                $('#relogin-dialog').hide()
                this.loginForm.password = ''
                this.loginForm.captcha = ''
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            userInfo.tenantHashCode = session.get('tenantHashCode')
            userInfo.enterpriseName = storage.get('opt_enterprise')
            this.$store
              .dispatch('UserLogin', userInfo)
              .then(() => {
                this.loading = false
                session.set('userPwd', md5Two(this.loginForm.password))
                $('#relogin-dialog').hide()
                this.loginForm.password = ''
                this.loginForm.captcha = ''
              })
              .catch(() => {
                this.loading = false
              })
          }
        } else {
          return false
        }
      })
    },
    // 全屏事件监听
    screenChange() {
      this.isScreenFull = screenfull.isFullscreen
      if (!this.isScreenFull) {
        $('#app-main').css('margin-top', '26px')
        this.$refs.tagsView.visible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/frame/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  // height: 100%;
  .app-header {
    position: fixed;
    top: 0;
    width: 100%;
    line-height: 48px;
    z-index: 1001;
  }
  .is-active {
    transform: rotate(180deg);
  }
  .main-wrapper {
    padding-top: 48px;
    .main-container {
      height: 100% !important;
      max-height: 100% !important;
      margin-left: 192px;
      .tags-view {
        position: fixed;
        top: 48px;
        left: 200px;
        right: 0;
        z-index: 999;
      }
      .tags-view-wrapper {
        position: fixed;
        top: 30%;
      }
      .hamburger-container {
        line-height: 57px;
        float: left;
        padding: 0 10px;
      }
      .navbar {
        width: 100%;
        border-radius: 0px !important;
      }
      #app-main {
        position: relative;
        width: 100%;
        margin-top: 36px;
      }
    }
  }
}
</style>

<style lang="scss">
.app-wrapper.app-screen-full {
  .app-header {
    display: none;
  }
  .main-wrapper {
    padding-top: 0;
    .search {
      display: none;
    }
    .sidebar-container {
      display: none;
    }
    .main-container {
      margin-left: 0 !important;
      .tags-view {
        left: 0 !important;
        top: 0;
        &:hover {
          display: block !important;
          & + #app-main {
            margin-top: 26px !important;
          }
          .contextmenu {
            top: 26px !important;
          }
        }
      }
      #app-main {
        margin-top: 0;
      }
    }
  }
}
</style>

<style lang='scss'>
.main-wrapper {
  position: relative;
  // height: 100%;/
  .left-menu {
    float: left;
    width: 50px;
    height: 100px !important;
  }
  .hamburger-container {
    position: absolute;
    left: 0;
    bottom: 0px;
    width: 48px;
    height: 48px;
    line-height: 57px;
    text-align: center;
    background: transparent;
    cursor: pointer;
    // transform: rotate(0);
    // transition: transform 0.38s;
    // &:hover {
    //   background: rgba(255, 255, 255, 0.2);
    // }
    img {
      width: 16px;
      height: 16px;
    }
  }
}

.el-scrollbar__view {
  li:hover {
    background: #ecf5ff !important;
    color: #60aeff !important;
  }
}
</style>
