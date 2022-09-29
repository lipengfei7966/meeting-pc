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
            treeName: '机构信息',
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
                label: 'website.department.list.name',
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
                if (node) {
                  return {
                    customerCode: node['code'],

                  }
                } else {
                  console.log(this.$refs.bsTable.getCurrentNode())

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
                getParam: () => {
                  const node = this.$refs.bsTable.getCurrentNode()
                    if (node) {
                      return {
                        customerCode: node.code
                      }
                    } else {
                      return {}
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
                  prop: 'code',
                  label: 'website.department.list.code',
                  width: 160
                },
                {
                  prop: 'name',
                  label: 'website.department.list.name',
                  width: 160
                },
                {
                  prop: 'createDate',
                  label: 'website.department.list.createDate',
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
    methods: {
    }
  }
  </script>
  
  