<template>
  <div class="containerBox">
    <div class="bs-new-container app-container">
      <bs-form ref="bsForm" :form="form"></bs-form>
      <template v-if="mainData.tabs" :style="{ width: clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto' }">
        <el-tabs v-model="activeName" type="border-card" style="margin-top: 3px" @tab-click="handleTabClick">
          <el-tab-pane v-for="tab in mainData.tabs" :key="tab.id" :label="tab.label" :name="tab.name">
          </el-tab-pane>
        </el-tabs>
      </template>
      <bs-table ref='bsTable' :mainData='mainData' :mainDataTabs="mainData.tabs" @initCallback='initCallback'>
        <template slot="operation" slot-scope="scope">
          <el-button type="text" :disabled="!fundTicket.includes(scope.row.orderStatus)" @click="handleRemoveClick(scope.row)">退票</el-button>
          <el-button type="text" size="small" @click="handleInfoClick(scope.row)">详情</el-button>
        </template>
      </bs-table>
    </div>
    <!-- 退票弹窗 -->
    <el-dialog title="退票申请" :visible.sync="centerDialogVisible" width="55%" center top="10px">
      <div class="remove-line1">
        <img src="@/assets/frame/svg/wenhao.svg" class="wenhao" alt="" srcset="">
        <span>您确认要退票吗？</span>
      </div>
      <el-divider></el-divider>
      <div class="remove-line2">
        <span class="fontSize2Left fontWeight">预计退款：</span><span class="fontSize2Right yellowColor">{{fightReissueRefund.returnPrice }}元</span>
      </div>
      <el-divider></el-divider>
      <div class="remove-line3">
        <div class="remove-line3-1">
          <span class="fontSize3Left fontWeight">手续费用：</span><span class="fontSize3Right yellowColor">{{ fightReissueRefund.refundPrice }}元</span>
        </div>
        <div class="remove-line3-2">
          <span class="fontSize3Left fontWeight">车票票价：</span><span class="fontSize3Right yellowColor">{{costDetailInfo.ticketAmount}}元</span>
        </div>
        <div class="remove-line3-3">
          <span class="fontSize3Left fontWeight">预计退款：</span><span class="fontSize3Right yellowColor">{{fightReissueRefund.returnPrice}}元</span>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="remove-line4">
        <img src="@/assets/frame/svg/tanhao.svg" class="tanhao" alt="" srcset="">
        <span>实际核收退票费及应退票款将按最终交易时间计算。</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button style="margin-bottom:250px" type="primary" @click="comfirmRefund">确 定</el-button>
        <div class="remove-rules" v-if="businessType === '2'">
          <div class="title">退票规则：</div>
          <div class="rule1">1、使用现金购买或已领取报销凭证的电子票，线上完成退票后，请持相关证件（购票证件、报销凭证）至车站窗口完成退款。</div>
          <div class="rule2">
            2、退票费按如下规则核收：票面乘车站开车时间前8天（含）以上不收取退票费，48小时以上的按票价5%计，24小时以上、不足48小时的按票价10%计，不足24小时的按票价20%计。上述计算的尾数以5角为单位，尾数小于2.5角的舍去、2.5角及以上且小于7.5角的计为5角、7.5角及以上的进为1元。退票费最低按2元计收。
          </div>
          <div class="rule3">3、应退款项按银行规定时限退还至购票时所使用的网上支付工具账户，请注意查询，如有疑问请致电人工客服查询。</div>
          <div class="rule4">4、跨境旅客旅行须知详见铁路跨境旅客相关运输组织规则和车站公告。</div>
        </div>
        <div class="remove-rules" v-if="businessType === '1'">
          <div class="title">退票规则：</div>
          <div class="rule1">
            <p>* {{ baggageText }}</p>
            <p>* {{ checkedBaggage }}</p>
            <p>* {{ refundText }}</p>
            <p>* {{ handheldLuggage }}</p>
            <p>* {{ refundText }}</p>
            <p>* {{ reissueText }}</p>
            <p>* {{ transferText }}</p>
          </div>
        </div>
      </span>

    </el-dialog>
  </div>

</template>

