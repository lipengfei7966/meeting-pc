<template>
  <bs-dialog :dialog='dialog' ref='bsDialog' @closeDialog='handleCloseDialog'></bs-dialog>
</template>

<script>
// axios访问

import axios from 'axios'
import request from '@/utils/frame/base/request'
import { notifySuccess, notifyError } from '@/utils/frame/base/notifyParams'

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
          view: '/api/code/app/get',
          save: '/api/code/app/save',
          update: '/api/code/app/update'
        },
        apiData: {
          view(param) {
            return param.appCode
          }
        },
        formData: [
          {
            prop: 'appCode',
            label: '项目代码',
            element: 'input-validate',

            attrs: {
              cols: 1,
              clearable: true,
              disabled: true
            }
          },
          {
            prop: 'appName',
            label: '项目名称',
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
            label: 'biz.lbl.usingFlag',
            prop: 'usingFlag',
            element: 'base-select',
            default: '1',
            list: this.$t('datadict.usingFlag'),
            attrs: {
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
            prop: 'jdbcUrl',
            label: 'jdbcUrl',
            element: 'input-validate',
            attrs: {
              cols: 4,
              clearable: true,
              maxlength: 500
            },
            validate: [
              {
                required: false,
                trigger: 'blur'
              }
            ]
          },
          {
            prop: 'jdbcUser',
            label: '账户',
            element: 'input-validate',
            attrs: {
              cols: 2,
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
            prop: 'jdbcPass',
            label: '密码',
            element: 'input-validate',
            attrs: {
              showPassword: true,
              encript: false,
              cols: 2,
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
            prop: 'jdbcDriver',
            label: '驱动',
            element: 'base-select',
            list: this.$t('datadict.codeJdbcDriver'),
            attrs: {
              cols: 2,
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
            prop: 'dbType',
            label: '数据库类型',
            element: 'base-select',
            list: this.$t('datadict.codeDbType'),
            attrs: {
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
            prop: 'dbSchema',
            label: '数据库',
            element: 'input-validate',
            attrs: {
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
            name: '测试连接',
            iconName: 'set',
            isShow: ['add', 'update'],
            event: this.test
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

    test() {
      this.$refs.bsDialog.$refs.refForm.validate(async valid => {
        if (valid) {
          request({
            url: '/api/code/app/test',
            method: 'POST',
            data: {
              data: this.$refs.bsDialog.formData,
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: '测试'
            }
          })
            .then(response => {
              if (response.data) {
                this.$notify(
                  notifySuccess({
                    msg: '连接成功'
                  })
                )
              } else {
                this.$notify(
                  notifyError({
                    msg: '连接失败'
                  })
                )
              }
            })
            .catch(() => {
              this.$notify(
                notifyError({
                  msg: '连接失败'
                })
              )
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
