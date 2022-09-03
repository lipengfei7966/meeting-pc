<template>
  <div class="event_list box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }" class="el-breadcrumb-item">
        首页
        <!-- <span class="rights">></span> ···· -->
      </el-breadcrumb-item>
      <el-breadcrumb-item class="el-bread-item">审批单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="search_part">
      <el-form :model="eventSearch" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="会议ID">
              <el-input size="small" v-model="eventSearch.event_num" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会议名称">
              <el-input size="small" v-model="eventSearch.event_name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="PO单号">
              <el-input size="small" v-model="eventSearch.po" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="PR 号">
              <el-input size="small" v-model="eventSearch.pr" clearable></el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="业务类型">
              <el-select v-model="eventSearch.type" filterable clearable>
                <!-- <el-option v-for="item in buyerOptions" :key="item.uclient_code" :label="item.ufullname" :value="item.uusername"></el-option> -->
                <el-option label="结算单审批" value="1"></el-option>
                <el-option label="中标审批" value="2"></el-option>
              </el-select>
              <!-- <el-input size="small"  v-model="eventSearch.createUser" clearable></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="当前步骤">
              <el-input size="small" v-model="eventSearch.step" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审批人">
              <el-select v-model="eventSearch.approval_name" filterable clearable>
                <el-option v-for="item in buyerOptions" :key="item.uclient_code" :label="item.ufullname" :value="item.uusername"></el-option>
              </el-select>
              <!-- <el-input size="small"  v-model="eventSearch.createUser" clearable></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="审批状态">
              <el-select v-model="eventSearch.approval_status" filterable clearable>
                <!-- <el-option v-for="item in approval_status" :key="item.uclient_code" :label="item.ufullname" :value="item.uusername"></el-option> -->
                <el-option label="初次提交" value="初次提交"></el-option>
                <el-option label="重新提交" value="重新提交"></el-option>
                <el-option label="已补充材料" value="已补充材料"></el-option>
                <el-option label="审批不通过" value="审批不通过"></el-option>
                <el-option label="要求补充材料" value="要求补充材料"></el-option>
                <el-option label="审批通过" value="审批通过"></el-option>
              </el-select>
              <!-- <el-input size="small"  v-model="eventSearch.createUser" clearable></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="会议时间">
              <el-date-picker @change="changeEventDate" style="width:100%" size="small" v-model="event_date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="提交时间">
              <el-date-picker @change="changeSubmitDate" style="width:100%" size="small" v-model="submit_date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8" align="right">
            <!-- <span style="margin: 0 20px;color:#3a8ee6;cursor:pointer" v-show="showMoreSearch" @click="changeMore"> ⩔ 更多查询条件</span>
            <span style="margin: 0 20px;color:#3a8ee6;cursor:pointer" v-show="!showMoreSearch" @click="changeMore"> ⩓ 收起</span> -->
            <el-button size="small" type="primary" @click="getDataList(1)">搜 索</el-button>
            <el-button size="small" type="primary" @click="getDataList(2)">重 置</el-button>
          </el-col>
        </el-row>

      </el-form>
    </div>

    <el-table style="height: 390px" border :data="dataList" :row-class-name="tableRowClassName" class="coust" max-height="390" sortable="custom" @sort-change="topTableSort">
      <el-table-column label="会议ID" prop="event_num" align="center" width="130" show-overflow-tooltip>
        <template slot="header">
          <span>会议ID <br></span>
          <span style="color:#ccc">Event ID</span>
        </template>
      </el-table-column>

      <el-table-column label="会议名称" prop="event_name" align="center" width="150" show-overflow-tooltip>
        <template slot="header">
          <span>会议名称 <br></span>
          <span style="color:#ccc">Event Name</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="团电脑号" prop="tourist_group_no" align="center" width="150" show-overflow-tooltip></el-table-column> -->

      <el-table-column label="会议时间" prop="date" align="center" width="120">
        <template slot="header">
          <span>会议时间 <br></span>
          <span style="color:#ccc">Event Date</span>
        </template>
        <!-- <template slot-scope="scope">
          <p v-if="scope.row.event_startdate">{{scope.row.event_startdate.slice(0,10)}}</p>
          <p v-if="scope.row.event_enddate">{{scope.row.event_enddate.slice(0,10)}}</p>
        </template> -->
      </el-table-column>

      <el-table-column label="PO单号" prop="po" align="center" width="100" show-overflow-tooltip>
        <template slot="header">
          <span>PO单号 <br></span>
          <span style="color:#ccc">PO No.</span>
        </template>
      </el-table-column>

      <el-table-column label="PR单号" prop="pr" align="center" width="120" show-overflow-tooltip>
        <template slot="header">
          <span>PR单号 <br></span>
          <span style="color:#ccc">PR No.</span>
        </template>
      </el-table-column>

      <el-table-column label="供应商名称" prop="company_name" align="center" width="200" show-overflow-tooltip>
        <template slot="header">
          <span>供应商名称 <br></span>
          <span style="color:#ccc">Company Name</span>
        </template>
      </el-table-column>

      <el-table-column label="结算金额" prop="total_amount" :formatter="moneyFormatter" align="center" width="100" show-overflow-tooltip>
        <template slot="header">
          <span>结算金额 <br></span>
          <span style="color:#ccc"> Amount</span>
        </template>
      </el-table-column>

      <el-table-column label="业务类型" prop="type_name" align="center" width="100" show-overflow-tooltip>
        <template slot="header">
          <span>业务类型 <br></span>
          <span style="color:#ccc">Type</span>
        </template>
      </el-table-column>

      <el-table-column label="团组已结束天数" prop="end_day" sortable align="center" width="150">
        <template slot="header">
          <span>团组已结束天数 <br></span>
          <span style="color:#ccc">End Day</span>
        </template>
      </el-table-column>

      <el-table-column label="当前步骤" prop="state" align="center" width="100">
        <template slot="header">
          <span>当前步骤 <br></span>
          <span style="color:#ccc">Step</span>
        </template>
      </el-table-column>

      <el-table-column label="审批人" prop="approval_name" align="center" width="110">
        <template slot="header">
          <span>审批人 <br></span>
          <span style="color:#ccc">Approver</span>
        </template>
      </el-table-column>

      <el-table-column label="审批状态" prop="approce_status" align="center" width="110">
        <template slot="header">
          <span>审批状态 <br></span>
          <span style="color:#ccc">Status</span>
        </template>
      </el-table-column>

      <el-table-column label="提交时间" prop="apply_for_data" align="center" width="110">
        <template slot="header">
          <span>提交时间 <br></span>
          <span style="color:#ccc">News</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" align="center" width="110">
        <template slot="header">
          <span>操作 <br></span>
          <span style="color:#ccc">Action</span>
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="goDetail(scope.row)">查看详情</el-button>
          <el-button type="text" v-show="isCanTurn(scope.row)" size="small" @click="TurnToSend(scope.row)">转派</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page_index.sync="eventSearch.page_index" class="pagination_part" background layout="total, prev, pager, next" :total="pageInfo.totalCount">
      </el-pagination>
    </div>

    <!-- 流转选择用户弹窗 -->
    <el-dialog title="转派" :visible.sync="dialogVisible" top='30vh' width="30%">
      <div style="line-height:40px">
        <p class="flex_row">
          <span style="width:150px">绑定用户账号：</span>
          <el-select size="mini" filterable multiple v-model="updateInfo.user" placeholder="请选择">
            <el-option v-for="item in userOptionsList" :key="item.username" :label="item.fullname" :value="item.username">
            </el-option>
          </el-select>
        </p>
        <p style="color: #999;line-height:20px;margin:20px 0">注释：转派后，选中审批单的当前审批环节的审批人将变更为所选用户</p>
      </div>

      <div style="text-align:center">
        <el-button type="primary" size="small" @click="saveUpdateInfo">保 存</el-button>
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { positiveFloat, formatDate } from '@/utils/common'

