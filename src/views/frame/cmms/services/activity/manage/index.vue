<template>
  <div>
    <div class="headerSearch">
      <div style="display: flex;margin-left: 18px;">
        <div class="meeting-name_box" style="display: flex;">
          <div class="meeting-name">
            {{$t('sub.meetingName')}}
          </div>
          <div>
            <el-select filterable style="width:120px" size="mini" v-model="moduleVal.eventCode" @change="eventChange" :placeholder="$t('sub.meetingName')">
              <el-option v-for="(item,index) in activityList" :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </div>
        </div>
        <div style="margin-left: 19px;">
          <span class="sp_one">{{$t('sub.askSelection')}}:</span>
          <el-radio-group @input="triesLimitRadio" v-model="moduleVal.triesLimit">
            <el-radio :label="0">{{$t('sub.unlimited')}}</el-radio>
            <el-radio :label="1">{{$t('sub.optionalMaximum')}} <span>
                <el-input @blur="limitBlur" style="width: 26%" size="mini" :disabled="moduleVal.triesLimit == 0" clearable v-model="moduleVal.inputNum"></el-input>
              </span> {{$t('sub.second')}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <!--  -->
      <div style="display: flex; align-items: center">
        <div style="width: 90%">
          <el-form style="margin-top: 15px" :model="moduleVal" ref="form" label-width="100px" class="form_data">
            <el-col :span="5">
              <el-form-item :label="$t('sub.subActivityName')">
                <el-input clearable size="mini" v-model="moduleVal.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item :label="$t('sub.activityTime')">
                <el-date-picker value-format="yyyyMMdd" style="width: 100%" size="mini" clearable v-model="moduleVal.activityTime" type="datetimerange" :range-separator="$t('sub.to')" :start-placeholder="$t('sub.startDate')" :end-placeholder="$t('sub.endDate')"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('sub.activityStatus')">
                <el-select multiple size="mini" clearable v-model="moduleVal.status" :placeholder="$t('sub.activityStatus')">
                  <el-option label="未开始" value="notStart"></el-option>
                  <el-option label="进行中" value="haveInHand"></el-option>
                  <el-option label="已结束" value="end"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('sub.enableStatus')">
                <el-select size="mini" clearable v-model="moduleVal.isGoLive" :placeholder="$t('sub.enableStatus')">
                  <el-option v-for="item in $t('datadict.usingFlag')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div style="width: 20%; display: flex; justify-content: right">
          <el-button type="primary" @click="searchSubmit">{{$t('sub.btns.screen')}}</el-button>
          <el-button type="primary" @click="addSubmit">{{$t('sub.btns.newlyBuild')}}</el-button>
        </div>
      </div>
    </div>
    <div class="contentBody bs-new-container app-container">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" :label="$t('sub.column.subActivityName')" width="180"> </el-table-column>
        <el-table-column prop="beginTime,endTime" :label="$t('sub.column.activityTime')" width="360">
          <template slot-scope="scope">
            {{scope.row.beginTime}}-{{scope.row.endTime}}
          </template>
        </el-table-column>
        <el-table-column prop="beginTime,endTime" :label="$t('sub.column.activityStatus')">
          <template slot-scope="scope">
            <span v-if="new Date(scope.row.beginTime) > new Date()">{{$t('sub.tableTxt.notStart')}}</span>
            <span v-else-if="new Date(scope.row.endTime) < new Date()">{{$t('sub.tableTxt.end')}}</span>
            <span v-else>{{$t('sub.tableTxt.progress')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isGoLive" :label="$t('sub.column.enable')">
          <template slot-scope="scope">
            <span>
              <el-switch v-model="scope.row.isGoLive==='1'?true:false" active-color="#13ce66" inactive-color="#ff4949" @change="isGoLiveChange(scope.row.code)"> </el-switch>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="triesLimit" :label="$t('sub.column.applicantNum')">
          <template slot-scope="scope">
            <div v-if="scope.row.triesLimit>0">
              <span>{{$t('sub.dialogTxt.none')}}<span>/{{scope.row.triesLimit}}</span> </span>
              <span style="margin:0px 4px">|</span>
              <el-button type="text" size="small">{{$t('biz.btn.view')}}</el-button>
            </div>
            <div v-else-if=" scope.row.triesLimit==0">{{$t('sub.dialogTxt.unlimited')}}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('sub.column.operation')" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row,0)" type="text" size="small">{{$t('biz.btn.view')}}</el-button>
            <el-button @click="handleClick(scope.row,1)" type="text" size="small">{{$t('biz.btn.edit')}}</el-button>
            <el-button @click="handleDel(scope.row)" type="text" size="small">{{$t('biz.btn.delete')}}</el-button>
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
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item :label="$t('sub.subActivityName')" prop="name">
              <el-input :placeholder="$t('sub.dialogTxt.subActivityNamePH')" :disabled="disabled_look" style="width: 500px" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('sub.activityTime')" prop="date1">
              <el-date-picker :disabled="disabled_look" style="width: 500px" size="mini" v-model="ruleForm.date1" type="datetimerange" :range-separator="$t('sub.to')" :start-placeholder="$t('sub.startDate')" :end-placeholder="$t('sub.endDate')"></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('sub.dialogTxt.participantsNumLimit')" prop="triesLimit">
              <el-radio-group :disabled="disabled_look" v-model="ruleForm.triesLimit">
                <el-radio :label="0">{{$t('sub.unlimited')}}</el-radio>
                <el-radio :label="1">{{$t('sub.dialogTxt.participantsMax')}} <span>
                    <el-input :disabled="ruleForm.triesLimit == 0 || btnName == '确定'" style="width: 26%" size="mini" v-model="ruleForm.inputNum" type="number" :min="0" @input="numChange"></el-input>
                  </span> {{$t('sub.dialogTxt.participation')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('sub.dialogTxt.subDescription')" prop="describeInfo">
              <el-input :placeholder="$t('sub.dialogTxt.subDescriptionPH')" :disabled="disabled_look" style="width: 500px" type="textarea" v-model="ruleForm.describeInfo"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ $t('table.cancel') }}</el-button>
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
      getNum:0,
      handleTitle:this.$t('sub.dialogTxt.newSubActivity'),
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
        name: [{ required: true, message: this.$t('sub.msg.noEnteredMsg'), trigger: 'blur' }],
        region: [{ required: true, message:  this.$t('sub.msg.noSelectedMsg'), trigger: 'change' }],
        date1: [{ required: true, message:  this.$t('sub.msg.noDateMsg'), trigger: 'change' }],
        type: [{ required: true, message:  this.$t('sub.msg.noChooseMsg'), trigger: 'change' }],
        resource: [{ required: true, message:  this.$t('sub.msg.noResourceMsg'), trigger: 'change' }],
        // describeInfo: [{ required: true, message:  this.$t('sub.msg.noDescribeMsg'), trigger: 'blur' }],
        triesLimit: [{ required: true, message:  this.$t('sub.msg.nolimitMsg'), trigger: 'blur' }]
      },
      activityList: [], //会议名称list
      pages: 1,
      size: 20,
      total: 0,
      btnName: this.$t('sub.btns.createImmediately'),
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
        if(this.$route.params.code){
          this.tableData.forEach(item=>{
            if(item.id == this.$route.params.code){
              if(this.getNum == 3){
                this.handleClick(item,1)
                this.getNum++
              }
            }
          })
        }
      })
    },
    addSubmit() {
      this.btnName = this.$t('sub.btns.createImmediately')
      this.handleTitle = this.$t('sub.dialogTxt.newSubActivity')
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
            if (this.btnName == this.$t('biz.btn.update')) {
        if (this.ruleForm.triesLimit == 1) {
          // inputNum
          // debugger
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
            this.$message.success(this.$t('biz.msg.updateSuccess'))
            this.searchSubmit()
          } else {
            this.$message.error(this.$t('biz.msg.updateFailed'))
          }
        })
      } else if (this.btnName == this.$t('sub.btns.createImmediately')) {
        if (this.ruleForm.triesLimit == 1) {
          // inputNum
          // debugger
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
        if(this.$route.params.data){
          this.moduleVal.eventCode = this.$route.params.data
        }else{
          this.moduleVal.eventCode = res.data[0].code
        }
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
        this.btnName = this.$t('biz.btn.confirm')
      this.handleTitle = this.$t('sub.dialogTxt.viewSubActivity')
        this.getEdit(item.code)
      } else {
        // 编辑
        // debugger
        this.disabled_look = false
        this.btnName = this.$t('biz.btn.update')
      this.handleTitle = this.$t('sub.dialogTxt.modifySubActivity')
        this.getEdit(item.code)
      }
    },
    handleDel(item) {
      this.$confirm(this.$t('sub.msg.deleteDataMsg'), this.$t('biz.msg.tip'), {
        confirmButtonText: this.$t('biz.btn.confirm'),
        cancelButtonText: this.$t('biz.btn.cancel'),
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
                message: `${this.$t('biz.msg.deleteSuccess')}!`
              })
              this.searchSubmit()
            } else {
              this.$message({
                type: 'info',
                message: this.$t('biz.msg.deleteFailed')
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('sub.msg.cancelDelMsg')
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
                message: `${this.$t('biz.msg.saveSuccess')}!`
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
                message: `${this.$t('biz.msg.saveSuccess')}!`
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
    // 第一次进来赋值0 用来判断是不是直接跳转进来的
    this.getNum = 3
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
  }
}
.form_data .el-col .el-form-item .el-form-item__label,
.meeting-name {
  min-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-form-label__frameBox {
  position: absolute;
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