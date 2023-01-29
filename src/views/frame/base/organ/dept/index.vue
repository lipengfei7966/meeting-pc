<template>
  <bs-tree-form-table ref='bsTable' :treeTableData='treeTableData'></bs-tree-form-table>
</template>
<script>
import { Notification } from 'element-ui'

import request from '@/utils/frame/base/request'

// 提醒
import { notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  name: 'deptManage',
  data() {
    return {
      treeTableData: {
        form: {
          formSelectByTree: true,
          searchForm: true,
          listQuery: {
            isPage: false,
            defaultSortString: 'createDate.desc'
          },
          initSearch: true,
          treeName: this.$t('func.org.organInfo'),
          expandAll: true,
          expandOnClickNode: false,
          api: {
            getTreeList: '/api/func/org/treeOrgan'
          },
          apiData: {
            getTreeList() {
              return {
                usingFlag: ''
              }
            }
          },
          leftWidth: 300,
          showCode: false,
          defaultProps: {
            children: 'children',
            key: 'code',
            label: 'name'
          },
          isTopBar: false,
          topBar: [
            {
              name: 'expand',
              permitName: ['query']
            }
          ],
          isSearch: true,
          formDataVisible: true,
          formData: [
            {
              prop: 'name',
              label: 'func.dept.deptName',
              element: 'input-validate',
              attrs: {
                clearable: true
              }
            },
            {
              label: 'func.dept.organName',
              prop: 'orgName',
              element: 'input-validate',
              attrs: { clearable: true }
            },
            {
              label: 'biz.lbl.usingFlag',
              prop: 'usingFlag',
              element: 'base-select',
              list: this.$t('datadict.usingFlag'),
              attrs: {
                clearable: true
              }
            }
          ]
        },
        mainData: {
          api: {
            search: '/api/func/dept/list',
            doDelete: '/api/func/dept/remove'
          },
          apiData: {
            search(node) {
              if (node) {
                return {
                  orgCode: node['code']
                }
              } else {
                return {}
              }
            }
          },
          initSearch: true,
          isTopBar: true,
          topBar: [
            {
              name: 'add',
              type: 'dialog',
              msg: this.$t('msg.organ.orgSelect'),
              // 按钮验证函数
              // validate: () => {
              //   const flg = this.$refs.bsTable && this.$refs.bsTable.getCurrentNode()
              //   if (!flg) {
              //     Notification(
              //       notifyInfo({
              //         msg: this.msg
              //       })
              //     )
              //   }
              //   return flg
              // },
              getParam: () => {
                if (this.$refs.bsTable.currentRow) {
                  return {
                    orgCode: this.$refs.bsTable.currentRow.orgCode,
                    deptCode: this.$refs.bsTable.currentRow.code
                  }
                } else {
                  const node = this.$refs.bsTable.getCurrentNode()
                  if (node) {
                    return {
                      orgCode: node.code
                    }
                  } else {
                    return {}
                  }
                }
              },
              component: () => import('./edit.vue')
            },
            {
              name: 'view',
              allowDblClick: true,
              type: 'dialog',
              component: () => import('./edit.vue')
            },
            {
              name: 'update',
              type: 'dialog',
              component: () => import('./edit.vue')
            },
            {
              name: 'remove',
              getParam: () => {
                return this.$refs.bsTable.currentRow.id
              }
            },
            {
              name: 'set',
              permitName: ['update'],
              i18n: 'biz.btn.init',
              iconName: 'set',
              event: this.initPinyin
            },
            {
              name: 'refresh'
            }
          ],
          isColset: true,
          table: {
            showIndex: true,
            id: this.$route.meta.title + 'ff',
            rowKey: 'code',
            expandAll: true,
            sortable: true,
            cols: [
              {
                prop: 'code',
                label: 'func.dept.deptCode',
                width: 160
              },
              {
                prop: 'name',
                label: 'func.dept.deptName',
                width: 160
              },
              {
                prop: 'namePinyin',
                label: 'pinyin',
                isShow: false,
                width: 260
              },
              {
                prop: 'orgName',
                label: 'func.dept.organName',
                width: 260
              },
              {
                prop: 'usingFlag',
                width: 80,
                align: 'center',
                label: 'biz.lbl.usingFlag',
                format: {
                  dict: this.$t('datadict.usingFlag')
                }
              },
              {
                prop: 'leader',
                label: 'func.dept.leader',
                width: 80
              },
              {
                prop: 'principal',
                label: 'func.dept.principal',
                width: 80
              },
              {
                prop: 'phone',
                label: 'func.dept.phone',
                width: 120
              },
              {
                prop: 'fax',
                label: 'func.dept.fax',
                width: 120
              },
              {
                prop: 'businessNature',
                label: 'func.dept.businessNature',
                width: 120
              }
            ]
          },
          bottomBar: {
            pagination: {
              show: false
            }
          }
        }
      }
    }
  },
  methods: {
    initPinyin() {
      this.$confirm('确认要进行拼音初始化', this.$t('biz.msg.tip'), {
        confirmButtonText: this.$t('biz.btn.confirm'),
        cancelButtonText: this.$t('biz.btn.cancel'),
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          this.loading = true
          request({
            url: '/api/func/dept/initPinyin',
            method: 'post',
            data: {
              data: '',
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: this.$t('biz.btn.init')
            }
          })
            .then(response => {
              this.$notify(notifySuccess({ msg: '拼音初始化成功' }))
              this.$refs.bsTable.refresh()
              this.loading = false
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

