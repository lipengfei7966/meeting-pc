<template>
  <bs-edit-tab ref='bsEditTable' :tab='tab'></bs-edit-tab>
</template>

<script>
// axios访问
import request from '@/utils/frame/base/request'
// 提醒
import { notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  data() {
    return {
      emptyTextVisible: true,
      data: [],
      list: null,
      loading: false,
      dialogFormVisible: false,
      selectRow: [],
      tab: {
        type: 'view',
        api: {
          search: '/api/warn/cond/listCondNames'
        },
        apiData: {
          code: this.param.code,
          search() {
            return this.code
          }
        },
        isTopBar: true,
        topBar: [
          {
            // 按钮标识
            name: 'add',
            type: 'dialog',
            i18n: 'biz.btn.add',
            param: this.param,
            getParam() {
              return {
                opType: 'add',
                warningCode: this.param.code,
                sourceCode: this.param.sourceCode
              }
            },
            // 弹窗组件
            component: () => import('./condSet.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            param: this.param,
            getParam: () => {
              return {
                opType: 'update',
                warningCode: this.param.code,
                sourceCode: this.param.sourceCode,
                groupCode: this.$refs.bsEditTable.currentRow.groupCode
              }
            },
            // 弹窗组件
            component: () => import('./condSet.vue')
          },
          {
            name: 'delete',
            event: this.doDelete
          }
        ],
        isColset: true,
        table: {
          cols: [
            {
              prop: 'condNames',
              label: 'data.warning.conditionName'
            }
          ]
        }
      }
    }
  },
  props: {
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  methods: {
    // 删行
    doDelete() {
      if (!this.$refs.bsEditTable.currentRow) {
        this.$notify(
          notifyInfo({
            msg: this.$t('biz.msg.noRowSelected')
          })
        )
        return
      }
      this.$confirm(this.$t('biz.msg.confirmDelete'), this.$t('biz.msg.tip'), {
        type: 'warning',
        closeOnClickModal: false,
        confirmButtonText: this.$t('biz.btn.confirm'),
        cancelButtonText: this.$t('biz.btn.cancel')
      })
        .then(() => {
          request({
            url: '/api/warn/cond/remove',
            method: 'POST',
            data: {
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: this.$t('biz.btn.delete'),
              data: {
                warningCode: this.param.code,
                groupCode: this.$refs.bsEditTable.currentRow.groupCode
              }
            }
          })
            .then(response => {
              this.loading = false
              this.$notify(
                notifySuccess({ msg: this.$t('biz.msg.deleteSuccess') })
              )
              this.$refs.bsEditTable.getList()
            })
            .catch(() => {
              this.loading = false
            })
        })
        .catch(() => {})
    }
  }
}
</script>
