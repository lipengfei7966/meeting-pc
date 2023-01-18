<template>
  <div class="bs-new-container app-container atlesWrap" v-loading="loadingWrap">
    <el-page-header @back="goBack" :content="headerTitle" class="pageHeader">
    </el-page-header>
    <div class="atlas" v-loading="loading" :element-loading-text="$t('website.atlas.add.save')">
      <el-form ref="atlasForm" :model="atlasForm" label-width="140px" label-position="right" class="formWrap"
               :rules="rules">
        <el-form-item :label="$t('website.atlas.atlasTitle')+'：'" prop="name">
          {{atlasForm.name}}
        </el-form-item>
        <el-form-item :label="$t('website.atlas.atlasIntroduction')+'：'">
          {{atlasForm.description}}
        </el-form-item>
      </el-form>
      <div class="atlasOperation">
        <el-button type="primary" @click="editAtlas" v-if="!disabled">{{ $t('website.atlasAndPicture.editInformation') }}</el-button>
      </div>
    </div>
    <div class="atlas">
      <div class="searchWrap">
        <el-form ref="pictureForm" label-width="150px" label-position="right" class="formWrap"
                 style="width: 50%">
          <el-form-item :label="$t('website.atlasAndPicture.picture.pictureInformation')+'：'">
            <el-input v-model="description" style="width: 40%" :placeholder="$t('website.atlasAndPicture.picture.searchInfo')"></el-input>
          </el-form-item>
        </el-form>
        <div class="atlasOperation" style="width: 50%">
          <el-button @click="onReset" class="reset">
            {{$t('website.atlasAndPicture.picture.reset')}}
          </el-button>
          <el-button type="primary" @click="searchPicture" :loading="loadingForm">{{$t('website.atlasAndPicture.picture.search')}}</el-button>
        </div>
      </div>
      <el-divider class="dividerLine"></el-divider>
      <div class="top-operate" ref="btnWrapper" style="margin-bottom: 15px">
        <div type="flex" ref="btnContainer" style="display: flex;justify-content: flex-end">
          <div class="operationButton" >
            <el-upload
              class="upload-demo"
              multiple
              :show-file-list="false"
              ref="upload"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              :auto-upload="false"
              :on-change="handleChange"
              action
              style='display:inline-block;margin-right:10px;'
               >
<!--              :http-request="requestUpload"-->
              <el-button size="medium" :loading="uploadLoading" style="height: 32px;" class="uploadButton" >
                <svg-icon icon-class="upload"></svg-icon>
                {{ $t('website.atlasAndPicture.picture.batchUpload') }}
              </el-button>
            </el-upload>
            <el-button  size="mini" style="margin-right: 3px;margin-top: 3px;height:32px;" @click="addPicture">
              <svg-icon icon-class="add"></svg-icon>
              {{ $t('website.atlasAndPicture.picture.addAPicture') }}
            </el-button>
          </div>
          <div class="right-buttons" style="padding-left: 20px;">
            <span class="line" style="display: block;"></span>
            <el-button class="right-btn" v-db-click size="mini" @click="reloadData" style="margin-right: 3px;height: 40px;margin-left: 4px">
              <svg-icon icon-class="refresh" style="margin-right: 0px"></svg-icon>
            </el-button>
          </div>
        </div>
      </div>
      <div style="overflow: auto">
        <u-table
          :data="tableData"
          :border="true"
          ref="tablePicture"
          stripe
          class="pictureTable"
          v-loading="loadingForm"
          element-loading-spinner="el-icon-loading"
          :element-loading-text="$t('website.atlasAndPicture.picture.loading')"
        >
