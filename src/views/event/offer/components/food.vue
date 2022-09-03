<template>
  <div class="food">
    <div class="food_part flex_row">
      <div class="flex_1 pad_tb10_lr20 bd_t bd_b bd_r flex_row align_center" @click="showPart = !showPart">
        <img class="is_show_img pad_r5" :src="showPart ? require('@/assets/images/open_1.png') : require('@/assets/images/close_1.png')" alt="">
        <span class="quotation_demand_part">酒店内餐饮总价</span>
      </div>
      <div class="flex_2 pad_tb10_lr20 bd_t bd_b">
        <h3 class="t_orange">￥{{positiveFloat(additional.food)}}</h3>
        <span v-if="hotelInfo.service_hotel == 0">{{hotelInfo.foodname}}</span>
      </div>
    </div>
    <div v-show="showPart">
      <!-- 线上报价 -->
      <div>
        <div v-for="(item, idx) in foodList" :key="idx">
          <div class="flex_row car_date bg_fa bd_b">
            <div class="bd_r flex_1 pad_tb10_lr20">{{item.time}} 餐饮价格</div>
            <div class="flex_2 pad_tb10_lr20" v-html="getDateTotal(item)"></div>
          </div>
          <div class="car_date_type">
            <div class="car_date_type_item flex_row align_center bd_b">
              <div class="left flex_column flex_1 pad_tb10_lr20 bd_r">
                <span>{{item.time}}</span>
                <div class="flex_column" v-for="(foodItem, index) in item.data" :key="index">
                  <span>{{foodItem.foodtype}} <em v-if="foodItem.addresstype">[{{foodItem.addresstype}}]</em> {{foodItem.personcount}}人</span>
                </div>
                <span v-if="item.comments">需求备注：{{item.comments}}</span>
              </div>
              <div class="flex_2 pad_tb10_lr20">
                <div class="flex_column pad_t30">
                  <div class="right flex_row justify_between" v-for="(foodItem, index) in item.data" :key="index">
                    <div>
                      <p>{{foodItem.foodtype}} ￥{{positiveFloat(foodItem.price)}} * {{foodItem.personcount}}人</p>
                      <p v-if="foodItem.offer_remarks">报价备注：{{foodItem.offer_remarks}}</p>
                    </div>
                    <span>￥ {{positiveFloat(foodItem.total_price)}}</span>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="flex_row car_date bg_fa bd_b">
      <div class="bd_r flex_1 pad_tb10_lr20">餐饮报价总备注</div>
      <div class="flex_2 pad_tb10_lr20">{{additional.food_remarks}}</div>
    </div>
  </div>
</template>

<script>
import { positiveFloat } from '@/utils/common'
export default {
  name: 'food',
  props: ['foodList', 'additional', 'isCollectOffer', 'allQuoteInfo', 'hotelInfo'],
  data() {
    return {
      showPart: true
    }
  },
  computed: {
    offlineFoodTotalMoney() {
      let money = 0
      this.allQuoteInfo.offline_quoted_price_hotel_food.forEach(element => {
        money += element.totalprice
      })
      return money
    }
  },
  methods: {
    positiveFloat,
    getDateTotal(data) {
      // debugger
      return data.data
        .reduce((p, n) => {
          return p + n.total_price
        }, 0)
        .toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.food_part {
  .is_show_img {
    width: 16px;
    height: 16px;
  }
}
</style>
