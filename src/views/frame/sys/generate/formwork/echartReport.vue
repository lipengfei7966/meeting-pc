<template>
  <div class="bs-new-container app-container">
    <el-alert title="页面初始化错误,请联系技术人员" v-if="showError" type="error" show-icon> </el-alert>
    <template v-if="showTemplate">
      <bs-extras-form ref="bsForm" v-show="showForm" :form="form"></bs-extras-form>

      <template v-if="explainData.isExplainAuth">
        <header>
          <div class="explain-title" @click="showExplain = !showExplain">
            规则说明
            <i :class="showExplain ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
          </div>
          <div v-if="showExplain">
            <el-main style="white-space: pre-line" v-text="explainData.explainInfo"></el-main>
          </div>
        </header>
      </template>

      <main>
        <el-row :gutter="5">
          <el-col v-for="(item, index) in chartList" :key="index" :span="item.chartWidth">
            <div class="bs_echarts" v-if="item.showEchart && item.chartLocation === 'up'" :ref="'chart' + index"></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <bs-chart-table v-if="showTable" ref="lazyTable" :mainData="mainData">
              <template v-if="slotNames" v-for="name in slotNames" :slot="name" slot-scope="scope">
                <component :key="name" v-bind:is="name" :scope="scope"></component>
              </template>
            </bs-chart-table>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-for="(item, index) in chartList" :key="index" :span="item.chartWidth">
            <div class="bs_echarts" v-if="item.showEchart && item.chartLocation === 'down'" :ref="'chart' + index"></div>
          </el-col>
        </el-row>
      </main>
    </template>
  </div>
</template>
<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'

