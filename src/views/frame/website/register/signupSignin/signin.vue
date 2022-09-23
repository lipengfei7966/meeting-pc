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
            label: '用户场景',
            prop: 'contactSceneCode',
            element: 'base-select',
            list:[],
            attrs: {
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
            label: '',
            prop: 'signinWay',
            element: 'input-validate',
            default:"pc",
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
    mounted() {
        this.sceneSelectList();
    },
    methods: {
        handleCloseDialog(param) {
            this.$emit('closeHandler', param);
        },
        sceneSelectList(){
            request({
                url: '/api/register/signupContactSceneRel/listSceneSelect',
                method: 'POST',
                data: {
                    data: 
                    {
                        contactCode: this.param.contactCode,
                        eventCode:this.param.eventCode
                    },
                    funcModule: '会议字典',
                    funcOperation: '查询场景参会人列表'
                }
                }).then(response => {
                this.dialog.formData[0].list=[]
                response.data.forEach((item, key) => {
                    var selectData={
                        label:item.name,
                        value:item.code
                    }
                    this.dialog.formData[0].list.push(selectData)
                })
            })
        }
    }
  }
  </script>
  