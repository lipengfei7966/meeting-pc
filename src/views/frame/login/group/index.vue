<template>
  <div class="login-container" :style="{'background-image': `url(${require('@/assets/frame/img/10293.png')})`}">
    <!-- <div class="login-logo">
      <img :src="loginLogo" class="logo" />
    </div> -->
    <div :class="['login-content', clientWidth < 1920 ? 'login-content-small' : 'login-content-big']">
      <!-- <div class='login-bg-wrap'>
        <el-carousel trigger="click">
          <el-carousel-item v-for="(i, index) in dataImg" :key="index">
            <img class='login-bg-img' :src='i.img' alt="" :style="{'width': swiperWidth + 'px'}">
          </el-carousel-item>
        </el-carousel>
      </div> -->
      <div class='login-form-wrap'>
        <div class='login-form'>
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <div class="title">
              {{$t('login.groupTitle')}}
            </div>
            <el-form-item prop="username" data-key='username'>
              <el-input name="username" type="text" v-model="loginForm.username" :placeholder="$t('login.username')" />
            </el-form-item>

            <el-form-item prop="password" data-key='password'>
              <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off" :placeholder="$t('login.password')" />
            </el-form-item>

            <el-row :gutter="10">
              <el-col :span="14">
                <el-form-item prop="captcha">
                  <el-input type="text" v-model="loginForm.captcha" :maxlength='4' auto-complete="off" :placeholder="$t('login.captcha')" style="width: 100%;" @keyup.enter.native="handleLogin"></el-input>
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
                <i class='el-icon-refresh pointer' style='font-size:16px;margin-top:5px;' alt="???????????????????????????????????????" @click="loadCaptcha"></i>
              </el-col>
            </el-row>

            <el-button class='login-btn' v-db-click type="primary" :loading="loading" @click.native.prevent="handleLogin">
              {{$t('login.login')}}
            </el-button>
          </el-form>
        </div>
      </div>
      <div class='login-tip'></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { encriptPwd, md5Two } from '@/utils/frame/base/encript.js'
import session from '@/utils/frame/base/sessionStorage'
import loginLogo from '@/assets/frame/img/login_logo.png'

// axios??????
import request from '@/utils/frame/base/request'
export default {
  components: {},
  name: 'grouplogin',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6 || value.length > 20) {
        callback(new Error(this.$t('login.pwdValidateMsg')))
      } else {
        callback()
      }
    }
    return {
      loginLogo: loginLogo,
      loginForm: {
        src: '',
        username: '',
        password: '',
        captcha: '',
        captchaToken: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: this.$t('biz.placeholder.require') }],
        captcha: [{ required: true, trigger: 'blur', message: this.$t('biz.placeholder.require') }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      slidersSmall: [],
      slidersBig: []
    }
  },
  computed: {
    ...mapGetters(['clientWidth']),
    swiperWidth() {
      return this.clientWidth < 1920 ? 1366 : 1920
    },
    dataImg() {
      return this.clientWidth < 1920 ? this.slidersSmall : this.slidersBig
    }
  },
  created() {
    this.loadCaptcha()
  },
  mounted() {
    session.remove('userPwd')
    // ????????????????????????
    $('.login-container .is-required .el-form-item__content').attr('data-content', this.$t('biz.placeholder.require'))
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const userInfo = {
            username: this.loginForm.username,
            password: encriptPwd(this.loginForm.password),
            captcha: this.loginForm.captcha,
            captchaToken: this.loginForm.captchaToken
          }
          this.$store
            .dispatch('GroupLogin', userInfo)
            .then(() => {
              this.loading = false
              session.set('userPwd', md5Two(this.loginForm.password))
              session.set('loginType', 'group')
              session.set('username', this.loginForm.username)

              this.$router.push({ path: '/' }).catch(() => {})
            })
            .catch(() => {
              this.loading = false
              this.loadCaptcha()
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
