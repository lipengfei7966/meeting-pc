<template>
  <bs-tree-form-table ref='bsTable' :treeTableData='treeTableData'></bs-tree-form-table>
</template>
  <script>
import { Notification } from 'element-ui'

import request from '@/utils/frame/base/request'

// 提醒
import { notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  name: 'customerUsergroup',
  data() {
    return {
      treeTableData: {
        form: {
          formSelectByTree: true,
          searchForm: true,
          listQuery: {
            isPage: false
            // defaultSortString: 'createDate.desc'
          },
          initSearch: true,
          treeName: this.$t('website.department.treeName'),
          expandAll: true,
          expandOnClickNode: false,
          api: {
            getTreeList: '/api/base/cmsCustomer/customerTree'
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
              label: 'website.department.name',
              element: 'input-validate',
              attrs: {
                clearable: true
              }
            }
          ]
        },
        mainData: {
          api: {
            search: '/api/base/cmsUsergroup/page',
            doDelete: '/api/base/cmsUsergroup/remove'
          },
          apiData: {
            search(node) {
              if (node && node['code'] != undefined) {
                return {
                  companyId: node['code']
                }
              } else {
                return ''
              }
            }
          },
          initSearch: true,
          isTopBar: true,
          topBar: [
            {
              name: 'refresh'
            }
          ],
          isColset: true,
          table: {
            showIndex: true,
            id: this.$route.meta.title,
            rowKey: 'id',
            expandAll: true,
            sortable: true,
            cols: [
              {
                prop: 'code',
                label: 'website.department.code',
                width: 160
              },
              {
                prop: 'name',
                label: 'website.department.name',
                width: 160
              },
              {
                prop: 'parentCode',
                label: 'website.department.parentCode',
                width: 260
              },
              {
                prop: 'parentName',
                label: 'website.department.parentName',
                width: 260
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
  methods: {}
}
</script>
  
  