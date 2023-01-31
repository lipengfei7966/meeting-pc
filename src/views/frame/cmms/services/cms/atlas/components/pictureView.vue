<template>
  <div class='bs-new-container dialog-wrapper'>
    <div class='dialog-container' :style="{width: this.sidebar.opened ? '800px' : '1000px'}">
      <!-- 头部 -->
      <title-contain :titleName="titleName" @TitleFun="cancel"></title-contain>
      <div class='dialog-content dialog-container__content'
           :style="{maxHeight: clientHeight - 80 + 'px', overflowY: 'auto','padding-bottom': '0px !important'}"
           v-loading="loading">
        <el-row style="min-height: 310px">
          <el-col :span="8">
            <div class="uploadWrap">
              <el-image
                v-if="disabled"
                class="picture"
                :src="imageUrl"
                :alt="imageName"
                :preview-src-list="[imageUrl]"
                fit="fill">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" style="font-size: 50px"></i>
                  <span>{{ $t('website.pictureView.loadFailure') }}</span>
                </div>
              </el-image>

              <el-upload
                v-else
                ref="upload"
                class="url-uploader"
                action
                accept="image/png, image/jpeg, image/gif, image/jpg"
                :disabled="disabled"
                :show-file-list="false"
                :http-request="requestUpload"
              >
                <div v-if="imageUrl">
                  <el-image
                    class="picture"
                    :src="imageUrl"
                    :alt="imageName"
                    :preview-src-list="[imageUrl]"
                    fit="fill">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline" style="font-size: 50px"></i>
                      <span>{{ $t('website.pictureView.loadFailure') }}</span>
                    </div>
                  </el-image>
                  <div class="reUpload" v-if="!disabled">
                    <span>{{ $t('website.pictureView.reupload') }}</span>
                  </div>
                </div>
                <span v-else class="url-uploader-icon"><span
                  class="require">*</span>{{ $t('website.pictureView.clickUpload') }}</span>
              </el-upload>
            </div>
          </el-col>
          <el-col :span="14">
            <el-form :model="pictureForm" :rules="rules" ref="pictureForm" label-width="10px" class="picWrap">
              <el-form-item :label="$t('website.atlasAndPicture.picture.pictureDescription')+'：'" prop="name"
                            class="elFormItem">
                <el-input
                  ref="description"
                  type="textarea"
                  :disabled="disabled"
                  :rows="4"
                  v-model="pictureForm.description">
                </el-input>
              </el-form-item>
              <el-form-item :label="$t('website.atlasAndPicture.picture.language')+'：'" prop="language"
                            class="elFormItem">
                <el-radio-group v-model="pictureForm.language" class="formRadio" style="height: 28px"
                                :disabled="disabled">
                  <el-radio v-for="(item,index) in languageData" :key="index" :label="item.dictItemVal">
                    {{ item.dictItemName }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <!--              0:无,1:查看放大图片,2:跳转栏目,3:打开文章,4:自定义链接-->
              <el-form-item :label="$t('website.atlasAndPicture.picture.imageClickEffect')+'：'" prop="effect"
                            class="elFormItem">
                <el-radio-group v-model="pictureForm.effect"
                                class="formRadio" :disabled="disabled">
                  <el-radio label="0">{{ $t('website.atlasAndPicture.picture.not') }}</el-radio>
                  <el-radio label="1">{{ $t('website.atlasAndPicture.picture.ViewEnlargedImage') }}</el-radio>
                  <el-radio label="2">{{ $t('website.atlasAndPicture.picture.skipColumn') }}</el-radio>
                  <el-radio label="3">{{ $t('website.atlasAndPicture.picture.OpenTheArticle') }}</el-radio>
                  <el-radio label="4">{{ $t('website.atlasAndPicture.picture.customLink') }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="$t('website.atlasAndPicture.picture.jumpPosition')+'：'" prop="content">
                <el-input v-model="pictureForm.content" :disabled="disabled"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class='dialog-footer'>
        <template>
          <el-button size="mini" v-db-click @click="cancelForm" :disabled="loading" v-if="!disabled">
            {{ $t('website.atlas.cancel') }}
          </el-button>
          <el-button size="mini" v-db-click type="primary" @click="submitForm" :disabled="loading">
            {{ $t('website.atlas.save') }}
          </el-button>
        </template>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dictApi from '@/api/frame/base/sys/dict'
import request from '@/utils/frame/base/request'
import { notifyError, notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  name: 'pictureView',
  data() {
    let that = this
    return {
      titleName: '',
      loading: false,
      id: '',
      languageData: [],
      pictureForm: {
        language: '',
        effect: '0',
        description: '',
        content: ''
      },
      rules: {
        language: { required: true, message: that.$t('website.pictureView.add.seletLanguage') },
        effect: { required: true, message: that.$t('website.pictureView.add.selectImage') }
      },
      imageName: '',
      imageUrl: '',
      topButtons: [{
        iconName: 'cancel',
        name: 'biz.btn.cancel',
        event: 'cancel',
        isShow: ['add', 'update']
      }, {
        name: 'biz.btn.save',
        iconName: 'save',
        event: 'save',
        isShow: ['add', 'update'],
        attrs: {
          type: 'primary'
        }
      }]
    }
  },
  props: ['atlasCode', 'pictureItem', 'disabled'],
  computed: {
    ...mapGetters(['sidebar', 'clientWidth', 'clientHeight'])
  },
  created() {
    this.getItem()

  },
  mounted() {

  },
  methods: {
    //自定义上传图片
    requestUpload(fileArr) {
      this.imageUrl = ''
      let file = fileArr.file
      let loading_ = this.$loading({
        lock: true,
        text: this.$t('website.pictureView.add.uploading') + '...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let formData = new FormData()
      formData.append('file', file)
      let that = this
      request({
        url: '/api/obs/file/uploadImg',
        method: 'POST',
        data: formData
      }).then((res) => {
        that.imageName = res.data.fileName
        that.imageUrl = res.data.filePath
        that.$notify(notifySuccess({ msg: that.$t('website.pictureView.add.uploadSuccess') }))
      }).catch(() => {
        that.imageUrl = ''
        that.imageName = ''
      }).finally(() => {
        loading_.close()
        that.$refs.description.focus()
      })
    },
    //取消
    cancelForm() {
      this.clearData()
    },
    clearData() {
      this.imageUrl = ''
      this.imageName = ''
      this.$refs.pictureForm.resetFields()
      this.$emit('closeDialog')
    },
    //保存
    submitForm() {
      if (this.disabled == true) {
        this.clearData()
        return
      }
      if (!this.imageUrl) {
        this.$message(this.$t('website.pictureView.add.noPicture') + '！')
        return
      }
      this.$refs.pictureForm.validate((valid) => {
        console.log(valid)
        if (valid) {
          let url = ''
          let funcOperation = ''
          let that = this
          let data = {
            ...this.pictureForm,
            name: this.imageName,
            url: this.imageUrl,
            atlasCode: this.atlasCode
          }
          //新增或者编辑
          if (this.pictureItem.id) { //编辑
            url = '/api/cms/atlasDetail/update'
            funcOperation = '编辑'
            data.id = this.pictureItem.id
          } else { //保存
            url = '/api/cms/atlasDetail/save'
            funcOperation = '保存'
          }
          this.loading = true
          request({
            url: url,
            method: 'POST',
            data: {
              data: data,
              funcModule: '图册图片',
              funcOperation: funcOperation
            }
          }).then((res) => {
            if (!that.pictureItem.id) {
              that.$notify(notifySuccess({ msg: this.$t("website.pictureView.add.addSuccess") }))

            } else {
              that.$notify(notifySuccess({ msg: this.$t("website.pictureView.add.addFail") }))
            }
            let that_ = that
            setTimeout(() => {
              that_.clearData()
              that_.$emit('reloadData')
            }, 500)
          }).catch(() => {

          }).finally(() => {
            that.loading = false
          })
        }
      })
    },
    //获取字典
    getItem() {
      let func = {
        'funcModule': '语种',
        'funcOperation': '查询'
      }
      dictApi.dictItem('LANGUAGE_TYPE', func).then(response => {
        this.languageData = response.data
        this.pictureForm.language = this.languageData[0].dictItemVal
        this.$forceUpdate()
        this.assignmentData()
      })
    },
    assignmentData() {
        //判断编辑 新增
      if (Object.keys(this.pictureItem).length > 0) {
        this.titleName = this.$t('website.pictureView.editPicture')
        //数据回显
        console.log(this.pictureItem)
        this.imageName = this.pictureItem.name //图片名称
        this.imageUrl = this.pictureItem.url  //图片地址
        this.pictureForm.description = this.pictureItem.description //图片描述
        this.pictureForm.language = this.pictureItem.language ? this.pictureItem.language : null //图片语言
        this.pictureForm.effect = this.pictureItem.effect
        this.pictureForm.content = this.pictureItem.content
      } else {
        this.titleName = this.$t('website.pictureView.addAPicture')
      }
      if (this.disabled == true) {
        this.titleName = this.$t('website.pictureView.viewPictures')
      }
    },
    cancel() {
      this.clearData()
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="css">
/*上传图片样式*/
.url-uploader .el-upload {
  /*border: 1px dashed #d9d9d9;*/
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.uploadWrap {
  display: flex;
  justify-content: center;
}

.reUpload {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: #1890FF;
  cursor: pointer;
}

.url-uploader .el-upload:hover {
  border-color: #409EFF;
}

.url-uploader-icon {
  border: 1px dashed #d9d9d9;
  display: flex;
  justify-content: center;
  font-size: 14px;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.picture {
  width: 178px;
  height: 178px;
  display: block;

}

.bs-new-container .picWrap {
  height: 100%;
}

/*图片必传*/
.require {
  color: #f56c6c;
  font-size: 24px;
  margin-left: 5px;

}

/*表格样式修改*/
.bs-new-container .picWrap .elFormItem {
  align-items: flex-start
}

.bs-new-container .picWrap .el-form-item {
  margin-bottom: 25px !important;
}

/*单选按钮格式*/
.formRadio {
  height: auto !important;
  justify-content: flex-start !important;
  flex-wrap: wrap;
  padding-bottom: 0px;
  align-items: center
}

.bs-new-container .el-row .el-col .picWrap .el-form-item__label {
  min-width: 125px !important;
}

.bs-new-container .el-form .el-form-item .el-form-item__content .formRadio {
  padding-bottom: 0px !important;
}

.bs-new-container .el-form .el-form-item .el-form-item__content .formRadio .el-radio {
  height: 28px !important;
  line-height: 28px !important;
  width: 30%;
}

/*图片加载失败*/
.image-slot {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  font-size: 16px;
  justify-content: center;
  align-items: center;
}

>>> .el-textarea__inner {
  font-size: 14px;
  color: #414141;
}
</style>
