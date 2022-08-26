<template>
  <div class="app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <!-- <template v-if='true||$route.name === $options.name || ( $route.meta && $route.meta.componentName === $options.name)'> -->
    <bs-table ref='bsTable' :mainData='mainData'>
      <!-- isException 此列特殊处理-->
      <template slot='isException' slot-scope='scope'>
        <el-tag size="mini" v-if="scope.row.isException==='1'" type="danger">{{$t('sys.log.fail')}}</el-tag>
        <el-tag size="mini" v-else type="success">{{$t('sys.log.success')}}</el-tag>
      </template>
    </bs-table>
    <!-- </template> -->
  </div>
</template>
<script>
export default {
  name: 'apiLog',
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
            staff: '',
            apiUrl: '',
            createDateStart: '',
            createDateEnd: '',
            funcModule: '',
            funcOperation: '',
            organ: null,
            isException: ''
          }
        },
        formData: [
          {
            width: '120',
            type: 'datetime',
            label: 'sys.log.requestTime',
            props: ['createDateStart', 'createDateEnd'],
            default: this.$toolUtil.getLatestWeektimeForBegin(),
            attrs: {
              cols: 2,
              format: 'yyyy-MM-dd HH:mm:ss',
              'value-format': 'yyyy-MM-dd HH:mm:ss',
              pickerOptions: this.$toolUtil.getDefaultPickerOptions()
            }
          },
          {
            label: 'sys.log.apiUrl',
            prop: 'apiUrl',
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
            label: 'sys.log.account',
            prop: 'account',
            element: 'input-validate',
            clearable: true
          },
          {
            label: 'sys.log.exception',
            prop: 'isException',
            element: 'el-checkbox',
            attrs: {
              'true-label': '1',
              'false-label': ''
            }
          },
          {
            label: 'sys.log.tenantName',
            prop: 'tenantName',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'sys.log.serverIpAddress',
            prop: 'serverIpAddress',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/sys/log/api'
        },
        isTopBar: true,
        topBar: [
          {
            name: 'view',
            allowDblClick: true,
            i18n: 'sys.log.param',
            type: 'dialog',
            getParam: () => {
              return this.$refs.bsTable.currentRow
            },
            component: () => import('@/views/frame/base/sys/log/api/parameter.vue')
          },
          {
            name: 'view',
            i18n: 'sys.log.exception',
            msg: this.$t('sys.log.msg.noException'),
            validate(currentRow) {
              return currentRow ? currentRow.isException === '1' : true
            },
            getParam: () => {
              return this.$refs.bsTable.currentRow
            },
            type: 'dialog',
            component: () => import('@/views/frame/base/sys/log/api/exception.vue')
          },
          {
            name: 'view',
            i18n: 'sys.log.sql',
            type: 'dialog',
            getParam: () => {
              return this.$refs.bsTable.currentRow
            },
            component: () => import('@/views/frame/base/sys/log/api/sql.vue')
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
          id: this.$route.meta.title + 'new',
          sortable: 'custom',
          cols: [
            {
              prop: 'isException',
              label: 'table.status',
              isSlot: true,
              fixed: 'right',
              align: 'center',
              width: '80'
            },
            {
              prop: 'createDate',
              label: 'sys.log.requestTime',
              width: '130'
            },
            {
              prop: 'apiUrl',
              label: 'sys.log.apiUrl',
              'min-width': '300'
            },
            {
              prop: 'executeTime',
              width: '80',
              label: 'sys.log.executeTime'
            },
            {
              prop: 'serverIpAddress',
              label: 'sys.log.serverIpAddress',
              width: '120'
            },
            {
              prop: 'account',
              width: '80',
              label: 'sys.log.account'
            },
            {
              prop: 'loginType',
              width: '100',
              label: 'sys.log.loginType',
              format: {
                dict: this.$t('datadict.loginType')
              }
            },
            {
              prop: 'tenantName',
              width: '100',
              label: 'sys.log.tenantName'
            },
            {
              prop: 'identity',
              width: '100',
              label: 'sys.log.identity',
              format: {
                dict: this.$t('datadict.userIdentity')
              }
            },
            {
              prop: 'ipAddress',
              label: 'sys.log.ipAddress',
              width: '150'
            },
            {
              prop: 'bizModel',
              width: '80',
              label: 'sys.log.bizModel'
            },
            {
              prop: 'menuName',
              width: '160',
              label: 'sys.log.menuName'
            },
            {
              prop: 'funcModule',
              width: '120',
              label: 'sys.log.funcModule'
            },
            {
              prop: 'funcOperation',
              width: '100',
              label: 'sys.log.operation'
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

