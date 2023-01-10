<template>
  <div class="detailContainer">
    <div class="info">
      <div class="baseInfo" style="width:78%;marginRight:10px">
        <commonSlot :title="$t('order.orderManagement.basicInformatio')">
          <template slot="pro_refund">
            <div class="refundRule">
              <el-link class="leftRules" type="primary" underline @click="trainRefundVisibleFn">{{$t('order.orderManagement.refundRule')}}</el-link>
            </div>
          </template>
          <div class="info_train_container">
            <table border="1px" align="center" bordercolor="#d7d7d8" cellspacing="0px" style="width:100%">
              <tr>
                <td class="tdTitle">{{$t('order.orderManagement.orderNumber')}}</td>
                <td>{{ basicTrainInformation. externalOrderNumber ? basicTrainInformation. externalOrderNumber : '-' }}</td>
                <td class="tdTitle">{{$t('order.orderManagement.reservationTime')}}</td>
                <td>{{ basicTrainInformation.orderTime ? basicTrainInformation.orderTime : '-' }}</td>
              </tr>
              <tr>
                <td class="tdTitle">{{$t('order.orderManagement.ticketPickupNumber')}}</td>
                <td>{{ basicTrainInformation.ticketNo ? basicTrainInformation.ticketNo : '-' }}</td>
                <td class="tdTitle">{{$t('order.orderManagement.contactPerson')}}</td>
                <td>{{ basicTrainInformation.contacts ? basicTrainInformation.contacts : '-' }}</td>
              </tr>
              <tr>
                <td class="tdTitle">{{$t('order.orderManagement.contactPhone')}}</td>
                <td>{{ basicTrainInformation.contactPhone ? basicTrainInformation.contactPhone : '-' }}
                </td>
                <td class="tdTitle">{{$t('order.orderManagement.orderStatus')}}</td>
                <td>{{ basicTrainInformation.orderStatus
                                        ? orderStatusFamtter[basicTrainInformation.orderStatus] : '-'
                                }}</td>
              </tr>
              <tr>
                <td class="tdTitle">{{$t('order.orderManagement.remarks')}}</td>
                <td>{{ basicTrainInformation.remarks ? basicTrainInformation.remarks : '-' }}</td>
              </tr>
            </table>
          </div>
        </commonSlot>
        <commonSlot :title="$t('order.orderManagement.trainNumberInformation')">
          <div class="transInfo" v-for="(item,index) in trainNumberInformationList" :key="index">
            <div class="transInfo_train">
              <h2 class="transInfo_train_code">{{item.trainNo != '' ? item.trainNo : '--'}}</h2>
              <div class="transInfo_train_in">{{item.ticketGate != '' ? item.ticketGate : '--'}}</div>
            </div>
            <div class="transInfo_time">
              <div class="transInfo_time_start">
                <h2 class="startTime">{{ item.fromTime }}</h2>
                <div class="startStrain"><b style="font-size: 14px;margin-right:10px">{{item.fromStationName}}</b>
                  <el-tag>{{$t('order.orderManagement.Start')}}</el-tag>
                </div>
                <div class="startDate">{{item.travelTime === undefined ? '--' :item.travelTime.split(' ')[0]}}</div>
              </div>
              <div class="transInfo_time_center">
                <div class="tripLengthTime">{{ item.useTime ? ChangeHourMinutestr(item.useTime) : '0h' }}</div>
                <div class="Via">
                  <div class="leftLine"></div>
                  <div class="RightLine"></div>
                  <div class="centerBox" style="cursor:pointer" @click="ViaHandle(item)">{{$t('order.orderManagement.stops')}}</div>
                </div>
              </div>
              <div class="transInfo_time_end">
                <h2 class="startTime">{{ item.toTime }}</h2>
                <div class="startStrain"><b style="font-size: 14px;margin-right:10px">{{item.toStationName}}</b>
                  <el-tag type="danger">{{$t('order.orderManagement.End')}}</el-tag>
                </div>
                <div class="startDate">{{item.travelTime === undefined ? '--' :item.travelTime.split(' ')[0]}}</div>
              </div>
            </div>
          </div>
        </commonSlot>
        <commonSlot :title="$t('order.orderManagement.tripInformation')">
          <div class="airTravelTableContainer bs-new-container">
            <el-table :data="tripInformationList" style="width: 100%" stripe border>
              <el-table-column prop="passengerName" :label="$t('order.orderManagement.passenger')" width="100">
              </el-table-column>
              <el-table-column prop="certificateType" :label="$t('order.orderManagement.passengerDocumentType')" width="100">
              </el-table-column>
              <el-table-column prop="certificateNumber" :label="$t('order.orderManagement.passengerIDNumber')" width="100">
              </el-table-column>
              <el-table-column prop="trainNo" :label="$t('order.orderManagement.trainNumber')" width="100">
              </el-table-column>
              <el-table-column prop="seatName" :label="$t('order.orderManagement.seat')" width="100">
              </el-table-column>
              <el-table-column prop="trainBox" :label="$t('order.orderManagement.carriage')" width="100">
              </el-table-column>
              <el-table-column prop="seatNumber" :label="$t('order.orderManagement.seatNumber')" width="100">
              </el-table-column>
              <el-table-column prop="orderStatus" :label="$t('order.orderManagement.orderStatus')" width="100">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.orderStatus === '1001'" :type="scope.row.orderStatus === '101' ? 'danger' : ''">{{scope.row.orderStatus}}</el-tag>
                  <el-tag v-if="scope.row.orderStatus === '1004'" :type="scope.row.orderStatus === '102' ? 'success' : ''">{{scope.row.orderStatus}}</el-tag>
                  <el-tag v-if="scope.row.orderStatus === '1006'" :type="scope.row.orderStatus === '103' ? 'info' : ''">{{scope.row.orderStatus}}</el-tag>
                  <el-tag v-if="scope.row.orderStatus !== '1001' && scope.row.orderStatus !== '1004' && scope.row.orderStatus !== '1006'">{{scope.row.orderStatus}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column fixed="right" :label="$t('order.orderManagement.operation')" width="100">
                <template slot-scope="scope">
                  <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                            改签
                        </el-button> -->
                  <el-button type="text" size="small" :disabled="!(fundTicket.includes(scope.row.orderStatus))" @click="handleRemoveClick(scope.row)">{{$t('order.orderManagement.refund')}}</el-button>
                </template>
              </el-table-column>
            </el-table>

          </div>
        </commonSlot>
        <commonSlot :title="$t('order.orderManagement.ordertracking')">
        </commonSlot>
      </div>
      <div class="payDetail">
        <div class="payContent">
          <div class="payTitle">{{$t('order.orderManagement.paymentInformation')}}</div>
          <div class="moneyDetail">
            <div class="allTotal">
              <h3>{{$t('order.orderManagement.orderTotal')}}</h3>
              <span>¥{{ costDetailInfo.totalAmountPaid ? costDetailInfo.totalAmountPaid : 0 }}</span>
            </div>
            <div class="jine">
              <h3>{{ costDetailInfo.fromStationName }}-{{costDetailInfo.toStationName}}
              </h3>
              <div class="smallRend">
                <div class="leftName">{{$t('order.orderManagement.ticketPrice')}}</div>
                <div class="RightMoney">￥{{ paymentInformationDto.fare }} X{{ tripInformationList.length }}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">{{$t('order.orderManagement.changeDifference')}}</div>
                <div class="RightMoney">￥{{paymentInformationDto.changeDifference === '' ?paymentInformationDto.changeDifference : 0}} X{{ tripInformationList.length }}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">{{$t('order.orderManagement.refundAmount')}}</div>
                <div class="RightMoney">￥{{paymentInformationDto.refundAmount === '' ? paymentInformationDto.refundAmount : 0}} X {{ tripInformationList.length }}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">{{$t('order.orderManagement.refundAndHhangeHandlingFee')}}</div>
                <div class="RightMoney">￥0 X {{ tripInformationList.length }}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">{{$t('order.orderManagement.cancellationCharge')}}</div>
                <div class="RightMoney">￥{{ serviceFee }} X {{ tripInformationList.length }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :title="$t('order.orderManagement.refundRule')" :visible.sync="refundVisible" width="50%" center>
      <div class="centerBox">
        <p>* {{ baggageText }}</p>
        <p>* {{ checkedBaggage }}</p>
        <p>* {{ refundText }}</p>
        <p>* {{ handheldLuggage }}</p>
        <p>* {{ refundText }}</p>
        <p>* {{ reissueText }}</p>
        <p>* {{ transferText }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refundVisible = false">{{$t('order.orderManagement.cancel')}}</el-button>
        <el-button type="primary" @click="refundVisible = false">{{$t('order.orderManagement.confirm')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('order.orderManagement.refundRule')" :visible.sync="trainRefundVisible" width="50%" center>
      <div class="centerBox">
        <p>* {{$t('order.orderManagement.finalRefundRules')}}</p>
        <p>* {{$t('order.orderManagement.noChargeTips')}}</p>
        <p>* {{$t('order.orderManagement.paperTicketTips')}}</p>
        <p>* {{$t('order.orderManagement.changeTips')}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="trainRefundVisible = false">{{$t('order.orderManagement.cancel')}}</el-button>
        <el-button type="primary" @click="trainRefundVisible = false">{{$t('order.orderManagement.confirm')}}</el-button>
      </span>
    </el-dialog>
    <!-- 退票弹窗 -->
    <el-dialog :title="$t('order.orderManagement.applicationForRefund')" :visible.sync="centerDialogVisible" width="50%" center top="10px">
      <div class="remove-line1">
        <img src="@/assets/frame/svg/wenhao.svg" class="wenhao" alt="" srcset="">
        <span>{{$t('order.orderManagement.sureRefund')}}</span>
      </div>
      <el-divider></el-divider>
      <div class="remove-line2">
        <span class="fontSize2Left fontWeight">{{$t('order.orderManagement.refundExpected')}}：</span><span class="fontSize2Right yellowColor">{{paymentInformationDto.fare - serviceFee}}{{$t('order.orderManagement.yuan')}}</span>
      </div>
      <el-divider></el-divider>
      <div class="remove-line3">
        <div class="remove-line3-1">
          <span class="fontSize3Left fontWeight">{{$t('order.orderManagement.handlingCharge')}}：</span><span class="fontSize3Right yellowColor">{{ serviceFee }}{{$t('order.orderManagement.yuan')}}</span>
        </div>
        <div class="remove-line3-2">
          <span class="fontSize3Left fontWeight">{{$t('order.orderManagement.ticket_Price')}}：</span><span class="fontSize3Right yellowColor">{{paymentInformationDto.fare}}{{$t('order.orderManagement.yuan')}}</span>
        </div>
        <div class="remove-line3-3">
          <span class="fontSize3Left fontWeight">{{$t('order.orderManagement.refundExpected')}}：</span><span class="fontSize3Right yellowColor">{{paymentInformationDto.fare - serviceFee}}{{$t('order.orderManagement.yuan')}}</span>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="remove-line4">
        <img src="@/assets/frame/svg/tanhao.svg" class="tanhao" alt="" srcset="">
        <span>{{$t('order.orderManagement.finalTransactionTime')}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">{{$t('order.orderManagement.cancel')}}</el-button>
        <el-button style="margin-bottom:250px" type="primary" @click="comfirmRefund">{{$t('order.orderManagement.confirm')}}</el-button>
        <div class="remove-rules">
          <div class="title">{{$t('order.orderManagement.refundRule')}}：</div>
          <div class="rule1">
            <p>* {{$t('order.orderManagement.finalRefundRules')}}</p>
            <p>* {{$t('order.orderManagement.noChargeTips')}}</p>
            <p>* {{$t('order.orderManagement.paperTicketTips')}}</p>
            <p>* {{$t('order.orderManagement.changeTips')}}</p>
          </div>
        </div>
      </span>

    </el-dialog>
    <!-- 经停站 -->
    <el-dialog :title="$t('order.orderManagement.stops')" :visible.sync="dialogTableVisible">
      <div class="bs-new-container">
        <el-table :data="viaList" :row-class-name="tableRowClassName" header-align='center'>
          <el-table-column property="stationNo" :label="$t('order.orderManagement.stationNumber')" width="100" align="center"></el-table-column>
          <el-table-column property="name" :label="$t('order.orderManagement.stationName')" width="150" align="center"></el-table-column>
          <el-table-column property="arriveTime" :label="$t('order.orderManagement.arrive')" width="100" align="center"></el-table-column>
          <el-table-column property="startTime" :label="$t('order.orderManagement.startingTime')" width="100" align="center"></el-table-column>
          <el-table-column property="viaTime" :label="$t('order.orderManagement.remain')" width="100" align="center"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import commonSlot from './components/commonSlot.vue'
import { trainDetail, airDetail, refundUpdateRule, estimatedRefund, comfirmRefund, listItem, trainVia } from './utils/api'
export default {
    components: { commonSlot },
    name: 'trainTicketDetails',
    data () {
        return {
            status: 'train',
            fundTicket: ['103', '108', '111', '112', '113'],
            viaList: [],
            dialogTableVisible: false,
            basicTrainInformation: {
                contactPhone: '',
                contacts: '',
                externalOrderNumber: '',
                orderNo: '',
                orderStatus: '',
                orderTime: ''
            },// 火车票基本信息
            paymentInformationDto: {},// 火车票支付信息
            trainNumberInformationList: [
                { "fromCityName": "", "fromStationName": "", "fromTime": "", "ticketGate": "", "ticketStatus": "", "toCityName": "", "toStationName": "", "toTime": "", "trainType": "", "useTime": 0 }
            ],// 火车票车次信息
            tripInformationList: [
                { "certificateNumber": "", "certificateType": "", "changeOrderNo": "", "orderStatus": "", "passengerName": "", "phone": "", "seatName": "", "seatNumber": "", "subOrderNo": "", "ticketNo": "", "trainBox": "", "trainNo": "" }
            ], // 火车票行程信息
            orderDetailInfo: {},//机票基本信息
            costDetailInfo: {},// 机票支付信息
            flightDetailInfoList: [],// 机票航班信息
            tripInfoList: [],// 机票行程信息
            refundVisible: false,
            baggageText: '',
            checkedBaggage: '',
            handheldLuggage: '',
            refundText: '',
            reissueText: '',
            transferText: '',
            orderCode: '',
            trainRefundVisible: false,
            orderStatusFamtter: {},
            orderStatussArr: [],
            travelsTypeArr: [],
            payTypeFamtter: {},
            payTypeArr: [],
            seatTypeFamtter: {},
            seatTypeArr: [],
            certificateTypeFamtter:{},
            certificateTypeArr:[],
            ticketStatussArr:[],
            ticketStatusFamtter:{},
            centerDialogVisible: false,
            refundAmount: 0,// 预估退票金额
            serviceFee: 0,// 手续费
            thepayAmount: 0,//退回金额
            theorderCode: '',
        }
    },
    created () {
        this.listItemFn()
        this.orderCodeFn()
        this.trainDetailFn()
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
            listItem('TICKET_STATUS').then(res => {
                // console.log(res, '获取字典码-火车票状态')
                for (const item of res.data) {
                    var key = item.dictItemVal
                    var value = item.dictItemName
                    this.ticketStatusFamtter[key] = value
                    this.ticketStatussArr.push([key, value])
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
            listItem('SEAT_COED').then(res => {
                // console.log(res, '获取字典码-支付方式')
                for (const item of res.data) {
                    var key = item.dictItemVal
                    var value = item.dictItemName
                    this.seatTypeFamtter[key] = value
                    this.seatTypeArr.push([key, value])
                }
            })
            listItem('CERTIFICATE_TYPE').then(res => {
                console.log(res, '获取字典码-支付方式')
                for (const item of res.data) {
                    var key = item.dictItemVal
                    var value = item.dictItemName
                    this.certificateTypeFamtter[key] = value
                    this.certificateTypeArr.push([key, value])
                }
            })
        },
        orderCodeFn () { this.orderCode = this.$route.params.orderCode },
        // 火车票订单详情数据查询
        trainDetailFn () {
            this.orderCode = this.$route.params.orderCode
            trainDetail(this.orderCode).then(res => {
                console.log(res, '火车票详情')
                this.basicTrainInformation = res.data.basicTrainInformation
                this.paymentInformationDto = res.data.paymentInformationDto
                this.trainNumberInformationList = res.data.trainNumberInformationList
                this.tripInformationList = res.data.tripInformationList
                // ---------------行程信息格式化处理---------------------------
                this.tripInformationList.forEach(v => {
                    v.seatName = this.seatTypeFamtter[v.seatName]
                    v.certificateType = this.certificateTypeFamtter[v.certificateType]
                    v.orderStatus = this.ticketStatusFamtter[v.orderStatus]
                })
                console.log(this.tripInformationList, 'this.tripInformationList')
            })
        },
        ChangeHourMinutestr(str) {
          if (str !== '0' && str !== '' && str !== null) {
            return (
              (Math.floor(str / 60)).toString()) + 'h' + ((str % 60).toString()) + 'm'
          } else {
            return ''
          }
        },
        ViaHandle (info) {
            this.dialogTableVisible = true
            let trainDate=info.travelTime.split(' ')[0]
            let queryVia = {
                trainCode: info.trainNo,
                trainDate: trainDate
            }
            trainVia(queryVia).then(res => {
                console.log(res, '经停站信息')
                this.viaList = res.data
                this.viaList.forEach(item => {
                    if (item.stationNo == '01') {
                        item.arriveTime = '--'
                        item.viaTime = '--'
                    } else if(item.stationNo==(this.viaList.length<10?('0'+this.viaList.length):(this.viaList.length+''))){
                        item.viaTime = this.$t('order.orderManagement.destination')
                    }else {
                        item.viaTime = this.stationTimeFamtter(item.arriveTime, item.startTime)
                    }
                })
            })
        },
        tableRowClassName ({ row, rowIndex }) {
            console.log(row,rowIndex,'row-rowIndex');
            if (rowIndex == 0) {
                return 'warning-row'
            } else if (rowIndex === (this.viaList.length - 1)) {
                return 'success-row'
            }
            return ''
        },
        stationTimeFamtter (arriveTime, startTime) {
            const arrHour = arriveTime.split(':')[0] - 0
            const arrMin = arriveTime.split(':')[1] - 0
            const staHour = startTime.split(':')[0] - 0
            const staMin = startTime.split(':')[1] - 0
            let mins = ( staHour - arrHour) * 60 + staMin - arrMin
            let h = parseInt(mins / 60)
            let m = parseInt(mins % 60)
            if (h <= 0) {
                return m + this.$t('order.orderManagement.minute')
            } else {
                if (h < 10 && m < 10) {
                    return '0' + h + ':' + '0' + m
                } else if (h < 10 && m > 10) {
                    return '0' + h + ':' + m
                } else if (h > 10 && m < 10) {
                    return h + ':' + '0' + m
                } else if (h > 10 && m > 10) {
                    return h + ':' + m
                }
            }

        },
        refundVisibleFn () {
            let queryRefund = {
                airline: this.flightDetailInfoList[0].airlineCompanyCode || '',
                cabin: this.tripInfoList[0].cabin || '',
                dateTime: this.flightDetailInfoList[0].depTime || '',
                des: this.flightDetailInfoList[0].arr || '',
                ori: this.flightDetailInfoList[0].dep || '',
                price: this.costDetailInfo.ticketAmount || ''
            }
            this.refundVisible = true
            refundUpdateRule(queryRefund).then(res => {
                console.log(res, 'queryRefund----')
                this.baggageText = res.data.baggageText
                this.checkedBaggage = res.data.checkedBaggage
                this.handheldLuggage = res.data.handheldLuggage
                this.refundText = res.data.refundText
                this.reissueText = res.data.reissueText
                this.transferText = res.data.transferText
            })
        },
        trainRefundVisibleFn () {
            this.trainRefundVisible = true
        },
        //退票弹起弹窗
        handleRemoveClick () {
            this.centerDialogVisible = true
            this.thepayAmount = this.payAmount
            this.refund(this.$route.params.orderCode)
            this.theorderCode = this.$route.params.orderCode
        },
        // 退改票信息
        refund (orderCode) {
            estimatedRefund(orderCode).then(res => {
                this.refundAmount = res.data.refundAmount
                this.serviceFee = res.data.serviceFee
            })
        },
        // 取消退款
        cancelFn () {
            this.centerDialogVisible = false
            this.thepayAmount = 0
            this.theorderCode = ''
        },
        // 确定退款
        comfirmRefund () {
            comfirmRefund(this.theorderCode).then(res => {
                if (res.status === true) this.$message({ message: this.$t('order.orderManagement.refundSuccess'), type: 'success' })
            })
            this.theorderCode = ''
            this.centerDialogVisible = false
            this.thepayAmount = 0
        },
    },
}
</script>

<style scoped lang="scss">
.detailContainer {
  padding: 20px;
  border-radius: 5px;
}

.warning-row {
  color: #1890ff !important;
}

.success-row {
  color: #1890ff !important;
}

.transInfo {
  display: flex;
  width: 100%;
  height: 78px;
}

.transInfo_train {
  text-align: center;
  width: 140px;
  height: 78px;
  border-right: 1px solid #f3f3f3;
  padding: 10px 0;
}

.redColor {
  color: red;
  background: #fef0f0;
  border-radius: 6px;
  opacity: 1;
  border: 1px solid #fde2e2;
  text-align: center;
  width: 50px;
  height: 30px;
  line-height: 30px;
}

.greenColor {
  color: #67c23a;
  background: #f0f9eb;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #e1f3d8;
  text-align: center;
  width: 50px;
  height: 30px;
  line-height: 30px;
}

.grayColor {
  color: #8f9299;
  background: #f4f4f5;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid #e9e9eb;
  text-align: center;
  width: 50px;
  height: 30px;
  line-height: 30px;
}

.orangeColor {
  color: orange;
  background: rgb(240, 226, 198);
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  border: 1px solid orange;
  text-align: center;
  width: 50px;
  height: 30px;
  line-height: 30px;
}

.transInfo_train_code {
  font-size: 24px;
}

.transInfo_time {
  display: flex;
  justify-content: space-around;
  flex: 1;
  font-size: 16px;
}

.transInfo_time_start {
  width: 30%;
  padding-left: 20px;
  text-align: center;
}

.startText {
  margin: 5px;
  padding: 2px;
  background: #438af6;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  font-weight: 400;
  color: #ffffff;
  font-size: 12px;
}

.endText {
  margin: 5px;
  padding: 2px;
  background: #ff738c;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  font-weight: 400;
  color: #ffffff;
  font-size: 12px;
}

.startDate {
  color: #999999;
  font-size: 14px;
  // background-image: -webkit-gradient(linear, left center, right center, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0))); //渐变
  // -webkit-background-clip: text; //规定背景的绘制区域
  // -webkit-text-fill-color: transparent; //规定文字的填充色
}

.transInfo_time_center {
  width: 5%;
  height: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tripLengthTime {
  font-weight: 400;
  color: #999999;
  font-size: 14px;
  margin-bottom: 10px;
}

.Via {
  width: 106px;
  height: 22px;
  position: relative;

  .leftLine {
    position: absolute;
    top: 10px;
    left: 0;
    width: 32px;
    height: 1px;
    background-image: -webkit-gradient(linear, left center, right center, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 1))); //渐变
  }

  .RightLine {
    position: absolute;
    top: 10px;
    right: 0;
    width: 32px;
    height: 1px;
    background-image: -webkit-gradient(linear, left center, right center, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0))); //渐变
  }

  .centerBox {
    width: 60px;
    height: 22px;
    position: absolute;
    top: 0px;
    left: 21px;
    z-index: 2;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    border: 1px solid #a6bdcd;
    color: #409eff;
    font-size: 12px;
    background-color: #fff;
    padding: 0;
    text-align: center;
  }
}

.transInfo_time_end {
  width: 20%;
  text-align: center;
}

.info {
  display: flex;
  justify-content: space-around;
}

.payDetail {
  flex: 1;
  width: 100%;
  height: 400px;
  // box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  border-radius: 10px 10px 10px 10px;
  background-color: #fff;
  margin-bottom: 10px;

  .payTitle {
    margin: 0 20px 0px 20px;
    height: 64px;
    line-height: 64px;
    font-weight: bolder;
    color: #333333;
    border-bottom: 1px dashed #d8d8d8;
    font-weight: bold;
    font-size: 22px;
  }

  .moneyDetail {
    width: 100%;
    padding: 20px;

    .allTotal {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      align-items: center;
      padding-bottom: 20px;

      h3 {
        font-size: 18px;
      }

      span {
        color: #409eff;
      }
    }

    .jine {
      width: 100%;
      padding: 20px;
      background: #f6f8fa;
      border-radius: 10px 10px 10px 10px;
      opacity: 1;

      .smallRend {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
      }
    }
  }
}

.leftRules {
  margin-right: 20px;
}

.centerBox {
  padding: 20px;
}

.container {
  padding: 15px 15px 0 15px;
}

table {
  border: none;
  border-collapse: collapse;
}

tr {
  border: none;
  border-collapse: collapse;
}

td {
  text-align: center;
  min-height: 35px;
  line-height: 35px;
  border: 1px solid #e4e7ed;
}

.tdTitle {
  background-color: #f5f7fa;
  width: 16.66%;
}

// .airTravelTableContainer {
//     padding: 15px 15px 0 15px;
// }

::v-deep.bs-new-container {
  min-height: 100px;
  border: none;
}

.el-table,
.plTableBox {
  min-height: 3px !important;
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