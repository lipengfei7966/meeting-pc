<template>
  <div class="food">
    <div class="demand_part">
      <div class="demand_title">
        <table width="100%" cellpadding="10" cellspacing="0">
          <tr>
            <td style="width: 20%;padding-left: 20px" @click="isShowRoom = !isShowRoom">
              <div class="flex_row align_center">
                <img :src="isShowRoom? require('@/assets/images/open_1.png'):require('@/assets/images/close_1.png')" alt="">
                <span>酒店内餐饮</span>
              </div>
            </td>
            <td style="width: 30%;border-left: 1px solid #e4e4e4" class="text_center pad_tb10">报价金额：<em class="t_orange">￥{{totalPrice.foodQuoted?totalPrice.foodQuoted.toFixed(2):'0.00'}}</em></td>
            <td style="width: 30%;border-left: 1px solid #e4e4e4" class="text_center">结算价：<em class="t_orange">￥{{totalPrice.foodSettlement?totalPrice.foodSettlement.toFixed(2):'0.00'}}</em></td>
            <td style="width: 20%;border-left: 1px solid #e4e4e4"></td>
          </tr>
        </table>
      </div>
      <div v-if="isShowRoom">
        <div v-for="(item, idx) in food" :key='idx'>
          <table class="demand_title_date" width="100%" cellpadding="10" cellspacing="0">
            <tr>
              <td style="width: 20%;padding-left: 20px!important">{{item.date}}</td>
              <td style="width: 30%;border-left: 1px solid #e4e4e4" class="pad_tb10 text_center"><em class="t_orange">小计</em>￥{{item.orgSettlement.toFixed(2)}}</td>
              <td style="width: 30%;border-left: 1px solid #e4e4e4" class="text_center"><em class="t_orange">小计</em>￥{{item.settlement.toFixed(2)}}</td>
              <td style="width: 20%;border-left: 1px solid #e4e4e4"></td>
            </tr>
          </table>
          <el-table border width="100%" size="mini" class="foodTable" :data="item.data" :header-cell-style="getStyle" :cell-style="getStyle">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-input class="objection" @input="inputObjection" v-model="scope.row.message" type="text" placeholder="请输入异议" />
              </template>
            </el-table-column>
            <el-table-column label="事项" prop="foodtype" width="171px"></el-table-column>
            <el-table-column min-width="30%">
              <template slot="header">
                <div class="flex_row justify_between align_center">
                  <span class="flex_1 text_center">单价（元）</span>
                  <span class="flex_1 text_center">数量（人）</span>
                  <span class="flex_1 text_center">金额（元）</span>
                </div>
              </template>
              <template slot-scope="scope">
                <div class="flex_row justify_between align_center">
                  <span :class="['flex_1','text_center',(typeof scope.row.price == 'object' && isAddColorRed)?'colorRed':'']">
                    {{typeof scope.row.price == 'object'?scope.row.price.value.toFixed(2):scope.row.price.toFixed(2)}}
                  </span>
                  <span :class="['flex_1','text_center',(typeof scope.row.count == 'object' && isAddColorRed)?'colorRed':'']">
                    {{typeof scope.row.count == 'object'?scope.row.count.value:scope.row.count}}
                  </span>
                  <span :class="['flex_1','text_center',(typeof scope.row.total_price == 'object' && isAddColorRed)?'colorRed':'']">
                    {{typeof scope.row.total_price == 'object'?scope.row.total_price.value.toFixed(2):scope.row.total_price.toFixed(2)}}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="30%">
              <template slot="header">
                <div class="flex_row justify_between align_center">
                  <span class="flex_1 text_center">单价（元）</span>
                  <span class="flex_1 text_center">数量（人）</span>
                  <span class="flex_1 text_center">金额（元）</span>
                </div>
              </template>
              <template slot-scope="scope">
                <div class="flex_row justify_between align_center">
                  <span :class="['flex_1','text_center',(typeof scope.row.settlement_price == 'object' && isAddColorRed)?'colorRed':'']">
                    {{typeof scope.row.settlement_price == 'object'?scope.row.settlement_price.value.toFixed(2):scope.row.settlement_price.toFixed(2)}}
                  </span>
                  <span :class="['flex_1','text_center',(typeof scope.row.settlement_count == 'object' && isAddColorRed)?'colorRed':'']">
                    {{typeof scope.row.settlement_count == 'object'?scope.row.settlement_count.value:scope.row.settlement_count}}
                  </span>
                  <span :class="['flex_1','text_center',(typeof scope.row.settlement_total_price == 'object' && isAddColorRed)?'colorRed':'']">
                    {{typeof scope.row.settlement_total_price == 'object'?scope.row.settlement_total_price.value.toFixed(2):scope.row.settlement_total_price.toFixed(2)}}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column name="服务商说明" prop="settlement_comments" min-width="20%"></el-table-column>
          </el-table>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "food",
  props:['totalPrice','isAddColorRed'],
  data(){
    return{
      food:[],
      isShowRoom: true,
    }
  },
  methods:{
    getStyle(row,column,rowIndex,columnIndex){
      if(row.columnIndex < 2){
        return 'background:#fff9f5!important'
      }
    },
    inputObjection(){
      // debugger
      this.$emit('foodObjection',this.food)
    },
  }
}
</script>
<style scoped>
.colorRed {
  color: red;
}
.foodTable >>> .el-table__body-wrapper .el-icon-arrow-right:before {
  margin: 0 !important;
}
</style>


