<template>
  <bs-dialog :dialog="dialog" @closeDialog="handleCloseDialog"></bs-dialog>
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
          view: '/api/register/signupContact/get',
          save: '/api/register/signupContact/save',
          update: '/api/register/signupContact/update'
        },

        formData: [
          {
            label: 'website.signupContact.edit.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            default: this.param,
            attrs: {
              multiple: false,
              cols: 3,
              data: 'EVENT_INFO',
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
            label: 'website.signupContact.edit.name',
            prop: 'name',
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
            label: 'website.signupContact.edit.mobile',
            prop: 'mobile',
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
            label: 'website.signupContact.edit.email',
            prop: 'email',
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
            label: 'website.signupContact.edit.department',
            prop: 'department',
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
            label: 'website.signupContact.edit.contactType',
            prop: 'contactType',
            element: 'base-select',
            list: this.$t('datadict.contantType'),
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
    }
  }
}
</script>
