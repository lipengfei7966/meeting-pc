<template>
  <div class="event_detail box">
    <div class="event_process mar_b20 pad_tb10">
      <div class="event_process_title flex_row justify_between align_center pad_lr20">
        <div class="flex_row align_center">
          <el-button type="text" @click="$router.replace('eventList')">会议列表</el-button>
          <span style="color: #7c7f82" class="mar_lr10">></span>
          <span style="color: #7c7f82">会议详情（{{ eventName }}）</span>
        </div>
      </div>
    </div>
    <div style="margin: 10px 0">
      <div class="flex_row justify_between" style="font-size: 18px">
        <p>{{ eventName }}</p>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link" style="
              font-size: 16px;
              color: #2896eb;
              font-weight: 600;
              cursor: pointer;
            ">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">高级设置</el-dropdown-item>
            <el-dropdown-item v-if="isShowCancelBtn" command="2">取消会议</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-steps :active="eventStatu" finish-status="finish" process-status="process" align-center style="margin-top: 20px">
        <el-step title="创建会议" description="已完成"></el-step>
        <el-step :class="eventStatu == 1 ? 'processing' : ''" title="确定采购需求" :description="eventStatu >= 2 ? '已完成' : '进行中'"></el-step>
        <el-step :class="eventStatu == 2 ? 'processing' : ''" title="找供应商询价、议价" :description="
            eventStatu >= 3 ? '已完成' : eventStatu == 2 ? '进行中' : '未开始'
          "></el-step>
        <el-step :class="eventStatu == 3 ? 'processing' : ''" title="确认中标，生成订单" :description="
            eventStatu >= 4 ? '已完成' : eventStatu == 3 ? '进行中' : '未开始'
          "></el-step>
        <el-step :class="eventStatu == 4 ? 'processing' : ''" title="会后结算审批" :description="
            eventStatu >= 5 ? '已完成' : eventStatu == 4 ? '进行中' : '未开始'
          "></el-step>
        <el-step :class="eventStatu == 5 ? 'processing' : ''" title="会议完成" :description="
            eventStatu == 6 ? '已完成' : eventStatu == 5 ? '进行中' : '未开始'
          "></el-step>
      </el-steps>
    </div>

    <div class="step_part">
      <stepOne :eventId="eventId" :eventName="eventName" :isDMC="false" :isShowCancelBtn="isShowCancelBtn" ref="baseInfo"></stepOne>
      <stepTwo :eventId="eventId" :eventName="eventName" :isDMC="false" :isShowCancelBtn="isShowCancelBtn" ref="demandInfo"></stepTwo>
      <stepThree :eventStatu="eventStatu"></stepThree>
      <stepFour></stepFour>
    </div>

    <!--    取消会议-->
    <el-dialog :visible.sync="cancelEventDialog" width="30%" title="取消会议" align="center">
      <div style="width: 100%; text-align: left; padding-bottom: 8px">
        取消会议，将同时取消询价单。您确认取消会议吗？
      </div>
      <el-input type="textarea" size="small" v-model="cancelReason" :rows="6" placeholder="请简要说明取消原因"></el-input>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button type="info" size="small" @click="cancelEventDialog = false">暂不取消</el-button>
        <el-button type="primary" size="small" @click="cancelEventTap">确认取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { guid, positiveInteger, positiveFloat, positiveFloatSix, formatDate, formatNum } from '@/utils/common'
