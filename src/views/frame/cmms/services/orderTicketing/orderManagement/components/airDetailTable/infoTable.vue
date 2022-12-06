<template>
    <div class="container">
        <table border="1px" align="center" bordercolor="#d7d7d8" cellspacing="0px" style="width:100%">
            <tr>
                <td class="tdTitle">订单号</td>
                <td>{{ orderDetailInfo.orderCode ?
                        orderDetailInfo.orderCode : '-'
                }}</td>
                <td class="tdTitle">TMC订单号</td>
                <td>{{ orderDetailInfo.tmcOrderCode ? orderDetailInfo.tmcOrderCode
                        : '-'
                }}</td>
                <td class="tdTitle">票号</td>
                <td>{{ orderDetailInfo.ticketNo ?
                        orderDetailInfo.ticketNo : '-'
                }}</td>
            </tr>
            <tr>
                <td class="tdTitle">所属会议</td>
                <td>{{ orderDetailInfo.meeting ?
                        orderDetailInfo.meeting : '-'
                }}</td>
                <td class="tdTitle">所属客户</td>
                <td>{{ orderDetailInfo.customer ?
                        orderDetailInfo.customer : '-'
                }}</td>
                <td class="tdTitle">下单时间</td>
                <td>{{ orderDetailInfo.orderTime ?
                        orderDetailInfo.orderTime : '-'
                }}</td>
            </tr>
            <tr>
                <td class="tdTitle">预定人</td>
                <td>{{ orderDetailInfo.bookUser ?
                        orderDetailInfo.bookUser : '-'
                }}</td>
                <td class="tdTitle">联系人</td>
                <td>{{ orderDetailInfo.contactPerson ?
                        orderDetailInfo.contactPerson : '-'
                }}</td>
                <td class="tdTitle">联系人电话</td>
                <td>{{ orderDetailInfo.contactPhone ?
                        orderDetailInfo.contactPhone : '-'
                }}</td>
            </tr>
            <tr>
                <td class="tdTitle">联系人邮箱</td>
                <td>{{ orderDetailInfo.contactEmail ?
                        orderDetailInfo.contactEmail : '-'
                }}</td>
                <td class="tdTitle">订单状态</td>
                <td>{{ orderDetailInfo.orderStatus ?
                        orderDetailInfo.orderStatus : '-'
                }}</td>
                <td class="tdTitle">备注</td>
                <td>{{ orderDetailInfo.remark ?
                        orderDetailInfo.remark : '-'
                }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ['orderDetailInfo'],
    name: 'airInfoTable',
    data () {
        return {
            infoTable: {
                orderNo: '',
                externalOrderNumber: '',
                ticketNo: '',
                meeting: '',
                customer: '',
                orderTime: '',
                booker: '',
                contacts: '',
                contactPhone: '',
                contactEmail: '',
                orderStatus: '',
                remarks: ''
            }, infoKeys: []

        }
    },
    created () {
    },
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
    width: 16.66%;
}

.tdTitle {
    background-color: #fafafa;
    width: 16.66%;
}

td:hover {
    background-color: #e0eafa;
}
</style>
