<template>
  <div class="bs-new-container app-container">
    <header id="elHead" :style="{ width: clientWidth < 1366 && !app.isScreenFull ? (this.sidebar.opened ? '1163px' : '1323px') : 'auto' }">
      <el-form ref="queryForm" @submit.native.prevent label-position="left" :rules="rules" :inline="true" :model="form.listQuery.data" class="header-form-inline">
        <el-row :gutter="20" style="width: 94%">
          <!-- 查询条件 -->
          <template v-for="(f, index) in expandStatus ? fleExpCfg.expQryList : fleExpCfg.expQryList.slice(0, 4)">
            <el-col :span="8" :key="index">
              <el-form-item v-if="f.itemType === 'DATE'" :label="f.label" :required="f.requiredFlag === '1'" :prop="f.itemProp">
                <el-date-picker v-model="form.listQuery.data[f.itemProp]" size="mini" format="yyyy-MM-dd" value-format="yyyyMMdd" />
              </el-form-item>
              <el-form-item v-else-if="f.itemType === 'BASEDATA'" :label="f.label" :prop="f.itemProp">
                <bs-base-select v-model="form.listQuery.data[f.itemProp]" size="mini" :attrs="{ data: f.format, clearable: true, filterable: true }" />
              </el-form-item>
              <el-form-item v-else-if="f.itemType === 'DATADICT'" :label="f.label" :prop="f.itemProp">
                <bs-base-select v-model="form.listQuery.data[f.itemProp]" size="mini" :attrs="{ datadict: f.format, clearable: true, filterable: true }" />
              </el-form-item>
              <el-form-item v-else-if="f.itemType === 'DATE_RANGE'" :label="f.label" :prop="f.itemProp[0]">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-date-picker v-model="form.listQuery.data[f.itemProp[0]]" size="mini" format="yyyy-MM-dd" value-format="yyyyMMdd" @change="(date) => changeDate(date, f, 'S')" />
                  </el-col>
                  <el-col :span="2" align="center">~</el-col>
                  <el-col :span="11">
                    <el-date-picker v-model="form.listQuery.data[f.itemProp[1]]" size="mini" format="yyyy-MM-dd" value-format="yyyyMMdd" @change="(date) => changeDate(date, f, 'E')" />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item v-else :label="f.label" :prop="f.itemProp">
                <input-validate v-model="form.listQuery.data[f.itemProp]" size="mini" :attrs="{ clearable: true }" />
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <!-- 右侧搜索按钮 -->
        <div class="search-btn" v-permission="['query']">
          <el-button type="primary" :loading="loading" icon="el-icon-search" @click="onSubmit" v-db-click>
            {{ $t('biz.lbl.search') }}
          </el-button>
        </div>
        <!-- 展开收起 -->
        <div class="expand" v-show="fleExpCfg.expQryList.length > 4" @click="expand">
          <i v-if="expandStatus" class="el-icon-arrow-up" />
          <i v-else class="el-icon-arrow-down" />
        </div>
      </el-form>
    </header>
    <main :style="{ width: clientWidth < 1366 ? (this.sidebar.opened && !app.isScreenFull ? '1163px' : '1323px') : 'auto' }">
      <div class="top-operate" ref="btnWrapper">
        <el-row type="flex" ref="btnContainer">
          <div>
            <el-button v-db-click size="mini" @click="doRefresh" style="margin-right: 3px">
              <svg-icon icon-class="refresh" style="margin-right: 0px" />
            </el-button>
          </div>
          <div>
            <el-button v-db-click size="mini" @click="doExport" style="margin-right: 3px" v-permission="'export'" :loading="loading">
              <svg-icon icon-class="export" />
              {{ $t('biz.btn.export') }}
            </el-button>
          </div>
        </el-row>
      </div>
      <ux-grid :merge-cells="mergeCells" :row-class-name="rowClassName" fixed-columns-roll ref="singleTable" border v-loading="tableLoading" element-loading-spinner="el-icon-loading" :row-height="24" :height="tableHeight">
        <ux-table-column v-for="(col, colIdx) in fleExpCfg.colList" :key="colIdx" :title="col.label" show-overflow="tooltip" resizable :field="'C' + colIdx" :align="getColumnAlign(col)" header-align="center" :width="getColumnWidth(col)" />
      </ux-grid>
    </main>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import request from '@/utils/frame/base/request'
