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
          save: '/api/register/signupSignin/save'
        },
        formData: [
          {
            label: '场景',
            prop: 'sceneCode',
            element: 'base-select',
            list: [{ label: '默认', value: '' }],
            event: {
              changeAll: this.onChangeAll
            },
            attrs: {
              default: true,
              clearable: false
            }
          },
          {
            label: '',
            prop: 'signinWay',
            element: 'input-validate',
            default: 'pc',
            isShow: false
          },
          {
            label: '',
            prop: 'contactCode',
            element: 'input-validate',
            default: this.param.contactCode,
            isShow: false
          },
          {
            label: '',
            prop: 'eventCode',
            element: 'input-validate',
            default: this.param.eventCode,
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
    this.sceneSelect()
  },
  methods: {
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
      //this.sceneSelect();
    },
    sceneSelect() {
      console.log(this.dialog.formData[0].list)

      request({
        url: '/api/register/signupContactSceneRel/listSceneSelect',
        method: 'POST',
        data: {
          data: {
            eventCode: this.param.eventCode,
            contactCode: this.param.contactCode
          },
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.check')
        }
      })
        .then(response => {
          debugger
          if (response.status) {
            var selectList = [{ label: '默认', value: '' }]
            response.data.forEach(t => {
              var json = { label: t.name, value: t.code }
              selectList.push(json)
            })
            console.log(this.dialog.formData[0].list)
            this.dialog.formData[0].list = selectList
          } else {
          }
        })
        .catch(() => {})
    }
  }
}
</script>
  