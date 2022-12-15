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
            isPage: false,
            defaultSortString: ''
          },
          initSearch: true,
          treeName: '客户组织信息',
          expandAll: true,
          expandOnClickNode: false,
          api: {
            getTreeList: '/api/base/cmsUsergroup/list'
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
              label: 'website.customerContact.list.name',
              element: 'input-validate',
              attrs: {
                clearable: true
              }
            },
            {
              prop: 'phone',
              label: 'website.customerContact.list.phone',
              element: 'input-validate',
              attrs: {
                clearable: true
              }
            },
            {
              prop: 'mailbox',
              label: 'website.customerContact.list.mailbox',
              element: 'input-validate',
              attrs: {
                clearable: true
              }
            }
          ]
        },
        mainData: {
          api: {
            search: '/api/base/customerContact/page'
          },
          apiData: {
            search(node) {
              if (node) {
                console.log(node)
                return {
                  companyId: node['companyId'],
                  customerId: node['code']
                }
              } else {
                return ''
              }
            }
          },
          initSearch: true,
          isTopBar: true,
          topBar: [],
          isColset: true,
          table: {
            showIndex: true,
            id: this.$route.meta.title,
            rowKey: 'code',
            expandAll: true,
            sortable: true,
            cols: [
              {
                prop: 'name',
                label: 'website.customerContact.list.name'
              },
              {
                prop: 'phone',
                label: 'website.customerContact.list.phone'
              },
              {
                prop: 'mailbox',
                label: 'website.customerContact.list.mailbox'
              },
              {
                prop: 'customer',
                label: 'website.customerContact.list.customer'
              },
              {
                prop: 'company',
                label: 'website.customerContact.list.company'
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

