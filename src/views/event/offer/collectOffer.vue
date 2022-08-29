<template>
  <div>
    <div class="main">
      <ul>
        <el-button type="text" @click="$router.replace({path:'/EventList'})">我的会议</el-button>
        <li style="color:#7c7f82;">></li>
        <el-button type="text" @click="$router.go(-1)">会议详情</el-button>
        <!-- <li v-if="prev" style="color:#7c7f82;">></li> -->
        <!-- <el-button type="text" v-if="prev" @click="$router.go(-1)">{{prev}}</el-button> -->
        <!--				<el-button type="text" v-if="prev === '询价单详情'" @click="$router.go(-1)">询价单详情</el-button>-->
        <li style="color:#7c7f82;">></li>
        <li style="color:#7c7f82;">汇总报价单详情</li>
      </ul>
    </div>
    <!-- 会议基本信息 -->
    <base-part :source="'bid'"></base-part>
    <div class="service quotation bd_r bd_l">
      <table class="hotel_info" width="100%" cellspacing="0" cellpadding="0">
        <tr class="bg_pink">
          <td class="bd_r">需求</td>
          <td>
            <div class="flex_column" style="text-align:left">
              <span>总报价：<h2 class="dis_block t_orange">￥{{positiveFloat(hotelInfo.total_taxation_price, true)}}</h2></span>
              <span>税前：<h2 class="dis_block t_orange">￥{{positiveFloat(hotelInfo.total_service_price, true)}}</h2></span>
              <span>净价：<h2 class="dis_block t_orange">￥{{positiveFloat(hotelInfo.total_price, true)}}</h2></span>
            </div>
          </td>
        </tr>
        <tr>
          <td class="bd_r">采购酒店</td>
          <td>
            {{hotelInfo.hotel_name?hotelInfo.hotel_name:'未选择采购酒店'}}
            <el-checkbox v-model="hotelInfo.isuser_preferred_hotel" :true-label="1" :false-label="0" style="line-height:30px;margin-left:20px">是否使用首选酒店</el-checkbox>
          </td>

        </tr>
      </table>
      <roomPart v-if="roomList.length" :roomList="roomList" :additional="additional" :hotelInfo="hotelInfo" :isCollectOffer='true' ref="room"></roomPart>
      <eventPart v-if="eventList.length" :eventList="eventList" :additional="additional" :hotelInfo="hotelInfo" :isCollectOffer='true' ref="event"></eventPart>
      <carPart v-if="carList.length" :carList="carList" :additional="additional" :hotelInfo="hotelInfo" ref="car"></carPart>
      <foodPart v-if="foodList.length" :foodList="foodList" :additional="additional" :hotelInfo="hotelInfo" ref="food"></foodPart>
      <foodOutsidePart v-if="foodOutsideList.length" :foodOutsideList="foodOutsideList" :additional="additional" :hotelInfo="hotelInfo" ref="foodOutside"></foodOutsidePart>
      <transportPart v-if="transportList.length" :transportList="transportList" :additional="additional" :hotelInfo="hotelInfo" ref="transport"></transportPart>
      <otherPart v-if="otherList.length" :otherList="otherList" :additional="additional" :hotelInfo="hotelInfo" ref="other"></otherPart>
      <servicePart v-if="additional.serviceData.length" :serviceList="additional" ref="service"></servicePart>
      <taxPart v-if="additional.taxationData.length" :taxList="additional" ref="tax"></taxPart>
    </div>

  </div>
</template>

<script>
import BasePart from '@/components/basePart_2'
import carPart from './components/car'
import roomPart from './components/room'
import eventPart from './components/event'
import foodPart from './components/food'
import foodOutsidePart from './components/foodOutside'
import transportPart from './components/transport'
import otherPart from './components/other'
import servicePart from './components/service'
import taxPart from './components/tax'
import {classifyByTime, EventClassifyByTime} from './../../assets/js/validator'
import { positiveFloat, keepDecimals} from '@/utils/common';
export default {
	data() {
		return {
      hotelInfo: {
				hotel_name: '',
				total_price: 0,
				total_service_price: 0,
				total_taxation_price: 0
			}, // 酒店信息
			
      baseInfo:{},
      carList: [],
      roomList: [],
      foodList: [],
      foodOutsideList: [],
      eventList: [],
      otherList: [],
      transportList: [],
      additional: {},
      taxList: {},
      serviceList: {},
      type: 1
    }
	},
	components:{
		BasePart,
		carPart,
		roomPart,
		eventPart,
		foodPart,
		foodOutsidePart,
		transportPart,
		otherPart,
		servicePart,
		taxPart,
	},
	watch:{
    $route(n,o){
			// debugger
			if(n.fullPath !== o.fullPath){ //监听路由参数是否变化
				// this.Service();
				// this.quote();
				this.SummaryAllQuotedPrice();  //methods中封装的加载数据函数
      }
    }
	},
	mounted() {
		this.SummaryAllQuotedPrice();
	},
	methods: {
		keepDecimals,
		positiveFloat,
		// 线上报价单信息查询
	  SummaryAllQuotedPrice(){
      this.requestApi({
        url: '/MeetingMa/SummaryAllQuotedPrice',
        method: 'POST',
        data: { 
          MeetingID: this.$route.query.id
        },
      }).then((res)=>{
				if (res) {
					this.$nextTick(() => {
						this.hotelInfo = res.service; //服务商、酒店信息
						this.roomList = classifyByTime(res.room); //客房
						// this.eventList = EventClassifyByTime(res.conference); //会场信息
						this.eventList = res.conference; //会场信息
						this.carList = classifyByTime(res.car, 'datatime');	// 地面交通
						this.foodList = classifyByTime(res.food);	//餐饮信息
						this.foodOutsideList = classifyByTime(res.foodOutside);	//餐饮信息
						this.otherList = res.other?res.other:[]; //其他 兼容后台没数据返回 null
						this.additional = res.quoted_price;	// 报价单信息
						this.transportList = classifyByTime(res.transportation, 'datatime');	//大交通
						this.quotation = res.quotedprice; //报价记录
					})
				}
			})
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
.quotation {
  /*border-left: 1px solid #e4e4e4;border-right: 1px solid #e4e4e4;*/
  margin-bottom: 50px;
  table {
  }
  .hotel_info {
    tr {
      display: flex;
      border-bottom: 1px solid #e4e4e4;
      td:nth-child(1) {
        flex: 1;
      }
      td:nth-child(2) {
        flex: 2;
      }
      td {
        padding: 10px 20px;
        box-sizing: border-box;
      }
    }
  }
}
.service {
  width: 1100px;
  background: #ffffff;
  margin: auto;
  margin-top: 18px;
  margin-bottom: 10px;
}

@media only screen and (max-width: 1350px) {
  .main {
    width: 100%;
  }
  .service {
    width: 100%;
  }
}
</style>

