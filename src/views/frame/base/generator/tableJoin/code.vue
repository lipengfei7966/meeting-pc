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
          view: '/api/code/tableJoinInfo/get',
          save: '/api/code/tableJoinInfo/save',
          update: '/api/code/tableJoinInfo/update'
        },
        apiData: {
          view(param) {
            return param.id
          }
        },
        formData: [
          {
            label: '应用',
            prop: 'appCode',
            default: this.param.appCode,
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
              data: 'CODE_APP'
            },
            event: {
              change: this.changeApp
            }
          },

          {
            label: '是否有租户标志',
            prop: 'tenantFlag',
            element: 'base-select',
            default: '1',
            attrs: {
              datadict: 'yesNo',
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
            label: '关联类型',
            prop: 'joinType',
            default: 'left',
            isShow: false
          },
          {
            label: '表名称',
            prop: 'tableName',
            element: 'base-select',
            default: this.param.table,
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ],
            attrs: {
              labelShowCode: true,
              clearable: true,
              filterable: true,
              cols: 2,
              data: 'CODE_TABLE',
              params: {
                queryPro: 'tableName',
                codeApp: this.param.appCode
              }
            },
            event: {
              changeAll: this.changeTable
            }
          },

          {
            label: '表描述',
            prop: 'tableComment',
            isShow: false
          },
          {
            label: '表名',
            element: 'el-input',
            prop: 'tableShow',
            attrs: {
              cols: 2,
              clearable: false,
              disabled: true
            }
          },
          {
            label: '关联字段',
            prop: 'joinColCode',
            element: 'base-select',
            validate: [
              {
                cols: 2,
                required: true,
                trigger: 'change'
              }
            ],
            attrs: {
              labelShowCode: true,
              clearable: true,
              filterable: true,
              cols: 2,
              data: 'CODE_TABLE_COL',
              params: {
                codeApp: '',
                queryPro: 'tableName',
                tableName: this.param.table
              }
            },
            event: {
              changeAll: this.changeTableCol
            }
          },
          {
            label: '关联字段代码',
            element: 'el-input',
            prop: 'joinColShow',
            attrs: {
              cols: 2,
              clearable: false,
              disabled: true
            }
          },
          {
            label: '关联字段名称',
            prop: 'joinColName',
            isShow: false
          },
          {
            label: 'biz.lbl.remark',
            prop: 'remark',
            element: 'el-input',
            width: '500',
            attrs: {
              cols: 4,
              maxlength: 200,
              clearable: true
            }
          }
        ],
        bottomButtons: [
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
        ]
      }
    }
  },
  mounted() {},
  props: {
    opType: {
      type: String,
      default: 'update'
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
    handleInitCallback(params) {
      let syncItemRef = toolUtil.getDefDialogItemByProp(this, 'tableName')
      if (syncItemRef === null) {
        return
      }
      syncItemRef.attrs.params.codeApp = params.appCode
      syncItemRef.attrs.ds = params.appCode

      syncItemRef = toolUtil.getDefDialogItemByProp(this, 'joinColCode')
      if (syncItemRef === null) {
        return
      }
      syncItemRef.attrs.params.tableName = params.tableName
      syncItemRef.attrs.params.codeApp = params.appCode
      syncItemRef.attrs.ds = params.appCode

      const formDataRef = this.$refs.bsDialog.formData
      formDataRef.joinColShow = params.joinColCode
      formDataRef.tableShow = params.tableName
    },
    download() {},
    changeApp(val) {
      this.$refs.bsDialog.formData.tableName = ''
      let syncItemRef = toolUtil.getDefDialogItemByProp(this, 'tableName')
      if (syncItemRef === null) {
        return
      }
      syncItemRef.attrs.params.codeApp = val
      syncItemRef.attrs.ds = val
    },
    changeTable(data) {
      const formDataRef = this.$refs.bsDialog.formData
      formDataRef.tableComment = data.name
      formDataRef.tableShow = data.code

      //col
      this.$refs.bsDialog.formData.joinColCode = ''
      let syncItemRef = toolUtil.getDefDialogItemByProp(this, 'joinColCode')
      if (syncItemRef === null) {
        return
      }
      syncItemRef.attrs.params.tableName = data.code
      syncItemRef.attrs.params.codeApp = this.$refs.bsDialog.formData.appCode
      syncItemRef.attrs.ds = this.$refs.bsDialog.formData.appCode
    },

    changeTableCol(data) {
      const formDataRef = this.$refs.bsDialog.formData
      formDataRef.joinColShow = data.code
      formDataRef.joinColName = data.name
    }
  }
}
</script>
