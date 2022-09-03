<template>
  <div v-el-drag-dialog class='bs-container dialog-wrapper'>
    <div ref='formTableDialog' class='dialog-container' type='formTableDialog'>
      <!-- 头部 -->
      <title-contain :titleName='dialog.titleName' @screenChange="setTableHeight" @TitleFun="$emit('closeDialog')" />

      <!-- 内容 -->
      <header ref='formTableDialogHeader' style='border-radius:5px;'>
        <el-form ref='queryForm' @submit.native.prevent label-position="left" :rules='rules' :inline="true" :model="listQuery.data" class='header-form-inline'>
          <el-row :gutter="20" style='width:94%;'>
            <template v-for='(f, index) in dialog.formData'>
              <el-col :span="f.attrs && f.attrs.cols ? f.attrs.cols * 8 : 8" :key='index' v-if='f.isShow !== false'>
                <!-- 日期 -->
                <el-form-item v-if='f.type === "date"' :required='Array.isArray(f.props) && Array.isArray(f.validate)' :label="$t(f.label)" :prop='f.prop'>
                  <template v-if='Array.isArray(f.props)'>
                    <el-row :gutter="0">
                      <el-col :span="11">
                        <el-date-picker v-model="listQuery.data[f.props[0]]" v-bind='f.attrs' @change="changeStartTime" :picker-options='dateStartBefore' :type="f.type" :placeholder="$t('biz.placeholder.dateInput')">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" align='center'>~</el-col>
                      <el-col :span="11">
                        <el-date-picker v-model="listQuery.data[f.props[1]]" v-bind='f.attrs' @change="changeEndTime" :picker-options='dateEndBefore' :type="f.type" :placeholder="$t('biz.placeholder.dateInput')">
                        </el-date-picker>
                      </el-col>
                    </el-row>
                  </template>
                  <template v-else>
                    <template v-if="f.attrs.type === 'start'">
                      <el-date-picker v-model="listQuery.data[f.prop]" @change="(date) => { changeStartTime(date, f.attrs.pickEnd) }" :picker-options='Object.assign(func.getDefaultPickerOptions(), f.attrs.pickStart ? datePick[f.attrs.pickStart] : datePick.dateStartBefore)' v-bind='f.attrs' :type="f.type" :placeholder="$t('biz.placeholder.dateInput')">
                      </el-date-picker>
                    </template>
                    <template v-else-if="f.attrs.type === 'end'">
                      <el-date-picker v-model="listQuery.data[f.prop]" @change="(date) => { changeEndTime(date, f.attrs.pickStart) }" :picker-options='Object.assign(func.getDefaultPickerOptions(), f.attrs.pickEnd ? datePick[f.attrs.pickEnd] : datePick.dateEndBefore)' v-bind='f.attrs' :type="f.type" :placeholder="$t('biz.placeholder.dateInput')">
                      </el-date-picker>
                    </template>
                    <template v-else>
                      <el-date-picker v-model="listQuery.data[f.prop]" v-bind='f.attrs' :type="f.type" :picker-options='Object.assign(func.getDefaultPickerOptions(), f.attrs.pickerOptions ? f.attrs.pickerOptions : {})' :placeholder="$t('biz.placeholder.dateInput')" @change='v => { triggerEvent(v, f) }'>
                      </el-date-picker>
                    </template>
                  </template>
                </el-form-item>
                <!-- 单选框 -->
                <el-form-item v-else-if='f.type === "radio"' :label="$t(f.label)">
                  <el-radio-group v-model="listQuery.data[f.prop]">
                    <el-radio v-for='item in f.list' :key="item.value" :label="item.value" v-bind='f.attrs'>{{item.label}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <!-- 多选框 -->
                <el-form-item v-else-if='f.type === "checkbox"' :label="$t(f.label)">
                  <el-checkbox-group v-model="listQuery.data[f.prop]">
                    <el-checkbox v-for='item in f.list' :key="item.value" :label="item.value" v-bind='f.attrs'>{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <!-- 数值区间 -->
                <el-form-item v-else-if='f.type === "numberInterval"' :label="$t(f.label)">
                  <el-row :gutter="0">
                    <el-col :span="11">
                      <input-formatter :min='f.attrs.startMin' :max='f.attrs.startMax !== undefined ? f.attrs.startMax : listQuery.data[f.props[1]]' v-model="listQuery.data[f.props[0]]" v-bind='f.attrs' size="mini"></input-formatter>
                    </el-col>
                    <el-col :span="2" align='center'>~</el-col>
                    <el-col :span="11">
                      <input-formatter :min='f.attrs.endMin !== undefined ? f.attrs.endMin : listQuery.data[f.props[0]]' :max='f.attrs.endMax' v-model="listQuery.data[f.props[1]]" v-bind='f.attrs' size="mini"></input-formatter>
                    </el-col>
                  </el-row>
                </el-form-item>
                <!-- 下拉输入 -->
                <el-form-item v-else :label="$t(f.label)" :prop='f.prop'>
                  <!-- 字典码表 -->
                  <el-select v-if='f.list' v-model="listQuery.data[f.prop]" v-bind='f.attrs' v-on='f.event' :placeholder="$t('biz.placeholder.choose')">
                    <el-option v-for="item in f.list" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  <!-- 公用组件 -->
                  <component v-else :is='f.element' v-model='listQuery.data[f.prop]' v-bind='f.attrs' v-on='f.event' :attrs='f.attrs'></component>
                </el-form-item>
              </el-col>
            </template>
            <!-- 更多 -->
            <template>
              <el-col :span="6" v-for='item in items' :key='item.bind' class='el-form-item-more'>
                <div class='el-form-item-more-left'>
                  <el-select clearable v-model="extraQuery[item.bind].label" filterable :placeholder="$t('biz.placeholder.choose')" @change='handleExtraQueryChange'>
                    <el-option v-for='i in item.list' :label="i.label" :value="i.prop" :key="i.prop" :disabled="extraChoice.includes(i.prop)"></el-option>
                  </el-select>
                </div>
                <div class='el-form-item-more-right'>
                  <el-input v-model='extraQuery[item.bind].value'></el-input>
                </div>
              </el-col>
              <el-col :span="6" v-if='dialog.moreShowFlg && addQueryConditionVisible'>
                <span class='more-query' @click='addQueryCondition'>查询扩展&nbsp;+</span>
              </el-col>
            </template>
          </el-row>
          <!-- 右侧搜索按钮 -->
          <div class="search-btn" v-permission="['query']">
            <el-button type="primary" :loading="loading" @click="getList" v-db-click>
              {{$t('biz.lbl.search')}}
            </el-button>
          </div>
        </el-form>
      </header>

      <main>
        <u-table use-virtual fixed-columns-roll :big-data-checkbox="true" :row-height="24" stripe highlight-current-row :row-key='getRowKey' class='table-content' ref="singleTable" :data-changes-scroll-top='false' v-loading="loading" element-loading-spinner="el-icon-loading" style="border:1px solid #ebeef5;" :element-loading-text="$t('route.load')" :height='tableHeight' @selection-change="handleSelectionChange" @current-change="handleSelectRow" @row-click='handleClick' @sort-change="handleSortChange" @row-dblclick="handleDblClick">
          <u-table-column align='center' type="index" fixed="left" width="50" :label='$t("table.id")'></u-table-column>
          <u-table-column type="selection" width="55" :reserve-selection='true' align="center" :fixed="dialog.mainData.table.selectionFixed" v-if="dialog.mainData.table.showCheckbox"></u-table-column>
          <template v-for='col in tableCols'>
            <u-table-column v-if='col.isShow' :key='col.prop' v-bind='col' :label='$t(col.label)' :sortable='dialog.mainData.table.sortable && col.sortable' show-overflow-tooltip>
              <template slot-scope='scope'>
                <slot v-if="col.isSlot" :name="col.prop" :row='scope.row'></slot>
                <div :style='col.style' v-else>
                  <span v-if='col.formatter'>{{ col.formatter(scope.row, scope.column, scope.row[col.prop], scope.$index) }}</span>
                  <span v-else-if='!col.format'>{{ scope.row[col.prop] }}</span>
                  <span v-else>{{ dataFormat(col.format.func, scope.row[col.prop], col.format.dict,col.format.dictType) }}</span>
                </div>
              </template>
            </u-table-column>
          </template>
        </u-table>
        <!-- 底部按钮 -->
        <div class='bottom-operate' v-if='dialog.bottomBar'>
          <div class="bottom-operate-left" v-show='emptyTextVisible'>
            <svg-icon icon-class="point" style='color:#E6A23C'></svg-icon>{{$t('table.emptyText')}}
          </div>
          <!-- 分页 -->
          <el-pagination v-if='!emptyTextVisible' small background layout="total,sizes,prev, pager, next" :current-page="listQuery.current" :page-sizes="[20, 40, 60, 80, 100]" :page-size="listQuery.size" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
        <!-- :data="linkTableData" -->
        <u-table v-if='dialog.mainData.linkTable' stripe border class='table-content' ref="linkTable" highlight-current-row v-loading="loading" element-loading-spinner="el-icon-loading" style="border:1px solid;margin-top:3px;" :element-loading-text="$t('route.load')" :height='150' @selection-change="handleSelectionChangeLv2" @current-change="handleSelectRowLv2" @row-click='handleClickLv2' @row-dblclick="handleDblClick">
          <u-table-column align='center' type="index" fixed="left" width="50" :label='$t("table.id")'></u-table-column>
          <u-table-column type="selection" width="55" align="center" :fixed="dialog.mainData.table.selectionFixed" v-if="dialog.mainData.table.showCheckbox"></u-table-column>
          <template v-for='col in tableColsLv2'>
            <u-table-column v-if='col.isShow' :key='col.prop' v-bind='col' :label='$t(col.label)' :sortable='dialog.mainData.table.sortable && col.sortable' show-overflow-tooltip>
              <template slot-scope='scope'>
                <slot v-if="col.isSlot" :name="col.prop" :row='scope.row'></slot>
                <div :style='col.style' v-else>
                  <span v-if='col.formatter'>{{ col.formatter(scope.row, scope.column, scope.row[col.prop], scope.$index) }}</span>
                  <span v-else-if='!col.format'>{{ scope.row[col.prop] }}</span>
                  <span v-else>{{ dataFormat(col.format.func, scope.row[col.prop], col.format.dict,col.format.dictType) }}</span>
                </div>
              </template>
            </u-table-column>
          </template>
        </u-table>
        <!-- 底部按钮 -->
        <div class='bottom-operate' v-if='dialog.mainData.linkTable'>
          <div class="bottom-operate-left" v-show='emptyTextVisibleLv2'>
            <svg-icon icon-class="point" style='color:#E6A23C'></svg-icon>{{$t('table.emptyText')}}
          </div>
        </div>
      </main>

      <!-- 底部 -->
      <div class="dialog-footer">
        <el-button v-for='(button, index) in dialog.bottomButtons' :key='index' v-db-click size="mini" v-bind='button.attrs' @click='triggerEvent(button.event)'>
          {{$t(button.name)}}
        </el-button>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'
import { dateFormate } from '@/utils/frame/base/index'
import { notifyInfo, confirmTip } from '@/utils/frame/base/notifyParams'
import toolUtil from '@/utils/frame/base/toolUtil.js'
// 注册组件
const registerComponent = data => {
  if (data && data.length > 0) {
    data.forEach(item => {
      if (item.component && item.element !== 'base-dialog-select' && item.element !== 'base-select') {
        Vue.component(item.element, item.component)
      }
    })
  }
}

export default {
  data() {
    return {
      func: toolUtil,
      tableHeight: null,
      // 列表加载
      loading: false,
      // 页面是否发生任何改动
      dataIsChange: false,
      labelNames: [],
      // 总条数
      total: 0,
      // 是否显示暂无数据
      emptyTextVisible: true,
      emptyTextVisibleLv2: true,
      // 查询条件
      listQuery: {
        data: {},
        current: 1,
        size: 20,
        isPage: true,
        importance: undefined,
        title: undefined,
        type: undefined,
        funcModule: this.$t('route.' + this.$route.meta.title),
        funcOperation: this.$t('biz.btn.search')
      },
      // 查询更多相关
      items: [],
      extraQuery: {},
      extraChoice: [],
      addQueryConditionVisible: true,
      // 查询条件验证
      rules: {},
      // 列表数据
      tableData: [],
      // 当前选中行
      currentRow: null,
      // 当前多选行
      multipleSelection: [],
      // 表头列表
      tableCols: [],
      // 二级列表数据
      linkTableData: [],
      // 二级列表选中行
      currentRowLv2: [],
      // 二级列表当前多选行
      multipleSelectionLv2: [],
      // 二级列表表头列表
      tableColsLv2: [],
      // 二级列表加载
      loadingLv2: false,
      // 开始时间限制条件
      dateStartBefore: {},
      // 结束时间限制条件
      dateEndBefore: {}
    }
  },
  provide() {
    return {
      BsDialogTable: this
    }
  },
  props: {
    dialog: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  beforeMount() {
    // 初始化formData数据
    if (this.dialog.formData instanceof Array) {
      this.dialog.formData.forEach(v => {
        if (v.prop) {
          let val = v.default || ''
          // 设置查询默认条件
          if (this.dialog.initChooseParam) {
            const props = this.dialog.initChooseParam[v.prop]
            if (props) {
              val = props.value || val
              for (let key in props) {
                if (key !== 'value') {
                  if (v.attrs === null || v.attrs === undefined) {
                    v.attrs = {}
                  }
                  v.attrs[key] = props[key]
                }
              }
            }
          }
          this.$set(this.listQuery.data, v.prop, val)
        }
        if (Array.isArray(v.props)) {
          const dftVals = []
          if (Array.isArray(v.default)) {
            dftVals[0] = v.default[0]
            dftVals[1] = v.default[1]
          }
          if (this.dialog.initChooseParam) {
            for (let i = 0; i < v.props.length; i++) {
              const props = this.dialog.initChooseParam[v.props[i]]
              if (props) {
                if (props.value !== undefined && props.value !== null) {
                  dftVals[i] = props.value
                }
                for (let key in props) {
                  if (key !== 'value') {
                    if (v.attrs === null || v.attrs === undefined) {
                      v.attrs = {}
                    }
                    v.attrs[key] = props[key]
                  }
                }
              }
            }
          }
          if (v.type === 'date') {
            if (((dftVals[0] === undefined || dftVals[0] === null) && dftVals[1] === undefined) || dftVals[1] === null) {
              const dateDefault = this.$toolUtil.getScopeThreeMonth()
              dftVals[0] = dateDefault[0]
              dftVals[1] = dateDefault[1]
            }
            this.$set(this.listQuery.data, v.props[0], dftVals[0])
            this.$set(this.listQuery.data, v.props[1], dftVals[1])
            this.changeStartTime(dftVals[0], v.attrs.pickEnd)
            this.changeEndTime(dftVals[1], v.attrs.pickStart)
          } else {
            this.$set(this.listQuery.data, v.props[0], dftVals[0])
            this.$set(this.listQuery.data, v.props[1], dftVals[1])
          }
        } else if (v.default) {
          this.$set(this.listQuery.data, v.prop, v.default)
        }
        this.labelNames.push(this.$t(v.label))
        // 校验规则
        if (v.validate) {
          this.rules[v.prop] = v.validate
          if (v.validate[0].validatorFn && typeof v.validate[0].validatorFn === 'function') {
            v.validate[0].validator = (rule, value, callback) => {
              v.validate[0].validatorFn(rule, value, callback, v.prop)
            }
          }
        }
      })
    }
    if (this.dialog.mainData.table.sortable === undefined) {
      this.dialog.mainData.table.sortable = 'custom'
    }
    // 初始化列表
    this.dialog.mainData.table.cols.forEach(v => {
      // 根据isShow字段判断是否显示
      if (v.isShow === undefined) {
        v.isShow = true
      }
      v.sortable = v.sortable === false ? v.sortable : true
      this.tableCols.push(v)
    })
    if (this.dialog.mainData.linkTable) {
      this.dialog.mainData.linkTable.cols.forEach(v => {
        // 根据isShow字段判断是否显示
        if (v.isShow === undefined) {
          v.isShow = true
        }
        v.sortable = v.sortable === false ? v.sortable : true
        this.tableColsLv2.push(v)
      })
    }
  },
  mounted() {
    // 初始化
    if (this.dialog.mainData.initSearch) {
      this.getList()
    }

    this.setTableHeight()
    window.addEventListener('resize', this.setTableHeight, false)
  },
  updated() {
    this.dataIsChange = true
  },
  destroyed() {
    window.removeEventListener('resize', this.setTableHeight)
  },
  methods: {
    getRowKey(row) {
      // if (this.dialog.mainData.linkTable) {
      //   return toolUtil.uuid()
      // }
      if (this.dialog.mainData.table.showCheckbox) {
        if (this.dialog.mainData.table.rowKey) {
          return row[this.dialog.mainData.table.rowKey]
        } else if (row.id) {
          return row.id
        } else {
          return toolUtil.uuid()
        }
      }
      return toolUtil.uuid()
    },
    // 列表数据请求
    getList() {
      const bsQueryExtras = []
      for (const i in this.extraQuery) {
        if (this.extraQuery[i].label) {
          let dictVal = ''
          const prop = this.dialog.mainData.table.cols.filter(item => item.prop === this.extraQuery[i].label)[0]
          if (prop.format && prop.format.dict instanceof Array) {
            dictVal = prop.format.dict.filter(item => item.label === this.extraQuery[i].value)[0]
          }
          bsQueryExtras.push({
            prop: this.extraQuery[i].label,
            value: dictVal ? dictVal.value : this.extraQuery[i].value
          })
        }
      }
      this.listQuery.data.bsQueryExtras = bsQueryExtras

      this.tableData.splice(0)
      this.$refs.queryForm.validate(valid => {
        if (valid) {
          this.loading = true
          request({
            url: this.dialog.mainData.api.search,
            method: 'POST',
            data: this.dialog.mainData.apiData && this.dialog.mainData.apiData.search ? this.dialog.mainData.apiData.search(this.listQuery) : this.listQuery
          })
            .then(response => {
              this.loading = false
              if (Array.isArray(response.data)) {
                for (let i = 0; i < response.data.length; i++) {
                  this.tableData.push(response.data[i])
                }
              }
              this.$emit('initCallback', response.data)
              this.total = response.total
              if (this.total && this.total > 0) {
                this.emptyTextVisible = false
              } else {
                this.emptyTextVisible = true
              }
              this.$nextTick(() => {
                this.$refs.singleTable.reloadData(this.tableData)
              })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },

    // 二级列表数据请求
    getLinkList() {
      this.loadingLv2 = true
      request({
        url: this.dialog.mainData.api.search_lv2,
        method: 'POST',
        data:
          this.dialog.mainData.apiData && this.dialog.mainData.apiData.search_lv2
            ? {
                funcModule: this.$t('route.' + this.$route.meta.title),
                funcOperation: this.$t('biz.btn.search'),
                data: this.dialog.mainData.apiData.search_lv2(this.currentRow)
              }
            : {
                funcModule: this.$t('route.' + this.$route.meta.title),
                funcOperation: this.$t('biz.btn.search'),
                data: this.currentRow
              }
      })
        .then(response => {
          this.loading = false
          this.linkTableData = response.data
          // this.total = response.total
          if (this.total && this.total > 0) {
            this.emptyTextVisibleLv2 = false
          } else {
            this.emptyTextVisibleLv2 = true
          }
          this.$nextTick(() => {
            this.$refs.linkTable.reloadData(this.linkTableData)
          })
        })
        .catch(() => {
          this.loadingLv2 = false
        })
    },

    // 返回指定过滤条件结果
    dataFormat(func = 'dataDictFormat', value, list, dictType) {
      if (dictType) {
        list = this.$t(dictType)
      }
      return Vue.filter(func)(value, list)
    },

    // 按钮事件自定义
    triggerEvent(event) {
      if (typeof event === 'function') {
        event()
      } else if (typeof event === 'string' && this[event]) {
        this[event]()
      }
    },

    // 开始时间变化
    changeStartTime(date) {
      this.dateEndBefore = {
        disabledDate(time) {
          return time < new Date(dateFormate(date, 'YYYY/MM/DD'))
        }
      }
    },

    // 结束时间变化
    changeEndTime(date) {
      this.dateStartBefore = {
        disabledDate(time) {
          return date ? time > new Date(dateFormate(date, 'YYYY/MM/DD')) : false
        }
      }
    },

    // 单选
    handleSelectRow(val) {
      this.currentRow = val
      if (this.dialog.mainData.linkTable) {
        this.getLinkList()
      }
    },

    handleSelectRowLv2(val) {
      this.currentRowLv2 = val
    },

    // 点击当前行
    handleClick(row) {
      this.$nextTick(() => {
        this.$refs.singleTable.toggleRowSelection([{ row }])
      })
    },

    handleClickLv2(row) {
      this.$refs.linkTable.toggleRowSelection(row)
    },

    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleSelectionChangeLv2(val) {
      this.multipleSelectionLv2 = val
    },

    // 查询更多条件
    addQueryCondition() {
      const list = []
      const hasList = Object.keys(this.listQuery.data)
      this.dialog.mainData.table.cols.forEach(v => {
        if (!this.labelNames.includes(this.$t(v.label)) && !hasList.includes(v.prop) && v.sortable !== false) {
          list.push({
            label: this.$t(v.label),
            prop: v.prop
          })
        }
      })
      this.$set(this.extraQuery, `extra${this.items.length}`, {
        label: '',
        value: ''
      })
      this.items.push({
        list,
        bind: `extra${this.items.length}`
      })

      this.setTableHeight()

      if (this.items.length >= list.length) {
        this.addQueryConditionVisible = false
        return
      }
    },

    // 更多条件修改时禁用已选择的选项
    handleExtraQueryChange(val) {
      const list = []
      for (const i in this.extraQuery) {
        if (this.extraQuery[i].label) list.push(this.extraQuery[i].label)
      }
      this.extraChoice = list
    },

    // 设置列表动态高度
    setTableHeight() {
      $(document).ready(() => {
        if (this.dialog.mainData.linkTable) {
          this.tableHeight = this.$refs.formTableDialog.offsetHeight - 303 - this.$refs.formTableDialogHeader.offsetHeight
        } else {
          this.tableHeight = this.$refs.formTableDialog.offsetHeight - 115 - this.$refs.formTableDialogHeader.offsetHeight
        }
      })
    },

    // 关闭通用事件
    close() {
      this.$emit('closeDialog')
    },

    // 取消通用事件
    cancel() {
      // 若界面发生修改则关闭时提示
      if (this.dataIsChange) {
        confirmTip(this, 'confirmCancel')
          .then(() => {
            this.$emit('closeDialog')
          })
          .catch(() => {})
      } else {
        this.$emit('closeDialog')
      }
    },

    // 选择数据带出通用事件
    choose() {
      if (this.dialog.mainData.table.showCheckbox) {
        if (!this.multipleSelection || this.multipleSelection.length === 0) {
          this.$notify(
            notifyInfo({
              msg: this.$t('biz.msg.noRowSelected')
            })
          )
          return
        }
        if (this.dialog.mainData.linkTable) {
          this.$emit('closeDialog', {
            currentRow: this.multipleSelection,
            currentRowLv2: this.dialog.mainData.linkTable.showCheckbox ? this.multipleSelectionLv2 : this.currentRowLv2
          })
        } else {
          this.$emit('closeDialog', this.multipleSelection)
        }
      } else {
        if (!this.currentRow || this.currentRow.length === 0) {
          this.$notify(
            notifyInfo({
              msg: this.$t('biz.msg.noRowSelected')
            })
          )
          return
        }
        if (this.dialog.mainData.linkTable) {
          this.$emit('closeDialog', {
            currentRow: this.currentRow,
            currentRowLv2: this.dialog.mainData.linkTable.showCheckbox ? this.multipleSelectionLv2 : this.currentRowLv2
          })
        } else {
          this.$emit('closeDialog', this.currentRow)
        }
      }
    },

    // 页码跳转、N条每页
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },

    // 点击翻页
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getList()
    },

    // 清空通用事件
    clear() {
      Object.keys(this.listQuery.data).forEach(prop => {
        this.listQuery.data[prop] = ''
      })
    },

    // 后台排序
    handleSortChange({ column, prop, order }) {
      const sortProp = this.dialog.mainData.table.cols.filter(col => col.prop === prop)[0].sortProp || prop
      if (this.dialog.mainData.table.sortable && this.dialog.mainData.table.sortable === 'custom') {
        if (order) {
          const asc = order === 'ascending' ? '.asc' : '.desc'
          this.listQuery.sortString = sortProp + asc
          this.getList()
        } else {
          this.listQuery.sortString = ''
          if (this.listQuery.defaultSortString) {
            this.getList()
          }
        }
      }
    },

    // 双击行保存
    handleDblClick() {
      if (this.dialog.allowDblClick) {
        this.choose()
      }
    }
  }
}
</script>

<style scoped>
</style>