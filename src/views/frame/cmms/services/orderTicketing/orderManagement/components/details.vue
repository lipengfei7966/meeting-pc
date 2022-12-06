<template>
    <div class="detailContainer">
        <h2>{{ detailTitle }}</h2>
        <commonSlot title="基础信息">
            <trainInfoTable :basicTrainInformation="basicTrainInformation" v-show="status === 'train'" />
            <airInfoTable :orderDetailInfo="orderDetailInfo" v-show="status === 'air'" />
        </commonSlot>
        <div class="refundRule">
            <el-link class="leftRules" type="primary" underline>退票规则</el-link>
            <el-link type="primary" underline>改签规则</el-link>
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
            <trainTravelTable v-show="status === 'train'" :tripInformationList="tripInformationList" />
            <airTravelTable v-show="status === 'air'" :tripInfoList="tripInfoList" />
        </commonSlot>
        <!-- <commonSlot title="订单跟踪">
            <trainOrderTail v-show="status === 'train'" />
            <airOrderTail v-show="status === 'air'" />
        </commonSlot> -->
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
import { trainDetail, airDetail } from '../utils/api'
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
            tripInfoList: []// 机票行程信息
        }
    },
    created () {
        this.status === 'train' ? this.trainDetailFn() : this.airDetailFn()
    },
    mounted () { },
    methods: {
        // 火车票订单详情数据查询
        trainDetailFn () {
            let orderCode = this.$route.params.orderCode
            trainDetail(orderCode).then(res => {
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
            let orderCode = this.$route.params.orderCode
            airDetail(orderCode).then(res => {
                console.log(res, '机票详情')
                this.orderDetailInfo = res.data.orderDetailInfo
                this.costDetailInfo = res.data.costDetailInfo
                this.flightDetailInfoList = res.data.flightDetailInfoList
                this.tripInfoList = res.data.tripInfoList
            })
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
</style>
