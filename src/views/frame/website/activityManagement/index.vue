<template>
  <div>
    <div class="headerSearch">
      <div style="display: flex;margin-left: 18px;">
        <div style="width:200px;display: flex;">
          <div class="meeting-name">
            会议名称
          </div>
          <div>
            <el-select style="width:120px" size="mini" v-model="moduleVal.eventCode" @change="eventChange" placeholder="会议名称">
              <el-option v-for="(item,index) in activityList" :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <span class="sp_one">参会人是否可参加多项分活动：</span>
          <el-radio-group v-model="moduleVal.radio_">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">单人最多参与 <span>
                <el-input style="width: 26%" size="mini" v-model="moduleVal.inputNum"></el-input>
              </span> 次</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!--  -->
      <div style="display: flex; align-items: center">
        <div style="width: 90%">
          <el-form style="margin-top: 15px" :model="moduleVal" ref="form" label-width="100px">
            <el-col :span="5">
              <el-form-item label="分活动名称">
                <el-input size="mini" v-model="moduleVal.name" clearable=true></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="活动时间">
                <el-date-picker style="width: 100%" size="mini" v-model="moduleVal.activityTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="活动状态">
                <el-select size="mini" v-model="moduleVal.activityState" placeholder="活动状态" clearable=true>
                  <el-option label="状态一" value="shanghai"></el-option>
                  <el-option label="状态二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="启用状态">
                <el-select size="mini" v-model="moduleVal.isGoLive" placeholder="启用状态" clearable=true>
                <el-option v-for="item in $t('datadict.usingFlag')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div style="width: 20%; display: flex; justify-content: right">
          <el-button type="primary" @click="searchSubmit">筛选</el-button>
          <el-button type="primary" @click="addSubmit">新建</el-button>
        </div>
      </div>
    </div>
    <div class="contentBody bs-new-container app-container">
      <el-table :data="tableData" stripe style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column prop="name" label="分活动名称" width="180"> </el-table-column>
        <el-table-column prop="beginTime,endTime" label="活动时间" width="360">
          <template slot-scope="scope">
            {{scope.row.beginTime}}-{{scope.row.endTime}}
          </template>
        </el-table-column>
        <el-table-column prop="beginTime,endTime" label="活动状态">
          <template slot-scope="scope">
            <span v-if="new Date(scope.row.beginTime) > new Date()">未开始</span>
            <span v-else-if="new Date(scope.row.endTime) < new Date()">已结束</span>
            <span v-else>进行中</span>
          </template> 
        </el-table-column>
        <el-table-column prop="isGoLive" label="启用">
          <template slot-scope="scope">
            <span>
              <el-switch v-model="scope.row.isGoLive==='1'?true:false" active-color="#13ce66" inactive-color="#ff4949" @change="isGoLiveChange(scope.row.code)"> </el-switch>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="eee" label="报名人数/上限"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="background-color: white; width: 100%; height: 52px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"> </el-pagination>
      </div>
    </div>
    <div>
      <el-dialog destroy-on-close title="分活动管理" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-form-item label="分活动名称" prop="name">
              <el-input style="width: 500px" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动时间" prop="date1">
              <el-date-picker style="width: 500px" size="mini" v-model="ruleForm.date1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="参加人数限制" prop="radio_">
              <el-radio-group v-model="ruleForm.radio_">
                <el-radio :label="0">不限制</el-radio>
                <el-radio :label="1">单人最多参与 <span>
                    <el-input :disabled="ruleForm.radio_ == 0" style="width: 26%" size="mini" v-model="ruleForm.inputNum" type="number" :min="0"></el-input>
                  </span> 次</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="分活动描述" prop="desc">
              <el-input style="width: 500px" type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  name: 'activityManagement',
  data() {
    return {
      dialogVisible: false,
      moduleVal: {
        eventCode: '',
        radio_: 0,
        // 单人最多参与人次
        inputNum: '',
        // 活动名称
        activityName: '',
        // 活动时间
        activityTime: '',
        // 活动状态
        activityState: '',
        // 启用状态
        isGoLive: ''
      },
      tableData: [
      ],
      ruleForm: {
        eventCode: '',
        name: '',
        region: '',
        date1: '',
        beginTime: '',
        endTime: '',
        triesLimit: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        radio_:0,
        inputNum:''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        date2: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
        type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
        resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
        desc: [{ required: true, message: '请填写分活动描述', trigger: 'blur' }],
        radio_: [{ required: true, message: '请填参加人数限制', trigger: 'blur' }],
      },
      currentPage4: 4,
      activityList:[]//会议名称list
    }
  },
  methods: {
    searchSubmit() {
      console.log('searchSubmit')
      request({
        url: '/api/register/cmsEventInfoChildren/page',
        method: 'POST',
        data: { data: this.moduleVal, funcModule: '分活动管理', funcOperation: '获取分活动列表' }
      }).then(res => {
        // debugger
        this.tableData = res.data
      })
    },
    addSubmit() {
      this.dialogVisible = true
      console.log('addSubmit')
    },
    handleCurrentChange(val) {
      console.log(val)
    },
    handleClose(done) {
      done()
    },
    submitForm(formName) {
      debugger
      //this.$refs[formName].validate((valid) => {
      //  if (valid) {
          this.ruleForm.eventCode = this.moduleVal.eventCode
          this.ruleForm.beginTime = this.ruleForm.date1[0]
          this.ruleForm.endTime = this.ruleForm.date1[1]
          request({
            url: '/api/register/cmsEventInfoChildren/save',
            method: 'POST',
            data: { data: this.ruleForm, funcModule: '分活动管理', funcOperation: '获取分活动列表' }
          }).then(res => {
            if (res && res.status) {
              this.dialogVisible = false
              this.$notify(
                notifySuccess({ msg: this.$t('biz.msg.saveSuccess') })
              )
            }else{
              this.$notify(
                notifyError({ msg: res.msgText })
              )
            }
          })
          
      //  } else {
      //    console.log('error submit!!')
      //    return false
      //  }
     // })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    getList(){
      request({
        url: '/api/dd/selectData/list',
        method: 'POST',
        data: { data: {
          queryParams: {},
          type: "EVENT_INFO"
        },
         funcModule: '分活动管理', funcOperation: '查询' }
      })
      .then((res) => {
      //  debugger
        console.log(res)
        this.activityList = res.data
        this.moduleVal.eventCode = res.data[0].code
        this.searchSubmit()
      })
    },
    eventChange(val){
      this.searchSubmit()
    },
    isGoLiveChange(val){
      request({
        url: '/api/register/cmsEventInfoChildren/isGoLive',
        method: 'POST',
        data: { data: val, funcModule: '分活动管理', funcOperation: '启用停用' }
      }).then(res => {
        // debugger
        this.searchSubmit()
      })
    }
  },
  created(){
    this.getList()
  }
}
</script>

<style lang="scss">
.headerSearch {
  width: auto;
  min-height: 58px;
  // display: flex;
  // line-height: 58px;
  background: white;
  margin: 10px;
  padding: 10px 10px 5px;
  .sp_one {
    font-size: 14px;
    color: #333333;
    margin-right: 30px;
    margin-left: 19px;
  }
}
.el-date-editor .el-range-separator {
  width: 34px;
}
.el-col-2 {
  width: 8.33333%;
  text-align: center;
}
.meeting-name {
  width: 125px;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  color: #606266;
}
</style>