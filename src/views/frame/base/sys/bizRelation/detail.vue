<template>
  <bs-dialog-edit v-el-drag-dialog ref='bsEdit' :edit='edit' @closeDialog='handleCloseDialog'></bs-dialog-edit>
</template>

<script>
import { notifyInfo } from '@/utils/frame/base/notifyParams'
import { dateFormate } from '@/utils/frame/base/index'
export default {
  data() {
    return {
      edit: {
        type: 'update',
        initType: 'param',
        param: this.param,
        api: {
          view: '/api/platform/cfgBizJoint/get'
        },
        apiData: {
          view(param) {
            return param.id
          }
        },
        topButtons: [
          {
            iconName: 'close',
            name: 'biz.btn.close',
            event: 'close',
            isShow: ['add', 'update'],
            attrs: {
              type: 'primary'
            }
          }
        ],
        // 若只存在一个主信息则formData的值可接受Array
        formData: {
          part1: {
            titleName: '基本信息',
            content: [
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
                element: 'input-validate',
                attrs: {
                  disabled: true
                }
              }
            ]
          }
        },
        tabs: [
          {
            name: 'extend',
            label: '扩展信息',
            component: () => import('./extendTab.vue')
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
      type: [String, Object],
      default() {
        return {}
      }
    }
  },
  methods: {
    getDefaultModuleCode() {
      return this.param.moduleCode
    },

    // 本页面关闭
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    }
  }
}
</script>
