<template>
  <!-- 轮播图的 -->
  <div style="height: 90vh; overflow: auto; margin-top: 10px">
    <div>
      <el-button size="small" type="primary" style="float: left; margin-right: 10px" @click="materialSelection">从素材库选择</el-button>
      <el-upload accept="image/jpeg,image/psd,image/png,image/jpg" :before-upload="beforeUpload" class="upload-demo" :http-request="handleUploadForm" :headers="httpHeaders" action :on-preview="handlePreview" :on-remove="handleRemove" :file-list="webpagePicDtoList_" list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-dialog title="素材选择" :fullscreen="true" :visible.sync="dialogVisible" destroy-on-close>
      <div>
        <!-- 放内容的 -->
        <material ref="material" :MultiSelect="true" />
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
        // debugger
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
    // debugger
    // this.webpagePicDtoList.forEach((element, index) => {
    //   if (element.picDictionary == 'rotation') {
    //     this.webpagePicDtoList_.push(element)
    //   }
    // })
    // console.log(this.webpagePicDtoList_)
  },
  methods: {
    handleRemove(file, fileList) {
      // debugger
      if (this.flag_) {
        //
        request({
          url: '/api/biz/cmsWebpagePic/remove',
          method: 'POST',
          data: { data: file.id, funcOperation: '删除轮播图', funcModule: '删除轮播图' }
        })
          .then((data) => {
            debugger
            if (data) {
              this.$message('删除成功')
              this.$emit('upData_')
            } else {
              this.$message('删除失败')
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
      // debugger
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
      this.$refs.material.checkList.forEach((item) => {
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
      this.dialogVisible = false
    },
    beforeUpload(param) {
      debugger
      // debugger
      let mun = param.name.split('.')
      let format = mun[mun.length - 1]
      if (format == 'jpg' || format == 'jpeg' || format == 'png' || format == 'psd') {
        // 成功
        this.flag_ = true
      } else {
        this.flag_ = false
        this.$message('请上传jpg，png，jpeg，psd 类型的图片')
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
// .el-dialog {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   margin: 0 !important;
//   transform: translate(-50%, -50%);
//   max-height: calc(100%);
//   max-width: calc(100%);
//   display: flex;
//   flex-direction: column;
// }

// .el-dialog__body {
//   overflow: auto;
// }
// .el-dialog__header {
//   padding: 15px;
//   background: #265588;
// }
// .el-dialog__title {
//   line-height: 24px;
//   font-size: 17px;
//   color: white;
// }
// .el-dialog__footer {
//   padding: 15px 20px 15px;
// }
</style>