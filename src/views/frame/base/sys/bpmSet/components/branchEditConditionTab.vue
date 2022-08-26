<template>
  <bs-edit-tab ref='tab' :tab='tab'></bs-edit-tab>
</template>

<script>
export default {
  name: 'branchEditConditionTab',
  data() {
    return {
      tab: {
        type: this.type,
        param: this.param,
        api: {
          search: '/api/dingtalk/bpmBranchCondition/listByBranchCode'
        },
        apiData: {
          search(praram) {
            return praram.branchCode
          }
        },
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            i18n: 'biz.btn.add',
            getParam: () => {
              return {
                docKey: this.getDocKey()
              }
            },
            component: () => import('./branchEditConditionDialog.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            getParam: () => {
              const row = this.$refs.tab.currentRow
              row.docKey = this.getDocKey()
              return row
            },
            component: () => import('./branchEditConditionDialog.vue')
          },
          {
            name: 'delete',
            iconName: 'delete',
            i18n: 'biz.btn.deleteRow'
          }
        ],
        table: {
          cols: [
            {
              label: 'sys.bpmSet.branch.conditionDimension',
              prop: 'conditionDimension',
              width: '180',
              element: 'base-select',
              attrs: {
                disabled: true,
                data: 'DOC_FORM',
                params: {
                  docKey: this.$route.params.moduleCode
                }
              }
            },
            {
              label: 'sys.bpmSet.branch.conditionOperator',
              prop: 'conditionOperator',
              width: '90',
              format: {
                dict: this.$t('datadict.relationOperator')
              }
            },
            {
              label: 'sys.bpmSet.branch.conditionValue',
              prop: 'conditionValueDisp',
              width: '330'
            },
            {
              label: 'sys.bpmSet.branch.remark',
              prop: 'remark'
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
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  mounted() {},
  methods: {
    getDocKey() {
      return this.param.docKey
    }
  }
}
</script>
