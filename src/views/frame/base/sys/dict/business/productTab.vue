<template>
  <bs-edit-tab ref="tab" :tab="tab"></bs-edit-tab>
</template>

<script>
export default {
  data() {
    return {
      tab: {
        type: this.type,
        param: this.$route.params || this.param,
        api: {
          search: '/api/sys/dict/listItemAll'
        },
        apiData: {
          search(param) {
            return param.dictCode
          }
        },
        topBar: [
          {
            name: 'add',
            iconName: 'addLine',
            i18n: 'biz.btn.addRow',
            isShow: ['add', 'update', 'detailSet']
          },
          {
            name: 'delete',
            iconName: 'delete',
            i18n: 'biz.btn.deleteRow',
            isShow: ['add', 'update', 'detailSet']
          }
        ],
        table: {
          height: 450,
          cols: [
            {
              label: 'sys.dict.dictItem.dictItemName',
              prop: 'dictItemName',
              element: 'input-validate',
              required: true
            },

            {
              label: 'sys.dict.dictItem.dictItemVal',
              prop: 'dictItemVal',
              element: 'input-validate',
              required: true
            },
            {
              label: 'sys.dict.dictItem.dispOrder',
              prop: 'dispOrder',
              element: 'input-validate',
              required: true
            },

            {
              label: 'biz.lbl.remark',
              prop: 'remark',
              element: 'el-input',
              validate: [
                {
                  required: true,
                  trigger: 'blur'
                }
              ]
            },
            {
              prop: 'showFlag',
              label: 'sys.dict.dictItem.defaultShowFlag',
              element: 'base-select',
              default: '1',
              list: this.$t('datadict.showType'),
              required: true,
              attrs: {
                clearable: true
              }
            },
            {
              label: 'biz.lbl.usingFlag',
              prop: 'usingFlag',
              element: 'base-select',
              list: this.$t('datadict.usingFlag'),
              required: true,
              attrs: {
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
      default: 'update'
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  }
}
</script>
