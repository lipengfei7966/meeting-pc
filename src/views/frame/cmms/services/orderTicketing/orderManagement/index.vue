<template>
  <div class="container">
    <div class="order-select bs-new-container">
      <el-form :inline="true" :model="queryBasicOrderInfo.data" class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item label="订单状态：">
                <el-select v-model="queryBasicOrderInfo.data.orderStatus" placeholder="全部">
                  <template>
                    <div v-for="(item, index) in orderStatussArr" :key="index">
                      <el-option :label="item[1]" :value="item[0]"></el-option>
                    </div>
                  </template>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item label="所属客户：">
                <el-select v-model="queryBasicOrderInfo.data.userCode" placeholder="全部">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="订单号：">
                <el-input v-model="queryBasicOrderInfo.data.orderNumber"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="下单时间：">
                <el-date-picker v-model="value1" @change="checkChange" type="datetimerange" range-separator="至"
                  start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>

              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item label="差旅类型：">
                <el-select v-model="queryBasicOrderInfo.data.travelType" placeholder="全部">
                  <template>
                    <div v-for="(item, index) in tripArr" :key="index">
                      <el-option :label="item[1]" :value="item[0]"></el-option>
                    </div>
                  </template>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item label="订单类型：">
                <el-select v-model="queryBasicOrderInfo.data.orderType" placeholder="全部">
                  <template>
                    <div v-for="(item, index) in orderTypeArr" :key="index">
                      <el-option :label="item[1]" :value="item[0]"></el-option>
                    </div>
                  </template>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="乘客：">
                <el-input v-model="queryBasicOrderInfo.data.contactPerson"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="支付方式：">
                <el-select v-model="queryBasicOrderInfo.data.payType" placeholder="全部">
                  <template>
                    <div v-for="(item, index) in payTypeArr" :key="index">
                      <el-option :label="item[1]" :value="item[0]"></el-option>
                    </div>
                  </template>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item label="支付状态：">
                <el-select v-model="queryBasicOrderInfo.data.payStatus" placeholder="全部">
                  <template>
                    <div v-for="(item, index) in payStatusArr" :key="index">
                      <el-option :label="item[1]" :value="item[0]"></el-option>
                    </div>
                  </template>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item label="出行类型：">
                <el-select v-model="queryBasicOrderInfo.data.tripType" placeholder="全部">
                  <template>
                    <div v-for="(item, index) in tripTypeArr" :key="index">
                      <el-option :label="item[1]" :value="item[0]"></el-option>
                    </div>
                  </template>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="票号：">
                <el-input v-model="queryBasicOrderInfo.data.ticketNo"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="联系人电话：">
                <el-input v-model="queryBasicOrderInfo.data.contactPhone"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <div class="grid-content bg-purple" style="margin:0 0 0 80%;">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item style="margin:0 20px">
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item style="margin:0 20px">
                  <el-button type="primary" @click="onReset">重置</el-button>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item style="margin:0 20px">
                  <el-button type="primary" @click="onImport">导出</el-button>
                </el-form-item>
              </div>
            </el-col>
          </div>
        </el-row>
      </el-form>
    </div>
    <div class="order-table" style="maginBottom:50px">
      <el-row>
        <el-col :span="24" style="padding:0 20px">
          <div class="grid-content bg-purple-dark">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label='`快速订单(${orderStatusTotal.allOrderCount})`' name="first">
                <orderTable :tableData="tableData" :basicOrderInfoTotal="basicOrderInfoTotal"
                  :basicOrderInfoPages="basicOrderInfoPages" :basicOrderInfoSize="basicOrderInfoSize"
                  @exportData="exportDataFn" @multipleSelection="multipleSelectionFn" />
              </el-tab-pane>
              <el-tab-pane :label='`已出票(${orderStatusTotal.ticketsIssuedCount})`' name="second">
                <orderTable :tableData="tableData" :basicOrderInfoTotal="basicOrderInfoTotal"
                  :basicOrderInfoPages="basicOrderInfoPages" :basicOrderInfoSize="basicOrderInfoSize"
                  @exportData="exportDataFn" @multipleSelection="multipleSelectionFn" />
              </el-tab-pane>
              <el-tab-pane :label='`待付款(${orderStatusTotal.obligationCount})`' name="third">
                <orderTable :tableData="tableData" :basicOrderInfoTotal="basicOrderInfoTotal"
                  :basicOrderInfoPages="basicOrderInfoPages" :basicOrderInfoSize="basicOrderInfoSize"
                  @exportData="exportDataFn" @multipleSelection="multipleSelectionFn" />
              </el-tab-pane>
              <el-tab-pane :label='`已取消(${orderStatusTotal.cancelCount})`' name="fourth">
                <orderTable :tableData="tableData" :basicOrderInfoTotal="basicOrderInfoTotal"
                  :basicOrderInfoPages="basicOrderInfoPages" :basicOrderInfoSize="basicOrderInfoSize"
                  @exportData="exportDataFn" @multipleSelection="multipleSelectionFn" />
              </el-tab-pane>
              <!-- <el-tab-pane :label='`退票异常订单(${orderStatusTotal.abnormalOrderCount})`' name="fifth">
                <orderTable :tableData="tableData" :basicOrderInfoTotal="basicOrderInfoTotal"
                  :basicOrderInfoPages="basicOrderInfoPages" :basicOrderInfoSize="basicOrderInfoSize" />
              </el-tab-pane> -->
            </el-tabs>
          </div>
        </el-col>
      </el-row>
      <div class="pages">
        <div class="grid-content bg-purple">
          <div class="page ">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="basicOrderInfoSize"
              layout="total, sizes, prev, pager, next, jumper" :total="basicOrderInfoTotal">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { basicOrderInfo, listItem, getStatusCount } from './utils/api'
