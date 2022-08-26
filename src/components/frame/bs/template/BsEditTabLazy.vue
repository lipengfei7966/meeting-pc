<template>
  <div>
    <template v-if='tab.table'>
      <div v-if='tab.topBar' class='tabs-operate' style='margin-top:5px;'>
        <template v-for='(btn, index) in tab.topBar.filter(v => { return v.isShow })'>
          <bs-upload v-if="btn.name === 'upload'" @onFileChange='addFile' :key='index'></bs-upload>
          <bs-import v-else-if="btn.name === 'import'" :validate="btn.validate" :on-success="btn.handleSuccess" :before-upload="btn.beforeUpload" :btnName="$t('biz.btn.import')" :key='index'>
          </bs-import>
          <div v-else-if="btn.element" :key="index" class="bs-topbar-item">
            <span class="bs-topbar-item-label">{{ $t(btn.i18n) }}</span>
            <div class="bs-topbar-item-component">
              <component :is="btn.element" size="mini" v-model="tabForm[btn.prop]" v-bind='btn.attrs' v-on='btn.event' :attrs='btn.attrs' @handleSelect='dialogSelect(btn)' />
            </div>
          </div>
          <el-button v-else v-db-click size="mini" :key='index' @click='triggerEvent(null, btn)' :disabled='btn.disabled'>
            <svg-icon :icon-class="btn.iconName || baseEvent[btn.name] && baseEvent[btn.name].iconName"></svg-icon>{{ $t(btn.i18n) || $t(baseEvent[btn.name].i18n) }}
          </el-button>
        </template>
      </div>
      <!-- 不允许加fixed固定列会导致额外生成一个table从而导致下拉内容加载两次 -->
      <u-table class='table-content tb-edit' ref="singleTable" use-virtual :max-height='tableHeight?tableHeight:null' :data-changes-scroll-top='false' :pagination-show='false' :key='key' :tree-config="tab.table.treeProps" :row-id="tab.table.rowKey|| 'id'" :row-height="26" default-expand-all stripe border highlight-current-row v-loading="loading" element-loading-spinner="el-icon-loading" :element-loading-text="$t('route.load')" @current-change="handleSelectRow" :show-summary='tab.table.showSummary' :summary-method="getSummaries">
        <u-table-column align='center' type="index" width="50" :label='$t("table.id")'></u-table-column>
        <u-table-column align='center' type="selection" width="45" fixed v-if="tab.table.showSelection"></u-table-column>
        <template v-for='col in tableCols'>
          <u-table-column show-overflow-tooltip v-if='col.isShow' :key='col.prop' v-bind='col' :sortable='tab.table.sortable' :prop='col.prop'>
            <template slot="header" slot-scope="scope">
              <span :style="{...col.style}"> {{$t(col.label)}}</span>
              <span style='color:#f56c6c;' v-if='col.required' :data-header='scope'>*</span>
            </template>
            <template slot-scope='scope'>
              <slot v-if="col.isSlot" :name="col.prop" :row='scope.row' :col='col'></slot>
              <template v-else>
                <!-- 日期 -->
                <el-date-picker v-if='col.type === "date"' v-model="scope.row[col.prop]" size='mini' v-bind='col.attrs' :picker-options=' func.getDefaultPickerOptions()' :type="col.type" :placeholder="$t(' biz.placeholder.dateInput')" @change='v => triggerEvent({val: v, row: scope.row}, col.event)'></el-date-picker>
                <!-- 字典码表 -->
                <el-select v-else-if='col.list && (!col.attrs || !col.attrs.data)' v-model="scope.row[col.prop]" size='mini' v-bind='col.attrs' :placeholder="$t('biz.placeholder.choose')" @change='v => triggerEvent({val: v, row: scope.row}, col.event)' @visible-change='v => { col.visibleChange ? col.visibleChange({val: v, row: scope.row}) : null }'>
                  <template v-for="item in col.list">
                    <template v-if="col.attrs && !col.attrs.multiple && (tab.type === 'view' )">
                      <el-option :key="item.value" v-if="scope.row[col.prop]===item.value" :label="item.label" :value="item.value"></el-option>
                    </template>
                    <template v-else>
                      <el-option :key="item.value" :label="item.label" :value="item.value" :disabled='item.disabled'></el-option>
                    </template>
                  </template>
                </el-select>
                <!-- 公用组件 -->
                <component :opType='tab.type' v-else-if='col.element' :newRowList='scope.row.list' :is='col.element' v-model='scope.row[col.prop]' size='mini' v-bind='col.attrs' :attrs='col.attrs' @handleSelect='dialogSelect(col, scope.row)' @change='v => triggerEvent({val: v, row: scope.row}, col.event)' @changeAll='v => { col.changeAll ? col.changeAll({val: v, row: scope.row}) : null }' @userChange='v => { col.userChange ? col.userChange({val: v, row: scope.row}) : null }' @dataChange='v => { col.dataChange ? col.dataChange({val: v, row: scope.row}) : null }' @visibleChange='v => { col.visibleChange ? col.visibleChange({val: v, row: scope.row}) : null }' @clear='v => { col.clear ? col.clear({val: v, row: scope.row}) : null }'></component>
                <!-- 文本展示 -->
                <template v-else>
                  <span v-if='col.formatter' style='padding:0 10px;'>{{col.formatter(scope.row, scope.column, scope.row[col.prop], scope.$index)}}</span>
                  <span v-else-if='!col.format' style='padding:0 10px;'>{{ scope.row[col.prop] }}</span>
                  <span v-else :style="{'padding':'0 10px',...col.style}">{{ dataFormat(col.format.func, scope.row[col.prop], col.format.dict ,col.format.dictType) }}</span>
                </template>
              </template>
            </template>
          </u-table-column>
        </template>
      </u-table>
    </template>
    <template v-else-if='tab.formData'>
      <el-form :inline="true" :model="tabForm" style='padding:0 5px;margin-top:7px;' class="header-form-inline" label-position="left" :rules='rules' ref="refForm">
        <el-row :gutter="20">
          <template v-for='(form, index) in tab.formData'>
            <el-col :key='index' v-if='form.isShow' :span="form.attrs && form.attrs.cols ? form.attrs.cols * 6 : 6" :data-key='form.prop'>
              <!-- 日期 -->
              <el-form-item v-if='form.type === "date"' :required='Array.isArray(form.props) && Array.isArray(form.validate)' :label="$t(form.label)" :prop='form.prop'>
                <template v-if='Array.isArray(form.props)'>
                  <el-row :gutter="0">
                    <el-col :span="11">
                      <el-form-item :prop="form.props[0]">
                        <el-date-picker v-model="tabForm[form.props[0]]" v-bind='form.attrs' @change="(date) => changeStartTime(date, form.attrs.pickEnd)" :picker-options='Object.assign(func.getDefaultPickerOptions() ,form.attrs.pickStart ? datePick[form.attrs.pickStart] : datePick.dateStartBefore)' :type="form.type" :placeholder="$t('biz.placeholder.dateInput')">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="2" align='center'>~</el-col>
                    <el-col :span="11">
                      <el-form-item :prop="form.props[1]">
                        <el-date-picker v-model="tabForm[form.props[1]]" v-bind='form.attrs' @change="(date) => changeEndTime(date, form.attrs.pickStart)" :picker-options='Object.assign(func.getDefaultPickerOptions() ,form.attrs.pickEnd ? datePick[form.attrs.pickEnd] : datePick.dateEndBefore)' :type="form.type" :placeholder="$t('biz.placeholder.dateInput')">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </template>
                <template v-else>
                  <template v-if="form.attrs.type === 'start'">
                    <el-date-picker v-model="tabForm[form.prop]" @change="(date) => changeStartTime(date, form.attrs.pickEnd)" :picker-options='Object.assign(func.getDefaultPickerOptions() ,form.attrs.pickStart ? datePick[form.attrs.pickStart] : datePick.dateStartBefore)' v-bind='form.attrs' :type="form.type" :placeholder="$t('biz.placeholder.dateInput')">
                    </el-date-picker>
                  </template>
                  <template v-else-if="form.attrs.type === 'end'">
                    <el-date-picker v-model="tabForm[form.prop]" @change="(date) => changeEndTime(date, form.attrs.pickStart)" :picker-options='Object.assign(func.getDefaultPickerOptions() ,form.attrs.pickEnd ? datePick[form.attrs.pickEnd] : datePick.dateEndBefore)' v-bind='form.attrs' :type="form.type" :placeholder="$t('biz.placeholder.dateInput')">
                    </el-date-picker>
                  </template>
                  <template v-else>
                    <el-date-picker v-model="tabForm[form.prop]" v-bind='form.attrs' :type="form.type" :placeholder="$t('biz.placeholder.dateInput')" :picker-options='Object.assign(func.getDefaultPickerOptions(),form.attrs.pickerOptions?form.attrs.pickerOptions:{})' @change='v => triggerEvent(v, form)'>
                    </el-date-picker>
                  </template>
                </template>
              </el-form-item>
              <!-- 单选框 -->
              <el-form-item v-else-if='form.type === "radio"' :label="$t(form.label)" :prop='form.prop'>
                <el-radio-group v-model="tabForm[form.prop]" @change='v => triggerEvent(v, form)'>
                  <el-radio v-for='item in form.list' :key="item.value" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 多选框 -->
              <el-form-item v-else-if='form.type === "checkbox"' :label="$t(form.label)" :prop='form.prop'>
                <el-checkbox-group v-model="tabForm[form.prop]" @change='v => triggerEvent(v, form)'>
                  <el-checkbox v-for='item in form.list' :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <!-- 数值区间 -->
              <el-form-item v-else-if='form.type === "numberInterval"' :label="$t(form.label)" :prop='form.prop'>
                <el-row :gutter="0">
                  <el-col :span="11">
                    <input-formatter :min='form.attrs.startMin' :max='form.attrs.startMax !== undefined ? form.attrs.startMax : tabForm[form.props[1]]' v-model="tabForm[form.props[0]]" v-bind='form.attrs' size="mini"></input-formatter>
                  </el-col>
                  <el-col :span="2" align='center'>~</el-col>
                  <el-col :span="11">
                    <input-formatter :min='form.attrs.endMin !== undefined ? form.attrs.endMin : tabForm[form.props[0]]' :max='form.attrs.endMax' v-model="tabForm[form.props[1]]" v-bind='form.attrs' size="mini"></input-formatter>
                  </el-col>
                </el-row>
              </el-form-item>
              <!-- 下拉输入 -->
              <el-form-item v-else :label="$t(form.label)" :prop='form.prop'>
                <!-- 字典码表 -->
                <el-select v-if='form.list && (!form.attrs || !form.attrs.data)' v-model="tabForm[form.prop]" v-bind='form.attrs' :placeholder="$t('biz.placeholder.choose')" @change='v => triggerEvent(v, form)'>
                  <template v-for="item in form.list">
                    <template v-if="form.attrs && !form.attrs.multiple && (tab.type === 'view' )">
                      <el-option :key="item.value" v-if="tabForm[form.prop]===item.value" :label="item.label" :value="item.value"></el-option>
                    </template>
                    <template v-else>
                      <el-option :key="item.value" :label="item.label" :value="item.value" :disabled='item.disabled'></el-option>
                    </template>
                  </template>
                </el-select>
                <!-- 公用组件 -->
                <component :opType='tab.type' v-else :is='form.element' v-model='tabForm[form.prop]' v-bind='form.attrs' v-on='form.event' :attrs='form.attrs' :newList='form.list' @handleSelect='dialogSelect(form)'></component>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </template>
    <!-- 编辑弹窗 -->
    <view-form-tab ref='viewFormTab' v-if='dialogDetailVisible' @closeAndRefreshHandler='dialogRefreshHandler' @closeHandler='dialogHandler' :param='param' :opType="opType" :opMode='opMode' :initChooseParam='initChooseParam'></view-form-tab>
  </div>
