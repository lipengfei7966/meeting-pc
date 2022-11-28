<template>
  <bs-dialog :dialog='dialog' ref='qmDialog' @closeDialog='handleCloseDialog'></bs-dialog>
</template>

<script>
export default {
  name: 'funcEdit',
  data() {
    return {
      dialog: {
        type: this.opType,
        param: this.param,
        styleType: 'medium',
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          view: '/api/base/msgBizFunc/get',
          save: '/api/base/msgBizFunc/save',
          update: '/api/base/msgBizFunc/update'
        },

        formData: [
          {
            label: 'website.signupContact.query.eventCode',
            prop: 'bizCode',
            element: 'base-select',
            attrs: {
              cols: 2,
              data: 'EVENT_INFO', // 统一基础档案组件，传值data区分,
              isDefault: false,
              clearable: false
            },
            event: {
              changeAll: this.onChangeAll
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          { prop: 'reservedStr1', isShow: false },
          {
            label: 'msg.func.msgFuncCode',
            prop: 'msgFuncCode',
            element: 'input-validate',
            attrs: {
              cols: 2,
              clearable: !this.getDisabled,
              disabled: this.getDisabled,
              maxlength: 80
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: 'msg.func.msgFuncName',
            prop: 'msgFuncName',
            element: 'input-validate',
            attrs: {
              cols: 2,
              clearable: true,
              maxlength: 80
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },

          {
            label: 'msg.func.msgClassType',
            prop: 'msgClassType',
            element: 'base-select',
            list: this.$t('datadict.msgClassType'),
            attrs: {
              clearable: false
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ]
          },
          {
            label: 'biz.lbl.usingFlag',
            prop: 'usingFlag',
            element: 'base-select',
            list: this.$t('datadict.usingFlag'),
            default: '1',
            attrs: {
              clearable: false
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ]
          },
          {
            label: 'biz.lbl.remark',
            prop: 'remark',
            element: 'el-input',
            attrs: {
              cols: 4,
              clearable: true
            }
          }
        ],
        bottomButtons: [
          {
            name: 'biz.btn.close',
            event: 'close',
            isShow: ['view'],
            attrs: {
              type: 'primary'
            }
          },
          {
            name: 'biz.btn.cancel',
            event: 'cancel',
            isShow: ['add', 'update']
          },
          {
            name: 'biz.btn.save',
            event: 'save',
            showLoading: true,
            isShow: ['add', 'update'],
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
    getDisabled() {
      if (this.opType === 'add') {
        return false
      } else {
        return true
      }
    },
    onChangeAll(params) {
      const formDataRef = this.$refs.qmDialog.formData
      formDataRef.reservedStr1 = params.name
    },
    submit() {
      this.$emit('closeHandler', true)
    },
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    }
  }
}
</script>
