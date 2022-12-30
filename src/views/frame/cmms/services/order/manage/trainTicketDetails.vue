<template>
  <div class="detailContainer">
    <div class="info">
      <div class="baseInfo" style="width:70%;marginRight:10px">
        <commonSlot title="基础信息">
          <template slot="pro_refund">
            <div class="refundRule">
              <el-link class="leftRules" type="primary" underline @click="trainRefundVisibleFn">退改签票规则</el-link>
            </div>
          </template>
          <div class="info_train_container">
            <table border="1px" align="center" bordercolor="#d7d7d8" cellspacing="0px" style="width:100%">
              <tr>
                <td class="tdTitle">订单号</td>
                <td>{{ basicTrainInformation.orderNo ? basicTrainInformation.orderNo : '-' }}</td>
                <td class="tdTitle">预定时间</td>
                <td>{{ basicTrainInformation.orderTime ? basicTrainInformation.orderTime : '-' }}</td>
              </tr>
              <tr>
                <td class="tdTitle">取票号</td>
                <td>{{ tripInformationList[0].ticketNo ? tripInformationList[0].ticketNo : '-' }}</td>
                <td class="tdTitle">联系人</td>
                <td>{{ basicTrainInformation.contacts ? basicTrainInformation.contacts : '-' }}</td>
              </tr>
              <tr>
                <td class="tdTitle">联系人电话</td>
                <td>{{ basicTrainInformation.contactPhone ? basicTrainInformation.contactPhone : '-' }}
                </td>
                <td class="tdTitle">订单状态</td>
                <td>{{ basicTrainInformation.orderStatus
                                        ? orderStatusFamtter[basicTrainInformation.orderStatus] : '-'
                                }}</td>
              </tr>
              <tr>
                <td class="tdTitle">备注</td>
                <td>{{ basicTrainInformation.remarks ? basicTrainInformation.remarks : '-' }}</td>
              </tr>
            </table>
          </div>
        </commonSlot>
        <commonSlot title="车次信息">
          <div class="transInfo">
            <div class="transInfo_train">
              <h2 class="transInfo_train_code">{{
                                    tripInformationList[0].trainNo != '' ? tripInformationList[0].trainNo : '--'
                            }}</h2>
              <div class="transInfo_train_in">{{
                                    trainNumberInformationList[0].ticketGate != '' ?
                                        trainNumberInformationList[0].ticketGate : '--'
                            }}</div>
            </div>
            <div class="transInfo_time">
              <div class="transInfo_time_start">
                <h2 class="startTime">{{ trainNumberInformationList[0].fromTime }}</h2>
                <div class="startStrain"><b style="font-size: 14px;">{{
                                        trainNumberInformationList[0].fromStationName
                                }}</b> <span class="startText">始</span></div>
                <div class="startDate">{{
                                        trainNumberInformationList[0].travelTime === undefined ? '--' :
                                            trainNumberInformationList[0].travelTime.split(' ')[0]
                                }}</div>
              </div>
              <div class="transInfo_time_center">
                <div class="tripLengthTime">{{ trainNumberInformationList[0].useTime }}</div>
                <div class="Via">
                  <div class="leftLine"></div>
                  <div class="RightLine"></div>
                  <div class="centerBox" style="cursor:pointer" @click="ViaHandle">经停站
                  </div>
                </div>
              </div>
              <div class="transInfo_time_end">
                <h2 class="startTime">{{ trainNumberInformationList[0].toTime }}</h2>
                <div class="startStrain"><b style="font-size: 14px;">{{
                                        trainNumberInformationList[0].toStationName
                                }}</b> <span class="endText">终</span></div>
                <div class="startDate">{{
                                        trainNumberInformationList[0].travelTime === undefined ? '--' :
                                            trainNumberInformationList[0].travelTime.split(' ')[0]
                                }}</div>
              </div>
            </div>
          </div>
        </commonSlot>
      </div>
      <div class="payDetail">
        <div class="payContent">
          <div class="payTitle">支付信息</div>
          <div class="moneyDetail">
            <div class="allTotal">
              <h3>订单总金额</h3>
              <span>￥{{ (paymentInformationDto.fare * tripInformationList.length) }}</span>
            </div>
            <div class="jine">
              <h3>{{ trainNumberInformationList[0].fromCityName }}-{{
                                    trainNumberInformationList[0].toCityName
                            }}
              </h3>
              <div class="smallRend">
                <div class="leftName">出票价</div>
                <div class="RightMoney">￥{{ paymentInformationDto.fare }} X
                  {{ tripInformationList.length }}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">改签差额</div>
                <div class="RightMoney">￥{{
                                        paymentInformationDto.changeDifference === '' ?
                                            paymentInformationDto.changeDifference : 0
                                }} X
                  {{ tripInformationList.length }}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">退款金额</div>
                <div class="RightMoney">￥{{
                                        paymentInformationDto.refundAmount === '' ? paymentInformationDto.refundAmount : 0
                                }} X
                  {{ tripInformationList.length }}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">退改手续费</div>
                <div class="RightMoney">￥0 X {{ tripInformationList.length }}</div>
              </div>
              <div class="smallRend">
                <div class="leftName">退票手续费</div>
                <div class="RightMoney">￥{{ serviceFee }} X {{ tripInformationList.length }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <commonSlot title="行程信息">
      <div class="airTravelTableContainer bs-new-container">
        <el-table :data="tripInformationList" style="width: 100%" stripe border>
          <el-table-column prop="passengerName" label="乘客" width="100">
          </el-table-column>
          <el-table-column prop="certificateType" label="乘客证件类型" width="100">
          </el-table-column>
          <el-table-column prop="certificateNumber" label="乘客证件号" width="100">
          </el-table-column>
          <el-table-column prop="trainNo" label="车次" width="100">
          </el-table-column>
          <el-table-column prop="seatName" label="坐席" width="100">
          </el-table-column>
          <el-table-column prop="trainBox" label="车厢" width="100">
          </el-table-column>
          <el-table-column prop="seatNumber" label="座位号" width="100">
          </el-table-column>
          <el-table-column prop="orderStatus" label="订单状态" width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.orderStatus === '101'" :class="scope.row.orderStatus === '101' ? 'redColor' : ''">{{
                                        orderStatusFamtter[scope.row.orderStatus]
                                }}</div>
              <div v-if="scope.row.orderStatus === '102'" :class="scope.row.orderStatus === '102' ? 'greenColor' : ''">{{
                                        orderStatusFamtter[scope.row.orderStatus]
                                }}</div>
              <div v-if="scope.row.orderStatus === '103'" :class="scope.row.orderStatus === '103' ? 'grayColor' : ''">{{
                                        orderStatusFamtter[scope.row.orderStatus]
                                }}</div>
              <div v-if="scope.row.orderStatus !== '101' && scope.row.orderStatus !== '102' && scope.row.orderStatus !== '103'" class="">{{
                                        orderStatusFamtter[scope.row.orderStatus]
                                }}</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                        改签
                    </el-button> -->
              <el-button type="text" size="small" :disabled="!(fundTicket.includes(scope.row.orderStatus))" @click="handleRemoveClick(scope.row)">退票</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </commonSlot>
    <commonSlot title="订单跟踪">
    </commonSlot>
    <el-dialog title="退票规则" :visible.sync="refundVisible" width="50%" center>
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
        <el-button @click="refundVisible = false">取 消</el-button>
        <el-button type="primary" @click="refundVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="退票规则" :visible.sync="trainRefundVisible" width="50%" center>
      <div class="centerBox">
        <p>* 退票手续费以最终退款金额以铁路部门实退为准</p>
        <p>* 距发车时间8天（含当日）以上，不收手续费</p>
        <p>* 如已取纸质车票，请携带有效证件至火车票窗口办理退票</p>
        <p>* 改签或变更到站后的车票乘车日期在春运期间的，退票时一律按开车时间前不足24小时标准核收退票费。2022年春运期间为1月21日至3月1日</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="trainRefundVisible = false">取 消</el-button>
        <el-button type="primary" @click="trainRefundVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 退票弹窗 -->
    <el-dialog title="退票申请" :visible.sync="centerDialogVisible" width="50%" center top="10px">
      <div class="remove-line1">
        <img src="@/assets/frame/svg/wenhao.svg" class="wenhao" alt="" srcset="">
        <span>您确认要退票吗？</span>
      </div>
      <el-divider></el-divider>
      <div class="remove-line2">
        <span class="fontSize2Left fontWeight">预计退款：</span><span class="fontSize2Right yellowColor">{{
                        paymentInformationDto.fare - serviceFee
                }}元</span>
      </div>
      <el-divider></el-divider>
      <div class="remove-line3">
        <div class="remove-line3-1">
          <span class="fontSize3Left fontWeight">手续费用：</span><span class="fontSize3Right yellowColor">
            {{ serviceFee }}元</span>
        </div>
        <div class="remove-line3-2">
          <span class="fontSize3Left fontWeight">车票票价：</span><span class="fontSize3Right yellowColor">{{
                            paymentInformationDto.fare
                    }}元</span>
        </div>
        <div class="remove-line3-3">
          <span class="fontSize3Left fontWeight">预计退款：</span><span class="fontSize3Right yellowColor">{{
                            paymentInformationDto.fare - serviceFee
                    }}元</span>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="remove-line4">
        <img src="@/assets/frame/svg/tanhao.svg" class="tanhao" alt="" srcset="">
        <span>实际核收退票费及应退票款将按最终交易时间计算。</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button style="margin-bottom:250px" type="primary" @click="comfirmRefund">确
          定</el-button>
        <div class="remove-rules">
          <div class="title">退票规则：</div>
          <div class="rule1">
            <p>* 退票手续费以最终退款金额以铁路部门实退为准</p>
            <p>* 距发车时间8天（含当日）以上，不收手续费</p>
            <p>* 如已取纸质车票，请携带有效证件至火车票窗口办理退票</p>
            <p>* 改签或变更到站后的车票乘车日期在春运期间的，退票时一律按开车时间前不足24小时标准核收退票费。2022年春运期间为1月21日至3月1日</p>
          </div>
        </div>
      </span>

    </el-dialog>
    <!-- 经停站 -->
    <el-dialog title="经停站" :visible.sync="dialogTableVisible">
      <div class="bs-new-container">
        <el-table :data="viaList" :row-class-name="tableRowClassName" header-align='center'>
          <el-table-column property="stationNo" label="站次" width="100" align="center"></el-table-column>
          <el-table-column property="name" label="站名" width="150" align="center"></el-table-column>
          <el-table-column property="arriveTime" label="到达" width="100" align="center"></el-table-column>
          <el-table-column property="startTime" label="发时" width="100" align="center"></el-table-column>
          <el-table-column property="viaTime" label="停留" width="100" align="center"></el-table-column>
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
                orderStatus: '' || this.$route.params.orderStatus,
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
        this.serviceFee = this.$route.params.serviceFee
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
            // certificateType
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
                })
                console.log(res.data.trainNumberInformationList, 'res.data.trainNumberInformationList')
            })
        },
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
            })
        },
        ViaHandle () {
            this.dialogTableVisible = true
            let queryVia = {
                arriveStation: this.trainNumberInformationList[0].toStationName,
                fromStation: this.trainNumberInformationList[0].fromStationName,
                onlyLowPrice: '',
                trainCode: this.tripInformationList[0].trainNo,
                trainSeatType: this.tripInformationList[0].seatName,
                trainType: this.trainNumberInformationList[0].trainType,
                travelTime: this.trainNumberInformationList[0].travelTime
            }
            trainVia(queryVia).then(res => {
                console.log(res, '经停站信息')
                this.viaList = res.data
                this.viaList.forEach(item => {
                    if (item.stationNo == '01') {
                        item.arriveTime = '--'
                        item.viaTime = '--'
                    } else if(item.stationNo==(this.viaList.length<10?('0'+this.viaList.length):(this.viaList.length+''))){
                        item.viaTime = '终点'
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
            // console.log(new Date(arriveTime).getTime(), '到达时间')
            // console.log(new Date(startTime).getTime(), '起始时间')
            const arrHour = arriveTime.split(':')[0] - 0
            const arrMin = arriveTime.split(':')[1] - 0
            const staHour = startTime.split(':')[0] - 0
            const staMin = startTime.split(':')[1] - 0
            let mins = (arrHour - staHour) * 60 + arrMin - staMin
            let h = mins / 60
            let m = mins % 60
            if (h <= 0) {
                return m + '分钟'
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
                if (res.status === true) this.$message({ message: '退票成功', type: 'success' })
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