<template>
  <div>
    <div id="cernen" class="aaa" style="width: 430px; height: 250px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: ['meetinglist'],
  mounted() {
    var chartDom = document.getElementById('cernen');
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

      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '65%',
          left: '-20%',
          data: [
            { value: 1048, name: '其他' },
            { value: '', name: '' },
            { value: '', name: '' },
            { value: '', name: '' },
            { value: '', name: '' },
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
  watch: {
    meetinglist(val = []) {
      console.log(val, 'valvalvalvalvalvalppppp');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>