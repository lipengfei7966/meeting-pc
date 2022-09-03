<template>
  <div class="bs-container app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
import { notifyInfo } from '@/utils/frame/base/notifyParams'

export default {
  name: 'derivativeGroup',
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
            label: 'sys.ctpLog.apiUrl',
            prop: 'apiUrl',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            type: 'datetime',
            label: 'sys.ctpLog.dateTime',
            props: ['dateTimeStart', 'dateTimeEnd'],
            attrs: {
              clearable: true,
              format: 'yyyy-MM-dd HH:mm:ss',
              'value-format': 'yyyyMMddHHmmss'
            }
          }
        ]
      },
      mainData: {
        api: {
          search: '/api/ctp/cfgCtpLog/list',
          doDelete: '/api/ctp/cfgCtpLog/remove'
        },
        isTopBar: true,
        topBar: [
          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.id
            }
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          id: this.$route.meta.title,
          required: true,
          cols: [
            {
              prop: 'apiUrl',
              width: '400',
              label: 'sys.ctpLog.apiUrl'
            },
            {
              prop: 'derivativeAccount',
              width: '150',
              label: 'sys.ctpLog.derivativeAccount'
            },
            {
              prop: 'dateTime',
              width: '150',
              label: 'sys.ctpLog.dateTime'
            },
            {
              prop: 'successFlag',
              width: '80',
              align: 'center',
              label: 'sys.ctpLog.successFlag',
              format: {
                dict: this.$t('datadict.successFlag')
              }
            },
            {
              prop: 'content',
              width: '300',
              label: 'sys.ctpLog.content'
            },
            {
              prop: 'errMsg',
              width: '300',
              label: 'sys.ctpLog.errMsg'
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
