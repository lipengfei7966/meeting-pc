<template>
    <div class="airTravelTableContainer">
        <el-table :data="tripInformationList" style="width: 100%" stripe border>
            <el-table-column prop="subOrderNo" label="子订单号" width="100">
            </el-table-column>
            <el-table-column prop="passengerCode" label="乘客" width="100">
            </el-table-column>
            <el-table-column prop="certificateType" label="乘客证件类型" width="100">
            </el-table-column>
            <el-table-column prop="certificateNumber" label="乘客证件号" width="100">
            </el-table-column>
            <el-table-column prop="phone" label="乘客手机号" width="150">
            </el-table-column>
            <el-table-column prop="trainNo" label="车次" width="100">
            </el-table-column>
            <el-table-column prop="seatName" label="坐席" width="100">
            </el-table-column>
            <el-table-column prop="trainBox" label="车厢" width="100">
            </el-table-column>
            <el-table-column prop="seatNumber" label="座位号" width="100">
            </el-table-column>
            <el-table-column prop="ticketNo" label="票号" width="100">
            </el-table-column>
            <el-table-column prop="orderStatus" label="订单状态" width="100">
            </el-table-column>
            <el-table-column prop="refundOrderNo" label="退票订单号" width="100">
            </el-table-column>
            <el-table-column prop="changeOrderNo" label="改签订单号" width="100">
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
    name: 'airTravelTable',
    props: ['tripInformationList'],
    data () {
        return {
        }
    },
    created () { },
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
