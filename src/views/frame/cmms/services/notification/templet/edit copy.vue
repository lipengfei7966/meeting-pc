<template>
  <bs-dialog :dialog='dialog' ref="qmDialog" @closeDialog='handleCloseDialog'></bs-dialog>
</template>

<script>
import toolUtil from '@/utils/frame/base/toolUtil.js'
export default {
  name: 'msgTempEdit',
  data() {
    return {
      dialog: {
        type: this.opType,
        param: this.param,
        styleType: 'max',
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          view: '/api/base/msgBizTemplet/get',
          save: '/api/base/msgBizTemplet/save',
          update: '/api/base/msgBizTemplet/update'
        },

        formData: [
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
            label: 'msg.templet.mailFormatType',
            prop: 'mailFormatType',
            element: 'base-select',
            list: this.$t('datadict.mailFormatType'),
            attrs: {
              clearable: false
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
          // {
          //   label: 'msg.templet.templetExtend',
          //   prop: 'msgTempletExtend',
          //   element: 'el-input',
          //   attrs: {
          //     type: 'textarea',
          //     cols: 4,
          //     clearable: true
          //   }
          // },
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
              type: 'textarea',
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
              type: 'textarea',
              clearable: false,
              disabled: true
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
    onChangeAll(params) {
      const formDataRef = this.$refs.qmDialog.formData
      formDataRef.reservedStr1 = params.name
      formDataRef.msgFuncCode = ''
      toolUtil.getDefDialogItemByProp(this, 'msgFuncCode').attrs.params = {
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
    }
  }
}
</script>
