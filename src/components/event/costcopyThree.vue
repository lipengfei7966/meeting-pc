<template>
  <div>
    <div id="three" class="aaa" style="width: 100%; height: 450px; margin-top: 40px"></div>
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
      let Budget = data.Budget && data.Budget.Price
      let SignContract = data.SignContract && data.SignContract.Price
      let ActualOutlay = data.ActualOutlay && data.ActualOutlay.Price
      let ContractSaving = data.ContractSaving && data.ContractSaving.Price
      let ActualOutlaySaving = data.ActualOutlaySaving && data.ActualOutlaySaving.Price
      var chartDom = document.getElementById('three')
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
              { value: ContractSaving && ContractSaving.PriceRoom, name: '客房' },
              { value: ContractSaving && ContractSaving.PriceConference, name: '会场' },
              { value: ContractSaving && ContractSaving.PriceFood, name: '餐饮' },
              { value: ContractSaving && ContractSaving.PriceTransportation, name: '大交通' },
              { value: ContractSaving && ContractSaving.PriceCar, name: '地面交通' },
              { value: ContractSaving && ContractSaving.PriceOther, name: '其他' },
              { value: ContractSaving && ContractSaving.PriceServiceCharge, name: '服务费' },
              { value: ContractSaving && ContractSaving.PriceTaxation, name: '税费' }
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