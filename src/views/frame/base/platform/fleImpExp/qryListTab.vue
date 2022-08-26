<template>
  <bs-edit-tab ref="tab" :tab="tab" />
</template>
<script>
export default {
  data() {
    return {
      tab: {
        type: this.type,
        param: this.param,
        api: {},
        apiData: {},
        topBar: [
          {
            name: 'add',
            iconName: 'addLine',
            i18n: 'biz.btn.addRow',
            isShow: ['add', 'update', 'copy']
          },
          {
            name: 'delete',
            iconName: 'delete',
            i18n: 'biz.btn.deleteRow',
            isShow: ['add', 'update', 'copy']
          }
        ],
        table: {
          cols: [
            {
              label: 'file.impexp.qryItemProp',
              prop: 'itemProp',
              element: 'input-validate',
              required: true,
              width: 120,
              attrs: {
                clearable: true
              }
            },
            {
              label: 'file.impexp.qryItemName',
              prop: 'label',
              element: 'input-validate',
              required: true,
              width: 120,
              attrs: {
                clearable: true
              }
            },
            {
              label: 'file.impexp.qryItemType',
              prop: 'itemType',
              element: 'base-select',
              width: 120,
              default: 'TEXT',
              required: true,
              list: [
                { value: 'TEXT', label: '文本' },
                { value: 'DATE_RANGE', label: '日期范围' },
                { value: 'DATADICT', label: '字典码表' },
                { value: 'BASEDATA', label: '基础档案' },
                { value: 'DATE', label: '日期' }
              ],
              attrs: {
                clearable: true
              }
            },
            {
              label: 'file.impexp.qryItemFormat',
              prop: 'format',
              element: 'input-validate',
              width: 240,
              attrs: {
                clearable: true
              }
            },
            {
              label: 'file.impexp.requiredFlag',
              prop: 'requiredFlag',
              width: 60,
              align: 'center',
              element: 'el-checkbox',
              default: '0',
              attrs: {
                trueLabel: '1',
                falseLabel: '0'
              }
            },
            {
              label: 'file.impexp.defaultValue',
              prop: 'defaultValue',
              element: 'input-validate',
              width: 240,
              attrs: {
                maxlength: 4000,
                clearable: true
              }
            },
            {
              label: 'file.impexp.remark',
              prop: 'remark',
              element: 'input-validate',
              width: 240,
              attrs: {
                maxlength: 500,
                clearable: true
              }
            }
          ]
        }
      }
    }
  },
  props: {
    type: {
      type: String,
      default: 'view'
    },
    param: {
      type: [String, Object],
      default() {
        return {}
      }
    }
  },
  mounted() {
    this.loadDataFromEdit()
  },
  methods: {
    loadDataFromEdit() {
      const colList = this.$attrs.editForm.expQryList
      const tableData = this.$refs.tab.tableData
      tableData.splice(0)
      if (Array.isArray(colList)) {
        for (const data of colList) {
          tableData.push(data)
        }
      }
    },
    getTabData() {
      return this.$refs.tab.tableData
    }
  }
}
</script>