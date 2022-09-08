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
          view: '/api/base/cmsCustomer/get',
          save: '/api/base/cmsCustomer/save',
          update: '/api/base/cmsCustomer/update'
        },

        formData: [
          {
            label: 'website.customer.edit.name',
            prop: 'name',
            element: 'input-validate',
            attrs: {
              clearable: true,
              cols: 3,
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: 'website.customer.edit.shortName',
            prop: 'shortName',
            element: 'input-validate',
            attrs: {
              clearable: true,
              cols: 3,
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: 'website.customer.edit.orgCode',
            prop: 'customerCompanyCode',
            element: 'base-select',
            default: this.getDefaultOrgCode(),
            attrs: {
              clearable: true,
              cols: 3,
              data: 'FUNC_ORG'
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ]
            // event: {
            //   changeAll: this.changeAllOrg
            // }
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
  methods: {
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    },
    getDefaultOrgCode() {
      if (this.opType === 'add') {
        return this.param.orgCode
      } else {
        return ''
      }
    }
  }
}
</script>
