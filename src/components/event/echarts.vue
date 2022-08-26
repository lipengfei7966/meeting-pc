<template>
  <div>
    <div id="main" class="aaa"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: ['detailed'],
  mounted() {
    this.jjj()
  },
  methods: {
    jjj(data = []) {
      console.log(data,'------------');
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
          text: '',
          subtext: '',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['', ''],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: 'category',
          // data: [
          //   '上海田林宾馆',
          //   '上海东方佘山索菲特大酒店',
          //   '北京龙熙温泉度假酒店',
          //   '上海凯宾斯基酒店',
          //   '上海虹桥雅高美爵',
          //   '上海银星皇冠假日酒店',
          //   '上海新天地朗廷酒店（我是测试的，过会儿我就删除了，你相信好不啊红，哈哈哈哈，请相信我）',
          //   '上海宝龙丽笙酒店',
          //   '上海五角场凯悦酒店',
          //   '杭州洲际酒店',
          //   '北京中奥马哥孛罗大酒店',
          //   '上海金桥红枫万豪酒店',
          //   '上海圣诺亚皇冠假日酒店',
          //   '西双版纳嘉盛华美达广场酒店',
          //   '北京金茂万丽酒店',
          // ],
          data: data.map(item=>item.name),
        },
        series: [
          {
            name: '次数',
            type: 'bar',
            // data: [
            //   18203, 23489, 29034, 104970, 131744, 630230, 18203, 18203, 18203,
            //   18203, 18203, 18203, 18203, 18203, 18203,
            // ],
          data: data.map(item=>item.number),

          },
        ],
      };
      myChart.setOption(option);
    },
  },
  watch: {
    detailed(val = []) {
      // return val
      console.log(val, '123456789');
      this.data = val;
      if (val.length === 0) {
        this.jjj(val);
      } else {
        this.jjj(val);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.aaa {
  width: 1100px;
  height: 600px;
}
</style>