import stepOne from './components/stepOne'
import stepTwo from './components/stepTwo'
import stepThree from './components/stepThree'
import stepFour from './components/stepFour'
export default {
  name: 'eventDetail',
  data() {
    return {
      eventId: '',
      eventName: '',
      baseInfo: '',
      cancelEventDialog: false,
      eventStatu: 0,
      isDraft: '', // 是否为草稿；1是，0不是
      //取消会议
      cancelReason: '',
      isShowCancelBtn: false // 是否展示取消会议按钮
      // statusName:'',//状态名称，线下结算需要
    }
  },
  components: {
    stepOne,
    stepTwo,
    stepThree,
    stepFour
  },
  created() {
    console.log(this.$route.query.id)
    this.eventId = this.$route.query.id
  },
  mounted() {
    // window.scrollTo(0, 0);
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this.eventId = this.$route.query.id
    this.eventName = this.$route.query.name
    this.getDetail()
    this.cancelShow()
    console.log(this.$route.query.id)
  },
  methods: {
    // 是否展示  取消会议按钮
    cancelShow() {
      this.requestApi({
        url: '/MeetingMa/CancelShow',
        method: 'post',
        data: { ID: this.$route.query.id, Type: 1 }
      }).then(res => {
        this.isShowCancelBtn = res
      })
    },
    // getDetail
    getDetail() {
      // 获取会议基本信息
      this.requestApi({
        url: '/MeetingMa/GetMeetingList',
        method: 'post',
        data: { MeetingID: this.eventId }
      }).then(res => {
        this.$refs.baseInfo.baseInfo = res
        this.isDraft = res.event_status // 会议是否为草稿状态，1为草稿
        this.eventId = res.id
        this.eventName = res.event_name
      })
      // 获取会议进度状态
      this.requestApi({
        url: '/MeetingMa/MeetingStatus',
        method: 'post',
        data: { MeetingID: this.eventId }
      }).then(res => {
        this.eventStatu = Number(res)
        console.log(res)
      })

      // 获取采购需求信息
      this.requestApi({
        url: '/MeetingMa/GetPurchase',
        method: 'post',
        data: { MeetingID: this.eventId }
      }).then(res => {
        this.$refs.demandInfo.demandInfo = res
      })
      //会议服务商询价单
      this.requestApi({
        url: '/MeetingMa/GetServiceProvider',
        method: 'post',
        data: { MeetingID: this.eventId }
      }).then(res => {
        // debugger
        console.log(res)
        this.$refs.demandInfo.inquiryLIst = res
      })
      // 纳税人工商信息
      this.requestApi({
        url: '/outapi/resources/completeCreditCode',
        method: 'post',
        data: {}
      }).then(res => {
        this.$refs.demandInfo.commerce = res
      })
    },
    // 取消会议
    cancelEventTap() {
      if (!this.cancelReason) {
        this.$message.warning('请简要说明取消原因')
        return
      }
      this.requestApi({
        url: '/MeetingMa/CancelMeeting',
        method: 'post',
        data: { MeetingID: this.$route.query.id, Content: this.cancelReason }
      }).then(res => {
        if (res) {
          this.cancelEventDialog = false
          this.$message.success('会议取消成功！')
          setTimeout(() => {
            this.$router.replace({ name: 'eventList' })
          }, 100)
        }
      })
    },
    handleCommand(command) {
      if (command == 1) {
        // 高级设置
        this.$router.push({
          name: 'advancedsetting',
          // path: "/advancedsetting",
          query: { id: this.eventId, eventName: this.eventName }
        })
      } else if (command == 2) {
        // 取消会议
        this.cancelEventDialog = true
      }
    }
  }
}
</script>

<style lang="scss">
.event_detail {
  .event_process {
    border-bottom: 1px solid #e7e7e7;
    .event_process_title {
    }
  }
  .step_title {
    width: 100%;
    height: 33px;
    // background: url(require('@/assets/images/sprite.png')) -234px -141px no-repeat;
    strong {
      float: left;
      width: 80px;
      text-align: center;
      height: 33px;
      line-height: 33px;
      color: #fff;
      font-size: 16px;
      font-style: italic;
      font-family: 'Microsoft Yahei';
    }
    span {
      float: left;
      width: 180px;
      text-align: center;
      height: 33px;
      line-height: 33px;
      font-weight: 600;
      font-size: 18px;
      color: #626e95;
      em {
        font-size: 12px;
        margin-left: 5px;
        color: #626e95;
      }
    }
  }
  .stepName {
    height: 33px;
    strong {
      float: left;
      width: 80px;
      text-align: center;
      height: 33px;
      line-height: 33px;
      color: #fff;
      border: 1px solid #626e95;
      background: #626e95;
      font-size: 16px;
      font-style: italic;
      font-family: 'Microsoft Yahei';
    }
    span {
      float: left;
      padding-left: 10px;
      text-align: center;
      height: 33px;
      line-height: 33px;
      font-weight: 600;
      font-size: 18px;
      color: #626e95;
      border: 1px solid #626e95;
      em {
        font-size: 12px;
        margin-left: 5px;
        color: #626e95;
      }
    }
  }
  .edit_base_tap {
    cursor: pointer;
  }
  .base_title {
    font-size: 16px;
    color: #2896eb;
    font-weight: 600;
    cursor: pointer;
    em {
      font-size: 12px;
      margin-left: 5px;
      color: #2896eb;
    }
  }
  .base_time {
    color: #777;
    font-weight: 100;
    font-size: 14px;
  }
  .showBase_tap {
    color: #fd864b;
    cursor: pointer;
    user-select: none;
    span {
      padding-left: 5px;
    }
    img {
      width: 15px;
      height: 15px;
      margin-left: 10px;
    }
  }
  .add_po {
    width: 176px;
    height: 48px;
  }
  .processing {
    color: #000 !important;
    font-weight: bold !important;
    ::deep .el-step__title .is-wait {
      color: #000 !important;
    }
  }
}
</style>
