<template>
  <bs-tree-form-table :treeTableData='treeTableData' ref='bsTreeFormTable'></bs-tree-form-table>
</template>

<script>
// axios访问
export default {
  name: 'bizJointManage',
  data() {
    return {
      treeTableData: {
        form: {
          treeName: '业务功能列表',
          leftWidth: 300,
          isSearch: true,
          expandOnClickNode: false,
          initSearch: true,
          expandAll: true,
          api: {
            getTreeList: '/api/platform/cfgModule/billMenu'
          },
          apiData: {
            getTreeList() {
              return ''
            }
          },
          defaultProps: {
            children: 'children',
            label: 'cname'
          }
        },

        mainData: {
          initSearch: false,
          api: {
            search: '/api/platform/cfgBizJoint/list',
            doDelete: '/api/platform/cfgBizJoint/remove'
          },
          apiData: {
            search(node) {
              return { moduleCode: node['code'] }
            }
          },
          isTopBar: true,
          topBar: [
            {
              name: 'add',
              opType: 'add',
              type: 'dialog',
              getParam: () => {
                const node = this.$refs.bsTreeFormTable.getCurrentNode()
                if (node && !node.children) {
                  return { moduleCode: node.code, bizCode: node.bizCode }
                }
              },
              msg: '请先选择业务功能列表对应的功能',
              validate: () => {
                const node = this.$refs.bsTreeFormTable.getCurrentNode()
                if (node && !node.children) {
                  return true
                } else {
                  return false
                }
              },
              component: () => import('./edit.vue')
            },
            {
              name: 'update',
              type: 'dialog',
              opType: 'update',
              getParam: () => {
                return this.$refs.bsTreeFormTable.currentRow
              },
              component: () => import('./edit.vue')
            },
            {
              name: 'remove',
              getParam: () => {
                return this.$refs.bsTreeFormTable.currentRow.id
              }
            },
            {
              name: 'refresh'
            }
          ],
          table: {
            cols: [
              {
                prop: 'funcName',
                width: '220',
                label: '功能名称'
              },
              {
                prop: 'moduleCode',
                width: '100',
                label: '菜单模块代码'
              },
              {
                prop: 'realBillType',
                width: '150',
                label: '菜单配置业务类型',
                format: {
                  dict: this.$t('datadict.bizCode')
                }
              },
              {
                prop: 'realBillTypeType',
                dataProp: 'realBillType',
                width: '300',
                label: '菜单配置业务类型'
              },
              {
                prop: 'billType',
                width: '150',
                label: '数据存储业务类型',
                format: {
                  dict: this.$t('datadict.bizCode')
                }
              },
              {
                prop: 'billTypeType',
                dataProp: 'billType',
                width: '200',
                label: '数据存储关联业务类型'
              }
            ]
          },
          bottomBar: {
            pagination: {
              show: false,
              layout: 'total, sizes, prev, pager, next, jumper',
              pageSizes: [20, 40, 60, 80, 100]
            }
          }
        }
      }
    }
  },
  methods: {}
}
</script>
