<template>
  <div>
    <div id="AAA" class="aaa" style="width: 1100px; height: 450px">1111
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {

  props: ['rfqQtyList'],
  data() {
    return {
    }
  },
  mounted(){
this.aaaaa()
  },
  methods: {
    aaaaa(data = []){
      var chartDom = document.getElementById('AAA');
    var myChart = echarts.init(chartDom);
    var option;
    console.log(data,'21321312');
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
        feature: {
          // saveAsImage: {},
        },
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
          data:data.map(item=>item.months)
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
          data: data.map(item=>item.quantity),
        },
      ],
    };

    myChart.setOption(option);
    }
    
  },
  watch:{
      rfqQtyList(val = []){
        // return val
        console.log(val,'BrokenLineBrokenLineBrokenLineBrokenLine');
        this.data =val
        console.log(this.data,'1232131121121');
          if(val.length === 0){

              this.aaaaa(val)
          }else{
              this.aaaaa(val)
          }
      }
  }
};
</script>

<style lang="scss" scoped>
</style>