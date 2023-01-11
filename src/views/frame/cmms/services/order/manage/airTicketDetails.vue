<template>
  <div class="detailContainer">
    <div class="info">
      <div class="baseInfo" style="width:78%;marginRight:10px">
        <commonSlot :title="$t('order.orderManagement.basicInformatio')">
          <template slot="pro_refund">
            <div class="refundRule">
              <el-link class="leftRules" type="primary" underline @click="refundVisibleFn">{{$t('order.orderManagement.refundRule')}}</el-link>
              <el-link type="primary" underline @click="refundVisibleFn">{{$t('order.orderManagement.changeOfTicketRules')}}</el-link>
            </div>
          </template>
          <div class="info_train_container">
            <table border="1px" align="center" bordercolor="#d7d7d8" cellspacing="0px" style="width:100%">
              <tr>
                <td class="tdTitle">{{$t('order.orderManagement.orderNumber')}}</td>
                <td>{{ orderDetailInfo.orderCode ? orderDetailInfo.orderCode : '-' }}</td>
                <td class="tdTitle">{{$t('order.orderManagement.reservationTime')}}</td>
                <td>{{ orderDetailInfo.orderTime ? orderDetailInfo.orderTime : '-' }}</td>
              </tr>
              <tr>
                <td class="tdTitle">{{$t('order.orderManagement.orderStatus')}}</td>
                <td>{{ orderDetailInfo.orderStatus? orderStatusFamtter[orderDetailInfo.orderStatus] : '-'}}</td>
                <td class="tdTitle">{{$t('order.orderManagement.contactPerson')}}</td>
                <td>{{ orderDetailInfo.contactPerson ? orderDetailInfo.contactPerson : '-' }}</td>
              </tr>
              <tr>
                <td class="tdTitle">{{$t('order.orderManagement.contactPhone')}}</td>
                <td>{{ orderDetailInfo.contactPhone ?orderDetailInfo.contactPhone : '-'}}</td>
                <td class="tdTitle">{{$t('order.orderManagement.remarks')}}</td>
                <td>{{ orderDetailInfo.remark ? orderDetailInfo.remark : '-' }}</td>
              </tr>
            </table>
          </div>
        </commonSlot>
        <commonSlot :title="$t('order.orderManagement.flight_Information')">
          <div class=" transInfo" v-for="(item,index) in flightDetailInfoList" :key="index">
            <div class="transInfo_train">
              <div class="tripType">{{ item.tripType == 0 ? $t('order.orderManagement.outwardVoyage') : $t('order.orderManagement.backTracking')}}</div>
              <h2 class="transInfo_train_code">{{item.carrierAirlines != '' ? item.carrierAirlines: '--'}}</h2>
              <div class="transInfo_train_in">{{item.flightNo != '' ?item.flightNo : '--'}}</div>
            </div>
            <div class="transInfo_time">
              <div class="transInfo_time_start">
                <h2 class="startTime">{{ item.depTime }}</h2>
                <div class="startStrain"><b style="font-size: 14px;margin-right:10px">{{item.dep}}</b>
                  <el-tag>{{$t('order.orderManagement.Start')}}</el-tag>
                </div>
                <div class="startDate">{{item.depDate === undefined ? '--' :item.depDate.split(' ')[0]}}</div>
              </div>
              <div class="transInfo_time_center">
                <div class="tripLengthTime">{{item.timeLong ? ChangeHourMinutestr(item.timeLong) : '--'}}</div>
                <div class="Via">
                  <div class="leftLine"></div>
                  <div class="RightLine"></div>
                  <div class="centerBoxAir" style="cursor:pointer">
                    <img key="" src="@/assets/frame/svg/feiji.svg" alt="">
                  </div>
                </div>
              </div>
              <div class="transInfo_time_end">
                <h2 class="startTime">{{ item.arrTime }}</h2>
                <div class="startStrain"><b style="font-size: 14px;margin-right:10px">{{item.arr}}</b>
                  <el-tag type="danger">{{$t('order.orderManagement.End')}}</el-tag>
                </div>
                <div class="startDate">{{item.arrDate === undefined ? '--' :item.arrDate.split(' ')[0]}}</div>
              </div>
            </div>
            <div class="meal">
              <div class="planModel">{{ item.planModel != '' ?item.planModel: '--' }}</div>
              <div class="isMeal"> {{ item.isMeal != '1' ? $t('order.orderManagement.haveMeal') :item.isMeal != '0' ? $t('order.orderManagement.NoMeals') : '--'}}</div>
            </div>
          </div>

        </commonSlot>
        <commonSlot :title="$t('order.orderManagement.tripInformation')">
          <div class="airTravelTableContainer bs-new-container">
            <el-table :data="tripInfoList" style="width: 100%" stripe border>
              <el-table-column prop="passengerName" :label="$t('order.orderManagement.airplanePassenger')" width="100">
              </el-table-column>
              <el-table-column prop="certificateType" :label="$t('order.orderManagement.passengerDocumentType')" width="100">
              </el-table-column>
              <el-table-column prop="certificateNumber" :label="$t('order.orderManagement.passengerIDNumber')" width="100">
              </el-table-column>
              <el-table-column prop="cabinName" :label="$t('order.orderManagement.shippingSpace')" width="100">
              </el-table-column>
              <el-table-column prop="cabinRate" :label="$t('order.orderManagement.discount')" width="100">
              </el-table-column>
              <el-table-column prop="orderStatus" :label="$t('order.orderManagement.orderStatus')" width="100">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.orderStatus === '101'" :type="scope.row.orderStatus === '101' ? 'danger' : ''">{{orderStatusFamtter[scope.row.orderStatus]}}</el-tag>
                  <el-tag v-if="scope.row.orderStatus === '102'" :type="scope.row.orderStatus === '102' ? 'success' : ''">{{orderStatusFamtter[scope.row.orderStatus]}}</el-tag>
                  <el-tag v-if="scope.row.orderStatus === '103'" :type="scope.row.orderStatus === '103' ? 'info' : ''">{{orderStatusFamtter[scope.row.orderStatus]}}</el-tag>
                  <el-tag v-if="scope.row.orderStatus !== '101' && scope.row.orderStatus !== '102' && scope.row.orderStatus !== '103'">{{ orderStatusFamtter[scope.row.orderStatus]}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column fixed="right" :label="$t('order.orderManagement.operation')" width="100">
                <template slot-scope="scope">
                  <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">改签</el-button> -->
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
              <span>￥{{ costDetailInfo.orderAmount }}</span>
            </div>
            <div class="jine">
              <h3>{{ costDetailInfo.dep }}-{{ costDetailInfo.arr }}</h3>
              <div class="smallRend">
                <div class="leftName">{{$t('order.orderManagement.mechanicalConstruction')}}</div>
                <div class="RightMoney">￥{{ costDetailInfo.macTax }} X{{ tripInfoList.length }}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">{{$t('order.orderManagement.fuel')}}</div>
                <div class="RightMoney">￥{{ costDetailInfo.oilTax}} X{{ tripInfoList.length }}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">{{$t('order.orderManagement.serviceCharge')}}</div>
                <div class="RightMoney">￥{{costDetailInfo.serviceFee}} X{{ tripInfoList.length }}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">{{$t('order.orderManagement.costUpgrade')}}</div>
                <div class="RightMoney">￥{{ costDetailInfo.upgradeCabinAmount }} X {{tripInfoList.length}}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">{{$t('order.orderManagement.cancellationCharge')}}</div>
                <div class="RightMoney">￥{{ costDetailInfo.refundServiceFee }} X {{ tripInfoList.length}}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">{{$t('order.orderManagement.reschedulingFee')}}</div>
                <div class="RightMoney">￥{{ costDetailInfo.changeAmount }} X {{ tripInfoList.length }}
                </div>
              </div>
              <div class="smallRend">
                <div class="leftName">{{$t('order.orderManagement.paymentTickets')}}</div>
                <div class="RightMoney">￥{{ costDetailInfo.serviceFee }} X {{ tripInfoList.length }}
                </div>
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
        <span>{{$t('order.orderManagement.applicationForRefund')}}</span>
      </div>
      <el-divider></el-divider>
      <div class="remove-line2">
        <span class="fontSize2Left fontWeight">{{$t('order.orderManagement.refundExpected')}}：</span><span class="fontSize2Right yellowColor">{{fightReissueRefund.returnPrice}}{{$t('order.orderManagement.yuan')}}</span>
      </div>
      <el-divider></el-divider>
      <div class="remove-line3">
        <div class="remove-line3-1">
          <span class="fontSize3Left fontWeight">{{$t('order.orderManagement.handlingCharge')}}：</span><span class="fontSize3Right yellowColor">
            {{ fightReissueRefund.refundPrice }}{{$t('order.orderManagement.yuan')}}</span>
        </div>
        <div class="remove-line3-2">
          <span class="fontSize3Left fontWeight">{{$t('order.orderManagement.ticket_Price')}}：</span><span class="fontSize3Right yellowColor">{{costDetailInfo.ticketAmount}}{{$t('order.orderManagement.yuan')}}</span>
        </div>
        <div class="remove-line3-3">
          <span class="fontSize3Left fontWeight">{{$t('order.orderManagement.refundExpected')}}：</span><span class="fontSize3Right yellowColor">{{fightReissueRefund.returnPrice}}{{$t('order.orderManagement.yuan')}}</span>
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
import commonSlot from './components/commonSlot.vue'
import { trainDetail, airDetail, refundUpdateRule, estimatedRefund, listItem, fightReissueRefund, fightRefund } from './utils/api'
export default {
    components: { commonSlot },
    name: 'airTicketDetails',
    data () {
        return {
            status: 'air',
            fundTicket: ['103', '108', '111', '112', '113'],
            orderDetailInfo: {},// 火车票基本信息
            paymentInformationDto: {},// 火车票支付信息
            trainNumberInformationList: [
                { "fromCityName": "", "fromStationName": "", "fromTime": "", "ticketGate": "", "ticketStatus": "", "toCityName": "", "toStationName": "", "toTime": "", "trainType": "", "useTime": 0 }
            ],// 火车票车次信息
            tripInformationList: [
                { "certificateNumber": "", "certificateType": "", "changeOrderNo": "", "orderStatus": "", "passengerName": "", "phone": "", "seatName": "", "seatNumber": "", "subOrderNo": "", "ticketNo": "", "trainBox": "", "trainNo": "" }
            ], // 火车票行程信息
            orderDetailInfo: {},//机票基本信息
            costDetailInfo: {},// 机票支付信息
            flightDetailInfoList: [
                { "airlineCompanyCode": "", "arr": "", "arrCity": "", "arrCode": "", "arrDate": "", "arrTerminal": "", "arrTime": "", "carrierAirlines": "", "dep": "", "depCity": "", "depCode": "", "depDate": "", "depTerminal": "", "depTime": "", "flightCode": "", "flightNo": "", "isMeal": "", "orderType": "", "planModel": "", "ticketNo": "", "tripType": "" }
            ],// 机票航班信息
            tripInfoList: [
                { "cabin": "", "cabinName": "", "certificateNumber": "", "certificateType": "", "changeOrderCode": "", "flightCode": "", "orderStatus": "", "orderType": "", "passengerName": "", "passengerPhone": "", "refundOrderCode": "", "sonOrderCode": "", "ticketNo": "" }
            ],// 机票行程信息
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
            centerDialogVisible: false,
            refundAmount: 0,// 预估退票金额
            serviceFee: 0,// 手续费
            thepayAmount: 0,//退回金额
            theorderCode: '',
            orderStatus: '',
            fightReissueRefund: {
                refundPrice: 0,
                reissuePrice: 0,
                returnPrice: 0,
                ticketno: '',
                upgradecabinPrice: 0,
            }
        }
    },
    created () {
        this.listItemFn()
        this.orderCodeFn()
        this.orderStatus = this.$route.params.orderStatus
        this.airDetailFn()
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
            listItem('PAY_TYPE').then(res => {
                // console.log(res, '获取字典码-支付方式')
                for (const item of res.data) {
                    var key = item.dictItemVal
                    var value = item.dictItemName
                    this.payTypeFamtter[key] = value
                    this.payTypeArr.push([key, value])
                }
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
        orderCodeFn () { this.orderCode = this.$route.params.orderCode },
        // 机票订单详情数据查询
        airDetailFn () {
            this.orderCode = this.$route.params.orderCode
            airDetail(this.orderCode).then(res => {
                console.log(res, '机票详情')
                this.orderDetailInfo = res.data.orderDetailInfo
                this.costDetailInfo = res.data.costDetailInfo
                this.flightDetailInfoList = res.data.flightDetailInfoList
                this.tripInfoList = res.data.tripInfoList
                // ------航班信息格式化处理---------
                this.tripInfoList.forEach(v => {
                  v.cabinRate = (v.cabinRate / 10) == 10 ? '全价' : (v.cabinRate / 10) + '折'
                })
            })
        },
        refundFn () {
          let driveDetailRefund=this.flightDetailInfoList[this.flightDetailInfoList.length-1]
            let queryRefund = {
                airline: driveDetailRefund.airlineCompanyCode || '',
                cabin: driveDetailRefund.cabin || '',
                dateTime: driveDetailRefund.depTime || '',
                des: this.costDetailInfo.arr || '',
                ori: this.costDetailInfo.dep || '',
                price: this.costDetailInfo.ticketAmount || 0
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
        refundVisibleFn () {
            this.refundFn()
            this.refundVisible = true
        },
        trainRefundVisibleFn () {
            this.trainRefundVisible = true
        },
        //退票弹起弹窗
        handleRemoveClick (row) {
            console.log(row, 'row退票')
            this.centerDialogVisible = true
            this.thepayAmount = this.payAmount
            this.theRow = row
            this.reissueRefundPrice(row)
            this.refundFn()
            this.theorderCode = this.$route.params.orderCode
        },
        // 退改票信息
        refund (orderCode) {
            estimatedRefund(orderCode).then(res => {
                this.refundAmount = res.data.refundAmount
                this.serviceFee = res.data.serviceFee
            })
        },
        // 预计改签费
        reissueRefundPrice (row) {
            let queryReissueRefundPrice = {
                computedType: 1,
                flightInfoCode: row.flightCode,
                orderCode: this.$route.params.orderCode,
                orderType: this.orderDetailInfo.orderStatus === '108' ? '2' : '1'
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
        // 取消退款
        cancelFn () {
            this.centerDialogVisible = false
            this.thepayAmount = 0
            this.theorderCode = ''
        },
        // 确定退款
        comfirmRefund () {
            let queryComfirmRefund = {
                flightCode: this.theRow.flightCode,
                orderCode: this.$route.params.orderCode,
                refundOrderType: this.theRow.orderStatus === '108' ? 2 : 1,
                refundReason: '',
                refundType: 0
            }
            fightRefund(queryComfirmRefund).then(res => {
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

.transInfo {
  display: flex;
  width: 100%;
  height: 78px;
}

.transInfo_train {
  text-align: center;
  width: 190px;
  height: 78px;
  border-right: 1px solid #f3f3f3;
  padding: 10px 0;
  padding-top: 20px;
  position: relative;

  .tripType {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 20px;
    background: #438af6;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    color: #fff;
  }
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
  font-size: 16px;
}

.transInfo_time {
  display: flex;
  justify-content: space-around;
  flex: 1;
  font-size: 16px;
  border-right: 1px solid #f3f3f3;
}

.transInfo_time_start {
  width: 30%;
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
    width: 35px;
    height: 1px;
    background-image: -webkit-gradient(linear, left center, right center, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 1))); //渐变
  }

  .RightLine {
    position: absolute;
    top: 10px;
    right: 0;
    width: 35px;
    height: 1px;
    background-image: -webkit-gradient(linear, left center, right center, from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0))); //渐变
  }

  .centerBoxAir {
    width: 60px;
    height: 22px;
    position: absolute;
    top: 0px;
    left: 22px;
    z-index: 2;
    border-radius: 4px 4px 4px 4px;
    opacity: 1;
    // border: 1px solid #A6BDCD;
    // color: #409EFF;
    font-size: 12px;
    // background-color: #fff;
    padding: 0;
    text-align: center;

    img {
      width: 24px;
    }
  }
}

.transInfo_time_end {
  width: 20%;
  text-align: center;
}

.meal {
  width: 150px;
  padding: 0 40px;
}

.info {
  display: flex;
  justify-content: space-around;
}

.payDetail {
  flex: 1;
  width: 100%;
  height: 450px;
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

