<template>
  <bs-edit-tab ref='tab' :tab='tab' @addRow='addRowHandle'></bs-edit-tab>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  data() {
    return {
      tab: {
        type: this.type,
        param: this.param,
        editForm: this.editForm,
        api: {
          search: '/api/sys/tableBiz/list'
        },
        apiData: {
          search(param) {
            return { generateCode: param.codeId }
          }
        },
        topBar: [
          {
            name: 'add',
            iconName: 'addLine',
            i18n: '增行'
          },
          {
            name: 'delete'
          },
          {
            iconName: 'explain',
            i18n: '解析表',
            event: this.onExplain
          }
        ],

        table: {
          showSelection: false,
          cols: [
            {
              label: '表',
              prop: 'tableCode',
              width: '160',
              element: 'base-select',
              required: true,
              attrs: {
                data: 'table_info',
                labelShowCode: true,
                remote: true,
                clearable: true,
                filterable: true,
                'allow-create': true
              },
              changeAll: this.parentChangeAll
            },
            {
              label: '表名',
              prop: 'showTableCode',
              width: '200'
            },
            {
              prop: 'remark',
              element: 'input-validate',
              label: '备注'
            }
          ]
        }
      }
    }
  },
  inject: [],
  props: {
    type: {
      type: String,
      default: 'view'
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    },
    editForm: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    parentChangeAll(data) {
      if (data && data.val && data.row) {
        data.row['showTableCode'] = data.val.code
      }
    },
    addRowHandle(row) {
      this.$refs.tab.tableData[this.$refs.tab.tableData.length - 1].maxCapacity = '100'
    },
    onExplain() {
      request({
        url: '/api/sys/codeReport/explainSqlListTable',
        method: 'POST',
        data: { data: this.param.codeId }
      })
        .then(response => {
          console.log(response.data)
          if (response.data && response.data.length > 0) {
            response.data.forEach(param => {
              var result = this.$refs.tab.tableData.some(item => {
                if (item.tableCode == param) {
                  return true
                }
              })
              if (!result) {
                const obj = {}
                obj.tableCode = param
                obj.showTableCode = param
                this.$refs.tab.tableData.push(obj)
              }
            })
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
