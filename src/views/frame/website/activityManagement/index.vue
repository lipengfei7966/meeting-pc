<template>
  <div>
    <div class="headerSearch">
      <span class="sp_one">参会人是否可参加多项分活动：</span>
      <el-radio-group v-model="moduleVal.radio_">
        <el-radio :label="0">不限制</el-radio>
        <el-radio :label="1"
          >单人最多参与 <span> <el-input style="width: 26%" size="mini" v-model="moduleVal.inputNum"></el-input></span> 次</el-radio
        >
      </el-radio-group>
      <!--  -->
      <div style="display: flex; align-items: center">
        <div style="width: 90%">
          <el-form style="margin-top: 15px" :model="moduleVal" ref="form" label-width="100px">
            <el-col :span="5">
              <el-form-item label="分活动名称">
                <el-input size="mini" v-model="moduleVal.activityName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="活动时间"> <el-date-picker style="width: 100%" size="mini" v-model="moduleVal.activityTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker> </el-form-item
            ></el-col>
            <el-col :span="6">
              <el-form-item label="活动状态">
                <el-select size="mini" v-model="moduleVal.activityState" placeholder="活动状态">
                  <el-option label="状态一" value="shanghai"></el-option>
                  <el-option label="状态二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="启用状态">
                <el-select size="mini" v-model="moduleVal.useState" placeholder="启用状态">
                  <el-option label="状态一" value="shanghai_"></el-option>
                  <el-option label="状态二" value="beijing_"></el-option>
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
        <el-table-column prop="aaa" label="分活动名称" width="180"> </el-table-column>
        <el-table-column prop="bbb" label="活动时间" width="180"> </el-table-column>
        <el-table-column prop="ccc" label="活动状态"> </el-table-column>
        <el-table-column prop="ddd" label="启用">
          <template slot-scope="scope">
            <span>
              <el-switch v-model="scope.row.flag" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
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
              <el-date-picker style="width: 500px" size="mini" v-model="ruleForm.date1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="参加人数限制" prop="desc">
              <el-radio-group v-model="moduleVal.radio_">
                <el-radio :label="0">不限制</el-radio>
                <el-radio :label="1"
                  >单人最多参与 <span> <el-input style="width: 26%" size="mini" v-model="moduleVal.inputNum"></el-input></span> 次</el-radio
                >
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
export default {
  name: 'activityManagement',
  data() {
    return {
      dialogVisible: false,
      moduleVal: {
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
        useState: ''
      },
      tableData: [
        {
          aaa: '2016-05-02',
          bbb: '王小虎',
          ccc: '上海市普陀区金沙江路 1518 弄',
          ddd: 'ddd',
          eee: 'eee',
          flag: true
        },
        {
          aaa: '2016-05-02',
          bbb: '王小虎',
          ccc: '上海市普陀区金沙江路 1518 弄',
          ddd: 'ddd',
          eee: 'eee',
          flag: false
        }
      ],
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
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
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },
      currentPage4: 4
    }
  },
  methods: {
    searchSubmit() {
      console.log('searchSubmit')
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.dialogVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="scss">
.headerSearch {
  width: auto;
  min-height: 58px;
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
</style>