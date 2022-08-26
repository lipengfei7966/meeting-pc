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
              label: 'file.impexp.sumrowName',
              prop: 'sumrowName',
              element: 'input-validate',
              width: 120,
              attrs: {
                clearable: true
              }
            },
            {
              label: 'file.impexp.sumrowNameCol',
              prop: 'sumrowNameCol',
              element: 'input-validate',
              width: 120,
              attrs: {
                clearable: true
              }
            },
            {
              label: 'file.impexp.sumCond',
              prop: 'sumCond',
              element: 'input-validate',
              width: 240,
              attrs: {
                maxlength: 4000,
                clearable: true
              }
            },
            {
              label: 'file.impexp.sumItem',
              prop: 'sumItem',
              element: 'input-validate',
              width: 240,
              required: true,
              attrs: {
                maxlength: 4000,
                clearable: true
              }
            },
            {
              label: 'file.impexp.sumCopyPrevCol',
              prop: 'sumCopyPrevCol',
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
      const colList = this.$attrs.editForm.expSumList
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