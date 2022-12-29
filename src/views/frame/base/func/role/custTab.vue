<template>
  <bs-edit-tab ref='bsEditTable' :tab='tabData'>
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
      tabData: {
        type: this.$route.params.type || this.$route.params.opType,
        api: {
          search: '/api/base/cmsCustomer/roleDataper'
        },
        apiData: {
          code: this.param.code,
          search() {
            return {
              roleCode: this.code,
              dataperCode: 'cust'
            }
          }
        },
        isTopBar: true,
        topBar: [
          {
            // 按钮图标
            // 按钮标识
            name: 'set',
            // 对象引用，用于方法
            // 是查看：view(默认) 或者编辑 update 或者添加 add
            // 打开方式:dialog 弹窗， route 路由
            type: 'dialog',
            param: this.param,
            isShow: ['detailSet'],
            getParam() {
              return this.param.code
            },
            // 弹窗组件
            component: () => import('@/views/frame/base/func/role/custSet.vue')
          },
          {
            name: 'delete',
            isShow: ['detailSet'],
            event: this.doDelete
          }
        ],
        isColset: true,
        table: {
          cols: [
            {
              prop: 'dataperItem',
              label: 'func.role.dataperItem',
              width: 160
            },
            {
              prop: 'custName',
              label: 'func.role.custName',
              width: 300
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
            url: '/api/func/funcRoleDataper/remove',
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
