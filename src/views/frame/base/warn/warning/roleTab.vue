<template>
  <bs-edit-tab ref='bsEditTable' :tab='tab'>
    <template slot='roleCode' slot-scope='scope'>
      <el-button @click.native.prevent="view(scope.$index, scope.row.roleCode)" type="text" size="small">
        {{$t('biz.btn.view')}}
      </el-button>
    </template>
  </bs-edit-tab>
</template>

<script>
// axios访问
import request from '@/utils/frame/base/request'
// 提醒
import { notifyInfo, notifySuccess } from '@/utils/frame/base/notifyParams'
export default {
  data() {
    return {
      showTemplate: false,
      emptyTextVisible: true,
      data: [],
      list: null,
      loading: false,
      dialogFormVisible: false,
      selectRow: [],
      tab: {
        type: 'view',
        api: {
          search: '/api/warn/role/list'
        },
        apiData: {
          code: this.param.code,
          search() {
            return this.code
          }
        },
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            param: this.param,
            getParam() {
              return {
                warningCode: this.param.code,
                sourceCode: this.param.sourceCode
              }
            },
            // 弹窗组件
            component: () => import('./roleSet.vue')
          },
          {
            name: 'delete',
            event: this.doDelete
          }
        ],
        isColset: true,
        table: {
          cols: [
            {
              label: 'func.role.roleName',
              prop: 'roleName',
              width: '150'
            },
            {
              label: 'biz.btn.view',
              prop: 'roleCode',
              width: '100',
              align: 'center',
              isSlot: true
            }
          ]
        }
      }
    }
  },
  props: {
    param: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },

  watch: {},

  async created() {},
  methods: {
    view(index, roleCode) {
      this.$router.push({
        name: 'roleDetail',
        params: {
          type: 'view',
          back: 'roleManage',
          code: roleCode
        }
      })
    },
    // 删行
    doDelete() {
      if (!this.$refs.bsEditTable.currentRow) {
        this.$notify(
          notifyInfo({
            msg: this.$t('biz.msg.noRowSelected')
          })
        )
        return
      }
      this.$confirm(this.$t('biz.msg.confirmDelete'), this.$t('biz.msg.tip'), {
        type: 'warning',
        closeOnClickModal: false,
        confirmButtonText: this.$t('biz.btn.confirm'),
        cancelButtonText: this.$t('biz.btn.cancel')
      })
        .then(() => {
          request({
            url: '/api/warn/role/remove',
            method: 'POST',
            data: {
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: this.$t('biz.btn.search'),
              data: this.$refs.bsEditTable.currentRow.id
            }
          })
            .then(response => {
              this.loading = false
              this.$notify(notifySuccess({ msg: this.$t('biz.msg.deleteSuccess') }))
              this.$refs.bsEditTable.getList()
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
