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
    <tree-org v-else-if='attrs.data === "TREE_ORGAN"' v-model="newValue" v-bind='attrs' @change='change' @handleNode='changeAll'></tree-org>
    <tree-dept v-else-if='attrs.data === "TREE_DEPT"' v-model="newValue" v-bind='attrs' @change='change' @handleNode='changeAll'></tree-dept>
    <tree-employee v-else-if='attrs.data === "TREE_STAFF"' v-model="newValue" v-bind='attrs' @change='change' @handleNode='changeAll'></tree-employee>
    <tree-org-base-dept v-else-if='attrs.data === "TREE_ORG_DEPT"' v-model="newValue" v-bind='attrs' @change='change' @handleNode='changeAll'></tree-org-base-dept>
    <tree-area v-else-if='attrs.data === "TREE_AREA"' v-model="newValue" v-bind='attrs' @change='change' @handleNode='changeAll'></tree-area>
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
  components: {
    treeOrg: () => import('@/views/frame/base/organ/components/TreeOrg.vue'),
    treeDept: () => import('@/views/frame/base/organ/components/TreeDept.vue'),
    treeEmployee: () => import('@/views/frame/base/organ/components/TreeEmployee.vue'),
    TreeOrgBaseDept: () => import('@/views/frame/base/organ/components/TreeOrgBaseDept.vue')
  },
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
      //??????????????????????????????????????????????????????????????????handler???
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
          // ??????????????????????????????value????????????
          if (this.list && this.list.length > 0) {
            this.changeVal(newVal)
          } else if (this.attrs.data && this.attrs.data.includes('TREE')) {
            this.newValue = newVal
          }
        }
      }
    },
    // ??????
    newList(list) {
      this.list = list
    },
    // ?????????
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
      // ????????????code
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
    // ???????????????????????????
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
          // ??????????????????
          const nowYear = new Date().getFullYear()
          for (let i = nowYear - 5; i <= nowYear + 5; i++) {
            this.list.push({
              name: i + '???',
              code: i + ''
            })
          }
        } else if (!this.attrs.data.includes('TREE')) {
          // console.log(JSON.stringify(this.attrs))
          let attrsParams = Object.assign({}, this.attrs.params)
          // ????????????????????????????????????DEFAULT_REMOTE_SIZE???
          if (this.attrs.remote || this.remoteSelectData.has(this.attrs.data)) {
            attrsParams.size = (this.attrs.params && this.attrs.params.size) || process.env.DEFAULT_REMOTE_SIZE
          }

          let cacheable = false
          if (this.attrs.cacheable === undefined || this.attrs.cacheable === null || this.attrs.cacheable) {
            cacheable = true
          }
          //????????????????????????
          if (params) {
            cacheable = false
          }
          let cacheKey
          let dataList
          if (cacheable) {
            cacheKey = JSON.stringify({ data: this.attrs.data, params: attrsParams, dataAuth: this.attrs.dataAuth })
            //?????????????????????????????????????????????
            dataList = await this.$store.dispatch('GetBaseSelectList', cacheKey)
          }

          // ?????????????????? ??? ??????????????????????????? ??????????????????
          if (dataList === null || dataList === undefined || (params && params.name)) {
            // ????????????????????????
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
            //???????????????
            dataList = response.data
            //????????????????????????????????????
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
          // ??????????????????????????????
          if (this.attrs.remote || this.remoteSelectData.has(this.attrs.data)) {
            if (this.list.length >= attrsParams.size) {
              let endObj = this.list[this.list.length - 1]
              if (endObj && endObj.name.indexOf('?????????????????????') === -1) {
                this.list.push({
                  name: `??????????????????${attrsParams.size}?????????????????????????????????`,
                  disabled: true
                })
              }
            }
          }

          // ??????????????????????????????value????????????
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
    // ?????????????????????????????????????????????????????????????????????
    changeVal(newVal) {
      let isNull = false // ??????????????????
      if (newVal && this.list && this.list.length > 0) {
        // ?????????id??????
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
                // ????????????????????????code??????????????????????????????????????????unshift??????
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
          // ????????????????????????item.code, ??????item.value??????????????????key????????????value??????
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
        // ????????????????????????????????????????????????????????????????????????????????????
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

    // ??????????????????????????????
    listDataShow(e) {
      e.stopPropagation()
      if (this.attrs.disabled === true) {
        return
      }
      if (e.target.className.includes('el-icon-search')) {
        // ??????????????????????????????
        this.$refs.bsBaseSelect.blur()
        // ???????????????????????????
        this.$emit('handleSelect')
        // ????????????
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

    // ??????????????????????????????
    dialogHandler(param) {
      if (param) {
        this.change(param.code)
        //????????????
        this.changeAll(param.data)
        // ?????????????????????????????????????????????
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