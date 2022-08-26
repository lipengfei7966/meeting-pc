<template>
  <div class="app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>
    <bs-table ref='bsTable' :mainData='mainData'></bs-table>
  </div>
</template>

<script>
// 调用Vue全局过滤器
import Vue from 'vue'
import { notifyInfo } from '@/utils/frame/base/notifyParams'
export default {
  name: 'approvalGroup',
  data() {
    return {
      form: {
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {},
          defaultSortString: 'code.asc'
        },

        formData: [
          {
            prop: 'name',
            label: 'func.approvalGroup.list.name',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
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
          search: '/api/func/auditGroup/list',
          doDelete: '/api/func/auditGroup/remove'
        },
        apiData: {
          search(param) {
            return param.id
          },
          delete(param) {
            return param.id
          }
        },
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            getParam: () => {
              return this.$refs.bsTable.currentRow
            },
            component: () => import('@/views/frame/base/func/approvalGroup/edit.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            getParam: () => {
              return this.$refs.bsTable.currentRow
            },
            component: () => import('@/views/frame/base/func/approvalGroup/edit.vue')
          },
          {
            name: 'detailSet',
            type: 'dialog',
            getParam: () => {
              return this.$refs.bsTable.currentRow
            },
            event: this.doEditEmployee
          },
          {
            name: 'refresh'
          }
        ],

        isColset: true,
        table: {
          id: '',
          cols: [
            {
              prop: 'name',
              width: '220',
              label: 'func.approvalGroup.list.name'
            },
            {
              prop: 'usingFlag',
              width: '100',
              format: {
                dict: this.$t('datadict.usingFlag')
              },
              label: 'func.approvalGroup.list.usingFlag'
            },
            {
              prop: 'remark',
              width: '360',
              sortable:false,
              label: 'func.approvalGroup.list.remark'
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
  },
  mounted() {
    // 初始化数据
    this.$refs.bsTable.getList()
  },
  methods: {
    doEditEmployee() {
      if (!this.$refs.bsTable.currentRow) {
        this.$notify(
          notifyInfo({
            msg: this.$t('biz.msg.noRowSelected')
          })
        )
        return
      }
      Vue.component('view-form-table', () => import('@/views/frame/base/func/approvalGroup/editEmployee.vue'))
      const row = this.$refs.bsTable.currentRow
      this.$refs.bsTable.param = row
      this.$refs.bsTable.param.groupCode = row.code

      this.$refs.bsTable.opType = 'detailSet'
      this.$refs.bsTable.opMode = 'dialog'
      this.$refs.bsTable.dialogDetailVisible = true
    }
  }
}
</script>
