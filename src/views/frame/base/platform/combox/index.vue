<template>
  <div class="bs-container app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
import { notifySuccess, confirmTip } from '@/utils/frame/base/notifyParams'
// axios访问
import request from '@/utils/frame/base/request'
export default {
  name: 'comboxManage',
  data() {
    return {
      dialogVisible: false,
      form: {
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          camelToUnderlineFlg: true,
          defaultSortString: 'id.desc',
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {
            name: '',
            usingFlag: ''
          }
        },
        moreShowFlg: true,
        formData: [
          {
            label: '功能代码',
            prop: 'funcCode',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: '功能名称',
            prop: 'funcName',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/platform/cfgCombox/page',
          // 删除
          doDelete: '/api/platform/cfgCombox/remove'
        },
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            opType: 'add',
            type: 'dialog',
            component: () => import('./edit.vue')
          },

          {
            name: 'update',
            opType: 'update',
            type: 'dialog',
            getParam: currentRow => {
              return currentRow.id
            },
            component: () => import('./edit.vue')
          },
          {
            name: 'remove',
            getParam: currentRow => {
              return currentRow.id
            }
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        initSearch: true,
        table: {
          sortable: 'custom',
          id: this.$route.meta.title,
          cols: [
            {
              prop: 'funcCode',
              width: '200',
              label: '功能代码'
            },
            {
              prop: 'funcName',
              width: '200',
              label: '功能名称'
            },

            {
              prop: 'tableName',
              width: '200',
              label: '数据表'
            },
            {
              prop: 'tableColumnValue',
              width: '200',
              label: '表码值字段'
            },
            {
              prop: 'tableColumnName',
              width: '200',
              label: '表名称字段'
            },
            {
              prop: 'tenantFlag',
              width: '200',
              label: '是否有租户标志',
              format: {
                dict: this.$t('datadict.usingFlag')
              }
            },
            {
              sortable: false,
              prop: 'remark',
              'min-width': '300',
              label: 'biz.lbl.remark'
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
  components: {},
  methods: {}
}
</script>

