<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref="bsTable" :mainData="mainData"></bs-table>
  </div>
</template>

<script>
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
export default {
  name: 'eventInfoManage',
  data() {
    return {
      form: {
        moreShowFlg: false,
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
            prop: 'eventBeginTime',
            attrs: {
              clearable: true,
              format: 'yyyy-MM-dd',
              'value-format': 'yyyy-MM-dd HH:mm:ss'
            }
          },
          {
            type: 'date',
            label: 'website.eventInfo.query.endDate',
            prop: 'eventEndTime',
            attrs: {
              clearable: true,
              format: 'yyyy-MM-dd',
              'value-format': 'yyyy-MM-dd HH:mm:ss'
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
            name: 'view',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow
            }
          },
          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.code
            }
          },
          {
            name: 'design',
            type: 'route',
            i18n: '微站设计',
            event: this.doDesign,
            routeInfo: () => {
              return {
                name: 'microStationManagement',
                params: {
                  type: 'detailSet',
                  back: 'roleManage',
                  ids: this.$refs.bsTable.currentRow.code
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
              label: 'website.eventInfo.list.eventName'
            },
            {
              label: 'website.eventInfo.list.customerName',
              prop: 'customerName'
            },
            {
              label: 'website.eventInfo.list.startDate',
              prop: 'eventBeginTime'
            },
            {
              label: 'website.eventInfo.list.endDate',
              prop: 'eventEndTime'
            },
            // {
            //   prop: 'eventBeginTime',
            //   width: '200',
            //   label: 'website.eventInfo.list.startDate',
            //   align: 'center',
            //   format: {
            //     dict: 'YYYY-MM-DD 24hh:mm',
            //     func: 'dateFormat'
            //   }
            // },
            // {
            //   prop: 'eventBeginTime',
            //   label: 'website.eventInfo.list.startDate',
            //   width: '120',
            //   align: 'center',
            //   format: {
            //     dict: 'yyyy-MM-dd HH:mm',
            //     func: 'dateFormate'
            //   }
            // },
            // {
            //   prop: 'eventEndTime',
            //   width: '200',
            //   label: 'website.eventInfo.list.endDate',
            //   align: 'center',
            //   format: {
            //     dict: 'YYYY-MM-DD 24hh:mm',
            //     func: 'dateFormat'
            //   }
            // },
            {
              label: 'website.eventInfo.list.eventPlace',
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
  },
  mounted() {
    // debugger
    // 不设置表格高度
    //this.$refs.bsTable.isHeight = false
    // 设置行高为38
    // this.$refs.bsTable.rowHeight = 38
  },
  methods: {
    doDesign() {
      this.$router.push({
        name: 'microStationManagement',
        params: {
          type: 'detailSet',
          back: 'roleManage',
          ids: this.$refs.bsTable.currentRow.code
        }
      })
    }
  }
}
</script>
