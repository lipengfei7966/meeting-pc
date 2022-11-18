<template>
  <div class="bs-new-container app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
export default {
  name: 'roleManage',
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
          defaultSortString: 'code.desc',
          data: {
            usingFlag: ''
          }
        },
        formData: [
          {
            label: 'website.role.roleName',
            prop: 'roleName',
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
          search: '/api/base/customRole/list',
          doDelete: '/api/base/customRole/remove'
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
              return this.$refs.bsTable.currentRow
            }
          },
          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.id
            }
          },
          {
            name: 'detailSet',
            type: 'route',
            routeInfo: () => {
              return {
                name: 'customRoleDetail',
                params: {
                  type: 'detailSet',
                  back: 'roleManage',
                  code: this.$refs.bsTable.currentRow.code
                }
              }
            }
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          id: this.$route.meta.title + 'ff',
          cols: [
            {
              prop: 'roleName',
              label: 'website.role.roleName'
            },
            {
              label: 'website.role.customerName',
              prop: 'customerName'
            },
            {
              prop: 'usingFlag',
              sortProp: 'funcRole.usingFlag',
              width: '100',
              align: 'center',
              label: 'biz.lbl.usingFlag',
              format: {
                dict: this.$t('datadict.usingFlag')
              }
            },
            {
              prop: 'remark',
              label: 'biz.lbl.remark',
              sortable: false,
              'min-width': '300'
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

