<template>
    <bs-dialog :dialog="dialog" @closeDialog="handleCloseDialog"></bs-dialog>
  </template>
  
  <script>
    import request from '@/utils/frame/base/request'
    export default {
    name: 'dictypeAdd',
    data() {
      return {
        dialog: {
          type: this.opType,
          param: this.param,
          initType: 'param',
          styleType: 'medium',
          titleName: this.$t('route.' + this.$route.meta.title),
          api: {
            save: '/api/register/signupSignin/save',
          },
  
          formData: [
          {
            label: '场景',
            prop: 'sceneCode',
            element: 'base-select',
            attrs: {
              data: "DICTYPE",
              params: {
                type:"2",
                eventCode:this.param.eventCode
              },
              clearable: true
            },
            event: {
              changeAll: this.onChangeAll
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ]
          },
          {
            label: '',
            prop: 'signinWay',
            element: 'input-validate',
            default:"pc",
            isShow:false
          },
          {
            label: '',
            prop: 'contactCode',
            element: 'input-validate',
            default:this.param.contactCode,
            isShow:false
          },
          {
            label: '',
            prop: 'eventCode',
            element: 'input-validate',
            default:this.param.eventCode,
            isShow:false
          }
          ],
          bottomButtons: [ 
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
            this.$emit('closeHandler', param);
        }
    }
  }
  </script>
  