import fileExportUtil from '@/utils/frame/base/fileExportUtil.js'
import screenfull from 'screenfull'
export default {
  data() {
    return {
      loading: false,
      tableLoading: false,
      tableHeight: 0,
      rules: {},
      expandStatus: process.env.EXPAND_FLG,
      mergeCells: [],
      form: {
        listQuery: {
          data: {}
        }
      },
      fleExpCfg: {
        expQryList: [],
        colList: []
      }
    }
  },
  inject: ['app'],
  computed: {
    ...mapGetters(['sidebar', 'clientWidth', 'clientHeight'])
  },
  watch: {
    clientWidth() {
      this.tableComputed()
    },
    clientHeight() {
      this.tableComputed()
    },
    tagViewVisible() {
      this.tableComputed()
    }
  },
  created() {
    const moduleCode = this.$route.meta.bpmModule
    request({
      url: '/api/sys/fle/exp/getExpCfgByModule',
      method: 'post',
      data: {
        funcModule: '导出共通',
        funcOperation: '按模块导出excel',
        data: moduleCode
      }
    }).then(response => {
      if (response.status) {
        if (Array.isArray(response.data.expQryList)) {
          for (const expQry of response.data.expQryList) {
            expQry.itemProp = expQry.itemProp.trim()
            if (expQry.itemType === 'DATE_RANGE') {
              let idx = expQry.itemProp.indexOf(',')
              const propSt = expQry.itemProp.substring(0, idx).trim()
              const propEd = expQry.itemProp.substring(idx + 1).trim()
              expQry.itemProp = [propSt, propEd]
              expQry.attrs = {}
              if (expQry.requiredFlag === '1') {
                this.rules[propSt] = [{ required: true, trigger: 'change' }]
                this.rules[propEd] = [{ required: true, trigger: 'change' }]
              }
              if (expQry.defaultValue !== null && expQry.defaultValue !== undefined && expQry.defaultValue !== '') {
                idx = expQry.defaultValue.indexOf(',')
                if (idx >= 0) {
                  const dftValSt = expQry.defaultValue.substring(0, idx).trim()
                  const dftValEd = expQry.defaultValue.substring(idx + 1).trim()
                  this.form.listQuery.data[propSt] = this.getDefaultDate(dftValSt)
                  this.form.listQuery.data[propEd] = this.getDefaultDate(dftValEd)
                } else {
                  const dateSt = new Date()
                  const dateEd = new Date()
                  dateSt.setTime(dateSt.getTime() - 1000 * 60 * 60 * 24 * 45)
                  dateEd.setTime(dateEd.getTime() + 1000 * 60 * 60 * 24 * 45)
                  this.$set(this.form.listQuery.data, propSt, this.getDefaultDate('SYSDATE - 45'))
                  this.$set(this.form.listQuery.data, propEd, this.getDefaultDate('SYSDATE + 45'))
                }
              } else {
                const dateSt = new Date()
                const dateEd = new Date()
                dateSt.setTime(dateSt.getTime() - 1000 * 60 * 60 * 24 * 45)
                dateEd.setTime(dateEd.getTime() + 1000 * 60 * 60 * 24 * 45)
                this.$set(this.form.listQuery.data, propSt, this.getDefaultDate('SYSDATE - 45'))
                this.$set(this.form.listQuery.data, propEd, this.getDefaultDate('SYSDATE + 45'))
              }
            } else {
              if (expQry.requiredFlag === '1') {
                this.rules[expQry.itemProp] = [{ required: true, trigger: 'change' }]
              }
              if (expQry.itemType === 'DATE') {
                this.$set(this.form.listQuery.data, expQry.itemProp, this.getDefaultDate(expQry.defaultValue))
              } else {
                this.$set(this.form.listQuery.data, expQry.itemProp, this.getDefaultStr(expQry.defaultValue))
              }
            }
            this.fleExpCfg.expQryList.push(expQry)
          }
        }
        if (Array.isArray(response.data.paramList) && response.data.paramList.length > 0) {
          const colList = response.data.paramList[0].colList
          if (Array.isArray(colList)) {
            for (const col of colList) {
              this.fleExpCfg.colList.push(col)
            }
          }
        }
        this.$nextTick(() => {
          this.tableComputed()
        })
      }
    })
  },
  methods: {
    getDefaultStr(expression) {
      if (expression === null || expression === undefined || expression === '') {
        return null
      }
      return expression
    },
    getDefaultDate(expression) {
      if (expression === null || expression === undefined) {
        return null
      }
      expression = expression.trim()
      if (expression === '') {
        return null
      }
      if (expression.startsWith('SYSDATE')) {
        const date = new Date()
        const addon = expression.substring(7).trim()
        if (addon !== '') {
          const opt = addon.substring(0, 1)
          const num = parseInt(addon.substring(1).trim())
          if (num > 0) {
            if (opt === '+') {
              date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * num)
            } else if (opt === '-') {
              date.setTime(date.getTime() - 1000 * 60 * 60 * 24 * num)
            }
          }
        }
        expression = (date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()).toString()
      }
      return expression
    },
    getColumnAlign(col) {
      if (col.propertiesType === 'NUM' || col.propertiesType === 'WEIGHT' || col.propertiesType === 'PRICE' || col.propertiesType === 'MONEY' || col.propertiesType === 'EXPRICE' || col.propertiesType === 'TAXRATE' || col.propertiesType === 'PERCENT' || col.propertiesType === 'INTEGER' || col.propertiesType === 'EXCHANGE_RATE') {
        return 'right'
      } else if (col.propertiesType === 'DATE' || col.propertiesType === 'DATETIME' || col.propertiesType === 'DATADICT') {
        return 'center'
      } else {
        return 'left'
      }
    },
    getColumnWidth(col) {
      if (col.colWidth) {
        return col.colWidth / 25
      } else if (col.propertiesType === 'DATE') {
        return 90
      } else if (col.propertiesType === 'DATETIME') {
        return 150
      } else if (col.propertiesType === 'NUM' || col.propertiesType === 'WEIGHT' || col.propertiesType === 'PRICE' || col.propertiesType === 'MONEY' || col.propertiesType === 'EXPRICE' || col.propertiesType === 'TAXRATE' || col.propertiesType === 'PERCENT' || col.propertiesType === 'INTEGER' || col.propertiesType === 'EXCHANGE_RATE') {
        return 150
      } else {
        return 180
      }
    },
    onSubmit() {
      this.$refs.queryForm.validate(valid => {
        if (valid) {
          this.getList({ name: 'search' })
        } else {
          return false
        }
      })
    },
    expand() {
      this.expandStatus = !this.expandStatus
      this.$nextTick(() => {
        this.tableComputed()
      })
    },
    doRefresh() {
      if (!this.loading) {
        this.onSubmit()
      }
    },
    tableComputed() {
      const elHead = document.getElementById('elHead')
      let getElHeadHeight = 0
      // 是否存在头部表单
      if (elHead) {
        getElHeadHeight = window.getComputedStyle(elHead).height.split('px')[0] * 1
      } else {
        getElHeadHeight -= 5
      }
      // 是否最大化
      if (screenfull.isFullscreen) {
        getElHeadHeight -= 76
        // 最大化时是否显示标签栏
        if (this.tagViewVisible) {
          getElHeadHeight += 26
        }
      }
      getElHeadHeight -= 26
      this.tableHeight = this.clientWidth < 1366 ? this.clientHeight - getElHeadHeight - 188 : this.clientHeight - getElHeadHeight - 172
      console.log(this.tableHeight)
    },
    rowClassName(row, rowIndex) {
      return row.row._bs_SumRowFlg ? 'success-row' : null
    },
    changeDate(date, f, type) {
      console.log(f)
    },
    doExport() {
      this.loading = true
      const moduleCode = this.$route.meta.bpmModule
      request({
        url: '/api/sys/fle/exp/expByModule',
        method: 'post',
        timeout: 600000,
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {
            moduleCode: moduleCode,
            param: this.form.listQuery.data,
            options: {}
          }
        }
      })
        .then(response => {
          if (response.status) {
            fileExportUtil.downloadTempfile(response.data.filePath, response.data.fileName)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    getList(param) {
      this.tableLoading = true
      this.loading = true
      const moduleCode = this.$route.meta.bpmModule
      request({
        url: '/api/sys/fle/exp/getRptDataListByModule',
        method: 'POST',
        timeout: 600000,
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {
            moduleCode: moduleCode,
            param: this.form.listQuery.data
          }
        }
      })
        .then(response => {
          this.mergeCells.splice(0)
          this.$refs.singleTable.reloadData([])
          this.$nextTick(() => {
            this.$refs.singleTable.reloadData(response.data.dataList)
            for (const mergeInfo of response.data.mergeList) {
              this.mergeCells.push({
                row: mergeInfo.row,
                col: mergeInfo.col,
                rowspan: mergeInfo.rowCnt,
                colspan: 1
              })
            }
          })
        })
        .finally(() => {
          this.tableLoading = false
          this.loading = false
        })
    }
  }
}
</script>


<style lang="scss" scope>
tr.el-table__row.success-row,
tr.el-table__row.el-table__row--striped.success-row td {
  background: #fff4e9 !important;
}
.elx-table .elx-body--column.col--ellipsis,
.elx-table .elx-footer--column.col--ellipsis,
.elx-table .elx-header--column.col--ellipsis,
.elx-table.elx-editable .elx-body--column {
  line-height: 24px !important;
  height: 24px !important;
  border-right: 1px solid var(--contentBorderColor) !important;
  border-bottom: 1px solid var(--contentBorderColor) !important;
}
.elx-table .elx-table--header-wrapper .elx-table--header-border-line {
  border-bottom: 1px solid var(--contentBorderColor) !important;
}
.elx-table {
  border: 1px solid var(--contentBorderColor) !important;
  border-bottom: 0 !important;
}
.elx-table td {
  padding: 0 !important;
  border-color: var(--contentBorderColor) !important;
  cursor: pointer;
}
.elx-table .elx-table--body tr.row--stripe td {
  background: #fafafa !important;
}

// 表头颜色
.elx-table th {
  background: var(--thColor);
  border-color: var(--contentBorderColor) !important;
  color: #666666;
}
.elx-table,
.elx-table.size--medium {
  font-size: 12px;
  color: #606266;
}
.elx-table .elx-header--column.col--ellipsis > .elx-cell {
  display: inline-grid;
  text-align: center;
}
.elx-table.border--full .elx-body--column,
.elx-table.border--full .elx-footer--column,
.elx-table.border--full .elx-header--column {
  background-image: none !important;
}
.elx-table .elx-table--body tr.elx-body--row.success-row td,
.elx-table .elx-table--body tr.elx-body--row.row--stripe.success-row td {
  background: #fff4e9 !important;
}
</style>