<!--          <u-table-column-->
<!--            type="selection"-->
<!--            >-->
<!--          </u-table-column>-->
          <u-table-column
            prop="url"
            :label="$t('website.atlasAndPicture.picture.picture')"
          >
            <template slot-scope="scope">
              <div style="margin-top: 10px">
                <el-image
                  :alt="scope.row.name"
                  style="width: 100px; height: 100px"
                  :src="scope.row.url"
                  :preview-src-list="[scope.row.url]"
                  fit="fill"></el-image>
              </div>
            </template>
          </u-table-column>
          <u-table-column
            prop="description"
            :label="$t('website.atlasAndPicture.picture.pictureDescription')"
          >
            <template slot-scope="scope">
              <ellipsis  :value="scope.row.description" :length="15"></ellipsis>
            </template>
          </u-table-column>
          <u-table-column
            prop="effect"
            :label="$t('website.atlasAndPicture.picture.clickEffect')"
          >
            <template slot-scope="scope">
              {{scope.row.effect == '0' ?$t('website.atlasAndPicture.picture.not'):scope.row.effect == '1' ?$t('website.atlasAndPicture.picture.ViewEnlargedImage'):
              scope.row.effect == '2' ?$t('website.atlasAndPicture.picture.skipColumn'):scope.row.effect == '3' ?$t('website.atlasAndPicture.picture.OpenTheArticle'):
                scope.row.effect == '4' ?$t('website.atlasAndPicture.picture.customLink'):""}}
            </template>
          </u-table-column>
          <u-table-column
            prop="content"
            :label="$t('website.atlasAndPicture.picture.jumpPosition')"
          >
            <template slot-scope="scope">
              <ellipsis  :value="scope.row.content" :length="20"></ellipsis>
            </template>
          </u-table-column>
          <u-table-column
            prop="language"
            :label="$t('website.atlasAndPicture.picture.language')"

          >
            <template slot-scope="scope">
                {{languageFormat[scope.row.language]}}
            </template>
          </u-table-column>
          <u-table-column
            prop="sex"
            :label="$t('website.atlasAndPicture.picture.operation')"
          >
            <template  slot-scope='scope'>
              <div class="operation">
<!--                <el-link type="primary" :underline="false" @click="pictureDetail(scope)">详情</el-link>-->
                <el-link type="primary" :underline="false" @click="editPicture(scope)"  v-if="!disabled">{{ $t('website.atlasAndPicture.picture.edit') }}</el-link>
                <el-link type="primary" :underline="false"  v-if="!disabled" @click="delPicture(scope)">{{ $t('website.atlasAndPicture.picture.delete') }}</el-link>
              </div>
            </template>
          </u-table-column>
        </u-table>
<!--        分页-->
        <div>
          <div class="bottom-operate-right" v-if="total == 0" >
            <svg-icon icon-class="point" style="color: #e6a23c"></svg-icon>{{ $t('table.emptyText') }}
          </div>
          <el-pagination v-else small background :layout="pagination.layout"
                         :current-page="listQuery.current" :page-sizes="[20, 40, 60, 80, 100]"
                         :page-size="listQuery.size" :total="total"></el-pagination>
        </div>
      </div>
    </div>
    <atlas v-if="dialogDetailVisibleAtlas" @closeDialogAtlas='closeDialogAtlas' :atlasCode="atlasCode" @reload="reloadDataAtals" :eventCode="eventCode"></atlas>
    <picture-view ref="picture" v-if="dialogDetailVisiblePic" @closeDialog='handleCloseDialog' @reloadData="reloadData"
                 :atlasCode="atlasCode" :pictureItem="pictureItem" :disabled="picDisabled" :eventCode="eventCode"></picture-view>
  </div>
