<template>
  <div>
    <div class="headerSearch">
      <div style="display: flex;margin-left: 18px;">
        <div style="width:200px;display: flex;">
          <div class="meeting-name">
            会议名称
          </div>
          <div>
            <el-select filterable style="width:120px" size="mini" v-model="moduleVal.eventCode" @change="eventChange" placeholder="会议名称">
              <el-option v-for="(item,index) in activityList" :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <span class="sp_one">参会人是否可参加多项分活动：</span>
          <el-radio-group @input="triesLimitRadio" v-model="moduleVal.triesLimit">
            <el-radio :label="0">不限制</el-radio>
            <el-radio :label="1">单人最多参与 <span>
                <el-input @blur="limitBlur" style="width: 26%" size="mini" :disabled="moduleVal.triesLimit == 0" clearable v-model="moduleVal.inputNum"></el-input>
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
                <el-input clearable size="mini" v-model="moduleVal.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="活动时间">
                <el-date-picker value-format="yyyyMMdd" style="width: 100%" size="mini" clearable v-model="moduleVal.activityTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="活动状态">
                <el-select multiple size="mini" clearable v-model="moduleVal.status" placeholder="活动状态">
                  <el-option label="未开始" value="notStart"></el-option>
                  <el-option label="进行中" value="haveInHand"></el-option>
                  <el-option label="已结束" value="end"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="启用状态">
                <el-select size="mini" clearable v-model="moduleVal.isGoLive" placeholder="启用状态">
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
      <el-table :data="tableData" stripe style="width: 100%">
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
        <el-table-column prop="triesLimit" label="报名人数/上限">
          <template slot-scope="scope">
            <div v-if="scope.row.triesLimit>0">
              <span>无<span>/{{scope.row.triesLimit}}</span> </span>
              <span style="margin:0px 4px">|</span>
              <el-button type="text" size="small">查看</el-button>
            </div>
            <div v-else-if=" scope.row.triesLimit==0">不限</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row,0)" type="text" size="small">查看</el-button>
            <el-button @click="handleClick(scope.row,1)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="background-color: white; width: 100%; height: 52px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pages" :page-sizes="[20, 40,60, 80,100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
      </div>
    </div>
    <div>
      <el-dialog destroy-on-close :title="handleTitle" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-form-item label="分活动名称" prop="name">
              <el-input placeholder="请输入分活动名称" :disabled="disabled_look" style="width: 500px" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动时间" prop="date1">
              <el-date-picker :disabled="disabled_look" style="width: 500px" size="mini" v-model="ruleForm.date1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="参加人数限制" prop="triesLimit">
              <el-radio-group :disabled="disabled_look" v-model="ruleForm.triesLimit">
                <el-radio :label="0">不限制</el-radio>
                <el-radio :label="1">活动最多允许 <span>
                    <el-input :disabled="ruleForm.triesLimit == 0 || btnName == '确定'" style="width: 26%" size="mini" v-model="ruleForm.inputNum" type="number" :min="0" @input="numChange"></el-input>
                  </span> 人参与</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="分活动描述" prop="describeInfo">
              <el-input placeholder="请输入分活动描述" :disabled="disabled_look" style="width: 500px" type="textarea" v-model="ruleForm.describeInfo"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">{{btnName}}</el-button>
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
      handleTitle:'新建分活动',
      dialogVisible: false,
      moduleVal: {
        eventCode: '',
        triesLimit: 0,
        // 单人最多参与人次
        inputNum: '',
        // 活动名称
        activityName: '',
        // 活动时间
        activityTime: '',
        // 活动状态
        status: [],
        // 启用状态
        isGoLive: '',
        beginTime:'',
        endTime:''
      },
      tableData: [],
      ruleForm: {
        eventCode: '',
        name: '',
        region: '',
        date1: [],
        beginTime: '',
        endTime: '',
        delivery: false,
        type: [],
        resource: '',
        describeInfo: '',
        triesLimit: 0,
        inputNum: 0
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        date1: [{ required: true, message: '请选择日期', trigger: 'change' }],
        type: [{ required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
        resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
        // describeInfo: [{ required: true, message: '请填写分活动描述', trigger: 'blur' }],
        triesLimit: [{ required: true, message: '请填参加人数限制', trigger: 'blur' }]
      },
      activityList: [], //会议名称list
      pages: 1,
      size: 20,
      total: 0,
      btnName: '立即创建',
      disabled_look: false
    }
  },
  methods: {
    searchSubmit() {
      // debugger
      console.log('searchSubmit',this.moduleVal)
      // this.modelValue.beginTime = this.modelValue.activityTime[0]
      // this.modelValue.endTime = this.modelValue.activityTime[1]
      if(this.moduleVal.status){
        this.moduleVal.status = this.moduleVal.status.join(',')
        // debugger
      }
      if(this.moduleVal.activityTime !=null && this.moduleVal.activityTime.length>0){
          this.moduleVal.beginTime = this.moduleVal.activityTime[0]
          this.moduleVal.endTime = this.moduleVal.activityTime[1]
        }
        if(this.moduleVal.activityTime == null){
          this.moduleVal.beginTime = ''
          this.moduleVal.endTime = ''
        }
        // if(this.moduleVal.triesLimit == 1){
        //   this.moduleVal.triesLimit = this.moduleVal.inputNum
        // }
      request({
        url: '/api/register/cmsEventInfoChildren/page',
        method: 'POST',
        data: { data: this.moduleVal, isPage: true, current: this.pages, size: this.size, funcModule: '分活动管理', funcOperation: '获取分活动列表' }
      }).then(res => {
        // debugger
        if(this.moduleVal.status.length>0){
          this.moduleVal.status = this.moduleVal.status.split(',')
        }
        // if(this.moduleVal.triesLimit != 0){
        //   this.moduleVal.triesLimit = 1
        // }
        this.total = res.total
        // this.pages = res.page
        this.size = res.size
        this.tableData = res.data
      })
    },
    addSubmit() {
      this.btnName = '立即创建'
      this.handleTitle = '新建分活动'
      this.dialogVisible = true
      this.disabled_look = false
      ;(this.ruleForm = {
        eventCode: '',
        name: '',
        region: '',
        date1: [],
        beginTime: '',
        endTime: '',
        delivery: false,
        type: [],
        resource: '',
        describeInfo: '',
        triesLimit: 0,
        inputNum: 0
      }),
        console.log('addSubmit')
    },
    handleClose(done) {
      done()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.btnName == '修改') {
        if (this.ruleForm.triesLimit == 1) {
          // inputNum
          debugger
          this.ruleForm.triesLimit = this.ruleForm.inputNum
        }
        this.ruleForm.eventCode = this.moduleVal.eventCode
        this.ruleForm.beginTime = this.ruleForm.date1[0]
        this.ruleForm.endTime = this.ruleForm.date1[1]
        request({
          url: '/api/register/cmsEventInfoChildren/update',
          method: 'POST',
          data: { data: this.ruleForm, funcModule: '分活动管理修改', funcOperation: '分活动管理修改' }
        }).then(res => {
          if (res && res.status) {
            this.dialogVisible = false
            this.$message.success('修改成功')
            this.searchSubmit()
          } else {
            this.$message.error('修改失败')
          }
        })
      } else if (this.btnName == '立即创建') {
        if (this.ruleForm.triesLimit == 1) {
          // inputNum
          debugger
          this.ruleForm.triesLimit = this.ruleForm.inputNum
        }
        this.ruleForm.eventCode = this.moduleVal.eventCode
        this.ruleForm.beginTime = this.ruleForm.date1[0]
        this.ruleForm.endTime = this.ruleForm.date1[1]
        request({
          url: '/api/register/cmsEventInfoChildren/save',
          method: 'POST',
          data: { data: this.ruleForm, funcModule: '分活动管理新增', funcOperation: '分活动管理新增' }
        }).then(res => {
          if (res && res.status) {
            this.dialogVisible = false
            this.$message.success('新增成功')
            this.searchSubmit()
          } else {
            this.$message.error('新增失败')
          }
        })
      } else {
        this.dialogVisible = false
      }
          } else {
            // debugger
            return false;
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.size = val
      this.searchSubmit()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pages = val
      this.searchSubmit()
    },
    getList() {
      request({
        url: '/api/dd/selectData/list',
        method: 'POST',
        data: {
          data: {
            queryParams: {},
            type: 'EVENT_INFO'
          },
          funcModule: '分活动管理',
          funcOperation: '查询'
        }
      }).then(res => {
        //  debugger
        console.log(res)
        this.activityList = res.data
        this.moduleVal.eventCode = res.data[0].code
        if(res.data[0].data.triesLimit){
          this.moduleVal.triesLimit = 1
          this.moduleVal.inputNum = res.data[0].data.triesLimit
        }
        // hkz
        this.searchSubmit()
      })
    },
    eventChange(val) {
      this.activityList.forEach(item=>{
        if(item.code == val){
          if(item.data.triesLimit){
          this.moduleVal.triesLimit = 1
          this.moduleVal.inputNum = item.data.triesLimit
        }else{
          this.moduleVal.triesLimit = 0
          this.moduleVal.inputNum = ''
        }
        }
      })
      this.searchSubmit()
    },
    isGoLiveChange(val) {
      request({
        url: '/api/register/cmsEventInfoChildren/isGoLive',
        method: 'POST',
        data: { data: val, funcModule: '分活动管理', funcOperation: '启用停用' }
      }).then(res => {
        // debugger
        this.searchSubmit()
      })
    },
    handleClick(item, type) {
      if (type == 0) {
        //查看
        this.disabled_look = true
        this.btnName = '确定'
      this.handleTitle = '查看分活动'
        this.getEdit(item.code)
      } else {
        // 编辑
        this.disabled_look = false
        this.btnName = '修改'
      this.handleTitle = '修改分活动'
        this.getEdit(item.code)
      }
    },
    handleDel(item) {
      this.$confirm('是否删除当前数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          request({
            url: '/api/register/cmsEventInfoChildren/remove',
            method: 'POST',
            data: { data: item.code, funcModule: '分活动管理删除', funcOperation: '分活动管理删除' }
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.searchSubmit()
            } else {
              this.$message({
                type: 'info',
                message: '删除失败'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getEdit(code) {
      request({
        url: '/api/register/cmsEventInfoChildren/get',
        method: 'POST',
        data: { data: code, funcModule: '分活动管理修改', funcOperation: '分活动管理修改' }
      }).then(res => {
        // debugger
        this.ruleForm = res.data
        this.ruleForm.date1 = [this.ruleForm.beginTime, this.ruleForm.endTime]
        if (this.ruleForm.triesLimit > 0) {
          this.ruleForm.inputNum = this.ruleForm.triesLimit
          this.ruleForm.triesLimit = 1
        }
        this.dialogVisible = true
        console.log(res)
      })
    },
    triesLimitRadio(val){
      if(val == 0){
        request({
        url: '/api/biz/cmsEventInfo/updateTriesLimit',
        method: 'POST',
        data: { data: {triesLimit:val,code:this.moduleVal.eventCode}, funcModule: '分活动人数限制', funcOperation: '分活动人数限制' }
      }).then(res => {
        this.$message({
                type: 'success',
                message: '保存成功!'
              })
      })
      this.moduleVal.inputNum = ''
      }
    },
    limitBlur(val){
      request({
        url: '/api/biz/cmsEventInfo/updateTriesLimit',
        method: 'POST',
        data: { data: {triesLimit:this.moduleVal.inputNum,code:this.moduleVal.eventCode}, funcModule: '分活动人数限制', funcOperation: '分活动人数限制' }
      }).then(res => {
        this.$message({
                type: 'success',
                message: '保存成功!'
              })
      })
    },
    numChange(){
      this.ruleForm.describeInfo += '.卐.'
      let str = new RegExp(".卐.","g")
      var str_one = this.ruleForm.describeInfo.replace(str,"");
      this.ruleForm.describeInfo = str_one
    }
  },
  created() {
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