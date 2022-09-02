<template>
  <div class="compare">
    <div class="flex_row justify_between">
      <div class="pad_10 flex_row text_center bg_pink justify_center" style="flex: 1">
        <h4>订单总报价：</h4>
        <h4 class="t_orange">￥{{(totalPrice.totalQuoted*1).toFixed(2)}}</h4>
      </div>
      <div class="pad_10 flex_row justify_center" style="flex: 1;border-left: 1px solid #e4e4e4">
        <h4>总结算价：</h4>
        <h4 class="t_orange">￥{{(totalPrice.totalSettlement*1).toFixed(2)}}</h4>
        <h4 v-if="totalPrice.totalQuoted > totalPrice.totalSettlement" style="padding-left: 10px;color:#31a259; line-height: 20px">
          <span>⇩</span>
          {{((totalPrice.totalQuoted-totalPrice.totalSettlement)*100/totalPrice.totalQuoted).toFixed(2)+'%'}}
        </h4>
        <h4 v-if="totalPrice.totalQuoted <= totalPrice.totalSettlement" class="text_red" style="padding-left: 10px;line-height: 20px">
          <span>⇧</span>
          {{((totalPrice.totalSettlement-totalPrice.totalQuoted)*100/totalPrice.totalQuoted).toFixed(2)+'%'}}
        </h4>
      </div>
    </div>
    <roomPart ref='room' v-show="roomListLength > 0" :totalPrice="totalPrice" :isAddColorRed="isAddColorRed" @roomObjection="roomObjectionFn"></roomPart>
    <eventPart ref='event' v-show="eventListLength > 0" :totalPrice="totalPrice" :isAddColorRed="isAddColorRed" @eventObjection="eventObjectionFn"></eventPart>

    <foodPart ref='food' v-show="foodListLength > 0" :totalPrice="totalPrice" :isAddColorRed="isAddColorRed" @foodObjection="foodObjectionFn"></foodPart>
    <foodOutsidePart ref='foodOutside' v-show="foodOutsideListLength > 0" :totalPrice="totalPrice" :isAddColorRed="isAddColorRed" @foodOutsideObjection="foodOutsideObjectionFn"></foodOutsidePart>
    <cerPart ref='car' v-show="carListLength > 0" :totalPrice="totalPrice" :isAddColorRed="isAddColorRed" @carObjection="carObjectionFn"></cerPart>
    <transportPart ref='transport' v-show="transportListLength > 0" :totalPrice="totalPrice" :isAddColorRed="isAddColorRed" @transportObjection="transportObjectionFn"></transportPart>
    <otherPart ref="other" v-show="otherListLength > 0" :totalPrice="totalPrice" :isAddColorRed="isAddColorRed" @otherObjection="otherObjectionFn"></otherPart>
    <servicePart ref="service" v-show="serviceListLength > 0" :totalPrice="totalPrice" :isAddColorRed="isAddColorRed"></servicePart>
    <taxPart ref="tax" v-show="taxListLength > 0" :totalPrice="totalPrice" :isAddColorRed="isAddColorRed"></taxPart>
    <div></div>
  </div>
</template>

