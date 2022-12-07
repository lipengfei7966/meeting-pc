<template>
    <div class="airTravelTableContainer">
        <el-table :data="tripInfoList" style="width: 100%" stripe border>
            <el-table-column prop="sonOrderCode" label="子订单号" width="100">
            </el-table-column>
            <el-table-column prop="passengerName" label="乘机人" width="100">
            </el-table-column>
            <el-table-column prop="certificateType" label="乘机人证件类型" width="100">
            </el-table-column>
            <el-table-column prop="changeOrderCode" label="乘机人证件号" width="100">
            </el-table-column>
            <el-table-column prop="passengerPhone" label="乘机人手机号" width="100">
            </el-table-column>
            <el-table-column prop="ticketNo" label="票号" width="130">
            </el-table-column>
            <el-table-column prop="cabin" label="舱位" width="100">
            </el-table-column>
            <el-table-column prop="cabinName" label="舱位名称" width="100">
            </el-table-column>
            <el-table-column prop="orderStatus" label="订单状态" width="100">
            </el-table-column>
            <el-table-column prop="refundOrderCode" label="退票订单号" width="100">
            </el-table-column>
            <el-table-column prop="changeOrderCode" label="改签订单号" width="100">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">

                <template>
                    <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                        改签
                    </el-button> -->
                    <el-popover placement="top" width="200" v-model="visible">
                        <p>您确定要退票吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                            <el-button type="primary" size="mini" @click="refundFightFn">确定</el-button>
                        </div>
                        <el-button slot="reference" type="text" size="small">退票</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { fightRefund } from '../../utils/api'
export default {
    props: ['tripInfoList', 'flightDetailInfoList', 'orderType', 'orderStatus'],
    name: 'airTravelTable',
    data () {
        return {
            visible: false,
            refundOrderType: 1,
            refundType: 1
        }
    },
    created () { },
    mounted () { },
    methods: {
        refundFightFn () {
            if ((this.orderStatus.includes(this.updateStatus))) {
                this.refundOrderType = 2
            }
            this.refundType = 1
            this.visible = false
            fightRefund({ orderCode: this.$route.params.orderCode, refundOrderType: this.refundOrderType, refundType: this.refundType, refundReason: '', flightCode: this.flightDetailInfoList[0].flightCode }).then(res => {
                console.log(res, 'res')
            })
        }
    },
}
</script>

<style scoped lang="scss">
.airTravelTableContainer {
    padding: 15px 15px 0 15px;
}

::v-deep.bs-new-container {
    min-height: 100px;
    border: none;
}
</style>
