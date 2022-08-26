<template>
  <div>
    <div id="spend" class="aaa"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: ['departmentType'],
  mounted() {
    this.departmentList();
  },
  methods: {
    departmentList(data = []) {
      var chartDom = document.getElementById('spend');
      var myChart = echarts.init(chartDom);
      var option;
      let group = [];
      for (let i = 0; i < data.length; i++) {
        let clist = { value: data[i].mentsum, name: data[i].name };
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
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },

        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '60%',
            left: '20%',
            top: '-20%',
            data: group,
            // data: [
            //   { value: 1048, name: '其他' },
            //   { value: 735, name: '外部会议' },
            //   { value: 580, name: '内部会议' },
            //   { value: '', name: '' },
            //   { value: '', name: '' },
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
      };
      option && myChart.setOption(option);
    },
  },
  watch: {
    departmentType(val = []) {
      console.log(val, 'valvalvalvalvalvalppppp');
      this.departmentList(val);
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