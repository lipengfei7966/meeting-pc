<template>
  <div class="service">
    <div class="service_part flex_row">
      <div class="flex_1 pad_tb10_lr20 bd_t bd_b bd_r flex_row align_center" @click="showPart = !showPart">
        <img class="is_show_img pad_r5" :src="showPart ? require('@/assets/images/open_1.png') : require('@/assets/images/close_1.png')" alt="">
        <span class="quotation_demand_part">服务费</span>
      </div>
      <h3 class="flex_2 pad_tb10_lr20 bd_t bd_b t_orange">￥{{positiveFloat(serviceList.serviceCharge).toFixed(2)}}</h3>
    </div>
    <div v-show="showPart">
      <!-- <div class="flex_row car_date bd_b">
        <div class="bd_r flex_1 pad_tb10_lr20 flex_column">
          <span>酒店内费用（该会议关联酒店订单垫付）</span>
          <span>酒店内费用（旅行社代付）</span>
          <span>酒店外费用</span>
        </div>
        <div class="flex_2 pad_tb10_lr20 flex_row justify_between">
          <div class="flex_column">
            <span>￥ {{serviceList.advance_amount}} * {{serviceList.advance_proportion}} %  </span>
            <span>￥ {{serviceList.hotel_price}} * {{serviceList.travelagency_payment_proportion}} %  </span>
            <span>￥ {{serviceList.off_hotel_expenses}} * {{serviceList.off_hotel_proportion}} %  </span>
          </div>
          <div class="flex_column">
            <span>￥ {{serviceList.amount}} </span>
            <span>￥ {{serviceList.travel}} </span>
            <span>￥ {{serviceList.off_hotel_expenses * serviceList.off_hotel_proportion /100 }} </span>
          </div>
        </div>
      </div> -->

      <div class="flex_row car_date bd_b">
        <div class="bd_r flex_1 pad_tb10_lr20 flex_column">
          <span>服务费</span>
        </div>
        <div class="flex_2 pad_tb10_lr20 ">
          <div v-for="(item,index) in serviceList.serviceData" :key="index" class="flex_row justify_between">
            <span>{{item.name}}</span>
            <span>{{item.value}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { positiveFloat, keepDecimals} from '@/utils/common';
  export default {
    name: "service",
    props: ['serviceList'],
    data() {
      return{
        showPart: true,
      }
    },
    methods:{
      positiveFloat,
      keepDecimals
    }
  }
</script>

<style lang="scss" scoped>
.service_part {
  .is_show_img {
    width: 16px;
    height: 16px;
  }
}
</style>
