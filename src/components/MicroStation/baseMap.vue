<template>
  <div>
    <!-- 底图的 -->
    <div style="margin-top: 8px">
      <el-button size="small" type="primary" @click="materialSelection">{{$t('website.microStationDesign.selectMaterialLibrary')}}</el-button>
    </div>
    <div style="text-align: center; margin-top: 50px">
      <el-upload :disabled="true" accept="image/jpeg,image/psd,image/png,image/jpg" action list-type="picture-card" :headers="httpHeaders" :before-upload="beforeUpload" :http-request="handleUploadForm" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="webpagePicDtoList_">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible_">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <el-dialog :title="$t('website.microStationDesign.materialSelection')" :visible.sync="dialogVisible" :fullscreen="true" destroy-on-close>
      <div>
        <!-- 放内容的 -->
        <material ref="material" :MultiSelect="false" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('website.microStationDesign.canel')}}</el-button>
        <el-button type="primary" @click="submit_">{{$t('website.microStationDesign.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import material from '@/components/MicroStation/materialSelection'
export default {
  props: ['code', 'webpagePicDtoList'], //接收值
  components: {
    material
  },
  data() {
    return {
      // process.env.BASE_API +
      uploadUrl: '/api/biz/cmsWebpagePic/uploadBackgroundPic',
      dialogImageUrl: '',
      dialogVisible_: false,
      dialogVisible: false,
      webpagePicDtoList_: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible_ = true
    },
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 1 个图片，本次选择了 ${files.length} 个图片，共选择了 ${files.length + fileList.length} 个图片`)
      this.$message.warning(this.$t('website.microStationDesign.deleteOruploading'))
    },
    //
    handleUploadForm(param) {
      let thiz = this
      let formData = new FormData()
      formData.append('webpageCode', this.code) // 额外参数
      formData.append('file', param.file)
      let loading = thiz.$loading({
        lock: true,
        text: this.$t('website.microStationDesign.UploadPleaseWait'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      request({
        url: thiz.uploadUrl,
        method: 'POST',
        data: formData
      })
        .then(data => {
          if (data) {
            thiz.$message(this.$t('website.microStationDesign.uploadedFileSuccess'))
            this.$emit('upData_')
          } else {
            thiz.$message(this.$t('website.microStationDesign.uploadedFileFail'))
          }
          loading.close()
        })
        .catch(() => {})
      console.log(param)
    },
    beforeUpload(param) {
      let mun = param.name.split('.')
      let format = mun[mun.length - 1]
      if (format == 'jpg' || format == 'jpeg' || format == 'png' || format == 'psd') {
        // 成功
      } else {
        this.$message(this.$t('website.microStationDesign.deleteOruploading'))
        return false
      }
    },
    materialSelection() {
      this.dialogVisible = true
    },
    submit_() {
      console.log(this.$refs.material.pictureRadio, this.$refs.material.treeDatas)
      let obj = {
        webpageCode: this.code,
        url: JSON.parse(this.$refs.material.pictureRadio).picUrl,
        name: JSON.parse(this.$refs.material.pictureRadio).picName
      }
      //
      request({
        url: '/api/biz/cmsWebpagePic/setBackgroundPic',
        method: 'POST',
        data: { data: obj, funcModule: '素材库选择背景图片', funcOperation: '素材库选择背景图片' }
      })
        .then(res => {
          if (res.data) {
            console.log(res.data)
            this.$message(this.$t('website.microStationDesign.uploadedFileSuccess'))
            this.$emit('upData_')
          } else {
            this.$message(this.$t('website.microStationDesign.uploadedFileFail'))
          }
        })
        .catch(() => {})
      //
      this.dialogVisible = false
    }
  },
  computed: {
    httpHeaders() {
      return {
        Authorization: 'Bearer ' + this.$store.getters.token
      }
    }
  },
  watch: {
    webpagePicDtoList: {
      immediate: true,
      handler(nVal, oVal) {
        this.webpagePicDtoList_ = []
        nVal.forEach((element, index) => {
          if (element.picDictionary == 'background') {
            this.webpagePicDtoList_.push(element)
          }
        })
        console.log(nVal, oVal)
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>