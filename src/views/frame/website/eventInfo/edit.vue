<template>
  <bs-dialog :dialog="dialog" ref='bsDialog' @closeDialog="handleCloseDialog"></bs-dialog>
</template>

<script>
import toolUtil from '@/utils/frame/base/toolUtil.js'
export default {
  name: 'roleEdit',
  data() {
    return {
      dialog: {
        type: this.opType,
        param: this.param,
        initType: 'param',
        styleType: 'medium',
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          view: '/api/biz/cmsEventInfo/get',
          save: '/api/biz/cmsEventInfo/save',
          update: '/api/biz/cmsEventInfo/update'
        },

        formData: [
          {
            label: 'website.eventInfo.edit.eventName',
            prop: 'eventName',
            element: 'input-validate',
            attrs: {
              clearable: true,
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
            label: 'website.eventInfo.edit.customerName',
            prop: 'customerCode',
            element: 'base-select',
            attrs: {
              clickParent: true,
              multiple: false,
              cols: 3,
              data: 'CUSTOMER',
              clearable: true
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ],
            event: {
              changeAll: this.changeAllOrg
            }
          },
          {
            label: 'website.eventInfo.edit.contactCode',
            prop: 'contactCode',
            element: 'base-select',
            attrs: {
              clickParent: true,
              multiple: false,
              cols: 3,
              data: 'CUSTOMER_CONTACT',
              params: {
                customerCode: this.param.customerCode == undefined ? '' : this.param.customerCode
              },
              clearable: true
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ]
          },
          {
            type: 'datetime',
            label: 'website.eventInfo.edit.eventDate',
            props: ['eventBeginTime', 'eventEndTime'],
            default: this.$toolUtil.getLatestWeektime(),
            attrs: {
              cols: 3,
              format: 'yyyy-MM-dd HH:mm',
              'value-format': 'yyyy-MM-dd HH:mm:ss',
              pickerOptions: this.$toolUtil.getDefaultPickerOptions()
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: 'website.eventInfo.edit.eventPlace',
            prop: 'eventPlace',
            element: 'input-validate',
            attrs: {
              clearable: true,
              cols: 3
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
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
  methods: {
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    },
    changeAllOrg(item) {
      this.$refs.bsDialog.formData.contactCode = ''
      const parentCodeRef = toolUtil.getDefDialogItemByProp(this, 'contactCode')
      parentCodeRef.attrs.params.customerCode = item.code
    }
  }
}
</script>
