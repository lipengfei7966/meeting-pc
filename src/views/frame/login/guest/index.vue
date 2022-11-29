<template>
  <div class="login-container" :style="{'background-image': `url(${require('@/assets/frame/img/10293.png')})`}">

    <div :class="['login-content', clientWidth < 1920 ? 'login-content-small' : 'login-content-big']">

      <div class='login-form-wrap'>
        <div class='login-form'>
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <div class="title">
              {{$t('login.guestTitle')}}
            </div>
            <el-form-item prop="eventHashCode" data-key='eventHashCode'>
              <el-input name="eventHashCode" type="text" v-model="loginForm.eventHashCode" :placeholder="$t('login.eventHashCode')" />
            </el-form-item>
            <el-form-item prop="username" data-key='username'>
              <el-input name="username" type="text" v-model="loginForm.username" :placeholder="$t('login.username')" />
            </el-form-item>

            <el-form-item prop="password" data-key='password'>
              <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off" :placeholder="$t('login.password')" />
            </el-form-item>

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

// axios访问
import request from '@/utils/frame/base/request'
export default {
  components: {},
  name: 'guestlogin',
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
        username: '13466353118',
        eventHashCode: 'd74ef61897b39fbee433473dc0843d41',
        password: '888888',
        captcha: '',
        captchaToken: ''
      },
      loginRules: {
        eventHashCode: [{ required: true, trigger: 'blur', message: this.$t('biz.placeholder.require') }],
        username: [{ required: true, trigger: 'blur', message: this.$t('biz.placeholder.require') }],
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
    //this.loadCaptcha()
  },
  mounted() {
    session.remove('userPwd')
    // 校验规则提示添加
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
            eventHashCode: this.loginForm.eventHashCode,
            password: encriptPwd(this.loginForm.password),
            captcha: this.loginForm.captcha,
            captchaToken: this.loginForm.captchaToken
          }
          this.$store
            .dispatch('GuestLogin', userInfo)
            .then(() => {
              this.loading = false
              session.set('userPwd', md5Two(this.loginForm.password))
              session.set('loginType', 'group')
              session.set('username', this.loginForm.username)

              this.$router.push({ path: '/' }).catch(() => {})
            })
            .catch(() => {
              this.loading = false
              //this.loadCaptcha()
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
