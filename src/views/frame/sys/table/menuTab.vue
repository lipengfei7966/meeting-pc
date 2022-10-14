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
          search: '/api/code/tableBiz/list'
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
              label: '菜单',
              prop: 'menuCode',
              width: '160',
              element: 'base-select',
              required: true,
              attrs: {
                data: 'menu_code',
                labelShowCode: true,
                remote: true,
                clearable: true
              },
              changeAll: this.menuChangeAll
            },
            {
              label: '模块代码',
              prop: 'showMenuCode',
              width: '160',
              element: 'input-validate'
            },
            {
              label: '生成代码',
              prop: 'generateCode',
              width: '200',
              element: 'input-validate'
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
    menuChangeAll(data) {
      if (data && data.val && data.row) {
        data.row['showMenuCode'] = data.val.code
        if (data.val.data) {
          data.row['generateCode'] = data.val.data['CODE_ID']
        }
      }
    },
    addRowHandle(row) {
      this.$refs.tab.tableData[this.$refs.tab.tableData.length - 1].maxCapacity = '100'
    }
  }
}
</script>
