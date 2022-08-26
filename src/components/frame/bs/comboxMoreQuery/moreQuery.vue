<template>
  <more-query-table v-if="showTemplate" ref='bsDialogTabTable' v-on="$listeners" :dialog='dialog' @selectRow="handleSelectRow"></more-query-table>
</template>

<script>
import request from '@/utils/frame/base/request'
import MoreQueryTable from '@/components/frame/bs/comboxMoreQuery/components/MoreQueryTable.vue'

export default {
  data() {
    return {
      showTemplate: false,
      dialog: {
        queryParamArr: this.queryParamArr,
        valueColumn: '',
        nameColumn: '',
        showUsedList: this.extraParam.showUsedList,
        multiple: this.extraParam.multiple,
        funcCode: this.funcCode,
        moreShowFlg: false,
        showCheckbox: true,
        allowDblClick: true, // 弹窗是否允许双击列表行关闭
        formData: [],

        mainData: {
          initSearch: false,
          api: {
            search: ''
          },
          table: {
            cols: []
          }
        },
        bottomBar: {
          pagination: {
            show: true,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageSizes: [20, 40, 60, 80, 100]
          }
        }
      }
    }
  },

  components: {
    MoreQueryTable
  },
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

      this.dialog.formData = resData.form.formData
      this.dialog.listQuery = resData.form.listQuery
      this.dialog.nameColumn = resData.nameColumn
      this.dialog.valueColumn = resData.valueColumn
      this.dialog.mainData = Object.assign({}, resData.mainData, { api: { search: '/api/code/codeReport/reportSearch' } })

      this.showTemplate = true
    }
  },

  mounted() {},
  methods: {
    handleSelectRow(params) {
      this.$emit('selectRow', params)
    }
  }
}
</script>
