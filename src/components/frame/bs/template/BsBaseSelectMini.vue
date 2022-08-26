<template>
  <div>
    <el-select v-if='attrs.datadict' :filter-method="attrs.labelShowCode ? filterDictMethod : null" v-model="newValue" v-bind='attrs' :size='size' :placeholder="$t('biz.placeholder.choose')" @change="change" @visible-change="visibleDictChange">
      <el-option v-for="item in datadictList" :key="item.value" :label="item.label" :value="item.value">
        <template v-if="attrs.labelShowCode">
          <span style="float:left;margin-right:2px;">{{ item.label }}</span>
          <span style="float:right;color:#8492a6;">{{ item.value }}</span>
        </template>
      </el-option>
    </el-select>

    <el-tooltip v-else-if='attrs.showTooltip&&attrs.multiple' effect="dark" :content="tooltipContent" placement="bottom-end">
      <el-select ref='bsBaseSelect' class="el-icon-search_1" v-model="newValue" v-bind='attrs' :filter-method="attrs.labelShowCode ? filterMethod : null" :size='size' :loading='loading' :placeholder="$t('biz.placeholder.choose')" @change="change" @visible-change="visibleChange">
        <el-option v-for="item in list" :key="item.code" :label="item.name" :disabled="item.disabled" :value="item.code">
          <div v-if="attrs.mainText || attrs.subText">
            <span style="float:left;margin-right:2px;" v-if="typeof(attrs.mainText) === 'function'">{{ attrs.mainText(item) }}</span>
            <span style="float:left;margin-right:2px;" v-if="attrs.mainText && item.data">{{ item.data[attrs.mainText] }}</span>
            <span style="float:left;margin-right:2px;" v-else>{{ item.name }}</span>

            <span style="float:right;color:#8492a6;" v-if="typeof(attrs.subText) === 'function'">{{ attrs.subText(item) }}</span>
            <span style="float:right;color:#8492a6;" v-if="attrs.subText && item.data">{{ item.data[attrs.subText] }}</span>
            <span style="float:right;color:#8492a6;" v-else-if="attrs.labelShowCode">{{ item.code }}</span>
          </div>
          <div v-else-if="attrs.labelShowCode">
            <span style="float:left;margin-right:2px;">{{ item.name }}</span>
            <span style="float:right;color:#8492a6;">{{ item.code }}</span>
          </div>
        </el-option>
      </el-select>
    </el-tooltip>

    <el-select v-else ref='bsBaseSelect' class="el-icon-search_1" v-model="newValue" v-bind='attrs' :filter-method="attrs.labelShowCode ? filterMethod : null" :size='size' :loading='loading' :placeholder="$t('biz.placeholder.choose')" @change="change" @visible-change="visibleChange">
      <el-option v-for="item in list" :key="item.code" :label="item.name" :disabled="item.disabled" :value="item.code">
        <div v-if="attrs.mainText || attrs.subText">
          <span style="float:left;margin-right:2px;" v-if="typeof(attrs.mainText) === 'function'">{{ attrs.mainText(item) }}</span>
          <span style="float:left;margin-right:2px;" v-if="attrs.mainText && item.data">{{ item.data[attrs.mainText] }}</span>
          <span style="float:left;margin-right:2px;" v-else>{{ item.name }}</span>

          <span style="float:right;color:#8492a6;" v-if="typeof(attrs.subText) === 'function'">{{ attrs.subText(item) }}</span>
          <span style="float:right;color:#8492a6;" v-if="attrs.subText && item.data">{{ item.data[attrs.subText] }}</span>
          <span style="float:right;color:#8492a6;" v-else-if="attrs.labelShowCode">{{ item.code }}</span>
        </div>
        <div v-else-if="attrs.labelShowCode">
          <span style="float:left;margin-right:2px;">{{ item.name }}</span>
          <span style="float:right;color:#8492a6;">{{ item.code }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tooltipContent: '',
      newValue: this.value,
      datadictList: this.$t('datadict.' + this.attrs.datadict),
      datadictListAll: this.$t('datadict.' + this.attrs.datadict),
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
        // {
        //     data: String, 数据类型，必须
        //     params: String[], 附加参数，可选
        //     dispField: String 显示字段，可选
        // }
        return {}
      }
    }
  },
  watch: {
    attrs: {
      deep: true,
      handler() {
        this.initData({ watch: 'watch' })
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
    ...mapGetters(['baseSelectList'])
  },
  beforeMount() {
    if (this.attrs) {
      this.attrs.filterable = this.attrs.filterable === false ? this.attrs.filterable : true
    }
  },
  mounted() {
    // 若自定义下拉选数据
    if (this.attrs.canChangeList) {
      this.list = this.newRowList
      return false
    }

    this.initData()
  },
  methods: {
    initTooltipContent() {
      if (this.attrs) {
        if (this.attrs.showTooltip && this.attrs.multiple && this.attrs.data) {
          if (Array.isArray(this.value) && this.value.length > 0) {
            request({
              url: '/api/dd/selectData/get',
              method: 'POST',
              data: {
                funcModule: this.$t('route.' + this.$route.meta.title),
                funcOperation: this.$t('biz.btn.search'),
                data: {
                  type: this.attrs.data,
                  code: this.value,
                  dataAuth: this.attrs.dataAuth
                }
              }
            }).then(response => {
              if (response.data && response.data.length > 0) {
                this.tooltipContent = ''
                response.data.forEach(data => {
                  this.tooltipContent = this.tooltipContent + '【' + data.name + '】'
                })
              }
            })
          }
        }
      }
    },
    async initData(params) {
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
        } else {
          //如何是只读，就不用查询下拉列表
          let cacheKey = { data: this.attrs.data, params: this.attrs.params, dataAuth: this.attrs.dataAuth }

          let dataList = await this.$store.dispatch('GetBaseSelectList', JSON.stringify(cacheKey))
          // 若未查到缓存 或 远程自定义参数查询 则重新调接口
          if (!dataList || params) {
            // 储存当前下拉数据
            const response = await request({
              url: '/api/dd/selectData/list',
              method: 'POST',
              data: {
                funcModule: this.$t('route.' + this.$route.meta.title),
                funcOperation: this.$t('biz.btn.search'),
                data: {
                  type: this.attrs.data,
                  queryParams: Object.assign({}, this.attrs.params, params),
                  dataAuth: this.attrs.dataAuth
                }
              }
            })
            dataList = response.data
            //储存当前下拉数据初始化值
            this.$store.dispatch('SetBaseSelectList', {
              key: JSON.stringify(cacheKey),
              value: dataList
            })
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

          // 当下拉数据已返回并且value值也返回
          if (this.value) this.changeVal(this.value)
        }
      } else if (this.attrs.datadict) {
        this.list = this.$t('datadict.' + this.attrs.datadict)
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
          //init tooltip
          if (newVal.length > 0) {
            this.initTooltipContent()
          }
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
            } else {
              //没有查询到对应的消息
              if (this.attrs && this.attrs.createShow) {
                this.list.push({
                  name: newVal,
                  code: newVal,
                  disabled: true
                })
                this.newValue = newVal
              }
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
    selectData(val) {},
    changeAll(item) {
      this.$emit('changeAll', item)
    },

    visibleDictChange(view) {
      this.$emit('visibleChange', view)

      setTimeout(() => {
        this.datadictList = this.datadictListAll
      }, 50)
    },
    visibleChange(view) {
      this.$emit('visibleChange', view)
      if (view) {
        // 针对自定义过滤条件，每次打开显示全部，否则为原来过滤结果
        if (this.attrs.labelShowCode) this.list = this.listAll
      }
    },

    filterDictMethod(query) {
      if (this.attrs.labelShowCode) {
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
      if (this.attrs.labelShowCode) {
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
    }
  }
}
</script>