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
        initType: 'param',
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          save: '/api/code/tableJoinInfo/save',
          update: '/api/code/tableJoinInfo/save'
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
            attrs: {
              cols: 2,
              clearable: false,
              data: 'CODE_APP',
              disabled: true
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ]
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
            element: 'el-input',
            default: this.param.tableName,
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ],
            attrs: {
              cols: 2,
              clearable: false,
              disabled: true
            }
          },

          {
            label: '表描述',
            prop: 'tableComment',
            element: 'el-input',
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
                tableName: ''
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
    handleInitCallback(params) {
      let syncItemRef = toolUtil.getDefDialogItemByProp(this, 'joinColCode')
      if (syncItemRef === null) {
        return
      }
      syncItemRef.attrs.params.tableName = params.tableName
      syncItemRef.attrs.params.codeApp = params.appCode
      syncItemRef.attrs.ds = params.appCode
    },
    download() {},

    changeTableCol(data) {
      const formDataRef = this.$refs.bsDialog.formData
      formDataRef.joinColShow = data.code
      formDataRef.joinColName = data.name
    }
  }
}
</script>
