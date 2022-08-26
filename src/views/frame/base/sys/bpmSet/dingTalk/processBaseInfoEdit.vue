<template>
  <bs-dialog-edit :edit='edit' ref='bsEdit' @closeDialog='handleCloseDialog'></bs-dialog-edit>
</template>

<script>
export default {
  name: 'processBaseInfoEdit',
  data() {
    return {
      edit: {
        type: this.param.opType || this.opType,
        titleName: this.$t('sys.bpmSet.tab.tabProcessSet') + ' ' + this.$t(`biz.btn.${this.opType}`),
        mode: this.opMode,
        param: this.param,
        api: {
          view: '/api/dingtalk/bpmProcessBaseInfo/get',
          save: '/api/dingtalk/bpmProcessBaseInfo/save',
          update: '/api/dingtalk/bpmProcessBaseInfo/update'
        },
        apiData: {
          view(param) {
            return param.id
          },
          save(param) {
            return param
          },
          update(param) {
            return param
          }
        },
        topButtons: [
          {
            iconName: 'cancel',
            name: 'biz.btn.cancel',
            event: 'cancel',
            isShow: ['add', 'update']
          },
          {
            name: 'biz.btn.save',
            iconName: 'save',
            event: 'save',
            showLoading: true,
            isShow: ['add', 'update'],
            attrs: {
              type: 'primary'
            }
          }
        ],
        // 若只存在一个主信息则formData的值可接受Array
        formData: {
          part1: {
            titleName: 'sys.bpmSet.group.detailPart1',
            content: [
              {
                label: 'sys.bpmSet.ding.processId',
                prop: 'processId',
                element: 'input-validate',
                attrs: {
                  cols: 2,
                  clearable: true
                }
              },
              {
                label: 'sys.bpmSet.ding.processName',
                prop: 'processName',
                element: 'input-validate',
                attrs: {
                  cols: 2,
                  clearable: true
                }
              },
              {
                label: 'sys.bpmSet.ding.remark',
                prop: 'processDescription',
                element: 'input-validate',
                attrs: {
                  cols: 4,
                  clearable: true
                }
              },
              {
                label: 'sys.bpmSet.form.moduleCode',
                prop: 'docKey',
                isShow: false,
                element: 'input-validate',
                default: this.getDocKey(),
                attrs: {
                  disabled: true
                }
              }
            ]
          }
        },
        tabs: [
          {
            name: 'processFormRelList',
            label: 'sys.bpmSet.tab.tabDocFormRel',
            component: () => import('./docFormRelEdit.vue')
          }
        ]
      }
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
    getDocKey() {
      return this.param.docKey
    },
    handleCloseDialog(param) {
      this.$emit('closeAndRefreshHandler', param)
    }
  }
}
</script>
