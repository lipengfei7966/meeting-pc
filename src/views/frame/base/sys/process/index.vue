<template>
  <div class="bs-new-container app-container calendar-list-container">
    <bs-form ref='bsForm' :form='form'></bs-form>
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
export default {
  name: 'sysProcessManager',
  data() {
    return {
      dialogVisible: false,
      form: {
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          defaultSortString: 'id.desc',
          camelToUnderlineFlg: true,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {}
        },

        formData: [
          {
            label: 'platform.process.code',
            prop: 'code',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'platform.process.name',
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
          search: '/api/sys/sysProcess/page'
        },
        isTopBar: true,
        topBar: [
          {
            name: 'update',
            opType: 'update',
            type: 'dialog',
            getParam: () => {
              return this.$refs.bsTable.currentRow
            },
            component: () => import('@/views/frame/base/sys/process/edit.vue')
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        initSearch: true,
        table: {
          id: this.$route.meta.title,
          sortable: 'custom',
          cols: [
            {
              prop: 'code',
              width: '200',
              label: 'platform.process.code'
            },
            {
              prop: 'name',
              width: '200',
              label: 'platform.process.name'
            },
            {
              prop: 'value',
              width: '120',
              label: 'platform.process.code'
            },
            {
              prop: 'optionalValue',
              width: '300',
              label: 'platform.process.optionalValue'
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

