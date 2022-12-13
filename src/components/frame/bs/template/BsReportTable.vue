<template>
  <!-- 下面的主题内容 各个弹出框 -->
  <main :style="{ width: hasLayout ? (clientWidth < 1366 ? (this.sidebar.opened && !app.isScreenFull ? '1163px' : '1323px') : 'auto') : 'auto' }">
    <!-- 顶部按钮 -->
    <div class="top-operate" v-if="mainData.isTopBar">
      <el-row type="flex">
        <slot name="add"></slot>
        <slot name="upload"></slot>
        <div>
          <el-button v-db-click size="mini" @click="refresh" style="margin-right: 3px">
            <svg-icon icon-class="refresh" style="margin-right: 0px"></svg-icon>
          </el-button>
        </div>
        <div v-for="(btn, index) in mainData.topBar" :key="index">
          <template v-if="btn.name !== 'query'">
            <el-dropdown v-if="btn.name === 'more'" @command="triggerEvent">
              <el-button v-db-click size="mini" style="margin-right: 3px">
                <svg-icon :icon-class="btn.iconName || 'set'"></svg-icon>更多按钮
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :key="index" v-for="(b, index) in btn.list" :command="b">
                  <svg-icon :icon-class="b.iconName || (baseEvent[b.name] && baseEvent[b.name].iconName)"></svg-icon>
                  {{ b.i18n || (baseEvent[b.name] && baseEvent[b.name].i18n) }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button v-else-if="btn.name !== 'refresh'" v-db-click size="mini" @click="triggerEvent(btn)" style="margin-right: 3px" v-bind="btn.attrs" :loading="btn.showLoading ? btn.loading : false">
              <svg-icon :icon-class="btn.iconName || (baseEvent[btn.name] && baseEvent[btn.name].iconName) ? btn.iconName || (baseEvent[btn.name] && baseEvent[btn.name].iconName) : 'set'"></svg-icon>
              {{ btn.i18n || (baseEvent[btn.name] && baseEvent[btn.name].i18n) }}
            </el-button>
          </template>
        </div>
      </el-row>
    </div>
    <!-- 图表 -->
    <!-- <div class="bs_echarts" :ref="item.ref" :key="item.ref" v-for="item in mainData.charts"></div> -->
    <template v-if="mainData.showTable">
      <!-- 列设置 -->
      <u-table use-virtual fixed-columns-roll ref="singleTable" :key="key" :tree-config="treeConfig" :height="tableHeight" :row-height="24" :row-id="mainData.table.rowKey || 'id'" :data-changes-scroll-top="false" :pagination-show="false" :border="mainData.reportBorder" highlight-current-row v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-text="加载中..." :show-summary="mainData.table.showSummary" :summary-method="mainData.table.defineSummaryFun || getSummaries" :span-method="mainData.table.defineSpanFun" @current-change="handleSelectRow" @selection-change="handleSelectionChange" :header-cell-style="{background:'#87ceeb'}">
        <u-table-column align="center" type="index" width="50" fixed v-if="mainData.showSerial" label="序号"></u-table-column>
        <u-table-column align="center" type="selection" width="55" :fixed="mainData.table.selectionFixed" v-if="mainData.table.showCheckbox"></u-table-column>
        <slot name="cols" v-if="mainData.table.defineContent"></slot>
        <template v-else>
          <template v-for="(col, index) in formThead">
            <!-- 树列表默认第一列为展开收起列 -->
            <u-table-column align="center" :tree-node="mainData.table.rowKey && index === 0" :key="col.prop" v-if="col.isShow" v-bind="col" :label="col.label" :fixed="col.fixed" :sortable="col.sortable" show-overflow-tooltip>
              <template slot-scope="scope">
                <slot v-if="col.isSlot" :name="col.prop" :row="scope.row" :col="col"></slot>
                <template :style="col.style" v-else>
                  <span v-if="col.formatter">{{ col.formatter(scope.row, scope.column, scope.row[col.prop], scope.$index) }}</span>
                  <span v-else-if="!col.format">{{ scope.row[col.prop] }}</span>
                  <span v-else>{{ dataFormat(col.format.func, scope.row[col.prop], col.format.dict, col.format.dictType, scope.row) }}</span>
                </template>
              </template>
            </u-table-column>
          </template>
        </template>
      </u-table>
      <!-- 底部按钮 -->
      <div class="bottom-operate">
        <div class="bottom-operate-left" v-if="mainData.isColset">
          <el-table-column-set :id="mainData.table.id" :checked="checked" :checkList="tableCols" @change="checkChange" @lockEvent="handleLockChange"></el-table-column-set>
        </div>
        <div class="bottom-operate-right" v-show="emptyTextVisible">
          <svg-icon icon-class="point" style="color: #e6a23c"></svg-icon>暂无数据
        </div>
        <!-- 分页 -->
        <el-pagination v-if="!emptyTextVisible && mainData.bottomBar && mainData.bottomBar.pagination && mainData.bottomBar.pagination.show" small background :layout="mainData.bottomBar.pagination.layout" :current-page="mainData.listQuery.current" :page-sizes="[20, 40, 60, 80, 100]" :page-size="mainData.listQuery.size" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
      </div>
    </template>
    <!-- 编辑弹窗 -->
    <view-form-table v-if="dialogDetailVisible" @closeHandler="dialogHandler" :param="param" :opType="opType" :opMode="opMode"></view-form-table>
  </main>
</template>

<script>
// 调用Vue全局过滤器
import Vue from 'vue'
// vuex辅助函数
import { mapGetters } from 'vuex'
// 提醒
import { confirmTip, notifyInfo, notifySuccess, notifyError } from '@/utils/frame/base/notifyParams'
import { getToken } from '@/utils/frame/base/auth'

// axios访问
import request from '@/utils/frame/base/request'
import axios from 'axios'
import storage from '@/utils/frame/base/localStorage'
import session from '@/utils/frame/base/sessionStorage'
// 导出excel
import exportExcel from '@/utils/frame/base/downloadExcel'

import screenfull from 'screenfull'
export default {
  data() {
    return {
      hasLayout: true,
      maps: new Map(),
      // 树列表配置项
      treeConfig: {
        children: 'children',
        expandAll: this.mainData.table.expandAll
      },
      // 编辑页面参数传值
      param: {},
      // 操作当前行时接口参数 类型：Array/Objct/String
      setData: {
        remark: ''
      },
      // 弹窗类型
      opType: '',
      // 编辑模式：dialog or route
      opMode: '',
      // 列表更新标识
      key: 1,
      funcOperationI18n: '',
      operationMsgInfo: '',
      // 表格高度
      tableHeight: 0,
      // 全部列
      tableCols: [],
      // 经过滤后展示列
      formThead: [],
      // 列设置
      checked: [],
      // 加载标识
      loading: false,
      // 总条数
      total: 0,
      // 显示维护页面显示标识
      editVisible: false,
      // 显示维护页面的类型：是查看还是修改
      dialogType: '',
      // 弹窗唯一标识
      dialogId: '',
      // 当前选中行信息
      currentRow: null,
      // 表格信息
      tableData: [],
      // 是否显示暂无数据
      emptyTextVisible: true,
      // 编辑页控制显示隐藏
      dialogDetailVisible: false,
      // 全局按钮方法
      baseEvent: {
        add: {
          func: this.doAdd,
          iconName: 'add',
          i18n: '新增'
        },
        view: {
          func: this.doView,
          iconName: 'view',
          i18n: '查看'
        },
        update: {
          func: this.doUpdate,
          iconName: 'edit',
          i18n: '修改'
        },
        remove: {
          func: this.doDelete,
          iconName: 'delete',
          i18n: '删除'
        },
        refresh: {
          func: this.refresh,
          iconName: 'refresh',
          i18n: '刷新'
        },
        export: {
          func: this.handleDownload,
          iconName: 'export',
          i18n: '导出'
        },
        set: {
          func: this.doSet,
          iconName: 'set',
          i18n: '设置'
        },
        print: {
          func: this.doPrint,
          iconName: 'print',
          i18n: '打印'
        }
      }
    }
  },
  inject: ['app'],
  provide() {
    return {
      BsTable: this
    }
  },
  props: {
    // 主信息(按钮、表格、API等信息)
    mainData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(['dataDictList', 'sidebar', 'clientWidth', 'clientHeight'])
  },
  watch: {
    clientWidth() {
      this.tableComputed()
    },
    clientHeight() {
      this.tableComputed()
    },
    tableCols: {
      deep: true,
      handler() {
        this.formThead = this.tableCols.filter(i => {
          if (i.checkFlag) {
            return !!+i.checkFlag
          } else {
            return true
          }
        })
        this.key++
        this.$nextTick(() => {
          this.$refs.singleTable.reloadData(this.tableData)
        })
      }
    },
    $route(newVal) {
      if (newVal.params.refresh) {
        this.getList()
      }
    }
  },
  beforeMount() {
    if (this.mainData.topBar) {
      this.mainData.topBar.forEach(v => {
        this.$set(v, 'loading', false)
      })
    }
    // 默认showTable
    if (this.mainData.showTable === undefined) {
      this.mainData.showTable = true
    }
    // 默认后台排序
    if (this.mainData.table.sortable === undefined) {
      this.mainData.table.sortable = 'custom'
    }
    // 列设置
    this.mainData.table.cols.forEach(v => {
      // 根据isShow字段判断是否显示
      if (v.isShow === undefined) {
        v.isShow = true
      }
      // 默认解锁状态
      v.locked = false
      // 默认何种排序根据this.mainData.table.sortable
      v.sortable = v.sortable === false ? false : this.mainData.table.sortable
      this.tableCols.push(v)
    })
    this.formThead = this.tableCols

    //  默认为true
    if (this.mainData.isColset === undefined) {
      this.$set(this.mainData, 'isColset', false)
    }
    if (this.mainData.isColset && this.mainData.table) {
      if (this.mainData.table.id === undefined || this.mainData.table.id === '') {
        this.$set(this.mainData.table, 'id', this.$route.name)
      }
      this.checkChange()
    }
  },
  mounted() {
    if (this.mainData.codeType === 'reportFile') {
      this.parentData = this.$parent.$parent
    } else {
      this.parentData = this.$parent
    }
    if (this.mainData.initSearch !== undefined) {
      if (this.mainData.initSearch) {
        this.getList()
      }
    } else {
      if (process.env.INIT_SEARCH) {
        this.getList()
      }
    }
    if (this.mainData.initCharsts) {
      this.initChart()
    }
    this.hasLayout = this.mainData.hasLayout === undefined ? true : this.mainData.hasLayout
    this.tableComputed()
  },
  methods: {
    refresh(button) {
      if (this.mainData.generateType) {
        if (this.parentData.$refs.bsForm) {
          this.parentData.$refs.bsForm.onSubmit()
        }
      } else {
        this.getList(button)
      }
    },
    // 列表数据请求
    getList(button) {
      this.loading = true
      this.initChart()
      if (button && button.name && button.name === 'search') {
        if (this.parentData.$refs.bsForm) {
          this.parentData.$refs.bsForm.loading = true
        }
      }
      if (this.mainData.api.search !== '') {
        request({
          url: this.mainData.api.search,
          method: 'POST',
          data: this.mainData.listQuery
        })
          .then(response => {
            this.loading = false
            if (this.parentData.$refs.bsForm) {
              this.parentData.$refs.bsForm.loading = false
            }
            if (this.mainData.table.rowKey && !this.mainData.table.expandAll) {
              this.tableData = response.data
            } else {
              this.tableData = response.data
              this.total = response.total
              // 防止动态设置tableHeight时合计栏被遮挡隐藏
              setTimeout(() => {
                this.tableHeight = this.tableHeight - 0.1
              }, 1000)
              this.$emit('initCallback', response)
            }
            if (this.tableData && this.tableData.length > 0) {
              this.emptyTextVisible = false
            } else {
              this.emptyTextVisible = true
            }
            this.$refs.singleTable.reloadData(this.tableData)
          })
          .catch(() => {
            this.loading = false
            if (this.parentData.$refs.bsForm) {
              this.parentData.$refs.bsForm.loading = false
            }
          })
      } else {
        this.loading = false
      }
    },
    // 图表初始化
    initChart() {
      if (this.mainData.charts) {
        this.mainData.charts.forEach(item => {
          request({
            url: item.api,
            method: 'POST',
            data: this.mainData.listQuery
          })
            .then(response => {
              this.loading = false
              const data = response.data

              if (data) {
                if (!Array.isArray(item.legend)) {
                  item.legend = {}
                } else {
                  item.legend = []
                }
                if (data.legend) {
                  item.legend = Object.assign(item.legend, data.legend)
                }
                if (!Array.isArray(item.series)) {
                  item.series = {}
                } else {
                  item.series = []
                }

                if (data.series) {
                  item.series = Object.assign(item.series, data.series)
                }

                if (data.thresholdSeries) {
                  item.series = item.series.concat(data.thresholdSeries)
                }
                if (data.thresholdSeries) {
                  item.series = item.series.concat(data.thresholdSeries)
                }
                if (data.xAxisData) {
                  item.xAxis.data = Object.assign(item.xAxis.data, data.xAxisData)
                }

                this.$echarts.dispose(this.$refs[item.ref][0])
                const chart = this.$echarts.init(this.$refs[item.ref][0], 'light')
                window.onresize = chart.resize
                chart.setOption(item)
              }
            })
            .catch(e => {
              this.showError = true
            })
        })
      }
    },
    // 计算列表高度
    tableComputed() {
      this.tableHeight = 0
    },
    // 按钮事件自定义
    triggerEvent(button) {
      if (button.event && typeof button.event === 'function') {
        button['request'] = request
        button['notify'] = this.$notify
        button['notifySuccess'] = notifySuccess

        button.event(button)
      } else if (this.baseEvent[button.name]) {
        this.baseEvent[button.name].func(button)
      }
    },
    // 返回指定过滤条件结果
    dataFormat(func = 'dataDictFormat', value, list, dictType, row) {
      if (dictType) {
        list = typeof dictType === 'string' ? this.dataDictList[dictType] : dictType(row)
      }
      return Vue.filter(func)(value, list)
    },
    // 是否锁定
    handleLockChange(prop) {
      const arr = []
      this.tableCols.forEach((c, index) => {
        if (c.prop === prop) {
          c.locked = !c.locked
        }
        arr.push(c)
      })
      this.tableCols = arr
    },
    // 列设置
    checkChange() {
      this.checked = []
      request({
        url: '/api/sys/tableConfig/get',
        method: 'POST',
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: '',
          data: this.mainData.table.id || this.$route.name
        }
      })
        .then(res => {
          if (res.data.length === 0) {
            this.tableCols.forEach(col => {
              col.checkFlag = '1'
            })
            this.key++
            this.checked = this.mainData.table.cols.map(v => {
              return v.prop
            })
            this.$nextTick(() => {
              this.$refs.singleTable.reloadData(this.tableData)
            })
          } else {
            res.data.forEach(col => {
              this.tableCols.forEach(c => {
                if (col.itemId === c.prop) {
                  c.checkFlag = col.checkFlag
                  c.sortNo = col.sortNo
                  if (c.checkFlag === '1') {
                    this.checked.push(c.prop)
                  }
                }
              })
            })
            this.tableCols = this.tableCols.sort((obj1, obj2) => {
              const value1 = obj1['sortNo']
              const value2 = obj2['sortNo']
              return value1 - value2
            })
          }
        })
        .catch(() => {})
    },
    // 合计方法
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }

        const values = data.map(item => Number(item[column.property]))
        const filterCol = this.mainData.table.cols.filter(col => col.prop === column.property)[0]

        if (filterCol && filterCol.summary) {
          if (filterCol.format && filterCol.format.func) {
            const value = values.reduce((prev, curr) => {
              const value2 = Number(curr)
              if (!isNaN(value2)) {
                return Number(this.$toolUtil.toDecimal2(prev).add(this.$toolUtil.toDecimal2(curr)))
              } else {
                return Number(this.$toolUtil.toDecimal2(prev))
              }
            }, 0)
            sums[index] = Vue.filter(filterCol.format.func)(value, filterCol.format.dict)
            return
          } else {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return Number(toolUtil.toDecimal2(prev).add(toolUtil.toDecimal2(curr)))
              } else {
                return Number(toolUtil.toDecimal2(prev))
              }
            }, 0)
            return
          }
        }
      })
      return [sums]
    },

    // 前端验证通用方法
    commonValidate(buttonInfo) {
      if (buttonInfo.validate) {
        const result = buttonInfo.validate(this.currentRow)
        if (typeof result === 'boolean' && !result) {
          if (buttonInfo.msg) {
            this.$notify(notifyInfo({ msg: buttonInfo.msg }))
          }
          return false
        } else if (Array.isArray(result) && result.map(v => v.result).includes(false)) {
          const index = result.map(v => v.result).indexOf(false)
          if (result[index].msg) {
            this.$notify(notifyInfo({ msg: result[index].msg }))
          }
          return false
        }
      }
      return true
    },

    // 删除
    doDelete(buttonInfo) {
      if (!this.currentRow || this.currentRow.length === 0) {
        this.$notify(
          notifyInfo({
            msg: '请选择一条数据'
          })
        )
        return
      }
      // 点击权限判断 如果返回为false 则验证不通过
      if (!this.commonValidate(buttonInfo)) return

      // 后端验证
      if (buttonInfo.validateApi) {
        const param = buttonInfo.validateApi(this.currentRow)
        if (param && param.url) {
          request({
            url: param.url,
            method: 'POST',
            data: {
              data: param.data
            }
          })
            .then(response => {
              if (response.status && response.msgText) {
                this.$notify(
                  notifyError({
                    msg: response.msgText
                  })
                )
              } else {
                this.confirmDelete(buttonInfo)
              }
            })
            .catch(() => {})
        }
      } else {
        this.confirmDelete(buttonInfo)
      }
    },
    // 验证通过 确认删除
    confirmDelete(buttonInfo) {
      if (buttonInfo.getParam) {
        this.setData = buttonInfo.getParam(this.currentRow)
      } else if (this.currentRow instanceof Array) {
        this.setData = this.currentRow.map(v => v.id)
      } else {
        this.setData = this.currentRow.id
      }
      this.funcOperationI18n = '删除'
      this.operationMsgInfo = '删除成功'
      confirmTip(this, 'confirmDelete')
        .then(() => {
          this.loading = true
          request({
            url: this.mainData.api.doDelete,
            method: 'POST',
            data: {
              data: this.setData
            }
          })
            .then(response => {
              this.$notify(notifySuccess({ msg: this.operationMsgInfo }))
              this.loading = false
              this.getList()
            })
            .catch(() => {
              this.loading = false
            })
        })
        .catch(() => {})
    },

    // 新增
    doAdd(buttonInfo) {
      // 点击权限判断 如果返回为false 则验证不通过
      if (!this.commonValidate(buttonInfo)) return

      // 后端验证
      if (buttonInfo.validateApi) {
        const param = buttonInfo.validateApi(this.currentRow)
        if (param && param.url) {
          request({
            url: param.url,
            method: 'POST',
            data: {
              data: param.data
            }
          })
            .then(response => {
              if (response.status && response.msgText) {
                this.$notify(
                  notifyError({
                    msg: response.msgText
                  })
                )
              } else {
                this.confirmAdd(buttonInfo)
              }
            })
            .catch(() => {})
        }
      } else {
        this.confirmAdd(buttonInfo)
      }
    },
    // 验证通过 确认新增
    confirmAdd(buttonInfo) {
      // 编辑页弹窗组件注册
      // 注册组件

      if (buttonInfo.type === 'dialog') {
        Vue.component('view-form-table', buttonInfo.component)
        if (buttonInfo.getParam) {
          this.param = buttonInfo.getParam(this.currentRow)
        }
        this.opType = 'add'
        this.opMode = buttonInfo.type
        this.dialogDetailVisible = true
      }
    },

    // 查看
    doView(buttonInfo) {
      if (!this.currentRow || this.currentRow.length === 0) {
        this.$notify(
          notifyInfo({
            msg: '请选择一条数据'
          })
        )
        return
      }
      // 点击权限判断 如果返回为false 则验证不通过
      if (!this.commonValidate(buttonInfo)) return

      // 后端验证
      if (buttonInfo.validateApi) {
        const param = buttonInfo.validateApi(this.currentRow)

        if (param && param.url) {
          request({
            url: param.url,
            method: 'POST',
            data: {
              data: param.data
            }
          })
            .then(response => {
              if (response.status && response.msgText) {
                this.$notify(
                  notifyError({
                    msg: response.msgText
                  })
                )
              } else {
                this.confirmView(buttonInfo)
              }
            })
            .catch(() => {})
        }
      } else {
        this.confirmView(buttonInfo)
      }
    },
    // 验证通过 确认查看
    confirmView(buttonInfo) {
      if (buttonInfo.type === 'route') {
        this.$router.push(buttonInfo.routeInfo(this.currentRow, this.mainData.listQuery))
      } else {
        Vue.component('view-form-table', buttonInfo.component)
        if (buttonInfo.getParam) {
          this.param = buttonInfo.getParam(this.currentRow)
        } else {
          this.param = this.currentRow
        }
        this.opType = 'view'
        this.opMode = buttonInfo.type
        this.dialogDetailVisible = true
      }
    },

    // 更新
    doUpdate(buttonInfo) {
      if (!this.currentRow || this.currentRow.length === 0) {
        this.$notify(
          notifyInfo({
            msg: '请选择一条数据'
          })
        )
        return
      }

      // 前端验证
      if (!this.commonValidate(buttonInfo)) return

      // 后端验证
      if (buttonInfo.validateApi) {
        const param = buttonInfo.validateApi(this.currentRow)
        if (param && param.url) {
          request({
            url: param.url,
            method: 'POST',
            data: {
              data: param.data
            }
          })
            .then(response => {
              if (response.status && response.msgText) {
                this.$notify(
                  notifyError({
                    msg: response.msgText
                  })
                )
              } else {
                this.confirmUpdate(buttonInfo)
              }
            })
            .catch(() => {})
        }
      } else {
        this.confirmUpdate(buttonInfo)
      }
    },
    // 验证通过 确认更新
    confirmUpdate(buttonInfo) {
      if (buttonInfo.type === 'dialog') {
        Vue.component('view-form-table', buttonInfo.component)
        if (buttonInfo.getParam) {
          this.param = buttonInfo.getParam(this.currentRow)
        } else {
          this.param = this.currentRow
        }
        this.opType = buttonInfo.opType || 'update'
        this.opMode = buttonInfo.type
        this.dialogDetailVisible = true
      }
    },

    // 设置
    doSet(buttonInfo) {
      if (!this.currentRow || this.currentRow.length === 0) {
        this.$notify(
          notifyInfo({
            msg: '请选择一条数据'
          })
        )
        return
      }
      // 点击权限判断 如果返回为false 则验证不通过
      if (!this.commonValidate(buttonInfo)) return

      // 后端验证
      if (buttonInfo.validateApi) {
        const param = buttonInfo.validateApi(this.currentRow)
        if (param && param.url) {
          request({
            url: param.url,
            method: 'POST',
            data: {
              data: param.data
            }
          })
            .then(response => {
              if (response.status && response.msgText) {
                this.$notify(
                  notifyError({
                    msg: response.msgText
                  })
                )
              } else {
                this.confirmSet(buttonInfo)
              }
            })
            .catch(() => {})
        }
      } else {
        this.confirmSet(buttonInfo)
      }
    },
    // 设置操作
    confirmSet(buttonInfo) {
      if (buttonInfo.getParam) {
        this.setData = buttonInfo.getParam(this.currentRow)
      } else if (this.currentRow instanceof Array) {
        this.setData = this.currentRow.map(v => v.id)
      } else {
        this.setData = this.currentRow.id
      }
      confirmTip(this, 'confirmSet')
        .then(() => {
          this.loading = true
          request({
            url: buttonInfo.url || this.mainData.api.set,
            method: 'POST',
            data: {
              data: this.setData
            }
          })
            .then(response => {
              this.$notify(notifySuccess({ msg: this.operationMsgInfo }))
              this.loading = false
              this.getList()
            })
            .catch(() => {
              this.loading = false
            })
        })
        .catch(() => {})
    },
    // 打印
    doPrint(buttonInfo) {
      if (!this.currentRow || this.currentRow.length === 0) {
        this.$notify(
          notifyInfo({
            msg: '请选择一条数据'
          })
        )
        return
      }
      Vue.component('view-form-table', () => import('@/components/frame/bs/template/dialog/BsDialogPrint.vue'))
      if (buttonInfo.getParam) {
        this.param = buttonInfo.getParam(this.currentRow)
        this.dialogDetailVisible = true
      }
    },
    // 编辑关闭回调
    dialogHandler(param, query) {
      if (param) {
        this.getList()
      }
      this.dialogDetailVisible = false
    },
    // 导出excel
    exportfunc() {
      this.loading = true
      const param = Object.assign({}, this.mainData.listQuery, {
        isPage: false
      })
      return request({
        url: this.mainData.api.search,
        method: 'POST',
        data: param
      })
    },
    callBackfunc() {
      this.mainData.listQuery.isPage = true
      this.loading = false
    },
    apiDownLoad(buttonInfo) {
      const param = Object.assign({}, this.mainData.listQuery, {
        isPage: false,
        funcOperation: '导出'
      })
      param.excelInfo = {}
      if (buttonInfo.getParam) {
        param.excelInfo = buttonInfo.getParam()
      }
      if (!param.excelInfo['name']) {
        param.excelInfo['name'] = this.$route.meta.title
      }
      const titleData = []
      this.mainData.table.cols.map(col => {
        if (col.label) {
          titleData.push({
            name: col.label,
            prop: col.prop,
            align: col.align,
            format: col.format
          })
        }
      })
      param.excelInfo.excelTitleInfoList = titleData

      axios({
        method: 'post',
        url: process.env.BASE_API + this.mainData.api.export,
        data: param,
        headers: {
          Authorization: 'Bearer ' + getToken(),
          lang: storage.get('language') || 'zh',
          module: session.get('auditModule') || ''
        },
        responseType: 'blob'
      })
        .then(response => {
          if (!response.data) {
          } else {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', param.excelInfo['name'] + '.xlsx')
            document.body.appendChild(link)
            link.click()
            link.remove()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleDownload(buttonInfo) {
      if (buttonInfo && buttonInfo.type && buttonInfo.type === 'api') {
        // 后台导出
        this.apiDownLoad(buttonInfo)
      } else {
        exportExcel({
          fileName: this.$route.meta.title,
          header: this.mainData.table.cols.map(col => {
            if (col.label) return col.label
          }),
          filterVal: this.mainData.table.cols.map(col => {
            if (col.format) {
              return {
                val: col.prop,
                dicCode: col.format.dictType && typeof col.format.dictType === 'string' ? this.dataDictList[col.format.dictType] : col.format.dict,
                func: col.format.func || 'dataDictFormat'
              }
            } else {
              return col.prop
            }
          }),
          exportfunc: this.exportfunc,
          callBackfunc: this.callBackfunc
        })
      }
    },
    // 页码跳转、N条每页
    handleSizeChange(val) {
      this.mainData.listQuery.size = val
      this.getList()
    },
    // 点击翻页
    handleCurrentChange(val) {
      this.mainData.listQuery.current = val
      this.getList()
    },
    // 后台排序
    handleSortChange({ column, prop, order }) {
      const sortCol = this.mainData.table.cols.filter(col => col.prop === prop)[0]
      const queryProp = sortCol.queryProp || sortCol.sortProp || prop
      if (this.mainData.table.sortable && this.mainData.table.sortable === 'custom') {
        if (order) {
          const asc = order === 'ascending' ? '.asc' : '.desc'
          this.$parent.form.listQuery.sortString = queryProp + asc
          this.getList()
        } else {
          this.$parent.form.listQuery.sortString = ''
          if (this.$parent.form.listQuery.defaultSortString) {
            this.getList()
          }
        }
      }
    },
    // 单选
    handleSelectRow(val) {
      if (!this.mainData.table.showCheckbox) this.currentRow = val
    },
    // 多选
    handleSelectionChange(val) {
      if (this.mainData.table.showCheckbox) this.currentRow = val
    }
  }
}
</script>
