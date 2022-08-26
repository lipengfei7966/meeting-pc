<template>
  <bs-edit-tab ref='tab' :tab='tab'></bs-edit-tab>
</template>

<script>
import request from '@/utils/frame/base/request'
import { notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  name: 'processSet',
  data() {
    return {
      tab: {
        type: this.type,
        param: this.param,
        api: {
          search: '/api/dingtalk/bpmProcessBaseInfo/listByDocKey'
        },
        apiData: {
          search(param) {
            return param.processDefineKey
          }
        },
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            i18n: 'biz.btn.add',
            $refs: this.$refs,
            getParam: () => {
              return {
                docKey: this.getDocKey()
              }
            },
            component: () => import('./processBaseInfoEdit.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            $refs: this.$refs,
            getParam: () => {
              const row = this.$refs.tab.currentRow
              return {
                id: row.id,
                docKey: this.getDocKey(),
                processId: row.processId
              }
            },
            component: () => import('./processBaseInfoEdit.vue')
          },
          {
            name: 'delete',
            iconName: 'delete',
            $refs: this.$refs,
            i18n: 'biz.btn.deleteRow',
            callback: this.deleteRowCallBack
          }
          // {
          //   name: 'set',
          //   type: 'dialog',
          //   i18n: 'biz.btn.conditionSet',
          //   validate: this.isSelectedRow,
          //   getParam: () => {
          //     const row = this.$refs.tab.currentRow
          //     if (row) {
          //       return {
          //         opType: 'update',
          //         id: row.id,
          //         processId: row.processId,
          //         docKey: this.getDocKey()
          //       }
          //     }
          //   },
          //   component: () => import('./processConditionEdit.vue')
          // },
          // {
          //   name: 'set',
          //   type: 'dialog',
          //   i18n: 'biz.btn.formItemSet',
          //   validate: this.isSelectedRow,
          //   getParam: () => {
          //     const row = this.$refs.tab.currentRow
          //     if (row) {
          //       return {
          //         opType: 'update',
          //         id: row.id,
          //         processId: row.processId,
          //         docKey: this.getDocKey()
          //       }
          //     }
          //   },
          //   component: () => import('./docFormShowEdit.vue')
          // }
        ],
        table: {
          cols: [
            {
              prop: 'processId',
              width: '330',
              label: 'sys.bpmSet.tableTitle.processSet.processId'
            },
            {
              prop: 'processName',
              width: '330',
              label: 'sys.bpmSet.tableTitle.processSet.processName'
            },
            {
              prop: 'processDescription',
              label: 'sys.bpmSet.tableTitle.processSet.processDescription'
            }
          ]
        }
      }
    }
  },
  props: {
    type: {
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
  mounted() {},
  methods: {
    /**
     * 获取单据key
     */
    getDocKey() {
      return this.param.processDefineKey
    },
    /**
     * 删行回调
     */
    deleteRowCallBack(currentRow) {
      this.loading = true
      request({
        url: '/api/dingtalk/bpmProcessBaseInfo/remove',
        method: 'POST',
        data: {
          data: currentRow.id,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.delete')
        }
      })
        .then(response => {
          this.$notify(notifySuccess({ msg: this.$t('biz.msg.updateSuccess') }))
          this.loading = false
          this.handleCloseDialog(true)
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * 校验是否选中行
     */
    isSelectedRow() {
      if (this.$refs.tab.currentRow) {
        return true
      }
      this.$notify(
        notifyInfo({
          msg: this.$t('biz.msg.noRowSelected')
        })
      )
      return false
    }
  }
}
</script>
