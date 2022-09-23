<template>
  <div class="bs-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <template v-if='mainData.tabs' :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto'}">
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
import request from '@/utils/frame/base/request'
export default {
  name: 'signupCertificate',
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
            label: 'website.signupContact.query.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO', // 统一基础档案组件，传值data区分,
              isDefault: true
            },
            event: {
              changeAll: this.onChangeAll
            },
            validate: [
              {
                required: true,
                trigger: 'blur'
              }
            ]
          }
        ]
      },

      mainData: {
        isTabBar: true,
        tabs: [
          { name: '2', label: '全部' },
          { name: '0', label: '未办证' },
          { name: '1', label: '已办证' }
        ],
        api: {
          search: '/api/register/signupCertificate/page'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            i18n: '新增参会人',
            component: () => import('../signupContact/edit.vue'),
            getParam: () => {
              return this.form.listQuery.data.eventCode
            }
          },
          {
            name: 'update',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow[0]
            }
          },
          {
            name: 'record',
            type: 'route',
            i18n: '办证记录',
            event: this.toRecord
          },
          {
            name: 'certificateSave',
            type: 'route',
            i18n: '办证',
            event: this.toSaveRecord
          },
          {
            name: 'certificateSet',
            type: 'route',
            i18n: '办证设置',
            event: this.toSetting
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          showCheckbox: true,
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
    //
  },
  methods: {
    onChangeAll(params) {
      //
      this.$refs.bsTable.doRefresh()
    },
    toRecord() {
      //
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning('请选择会议')
        return
      }
      this.$router.push({
        name: 'singnupContactCertificateRecord',
        params: {
          back: 'singnupContactCertificate',
          data: this.form.listQuery.data.eventCode
        }
      })
    },
    toSaveRecord() {
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning('请选择会议')
        return
      }
      if (this.$refs.bsTable.currentRow==null) {
        this.$message.warning('请选择参会人')
        return
      }
      var bsQueryExtras = []
      this.$refs.bsTable.tableData.forEach(item => {
          bsQueryExtras.push({
            code: item.code,
            contactTypeArray: item.contactType,
            eventCode: item.eventCode
          })
        })
      console.log(bsQueryExtras)
      request({
          url: '/api/register/signupCertificatePrint/save',
          method: 'POST',
          data: {
            data: this.$refs.bsTable.currentRow,
            funcModule: '办证',
            funcOperation: '查询列表'
          }
        }).then(response => {
          debugger
          console.log(response.data);
          if(response.data.certificateFlag){
            this.$message.success(response.data.msg)
          }
          else{
            this.$message.warning(response.data.msg)
          }
        })
    },
    toSetting() {
      //
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning('请选择会议')
        return
      }
      this.$router.push({
        name: 'certificateSet',
        params: {
          back: 'singnupContactCertificate',
          data: this.form.listQuery.data.eventCode
        }
      })
    },
    handleTabClick(tab, event) {
      this.currentRow = null
      this.form.listQuery.data.certificateFlag = tab.name
      this.$refs.bsTable.getList({ name: 'search' })
    }
  }
}
</script>
