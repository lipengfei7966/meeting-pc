<template>
    <div class="detailContainer">
        <h2>{{ detailTitle }}</h2>
        <commonSlot title="基础信息">
            <trainInfoTable :basicTrainInformation="basicTrainInformation" v-show="status === 'train'" />
            <airInfoTable :orderDetailInfo="orderDetailInfo" v-show="status === 'air'" />
        </commonSlot>
        <div class="refundRule" v-show="status === 'air'">
            <el-link class="leftRules" type="primary" underline @click="refundVisibleFn">退票规则</el-link>
            <el-link type="primary" underline @click="refundVisibleFn">改签规则</el-link>
        </div>
        <div class="refundRule" v-show="status === 'train'">
            <el-link class="leftRules" type="primary" underline @click="trainRefundVisibleFn">退改签票规则</el-link>

        </div>
        <commonSlot title="支付信息">
            <trainPayTable :paymentInformationDto="paymentInformationDto" v-show="status === 'train'" />
            <airPayTable :costDetailInfo="costDetailInfo" v-show="status === 'air'" />
        </commonSlot>
        <commonSlot title="车次信息" v-show="status === 'train'">
            <tranInfoTable :trainNumberInformationList="trainNumberInformationList" />
        </commonSlot>
        <commonSlot title="航班信息" v-show="status === 'air'">
            <aiInfoTable :flightDetailInfoList="flightDetailInfoList" />
        </commonSlot>
        <commonSlot title="行程信息">
            <trainTravelTable v-show="status === 'train'" :tripInformationList="tripInformationList"
                :payAmount="paymentInformationDto.payAmount" />
            <airTravelTable v-show="status === 'air'" :tripInfoList="tripInfoList"
                :flightDetailInfoList="flightDetailInfoList" :orderType="tripInfoList.orderType"
                :orderStatus="orderDetailInfo.orderStatus" />
        </commonSlot>
        <commonSlot title="订单跟踪">
            <!-- <trainOrderTail v-show="status === 'train'" /> -->
            <!-- <airOrderTail v-show="status === 'air'" /> -->
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
    </div>
</template>

<script>
import commonSlot from './commonSlot.vue'
import trainInfoTable from './trainDetailTable/infoTable.vue'
import trainPayTable from './trainDetailTable/payTable.vue'
import airInfoTable from './airDetailTable/infoTable.vue'
import airPayTable from './airDetailTable/payTable.vue'
import tranInfoTable from './trainDetailTable/trainInfoTable'
import aiInfoTable from './airDetailTable/airInfoTable.vue'
import airTravelTable from './airDetailTable/airTravelTable.vue'
import trainTravelTable from './trainDetailTable/trainTravelTable.vue'
// import trainOrderTail from './trainDetailTable/orderTail.vue'
// import airOrderTail from './trainDetailTable/orderTail.vue'

import { trainDetail, airDetail, refundUpdateRule } from '../utils/api'
export default {
    props: ['detailTitle', 'status'],
    components: { commonSlot, trainInfoTable, airInfoTable, trainPayTable, airPayTable, aiInfoTable, airTravelTable, tranInfoTable, trainTravelTable },
    name: 'detailPage',
    data () {
        return {
            basicTrainInformation: {},// 火车票基本信息
            paymentInformationDto: {},// 火车票支付信息
            trainNumberInformationList: [],// 火车票车次信息
            tripInformationList: [], // 火车票行程信息
            orderDetailInfo: {},//机票基本信息
            costDetailInfo: {},// 机票支付信息
            flightDetailInfoList: [],// 机票车次信息
            tripInfoList: [],// 机票行程信息
            refundVisible: false,
            baggageText: '',
            checkedBaggage: '',
            handheldLuggage: '',
            refundText: '',
            reissueText: '',
            transferText: '',
            orderCode: '',
            trainRefundVisible: false
        }
    },
    created () {
        this.status === 'train' ? this.trainDetailFn() : this.airDetailFn()
        this.orderCodeFn()
    },
    mounted () { },
    methods: {
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
            })
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
        }
    },
}
</script>

<style scoped lang="scss">
.detailContainer {
    margin: 10px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
}

.refundRule {
    margin: 20px 20px 0 20px;
}

.leftRules {
    margin-right: 20px;
}

.centerBox {
    padding: 20px;
}
</style>