export default {
  data() {
    return {
      newMessageShow: false,
      showMoreSearch: true,
      dialogVisible: false,
      // 更改用户信息
      updateInfo: {
        approve_id: '', // 审批id
        type: '', //1结算2报价
        user: '', // 分配的用户，多个以逗号分隔
        key_id: '' // type为1传结算id，2报价id
      },
      userOptionsList: [],
      messageList: [],
      event_date: [], // 查询条件会议时间
      submit_date: [], // 查询条件提交时间
      eventSearch: {
        event_num: '',
        event_name: '',
        po: '',
        pr: '',
        type: '',
        step: '',
        approval_name: '',
        approval_status: '',
        page_size: 10,
        page_index: 1,
        event_startdate: '', // 会议开始时间
        event_enddate: '', // 会议结束时间
        submit_begin: '', // 提交开始时间
        submit_end: '' // 提交结算时间
      },
      pageInfo: {
        totalCount: 0
      },
      dataList: [],
      buyerOptions: [] // 采购负责人下拉列表
    }
  },
  computed: {
    isCanTurn() {
      return function(row) {
        // debugger
        return ['初次提交', '重新提交', '已补充材料'].includes(row.approce_status)
      }
    }
  },
  mounted() {
    this.GetUser()
    this.getDataList()
    this.getBuyerOptions()
  },
  methods: {
    formatDate,
    positiveFloat,

    // 切换排序
    topTableSort({ column, prop, order }) {
      debugger
      if (column) {
        this.eventSearch.sortField = prop // 排序字段
        if (order == 'descending') {
          this.eventSearch.isSort = 1 //0顺序 1倒叙
        } else if (order == 'ascending') {
          this.orderBy = 1
          this.eventSearch.isSort = 0 //0顺序 1倒叙
        } else {
          this.eventSearch.isSort = ''
        }
        this.getDataList()
      }
    },
    tableRowClassName({ row, rowIndex }) {
      // debugger
      if (row.is_overtime === 1) {
        return 'warning-row'
      }
      return ''
    },
    moneyFormatter(row, col, value) {
      // let money = Number(row.开票金额)
      if (value || value === 0) {
        return this.positiveFloat(value).toFixed(2)
      } else {
        return ''
      }
    },
    getDataList(id = 0) {
      if (id === 1) {
        // 点击搜索
        this.eventSearch.page_index = 1
      } else if (id === 2) {
        this.eventSearch = {
          event_num: '', // 会议ID
          event_name: '', // 会议名称
          po: '', //PO
          pr: '', // PR
          type: '',
          step: '',
          approval_name: '',
          approval_status: '',
          event_startdate: '', // 会议开始时间
          event_enddate: '', // 会议结束时间
          submit_begin: '', // 提交开始时间
          submit_end: '', // 提交结算时间
          page_size: 10,
          page_index: 1
        }
        this.event_date = [] // 查询条件-时间重置
        this.submit_date = [] // 查询条件-时间重置
      }
      this.requestApi({
        url: '/ApproveSheet/GetApproveSheetList',
        method: 'post',
        data: this.eventSearch
      }).then(res => {
        this.dataList = res.EvetModels
        this.pageInfo = res.pageInfo
      })
    },
    getBuyerOptions() {
      this.requestApi({
        url: '/CustomerConfiguration/Get_tmc_account_user_account',
        method: 'get',
        data: {}
      }).then(res => {
        this.buyerOptions = res
        // console.log(res)
      })
    },
    GetUser() {
      this.requestApi({
        url: '/MeetingMa/GetUser',
        method: 'post'
      }).then(res => {
        this.userOptionsList = res
      })
    },
    TurnToSend(row) {
      this.updateInfo.approve_id = row.approve_id
      this.updateInfo.type = row.type
      // type为1则是结算id，2为报价id (后端已区分，直接用)
      this.updateInfo.key_id = row.foreign_key_id
      this.updateInfo.user = ''
      this.dialogVisible = true
    },
    // 保存更改绑定信息
    saveUpdateInfo() {
      // UserName =
      let sendData = {
        approve_id: this.updateInfo.approve_id,
        type: this.updateInfo.type,
        user: this.updateInfo.user.join(),
        key_id: this.updateInfo.key_id
      }
      debugger
      this.requestApi({
        url: '/ApproveSheet/EditApproveUser',
        method: 'post',
        data: sendData
      }).then(res => {
        debugger
        if (res) {
          this.$message.success('修改成功')
          this.dialogVisible = false
          this.getDataList()
        } else {
          this.$message.error('当前环节无法分配！')
        }
      })
    },
    goDetail(row) {
      // 1:结算单审批、 2:中标审批
      if (row.type == 1) {
        this.$router.push({
          name: 'msd',
          // path: '/msd',
          query: {
            id: row.event_info_id, // 会议ID
            orderId: row.ids || '', ////type为1则是订单id，2为服务商id
            settlementId: row.foreign_key_id, // 结算单ID 或报价单ID
            event_name: row.event_name,
            // sheetId: row.sheetId || '', // 询价单ID
            approveId: row.approve_id || '' // 审批ID
          }
        })
      } else if (row.type == 2) {
        this.$router.push({
          name: 'biddedDetail',
          // path: "/cmms",
          query: {
            id: row.event_info_id, // 会议ID
            ApproveID: row.approve_id, //审批ID
            type: '审核通过' // '审核通过/审核不通过'
          }
        })
      }
    },
    changeEventDate(date) {
      // debugger
      if (date) {
        this.eventSearch.event_startdate = this.formatDate('YYYY-mm-dd', date[0])
        this.eventSearch.event_enddate = this.formatDate('YYYY-mm-dd', date[1])
      } else {
        this.eventSearch.event_startdate = ''
        this.eventSearch.event_enddate = ''
      }
    },
    changeSubmitDate(date) {
      if (date) {
        this.eventSearch.submit_begin = this.formatDate('YYYY-mm-dd', date[0])
        this.eventSearch.submit_end = this.formatDate('YYYY-mm-dd', date[1])
      } else {
        this.eventSearch.submit_begin = ''
        this.eventSearch.submit_end = ''
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.eventSearch.page_size = val
      this.getDataList()
    },
    handleCurrentChange(val) {
      this.eventSearch.page_index = val
      console.log(`当前页: ${val}`)
      this.getDataList()
    }
  }
}
</script>

<style lang="scss" scoped>
.event_list {
  padding-top: 60px;
  .pagination {
    width: 100%;
    .pagination_part {
      margin: 20px 0;
      width: 100%;
      text-align: right;
    }
  }
  .el-table__body-wrapper {
    overflow-y: auto;
    // overflow-x: hidden
  }
  ::deep .el-table tr.warning-row {
    color: red;
  }
}

.search_part {
  margin-top: 30px;
}
</style>