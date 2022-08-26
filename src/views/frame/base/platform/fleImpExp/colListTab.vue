<template>
  <bs-edit-tab ref="tab" :tab="tab" />
</template>
<script>
import toolUtil from '@/utils/frame/base/toolUtil.js'
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
          },
          {
            i18n: 'file.impexp.sheetName',
            prop: 'paramName',
            element: 'input-validate',
            width: 180,
            attrs: {
              clearable: true
            }
          }
        ],
        table: {
          cols: [
            {
              label: 'file.impexp.usingFlag',
              prop: 'usingFlag',
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
              label: 'file.impexp.propertiesCode',
              prop: 'propertiesCode',
              element: 'input-validate',
              required: true,
              width: 180,
              attrs: {
                clearable: true
              }
            },
            {
              label: 'file.impexp.propertiesName',
              prop: 'propertiesName',
              element: 'input-validate',
              width: 180,
              attrs: {
                clearable: true
              }
            },
            {
              label: 'file.impexp.propertiesLabel',
              prop: 'label',
              element: 'input-validate',
              width: 180,
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
              label: 'file.impexp.propertiesType',
              prop: 'propertiesType',
              element: 'base-select',
              width: 120,
              list: this.$t('datadict.bsExcelDataTypeFmt'),
              attrs: {
                clearable: true
              }
            },
            {
              label: 'file.impexp.format',
              prop: 'format',
              element: 'input-validate',
              width: 240,
              attrs: {
                clearable: true
              }
            },
            {
              label: 'file.impexp.colIndex',
              prop: 'colIndex',
              element: 'input-formatter',
              align: 'right',
              width: 90,
              attrs: {
                min: 0,
                type: 'integer'
              }
            },
            {
              label: 'file.impexp.colWidth',
              prop: 'colWidth',
              element: 'input-formatter',
              align: 'right',
              width: 90,
              attrs: {
                min: 0,
                type: 'integer'
              }
            },
            {
              label: 'file.impexp.groupBy',
              prop: 'groupBy',
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
  created() {
    if (this.$attrs.extraParam.tabType === 'IN') {
      const groupBy = toolUtil.getDefItemByProp(this.tab.table.cols, 'groupBy')
      if (groupBy.isShow !== false) {
        groupBy.isShow = false
      }
    } else {
      const requiredFlag = toolUtil.getDefItemByProp(this.tab.table.cols, 'requiredFlag')
      if (requiredFlag.isShow !== false) {
        requiredFlag.isShow = false
      }
    }
  },
  mounted() {
    this.loadDataFromEdit()
  },
  methods: {
    loadDataFromEdit() {
      const tabIndex = this.$attrs.extraParam.tabIndex
      const colList = this.$attrs.editForm.paramList[tabIndex].colList
      const tableData = this.$refs.tab.tableData
      tableData.splice(0)
      if (toolUtil.isEmpty(this.$attrs.editForm.paramList[tabIndex].paramName)) {
        this.$refs.tab.tabForm.paramName = ''
      } else {
        this.$refs.tab.tabForm.paramName = this.$attrs.editForm.paramList[tabIndex].paramName
      }
      if (Array.isArray(colList)) {
        for (const data of colList) {
          tableData.push(data)
        }
      }
    },
    getTabData() {
      return {
        paramName: this.$refs.tab.tabForm.paramName,
        colList: this.$refs.tab.tableData
      }
    }
  }
}
</script>