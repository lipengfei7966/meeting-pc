<template>
    <div class="table-container">
        <div class="box bs-new-container">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" fixed></el-table-column>
                <el-table-column prop="orderStatus" label="订单状态" width="100"></el-table-column>
                <el-table-column prop="userCode" label="所属客户" width="100"></el-table-column>
                <el-table-column prop="orderNumber" label="订单号" width="100"></el-table-column>
                <el-table-column prop="updateDate" label="下单时间" width="160" sortable> </el-table-column>
                <el-table-column prop="travelType" label="差旅类型" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="orderType" label="订单类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createUser" label="下单人" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payType" label="支付方式" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payStatus" label="支付状态" show-overflow-tooltip></el-table-column>
                <el-table-column prop="tripType" label="出行类型" show-overflow-tooltip></el-table-column>
                <el-table-column prop="contactPhone" label="联系人电话" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="ticketNo" label="票号" width="135" show-overflow-tooltip> </el-table-column>
                <el-table-column prop="info" label="车次/航班信息" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="payAmount" label="支付金额" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" label="操作" width="140">
                    <template slot-scope="scope">
                        <!-- <el-button @click="handleUpdteClick(scope.row)" type="text" size="small">改签</el-button> -->
                        <el-button type="text" size="small" @click="handleRemoveClick(scope.row)">退票</el-button>
                        <el-button type="text" size="small" @click="handleInfoClick(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 退票弹窗 -->
        <el-dialog title="退票申请" :visible.sync="centerDialogVisible" width="50%" center top="10px">
            <div class="remove-line1">
                <img src="@/assets/frame/svg/wenhao.svg" class="wenhao" alt="" srcset="">
                <span>您确认要退票吗？</span>
            </div>
            <el-divider></el-divider>
            <div class="remove-line2">
                <span class="fontSize2Left fontWeight">预计退款：</span><span class="fontSize2Right yellowColor">{{
                        thepayAmount - serviceFee
                }}元</span>
            </div>
            <el-divider></el-divider>
            <div class="remove-line3">
                <div class="remove-line3-1">
                    <span class="fontSize3Left fontWeight">手续费用：</span><span class="fontSize3Right yellowColor">
                        {{ serviceFee }}元</span>
                </div>
                <div class="remove-line3-2">
                    <span class="fontSize3Left fontWeight">车票票价：</span><span class="fontSize3Right yellowColor">{{
                            thepayAmount
                    }}元</span>
                </div>
                <div class="remove-line3-3">
                    <span class="fontSize3Left fontWeight">预计退款：</span><span class="fontSize3Right yellowColor">{{
                            thepayAmount - serviceFee
                    }}元</span>
                </div>
            </div>
            <el-divider></el-divider>
            <div class="remove-line4">
                <img src="@/assets/frame/svg/tanhao.svg" class="tanhao" alt="" srcset="">
                <span>实际核收退票费及应退票款将按最终交易时间计算。</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelFn">取 消</el-button>
                <el-button style="margin-bottom:250px" type="primary" @click="comfirmRefund">确
                    定</el-button>
                <div class="remove-rules">
                    <div class="title">退票规则：</div>
                    <div class="rule1">1、使用现金购买或已领取报销凭证的电子票，线上完成退票后，请持相关证件（购票证件、报销凭证）至车站窗口完成退款。</div>
                    <div class="rule2">
                        2、退票费按如下规则核收：票面乘车站开车时间前8天（含）以上不收取退票费，48小时以上的按票价5%计，24小时以上、不足48小时的按票价10%计，不足24小时的按票价20%计。上述计算的尾数以5角为单位，尾数小于2.5角的舍去、2.5角及以上且小于7.5角的计为5角、7.5角及以上的进为1元。退票费最低按2元计收。
                    </div>
                    <div class="rule3">3、应退款项按银行规定时限退还至购票时所使用的网上支付工具账户，请注意查询，如有疑问请致电人工客服查询。</div>
                    <div class="rule4">4、跨境旅客旅行须知详见铁路跨境旅客相关运输组织规则和车站公告。</div>
                </div>
            </span>

        </el-dialog>
    </div>
</template>

