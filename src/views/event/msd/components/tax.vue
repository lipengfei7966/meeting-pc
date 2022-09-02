<template>
  <div class="tax">
    <div class="demand_part">
      <div class="demand_title">
        <table width="100%" cellpadding="10" cellspacing="0">
          <tr style="background: #E4ECF9!important;">
            <td style="width: 20%;padding-left: 20px" @click="isShowRoom = !isShowRoom">
              <div class="flex_row align_center">
                <img :src="isShowRoom? require('@/assets/images/open_1.png'):require('@/assets/images/close_1.png')" alt="">
                <span>税费</span>
              </div>
            </td>
            <td style="width: 30%;border-left: 1px solid #e4e4e4" class="text_center pad_tb10">报价金额：<em class="t_orange">￥{{(serviceCharge.quoted_taxation*1).toFixed(2)}}</em></td>
            <td style="width: 30%;border-left: 1px solid #e4e4e4" class="text_center">结算价：<em class="t_orange">￥{{(serviceCharge.taxation*1).toFixed(2)}}</em></td>
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
          <tr v-for="(serveItem,serveIndex) in serviceCharge.taxationData" :key="serveIndex">
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
              税费说明:
            </td>
            <td colspan="3" style="border-left: 1px solid rgb(228, 228, 228);padding-left:20px!important">
              {{serviceCharge.settlement_taxrate_comments}}
            </td>
          </tr>
        </table>
        <!-- <div v-for="(item, idx) in tax" :key='idx'> -->
        <!-- <el-table border width="100%" size="mini" :data="serviceCharge.taxationData" :header-cell-style="getStyle" :cell-style="getStyle">
            <el-table-column label="事项" prop="quoted_name" min-width="20%"></el-table-column>
            <el-table-column min-width="30%" prop="quoted_value">
              <template slot="header">
                <div class="flex_row justify_between align_center">
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 ">小计</span>
                </div>
              </template>
              <template slot-scope="scope">
                <div class="flex_row justify_between align_center">
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 ">{{ scope.row.quoted_value }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="30%" prop="value">
              <template slot="header">
                <div class="flex_row justify_between align_center">
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 text_center">小计</span>
                </div>
              </template>
              <template slot-scope="scope">
                <div class="flex_row justify_between align_center">
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 ">{{ scope.row.value }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column name="服务商说明" prop="settlement_comments" min-width="20%"></el-table-column>
          </el-table> -->
        <!-- </div> -->

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "compare",
  props:['totalPrice','isAddColorRed'],
  data(){
    return{
      tax:[],
      serviceCharge:{},
      isShowRoom: true,
    }
  },
  methods:{
    getStyle(row,column,rowIndex,columnIndex){
      if(row.columnIndex < 2){
        return 'background:#fff9f5!important'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tax {
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


