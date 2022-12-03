<template>
  <div class="bs-new-container app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>

    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>
<script>
export default {
  name: 'msgBizFunc',
  components: {},
  data() {
    return {
      form: {
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          importance: undefined,
          title: undefined,
          type: undefined,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {}
        },
        formData: [
          {
            label: 'msg.func.msgFuncCode',
            prop: 'msgFuncCode',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'msg.func.msgFuncName',
            prop: 'msgFuncName',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'biz.lbl.usingFlag',
            prop: 'usingFlag',
            element: 'base-select',
            list: this.$t('datadict.usingFlag'),
            attrs: {
              clearable: false
            }
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/base/msgBizFunc/page',
          doDelete: '/api/base/msgBizFunc/remove'
        },
        initSearch: true,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            component: () => import('./edit.vue')
          },
          {
            name: 'view',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow.id
            }
          },
          {
            name: 'update',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow.id
            }
          },
          {
            name: 'detailSet',
            type: 'route',
            routeInfo: () => {
              const row = this.$refs.bsTable.currentRow
              return {
                name: 'bizFuncParam',
                params: {
                  back: 'msgBizFunc',
                  opType: 'detailSet',
                  id: row.id,
                  msgFuncCode: row.msgFuncCode,
                  bizCode: row.bizCode
                }
              }
            }
          },
          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.id
            }
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          id: this.$route.meta.title,
          cols: [
            {
              label: 'website.signupContact.query.eventCode',
              width: '200',
              prop: 'bizCode'
            },
            {
              label: 'website.signupContact.query.eventCode',
              width: '200',
              prop: 'reservedStr1'
            },
            {
              label: 'msg.func.msgFuncCode',
              width: '200',
              prop: 'msgFuncCode'
            },
            {
              label: 'msg.func.msgFuncName',
              width: '200',
              prop: 'msgFuncName'
            },
            {
              label: 'msg.func.msgClassType',
              prop: 'msgClassType',
              width: '200',
              format: {
                dict: this.$t('datadict.msgClassType')
              }
            },
            {
              prop: 'usingFlag',
              width: '80',
              label: 'biz.lbl.usingFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.usingFlag')
              }
            }
          ]
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

  methods: {}
}
</script>

