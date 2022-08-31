<template>
  <div class="service">
    <div class="demand_part">
      <div class="demand_title">
        <table width="100%" cellpadding="10" cellspacing="0">
          <tr style="background: #E4ECF9!important;">
            <td style="width: 20%;padding-left: 20px" @click="isShowRoom = !isShowRoom">
              <div class="flex_row align_center">
                <img :src="isShowRoom? require('@/assets/images/open_1.png'):require('@/assets/images/close_1.png')" alt="">
                <span class="font_14 t_000">服务费</span>
              </div>
            </td>
            <td style="width: 30%;border-left: 1px solid #e4e4e4" class="text_center pad_tb10 font_14 t_000">报价金额：<em class="t_orange">￥{{positiveFloat(serviceCharge.quoted_serviceCharge*1)}}</em></td>
            <td style="width: 30%;border-left: 1px solid #e4e4e4" class="text_center font_14 t_000">结算价：<em class="t_orange">￥{{positiveFloat(serviceCharge.serviceCharge*1)}}</em></td>
            <td style="width: 20%;border-left: 1px solid #e4e4e4"></td>
          </tr>
        </table>
      </div>
      <div v-if="isShowRoom">
        <table class="demand_title_date tax_part" width="100%" cellpadding="10" cellspacing="0">
          <tr>
            <td style="width: 20%;padding-left: 20px!important">事项</td>
            <td style="width: 30%;border-left: 1px solid #e4e4e4" class="pad_tb10">
              <div class="pad_lr10 flex_row justify_between">
                <!-- <span class="flex_1 text_center">金额（元）</span>
                <span class="flex_1 text_center">费率</span> -->
                <span class="flex_1 text_center"></span>
                <span class="flex_1 text_center"></span>
                <span class="flex_1 ">小计</span>
              </div>
            </td>
            <td style="width: 30%;border-left: 1px solid #e4e4e4">
              <div class="pad_lr10 flex_row justify_between">
                <!-- <span class="flex_1 text_center">金额（元）</span>
                <span class="flex_1 text_center">费率</span> -->
                <span class="flex_1 text_center"></span>
                <span class="flex_1 text_center"></span>
                <span class="flex_1 ">小计</span>
              </div>
            </td>
            <td style="width: 20%;border-left: 1px solid #e4e4e4"></td>
          </tr>
          <tr v-for="(serveItem,serveIndex) in serviceCharge.serviceData" :key="serveIndex">
            <td style="width: 20%;padding-left: 20px!important" class="pad_tb10">
              {{serveItem.quoted_name}}
            </td>
            <td style="width: 30%;border-left: 1px solid #e4e4e4" class="pad_tb10">
              <div class="pad_lr10 flex_row justify_between">
                <span class="flex_1 "></span>
                <span class="flex_1 "></span>
                <span class="flex_1 ">{{serveItem.quoted_value}}</span>
              </div>

            </td>
            <td style="width: 30%;border-left: 1px solid #e4e4e4">
              <div class="pad_lr10 flex_row justify_between">
                <span class="flex_1 "></span>
                <span class="flex_1 "></span>
                <span class="flex_1 ">{{serveItem.value}}</span>
              </div>

            </td>
            <td style="width: 20%;border-left: 1px solid #e4e4e4"></td>
          </tr>
          <tr>
            <td class="pad_tb10" style="padding-left:20px!important">
              非直采服务费说明:
            </td>
            <td colspan="3" style="border-left: 1px solid rgb(228, 228, 228);padding-left:20px!important">
              {{serviceCharge.settlement_service_remark}}
            </td>
          </tr>
          <tr>
            <td class="pad_tb10" style="padding-left:20px!important">
              直采服务费说明:
            </td>
            <td colspan="3" style="border-left: 1px solid rgb(228, 228, 228);padding-left:20px!important">
              {{serviceCharge.settlement_advance_remark}}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { positiveFloat } from '@/utils/common';

export default {
  name: "compare",
  props:['totalPrice','isAddColorRed'],
  data(){
    return{
      serviceCharge:{
        // serviceCharge: 0,
        // quoted_serviceCharge: 0,
      },
      serviceItem: {},
      isShowRoom: true,
    }
  },

  methods:{
    positiveFloat,
    getStyle(row,column,rowIndex,columnIndex){
      if(row.columnIndex < 2){
        return 'background:#fff9f5!important'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.service {
  .tax_part {
    td {
      font-size: 12px;
      color: #909399;
      border-bottom: 1px solid #e4e4e4;
    }
    td:nth-child(1),
    td:nth-child(2) {
      background: rgb(255, 249, 245) !important;
    }
  }
  table {
    background: #fff !important;
  }
}
.colorRed {
  color: red;
}
</style>


