<template>
  <bs-dialog-tree ref="bsTable" :dialog='dialog' @closeDialog='handleCloseDialog'></bs-dialog-tree>
</template>

<script>
import { notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
// axios访问
import request from '@/utils/frame/base/request'
export default {
  data() {
    return {
      dialog: {
        titleName: this.$t('func.role.tab.org'),
        form: {
          formSelectByTree: true,
          searchForm: true,
          showCheckbox: true,
          initSearch: true,
          expandOnClickNode: false,
          expandAll: true,
          strictly: true,
          isSearch: true,
          showCode: false,
          api: {
            getTreeList: '/api/base/cmsCustomer/customerTree',
            getCheckedList: '/api/base/cmsCustomer/listDataperItem'
          },
          apiData: {
            roleCode: this.param,
            getTreeList() {
              return {
                dataAuth: false,
                usingFlag: '1'
              }
            },
            getCheckedList() {
              return {
                roleCode: this.roleCode,
                dataperCode: 'cust'
              }
            }
          },
          defaultProps: {
            children: 'children',
            key: 'code',
            label: 'name'
          }
        },
        bottomButtons: [
          {
            name: 'biz.btn.cancel',
            event: 'cancel',
            isShow: ['view']
          },
          {
            name: 'biz.btn.save',
            event: this.save,
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
    param: String
  },
  methods: {
    handleCloseDialog(params) {
      this.$emit('closeAndRefreshHandler', params)
    },
    // 保存通用事件
    save() {
      this.$confirm(this.$t('biz.msg.confirmSave'), this.$t('biz.msg.tip'), {
        type: 'warning',
        closeOnClickModal: false,
        confirmButtonText: this.$t('biz.btn.confirm'),
        cancelButtonText: this.$t('biz.btn.cancel')
      }).then(() => {
        // 操作员账户
        const userCodeArr = []
        this.$refs.bsTable.checkedKeys.forEach(code => {
          userCodeArr.push({
            dataperItem: code,
            dataperCode: 'cust',
            roleCode: this.param
          })
        })

        this.loading = true
        request({
          url: '/api/func/funcRoleDataper/save',
          method: 'POST',
          data: {
            data: userCodeArr,
            funcModule: this.$t('route.' + this.$route.meta.title),
            funcOperation: this.$t('biz.btn.save')
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
      })
    }
  }
}
</script>
