<template>
  <div>
    <div id="cerder" class="aaa"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: ['monthlist'],
  mounted() {
    this.handerser();
  },
  methods: {
    handerser(data = []) {
      var chartDom = document.getElementById('cerder');
      var myChart = echarts.init(chartDom);
      var option;
      let group = [];
      for (let i = 0; i < data.length; i++) {
        let clist = { value: data[i].amount, name: data[i].months };
        group.push(clist);
      }

      option = {
        title: {
          text: '',
          subtext: '',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },

        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '60%',
            left: '20%',
            top: '-30%',
            data:group,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
  watch: {
    monthlist(val = []) {
      console.log(val, 'valvalvalvalvalvalppppp');
      this.handerser(val);
    },
  },
};
</script>

<style lang="scss" scoped>
	.aaa{
		width: 25vw; 
		height: 450px;
		max-width: 430px;
		// left: -20%;
	}
</style>