<template>
  <header id="elHead" :style="{ width: hasLayout ? (clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto') : 'auto' }">
    <el-form ref="queryForm" @submit.native.prevent label-position="left" :rules="rules" :inline="true" :model="form.listQuery.data" class="header-form-inline">
      <el-row :gutter="20" style="width: 94%">
        <template v-for='(f, index) in expandStatus ? form.formData : form.formData.slice(0, 4)'>
          <el-col :span="6" v-if="f.isShow" :key="index">
            <!-- 日期 -->
            <el-form-item v-if='f.type === "daterange" ||f.type === "datetimerange"' :label="$t(f.label)" :prop='f.prop'>
              <el-date-picker v-model="form.listQuery.data[f.prop]" :picker-options="f['picker-options']" type="daterange" range-separator="~" start-placeholder="" end-placeholder="" v-bind='f.attrs' @change='changeDaterangeTime(f)'>
              </el-date-picker>
            </el-form-item>
            <template v-else-if='f.type === "date" ||f.type === "datetime"|| f.type === "year" || f.type === "month" || f.type === "week"'>
              <el-form-item v-if='f.props && f.props instanceof Array && f.props.length>1' :required='Array.isArray(form.props) && Array.isArray(form.validate)' :label="$t(f.label)">
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-date-picker v-model="form.listQuery.data[f.props[0]]" v-bind='f.attrs' v-on='f.event' @change="(date) => { changeStartTime(date, f.attrs.pickEnd) }" :picker-options='f.attrs.pickStart ? datePick[f.attrs.pickStart] : datePick.dateStartBefore' :type="f.type" :placeholder="$t('biz.placeholder.dateInput')">
                    </el-date-picker>
                  </el-col>
                  <el-col :span="2" align='center'>~</el-col>
                  <el-col :span="11">
                    <el-date-picker v-model="form.listQuery.data[f.props[1]]" v-bind='f.attrs' v-on='f.event' @change="(date) => { changeEndTime(date, f.attrs.pickStart) }" :picker-options='f.attrs.pickEnd ? datePick[f.attrs.pickEnd] : datePick.dateEndBefore' :type="f.type" :placeholder="$t('biz.placeholder.dateInput')">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item v-else :label="$t(f.label)" :prop='f.prop'>
                <el-date-picker v-model="form.listQuery.data[f.prop]" v-bind='f.attrs' :type="f.type" :placeholder="$t('biz.placeholder.dateInput')">
                </el-date-picker>

              </el-form-item>
            </template>
            <!-- 单选框 -->
            <el-form-item v-else-if="f.type === 'radio'" :label="f.label">
              <el-radio-group v-model="form.listQuery.data[f.prop]">
                <el-radio v-for="item in dataDictList[f.list]" :key="item.value" :label="item.value" v-bind="f.attrs">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 多选框 -->
            <el-form-item v-else-if="f.type === 'checkbox'" :label="f.label">
              <el-checkbox-group v-model="form.listQuery.data[f.prop]">
                <el-checkbox v-for="item in dataDictList[f.list]" :key="item.value" :label="item.value" v-bind="f.attrs">{{ item.label }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 数值区间 -->
            <el-form-item v-else-if="f.type === 'numberInterval'" :label="f.label">
              <el-row :gutter="0">
                <el-col :span="11">
                  <input-formatter :min="f.attrs.startMin" :max="f.attrs.startMax !== undefined ? f.attrs.startMax : form.listQuery.data[f.props[1]]" v-model="form.listQuery.data[f.props[0]]" v-bind="f.attrs" size="mini"></input-formatter>
                </el-col>
                <el-col :span="2" align="center">~</el-col>
                <el-col :span="11">
                  <input-formatter :min="f.attrs.endMin !== undefined ? f.attrs.endMin : form.listQuery.data[f.props[0]]" :max="f.attrs.endMax" v-model="form.listQuery.data[f.props[1]]" v-bind="f.attrs" size="mini"></input-formatter>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 下拉输入 -->
            <el-form-item v-else :label="f.label" :prop="f.prop">
              <!-- 字典码表 -->
              <el-select v-if="f.list && dataDictList[f.list]" v-model="form.listQuery.data[f.prop]" v-bind="f.attrs" placeholder="" @change="f.event && f.event.change()">
                <el-option v-for="item in dataDictList[f.list]" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <!-- 字典码表list -->
              <el-select v-else-if="f.list && (!f.attrs || !f.attrs.data)" v-model="form.listQuery.data[f.prop]" v-bind="f.attrs" placeholder="" @change="f.event && f.event.change()">
                <el-option v-for="item in f.list" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <!-- 公用组件 -->
              <component v-else :is="f.element" v-model="form.listQuery.data[f.prop]" v-bind="f.attrs" v-on="f.event" :attrs="f.attrs" :newList="f.list" @changeAll="f.event && f.event.changeAll" @handleSelect="dialogSelect(f)"></component>
            </el-form-item>
          </el-col>
        </template>
        <!-- 更多 -->
        <template v-if='expandStatus'>
          <el-col :span="6" v-for='item in items' :key='item.bind' class='el-form-item-more'>
            <div class='el-form-item-more-left'>
              <el-select clearable v-model="extraQuery[item.bind].label" filterable :placeholder="$t('biz.placeholder.choose')" @change='handleExtraQueryChange'>
                <el-option v-for='i in item.list' :label="i.label" :value="i.prop" :key="i.prop" :disabled="extraChoice.includes(i.prop)"></el-option>
              </el-select>
            </div>
            <div class='el-form-item-more-right'>
              <el-input v-model='extraQuery[item.bind].value' clearable class="input-with-select">
                <el-select v-model="extraQuery[item.bind].type" slot="prepend" placeholder="条件" style="width: 60px;">
                  <el-option label="等于" value="="></el-option>
                  <el-option label="包含" value="like"></el-option>
                  <el-option label="大于" value=">="></el-option>
                  <el-option label="小于" value="<="></el-option>
                  <el-option label="从属" value="in"></el-option>
                  <el-option label="为空" value="isnull"></el-option>
                  <el-option label="不为空" value="notnull"></el-option>
                </el-select>
              </el-input>
            </div>
          </el-col>
          <el-col :span="6" v-if='form.moreShowFlg && addQueryConditionVisible'>
            <span class='more-query' @click='addQueryCondition'>查询扩展&nbsp;+</span>
          </el-col>
        </template>
        <el-col class="none"></el-col>
      </el-row>
      <!-- 右侧搜索按钮 -->
      <div class="search-btn">
        <el-button type="primary" :loading="loading" icon="el-icon-search" @click="onSubmit" v-db-click> 查询 </el-button>
      </div>
      <!-- 展开收起 -->
      <div class='expand' @click='expand' v-show='form.moreShowFlg || form.formData.length > 4'>
        <i v-if='expandStatus' class='el-icon-arrow-up'></i>
        <i v-else class='el-icon-arrow-down'></i>
      </div>
    </el-form>
    <!-- 二级弹窗 -->
    <view-form ref="viewForm" v-if="dialogSelectVisible" @closeHandler="dialogHandler" @searchHandler="searchHandler"></view-form>
  </header>
</template>
<style>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { dateFormate } from '@/utils/frame/base/index'
import { encriptPwd } from '@/utils/frame/base/encript.js'
import toolUtil from '@/utils/frame/base/toolUtil.js'
import { notifyError } from '@/utils/frame/base/notifyParams'

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
      hasLayout: true,
      func: toolUtil,
      loading: false,
      expandStatus: process.env.EXPAND_FLG,
      addQueryConditionVisible: true,
      datePick: {
        dateStartBefore: {},
        dateEndBefore: {}
      },
      labelNames: [],
      f: {},
      items: [],
      extraQuery: {},
      extraQueryForCode: {},
      extraChoice: [],
      rules: {},
      dialogSelectVisible: false
    }
  },
  inject: ['app'],
  provide() {
    return {
      BsForm: this
    }
  },
  props: {
    // 查询信息
    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(['dataDictList', 'sidebar', 'clientWidth'])
  },
  mounted() {
    this.hasLayout = this.$route.path.includes('/layout')
  },
  beforeMount() {
    // 组件注册
    registerComponent(this.form.formData)
    if (this.form.moreQueryComponent) {
      Vue.component('view-form', this.form.moreQueryComponent)
    } else {
      Vue.component('view-form', () => import('@/components/frame/bs/query/BsMoreQuery'))
    }
    // 初始化数据
    this.form.formData.forEach((v, index) => {
      if (v.attrs && v.attrs['picker-options']) {
        v['picker-options'] = new Function(`return ${this.func[v.attrs['picker-options']]}`)()()
      } else {
        v['picker-options'] = this.$toolUtil.getPickerOptions()
      }
      if (v.props instanceof Array && (v.type === 'date' || v.type === 'datetime' || v.type === 'month' || v.type === 'daterange' || v.type === 'datetimerange')) {
        let defaultVal = ['', '']
        if (v.default === undefined) {
          v.default = this.$toolUtil.getScopeThreeMonth()
        }
        defaultVal[0] = v.default && v.default[0]
        defaultVal[1] = v.default && v.default[1]
        if (v.defaultFunc && !v.defaultFunc.includes('.')) {
          defaultVal = new Function(`return ${this.func[v.defaultFunc]}`)()()
        }
        this.$set(this.form.listQuery.data, v.props[0], defaultVal[0])
        this.changeStartTime(defaultVal[0], v.attrs.pickEnd)
        this.$set(this.form.listQuery.data, v.props[1], defaultVal[1])
        this.changeEndTime(defaultVal[1], v.attrs.pickStart)

        if ((v.type === 'daterange' || v.type === 'datetimerange') && v.prop && v.default) {
          this.$set(this.form.listQuery.data, v.prop, [this.form.listQuery.data[v.props[0]], this.form.listQuery.data[v.props[1]]])
        }
      } else if (v.default) {
        if (v.type === 'date' || v.type === 'year' || v.type === 'month' || v.type === 'week') {
          if (v.default.indexOf('now') > -1) {
            v.default = this.$toolUtil.todayStr()
          }
        }
        this.$set(this.form.listQuery.data, v.prop, v.default)
      } else if (v.type === 'checkbox' || (v.attrs && v.attrs.multiple)) {
        this.$set(this.form.listQuery.data, v.prop, [])
      } else {
        this.$set(this.form.listQuery.data, v.prop, '')
      }
      this.labelNames.push(this.$t(v.label))

      // 根据isShow字段判断是否显示
      if (v.isShow === undefined) {
        v.isShow = true
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
      //init route param
      if (this.$route.params && this.$route.params[v.prop]) {
        this.form.listQuery.data[v.prop] = this.$route.params[v.prop]
      }
      this.$set(this.extraQueryForCode, `extra` + index, v)
    })
    this.initExtraQuery()
    //初始化父组件
    if (this.$parent.showTab !== undefined) {
      this.$parent.showTab = true
    }
  },
  methods: {
    initExtraQuery() {
      this.form.formData.forEach(v => {
        if (v.attrs && v.attrs.encript) {
          this.form.listQuery.data[v.prop] = encriptPwd(this.form.listQuery.data[v.prop])
        }
      })
      const bsQueryExtras = []
      for (const i in this.extraQueryForCode) {
        if (this.extraQueryForCode[i].label) {
          let dictVal = ''
          if (this.$parent.mainData !== undefined) {
            const prop = this.$parent.mainData.table.cols.filter(item => item.prop === this.extraQueryForCode[i].prop)[0]

            if (prop && prop.format && prop.format.dictType && typeof prop.format.dictType === 'string') {
              if (this.dataDictList[prop.format.dictType]) {
                dictVal = this.dataDictList[prop.format.dictType].filter(item => item.label === this.form.listQuery.data[this.extraQueryForCode[i].prop])[0]
              }
            }
          }

          if (this.extraQueryForCode[i].type !== 'daterange' && this.extraQueryForCode[i].props && this.extraQueryForCode[i].props.length === 2) {
            if (this.form.listQuery.data[this.extraQueryForCode[i].props[0]] || this.form.listQuery.data[this.extraQueryForCode[i].props[1]]) {
              let tempValue = [this.form.listQuery.data[this.extraQueryForCode[i].props[0]], this.form.listQuery.data[this.extraQueryForCode[i].props[1]]]
              bsQueryExtras.push({
                prop: this.extraQueryForCode[i].queryProp ? this.extraQueryForCode[i].queryProp : this.extraQueryForCode[i].prop,
                value: tempValue,
                type: this.extraQueryForCode[i].type,
                dbType: this.extraQueryForCode[i].dbDataType,
                condition: this.extraQueryForCode[i].condition,
                repCondition: this.extraQueryForCode[i].repCondition
              })
            }
          } else {
            bsQueryExtras.push({
              prop: this.extraQueryForCode[i].queryProp ? this.extraQueryForCode[i].queryProp : this.extraQueryForCode[i].prop,
              value: dictVal ? dictVal.value : this.form.listQuery.data[this.extraQueryForCode[i].prop],
              type: this.extraQueryForCode[i].type,
              dbType: this.extraQueryForCode[i].dbDataType,
              condition: this.extraQueryForCode[i].condition,
              repCondition: this.extraQueryForCode[i].repCondition
            })
          }
        }
      }
      //bsQueryExtrasForCode
      this.form.listQuery.bsQueryExtrasForCode = bsQueryExtras

      this.$parent.form.listQuery.current = 1
    },

    //刷新
    doRefresh(initFlag) {
      this.$refs.queryForm.validate(valid => {
        if (valid) {
          if (initFlag) {
            this.$parent.form.listQuery.current = 1
          }
          if (this.$parent.$refs.bsTable) {
            this.$parent.$refs.bsTable.getList({ name: 'search' })
          } else {
            if (this.$parent.getList) {
              this.$parent.getList({ name: 'search' })
            }
          }
        } else {
          return false
        }
      })
    },
    // 查询
    onSubmit() {
      this.loading = true
      //生成查询
      this.initExtraQuery()
      //更多查询条件
      const bsQueryExtras = []
      if (!this.$parent.mainData) return
      for (const i in this.extraQuery) {
        if (this.extraQuery[i].label) {
          let dictVal = ''
          const prop = this.$parent.mainData.table.cols.filter(item => item.prop === this.extraQuery[i].label)[0]
          if (prop.format && prop.format.dict instanceof Array) {
            dictVal = prop.format.dict.filter(item => item.label === this.extraQuery[i].value)[0]
          }
          bsQueryExtras.push({
            prop: this.extraQuery[i].label,
            value: dictVal ? dictVal.value : this.extraQuery[i].value,
            type: this.extraQuery[i].type
          })
        }
      }
      this.form.listQuery.bsQueryExtras = bsQueryExtras

      this.$refs.queryForm.validate(valid => {
        if (valid) {
          this.$parent.form.listQuery.current = 1

          if (this.$parent.$refs.bsTable) {
            this.$parent.$refs.bsTable.getList({ name: 'search' })
          } else {
            if (this.$parent.getList) {
              this.$parent.getList({ name: 'search' })
            }
          }
        } else {
          this.$notify(notifyError({ msg: '请检查红框的输入信息' }))
          this.loading = false

          return false
        }
      })
    },
    // 更多查询条件
    setMoreQuery() {
      // 注册组件

      this.dialogSelectVisible = true
      // 将弹窗插入body防止被遮盖
      $(document).ready(() => {
        $(this.$refs.viewForm.$el).appendTo('body')
        $('body > .dialog-wrapper > .mask')
          .css('z-index', 1999)
          .siblings('.dialog-container')
          .css('z-index', 2000)
      })
    },
    // 打开弹窗选择数据
    dialogSelect(col) {
      if (col.component) {
        // 注册组件
        Vue.component('view-form', col.component)
        this.dialogSelectVisible = true
        // 将弹窗插入body防止被遮盖
        $(document).ready(() => {
          $(this.$refs.viewForm.$el).appendTo('body')
          $('body > .dialog-wrapper > .mask')
            .css('z-index', 1999)
            .siblings('.dialog-container')
            .css('z-index', 2000)
        })
      }
    },
    // 编辑关闭回调
    dialogHandler(param) {
      this.dialogSelectVisible = false
    },
    searchHandler(param) {
      if (param) {
        this.form.listQuery.bsQueryExtrasForCode = param
        this.$parent.$refs.bsTable.getList()
      }
    },
    // 时间变化
    changeDaterangeTime(form) {
      this.form.listQuery.data[form.props[0]] = this.form.listQuery.data[form.bind] ? this.form.listQuery.data[form.bind][0] : ''
      this.form.listQuery.data[form.props[1]] = this.form.listQuery.data[form.bind] ? this.form.listQuery.data[form.bind][1] : ''
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
    },
    // 展开收起
    expand() {
      this.expandStatus = !this.expandStatus
      if (!this.$parent.mainData) return
      this.$nextTick(() => {
        this.$parent.$refs.bsTable.tableComputed()
      })
    },
    checkQueryCondition() {
      if (!this.$parent.mainData) return
      const list = []
      const hasList = Object.keys(this.form.listQuery.data)
      this.$parent.mainData.table.cols.forEach(v => {
        if (v.sortable !== false && v.isShow) {
          list.push({
            label: this.$t(v.label),
            prop: v.prop
          })
        }
      })
      if (list.length === 0) {
        this.addQueryConditionVisible = false
      }
    },
    // 查询更多条件
    addQueryCondition() {
      if (!this.$parent.mainData) return
      const list = []
      const hasList = Object.keys(this.form.listQuery.data)
      this.$parent.mainData.table.cols.forEach(v => {
        if (v.sortable !== false && v.isShow) {
          list.push({
            label: this.$t(v.label),
            prop: v.prop
          })
        }
      })
      this.$set(this.extraQuery, `extra${this.items.length}`, {
        label: '',
        value: '',
        type: '='
      })
      this.items.push({
        list,
        bind: `extra${this.items.length}`
      })
      this.$nextTick(() => {
        this.$parent.$refs.bsTable.tableComputed()
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
    }
  }
}
</script>
