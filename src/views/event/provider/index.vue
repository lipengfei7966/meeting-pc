<template>
  <div>
    <div class="brother">
      <ul>
        <el-button type="text" @click="$router.replace({ name: 'eventList' })">我的会议</el-button>
        <li style="color: #7c7f82; font-size:14px;">></li>
        <el-button type="text" @click="$router.go(-1)">会议详情</el-button>
        <li v-if="prev" style="color:#7c7f82;">></li>
        <el-button type="text" v-if="prev" @click="$router.go(-1)">{{ prev }}</el-button>
        <li style="color: #7c7f82; font-size:14px;">></li>
        <li style="color: #7c7f82; font-size:14px;">订单详情</li>
      </ul>
    </div>
    <div class="order">
      <img :src="require('@/assets/images/文章.png')" alt />
      <p>订单号：</p>
      <p v-if="summary.length">{{ summary[0].num }}</p>
      <p v-if="summary.length">({{ summary[0].date }})</p>
    </div>
    <div class="Sales">
      <p style="font-size:16px; color: #282828; font-weight: bold; margin-top:10px;">
        订单状态：
        <span style="color: #2896eb; font-weight: bold;">{{ summary[0].name }}</span>
      </p>
      <p style="color: #7c7f82; margin-top:10px;">
        <span v-if="summary[0].name == '已创建待执行'">会议服务商已收到订单，活动开始后系统会自动通知会议服务商提交结算单。</span>
        <span v-if="summary[0].name == '已执行待结算'">会议已结束，服务商待提交结算单</span>
        <span v-if="summary[0].name == '待确认结算单'">服务商已提交结算单</span>

        <span v-if="summary[0].name == '要求补充材料'">已要求服务商补充材料</span>
        <span v-if="summary[0].name == '客户驳回结算单'">结算单审核不通过，待重新提交结算单</span>
        <span v-if="summary[0].name == '结算单已确认'">结算单已确认，会议服务商将会与您沟通发票、付款等事宜。</span>
      </p>
      <div class="flex_row justify_center">
        <el-button v-if="summary.length && summary[0].settlementId" type="text" @click="goPage('msd', summary[0])">查看结算单</el-button>
        <el-button type="text" class="mar_l20" @click="change">查看服务商评价</el-button>
        <el-button v-if="isShowCancelBtn" type="text" class="mar_l20" @click="cancelOrderDialog = true">取消订单</el-button>
      </div>
      <el-dialog title="全部会议服务商内部点评" :visible.sync="centerDialogVisible" width="30%" center style="height:auto">
        <div>
          <span>评价总数:</span>
          <span style="color: #f90;">{{ arr.length }}</span>
        </div>

        <div v-for="(item, index) in arr" :key="index" style="width:100%;height:auto" class="comment">
          <span class="convention">{{ item.fullname }}</span>
          <span class="eventdate">{{ item.evaluates_time }}</span>
          <span class="points">总分:</span>
          <div class="bleck">
            <el-rate v-model="item.evaluates_grade" disabled></el-rate>
          </div>
          <div class="star-rating"></div>
          <span style="margin-top:10px;" class="figure">{{ item.evaluates_text }}</span>
        </div>
        <div class="dialog-footer">
          <el-button type="primary" class="primary" @click="addComment">添加评论</el-button>
        </div>
      </el-dialog>
      <el-dialog title="发布会议服务商内部点评" :visible.sync="addCommentFlag" width="30%" center>
        <div class="rating">评星</div>
        <div class="blck">
          <el-rate v-model="evaluates_grade"></el-rate>
        </div>
        <span class="modeled">描述</span>
        <textarea name id cols="30" rows="10" class="Comment" placeholder="请输入您对应供应商的评价内容,做多500字..." v-model="ApprovalOpinion"></textarea>
        <button class="comments" @click="submit">提交评论</button>
      </el-dialog>
    </div>
    <div class="outline">
      <p>订单概要</p>
    </div>
    <div class="sheet" v-for="item in summary">
      <p style="margin-left:15px; margin-top:15px; color: #777;">
        订单号:
        <span style="margin-left:6px;">{{ item.num }}</span>
      </p>
      <!-- <p style="margin-left:15px; margin-top:8px; color: #777;">
        PO单号：
        <span>の5</span>
      </p> -->
      <p style="margin-left:15px; margin-top:8px; color: #777;">
        发起人：
        <span>{{ item.fullname }}</span>
      </p>
      <p style="margin-left:15px; margin-top:8px; color: #777;">
        下单时间：
        <span>{{ item.date }}</span>
      </p>
      <p style="margin-left:15px; margin-top:8px; color: #777;">
        中标会议服务商：
        <span style=" color: #f91;">{{ item.servcice_hotel_name }}</span>
      </p>
      <p style="margin-left:15px; margin-top:8px; color: #777;">
        订单状态：
        <span>{{ item.name }}</span>
      </p>
      <p style="margin-left:15px; margin-top:8px; color: #777;">
        总报价：
        <span style="color: #f91;">￥{{ item.price }}</span>
      </p>
      <div class="dotted"></div>
      <p style="margin-left:15px; margin-top:15px; color: #777;">
        您已通过邮件发送该订单的
        <span style="color: #f91;">
          询价单
          <span style="color:#777">会议服务商的</span>
          <span>报价单</span>
          <span style="color:#777;">至 国旅国际会议展览有限公司 以下人员：</span>
        </span>
      </p>
      <p style="margin-left:15px; margin-top:15px; color: #777;">{{ item.servcice_hotel_email }}</p>
      <p style="margin-left:15px; margin-top:15px; color: #777;">关联内容</p>
      <div class="pad_10">
        <el-button size="small" type="primary" @click="goPage('offer', item)">报价单</el-button>
        <el-button size="small" type="primary" @click="goPage('servicedetails', item)">询价单</el-button>
        <el-button size="small" v-if="item.settlementId" type="primary" @click="goPage('msd', item)">结算单</el-button>
      </div>
    </div>
    <!-- 会议基本信息 -->
    <base-part :source="'order'"></base-part>
    <div class="depth">
      <p>内部备注</p>
    </div>
    <div class="list">
      <p>备注信息列表</p>
      <div class="xian"></div>
      <p>暂无备注</p>
    </div>
    <quotation-part class="service service_quotation" ref="quotations"></quotation-part>
    <!--取消订单-->
    <el-dialog title="取消订单" width="500px" :visible.sync="cancelOrderDialog">
      <el-input type="textarea" :rows="6" placeholder="请简要说明取消原因(必填)" v-model="content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelOrderDialog = false">暂不取消</el-button>
        <el-button size="small" style="margin-left:10px" type="primary" @click="cancelTap">确认取消</el-button>
      </span>
    </el-dialog>
    <el-dialog :show-close="false" :visible.sync="cancelSuccess" title="" width="500px" :close-on-click-modal="false">
      <div class="budgetCancel">
        <div>订单取消成功!</div>
        <div>当前会议已经填报预算，请确认是否需要重新填报预算。</div>
      </div>
      <span slot="footer" class="dialog-footer flex_row justify_center mar_t20">
        <el-button type="primary" size="small" @click="notUpdate()">不用了</el-button>
        <el-button type="primary" size="small" @click="updateBudget()">更新预算</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QuotationPart from '../offer/components/quotation'
