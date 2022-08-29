<template>
  <div class="content service_detail">
    <!-- title -->
    <div class="path">
      <el-button type="text" @click="$router.replace({path:'/EventList'})">我的会议</el-button>
      <span style="color:#7c7f82;">></span>
      <el-button type="text" @click="$router.go(-1)">会议详情</el-button>
      <span v-if="prev" style="color:#7c7f82;">></span>
      <el-button type="text" v-if="prev" @click="$router.go(-1)">{{prev}}</el-button>
      <span style="color:#7c7f82;">></span>
      <span style="color:#7c7f82;">询价单详情</span>
    </div>
    <!--  询价单号 -->
    <div class="demand">
      <div class="blue_title flex_row justify_between">
        <div class="title">
          <i class="ico unknown"><img :src="require('@/assets/images/doubt.png')" style="width: 30px; height: 30px" /></i>
          询价单号： {{inquiry_sheet.inquiry_sheet_code}}
          <em>（{{inquiry_sheet.end_time}}）</em>
        </div>
        <div class="t_fff pad_t5">
          <el-button v-if="isShowCancelBtn" type="text" @click="cancelDialog = true" class="t_fff">取消询价单</el-button>
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
      </div>
      <div class="order_cancel_notice" v-if="cancelInfo.content">
        <h3 class="title">询价单状态：<strong>已取消</strong></h3>
        <div class="cancel_detail">
          <span>取消人：{{cancelInfo.cancel_people}}</span>
          <span>时间：{{cancelInfo.cancel_time}}</span>
          <span>取消原因：{{cancelInfo.content}}</span>
        </div>
      </div>
      <!-- 会议基本信息 -->
      <!-- <MeetingInformation /> -->
      <BasePart class="bd"></BasePart>
      <!-- 服务商列表 -->
      <ProviderList class="bd" />
      <!-- 添加内部备注 -->
      <AddInternalNotes :provideName="provideName" />
      <div class="title_solid"><i></i>已询价的采购需求</div>
      <!-- 客房需求 -->
      <RoomDemand :roomList="roomList" :room="room" />
      <!-- 会场需求 -->
      <VenueDemand :conferenceBuild="conferenceBuild" :conference="conference" />
      <!-- 餐饮需求 -->
      <CateringDemand :food="food" />
      <!-- 酒店外餐饮 -->
      <FoodOutside v-if="foodOutside.length>0" :foodOutside="foodOutside" />
      <!-- 大交通 -->
      <IntercityTraffic v-if="Transportation.length > 0" :Transportation="Transportation" />
      <!-- 地面交通 -->
      <InCityCar v-if="InCityCarData.length>0" :InCityCarData="InCityCarData" />
      <!-- 其他服务 -->
      <OtherSever v-if="OtherSeverData.length >0" :OtherSeverData="OtherSeverData" />
      <!-- 旅行社代付 -->
      <TravelAgency :inquiry_sheet="inquiry_sheet" />
      <!-- 询价单补充信息 -->
      <Supplement :files="files" :isadjustdate="isadjustdate" />
      <!-- 报价截止日期 -->
      <QuotationDeadline :inquiry_sheet="inquiry_sheet" />
      <!-- 其它需求信息或者注意事项 -->
      <MattersNeedingAttention :other="other" />
    </div>
    <!--取消询价单-->
    <el-dialog title="取消询价单" width="500px" :visible.sync="cancelDialog">
      <el-input type="textarea" :rows="6" placeholder="请简要说明取消原因(必填)" v-model="content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelDialog = false">暂不取消</el-button>
        <el-button size="small" style="margin-left:10px" type="primary" @click="cancelTap">确认取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MeetingInformation from './Information/meetinginformation.vue';
import ProviderList from './Information/providerList.vue';
import AddInternalNotes from './Information/addinternalnotes.vue';
import RoomDemand from './Information/roomdemand.vue';
import VenueDemand from './Information/venuedemand.vue';
import CateringDemand from './Information/cateringdemand.vue';
import FoodOutside from './Information/foodOutside.vue'
import IntercityTraffic from './Information/intercitytraffic.vue';
import InCityCar from './Information/inCityCar.vue';
import OtherSever from './Information/otherSever.vue';

import TravelAgency from './Information/travelagency.vue';
import Supplement from './Information/supplement.vue';
import QuotationDeadline from './Information/quotationdeadline.vue';
import MattersNeedingAttention from './Information/mattersneedingattention.vue';
import BasePart from '@/components/event/basePart_2.vue'
import {needDataifyBydate} from '@/assets/js/validator'

