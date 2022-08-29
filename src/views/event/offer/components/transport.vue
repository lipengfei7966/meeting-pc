<template>
  <div class="transport">
    <div class="transport_part flex_row">
      <div class="flex_1 pad_tb10_lr20 bd_t bd_b bd_r flex_row align_center" @click="showPart = !showPart">
        <img class="is_show_img pad_r5" :src="showPart ? require('@/assets/images/open_1.png') : require('@/assets/images/close_1.png')" alt="">
        <span class="quotation_demand_part">大交通总价</span>
      </div>
      <div class="flex_2 pad_tb10_lr20 bd_t bd_b">
        <h3 class="t_orange">￥{{positiveFloat(additional.transportation)}}</h3>
        <span v-if="hotelInfo.service_hotel == 0">{{hotelInfo.transportationname}}</span>
      </div>
    </div>
    <div v-show="showPart">
      <div>
        <div v-for="(item,index) in transportList" :key="index">
          <div class="flex_row car_date bg_fa bd_b">
            <div class="bd_r flex_1 pad_tb10_lr20">{{item.time}} 大交通价格</div>
            <div class="flex_2 pad_tb10_lr20" v-html="getDateTotal(item).toFixed(2)"></div>
          </div>
          <div class="car_date_type">
            <div class="car_date_type_item flex_row align_center bd_b" v-for="dateItem in item.data">
              <div class="left flex_column flex_1 pad_tb10_lr20 bd_r">
                <span>{{dateItem.origincity}} - {{dateItem.destinationcity}} {{dateItem.transtype}} {{dateItem.seatclasses}} {{dateItem.specialprice}}</span>
                <span>搭乘人数：{{dateItem.passengercount}}人</span>
                <span>抵达时间：{{dateItem.arrivetime}}</span>
                <span>备注：{{dateItem.requirement}}</span>
              </div>
              <div class="flex_2 pad_tb10_lr20">
                <div class="right flex_row justify_between">
                  <span>{{dateItem.origincity}} - {{dateItem.destinationcity}} ￥{{positiveFloat(dateItem.unitprice)}} * {{dateItem.passengercount}}人</span>
                  <span>￥ {{ positiveFloat(dateItem.unitprice * dateItem.passengercount)}}</span>

                </div>
                <div>
                  <span>报价备注：{{dateItem.offerremarks}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex_row car_date bg_fa bd_b">
      <div class="bd_r flex_1 pad_tb10_lr20">大交通报价总备注 </div>
      <div class="flex_2 pad_tb10_lr20">{{additional.transportation_remarks}}</div>
    </div>
  </div>
</template>

<script>
import { positiveFloat, } from '@/utils/common';
  export default {
    name: "transport",
    props:['transportList', 'additional','allQuoteInfo',"hotelInfo"],
    data() {
      return{
        showPart: true,
      }
    },
    computed:{
      offlineTransportTotalMoney(){
        let money = 0;
        if(this.allQuoteInfo){
          this.allQuoteInfo.offline_quoted_price_transportation.forEach(element => {
          money += element.totalprice
        });
        }
        
        return money
      },
    },
    mounted(){
      console.log(this.transportList)
    }, 
    methods: {
      positiveFloat,
      getDateTotal(data) {
        return data.data.reduce((p, n) => {
          return p + n.unitprice * n.passengercount
        }, 0)
      }
    }
  }
</script>

<style lang="scss" scoped>
.transport_part {
  .is_show_img {
    width: 16px;
    height: 16px;
  }
}
</style>
