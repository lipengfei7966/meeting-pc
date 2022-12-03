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
            view: '/api/base/customerContact/get',
            save: '/api/base/customerContact/save',
            update: '/api/base/customerContact/update'
          },
  
          formData: [
            {
              label: 'website.customerContact.edit.name',
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
              label: 'website.customerContact.edit.mobile',
              prop: 'mobile',
              element: 'input-validate',
              attrs: {
                clearable: true,
                cols: 3,
                validateType: 'phone'
              },
              validate: [
                {
                  required: true,
                  trigger: 'blur'
                }
              ]
            },
            {
              label: 'website.customerContact.edit.email',
              prop: 'email',
              element: 'input-validate',
              attrs: {
                clearable: true,
                cols: 3,
                validateType: 'email'
              },
              validate: [
                {
                  required: true,
                  trigger: 'blur'
                }
              ]
            },
            {
              label: 'website.customerContact.edit.departmentCode',
              prop: 'departmentCode',
              element: 'input-validate',
              default:this.param.departmentCode,
              isShow:false,
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
              label: 'website.customerContact.edit.customerCode',
              prop: 'customerCode',
              element: 'base-select',
              default:this.param.customerCode,
              isShow:false,
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
  