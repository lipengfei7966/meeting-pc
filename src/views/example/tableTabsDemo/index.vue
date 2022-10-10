<template>
  <div class="bs-new-container app-container">
    <bs-table-tabs ref='bsTable' :mainData='mainData' @initCallback='initCallback'>
    </bs-table-tabs>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  name: 'tableTabsDemo',
  data() {
    return {
      summaryData: null,
      mainData: {
        listQuery: {
          current: 1,
          data: {},
          defaultSortString: 'createDate.desc',
          funcModule: '客商管理',
          funcOperation: '查询',
          isPage: true,
          size: 20
        },
        api: {
          search: '/api/cust/customer/list',
          tabSearch: '/api/cust/customer/list'
        },
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            component: () => import('@/views/example/indexDemo/dialog2.vue')
          },
          {
            name: 'add',
            i18n: '路由GET新增',
            type: 'route',
            routeInfo() {
              return {
                name: 'editTagDemo',
                query: {
                  type: 'update',
                  id: '10086'
                }
              }
            }
          },
          {
            name: 'add',
            i18n: '路由POST新增',
            type: 'route',
            routeInfo() {
              return {
                name: 'editTagDemo',
                params: {
                  type: 'update',
                  id: '200086'
                }
              }
            },
            validate: row => {
              // 针对多个条件设置
              return [
                {
                  result: row.usingFlag === '0',
                  msg: this.$t('当前状态不可删除该条数据')
                }
              ]
            }
          },
          {
            name: 'view',
            type: 'route',
            allowDblClick: true, // 是否可双击查看
            routeInfo(currentRow) {
              return {
                name: 'editTagDemo',
                params: {
                  type: 'view'
                }
              }
            }
          },
          {
            name: 'remove',
            getParam(row) {
              return row.id
            },
            validateApi(row) {
              return {
                url: '/check', // 接口
                data: row // 参数
              }
            },
            msg: this.$t('当前状态不可删除该条数据'),
            validate(row) {
              return row.usingFlag === '1'
            }
          },
          {
            name: 'more',
            list: [
              {
                name: 'cancelAudit'
              },
              {
                name: 'export'
              },
              {
                name: 'refresh'
              },
              {
                name: 'defined',
                permitName: ['add'], // 按钮权限标识
                iconName: 'view',
                i18n: '自定义9527',
                event: this.onDefined
              }
            ]
          }
        ],
        initSearch: false,
        isColset: true,
        table: {
          id: 'loginId',
          sortable: 'custom',
          showSummary: false,
          defineSummaryFun: this.showSummary,
          selectionFixed: true,
          cols: [
            {
              prop: 'productCategoryName',
              width: '220',
              label: '商品名称'
            },
            {
              prop: 'productCategoryAbbr',
              width: '220',
              label: '商品简称',
              sortable: false,
              fixed: 'left'
            },
            {
              prop: 'productCategoryCode',
              width: '220',
              label: '商品编码',
              sortable: true,
              sortProp: 'abc'
            },
            {
              prop: 'attrGroupId',
              width: '220',
              label: '属性组'
            },
            {
              prop: 'usingFlag',
              width: '220',
              align: 'center',
              label: '状态',
              format: {
                dict: this.$t('datadict.usingFlag')
              },
              summary: true
            },
            {
              prop: 'remark',
              minWidth: '500',
              label: '备注'
            },
            {
              prop: 'money',
              label: '金额显示',
              width: '220',
              format: {
                func: 'thousands',
                dict: 2
              }
            },
            {
              prop: 'count',
              label: '数字显示',
              width: '220',
              format: {
                func: 'thousands',
                dict: 3
              }
            },
            {
              prop: 'quantity',
              label: '整数显示',
              width: '220',
              format: {
                func: 'thousands',
                dict: 0
              }
            },
            {
              prop: 'date',
              label: '日期显示',
              width: '220',
              format: {
                func: 'dateFormat',
                dict: 'YYYY-MM-DD'
              }
            }
          ]
        },
        tabs: [
          {
            name: 'DEMO_Tab',
            label: '商品信息',
            component: () => import('@/views/example/indexDemo/DEMO_Tab.vue'),
            isShow: true,
            required: true
          },
          {
            name: 'DEMO_Tab2',
            label: '发货计划',
            component: () => import('@/views/example/indexDemo/DEMO_Tab2.vue'),
            isShow: true
          }
        ],
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
  async mounted() {},
  methods: {
    closeCallback(param) {
      console.log(param, 333)
    },
    initCallback(data) {},
    // 自定义按钮事件
    onDefined() {
      console.log(this, 'hello world')
    },
    change(value) {
      console.log(value)
    },
    changeAll(item) {
      console.log(item)
    },
    onChange(params) {
      console.log(params, 111)
    },
    onEvn(params) {
      console.log(params, 222)
    },
    onChangeAll(params) {
      console.log(params, 333)
    }
  }
}
</script>
