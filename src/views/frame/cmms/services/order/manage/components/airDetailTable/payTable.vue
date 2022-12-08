<template>
    <div class="container">
        <table border="1px" align="center" bordercolor="#d7d7d8" cellspacing="0px" style="width:100%;">
            <tr>
                <td class="tdTitle">结算账户名</td>
                <td>{{ costDetailInfo.payAccountName ? costDetailInfo.payAccountName : '-'
                }}
                </td>
                <td class="tdTitle">结算账户号</td>
                <td>{{ costDetailInfo.payAccountNo ? costDetailInfo.payAccountNo : '-' }}</td>
                <td class="tdTitle">支付方式</td>
                <td>{{ costDetailInfo.payType ? costDetailInfo.payType : '-' }}</td>
            </tr>
            <tr>
                <td class="tdTitle">支付订单号</td>
                <td>{{ costDetailInfo.payOrderNumber ? costDetailInfo.payOrderNumber : '-' }}</td>
                <td class="tdTitle">支付时间</td>
                <td>{{ costDetailInfo.payTime ? costDetailInfo.payTime : '-' }}</td>
                <td class="tdTitle">票价</td>
                <td>{{ costDetailInfo.ticketAmount ? costDetailInfo.ticketAmount : '-' }}</td>
            </tr>
            <tr>
                <td class="tdTitle">基建</td>
                <td>{{ costDetailInfo.macTax ? costDetailInfo.macTax : '-' }}</td>
                <td class="tdTitle">燃油</td>
                <td>{{ costDetailInfo.oilTax ? costDetailInfo.oilTax : '-' }}</td>
                <td class="tdTitle">改期费</td>
                <td>{{ costDetailInfo.changeAmount ? costDetailInfo.changeAmount : '-' }}</td>
            </tr>
            <tr>
                <td class="tdTitle">升舱费</td>
                <td>{{ costDetailInfo.upgradeCabinAmount ? costDetailInfo.upgradeCabinAmount : '-' }}</td>
                <td class="tdTitle">退费手续费</td>
                <td>{{ costDetailInfo.refundServiceFee ? costDetailInfo.refundServiceFee : '-' }}</td>
                <td class="tdTitle">服务费</td>
                <td>{{ costDetailInfo.serviceFee ? costDetailInfo.serviceFee : '-' }}</td>
            </tr>
            <tr>
                <td class="tdTitle">支付总金额</td>
                <td>{{ costDetailInfo.orderAmount ? costDetailInfo.orderAmount : '-' }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ['costDetailInfo'],
    name: 'airPayTable',
    data () {
        return {
        }
    },
    created () { },
    mounted () { },
    methods: {
    },
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

.tdTitle {
    background-color: #fafafa;
    width: 16.66%;
}

td:hover {
    background-color: #e0eafa;
}
</style>