<template>
  <bs-dialog :dialog='dialog' @closeDialog='handleCloseDialog'></bs-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: {
        type: this.opType,
        param: this.param,
        styleType: 'mini',
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          view: '/api/sys/bizRelation/get',
          save: '/api/sys/bizRelation/save',
          update: '/api/sys/bizRelation/update'
        },
        formData: [
          {
            label: 'biz.lbl.moduleCode',
            prop: 'moduleCode',
            default: this.getDefaultModuleCode(),
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ],
            element: 'base-select',
            attrs: {
              data: 'MENU_MODULE',
              disabled: true,
              clearable: true
            }
          },
          {
            label: 'biz.lbl.remark',
            prop: 'remark',
            element: 'el-input',
            attrs: {
              cols: 2
            }
          },
          {
            label: '数据存储上级单据类型',
            prop: 'preBillTypeArray',
            element: 'base-select',
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ],
            attrs: {
              multiple: true,
              labelShowCode: true,
              datadict: 'bizCode',
              disabled: false,
              clearable: true,
              cols: 4
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
    getDefaultModuleCode() {
      if (this.opType === 'add') {
        return this.param.moduleCode
      } else {
        return ''
      }
    },
    handleCloseDialog(params) {
      this.$emit('closeHandler', params)
    }
  }
}
</script>
