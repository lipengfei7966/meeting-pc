<template>
  <div class="event">
    <div class="event_part flex_row">
      <div class="flex_1 pad_tb10_lr20 bd_t bd_b bd_r flex_row align_center" @click="showPart = !showPart">
        <img class="is_show_img pad_r5" :src="showPart ? require('@/assets/images/open_1.png') : require('@/assets/images/close_1.png')" alt="">
        <span class="quotation_demand_part">会场总价</span>
      </div>
      <div class="flex_2 pad_tb10_lr20 bd_t bd_b">
        <h3 class="t_orange">￥{{positiveFloat(additional.conference)}}</h3>
        <!-- <h3 v-if="isCollectOffer" class="t_orange">￥{{offlineEventTotalMoney}}</h3> -->
        <span v-if="hotelInfo.service_hotel == 0">{{hotelInfo.conferencename}}</span>
      </div>

    </div>

    <div v-show="showPart">
      <!-- 线上报价 -->
      <div v-if="!isCollectOffer">
        <div v-for="item in eventList">
          <div class="flex_row car_date bg_fa bd_b">
            <div class="bd_r flex_1 pad_tb10_lr20">{{item.time}} 会场价格</div>
            <div class="flex_2 pad_tb10_lr20"> ￥{{positiveFloat(item.totalPrice)}}</div>
          </div>
          <div class="car_date_type" v-for="eventItem in item.data">
            <div v-if="eventItem.build" class="car_date_type_item flex_row align_center bd_b">
              <div class="left flex_column flex_1 pad_tb10_lr20 bd_r">
                <span>{{eventItem.build.name}}</span>
                <span>搭建时间： {{eventItem.build.starttime}} ~{{eventItem.build.endtime}}</span>
                <span v-if="eventItem.build.describe">搭建需求备注： {{eventItem.build.describe}}</span>
              </div>
              <div class="flex_2 pad_tb10_lr20">
                <div class="right flex_row justify_between">
                  <span>
                    <span v-if="eventItem.build.comments">备注：{{eventItem.build.comments}}</span>
                  </span>

                  <span>￥ {{positiveFloat(eventItem.build.price)}}</span>
                </div>
              </div>
            </div>
            <div v-if="eventItem.rentalCosts" class="car_date_type_item flex_row align_center bd_b">
              <div class="left flex_column flex_1 pad_tb10_lr20 bd_r">
                <span>{{eventItem.rentalCosts.name}}</span>
                <span>时间：{{eventItem.rentalCosts.starttime}}-{{eventItem.rentalCosts.endtime}}</span>
                <span>台型：{{eventItem.rentalCosts.roomsetuptype}}</span>
                <span>人数：{{eventItem.rentalCosts.attendees}}</span>
                <span>面积：
                  {{eventItem.rentalCosts.min_area}}
                  <span v-show="eventItem.rentalCosts.min_area&&eventItem.rentalCosts.max_area">~</span>
                  {{eventItem.rentalCosts.max_area}}</span>
              </div>
              <div class="flex_2 pad_tb10_lr20">
                <div class="right flex_row justify_between">
                  <span>
                    <span v-show="eventItem.rentalCosts.comments">报价备注：{{eventItem.rentalCosts.comments}}</span>
                  </span>

                  <span>￥ {{positiveFloat(eventItem.rentalCosts.price)}}</span>
                </div>
              </div>
            </div>
            <div v-if="eventItem.equipment">
              <div v-for="(equipmentItem, equipmentIndex) in eventItem.equipment" :key="equipmentIndex" class="car_date_type_item flex_row align_center bd_b">

                <div v-if="equipmentItem.quoted_type == 4" class="left flex_column flex_1 pad_tb10_lr20 bd_r">
                  <span>{{equipmentItem.equipmentname}}</span>
                  <span>{{equipmentItem.quoted_name}}</span>
                </div>
                <div v-else class="left flex_column flex_1 pad_tb10_lr20 bd_r">
                  <span>{{equipmentItem.equipmentname}}</span>
                  <span>{{equipmentItem.equipment}}</span>
                  <span v-if="equipmentItem.wiremicrophonecount">有线麦克风：{{eventItem.equipment.wiremicrophonecount}}</span>
                  <span v-if="equipmentItem.wirelessmicrophonecount">无线麦克风：{{eventItem.equipment.wirelessmicrophonecount}}</span>
                  <span>设备需求备注：{{equipmentItem.microphonedescribe}}</span>
                </div>

                <div class="flex_2 pad_tb10_lr20">
                  <div class="right flex_row justify_between">
                    <span>报价备注：{{equipmentItem.comments}}</span>
                    <span>￥ {{positiveFloat(equipmentItem.price)}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 线下报价 -->
      <div v-if="isCollectOffer">
        <div v-for="item in eventList">
          <div class="flex_row car_date bg_fa bd_b">
            <div class="bd_r flex_1 pad_tb10_lr20">{{item.time}} 会场价格</div>
            <div class="flex_2 pad_tb10_lr20"> ￥{{getDateTotal(item)}}</div>
          </div>
          <div class="car_date_type">
            <div v-for="eventItem in item.build" class="car_date_type_item flex_row align_center bd_b">
              <div class="left flex_column flex_1 pad_tb10_lr20 bd_r">
                <span>{{eventItem.name}}</span>
                <span>搭建时间： {{eventItem.starttime}} ~{{eventItem.endtime}}</span>
                <span v-if="eventItem.describe">搭建需求备注： {{eventItem.describe}}</span>
              </div>
              <div class="flex_2 pad_tb10_lr20">
                <div class="right flex_row justify_between">
                  <span>
                    <span v-if="eventItem.comments">报价备注：{{eventItem.comments}}</span>
                  </span>

                  <span>￥ {{positiveFloat(eventItem.price)}}</span>
                </div>
              </div>
            </div>
            <div v-for="eventItem in item.rentalCosts" class="car_date_type_item flex_row align_center bd_b">
              <div class="left flex_column flex_1 pad_tb10_lr20 bd_r">
                <span>{{eventItem.name}}</span>
                <span>时间：{{eventItem.starttime}}-{{eventItem.endtime}}</span>
                <span>台型：{{eventItem.roomsetuptype}}</span>
                <span>人数：{{eventItem.attendees}}</span>
                <span>面积：
                  {{eventItem.min_area}}
                  <span v-show="eventItem.min_area&&eventItem.max_area">~</span>
                  {{eventItem.max_area}}</span>
              </div>
              <div class="flex_2 pad_tb10_lr20">
                <div class="right flex_row justify_between">
                  <span>
                    <span v-show="eventItem.comments">报价备注：{{eventItem.comments}}</span>
                  </span>

                  <span>￥ {{positiveFloat(eventItem.price)}}</span>
                </div>
              </div>
            </div>
            <div v-for="eventItem in item.equipment" class="car_date_type_item flex_row align_center bd_b">
              <div class="left flex_column flex_1 pad_tb10_lr20 bd_r">
                <span>{{eventItem.equipmentname}}</span>
                <span>{{eventItem.equipment}}</span>
                <span>设备需求备注：{{eventItem.microphonedescribe}}</span>
              </div>
              <div class="flex_2 pad_tb10_lr20">
                <div class="right flex_row justify_between">
                  <span>报价备注：{{eventItem.comments}}</span>
                  <span>￥ {{positiveFloat(eventItem.price)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex_row car_date bg_fa bd_b">
      <div class="bd_r flex_1 pad_tb10_lr20">会场报价总备注</div>
      <div class="flex_2 pad_tb10_lr20">{{additional.conference_remarks}}</div>
      <!-- <div v-if="isCollectOffer" class="flex_2 pad_tb10_lr20">{{allQuoteInfo.conference_remarks}}</div> -->
    </div>
  </div>
</template>

<script>
import { positiveFloat, } from '@/utils/common';
  export default {
    name: "event",
    props:['eventList', 'additional','isCollectOffer','allQuoteInfo',"hotelInfo"],
    data() {
      return{
        showPart: true,
        carList: [],
      }
    },
    computed:{
      getDateTotal: () => {
        return function(item){
          let money = 0;
          item.build.forEach(element => {
            money += element.price
          })
          item.equipment.forEach(element => {
            money += element.price
          })
          item.rentalCosts.forEach(element => {
            money += element.price
          })
          return this.positiveFloat(money)
        }
        
      },
    },
    methods:{
      positiveFloat
    }
  }
</script>

<style lang="scss" scoped>
.event_part {
  .is_show_img {
    width: 16px;
    height: 16px;
  }
}
</style>
