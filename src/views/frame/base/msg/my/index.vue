<template>
  <div class="bs-container app-container">
    <bs-form ref='bsForm' :form='form'></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref='bsTable' :mainData='mainData'>
      <template slot="msgExtend" slot-scope="scope">
        <el-tag v-if="scope.row.msgExtend" @click="billDetail(scope.row, $event)">单据信息</el-tag>
      </template>

    </bs-table>
  </div>
</template>
<script>
import { notifySuccess } from '@/utils/frame/base/notifyParams'

// axios访问
import request from '@/utils/frame/base/request'
export default {
  name: 'msgMy',
  data() {
    return {
      form: {
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          importance: undefined,
          title: undefined,
          type: undefined,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          defaultSortString: 'userSendDt.desc',
          data: {
            msgTaskNo: ''
          }
        },
        formData: [
          {
            type: 'date',
            label: 'msg.webmsg.userSendDt',
            props: ['userSendDtFrom', 'userSendDtTo'],
            default: this.$toolUtil.getLatestMonth(),
            attrs: {
              format: 'yyyy-MM-dd',
              'value-format': 'yyyyMMdd'
            }
          },
          {
            label: 'msg.webmsg.readFlag',
            prop: 'readFlag',
            element: 'base-select',
            list: this.$t('datadict.msgReadFlag'),
            default: '0',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'msg.webmsg.msgClassType',
            prop: 'msgClassType',
            element: 'base-select',
            list: this.$t('datadict.msgClassType'),
            attrs: {
              clearable: true
            }
          },
          {
            label: 'msg.webmsg.msgTitle',
            prop: 'msgTitle',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          }
        ]
      },
      mainData: {
        api: {
          search: '/api/msg/my/list',
          doDelete: '/api/msg/my/remove'
        },
        initSearch: true,
        isTopBar: true,
        topBar: [
          {
            name: 'view',
            allowDblClick: true,
            type: 'dialog',
            component: () => import('./form.vue'),
            getParam(currentRow) {
              return currentRow.id
            }
          },
          {
            name: 'set',
            i18n: 'msg.webmsg.signAll',
            event: this.signAll
          },
          {
            name: 'remove',
            getParam(currentRow) {
              return currentRow.id
            }
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          id: this.$route.meta.title,
          cols: [
            {
              label: 'msg.webmsg.userSendDt',
              width: '150',
              prop: 'userSendDt'
            },
            {
              label: 'msg.webmsg.senderName',
              prop: 'senderName',
              width: '100'
            },
            {
              label: 'msg.webmsg.msgClassType',
              width: '100',
              align: 'center',
              prop: 'msgClassType',
              format: {
                dict: this.$t('datadict.msgClassType')
              }
            },
            {
              label: 'msg.webmsg.readFlag',
              width: '100',
              prop: 'readFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.msgReadFlag')
              }
            },
            {
              label: 'msg.webmsg.msgTitle',
              Width: '200',
              prop: 'msgTitle'
            },
            {
              label: 'msg.webmsg.msgContent',
              minWidth: '180',
              prop: 'msgContent'
            },
            {
              label: 'msg.webmsg.msgExtend',
              width: '120',
              align: 'center',
              prop: 'msgExtend',
              isSlot: true,
              sortable: false
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
  methods: {
    async billDetail(data, event) {
      let routeInfo = eval('(' + data.msgExtend + ')')
      if (data.msgFuncCode === 'BPM_TO_DO' && routeInfo && routeInfo.params && routeInfo.params.uk) {
        const response = await request({
          url: '/api/bpm/backlog/checkTodoByUk',
          method: 'POST',
          data: {
            current: 1,
            size: 5,
            isPage: true,
            funcModule: this.$t('route.' + this.$route.meta.title),
            funcOperation: this.$t('biz.btn.search'),
            data: { uk: routeInfo.params.uk },
            camelToUnderlineFlg: false,
            defaultSortString: 'startTime.desc'
          }
        })

        if (response.data && response.data.length > 0) {
          const todoInfo = response.data[0]

          if (todoInfo.bpmComponent) {
            routeInfo.params = todoInfo
            if (todoInfo.assistId) {
              routeInfo.params.type = 'assist' // 协助
            } else {
              routeInfo.params.type = 'audit' // 普通
            }
          }
        }
      }

      // eslint-disable-next-line
      this.$router.push(routeInfo)
    },
    signAll() {
      this.loading = true
      request({
        url: '/api/msg/my/signAll',
        method: 'post',
        data: {
          data: ''
        }
      })
        .then(response => {
          this.$notify(notifySuccess({ msg: this.$t('biz.msg.updateSuccess') }))
          this.loading = false
          this.$refs.bsTable.getList()
        })
        .catch(e => {
          this.loading = false
        })
    }
  }
}
</script>