// import Bus from './bus'
export default {
  components: {
    MeetingInformation,
    ProviderList,
    AddInternalNotes,
    RoomDemand,
    VenueDemand,
    CateringDemand,
    FoodOutside,
    IntercityTraffic,
    InCityCar,
    OtherSever,
    TravelAgency,
    Supplement,
    QuotationDeadline,
    MattersNeedingAttention,
    BasePart
  },
  data() {
    return {
      prev:'',
      provideName: [],
      provideId: [],
      roomList: [],//客房需求
      room: [],//kefangxiangqing
      conferenceBuild: [],//huichangxuqiu
      Transportation: [],//chengjijiaotong
      InCityCarData: [], //市内交通
      OtherSeverData: [], // 其他服务
      conference: [],
      food: [],
      foodOutside:[], // 酒店外餐饮
      other: [],
      Service: [],
      files:[], // 补充信息附件列表
      isadjustdate: '', // 补充信息 日期是否可调整
      content: '',// 取消询价单原因
      cancelDialog: false, // 取消询价单弹框
      inquiry_sheet: {}, // 报价单基本信息
      cancelInfo: {}, // 取消信息
      isShowCancelBtn:false,// 是否展示取消会议按钮
	  cancelSuccess: false, //询价单取消成功后的弹框显示、隐藏
	  num:0,//预算填报次数
    };
  },
  mounted() {
    this.getServiceProvider();
    // this.ServiceHotelList();
    this.getInquirySheet();
    this.cancelShow();
    this.GetCancel();
	this.budget()
    this.prev = this.$route.query.prev;
  },
  methods: {
	  budget() {
      this.requestApi({
        url: '/Quotation/FillinBuget',
        method: 'post',
        data: { eventinfoid: this.$route.query.id },
      }).then(res => {
        if (res[0] && res[0].budget_count) this.num = res[0].budget_count;
      });
	  },
	//更新预算
	updateBudget(){
		sessionStorage.setItem('budgetKey',true)//存入键值，true为打开填报预算弹框
		this.$router.go(-1);
	},
	//不更新预算
	notUpdate(){
		this.cancelSuccess=false
		//取消之后刷新页面,开发时间短，暂时为更新接口
		this.getServiceProvider();
		// this.ServiceHotelList();
		this.getInquirySheet();
		this.cancelShow();
		this.GetCancel();
	},
    // 取消询价单  按钮展示
    cancelShow(){
      this.requestApi({
        url: '/MeetingMa/CancelShow',
        method: 'post',
        data: {
          ID: this.$route.query.sheetId,
          Type: 2 //1会议，2询价单,3订单
        },
      }).then(res => {
        this.isShowCancelBtn = res;
      })
    },
    // 取消询价单
    cancelTap() {
      if(this.content){
        this.requestApi({
          url: '/MeetingMa/CancelInquirySheet',
          method: 'post',
          data: {
            InquirySheetID: this.$route.query.sheetId,
            Content: this.content
          },
        }).then(res => {
          if(res){
            this.cancelDialog = false;
            this.$message.success("取消成功");
            if(this.num>0 && this.inquiry_sheet.type==1){//this.inquiry_sheet.type 1中标
              this.cancelSuccess=true
            }else{
              //取消之后刷新页面,开发时间短，暂时为更新接口
              this.getServiceProvider();
              // this.ServiceHotelList();
              this.getInquirySheet();
              this.cancelShow();
              this.GetCancel();
            }
            // this.$router.go(-1);
          }
        })
      }else {
        this.$message.warning('请填写取消原因')
      }
    },
    // 查询取消信息
    GetCancel() {
      this.requestApi({
        url: '/MeetingMa/GetCancel',
        method: 'post',
        data: {
          ID: this.$route.query.sheetId
        },
      }).then(res => {
        this.cancelInfo = res
        console.log(this.inquiry_sheet)
      })
    },
    //会议服务商询价单
    getServiceProvider() {
      this.requestApi({
        url: '/MeetingMa/GetServiceProvider',
        method: 'post',
        data: {
          MeetingID: this.$route.query.id,
        },
      }).then((res) => {
          this.provideName = res.service[0];

        });
    },
    ServiceHotelList() {
      this.requestApi({
        url: '/MeetingMa/ServiceHotelList',
        method: 'post',
        data: {
          InquirySheetID: this.$route.query.sheetId,
        },
      }).then((res) => {
          this.provideId = res;
        });
    },
    // 询价单详情查询
    getInquirySheet() {
      this.requestApi({
        url: '/MeetingMa/GetInquirySheet',
        method: 'post',
        data: {
          InquirySheetID: this.$route.query.sheetId,
        },
      }).then((res) => {
          this.roomList=res.room || [];
          this.inquiry_sheet = res.inquiry_sheet;
          this.room = needDataifyBydate(res.roomList)
          this.conferenceBuild=res.conferenceBuild
          this.conference=res.conference
          this.Transportation=res.transportation || []
          this.InCityCarData = res.car || [];
          this.food=res.food;
          this.foodOutside = res.foodOutside || [];
          this.other=res.inquiry_sheet.other;
          this.OtherSeverData = res.other || [];
          this.files = res.file;
          this.isadjustdate = res.inquiry_sheet.isadjustdate
        });
    },
  }
};
</script>

<style lang="scss">
.service_detail {
  width: 1100px;
  margin: 0 auto;
  margin-top: 20px;
  .path {
    font-size: 14px;
    color: #7c7f82;
    line-height: 20px;
    margin: 0 0 30px 0;
    font-family: 'Microsoft Yahei';
  }

  .demand {
    padding: 0 0 40px 0;
  }
  .blue_title {
    background: #626e95;
    height: 44px;
    border-radius: 2px;
    padding: 0 20px;
    // margin: 0 0 15px 0;
  }

  .blue_title .title {
    float: left;
    font-size: 18px;
    line-height: 44px;
    color: #fff;
  }

  .blue_title .title_link {
    float: right;
    padding: 12px 0;
  }

  .blue_title .title .unknown {
    font-size: 24px;
    vertical-align: top;
    margin: 0 5px 0 0;
    line-height: 60px;
    height: 50px;
  }

  .ico {
    font-family: 'biz';
  }

  .blue_title .title em {
    font-size: 14px;
    margin: 0 0 0 10px;
    opacity: 0.8;
  }

  .title_solid {
    margin: 30px 0 0 0;
    font-size: 18px;
    color: #282828;
    line-height: 18px;
  }

  .title_solid i {
    display: inline-block;
    width: 6px;
    height: 18px;
    background: #2896eb;
    vertical-align: middle;
    margin: 0 10px 0 0;
  }
  .order_cancel_notice {
    margin: 0 0 20px 0;
    padding: 20px 30px;
    text-align: center;
    border-radius: 2px;
    border: 1px solid #aedcfa;
    background: #e2f3fe;
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
}
@media only screen and (max-width: 1270px) {
  .service_detail {
    width: 100%;
  }
}
</style>
