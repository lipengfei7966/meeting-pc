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
          save: '/api/func/delegation/delegateAll'
        },
        apiData: {
          code: this.param,
          view() {
            return this.code
          }
        },
        formData: [
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
  created() {},
  methods: {
    attachment() {},
    submit() {
      this.$emit('closeHandler', true)
    },
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    }
  }
}
</script>
