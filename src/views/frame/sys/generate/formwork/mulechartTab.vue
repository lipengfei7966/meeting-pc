<template>
  <div class="bs-container app-container">
    <el-alert title="页面初始化错误,请联系技术人员" v-if="showError" type="error" show-icon>
    </el-alert>
    <template v-if="showTemplate">
      <bs-extras-form ref='bsForm' v-if="showForm" :form='form'></bs-extras-form>
      <main v-if="showTab">
        <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">

          <template v-for='(tab,index) in tabs'>
            <el-tab-pane :label="tab.chartName" :key="tab.chart" :name="tab.id">
              <tab-chart :tab='tab' :key="index" :ref='tab.chart'></tab-chart>
            </el-tab-pane>
          </template>

        </el-tabs>
      </main>
    </template>
  </div>
</template>
<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'
import session from '@/utils/frame/base/sessionStorage'

import screenfull from 'screenfull'

import TabChart from './tab/tabEchart'

export default {
  name: 'formworkChart',
  data() {
    return {
      tabs: [],
      hasLayout: true,
      showTemplate: false,
      showForm: false,
      showTab: false,
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
          code: this.$route.meta.queryId,
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
      },
      activeName: ''
    }
  },
  components: {
    TabChart
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
    this.getTabsName()
    this.hasLayout = this.$route.path.includes('/layout')

    // 保存旧结构
    this.chartOptionBak = Object.assign({}, this.chartOption)
    const response = await request({
      url: '/api/code/report/json',
      method: 'post',
      data: {
        //查询主体
        data: this.$route.meta.queryId,
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
      this.chart = resData.chart

      this.mainData = Object.assign({}, resData.mainData, { api: { chartSearch: '/api/code/report/chartSearch', search: '/api/code/report/reportSearch', export: '/api/code/report/export' } })
      this.tabs.forEach(tab => {
        if (this.mainData.initSearch) {
          tab.initSearch = true
        }
      })
      this.showTemplate = true
      if (this.form.formData && this.form.formData.length > 0) {
        this.showForm = true
      } else {
        //没有查询框
        this.showForm = false
        this.showTab = true
      }
      // if (this.mainData.initSearch) {
      //   this.$nextTick(() => {
      //     this.getList()
      //   })
      // }
    } else {
      this.showError = true
    }
    this.activeName = this.$route.meta.queryId
  },
  methods: {
    getTabsName() {
      if (this.$route.meta.charts) {
        this.$route.meta.charts.forEach(async i => {
          const response = await request({
            url: '/api/code/report/json',
            method: 'post',
            data: {
              //查询主体
              data: i,
              funcModule: this.$t('route.' + this.$route.meta.title),

              funcOperation: '初始'
            }
          })

          if (response.data) {
            this.tabs.push({
              initSearch: false,
              chartName: response.data.chartOptionExtend.tabName,
              id: i,
              chart: 'chart' + i
            })
          } else {
            this.showError = true
          }
        })
      }
    },
    getQueryEtras() {
      const bsQueryExtras = []
      if (this.showForm) {
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
      }
      return bsQueryExtras
    },
    getList() {
      this.tabs.forEach(tab => {
        if (this.$refs[tab.chart] && tab.id === this.activeName) {
          this.$refs[tab.chart][0].getList(this.getQueryEtras())
        }
      })
    },
    handleClick(tab, event) {
      this.activeName = this.tabs[tab.index].id
      this.getList()
    }
  }
}
</script>
