<template>
  <div class="bs-new-container app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>

    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
export default {
  name: 'customerManage',
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
            label: 'website.customer.name',
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
          search: '/api/base/cmsCustomer/page',
          doDelete: '/api/base/cmsCustomer/remove'
        },
        initSearch: true,
        isTopBar: true,
        topBar: [
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          id: this.$route.meta.title + 'ff',
          cols: [
          {
              prop: 'code',
              label: 'website.customer.code'
            },
            {
              prop: 'name',
              label: 'website.customer.name'
            },
            {
              label: 'website.customer.shortName',
              prop: 'shortName'
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