<script>
import { getStatusCount, fightRefund, refundUpdateRule, airDetail, estimatedRefund, comfirmRefund, fightReissueRefund } from './utils/api'
export default {
  name: 'orderManagement',
  data() {
    return {
      fundTicket: ['103', '108', '111', '112', '113'],
      theTrainOrFlightNo: '',
      theOrderCode: '',
      theOrderStatus: '',
      businessType: '',
      baggageText: '',
      checkedBaggage: '',
      handheldLuggage: '',
      refundText: '',
      reissueText: '',
      transferText: '',
      centerDialogVisible: false,
      refundAmount: 0, // 预估退票金额
      serviceFee: 0, // 手续费
      thepayAmount: 0, //退回金额
      theorderCode: '',
      refundOrderType: 1,
      refundType: 1,
      updateStatus: ['107', '106', '108', '109', '104', '105', '110', '115'],
      activeName: 'first',
      orderStatusTotal: {
        abnormalOrderCount: 0,
        allOrderCount: 0,
        cancelCount: 0,
        obligationCount: 0,
        ticketsIssuedCount: 0
      },
      fightReissueRefund: {
        refundPrice: 0,
        reissuePrice: 0,
        returnPrice: 0,
        ticketno: '',
        upgradecabinPrice: 0
      },
      form: {
        moreShowFlg: true,
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          importance: undefined,
          title: undefined,
          type: undefined,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          defaultSortString: 'createDate.desc',
          data: {}
        },
        formData: [
          {
            label: 'website.signupContact.query.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO', // 统一基础档案组件，传值data区分,
              isDefault: true,
              clearable: false
            },
            event: {
              changeAll: this.onChangeAll
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: this.$t('order.orderManagement.orderStatus'),
            prop: 'orderStatus',
            element: 'base-select',
            list: this.$t('datadict.basicOrderStatus'),
            attrs: {
              isDefault: true,
              clearable: false
            }
          },
          {
            label: this.$t('order.orderManagement.travelType'),
            prop: 'businessType',
            element: 'base-select',
            list: this.$t('datadict.travelType'),
            attrs: {
              isDefault: true,
              clearable: false
            }
          },
          {
            label: this.$t('order.orderManagement.affiliatedCustomers'),
            prop: 'customerName',
            element: 'input-validate',
            attrs: {
              isDefault: true,
              clearable: false
            }
          },
          {
            label: this.$t('order.orderManagement.orderNumber'),
            prop: 'orderNumber',
            element: 'input-validate',
            attrs: {
              isDefault: true,
              clearable: false
            }
          },
          {
            type: 'date',
            label: this.$t('order.orderManagement.orderTime'),
            props: ['startTime', 'endTime'],
            attrs: {
              clearable: true,
              format: 'yyyy-MM-dd',
              'value-format': 'yyyyMMdd'
            },
            default: ['', '']
          },
          // {
          //   label: '差旅类型',
          //   prop: 'businessType',
          //   element: 'base-select',
          //   list: this.$t('datadict.travelType'),
          //   attrs: {
          //     isDefault: true,
          //     clearable: false
          //   }
          // },
          {
            label: this.$t('order.orderManagement.orderType'),
            prop: 'orderType',
            element: 'base-select',
            list: this.$t('datadict.orderType'),
            attrs: {
              isDefault: true,
              clearable: false
            }
          },
          {
            label: this.$t('order.orderManagement.passenger'),
            prop: 'contactPerson',
            element: 'input-validate',
            attrs: {
              isDefault: true,
              clearable: false
            }
          },
          {
            label: this.$t('order.orderManagement.paymentMethod'),
            prop: 'payType',
            element: 'base-select',
            list: this.$t('datadict.payType'),
            attrs: {
              isDefault: true,
              clearable: false
            }
          },
          {
            label: this.$t('order.orderManagement.payStatus'),
            prop: 'payStatus',
            element: 'base-select',
            list: this.$t('datadict.payStatus'),
            attrs: {
              isDefault: true,
              clearable: false
            }
          },
          {
            label: this.$t('order.orderManagement.typeOfTrip'),
            prop: 'tripType',
            element: 'base-select',
            list: this.$t('datadict.tripType'),
            attrs: {
              isDefault: true,
              clearable: true
            }
          },
          {
            label: this.$t('order.orderManagement.ticketNumber'),
            prop: 'ticketNo',
            element: 'input-validate',
            attrs: {
              isDefault: true,
              clearable: false
            }
          },
          {
            label: this.$t('order.orderManagement.contactPhone'),
            prop: 'contactPhone',
            element: 'input-validate',
            attrs: {
              isDefault: true,
              clearable: false
            }
          }
        ]
      },

      mainData: {
        tabs: [],
        api: {
          search: '/api/pay/basicOrderInfo/page'
        },
        initSearch: false,
        isTopBar: false,
        isColset: true,
        topBar: [
          {
            name: 'refresh'
          }
        ],
        table: {
          // showCheckbox: true,
          cols: [
            {
              label: this.$t('order.orderManagement.orderStatus'),
              prop: 'orderStatus',
              sortProp: 'funcUser.name',
              width: '100',
              format: {
                dict: this.$t('datadict.basicOrderStatus')
              }
            },
            {
              label: this.$t('order.orderManagement.affiliatedCustomers'),
              prop: 'customerName',
              width: '150'
            },
            {
              label: this.$t('order.orderManagement.orderNumber'),
              prop: 'orderNumber',
              width: '120'
            },
            {
              label: this.$t('order.orderManagement.orderTime'),
              prop: 'updateDate',
              width: '160',
              align: 'center'
            },
            {
              label: this.$t('order.orderManagement.travelType'),
              prop: 'travelType',
              width: '120',
              align: 'center',
              format: {
                dict: this.$t('datadict.travelType')
              }
            },
            {
              label: this.$t('order.orderManagement.orderType'),
              prop: 'orderType',
              width: '100',
              align: 'center',
              format: {
                dict: this.$t('datadict.orderType')
              }
            },
            {
              label: this.$t('order.orderManagement.orderPlacer'),
              prop: 'createUser',
              width: '120'
            },
            {
              label: this.$t('order.orderManagement.paymentMethod'),
              prop: 'payType',
              width: '120',
              format: {
                dict: this.$t('datadict.payType')
              }
            },
            {
              label: this.$t('order.orderManagement.payStatus'),
              prop: 'payStatus',
              width: '120',
              format: {
                dict: this.$t('datadict.payStatus')
              }
            },
            {
              label: this.$t('order.orderManagement.typeOfTrip'),
              prop: 'tripType',
              width: '120',
              format: {
                dict: this.$t('datadict.tripType')
              }
            },
            {
              label: this.$t('order.orderManagement.contactPhone'),
              prop: 'contactPhone',
              width: '120'
            },
            {
              label: this.$t('order.orderManagement.ticketNumber'),
              prop: 'ticketNo',
              width: '140'
            },
            {
              label: this.$t('order.orderManagement.flightInformation'),
              prop: 'tripInformation',
              width: '200'
            },
            {
              label: this.$t('order.orderManagement.paymentAmount'),
              prop: 'payAmount',
              width: '120'
            },
            {
              label: this.$t('order.orderManagement.operation'),
              prop: 'operation',
              width: '120',
              isSlot: true,
              align: 'center',
              fixed: 'right'
            }
          ]
        },
        bottomBar: {
          pagination: {
            show: true,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageSizes: [20, 40, 60, 80, 100]
          }
        }
      },
      orderDetailInfo: {}, //机票基本信息
      costDetailInfo: {}, // 机票支付信息
      flightDetailInfoList: [{ airlineCompanyCode: '', arr: '', arrCity: '', arrCode: '', arrDate: '', arrTerminal: '', arrTime: '', carrierAirlines: '', dep: '', depCity: '', depCode: '', depDate: '', depTerminal: '', depTime: '', flightCode: '', flightNo: '', isMeal: '', orderType: '', planModel: '', ticketNo: '', tripType: '' }], // 机票航班信息
      tripInfoList: [{ cabin: '', cabinName: '', certificateNumber: '', certificateType: '', changeOrderCode: '', flightCode: '', orderStatus: '', orderType: '', passengerName: '', passengerPhone: '', refundOrderCode: '', sonOrderCode: '', ticketNo: '' }] // 机票行程信息
    }
  },
  created() {},
  mounted() {
    //this.getStatusCountFn()
  },
  methods: {
    initCallback() {
      this.getStatusCountFn()
    },
    // 机票订单详情数据查询
    airDetailFn(row) {
      this.theOrderCode = row.orderCode
      airDetail(this.theOrderCode).then(res => {
        console.log(res, '机票详情')
        this.orderDetailInfo = res.data.orderDetailInfo
        this.costDetailInfo = res.data.costDetailInfo
        this.flightDetailInfoList = res.data.flightDetailInfoList
        this.tripInfoList = res.data.tripInfoList
        // ------航班信息格式化处理---------
        this.tripInfoList.forEach(res => {
          res.orderStatus = this.orderDetailInfo.orderStatus
        })
        this.refundFn()
        this.reissueRefundPrice(row)
      })
    },
    // 飞机票退票规则
    refundFn() {
      let queryRefund = {
        airline: this.flightDetailInfoList[0].airlineCompanyCode || '',
        cabin: this.tripInfoList[0].cabin || '',
        dateTime: this.flightDetailInfoList[0].depTime || '',
        des: this.flightDetailInfoList[0].arr || '',
        ori: this.flightDetailInfoList[0].dep || '',
        price: this.costDetailInfo.ticketAmount
      }
      refundUpdateRule(queryRefund).then(res => {
        console.log(res, '飞机票退票规则')
        this.baggageText = res.data.baggageText
        this.checkedBaggage = res.data.checkedBaggage
        this.handheldLuggage = res.data.handheldLuggage
        this.refundText = res.data.refundText
        this.reissueText = res.data.reissueText
        this.transferText = res.data.transferText
      })
    },
    // 获取订单状态总数
    getStatusCountFn() {
      getStatusCount(this.form.listQuery.data).then(res => {
        this.mainData.tabs = [
          { id: 1, name: 'first', label: this.$t('order.orderManagement.quickOrder')+`(${res.data.allOrderCount})` },
          { id: 2, name: 'second', label: this.$t('order.orderManagement.ticketIssued')+`(${res.data.ticketsIssuedCount})` },
          { id: 3, name: 'third', label:  this.$t('order.orderManagement.pendingPayment')+`(${res.data.obligationCount})` },
          { id: 4, name: 'fourth', label: this.$t('order.orderManagement.canceled')+`(${res.data.cancelCount})` }
          // { id: 5, name: 'fifth', label: `退票异常订单(${res.data.abnormalOrderCount})` }
        ]
        //this.handleTabClick(this.mainData.tabs[0])
      })
    },

    handleTabClick(tab) {
      switch (tab.name) {
        case 'first':
          this.form.listQuery.data.orderStatus = ''
          break
        case 'second':
          this.form.listQuery.data.orderStatus = '103'
          break
        case 'third':
          this.form.listQuery.data.orderStatus = '101'
          break
        case 'fourth':
          this.form.listQuery.data.orderStatus = '110'
          break
      }
      this.$refs.bsTable.getList({ name: 'search' })
    },
    // 改签
    handleUpdteClick(row) {
      console.log(row)
    },
    //退票弹起弹窗
    handleRemoveClick(row) {
      this.centerDialogVisible = true
      console.log(row, '退票弹窗')
      this.thepayAmount = row.payAmount
      this.businessType = row.businessType
      this.theOrderStatus = row.orderStatus
      this.theTrainOrFlightNo = row.trainOrFlightNo
      if (row.businessType === '1') {
        this.airDetailFn(row)
        this.theRow = row
      }
      if (row.businessType === '2') {
        this.refund(row.orderCode)
      }
      this.theorderCode = row.orderCode
    },
    // 预计改签费
    reissueRefundPrice(row) {
      let queryReissueRefundPrice = {
        computedType: 1,
        flightInfoCode: this.flightDetailInfoList[0].flightCode,
        orderCode: row.orderCode,
        orderType: this.orderDetailInfo.orderStatus === '108' ? 2 : 1
      }
      fightReissueRefund(queryReissueRefundPrice).then(res => {
        console.log(res, '预计改签费')
        this.fightReissueRefund.refundPrice = res.data[0].refundPrice
        this.fightReissueRefund.reissuePrice = res.data[0].reissuePrice
        this.fightReissueRefund.returnPrice = res.data[0].returnPrice
        this.fightReissueRefund.ticketno = res.data[0].ticketno
        this.fightReissueRefund.upgradecabinPrice = res.data[0].upgradecabinPrice
      })
    },
    // 退改票信息
    refund(orderCode) {
      estimatedRefund(orderCode).then(res => {
        this.refundAmount = res.data.refundAmount
        this.serviceFee = res.data.serviceFee
      })
    },
    // 取消退款
    cancelFn() {
      this.centerDialogVisible = false
      this.thepayAmount = 0
      this.theorderCode = ''
    },
    // 确定退款
    comfirmRefund() {
      if (this.businessType === '1') {
        let queryComfirmRefund = {
          flightCode: this.flightDetailInfoList[0].flightCode,
          orderCode: this.theRow.orderCode,
          refundOrderType: this.theRow.orderStatus === '108' ? 2 : 1,
          refundReason: '',
          refundType: 0
        }
        fightRefund(queryComfirmRefund).then(res => {
          console.log(res, '退票金额')
        })
      }
      if (this.businessType === '2') {
        comfirmRefund(this.theorderCode).then(res => {
          if (res.status === true) this.$message({ message: this.$t('order.orderManagement.refundSuccess'), type: 'success' })
        })
      }

      this.theorderCode = ''
      this.centerDialogVisible = false
      this.thepayAmount = 0
    },
    // 跳转详情页
    handleInfoClick(row) {
      console.log(row, 'row')
      if (row.businessType === '1') {
        //机票
        this.$router.push({ name: 'airTicketDetails', params: { orderCode: row.orderCode } })
        // console.log(row)
      }
      if (row.businessType === '2') {
        //火车票
        this.$router.push({ name: 'trainTicketDetails', params: { orderCode: row.orderCode } })
        // console.log(row)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.detailContainer {
  padding: 20px;
  border-radius: 5px;
}

.table-container {
  padding: 0;
}

.el-dropdown-link {
  cursor: pointer;
  color: #00699d;
}

.el-icon-arrow-down {
  font-size: 12px;
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
  content: '\e6df';
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
