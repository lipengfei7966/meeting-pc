<template>
  <div class="bs-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
export default {
  name: 'codeGenerator',
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
            prop: 'codeApp',
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
          search: '/api/code/generator/list'
        },
        isTopBar: true,
        topBar: [
          {
            name: 'update',
            i18n: '生成代码',
            type: 'dialog',
            $refs: this.$refs,
            component: () => import('./code.vue'),
            getParam(currentRow) {
              return { table: currentRow.tableName, appCode: this.$refs.bsForm.form.listQuery.data.codeApp }
            }
          },
          {
            name: 'update',
            i18n: '配置表引用',
            type: 'dialog',
            $refs: this.$refs,
            component: () => import('@/views/frame/base/generator/tableJoin/add.vue'),
            getParam(currentRow) {
              return { appCode: this.$refs.bsForm.form.listQuery.data.codeApp, tableName: currentRow.tableName, tableComment: currentRow.tableComment }
            }
          }
        ],
        initSearch: false,
        table: {
          id: '',
          cols: [
            {
              prop: 'tableName',
              width: '220',
              label: '表名'
            },
            {
              prop: 'engine',
              width: '220',
              label: 'Engine'
            },
            {
              prop: 'createTime',
              width: '160',
              label: '创建时间'
            },
            {
              prop: 'tableComment',
              label: '表备注'
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
