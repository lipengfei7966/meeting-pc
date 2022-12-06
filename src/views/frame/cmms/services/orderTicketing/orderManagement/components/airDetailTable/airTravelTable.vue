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
                <template slot-scope="scope">
                    <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                        改签
                    </el-button> -->
                    <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                        退票
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['tripInfoList'],
    name: 'airTravelTable',
    data () {
        return {
        }
    },
    created () { },
    mounted () { },
    methods: {
        deleteRow (index, rows) {
            rows.splice(index, 1)
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
