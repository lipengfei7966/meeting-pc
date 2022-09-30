<template>
  <header id='elHead' :style="{'width': (clientWidth < 1366 && !app.isScreenFull) ? (this.sidebar.opened ? '1163px' : '1323px') : 'auto'}">
    <el-form ref='queryForm' @submit.native.prevent label-position="left" :rules='rules' :inline="true" :model="form.listQuery.data" class='header-form-inline'>
      <el-row :gutter="20" style='width:94%;' justify="space-between">
        <template v-for='(f, index) in expandStatus ?  form.formData[0].attrs.cols ? form.formData.slice(0,2) : form.formData.slice(0, 3) :form.formData'>
          <el-col :span="f.attrs && f.attrs.cols ? f.attrs.cols * 6 : 6" v-if='f.isShow' :key='index'>
            <!-- 日期 -->
            <el-form-item v-if='f.type === "daterange" ||f.type === "datetimerange"' :label="$t(f.label)" :prop='f.bind'>
              <el-date-picker v-model="form.listQuery.data[f.bind]" type="daterange" range-separator="~" start-placeholder="" end-placeholder="" v-bind='f.attrs' @change='changeDaterangeTime(f)'>
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
            <el-form-item v-else-if='f.type === "radio"' :label="$t(f.label)" :prop='f.prop'>
              <el-radio-group v-model="form.listQuery.data[f.prop]">
                <el-radio v-for='item in f.list || $t(f.dictlist)' :key="item.value" :label="item.value" v-bind='f.attrs'>{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 多选框 -->
            <el-form-item v-else-if='f.type === "checkbox"' :label="$t(f.label)" :prop='f.prop'>
              <el-checkbox-group v-model="form.listQuery.data[f.prop]">
                <el-checkbox v-for='item in f.list || $t(f.dictlist)' :key="item.value" :label="item.value" v-bind='f.attrs'>{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 数值区间 -->
            <el-form-item v-else-if='f.type === "numberInterval"' :label="$t(f.label)" :prop='f.prop'>
              <el-row :gutter="0">
                <el-col :span="11">
                  <input-formatter :min='f.attrs.startMin' :max='f.attrs.startMax !== undefined ? f.attrs.startMax : form.listQuery.data[f.props[1]]' v-model="form.listQuery.data[f.props[0]]" v-bind='f.attrs' size="mini"></input-formatter>
                </el-col>
                <el-col :span="2" align='center'>~</el-col>
                <el-col :span="11">
                  <input-formatter :min='f.attrs.endMin !== undefined ? f.attrs.endMin : form.listQuery.data[f.props[0]]' :max='f.attrs.endMax' v-model="form.listQuery.data[f.props[1]]" v-bind='f.attrs' size="mini"></input-formatter>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 下拉输入 -->
            <el-form-item v-else :label="$t(f.label)" :prop='f.prop'>
              <!-- 字典码表 -->
              <el-select v-if='f.dictlist' v-model="form.listQuery.data[f.prop]" v-bind='f.attrs' :placeholder="$t('biz.placeholder.choose')" @change='f.event && f.event.change()'>
                <el-option v-for="item in $t(f.dictlist)" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <!-- 字典码表list -->
              <el-select v-else-if='f.list && (!f.attrs || !f.attrs.data)' v-model="form.listQuery.data[f.prop]" v-bind='f.attrs' :placeholder="$t('biz.placeholder.choose')" @change='f.event && f.event.change()'>
                <el-option v-for="item in f.list" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <!-- 公用组件 -->
              <component v-else :is='f.element' v-model='form.listQuery.data[f.prop]' v-bind='f.attrs' v-on='f.event' :attrs='f.attrs' :newList='f.list' @change='f.event && f.event.change' @changeAll='f.event && f.event.changeAll' @handleSelect='dialogSelect(f)'></component>
            </el-form-item>
          </el-col>
        </template>
        <!-- 更多 -->
        <template v-if='!expandStatus'>
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
      <el-col :span="6">
        <div class="button-group clearfix">
            <div class="button-group-item search-btn" v-permission="['query']">
            <el-button :loading="loading" @click="onReset" v-db-click>
              重置
            </el-button>
          </div> 
          <div class="button-group-item search-btn" v-permission="['query']">
            <el-button type="primary" :loading="loading" @click="onSubmit" v-db-click>
              {{$t('biz.lbl.search')}}
            </el-button>
          </div>
          <div class="button-group-item search-btn" @click='expand' v-show='form.moreShowFlg || form.formData.length > 4' v-permission="['query']">
            <el-button type="text" class="fold" :loading="loading" v-db-click>
              {{expandText}}
            </el-button>
            <span :class="['jt',{ 't': !expandStatus}]"></span>
            <!-- <span class="jt t"></span> -->
          </div>
        </div>
      </el-col>
      <!-- 展开收起 -->
      <!-- <div class='expand'>
        <i v-if='expandStatus' class='el-icon-arrow-up'></i>
        <i v-else class='el-icon-arrow-down'></i>
      </div> -->
    </el-form>
    <!-- 二级弹窗 -->
    <view-form ref='viewForm' v-if='dialogSelectVisible' @closeHandler='dialogHandler'></view-form>
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
      loading: false,
      expandStatus: process.env.EXPAND_FLG,
      expandText:'展开',
      addQueryConditionVisible: true,
      datePick: {
        dateStartBefore: {},
        dateEndBefore: {}
      },
      labelNames: [],
      items: [],
      extraQuery: {},
      extraChoice: [],
      rules: {},
      dialogSelectVisible: false,
      dialogSelectProp: {}
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
    ...mapGetters(['sidebar', 'clientWidth'])
  },
  beforeMount() {
    //默认展示查询更多
    if (this.form.moreShowFlg === undefined) {
      this.form.moreShowFlg = process.env.DEFAULT_MORE_SHOW_FLG
    }
    // 组件注册
    registerComponent(this.form.formData)
    // 初始化数据
    this.form.formData.forEach(v => {
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

        if ((v.type === 'daterange' || v.type === 'datetimerange') && v.bind && v.default) {
          this.$set(this.form.listQuery.data, v.bind, [this.form.listQuery.data[v.props[0]], this.form.listQuery.data[v.props[1]]])
        }
      } else if (v.default) {
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
    })
  },
  mounted() {
    this.checkQueryCondition()
  },
  methods: {
    // 重置
    onReset(){
      for (const k in this.form.listQuery.data) {
        this.form.listQuery.data[k] = ''
      }
      this.items = [];
      this.expandStatus = process.env.EXPAND_FLG;
      this.expandText = !this.expandStatus ? '收起' : '展开'
    },
    // 时间变化
    changeDaterangeTime(form) {
      this.form.listQuery.data[form.props[0]] = this.form.listQuery.data[form.bind] ? this.form.listQuery.data[form.bind][0] : ''
      this.form.listQuery.data[form.props[1]] = this.form.listQuery.data[form.bind] ? this.form.listQuery.data[form.bind][1] : ''
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

      this.form.formData.forEach(v => {
        if (v.attrs && v.attrs.encript) {
          this.form.listQuery.data[v.prop] = encriptPwd(this.form.listQuery.data[v.prop])
        }
      })
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
          return false
        }
      })
    },
    // 打开弹窗选择数据
    dialogSelect(col) {
      if (col.component) {
        // 注册组件
        Vue.component('view-form', col.component)
        this.dialogSelectVisible = true
        this.dialogSelectProp = col
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
      if (param && this.dialogSelectProp && !this.$toolUtil.isEmptyObject(this.dialogSelectProp)) {
        this.$nextTick(() => {
          if (this.dialogSelectProp.beforeCallback) {
            if (this.dialogSelectProp.beforeCallback(param)) {
              this.dialogSelectVisible = false
            } else {
              return false
            }
          } else {
            this.dialogSelectVisible = false
          }
          if (typeof this.dialogSelectProp.callback === 'function') {
            this.dialogSelectProp.callback(param)
          } else {
            this.$emit('closeDialog', param)
          }
        })
      }
      this.dialogSelectVisible = false
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
    // 计算列表高度
    tableComputed() {
      this.$nextTick(() => {
        const elHead = document.getElementById('elHead')
        if (elHead) {
          const getElHeadHeight = window.getComputedStyle(elHead).height.split('px')[0]
          if (this.$parent.$refs.bsTable) {
            this.$parent.$refs.bsTable.tableHeight = this.clientWidth < 1366 ? (this.$parent.$refs.bsTable.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 188 : this.clientHeight - getElHeadHeight - 158) : this.$parent.$refs.bsTable.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 172 : this.clientHeight - getElHeadHeight - 142
          }
        }
      })
    },
    // 展开收起
    expand() {
      this.expandStatus = !this.expandStatus
      this.expandText = !this.expandStatus ? '收起' : '展开'
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
