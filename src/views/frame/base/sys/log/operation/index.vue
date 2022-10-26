<template>
  <div class="bs-new-container app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
export default {
  name: 'operationLog',
  data() {
    return {
      form: {
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          defaultSortString: 'createDate.desc',
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {
            account: '',
            createDateStart: '',
            createDateEnd: '',
            funcModule: '',
            funcOperation: ''
          }
        },
        formData: [
          {
            type: 'datetime',
            label: 'sys.log.operationTime',
            props: ['createDateStart', 'createDateEnd'],
            default: this.$toolUtil.getLatestWeektime(),
            attrs: {
              cols: 2,
              format: 'yyyy-MM-dd HH:mm:ss',
              'value-format': 'yyyy-MM-dd HH:mm:ss',
              pickerOptions: this.$toolUtil.getDefaultPickerOptions()
            }
          },
          {
            label: 'sys.log.account',
            prop: 'account',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'sys.log.menuName',
            prop: 'bizModel',
            element: 'base-select',
            attrs: {
              data: 'ROOT_MENU',
              params: {
                type: 'menu'
              },
              clearable: true
            }
          },
          {
            label: 'sys.log.funcModule',
            prop: 'funcModule',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'sys.log.operation',
            prop: 'funcOperation',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'sys.log.billNo',
            prop: 'billNo',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'sys.log.billType',
            element: 'input-validate',
            prop: 'billType',
            attrs: {
              clearable: true
            }
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/sys/log/operation'
        },
        isTopBar: true,
        topBar: [
          {
            name: 'view',
            allowDblClick: true,
            component: () => import('@/views/frame/base/sys/log/operation/view.vue'),
            type: 'dialog',
            getParam: () => {
              return this.$refs.bsTable.currentRow
            }
          },
          {
            name: 'export'
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          id: this.$route.meta.title,
          sortable: 'custom',
          cols: [
            {
              prop: 'createDate',
              width: '150',
              label: 'sys.log.operationTime'
            },
            {
              prop: 'account',
              width: '100',
              label: 'sys.log.account'
            },
            {
              prop: 'tenantName',
              width: '100',
              label: 'sys.log.tenantName'
            },
            {
              prop: 'loginType',
              label: 'sys.log.loginType',
              width: '100',
              format: {
                dict: this.$t('datadict.loginType')
              }
            },
            {
              prop: 'identity',
              label: 'sys.log.identity',
              width: '100',
              format: {
                dict: this.$t('datadict.userIdentity')
              }
            },
            {
              prop: 'ipAddress',
              width: '120',
              label: 'sys.log.ipAddress'
            },
            {
              prop: 'menuName',
              width: '160',
              label: 'sys.log.menuName'
            },
            {
              prop: 'funcModule',
              width: '160',
              label: 'sys.log.funcModule'
            },
            {
              prop: 'funcOperation',
              width: '100',
              label: 'sys.log.operation',
              'show-overflow-tooltip': 'true'
            },
            {
              prop: 'dataType',
              width: '100',
              label: 'sys.log.bizData'
            },
            {
              prop: 'billNo',
              width: '200',
              label: 'sys.log.billNo'
            },
            {
              prop: 'billType',
              width: '120',
              label: 'sys.log.billType'
            },
            {
              prop: 'dataDescription',
              label: 'sys.log.outline',
              'min-width': '200',
              'show-overflow-tooltip': 'true'
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
