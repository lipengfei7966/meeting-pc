<template>
  <div ref='BsDialogTabEdit'>
    <header ref='formTableDialogHeader' style='border-radius:5px;margin-top: 5px;'>
      <el-form ref='queryForm' @submit.native.prevent label-position="left" :rules='rules' :inline="true" :model="listQuery.data" class='header-form-inline'>
        <el-row :gutter="20" style='width:90%;'>
          <template v-for='(f, index) in dialog.formData'>
            <el-col :span="8" :key='index' v-if='f.isShow !== false'>

              <!-- 日期 -->
              <el-form-item v-if='f.type === "daterange"' :label="f.label" :prop='f.prop'>
                <el-date-picker v-model="listQuery.data[f.prop]" :picker-options="f['picker-options']" type="daterange" range-separator="~" start-placeholder="" end-placeholder="" v-bind='f.attrs' @change='changeDaterangeTime(f)'>
                </el-date-picker>
              </el-form-item>
              <template v-else-if='f.type === "date" || f.type === "year" || f.type === "month" || f.type === "week"' :label="f.label" :prop='f.prop'>
                <template v-if='f.props && f.props instanceof Array && f.props.length>1'>
                  <el-form-item :label="f.label">
                    <el-row :gutter="0">
                      <el-col :span="11">
                        <el-date-picker v-model="listQuery.data[f.props[0]]" v-bind='f.attrs' v-on='f.event' @change="(date) => { changeStartTime(date, f.attrs.pickEnd) }" :picker-options='f.attrs.pickStart ? datePick[f.attrs.pickStart] : datePick.dateStartBefore' :type="f.type" placeholder="">
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2" align='center'>~</el-col>
                      <el-col :span="11">
                        <el-date-picker v-model="listQuery.data[f.props[1]]" v-bind='f.attrs' v-on='f.event' @change="(date) => { changeEndTime(date, f.attrs.pickStart) }" :picker-options='f.attrs.pickEnd ? datePick[f.attrs.pickEnd] : datePick.dateEndBefore' :type="f.type" placeholder="">
                        </el-date-picker>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </template>
                <template v-else>
                  <el-form-item :label="f.label" :prop='f.prop'>
                    <el-date-picker v-model="listQuery.data[f.prop]" v-bind='f.attrs' :type="f.type" placeholder="">
                    </el-date-picker>
                  </el-form-item>
                </template>
              </template>
              <!-- 单选框 -->
              <el-form-item v-else-if='f.type === "radio"' :label="f.label">
                <el-radio-group v-model="listQuery.data[f.prop]">
                  <el-radio v-for="item in  $t('datadict.' + f.attrs.datadict)" :key="item.value" :label="item.value" v-bind=' f.attrs'>{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 多选框 -->
              <el-form-item v-else-if='f.type === "checkbox"' :label="f.label">
                <el-checkbox-group v-model="listQuery.data[f.prop]">
                  <el-checkbox v-for="item in  $t('datadict.' + f.attrs.datadict)" :key="item.value" :label="item.value" v-bind='f.attrs'>{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <!-- 数值区间 -->
              <el-form-item v-else-if='f.type === "numberInterval"' :label="f.label">
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
                <el-select v-if='f.attrs.datadict' v-model="listQuery.data[f.prop]" v-bind='f.attrs' :placeholder="$t('biz.placeholder.choose')">
                  <el-option v-for="item in  $t('datadict.' + f.attrs.datadict)" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <!-- 公用组件 -->
                <component v-else :is='f.element' v-model='listQuery.data[f.prop]' v-bind='f.attrs' v-on='f.event' :attrs='f.attrs'></component>
              </el-form-item>
            </el-col>
          </template>
          <!-- 更多 -->
        </el-row>
        <!-- 右侧搜索按钮 -->
        <div class="search-btn">
          <el-button type="primary" :loading="loading" @click="getList" v-db-click>
            {{$t('biz.lbl.search')}}
          </el-button>
        </div>
      </el-form>
    </header>
    <main>
      <el-table stripe border class='table-content' ref="singleTable" highlight-current-row v-loading="loading" element-loading-spinner="el-icon-loading" style="border:1px solid;" :element-loading-text="$t('route.load')" :data="tableData" :height='tableHeight' @selection-change="handleSelectionChange" @current-change="handleSelectRow" @row-click='handleClick' @sort-change="handleSortChange" @row-dblclick="handleDblClick">
        <el-table-column align='center' type="index" fixed="left" width="50" :label='$t("table.id")'></el-table-column>
        <el-table-column type="selection" width="55" align="center" :fixed="true" v-if="dialog.multiple"></el-table-column>
        <template v-for='col in tableCols'>
          <el-table-column v-if='col.isShow' :key='col.prop' v-bind='col' :label='$t(col.label)' :sortable='dialog.mainData.table.sortable && col.sortable' show-overflow-tooltip>
            <template slot-scope='scope'>
              <slot v-if="col.isSlot" :name="col.prop" :row='scope.row'></slot>
              <div :style='col.style' v-else>
                <span v-if='col.formatter'>{{ col.formatter(scope.row, scope.column, scope.row[col.prop], scope.$index) }}</span>
                <span v-else-if='!col.format'>{{ scope.row[col.prop] }}</span>
                <span v-else>{{ dataFormat(col.format.func, scope.row[col.prop], col.format.dict,col.format.dictType) }}</span>
              </div>
            </template>
          </el-table-column>
        </template>
        <el-table-column v-if="dialog.showUsedList" fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="addUsed(scope.row)" type="text" size="small">加入常用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部按钮 -->
      <div class='bottom-operate'>
        <div class="bottom-operate-left" v-show='emptyTextVisible'>
          <svg-icon icon-class="point" style='color:#E6A23C'></svg-icon>{{$t('table.emptyText')}}
        </div>
        <!-- 分页 -->
        <el-pagination v-if='!emptyTextVisible' small background layout="total,sizes,prev, pager, next" :current-page="listQuery.current" :page-sizes="[20, 40, 60, 80, 100]" :page-size="listQuery.size" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'
import { dateFormate } from '@/utils/frame/base/index'
import { notifyInfo, notifySuccess, confirmTip } from '@/utils/frame/base/notifyParams'

export default {
  data() {
    return {
      tableHeight: 360,
      // 列表加载
      loading: false,
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
        isPage: true
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
    if (this.dialog.listQuery) {
      this.listQuery = Object.assign({}, this.dialog.listQuery, {
        isPage: true,
        size: 20,
        funcModule: this.$t('route.' + this.$route.meta.title),
        funcOperation: this.$t('biz.btn.search')
      })
    }

    // 初始化formData数据
    if (this.dialog.formData instanceof Array) {
      this.dialog.formData.forEach((v, index) => {
        if (v.attrs && v.attrs['picker-options']) {
          v['picker-options'] = new Function(`return ${this.func[v.attrs['picker-options']]}`)()()
        } else {
          v['picker-options'] = this.$toolUtil.getPickerOptions()
        }
        if (v.props instanceof Array && (v.type === 'date' || v.type === 'daterange' || v.type === 'month')) {
          let defaultVal = ['', '']
          if (v.default === undefined) {
            v.default = this.$toolUtil.getScopeThreeMonth()
          }
          defaultVal[0] = v.default && v.default[0]
          defaultVal[1] = v.default && v.default[1]
          if (v.defaultFunc && !v.defaultFunc.includes('.')) {
            defaultVal = new Function(`return ${this.func[v.defaultFunc]}`)()()
          }
          this.$set(this.listQuery.data, v.props[0], defaultVal[0])
          this.changeStartTime(defaultVal[0], v.attrs.pickEnd)
          this.$set(this.listQuery.data, v.props[1], defaultVal[1])
          this.changeEndTime(defaultVal[1], v.attrs.pickStart)

          this.$set(this.listQuery.data, v.prop, [this.listQuery.data[v.props[0]], this.listQuery.data[v.props[1]]])
        } else if (v.default) {
          if (v.type === 'date' || v.type === 'year' || v.type === 'month' || v.type === 'week') {
            if (v.default.indexOf('now') > -1) {
              v.default = this.$toolUtil.todayStr()
            }
          }
          this.$set(this.listQuery.data, v.prop, v.default)
        } else if (v.type === 'checkbox' || (v.attrs && v.attrs.multiple)) {
          this.$set(this.listQuery.data, v.prop, [])
        } else {
          this.$set(this.listQuery.data, v.prop, '')
        }

        // 根据isShow字段判断是否显示
        if (v.isShow === undefined) {
          v.isShow = true
        }
        if (v.isShow) {
          this.labelNames.push(this.$t(v.label))
        }
        // 校验规则
        if (v.validate) {
          this.rules[v.prop] = v.validate
          if (v.validate[0].validatorFn && typeof v.validate[0].validatorFn === 'function') {
            v.validate[0].validator = (rule, value, callback) => {
              v.validate[0].validatorFn(rule, value, callback, v.prop)
            }
          }
        }
        this.$set(this.extraQuery, `extra` + index, v)
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
  },
  mounted() {
    // 初始化
    if (this.dialog.mainData.initSearch) {
      this.getList()
    }
  },
  methods: {
    // 列表数据请求
    getList() {
      let bsQueryExtras = []
      if (this.dialog.queryParamArr) {
        this.dialog.queryParamArr.forEach(item => {
          bsQueryExtras.push(item)
        })
      }
      for (const i in this.extraQuery) {
        if (this.extraQuery[i].label) {
          let dictVal = ''
          const prop = this.dialog.mainData.table.cols.filter(item => item.prop === this.extraQuery[i].prop)[0]

          if (prop && prop.format && prop.format.dictType && typeof prop.format.dictType === 'string') {
            if (this.dataDictList[prop.format.dictType]) {
              dictVal = $t('datadict.' + prop.format.dictType).filter(item => item.label === this.listQuery.data[this.extraQuery[i].prop])[0]
            }
          }

          if (this.extraQuery[i].type !== 'daterange' && this.extraQuery[i].props && this.extraQuery[i].props.length === 2) {
            if (this.listQuery.data[this.extraQuery[i].props[0]] || this.listQuery.data[this.extraQuery[i].props[1]]) {
              let tempValue = [this.listQuery.data[this.extraQuery[i].props[0]], this.listQuery.data[this.extraQuery[i].props[1]]]
              bsQueryExtras.push({
                prop: this.extraQuery[i].queryProp ? this.extraQuery[i].queryProp : this.extraQuery[i].prop,
                value: tempValue,
                type: this.extraQuery[i].type,
                dbType: this.extraQuery[i].dbDataType,
                condition: this.extraQuery[i].condition
              })
            }
          } else {
            bsQueryExtras.push({
              prop: this.extraQuery[i].queryProp ? this.extraQuery[i].queryProp : this.extraQuery[i].prop,
              value: dictVal ? dictVal.value : this.listQuery.data[this.extraQuery[i].prop],
              type: this.extraQuery[i].type,
              dbType: this.extraQuery[i].dbDataType,
              condition: this.extraQuery[i].condition
            })
          }
        }
      }

      this.listQuery.bsQueryExtrasForCode = bsQueryExtras
      this.listQuery.code = this.dialog.funcCode
      this.$refs.queryForm.validate(valid => {
        if (valid) {
          this.loading = true
          request({
            url: '/api/platform/cfgCombox/moreSearch',
            method: 'POST',
            data: this.listQuery
          })
            .then(response => {
              this.loading = false
              this.tableData = response.data
              this.total = response.total
              if (this.total && this.total > 0) {
                this.emptyTextVisible = false
              } else {
                this.emptyTextVisible = true
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.$notify(notifyError({ msg: '请检查红框的输入信息' }))
          this.loading = false

          return false
        }
      })
    },
    addUsed(row) {
      const data = {
        funcModule: this.$t('route.' + this.$route.meta.title),
        funcOperation: this.$t('biz.btn.save'),
        data: {
          funcCode: this.dialog.funcCode,
          code: row[this.dialog.valueColumn]
        }
      }
      request({
        url: '/api/platform/cfgComboxUsed/save',
        method: 'POST',
        data: data
      })
        .then(response => {
          this.$notify(notifySuccess({ msg: this.$t('biz.msg.operationSuccess') }))
        })
        .catch(() => {})
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
      this.$emit('selectRow', val)
      this.currentRow = val
      if (!this.dialog.multiple) {
        this.$emit('selectRow', this.currentRow)
      }
    },
    // 点击当前行
    handleClick(row) {
      this.$refs.singleTable.toggleRowSelection(row)
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (this.dialog.multiple) {
        this.$emit('selectRow', this.multipleSelection)
      }
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
      const sortCol = this.dialog.mainData.table.cols.filter(col => col => col.prop === prop)[0]
      const queryProp = sortCol.queryProp || sortCol.sortProp || prop
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
      // if (this.dialog.allowDblClick) {
      //   this.choose()
      // }
    }
  }
}
</script>
