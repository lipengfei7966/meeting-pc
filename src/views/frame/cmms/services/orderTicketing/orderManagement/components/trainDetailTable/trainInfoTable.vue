<template>
    <div class="tranInfoContainer">
        <el-table :data="tableData" style="width: 100%;" max-height="130" stripe border>
            <el-table-column fixed prop="date" label="车次" width="150">
            </el-table-column>
            <el-table-column prop="name" label="检票口" width="120">
            </el-table-column>
            <el-table-column prop="province" label="始发地" width="120">
            </el-table-column>
            <el-table-column prop="city" label="始发站" width="120">
            </el-table-column>
            <el-table-column prop="address" label="目的地" width="250">
            </el-table-column>
            <el-table-column prop="zip" label="到达站" width="130">
            </el-table-column>
            <el-table-column prop="zip" label="出发时间" width="120">
            </el-table-column>
            <el-table-column prop="zip" label="耗时" width="120">
            </el-table-column>
            <el-table-column prop="zip" label="车次状态" width="120">
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

// ::v-deep.el-table td.el-table__cell {
//     border: none;
// }

// ::v-deep.el-table--small ::v-deep.el-table__cell {
//     border: none;
// }
</style>
