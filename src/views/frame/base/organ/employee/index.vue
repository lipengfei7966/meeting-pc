<template>
  <bs-tree-form-table ref='bsTable' :treeTableData='treeTableData'></bs-tree-form-table>
</template>
<script>
import request from '@/utils/frame/base/request'

import { notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  name: 'employeeManage',
  data() {
    return {
      treeTableData: {
        form: {
          formSelectByTree: true,
          searchForm: true,
          listQuery: {
            isPage: true,
            defaultSortString: 'code.desc'
          },
          leftWidth: 300,
          initSearch: true,
          treeName: '机构和部门信息',
          expandOnClickNode: false,
          expandAll: true,
          showCode: false,
          api: {
            getTreeList: '/api/func/dept/treeOrgBaseDept'
          },
          apiData: {
            getTreeList() {
              return {
                usingFlag: ''
              }
            }
          },
          defaultProps: {
            children: 'children',
            key: 'code',
            label: 'name'
          },
          // isTopBar: true,
          // topBar: [
          //   {
          //     name: 'expand',
          //     permitName: ['query']
          //   }
          // ],
          formDataVisible: true,
          formData: [
            {
              prop: 'name',
              label: 'func.employee.staffName',
              element: 'input-validate',
              attrs: {
                clearable: true
              }
            },
            {
              prop: 'deptName',
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
            }
          ]
        },

        mainData: {
          api: {
            search: '/api/func/employee/list',
            doDelete: '/api/func/employee/remove'
          },
          apiData: {
            search(node) {
              if (node) {
                return { orgCode: node.orgCode, deptCode: node.deptCode }
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
              getParam: () => {
                const node = this.$refs.bsTable.getCurrentNode()
                if (node) {
                  return {
                    orgCode: node.orgCode,
                    deptCode: node.deptCode
                  }
                } else {
                  return {}
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
            sortable: 'custom',
            cols: [
              {
                prop: 'name',
                label: 'func.employee.staffName',
                width: 100
              },
              {
                prop: 'code',
                label: 'func.employee.staffCode',
                width: 120
              },
              {
                prop: 'usingFlag',
                label: 'biz.lbl.usingFlag',
                align: 'center',
                format: {
                  dict: this.$t('datadict.usingFlag')
                },
                width: 100
              },
              {
                prop: 'orgName',
                label: 'func.employee.organName',
                width: 260
              },
              {
                prop: 'namePinyin',
                label: 'pinyin',
                isShow: false,
                width: 260
              },
              {
                prop: 'deptName',
                label: 'func.employee.deptName',
                width: 120
              },
              {
                prop: 'gender',
                align: 'center',
                label: 'func.employee.gender',
                format: {
                  dict: this.$t('datadict.gender')
                },
                width: 80
              },
              {
                prop: 'birthday',
                label: 'func.employee.birthday',
                format: {
                  func: 'dateFormat'
                },
                width: 100
              },
              {
                prop: 'entryDate',
                label: 'func.employee.entryDate',
                format: {
                  func: 'dateFormat'
                },
                width: 120
              },
              {
                prop: 'type',
                label: 'func.employee.type',
                format: {
                  dict: this.$t('datadict.staffType')
                },
                width: 100
              },
              {
                prop: 'education',
                label: 'func.employee.education',
                width: 100
              },
              {
                prop: 'politicalStatus',
                label: 'func.employee.politicalStatus',
                width: 120
              },
              {
                prop: 'maritalStat',
                label: 'func.employee.maritalStat',
                format: {
                  dict: this.$t('datadict.maritalStat')
                },
                width: 100
              },
              {
                prop: 'profession',
                label: 'func.employee.profession',
                width: 100
              },
              {
                prop: 'birthplace',
                label: 'func.employee.birthplace',
                width: 100
              },
              {
                prop: 'post',
                label: 'func.employee.post',
                width: 100
              },
              {
                prop: 'nationality',
                label: 'func.employee.nationality',
                width: 100
              },
              {
                prop: 'address',
                label: 'func.employee.address',
                width: 100
              },
              {
                prop: 'mail',
                label: 'func.employee.mail',
                width: 100
              },
              {
                prop: 'phone',
                label: 'func.employee.phone',
                width: 100
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
            url: '/api/func/employee/initPinyin',
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

