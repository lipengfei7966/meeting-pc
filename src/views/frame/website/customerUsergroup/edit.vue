<template>
    <bs-dialog :dialog="dialog" @closeDialog="handleCloseDialog"></bs-dialog>
</template>
  
  
  <script>
  import request from '@/utils/frame/base/request'
  import toolUtil from '@/utils/frame/base/toolUtil.js'
  
  export default {
    name: 'customerUsergroupEdit',
    data() {
      return {
        dialog: {
          type: this.opType,
          param: this.param,
          styleType: 'max',
          titleName: this.$t('route.' + this.$route.meta.title),
          api: {
            view: '/api/base/cmsUsergroup/get',
            save: '/api/base/cmsUsergroup/save',
            update: '/api/base/cmsUsergroup/save'
          },
          apiData:{
            view(param) {
              debugger
              return param.code
            }
          },
          formData: [
            {
              prop: 'customerCode',
              label: '',
              element: 'input-validate',
              default:this.param.customerCode,
              isShow:false
            },
            {
              label: 'website.department.edit.name',
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
              label: 'website.department.edit.parentCode',
              prop: 'parentCode',
              list:[],
              element: 'base-select',
              attrs: {
                clearable: true,
                cols: 3,
                disabled: this.param.code!=undefined
              },
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
    mounted(){
      this.departmentSelect();
    },
    methods: {
      handleCloseDialog(param) {
        this.$emit('closeHandler', param)
      },
      departmentSelect(){
          request({
              url: '/api/base/cmsUsergroup/listUserGroupSelect',
              method: 'POST',
              data: {
                  data:{
                    customerCode:this.param.customerCode
                  },
                  funcModule: this.$t('route.' + this.$route.meta.title),
                  funcOperation: this.$t('biz.btn.check')
              }
          })
          .then(response => {
              debugger;
              if (response.status) {
                  var selectList = [];
                  response.data.forEach(t=>{
                      var json = {label:t.name,value:t.code};
                      selectList.push(json);
                  });
                  this.dialog.formData[2].list=selectList;

              } else {

              }
          })
          .catch(() => {})
      }
    }
  }
  </script>
  