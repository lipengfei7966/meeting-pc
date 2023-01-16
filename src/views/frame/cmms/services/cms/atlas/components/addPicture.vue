<template>
  <div class='bs-new-container dialog-wrapper'>
    <div class='dialog-container' :style="{width: this.sidebar.opened ? '800px' : '1000px'}">
      <!-- 头部 -->
      <title-contain titleName="新增图片" @TitleFun="cancel"></title-contain>
      <div class='dialog-content dialog-container__content'
           :style="{maxHeight: clientHeight - 80 + 'px', overflowY: 'auto','padding-bottom': '0px !important'}">
        <el-row>
          <el-col :span="8">
            <div class="uploadWrap">
              <el-upload
                class="url-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
               >
                <div v-if="imageUrl">
                  <img :src="imageUrl" class="picture">
                  <div class="reUpload">
                    <span>重新上传</span>
                  </div>
                </div>
                <span v-else  class="url-uploader-icon">点击上传</span>
              </el-upload>
            </div>
          </el-col>
          <el-col :span="14">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="10px" class="picWrap" >
              <el-form-item label="图片描述：" prop="name" style="align-items: flex-start">
                <el-input
                  type="textarea"
                  :rows="3"
                  v-model="ruleForm.description">
                </el-input>
              </el-form-item>
              <el-form-item label="语言：" prop="language" >
                <el-radio-group v-model="ruleForm.language" style="height: 28px;justify-content: flex-start;gap: 20px;padding-bottom: 0px;align-items: center">
                  <el-radio v-for="(item,index) in languageData"  :key="index" :label="item.dictItemVal"> {{ item.dictItemName }}</el-radio>
                </el-radio-group>
              </el-form-item>
<!--              0:无,1:查看放大图片,2:跳转栏目,3:打开文章,4:自定义链接-->
              <el-form-item label="语言：" prop="language" >
                <el-radio-group v-model="ruleForm.language" style="height: 28px;justify-content: flex-start;gap: 20px;padding-bottom: 0px;align-items: center">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">查看放大图片</el-radio>
                  <el-radio label="2">跳转栏目</el-radio>
                  <el-radio label="3">打开文章</el-radio>
                  <el-radio label="4">自定义链接</el-radio>
                </el-radio-group>
              </el-form-item>

            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class='dialog-footer'>
        <template>
          <el-button size="mini" v-db-click>
            取消
          </el-button>
          <el-button size="mini" v-db-click type="primary">
            保存
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
export default {
  name: 'addPicture',
  data() {
    return {
      languageData:[],
      ruleForm:{
        language:[]
      },
      rules: {

      },
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
  computed: {
    ...mapGetters(['sidebar', 'clientWidth', 'clientHeight'])
  },
  created(){
    this.getItem()
  },
  mounted(){

  },
  methods: {
    //获取字典
    getItem(){
      let func={
        "funcModule": "语种",
        "funcOperation": "查询"
      }
      dictApi.dictItem("url\-uploader",func).then(response => {
         this.languageData = response.data;
        this.$forceUpdate();
         console.log(this.languageData)
      })
    },
    cancel() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="css">
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
  font-size: 16px;
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
.bs-new-container .picWrap .el-form-item{
  margin-bottom: 10px!important;
}
</style>
