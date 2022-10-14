<template>
  <bs-edit ref='bsEdit' :edit='edit' @closeDialog='handleCloseDialog' @closeLv2Dialog='handleCloseLv2Dialog'></bs-edit>
</template>

<script>
import Vue from 'vue'
import { notifyInfo } from '@/utils/frame/base/notifyParams'
export default {
  data() {
    const validator = (rule, value, callback, prop) => {
      if (value.length < 6) {
        $('.el-col[data-key=' + prop + '] .is-required .el-form-item__content').attr('data-content', '不得少于6位字符')
        callback(new Error())
      } else {
        callback()
      }
    }
    return {
      edit: {
        type: this.opType,
        mode: this.opMode,
        param: this.param,
        initType: 'param',
        titleName: this.$route.meta.title,
        api: {
          view: '/get',
          save: '/api/code/tableBiz/save',
          update: '/api/code/tableBiz/save'
        },
        topButtons: [
          {
            iconName: 'close',
            name: '关闭',
            event: 'close',
            isShow: ['view'],
            attrs: {
              type: 'primary'
            }
          },
          {
            iconName: 'cancel',
            name: '取消',
            event: 'cancel',
            isShow: ['add', 'update']
          },
          {
            name: '保存',
            iconName: 'save',
            event: 'save',
            isShow: ['add', 'update'],
            attrs: {
              type: 'primary'
            }
          }
        ],
        // 若只存在一个主信息则formData的值可接受Array
        formData: {
          part1: {
            titleName: '菜单信息',
            content: [
              {
                label: '图表ID',
                prop: 'codeId',
                default: this.param.codeId,
                element: 'el-input',
                attrs: {
                  disabled: true
                }
              },
              {
                label: '菜单',
                prop: 'menuCode',
                width: '160',
                element: 'base-select',
                required: true,
                default: this.param.moduleCode,
                attrs: {
                  data: 'menu_code',
                  labelShowCode: true,
                  remote: true,
                  disabled: true
                }
              },
              {
                label: '代码',
                prop: 'showModuleCode',
                default: this.param.moduleCode,
                element: 'el-input',
                attrs: {
                  disabled: true
                }
              }
            ]
          }
        },

        tables: [
          {
            name: 'tableBiz',
            label: '表关联',
            component: () => import('./tableTab.vue'),
            isShow: ['add', 'update']
          }
        ]
      }
    }
  },
  provide() {
    return {
      app: this
    }
  },
  props: {
    opType: {
      type: String,
      default: 'view'
    },
    opMode: {
      type: String,
      default: 'dialog'
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  mounted() {},
  methods: {
    handleCloseDialog(params) {
      this.$emit('closeHandler', params)
    },
    handleCloseLv2Dialog(param) {
      console.log(param)
    }
  }
}
</script>
