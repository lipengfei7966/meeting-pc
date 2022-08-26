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
        initType: 'param',
        titleName: '代码生成',
        api: {
          save: '/api/code/generator/code',
          update: '/api/code/generator/code'
        },
        apiData: {},
        formData: [
          {
            label: '生成表',
            prop: 'table',
            element: 'input-validate',
            default: this.param.table,
            attrs: {
              cols: 4,
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
            label: 'package目录(不含模块)',
            prop: 'javaPackage',
            element: 'input-validate',
            default: 'com.ctgbs.framework.biz',
            attrs: {
              clearable: true,
              cols: 4,
              placeholder: '例(小写):com.ctgbs.framework.biz'
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: '包模块',
            prop: 'packageModule',
            element: 'input-validate',
            default: 'sys',
            attrs: {
              clearable: true,
              cols: 2,
              placeholder: '例(小写):sys'
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: '日志模块',
            prop: 'logModel',
            element: 'input-validate',
            default: 'FrameModelConstant.SYS',
            attrs: {
              clearable: true,
              cols: 2,
              placeholder: '例:FrameModelConstant.SYS'
            },
            validate: [
              {
                required: false,
                trigger: 'blur'
              }
            ]
          }
        ],
        bottomButtons: [
          {
            iconName: 'cancel',
            name: 'biz.btn.cancel',
            event: 'cancel',
            isShow: ['add']
          },
          {
            name: '生成',
            iconName: 'save',
            isShow: ['add'],
            event: this.download,
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
    download() {
      this.$refs.bsDialog.$refs.refForm.validate(async valid => {
        if (valid) {
          axios({
            method: 'post',
            url: process.env.BASE_API + '/api/code/generator/code',
            data: {
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: '生成',
              data: this.$refs.bsDialog.formData
            },
            headers: {
              Authorization: 'bearer ' + (getToken() ? getToken() : this.$store.getters.token)
            },
            responseType: 'blob'
          })
            .then(response => {
              if (response.data) {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', 'src.zip')
                document.body.appendChild(link)
                link.click()
                link.remove()
                this.$notify(
                  notifySuccess({
                    msg: '生成成功'
                  })
                )
              }
              this.handleCloseDialog(true)
            })
            .catch(error => {
              this.$notify(
                notifyError({
                  msg: '生成失败'
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