import orderTable from './components/orderTable.vue'
// 导出excel
// import exportExcel from '@/utils/frame/base/downloadExcel'
import { exportExcel } from "./utils/excelConfig"
export default {
  name: 'orderManagement',
  components: { orderTable },
  data () {
    return {
      value1: '',
      activeName: 'first',
      tableData: [],
      multipleSelection: [],
      queryBasicOrderInfo: {
        current: 1,
        size: 20,
        isPage: true,
        funcModule: '订单管理',
        funcOperation: '查询',
        data: {
          orderStatus: '',
          userCode: '',
          orderNumber: '',
          updateDate: '',
          travelType: '',
          orderType: '',
          contactPerson: '',
          payType: '',
          payStatus: '',
          tripType: '',
          ticketNo: '',
          contactPhone: '',
          startTime: '',
          endTime: ''
        }
      },
      basicOrderInfo: [],
      basicOrderInfoTotal: 0,
      basicOrderInfoPages: 1,
      basicOrderInfoSize: 20,
      currentPage: 1,
      centerDialogVisible: false,
      orderStatussArr: [],
      orderStatusFamtter: {},
      travelsTypeArr: [],
      // travelTypeArr: [],
      // travelTypeFamtter: {},
      businesssTypeArr: [],
      businessTypeArr: [],
      businessTypeFamtter: {},
      // tripsTwoType: [],
      // tripsTwoFamtter: {},
      orderTypeFamtter: {},
      orderTypeArr: [],
      payTypeArr: [],
      payTypeFamtter: {},
      payStatusFamtter: {},
      payStatusArr: [],
      tripTypeFamtter: {},
      tripTypeArr: [],
      tripFamtter: {},
      tripArr: [],
      orderStatusTotal: {
        abnormalOrderCount: 0,
        allOrderCount: 0,
        cancelCount: 0,
        obligationCount: 0,
        ticketsIssuedCount: 0
      },
      exportData: [],
      multipleSelection: []
    }
  },
  created () {
    this.airOrderInfoFn(this.queryBasicOrderInfo)
    this.listItemFn()
    this.getStatusCountFn()
  },
  mounted () { },
  methods: {
    // 获取字典码
    listItemFn () {
      listItem('BASIC_ORDER_STATUS').then(res => {
        // console.log(res, '获取字典码-订单状态')
        for (const item of res.data) {
          var key = item.dictItemVal
          var value = item.dictItemName
          this.orderStatusFamtter[key] = value
          this.orderStatussArr.push([key, value])
        }
      })
      listItem('TRAVEL_MODE').then(res => {
        // console.log(res, '获取字典码-业务类型')
        for (const item of res.data) {
          var key = item.dictItemVal
          var travelValue = item.dictItemName
          this.businessTypeFamtter[key] = travelValue
          this.businesssTypeArr.push([key, travelValue])
          this.businessTypeArr.push(item.dictItemName)
        }
      })
      listItem('PAY_TYPE').then(res => {
        // console.log(res, '获取字典码-支付方式')
        for (const item of res.data) {
          var key = item.dictItemVal
          var value = item.dictItemName
          this.payTypeFamtter[key] = value
          this.payTypeArr.push([key, value])
        }
      })
      listItem('ORDER_TYPE').then(res => {
        // console.log(res, '获取字典码-订单类型')
        for (const item of res.data) {
          var key = item.dictItemVal
          var value = item.dictItemName
          this.orderTypeFamtter[key] = value
          this.orderTypeArr.push([key, value])
        }
      })
      listItem('PAY_STATUS').then(res => {
        // console.log(res, '获取字典码-支付状态')
        for (const item of res.data) {
          var key = item.dictItemVal
          var value = item.dictItemName
          this.payStatusFamtter[key] = value
          this.payStatusArr.push([key, value])
        }
      })
      listItem('TRIP_TYPE').then(res => {
        // console.log(res, '获取字典码-出行类型')
        for (const item of res.data) {
          var key = item.dictItemVal
          var value = item.dictItemName
          this.tripTypeFamtter[key] = value
          this.tripTypeArr.push([key, value])
        }
      })
      listItem('TRAVEL_TYPE').then(res => {
        // console.log(res, '获取字典码-出行类型')
        for (const item of res.data) {
          var key = item.dictItemVal
          var value = item.dictItemName
          this.tripFamtter[key] = value
          this.tripArr.push([key, value])
        }
      })
    },
    // 获取订单状态总数
    getStatusCountFn () {
      getStatusCount({ orderStatus: '' }).then(res => {
        // console.log(res, '获取订单状态总数')
        this.orderStatusTotal.abnormalOrderCount = res.data.abnormalOrderCount
        this.orderStatusTotal.allOrderCount = res.data.allOrderCount
        this.orderStatusTotal.cancelCount = res.data.cancelCount
        this.orderStatusTotal.obligationCount = res.data.obligationCount
        this.orderStatusTotal.ticketsIssuedCount = res.data.ticketsIssuedCount
      })
    },
    // 获取订单列表
    airOrderInfoFn (queryBasicOrderInfo) {
      basicOrderInfo(queryBasicOrderInfo).then((res) => {
        this.basicOrderInfo = res.data
        this.basicOrderInfoTotal = res.total
        this.basicOrderInfoSize = res.size
        this.basicOrderInfoPages = res.pages
        this.tableData = res.data
        this.tableData.forEach(item => {
          item.orderStatus = this.orderStatusFamtter[item.orderStatus]
          item.travelType = this.tripFamtter[item.travelType]
          item.orderType = this.orderTypeFamtter[item.orderType]
          item.payStatus = this.payStatusFamtter[item.payStatus]
          item.payType = this.payTypeFamtter[item.payType]
          item.tripType = this.tripTypeFamtter[item.tripType]
        })
        console.log(res, '获取订单列表')
      })
    },
    // 查询
    onSubmit () {
      this.airOrderInfoFn(this.queryBasicOrderInfo)
      switch (this.queryBasicOrderInfo.data.orderStatus) {
        case '103':
          this.activeName = 'second'
          break
        case '101':
          this.activeName = 'third'
          break
        case '110':
          this.activeName = 'fourth'
          break
        case '105':
          this.activeName = 'fifth'
          break
        case '':
          this.activeName = 'first'
          break
        default:
          break
      }
    },
    // 重置
    onReset () {
      this.queryBasicOrderInfo.data.orderStatus = ''
      this.queryBasicOrderInfo.data.userCode = ''
      this.queryBasicOrderInfo.data.orderNumber = ''
      this.queryBasicOrderInfo.data.updateDate = ''
      this.queryBasicOrderInfo.data.travelType = ''
      this.queryBasicOrderInfo.data.orderType = ''
      this.queryBasicOrderInfo.data.contactPerson = ''
      this.queryBasicOrderInfo.data.payType = ''
      this.queryBasicOrderInfo.data.payStatus = ''
      this.queryBasicOrderInfo.data.tripType = ''
      this.queryBasicOrderInfo.data.ticketNo = ''
      this.queryBasicOrderInfo.data.contactPhone = ''
      this.queryBasicOrderInfo.data.startTime = ''
      this.queryBasicOrderInfo.data.endTime = ''
      this.value1 = ''
    },
    // 选中数据
    multipleSelectionFn (multipleSelection) {
      this.multipleSelection = multipleSelection
    },
    // 导出的数据
    exportDataFn (exportData) {
      this.exportData = exportData
    },
    // 导出
    onImport () {
      console.log('onImport!')
      // exportExcel({
      //   fileName: '1.xlsx',
      //   header: ['订单状态', '所属客户'],
      //   filterVal: ['已出票', '1212'],
      //   exportfunc: function () {
      //   },
      //   callBackfunc: function () {

      //   }
      // })
      if (this.exportData.length <= 1 || this.multipleSelection.length <= 0) {
        this.$message({ message: '您还没有选择要导出的数据', type: 'warning' })
        return false
      }
      exportExcel('订单表格导出', this.exportData)
    },
    // tab栏
    handleClick (tab) {
      switch (tab._props.name) {
        case 'first':
          this.queryBasicOrderInfo.data.orderStatus = ''
          this.airOrderInfoFn(this.queryBasicOrderInfo)
          break
        case 'second':
          this.queryBasicOrderInfo.data.orderStatus = '103'
          this.airOrderInfoFn(this.queryBasicOrderInfo)
          break
        case 'third':
          this.queryBasicOrderInfo.data.orderStatus = '101'
          this.airOrderInfoFn(this.queryBasicOrderInfo)
          break
        case 'fourth':
          this.queryBasicOrderInfo.data.orderStatus = '110'
          this.airOrderInfoFn(this.queryBasicOrderInfo)
          break
        case 'fifth':
          this.queryBasicOrderInfo.data.orderStatus = '105'
          this.airOrderInfoFn(this.queryBasicOrderInfo)
          break

        default:
          break
      }
    },
    // 分页-每页条数
    handleSizeChange (val) {
      this.basicOrderInfoSize = val
      this.queryBasicOrderInfo.size = this.basicOrderInfoSize
      this.airOrderInfoFn(this.queryBasicOrderInfo)
    },
    // 分页-当前页
    handleCurrentChange (val) {
      this.currentPage = val
      this.queryBasicOrderInfo.current = this.currentPage
      this.airOrderInfoFn(this.queryBasicOrderInfo)
    },
    // 日期选择器
    checkChange () {
      this.queryBasicOrderInfo.data.startTime = this.value1[0]
      this.queryBasicOrderInfo.data.endTime = this.value1[1]
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
}

.pages {
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-select {
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px 0;
}

.order-table {
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 0;
}

.el-dropdown-link {
  cursor: pointer;
  color: #00699d;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.page {
  padding: 20px 0 10px 0;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

.el-dropdown {
  border: 1px solid #00699d;
  padding: 2px 5px;
  border-radius: 4px;
  min-width: 200px;
  text-align: center;
}

.el-icon-arrow-down:before {
  content: "\e6df";
  position: absolute;
  right: 5px;
  top: 7px;
  color: #000;
  font-weight: 900;
}

::deep .bs-new-container .el-pagination {
  margin: 50px 0;
  line-height: 100px;
}

::deep .el-pager {
  background-color: none;
}

.el-divider--horizontal {
  margin: 8px 0;
  background: 0 0;
  border-top: 2px dashed #e4e7ed;
}

.remove-line1 {
  width: 100%;
  height: 48px;
  margin-bottom: 20px;
}


.el-dialog__body .wenhao {
  width: 48px;
  height: 48px;
  margin: 6px 10px;
  vertical-align: middle;
}

::deep .el-dialog__body {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

::deep .el-dialog--center {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.remove-line1 span {
  font-size: 20px;
  font-weight: 900;
  height: 100%;
  vertical-align: middle;
  line-height: 48px;
}

.remove-line2 {
  margin: 10px 15px;
}

.fontSize2Left {
  font-size: 16px;
  font-weight: 900;
}


.fontSize2Right {
  font-size: 20px;
  font-weight: 900;
}

.yellowColor {
  color: #f6ba29;
}

.remove-line3 {
  margin: 10px 35px;
}

.fontSize3Left {
  font-size: 14px;
  font-weight: 900;
}

.fontSize3Right {
  font-size: 16px;
  font-weight: 900;
}

.remove-line4 {
  width: 100%;
  height: 27px;
  margin: 10px 22px;
}

.tanhao {
  width: 27px;
  height: 27px;
  vertical-align: middle;
}

.remove-line4 span {
  font-size: 14px;
  font-weight: 900;
  height: 100%;
  vertical-align: middle;
  line-height: 27px;
  padding-left: 12px;
}

.remove-rules {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background-color: #f0f2f5;
  padding: 0 55px;
  text-align: left;
}

.title {
  font-size: 14px;
  font-weight: 900;
  color: #696b6f;
  margin: 15px 0;
  display: block;
}

.rule1,
.rule2,
.rule3,
.rule4 {
  margin-bottom: 15px;
}
</style>
