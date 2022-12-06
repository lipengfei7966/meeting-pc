<template>
    <div class="container">
        <table border="1px" align="center" bordercolor="#d7d7d8" cellspacing="0px" style="width:100%">
            <tr>
                <td class="tdTitle">结算账户名</td>
                <td>{{ paymentInformationDto.settlementAccountName ? paymentInformationDto.settlementAccountName : '-'
                }}
                </td>
                <td class="tdTitle">结算账户号</td>
                <td>{{ paymentInformationDto.settlementAccountNo ? paymentInformationDto.settlementAccountNo : '-' }}
                </td>
                <td class="tdTitle">支付方式</td>
                <td>{{ paymentInformationDto.paymentMethod ?
                        paymentInformationDto.paymentMethod === '1' ?
                            payTypeFamtter['1'] : paymentInformationDto.paymentMethod : '-'
                }}
                </td>
            </tr>
            <tr>
                <td class="tdTitle">支付订单号</td>
                <td>{{ paymentInformationDto.paymentOrderNo ? paymentInformationDto.paymentOrderNo : '-' }}
                </td>
                <td class="tdTitle">支付时间</td>
                <td>{{ paymentInformationDto.paymentTime ? paymentInformationDto.paymentTime : '-' }}
                </td>
                <td class="tdTitle">退款金额</td>
                <td>{{ paymentInformationDto.refundAmount ? paymentInformationDto.refundAmount : '-' }}
                </td>
            </tr>
            <tr>
                <td class="tdTitle">出票价</td>
                <td>{{ paymentInformationDto.fare ? paymentInformationDto.fare : '-' }}
                </td>
                <td class="tdTitle">改签差额</td>
                <td>{{ paymentInformationDto.changeDifference ? paymentInformationDto.changeDifference : '-' }}
                </td>
                <td class="tdTitle">退改手续费</td>
                <td>{{ paymentInformationDto.settlementAccountNamess ? paymentInformationDto.settlementAccountNamess :
                        '-'
                }}
                </td>
            </tr>
            <tr>
                <td class="tdTitle">支付总金额</td>
                <td>{{ paymentInformationDto.payAmount ? paymentInformationDto.payAmount : '-'
                }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { listItem } from '../../utils/api'
export default {
    props: ['paymentInformationDto'],
    name: 'trainPayTable',
    data () {
        return {
            payTypeFamtter: {},
            payTypeArr: [],
            paymentInformationDtoKeys: [],
            payData: {
                settlementAccountName: '',
                settlementAccountNo: '',
                paymentMethod: '',
                paymentOrderNo: '',
                paymentTime: '',
                refundAmount: '',
                fare: '',
                changeDifference: '',
                settlementAccountNamess: '',
                payAmount: ''
            }
        }
    },
    created () {
        this.dict()
    },
    mounted () { },
    methods: {
        dict () {
            listItem('PAY_TYPE').then(res => {
                console.log(res, '获取字典码-支付方式')
                for (const item of res.data) {
                    var key = item.dictItemVal
                    var value = item.dictItemName
                    this.payTypeFamtter[key] = value
                    this.payTypeArr.push([key, value])
                }
            })
        }
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

td:nth-of-type(odd) {
    background-color: #fafafa;
    width: 16.66%;
}

td:hover {
    background-color: #e0eafa;
}
</style>
