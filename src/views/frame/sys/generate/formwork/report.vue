<template>
  <div class="bs-new-container app-container">
    <el-alert title="页面初始化错误,请联系技术人员" v-if="showError" type="error" show-icon>
    </el-alert>
    <template v-if='showTemplate'>
      <bs-extras-form ref='bsForm' :form='form'></bs-extras-form>

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

      <bs-table v-if='isPage' ref='bsTable' :mainData='mainData'>
        <template v-if='slotNames' v-for='name in slotNames' :slot='name' slot-scope='scope'>
          <component :key='name' v-bind:is='name' :scope='scope'></component>
        </template>

      </bs-table>

      <bs-lazy-table v-else ref='bsTable' :mainData='mainData'>
      </bs-lazy-table>
    </template>
  </div>
</template>
<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'

export default {
  name: 'formworkReport',
  data() {
    return {
      showTemplate: false,
      isPage: true,
      hasLayout: true,
      showError: false,
      showExplain: false,
      slotNames: [],
      form: {
        listQuery: {
          code: this.$route.params.id || this.$route.meta.title.replace('m', ''),
          current: 1,
          size: 20,
          isPage: true,
          camelToUnderlineFlg: true,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: '',
          data: {}
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

  mounted() {
    this.$nextTick(() => {
      const elApp = document.getElementById('app')
      if (elApp && !this.hasLayout) {
        elApp.style['overflow-y'] = 'auto'
      }
    })
  },
  methods: {
    branch(value) {
      return value
        .replace(/\r\n/g, '<br/>')
        .replace(/\n/g, '<br/>')
        .replace(/\s/g, '&nbsp;')
    }
  },
  async created() {
    this.hasLayout = this.$route.path.includes('/layout')
    this.mainData.hasLayout = this.hasLayout
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
      this.explainData = Object.assign({}, this.explainData, resData.explainData)
      this.mainData = Object.assign({ generateType: true, hasLayout: this.hasLayout }, resData.mainData, {
        api: {
          search: '/api/code/report/reportSearch',
          export: '/api/code/report/export'
        }
      })
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
      this.isPage = this.form.listQuery.isPage
      if (this.mainData.initSearch) {
        this.$nextTick(() => {
          this.$refs.bsTable.getList()
        })
      }
    } else {
      this.showError = true
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
