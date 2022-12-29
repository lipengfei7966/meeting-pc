<template>
  <div>
    <el-select v-if='attrs.datadict' :filter-method="attrs.labelShowCode ? filterDictMethod : null" v-model="newValue" v-bind='attrs' :size='size' :placeholder="$t('biz.placeholder.choose')" @change="change" @visible-change="visibleDictChange">
      <el-option v-for="item in datadictList" :key="item.value" :label="item.label" :value="item.value">
        <template v-if="labelShowCode">
          <span style="float:left;margin-right:2px;">{{ item.label }}</span>
          <span style="float:right;color:#8492a6;">{{ item.value }}</span>
        </template>
      </el-option>
    </el-select>
    <el-select v-else-if="!!attrs.showMoreList" ref='bsBaseSelect' class="el-icon-search_1" v-model="newValue" v-bind='attrs' :remote="attrs.remote || remoteSelectData.has(attrs.data)" :remote-method="attrs.remote || remoteSelectData.has(attrs.data) ? remoteMethod : null" :filter-method="attrs.labelShowCode ? filterMethod : null" :size='size' :loading='loading' :placeholder="$t('biz.placeholder.choose')" @change="change" @visible-change="visibleChange" @click.native="listDataShow($event)">
      <el-option v-for="item in list" :key="item.code" :label="item.name" :disabled="item.disabled" :value="item.code">
        <span style="float:left;margin-right:2px;" v-if="labelShowCode">{{ item.name }}</span>
        <span style="float:right;color:#8492a6;" v-if="labelShowCode">{{ item.code }}</span>
      </el-option>
    </el-select>
    <el-select v-else ref='bsBaseSelect' class="el-icon-search_2" v-model="newValue" v-bind='attrs' :remote="attrs.remote || remoteSelectData.has(attrs.data)" :remote-method="attrs.remote || remoteSelectData.has(attrs.data) ? remoteMethod : null" :filter-method="attrs.labelShowCode ? filterMethod : null" :size='size' :loading='loading' :placeholder="$t('biz.placeholder.choose')" @change="change" @visible-change="visibleChange" @click.native="listDataShow($event)">
      <el-option v-for="item in list" :key="item.code" :label="item.name" :disabled="item.disabled" :value="item.code">
        <span style="float:left;margin-right:2px;" v-if="labelShowCode">{{ item.name }}</span>
        <span style="float:right;color:#8492a6;" v-if="labelShowCode">{{ item.code }}</span>
      </el-option>
    </el-select>
    <base-select-list ref='bsBaseSelectList' v-if='dialogListVisible' @closeHandler='dialogHandler' :opType="opType"></base-select-list>
  </div>
</template>

