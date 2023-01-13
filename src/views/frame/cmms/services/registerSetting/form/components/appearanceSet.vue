<template>
  <div class="container">
    <el-form ref="appearanceSetForm" :validate-on-rule-change="false" @submit.native.prevent label-position="right" label-width="250px" :model="appearanceSetForm" class="appearanceSetForm">
      <!-- 通用设置 -->
      <div class="appearanceSetItem">
        <div class="setItemTitle">
          <h3>{{$t('appearance.generalSettings')}}</h3>
          <span>
            <span style="margin-right: 20px">{{ isCommonSetShow ? $t('appearance.fewer') : $t('appearance.expand') }}</span>
            <el-button type="text" @click="isCommonSetShow = !isCommonSetShow" style="vertical-align: middle; padding: 0">
              <i v-if="isCommonSetShow" class="el-icon-caret-top" style="font-size: 30px"></i>
              <i v-else class="el-icon-caret-bottom" style="font-size: 30px"></i>
            </el-button>
          </span>
        </div>
        <el-divider></el-divider>
        <div v-show="isCommonSetShow">
          <el-form-item :label="$t('appearance.registrationTitle')" prop="titleChinese">
            <el-input v-model="appearanceSetForm.titleChinese" style="width: 50%" size="mini" :placeholder="$t('appearance.registrationTitle')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('appearance.registrationTitleEnglish')" prop="titleEnglish">
            <el-input v-model="appearanceSetForm.titleEnglish" style="width: 50%" size="mini" :placeholder="$t('appearance.registrationTitleEnglish')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('appearance.languageSettings')" prop="language">
            <el-checkbox-group v-model="appearanceSetForm.language" style="width: 50%" size="mini">
              <el-checkbox :label="$t('appearance.chinese')" name="中文"></el-checkbox>
              <el-checkbox :label="$t('appearance.english')" name="英文"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item :label="$t('appearance.mainColor')" prop="color">
            <el-color-picker v-model="appearanceSetForm.color" style="width: 50%" size="mini"></el-color-picker>
          </el-form-item>
        </div>
      </div>
      <!-- 会议宣传 -->
      <div class="appearanceSetItem">
        <div class="setItemTitle">
          <h3>{{$t('appearance.conferencePublicity')}}</h3>
          <span>
            <span style="margin-right: 20px">{{ isPublicitySetShow ? $t('appearance.fewer') : $t('appearance.expand') }}</span>
            <el-button type="text" @click="isPublicitySetShow = !isPublicitySetShow" style="vertical-align: middle; padding: 0">
              <i v-if="isPublicitySetShow" class="el-icon-caret-top" style="font-size: 30px"></i>
              <i v-else class="el-icon-caret-bottom" style="font-size: 30px"></i>
            </el-button>
          </span>
        </div>
        <el-divider></el-divider>
        <div v-show="isPublicitySetShow">
          <el-form-item :label="$t('appearance.isPublicity')" prop="isPropaganda">
            <el-switch v-model="appearanceSetForm.isPropaganda" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>

          <el-form-item label="Banner(pc)" prop="meetingFile">
            <el-upload class="upload-demo" :action="uploadUrl" drag list-type="picture-card" :limit="1" :on-success="meetingUploadFile" :file-list="meetingImageList" :headers="httpHeaders" :on-remove="meetingHandleRemove" :on-exceed="fileLimitCount" :before-upload="beforeAvatarUpload" :on-preview="mweetngHandlePreview">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="meetingdialogVisible">
              <img width="100%" :src="mettingdialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item :label="$t('appearance.mobileClientBanner')" prop="appFile">
            <el-upload class="upload-demo" :action="uploadUrl" drag list-type="picture-card" :limit="1" :on-success="AppUploadFile" :file-list="AppImageList" :headers="httpHeaders" :on-remove="AppHandleRemove" :on-exceed="fileLimitCount" :before-upload="beforeAvatarUpload" :on-preview="AppHandlePreview">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="AppdialogVisible">
              <img width="100%" :src="AppdialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          · <el-form-item :label="$t('appearance.isMeetingTime')" prop="isMeetingDate" v-if="appearanceSetForm.isPropaganda == '1'">
            <el-switch v-model="appearanceSetForm.isMeetingDate" active-color="#13ce66" inactive-co lor="#ff4949" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('appearance.isMeetingLocation')" prop="isMeetinPlace" v-if="appearanceSetForm.isPropaganda == '1'">
            <el-switch v-model="appearanceSetForm.isMeetinPlace" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('appearance.isCountdown')" prop="isMeetinCountdown" v-if="appearanceSetForm.isPropaganda == '1'">
            <el-switch v-model="appearanceSetForm.isMeetinCountdown" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('appearance.conferenceIntroduction')" prop="profile" v-show="appearanceSetForm.isPropaganda == '1'">
            <bs-editor></bs-editor>
            <!-- <iframe name="myframe" ref="bsEditorFrame" src="static/qmeditor/index.html" style="width: 100%; height: 30rem; border-width: 1px"></iframe> -->
          </el-form-item>
        </div>
      </div>
      <!-- 注册登录 -->
      <div class="appearanceSetItem">
        <div class="setItemTitle">
          <h3>{{$t('appearance.registerLogin')}}</h3>
          <span>
            <span style="margin-right: 20px">{{ isRegisterSetShow ? $t('appearance.fewer') : $t('appearance.expand') }}</span>
            <el-button type="text" @click="isRegisterSetShow = !isRegisterSetShow" style="vertical-align: middle; padding: 0">
              <i v-if="isRegisterSetShow" class="el-icon-caret-top" style="font-size: 30px"></i>
              <i v-else class="el-icon-caret-bottom" style="font-size: 30px"></i>
            </el-button>
          </span>
        </div>
        <el-divider></el-divider>
        <div v-show="isRegisterSetShow">
          <el-form-item label="Banner(pc)" prop="loginPcFile">
            <el-upload class="upload-demo" :action="uploadUrl" drag list-type="picture-card" :limit="1" :on-success="resPcUploadFile" :file-list="resPcImageList" :headers="httpHeaders" :on-remove="resPcHandleRemove" :on-exceed="fileLimitCount" :before-upload="beforeAvatarUpload" :on-preview="resPcHandlePreview">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="resPcdialogVisible">
              <img width="100%" :src="resPcdialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item :label="$t('appearance.mobileClientBanner')" prop="loginAppFile">
            <el-upload class="upload-demo" :action="uploadUrl" drag list-type="picture-card" :limit="1" :on-success="resAppUploadFile" :file-list="resAppImageList" :headers="httpHeaders" :on-remove="resAppHandleRemove" :on-exceed="fileLimitCount" :before-upload="beforeAvatarUpload" :on-preview="resAppHandlePreview">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="resAppdialogVisible">
              <img width="100%" :src="resAppdialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item :label="$t('appearance.isMeetingTime')" prop="isLoginDate">
            <el-switch v-model="appearanceSetForm.isLoginDate" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('appearance.isMeetingLocation')" prop="isLoginPlace">
            <el-switch v-model="appearanceSetForm.isLoginPlace" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('appearance.isCountdown')" prop="isLoginCountdown">
            <el-switch v-model="appearanceSetForm.isLoginCountdown" active-color="#13ce66" inactive-color="#ff4949" active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="appearanceSetBtns">
      <el-button type="primary" @click="appearanceSetSave">{{$t('appearance.saveAndNext')}}</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/frame/base/request'
