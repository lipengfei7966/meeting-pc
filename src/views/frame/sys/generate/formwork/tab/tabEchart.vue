<template>
  <!-- <div ref='tab'> -->
  <header v-if="showTemplate" ref='formTableDialogHeader' style='border-radius:5px;margin:0 0 3px;' :style="{'border-bottom-width': mainInfoVisible ? '1px' : '0'}">
    <div v-show='mainInfoVisible' class='bs_echarts' ref='chart' :style="{ minHeight: echartHeight + 'px', margin: 0, border: 'none' }"></div>
  </header>
  <!-- </div> -->
</template>
<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'
import session from '@/utils/frame/base/sessionStorage'

import screenfull from 'screenfull'
export default {
  name: 'formworkChart',
  data() {
    return {
      echartHeight: 300,
      mainInfoVisible: true,
      hasLayout: true,
      showTemplate: false,
      showTable: false,
      isPage: false,
      // 表格展示信息
      tableData: [],
      emptyTextVisible: true,
      showError: false,
      generateType: true,
      chartOptionExtend: {},
      serieOptionExtend: {},
      chartOptionBak: {},
      chartOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: []
      },
      chart: {
        xAxis: '',
        yAxis: [],
        layoutType: '',
        chartType: '',
        legend: '',
        thresholdArray: ''
      },
      form: {
        listQuery: {
          code: this.tab.id,
          current: 1,
          size: 20,
          isPage: false,
          camelToUnderlineFlg: true,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: '',
          data: {},
          bsQueryExtrasForCode: [],
          bsQueryExtras: []
        },
        formData: []
      },
      mainData: {
        table: {
          cols: []
        },
        bottomBar: {
          pagination: {}
        }
      }
    }
  },
  props: {
    tab: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {},
  async created() {
    // 保存旧结构
    this.chartOptionBak = Object.assign({}, this.chartOption)
    const response = await request({
      url: '/api/code/report/json',
      method: 'post',
      data: {
        data: this.tab.id,
        funcModule: this.$t('route.' + this.$route.meta.title),

        funcOperation: '初始'
      }
    })
    if (response.data) {
      const resData = response.data
      this.form.moreShowFlg = resData.form.moreShowFlg
      this.form.listQuery = Object.assign({}, this.form.listQuery, resData.form.listQuery, {
        funcModule: this.$t('route.' + this.$route.meta.title),

        funcOperation: '查询',
        data: {}
      })
      this.chart = resData.chart

      this.mainData = Object.assign({}, resData.mainData, { api: { chartSearch: '/api/code/report/chartSearch', search: '/api/code/report/reportSearch', export: '/api/code/report/export' } })

      this.showTable = resData.mainData.showTable
      this.chartOptionExtend = Object.assign({}, resData.chartOptionExtend)
      this.serieOptionExtend = Object.assign({}, resData.serieOptionExtend)

      this.showTemplate = true
      //todo 找到父亲的数据处理
      if (this.tab.initSearch) {
        this.$nextTick(() => {
          if (this.$parent.form === undefined) {
            this.getList(this.$parent.$parent.$parent.getQueryEtras())
          } else {
            this.getList(this.$parent.getQueryEtras())
          }
        })
      }
    } else {
      this.showError = true
    }
  },
  methods: {
    getList(bsQueryExtras) {
      this.form.listQuery.bsQueryExtrasForCode = bsQueryExtras

      //list chart
      request({
        url: this.mainData.api.chartSearch,
        method: 'POST',
        data: this.form.listQuery
      })
        .then(response => {
          this.loading = false
          this.initChart(response.data)
        })
        .catch(e => {
          this.showError = true
          this.loading = false
        })
    },
    initChart(data) {
      // option 还原 并扩展
      this.chartOption = Object.assign({}, this.chartOptionBak, this.chartOptionExtend)

      if (data) {
        if (data.legend) {
          this.chartOption.legend = Object.assign({}, this.chartOption.legend, data.legend)
        }
        if (data.series) {
          data.series.forEach(serie => {
            Object.assign(serie, { type: this.chart.chartType }, this.serieOptionExtend)
          })
          this.chartOption.series = Object.assign([], this.chartOption.series, data.series)
        }
        if (data.thresholdSeries) {
          data.thresholdSeries.forEach(serie => {
            //Object.assign(serie, this.serieOptionExtend)
            this.chartOption.series.push(serie)
          })
        }

        //饼图
        if (this.chart.chartType && this.chart.chartType === 'pie') {
          //无 X 和Y
          delete this.chartOption.xAxis
          delete this.chartOption.yAxis
        } else {
          if (data.xAxis) {
            this.chartOption.xAxis = Object.assign({}, this.chartOption.xAxis, data.xAxis)
          }
        }

        this.$echarts.dispose(this.$refs.chart)
        const chart = this.$echarts.init(this.$refs.chart, this.chart.theme)
        window.onresize = chart.resize
        chart.setOption(this.chartOption)
      }
    }
  }
}
</script>
