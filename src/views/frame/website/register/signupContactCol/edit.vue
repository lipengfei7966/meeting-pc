<template>
  <bs-dialog :dialog="dialog" @closeDialog="handleCloseDialog"></bs-dialog>
</template>

<script>
import { is } from 'bluebird'

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
          view: '/api/register/signupContactCol/get',
          save: '/api/register/signupContactCol/save',
          update: '/api/register/signupContactCol/update'
        },

        formData: [
          {
            label: 'website.signupContactCol.edit.eventCode',
            prop: 'eventCode',
            element: 'base-select',

            default: this.param,
            attrs: {
              disabled: true,
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
            label: 'website.signupContactCol.edit.mapCode',

            prop: 'mapCode',
            element: 'input-validate',
            attrs: {
              disabled: true,
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
            label: 'website.signupContactCol.edit.mapName',
            prop: 'mapName',
            element: 'input-validate',
            attrs: {
              disabled: this.param.mapBase === '2' ? true : false,
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
            label: 'website.signupContactCol.edit.mapComp',
            prop: 'mapComp',
            element: 'base-select',
            list: this.$t('datadict.mapComp'),
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
            prop: 'mapBase',
            label: 'website.signupContactCol.list.mapBase',
            element: 'base-select',
            list: this.$t('datadict.mapBase'),
            attrs: {
              disabled: true,
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
            prop: 'mapCompAttr',
            label: 'website.signupContactCol.list.mapCompAttr',
            element: 'base-select',
            list: this.$t('datadict.mapCompAttr'),
            attrs: {
              disabled: true,
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
            prop: 'enumLable',
            label: 'website.signupContactCol.list.enumLable',
            element: 'input-validate',
            attrs: {
              clearable: true,
              cols: 3
            },
            validate: [
              {
                required: this.param.mapComp === '3' ? true : false,
                trigger: 'blur'
              }
            ]
          },
          {
            label: 'website.signupContactCol.edit.mapType',
            prop: 'mapType',
            element: 'base-select',
            list: this.$t('datadict.yesNo'),
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
            label: 'website.signupContactCol.edit.mapRequired',
            prop: 'mapRequired',
            element: 'base-select',
            list: this.$t('datadict.yesNo'),
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
            label: 'website.signupContactCol.edit.mapSort',
            prop: 'mapSort',
            element: 'input-validate',

            attrs: {
              disabled: true,
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
