<template>
  <div>
    <a v-show="false" :href="downloadUrl" target="_blank" ref="a_click" download></a>
    <div class="main">
      <ul>
        <el-button type="text" @click="$router.replace({ path: '/EventList' })">我的会议</el-button>
        <li style="color: #7c7f82">></li>
        <el-button type="text" @click="$router.go(-1)">会议详情</el-button>
        <li v-if="prev" style="color: #7c7f82">></li>
        <el-button type="text" v-if="prev" @click="$router.go(-1)">{{
          prev
        }}</el-button>
        <!--				<el-button type="text" v-if="prev === '询价单详情'" @click="$router.go(-1)">询价单详情</el-button>-->
        <li style="color: #7c7f82">></li>
        <li style="color: #7c7f82">报价单详情</li>
      </ul>
    </div>
    <div class="content flex_row justify_between">
      <div>
        <img :src="require('@/assets/images/锁定.png')" alt />
        <span>会议服务商报价单</span>
      </div>

      <div style="margin-right: 20px">
        <img :src="require('@/assets/images/文章.png')" alt />
        <span @click="excelexport" style="cursor: pointer">下载报价单</span>
      </div>
    </div>
    <div class="order_cancel_notice" v-if="isCancel">
      <h3 class="title"><strong>询价单已取消，此报价单已失效。</strong></h3>
      <div class="cancel_detail">
        <span>取消人：{{ cancelInfo.cancel_people }}</span>
        <span>时间：{{ cancelInfo.cancel_time }}</span>
        <span>取消原因: {{ cancelInfo.content }}</span>
      </div>
    </div>
    <!-- 会议基本信息 -->
    <base-part :source="'bid'"></base-part>

    <quotation-part class="service" ref="quotations"></quotation-part>

    <div class="Confirm">
      <p style="color: red">{{ this.messText }}</p>
      <div v-if="!isCancel && servicer.type !== 4">
        <button @click="yao" class="b1" v-show="
            servicer.type !== 1 && servicer.type !== 2 && servicer.type !== 3
          ">
          邀请重新报价
        </button>
        <button class="purchase" @click="Confirm()" v-show="
            servicer.type !== 1 &&
            servicer.type !== 3 &&
            servicer.status != '0014-5'
          ">
          {{ servicer.whether == 1 ? "提交审核" : "提交中标" }}
        </button>

        <button @click="decline" v-show="servicer.type !== 1 && servicer.type !== 3">
          谢绝报价
        </button>

        <span style="margin-left: 30px" v-if="servicer.status == '0014-5'">草稿，更新时间：{{ servicer.offer_data }}</span>
        <!-- <button class="purchase" @click="ConfirmTempFn" v-show="(servicer.type!==1&&servicer.type!==3)">确认中标临时按钮</button> -->
      </div>

      <div class="blueness"></div>
      <div class="inputs">
        <input v-model="leaveWordMsg" type="text" placeholder="在此给会议服务商留言,您的每条留言系统都会邮件通知到会议服务商...." />
        <div class="teng">
          <button class="mark" @click="sendMsg">立即发送给会议服务商</button>
        </div>

        <div class="text_left" style="margin-top: 10px" v-if="this.$route.query.type == 1">
          <el-upload ref="upload" :action="UploadFilesUrl" :limit="1" :before-upload="fileLimit" :on-exceed="overLimit" :on-success="uploadFile" :on-preview="handlePreview" :on-remove="deleteFile" :file-list="fileList" :show-file-list="true" :multiple="true">
            <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
          </el-upload>
          <br />
          <span class="ps">注释：选择文件上传后，需点击“立即发送给会议供应商”，您上传的文件和填写的文字消息系统会回传给会议服务商</span>
        </div>

        <div style="
            margin-top: 20px;
            border-top: 1px solid #ccc;
            padding-top: 10px;
          ">
          <div v-for="(msg, index) in messageList" :key="index" style="margin: 10px 0">
            <p>{{ msg.username }} @ {{ msg.createtime }}</p>

            <div v-if="msg.message_type == 1" class="message_txt">
              <span class="fileMseeage" @click="handlePreview(msg.message)">
                {{ msg.message.slice(0, msg.message.indexOf(",")) }}
              </span>
            </div>
            <p v-else>{{ msg.message }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="gray">
      <p>以上是用户第 1 次报价 （最新报价），以下为历史报价记录</p>
    </div>
    <div class="six" v-for="(item, index) in quotation" :key="index">
      <ul>
        <!-- <li style="margin-left:15px;">{{item.hotel_id}}</li> -->
        <li style="margin-left: 15px">第 {{ index + 1 }} 次报价</li>
        <li style="color: #787878 font-size:14px; margin-left:15px;">
          总金额:
        </li>
        <li style="color: #f91; margin-left: 10px">
          ￥ {{ positiveFloat(item.total_price).toFixed(2) }}
        </li>
        <li style="margin-left: 10px; color: #bebebe">{{ item.offer_data }}</li>
        <li class="checkOffer" @click="checkOffer(item)">查看报价</li>
        <li v-if="index == 0" style="color: #787878; margin-left: 10px">
          初次报价
        </li>
        <li v-if="index > 0" style="color: #787878; margin-left: 10px">
          <span v-if="riseInPrice(item, index) > 0">
            较上次有效报价提高
            <span style="color: #f00; margin: 0 5px">￥{{ riseInPrice(item, index) }}</span>
            <span style="color: #f00">
              {{ riseInPriceRatio(item, index) }}</span>
          </span>
          <span v-if="riseInPrice(item, index) <= 0">
            较上次有效报价优惠
            <span style="color: #090; margin: 0 5px">￥{{ priceFavorable(item, index) }}</span>
            <span style="color: #090">
              {{ priceFavorableRatio(item, index) }}</span>
          </span>
          <!-- <span v-if="item.total_price - quotation[index-1].total_price">较上次有效报价优惠 <span style="color:#090">￥{{item.total_price - quotation[index-1].total_price }}</span></span> -->
        </li>
      </ul>
    </div>

    <!-- 邀请重新报价弹窗 -->
    <el-dialog title="不满意，需要会议服务商重新报价" :visible.sync="centerDialogVisible" width="30%" center>
      <span class="contentd">重新报价截止时间</span>
      <div class="black">
        <el-date-picker v-model="reOfferendDate" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" default-time="12:00:00" :picker-options="pickerOptions0"></el-date-picker>
      </div>
      <textarea name id cols="30" rows="10" class="leave" placeholder="请留言告知不满意的原因,方便会议服务商调整价格。如:客房部分价格降低10%,会场设备建议免费" v-model="textValue"></textarea>
      <span style="color: red; display: block" v-show="invalid">请输入要求重新报价的理由</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="quote(3)" class="submit">提交</el-button>
      </span>
    </el-dialog>
    <!-- 确认中标选择询价单弹窗 -->
    <el-dialog title="确认中标总金额" :visible.sync="Visible" width="50%" center :close-on-click-modal="false">
      <div v-show="isBid">
        <div class="send_ft">
          请勾选本次会议所有需要中标的报价，以确认是否超出预算：
          <!-- <el-button id="downloadunion" @click="downloadOffer" size="mini" type="text" style="float: right;cursor: pointer; color: #428bca;">合并下载报价单</el-button> -->
        </div>
        <el-table ref="multipleTable" :data="tableData" @row-click="checkedRow" @select="selectRow" fit :show-header="false" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" :selectable="isDisabled">
          </el-table-column>
          <el-table-column label="询价单">
            <template slot-scope="scope">
              询价单号【{{ scope.row.inquiry_sheet_code }}】
            </template>
          </el-table-column>
          <el-table-column prop="name" label="公司" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="total_price" label="金额">
            <template slot-scope="scope">
              <span style="color: #f91">￥{{ positiveFloat(scope.row.total_price).toFixed(2) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <span>总金额：<span style="color: #f91; font-weight: bold">{{
              `￥${bidTotalMoney.toFixed(2)}`
            }}</span></span>
          <span style="margin-left: 200px">预算：<span style="color: #f91; font-weight: bold">{{
              `￥${menus.total_budget}`
            }}</span></span>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBid(1)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 无法确认中标弹窗 -->
    <el-dialog title="提示" :visible.sync="canotBidVisible" width="30%" center>
      <div>
        <span class="winning">当前报价尚未通过中标审批，无法中标。</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canotBidVisible = false">取 消</el-button>
        <el-button type="primary" @click="canotBidVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 审批完成后确认中标弹窗 -->
    <el-dialog class="finalConfirm" :visible.sync="finalConfirmVisible" width="40%" center>
      <div slot="title">
        <h3>确认中标，发送PO/合同</h3>
        <p style="
            font-size: 14px;
            color: #7e7f80;
            text-align: center;
            line-height: 20px;
          ">
          确认中标后，系统会发确认订单及中标通知给会议服务商
        </p>
      </div>
      <div class="pop_box">
        <div class="send_box clx">
          <div class="offline selected">
            <div class="send_ft">
              点击“确定中标”后， 会议服务商会收到中标通知
              ，您可按需进行线下合同操作
            </div>
            <div class="send_list">
              <div class="sl_title">会议服务商信息</div>
              <p>姓名：luke</p>
              <p>手机号：13917031506</p>
              <p>邮箱：luke.lu@hotelgg.com</p>
            </div>
          </div>
        </div>
        <div class="dl_box">
          <div class="send_dl clx">
            <span>附件：</span>
            <a href="/cmms/event/MID20211020208490/rfp/dmc/DO211020526834/offer/35330/export?export=excel" target="_blank"><i class="ico"></i>会议服务商报价单</a>
          </div>
          <p class="dl_txt">点击附件名称即可预览附件</p>
        </div>
        <div class="send_bz">
          <textarea placeholder="请输入中标操作的备注信息（非必填）" id="accept_mark"></textarea>
        </div>
        <div class="decline_check">
          <label>
            <input type="checkbox" id="refuse" />
            选择此会议服务商中标后自动谢绝其他会议服务商的报价
          </label>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="finalConfirmBtn" @click="quote(1)">确 定 中 标</el-button>
      </span>
    </el-dialog>
    <!-- 谢绝报价弹窗 -->
    <el-dialog title="谢绝报价" :visible.sync="declineVisible" width="30%" center>
      <textarea name id cols="30" rows="10" class="top" placeholder="请输入拒绝理由" v-model="textValue"></textarea>
      <span style="color: red; display: block" v-show="invalid" class="turn">请输入拒绝理由</span>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="quote(2)" class="cannot">谢绝报价</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  guid,
  positiveInteger,
  positiveFloat,
  positiveFloatSix,
  formatDate,
  formatNum,
} from "@/utils/common";
import BasePart from "@/components/event/basePart_2";
import QuotationPart from "./components/quotation";
import {
  classifyByTime,
  EventClassifyByTime,
} from "@/assets/js/validator";
import { MAINHOST } from "@/config";
import { limitsEffect } from "@/utils/uploadRestrictions.js";
import excelExport from "@/utils/exportexcel";
export default {
  data() {
    return {
      UploadFilesUrl: MAINHOST + "/MeetingMa/UploadFiles",
      downloadUrl: "",
      prev: "", // 上一页
      selectQuery: {},
      menus: {},
      quotation: {},
      servicer: {}, // 酒店服务商信息
      arr1: [],
      leaveWordMsg: "", //留言
      filesList: [], // 发送附件列表
      fileList: [], // 上传附件列表
      messageList: [], // 留言信息列表
      uploadFileInfo: {}, // 上传文件信息
      tableData: [], // 确认中标询价单多选列表
      declineVisible: false,
      centerDialogVisible: false,
      finalConfirmVisible: false,
      Visible: false,
      canotBidVisible: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      isBid: this.$route.query.type == "待审核" ? false : true,
      messText: "",
      value1: "",
      value2: "",
      reOfferendDate: new Date(new Date().getTime() + 86400000),
      textValue: "",
      bidTotalMoney: 0,
      invalid: false,
      pickerOptions0: {},
      afresh: true,
      status: 0,
      quotationIds: "", // 报价单ID拼接
      hasSelect: false,
      cancelInfo: {}, // 会议/询价单取消信息
      isCancel: false, // 判断会议/询价单是否取消
    };
  },
  components: { QuotationPart, BasePart },
  watch: {
    $route(n, o) {
      // debugger
      if (n.fullPath !== o.fullPath) {
        //监听路由参数是否变化
        // this.Service();
        // this.quote();
        this.maker(); //methods中封装的加载数据函数
      }
    },
  },
  computed: {
    riseInPrice() {
      // 价格上涨金额
      return function (item, index) {
        let price = item.total_price - this.quotation[index - 1].total_price;
        return price.toFixed(2);
      };
    },
    riseInPriceRatio() {
      // 价格上涨比例
      return function (item, index) {
        let ratio =
          ((item.total_price - this.quotation[index - 1].total_price) /
            this.quotation[index - 1].total_price) *
          100;
        return ratio.toFixed(2) + "%"; // 百分比保留四位小数
      };
    },
    priceFavorable() {
      // 价格优惠金额
      return function (item, index) {
        let price = this.quotation[index - 1].total_price - item.total_price;
        return price.toFixed(2);
      };
    },
    priceFavorableRatio() {
      // 价格优惠比例
      return function (item, index) {
        let ratio =
          ((this.quotation[index - 1].total_price - item.total_price) /
            this.quotation[index - 1].total_price) *
          100;
        return ratio.toFixed(2) + "%"; // 百分比保留四位小数
      };
    },
  },
  mounted() {
    this.maker();
    this.Service();
    this.GetCancel();
    this.prev = this.$route.query.prev;
  },
  methods: {
    excelExport,
    positiveFloat(num) {
      return positiveFloat(num);
    },
    //查看报价会议基本信息
    Service() {
      this.selectQuery = this.$route.query;
      this.requestApi({
        url: '/MeetingMa/GetMeetingList',
        method: 'POST',
        data: { MeetingID: this.selectQuery.id, },
      }).then((res) => {
          // console.log(res);
          this.menus = res;
          this.pickerOptions0.disabledDate = (time) => {
            let event_startdate = this.menus.event_startdate;
            // debugger
            return (
              time.getTime() < Date.now() - 8.64e7 ||
              time.getTime() > new Date(event_startdate).getTime()
            );
          };
        });
    },
    // 获取留言
    getMessage() {
      let InquirySheetObjectID = this.servicer.inquiry_sheet_object_id;
      this.requestApi({
        url: '/MeetingMa/GetMessage',
        method: 'POST',
        data: { InquirySheetObjectID, },
      }).then((res) => {
        this.messageList = res || [];
      });
    },
    // 报价历史查看报价
    checkOffer(item) {
      if (item.id == this.$route.query.foreign_key_id) {
        this.Service();
        // this.quote();
        this.maker();
      } else {
        this.$router.push({
          path: "/offer",
          query: {
            foreign_key_id: item.id, // 报价单ID
            id: this.$route.query.id, // 会议ID
            type: this.$route.query.type, // 审核状态
          },
        });
      }
    },
    // 查询取消信息
    GetCancel() {
      this.requestApi({
        url: '/MeetingMa/GetCancel',
        method: 'POST',
        data: { 
          ID: this.$route.query.inquiryListId, // 询价单ID
        },
      }).then((res) => {
          this.cancelInfo = res;
          if (res.cancel_time) {
            this.isCancel = true;
          }
        });
    },
    // 点击询价单行事件
    checkedRow(row, column, event) {
      if (row.state == 1) {
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
    },
    // 默认勾选询价单
    selectRow(selects, row) {
      debugger;
      if (row.state == 1) {
        this.$refs.multipleTable.toggleRowSelection(row, true);
      }
      this.hasSelect = selects.find((item) => item.state == 2) ? true : false;
    },
    isDisabled(row, index) {
      // debugger
      if (row.state == 1) {
        return false;
      } else {
        return true;
      }
    },
    // 多选询价单，计算金额
    handleSelectionChange(row) {
      this.bidTotalMoney = 0;
      this.quotationIds = "";
      row.forEach((element) => {
        this.bidTotalMoney += Number(element.total_price); // 计算选择询价单金额
        if (row.length > 1) {
          this.quotationIds += element.id + ","; //报价单ID拼接
        } else {
          this.quotationIds = element.id;
        }
      });
    },
    eventBaseInfo(data) {
      this.eventBaseInfo = data;
    },
    // 谢绝报价、重新报价
    quote(status) {
      // 1、报价，2、谢绝报价，3、重新报价
      let Parameter = {
        status: status,
        id: this.$route.query.foreign_key_id, // 报价单ID
        inquiry_sheet_object_id: this.$route.query.serviceId, //服务商ID
        message: "",
      };
      if (status !== 1) {
        if (this.textValue.trim() === "") {
          this.invalid = true;
          return false;
        } else {
          Parameter.message = this.textValue;
        }
        if (status == 3) {
          Parameter.offerenddate = this.reOfferendDate;
        }
      }

      this.invalid = false;
      this.requestApi({
        url: '/MeetingMa/QuotedPriceStatus',
        method: 'POST',
        data: { 
          Parameter: JSON.stringify(Parameter), 
        },
      }).then((res) => {
          this.arr1 = res;
          if (res) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.centerDialogVisible = false;
            this.Visible = false;
            this.canotBidVisible = false;
            this.declineVisible = false;

            if (res == "未审批完成，请勿重复点击") {
              return;
            }
            this.$router.go(-1);
            this.maker();
            // this.status = status;
          }
        });
    },
    yao() {
      this.centerDialogVisible = true;
      this.invalid = false;
    },
    // 确认报价
    Confirm(sbumitType) {
      debugger;
      let Parameter = {
        status: 1,
        type: sbumitType || 0, // 默认0，不走审批流 1
        id: this.$route.query.foreign_key_id, // 报价单ID
        inquiry_sheet_object_id: this.servicer.inquiry_sheet_object_id, //服务商ID
      };
      const _this = this;
      this.requestApi({
        url: '/MeetingMa/QuotedPriceStatus',
        method: 'POST',
        data: { 
          Parameter: JSON.stringify(Parameter), 
        },
      }).then((resData) => {
          if (resData.data === 1 || resData.data === 0) {
            //0酒店,1服务商
            this.requestApi({
              url: '/MeetingMa/WinTheBiddingQuotedPrice',
              method: 'POST',
              data: { 
                MeetingID: this.$route.query.id,
                type: resData.data,
              },
            }).then((res) => {
              this.Visible = true;
              this.tableData = res;
              this.$nextTick(() => {
                this.tableData.forEach((item, index) => {
                  if (item.state == 1) {
                    // 默认选中已中标报价单
                    _this.$refs.multipleTable.toggleRowSelection(item, true);
                  }
                });
              });
            });
          } else if (resData.data === true) {
            this.$message({
              message: resData.msg,
              type: "success",
            });
            this.$router.go(-1);
            this.maker();
          } else {
            // this.canotBidVisible = true; // 无法确认中标弹窗
            this.$confirm(resData.msg, "提示", {
              confirmButtonText: "查看审批进度",
              cancelButtonText: "取消",
              center: true,
            })
              .then(() => {
                this.$router.push({
                  name:'biddedDetail',
                  // path: "/cmms",
                  query: {
                    id: this.$route.query.id,
                    ApproveID: resData.data.ApproveID, // 审批ID
                  },
                });
              })
              .catch(() => {});
          }
        });
    },
    // 确认报价临时方法
    ConfirmTempFn() {
      // 1、报价，2、谢绝报价，3、重新报价
      let Parameter = {
        status: 1,
        id: this.$route.query.foreign_key_id, // 报价单ID
        inquiry_sheet_object_id: this.$route.query.serviceId, //服务商ID
        message: "",
      };
      this.requestApi({
        url: '/MeetingMa/Temporary',
        method: 'POST',
        data: { 
          Parameter: JSON.stringify(Parameter),
        },
      }).then((res) => {
        this.$message({
          message: "确认中标成功",
          type: "success",
        });
        this.maker();
      });
    },
    // 确认报价生成审批
    confirmBid() {
      debugger;
      if (!this.quotationIds || !this.hasSelect) {
        this.$message.error("请选择中标报价");
        return;
      }
      let Parameter = {
        id: this.quotationIds, // 多个报价单ID
        event_info_id: this.$route.query.id, //会议ID
        total_price: this.bidTotalMoney, // 多个询价单总金额
      };
      // debugger
      this.requestApi({
        url: '/MeetingMa/WinningTheBidApprove',
        method: 'POST',
        data: { 
          Parameter: JSON.stringify(Parameter),
        },
      }).then((res) => {
        debugger;
        if (res === 1) {
          this.$confirm("没有审批流程，是否直接提交中标?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.Confirm(1); // 没有审批流程，直接中标
            this.Visible = false;
          });
        } else {
          this.$message({ message: "操作成功", type: "success" });
          this.Visible = false;
          this.maker();
        }
      });
    },
    decline() {
      this.declineVisible = true;
      this.invalid = false;
    },
    downloadOffer() {
      if (this.quotationIds) {
        this.requestApi({
          url: '/ExcelExport/QuotedPriceSettlementExcel',
          method: 'POST',
          data: { 
            QuotedPriceID: this.quotationIds,
          },
        }).then((resUrl) => {
          // window.open(resUrl, "_blank");
          if (resUrl) {
            let a_link = document.createElement("a");
            fetch(resUrl)
              .then((res) => res.blob())
              .then((blob) => {
                // 将链接地址字符内容转变成blob地址
                a_link.href = URL.createObjectURL(blob);
                a_link.download = "报价单"; //下载的文件的名字
                document.body.appendChild(a_link);
                a_link.click();
              });
            }
          });
      } else {
        this.$message.error("请勾选需要下载的报价单");
      }
    },
    // 下载报价单
    excelexport() {
      //导出excel
      var name = "DMC报价单" + this.$route.query.id;
      // let priceSheetId = this.$route.params.id
      this.excelExport(
        "/Template/GetTemplate",
        {
          eventid: this.$route.query.id,
          type: 3,
          param: this.$route.query.foreign_key_id,
        },
        name
      );
    },
    fileLimit(file) {
      const isLt30M = file.size / 1024 / 1024 < 30;
      if (!isLt30M) {
        this.$message.error("上传附件大小不能超过 30MB!");
        return false;
      }
      return limitsEffect(file);
    },
    // 上传文件
    uploadFile(e) {
      this.uploadFileInfo = e;
      // this.fileList = [{name:e.title, url: e.weburl}];
      this.filesList.push({ name: e.title, url: e.weburl });
    },
    // 上传文件个数超出限制
    overLimit(files, fileList) {
      this.$message.error("文件只能上传一份");
    },
    // 文件删除
    deleteFile(file, fileList) {
      this.filesList = [];
      fileList.forEach((file) => {
        this.filesList.push({ name: file.name, url: file.url });
      });
      // this.waitUpload = e;
    },
    // 给会议服务商发送信息
    sendMsg() {
      let Parameter = {
        inquiry_sheet_object_id: this.servicer.inquiry_sheet_object_id,
        message: "",
        message_type: 0, // 留言是0，文件是1
      };
      if (this.leaveWordMsg) {
        Parameter.message = this.leaveWordMsg;
        this.requestApi({
          url: '/MeetingMa/MessageSava',
          method: 'POST',
          data: { 
            Parameter: JSON.stringify(Parameter),
          },
        }).then((res) => {
          if (res) {
            this.getMessage();
            this.$message({
              message: "消息发送成功",
              type: "success",
            });
            this.leaveWordMsg = "";
          }
        });
      }
      this.filesList.forEach((file, index) => {
        Parameter.message = file.name + "," + file.url;
        Parameter.message_type = 1;
        this.requestApi({
          url: '/MeetingMa/MessageSava',
          method: 'POST',
          data: { 
            Parameter: JSON.stringify(Parameter),
          },
        }).then((res) => {
          if (res && index == 0) {
            this.$message({
              message: "文件发送成功",
              type: "success",
            });
            this.leaveWordMsg = "";
            this.getMessage();
          }
        });
      });
    },
    // 预览留言文件
    handlePreview(fileStr) {
      debugger;
      let filepath = fileStr.slice(fileStr.lastIndexOf(",") + 1);
      let filename = fileStr.slice(0, fileStr.lastIndexOf(","));
      if (!filepath) return;
      // 获取文件后缀名
      let suffix = filepath.substring(filepath.lastIndexOf(".") + 1);
      // doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
      let types1 = ["pdf", "jpeg", "jpg", "png", "txt"];
      let types2 = ["docx", "doc", "xls", "xlsx", "xlsm", "ppt", "pptx"];
      filepath = filepath.replace(/http:/, "https:");
      this.downloadUrl = filepath;
      if (types2.includes(suffix)) {
        this.downloadUrl =
          "https://view.officeapps.live.com/op/view.aspx?src=" +
          encodeURIComponent(filepath);
      } else if (types1.includes(suffix)) {
        this.downloadUrl = filepath;
      } else {
        this.$message.info("文件格式不支持预览，下载后查看");
      }
      // this.downloadUrl= 'https://view.xdocin.com/view?src=' + encodeURIComponent(file.url)
      setTimeout(() => {
        this.$refs.a_click.click();
      }, 100);
    },
    // 留言下载文件
    downloadFile(fileStr) {
      let downloadUrl = fileStr.slice(fileStr.lastIndexOf(",") + 1);
      let filename = fileStr.slice(0, fileStr.lastIndexOf(","));
      let a_link = document.createElement("a");
      a_link.href = downloadUrl;
      a_link.download = filename; //下载的文件的名字/
      document.body.appendChild(a_link);
      a_link.click();
      // })
    },
    hotel() {
      this.requestApi({
        url: '/MeetingMa/GetQuotedPrice',
        method: 'POST',
        data: { 
          QuotedPriceID: this.$route.query.foreign_key_id,
        },
      }).then((res) => {
        console.log(res);
        this.quotation = res.quotedprice;
      });
    },
    maker() {
      this.requestApi({
        url: '/MeetingMa/GetQuotedPrice',
        method: 'POST',
        data: { 
          QuotedPriceID: this.$route.query.foreign_key_id,
        },
      }).then((res) => {
        if (res) {
          this.servicer = res.service; //服务商、酒店信息
          this.$refs.quotations.hotelInfo = res.service; //服务商、酒店信息
          this.$refs.quotations.roomList = classifyByTime(res.room); //客房
          this.$refs.quotations.eventList = EventClassifyByTime(
            res.conference
          ); //会场信息
          this.$refs.quotations.carList = classifyByTime(res.car, "datatime"); // 地面交通
          this.$refs.quotations.foodList = classifyByTime(res.food); //餐饮信息
          this.$refs.quotations.foodOutsideList = classifyByTime(
            res.foodOutside
          ); //餐饮信息
          this.$refs.quotations.otherList = res.other ? res.other : []; //其他 兼容后台没数据返回 null
          this.$refs.quotations.additional = res.quoted_price; // 报价单信息
          this.$refs.quotations.transportList = classifyByTime(
            res.transportation,
            "datatime"
          ); //大交通
          this.quotation = res.quotedprice; //报价记录
          if (this.servicer.type == 1) {
            //1为已中标，2为重新报价，3谢绝报价
            this.messText = "该报价已中标！";
          } else if (this.servicer.type === 2) {
            this.messText = "已通知会议服务商重新报价！";
          } else if (this.servicer.type == 3) {
            this.messText = "您已谢绝该报价!";
          } else if (this.servicer.type == 4) {
            this.messText = "服务商已提交最新报价!";
          } else {
            this.messText = "";
          }
          // 获取留言
          this.getMessage();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  background: #f2f4f8;
}
.main {
  width: 1100px;
  height: 55px;
  margin: auto;

  margin-top: 15px;
}
.main ul {
  display: flex;
  line-height: 55px;
}
.main ul li {
  margin-left: 4px;
}
.content {
  width: 1100px;
  height: 55px;
  background: #626e95;
  margin: auto;
}
.content img {
  width: 30px;
  height: 30px;
  float: left;
  margin-top: 11px;
  margin-left: 15px;
}
.content span {
  line-height: 55px;
  font-size: 18px;
  color: #ffffff;
}

.service {
  width: 1100px;
  background: #ffffff;
  margin: auto;
  margin-top: 18px;
  margin-bottom: 10px;
}
.Confirm {
  width: 1100px;
  padding: 20px;
  background: #edf7fd;
  border: 1px solid #aedcfa;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.06);
}
.b1 {
  width: 120px;
  height: 30px;
  color: #ffffff;
  border: none;
  background: #2896eb;
  margin-top: 35px;
  margin-left: 20px;
  cursor: pointer;
}

.purchase {
  width: 120px;
  height: 30px;
  color: #ffffff;
  background: #ff8d12;
  border: none;
  margin-top: 35px;
  margin-left: 17px;
  cursor: pointer;
}
.Confirm button:nth-of-type(3) {
  width: 120px;
  height: 30px;
  border: 1px solid #2896eb;
  color: #2896eb;
  background: #edf7fd;
  margin-top: 35px;
  margin-left: 17px;
  cursor: pointer;
}
.blueness {
  width: 1000px;
  border-top: 1px dashed #aedcfa;
  margin-top: 15px;
}
.inputs input {
  width: 650px;
  height: 30px;
  line-height: 30px;
  padding: 0 4px;
  background: #fff;
  border: 1px solid #aedcfa;
  border-radius: 2px;
  color: #282828;
  font-size: 14px;
  margin-top: 35px;
  float: left;
}
.mark {
  width: 180px;
  height: 32px;
  background: #2896eb;
  margin-top: 35px;
  border: none;
  color: #ffffff;
  margin-left: 10px;
}
.gray {
  width: 1100px;
  height: 55px;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
}
.gray p {
  line-height: 55px;
  margin-left: 15px;
  font-weight: 600;
  font-size: 14px;
  color: #282828;
}
.six {
  width: 1100px;
  height: 70px;
  background: #ffffff;
  margin: auto;
  margin-top: -10px;
  margin-bottom: 10px;
}
.six ul {
  display: flex;
}
.six ul li {
  line-height: 70px;
}

.el-icon-close:before {
  content: '\e6db';
  position: absolute;
  margin-top: -14px;
  margin-left: -15px;
}
.el-dialog__title {
  line-height: 24px;
  font-size: 13px;
  color: #303133;
}
.contentd {
  float: left;
}
.black {
  width: 120px;
  height: 30px;
  position: absolute;
  margin-top: -23px;
  margin-left: 120px;
}

.el-input--prefix .el-input__inner {
  padding-left: 30px;
  width: 200px;
  height: 30px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 206px;
  .el-input__suffix {
    top: -4px;
  }
}
.leave {
  width: 96%;
  height: 100px;
  margin-top: 40px;
}
.el-dialog--center .el-dialog__footer {
  text-align: inherit;
  margin-left: -20px;
}
.winning {
  margin-left: 96px;
}
.submit {
  width: 100px;
}
.top {
  width: 90%;
  height: 100px;
  margin-left: 11px;
}
.turn {
  margin-left: 11px;
}
.el-icon-time:before {
  content: '\e71f';
  position: absolute;
  margin-top: -5px;
  margin-left: -8px;
}
.cannot {
  margin-left: 294px;
}
.pop_title h3 {
  color: #4b4b4c;
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  text-align: center;
}
.pop_title {
  background: #f2f2f3;
  height: auto;
  padding: 15px 0;
  border-radius: 6px 6px 0 0;
}
.send_ft {
  color: #a0a0a0;
  font-size: 14px;
  line-height: 18px;
  margin: 0 0 15px 0;
}
.nformation {
  width: 1100px;
  height: 50px;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  margin: auto;
  margin-top: 15px;
  display: flex;
}
.nformation p {
  line-height: 50px;
}
.nformation p:nth-of-type(1) {
  font-weight: 600;
  font-size: 14px;
  color: #282828;
  margin-left: 15px;
}
.nformation p:nth-of-type(2) {
  font-size: 12px;
  color: #999999;
  font-weight: normal;
  margin-left: 6px;
}
.nformation p:nth-of-type(3) {
  font-weight: 600;
  font-size: 14px;
  color: #282828;
}
.information {
  width: 1100px;
  background: #ffffff;
  margin: auto;
  /*margin-bottom: 10px;*/
  ul {
    margin-left: 20px;
    overflow: hidden;
  }
  li {
    line-height: 32px;
    font-size: 14px;
    /*margin-top: 10px;*/
    color: #777;
  }

  li:nth-of-type(1) {
    margin-top: 18px;
  }
  li:last-of-type {
    margin-bottom: 18px;
  }
}
.offerPrice {
  color: #f91;
}
.checkOffer {
  color: #2896eb;
  margin-left: 10px;
  cursor: pointer;
}
.checkOffer:hover {
  color: #f91;
}
.finalConfirm {
  ::v-deep .el-dialog__header {
    background: #f2f2f3;
  }
  .send_box {
    margin-bottom: 15px;
    .selected {
      background: #f6faff;
      border: 1px solid #54acf5;
      padding: 19px;
    }
    .send_list p {
      color: #a0a0a0;
      font-size: 12px;
      line-height: 18px;
    }
  }
  .dl_box {
    margin: 0 0 20px 0;
    .send_dl {
      a {
        float: left;
        margin: 0 0 0 10px;
        padding: 0 10px;
        height: 22px;
        border: 1px dashed #d0cccc;
        background: #fff;
        font-size: 14px;
        color: #666;
        text-decoration: none;
      }
      a:hover {
        background: #3ba4fa;
        border: 1px solid #3ba4fa;
        color: #fff;
        transition: all 250ms ease 0s;
      }
      span {
        float: left;
        font-size: 14px;
        line-height: 24px;
      }
    }
    .clx:after {
      content: '.';
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
    .dl_txt {
      font-size: 12px;
      color: #868686;
      line-height: 18px;
    }
  }
  .send_bz {
    margin: 0px 0px 5px;
    textarea {
      width: 620px;
      height: 60px;
      line-height: 20px;
      padding: 4px 9px;
      border: 1px solid #eaeaea;
      font-size: 14px;
      color: #333;
      resize: none;
    }
  }
}
.finalConfirmBtn {
  display: inline-block;
  padding: 0;
  background: #3099f1 none repeat scroll 0% 0%;
  color: #fff;
  width: 150px;
  text-align: center;
  line-height: 44px;
  height: 44px;
  font-size: 16px;
  text-decoration: none;
  border-radius: 3px;
}
.finalConfirmBtn:hover {
  opacity: 0.8;
  transition: all 250ms ease 0s;
}
.order_cancel_notice {
  // margin: 0 0 20px 0;
  padding: 20px 30px;
  text-align: center;
  border-radius: 2px;
  border: 1px solid #aedcfa;
  background: #e2f3fe;
  width: 1100px;
  margin: auto;
  box-sizing: border-box;
}
.order_cancel_notice .title {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #282828;
  line-height: 20px;
  text-align: center;
  font-weight: bold;
}
.order_cancel_notice .cancel_detail {
  text-align: center;
  font-size: 12px;
  color: #777;
  line-height: 20px;
}
.order_cancel_notice .cancel_detail span {
  margin: 0 0 0 10px;
}
.order_cancel_notice .title strong {
  color: #2896eb;
  font-weight: bold;
}
.message_txt {
  // float: right;
  // background: #47b0ed;
  // color: #fff;
}
.fileMseeage {
  color: #47b0ed;
  cursor: pointer;
}
.fileMseeage:hover {
  // color: cornflowerblue;
}
.rights {
  position: relative;
}

.rights img {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 100px;
  top: 13px;
}

.rights p {
  position: absolute;
  right: 21px;
  top: 18px;
  color: #ffffff;
}

@media only screen and (max-width: 1350px) {
  .main {
    width: 100%;
  }
  .content {
    width: 100%;
  }
  .service {
    width: 100%;
  }
  .Confirm {
    width: 100%;
    padding: 20px 0;
  }
  .gray {
    width: 100%;
  }
  .six {
    width: 100%;
  }
  .nformation {
    width: 100%;
  }
  .information {
    width: 100%;
  }
  .order_cancel_notice {
    width: 100%;
  }
  .content {
    width: 100%;
  }
  .blueness {
    width: 100%;
  }
}
</style>
