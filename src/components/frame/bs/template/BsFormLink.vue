<template>
  <header id='elHead' :style="{'width': clientWidth < 1366 ? (this.sidebar.opened && !app.isScreenFull ? '1163px' : '1323px') : 'auto'}">
    <el-form ref='queryForm' @submit.native.prevent label-position="left" :rules='rules' :inline="true" :model="form.listQuery.data" class='header-form-inline'>
      <el-row :gutter="20" style='width:94%;'>
        <template v-for='(f, index) in expandStatus ? form.formData : form.formData.slice(0, 4)'>
          <el-col :span="6" v-if='f.isShow' :key='index'>
            <!-- 日期 -->
            <el-form-item v-if='f.type === "daterange"' :label="$t(f.label)" :prop='f.bind'>
              <el-date-picker v-model="form.listQuery.data[f.bind]" type="daterange" range-separator="~" start-placeholder="" end-placeholder="" v-bind='f.attrs' @change='changeDaterangeTime(f)'>
              </el-date-picker>
            </el-form-item>
            <el-form-item v-else-if='f.type === "date"' :label="$t(f.label)">
              <template v-if='f.props instanceof Array'>
                <el-row :gutter="0">
                  <el-col :span="11">
                    <el-date-picker v-model="form.listQuery.data[f.props[0]]" v-bind='f.attrs' v-on='f.event' @change="(date) => changeStartTime(date, f.attrs.pickEnd)" :picker-options='f.attrs.pickStart ? datePick[f.attrs.pickStart] : datePick.dateStartBefore' :type="f.type" :placeholder="$t('biz.placeholder.dateInput')">
                    </el-date-picker>
                  </el-col>
                  <el-col :span="2" align='center'>~</el-col>
                  <el-col :span="11">
                    <el-date-picker v-model="form.listQuery.data[f.props[1]]" v-bind='f.attrs' v-on='f.event' @change="(date) => changeEndTime(date, f.attrs.pickStart)" :picker-options='f.attrs.pickEnd ? datePick[f.attrs.pickEnd] : datePick.dateEndBefore' :type="f.type" :placeholder="$t('biz.placeholder.dateInput')">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </template>
              <template v-else>
                <el-date-picker v-model="form.listQuery.data[f.prop]" v-bind='f.attrs' :type="f.type" :placeholder="$t('biz.placeholder.dateInput')">
                </el-date-picker>
              </template>
            </el-form-item>
            <!-- 单选框 -->
            <el-form-item v-else-if='f.type === "radio"' :label="$t(f.label)">
              <el-radio-group v-model="form.listQuery.data[f.prop]">
                <el-radio v-for='item in f.list' :key="item.value" :label="item.value" v-bind='f.attrs'>{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 多选框 -->
            <el-form-item v-else-if='f.type === "checkbox"' :label="$t(f.label)">
              <el-checkbox-group v-model="form.listQuery.data[f.prop]">
                <el-checkbox v-for='item in f.list' :key="item.value" :label="item.value" v-bind='f.attrs'>{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 数值区间 -->
            <el-form-item v-else-if='f.type === "numberInterval"' :label="$t(f.label)">
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
              <el-select v-if='f.list' v-model="form.listQuery.data[f.prop]" v-bind='f.attrs' :placeholder="$t('biz.placeholder.choose')" @change='f.event && f.event.change()'>
                <el-option v-for="item in f.list" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <!-- 公用组件 -->
              <component v-else :is='f.element' v-model='form.listQuery.data[f.prop]' v-bind='f.attrs' v-on='f.event' :attrs='f.attrs' @changeAll='f.event && f.event.changeAll' @handleSelect='dialogSelect(f)'></component>
            </el-form-item>
          </el-col>
        </template>
        <!-- 更多 -->
        <template v-if='expandStatus'>
          <template v-for='item in items'>
            <el-col :span="6" v-if='item.isShow' :key='item.bind' class='el-form-item-more'>
              <div class='el-form-item-more-left'>
                <el-select clearable v-model="extraQuery[item.bind].label" filterable :placeholder="$t('biz.placeholder.choose')" @change='handleExtraQueryChange'>
                  <el-option v-for='i in item.list' :label="i.label" :value="i.prop" :key="i.prop" :disabled="extraChoice.includes(i.prop)"></el-option>
                </el-select>
              </div>
              <div class='el-form-item-more-right'>
                <el-input v-model='extraQuery[item.bind].value'></el-input>
              </div>
            </el-col>
          </template>
          <el-col :span="6" v-if='form.moreShowFlg && addQueryConditionVisible'>
            <span class='more-query' @click='addQueryCondition'>查询扩展&nbsp;+</span>
          </el-col>
        </template>
        <el-col class="none"></el-col>
      </el-row>
      <!-- 右侧搜索按钮 -->
      <div class="search-btn" v-permission="['query']">
        <el-button type="primary" :loading="loading" icon="el-icon-search" @click="onSubmit" v-db-click>
          {{$t('biz.lbl.search')}}
        </el-button>
      </div>
      <!-- 展开收起 -->
      <div class='expand' @click='expand' v-show='form.moreShowFlg || form.formData.length > 4'>
        <i v-if='expandStatus' class='el-icon-arrow-up'></i>
        <i v-else class='el-icon-arrow-down'></i>
      </div>
    </el-form>
    <!-- 二级弹窗 -->
    <view-form ref='viewForm' v-if='dialogSelectVisible' @closeHandler='dialogHandler'></view-form>
  </header>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { dateFormate } from '@/utils/frame/base/index'
import { encriptPwd } from '@/utils/frame/base/encript.js'
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
      loading: false,
      expandStatus: process.env.EXPAND_FLG,
      addQueryConditionVisible: true,
      datePick: {
        dateStartBefore: {},
        dateEndBefore: {}
      },
      items: [],
      extraQuery: {},
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
    ...mapGetters(['sidebar', 'clientWidth'])
  },
  beforeMount() {
    // 组件注册
    registerComponent(this.form.formData)
    // 初始化数据
    this.form.formData.forEach(v => {
      if ((v.type === 'date' || v.type === 'daterange') && v.props instanceof Array && !v.default) {
        const date = new Date()
        const month = date.getMonth() > 8 ? date.getMonth() + 1 + '' : '0' + (date.getMonth() + 1)
        const day = date.getDate() > 9 ? date.getDate() + '' : '0' + date.getDate()

        // 当前日前前一个月
        const startdate = new Date()
        startdate.setMonth(startdate.getMonth() - 1)
        const startmonth = startdate.getMonth() > 8 ? startdate.getMonth() + 1 + '' : '0' + (startdate.getMonth() + 1)
        const startday = startdate.getDate() > 9 ? startdate.getDate() + '' : '0' + startdate.getDate()
        this.$set(this.form.listQuery.data, v.props[0], startdate.getFullYear() + startmonth + startday)
        this.changeStartTime(startdate.getFullYear() + startmonth + startday, v.attrs.pickEnd)
        // 当月第一天
        this.$set(this.form.listQuery.data, v.props[1], date.getFullYear() + month + day)
        this.changeEndTime(date.getFullYear() + month + day, v.attrs.pickStart)

        if (v.type === 'daterange' && v.bind) {
          this.$set(this.form.listQuery.data, v.bind, [this.form.listQuery.data[v.props[0]], this.form.listQuery.data[v.props[1]]])
        }
      } else if (v.props instanceof Array && v.default instanceof Array) {
        this.$set(this.form.listQuery.data, v.props[0], v.default[0])
        this.changeStartTime(v.default[0], v.attrs.pickEnd)
        this.$set(this.form.listQuery.data, v.props[1], v.default[1])
        this.changeEndTime(v.default[1], v.attrs.pickStart)
      } else if (v.default) {
        this.$set(this.form.listQuery.data, v.prop, v.default)
      }

      // 校验规则
      // 根据isShow字段判断是否显示
      if (v.isShow === undefined) {
        v.isShow = true
      }
      if (v.validate) {
        this.rules[v.prop] = v.validate
        if (v.validate[0].validatorFn && typeof v.validate[0].validatorFn === 'function') {
          v.validate[0].validator = (rule, value, callback) => {
            v.validate[0].validatorFn(rule, value, callback, v.prop)
          }
        }
      }
    })
  },
  methods: {
    // 时间变化
    changeDaterangeTime(form) {
      this.form.listQuery.data[form.props[0]] = this.form.listQuery.data[form.bind] ? this.form.listQuery.data[form.bind][0] : ''
      this.form.listQuery.data[form.props[1]] = this.form.listQuery.data[form.bind] ? this.form.listQuery.data[form.bind][1] : ''
    },
    // 查询
    onSubmit() {
      for (const i in this.extraQuery) {
        if (this.extraQuery[i].label) {
          this.form.listQuery.data[this.extraQuery[i].label] = this.extraQuery[i].value
        }
      }
      this.form.formData.forEach(v => {
        if (v.attrs && v.attrs.encript) {
          this.form.listQuery.data[v.prop] = encriptPwd(this.form.listQuery.data[v.prop])
        }
      })
      if (!this.$parent.mainData) return
      this.$refs.queryForm.validate(valid => {
        if (valid) {
          this.$parent.form.listQuery.current = 1
          if (this.$parent.$refs.bsTable) {
            this.$parent.$refs.bsTable.getList({ name: 'search' })
          } else {
            this.$parent.getList({ name: 'search' })
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
      if (param) {
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
    // 展开收起
    expand() {
      if (!this.$parent.mainData) return
      this.expandStatus = !this.expandStatus
      this.$nextTick(() => {
        this.$parent.$refs.bsTable.tableComputed()
      })
    },
    // 查询更多条件
    addQueryCondition() {
      if (!this.$parent.mainData) return
      const list = []
      const hasList = Object.keys(this.form.listQuery.data)
      this.$parent.mainData.table.cols.forEach(v => {
        if (!hasList.includes(v.prop)) {
          list.push(v)
        }
      })
      this.$set(this.extraQuery, `extra${this.items.length}`, {
        label: '',
        value: ''
      })
      this.items.push({
        list: list,
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