</template>
<script>
import atlas from './atlas'
import ellipsis from '@/components/frame/DragSelect/ellipsis'
import request from '@/utils/frame/base/request'
import { notifyError, notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
import pictureView from './pictureView'
import dictApi from '@/api/frame/base/sys/dict'
export default {
  name: 'atlasAndPicture',
  components: { pictureView ,ellipsis,atlas},
  data() {
    let that = this
    return {
      maxFileLen:0,
      eventCode:"",
      uploadLoading:false,
      uploadUrl:"",
      picDisabled:false,
      disabled:false,
      pictureItem:{},
      description:"",
      languageFormat:{},
      loadingWrap: false,
      atlasCode: '',//图册code
      headerTitle: '',
      dialogDetailVisibleAtlas:false,
      dialogDetailVisiblePic: false,
      loadingForm: false,
      total: 0,
      listQuery: {
        current: 1,
        size: 20,
        isPage: true,
        funcModule: '图册图片',
        funcOperation: '查询',
        data: {

        }
      },
      tableData: [],
      highlightCurrentRow: true,
      loading: false,
      atlasForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: that.$t("website.atlasAndPicture.picture.requireAtals") }
        ]
      },
      //分页
      pagination: {
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [20, 40, 60, 80, 100]
      }
    }
  },
  created() {
    if (this.$route.params.code) {
      this.atlasCode = this.$route.params.code
      this.eventCode=this.$route.params.eventCode
    } else {
      this.atlasCode = ''
      this.eventCode=''
    }
    // if(this.$route.query.isDisabled){
    //   this.disabled=true
    //   this.headerTitle = '图册详情'
    // }else{
    //   this.disabled=false
    // }
    this.headerTitle=this.$t('website.atlasAndPicture.picture.atlasDetails')
    //获取字典信息
    this.getItem()
  },
  mounted() {
    if (this.atlasCode) {
      //获取图册信息
      this.getAtlas()
    }
  },
  methods: {
    // 重置
    onReset() {
      this.description=""
      this.searchPicture()
    },
    //编辑图册信息后刷新
    reloadDataAtals(){
      this.getAtlas()
    },
    //删除
    delPicture(item){
      const h = this.$createElement;
      let that = this;
      this.$msgbox({
        title: this.$t("website.atlas.deletionConfirmation"),
        closeOnClickModal:false,
        message: h('p', null, [
          h('div', null, this.$t("website.atlasAndPicture.del.delPrompt")),
          h('div', { style: 'marginTop:10px' }, this.$t("website.atlasAndPicture.del.confirmDelete"))
        ]),
        showCancelButton: true,
        confirmButtonText:  this.$t('website.atlas.determine'),
        cancelButtonText:  this.$t('website.atlas.cancel'),
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = this.$t('website.atlas.deleting')+'...';
            let delId = item.row.id
            that.delRequest(instance,done,delId)
          } else {
            done();
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message:  this.$t('website.atlas.cancelDelete')
        });
      });
    },
    //删除请求
    delRequest(instance,done,delId){
      let that = this;
      request({
        url: '/api/cms/atlasDetail/remove',
        method: 'POST',
        data: {
          data:delId,
          funcModule:"删除图片",
          funcOperation:"删除"
        }
      }).then((res) => {
        done()
        that.$notify(notifySuccess({ msg: that.$t("website.atlasAndPicture.del.delSuccess") }))
        that.searchPicture()
      }).catch(() => {

      }).finally(() => {
        instance.confirmButtonLoading=false
      })
    },
    //批量上传
    handleChange(file, fileList){
     let currLengh=fileList.length;
     this.maxFileLen=Math.max(currLengh,this.maxFileLen);
     setTimeout(()=>{
        if(currLengh != this.maxFileLen) return
        this.requestUpload(fileList)
     })
    },
    //自定义上传图片
    requestUpload(fileList) {
      let formData = new FormData()
      formData.append('atlasCode', this.atlasCode) // 额外参数
      fileList.forEach((item)=>{
        formData.append('file',item.raw)
      })
      let loading_ = this.$loading({
        lock: true,
        text: '上传中，请稍候...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.uploadLoading=true
      let that = this
      request({
        url: '/api/cms/atlasDetail/saveBatch',
        method: 'POST',
        data: formData
      }).then((res) => {
        that.$notify(notifySuccess({ msg: that.$t('website.pictureView.add.batchUpload') }))
        that.searchPicture()
      }).catch(() => {

      }).finally(() => {
        loading_.close()
        that.uploadLoading=false
      })
    },
    //编辑图册信息
    editAtlas(){
      this.dialogDetailVisibleAtlas = true
    },
    //关闭编辑图册页面
    closeDialogAtlas(){
      this.dialogDetailVisibleAtlas = false
    },
    //获取字典
    getItem() {
      dictApi.dictItem('LANGUAGE_TYPE', {
        'funcModule': '语种',
        'funcOperation': '查询'
      }).then(response => {
        let data = response.data;
        this.languageFormat={}
        data.forEach((item)=>{
          this.languageFormat[item.dictItemVal]=item.dictItemName
        })
      })
    },
    //返回
    goBack() {
      this.$router.push({
        name:"atlasManagement"
      })
    },
    //获取图册信息
    getAtlas() {
      //获取图册信息
      this.loadingWrap = true
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
        //初始化数据
        that.searchPicture()
      }).catch(() => {
        this.loadingWrap = false
        this.tableData = []
        this.atlasForm = {}
      }).finally(() => {

      })
    },
    //刷新列表数据
    reloadData() {
      this.searchPicture()
    },
    //关闭新增接口
    handleCloseDialog() {
      this.pictureItem={}
      this.picDisabled=false
      this.dialogDetailVisiblePic = false
    },
    //保存
    saveAtlas() {
      this.$refs.atlasForm.validate((valid) => {
        if (valid) {
          this.loading = true
          let url = ''
          let funcOperation = ''
          let data = this.atlasForm
          if (this.atlasCode) {
            url = '/api/cms/atlas/update'
            funcOperation = '更改'
            data.atlasCode = this.atlasCode
            // data.id = this.id
          } else {
            url = '/api/cms/atlas/save'
            funcOperation = '新增'
          }
          request({
            url: url,
            method: 'POST',
            data: {
              funcModule: '图册表',
              funcOperation: funcOperation,
              data: data
            }
          }).then((res) => {
            this.$notify(notifySuccess({ msg: this.$t('website.atlasAndPicture.picture.saveSuccess') }))
            if(res.data.code){
              this.atlasCode=res.data.code
              this.searchPicture()
            }
          }).finally(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    //查询图册图片
    searchPicture() {
        this.loadingForm = true
        this.listQuery.data.atlasCode = this.atlasCode
        this.listQuery.data.description = this.description
        let that = this
        request({
          url: '/api/cms/atlasDetail/page',
          method: 'POST',
          data: this.listQuery
        }).then((res) => {
          that.total = res.total
          that.tableData = res.data
        }).catch(() => {
          that.total = 0
          that.tableData = []
        }).finally(() => {
          this.loadingForm = false
          this.loadingWrap = false
        })

    },
    addPicture() {
      this.dialogDetailVisiblePic = true
    },
    pictureDetail(item){
      this.picDisabled=true
      this.pictureItem=item.row;
      this.dialogDetailVisiblePic = true
    },
    editPicture(item){
      this.pictureItem=item.row;
      this.dialogDetailVisiblePic = true
    },
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

.searchWrap {
  display: flex;
}

>>> .atlas .el-form-item__content {
  margin-left: 0px !important;
}

>>> .atlas .el-form-item {
  padding-bottom: 15px;
}

.atlasOperation {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

>>> .bs-new-container .el-table {
  border: 1px solid #EBEEF5 !important;
}

>>> .el-table {
  border-color: #EBEEF5 !important;
  border: 1px solid #EBEEF5 !important;
  border-right: none!important;
}


  /*页头*/
.pageHeader {
  padding-bottom: 10px;
}

>>> .pageHeader .el-page-header__content {
  font-size: 16px !important;
}
/*操作样式*/
.operationButton{
  display: flex!important;
  gap: 12px!important;
}
>>> .plTableBox .el-table .cell{
  min-height: 32px!important;
  height: auto!important;
}
/*分割线*/
.dividerLine{
  margin: 0px 0px 15px 0!important;
}
.uploadButton{
  margin-top: 3px;
}
/*重置*/
  .reset{
    height: 32px;
    padding: 8px 15px!important;
    font-size: 14px;
    border-radius: 3px;
  }
  /*label显示省略号*/
>>>.el-form-item__label{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.bottom-operate-right{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
}
</style>
<style scoped lang="scss">
.uploadButton:hover,.reset:hover{
  border-color: var(--menuBg)!important;
  background: var(--menuBg)!important;
  color: var(--btnFontColor)!important;
  fill: var(--btnFontColor)!important;
}
.uploadButton:focus, .uploadButton:hover ,.reset:focus,.reset:hover{
   background-color: #FFF;
   color: #606266;
   border-color: #DCDFE6
}

.top-operate {
  width: 100% !important;
  height: 40px;
  .left-title {
    border-left: 4px solid #1890ff;
    font-size: 16px;
    font-weight: 600;
    color: #262626;
    padding-left: 10px;
  }
  .right-buttons {
    // width: 100px;
    height: 40px;
    position: relative;
    padding-left: 36px;
    & > .right-btn {
      display: inline-block;
      margin: 0 8px;
    }
    & > .el-button {
      border: none;
      svg {
        width: 16px;
        height: 16px;
      }
    }
    & > .el-button:hover {
      background: transparent !important;
      .svg-icon {
        color: #606266 !important;
      }
    }
    .line {
      width: 1px;
      height: 20px;
      background: #ccc;
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
</style>
