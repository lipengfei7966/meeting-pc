<template>
  <div class="bs-new-container app-container" v-loading="loading" element-loading-text="保存中">
    <div class="atlas">
      <el-form ref="atlasForm" :model="atlasForm" label-width="120px" label-position="right" class="formWrap"
               :rules="rules">
        <el-form-item label="图册名称：" prop="name">
          <el-input v-model="atlasForm.name"></el-input>
        </el-form-item>
        <el-form-item label="图册描述：">
          <el-input
            type="textarea"
            :rows="3"
            v-model="atlasForm.description">
          </el-input>
        </el-form-item>
      </el-form>
      <div class="atlasOperation">
        <el-button type="primary" @click="saveAtlas">保存</el-button>
      </div>
    </div>
    <div class="atlas">
      <div class="searchWrap">
        <el-form ref="pictureForm" :model="atlasForm" label-width="130px" label-position="right" class="formWrap" style="width: 50%">
          <el-form-item label="图片信息：">
            <el-input v-model="atlasForm.description" style="width: 40%" placeholder="请输入关键词搜索图片描述"></el-input>
          </el-form-item>
        </el-form>
        <div class="atlasOperation" style="width: 50%">
          <el-button type="primary" @click="searchPicture">查询</el-button>
          <el-button type="primary" @click="addPicture">新建</el-button>
        </div>
      </div>
      <div style="overflow: auto">
        <u-table
          :data="tableData"
          :border="true"
          stripe
          v-loading="loadingForm"
          element-loading-spinner="el-icon-loading"
          element-loading-text="加载中"
        >
          <u-table-column
            type="selection"
            width="55">
          </u-table-column>
          <u-table-column
            prop="sex"
            label="图片"
           >
          </u-table-column>
          <u-table-column
            prop="sex"
            label="图片描述"
            >
          </u-table-column>
          <u-table-column
            prop="sex"
            label="点击效果"
          >
          </u-table-column>
          <u-table-column
            prop="sex"
            label="跳转位置"
          >
          </u-table-column>
          <u-table-column
            prop="sex"
            label="语言"
          >
          </u-table-column>
          <u-table-column
            prop="sex"
            label="操作"
          >
          </u-table-column>
        </u-table>
        <div>
          <el-pagination v-if="pagination" small background :layout="pagination.layout" :current-page="listQuery.current" :page-sizes="[20, 40, 60, 80, 100]" :page-size="listQuery.size" :total="total"> </el-pagination>
        </div>
      </div>
    </div>
    <add-picture ref="addPicture"  v-if="dialogDetailVisible"  @closeDialog='handleCloseDialog'></add-picture>

  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import { notifyError, notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
import addPicture from './addPicture'
import AddPicture from './addPicture'
export default {
  name: 'atlasAdd',
  components: { AddPicture },
  componenst:{
    addPicture
  },
  data() {
    return {
      dialogDetailVisible:false,
      loadingForm:false,
      total: 0,
      listQuery:{
        current: 1,
        size: 20,
        isPage: true,
        funcModule: "图册图片",
        funcOperation: "查询"
      },
      tableData:[{
        sex:"女"
      }],
      highlightCurrentRow: true,
      code: '',
      loading: false,
      atlasForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入图册名称' }
        ]
      },
      //分页
      pagination: {
        layout: 'total, sizes, prev, pager, next, jumper',
        pageSizes: [20, 40, 60, 80, 100]
      }
    }
  },
  methods: {
    //关闭新增接口
    handleCloseDialog(){
       this.dialogDetailVisible=false
    },
    handleHeaderClass({ column }) {
      let result = this.ordersList.find(e => e.prop === column.property)

      if (result) {
        column.order = result.order
      }
    },
    //保存
    saveAtlas() {
      this.$notify(notifySuccess({ msg: '保存成功' }))
      this.$refs.atlasForm.validate((valid) => {
        if (valid) {
          this.loading = true
          let url = ''
          let funcOperation = ''
          let data = this.atlasForm
          if (this.code) {
            url = '/api/cms/atlas/update'
            funcOperation = '更改'
            data.code = this.code
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
            this.$notify(notifySuccess({ msg: '保存成功' }))
          }).finally(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    checkHaveAtlas(){
      if(!this.code){ // 无code 需要保存图册信息
        this.$message({
          message: '请先保存图册信息',
          type: 'warning'
        });
        return false
      }else {
        return true
      }
    },
    //查询图册图片
    searchPicture(){
      if(this.checkHaveAtlas()){
        this.loadingForm = true
        this.listQuery.data.atlasCode=this.code
        this.listQuery.data.description=this.description
        request({
          url: "/api/cms/atlasDetail/page",
          method: 'POST',
           data: this.listQuery
        }).then((res) => {
          this.$notify(notifySuccess({ msg: '保存成功' }))
        }).finally(() => {
          this.loadingForm = false
        })
      }
    },
    addPicture(){

      if(this.code){ // 无code 需要保存图册信息
        this.$message({
          message: '请先保存图册信息',
          type: 'warning'
        });
        return
      }else{ //弹出框
        this.dialogDetailVisible=true
      }
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
.searchWrap{
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
>>>.bs-new-container .el-table{
  border: 1px solid #EBEEF5!important;
}
>>>.el-table{
  border-color: #EBEEF5!important;
  border: 1px solid #EBEEF5!important;
}
</style>
