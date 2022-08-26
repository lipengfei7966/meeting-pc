<template>
  <bs-dialog-table :dialog='dialog' ref="bsTable" @closeDialog='handleCloseDialog'></bs-dialog-table>
</template>

<script>
import request from '@/utils/frame/base/request'
import { notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  props: {
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dialog: {
        titleName: this.$t('func.api.title'),
        moreShowFlg: false,
        formData: [
          {
            label: 'func.role.roleName',
            prop: 'roleName',
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
        ],

        mainData: {
          initSearch: true,
          api: {
            search: '/api/func/role/list'
          },
          table: {
            showCheckbox: true,
            cols: [
              {
                prop: 'roleName',
                label: 'func.role.roleName'
              },
              // {
              //   prop: 'code',
              //   sortProp: 'funcRole.code',
              //   width: '100',
              //   label: 'func.role.roleCode'
              // },
              {
                label: 'func.role.organId',
                prop: 'orgName'
              },
              {
                prop: 'usingFlag',
                sortProp: 'funcRole.usingFlag',
                width: '100',
                align: 'center',
                label: 'biz.lbl.usingFlag',
                format: {
                  dict: this.$t('datadict.usingFlag')
                }
              },
              {
                prop: 'remark',
                label: 'biz.lbl.remark',
                sortable: false,
                'min-width': '300'
              }
            ]
          }
        },
        bottomBar: {
          pagination: {
            show: true,
            layout: 'total, sizes, prev, pager, next, jumper',
            pageSizes: [20, 40, 60, 80, 100]
          }
        },
        bottomButtons: [
          {
            name: 'biz.btn.cancel',
            event: 'cancel'
          },
          {
            name: 'biz.btn.save',
            event: this.save,
            attrs: {
              type: 'primary'
            }
          }
        ]
      }
    }
  },
  methods: {
    handleCloseDialog(param) {
      this.$emit('closeAndRefreshHandler', param)
    },
    save() {
      if (!this.$refs.bsTable.multipleSelection || this.$refs.bsTable.multipleSelection.length < 1) {
        this.$notify(
          notifyInfo({
            msg: this.$t('biz.msg.noRowSelected')
          })
        )
        return
      }

      this.$confirm(this.$t('biz.msg.confirmSave'), this.$t('biz.msg.tip'), {
        type: 'warning',
        closeOnClickModal: false,
        confirmButtonText: this.$t('biz.btn.confirm'),
        cancelButtonText: this.$t('biz.btn.cancel')
      }).then(() => {
        // 操作员账户
        const roleCodeArr = []
        this.$refs.bsTable.multipleSelection.forEach(select => {
          roleCodeArr.push(select.code)
        })
        this.loading = true
        request({
          url: '/api/warn/role/save',
          method: 'POST',
          data: {
            data: {
              warningCode: this.param.warningCode,
              roleCodeList: roleCodeArr
            },
            funcModule: this.$t('route.' + this.$route.meta.title),
            funcOperation: this.$t('biz.btn.save')
          }
        })
          .then(response => {
            this.$notify(notifySuccess({ msg: this.$t('biz.msg.updateSuccess') }))
            this.loading = false
            this.handleCloseDialog(true)
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
}
</script>
