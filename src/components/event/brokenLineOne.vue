<template>
  <div>
    <div id="BBB" class="aaa"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: ['dateList'],
  mounted() {
    this.qwe();
  },
  methods: {
    qwe(data = []) {
      var chartDom = document.getElementById('BBB');
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
            // data: [
            //   '202103',
            //   '202104',
            //   '202105',
            //   '202106',
            //   '202107',
            //   '202108',
            //   '202109',
            // ],
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
            // data: [120, 132, 101, 134, 90, 230, 210],
            data: data.map((item) => item.expenditure),
          },
        ],
      };

      myChart.setOption(option);
    },
  },
  watch: {
    dateList(val = []) {
      this.qwe(val);
    },
  },
};
</script>

<style lang="scss" scoped>
	.aaa{
		width: 100%; 
		height: 450px;
	}
</style>