<template>
  <div class="food">
    <div class="demand_part">
      <div class="demand_title">
        <table width="100%" cellpadding="10" cellspacing="0">
          <tr>
            <td style="width: 20%;padding-left: 20px" @click="isShowRoom = !isShowRoom">
              <div class="flex_row align_center">
                <img :src="isShowRoom? require('@/assets/images/open_1.png'):require('@/assets/images/close_1.png')" alt="">
                <span>会场需求</span>
              </div>
            </td>
            <td style="width: 30%;border-left: 1px solid #e4e4e4" class="text_center pad_tb10">报价金额：<em class="t_orange">￥{{totalPrice.conferenceQuoted?totalPrice.conferenceQuoted.toFixed(2):'0.00'}}</em></td>
            <td style="width: 30%;border-left: 1px solid #e4e4e4" class="text_center">结算价：<em class="t_orange">￥{{totalPrice.conferenceSettlement?totalPrice.conferenceSettlement.toFixed(2):'0.00'}}</em></td>
            <td style="width: 20%;border-left: 1px solid #e4e4e4"></td>
          </tr>
        </table>
      </div>
      <div v-if="isShowRoom">
        <div v-for="(item, idx) in event" :key='idx'>
          <table class="demand_title_date" width="100%" cellpadding="10" cellspacing="0">
            <tr>
              <td style="width: 20%;padding-left: 20px!important">{{item.date}}</td>
              <td style="width: 30%;border-left: 1px solid #e4e4e4" class="pad_tb10 text_center"><em class="t_orange">小计</em>￥{{item.orgSettlement?item.orgSettlement.toFixed(2):'0.00'}}</td>
              <td style="width: 30%;border-left: 1px solid #e4e4e4" class="text_center"><em class="t_orange">小计</em>￥{{item.settlement?item.settlement.toFixed(2):'0.00'}}</td>
              <td style="width: 20%;border-left: 1px solid #e4e4e4"></td>
            </tr>
          </table>
          <el-table border width="100%" size="mini" :data="item.data" :header-cell-style="getStyle" :cell-style="getStyle">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-input class="objection" @input="inputObjection" v-model="scope.row.message" type="text" placeholder="请输入异议" />
              </template>
            </el-table-column>
            <el-table-column label="事项" prop="name" min-width="20%"></el-table-column>
            <el-table-column min-width="30%">
              <template slot="header">
                <div class="flex_row justify_between align_center">
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 text_center">金额（元）</span>
                </div>
              </template>
              <template slot-scope="scope">
                <div class="flex_row justify_between align_center">
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 text_center"></span>
                  <span :class="['flex_1','text_center',(typeof scope.row.price == 'object' && isAddColorRed)?'colorRed':'']">
                    {{typeof scope.row.price=='object'?(scope.row.price.value?scope.row.price.value.toFixed(2):'0.00'):(scope.row.price?scope.row.price.toFixed(2):'0.00')}}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="30%">
              <template slot="header">
                <div class="flex_row justify_between align_center">
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 text_center">金额（元）</span>
                </div>
              </template>
              <template slot-scope="scope">
                <div class="flex_row justify_between align_center">
                  <span class="flex_1 text_center"></span>
                  <span class="flex_1 text_center"></span>
                  <span :class="['flex_1','text_center',(typeof scope.row.settlement_price == 'object' && isAddColorRed)?'colorRed':'']">
                    {{typeof scope.row.settlement_price =='object'?(scope.row.settlement_price.value?scope.row.settlement_price.value.toFixed(2):'0.00') : (scope.row.settlement_price? scope.row.settlement_price.toFixed(2):'0.00')}}
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
  name: "compare",
  props:['totalPrice','isAddColorRed'],
  data(){
    return{
      event:[],
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
      this.$emit('eventObjection',this.event)
    },
  }
}
</script>
<style lang="scss" scoped>
.colorRed {
  color: red;
}
</style>


