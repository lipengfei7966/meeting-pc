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
                companyId: this.param.customerCode == undefined ? '' : this.param.customerCode
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
          },

          {
            label: 'website.eventInfo.edit.eventHashCode',
            prop: 'eventHashCode',
            element: 'input-validate',
            attrs: {
              clearable: false,
              disabled: true,
              cols: 3
            }
          },
          {
            type: 'select',
            label: 'website.eventInfo.edit.mainLanguage',
            prop: 'mainLanguage',
            element: 'base-select',
            attrs: {
              datadict:'languageType',
              isDefault: true,
              clearable: false,
              cols: 3
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ],
            event: {
              change: this.onChange
            }
          },
          {
            type: 'checkbox',
            label: this.$t('website.eventInfo.edit.multiLanguage'),
            // prop: ['en'],
            prop: 'multiLanguage',
            list: this.$t('datadict.languageType'),
            default: [],
            attrs:{
              disabled: false,
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ],
            event: this.onMultiChange
          },
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
    this.onChange(this.$refs.bsDialog.formData.mainLanguage)
  },
  methods: {
    onMultiChange(){
      if (!this.$refs.bsDialog.formData.multiLanguage) this.$refs.bsDialog.formData.multiLanguage=[]
      if (!this.$refs.bsDialog.formData.multiLanguage.includes(this.$refs.bsDialog.formData.mainLanguage)) this.$refs.bsDialog.formData.mainLanguage = ''
    },
    onChange(params){
      if (params==undefined||params=='') {
        this.$refs.bsDialog.formData.multiLanguage = []
      }else{
        if(typeof(this.$refs.bsDialog.formData.multiLanguage)=='string')this.$refs.bsDialog.formData.multiLanguage=JSON.parse(this.$refs.bsDialog.formData.multiLanguage)
        if (this.$refs.bsDialog.formData.multiLanguage.length>1) {
          this.$refs.bsDialog.formData.multiLanguage=this.$refs.bsDialog.formData.multiLanguage
          this.$refs.bsDialog.formData.multiLanguage = [...new Set([...this.$refs.bsDialog.formData.multiLanguage,params])]
        }else{
          this.$refs.bsDialog.formData.multiLanguage = [params]
        }
      }
    },
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    },
    changeAllOrg(item) {
      this.$refs.bsDialog.formData.contactCode = ''
      const parentCodeRef = toolUtil.getDefDialogItemByProp(this, 'contactCode')
      parentCodeRef.attrs.params.companyId = item.code
    }
  }
}
</script>