export default {
  name: 'formworkChartReport',
  data() {
    return {
      slotNames: [],
      hasLayout: true,
      showTemplate: false,
      showTable: false,
      showForm: false,
      showExplain: false,
      isPage: true,
      // 表格展示信息
      tableData: [],
      emptyTextVisible: true,
      showError: false,
      generateType: true,
      chartOptionExtend: [],
      serieOptionExtend: [],
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
      chartlist: [],
      form: {
        listQuery: {
          code: this.$route.params.id,
          current: 1,
          size: 20,
          isPage: true,
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
      },
      explainData: {
        isExplainAuth: false,
        explainInfo: ''
      }
    }
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
    // 保存旧结构
    this.chartOptionBak = Object.assign({}, this.chartOption)
    const response = await request({
      url: '/api/code/report/json',
      method: 'post',
      data: {
        data: this.$route.params.id,
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
      this.form.formData = resData.form.formData
      if (this.form.formData && this.form.formData.length > 0) {
        this.showForm = true
      } else {
        this.showForm = false
      }
      this.chartList = resData.chartList
      let flag = false
      resData.chartList.forEach(chart => {
        this.chartOptionExtend.push(chart.chartOptionExtend)
        this.serieOptionExtend.push(chart.serieOptionExtend)
        if (chart.showEchart) {
          flag = true
        }
      })

      this.explainData = Object.assign(this.explainData, resData.explainData)
      this.mainData = Object.assign({}, resData.mainData, {
        api: {
          chartSearch: '/api/code/report/chartSearch',
          search: '/api/code/report/reportSearch',
          export: '/api/code/report/export'
        },
        tableHeight: flag
      })
      this.mainData = Object.assign(this.mainData, this.explainData, {
        codeType: 'echartReport'
      })

      this.showTable = resData.mainData.showTable

      if (this.mainData.topBar && this.mainData.topBar.length > 0) {
        this.mainData.topBar.forEach(col => {
          if (col.event && Object.keys(col.event).length) {
            const events = col.event
            Object.keys(col.event).forEach(f => {
              col[f] = new Function(`return ${events[f]}`)()
            })
          }
          if (col.componentVue) {
            if (col.componentVue.includes('views/frame/')) {
              col.component = resolve => require.ensure([], () => resolve(require(`@/views/frame/${col.componentVue.split('views/frame/')[1]}.vue`)))
            } else if (col.componentVue.includes('views/common/')) {
              col.component = resolve => require.ensure([], () => resolve(require(`@/views/common/${col.componentVue.split('views/common/')[1]}.vue`)))
            } else {
              if (process.env.NODE_ENV === 'development') {
                if (col.componentVue.includes('views/example/')) {
                  col.component = resolve => require.ensure([], () => resolve(require(`@/views/example/${col.componentVue.split('views/example/')[1]}.vue`)))
                }
              }
            }
          }
        })
      }
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

      this.showTemplate = true

      if (this.mainData.initSearch) {
        this.$nextTick(() => {
          this.$refs.bsTable.getList()
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
              condition: extraQuerys[i].condition,
              repCondition: extraQuerys[i].repCondition
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
          this.initChart(response.data)
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
            this.$refs.lazyTable.total = response.total
            if (this.tableData.length > 0) {
              this.$refs.lazyTable.emptyTextVisible = false
            } else {
              this.$refs.lazyTable.emptyTextVisible = true
            }

            this.$refs.lazyTable.$refs.plTable.reloadData(this.tableData)
          })
          .catch(() => {})
      }
    },
    initChart(data) {
      data.forEach((item, index) => {
        if (!this.chartList[index].showEchart) {
          return
        }
        this.chartOption = Object.assign({}, this.chartOptionBak, this.chartOptionExtend[index])
        if (item) {
          if (item.legend) {
            this.chartOption.legend = Object.assign({}, this.chartOption.legend, item.legend)
          }
          if (item.series) {
            item.series.forEach(serie => {
              Object.assign(serie, { type: this.chartList[index].chartType === 'horizontalBar' ? 'bar' : this.chartList[index].chartType }, this.serieOptionExtend[index])
              //特殊处理stack
              if (serie.stackGroup) {
                serie.stack = serie.stackGroup
                delete serie.stackGroup
              }
            })
            this.chartOption.series = Object.assign([], this.chartOption.series, item.series)
          }
          if (item.thresholdSeries) {
            item.thresholdSeries.forEach(serie => {
              //Object.assign(serie, this.serieOptionExtend)
              this.chartOption.push(serie)
            })
          }
          //饼图
          if (this.chartList[index].chartType && this.chartList[index].chartType === 'pie') {
            //无 X 和Y
            delete this.chartOption.xAxis
            delete this.chartOption.yAxis
          } else {
            if (item.xAxis) {
              this.chartOption.xAxis = Object.assign({}, this.chartOption.xAxis, item.xAxis)
              // 排序
              let objArr = []
              this.chartOption.xAxis.data.forEach((data, index) => {
                let obj = Object.assign(
                  {},
                  {
                    name: data,
                    value: this.chartOption.series[0].data[index]
                  }
                )
                objArr.push(obj)
              })
              objArr = this.sortByKey(objArr, 'value')
              let xAxisData = []
              let seriesData = []
              objArr.forEach(obj => {
                xAxisData.push(obj.name)
                seriesData.push(obj.value)
              })
              this.chartOption.xAxis.data = xAxisData
              this.chartOption.series[0].data = seriesData
            }
          }

          // 横向柱状图xAxis和yAxis的值互换
          if (this.chartList[index].chartType && this.chartList[index].chartType === 'horizontalBar') {
            let temp = this.chartOption.xAxis
            this.chartOption.xAxis = this.chartOption.yAxis
            this.chartOption.yAxis = temp
          }

          this.$echarts.dispose(this.$refs['chart' + index][0])
          //主题
          const chart = this.$echarts.init(this.$refs['chart' + index][0], this.chartList[index].theme)
          window.onresize = chart.resize
          chart.setOption(this.chartOption)
        }
      })
    },
    sortByKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key]
        var y = b[key]
        return x - y
      })
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