import BasePart from '@/components/event/basePart_2'
import { classifyByTime, EventClassifyByTime } from '@/assets/js/validator'
export default {
  data() {
    return {
      prev: '',
      arr: [],
      centerDialogVisible: false,
      value1: null,
      value2: null,
      evaluates_grade: '',
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      addCommentFlag: false,
      summary: {},
      ApprovalOpinion: '',
      eventId: '',
      cancelOrderDialog: false, // 取消订单弹框
      content: '', // 取消原因
      isShowCancelBtn: false, // 是否展示取消会议按钮
      cancelSuccess: false, //订单取消成功后的弹框显示、隐藏
      num: 0 //预算填报次数
    }
  },
  components: {
    BasePart,
    QuotationPart
  },
  mounted() {
    this.eventId = this.$route.query.id
    this.Searname()
    this.grade()
    this.cancelShow()
    this.budget()
    this.prev = this.$route.query.prev
  },
  methods: {
    budget() {
      this.requestApi({
        url: '/Quotation/FillinBuget',
        method: 'POST',
        data: { eventinfoid: this.eventId }
      }).then(res => {
        if (res[0] && res[0].budget_count) this.num = res[0].budget_count
      })
    },
    //更新预算
    updateBudget() {
      sessionStorage.setItem('budgetKey', true) //存入键值，true为打开填报预算弹框,在会议详情获取使用
      this.$router.go(-1)
    },
    //不更新预算
    notUpdate() {
      this.cancelSuccess = false
      //取消之后刷新页面,开发时间短，暂时为更新接口
      this.Searname()
      this.grade()
      this.cancelShow()
    },
    // 取消订单  按钮展示
    cancelShow() {
      this.requestApi({
        url: '/MeetingMa/CancelShow',
        method: 'POST',
        data: { ID: this.$route.query.orderId, type: 3 }
      }).then(res => {
        this.isShowCancelBtn = res
      })
    },
    // foreign_key_id 报价单id  serviceId:服务商id
    goPage(name, data) {
      // id:$route.query.id,foreign_key_id: item.quoted_priceid, type: 1, serviceId: item.id
      let query = {
        id: this.$route.query.id, // 会议id
        foreign_key_id: data.event_quoted_price_id, // foreign_key_id 报价单id
        serviceId: data.servcice_hotel_id, // serviceId:服务商id
        sheetId: data.event_inquiry_sheet_id, // 询价单id
        settlementId: data.settlement_sheet_id, // 结算单id
        prev: '订单详情'
      }
      this.$router.push({ name, query })
    },
    // 取消订单
    cancelTap() {
      if (this.content) {
        this.requestApi({
          url: '/MeetingMa/CancelOrderform',
          method: 'POST',
          data: { OrderformID: this.$route.query.orderId, Content: this.content }
        }).then(res => {
          this.cancelOrderDialog = false
          if (this.num > 0 && this.servicer.type == 1) {
            //this.servicer.type 1中标
            this.cancelSuccess = true
          } else {
            //取消之后刷新页面,开发时间短，暂时为更新接口
            this.Searname()
            this.grade()
            this.cancelShow()
          }
          this.$message.warning(res.msg)
        })
      } else {
        this.$message.warning('请填写取消原因')
      }
    },
    // 获取需求统计
    getDemand(QuotedPriceID) {
      this.requestApi({
        url: '/MeetingMa/GetQuotedPrice',
        method: 'POST',
        data: { QuotedPriceID: QuotedPriceID }
      }).then(res => {
        if (res) {
          this.servicer = res.service //服务商、酒店信息
          this.$refs.quotations.hotelInfo = res.service //服务商、酒店信息
          this.$refs.quotations.roomList = classifyByTime(res.room) //客房
          this.$refs.quotations.eventList = EventClassifyByTime(res.conference) //会场信息
          this.$refs.quotations.carList = classifyByTime(res.car, 'datatime') // 地面交通
          this.$refs.quotations.foodList = classifyByTime(res.food) //餐饮信息
          this.$refs.quotations.foodOutsideList = classifyByTime(res.foodOutside) //餐饮信息
          this.$refs.quotations.otherList = res.other ? res.other : [] //其他 兼容后台没数据返回 null
          this.$refs.quotations.additional = res.quoted_price // 报价单信息
          this.$refs.quotations.transportList = classifyByTime(res.transportation, 'datatime') //大交通
          this.quotation = res.quotedprice //报价记录
        }
      })
    },
    // 查询订单概要
    Searname() {
      this.requestApi({
        url: '/MeetingMa/GetOrderformByID',
        method: 'POST',
        data: { OrderformID: this.$route.query.orderId }
      }).then(res => {
        console.log(res)
        this.summary = res
        // 获取需求统计
        this.getDemand(this.summary[0].event_quoted_price_id) // 传参报价单ID
        //获取中标信息
        this.getServiceType(this.summary[0].event_quoted_price_id) // 传参报价单ID
      })
    },
    change() {
      this.centerDialogVisible = true
    },
    addComment() {
      this.centerDialogVisible = false
      this.addCommentFlag = true
    },
    // 服务商评价查询
    grade() {
      this.requestApi({
        url: '/MeetingMa/GetServiceEvaluates',
        method: 'POST',
        data: { OrderformID: this.$route.query.orderId }
      }).then(res => {
        console.log(res)
        this.arr = Array.isArray(res) ? res : []
      })
    },
    submit() {
      this.requestApi({
        url: '/MeetingMa/ServiceEvaluatesSava',
        method: 'POST',
        data: {
          Parameter: JSON.stringify({
            orderfrom_id: this.$route.query.orderId,
            evaluates_text: this.ApprovalOpinion,
            evaluates_grade: this.evaluates_grade
          })
        }
      }).then(res => {
        console.log(res)
        this.centerDialogVisible = false
        this.addCommentFlag = false
        this.grade()
      })
    }
  }
}
</script>

