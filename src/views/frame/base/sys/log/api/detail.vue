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
          }
        ],
        // 若只存在一个主信息则formData的值可接受Array
        formData: {},

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
      this.$emit('closeHandler', true)
    }
  }
}
</script>
