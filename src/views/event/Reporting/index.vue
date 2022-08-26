<template>
  <div class="header">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <!-- <el-tab-pane label="酒店询价单统计" name="first"><HotelInquirySheet /></el-tab-pane> -->
      <el-tab-pane label="酒店费用分析" name="second"><HotelExpenses /></el-tab-pane>
      <!-- <el-tab-pane label="酒店分析" name="third"><HotelAnalysis  /></el-tab-pane> -->
      <el-tab-pane label="会议服务商费用分析" name="third1"><ConferenceCosts /></el-tab-pane>
      <el-tab-pane label="业务费用统计" name="third2"><OperatingExpenses /></el-tab-pane>
      <!-- <el-tab-pane label="部门费用统计" name="third3"><PartialCost/></el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import ConferenceCosts from './navList/conferenceCosts.vue'; //会议服务商费用分析
import HotelAnalysis from './navList/hotelAnalysis.vue'; //酒店分析
import HotelExpenses from './navList/hotelExpenses.vue'; //酒店费用分析
import HotelInquirySheet from './navList/hotelInquirySheet.vue'; //酒店询价单统计
import OperatingExpenses from './navList/operatingExpenses.vue'; //业务费用统计
// import PartialCost from './navList/partialCost.vue'; //部门费用统计
export default {
  components: {
    ConferenceCosts,
    HotelAnalysis,
    HotelExpenses,
    HotelInquirySheet,
    OperatingExpenses,
    // PartialCost,
  },
  data() {
    return {
      activeName: 'second',
      // picList:{},
      // city: [],
      // rfqQtyList: [],
      // meetinglist: []
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      // switch (tab.name) {
      //   case 'first':
      //     console.log('first');
      //     this.getDataOverview();
      //     this.rfqQty();
      //     this.MeetingLeader();
      //     this.seeting()
      //     break;
      // }
      // console.log(tab.name, '=======');
      // console.log(tab, event);
    },
    // getDataOverview() {
    //   this.$api.getDataOverview({}, 'GET').then((res) => {
    //     console.log(res, '======');
    //     this.picList = res;
    //   });
    // },
    // //会议负责人统计
    // MeetingLeader() {
    //   this.$api
    //     .MeetingLeader(
    //       {
    //         TimeType: '1',
    //         BeginYear: '2010',
    //         BeginMonth: '2',
    //         EndYear: '2021',
    //         EndMonth: '9',
    //         EventType: '', //会议类型
    //         mountOrQuantity: this.typenum == '金额' ? 0 : 1, //按金额或者数量
    //       },
    //       'GET'
    //     )
    //     .then((res) => {
    //       console.log(res, '2132121');
    //       this.city = res;
    //     });
    // },
    // //  询价单数量统计
    // // 有数据了  但是还没写逻辑
    // rfqQty() {
    //   this.$api
    //     .rfqQty(
    //       {
    //         // TimeType: this.tjtime, //提交询价单时间
    //         TimeType: 1, //提交询价单时间
    //         BeginYear: this.dateYears, //开始年份
    //         BeginMonth: this.dateMonth, //开始月份
    //         EndYear: this.endYears, //结束年份
    //         EndMonth: this.endMonth, //结束月份
    //         EventType: '', //会议类型
    //         SubmitUser: '', //提交人
    //       },
    //       'GET'
    //     )
    //     .then((res) => {
    //       console.log(res, 'rfqQtyListrfqQtyList');
    //       this.rfqQtyList = res  || [];
    //     });
    // },
    // //会议类型及部门

    // seeting() {
    //   this.$api
    //     .meetingType(
    //       {
    //         // TimeType: 0, //提交询价单时间
    //         TimeType: 1, //提交询价单时间
    //         BeginYear: this.dateYears, //开始年份
    //         BeginMonth: this.dateMonth, //开始月份
    //         EndYear: this.endYears, //结束年份
    //         EndMonth: this.endMonth, //结束月份
    //         EventType: '', //会议类型
    //         SubmitUser: '', //提交人
    //         AmountOrQuantity: 0,
    //       },
    //       'GET'
    //     )
    //     .then((res) => {
    //       console.log(res, '===111111');
    //       this.meetinglist = res || [];
    //       console.log(res, '1234567890p');
    //     });
    // },
  },
};
</script>
<style lang="scss" >
.header {
  width: 1344px;
  margin: 0 auto;
}

.header .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #454648;
}

.header
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:not(.is-disabled):hover {
  color: #fa9900;
}
.header .el-tabs__item {
  font-size: 16px;
  height: 55px;
  line-height: 55px;
}
.el-tabs__nav-scroll {
  background: #eaebeb;
}

@media only screen and (max-width: 1600px) {
	.header{
		width: 100%;
	}
	.report_info{
		width: 85% !important;
	}
	// .aaa{
	// 	width: 35vw !important;
	// }
	.menster{
		width: 70vw !important;
	}
}

</style>