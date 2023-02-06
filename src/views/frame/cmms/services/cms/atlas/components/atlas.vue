<template>
  <div class='bs-new-container dialog-wrapper'>
    <div class='dialog-container' :style="{width: this.sidebar.opened ? '800px' : '1000px'}">
      <!-- 头部 -->
      <title-contain :titleName="titleName" @TitleFun="cancel"></title-contain>
      <div class='dialog-content dialog-container__content'
           :style="{maxHeight: clientHeight - 80 + 'px', overflowY: 'auto','padding-bottom': '0px !important'}"  >
        <div class="atlas" v-loading="loading" :element-loading-text="loadingText">
          <el-form ref="atlasForm" :model="atlasForm" label-width="120px" label-position="right" class="formWrap"
                   :rules="rules" :show-message	='false'>
            <el-form-item :label="$t('website.atlas.atlasTitle')+'：'" prop="name">
              <el-input v-model="atlasForm.name" ></el-input>
            </el-form-item>
            <el-form-item :label="$t('website.atlas.atlasIntroduction')+'：'">
              <el-input
                type="textarea"
                :rows="3"
                v-model="atlasForm.description" >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class='dialog-footer'>
        <template>
          <el-button size="mini" v-db-click @click="cancelForm" :disabled="loading" >
            {{$t("website.atlas.cancel")}}
          </el-button>
          <el-button size="mini" v-db-click type="primary" @click="submitForm" :disabled="loading">
            {{$t("website.atlas.save")}}
          </el-button>
        </template>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import request from '@/utils/frame/base/request'
import { notifyError, notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'

export default {
  name: 'atlas',
  data() {
    return {
      loadingText:"",
      loading:false,
      titleName:"",
      atlasForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入图册名称', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'clientWidth', 'clientHeight'])
  },
  created(){
     if(!this.atlasCode){
       this.titleName=this.$t("website.atlas.add.atlasAddition")
     }else{
       this.titleName=this.$t("website.atlas.edit.atlasEditor")
       //获取图册信息
       this.getAtlas()
     }
  },
  props:['atlasCode',"eventCode"],
  methods:{
    //获取图册信息
    getAtlas() {
      //获取图册信息
      this.loading = true
      this.loadingText="加载中"
      let that = this
      request({
        url: '/api/cms/atlas/get',
        method: 'POST',
        data: {
          funcModule: '图册信息',
          funcOperation: '查询',
          data: this.atlasCode
        }
      }).then((res) => {
        let data = res.data
        that.atlasForm.name = data.name
        that.atlasForm.description = data.description
        that.id =data.id
      }).catch(() => {
        this.atlasForm = {}
      }).finally(() => {
        this.loading = false
      })
    },
    cancelForm(){
       this.clearData()
    },
    submitForm(){
      this.$refs.atlasForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.loadingText=this.$t("website.atlas.add.save")
          let url = ''
          let funcOperation = ''
          let data = this.atlasForm
          if (this.atlasCode) {
            url = '/api/cms/atlas/update'
            funcOperation = '更改'
            data.code = this.atlasCode
          } else {
            url = '/api/cms/atlas/save'
            funcOperation = '新增'
          }
          data.eventCode=this.eventCode
          request({
            url: url,
            method: 'POST',
            data: {
              funcModule: '图册表',
              funcOperation: funcOperation,
              data: data
            }
          }).then((res) => {
            this.$notify(notifySuccess({ msg: this.$t("website.atlas.add.saveSuccessfully") }))
            if (!this.atlasCode) {
              let that = this
              setTimeout(()=>{
                that.$router.push({
                  name:"atlasAndPicture",
                  params:{
                    code:  res.data,
                    eventCode:that.eventCode
                  }
                })
                that.clearData()
                that.$emit('reload')
              },500)
            }else{
                this.clearData()
                this.$emit('reload')
            }
          }).finally(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    clearData(){
      this.$refs.atlasForm.resetFields()
      this.atlasForm={}
      this.$emit('closeDialogAtlas')
    },
    cancel() {
      this.clearData()
    }
  }
}
</script>
<style scoped>
.atlas {
  background-color: #fff;
  border-radius: 5px;
  margin: 0 0 10px;
  padding: 25px 30px 15px 30px;
}

>>> .atlas .el-form-item__content {
  margin-left: 0px !important;
}

>>> .atlas .el-form-item {
  padding-bottom: 25px;
}
>>>.el-textarea__inner{
  font-size: 14px;
  color: #414141;
}
</style>
