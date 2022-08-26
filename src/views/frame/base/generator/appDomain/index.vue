<template>
  <div class="app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
export default {
  name: 'appDomainManage',
  data() {
    return {
      form: {
        listQuery: {
          isPage: true,
          current: 1,
          size: 20,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {},
          defaultSortString: ''
        },
        formData: [
          {
            prop: 'appCode',
            label: '项目代码',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: '名称',
            prop: 'name',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          }
        ]
      },
      mainData: {
        api: {
          search: '/api/code/app/page',
          doDelete: '/api/code/app/remove'
        },
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
            getParam(currentRow) {
              return currentRow
            },
            component: () => import('./edit.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam(currentRow) {
              return currentRow
            }
          },
          {
            name: 'remove',
            getParam(currentRow) {
              return currentRow.appCode
            }
          }
        ],
        initSearch: true,
        table: {
          id: '',
          cols: [
            {
              prop: 'appCode',
              label: '项目代码',
              width: '220'
            },
            {
              prop: 'appName',
              label: '项目名称',
              width: '220'
            },
            {
              prop: 'jdbcUser',
              label: '账户',
              width: '220'
            },

            {
              prop: 'dbType',
              label: '数据库类型',
              width: '220'
            },
            {
              prop: 'dbSchema',
              label: '数据库',
              width: '220'
            },
            {
              prop: 'remark',
              label: '备注'
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