<style lang="scss">
body {
  background: #f2f4f8;
}

.brother {
  width: 1100px;
  height: 50px;
  // background: orchid;
  margin: auto;
  margin-top: 20px;
}

.brother ul {
  display: flex;
}

.brother ul li {
  line-height: 50px;
  padding-left: 10px;
}

.order {
  width: 1100px;
  height: 44px;
  background: #626e95;
  margin: auto;
}

.order img {
  width: 30px;
  height: 30px;
  margin-left: 18px;
  margin-top: 7px;
  float: left;
}

.order p:nth-of-type(1) {
  float: left;
  margin-top: 13px;
  color: #ffffff;
  margin-left: 10px;
}

.order p:nth-of-type(2) {
  float: left;
  margin-top: 16px;
  color: #ffffff;
  margin-left: 6px;
}

.order p:nth-of-type(3) {
  float: left;
  margin-top: 13px;
  color: #ffffff;
  margin-left: 10px;
}

.Sales {
  width: 1100px;
  height: 100px;
  border-radius: 2px;
  border: 1px solid #aedcfa;
  background: #e2f3fe;
  margin: auto;
}

.Sales p {
  text-align: center;
}

.outline {
  width: 1100px;
  height: 60px;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  margin: auto;
  margin-top: 15px;
}

