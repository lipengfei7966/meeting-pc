<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref="bsTable" :mainData="mainData"></bs-table>
  </div>
</template>

<script>
export default {
  name: 'cfgDict',
  data() {
    return {
      form: {
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          camelToUnderlineFlg: true,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {
            dictName: '',
            dictCode: '',
            usingFlag: ''
          },
          defaultSortString: 'dictCode.asc'
        },
        formData: [
          {
            label: 'sys.dict.dictName',
            prop: 'dictName',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'sys.dict.dictCode',
            prop: 'dictCode',
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
              clearable: true
            }
          }
        ]
      },
      mainData: {
        api: {
          search: '/api/platform/cfgDict/page',
          doDelete: '/api/platform/cfgDict/remove'
        },
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
              return this.$refs.bsTable.currentRow.dictCode
            }
          },
          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.dictCode
            }
          },
          {
            name: 'detailSet',
            type: 'route',
            routeInfo: () => {
              const row = this.$refs.bsTable.currentRow
              return {
                name: 'cfgDictItem',
                params: {
                  back: 'cfgDict',
                  opType: 'detailSet',
                  dictCode: row.dictCode
                }
              }
            }
          },
          {
            name: 'export'
          },
          {
            name: 'refresh'
          }
        ],
        initSearch: true,
        isColset: true,
        table: {
          id: this.$route.meta.title,
          sortable: 'custom',
          cols: [
            {
              prop: 'dictName',
              width: '200',
              label: 'sys.dict.dictName'
            },
            {
              prop: 'dictCode',
              width: '300',
              label: 'sys.dict.dictCode'
            },
            {
              prop: 'usingFlag',
              label: 'biz.lbl.usingFlag',
              width: '100',
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
  }
}
</script>
