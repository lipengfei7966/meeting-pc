<template>
  <div class="bs-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
export default {
  name: 'dataModelManage',
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
                required: false,
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
            label: '页面名称',
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
          search: '/api/code/pageModel/page',
          remove: '/api/code/pageModel/remove'
        },
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            $refs: this.$refs,
            component: () => import('./code.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            i18n: '页面详细设置',
            component: () => import('./detail.vue'),
            getParam(currentRow) {
              return currentRow.code
            }
          },

          {
            name: 'remove',
            getParam(currentRow) {
              return currentRow.code
            }
          }
        ],
        initSearch: false,
        table: {
          id: '',
          rowKey: 'code',
          expandAll: true,
          cols: [
            { prop: 'appCode', width: '220', label: '应用' },
            {
              prop: 'code',
              width: '220',
              label: '页面代码'
            },
            {
              prop: 'name',
              width: '220',
              label: '页面名称'
            },
            {
              prop: 'modelCode',
              width: '120',
              label: '模型代码'
            },
            {
              prop: 'pageTemp',
              width: '220',
              label: '页面模板',
              format: {
                dict: this.$t('datadict.codePageTemp')
              }
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
