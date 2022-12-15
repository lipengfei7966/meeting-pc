<template>
  <bs-edit :edit="edit" @closeDialog="handleCloseDialog" ref="bsEdit" @initCallback='handleInitCallback'></bs-edit>
</template>

<script>
export default {
  name: 'msgTempEdit',
  data() {
    return {
      editorWin: null,
      edit: {
        type: this.opType,
        mode: this.opMode,
        param: this.param,
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          view: '/api/base/msgBizTemplet/get',
          save: '/api/base/msgBizTemplet/save',
          update: '/api/base/msgBizTemplet/update'
        },
        apiData: {
          view(param) {
            return param
          }
        },
        topButtons: [
          {
            iconName: 'close',
            name: 'biz.btn.close',
            event: 'close',
            isShow: ['view'],
            attrs: {
              type: 'primary'
            }
          },
          {
            iconName: 'cancel',
            name: 'biz.btn.cancel',
            event: 'cancel',
            isShow: ['add', 'update', 'detailSet']
          },
          {
            name: 'biz.btn.save',
            iconName: 'save',
            event: 'save',
            showLoading: true,
            isShow: ['add', 'update', 'detailSet'],
            attrs: {
              type: 'primary'
            },
            extraEvent: this.onSave
          }
        ],
        // 若只存在一个主信息则formData的值可接受Array
        formData: {
          part1: {
            titleName: 'biz.title.mainInfo',
            content: [
              {
                label: 'msg.templet.templetName',
                prop: 'msgTempletName',
                element: 'input-validate',
                attrs: {
                  clearable: true,
                  maxlength: 80
                },
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ]
              },
              {
                label: 'website.signupContact.query.eventCode',
                prop: 'bizCode',
                element: 'base-select',
                attrs: {
                  cols: 2,
                  data: 'EVENT_INFO', // 统一基础档案组件，传值data区分,
                  isDefault: false,
                  clearable: false,
                  disabled: this.getDisabled()
                },
                event: {
                  changeAll: this.onChangeAll
                },
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ]
              },
              { prop: 'reservedStr1', isShow: false },
              {
                label: 'msg.templet.msgFuncId',
                prop: 'msgFuncCode',
                element: 'base-select',
                attrs: {
                  data: 'MSG_BIZ_FUNC',
                  clearable: true,
                  maxlength: 80,
                  params: {
                    BIZ_CODE: ''
                  }
                },
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ]
              },
              {
                label: 'msg.templet.msgChannelId',
                prop: 'msgChannelCode',
                element: 'base-select',
                attrs: {
                  data: 'MSG_CHANNEL',
                  clearable: true,
                  maxlength: 80
                },
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ]
              },
              {
                label: 'msg.templet.extTempletCode',
                prop: 'extTempletCode',
                element: 'input-validate',
                attrs: {
                  clearable: true,
                  maxlength: 80
                }
              },
              {
                label: 'msg.templet.contentFormatType',
                prop: 'mailFormatType',
                element: 'base-select',
                default: 'T',
                attrs: {
                  datadict: 'mailFormatType',
                  clearable: false
                },
                validate: [
                  {
                    required: true,
                    trigger: 'change'
                  }
                ],
                event: {
                  changeAll: this.onChangeAllContentFormat
                }
              },
              {
                label: 'biz.lbl.usingFlag',
                prop: 'usingFlag',
                element: 'base-select',
                list: this.$t('datadict.usingFlag'),
                default: '1',
                attrs: {
                  clearable: false
                },
                validate: [
                  {
                    required: true,
                    trigger: 'change'
                  }
                ]
              },
              {
                label: 'msg.templet.templetTitle',
                prop: 'msgTempletTitle',
                element: 'el-input',
                attrs: {
                  cols: 4,
                  clearable: true
                }
              },
              {
                label: 'msg.templet.templetContent',
                prop: 'msgTempletContent',
                element: 'el-input',
                attrs: {
                  type: 'textarea',
                  cols: 4,
                  clearable: true
                }
              },

              {
                label: 'biz.lbl.remark',
                prop: 'remark',
                element: 'el-input',
                attrs: {
                  cols: 4,
                  clearable: true
                }
              },
              {
                label: '列表数据例子',
                prop: 'DEMO1',
                element: 'el-input',
                default: '列表例子(freemarker模板)：<#list dataList as item> 【${item.letterCreditNo}】 【${item.dueDate}】，</#list>',
                attrs: {
                  cols: 4,
                  clearable: false,
                  disabled: true
                }
              },
              {
                label: '对象数据例子',
                prop: 'DEMO2',
                element: 'el-input',
                default: '对象例子(freemarker模板)：  【${dataObj.letterCreditNo}】 【${dataObj.dueDate}】',
                attrs: {
                  cols: 4,
                  clearable: false,
                  disabled: true
                }
              }
            ]
          }
        },

        tabs: [
          {
            isShow: true,
            required: true,
            name: 'msgTempletContentHtml',
            label: 'msg.templet.templetContent',
            component: () => import('./bseditor.vue')
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
  methods: {
    onChangeAllContentFormat(params) {
      if (params && params.value === 'T') {
        this.$toolUtil.getDefFormItemByProp(this, 'msgTempletContent').isShow = true
        // this.edit.tabs.forEach(tab => {
        //   if (tab.name === 'msgTempletContentHtml') tab.isShow = false
        // })
        this.$loopDOM(this, 'msgTempletContentHtml')[0].template.editorWin.setDisabled()
      } else {
        this.$loopDOM(this, 'msgTempletContentHtml')[0].template.editorWin.setEnabled()
        this.$toolUtil.getDefFormItemByProp(this, 'msgTempletContent').isShow = false
      }
    },
    onChangeAll(params) {
      const editForm = this.$toolUtil.getDataEditFromSelf(this)

      editForm.reservedStr1 = params.name
      editForm.msgFuncCode = ''
      this.$toolUtil.getDefFormItemByProp(this, 'msgFuncCode').attrs.params = {
        BIZ_CODE: params.code
      }
    },
    getDisabled() {
      if (this.opType === 'add') {
        return false
      } else {
        return true
      }
    },
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    },
    handleInitCallback(data) {
      const win = this.$loopDOM(this, 'msgTempletContentHtml')[0].template.editorWin
      if (win) {
        win.setContent(data.msgTempletContent)
      }

      if (this.$loopDOM(this, 'bsDialogEdit').editForm.mailFormatType === 'T') {
        this.$toolUtil.getDefFormItemByProp(this, 'msgTempletContent').isShow = true
        this.$loopDOM(this, 'msgTempletContentHtml')[0].template.editorWin.setDisabled()
      } else {
        this.$toolUtil.getDefFormItemByProp(this, 'msgTempletContent').isShow = false
        this.$loopDOM(this, 'msgTempletContentHtml')[0].template.editorWin.setEnabled()
      }
    },
    onSave() {
      if (this.$loopDOM(this, 'bsDialogEdit').editForm.mailFormatType === 'H') {
        this.$loopDOM(this, 'bsDialogEdit').editForm.msgTempletContent = this.$loopDOM(this, 'msgTempletContentHtml')[0].template.editorWin.getContent()
      }
      return true
    }
  }
}
</script>
