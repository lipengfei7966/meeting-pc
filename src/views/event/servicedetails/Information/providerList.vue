<template>
  <div class="rfp_item">
    <div class="rfp_title clx">
      <div class="title">
        <strong>已选会议服务商列表</strong>
      </div>
      <div class="parity_view" v-if="hasOffer">
        <!-- <el-button size="small" type="text" @click="goCompare()">查看比价页</el-button> -->
        <el-dropdown class="mar_l20" size="small" @command="val => goCompare( val )">
          <span class="el-dropdown-link">
            查看比价页
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">仅询价部分比价</el-dropdown-item>
            <el-dropdown-item command="2">含线下报价部分比价</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="rfp_box">
      <div class="event_base clx">
        <table class="select_hotel">
          <thead>
            <tr>
              <th width="180">
                服务商名称<span class="international-order-span">Travel Agency</span>
              </th>
              <th width="135">
                联系人<span class="international-order-span">Contact Person</span>
              </th>
              <th width="135">
                报价人<span class="international-order-span">Quotation Person</span>
              </th>
              <th width="130">
                初次报价<span class="international-order-span">Initial Price</span>
              </th>
              <th width="130">
                末次报价<span class="international-order-span">Final Price</span>
              </th>
              <th width="120">
                操作<span class="international-order-span">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in provideId" :key="index">
              <td align="left">
                <div class="name">
                  <i class="ico">
                    <img :src="require('@/assets/images/badge.png')" alt="" style="width: 15px;height: 15px;">
                  </i>
                  <span>{{ item.company_name }}</span>
                </div>
              </td>
              <td>
                <p class="dark">{{ item.customer_service_name }}</p>
                <p class="gray">{{ item.company_phone }}</p>
                <p class="gray">{{ item.company_email }}</p>
              </td>
              <td>
                <p class="dark">{{ item.bidder_name }}</p>
                <p class="gray">{{ item.bidder_phone }}</p>
                <p class="gray">{{ item.bidder_email }}</p>
              </td>
              <td>
                <div class="gray"><dfn>￥</dfn>{{ positiveFloat(item.minprice).toFixed(2) }}</div>

                <span class="refuse" v-show="item.state === 3 && !item.maxprice"> 已谢绝 </span>
                <span class="refuse" v-show="item.state === 2 && !item.maxprice"> 会议服务商谢绝报价 </span>
                <span class="bid" v-show="item.state == 1 && !item.maxprice"> 已中标 </span>
              </td>
              <td>
                <div class="gray"><dfn>￥</dfn>{{ positiveFloat(item.maxprice).toFixed(2) }}</div>
                <span class="bid" v-show="item.state == 1 && item.maxprice"> 已中标 </span>
                <span class="refuse" v-show="item.state === 2 && item.maxprice"> 会议服务商谢绝报价 </span>
                <span class="refuse" v-show="item.state === 3 && item.maxprice"> 已谢绝 </span>

              </td>
              <td align="left">
                <div class="hotel_link">
                  <el-badge is-dot :hidden="item.unread_count == '0' ">
                    <el-button type="text" @click="conversation(item.id)">留言</el-button>
                  </el-badge>

                  <el-badge v-if="item.minprice || item.minprice === 0" is-dot :hidden="item.remind == '0' ">
                    <el-button type="text" @click="goPage('/offer', item)">查看报价</el-button>
                  </el-badge>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <el-dialog title="回复会议服务商" :visible.sync="dialogTableVisible" :close-on-click-modal='false'>
          <div class="messageList">
            <div class="msgc" v-for="(msg,index) in messageList" :key="index">
              <div :class="msg.type==0?'right':'left'">
                <div class="user_name">{{msg.username+'@'+ msg.createtime}}</div>
                <div class="message_line">
                  <div class="message_txt">{{msg.message}}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <el-input :rows="6" type="textarea" size="small" v-model="message" placeholder="在此给会议服务商留言，您的每条留言系统都会邮件通知到会议服务商..."></el-input>
          </div>
          <span slot="footer" class="dialog-footer flex_row justify_center mar_t20">
            <el-button type="primary" size="small" @click="conversationed">发送给销售</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '../bus.js';
