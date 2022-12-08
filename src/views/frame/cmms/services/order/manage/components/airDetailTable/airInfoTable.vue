<template>
    <div class="tranInfoContainer">
        <el-table :data="flightDetailInfoList" style="width: 100%;" max-height="135" stripe border>
            <el-table-column prop="carrierAirlines" label="航司" width="170"></el-table-column>
            <el-table-column prop="airlineCompanyCode" label="航司编码" width="170"></el-table-column>
            <el-table-column prop="planModel" label="机型" width="200"></el-table-column>
            <el-table-column prop="flightCode" label="实际承运航班" width="200"></el-table-column>
            <el-table-column prop="isMeal" label="餐食" width="170"></el-table-column>
            <el-table-column prop="tripType" label="行程类型" width="170"></el-table-column>
            <el-table-column prop="timeLong" label="飞行时长" width="170"></el-table-column>
        </el-table>
        <el-table :data="flightDetailInfoList" style="width: 100%;" max-height="135" stripe border>
            <el-table-column prop="depCity" label="起飞城市" width="150"></el-table-column>
            <el-table-column prop="arrCity" label="抵达城市" width="150"></el-table-column>
            <el-table-column prop="dep" label="起飞机场" width="170"></el-table-column>
            <el-table-column prop="arr" label="抵达机场" width="170"></el-table-column>
            <el-table-column prop="depTerminal" label="起飞航站楼" width="160"></el-table-column>
            <el-table-column prop="arrTerminal" label="抵达航站楼" width="150"></el-table-column>
            <el-table-column prop="depTime" label="起飞时间" width="150"></el-table-column>
            <el-table-column prop="arrTime" label="到达时间" width="150"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['flightDetailInfoList'],
    name: 'trainInfoTable',
    data () {
        return {
        }
    },
    created () { },
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
