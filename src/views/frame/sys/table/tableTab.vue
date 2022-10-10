<template>
  <bs-edit-tab ref='tab' :tab='tab' @addRow='addRowHandle'></bs-edit-tab>
</template>

<script>
export default {
  data() {
    return {
      tab: {
        type: this.type,
        param: this.param,
        editForm: this.editForm,
        api: {
          search: '/api/code/tableRelation/list'
        },
        apiData: {
          search(param) {
            return { tableCode: param.DICT_ITEM_VAL }
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
          }
        ],

        table: {
          showSelection: false,
          cols: [
            {
              label: '上级表备注',
              prop: 'parentTableCode',
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
              label: '上级表名',
              prop: 'showParentTableCode',
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
        data.row['showParentTableCode'] = data.val.code
      }
    },
    addRowHandle(row) {
      this.$refs.tab.tableData[this.$refs.tab.tableData.length - 1].maxCapacity = '100'
    }
  }
}
</script>
