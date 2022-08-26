<template>
  <div class="app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'

import { notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  name: 'orgManage',
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
          defaultSortString: 'code.asc',
          data: {
            usingFlag: ''
          }
        },
        formData: [
          {
            prop: 'name',
            label: 'func.org.organName',
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
          search: '/api/func/org/list',
          doDelete: '/api/func/org/remove'
        },
        initSearch: true,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            getParam: () => {
              if (this.$refs.bsTable.currentRow) {
                return this.$refs.bsTable.currentRow.code
              } else {
                return ''
              }
            },
            component: () => import('@/views/frame/base/organ/org/edit.vue')
          },
          {
            name: 'view',
            allowDblClick: true,
            type: 'dialog',
            component: () => import('@/views/frame/base/organ/org/edit.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            component: () => import('@/views/frame/base/organ/org/edit.vue')
          },
          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.id
            }
          },

          {
            name: 'set',
            permitName: ['update'],
            i18n: 'biz.btn.init',
            iconName: 'set',
            event: this.initPinyin
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          id: this.$route.meta.title + 'ff',
          rowKey: 'code',
          expandAll: true,
          sortable: true,
          cols: [
            {
              prop: 'code',
              label: 'func.org.organCode',
              width: 200
            },
            {
              prop: 'name',
              label: 'func.org.organName',
              width: 260
            },
            {
              prop: 'namePinyin',
              label: 'pinyin',
              isShow: false,
              width: 260
            },
            {
              label: 'func.org.organAbbr',
              prop: 'abbr',
              width: 160
            },
            {
              prop: 'usingFlag',
              label: 'biz.lbl.usingFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.usingFlag')
              },
              width: 80
            },
            {
              prop: 'title',
              label: 'func.org.title',
              width: 160
            },
            {
              prop: 'address',
              label: 'func.org.address',
              width: 160
            },
            {
              prop: 'zipCode',
              label: 'func.org.zipCode',
              width: 100
            },
            {
              prop: 'phone',
              label: 'func.org.phone',
              width: 100
            },
            {
              prop: 'fax',
              label: 'func.org.fax',
              width: 100
            },
            {
              prop: 'legalRepresentative',
              label: 'func.org.legalRepresentative',
              width: 80
            },
            {
              prop: 'principal',
              label: 'func.org.principal',
              width: 80
            },
            {
              prop: 'taxNumber',
              label: 'func.org.taxNumber',
              width: 120
            }
          ]
        },
        bottomBar: {
          pagination: {
            show: false,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageSizes: [20, 40, 60, 80, 100]
          }
        }
      }
    }
  },
  methods: {
    initPinyin() {
      this.$confirm('确认要进行拼音初始化', this.$t('biz.msg.tip'), {
        confirmButtonText: this.$t('biz.btn.confirm'),
        cancelButtonText: this.$t('biz.btn.cancel'),
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          this.loading = true
          request({
            url: '/api/func/org/initPinyin',
            method: 'post',
            data: {
              data: '',
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: this.$t('biz.btn.init')
            }
          })
            .then(response => {
              this.$notify(notifySuccess({ msg: '拼音初始化成功' }))
              this.$refs.bsTable.refresh()
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        })
        .catch(() => {})
    }
  }
}
</script>

