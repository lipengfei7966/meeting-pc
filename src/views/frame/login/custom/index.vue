<template>
  <div class="login-container">
    <div>
      <div class='login-form-wrap' style='top: 16px;'>
        <div class="loginPart">
          <img class="logo" src="@/assets/image/loginBg3.png" alt="" srcset="">
        </div>
        <div class='login-form'>
          <el-form :model="loginForm" :rules="loginRules" class="form" ref="loginForm" label-position="left">
            <div class="title">
              {{ $t('login.customTitle') }}
            </div>
            <el-form-item prop="customCode" data-key="customCode">
              <el-input name="customCode" type="text" v-model="loginForm.customCode" :placeholder="$t('login.customCode')" />
            </el-form-item>
            <el-form-item prop="username" data-key="username">
              <el-input name="username" type="text" v-model="loginForm.username" :placeholder="$t('login.username')" />
            </el-form-item>

            <el-form-item prop="password" data-key="password">
              <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="off" :placeholder="$t('login.password')" />
            </el-form-item>

            <el-row :gutter="10">
              <el-col :span="14">
                <el-form-item prop="captcha">
                  <el-input type="text" v-model="loginForm.captcha" :maxlength="4" auto-complete="off" :placeholder="$t('login.captcha')" style="width: 100%" @keyup.enter.native="handleLogin"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-image style="height: 30px; vertical-align: top" :src="loginForm.src">
                    <div slot="placeholder" class="image-slot">{{ $t('biz.route.load') }}<span class="dot">...</span></div>
                  </el-image>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <i class="el-icon-refresh pointer" style="font-size: 16px; margin-top: 5px" alt="如果看不清楚，请单击刷新！" @click="loadCaptcha"></i>
              </el-col>
            </el-row>

            <el-button class="login-btn" type="primary" :loading="loading" @click.native.prevent="handleLogin">
              {{ $t('login.login') }}
            </el-button>
          </el-form>
        </div>
      </div>
      <div class="login-tip"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { encriptPwd, md5Two } from '@/utils/frame/base/encript.js'
import session from '@/utils/frame/base/sessionStorage'
import storage from '@/utils/frame/base/localStorage'

// axios访问
import request from '@/utils/frame/base/request'
export default {
  components: {},
  name: 'customlogin',
  data() {
    return {
      loginForm: {
        src: '',
        username: 'bobo',
        password: 'bobo123456',
        customCode: '7019',
        captcha: '',
        captchaToken: '',
        customHashCode: '7019'
      },
      loginRules: {
        customCode: [{ required: true, trigger: 'blur', message: this.$t('biz.placeholder.require') }],
        username: [{ required: true, trigger: 'blur', message: this.$t('biz.placeholder.require') }],
        captcha: [{ required: true, trigger: 'blur', message: this.$t('biz.placeholder.require') }],
        password: [
          { required: true, trigger: 'blur', message: this.$t('biz.placeholder.require') },
          { min: 6, max: 20, message: this.$t('login.pwdValidateMsg'), trigger: 'blur' }
        ]
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
    this.loginForm.username = storage.get('custom_user')
    this.loginForm.customCode = storage.get('custom_code')
    if (process.env.NODE_ENV === 'development') {
      if (!this.loginForm.username) {
        this.loginForm.username = 'bobo'
      }
      if (!this.loginForm.customCode) {
        this.loginForm.customCode = process.env.DEFAULT_CUSTOM
      }
    }
    this.loginForm.password = ''
    // end
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
            customCode: this.loginForm.customCode,
            username: this.loginForm.username,
            password: encriptPwd(this.loginForm.password),
            captcha: this.loginForm.captcha,
            captchaToken: this.loginForm.captchaToken
          }
          this.$store
            .dispatch('CustomLogin', userInfo)
            .then(() => {
              this.loading = false
              session.set('userPwd', md5Two(this.loginForm.password))
              session.set('loginType', 'custom')
              session.set('username', this.loginForm.username)

              storage.set('custom_user', this.loginForm.username)
              storage.set('custom_code', this.loginForm.customCode)
              this.$router.push({ path: '/' }).catch(() => {})
            })
            .catch(() => {
              this.loadCaptcha()
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  width: 100%;
  height: 100%;
  margin: 0px auto 0;
  background: url(/static/img/loginBg1.7df4d37.png) no-repeat;
  background-size: 100%;
  overflow: auto;
  // // min-height: 100%;
  // width: 1440px;
  // height: 810px;
  // margin: 90px auto 0;
  // // background-color: $bg;
  // background: url('~@/assets/image/loginBg1.png') no-repeat;
  // background-size: 100%;
  // overflow: hidden;

  .login-form-wrap {
    width: 1038px;
    height: 570px;
    margin-top: 74px;
    margin: 74px auto 0;
    display: flex;
  }

  .loginPart {
    width: 373px;
    height: 570px;
    background: url('~@/assets/image/loginBg2.png');
    .logo {
      margin: 37px 122px;
    }
  }

  .login-form {
    // float: right;
    // margin: 50px auto 0;
    width: 665px;
    height: 570px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    // padding: 19px 27px;
    // box-shadow: 0 0 20px rgb(0 0 0 / 60%);
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);

    .form {
      width: 393px;
      margin: 72px auto 0;
    }
    .el-form-item {
      height: 40px;
      .el-input {
        height: 40px;
      }
    }

    .login-btn {
      width: 100%;
      height: 40px;
      border-radius: 3px;
      padding: 9px 43px !important;
      margin-top: 70px;
      // background: #f39900 !important;
      border: none !important;
      color: #fff !important;
      font-size: 14px;
      &:hover {
        // background: #ffa100 !important;
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-size: 26px;
    // color: $light_gray;
    margin: 0px auto 40px auto;
    // text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
