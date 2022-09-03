<template>
  <!-- <bs-edit :edit="edit" @closeDialog="handleCloseDialog" ref="bsEdit" @initCallback='handleInitCallback'></bs-edit> -->
  <bs-route-edit ref="bsEdit" :edit="edit" @closeDialog="handleCloseDialog" @initCallback="initCallback"></bs-route-edit>
</template>

<script>
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
          view: '/api/platform/cfgNotice/get',
          save: '/api/platform/cfgNotice/save',
          update: '/api/platform/cfgNotice/update'
        },
        apiData: {
          view(param) {
            return param.id
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
              }
            ]
          }
        },

        tabs: [
          {
            name: 'noticeContent',
            label: 'sys.notice.form.noticeContent',
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
      const backName = this.$route.params.back ? this.$route.params.back : 'cfgFleImpExp'
      this.$store.dispatch('delVisitedViews', this.$route).then(() => {
        this.$router.push({
          name: backName,
          params: Object.assign({}, this.$route.params.backParam, { refresh: !!param })
        })
      })
    },
    handleInitCallback(data) {
      const win = this.$loopDOM(this, 'noticeContent')[0].template.editorWin
      if (win) {
        win.setContent(data.noticeContent)
      }
    },
    onSave() {
      debugger
      this.$loopDOM(this, 'bsDialogEdit').editForm.noticeContent = this.$loopDOM(this, 'noticeContent')[0].template.editorWin.getContent()
      return true
    }
  }
}
</script>
