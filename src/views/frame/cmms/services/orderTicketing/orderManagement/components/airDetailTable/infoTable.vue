<template>
    <div class="container">
        <table border="1px" align="center" bordercolor="#d7d7d8" cellspacing="0px" style="width:100%">
            <tr>
                <td class="tdTitle">订单号</td>
                <td>{{}}</td>
                <td class="tdTitle">TMC订单号</td>
                <td>{{}}</td>
                <td class="tdTitle">票号</td>
                <td>{{}}</td>
            </tr>
            <tr>
                <td class="tdTitle">所属会议</td>
                <td>{{}}</td>
                <td class="tdTitle">所属客户</td>
                <td>{{}}</td>
                <td class="tdTitle">下单时间</td>
                <td>{{}}</td>
            </tr>
            <tr>
                <td class="tdTitle">预定人</td>
                <td>{{}}</td>
                <td class="tdTitle">联系人</td>
                <td>{{}}</td>
                <td class="tdTitle">联系人电话</td>
                <td>{{}}</td>
            </tr>
            <tr>
                <td class="tdTitle">联系人邮箱</td>
                <td>{{}}</td>
                <td class="tdTitle">订单状态</td>
                <td>{{}}</td>
                <td class="tdTitle">备注</td>
                <td>{{ }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: '',
    data () {
        return {

        }
    },
    created () { },
    mounted () { },
    methods: {},
}
</script>

<style scoped lang="scss">
.container {
    padding: 15px 15px 0 15px;
}

table {
    border: none;
    border-collapse: collapse;
}

tr {
    border: none;
    border-collapse: collapse;
}

.tdTitle {
    background-color: #fafafa;
    width: 16.66%;
}

td {
    text-align: center;
    min-height: 35px;
    line-height: 35px;
    border: 1px solid #d7d7d8;
}

td:hover {
    background-color: #e0eafa;
}
</style>
