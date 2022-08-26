<template>
  <div>
    <div id="pp" class="aaa" style="width: 100%; height: 450px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: '',
    };
  },
  props: ['city'],
  mounted() {
    // this.drawregionCharts(); // 在页面进入的时候，先请求后端数据再调用这个函数，但由于我这里是写死的假数据，于是就直接调用了
  },
  methods: {
    drawregionCharts(data = []) {
      console.log(data[0].city_name, 'datatdattsatastt');
      this.list = data[0].city_name;
      console.log(this.list, '2222222222222');
      let dataList = [
        { name: this.list, value: 800 },
        { name: '', value: 800 },
      ]; // 该数据是从服务器获取到的数据
      console.log(dataList, '2131231231232131231231231231');
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name; //自行定义formatter格式
          },
        },
        visualMap: {
          min: 0,
          max: 1500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], //取值范围的文字
          inRange: {
            color: ['#e0ffff', '#006edd'], //取值范围的颜色
          },
          show: true, //图注
        },
        geo: {
          map: 'china',
          roam: false, //不开启缩放和平移
          zoom: 1.23, //视角缩放比例
          label: {
            normal: {
              show: true,
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)',
            },
            emphasis: {
              textStyle: {
                color: '#fff',
              },
            },
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            emphasis: {
              areaColor: '#F3B329', //鼠标选择区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
        series: [
          {
            name: '信息量',
            type: 'map',
            geoIndex: 0,
            data: dataList,
            left: '100%',
          },
        ],
      };

      let mychart = this.$echarts.init(document.getElementById('pp'));
      console.log(mychart);
      mychart.setOption(option);
      this.$nextTick(() => {
        mychart.resize(); // 这里是为了解决，tab刷新的时候，图表不刷新的问题。
      });
    },
  },
  watch: {
    city(val = []) {
      console.log(val, 'valvalvalvalvalval');
      this.drawregionCharts(val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>