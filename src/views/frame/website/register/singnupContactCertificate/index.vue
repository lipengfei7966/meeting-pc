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
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
export default {
  name: 'singnupContactCertificate',
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
            usingFlag: ''
          }
        },
        formData: [
          {
            label: 'website.signupContact.query.meetCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO', // 统一基础档案组件，传值data区分
              clearable: true
            },
            event: {
              changeAll: this.onChangeAll
            }
          }
        ]
      },

      mainData: {
        tabs: [
          { name: '2', label: '全部' },
          { name: '0', label: '未办证' },
          { name: '1', label: '已办证' }
        ],
        api: {
          search: '/api/register/singnupContactCertificate/page',
          doDelete: '/api/register/singnupContactCertificate/remove'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            i18n: '新增参会人',
            component: () => import('../component/signupContactSelect.vue'),
            validate: () => {
              if (!this.form.listQuery.data.eventCode || this.form.listQuery.data.eventCode === '') {
                return false
              }else{
                return true
              }
            },
            getParam: () => {
              return {
                eventCode: this.form.listQuery.data.eventCode,
                sceneCode: this.form.listQuery.data.sceneCode,
                type: "contactCertificate"
              }
            }
          },
          // {
          //   name: 'update',
          //   type: 'dialog',
          //   component: () => import('./edit.vue'),
          //   getParam: () => {
          //     return this.$refs.bsTable.currentRow
          //   }
          // },
          // {
          //   name: 'view',
          //   type: 'dialog',
          //   component: () => import('./edit.vue'),
          //   getParam: () => {
          //     return this.$refs.bsTable.currentRow
          //   }
          // },
          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.code
            }
          },
          {
            name: 'record',
            type: 'route',
            i18n: '办证记录',
            event: this.toRecord
          },
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
  },
  methods: {
    onChangeAll(params) {
      debugger
      this.$refs.bsTable.doRefresh();
    },
    toRecord() {
      this.$router.push({
        name: 'singnupContactCertificateRecord',
        params: {
          back: 'singnupContactCertificate',
          data: this.$refs.bsTable.currentRow
        }
      })
    },
    handleTabClick(tab, event) {
      this.currentRow = null
      this.form.listQuery.data.certificateFlag = tab.name
      this.$refs.bsTable.getList({ name: 'search' })
    }
  },
}
</script>
