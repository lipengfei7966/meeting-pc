<template>
  <bs-tree-form-table :treeTableData="treeTableData" ref="bsTreeFormTable"></bs-tree-form-table>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  name: 'cfgFleImpExp',
  data() {
    return {
      treeTableData: {
        form: {
          initSearch: true,
          expandAll: true,
          treeName: '业务功能列表',
          leftWidth: 260,
          isSearch: true,
          api: {
            getTreeList: '/api/platform/cfgModule/catalogForTenant'
          },
          apiData: {
            getTreeList() {
              return ''
            }
          },
          defaultProps: {
            children: 'children',
            label: 'cname'
          },
          handleNodeClick: this.handleNodeClick
        },
        mainData: {
          initSearch: false,
          api: {
            search: '/api/file/cfgFleImpExp/list',
            save: '/api/file/cfgFleImpExp/save',
            get: '/api/file/cfgFleImpExp/get',
            doDelete: '/api/file/cfgFleImpExp/remove'
          },
          apiData: {
            search(node) {
              return {
                moduleCode: node.code
              }
            }
          },
          isTopBar: true,
          topBar: [
            {
              name: 'add',
              i18n: 'file.impexp.addExpBtn',
              type: 'route',
              msg: 'file.impexp.msg.noChooseModule',
              validate: () => {
                const node = this.$refs.bsTreeFormTable.getCurrentNode()
                return node && node.flag === '1' ? true : false
              },
              routeInfo: () => {
                const node = this.$refs.bsTreeFormTable.getCurrentNode()
                return {
                  name: this.$route.name + 'Add',
                  params: {
                    type: 'add',
                    back: this.$route.name,
                    module: node,
                    expImpType: 'EXP'
                  }
                }
              }
            },
            {
              name: 'add',
              i18n: 'file.impexp.addImpBtn',
              type: 'route',
              msg: 'file.impexp.msg.noChooseModule',
              validate: () => {
                const node = this.$refs.bsTreeFormTable.getCurrentNode()
                return node && node.flag === '1' ? true : false
              },
              routeInfo: () => {
                const node = this.$refs.bsTreeFormTable.getCurrentNode()
                return {
                  name: this.$route.name + 'Add',
                  params: {
                    type: 'add',
                    back: this.$route.name,
                    module: node,
                    expImpType: 'IMP'
                  }
                }
              }
            },
            {
              name: 'update',
              type: 'route',
              routeInfo: () => {
                const currentRow = this.$refs.bsTreeFormTable.currentRow
                return {
                  name: this.$route.name + 'Update',
                  params: {
                    type: 'update',
                    back: this.$route.name,
                    data: currentRow
                  }
                }
              }
            },
            {
              name: 'view',
              type: 'route',
              routeInfo: () => {
                const currentRow = this.$refs.bsTreeFormTable.currentRow
                return {
                  name: this.$route.name + 'View',
                  params: {
                    type: 'view',
                    back: this.$route.name,
                    data: currentRow
                  }
                }
              }
            },
            {
              name: 'remove',
              getParam: () => {
                const currentRow = this.$refs.bsTreeFormTable.currentRow
                return currentRow.expImpCode
              }
            }
          ],
          table: {
            cols: [
              {
                label: 'file.impexp.expImpCode',
                prop: 'expImpCode',
                width: '180'
              },
              {
                label: 'file.impexp.expImpName',
                prop: 'expImpName',
                width: '180'
              },
              {
                label: 'file.impexp.expImpType',
                prop: 'expImpType',
                width: '120',
                align: 'center',
                format: {
                  dict: [
                    { value: 'EXP', label: '导出' },
                    { value: 'IMP', label: '导入' }
                  ]
                }
              },
              {
                label: 'file.impexp.usingFlag',
                prop: 'usingFlag',
                width: '120',
                align: 'center',
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
        }
      }
    }
  },
  methods: {
    handleNodeClick(node) {
      if (!node.children && !this.treeTableData.form.showCheckbox && node) {
        this.loading = true
        request({
          url: this.treeTableData.mainData.api.search,
          method: 'POST',
          data: {
            funcModule: this.$t('route.' + this.$route.meta.title),
            funcOperation: this.$t('biz.btn.search'),
            data: (this.treeTableData.mainData.apiData.search && this.treeTableData.mainData.apiData.search(node)) || node
          }
        })
          .then((response) => {
            this.loading = false
            this.$refs.bsTreeFormTable.tableData = response.data
            if (this.$refs.bsTreeFormTable.tableData && this.$refs.bsTreeFormTable.tableData.length > 0) {
              this.$refs.bsTreeFormTable.emptyTextVisible = false
            } else {
              this.$refs.bsTreeFormTable.emptyTextVisible = true
            }
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    // 刷新
    refresh() {
      const node = this.$refs.bsTreeFormTable.getCurrentNode()
      this.handleNodeClick(node)
    }
  }
}
</script>
