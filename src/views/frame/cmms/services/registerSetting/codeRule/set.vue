<template>
  <bs-dialog :dialog="dialog" ref='bsDialog' @closeDialog="handleCloseDialog" :initFun=initFun></bs-dialog>
</template>

<script>
import toolUtil from '@/utils/frame/base/toolUtil.js'
export default {
  name: 'codeRuleSet',
  data() {
    return {
      dialog: {
        type: this.opType,
        param: this.param,
        // initType: 'param',
        styleType: 'medium',
        titleName: this.$t('route.' + this.$route.meta.title) + ' ',
        api: {
          view: '/api/register/signupContactCodeRule/get',
          save: '/api/register/signupContactCodeRule/save',
          update: '/api/register/signupContactCodeRule/update'
        },

        formData: [
          {
            label: 'website.signupContact.edit.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              multiple: false,
              data: 'EVENT_INFO',
              disabled: true,
              cols: 3
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ]
          },
          {
            label: 'website.signupContactCodeRule.edit.prefix',
            prop: 'prefix',
            element: 'input-validate',
            attrs: {
              clearable: true,
              maxlength: 10,
              cols: 3
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: 'website.signupContactCodeRule.edit.length',
            prop: 'length',
            element: 'input-formatter',
            attrs: {
              min: 2,
              max: 16,
              maxlength: 2,
              type: 'integer',
              precision: 0,
              clearable: true,
              cols: 3,
              placeholder: this.$t('website.signupContactCodeRule.placeholder.length')
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: 'website.signupContactCodeRule.edit.type',
            prop: 'type',
            type: 'radio',
            list: this.$t('datadict.contactCodeRuleType'),
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ],
            default: '1',
            event: this.changeType
          },
          {
            label: 'website.signupContactCodeRule.edit.startCode',
            prop: 'startCode',
            element: 'input-formatter',
            attrs: {
              min: 0,
              maxlength: 16,
              type: 'integer',
              precision: 0,
              clearable: true,
              cols: 3
            },
            validate: [
              {
                trigger: 'blur'
              }
            ],
            isShow: false
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
  mounted() {
      this.$refs.bsDialog.formData.eventCode = this.param
  },
  methods: {
    initFun() {
      this.changeType()
    },
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    },
    changeAllOrg(item) {
      this.$refs.bsDialog.formData.contactCode = ''
      const parentCodeRef = toolUtil.getDefDialogItemByProp(this, 'contactCode')
      parentCodeRef.attrs.params.customerCode = item.code
      // formData
    },
    changeType() {
      let val = this.$refs.bsDialog.formData.type
      const startCodeRef = toolUtil.getDefDialogItemByProp(this, 'startCode')
      if (val && val === '1') {
        startCodeRef.isShow = false
      } else {
        startCodeRef.isShow = true
      }
    }
  }
}
</script>
