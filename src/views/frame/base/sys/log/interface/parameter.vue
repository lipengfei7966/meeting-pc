<template>
  <bs-dialog :dialog='dialog' @closeDialog='handleCloseDialog'></bs-dialog>
</template>

<script>
export default {
  name: 'apiLogDetail',
  data() {
    return {
      dialog: {
        type: this.opType,
        param: this.param,
        styleType: 'max',
        titleName: this.$t('route.' + this.$route.meta.title),
        api: {
          view: '/api/log/api/get'
        },

        formData: [
          {
            prop: 'createDate',
            label: 'sys.log.requestTime',
            element: 'input-validate',
            attrs: {
              cols: 1,
              clearable: false
            }
          },

          {
            prop: 'funcModule',
            label: 'sys.log.funcModule',
            element: 'input-validate',
            attrs: {
              cols: 1,
              clearable: false
            }
          },

          {
            prop: 'funcOperation',
            label: 'sys.log.operation',
            element: 'input-validate',
            attrs: {
              cols: 1,
              clearable: false
            }
          },
          {
            prop: 'apiUrl',
            label: 'sys.log.apiUrl',
            element: 'input-validate',
            attrs: {
              cols: 3,
              clearable: false
            }
          },

          {
            label: 'sys.log.requestParam',
            prop: 'requestParam',
            element: 'el-input',
            attrs: {
              type: 'textarea',
              cols: 4,
              clearable: false,
              rows: 10
            }
          },

          {
            label: 'sys.log.responseBody',
            prop: 'responseBody',
            element: 'el-input',
            attrs: {
              type: 'textarea',
              cols: 4,
              clearable: false,
              rows: 10
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
          }
        ]
      }
    }
  },
  props: {
    opType: {
      type: String,
      default: 'view'
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  created() {},
  methods: {
    submit() {
      this.$emit('closeHandler', true)
    },
    handleCloseDialog(param) {
      this.$emit('closeHandler', param)
    }
  }
}
</script>