<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      labelShowCode: false,
      newValue: this.value,
      datadictList: this.attrs.datadict ? this.$t('datadict.' + this.attrs.datadict) : [],
      datadictListAll: this.attrs.datadict ? this.$t('datadict.' + this.attrs.datadict) : [],
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
    size: {
      type: String,
      default: ''
    },
    newList: {
      type: Array,
      default() {
        return []
      }
    },
    newRowList: {
      type: Array,
      default() {
        return []
      }
    },
    attrs: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    attrs: {
      //深度监听后当这个对象内属性值发生变化也会执行handler。
      deep: true,
      handler(newAttrs, oldAttrs) {
        this.initData()
      }
    },
    value(newVal) {
      if (this.attrs.datadict) {
        this.newValue = newVal
      } else {
        if (!newVal) {
          this.newValue = null
        } else {
          // 当下拉数据已返回并且value值也返回
          if (this.list && this.list.length > 0) {
            this.changeVal(newVal)
          } else if (this.attrs.data && this.attrs.data.includes('TREE')) {
            this.newValue = newVal
          }
        }
      }
    },
    // 表单
    newList(list) {
      this.list = list
    },
    // 列表项
    newRowList(list) {
      if (this.attrs.canChangeList) {
        this.list = list
      }
    }
  },
  computed: {
    ...mapGetters(['baseSelectList', 'remoteSelectData'])
  },
  beforeMount() {
    if (this.attrs) {
      this.attrs.filterable = this.attrs.filterable === false ? this.attrs.filterable : true
      // 是否展示code
      if (this.attrs.labelShowCode === undefined) {
        if (this.attrs.remote || (this.attrs.data && this.remoteSelectData.has(this.attrs.data))) {
          this.labelShowCode = true
        }
      }
      if (this.attrs.clearable === undefined) {
        this.attrs.clearable = true
      }
      if (this.attrs.disabled === true) {
        this.attrs.clearable = false
      }
    }
  },
  mounted() {
    // 若自定义下拉选数据
    if (this.attrs.canChangeList) {
      this.list = this.newRowList
      return false
    }

    // console.log('mounted')

    this.initData()
    $('.el-icon-search_2 .el-input .el-input__suffix .el-input__suffix-inner .el-icon-')
      .addClass('el-icon-arrow-down')
      .removeClass('el-select__caret')
    if (!!this.attrs.showMoreList) {
      $('.el-icon-search_1 .el-input .el-input__suffix .el-input__suffix-inner .el-icon-')
        .addClass('el-icon-search blocks')
        .removeClass('el-select__caret')
    }
  },
  methods: {
    async initData(params) {
      //console.log(this.attrs.data)
      if (this.attrs.data) {
        if (this.attrs.data === 'DATE') {
          // 年度选择组件
          const nowYear = new Date().getFullYear()
          for (let i = nowYear - 5; i <= nowYear + 5; i++) {
            this.list.push({
              name: i + '年',
              code: i + ''
            })
          }
        } else if (!this.attrs.data.includes('TREE')) {
          // console.log(JSON.stringify(this.attrs))
          let attrsParams = Object.assign({}, this.attrs.params)
          // 若为远程搜索默认则显示前DEFAULT_REMOTE_SIZE条
          if (this.attrs.remote || this.remoteSelectData.has(this.attrs.data)) {
            attrsParams.size = (this.attrs.params && this.attrs.params.size) || process.env.DEFAULT_REMOTE_SIZE
          }

          let cacheable = false
          if (this.attrs.cacheable === undefined || this.attrs.cacheable === null || this.attrs.cacheable) {
            cacheable = true
          }
          //过滤查询时不缓存
          if (params) {
            cacheable = false
          }
          let cacheKey
          let dataList
          if (cacheable) {
            cacheKey = JSON.stringify({ data: this.attrs.data, params: attrsParams, dataAuth: this.attrs.dataAuth })
            //如何是只读，就不用查询下拉列表
            dataList = await this.$store.dispatch('GetBaseSelectList', cacheKey)
          }

          // 若未查到缓存 或 远程自定义参数查询 则重新调接口
          if (dataList === null || dataList === undefined || (params && params.name)) {
            // 储存当前下拉数据
            const response = await request({
              url: '/api/dd/selectData/list',
              method: 'POST',
              data: {
                funcModule: this.$t('route.' + this.$route.meta.title),
                funcOperation: this.$t('biz.btn.search'),
                data: {
                  type: this.attrs.data,
                  queryParams: Object.assign({}, attrsParams, params),
                  dataAuth: this.attrs.dataAuth
                }
              }
            })
            //查询和联动
            dataList = response.data
            //储存当前下拉数据初始化值
            if (cacheable) {
              this.$store.dispatch('SetBaseSelectList', {
                key: cacheKey,
                value: dataList
              })
            }
          }

          this.loading = false
          if (this.attrs.dispField !== undefined && this.attrs.dispField !== null && this.attrs.dispField !== '') {
            for (let i = 0; i < dataList.length; i++) {
              const data = dataList[i]
              data.name = data.data[this.attrs.dispField]
            }
          }
          this.list = dataList
          this.listAll = dataList
          // 远程搜索添加提示选项
          if (this.attrs.remote || this.remoteSelectData.has(this.attrs.data)) {
            if (this.list.length >= attrsParams.size) {
              let endObj = this.list[this.list.length - 1]
              if (endObj && endObj.name.indexOf('更多结果请搜索') === -1) {
                this.list.push({
                  name: `当前仅显示前${attrsParams.size}条，更多结果请输入搜索`,
                  disabled: true
                })
              }
            }
          }

          // 当下拉数据已返回并且value值也返回
          if (this.value) this.changeVal(this.value)
        }
      } else if (this.attrs.datadict) {
        this.list = this.$t('datadict.' + this.attrs.datadict)
      }
      if (this.attrs.isDefault) {
        if (this.list && this.list.length > 0) {
          if (this.newValue === null || this.newValue === '') {
            this.change(this.list[0].code)
          }
        }
      }
    },
    // 判断基础档案下拉数据是否被删除，若删除则不赋值
    changeVal(newVal) {
      let isNull = false // 是否已被删除
      if (newVal && this.list && this.list.length > 0) {
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
          request({
            url: '/api/dd/selectData/get',
            method: 'POST',
            data: {
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: this.$t('biz.btn.search'),
              data: {
                ds: this.attrs.ds,
                type: this.attrs.data,
                code: valueArray,
                dataAuth: this.attrs.dataAuth
              }
            }
          }).then(response => {
            if (response.data && response.data.length > 0) {
              response.data.forEach(data => {
                // 每次用于获取最新code集合，防止返回两条相同数据时unshift两次
                const codes = this.list.map(item => item.code)
                if (!codes.includes(data.code)) {
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
        this.selectData(arr)
      } else {
        this.list.forEach(item => {
          if (item.code === evl || item.key === evl) {
            this.$emit('changeAll', item)
            this.selectData(item)
          } else if (evl === '') {
            this.$emit('changeAll', evl)
            this.selectData(evl)
          }
        })
      }
    },
    selectData(val) {
      // console.log('selectData')
    },
    changeAll(item) {
      this.$emit('changeAll', item)
    },

    visibleDictChange(view) {
      this.$emit('visibleChange', view)

      const timer = setTimeout(() => {
        this.datadictList = this.datadictListAll
      }, 50)
      this.$once('hook:beforeDestroy', () => {
        clearTimeout(timer)
      })
    },
    visibleChange(view) {
      this.$emit('visibleChange', view)
      if (!view) {
        const timer = setTimeout(() => {
          if (this.attrs.remote || this.remoteSelectData.has(this.attrs.data)) {
            this.remoteMethod()
          }
        }, 50)
        this.$once('hook:beforeDestroy', () => {
          clearTimeout(timer)
        })
      } else {
        // 针对自定义过滤条件，每次打开显示全部，否则为原来过滤结果
        if (this.labelShowCode) this.list = this.listAll
      }
    },

    filterDictMethod(query) {
      if (this.labelShowCode) {
        this.datadictList = this.datadictListAll.filter(item => {
          return item.value.toLowerCase().includes(query.toLowerCase()) || item.label.toLowerCase().includes(query.toLowerCase())
        })
      } else {
        this.datadictList = this.datadictListAll.filter(item => {
          return item.lable.includes(query)
        })
      }
    },
    filterMethod(query) {
      if (this.labelShowCode) {
        if (this.attrs.datadict) {
          this.datadictList = this.datadictListAll.filter(item => {
            return item.value.includes(query) || item.lable.includes(query)
          })
        } else {
          this.list = this.listAll.filter(item => {
            return item.code.includes(query) || item.name.includes(query)
          })
        }
      }
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
        let queryData = {
          name: query
        }

        if (this.attrs.params && this.attrs.params.queryPro) {
          queryData[this.attrs.params.queryPro] = query
        }
        // console.log('remoteMethod')

        this.initData(queryData)
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
        this.$refs.bsBaseSelect.blur()
        // 保存当前组件配置项
        this.$emit('handleSelect')
        // 打开弹窗
        if (this.attrs.component) {
          Vue.component('base-select-list', this.attrs.component)

          this.dialogListVisible = true
          const timer = setTimeout(() => {
            $(document).ready(() => {
              $(this.$refs.bsBaseSelectList.$el)
                .appendTo('body')
                .find('.mask')
                .css('z-index', 1999)
                .siblings('.dialog-container')
                .css('z-index', 2999)
            })
          }, 50)

          this.$once('hook:beforeDestroy', () => {
            clearTimeout(timer)
          })
        }
      }
    },

    // 关闭更多数据选择弹窗
    dialogHandler(param) {
      if (param) {
        this.change(param.code)
        //更多选择
        this.changeAll(param.data)
        // 传递给各自页面根据需求进行赋值
        this.$emit('closeHandler', param)
      }
      this.dialogListVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
::deep.el-select .el-input__suffix .el-input__suffix-inner .el-input__icon.blocks {
  display: inline-block !important;
}
</style>