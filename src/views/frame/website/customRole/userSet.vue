<template>
  <bs-dialog-tree-table ref="bsTable" :dialog='dialog' @closeDialog='handleCloseDialog'></bs-dialog-tree-table>
</template>
<script>
import { notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
// axios访问
import request from '@/utils/frame/base/request'
export default {
  data() {
    return {
      dialog: {
        titleName: this.$t('website.role.tab.user'),
        form: {
          listQuery: {
            isPage: true,
            defaultSortString: 'code.asc'
          },
          formSelectByTree: true,
          searchForm: true,
          treeName: this.$t('func.org.treeName'),
          isTopBar: false,
          isSearch: true,
          leftWidth: 300,
          showCode: false,
          initSearch: true,
          expandOnClickNode: false,
          expandAll: true,
          api: {
            getTreeList: '/api/base/cmsUsergroup/list'
          },
          apiData: {
            getTreeList() {
              return {
                usingFlag: '1',
                includeEmployee: true
              }
            }
          },
          defaultProps: {
            children: 'children',
            key: 'code',
            label: 'name'
          },
          formDataVisible: true,
          formData: [
            {
              prop: 'customerContactName',
              label: 'website.user.customerContactName',
              element: 'input-validate',
              attrs: {
                clearable: true
              }
            },
            {
              prop: 'customerDeptName',
              label: 'website.user.customerDeptName',
              element: 'input-validate',
              attrs: {
                clearable: true
              }
            },
            {
              label: 'website.user.customerName',
              prop: 'customerName',
              element: 'input-validate',
              attrs: { clearable: true }
            }
          ]
        },
        mainData: {
          initSearch: true,
          api: {
            search: '/api/base/customUser/list'
          },
          apiData: {
            search(node) {
              if (node) {
                return {
                  customerId: node['companyId'],
                  customerDeptId: node['code']
                }
              } else {
                return {}
              }
            },
            init() {
              return {}
            }
          },

          table: {
            showCheckbox: true,
            multiple: true,
            cols: [
              {
                prop: 'name',
                label: 'website.user.name'
              },
              {
                prop: 'account',
                label: 'website.user.account'
              },
              {
                prop: 'customerContactName',
                label: 'website.user.customerContactName'
              },
              {
                prop: 'customerName',
                label: 'website.user.customerName'
              },
              {
                prop: 'customerDeptName',
                label: 'website.user.customerDeptName'
              },
              {
                prop: 'usingFlag',
                width: '100',
                label: 'biz.lbl.usingFlag',
                format: {
                  dict: this.$t('datadict.usingFlag')
                }
              }
            ]
          },
          bottomBar: {
            pagination: {
              show: true,
              layout: 'total, sizes, prev, pager, next, jumper',
              pageSizes: [20, 40, 60, 80, 100]
            }
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
      if (!this.$refs.bsTable.multipleSelection || this.$refs.bsTable.multipleSelection.length < 1) {
        this.$notify(
          notifyInfo({
            msg: this.$t('biz.msg.noRowSelected')
          })
        )
        return
      }

      this.$confirm(this.$t('biz.msg.confirmSave'), this.$t('biz.msg.tip'), {
        type: 'warning',
        closeOnClickModal: false,
        confirmButtonText: this.$t('biz.btn.confirm'),
        cancelButtonText: this.$t('biz.btn.cancel')
      }).then(() => {
        // 操作员账户
        const userCodeArr = []
        this.$refs.bsTable.multipleSelection.forEach(select => {
          debugger
          userCodeArr.push({ userCode: select.code, roleCode: this.param })
        })
        this.loading = true
        request({
          url: '/api/base/customUserRole/save',
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
