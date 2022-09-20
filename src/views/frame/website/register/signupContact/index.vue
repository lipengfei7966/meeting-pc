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
  name: 'signupContact',
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
            label: 'website.signupContact.query.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO', // 统一基础档案组件，传值data区分
              clearable: true
            },
            event: {
              changeAll: this.onChangeAll
            }
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/register/signupContact/page',
          doDelete: '/api/register/signupContact/remove'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow
            }
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
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          cols: [
            {
              prop: 'name',
              label: 'website.signupContact.list.name'
            },
            {
              prop: 'mobile',
              label: 'website.signupContact.list.mobile'
            },
            {
              prop: 'email',
              label: 'website.signupContact.list.email'
            },
            {
              prop: 'department',
              label: 'website.signupContact.list.department'
            },
            {
              prop: 'code',
              label: 'website.signupContact.list.code'
            },
            {
              prop: 'contactType',
              label: 'website.signupContact.list.contactType',
              align: 'center',
              format: {
                dict: this.$t('datadict.contantType')
              }
            },
            {
              prop: 'certificateFlag',
              label: 'website.signupContact.list.certificateFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.certificateFlag')
              }
            },
            {
              prop: 'signFlag',
              label: 'website.signupContact.list.signFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.signFlag')
              }
            },
            {
              prop: 'signNum',
              label: 'website.signupContact.list.signNum'
            },
            {
              prop: 'checkFlag',
              label: 'website.signupContact.list.checkFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.checkFlag')
              }
            },
            {
              prop: 'createDate',
              label: 'website.signupContact.list.createDate'
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
    this.$refs.bsTable.isHeight = false
    // 设置行高为38
    this.$refs.bsTable.rowHeight = 38
  },
  methods: {
    onChangeAll(params) {
      debugger
      this.$refs.bsTable.doRefresh();
    }
  }
}
</script>
