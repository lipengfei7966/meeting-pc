<template>
  <el-menu class="navbar" mode="horizontal">
    <div :style="{ width: !sidebar.opened ? '50px' : '192px' }" :class="['logo', { show: true }]" @click="$router.push('/')">
      <img src="@/assets/frame/img/logo.png" alt="" />
      <span v-show="sidebar.opened">会议系统</span>
    </div>
    <!-- 收缩 -->
    <!-- <div :class="['hamburger-container', {'is-active': !sidebar.opened}]" @click='toggleSideBar' :title='sidebar.opened ? "收缩" : "展开"'>
      <img src="@/assets/frame/img/hamburger.png" alt="">
    </div> -->
    <div class="business-module" :style="{ width: moduleWidth + 'px' }">
      <div :class="[menu.name === activeModule || menu.name === app.moduleName ? 'module active' : 'module']" v-for="menu in permissionMenus.slice(0, Math.floor(moduleWidth / 140))" :key="menu.name" @click="moduleClick(menu.name)"><svg-icon :icon-class="menu.meta.icon || ''"></svg-icon>{{ generateTitle(menu.meta.title) }}</div>
    </div>
    <div class="more-module" v-if="permissionMenus.length > Math.floor(moduleWidth / 140)">
      <el-dropdown placement="bottom">
        <div>
          <i class="el-icon-more"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided v-for="menu in permissionMenus.slice(Math.floor(moduleWidth / 140))" :key="menu.name">
            <span class="inlineBlock" @click="moduleClick(menu.name)">{{ generateTitle(menu.meta.title) }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="right-menu clearfix">
      <!-- 搜索 -->
      <div class="search">
        <!-- <el-input v-model="input" ref="search" class="input-search-style" :style="searchString" clearable @input="changeShowSearchContent" @keyup.enter.native="doSearch" @clear="doSearch" @focus="showSearchContent = true" @blur="showSearchContent = false"></el-input> -->
        <!-- 折叠框 -->
        <!-- <ol class="searchContent" v-if="showSearchContent">
          <li v-for="item in searchMenu" :key="item.name" v-show='!item.hidden'>
            <router-link v-if='!item.children' :to="{name:item.name}" :key="item.name">
              <span v-if="item.meta && item.meta.title" class='menu_decorate'>{{ generateTitle(item.meta.title) }}</span>
            </router-link>
          </li>
        </ol> -->

        <el-autocomplete class="input-search-style" :style="searchString" clearable v-model="input" :fetch-suggestions="querySearch" @input="changeShowSearchContent" @focus="showSearchContent = true" @blur="showSearchContent = false" :placeholder="$t('biz.placeholder.choose')" :trigger-on-focus="false" @select="handleSelect">
          <template slot-scope="{ item }">
            <div class="name">{{ generateTitle(item.meta.title) }}</div>
          </template>
        </el-autocomplete>
        <i class="el-icon-search" slot="append" @click="openSearch"></i>
      </div>
      <!-- 推送消息 -->
      <bs-ws v-if="clientWidth >= 1366"></bs-ws>

      <!-- 主题换色 -->
      <theme-picker class="right-menu-item" :title="$t('navbar.theme')" v-if="clientWidth >= 1366"></theme-picker>

      <!-- 全屏 -->
      <div class="screenfull" :title="$t('navbar.screenfull')" @click="handleClickFull" v-if="clientWidth >= 1366">
        <span class="right-menu-item" style="font-size: 16px">
          <svg-icon icon-class="fullscreen" style="margin-right: 0"></svg-icon>
        </span>
      </div>

      <!-- 锁屏 -->
      <div class="size" :title="$t('navbar.lock')" @click="onLock" v-if="clientWidth >= 1366">
        <span class="right-menu-item" style="font-size: 16px">
          <i class="el-icon-lock"></i>
        </span>
      </div>
      <!-- 更多 -->
      <div class="user">
        <!--@visible-change="userVisibleChange" -->
        <el-dropdown>
          <div class="user-title">
            <img src="@/assets/frame/img/user.png" />
            <span class="el-dropdown-link" :title="name">
              {{ name }}
            </span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item divided>
              <span @click="handleClickLan" class='inlineBlock'>{{$t('navbar.lang')}}</span>
            </el-dropdown-item> -->
            <el-dropdown-item divided>
              <span @click="handleChangePwd" class="inlineBlock">{{ $t('navbar.changePwd') }}</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span @click="logout" class="inlineBlock">{{ $t('navbar.logOut') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 国际化 -->
      <div class="translate" :title="$t('navbar.lang')" @click="handleClickLan" v-if="clientWidth >= 1366">
        <span class="right-menu-item" style="font-size: 16px">
          <svg-icon icon-class="translate" style="margin-right: 0"></svg-icon>
        </span>
      </div>
    </div>

    <!-- 修改密码 -->
    <el-dialog class="updatePW_dialog" :title="$t('login.updatePwd')" :visible.sync="isChangePwdDialogueShow" width="35%" :close-on-click-modal="false" :append-to-body="true" :show-close="isActive === false">
      <el-form :model="modifyPwdInfo" :rules="resetRules" ref="modifyPwdForm" label-position="left">
        <el-form-item :label="$t('sys.user.account')" prop="account" data-key="account">
          <el-input v-model="modifyPwdInfo.account" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('sys.user.oldPwd')" prop="oldPassword" data-key="oldPassword">
          <el-input type="password" v-model="modifyPwdInfo.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sys.user.newPwd')" prop="newPassword" data-key="newPassword">
          <el-input type="password" :minlength="8" :maxlength="20" :placeholder="$t('biz.placeholder.passwordSet')" v-model="modifyPwdInfo.newPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sys.user.newPwdConfirm')" prop="confirmPwd" data-key="confirmPwd">
          <el-input type="password" :minlength="8" :maxlength="20" :placeholder="$t('biz.placeholder.passwordSet')" v-model="modifyPwdInfo.confirmPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码强度">
          <div class="pwd_strong">
            <span class="level_one" :style="{ background: pwdStrongVal >= 1 ? 'red' : '#eeeeee' }"></span>
            <span class="level_two" :style="{ background: pwdStrongVal >= 2 ? 'orange' : '#eeeeee' }"></span>
            <span class="level_three" :style="{ background: pwdStrongVal === 4 ? '#00D1B2' : '#eeeeee' }"></span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" v-if="isActive === false" @click="isChangePwdDialogueShow = false">{{ $t('biz.btn.cancel') }}</el-button>
        <el-button size="mini" type="primary" @click="commitChangePwd">{{ $t('biz.btn.save') }}</el-button>
      </div>
    </el-dialog>

    <!-- 锁屏 -->
    <el-dialog width="30%" :title="$t('navbar.lock')" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :append-to-body="true" :show-close="false" :close-on-press-escape="false">
      <el-row type="flex" justify="center" style="padding: 10px 20px">
        <el-col :span="18">
          <el-input v-model="lockPwd" type="password" autoComplete="off" :placeholder="$t('biz.placeholder.passwordNotBlank')" @keyup.enter.native="handleLocked"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="handleLocked">{{ $t('biz.btn.unlock') }}</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import session from '@/utils/frame/base/sessionStorage'
import screenfull from 'screenfull'
import { md5Two, encriptPwd } from '@/utils/frame/base/encript.js'
import ThemePicker from '@/components/frame/ThemePicker'
import { BsWs } from '@/components/frame/bs/ws'
import { isExpired, getLoginUrl, getUpdatePasswordUrl } from '@/utils/frame/base/auth'
import request from '@/utils/frame/base/request'
import { notifyError, notifySuccess } from '@/utils/frame/base/notifyParams'
import storage from '@/utils/frame/base/localStorage'
import { getRandom, aesEncrypt } from '@/utils/frame/base/crypto'
import { generateTitle } from '@/utils/frame/base/i18n'
import imgSrc from '@/assets/frame/img/logo.png'
export default {
  data() {
    const validatenewPassword = (rule, value, callback) => {
      if (value.length < 6 || value.length > 20) {
        callback(new Error(this.$t('login.pwdValidateMsg')))
      } else if (this.modifyPwdInfo.confirmPwd !== '') {
        this.$refs.modifyPwdForm.validateField('confirmPwd')
        callback()
      } else {
        callback()
      }
    }
    const validateconfirmPassword = (rule, value, callback) => {
      if (value.length < 6 || value.length > 20) {
        callback(new Error(this.$t('login.pwdValidateMsg')))
      } else if (value !== this.modifyPwdInfo.newPassword) {
        callback(new Error(this.$t('sys.user.mismatchPwd')))
      } else {
        callback()
      }
    }
    return {
      input: '',
      logoSrc: imgSrc,
      dialogFormVisible: false,
      lockPwd: '',
      isChangePwdDialogueShow: false,
      isActive: false,
      isRunAs: true,
      activeModule: '',
      pwdStrongVal: 0,
      modifyPwdInfo: {
        account: '',
        oldPassword: '',
        newPassword: '',
        confirmPwd: ''
      },
      resetRules: {
        account: [
          {
            required: true,
            trigger: 'blur',
            message: this.$t('biz.placeholder.require')
          }
        ],
        oldPassword: [
          {
            required: true,
            trigger: 'blur',
            message: this.$t('biz.placeholder.require')
          }
        ],
        newPassword: [
          {
            required: true,
            validator: validatenewPassword,
            trigger: 'blur'
          }
        ],
        confirmPwd: [
          {
            required: true,
            validator: validateconfirmPassword,
            trigger: 'blur'
          }
        ]
      },
      searchActive: false,
      searchString: '',
      showSearchContent: false,
      searchMenu: []
    }
  },
  inject: ['app'],
  components: {
    BsWs,
    ThemePicker,
    ...mapGetters(['permissionMenus', 'sidebar'])
  },
  computed: {
    ...mapGetters(['sidebar', 'clientWidth', 'avatar', 'name', 'activeFlag', 'account', 'permissionMenus', 'showMenus']),
    moduleWidth() {
      return this.clientWidth - (this.sidebar.opened ? 640 : 480)
    }
  },
  watch: {
    'modifyPwdInfo.newPassword'(newValue) {
      this.pwdStrongVal = this.checkStrong(newValue)
    },
    searchActive: {
      handler(newValue) {
        // this.openSearch();
        if (this.searchActive) {
          this.searchString = 'animation:get .3s linear alternate forwards'
          var searchTime = setTimeout(() => {
            this.searchString = ''
            clearTimeout(searchTime)
          }, 300)
        } else {
          this.searchString = 'animation:get .3s linear reverse forwards'
          var searchTime = setTimeout(() => {
            this.searchString = 'display:none'
            clearTimeout(searchTime)
          }, 300)
        }
      },
      immediate: true
    }
  },
  created() {
    this.logo()
  },
  mounted() {
    window.onresize = function () {
      var leftMenu = document.getElementById('left-menu')
      // if (!$vm.checkFull()) {
      //   }
      window.addEventListener('keydown', () => {
        // this.flag = false;
        leftMenu.style = ''
      })
    }
    if (session.get('isLock') === 'yes') {
      this.dialogFormVisible = true
    }
    // 未激活
    if (this.activeFlag === '0') {
      this.handleChangePwd()
      this.isActive = true
    }
    this.getList()
  },
  methods: {
    getList() {
      this.searchMenu = this.showMenus
    },
    changeShowSearchContent() {
      if (this.input == '') {
        this.showSearchContent = false
      } else {
        this.showSearchContent = true
      }
      console.log(this.permissionMenus)
    },
    checkFull() {
      var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    },
    // 打开搜索
    openSearch() {
      this.searchActive = !this.searchActive
    },
    // 菜单查询
    doSearch() {
      //   // 防止多次连续搜索
      if (this.searchLoading) return
      this.searchLoading = true
      if (this.input.trim() === '') {
        this.showAll(this.searchMenu)
      } else {
        this.showSearch(this.searchMenu)
      }
      this.searchLoading = false
    },
    showAll(route) {
      route.forEach((item) => {
        item.hidden = false
      })
    },
    showSearch(route) {
      route.forEach((item) => {
        item.hidden = true
        if (
          item.meta &&
          this.$t('route.' + item.meta.title)
            .toLowerCase()
            .includes(this.input.toLowerCase().trim())
        ) {
          item.hidden = false
        }
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.searchMenu
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.meta &&
          this.$t('route.' + restaurant.meta.title)
            .toLowerCase()
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) >= 0
        )
      }
    },

    handleSelect(item) {
      console.log('handleSelect:' + item.name)
      this.$router.push({
        name: item.name
      })
    },
    logo() {
      request({
        url: '/api/img/logo',
        method: 'POST',
        data: {
          funcModule: '登陆',
          funcOperation: this.$t('biz.btn.search'),
          data: {
            showSite: 'logo'
          }
        }
      })
        .then((response) => {
          if (response.data && response.data.length > 0) {
            const element = response.data[0]
            if (process.env.PREVIEW_URL.indexOf('http') > -1) {
              this.logoSrc = process.env.PREVIEW_URL + element
            } else {
              this.logoSrc = window.document.location.protocol + '//' + window.document.location.host + '/preview/' + element
            }
          }
        })
        .catch(() => {})
    },
    generateTitle,
    moduleClick(moduleName) {
      this.activeModule = moduleName
      this.$emit('selectModule', moduleName)
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    onLock() {
      this.$confirm(this.$t('biz.msg.confirmLock'), this.$t('biz.msg.tip'), {
        type: 'warning',
        closeOnClickModal: false,
        confirmButtonText: this.$t('biz.btn.confirm'),
        cancelButtonText: this.$t('biz.btn.cancel')
      })
        .then(() => {
          this.dialogFormVisible = true
          session.set('isLock', 'yes')
        })
        .catch(() => {})
    },
    handleLocked() {
      if (md5Two(this.lockPwd) === session.get('userPwd')) {
        this.$message({
          message: '解锁成功',
          type: 'success'
        })
        this.dialogFormVisible = false
        session.set('isLock', 'no')
        this.lockPwd = ''
      } else {
        this.$message({
          message: '密码有误',
          type: 'warning'
        })
      }
    },
    // 全屏
    handleClickFull() {
      var leftMenu = document.getElementById('left-menu')
      leftMenu.style = ''
      if (!screenfull.enabled) {
        this.$message({
          message: '浏览器不支持',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
      leftMenu.style = 'width:0px !important'
    },
    // 登出
    logout() {
      const loginUrl = getLoginUrl()
      if (isExpired()) {
        // 本地退出
        this.$store.dispatch('FedLogOut').then(() => {
          // 跳转
          this.$router.push(loginUrl)
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      } else {
        this.$store
          .dispatch('LogOut')
          .then(() => {
            // 跳转
            this.$router.push(loginUrl)

            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
          .catch(() => {
            // 本地退出
            this.$store.dispatch('FedLogOut').then(() => {
              // 跳转
              this.$router.push(loginUrl)

              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
      }
    },
    // 语言切换
    handleClickLan() {
      let lang = storage.get('language')
      if (!lang) lang = 'zh'
      if (lang === 'zh') {
        this.$i18n.locale = 'en'
        storage.set('language', 'en')
        this.$store.dispatch('setLanguage', 'en')
        this.$message({
          message: 'switch language success',
          type: 'success'
        })
      } else if (lang === 'en') {
        this.$i18n.locale = 'zh'
        storage.set('language', 'zh')
        this.$store.dispatch('setLanguage', 'zh')
        this.$message({
          message: '语言切换成功',
          type: 'success'
        })
      }
    },
    handleChangePwd() {
      this.isChangePwdDialogueShow = true
      this.isActive = false
      this.$nextTick(() => {
        $('.updatePW_dialog .is-required .el-form-item__content').attr('data-content', this.$t('biz.placeholder.require'))
        this.$refs.modifyPwdForm.resetFields()
        this.$refs.modifyPwdForm.clearValidate()
        this.modifyPwdInfo.account = this.account
      })
    },
    commitChangePwd() {
      this.$refs.modifyPwdForm.validate((valid) => {
        if (valid) {
          // 加密的处理
          const random = getRandom(8)
          const newPasswordO = aesEncrypt(this.modifyPwdInfo.newPassword, random)
          request({
            url: getUpdatePasswordUrl(),
            method: 'post',
            data: {
              funcModule: '用户密码',
              funcOperation: this.$t('biz.btn.update'),
              data: {
                account: this.modifyPwdInfo.account,
                oldPassword: encriptPwd(this.modifyPwdInfo.oldPassword),
                newPassword: encriptPwd(this.modifyPwdInfo.newPassword),
                random: random,
                newPasswordO: newPasswordO
              }
            }
          })
            .then((response) => {
              if (response.msgId != null) {
                this.$notify(
                  notifyError({
                    msg: response.msgText
                  })
                )
              } else {
                this.isActive = false
                this.isChangePwdDialogueShow = false
                this.$notify(
                  notifySuccess({
                    msg: this.$t('biz.msg.updateSuccess')
                  })
                )
              }
            })
            .catch(() => {
              this.$notify(
                notifyError({
                  msg: this.$t('biz.msg.saveFailed')
                })
              )
            })
        } else {
          return false
        }
      })
    },
    // 密码强度
    checkStrong(sValue) {
      let modes = 0

      if (sValue.length < 1) return modes
      if (/\d/.test(sValue)) modes++
      if (/[a-z]/.test(sValue)) modes++
      if (/[A-Z]/.test(sValue)) modes++
      if (/\W/.test(sValue)) modes++

      switch (modes) {
        case 1:
          return 1
          break
        case 2:
          return 2
          break
        case 3:
        case 4:
          return sValue.length < 10 ? 3 : 4
          break
      }
      return modes
    },
    handelDelegate() {
      this.$router.push({
        name: 'delegate',
        params: {
          readFlag: '0'
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 48px;
  line-height: 48px;
  border-radius: 0px !important;
  width: 100%;
  display: flex;
  .logo {
    float: left;
    width: 40px;
    height: 100%;
    text-align: center;
    display: inline-block;
    // padding-right: 22px;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    span {
      display: inline-block;
      vertical-align: top;
      margin: 6px 0 0 10px;
      color: rgb(223, 230, 240);
      font: 26px 'Arial';
    }
  }
  .show {
    width: 200px;
  }
  .hamburger-container {
    float: left;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: transparent;
    cursor: pointer;
    transform: rotate(0);
    transition: transform 0.38s;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    img {
      width: 12px;
      height: 11px;
    }
  }
  .is-active {
    transform: rotate(90deg);
    background: transparent;
  }
  .business-module {
    float: left;
    height: 48px;
    flex: 1;
    line-height: 48px;
    overflow: hidden;
    .module {
      // font-size: 14px;
      .svg-icon {
        width: 16px;
        height: 16px;
      }
      float: left;
      width: 140px;
      height: 100%;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      user-select: none;
    }
  }
  .more-module {
    position: relative;
    float: left;
    height: 48px;
    margin-left: 20px;
    text-align: center;
    cursor: pointer;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .el-icon-more {
      display: inline-block;
      vertical-align: top;
      width: 48px;
      height: 48px;
      font-size: 18px;
      &::before {
        position: absolute;
        top: 50%;
        right: 50%;
        margin: -9px -9px 0 0;
      }
    }
  }
  .right-menu {
    margin-right: 20px;
    font-size: 18px;
    color: #ffffff;
    user-select: none;
    // min-width: 502px !important;
    max-width: 40% !important;
    .right-menu-item {
      float: left;
      width: 48px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      background: transparent;
      cursor: pointer;
      color: #fff;
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
    .message {
      position: relative;
      .msg-num-icon {
        position: absolute;
        right: 10px;
        top: 10px;
        background-color: #ec3333;
        width: 12px;
        height: 12px;
        line-height: 12px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        border-radius: 50%;
      }
    }
    .size {
      float: left;
      height: 48px;
      line-height: 48px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      .right-menu-item {
        width: 32px;
      }
    }
    .screenfull {
      float: left;
      height: 48px;
      line-height: 48px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      .svg-icon {
        width: 15px;
        height: 15px;
      }
    }
    .user {
      float: left;
      height: 48px;
      line-height: 48px;
      margin-left: 5px;
      margin-right: 20px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      .user-title {
        height: 48px;
        img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          vertical-align: top;
          margin: 13px 6px 0 7px;
        }
        .el-dropdown-link {
          display: inline-block;
          max-width: 100px;
          height: 48px;
          line-height: 48px !important;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #fff !important;
          font: 14px '微软雅黑';
        }
        .inlineBlock {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .translate {
      float: left;
      height: 48px;
      line-height: 48px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      .svg-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
}
.searchContent {
  width: 160px;
  height: 160px;
  position: absolute;
  bottom: -160px;
  right: 0;
  background: #fff;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 2px 10px #ccc;
  color: #777;
  font-size: 12px;
  overflow-y: auto;
  overflow-x: hidden;
  & > li {
    padding: 0 6px;
  }
}
/*滚动条样式*/
.searchContent::-webkit-scrollbar {
  width: 4px;
  /*height: 4px;*/
}
.searchContent::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.searchContent::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>

<style lang='scss'>
.search {
  float: left;
  position: relative;
  width: 192px;
  height: 100%;
  display: inline-block;
  text-align: center;
  .el-autocomplete {
    width: auto !important;
  }
  .el-input {
    width: 160px;
    background: transparent;
  }

  .el-icon-search {
    cursor: pointer;
    margin-right: 12px;
    float: right;
    margin-top: 15px;
  }
  @keyframes get {
    from {
      width: 0px;
      opacity: 0;
    }

    to {
      width: 160px;
      opacity: 1;
    }
  }
  .input-search-style {
    float: right;
    // position: absolute;
    // right: 0;
    // top: 0;
    height: 30px;
    padding-top: 0 !important;
    .el-input__inner {
      height: 30px;
      border: 1px solid #fff;
      border-radius: 0;
      font-size: 14px;
      color: #fff;
      border-radius: 3px 0 0 3px;
      background: transparent;
      padding: 0 6px;
    }
    .el-input__inner:focus {
      border: 1px solid #fff !important;
    }
    .el-input__icon {
      line-height: 34px;
    }
    .el-input-group__append {
      height: 30px;
      padding: 0 10px;
      border: 1px solid;
      border-left: none;
      border-radius: 0 3px 3px 0;
      background: transparent;
    }
  }
}

.el-dropdown-menu {
  margin: 0 !important;
  padding: 0 !important;
}
.el-dropdown-menu__item {
  margin: 0 !important;
  &::before {
    height: 0 !important;
  }
  &:first-of-type {
    border: none !important;
  }
}
.el-icon-message:hover {
  color: #fff !important;
}
.el-icon-bell:hover {
  color: #fff !important;
}
.el-menu--horizontal {
  border-bottom: none !important;
}

.updatePW_dialog {
  .pwd_strong {
    text-align: center;
    span {
      display: inline-block;
      width: 85px;
      height: 10px;
      background: #eee;
      line-height: 20px;
    }
    .level_one {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-right: 0px solid;
      margin-right: 3px;
    }

    .level_two {
      border-left: 0px solid;
      border-right: 0px solid;
      margin-right: 3px;
    }

    .level_three {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      border-left: 0px solid;
    }
  }
}
</style>

