<template>
  <div class="bs-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
export default {
  name: 'tableJoinManage',
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
            label: '应用',
            prop: 'appCode',
            element: 'base-select',
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ],
            attrs: {
              clearable: false,
              data: 'CODE_APP',
              params: {
                usingFlag: '1'
              }
            }
          },
          {
            label: '表名',
            prop: 'tableName',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          }
        ]
      },
      mainData: {
        api: {
          search: '/api/code/tableJoinInfo/page',
          doDelete: '/api/code/tableJoinInfo/remove'
        },
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            component: () => import('@/views/frame/base/generator/tableJoin/code.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            component: () => import('@/views/frame/base/generator/tableJoin/code.vue')
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
        initSearch: false,
        table: {
          id: '',
          cols: [
            {
              label: '应用',
              width: '120',
              prop: 'appCode'
            },
            {
              prop: 'tableName',
              width: '220',
              label: '表名'
            },
            {
              prop: 'tableComment',
              width: '220',
              label: '表描述'
            },
            // {
            //   prop: 'joinType',
            //   width: '120',
            //   label: '关联类型'
            // },
            {
              prop: 'joinColCode',
              width: '200',
              label: '关联字段代码'
            },
            {
              prop: 'joinColName',
              width: '200',
              label: '关联字段名称'
            },
            {
              prop: 'tenantFlag',
              width: '120',
              format: {
                dict: this.$t('datadict.yesNo')
              },
              label: '是否有租户标志'
            },
            {
              prop: 'remark',
              width: '220',
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
