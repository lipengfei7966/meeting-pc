<template>
  <div>
    <div id="DDD" class="aaa"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: ['expenseTypeList'],
  mounted() {},
  methods: {
    expenseType(data = []) {
      var ROOT_PATH =
        'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
      var chartDom = document.getElementById('DDD');
      var option;
      var weatherIcons = {
        Sunny: ROOT_PATH + '/data/asset/img/weather/sunny_128.png',
        Cloudy: ROOT_PATH + '/data/asset/img/weather/cloudy_128.png',
        Showers: ROOT_PATH + '/data/asset/img/weather/showers_128.png',
      };
      let group = [];
      for (let i = 0; i < data.length; i++) {
        let clist = { value: data[i].Amount, name: data[i].CostType };
        group.push(clist);
      }
      var myChart = echarts.init(chartDom);
      option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        tooltip: {
          trigger: 'item',
        },
        title: {
          text: '',
          subtext: '',
          left: 'center',
        },
        // legend: {
        //   orient: 'vertical',
        //   top: '20%',
        //   left: '60%', //图例距离左的距离
        //   y: 'center', //图例上下居中
        //   itemWidth: 20,
        //   itemHeight: 20,
        //   itemGap: 20,
        //   bottom: 300,
        //   right: 'right',
        //   data: ['荆州', '兖州', '益州', '西凉111'],
        // },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['10%', '40%'],
            left: '40%',
            //   selectedMode: 'single',
            data: group,
            // data: [
            //   { value: 100, name: '荆州' },
            //   { value: 100, name: '兖州' },
            //   { value: 200, name: '益州' },
            //   { value: 300, name: '西凉111' },
            // ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
        grid: {
          left: '8%',
          right: 0,
        },
      };
      myChart.setOption(option);
    },
  },
  watch: {
    expenseTypeList(val = []) {
      console.log(val, 'valvalvalvalvalval');
      this.expenseType(val);
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