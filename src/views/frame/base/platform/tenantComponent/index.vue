<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref="bsTable" :mainData="mainData"></bs-table>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import { notifySuccess, notifyInfo } from '@/utils/frame/base/notifyParams'
export default {
  name: 'tenantComponent',
  data() {
    return {
      form: {
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          camelToUnderlineFlg: true,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {},
          defaultSortString: 'tenantCode.asc,compCode.asc'
        },
        formData: [
          {
            label: 'platform.tenantComponent.tenantCode',
            prop: 'tenantCode',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'platform.tenantComponent.showFlag',
            prop: 'showFlag',
            element: 'base-select',
            list: this.$t('datadict.showType'),
            attrs: {
              clearable: true
            }
          }
        ]
      },
      mainData: {
        api: {
          search: '/api/platform/cfgTenantComp/page'
        },
        isTopBar: true,
        topBar: [
          {
            name: 'on',
            iconName: 'enabled',
            i18n: 'biz.btn.show',
            event: this.show
          },
          {
            name: 'off',
            iconName: 'stop',
            i18n: 'biz.btn.hidden',
            event: this.hidden
          },
          {
            name: 'refresh'
          }
        ],
        initSearch: true,
        isColset: true,
        table: {
          id: this.$route.meta.title,
          sortable: true,
          cols: [
            {
              prop: 'compCode',
              width: '200',
              label: 'platform.tenantComponent.compCode'
            },
            {
              prop: 'name',
              width: '200',
              label: 'platform.tenantComponent.name'
            },
            {
              prop: 'systemFlag',
              label: 'platform.tenantComponent.systemFlag',
              width: '100',
              align: 'center',
              format: {
                dict: this.$t('datadict.systemFlag')
              }
            },
            {
              prop: 'blockType',
              label: 'platform.tenantComponent.blockType',
              width: '100',
              align: 'center',
              format: {
                dict: this.$t('datadict.blockType')
              }
            },
            {
              prop: 'routerName',
              label: 'platform.tenantComponent.routerName',
              width: '200'
            },
            {
              prop: 'showFlag',
              label: 'platform.tenantComponent.showFlag',
              width: '100',
              align: 'center',
              format: {
                dict: this.$t('datadict.showType')
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
  methods: {
    show() {
      if (this.$refs.bsTable.currentRow) {
        request({
          url: '/api/platform/cfgTenantComp/show',
          method: 'post',
          data: {
            data: this.$refs.bsTable.currentRow,
            funcModule: '??????????????????',
            funcOperation: '??????'
          }
        })
          .then(response => {
            this.$notify(notifySuccess({ msg: this.$t('biz.msg.updateSuccess') }))
            this.$refs.bsTable.getList()
          })
          .catch(() => {})
      } else {
        this.$notify(notifyInfo({ msg: this.$t('biz.msg.noRowSelected') }))
      }
    },
    hidden() {
      if (this.$refs.bsTable.currentRow) {
        request({
          url: '/api/platform/cfgTenantComp/hidden',
          method: 'post',
          data: {
            data: this.$refs.bsTable.currentRow,
            funcModule: '??????????????????',
            funcOperation: '??????'
          }
        })
          .then(response => {
            this.$notify(notifySuccess({ msg: this.$t('biz.msg.updateSuccess') }))
            this.$refs.bsTable.getList()
          })
          .catch(() => {})
      } else {
        this.$notify(notifyInfo({ msg: this.$t('biz.msg.noRowSelected') }))
      }
    }
  }
}
</script>
