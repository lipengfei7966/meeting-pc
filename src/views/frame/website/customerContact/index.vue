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
            defaultSortString: 'createDate.desc'
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
              prop: 'mobile',
              label: 'website.customerContact.list.mobile',
              element: 'input-validate',
              attrs: {
                clearable: true
              }
            },
            {
              prop: 'email',
              label: 'website.customerContact.list.email',
              element: 'input-validate',
              attrs: {
                clearable: true
              }
            },
            {
              type: 'datetime',
              label: 'website.customerContact.list.createDate',
              prop: 'createDate',
              element: 'input-validate',
              attrs: {
                clearable: true,
                format: 'yyyy-MM-dd',
                pickerOptions: this.$toolUtil.getDefaultPickerOptions()
              }
            },
            {
              type: 'datetime',
              label: 'website.customerContact.list.updateDate',
              prop: 'updateDate',
              element: 'input-validate',
              attrs: {
                clearable: true,
                format: 'yyyy-MM-dd',
                pickerOptions: this.$toolUtil.getDefaultPickerOptions()
              }
            }
          ]
        },
        mainData: {
          api: {
            search: '/api/base/customerContact/page',
            doDelete: '/api/base/customerContact/remove'
          },
          apiData: {
            search(node) {
              if (node) {
                return {
                  customerCode: node['customerCode'],
                  departmentCode:node['code']
                }
              } else {
                return ""
              }
            }
          },
          initSearch: true,
          isTopBar: true,
          topBar: [
            {
              name: 'add',
              type: 'dialog',
              msg:"请选择客户组织",
              validate: () => {
                const node = this.$refs.bsTable.getCurrentNode();
                console.log(node);
                if (node==null) {
                  return false;
                }else{
                  return true;
                }
              },
              getParam: () => {
                const node = this.$refs.bsTable.getCurrentNode();
                if (node) {
                  return {
                    customerCode: node.customerCode,
                    departmentCode:node.code
                  }
                } else {
                  return {};
                }
              },
              component: () => import('./edit.vue')
            },
            {
              name: 'update',
              type: 'dialog',
              getParam: () => {
                return this.$refs.bsTable.currentRow
              },
              component: () => import('./edit.vue')
            },
            {
              name: 'remove',
              getParam: () => {
                return this.$refs.bsTable.currentRow.code
              }
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
                prop: 'name',
                label: 'website.customerContact.list.name'
              },
              {
                prop: 'mobile',
                label: 'website.customerContact.list.mobile'
              },
              {
                prop: 'email',
                label: 'website.customerContact.list.email'
              },
              {
                prop: 'department',
                label: 'website.customerContact.list.department'
              },
              {
                prop: 'customer',
                label: 'website.customerContact.list.customer'
              },
              {
                prop: 'createDate',
                label: 'website.customerContact.list.createDate'
              },
              {
                prop: 'updateDate',
                label: 'website.customerContact.list.updateDate'
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
  }
}
</script>

