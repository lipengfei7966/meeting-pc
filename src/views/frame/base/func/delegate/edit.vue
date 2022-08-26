<template>
  <bs-dialog ref='bsDialog' :dialog='dialog' @closeDialog='handleCloseDialog'></bs-dialog>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  name: 'delegateEdit',
  data() {
    return {
      dialog: {
        type: this.opType,
        param: this.param,
        styleType: 'mini',
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          save: '/api/func/delegation/save'
        },
        apiData: {
          code: this.param,
          view() {
            return this.code
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
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: 'func.delegate.form.delegationEmployeeCode',
            prop: 'delegationEmployeeCode',
            element: 'base-select',
            attrs: {
              data: 'FUNC_EMPLOYEE', // 统一基础档案组件，传值data区分
              clearable: false,
              cols: 2,
              showMoreList: true,
              component: () => import('@/views/frame/base/organ/employee/components/employeeSelect.vue')
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ]
          }
        ],
        bottomButtons: [
          {
            name: 'biz.btn.cancel',
            event: 'cancel',
            isShow: ['add']
          },
          {
            name: 'biz.btn.save',
            event: 'save',
            showLoading: true,
            isShow: ['add'],
            attrs: {
              type: 'primary'
            }
          }
        ]
      }
    }
  },
  props: {
    opType: {
      type: String,
      default: 'add'
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  created() {
    this.listAuditGroupForCurrentAccount()
  },
  methods: {
    attachment() {},
    submit() {
      this.$emit('closeHandler', true)
    },
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    },
    listAuditGroupForCurrentAccount() {
      var auditGroupForm = {}
      this.dialog.formData.forEach(ele => {
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
          data: '1'
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
    }
  }
}
</script>
