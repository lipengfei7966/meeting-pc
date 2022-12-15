<template>
  <div class="bs-new-container app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>

    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>
<script>
export default {
  name: 'msgFunc',
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
          orderByField: 'key',
          data: {
            usingFlag: '',
            msgFuncCode: null,
            msgFuncName: null
          }
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
          search: '/api/msg/func/list',
          doDelete: '/api/msg/func/remove'
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
            name: 'update',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow.msgFuncCode
            }
          },
          {
            name: 'detailSet',
            type: 'route',
            routeInfo: () => {
              const row = this.$refs.bsTable.currentRow
              return {
                name: 'funcParam',
                params: {
                  back: 'msgFunc',
                  opType: 'detailSet',
                  funcCode: row.msgFuncCode
                }
              }
            }
          },
          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.msgFuncCode
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
            },
            {
              label: 'msg.func.msgBizScene',
              prop: 'reservedStr1',
              width: '120',
              align: 'center',
              format: {
                dict: this.$t('datadict.msgBizScene')
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

