<template>
    <div class="detailContainer">
        <h2>{{ detailTitle }}</h2>
        <commonSlot title="基础信息">
            <trainInfoTable v-show="status === 'train'" />
            <airInfoTable v-show="status === 'air'" />
        </commonSlot>
        <commonSlot title="支付信息">
            <trainPayTable v-show="status === 'train'" />
            <airPayTable v-show="status === 'air'" />
        </commonSlot>
        <commonSlot title="车次信息" v-show="status === 'train'">
            <tranInfoTable />
        </commonSlot>
        <commonSlot title="航班信息" v-show="status === 'air'">
            <aiInfoTable />
        </commonSlot>
        <commonSlot title="行程信息">
            <trainTravelTable v-show="status === 'train'" />
            <airTravelTable v-show="status === 'air'" />
        </commonSlot>
        <commonSlot title="订单跟踪">
            <trainOrderTail v-show="status === 'train'" />
            <airOrderTail v-show="status === 'air'" />
        </commonSlot>
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
import trainOrderTail from './trainDetailTable/orderTail.vue'
import airOrderTail from './trainDetailTable/orderTail.vue'
import { trainDetail } from '../utils/api'
export default {
    props: ['detailTitle', 'status'],
    components: { commonSlot, trainInfoTable, trainPayTable, airInfoTable, airPayTable, tranInfoTable, aiInfoTable, airTravelTable, trainTravelTable, trainOrderTail, airOrderTail },
    name: 'detailPage',
    data () {
        return {
            // detailInfo: {}
        }
    },
    created () {
        // this.trainDetailFn()
        // console.log(this.$route.query.orderCode)
    },
    mounted () { },
    methods: {
        // trainDetailFn () {
        //     let orderCode = this.$route.query.orderCode
        //     trainDetail(orderCode).then(res => {
        //         console.log(res, '车票详情')
        //     })
        // }
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
</style>