.outline p {
  line-height: 60px;
  margin-left: 30px;
  font-weight: 600;
  font-size: 14px;
  color: #282828;
}

.sheet {
  width: 1100px;
  /*height: 350px;*/
  background: #ffffff;
  margin: auto;
  overflow: hidden;
}

.dotted {
  width: 1060px;
  border-top: 1px dashed #e2e3e6;
  margin-left: 15px;
  margin-top: 15px;
}

.beauty {
  float: left;
}

.original {
  width: 80px;
  height: 30px;
  background: #f7fbff;
  border: 1px solid #88c6f5;
  margin-left: 90px;
  margin-top: -20px;
  position: absolute;
  color: #0084e9;
}

.evaluation {
  width: 80px;
  height: 30px;

  background: #f7fbff;
  border: 1px solid #88c6f5;
  margin-left: 180px;
  margin-top: -20px;
  position: absolute;
  color: #0084e9;
}

.final {
  width: 80px;
  height: 30px;
  background: #f7fbff;
  border: 1px solid #88c6f5;
  margin-left: 280px;
  margin-top: -20px;
  position: absolute;
  color: #0084e9;
}

.convention {
  margin-top: 10px;
  // float: left;
}

.eventdate {
  // float: left;
  margin-top: 12px;
  margin-left: 15px;
}

.points {
  margin-top: 10px;
  // float: left;
  margin-left: 50px;
}

.primary {
  margin-top: 30px;
  margin-left: -20px;
}

.bleck {
  // float: left;
  margin-left: 300px;
  margin-top: -18px;
}

.depth {
  width: 1100px;
  height: 50px;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  margin: auto;
  margin-top: 15px;
}

.depth p {
  line-height: 50px;
  margin-left: 30px;
}

.list {
  width: 1100px;
  height: 130px;
  background: #ffffff;
  margin: auto;
  overflow: hidden;
}

.list p {
  margin-left: 10px;
  margin-top: 20px;
}

.list p:nth-of-type(2) {
  color: #bebebe;
  margin-top: 8px;
}

.xian {
  width: 1070px;
  border-bottom: 1px solid #dcdcdc;
  margin-left: 10px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}

.comment {
  margin-top: 14px;
}

.rating {
  margin-left: 15px;
  // float: left;
}

.blck {
  //    float: left;
  margin-left: 70px;
  position: absolute;
  margin-top: -18px;
}

.modeled {
  position: absolute;
  margin-top: 10px;
}

.Comment {
  width: 90%;
  height: 100px;
  margin-left: 40px;
  margin-top: 10px;
}

.comments {
  width: 80px;
  height: 30px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  border: none;
  margin-left: 172px;
  margin-top: 20px;
}

.figure {
  display: flex;
  margin-top: 10px;
}

.service_quotation {
  width: 1100px;
  margin: 20px auto;
}

@media only screen and (max-width: 1350px) {
  .brother {
    width: 100%;
  }

  .order {
    width: 100%;
  }

  .Sales {
    width: 100%;
  }

  .outline {
    width: 100%;
  }

  .sheet {
    width: 100%;
  }

  .depth {
    width: 100%;
  }

  .list {
    width: 100%;
  }
  .service_quotation {
    width: 100%;
  }
}
</style>
