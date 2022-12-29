<template>
  <div class="bs-new-container app-container">

    <bs-tree-form-table ref='bsTable' :treeTableData='treeTableData'>
    </bs-tree-form-table>
  </div>
</template>
<script>
export default {
  name: 'dictShowSet',
  data() {
    return {
      treeTableData: {
        form: {
          initSearch: true,
          treeName: this.$t('sys.dict.dictBiz'),
          leftWidth: 300,
          isSearch: true,
          expandAll: true,
          expandOnClickNode: false,
          api: {
            getTreeList: '/api/sys/dictItemShow/tree'
          },
          apiData: {
            getTreeList() {
              return ''
            }
          },
          validate(node) {
            // 只有是页子时才可以点击
            if (node.leafFlag && node.leafFlag === '1') {
              return true
            }
          },
          defaultProps: {
            children: 'children',
            label: 'dictName'
          }
        },
        mainData: {
          api: {
            search: '/api/sys/dictItemShow/list'
          },
          apiData: {
            search(node) {
              return node['code']
            }
          },
          initSearch: true,
          isTopBar: true,
          topBar: [
            {
              name: 'update',
              type: 'dialog',
              component: () => import('./edit.vue')
            }
          ],
          table: {
            showIndex: false,
            sortable: true,
            cols: [
              {
                prop: 'dictItemShowName',
                label: 'sys.dict.snowName',
                width: '200'
              },
              {
                prop: 'showFlag',
                label: 'sys.dict.showFlag',
                align: 'center',
                width: '100',
                format: {
                  dict: this.$t('datadict.showType')
                }
              },
              {
                label: 'biz.lbl.remark',
                sortable: false,
                prop: 'remark',
                width: '300'
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
  }
}
</script>

