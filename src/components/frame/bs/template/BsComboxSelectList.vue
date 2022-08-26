<template>
  <bs-dialog-tab ref='bsDialogTab' :dialog='dialog' @closeDialog='handleCloseDialog'></bs-dialog-tab>
</template>

<script>
export default {
  data() {
    return {
      dialog: {
        funcCode: this.funcCode,
        param: this.param,
        titleName: '选择',
        tabs: [
          {
            name: 'usedQuery',
            label: '我的常用',
            queryParamArr: this.queryParamArr,
            extraParam: { showUsedList: this.showUsedList, multiple: this.multiple },
            component: () => import('@/components/frame/bs/comboxMoreQuery/usedQuery.vue'),
            isShow: this.showUsedList
          },
          {
            name: 'moreQuery',
            label: '全部数据',
            extraParam: { multiple: this.multiple },
            queryParamArr: this.queryParamArr,
            component: () => import('@/components/frame/bs/comboxMoreQuery/moreQuery.vue'),
            isShow: true
          }
        ],
        bottomButtons: [
          {
            name: 'biz.btn.cancel',
            event: 'cancel',
            isShow: ['view']
          },
          {
            name: 'biz.btn.choose',
            event: 'choose',
            isShow: ['add', 'update'],
            attrs: {
              type: 'primary'
            }
          }
        ]
      }
    }
  },
  provide() {
    return {
      app: this
    }
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    showUsedList: {
      type: Boolean,
      default: false
    },
    funcCode: {
      type: String
    },
    opType: {
      type: String,
      default: 'view'
    },
    opMode: {
      type: String,
      default: 'dialog'
    },
    queryParamArr: {
      type: Array,
      default() {
        return []
      }
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  mounted() {},
  methods: {
    handleCloseDialog(params) {
      this.$emit('closeHandler', params)
    }
  }
}
</script>

<style lang='scss' scoped>
/deep/ .el-tabs__header {
  .el-tabs__item {
    height: 30px;
    line-height: 30px;
  }
}
</style>