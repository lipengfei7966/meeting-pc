<template>
  <!-- 轮播图的 -->
  <div style="height: 90vh; overflow: auto; margin-top: 10px">
    <div>
      <el-button size="small" type="primary" style="float: left; margin-right: 10px" @click="materialSelection">{{$t('website.microStationDesign.selectMaterialLibrary')}}</el-button>
      <el-upload accept="image/jpeg,image/psd,image/png,image/jpg" :before-upload="beforeUpload" class="upload-demo" :http-request="handleUploadForm" :headers="httpHeaders" action :on-preview="handlePreview" :on-remove="handleRemove" :file-list="webpagePicDtoList_" list-type="picture">
        <el-button size="small" type="primary">{{$t('website.microStationDesign.clickUpload')}}</el-button>
      </el-upload>
    </div>
    <el-dialog :title="$t('website.microStationDesign.materialSelection')" :fullscreen="true" :visible.sync="dialogVisible" destroy-on-close>
      <div>
        <!-- 放内容的 -->
        <material ref="material" :MultiSelect="true" />
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
      flag_: true,
      // process.env.BASE_API +
      uploadUrl: '/api/biz/cmsWebpagePic/uploadRotationPic',
      webpagePicDtoList_: [],
      dialogVisible: false
      // fileList: [
      //   { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
      //   { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      // ]
    }
  },
  watch: {
    webpagePicDtoList: {
      immediate: true,
      handler(nVal, oVal) {
        this.webpagePicDtoList_ = []
        nVal.forEach((element, index) => {
          if (element.picDictionary == 'rotation') {
            this.webpagePicDtoList_.push(element)
          }
        })
        console.log(nVal, oVal)
      }
    }
  },
  created() {
    // this.webpagePicDtoList.forEach((element, index) => {
    //   if (element.picDictionary == 'rotation') {
    //     this.webpagePicDtoList_.push(element)
    //   }
    // })
    // console.log(this.webpagePicDtoList_)
  },
  methods: {
    handleRemove(file, fileList) {
      if (this.flag_) {
        //
        request({
          url: '/api/biz/cmsWebpagePic/remove',
          method: 'POST',
          data: { data: file.id, funcOperation: '删除轮播图', funcModule: '删除轮播图' }
        })
          .then(data => {
            if (data) {
              this.$message(this.$t('website.microStationDesign.deleteSuccess'))
              this.$emit('upData_')
            } else {
              this.$message(this.$t('website.microStationDesign.deleteFail'))
            }
          })
          .catch(() => {})
        //
        console.log(file, fileList)
        console.log(this.webpagePicDtoList)
      }
    },
    handlePreview(file) {
      console.log(file)
    },
    handleUploadForm(param) {
      // let mun = param.file.name.split('.')
      // let format = mun[mun.length - 1]
      // if (format == 'jpg' || format == 'jpeg' || format == 'png' || format == 'psd') {
      let thiz = this
      let formData = new FormData()
      formData.append('webpageCode', this.code) // 额外参数
      formData.append('file', param.file)
      let data = {
        data: {
          webpageCode: this.code,
          file: param.file
        },
        funcModule: '上传轮播图',
        funcOperation: '上传轮播图'
      }
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
      // } else {
      //   this.$message('请上传jpg，png，jpeg，psd 类型的图片')
      //   return
      // }
    },
    materialSelection() {
      this.dialogVisible = true
    },
    submit_() {
      console.log(this.$refs.material.checkList, this.$refs.material.treeDatas)
      let arr = []
      this.$refs.material.checkList.forEach(item => {
        let obj = {
          webpageCode: this.code,
          url: JSON.parse(item).picUrl,
          name: JSON.parse(item).picName
        }
        arr.push(obj)
      })
      console.log(this.$refs.material.checkList, this.$refs.material.treeDatas, arr)
      request({
        url: '/api/biz/cmsWebpagePic/setRotationPic',
        method: 'POST',
        data: { data: arr, funcModule: '素材库选择轮播图片', funcOperation: '素材库选择轮播图片' }
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
      this.dialogVisible = false
    },
    beforeUpload(param) {
      let mun = param.name.split('.')
      let format = mun[mun.length - 1]
      if (format == 'jpg' || format == 'jpeg' || format == 'png' || format == 'psd') {
        // 成功
        this.flag_ = true
      } else {
        this.flag_ = false
        this.$message(this.$t('website.microStationDesign.pleaseUploadType'))
        return false
      }
    }
  },
  computed: {
    httpHeaders() {
      return {
        Authorization: 'Bearer ' + this.$store.getters.token
      }
    }
  }
}
</script>

<style lang="scss">
</style>