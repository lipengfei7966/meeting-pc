<template>
  <div class="other">
    <div class="other_part flex_row">
      <div class="flex_1 pad_tb10_lr20 bd_t bd_b bd_r flex_row align_center" @click="showPart = !showPart">
        <img class="is_show_img pad_r5" :src="showPart ? require('@/assets/images/open_1.png') : require('@/assets/images/close_1.png')" alt="">
        <span class="quotation_demand_part">其他服务总价</span>
      </div>
      <div class="flex_2 pad_tb10_lr20 bd_t bd_b">
        <h3 class="t_orange">￥{{positiveFloat(additional.other)}}</h3>
        <span v-if="hotelInfo.service_hotel == 0">{{hotelInfo.othername}}</span>
      </div>
    </div>
    <div v-show="showPart">
      <div>
        <div class="car_date_type">
          <div class="car_date_type_item flex_row align_center bd_b" v-for="(item,index) in otherList" :key="index">
            <div class="left flex_column flex_1 pad_tb10_lr20 bd_r">
              <!-- <span>{{item.name}} <span v-if="item.participatecount">{{item.participatecount}}人</span>  <span v-if="item.servicedaycount">{{item.servicedaycount}}天</span></span> -->
              <span>{{item.name}} 数量<span v-if="item.participatecount">{{item.participatecount}}</span> </span>
              <span>需求备注：{{item.describe}}</span>
            </div>
            <div class="flex_2 pad_tb10_lr20">
              <div class="right flex_row justify_between">
                <div class="flex_column">
                  <!-- <span>￥{{item.price.toFixed(2)}} * {{item.daycount}}人 * {{item.servicecount}}天</span> -->
                  <span>￥{{positiveFloat(item.price)}} * {{item.daycount}}</span>
                  <span v-if="item.offer_remarks">报价备注：{{item.offer_remarks}}</span>
                </div>
                <span>￥ {{positiveFloat(item.price * item.daycount * item.servicecount)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="flex_row car_date bg_fa bd_b">
      <div class="bd_r flex_1 pad_tb10_lr20">其它报价总备注</div>
      <div class="flex_2 pad_tb10_lr20">{{additional.other_remarks}}</div>
    </div>

    <!-- <div class="flex_row car_date bd_b">
      <div class="bd_r flex_1 pad_tb10_lr20">有效期</div>
      <div class="flex_2 pad_tb10_lr20"></div>
    </div> -->
  </div>
</template>

<script>
import { positiveFloat } from '@/utils/common'
export default {
  name: 'other',
  props: ['otherList', 'additional', 'isCollectOffer', 'allQuoteInfo', 'hotelInfo'],
  data() {
    return {
      showPart: true
    }
  },
  computed: {
    offlineOthersTotalMoney() {
      let money = 0
      this.allQuoteInfo.offline_quoted_price_others.forEach(element => {
        money += element.price * element.offerparticipatecount * element.offerservicedaycount
      })
      return money
    }
  },
  methods: {
    positiveFloat
  }
}
</script>

<style lang="scss" scoped>
.other_part {
  .is_show_img {
    width: 16px;
    height: 16px;
  }
}
</style>