export default {
  name: 'appearanceSet',
  data () {
    return {
      eventCode:'',
      resPcImageList: [],
      resPcdialogImageUrl: '',
      resPcdialogVisible: false,
      resAppImageList: [],
      resAppdialogImageUrl: '',
      resAppdialogVisible: false,
      AppImageList: [],
      AppdialogImageUrl: '',
      AppdialogVisible: false,
      meetingImageList: [],
      mettingdialogImageUrl: '',
      meetingdialogVisible: false,
      appearanceSetForm: {
        titleChinese: '', // 标题
        titleEnglish: '', // 英文标题
        language: ['中文'], // 语言
        // language: ['中文'], // 语言
        color: '#409EFF', // 主色调
        isPropaganda: 0, // 是否开启会议宣传
        // BannerList: [], // banner 列表
        meetingFile: '',
        appFile: '',
        isMeetingDate: 0, // 是否显示会议时间
        isMeetinPlace: 0, // 是否显示会议地点
        isMeetinCountdown: 0, // 是否显示倒计时
        profile: '', // 会议简介

        // registerBannerPCList: [], // 注册登录PC BannerList
        loginPcFile: '',
        // registerBannerMobileList: [], // 注册登录移动端 BannerList
        loginAppFile: '',
        isLoginDate: 0, // 是否显示会议时间
        isLoginPlace: 0, // 是否显示会议地点
        isLoginCountdown: 0 // 是否显示倒计时
      },
      isCommonSetShow: true, // 通用设置是否显示
      isPublicitySetShow: true, // 会议宣传是否显示
      isRegisterSetShow: true, // 注册登录是否显示
      uploadUrl: process.env.BASE_API + '/api/obs/file/uploadImg',

    }
  },
  created () {},
  mounted () {},
  computed: {
    ...mapGetters(['dataDictList', 'sidebar', 'clientWidth', 'clientHeight']),
    httpHeaders () {
      return {
        Authorization: 'Bearer ' + this.$store.getters.token
      }
    }
  },
  methods: {
    meetingUploadFile (response, file, fileList) {
      this.appearanceSetForm.meetingFile = response.data.filePath
    },
    resPcUploadFile (response, file, fileList) {
      this.appearanceSetForm.loginPcFile = response.data.filePath
    },
    resAppUploadFile (response, file, fileList) {
      this.appearanceSetForm.loginAppFile = response.data.filePath
    },
    AppUploadFile (response, file, fileList) {
      this.appearanceSetForm.appFile = response.data.filePath
    },
    meetingHandleRemove (file, fileList) {
      this.meetingImageList = []
      this.appearanceSetForm.meetingFile = ''
    },
    AppHandleRemove (file, fileList) {
      this.AppImageList = []
      this.appearanceSetForm.appFile = ''
    },
    resPcHandleRemove (file, fileList) {
      this.resPcImageList = []
      this.appearanceSetForm.loginPcFile = ''
    },
    resAppHandleRemove (file, fileList) {
      this.resAppImageList = []
      this.appearanceSetForm.loginAppFile = ''
    },
    mweetngHandlePreview (file) {
      this.mettingdialogImageUrl = file.url
      this.meetingdialogVisible = true
    },
    AppHandlePreview (file) {
      this.AppdialogImageUrl = file.url
      this.AppdialogVisible = true
    },
    resAppHandlePreview (file) {
      this.resAppdialogImageUrl = file.url
      this.resAppdialogVisible = true
    },
    resPcHandlePreview (file) {
      this.resPcdialogImageUrl = file.url
      this.resPcdialogVisible = true
    },
    // 文件数量限制
    fileLimitCount (files, fileList) {
      this.$message.warning(this.$t('form.onlyonefileisallowedtoupload'))
    },
    // 上传前文件类型校验
    beforeAvatarUpload (file) {
      const fileName = file.name
      const extension = fileName.substr(fileName.lastIndexOf('.')).toLowerCase()
      console.log(extension, 'extension')
      let isAllowUpload = true
      let acceptType = ['.jpg', '.png']
      // 判断后缀名是否允许上传
      isAllowUpload = acceptType.includes(extension)
      if (!isAllowUpload) {
        const errMsg = this.$t('form.uploadedNotice') + acceptType.join('、')
        this.$message.error(errMsg)
        return false
      }
      return isAllowUpload
    },
    // 获取外观设置
    getAppearanceSet (eventCode) {
      this.eventCode=eventCode
      // 清空列表
      this.meetingImageList = []
      this.AppImageList = []
      this.resPcImageList = []
      this.resAppImageList = []
      request({
        url: '/api/register/signupExterior/get',
        method: 'POST',
        data: {
          data: this.eventCode,
          funcModule: '表单外观设置',
          funcOperation: '表单外观设置查询'
        }
      }).then(res => {
        if (res.status) {
          if (JSON.stringify(res.data) === '{}' || res.data == undefined) {
             this.appearanceSetForm.titleChinese = '' // 标题
              this.appearanceSetForm.titleEnglish = '' // 英文标题
              this.appearanceSetForm.language = ['中文']// 语言
              this.appearanceSetForm.color = '#409EFF' // 主色调
              this.appearanceSetForm.isPropaganda = 0// 是否开启会议宣传
              this.appearanceSetForm.meetingFile = ''
              this.appearanceSetForm.appFile = ''
              this.appearanceSetForm.isMeetingDate = 0 // 是否显示会议时间
              this.appearanceSetForm.isMeetinPlace = 0 // 是否显示会议地点
              this.appearanceSetForm.isMeetinCountdown = 0 // 是否显示倒计时
              this.appearanceSetForm.profile = ''// 会议简介
              setTimeout(() => {
                if (window.frames['myframe']){
                  window.frames['myframe'].setContents('')
                }
              }, 3000)
              this.appearanceSetForm.loginPcFile = ''
              this.appearanceSetForm.loginAppFile = ''
              this.appearanceSetForm.isLoginDate = 0 // 是否显示会议时间
              this.appearanceSetForm.isLoginPlace = 0 // 是否显示会议地点
              this.appearanceSetForm.isLoginCountdown = 0 // 是否显示倒计时
          } else {
            this.appearanceSetForm = res.data
            setTimeout(() => {
                if (window.frames['myframe']){
                  window.frames['myframe'].setContents('')
                  window.frames['myframe'].setContents(this.appearanceSetForm.profile)
                }
              }, 3000)
            this.appearanceSetForm.language=res.data.language.split(',')
            // this.meetingImageList = res.data.meetingFile
            this.meetingImageList = []
            this.AppImageList = []
            this.resPcImageList = []
            this.resAppImageList = []
            if (res.data.meetingFile !== ''&&res.data.meetingFile!=undefined) {
              var urlSplits = res.data.meetingFile && res.data.meetingFile.split('/')
              this.meetingImageList.push({ name: urlSplits[urlSplits.length - 1], url: res.data.meetingFile })
            }
            if (res.data.appFile !== ''&&res.data.appFile!=undefined) {
              var urlSplits = res.data.appFile && res.data.appFile.split('/')
              this.AppImageList.push({ name: urlSplits[urlSplits.length - 1], url: res.data.appFile })
            }
            if (res.data.loginPcFile !== ''&&res.data.loginPcFile!=undefined) {
              var urlSplits = res.data.loginPcFile && res.data.loginPcFile.split('/')
              this.resPcImageList.push({ name: urlSplits[urlSplits.length - 1], url: res.data.loginPcFile })
            }
            if (res.data.loginAppFile !== ''&&res.data.loginAppFile!=undefined) {
              var urlSplits = res.data.loginAppFile && res.data.loginAppFile.split('/')
              this.resAppImageList.push({ name: urlSplits[urlSplits.length - 1], url: res.data.loginAppFile })
            }
            console.log(res.data, '外观设置')
            Object.keys(this.appearanceSetForm).forEach(key => {
              if (key === 'tenantCode') delete this.appearanceSetForm[key]
            })
          }
        }
      })
    },
    appearanceSetSave(){
      console.log(this.appearanceSetForm, 'this.appearanceSetForm')
      request({
        url: '/api/register/signupExterior/get',
        method: 'POST',
        data: {
          data: this.eventCode,
          funcModule: '外观设置',
          funcOperation: '外观设置查询'
        }
      }).then(res => {
        if (res.status) {
          if (JSON.stringify(res.data) === '{}' || res.data == undefined) {
            this.appearanceSetForm.eventCode = this.form.listQuery.data.eventCode
            this.appearanceSetForm.language = this.appearanceSetForm.language.join(',')
            this.appearanceSetForm.code = ''
            this.appearanceSetForm.id = ''
            const req = window.frames['myframe'].getContent()
            this.appearanceSetForm.profile = req.trim()
            request({
              url: '/api/register/signupExterior/save',
              method: 'POST',
              data: {
                data: this.appearanceSetForm,
                funcModule: '外观设置',
                funcOperation: '外观设置保存'
              }
            })
              .then(res => {
                if (res.status) {
                  // 进入下一步 表单设置
                  this.$emit('stepIndex',1)
                  this.getAppearanceSet()
                }
              })
              .catch(res => {
                console.log(res)
              })
          } else {
            this.appearanceSetForm.eventCode = this.eventCode
            this.appearanceSetForm.language = this.appearanceSetForm.language.join(',')
            const req = window.frames['myframe'].getContent()
            this.appearanceSetForm.profile = req.trim()
            console.log(this.appearanceSetForm, 'this.appearanceSetForm')
            request({
              url: '/api/register/signupExterior/update',
              method: 'POST',
              data: {
                data: this.appearanceSetForm,
                funcModule: '表单外观设置',
                funcOperation: '表单外观设置更新'
              }
            })
            .then(res => {
                if (res.status) {
                  // 进入下一步 表单设置
                  this.$emit('stepIndex',1)
                  this.getAppearanceSet(this.eventCode)
                }
              })
              .catch(res => {
                console.log(res)
              })
          }
        }})
    }
  },
}
</script>

