<template>
  <bs-dialog :dialog='dialog' ref='bsDialog' @closeDialog='handleCloseDialog' @initCallback='handleInitCallback'></bs-dialog>
</template>

<script>
// axios访问

import axios from 'axios'
import request from '@/utils/frame/base/request'
import { notifySuccess, notifyError } from '@/utils/frame/base/notifyParams'
import toolUtil from '@/utils/frame/base/toolUtil.js'

import { getToken } from '@/utils/frame/base/auth'
export default {
  data() {
    return {
      dialog: {
        type: this.opType,
        param: this.param,
        styleType: 'max',
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          view: '/api/code/pageModel/get',
          save: '/api/code/pageModel/save',
          update: '/api/code/pageModel/update'
        },
        apiData: {
          view(param) {
            return param.appCode
          }
        },
        formData: [
          {
            label: '应用',
            prop: 'appCode',
            element: 'base-select',
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ],
            attrs: {
              cols: 1,
              clearable: false,
              data: 'CODE_APP'
            }
          },
          {
            prop: 'name',
            label: '页面名称',
            element: 'input-validate',
            attrs: {
              cols: 2,
              clearable: true
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },

          {
            prop: 'pageTemp',
            label: '页面模板',
            element: 'base-select',
            attrs: {
              datadict: 'codePageTemp',
              cols: 1,
              clearable: false
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ],
            event: {
              change: this.codePageTempChange
            }
          },
          {
            label: '数据模型',
            prop: 'modelCode',
            element: 'base-select',
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ],
            attrs: {
              cols: 2,
              clearable: false,
              data: 'CODE_DATA_MODEL'
            }
          },

          {
            label: '表数据模型',
            prop: 'tableModelCode',
            element: 'base-select',
            isShow: false,
            validate: [
              {
                required: false,
                trigger: 'blur'
              }
            ],
            attrs: {
              cols: 2,
              clearable: false,
              data: 'CODE_DATA_MODEL'
            }
          },
          {
            label: '树数据模型',
            prop: 'treeModelCode',
            element: 'base-select',
            isShow: false,
            validate: [
              {
                required: false,
                trigger: 'blur'
              }
            ],
            attrs: {
              cols: 2,
              clearable: false,
              data: 'CODE_DATA_MODEL'
            }
          },
          {
            prop: 'editType',
            label: '编辑框类型',
            element: 'base-select',
            default: 'dialog',
            attrs: {
              datadict: 'codeEditType',
              cols: 1,
              clearable: true
            },
            validate: [
              {
                required: false,
                trigger: 'blur'
              }
            ]
          },
          {
            label: '备注',
            prop: 'remark',
            element: 'el-input',
            attrs: {
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
            iconName: 'save',
            isShow: ['add', 'update'],
            event: 'save',
            attrs: {
              type: 'primary'
            }
          }
        ]
      }
    }
  },
  mounted() {},
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
    handleCloseDialog(params) {
      this.$emit('closeHandler', params)
    },
    codePageTempChange(val) {
      if (val) {
        if (val === 'treeTable') {
          toolUtil.getDefDialogItemByProp(this, 'tableModelCode').isShow = true
          toolUtil.getDefDialogItemByProp(this, 'treeModelCode').isShow = true
          toolUtil.getDefDialogItemByProp(this, 'modelCode').isShow = false
        } else {
          toolUtil.getDefDialogItemByProp(this, 'tableModelCode').isShow = false
          toolUtil.getDefDialogItemByProp(this, 'treeModelCode').isShow = false
          toolUtil.getDefDialogItemByProp(this, 'modelCode').isShow = true
        }
      }
    },
    handleInitCallback(params) {
      val = params.pageTemp
      this.codePageTempChange(val)
    }
  }
}
</script>
