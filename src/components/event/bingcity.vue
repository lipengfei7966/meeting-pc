<template>
  <div>
    <div id="lrnder" class="menster">
    </div>
  </div>
</template>


<script>
import * as echarts from 'echarts'
export default {
  props: ['cityList'],
  data() {
    return {}
  },
  mounted() {
    this.datalist()
  },
  methods: {
    datalist(data = []) {
      var app = {}

      var chartDom = document.getElementById('lrnder')
      var myChart = echarts.init(chartDom)
      var option
      //  let grop = [];
      //       for (let i = 0; i < data.length; i++) {
      //         let numlist = []

      //         for (let j = 0; j < data.length; j++){
      //           numlist.push(data[i].amount)
      //         }
      //         let filler = {
      //           name: data[i].cityName,
      //           type: 'bar',
      //           barGap: 0,
      //           label: labelOption,
      //           emphasis: {
      //             focus: 'series',
      //           },
      //           data: numlist  ,
      //         };
      //         grop.push(filler)
      //       }
      const posList = ['left', 'right', 'top', 'bottom', 'inside', 'insideTop', 'insideLeft', 'insideRight', 'insideBottom', 'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight']
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: posList.reduce(function(map, pos) {
            map[pos] = pos
            return map
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      }
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function() {
          const labelOption = {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance
          }
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          })
        }
      }
      const labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      }
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['', '', '', '']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true }
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar', 'stack'] },
            // restore: { show: true },
            // saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: data.map(item => item.cityName)
            // data: ['2012', '2013', '2014', '2015', '2016']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Forest',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: data.map(item => item.amount)
          }
          // {
          //   name: 'Steppe',
          //   type: 'bar',
          //   label: labelOption,
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [220, 182, 191, 234, 290]
          // },
          // {
          //   name: 'Desert',
          //   type: 'bar',
          //   label: labelOption,
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [150, 232, 201, 154, 190]
          // },
          // {
          //   name: 'Wetland',
          //   type: 'bar',
          //   label: labelOption,
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [98, 77, 101, 99, 40]
          // }
        ]
      }

      option && myChart.setOption(option)
    }
  },
  watch: {
    cityList(val = []) {
      this.datalist(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.menster {
  width: 50vw;
  height: 450px;
  max-width: 1030px;
}
</style>