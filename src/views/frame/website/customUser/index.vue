<template>
  <div class="bs-new-container app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>
<script>
export default {
  name: 'customUser',
  data() {
    return {
      form: {
        moreShowFlg: true,
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {}
        },
        formData: [
          {
            label: 'website.user.name',
            prop: 'name',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.user.account',
            prop: 'account',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.user.customerName',
            prop: 'customerId',
            element: 'base-select',
            attrs: {
              data: 'CUSTOMER',
              clearable: true
            }
          },
          {
            label: 'website.user.customerDeptName',
            prop: 'customerDeptId',
            element: 'base-select',
            attrs: {
              data: 'USER_GROUP',
              clearable: true
            }
          },
          {
            label: 'website.user.customerContactName',
            prop: 'employeeName',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'biz.lbl.usingFlag',
            prop: 'usingFlag',
            element: 'base-select',
            list: this.$t('datadict.usingFlag'),
            attrs: {
              clearable: true
            }
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/base/customUser/list',
          doDelete: '/api/base/customUser/remove',
          set: '/api/base/customUser/resetPwd'
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
            name: 'view',
            allowDblClick: true,
            type: 'dialog',
            component: () => import('./edit.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            component: () => import('./edit.vue')
          },
          {
            name: 'set',
            permitName: ['resetPassword'],
            i18n: 'biz.btn.resetPwd',
            getParam: () => {
              return this.$refs.bsTable.currentRow.id
            }
          },
          {
            name: 'set',
            permitName: ['unlock'],
            i18n: 'biz.btn.unlock',
            url: '/api/base/customUser/unlock',
            successMsgInfo: '解锁成功',
            getParam: () => {
              return this.$refs.bsTable.currentRow.id
            }
          },
          {
            name: 'view',
            i18n: 'website.user.userInfo',
            type: 'dialog',
            getParam(currentRow) {
              return currentRow.code
            },
            component: () => import('./role.vue')
          },
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
          cols: [
            {
              label: 'website.user.name',
              prop: 'name',
              sortProp: 'funcUser.name',
              width: '150'
            },
            {
              label: 'website.user.account',
              prop: 'account',
              width: '100'
            },
            {
              label: 'website.user.customerContactName',
              prop: 'customerContactName',
              width: '120'
            },
            {
              prop: 'usingFlag',
              width: '80',
              align: 'center',
              label: 'biz.lbl.usingFlag',
              format: {
                dict: this.$t('datadict.usingFlag')
              }
            },
            {
              label: 'website.user.failnum',
              prop: 'failnum',
              width: '120',
              align: 'right'
            },
            {
              label: 'website.user.loginTime',
              prop: 'loginTime',
              width: '140'
            },
            {
              label: 'website.user.customerName',
              prop: 'customerName',
              width: '200'
            },
            {
              label: 'website.user.customerDeptName',
              prop: 'customerDeptName',
              width: '120'
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

