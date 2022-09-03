<template>
  <bs-dialog :dialog='dialog' @closeDialog='handleCloseDialog'></bs-dialog>
</template>

<script>
export default {
  name: 'roleEdit',
  data() {
    return {
      dialog: {
        type: this.opType,
        param: this.param,
        initType: 'param',
        styleType: 'medium',
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          view: '/api/biz/cmsArticle/get',
          save: '/api/biz/cmsArticle/save',
          update: '/api/biz/cmsArticle/update'
        },

        formData: [
          {
            label: 'website.article.edit.articleName',
            prop: 'articleName',
            element: 'input-validate',
            attrs: {
              clearable: true,
              cols: 3,
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: 'website.article.edit.articleTitle',
            prop: 'articleTitle',
            element: 'input-validate',
            attrs: {
              clearable: true,
              cols: 3,
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          },
          {
            label: 'website.article.edit.customerName',
            prop: 'customerCode',
            element: 'base-select',
            attrs: {
              clickParent: true,
              multiple: false,
              cols: 3,
              data: 'FUNC_ORG',
              clearable: true
            },
            validate: [
              {
                required: true,
                trigger: 'change'
              }
            ]
          },
          {
            type: 'datetime',
            label: 'website.article.edit.eventDate',
            props: ['eventBeginTime', 'eventEndTime'],
            default: this.$toolUtil.getLatestWeektime(),
            attrs: {
              cols: 3,
              format: 'yyyy-MM-dd HH:mm:ss',
              'value-format': 'yyyy-MM-dd HH:mm:ss',
              pickerOptions: this.$toolUtil.getDefaultPickerOptions()
            }
          },
          {
            label: 'website.article.edit.eventPlace',
            prop: 'eventPlace',
            element: 'input-validate',
            attrs: {
              clearable: true,
              cols: 3
            }
          },
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
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    }
  }
}
</script>
