<template>
  <bs-dialog-edit :edit='edit' ref='bsEdit' @closeDialog='handleCloseDialog'></bs-dialog-edit>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  name: 'dingBranchEditDialog',
  data() {
    return {
      edit: {
        type: this.param.opType || this.opType,
        titleName: this.$t('sys.bpmSet.tab.branch') + ' ' + this.$t(`biz.btn.${this.opType}`),
        mode: this.opMode,
        param: this.param,
        api: {
          view: '/api/dingtalk/bpmBranch/getByBranchCode',
          save: '/api/dingtalk/bpmBranch/save',
          update: '/api/dingtalk/bpmBranch/update'
        },
        apiData: {
          view(param) {
            return param.branchCode
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
                label: 'sys.bpmSet.branch.branchName',
                prop: 'branchName',
                default: this.getDocName(),
                element: 'input-validate',
                validate: [
                  {
                    required: true,
                    trigger: 'change'
                  }
                ],
                attrs: {
                  clearable: true,
                  cols: 2
                }
              },
              {
                label: 'sys.bpmSet.form.bpmType',
                prop: 'bpmType',
                element: 'base-select',
                list: this.$t('datadict.bpmType'),
                default: this.$route.params.bpmType,
                attrs: {
                  disabled: true
                }
              },
              {
                prop: 'priority',
                label: 'sys.bpmSet.form.priority',
                element: 'input-formatter',
                default: 0,
                attrs: {
                  min: 0,
                  max: 99999999,
                  type: 'num',
                  clearable: true
                },
                isShow: this.$route.params.bpmType === 'dingTalk'
              },
              {
                label: 'sys.bpmSet.form.processDefineKey',
                prop: 'docKey',
                element: 'input-validate',
                default: this.getDocKey(),
                attrs: {
                  disabled: true
                }
              },
              {
                label: 'sys.bpmSet.branch.processIdList',
                prop: 'processIdList',
                element: 'base-select',
                validate: [
                  {
                    required: true,
                    trigger: 'change'
                  }
                ],
                list: this.processList,
                attrs: {
                  // data: 'DING_APPROVAL_TYPE',
                  // params: {
                  //   docKey: this.getDocKey()
                  // },
                  multiple: true,
                  clearable: true,
                  cols: 4
                }
              },
              {
                label: 'sys.bpmSet.branch.remark',
                prop: 'remark',
                element: 'input-validate',
                attrs: {
                  clearable: true,
                  cols: 4
                }
              }
            ]
          }
        },

        tabs: [
          {
            label: 'sys.bpmSet.branch.conditionList',
            name: 'conditionList',
            component: () => import('./branchEditConditionTab.vue')
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
    },
    processList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    // 获取数据项的信息
    this.processList.splice(0)
    if (this.$route.params.bpmType === 'dingTalk') {
      request({
        url: '/api/dingtalk/bpmProcessBaseInfo/listByDocKey',
        method: 'POST',
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: this.getDocKey()
        }
      }).then(response => {
        if (response.status) {
          for (let i = 0; i < response.data.length; i++) {
            const row = response.data[i]
            this.processList.push({
              key: row.processId,
              value: row.processId,
              label: row.processName
            })
          }
        }
      })
    } else {
      this.processList.push({ key: this.getDocKey(), value: this.getDocKey(), label: this.getDocName() })
    }
  },
  methods: {
    getDocKey() {
      return this.param.docKey
    },

    getDocName() {
      return this.param.docName
    },
    handleCloseDialog(param) {
      if (this.$refs.bsEdit.$refs.conditionList[0].$refs.tab.dialogDetailVisible) {
        this.$refs.bsEdit.$refs.conditionList[0].$refs.tab.dialogDetailVisible = false
        setTimeout(() => {
          this.$emit('closeAndRefreshHandler', param)
        }, 200)
      } else {
        this.$emit('closeAndRefreshHandler', param)
      }
    },
    getFormItemByProp(prop) {
      for (let i = 0; i < this.edit.formData.part1.content.length; i++) {
        const item = this.edit.formData.part1.content[i]
        if (item.prop === prop) {
          return item
        }
      }
      return null
    }
  }
}
</script>