<style>
.el-form-label__frameBox {
  display: none;
}

.el-upload .el-upload-dragger {
  width: 150px;
  height: 150px;
}

.upload-demo .el-upload--picture-card {
  position: static;
  overflow: inherit;
}
</style>

<style lang="scss" scoped>
.transition-box {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0;
  width: 100%;
  height: 700px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 90%;
  height: 90%;
  background-color: #f2f2f2;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .centerContent {
    width: 80%;
    height: 500px;

    .themeTitle {
      width: 100%;
      height: 150px;
      padding-top: 40px;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-bottom: 30px;
      text-align: center;
      // display: flex;
      // flex-direction: columns;
      // justify-content: center;
      // align-items: center;
    }

    .successInfo {
      position: relative;
      width: 100%;
      height: 200px;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-bottom: 80px;
    }
  }

  .pageStatus {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px;
    border-radius: 50%;
    background-color: #f2f2f2;
    border: 1px solid #ccc;
  }
}

.steps {
  width: 80%;
  margin: 0 auto;

  .stepIcon {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid;
    background: #fff;
  }
}

.formSet {
  display: flex;
  justify-content: space-between;
  min-width: 1250px;

  .formInfo {
    width: 20%;
    overflow: auto;

    .formInfoTitle {
      text-align: center;
      font-size: 15px;
    }

    .formInfoItems {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
    }

    .formInfoItem {
      min-width: 50px;
      margin: 10px 10px;
      text-align: center;
      cursor: pointer;
    }
  }

  .formPreview {
    width: 60%;
    overflow: auto;
    position: relative;
    margin: 0 20px;

    .setInfoItem {
      width: 100%;
      margin: 10px 0;
      padding: 10px 30px;
      // background: #eee;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .form-item-input {
        width: 100%;

        .addresItem {
          margin-top: 15px;
        }

        .avatar-uploader {
          // width: 100px;
          display: inline-block;
          vertical-align: top;

          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .el-upload:hover {
            border-color: #409eff;
          }
        }

        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
        }

        .avatar {
          width: 100px;
          height: 100px;
          display: block;
        }
      }

      .remove-button {
        cursor: pointer;
        font-size: 20px;
        line-height: 28px;
        margin-left: 10px;
      }
    }

    .setInfoItem:hover {
      background: #eee;
    }

    .setInfoItemlabel {
      display: inline-block;
      width: 100px;
      text-align: right;
      margin-right: 10px;
    }

    .optionBtns {
      position: sticky;
      bottom: 0;
      // width: calc(100% - 40px);
      text-align: center;
    }
  }

  .formEdit {
    width: 20%;
    overflow: auto;

    .formInfoTitle {
      text-align: center;
      font-size: 15px;
    }

    .eidtContentItem {
      // line-height: 32px;
    }

    .el-input-number__decrease,
    .el-input-number__increase {
      height: auto !important;
    }

    .systemName {
      background: #eee;
      padding: 10px 20px;
      margin-bottom: 20px;
    }

    .eidtContent {
      padding: 0 20px;

      .eidtContentItem {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 10px 0;

        .eidtContentItemTitle {
          font-weight: bold;
        }

        .VerifyExplain {
          color: #ccc;
          font-weight: 400;
          padding-left: 30px;
          margin-bottom: 10px;
          white-space: normal;
        }
      }
    }
  }
}

