<template>
  <div class="tax">
    <div class="tax_part flex_row">
      <div class="flex_1 pad_tb10_lr20 bd_t bd_b bd_r flex_row align_center" @click="showPart = !showPart">
        <img class="is_show_img pad_r5" :src="showPart ? require('@/assets/images/open_1.png') : require('@/assets/images/close_1.png')" alt="">
        <span class="quotation_demand_part">税费</span>
      </div>
      <h3 class="flex_2 pad_tb10_lr20 bd_t bd_b t_orange">￥{{taxList.taxation?positiveFloat(taxList.taxation).toFixed(2):''}}</h3>
    </div>
    <div v-show="showPart">
      <div class="flex_row car_date bd_b">
        <div class="bd_r flex_1 pad_tb10_lr20">税费</div>
        <div class="flex_2 pad_tb10_lr20">
          <div v-for="(item,index) in taxList.taxationData" :key="index" class="flex_row justify_between">
            <span>{{item.name}}</span>
            <span>{{item.value}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { positiveFloat, } from '@/utils/common';
export default {
  name: "tax",
  props: ['taxList'],
  data() {
    return{
      showPart: true,
    }
  },
  methods:{
    positiveFloat
  }
}
</script>

<style lang="scss" scoped>
.tax_part {
  .is_show_img {
    width: 16px;
    height: 16px;
  }
}
</style>
