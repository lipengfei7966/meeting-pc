<template>
  <div class="bs-new-container app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
export default {
  name: 'sqlLogForTenant',
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
          data: {}
        },

        formData: [
          {
            bind: 'createDateRange',
            type: 'datetimerange',
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
            label: 'sys.log.method',
            prop: 'method',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'sys.log.tables',
            prop: 'tables',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            prop: 'sqlType',
            default: 'tenant',
            isShow: false
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/log/sql/page'
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
            component: () => import('../parameter.vue')
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
              prop: 'method',
              width: '350',
              label: 'sys.log.method'
            },
            {
              prop: 'tables',
              width: '200',
              label: 'sys.log.tables'
            },
            {
              prop: 'executeTime',
              label: 'sys.log.executeTime',
              width: '100'
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
  methods: {
    // 设置日期选项
    getPickerOptions() {
      return {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '当天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime())
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  }
}
</script>
