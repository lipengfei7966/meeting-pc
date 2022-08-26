<template>
  <div>
    <div id="cost" class="aaa" style="width: 100%; height: 450px;margin-top:40px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
// let echarts = require('echarts')
export default {
  data() {
    return {

    }
  },
  props:['Report'],
  mounted(){
    this.costList()
  },
  methods: {
    costList(data = []) {
      console.log(data.Budget && data.Budget.Price,'data.Budgetdata.Budgetdata.Budget111');
      let Budget=data.Budget && data.Budget.Price
      let SignContract=data.SignContract && data.SignContract.Price
      let ActualOutlay=data.ActualOutlay && data.ActualOutlay.Price
      let ContractSaving=data.ContractSaving && data.ContractSaving.Price
      let ActualOutlaySaving=data.ActualOutlaySaving && data.ActualOutlaySaving.Price
      var chartDom = document.getElementById('cost');
      var myChart = echarts.init(chartDom);
      var option;
     
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        yAxis: {
          type: 'value',
        },
        xAxis: {
          type: 'category',
          data: ['初步预算', '签约价格', '实际汇总', '合同价Saving', '实际费用Saving',],
        },
        series: [
          {
            name: '客房',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
             data: [ Budget && Budget.PriceRoom, SignContract && SignContract.PriceRoom, ActualOutlay && ActualOutlay.PriceRoom, ContractSaving && ContractSaving.PriceRoom,ActualOutlaySaving && ActualOutlaySaving.PriceRoom],
          },
          {
            name: '会场',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
             data: [ Budget && Budget.PriceConference, SignContract && SignContract.PriceConference, ActualOutlay && ActualOutlay.PriceConference, ContractSaving && ContractSaving.PriceConference,ActualOutlaySaving && ActualOutlaySaving.PriceConference],
          },
          {
            name: '餐饮',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
             data: [Budget && Budget.PriceFood, SignContract && SignContract.PriceFood, ActualOutlay &&  ActualOutlay.PriceFood, ContractSaving && ContractSaving.PriceFood,ActualOutlaySaving && ActualOutlaySaving.PriceFood],
          },
          {
            name: '交通',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
             data: [Budget && Budget.PriceCar, SignContract && SignContract.PriceCar,ActualOutlay &&  ActualOutlay.PriceCar, ContractSaving && ContractSaving.PriceCar,ActualOutlaySaving && ActualOutlaySaving.PriceCar],
          },
          {
            name: '大交通',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [Budget && Budget.PriceTransportation, SignContract && SignContract.PriceTransportation, ActualOutlay && ActualOutlay.PriceTransportation, ContractSaving && ContractSaving.PriceTransportation,ActualOutlaySaving && ActualOutlaySaving.PriceTransportation],
          },
          {
            name: '地面交通',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [Budget && Budget.PriceCar,SignContract &&  SignContract.PriceCar, ActualOutlay && ActualOutlay.PriceCar,ContractSaving &&  ContractSaving.PriceCar,ActualOutlaySaving && ActualOutlaySaving.PriceCar],
          },
          {
            name: '其他',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
           data: [Budget && Budget.PriceOther, SignContract && SignContract.PriceOther, ActualOutlay && ActualOutlay.PriceOther,ContractSaving &&  ContractSaving.PriceOther,ActualOutlaySaving && ActualOutlaySaving.PriceOther],
          },
          {
            name: '服务费',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [Budget && Budget.PriceServiceCharge, Budget && SignContract.PriceServiceCharge, Budget && ActualOutlay.PriceServiceCharge, Budget && ContractSaving.PriceServiceCharge,Budget && ActualOutlaySaving.PriceServiceCharge],
          },
          {
            name: '税费',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
           data: [Budget && Budget.PriceTaxation, SignContract && SignContract.PriceTaxation, ActualOutlay && ActualOutlay.PriceTaxation, ContractSaving && ContractSaving.PriceTaxation,ActualOutlaySaving && ActualOutlaySaving.PriceTaxation],
          },
        ],
      };

      option && myChart.setOption(option);
    },
    
  },
  watch: {
    Report(val = []) {
      this.costList(val);
  },
  },
};
</script>

<style lang="scss" scoped>
</style>