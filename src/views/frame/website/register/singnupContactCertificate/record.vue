<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <template v-if='mainData.tabs  ' :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto'}">
      <el-tabs v-model="activeName" type="border-card" style="margin-top:3px" @tab-click="handleTabClick">
        <template v-for='tab in mainData.tabs'>
          <el-tab-pane :key='tab.name' :index='tab.name' :name="tab.name">
            <span slot="label">{{$t(tab.label)}} </span>
          </el-tab-pane>
        </template>
      </el-tabs>
    </template>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref="bsTable" :mainData="mainData"></bs-table>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  name: 'singnupContactCertificateRecord',
  data() {
    return {
      form: {
        moreShowFlg: false,
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          importance: undefined,
          title: undefined,
          type: undefined,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          defaultSortString: 'code.desc',
          data: {
            eventCode: this.$route.params.data
          }
        },
        formData: [
          {
            label: 'website.signupContact.query.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO', // 统一基础档案组件，传值data区分
              clearable: true,
              disabled: true
            },
            default: this.$route.params.data,
            event: {
              changeAll: this.onChangeAll
            }
          }
        ]
      },

      mainData: {
        tabs: [],
        api: {
          search: '/api/register/signupCertificatePrint/page',
          doDelete: '/api/register/signupCertificatePrint/remove'
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
          cols: [
            {
              prop: 'name',
              label: 'website.signupContact.list.name'
            },
            {
              prop: 'mobile',
              label: 'website.signupContact.list.mobile'
            },
            {
              prop: 'email',
              label: 'website.signupContact.list.email'
            },
            {
              prop: 'department',
              label: 'website.signupContact.list.department'
            },
            {
              prop: 'code',
              label: 'website.signupContact.list.code'
            },
            {
              prop: 'contactType',
              label: 'website.signupContact.list.contactType',
              align: 'center',
              format: {
                dict: this.$t('datadict.contantType')
              }
            },
            {
              prop: 'certificateFlag',
              label: 'website.signupContact.list.certificateFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.certificateFlag')
              }
            },
            {
              prop: 'signFlag',
              label: 'website.signupContact.list.signFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.signFlag')
              }
            },
            {
              prop: 'signNum',
              label: 'website.signupContact.list.signNum'
            },
            {
              prop: 'checkFlag',
              label: 'website.signupContact.list.checkFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.checkFlag')
              }
            },
            {
              prop: 'createDate',
              label: 'website.signupContact.list.createDate'
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
    // debugger
    // 不设置表格高度
    this.$refs.bsTable.isHeight = false
    // 设置行高为38
    this.$refs.bsTable.rowHeight = 38
    request({
          url: '/api/dd/selectData/list',
          method: 'POST',
          data: {
            data: {
              queryParams: {type: "1"},
              type: 'CETIFICATETYPE'
            },
            funcModule: '会议字典',
            funcOperation: '查询列表'
          }
        }).then(response => {
          debugger
          response.data.forEach(element => {
            this.mainData.tabs.push({
              label: element.name,
              name: element.code
            })
          });
        })
  },
  methods: {
    onChangeAll(params) {
      debugger
      this.$refs.bsTable.doRefresh();
    },
    handleTabClick(tab, event) {
      this.currentRow = null
      this.form.listQuery.data.certificateType = tab.name
      this.$refs.bsTable.getList({ name: 'search' })
    }
  }
}
</script>
