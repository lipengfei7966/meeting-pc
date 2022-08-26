<template>
  <bs-edit-tab ref='tab' :tab='tab'></bs-edit-tab>
</template>

<script>
import request from '@/utils/frame/base/request'
import { notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  name: 'processBranch',
  data() {
    return {
      tab: {
        type: this.type,
        param: this.param,
        api: {
          search: '/api/dingtalk/bpmBranch/listByDocKey'
        },
        apiData: {
          search(param) {
            return param.processDefineKey
          }
        },
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            i18n: 'biz.btn.add',
            $refs: this.$refs,
            $route: this.$route,
            //  validate: () => {
            //   if (this.$route.params.bpmType !== 'dingTalk') {
            //     const flg = this.$refs.tab && this.$refs.tab.tableData && this.$refs.tab.tableData.length > 1
            //     return flg
            //   } else {
            //     return true
            //   }
            // },
            getParam: () => {
              return {
                docKey: this.getDocKey(),
                docName: this.getDocName()
              }
            },
            component: () => import('./branchEditDialog.vue')
          },
          {
            name: 'update',
            type: 'dialog',
            $refs: this.$refs,
            getParam: () => {
              const row = this.$refs.tab.currentRow
              if (row) {
                return {
                  branchCode: row.branchCode,
                  docKey: this.getDocKey(),
                  docName: this.getDocName()
                }
              }
            },
            component: () => import('./branchEditDialog.vue')
          },
          {
            name: 'delete',
            iconName: 'delete',
            $refs: this.$refs,
            i18n: 'biz.btn.deleteRow',
            callback: this.deleteRowCallBack
          }
        ],
        table: {
          cols: [
            {
              label: 'sys.bpmSet.branch.branchName',
              prop: 'branchName',
              width: '330'
            },
            {
              label: 'sys.bpmSet.branch.priority',
              prop: 'priority',
              width: '90',
              align: 'center',
              isShow: this.$route.params.bpmType === 'dingTalk'
            },
            {
              label: 'sys.bpmSet.branch.processNameList',
              prop: 'processNames',
              width: '330'
            },
            {
              label: 'sys.bpmSet.branch.remark',
              prop: 'remark'
            }
          ]
        }
      }
    }
  },
  props: {
    type: {
      type: String,
      default: 'view'
    },
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  mounted() {
    console.log(this.param)
    console.log(this.$route.params)
  },
  methods: {
    /**
     * 获取单据key
     */
    getDocKey() {
      return this.param.processDefineKey
    },

    getDocName() {
      return this.param.businessName
    },
    /**
     * 删行回调
     */
    deleteRowCallBack(currentRow) {
      this.loading = true
      request({
        url: '/api/dingtalk/bpmBranch/removeByBranchCode',
        method: 'POST',
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.delete'),
          data: currentRow.branchCode
        }
      })
        .then(response => {
          this.$notify(notifySuccess({ msg: this.$t('biz.msg.updateSuccess') }))
          this.loading = false
          this.handleCloseDialog(true)
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
