<template>
  <div>
    <div id="centater" class="aaa" style="width: 100%; height: 450px; margin-top: 40px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props:['Report'],
  mounted() {
    this.percentage();
  },
  methods: {
    percentage(data = []) {
      let Budget=data.Budget && data.Budget.Price
      var chartDom = document.getElementById('centater');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: Budget && Budget.PriceRoom, name: '客房' },
              { value: Budget && Budget.PriceConference, name: '会场' },
              { value: Budget && Budget.PriceFood, name: '餐饮' },
              { value: Budget && Budget.PriceTransportation, name: '大交通' },
              { value: Budget && Budget.PriceCar, name: '地面交通' },
              { value: Budget && Budget.PriceOther, name: '其他' },
              { value: Budget && Budget.PriceServiceCharge, name: '服务费' },
              { value: Budget && Budget.PriceTaxation, name: '税费' },
            ],
            
          },
          
        ],
        
      };

      option && myChart.setOption(option);
    },
  },
  watch: {
    Report(val = []) {
      console.log(val,'valllllllllll');
      this.percentage(val);
    },
  }
};
</script>

<style lang="scss" scoped>
</style>