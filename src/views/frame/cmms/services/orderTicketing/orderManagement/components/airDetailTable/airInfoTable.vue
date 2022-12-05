<template>
    <div class="tranInfoContainer bs-new-container">
        <el-table :data="tableData" style="width: 100%;" max-height="135" stripe border>
            <el-table-column fixed prop="date" label="航司" width="150">
            </el-table-column>
            <el-table-column prop="name" label="航司编码" width="120">
            </el-table-column>
            <el-table-column prop="province" label="机型" width="120">
            </el-table-column>
            <el-table-column prop="city" label="实际承运航班" width="120">
            </el-table-column>
            <el-table-column prop="address" label="餐食" width="300">
            </el-table-column>
            <el-table-column prop="zip" label="行程类型" width="120">
            </el-table-column>
            <el-table-column prop="zip" label="飞行时长" width="120">
            </el-table-column>
        </el-table>
        <el-table :data="tableData" style="width: 100%;" max-height="135" stripe border>
            <el-table-column fixed prop="date" label="起飞城市" width="150">
            </el-table-column>
            <el-table-column prop="name" label="抵达城市" width="120">
            </el-table-column>
            <el-table-column prop="province" label="起飞机场" width="120">
            </el-table-column>
            <el-table-column prop="city" label="抵达机场" width="120">
            </el-table-column>
            <el-table-column prop="address" label="起飞航站楼" width="300">
            </el-table-column>
            <el-table-column prop="zip" label="抵达航站楼" width="120">
            </el-table-column>
            <el-table-column prop="zip" label="起飞时间" width="120">
            </el-table-column>
            <el-table-column prop="zip" label="到达时间" width="120">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'trainInfoTable',
    data () {
        return {
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-07',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }]
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
</style>
