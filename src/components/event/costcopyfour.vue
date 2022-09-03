<template>
  <div>
    <div id="four" class="aaa" style="width: 100%; height: 450px; margin-top: 40px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: ['Report'],
  mounted() {
    this.percentage()
  },
  methods: {
    percentage(data = []) {
      let ActualOutlaySaving = data.ActualOutlaySaving && data.ActualOutlaySaving.Price
      var chartDom = document.getElementById('four')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          top: '5%',
          left: 'center'
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
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: ActualOutlaySaving && ActualOutlaySaving.PriceRoom, name: '客房' },
              { value: ActualOutlaySaving && ActualOutlaySaving.PriceConference, name: '会场' },
              { value: ActualOutlaySaving && ActualOutlaySaving.PriceFood, name: '餐饮' },
              { value: ActualOutlaySaving && ActualOutlaySaving.PriceTransportation, name: '大交通' },
              { value: ActualOutlaySaving && ActualOutlaySaving.PriceCar, name: '地面交通' },
              { value: ActualOutlaySaving && ActualOutlaySaving.PriceOther, name: '其他' },
              { value: ActualOutlaySaving && ActualOutlaySaving.PriceServiceCharge, name: '服务费' },
              { value: ActualOutlaySaving && ActualOutlaySaving.PriceTaxation, name: '税费' }
            ]
          }
        ]
      }

      option && myChart.setOption(option)
    }
  },
  watch: {
    Report(val = []) {
      console.log(val, 'valllllllllll')
      this.percentage(val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>