import { formatNum, positiveFloat, positiveFloatSix,  } from '@/utils/common';
export default {
  // props:["provideId"],
  data() {
    return {
      provideName: [], //会议服务商询价单
      dialogTableVisible: false, //弹框显示隐藏
      message:'',
      messageList: [], // 留言信息列表
      provideId:[],
      hasOffer:false, // 是否有报价
    };
  },
  mounted() {
    // this.getServiceProvider();
    this.ServiceHotelList();
  },
  methods: {
    positiveFloat,
    //会议服务商询价单
    // getServiceProvider() {
    //   this.$api
    //     .getServiceProvider(
    //       {
    //         MeetingID: 'df025c88-16c1-11ec-ba42-fa163ed463f8',
    //       },
    //       'POST'
    //     )
    //     .then((res) => {
    //       this.provideName = res.service[0].service_hotel;
    //       this.provideId=res.service[0].service_hotel;
    //       Bus.$emit('AA', res.service[0].service_hotel);
    //       console.log(this.provideId, '00000000');
    //       // this.provideName=res,
    //       // console.log(this.provideName,'12321312321321');
    //     });
    // },
    ServiceHotelList() {
      this.requestApi({
        url: '/MeetingMa/ServiceHotelList',
        method: 'post',
        data: {
          InquirySheetID: this.$route.query.sheetId,
        },
      }).then((res) => {
        this.provideId = res;
        this.hasOffer = this.provideId.some(item => item.minprice > 0)
      });
    },
    // 查看报价
    goPage(url, data){
      let query = {id:this.$route.query.id,foreign_key_id: data.quoted_priceid,serviceId: data.id,type: 1,prev:'询价单详情'};
      this.$router.push({path:url,query:query})
    },
    //点击留言 弹出绘画框
    conversation(InquirySheetObjectID) {
      this.dialogTableVisible = true;
      this.InquirySheetObjectID = InquirySheetObjectID
      this.getMessage()
    },
    // 获取留言信息列表
    getMessage() {
      this.requestApi({
        url: '/MeetingMa/GetMessage',
        method: 'post',
        data: {
          InquirySheetObjectID: this.InquirySheetObjectID
        },
      }).then(res => {
        this.messageList = res || [];
        this.ServiceHotelList();
      })
    },
    // 前往比价页
    goCompare(command){
      debugger
      this.$router.push({
        path: '/activityInquiry/comparisonPrice/' + this.$route.query.sheetId,
        query: {
          id: this.$route.query.id,
          command,
					type:this.$route.query.type
        }
      })
    },
    conversationed(){
      if(!this.message){
         this.$message.error('请输入留言信息');
         return
      }
      const inquiry_sheet_object_id =
        {
          inquiry_sheet_object_id:this.InquirySheetObjectID,
          message:this.message,
          message_type: 0, // 留言是0，文件是1
        }
      this.requestApi({
        url: '/MeetingMa/MessageSava',
        method: 'post',
        data: {
          Parameter:JSON.stringify(inquiry_sheet_object_id)
        },
      }).then(res => {
        if(res && res === true){
          this.getMessage();
          // this.dialogTableVisible = false
          this.message = '';
        };
      })
    },
  },
};
</script>

<style lang="scss">
.rfp_title {
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  padding: 10px 20px;
  height: 27px;
}
.rfp_title .title strong {
  float: left;
  font-weight: 600;
  font-size: 14px;
  color: #282828;
}
.hotel_link {
  display: flex;
  justify-content: space-around;
}
.international-formevent-title {
  font-size: 12px;
  color: #999999;
  font-weight: normal;
  margin-left: 5px;
}
.clx {
  zoom: 1;
}
.rfp_title .spread_retract {
  cursor: pointer;
}
.rfp_title .title {
  float: left;
  line-height: 28px;
}
.rfp_item {
  margin: 20px 0 0 0;
  background: #fff;
  box-shadow: 0 0 4px 1px #e8e8e8;
}
.rfp_box {
  padding: 20px;
}
.rfp_title .parity_view {
  float: right;
}
.rfp_title .parity_view a {
  font-size: 14px;
  text-decoration: none;
  line-height: 28px;
  color: #2896eb;
}

.el-table .cell {
  white-space: pre-line;
}
.el-table th.el-table__cell > .cell {
  color: #787878;
  font-weight: 1000;
}
.select_hotel {
  width: 100%;
  border-collapse: collapse;
}
.select_hotel th {
  border-width: 1px 1px 2px 1px;
  border-color: #e4e4e4;
  border-style: solid;
  color: #787878;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal;
  padding: 12px 10px;
  word-break: break-all;
  word-wrap: break-word;
}
.international-order-span {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #999999;
  font-weight: normal;
}
.select_hotel td {
  border: 1px solid #e4e4e4;
  padding: 10px;
  font-size: 14px;
  color: #787878;
  line-height: 20px;
  word-break: break-all;
  word-wrap: break-word;
}
.select_hotel .name {
  padding: 0 0 0 20px;
}
.select_hotel .name .ico {
  font-size: 14px;
  color: #f91;
}
.select_hotel .dark {
  color: #282828;
  line-height: 20px;
  font-size: 14px;
}
.select_hotel .gray {
  color: #787878;
  line-height: 20px;
  font-size: 14px;
}
.select_hotel .refuse {
  display: inline-block;
  line-height: 16px;
  font-size: 12px;
  color: #fff;
  padding: 0 5px;
  border-radius: 8px;
  background: #a2a4a9;
}
.view-deny-reason {
  display: inline-block;
  height: 16px;
  line-height: 16px;
  padding: 0 5px;
  font-size: 12px;
  background: #06c;
  color: #fff;
  cursor: pointer;
  border-radius: 8px;
}
.select_hotel .bid {
  display: inline-block;
  height: 16px;
  line-height: 16px;
  font-size: 12px;
  color: #fff;
  padding: 0 5px;
  border-radius: 8px;
  background: #ff9e48;
}
.select_hotel a {
  font-size: 14px;
  color: #2896eb;
  text-decoration: none;
}
.messageList {
  height: 210px;
  padding: 10px 0;
  overflow: auto;
  .msgc {
    padding: 10px 0 0 0;
    .user_name {
      width: 450px;
      margin: 0 0 5px 0;
      line-height: 20px;
      font-size: 12px;
      color: #787878;
    }
    .message_txt {
      position: relative;
      max-width: 400px;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 14px;
      line-height: 20px;
      font-family: Arial, 'Microsoft YaHei', SimSun, sans-serif;
      word-break: break-all;
      white-space: normal;
    }
    .message_line {
      width: 100%;
      clear: both;
    }
    .message_line:after {
      content: '.';
      display: block;
      visibility: hidden;
      clear: both;
      height: 0;
    }
    .left {
      .user_name {
        float: left;
        text-align: left;
      }
      .message_txt {
        float: left;
        background: #f1f1f1;
        color: #282828;
      }
    }
    .right {
      .user_name {
        float: right;
        text-align: right;
      }
      .message_txt {
        float: right;
        background: #47b0ed;
        color: #fff;
      }
    }
  }
}
</style>
