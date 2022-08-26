<template>
  <bs-table ref='bsTable' v-if="showTemplate" :mainData='mainData' @selectRow="handleSelectRow"></bs-table>
</template>

<script>
import { notifySuccess, confirmTip } from '@/utils/frame/base/notifyParams'
// axios访问
import request from '@/utils/frame/base/request'
export default {
  name: 'comboxManage',
  data() {
    return {
      valueColumn: '',
      dialogVisible: false,
      showTemplate: false,
      form: {
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          camelToUnderlineFlg: true,
          data: {}
        },
        moreShowFlg: true,
        formData: []
      },

      mainData: {}
    }
  },
  components: {},

  props: {
    editForm: {
      type: Object,
      default() {
        return {}
      }
    },
    param: {
      type: Object,
      default() {
        return {}
      }
    },
    queryParamArr: {
      type: Array,
      default() {
        return []
      }
    },
    funcCode: {
      type: String
    },
    extraParam: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  async created() {
    const response = await request({
      url: '/api/platform/cfgCombox/json',
      method: 'post',
      data: {
        data: this.funcCode,
        funcModule: this.$t('route.' + this.$route.meta.title),
        funcOperation: this.$t('biz.btn.init')
      }
    })
    if (response.data) {
      const resData = response.data

      this.valueColumn = resData.valueColumn
      this.form.formData = resData.form.formData
      this.form.listQuery = Object.assign({}, resData.form.listQuery, {
        isPage: false,
        code: this.funcCode,
        bsQueryExtras: this.queryParamArr,
        funcModule: this.$t('route.' + this.$route.meta.title),
        funcOperation: this.$t('biz.btn.search')
      })
      this.mainData = Object.assign({}, resData.mainData, {
        height: 300,
        api: {
          search: '/api/platform/cfgComboxUsed/list',
          doDelete: '/api/platform/cfgComboxUsed/remove' // 删除
        },
        isTopBar: true,
        topBar: [
          {
            name: 'remove',
            valueColumn: this.valueColumn,
            getParam: currentRow => {
              return currentRow[this.valueColumn]
            }
          },
          {
            name: 'refresh'
          }
        ],
        bottomBar: {
          pagination: {
            show: false,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageSizes: [20, 40, 60, 80, 100]
          }
        }
      })
      this.mainData.table.showCheckbox = this.extraParam.multiple

      this.showTemplate = true
    }
  },

  methods: {
    handleSelectRow(params) {
      this.$emit('selectRow', params)
    }
  }
}
</script>