</template>

<script>
// 调用Vue全局过滤器
import Vue from 'vue'
// axios访问
import request from '@/utils/frame/base/request'
// 提醒
import { notifyInfo } from '@/utils/frame/base/notifyParams'
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
// vuex工具
import { mapGetters } from 'vuex'
import toolUtil from '@/utils/frame/base/toolUtil.js'

export default {
  data() {
    return {
      func: toolUtil,
      // 列表高度
      tableHeight: null,
      // 列表加载动画
      loading: false,
      // 打开弹窗时携带的参数
      param: {},
      // 列表更新标识
      key: 1,
      // 弹窗打开类型
      opType: '',
      // 编辑模式：dialog or route
      opMode: '',
      // 列表当前选中行
      currentRow: null,
      // 列设置
      tableCols: [],
      // 表格数据
      tableData: [],
      // 打开弹窗额外参数传入
      initChooseParam: {},
      // 编辑页控制显示隐藏
      dialogDetailVisible: false,
      // 当前打开选择弹窗行的索引
      rowOpenNum: null,
      // 单元格打开弹窗时当前行索引/单元格打开的弹窗关闭后自定义回调方法
      rowOpenType: '',
      // 表单数据
      tabForm: {},
      // 表单校验规则
      rules: {},
      // 多个时间区间时限制条件
      datePick: {
        dateStartBefore: {},
        dateEndBefore: {}
      },
      // 基础默认按钮相关
      baseEvent: {
        add: {
          func: this.doAdd,
          iconName: 'addLine',
          i18n: 'biz.btn.addRow'
        },
        delete: {
          func: this.doDelete,
          iconName: 'delete',
          i18n: 'biz.btn.deleteRow'
        },
        copy: {
          func: this.doCopy,
          iconName: 'copy',
          i18n: 'biz.btn.copy'
        },
        update: {
          func: this.doUpdate,
          iconName: 'edit',
          i18n: 'biz.btn.update'
        },
        set: {
          func: this.doSet,
          iconName: 'set',
          i18n: 'biz.btn.setting'
        },
        print: {
          func: this.doPrint,
          iconName: 'print',
          i18n: 'biz.btn.print'
        }
      }
    }
  },
  provide() {
    return {
      BsEditTab: this
    }
  },
  components: {
    BsUpload: () => import('@/components/frame/bs/file/upload')
  },
  props: {
    tab: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(['remoteSelectData'])
  },
  beforeMount() {
    if (this.tab.formData && this.tab.formData.length) {
      this.tab.formData.forEach(v => {
        const val = v.default ? v.default : v.type === 'checkbox' || (v.attrs && v.attrs.multiple) ? [] : ''
        this.$set(this.tabForm, v.prop, val)
        if (v.props) {
          this.$set(this.tabForm, v.props[0], val[0])
          this.$set(this.tabForm, v.props[1], val[1])
        }
        if (this.tab.type === 'view' && v.attrs) {
          v.attrs.disabled = true
        }
      })
      // 校验规则
      this.tab.formData.forEach(v => {
        // 根据isShow字段判断是否显示
        if (v.isShow === undefined) {
          v.isShow = true
        } else {
          if (v.isShow instanceof Array) {
            v.isShow = v.isShow.includes(this.tab.type)
          }
        }

        // 校验规则
        if (v.validate) {
          if (v.props instanceof Array) {
            this.rules[v.props[0]] = v.validate
            this.rules[v.props[1]] = v.validate
          } else {
            this.rules[v.prop] = v.validate
          }
          if (v.validate[0].validatorFn && typeof v.validate[0].validatorFn === 'function') {
            v.validate[0].validator = (rule, value, callback) => {
              v.validate[0].validatorFn(rule, value, callback, v.prop)
            }
          }
        }
        // 注册组件
        if (v.component && v.element !== 'base-dialog-select' && v.element !== 'base-select') {
          Vue.component(v.element, v.component)
        }
        // 查看则清空校验规则
        if (this.tab.type === 'view') {
          this.rules = {}
        }
      })
    }
  },
  async mounted() {
    if (this.tab.table && this.tab.table.cols.length) {
      this.tab.table.cols.forEach(v => {
        // 根据isShow字段判断是否显示
        if (v.isShow === undefined) {
          v.isShow = true
        }
        this.tableCols.push(v)
        if (this.tab.type === 'view' && v.attrs) {
          v.attrs.disabled = true
        }
      })

      if (this.tab.topBar) {
        this.tab.topBar.forEach(v => {
          // 根据isShow字段判断是否显示
          if (v.isShow !== undefined) {
            if (Array.isArray(v.isShow)) {
              v.isShow = v.isShow.includes(this.tab.type)
            }
          } else {
            v.isShow = true
          }

          if (this.tab.type === 'view' && v.attrs) {
            v.attrs.disabled = true
          }
        })
      }

      for (const v of this.tab.table.cols) {
        // 非树非远程查询且第一次查询
        if (v.attrs && v.attrs.data && !v.attrs.data.includes('TREE') && !v.attrs.remote && !this.remoteSelectData.has(v.attrs.data)) {
          let dataList = await this.$store.dispatch('GetBaseSelectList', JSON.stringify(v.attrs))
          if (!dataList) {
            v.attrs.filterable = v.attrs.filterable === false ? v.attrs.filterable : true
            const response = await request({
              url: '/api/dd/selectData/list',
              method: 'POST',
              data: {
                funcModule: this.$t('route.' + this.$route.meta.title),
                funcOperation: this.$t('biz.btn.search'),
                data: {
                  type: v.attrs.data,
                  queryParams: Object.assign({}, v.attrs.params),
                  dataAuth: v.attrs.dataAuth
                }
              }
            })
            // 储存当前下拉数据初始化值
            this.$store.dispatch('SetBaseSelectList', {
              key: JSON.stringify(v.attrs),
              value: response.data
            })
          }
        }
      }
    }

    if (this.tab.type !== 'add' && !this.$route.params.billHis) this.getList()
  },
  methods: {
    // 初始化数据
    getList() {
      if (!this.tab.api.search) return
      this.loading = true
      request({
        url: this.tab.api.search,
        method: 'POST',
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: this.tab.apiData ? this.tab.apiData.search(this.tab.param) : this.tab.param.id
        }
      })
        .then(response => {
          this.loading = false
          if (Array.isArray(this.tab.formData) && !Array.isArray(response.data)) {
            this.tabForm = response.data
          } else {
            response.data.forEach(row => {
              row.list = []
            })
            this.tableData = response.data
            setTimeout(() => {
              this.tableHeight = this.tableHeight - 0.1
            }, 1000)
          }
          // 初始化数据回调
          this.$emit('initCallback', this.tableData)
          // 请求回调后设置高度，防止合计被遮挡
          if (this.tab.table.height) {
            this.tableHeight = this.tab.table.height
          }
          this.$nextTick(() => {
            this.$refs.singleTable.reloadData(this.tableData)
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    //重新加载数据
    reloadData() {
      this.$nextTick(() => {
        this.$refs.singleTable.reloadData(this.tableData)
      })
    },
    // 打开弹窗选择数据
    dialogSelect(col, row) {
      this.rowOpenNum = this.tableData.indexOf(row)
      if (col.validateFunc && !col.validateFunc()) return
      // 注册组件
      Vue.component('view-form-tab', col.component)
      // 注册组件
      if (col.initChoose) {
        this.initChooseParam = col.initChoose()
      } else {
        this.initChooseParam = {}
      }
      this.dialogDetailVisible = true
      this.rowOpenType = col.callback
      $(document).ready(() => {
        $(this.$refs.viewFormTab.$el)
          .appendTo('#app-main .app-container')
          .find('.mask')
          .css('z-index', 1999)
          .siblings('.dialog-container')
          .css('z-index', 2000)
      })
    },
    // 编辑关闭回调
    dialogHandler(param) {
      if (param) {
        this.key++
        // 赋值或增行
        if (typeof this.rowOpenType === 'function') {
          this.rowOpenType(param)
        } else if (Array.isArray(param)) {
          // 多选
          const rowOpenNum = []
          param.forEach(() => {
            const row = {}
            this.tableCols.forEach(c => {
              row[c.prop] = ''
            })
            this.tableData.push({
              ...row
            })
            rowOpenNum.push(this.tableData.length - 1)
          })
          this.rowOpenNum = rowOpenNum
        } else if (Array.isArray(param.currentRow)) {
          // 多选
          const rowOpenNum = []
          param.currentRow.forEach(() => {
            const row = {}
            this.tableCols.forEach(c => {
              row[c.prop] = ''
            })
            this.tableData.push({
              ...row
            })
            rowOpenNum.push(this.tableData.length - 1)
          })
          this.rowOpenNum = rowOpenNum
        } else if (this.rowOpenType === 'add') {
          // 单选
          const row = {}
          this.tableCols.forEach(c => {
            row[c.prop] = ''
          })
          this.tableData.push({
            ...row
          })
          // 当前操作行索引
          this.rowOpenNum = this.tableData.length - 1
        }
        // 传递给各自页面根据需求进行赋值
        this.$emit('closeHandler', param)
        this.$nextTick(() => {
          this.$refs.singleTable.reloadData(this.tableData)
        })
      }
      this.dialogDetailVisible = false
    },
    // 编辑关闭回调并刷新
    dialogRefreshHandler(param) {
      if (param) {
        this.getList()
      }
      this.dialogDetailVisible = false
    },
    // 返回指定过滤条件结果
    dataFormat(func = 'dataDictFormat', value = '', list, dictType) {
      if (dictType) {
        list = this.$t(dictType)
      }
      return Vue.filter(func)(value, list)
    },
    // 按钮事件自定义
    triggerEvent(defaultParam, button) {
      if (!button) return
      if (button.event && typeof button.event === 'function') {
        button.event()
      } else if (this.baseEvent[button.name]) {
        this.baseEvent[button.name].func(button)
        this.rowOpenType = button.callback ? button.callback : button.name
      } else if (typeof button === 'function') {
        button(defaultParam)
      }
    },
    // 增行
    addFile(file) {
      this.tableData.push({
        fileName: file.response.data.fileName,
        filePath: file.response.data.filePath,
        uploadDate: file.response.data.uploadDate,
        uploadEmployeeName: file.response.data.uploadEmployeeName,
        remark: ''
      })
      this.$nextTick(() => {
        this.$refs.singleTable.reloadData(this.tableData)
      })
    },

    // 前端验证通用方法
    commonValidate(buttonInfo) {
      if (buttonInfo.validate) {
        const result = buttonInfo.validate(this.currentRow)
        if (typeof result === 'boolean' && !result) {
          if (buttonInfo.msg) {
            this.$notify(notifyInfo({ msg: buttonInfo.msg }))
          } else {
            this.$notify(notifyInfo({ msg: '操作验证不通过，不可以进行当前操作' }))
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
    // 增行
    doAdd(buttonInfo) {
      // 点击权限判断 如果返回为false 则验证不通过
      if (!this.commonValidate(buttonInfo)) return
      // 编辑页弹窗组件注册
      if (buttonInfo.type === 'dialog') {
        if (buttonInfo.initChoose) this.initChooseParam = buttonInfo.initChoose()
        // 注册组件
        Vue.component('view-form-tab', buttonInfo.component)
        if (buttonInfo.getParam) {
          this.param = buttonInfo.getParam()
        }
        this.opType = 'add'
        this.dialogDetailVisible = true
        $(document).ready(() => {
          $(this.$refs.viewFormTab.$el)
            .appendTo('#app-main .app-container')
            .find('.mask')
            .css('z-index', 1999)
            .siblings('.dialog-container')
            .css('z-index', 2000)
          if (buttonInfo.setDefault) buttonInfo.setDefault()
        })
      } else {
        const row = {}
        this.tableCols.forEach(c => {
          const val = c.default ? c.default : c.type === 'checkbox' || (c.attrs && c.attrs.multiple) ? [] : ''
          row[c.prop] = val
        })
        this.tableData.push({
          ...row
        })
        this.$emit('addRow', row)
        this.$nextTick(() => {
          this.$refs.singleTable.reloadData(this.tableData)
        })
      }
    },
    // 删行
    doDelete(buttonInfo) {
      if (!this.currentRow) {
        this.$notify(
          notifyInfo({
            msg: this.$t('biz.msg.noRowSelected')
          })
        )
        return
      }
      if (this.currentRow) {
        // 点击权限判断 如果返回为false 则验证不通过
        if (!this.commonValidate(buttonInfo)) return
        this.$confirm(this.$t('biz.msg.confirmDelete'), this.$t('biz.msg.tip'), {
          type: 'warning',
          closeOnClickModal: false,
          confirmButtonText: this.$t('biz.btn.confirm'),
          cancelButtonText: this.$t('biz.btn.cancel')
        })
          .then(() => {
            this.$nextTick(() => {
              // 删行
              this.tableData.splice(this.tableData.indexOf(this.currentRow), 1)
              // 删行回调
              if (typeof buttonInfo.callback === 'function') {
                buttonInfo.callback(this.currentRow)
              } else {
                this.$emit('deleteRow', this.currentRow)
              }
              this.$refs.singleTable.reloadData(this.tableData)
            })
          })
          .catch(() => {})
      }
    },
    // 复制行
    doCopy(buttonInfo) {
      if (!this.currentRow) {
        this.$notify(
          notifyInfo({
            msg: this.$t('biz.msg.noRowSelected')
          })
        )
        return
      }

      // 点击权限判断 如果返回为false 则验证不通过
      if (!this.commonValidate(buttonInfo)) return
      const copyRow = Object.assign({}, this.currentRow)
      delete copyRow.id
      delete copyRow.tenantCode
      this.tableData.push(copyRow)
      this.$nextTick(() => {
        this.$refs.singleTable.reloadData(this.tableData)
      })
      this.$emit('copyRow', copyRow)
    },
    // 设置
    doSet(buttonInfo) {
      // 点击权限判断 如果返回为false 则验证不通过
      if (!this.commonValidate(buttonInfo)) return
      // 编辑页弹窗组件注册
      if (buttonInfo.type === 'dialog') {
        // 注册组件
        Vue.component('view-form-tab', buttonInfo.component)
        if (buttonInfo.getParam) {
          this.param = buttonInfo.getParam()
        }
        if (buttonInfo.initChoose) {
          this.initChooseParam = buttonInfo.initChoose()
        } else {
          this.initChooseParam = {}
        }
        this.opType = 'add'
        this.opMode = buttonInfo.type
        this.dialogDetailVisible = true
        $(document).ready(() => {
          $(this.$refs.viewFormTab.$el)
            .appendTo('#app-main .app-container')
            .find('.mask')
            .css('z-index', 1999)
            .siblings('.dialog-container')
            .css('z-index', 2000)
          if (buttonInfo.setDefault) buttonInfo.setDefault()
        })
      } else if (buttonInfo.type === 'route') {
        this.$router.push(buttonInfo.routeInfo())
      }
    },
    // 更新
    doUpdate(buttonInfo) {
      if (!this.currentRow) {
        this.$notify(
          notifyInfo({
            msg: this.$t('biz.msg.noRowSelected')
          })
        )
        return
      }
      // 点击权限判断 如果返回为false 则验证不通过
      if (buttonInfo.validate && !buttonInfo.validate(this.currentRow)) {
        if (buttonInfo.msg) {
          this.$notify(notifyInfo({ msg: buttonInfo.msg }))
        }
        return
      }

      if (buttonInfo.type === 'dialog') {
        Vue.component('view-form-tab', buttonInfo.component)
        if (buttonInfo.getParam) {
          this.param = buttonInfo.getParam(this.currentRow)
        } else {
          this.param = this.currentRow
        }
        if (buttonInfo.initChoose) {
          this.initChooseParam = buttonInfo.initChoose()
        } else {
          this.initChooseParam = {}
        }
        this.opType = 'update'
        this.dialogDetailVisible = true
        $(document).ready(() => {
          $(this.$refs.viewFormTab.$el)
            .appendTo('#app-main .app-container')
            .find('.mask')
            .css('z-index', 1999)
            .siblings('.dialog-container')
            .css('z-index', 2000)
        })
      } else if (buttonInfo.type === 'route') {
        this.$router.push(buttonInfo.routeInfo())
      }
    },
    // 打印
    doPrint(buttonInfo) {
      Vue.component('view-form-tab', buttonInfo.component)
      if (buttonInfo.getParam) {
        this.param = buttonInfo.getParam()
      }
      this.dialogDetailVisible = true
      $(document).ready(() => {
        $(this.$refs.viewFormTab.$el)
          .appendTo('#app-main .app-container')
          .find('.mask')
          .css('z-index', 1999)
          .siblings('.dialog-container')
          .css('z-index', 2000)
        if (buttonInfo.setDefault) buttonInfo.setDefault()
      })
    },
    // 选中当前行
    handleSelectRow(val, oldVal) {
      this.$emit('selectRow', val, oldVal)
      this.currentRow = val
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
        const filterCol = this.tab.table.cols.filter(col => col.prop === column.property)[0]

        if (filterCol && filterCol.summary) {
          if (filterCol.format && filterCol.format.func) {
            const value = values.reduce((prev, curr) => {
              const value2 = Number(curr)
              if (!isNaN(value2)) {
                return Number(toolUtil.toDecimal2(prev).add(toolUtil.toDecimal2(curr)))
              } else {
                return Number(toolUtil.toDecimal2(prev))
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
    // 开始时间变化
    changeStartTime(date, pick) {
      if (pick) {
        this.$set(this.datePick, pick, {
          disabledDate(time) {
            return time < new Date(dateFormate(date, 'YYYY/MM/DD'))
          }
        })
      } else {
        this.datePick.dateEndBefore = {
          disabledDate(time) {
            return time < new Date(dateFormate(date, 'YYYY/MM/DD'))
          }
        }
      }
    },
    // 结束时间变化
    changeEndTime(date, pick) {
      if (pick) {
        this.$set(this.datePick, pick, {
          disabledDate(time) {
            return date ? time > new Date(dateFormate(date, 'YYYY/MM/DD')) : false
          }
        })
      } else {
        this.datePick.dateStartBefore = {
          disabledDate(time) {
            return date ? time > new Date(dateFormate(date, 'YYYY/MM/DD')) : false
          }
        }
      }
    }
  }
}
</script>

<style scoped>
div.bs-topbar-item {
  display: inline-block;
  margin-left: 2em;
}
span.bs-topbar-item-label {
  font-weight: normal;
}
div.bs-topbar-item-component {
  margin-left: 0.5em;
  display: inline-block;
}
</style>
