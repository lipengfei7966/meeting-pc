<template>
  <bs-dialog :dialog='dialog' @closeDialog='handleCloseDialog'></bs-dialog>
</template>

<script>
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
          view: '/api/base/customRole/get',
          save: '/api/base/customRole/save',
          update: '/api/base/customRole/save'
        },

        formData: [
          {
            label: 'website.role.roleName',
            prop: 'roleName',
            element: 'input-validate',
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
            label: 'website.role.customerName',
            prop: 'customerId',
            element: 'base-select',
            attrs: {
              clickParent: true,
              multiple: false,
              cols: 2,
              data: 'CUSTOMER',
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
              cols: 2,
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
  methods: {
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    }
  }
}
</script>
