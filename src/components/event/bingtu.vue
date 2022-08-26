<template>
  <div>
    <div id="pink" class="aaa" style="width: 430px; height: 450px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: ['meetinglist'],
  mounted() {
    // this.cendertype();
  },
  methods: {
    cendertype(data = []) {
      let dataList = data.EventTypes
      console.log(data.EventTypes,'21312313123214321432');
      var chartDom = document.getElementById('pink');
      var myChart = echarts.init(chartDom);
      var option;
      

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
            // data:group,
            data: [
              { value: dataList[0].Amount, name: dataList[0].EventTypeName },
              // { value: 735, name: '外部会议' },
              // { value: 580, name: '内部会议' },
              // { value: '', name: '' },
              // { value: '', name: '' },
            ],
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
    meetinglist(val = []) {
      console.log(val, 'valvalvalvalvalvalppppp');
      this.cendertype(val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>