<script>
import {classify} from '@/assets/js/validator'
import foodPart from './food.vue'
import foodOutsidePart from './foodOutside.vue'
import eventPart from './event.vue'
import roomPart from './room.vue'
import cerPart from './car.vue'
import transportPart from './transport.vue'
import servicePart from './service.vue'
import otherPart from './other.vue'
import taxPart from './tax.vue'
export default {
  name: "compare",
  props:['isAddColorRed'],
  data(){
    return{
      room:[],
      roomObjection:[],
      eventObjection:[],
      foodObjection:[],
      foodOutsideObjection:[],
      carObjection:[],
      transportObjection:[],
      otherObjection:[],
      objectionMessage:[],
      isShowRoom: true,
      totalPrice:{},
      selectQuery:{},
      roomListLength: 0,
      eventListLength: 0,
      foodListLength: 0,
      foodOutsideListLength: 0,
      carListLength: 0,
      transportListLength: 0,
      otherListLength: 0,
      serviceListLength: 0,
      taxListLength: 0,
      orderId: '',
    }
  },
  components:{
    foodPart,foodOutsidePart, roomPart, cerPart, transportPart, eventPart, servicePart, otherPart, taxPart
  },
  mounted() {
    this.getSettlementDetail()
  },
  methods:{
    getSettlementDetail(){
      this.selectQuery = this.$route.query;
      this.$api.getSettlementDetail({SettlementSheetID: this.selectQuery.settlementId},'POST').then(res =>{
        console.log(res);
        this.roomListLength = res.room?res.room.length:0;
        this.eventListLength = res.conference?res.conference.length:0;
        this.foodListLength = res.food?res.food.length:0;
        this.foodOutsideListLength = res.foodOutside?res.foodOutside.length:0;
        this.carListLength = res.car?res.car.length:0;
        this.transportListLength = res.transportation?res.transportation.length:0;
        this.otherListLength = res.other?res.other.length:0;
        this.serviceListLength = res.serviceCharge.serviceData?res.serviceCharge.serviceData.length:0;
        this.taxListLength = res.serviceCharge.taxationData?res.serviceCharge.taxationData.length:0;

        let roomList = classify(res.room,1)
        roomList.forEach((item,index) => {
          let temp = [];
          item.data.forEach(itemData=>{
            temp.push(itemData)
            temp.push({})
          });
          item.data = temp
          // this.$refs.room.room.push(item);
          // this.$refs.room.room.push({})
        })

        this.$refs.room.room = roomList;
        this.$refs.event.event = classify(res.conference,0);
        this.$refs.food.food = classify(res.food,1);
        this.$refs.foodOutside.foodOutside = classify(res.foodOutside,1);
        this.$refs.car.car = classify(res.car,1);
        this.$refs.transport.transport = classify(res.transportation,1);
        this.$refs.other.other = res.other;
        this.$refs.service.serviceCharge = res.serviceCharge;
        this.$refs.tax.serviceCharge = res.serviceCharge;
        // this.orderId = res.serviceCharge[0].order_id;
        // if(res.serviceCharge.length) this.$refs.service.serviceItem = res.serviceCharge[0]
        // this.$refs.tax.tax = res.serviceCharge;
        // debugger
        this.totalPrice = res.totalPrice;
        console.log(this.totalPrice)
        this.$emit('voucher',res.voucher) // 结算凭证
        this.$emit('otherDescription',res.all_remark) // 会议服务商其他说明
      })
    },
    roomObjectionFn(data){
      this.roomObjection = data;
      this.objectionMessage = [...this.roomObjection,...this.eventObjection,...this.foodObjection,...this.foodOutsideObjection,...this.carObjection,...this.transportObjection,...this.otherObjection]
      this.$emit('objectionMsg',this.objectionMessage)
      // debugger
    },
    eventObjectionFn(data){
      this.eventObjection = data;
      this.objectionMessage = [...this.roomObjection,...this.eventObjection,...this.foodObjection,...this.foodOutsideObjection,...this.carObjection,...this.transportObjection,...this.otherObjection]
      this.$emit('objectionMsg',this.objectionMessage)
      // debugger
    },
    foodObjectionFn(data){
      this.foodObjection = data;
      this.objectionMessage = [...this.roomObjection,...this.eventObjection,...this.foodObjection,...this.foodOutsideObjection,...this.carObjection,...this.transportObjection,...this.otherObjection]
      this.$emit('objectionMsg',this.objectionMessage)
      // debugger
    },
    foodOutsideObjectionFn(data){
      this.foodOutsideObjection = data;
      this.objectionMessage = [...this.roomObjection,...this.eventObjection,...this.foodObjection,...this.foodOutsideObjection,...this.carObjection,...this.transportObjection,...this.otherObjection]
      this.$emit('objectionMsg',this.objectionMessage)
      // debugger
    },
    carObjectionFn(data){
      this.carObjection = data;
      this.objectionMessage = [...this.roomObjection,...this.eventObjection,...this.foodObjection,...this.foodOutsideObjection,...this.carObjection,...this.transportObjection,...this.otherObjection]
      this.$emit('objectionMsg',this.objectionMessage)
      // debugger
    },
    transportObjectionFn(data){
      this.transportObjection = data;
      this.objectionMessage = [...this.roomObjection,...this.eventObjection,...this.foodObjection,...this.foodOutsideObjection,...this.carObjection,...this.transportObjection,...this.otherObjection]
      this.$emit('objectionMsg',this.objectionMessage)
      // debugger
    },
    otherObjectionFn(data){
      debugger
      this.otherObjection = data;
      this.objectionMessage = [...this.roomObjection,...this.eventObjection,...this.foodObjection,...this.foodOutsideObjection,...this.carObjection,...this.transportObjection,...this.otherObjection]
      this.$emit('objectionMsg',this.objectionMessage)
    },
    getStyle(row,column,rowIndex,columnIndex){
      if(row.columnIndex < 2){
        return 'background:#fff9f5!important'
      }
    }
  }
}
</script>

<style lang="scss">
.compare {
  .demand_part {
    .demand_title {
      table {
        border: 1px solid #e4e4e4;
        background: #e4ecf9;
      }
      img {
        width: 15px;
        margin-right: 5px;
      }
    }
    .demand_title_date {
      background: #f3f6fb;
    }
  }
}
</style>
