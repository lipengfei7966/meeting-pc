<template>
  <div>
    <!-- 底图的 -->
    <div style="margin-top: 8px">
      <el-button size="small" type="primary" @click="materialSelection">从素材库选择</el-button>
    </div>
    <div style="text-align: center; margin-top: 50px">
      <el-upload action list-type="picture-card" :headers="httpHeaders" :http-request="handleUploadForm" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="webpagePicDtoList_">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible_">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
    <el-dialog title="素材选择" :visible.sync="dialogVisible" :fullscreen="true" destroy-on-close>
      <div>
        <!-- 放内容的 -->
        <material ref="material" :MultiSelect="false" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit_">确 定</el-button>
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
      debugger
      this.dialogImageUrl = file.url
      this.dialogVisible_ = true
    },
    handleExceed(files, fileList) {
      // this.$message.warning(`当前限制选择 1 个图片，本次选择了 ${files.length} 个图片，共选择了 ${files.length + fileList.length} 个图片`)
      this.$message.warning('请删除已存在图片后再进行上传操作')
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
    },
    materialSelection() {
      this.dialogVisible = true
    },
    submit_() {
      console.log(this.$refs.material.pictureRadio, this.$refs.material.treeDatas)
      let obj = {
        webpageCode: this.code,
        url: this.$refs.material.pictureRadio.picUrl,
        name: this.$refs.material.pictureRadio.picName
      }
      //
      request({
        url: '/api/biz/cmsWebpagePic/setBackgroundPic',
        method: 'POST',
        data: { data: obj, funcModule: '素材库选择背景图片', funcOperation: '素材库选择背景图片' }
      })
        .then((res) => {
          debugger
          if (res.data) {
            console.log(res.data)
            this.$message('上传文件成功')
            this.$emit('upData_')
          } else {
            this.$message('上传文件失败')
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