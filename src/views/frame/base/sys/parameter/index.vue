<template>
  <div class="bs-new-container app-container calendar-list-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref="bsTable" :mainData="mainData"></bs-table>
  </div>
</template>

<script>
export default {
  name: 'parameter',
  data() {
    return {
      form: {
        listQuery: {
          isPage: true,
          current: 1,
          size: 20,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {
            parameterCode: '',
            parameterName: '',
            parameterAttr: '',
            parameterType: ''
          },
          defaultSortString: 'parameterName.asc'
        },

        formData: [
          {
            label: 'sys.parameter.parameterCode',
            prop: 'parameterCode',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'sys.parameter.parameterName',
            prop: 'productCategoryCode',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'sys.parameter.parameterAttr',
            prop: 'parameterAttr',
            element: 'base-select',
            list: this.$t('datadict.sysParamAttr'),
            attrs: {
              // data: 'SYS_PARAM_ATTR',
              clearable: true
            }
          },
          {
            label: 'sys.parameter.parameterType',
            prop: 'parameterType',
            element: 'base-select',
            list: this.$t('datadict.sysParamType'),
            attrs: {
              // data: 'SYS_PARAM_TYPE',
              clearable: true
            }
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/sys/parameter/list',
          doDelete: '/api/sys/parameter/remove'
        },

        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            component: () => import('@/views/frame/base/sys/parameter/edit.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            getParam: () => {
              return this.$refs.bsTable.currentRow
            },
            component: () => import('@/views/frame/base/sys/parameter/edit.vue')
          },
          {
            name: 'remove'
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
          id: '',
          cols: [
            {
              prop: 'parameterCode',
              label: 'sys.parameter.parameterCode'
            },
            {
              prop: 'parameterName',
              label: 'sys.parameter.parameterName'
            },
            {
              prop: 'parameterType',
              label: 'sys.parameter.parameterType',
              format: {
                dict: this.$t('datadict.sysParamType')
              }
            },
            {
              prop: 'parameterValue',
              label: 'sys.parameter.parameterValue'
            },
            {
              prop: 'parameterAttr',
              align: 'center',
              label: 'sys.parameter.parameterAttr',
              format: {
                dict: this.$t('datadict.sysParamAttr')
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
