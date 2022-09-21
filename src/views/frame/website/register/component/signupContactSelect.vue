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
        param: this.param,
        titleName: this.$t('func.api.title'),
        moreShowFlg: false,
        formData: [
          {
            label: 'website.signupContact.query.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO', // 统一基础档案组件，传值data区分
              clearable: true,
              disabled: true
            },
            default: this.param.eventCode,
            event: {
              changeAll: this.onChangeAll
            }
          },
          {
            label: '场景',
            prop: 'sceneCode',
            element: 'base-select',
            attrs: {
              data: 'DICTYPE', // 统一基础档案组件，传值data区分
              clearable: true,
              disabled: true
            },
            default: this.param.sceneCode,
            event: {
              changeAll: this.onChangeAll
            },
            isShow: this.param.sceneCode && this.param.sceneCode!=''
          },
          {
            label: 'website.signupContact.query.name',
            prop: 'name',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          }
        ],

        mainData: {
          initSearch: true,
          api: {
            search: '/api/register/signupContactSceneRel/listSceneContactPage'
          },
          table: {
            showCheckbox: true,
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
  mounted() {
    debugger
  },
  methods: {
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
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
          debugger
          roleCodeArr.push({
            contactCode: select.code,
            eventCode: this.param.eventCode,
            sceneCode: this.param.sceneCode
          })
        })
        this.loading = true
        let url = this.param.type === 'signin'?'/api/register/signupContactSceneRel/save':'/api/register/singnupContactCertificate/save'
        request({
          url: url,
          method: 'POST',
          data: {
            data: roleCodeArr,
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
