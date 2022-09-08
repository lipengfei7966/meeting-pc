<template>
  <div style="text-align: center; margin-top: 50px">
    <el-upload action list-type="picture-card" :headers="httpHeaders" :http-request="handleUploadForm" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="webpagePicDtoList_">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  props: ['code', 'webpagePicDtoList'], //接收值
  data() {
    return {
      // process.env.BASE_API +
      uploadUrl: '/api/biz/cmsWebpagePic/uploadBackgroundPic',
      dialogImageUrl: '',
      dialogVisible: false,
      webpagePicDtoList_: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      debugger
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个图片，本次选择了 ${files.length} 个图片，共选择了 ${files.length + fileList.length} 个图片`)
    },
    //
    handleUploadForm(param) {
      // debugger
      let thiz = this
      let formData = new FormData()
      formData.append('webpageCode', this.code) // 额外参数
      formData.append('file', param.file)
      let loading = thiz.$loading({
        lock: true,
        text: '上传中，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      request({
        url: thiz.uploadUrl,
        method: 'POST',
        data: formData
      })
        .then((data) => {
          if (data) {
            thiz.$message('上传文件成功')
            this.$emit('upData_')
          } else {
            thiz.$message('上传文件失败')
          }
          loading.close()
        })
        .catch(() => {})
      console.log(param)
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
        // debugger
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