<template>
  <bs-edit-tab ref='bsEditTable' :tab='tab' @closeHandler='handleClose'>
  </bs-edit-tab>
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
        type: this.type,
        api: {
          search: '/api/sys/bizRelationExtend/page'
        },
        apiData: {
          moduleCode: this.param.moduleCode,
          search() {
            return { moduleCode: this.moduleCode }
          }
        },
        isTopBar: true,
        topBar: [
          {
            // 按钮标识
            name: 'set',
            type: 'dialog',
            isShow: ['update'],
            i18n: 'biz.btn.addRow',
            param: this.param,
            getParam() {
              return { moduleCode: this.param.moduleCode }
            },
            // 弹窗组件
            component: () => import('./extendSet.vue')
          },
          {
            // 按钮标识
            name: 'update',
            type: 'dialog',
            isShow: ['update'],
            param: this.param,
            getParam(currentRow) {
              return { moduleCode: this.param.moduleCode, id: currentRow.id }
            },
            // 弹窗组件
            component: () => import('./extendSet.vue')
          },
          {
            name: 'delete',
            isShow: ['update'],
            event: this.doDelete
          }
        ],
        isColset: false,
        table: {
          cols: [
            {
              prop: 'remark',
              label: 'biz.lbl.remark'
            },
            {
              prop: 'billDirection',
              label: '单据方向',
              width: 150,
              align: 'center',
              format: {
                dict: this.$t('datadict.bizBillDirection')
              }
            },
            {
              prop: 'direction',
              label: '扩展方向',
              width: 150,
              align: 'center',
              format: {
                dict: this.$t('datadict.bizRelationDirection')
              }
            }
          ]
        }
      }
    }
  },
  props: {
    type: {
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
  beforeMount() {},
  methods: {
    handleClose(params) {
      if (params) {
        this.$refs.bsEditTable.getList()
      }
    },
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
            url: '/api/sys/bizRelationExtend/remove',
            method: 'POST',
            data: {
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: this.$t('biz.btn.search'),
              data: this.$refs.bsEditTable.currentRow.id
            }
          })
            .then(response => {
              this.loading = false
              this.$notify(notifySuccess({ msg: this.$t('biz.msg.deleteSuccess') }))
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
