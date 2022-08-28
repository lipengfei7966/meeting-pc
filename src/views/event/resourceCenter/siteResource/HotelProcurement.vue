<template>
    <div class="HotelProcurement" v-if="info">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>联系方式</span> Contact Information
            </div>

            <el-row :align="middle">
                <el-col :span="2"><div class="grid-content grid-content-border bg-purple">{{info.purchase_contracts}}</div></el-col>
                <el-col :offset="1" :span="3"><div class="grid-content bg-purple">手机：{{info.purchase_phone}}</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple">邮箱：{{info.purchase_email}}</div></el-col>
            </el-row>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>系统将会发询价单给以下酒店（场地）销售主管</span> The RFP will be sent to following properties
            </div>
            <div class="context hotelSelected">
                <div class="list">
                    <div class="item" v-for="item in info.selecthotel" :key="item.id">
                        <div class="name">{{ item.hotelname }}</div>
                        <!-- <div class="role">指定酒店接单人: 唐笑i额</div> -->
                    </div>
                </div>
                <el-button type="primary" @click="addHotel">添加新酒店</el-button>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>会议基本信息</span> Event Profiles
            </div>
            <div class="context info">
                <div class="item">
                    <label>会议名称Event Name：</label>
                    {{ info.event_name }}}
                </div>
                <div class="item">
                    <label>建团类型：</label>
                    {{ info.tourist_group_type }}
                </div>
                <div class="item">
                    <label>活动类型Event Type：</label>
                    {{ info.activity_type_name }}
                </div>
                <div class="item">
                    <label>Cvent号：</label>
                    {{ info.cvent_no }}
                </div>
                <div class="item">
                    <label>客户Consumer：</label>
                    {{ info.company_name }}
                </div>
                <div class="item">
                    <label>团电脑号Team No.：</label>
                    {{ info.tourist_group_no }}
                </div>
                <div class="item">
                    <label>服务类型Service Type：</label>
                    {{ info.service_type_name }}
                </div>
                <div class="item">
                    <label>会议城市City：</label>
                    {{ info.event_city }}
                </div>
                <div class="item">
                    <label>餐标限制Food Limit：</label>
                    {{ info.food_limit }}
                </div>
                <div class="item">
                    <label>参会人数Attendee NO.：</label>
                    {{ info.attendee_no }}
                </div>
                <div class="item">
                    <label>会议开始日期Start Date：</label>
                    {{ info.event_startdate | date_day }}
                </div>
                <div class="item">
                    <label>会议结束日期End Date：</label>
                    {{ info.event_enddate | date_day }}
                </div>
                <div class="item">
                    <label>PR ：</label>
                    {{ info.pr }}
                </div>
                <div class="item">
                    <label>会议总预算Total Budget：</label>
                    {{ info.total_budget }}
                </div>
                <div class="item">
                    <label>会议IDEvent ID：</label>
                    {{ info.event_num }}
                </div>
                <div class="item">
                    <label>会议创建人Submitor：</label>
                    {{ info.createuser_contracts }}
                </div>
                <div class="item">
                    <label>客户联系人Event Owner：</label>
                    {{ info.customer_contacts }}
                </div>
                <div class="item">
                    <label>客户所属部门Owner's Department：</label>
                    {{ info.customer_department }}
                </div>
                <div class="item">
                    <label>客户联系电话Owner's Phone NO.：</label>
                    {{ info.customer_phone }}
                </div>
                <div class="item">
                    <label>客户邮箱Owner's E-mail：</label>
                    {{ info.customer_email }}
                </div>
                <div class="item">
                    <label>发票类型Invoice Type：</label>
                    {{ info.invoice_type }}
                </div>
                <div class="item">
                    <label>是否办理免税：</label>
                    {{ info.is_duty_free }}
                </div>
                <div class="item">
                    <label>创建时间Create Date：</label>
                    {{ info.create_date }}
                </div>
                <div class="item">
                    <label>客户材料：</label>
                    {{ info.customer_data }}
                </div>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>客房需求</span> Guest Rooms
            </div>
            <div class="context rooms">
                <div>入住起始日期 Check-in Date：{{ info.requirements_room.startdate | date_day }} {{ info.requirements_room.broadband_required == 1 ? "需要有宽带" : "不需要宽带" }} {{ info.requirements_room.breakfast_required == 1 ? "需要含早餐" : "不需要早餐" }}</div>
                <table>
                    <thead>
                        <tr class="color_2">
                            <th width="110">日期</th>
                            <th>双床房</th>
                            <th>大床房</th>
                            <th>行政房/套房</th>
                            <th>总计</th>
                            <th>其它要求</th>
                            <th width="150">是否采购</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in info.requirements_room.list" :key="item.id">
                        <tr>
                            <td>{{ item.check_in_date | date_day }}</td>
                            <td>{{ item.twin_bed_count }}</td>
                            <td>{{ item.king_bed_count }}</td>
                            <td>{{ item.superior_room_count }}</td>
                            <td>{{ item.total }}</td>
                            <td>{{ item.other_requirements }}</td>
                            <td>
                                <el-checkbox
                                    v-model="item._checked"
                                >{{ item._checked ? '采购' : '不采购' }}</el-checkbox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>会场需求</span> Conference Rooms
            </div>
            <div class="context Conference">
                <table v-for="item in info.requirements_conference" :key="item.id">
                    <thead>
                        <tr class="color_2">
                            <th style="text-align: left;" width="230">{{ item.date }}</th>
                            <th></th>
                            <th width="150">是否采购</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in item.list" :key="item.id">
                        <tr>
                            <td>
                                {{ item.item }}
                                <br />
                                {{ item.conference_date | date_day}}
                            </td>
                            <td style="text-align: left; line-height: 40px;">
                                <p>Setting Times: {{ item.starttime }} - {{ item.endtime }}</p>
                                <p>Setting Note : {{ item.equipment }}</p>
                            </td>
                            <td>
                                <el-checkbox
                                    v-model="item._checked"
                                >{{ item._checked ? '采购' : '不采购' }}</el-checkbox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>餐饮需求</span> Food & Beverage
            </div>
            <div class="context foods">
                <table>
                    <thead>
                        <tr class="color_2">
                            <th width="110">日期</th>
                            <th>Moring Break</th>
                            <th>Lunch</th>
                            <th>Afternoon Break</th>
                            <th>Dinner</th>
                            <th>Comments</th>
                            <th width="150">是否采购</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in info.requirements_food" :key="item.id">
                        <tr>
                            <td>{{ item.food_date | date_day }}</td>
                            <td>{{ item.moring_break_count }}人</td>
                            <!-- <td>{{ item.lunch_count }},{{ item.lunch_use_type }},{{ item.lunch_address_type == 0 ? '酒店内用餐' : '酒店外用餐' }}</td> -->
                            <td>{{ item.lunch_use_type }}，{{ item.lunch_count }}人</td>
                            <td>{{ item.afternoon_break_count }}人</td>
                            <!-- <td>{{ item.dinner_count }},{{ item.dinner_use_type }},{{ item.dinner_address_type == 0 ? '酒店内用餐' : '酒店外用餐' }}</td> -->
                            <td>{{ item.dinner_use_type }}，{{ item.dinner_count }}人</td>
                            <td>{{ item.comments }}</td>
                            <td>
                                <el-checkbox
                                    v-model="item._checked"
                                >{{ item._checked ? '采购' : '不采购' }}</el-checkbox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>大交通</span> Intercity Transportation
            </div>
            <div class="context foods">
                <table>
                    <thead>
                        <tr class="color_2">
                            <th width="110">日期</th>
                            <th>始发地</th>
                            <th>目的地</th>
                            <th>交通工具</th>
                            <th>搭乘人数</th>
                            <th>抵达时间</th>
                            <th>座位等级</th>
                            <th>票价/折扣</th>
                            <th>备注</th>
                            <th width="150">是否采购</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in info.requirements_transportation" :key="item.id">
                        <tr>
                            <td>{{ item.transportation_date | date_day }}</td>
                            <td>{{ item.origin_city }}</td>
                            <td>{{ item.destination_city }}</td>
                            <td>{{ item.trans_type }}</td>
                            <td>{{ item.passenger_count }}</td>
                            <td>{{ item.arrive_time | date_time }}</td>
                            <td>{{ item.seat_classes }}</td>
                            <td>{{ item.special_price }}</td>
                            <td>{{ item.requirement }}</td>
                            <td>
                                <el-checkbox
                                    v-model="item._checked"
                                >{{ item._checked ? '采购' : '不采购' }}</el-checkbox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>地面交通</span> City Car
            </div>
            <div class="context foods">
                <table>
                    <thead>
                        <tr class="color_2">
                            <th width="110">日期</th>
                            <th>用车目的</th>
                            <th>用车类型</th>
                            <th>用车数量</th>
                            <th>搭乘人数</th>
                            <th>用车说明</th>
                            <th width="150">是否采购</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in info.requirements_car" :key="item.id">
                        <tr>
                            <td>{{ item.car_date | date_day }}</td>
                            <td>{{ item.purpose }}</td>
                            <td>{{ item.vehicle_type }}</td>
                            <td>{{ item.car_count }}</td>
                            <td>{{ item.vehicle_count }}</td>
                            <td>{{ item.explain }}</td>
                            <td>
                                <el-checkbox
                                    v-model="item._checked"
                                >{{ item._checked ? '采购' : '不采购' }}</el-checkbox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>其它服务</span> Other service
            </div>
            <div class="context foods">
                <table>
                    <thead>
                        <tr class="color_2">
                            <th class="topleft" colspan="2">其它服务需求</th>
                            <th width="150">是否采购</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in info.requirements_other" :key="item.id">
                        <tr>
                            <td width="30%" class="other_td">
                                {{ item.order_name }}:
                                <span v-if="item.participate_count" >{{ item.participate_count}}人</span>
                                <span v-if="item.service_day_count" >{{ item.service_day_count}}天</span>
                            </td>
                            <td class="other_td">
                                <span v-if="item.describe" >需求备注：{{ item.describe }}</span>
                            </td>
                            <td>
                                <el-checkbox
                                    v-model="item._checked"
                                >{{ item._checked ? '采购' : '不采购' }}</el-checkbox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>旅行社代付</span> Paying Agent
            </div>
            <div class="context foods">
                <table>
                    <thead>
                        <tr class="color_2">
                            <th colspan="2">旅行社代付</th>
                            <th width="150">是否代付</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="2" class="other_td">
                                本会中酒店部分订单需要旅行社代付:
                            </td>
                            <td>
                                <el-checkbox
                                    v-model="info.travelagency_payment"
                                >{{ info.travelagency_payment ? '旅行社代付' : '自己付款' }}</el-checkbox>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>询价单补充信息</span> RFP Additional Information
            </div>
            <div class="context form">
                <div class="item">
                    <label>附件Attachments</label>
                    <div class="block">
                        <el-button type="primary">上传文件</el-button>
                    </div>
                </div>
                <div class="item">
                    <label>会议日期是否接受调整</label>
                    <div class="block">
                        <el-checkbox>日期可以调整My Event Dates Are Flexible</el-checkbox>
                    </div>
                </div>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>报价方式及截止时间</span> Quotation Mode and Deadline
            </div>
            <div class="context form">
                <div class="item">
                    <label>竞价式询价Reverse Auction</label>
                    <div class="block">
                        <el-checkbox>使用</el-checkbox>
                    </div>
                </div>
                <div class="item">
                    <label>报价截止日期Deadline</label>
                    <div class="block"></div>
                </div>
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>其它需求信息或者注意事项</span> Additional Comments
            </div>
            <div class="context form">
                <el-input type="textarea"></el-input>
            </div>
        </el-card>
        <el-card class="box-card">
            <div class="context btn">
                <el-button type="warning" @click="save">提交确认单</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
