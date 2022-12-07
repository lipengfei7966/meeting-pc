<template>
    <div class="tranInfoContainer">
        <el-table :data="trainNumberInformationList" style="width: 100%;" max-height="130" stripe border>
            <el-table-column prop="trainNumber" label="车次" width="130">
            </el-table-column>
            <el-table-column prop="ticketGate" label="检票口" width="130">
            </el-table-column>
            <el-table-column prop="fromCityName" label="始发地" width="130">
            </el-table-column>
            <el-table-column prop="fromStationName" label="始发站" width="130">
            </el-table-column>
            <el-table-column prop="toCityName" label="目的地" width="200">
            </el-table-column>
            <el-table-column prop="toStationName" label="到达站" width="130">
            </el-table-column>
            <el-table-column prop="fromTime" label="出发时间" width="100">
            </el-table-column>
            <el-table-column prop="useTime" label="耗时" width="100">
            </el-table-column>
            <el-table-column prop="ticketStatus" label="车次状态" width="120">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['trainNumberInformationList'],
    name: 'trainInfoTable',
    data () {
        return {

        }
    },
    created () {
    },
    mounted () { },
    methods: {
        deleteRow () { }
    },
}
</script>

<style scoped lang="scss">
.tranInfoContainer {
    padding: 15px 15px 0 15px;
}

::v-deep.bs-new-container {
    min-height: 100px;
    border: none;
}

.el-table,
.plTableBox {
    min-height: 3px !important;
}
</style>
