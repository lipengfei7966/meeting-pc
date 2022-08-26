<template>
  <div>
    <el-select ref='bsComboxSelect' class="el-icon-search_1" :filterable="true" v-model="newValue" v-bind='attrs' :remote="true" :remote-method="remoteMethod" :filter-method="filterMethod" :loading='loading' :placeholder="$t('biz.placeholder.choose')" @change="change" @visible-change="visibleChange" @click.native="listDataShow($event)">
      <el-option v-for="item in list" :key="item.code" :label="item.name" :disabled="item.disabled" :value="item.code">
        <span v-if="item.showName" style="float:left;margin-right:2px;">{{ item.showName }}</span>
        <span v-if="item.showCode" style="float:right;color:#8492a6;">{{ item.showCode }}</span>
      </el-option>
    </el-select>
    <bs-combox-select-list ref='bsComboxSelectList' v-if='dialogListVisible' @closeHandler='dialogHandler' :opType="opType" :queryParamArr="queryParamArr" :multiple="this.attrs.multiple" :showUsedList="this.attrs.showUsedList" :funcCode="this.attrs.data"></bs-combox-select-list>
  </div>
</template>

<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      queryParamArr: [],
      oldValue: null,
      newValue: this.value,
      nameShowArr: [],
      codeShowArr: [],
      nameColumn: '',
      valueColumn: '',
      list: [],
      listAll: [],
      loading: false,
      dialogListVisible: false
    }
  },
  model: {
    prop: 'value',
    event: 'evn'
  },
  components: {},
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    opType: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    newList: {
      type: Array,
      default() {
        return []
      }
    },
    attrs: {
      type: Object,
      default() {
        // {
        //     data: String, 数据类型，必须
        //     params: {}或者[], 附加参数，可选
        // }
        return {}
      }
    }
  },
  watch: {
    attrs: {
      deep: true,
      handler() {
        if (this.attrs && this.attrs.data && this.attrs.params) {
          //兼容旧的对象转数组
          if (Array.isArray(this.attrs.params)) {
          } else {
            if (this.attrs.params instanceof Object && Object.keys(this.attrs.params).length) {
              this.queryParamArr = []
              Object.keys(this.attrs.params).forEach(item => {
                this.queryParamArr.push({
                  dbType: 'STR',
                  condition: '=',
                  prop: item,
                  type: this.getAttrType(row.extendProps[item]),
                  value: this.attrs.params[item]
                })
              })
            }
          }
        }
        this.initData()
      }
    },
    value(newVal) {
      if (!newVal) {
        this.newValue = null
      } else {
        // 当下拉数据已返回并且value值也返回
        if (this.list && this.list.length > 0) {
          this.changeVal(newVal)
        }
      }
    },
    queryParamArr(val) {
      console.log(val)
    },
    // 表单
    newList(list) {
      this.list = list
    }
  },
  computed: {
    ...mapGetters(['baseSelectList', 'remoteSelectData'])
  },
  beforeMount() {
    if (this.attrs && this.attrs.data && this.attrs.params) {
      //兼容旧的对象转数组
      if (Array.isArray(this.attrs.params)) {
      } else {
        if (this.attrs.params instanceof Object && Object.keys(this.attrs.params).length) {
          this.queryParamArr = []
          Object.keys(this.attrs.params).forEach(item => {
            this.queryParamArr.push({
              dbType: 'STR',
              condition: '=',
              prop: item,
              value: this.attrs.params[item]
            })
          })
        }
      }
    }
    this.initData()
  },
  mounted() {
    if (this.attrs.showMoreList && !this.attrs.disabled) {
      $('.el-icon-search_1 .el-input .el-input__suffix .el-input__suffix-inner .el-icon-')
        .addClass('el-icon-search')
        .removeClass('el-select__caret')
    }
  },
  methods: {
    async initData(name) {
      if (this.attrs.data) {
        //查询配置
        let queryData = {
          funcCode: this.attrs.data,
          queryInfo: name,
          queryParamArr: this.queryParamArr,
          dataAuth: this.attrs.dataAuth
        }
        const response = await request({
          url: '/api/platform/cfgCombox/selectData',
          method: 'POST',
          data: {
            funcModule: this.$t('route.' + this.$route.meta.title),
            funcOperation: this.$t('biz.btn.search'),
            data: queryData
          }
        })

        this.loading = false
        if (response.data) {
          this.nameColumn = response.data.nameColumn
          this.valueColumn = response.data.valueColumn
          this.nameShowArr = response.data.nameShowArr
          this.codeShowArr = response.data.codeShowArr

          let dataList = response.data.selectData

          for (let i = 0; i < dataList.length; i++) {
            this.getItemInfo(dataList[i])
          }
          this.nameColumn = response.data.nameColumn
          this.valueColumn = response.data.valueColumn

          this.list = dataList
          this.listAll = dataList
          // 远程搜索添加提示选项
          if (this.list.length === response.data.size) {
            this.list.push({
              name: `当前仅显示前${response.data.size}条，更多结果请输入搜索`,
              disabled: true
            })
          }

          // 当下拉数据已返回并且value值也返回
          if (this.value) this.changeVal(this.value)
        }
      }
    },
    // 判断基础档案下拉数据是否被删除，若删除则不赋值
    changeVal(newVal) {
      if (newVal && this.list && this.list.length > 0) {
        let isNull = false // 是否已被删除

        // 下拉选id集合
        const ids = this.list.map(item => {
          return item.code
        })
        const valueArray = []
        if (Array.isArray(newVal)) {
          newVal.forEach(data => {
            isNull = !ids.includes(data)
            if (isNull) {
              valueArray.push(data)
            }
          })
        } else {
          isNull = !ids.includes(newVal)
          if (isNull) {
            valueArray.push(newVal)
          }
        }
        if (valueArray && valueArray.length > 0) {
          let queryData = {
            funcCode: this.attrs.data,
            codeArr: valueArray
          }

          request({
            url: '/api/platform/cfgCombox/listSelectedData',
            method: 'POST',
            data: {
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: this.$t('biz.btn.search'),
              data: queryData
            }
          }).then(response => {
            if (response.data && response.data.length > 0) {
              response.data.forEach(data => {
                // 每次用于获取最新code集合，防止返回两条相同数据时unshift两次
                const codes = this.list.map(item => item.code)
                if (!codes.includes(data.code)) {
                  data.disabled = true
                  this.list.unshift(data)
                }
              })
              this.newValue = newVal
            }
          })
        } else {
          this.newValue = newVal
        }
      }
    },
    change(evl) {
      this.$emit('evn', evl)
      this.$emit('change', evl)
      if (Array.isArray(evl)) {
        const arr = []
        this.list.forEach(item => {
          // 自动码表用的不是item.code, 而是item.value，为什么判断key，而不是value呢？
          if (evl.includes(item.code) || evl.includes(item.key)) {
            arr.push(item)
          }
        })
        this.$emit('changeAll', arr)
      } else {
        this.list.forEach(item => {
          if (item.code === evl || item.key === evl) {
            this.$emit('changeAll', item)
          } else if (evl === '') {
            this.$emit('changeAll', evl)
          }
        })
      }
    },
    changeAll(item) {
      this.$emit('changeAll', item)
    },
    visibleChange(view) {
      this.$emit('visibleChange', view)
      if (!view) {
        setTimeout(() => {
          this.remoteMethod('')
        }, 50)
      }
    },
    filterMethod(query) {
      this.list = this.listAll.filter(item => {
        return item.code.includes(query) || item.name.includes(query)
      })
    },
    remoteMethod(query) {
      this.loading = true

      if (this.newList && this.newList.length) {
        if (query !== '') {
          this.loading = false
          this.list = this.newList.filter(item => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        } else {
          this.loading = false
          this.list = this.newList
        }
      } else {
        this.initData(query)
      }
    },

    // 打开更多数据选择弹窗
    listDataShow(e) {
      e.stopPropagation()
      if (this.attrs.disabled === true) {
        return
      }
      if (e.target.className.includes('el-icon-search')) {
        // 防止下拉选被默认打开
        this.$refs.bsComboxSelect.blur()
        // 保存当前组件配置项
        this.$emit('handleSelect')
        // 打开弹窗
        this.dialogListVisible = true
        $(document).ready(() => {
          $(this.$refs.bsComboxSelectList.$el)
            .appendTo('body')
            .find('.mask')
            .css('z-index', 1999)
            .siblings('.dialog-container')
            .css('z-index', 2000)
        })
      }
    },

    getItemInfo(data) {
      data.showName = data['name']
      if (this.nameShowArr) {
        data.showName = ''
        this.nameShowArr.forEach(field => {
          data.showName = data.showName + data.data[field]
        })
      }
      data.showCode = data['code']
      if (this.codeShowArr) {
        data.showCode = ''
        this.codeShowArr.forEach(field => {
          data.showCode = data.showCode + data.data[field]
        })
      }
      return data
    },
    // 关闭更多数据选择弹窗
    dialogHandler(param) {
      if (param) {
        const ids = this.list.map(item => {
          return item.code
        })

        let arr
        if (Array.isArray(param)) {
          arr = param.map(item => {
            let isNull = !ids.includes(item[this.valueColumn])
            if (isNull) {
              this.list.unshift(this.getItemInfo({ code: item[this.valueColumn], name: item[this.nameColumn], data: item }))
            }

            return item[this.valueColumn]
          })
        } else {
          let isNull = !ids.includes(param[this.valueColumn])
          if (isNull) {
            this.list.unshift(this.getItemInfo({ code: param[this.valueColumn], name: param[this.nameColumn], data: param }))
          }
          arr = param[this.valueColumn]
        }

        this.change(arr)
        // 传递给各自页面根据需求进行赋值
        this.$emit('closeHandler', arr)
      }
      this.dialogListVisible = false
    }
  }
}
</script>