.appearanceSet {
  padding: 20px 50px;
  min-width: 1250px;
  background: #fff;
  overflow: auto;

  .appearanceSetItem {
    .el-form-item {
      // margin-left: 100px;
      .el-form-item__label {
        margin-right: 100px;
      }
    }

    .setItemTitle {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
    }
  }

  .appearanceSetBtns {
    text-align: center;
  }
}

.resultSet {
  padding: 20px 10px;
  min-width: 1250px;
  background: #fff;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .resultSetItem {
    .setItemTitle {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
    }

    .previewCard {
      width: 290px;
      height: 515px;
      position: relative;

      .pageStatus {
        position: absolute;
        top: 15px;
        right: 15px;
        padding: 5px;
        border-radius: 50%;
        background-color: #f2f2f2;
      }

      pre {
        white-space: pre-wrap;
        word-break: break-word;
      }

      .previewBtns {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-button {
          width: 150px;
          margin: 5px 0;
        }
      }

      .centerContent .previewBtnsRow {
        // position: absolute;
        width: 100%;
        height: 100px;
        // bottom: 20px;
        // margin: 20px 0;
        // left: 50%;
        // right: 50%;
        // transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        // flex-direction: row;
        // align-items: center;

        .el-button {
          width: 150px;
          margin: 5px 0;
        }
      }
    }

    .el-upload-dragger {
      height: 120px;

      .el-icon-upload {
        margin: 16px 0;
      }
    }

    .el-upload__tip {
      margin-top: 0;
    }

    .remove-button {
      cursor: pointer;
      font-size: 20px;
      line-height: 28px;
      margin-left: 10px;
    }
  }

  .resultSetBtns {
    text-align: center;
  }
}
</style>

<style scoped>
.formPreview /deep/ .el-card__body {
  min-height: 100%;
}

.formEdit /deep/ .el-card__body {
  padding: 0;
}

.certificateOptions {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.certificateVerify {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
