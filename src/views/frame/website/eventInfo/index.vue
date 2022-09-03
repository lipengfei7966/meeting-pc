<template>
  <div class="app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
export default {
  name: 'eventInfoManage',
  data() {
    return {
      form: {
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          importance: undefined,
          title: undefined,
          type: undefined,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          defaultSortString: 'code.desc',
          data: {
            usingFlag: ''
          }
        },
        formData: [
          {
            label: 'website.eventInfo.query.eventName',
            prop: 'eventName',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            type: 'date',
            label: 'website.eventInfo.query.startDate',
            align: 'startDate',
            attrs: {
              clearable: true,
              format: 'yyyy-MM-dd',
              'value-format': 'yyyyMMdd'
            }
          },
          {
            type: 'date',
            label: 'website.eventInfo.query.endDate',
            align: 'endDate',
            attrs: {
              clearable: true,
              format: 'yyyy-MM-dd',
              'value-format': 'yyyyMMdd'
            }
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/biz/cmsEventInfo/page',
          doDelete: '/api/biz/cmsEventInfo/remove'
        },
        initSearch: true,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            component: () => import('./edit.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow
            }
          },
          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.id
            }
          },
          {
            name: 'detailSet',
            type: 'route',
            routeInfo: () => {
              return {
                name: 'roleDetail',
                params: {
                  type: 'detailSet',
                  back: 'roleManage',
                  code: this.$refs.bsTable.currentRow.code
                }
              }
            }
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          id: this.$route.meta.title + 'ff',
          cols: [
            {
              prop: 'eventName',
              label: 'website.eventInfo.query.eventName'
            },
            {
              label: 'website.eventInfo.query.customerName',
              prop: 'customerName'
            },
            {
              prop: 'startDate',
              width: '200',
              label: 'website.eventInfo.query.startDate',
              align: 'center',
              format: {
                dict: 'YYYY-MM-DD 24hh:mm',
                func: 'dateFormat'
              }
            },
            {
              prop: 'endDate',
              width: '200',
              label: 'website.eventInfo.query.endDate',
              align: 'center',
              format: {
                dict: 'YYYY-MM-DD 24hh:mm',
                func: 'dateFormat'
              }
            },
            {
              label: 'website.eventInfo.query.eventPlace',
              prop: 'eventPlace'
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

