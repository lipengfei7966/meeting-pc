<template>
  <div class="room">
    <div class="room_part flex_row">
      <div class="flex_1 pad_tb10_lr20 bd_t bd_b bd_r flex_row align_center" @click="showPart = !showPart">
        <img class="is_show_img pad_r5" :src="showPart ? require('@/assets/images/open_1.png') : require('@/assets/images/close_1.png')" alt="">
        <span class="quotation_demand_part">客房总价</span>
      </div>
      <div class="flex_2 pad_tb10_lr20 bd_t bd_b">
        <h3 class="t_orange">￥{{positiveFloat(additional.room)}}</h3>
        <span v-if="hotelInfo.service_hotel == 0">{{hotelInfo.roomname}}</span>
      </div>

    </div>
    <div v-show="showPart">
      <!-- 线上报价信息 -->
      <div v-if="!isCollectOffer">
        <div v-for="item in roomList">
          <div class="flex_row car_date bg_fa bd_b">
            <div class="bd_r flex_1 pad_tb10_lr20">{{item.time}} 客房价格</div>
            <div class="flex_2 pad_tb10_lr20" v-html="getDateTotal(item)"></div>
          </div>
          <div class="car_date_type">
            <div class="car_date_type_item flex_row align_center bd_b">
              <div class="left flex_column flex_1 pad_tb10_lr20">
                <!-- <span>房标：{{item.room_budget}}</span> -->
                <span>{{item.room_budget}}</span>
                <span>{{item.networks}}</span>
                <span>{{item.breakfast}}</span>
                <span v-for="roomTypeItem in item.data" v-if="roomTypeItem.type == 0">{{roomTypeItem.roomtype}}：{{roomTypeItem.roomcount}}间</span>
                <span>客房需求：{{item.otherrequirements}}</span>
                <span>离店日期：{{item.data[0].out_date}}</span>

              </div>
              <div class="flex_2 pad_lr20 bd_l">
                <div class="right flex_row justify_between align_center pad_tb5" v-for="(roomTypeItem, index) in item.data" :class="item.data.length !== (index+1) ?'bd_b' : ''">
                  <div class="flex_column">
                    <span>{{roomTypeItem.roomtype}}：￥ {{ positiveFloat(roomTypeItem.unitprice)}} * {{roomTypeItem.provide_count}}间</span>
                    <span>报价备注：{{roomTypeItem.remarks}}</span>
                  </div>
                  <span>￥ {{ positiveFloat(roomTypeItem.unitprice * roomTypeItem.provide_count)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 汇总报价信息 -->
      <div v-if="isCollectOffer">
        <div v-for="itemDate in roomList">
          <div class="flex_row car_date bg_fa bd_b">
            <div class="bd_r flex_1 pad_tb10_lr20">{{itemDate.time}} 客房价格</div>
            <div class="flex_2 pad_tb10_lr20" v-html="getDateTotal(itemDate)"></div>
          </div>
          <div class="car_date_type">
            <div v-for="(item,index) in itemDate.data" :key="index" class="car_date_type_item flex_row align_center bd_b">
              <div class="left flex_column flex_1 pad_tb10_lr20 bd_r">
                <span>{{item.room_budget}}</span>
                <span>{{item.networks}} 、 {{item.breakfast}}</span>
                {{item.roomtype}}：{{item.roomcount}}间
                <span>客房需求：{{item.otherrequirements}}</span>
                <span>离店日期：{{item.out_date}}</span>
              </div>
              <div class="flex_2 pad_lr20">
                <!-- <div class="right flex_row justify_between align_center pad_tb5" v-for="(roomTypeItem, index) in itemDate.data" :class="itemDate.data.length !== (index+1) ?'bd_b' : ''"> -->
                <div class="flex_column">
                  <span>{{item.roomtype}}：￥ {{positiveFloat(item.unitprice)}} * {{item.provide_count}}间</span>
                  <span>报价备注：{{item.remarks}}</span>
                </div>
                <span>￥ {{ positiveFloat(item.unitprice * item.provide_count)}}</span>
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="flex_row car_date bg_fa bd_b">
      <div class="bd_r flex_1 pad_tb10_lr20">客房报价总备注</div>
      <div class="flex_2 pad_tb10_lr20">{{additional.room_remarks}}</div>
      <!-- <div  v-if="isCollectOffer" class="flex_2 pad_tb10_lr20">{{allQuoteInfo.room_remarks}}</div> -->
    </div>
  </div>
</template>

<script>
import { positiveFloat, } from '@/utils/common';
  export default {
    name: "room",
    props:['roomList', 'additional','isCollectOffer','allQuoteInfo',"hotelInfo"],
    data() {
      return{
        showPart: true,
        carList: [],
      }
    },
    computed:{
      offlineRoomTotalMoney(){
        let money = 0;
        this.allQuoteInfo.offline_quoted_price_room.forEach(element => {
          money += element.totalprice
        });
        return money
      },
    },
    methods:{
      positiveFloat,
      getDateTotal(data) {
        return '￥' + data.data.reduce((p, n) => {
          return p + n.unitprice * n.provide_count
        }, 0).toFixed(2)
      }
    }
  }
</script>

<style lang="scss" scoped>
.room_part {
  .is_show_img {
    width: 16px;
    height: 16px;
  }
}
</style>
