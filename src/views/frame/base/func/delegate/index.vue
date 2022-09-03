<template>
  <div class="bs-container app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>
<script>
import request from '@/utils/frame/base/request'
import { notifySuccess, notifyInfo, confirmTip, notifyError } from '@/utils/frame/base/notifyParams'
export default {
  name: 'delegate',
  components: {},
  data() {
    return {
      form: {
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          orderByField: 'createDate',
          data: {
            groupCode: '',
            takeBackFlag: ''
          }
        },
        formData: [
          {
            label: 'func.delegate.form.groupCode',
            prop: 'groupCode',
            element: 'base-select',
            list: [],
            attrs: {
              clearable: true
            }
          },
          {
            label: 'func.delegate.form.takeBackFlag',
            prop: 'takeBackFlag',
            element: 'base-select',
            list: this.$t('datadict.yesNo'),
            default: '0',
            attrs: {
              clearable: true
            }
          }
        ]
      },
      mainData: {
        api: {
          search: '/api/func/delegation/list'
        },
        initSearch: true,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            i18n: 'biz.btn.delegate',
            type: 'dialog',
            component: () => import('./edit.vue')
          },
          {
            name: 'takeBack',
            i18n: 'biz.btn.takeBack',
            iconName: 'cancel',
            event: this.takeBack
          },
          {
            name: 'add',
            i18n: 'biz.btn.delegateAll',
            type: 'dialog',
            component: () => import('./delegateAll.vue')
          },
          {
            name: 'set',
            permitName: ['takeBack'],
            iconName: 'cancel',
            i18n: 'biz.btn.takeBackAll',
            event: this.takeBackAll
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          cols: [
            {
              prop: 'groupName',
              width: '200',
              label: 'func.delegate.list.groupName'
            },
            {
              prop: 'employeeName',
              width: '100',
              label: 'func.delegate.list.employeeName'
            },
            {
              prop: 'createDate',
              width: '200',
              label: 'func.delegate.list.delegateDate',
              align: 'center',
              format: {
                dict: 'YYYY-MM-DD 24hh:mm:ss',
                func: 'dateFormat'
              }
            },
            {
              prop: 'takeBackFlag',
              label: 'func.delegate.list.takeBackFlag',
              width: '100',
              align: 'center',
              format: {
                dict: this.$t('datadict.yesNo')
              }
            },
            {
              prop: 'takeBackDate',
              width: '200',
              label: 'func.delegate.list.takeBackDate',
              align: 'center',
              format: {
                dict: 'YYYY-MM-DD 24hh:mm:ss',
                func: 'dateFormat'
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
  },
  created() {
    this.listAuditGroupForCurrentAccount()
  },
  methods: {
    listAuditGroupForCurrentAccount() {
      var auditGroupForm = {}
      this.form.formData.forEach(ele => {
        if (ele.prop === 'groupCode') {
          auditGroupForm = ele
        }
      })
      if (auditGroupForm.list) {
        auditGroupForm.list = []
      }
      request({
        url: '/api/func/auditGroup/listForCurrentAccount',
        method: 'POST',
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: '0'
        }
      })
        .then(response => {
          if (response.data && response.data.length > 0) {
            debugger
            for (var i = 0; i < response.data.length; i++) {
              auditGroupForm.list.push({
                key: response.data[i].code,
                value: response.data[i].code,
                label: response.data[i].name
              })
            }
          }
        })
        .catch(() => {})
    },
    takeBackAll() {
      confirmTip(this, 'confirmTakeBack').then(() => {
        request({
          url: '/api/func/delegation/takeBackAll',
          method: 'POST',
          data: {
            funcModule: this.$t('route.' + this.$route.meta.title),
            funcOperation: this.$t('biz.btn.takeBackAll'),
            data: ''
          }
        })
          .then(response => {
            if (response.msgId != null) {
              this.$notify(
                notifyError({
                  msg: response.msgText
                })
              )
            } else {
              this.$notify(
                notifySuccess({
                  msg: this.$t('biz.msg.takeBackSuccess')
                })
              )
            }
            this.$refs.bsTable.getList()
          })
          .catch(() => {})
      })
    },
    takeBack() {
      if (!this.$refs.bsTable.currentRow) {
        this.$notify(
          notifyInfo({
            msg: this.$t('biz.msg.noRowSelected')
          })
        )
        return
      }
      confirmTip(this, 'confirmTakeBack').then(() => {
        request({
          url: '/api/func/delegation/takeBack',
          method: 'POST',
          data: {
            funcModule: this.$t('route.' + this.$route.meta.title),
            funcOperation: this.$t('biz.btn.takeBack'),
            data: this.$refs.bsTable.currentRow.id
          }
        })
          .then(response => {
            if (response.msgId != null) {
              this.$notify(
                notifyError({
                  msg: response.msgText
                })
              )
            } else {
              this.$notify(
                notifySuccess({
                  msg: this.$t('biz.msg.takeBackSuccess')
                })
              )
            }
            this.$refs.bsTable.getList()
          })
          .catch(() => {})
      })
    }
  }
}
</script>

