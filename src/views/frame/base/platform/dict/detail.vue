<template>
  <bs-edit :edit="edit" @closeDialog="handleCloseDialog" ref="bsEdit"></bs-edit>
</template>

<script>
export default {
  name: 'cfgDictItem',
  data() {
    return {
      edit: {
        type: this.$route.params.type || this.$route.params.opType,
        mode: this.opMode,
        param: this.$route.params,
        api: {
          view: '/api/platform/cfgDict/get',
          save: '/api/platform/cfgDictItem/save',
          update: '/api/platform/cfgDictItem/save'
        },
        apiData: {
          code: this.$route.params.dictCode,
          view() {
            return this.code
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
            }
          }
        ],
        // 若只存在一个主信息则formData的值可接受Array
        formData: {
          part1: {
            titleName: 'biz.title.mainInfo',
            content: [
              {
                label: 'sys.dict.dictName',
                prop: 'dictName',
                element: 'input-validate',
                attrs: {
                  disabled: true
                }
              },
              {
                label: 'sys.dict.dictCode',
                prop: 'dictCode',
                element: 'input-validate',
                attrs: {
                  disabled: true
                }
              },
              {
                label: 'sys.dict.usingFlag',
                prop: 'usingFlag',
                element: 'base-select',
                list: this.$t('datadict.usingFlag'),
                attrs: {
                  disabled: true
                }
              },
              {
                label: 'biz.lbl.remark',
                prop: 'remark',
                element: 'el-input',
                attrs: {
                  cols: 4,
                  disabled: true
                }
              }
            ]
          }
        },

        tabs: [
          {
            name: 'dictItemList',
            label: 'sys.dict.editTitle',
            required: true,
            component: () => import('./itemTab.vue')
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
      default: 'router'
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },

  methods: {
    submit() {
      this.$emit('closeHandler', true)
    },
    handleCloseDialog(param) {
      if (this.opMode === 'dialog') {
        this.$emit('closeHandler', param)
      } else {
        const backName = this.$route.params.back ? this.$route.params.back : 'dashboard'
        this.$store.dispatch('delVisitedViews', this.$route).then(() => {
          this.$router.push({
            name: backName,
            params: { ...(!!param && { refresh: !!param }) }
          })
        })
      }
    }
  }
}
</script>