/**
 * @page 酒店采购
 */
export default {
    data() {
        return {
            info: null
        };
    },
    computed: {

    },
    methods: {
        addHotel() {
            this.$router.push({ name: 'addhotel', params: { id: this.$route.params.id, type: "addhotel" } })
        },
        // 保存
        save() {
            this.$api.settlementsheetSave(this.info, "POST").then((res) => {
                if(res.status == 1)
                {
                this.$message({
                    message: res.msg,
                    type: "success",
                });  
                }    
                else
                {
                this.$message({
                    message: res.msg,
                    type: "fail",
                });  
                }
            });
        },
    },
    mounted() {
        this.$api.requirementsinfo({ id: this.$route.params.id }, "POST").then((res) => {
            this.info = res
        });
    },
};
</script>

<style lang="scss" scoped>
.HotelProcurement {
    padding: 15px;
    box-sizing: border-box;
    .box-card {
        margin-top: 15px;
        &:first-child {
            margin: 0;
        }
        .clearfix {
            color: #999999;
            span {
                font-weight: bold;
                color: #000;
            }
        }
        
        .el-row {
            margin-bottom: 20px;
            &:last-child {
            margin-bottom: 0;
            }
        }
        .el-col {
            border-radius: 4px;
        }
        .grid-content {
            border-radius: 4px;
            min-height: 36px;
            line-height: 36px;
        }
        .grid-content-border {
            border-right: 1px solid #ddd;
        }
        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }
        
        .hotelSelected {
            .list {
                margin-bottom: 20px;
                .item {
                    display: inline-block;
                    padding: 10px;
                    border: 1px solid #88c6f5;
                    border-radius: 5px;
                    background-color: #f7fbff;
                    margin-right: 10px;
                    .name {
                        color: #0084e9;
                        font-size: 18px;
                        cursor: pointer;
                    }
                }
            }
        }
        .info {
            .item {
                line-height: 35px;
                label {
                    display: inline-block;
                    width: 230px;
                }
            }
        }
    }
}
table {
    box-sizing: border-box;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin-top: 15px;
    border: 1px solid #dddddd;
    tr,
    td,
    th {
        text-align: center;
        border: 1px solid #dddddd;
        padding: 10px;
        box-sizing: border-box;
        input {
            border: 1px solid #ccc;
            width: 100%;
            line-height: 30px;
            border-radius: 5px;
            color: #0066cc;
            padding: 0 10px;
            box-sizing: border-box;
        }
        .radio {
            display: inline-block;
            width: 20px;
        }
        .line {
            display: inline-block;
            width: 60%;
            margin: 0 10px;
        }
        span {
            color: #999999;
            font-size: 14px;
        }
        p {
            span {
                color: #ff9900;
                font-size: 16px;
            }
        }
    }
    .topleft {
        text-align: left;
    }
    .other_td{
        text-align: left !important;
        color:black !important;
        padding-left: 20px;
    }
    .other_td span{
        color:black !important;
    }
    .color_1 {
        background-color: #dff0d8;
        font-size: 16px;
    }
    .color_2 {
        background-color: #f5f5f5;
    }
    .color_3 {
        background-color: #e6e6e6;
    }
    .color_4 {
        background-color: #f2f2f2;
    }
}

.form {
    .item {
        display: flex;
        align-items: center;
        margin-top: 15px;
        &:first-child {
            margin: 0;
        }
        label {
            width: 200px;
        }
    }
}
.btn {
    text-align: center;
}
</style>
