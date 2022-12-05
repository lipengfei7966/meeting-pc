<template>
    <div class="airTravelTableContainer  bs-new-container">
        <el-table :data="tableData" style="width: 100%" stripe border>
            <el-table-column prop="date" label="子订单号" width="150">
            </el-table-column>
            <el-table-column prop="name" label="乘机人" width="120">
            </el-table-column>
            <el-table-column prop="province" label="乘机人证件类型" width="120">
            </el-table-column>
            <el-table-column prop="city" label="乘机人证件号" width="120">
            </el-table-column>
            <el-table-column prop="address" label="乘机人手机号" width="300">
            </el-table-column>
            <el-table-column prop="zip" label="票号" width="120">
            </el-table-column>
            <el-table-column prop="zip" label="舱位" width="120">
            </el-table-column>
            <el-table-column prop="zip" label="舱位名称" width="120">
            </el-table-column>
            <el-table-column prop="zip" label="订单状态" width="120">
            </el-table-column>
            <el-table-column prop="zip" label="退票订单号" width="120">
            </el-table-column>
            <el-table-column prop="zip" label="改签订单号" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                        改签
                    </el-button>
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
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-08',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-06',
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
