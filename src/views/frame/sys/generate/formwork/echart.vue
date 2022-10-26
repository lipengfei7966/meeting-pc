<template>
  <div class="bs-new-container app-container" style="margin-bottom:23px">
    <el-alert title="页面初始化错误,请联系技术人员" v-if="showError" type="error" show-icon>
    </el-alert>
    <template v-if='showTemplate'>
      <bs-extras-form ref='bsForm' v-show='showForm' :form='form'></bs-extras-form>
      <template v-if='explainData.isExplainAuth'>
        <header>
          <div class='explain-title' @click='showExplain = !showExplain'>
            规则说明
            <i :class="showExplain? 'el-icon-arrow-down':'el-icon-arrow-up' "></i>
          </div>
          <div v-if='showExplain'>
            <el-main style='white-space: pre-line' v-text='explainData.explainInfo'></el-main>
          </div>
        </header>
      </template>

      <main :style="{'width': clientWidth < 1366 ? (this.sidebar.opened && !app.isScreenFull ? '1163px' : '1323px') : 'auto'}">
        <div class='bs_echarts' ref='chart'></div>
        <bs-chart-table v-if='showTable' ref='lazyTable' :mainData='mainData'>
          <template v-if='slotNames' v-for='name in slotNames' :slot='name' slot-scope='scope'>
            <component :key='name' v-bind:is='name' :scope='scope'></component>
          </template>
        </bs-chart-table>
      </main>
    </template>
  </div>
</template>
<script>
import Vue from 'vue'
import screenfull from 'screenfull'
import { mapGetters } from 'vuex'
import request from '@/utils/frame/base/request'

export default {
  name: 'formworkChart',
  data() {
    return {
      slotNames: [],

      hasLayout: true,
      showTemplate: false,
      showTable: false,
      showForm: false,
      showExplain: false,
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
          code: this.$route.params.id || this.$route.meta.title.replace('m', ''),
          current: 1,
          size: 20,
          isPage: false,
          camelToUnderlineFlg: false,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: '',
          data: {},
          bsQueryExtrasForCode: [],
          bsQueryExtras: []
        },
        formData: []
      },
      mainData: {
        hasLayout: true,
        table: {
          cols: []
        },
        bottomBar: {
          pagination: {}
        }
      },
      explainData: {
        isExplainAuth: false,
        explainInfo: ''
      }
    }
  },
  computed: {
    ...mapGetters(['dataDictList', 'sidebar', 'clientWidth', 'clientHeight'])
  },
  mounted() {
    this.$nextTick(() => {
      const elApp = document.getElementById('app')
      if (elApp && !this.hasLayout) {
        elApp.style['overflow-y'] = 'auto'
      }
    })
  },
  async created() {
    this.hasLayout = this.$route.path.includes('/layout')
    this.mainData.hasLayout = this.hasLayout

    // 保存旧结构
    this.chartOptionBak = Object.assign({}, this.chartOption)
    const response = await request({
      url: '/api/code/report/json',
      method: 'post',
      data: {
        data: this.$route.params.id || this.$route.meta.title.replace('m', ''),
        funcModule: this.$t('route.' + this.$route.meta.title),
        funcOperation: this.$t('biz.btn.init')
      }
    })
    if (response.data) {
      const resData = response.data

      this.form.moreShowFlg = resData.form.moreShowFlg
      this.form.listQuery = Object.assign({}, this.form.listQuery, resData.form.listQuery, {
        funcModule: this.$t('route.' + this.$route.meta.title),
        funcOperation: this.$t('biz.btn.search'),
        data: {}
      })
      this.form.formData = resData.form.formData
      if (this.form.formData && this.form.formData.length > 0) {
        this.showForm = true
      } else {
        this.showForm = false
      }
      this.chart = resData.chart

      this.explainData = Object.assign(this.explainData, resData.explainData)
      this.mainData = Object.assign({ hasLayout: this.hasLayout }, resData.mainData, {
        api: {
          chartSearch: '/api/code/report/chartSearch',
          search: '/api/code/report/reportSearch',
          export: '/api/code/report/export'
        },
        codeType: 'chart'
      })

      this.showTable = resData.mainData.showTable

      if (this.mainData.table && this.mainData.table.cols && this.mainData.table.cols.length > 0) {
        this.mainData.table.cols.forEach(col => {
          //扩展属性
          if (col.extendProps && col.extendProps instanceof Object) {
            col = Object.assign(col, col.extendProps)
          }
          if (col && col.isSlot) {
            this.slotNames.push(col.prop)
            Vue.component(col.prop, {
              props: ['scope'],
              template: col.slotInfo
            })
            delete col.slotInfo
          }
        })
      }
      this.chartOptionExtend = Object.assign({}, resData.chartOptionExtend)
      this.serieOptionExtend = Object.assign({}, resData.serieOptionExtend)

      this.showTemplate = true

      if (this.mainData.initSearch) {
        this.$nextTick(() => {
          this.$refs.bsTable.lazyTable()
        })
      }
    } else {
      this.showError = true
    }
  },
  methods: {
    getList() {
      const bsQueryExtras = []
      if (this.$refs.bsForm) {
        const extraQuerys = this.$refs.bsForm.form.listQuery.bsQueryExtrasForCode
        for (const i in extraQuerys) {
          if (extraQuerys[i].value) {
            bsQueryExtras.push({
              prop: extraQuerys[i].prop,
              value: extraQuerys[i].value,
              type: extraQuerys[i].type,
              dbType: extraQuerys[i].dbType,
              condition: extraQuerys[i].condition
            })
          }
        }
        this.form.listQuery.bsQueryExtrasForCode = bsQueryExtras
      }
      //list chart
      request({
        url: this.mainData.api.chartSearch,
        method: 'POST',
        data: this.form.listQuery
      })
        .then(response => {
          this.initChart(response.data[0])
          this.$refs.bsForm.loading = false
        })
        .catch(e => {
          this.$refs.bsForm.loading = false
          this.showError = true
        })

      //list table
      if (this.showTable) {
        request({
          url: this.mainData.api.search,
          method: 'POST',
          data: this.form.listQuery
        })
          .then(response => {
            this.tableData = response.data

            this.$refs.lazyTable.total = this.tableData.length
            if (this.tableData.length > 0) {
              this.$refs.lazyTable.emptyTextVisible = false
            } else {
              this.$refs.lazyTable.emptyTextVisible = true
            }

            this.$refs.lazyTable.$refs.singleTable.reloadData(this.tableData)
          })
          .catch(() => {})
      }
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
            //特殊处理stack
            if (serie.stackGroup) {
              serie.stack = serie.stackGroup
              delete serie.stackGroup
            }
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
        //主题
        const chart = this.$echarts.init(this.$refs.chart, this.chart.theme)
        window.onresize = chart.resize
        chart.setOption(this.chartOption)
      }
    }
  }
}
</script>
<style lang='scss'>
header {
  margin: 0 3px 3px;
  border: 1px solid #ababab;

  // form头部
  .explain-title {
    width: 100%;
    height: 24px;
    line-height: 24px;
    border-bottom: 1px solid #ababab;
    font-size: 14px;
    color: #666666;
    font-weight: 900;
    background-color: #f5f7fa;

    i {
      float: right;
      margin: 5px;
      cursor: pointer;
    }

    &::before {
      display: inline-block;
      vertical-align: top;
      content: '';
      width: 2px;
      height: 100%;
      margin-right: 7px;
    }
  }
}
</style>
