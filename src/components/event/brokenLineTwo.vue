<template>
  <div>
    <div id="CCC" class="menster"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: ['dateL'],
  mounted() {
    this.ooo();
  },
  methods: {
    ooo(data = []) {
      var chartDom = document.getElementById('CCC');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['', '', '', '', ''],
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {},
          // },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
             data: data.map((item) => item.months),
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '询价单数总量',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series',
            },
            data: data.map((item) => item.saving),
          },
        ],
      };
      myChart.setOption(option);
    },
  },
   watch: {
    dateL(val = []) {
      this.ooo(val);
    },
  },
};
</script>

<style lang="scss" scoped>
	.menster{
		width: 1100px;
		height: 450px;
		max-width: 1100px;
	}
</style>