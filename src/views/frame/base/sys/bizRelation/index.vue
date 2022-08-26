<template>
  <bs-tree-form-table :treeTableData='treeTableData' ref='bsTreeFormTable'></bs-tree-form-table>
</template>

<script>
// axios访问
import request from '@/utils/frame/base/request'
export default {
  name: 'bizRelation',
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
            getTreeList: '/api/sys/menu/billMenu'
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
            search: '/api/sys/bizRelation/list',
            doDelete: '/api/sys/bizRelation/remove'
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
              type: 'dialog',
              getParam: () => {
                const node = this.$refs.bsTreeFormTable.getCurrentNode()
                if (node && !node.children) {
                  return { moduleCode: node.code }
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
              getParam: () => {
                return this.$refs.bsTreeFormTable.currentRow
              },
              component: () => import('./edit.vue')
            },
            {
              name: 'add',
              type: 'dialog',
              i18n: '联查扩展',
              getParam: () => {
                const node = this.$refs.bsTreeFormTable.currentRow
                if (node) {
                  return { moduleCode: node.moduleCode }
                }
              },
              msg: '请先选择业务功能列表',
              validate: () => {
                const node = this.$refs.bsTreeFormTable.currentRow
                if (node) {
                  return true
                } else {
                  return false
                }
              },
              component: () => import('./detail.vue')
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
                prop: 'moduleCode',
                width: '100',
                label: '模块代码'
              },
              {
                prop: 'preBillTypes',
                width: '320',
                label: '上级单据类型'
              },
              {
                prop: 'remark',
                label: 'biz.lbl.remark'
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
  methods: {}
}
</script>
