<template>

  <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
  <bs-table-tab ref='bsTable' :mainData='mainData'>
    <!-- isException 此列特殊处理-->
    <template slot='isException' slot-scope='scope'>
      <el-tag size="mini" v-if="scope.row.isException==='1'" type="danger">{{$t('sys.log.fail')}}</el-tag>
      <el-tag size="mini" v-else type="success">{{$t('sys.log.success')}}</el-tag>
    </template>
  </bs-table-tab>

</template>

<script>
export default {
  name: 'loginLog',
  data() {
    return {
      mainData: {
        api: {
          search: '/api/sys/log/login'
        },
        isTopBar: true,
        topBar: [
          {
            name: 'export'
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
              prop: 'createDate',
              width: '150',
              label: 'sys.log.loginTime',
              align: 'center'
            },
            {
              prop: 'account',
              label: 'sys.log.account',
              width: '120'
            },
            {
              prop: 'loginType',
              width: '120',
              align: 'center',
              label: 'sys.log.loginType',
              format: {
                dict: this.$t('datadict.loginType')
              }
            },
            {
              prop: 'tenantName',
              width: '180',
              label: 'sys.log.tenantName'
            },
            {
              prop: 'isException',
              label: 'table.status',
              isSlot: true,
              width: '100',
              align: 'center'
            },
            {
              prop: 'ipAddress',
              width: '160',
              label: 'sys.log.ipAddress'
            },
            {
              prop: 'exceptionInfo',
              width: '300',
              label: 'sys.log.errorMessage'
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
  methods: {}
}
</script>

