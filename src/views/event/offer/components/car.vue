<template>
  <div class="car">
    <div class="car_part flex_row">
      <div class="flex_1 pad_tb10_lr20 bd_t bd_b bd_r flex_row align_center" @click="showPart = !showPart">
        <img class="is_show_img pad_r5" :src="showPart ? require('@/assets/images/open_1.png') : require('@/assets/images/close_1.png')" alt="">
        <span class="quotation_demand_part">地面交通总价</span>
      </div>
      <div class="flex_2 pad_tb10_lr20 bd_t bd_b">
        <h3 class="t_orange">￥{{positiveFloat(additional.car)}}</h3>
        <span v-if="hotelInfo.service_hotel == 0">{{hotelInfo.carname}}</span>
      </div>
    </div>
    <div v-show="showPart">
      <!-- 线上报价 -->
      <div>
        <div v-for="(item,index) in carList" :key="index">
          <div class="flex_row car_date bg_fa bd_b">
            <div class="bd_r flex_1 pad_tb10_lr20">{{item.time}} 用车价格</div>
            <div class="flex_2 pad_tb10_lr20" v-html="getDateTotal(item)"></div>
          </div>
          <div class="car_date_type">
            <div class="car_date_type_item flex_row align_center bd_b">
              <div class="left flex_column flex_1 pad_tb10_lr20 bd_r">
                <span>{{item.time}}</span>
                <div v-for="purposeItem in item.data" class="flex_column">
                  <span>用车目的：{{purposeItem.purpose}}</span>
                  <span>用车城市：{{purposeItem.city}}</span>
                  <span>搭乘人数：{{purposeItem.vehiclecount}}</span>
                  <span>{{purposeItem.vehicletype}} {{purposeItem.carcount}}辆</span>
                  <span v-if="purposeItem.explain">需求备注：{{purposeItem.explain}}</span>
                </div>

              </div>
              <div class="flex_2 pad_tb10_lr20">
                <div class="right flex_row justify_between" v-for="purposeItem in item.data">
                  <span>
                    <p>￥{{positiveFloat(purposeItem.price)}} * {{purposeItem.carcount}}车</p>
                    <p v-if="purposeItem.offer_remarks">报价备注：{{purposeItem.offer_remarks}}</p>
                  </span>
                  <span>￥ {{ positiveFloat(purposeItem.price * purposeItem.carcount) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="flex_row car_date bg_fa bd_b">
      <div class="bd_r flex_1 pad_tb10_lr20">地面交通报价总备注 </div>
      <div class="flex_2 pad_tb10_lr20">{{additional.car_remarks}}</div>
    </div>
  </div>
</template>

<script>
import { positiveFloat } from '@/utils/common'
export default {
  name: 'car',
  props: ['carList', 'additional', 'isCollectOffer', 'allQuoteInfo', 'hotelInfo'],
  data() {
    return {
      showPart: true
    }
  },

  methods: {
    positiveFloat,
    getDateTotal(data) {
      return (
        '￥' +
        data.data
          .reduce((p, n) => {
            return p + n.price * n.carcount
          }, 0)
          .toFixed(2)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.car_part {
  .is_show_img {
    width: 16px;
    height: 16px;
  }
}
</style>
