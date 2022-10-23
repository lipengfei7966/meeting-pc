<template>
  <bs-edit :edit="edit" @closeDialog="handleCloseDialog" ref="bsEdit" @initCallback="handleInitCallback" :initFun="initFun"></bs-edit>
</template>

<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'
import { notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  name: 'articleEdit',
  data() {
    return {
      editorWin: null,
      edit: {
        type: this.opType,
        mode: this.opMode,
        param: this.param,
        api: {
          view: '/api/biz/cmsArticle/get',
          save: '/api/biz/cmsArticle/save',
          update: '/api/biz/cmsArticle/update'
        },
        apiData: {
          view(param) {
            return param.code
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
                label: 'website.article.edit.articleName',
                prop: 'articleName',
                element: 'input-validate',
                required: true,
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  clearable: true,
                  cols: 2
                }
              },
              {
                label: 'website.article.edit.articleTitle',
                prop: 'articleTitle',
                element: 'input-validate',
                required: true,
                validate: [
                  {
                    required: true,
                    trigger: 'blur'
                  }
                ],
                attrs: {
                  clearable: true,
                  cols: 2
                }
              },
              // {
              //   label: 'website.article.edit.articlePic',
              //   prop: 'articlePic',
              //   element: 'image-upload',
              //   attrs: {
              //     imageData: {
              //       // tenantCode: this.param.tenantCode
              //     },
              //     disabled: true,
              //     cols: 4
              //   }
              // },
              {
                prop: 'eventCode',
                element: 'input-validate',
                default: this.param.eventCode,
                isShow: false
              }
            ]
          }
        },

        tabs: [
          {
            name: 'articleContent',
            label: 'website.article.edit.articleContent',
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
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    },
    handleInitCallback(data) {
      const win = this.$loopDOM(this, 'articleContent')[0].template.editorWin
      if (win) {
        win.setContent(data.articleContent)
      }
    },
    initFun() {
      const showSite = this.$refs.bsDialog.formData['showSite']
      if (showSite) {
        this.$refs.bsDialog.formData['siteSize'] = this.$toolUtil.dataFormat('dataDictFormat', showSite, this.$t('datadict.imgSiteSize'))
      } else {
        this.$refs.bsDialog.formData['siteSize'] = ''
      }
    },
    setImageSize() {
      const showSite = this.$refs.bsDialog.formData['showSite']
      if (showSite) {
        this.$refs.bsDialog.formData['siteSize'] = this.$toolUtil.dataFormat('dataDictFormat', showSite, this.$t('datadict.imgSiteSize'))
      } else {
        this.$refs.bsDialog.formData['siteSize'] = ''
      }
    },
    onSave() {
      // debugger
      this.$loopDOM(this, 'bsDialogEdit').editForm.articleContent = this.$loopDOM(this, 'articleContent')[0].template.editorWin.getContent()
      return true
    }
  }
}
</script>
