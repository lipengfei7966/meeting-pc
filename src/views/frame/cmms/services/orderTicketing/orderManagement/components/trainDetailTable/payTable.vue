<template>
    <div class="container">
        <table border="1px" align="center" bordercolor="#d7d7d8" cellspacing="0px" style="width:100%">
            <tr>
                <td class="tdTitle">结算账户名</td>
                <td>{{}}</td>
                <td class="tdTitle">结算账户号</td>
                <td>{{}}</td>
                <td class="tdTitle">支付方式</td>
                <td>{{}}</td>
            </tr>
            <tr>
                <td class="tdTitle">支付订单号</td>
                <td>{{}}</td>
                <td class="tdTitle">支付时间</td>
                <td>{{}}</td>
                <td class="tdTitle">退款金额</td>
                <td>{{}}</td>
            </tr>
            <tr>
                <td class="tdTitle">出票价</td>
                <td>{{}}</td>
                <td class="tdTitle">改签差额</td>
                <td>{{}}</td>
                <td class="tdTitle">退改手续费</td>
                <td>{{}}</td>
            </tr>
            <tr>
                <td class="tdTitle">支付总金额</td>
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

td {
    text-align: center;
    min-height: 35px;
    line-height: 35px;
    border: 1px solid #d7d7d8;
}

td:nth-of-type(odd) {
    background-color: #fafafa;
    width: 16.66%;
}

td:hover {
    background-color: #e0eafa;
}
</style>