<script>
import { estimatedRefund, comfirmRefund } from '../utils/api'
export default {
    props: ['tableData'],
    name: 'orderTable',
    data () {
        return {
            centerDialogVisible: false,
            refundAmount: 0,// 预估退票金额
            serviceFee: 0,// 手续费
            thepayAmount: 0,
            theorderCode: ''
        }
    },
    created () { },
    mounted () { },
    methods: {
        // 选中列表中某一项
        handleSelectionChange (val) {
            this.multipleSelection = val
        },
        // 改签
        handleUpdteClick (row) {
            console.log(row)
        },
        //退票弹起弹窗
        handleRemoveClick (row) {
            this.centerDialogVisible = true
            console.log(row, '退票弹窗')
            this.thepayAmount = row.payAmount
            this.refund(row.orderCode)
            this.theorderCode = row.orderCode

        },
        // 退改票信息
        refund (orderCode) {
            estimatedRefund(orderCode).then(res => {
                this.refundAmount = res.data.refundAmount
                this.serviceFee = res.data.serviceFee
            })
        },
        // 取消退款
        cancelFn () {
            this.centerDialogVisible = false
            this.thepayAmount = 0
            this.theorderCode = ''
        },
        // 确定退款
        comfirmRefund () {
            comfirmRefund(this.theorderCode).then(res => {
                if (res.status === true) this.$message({ message: '退票成功', type: 'success' })
            })
            this.theorderCode = ''
            this.centerDialogVisible = false
            this.thepayAmount = 0
        },
        // 跳转详情页
        handleInfoClick (row) {
            if (row.businessType === '1') {//机票
                this.$router.push({ name: 'airTicketDetails', params: { orderCode: row.orderCode } })
            }
            if (row.businessType === '2') {//火车票
                this.$router.push({ name: '/trainTicketDetails', params: { orderCode: row.orderCode } })
            }
        }
    },
}
</script>
<style scoped lang="scss">
.table-container {
    padding: 0;
}

.el-dropdown-link {
    cursor: pointer;
    color: #00699d;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}

.el-dropdown {
    border: 1px solid #00699d;
    padding: 2px 5px;
    border-radius: 4px;
    min-width: 200px;
    text-align: center;
}

.el-icon-arrow-down:before {
    content: "\e6df";
    position: absolute;
    right: 5px;
    top: 7px;
    color: #000;
    font-weight: 900;
}

::deep .bs-new-container .el-pagination {
    margin: 50px 0;
    line-height: 100px;
}

::deep .el-pager {
    background-color: none;
}

.el-divider--horizontal {
    margin: 8px 0;
    background: 0 0;
    border-top: 2px dashed #e4e7ed;
}

.remove-line1 {
    width: 100%;
    height: 48px;
    margin-bottom: 20px;
}


.el-dialog__body .wenhao {
    width: 48px;
    height: 48px;
    margin: 6px 10px;
    vertical-align: middle;
}

::deep .el-dialog__body {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

::deep .el-dialog--center {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}

.remove-line1 span {
    font-size: 20px;
    font-weight: 900;
    height: 100%;
    vertical-align: middle;
    line-height: 48px;
}

.remove-line2 {
    margin: 10px 15px;
}

.fontSize2Left {
    font-size: 16px;
    font-weight: 900;
}


.fontSize2Right {
    font-size: 20px;
    font-weight: 900;
}

.yellowColor {
    color: #f6ba29;
}

.remove-line3 {
    margin: 10px 35px;
}

.fontSize3Left {
    font-size: 14px;
    font-weight: 900;
}

.fontSize3Right {
    font-size: 16px;
    font-weight: 900;
}

.remove-line4 {
    width: 100%;
    height: 27px;
    margin: 10px 22px;
}

.tanhao {
    width: 27px;
    height: 27px;
    vertical-align: middle;
}

.remove-line4 span {
    font-size: 14px;
    font-weight: 900;
    height: 100%;
    vertical-align: middle;
    line-height: 27px;
    padding-left: 12px;
}

.remove-rules {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 250px;
    background-color: #f0f2f5;
    padding: 0 55px;
    text-align: left;
}

.title {
    font-size: 14px;
    font-weight: 900;
    color: #696b6f;
    margin: 15px 0;
    display: block;
}

.rule1,
.rule2,
.rule3,
.rule4 {
    margin-bottom: 15px;
}
</style>
