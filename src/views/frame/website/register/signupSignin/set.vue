<template>
  <div class="bs-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <template v-if='mainData.tabs  ' :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto'}">
      <el-tabs v-model="activeName" type="border-card" style="margin-top:3px" @tab-click="handleTabClick">
        <template v-for='tab in mainData.tabs'>
          <el-tab-pane :key='tab.code' :index='tab.code' :name="tab.code">
            <span slot="label">{{$t(tab.name)}} </span>
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
import { notifyInfo } from '@/utils/frame/base/notifyParams'
export default {
  name: 'signupSigninSet',
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
          data: {}
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
          search: '/api/register/signupSignin/page',
          doDelete: '/api/register/signupContactSceneRel/remove'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            i18n: '添加场景',
            type: 'dialog',
            component: () => import('./sceneAdd.vue'),
            getParam: () => {
              return this.form.listQuery.data.eventCode
            }
          },
          {
            name: 'removeScene',
            i18n: '删除场景',
            event: this.removeScene,
            type: 'dialog',
            getParam: () => {
              return this.form.listQuery.data.sceneCode
            },
            validate: () => {
              if (this.$refs.bsTable.length > 0) {
                this.$notify(notifyInfo({ msg: '无法删除场景' }));
                return false
              }
            }
          },
          {
            name: 'addSign',
            i18n: '签到',
            type: 'dialog',
            event: this.signAdd,
            getParam: () => {
              return this.form.listQuery.data.eventCode
            }
          },
          {
            name: 'add',
            type: 'dialog',
            i18n: '添加参会人',
            component: () => import('../component/signupContactSelect.vue'),
            validate: () => {
              if (!this.form.listQuery.data.eventCode || this.form.listQuery.data.eventCode === '') {
                return false
              } else if (this.form.listQuery.data.sceneCode == '' || this.form.listQuery.data.sceneCode == undefined) {
                this.$notify(notifyInfo({ msg: '默认场景无法添加参会人' }));
                return false
              } else {
                return true
              }
            },
            getParam: () => {
              return {
                eventCode: this.form.listQuery.data.eventCode,
                sceneCode: this.form.listQuery.data.sceneCode,
                type: 'signin'
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
          // {
          //   name: 'record',
          //   type: 'route',
          //   i18n: '签到记录',
          //   event: this.toRecord
          // },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          cols: [
            {
              prop: 'name',
              label: 'website.signupSignin.list.name'
            },
            {
              prop: 'mobile',
              label: 'website.signupSignin.list.mobile'
            },
            {
              prop: 'email',
              label: 'website.signupSignin.list.email'
            },
            {
              prop: 'department',
              label: 'website.signupSignin.list.department'
            },
            {
              prop: 'contactCode',
              label: 'website.signupSignin.list.contactCode'
            },
            {
              prop: 'contactType',
              label: 'website.signupSignin.list.contactType',
              align: 'center',
              format: {
                dict: this.$t('datadict.contantType')
              }
            },
            {
              prop: 'signinStatus',
              label: 'website.signupSignin.list.signinStatus'
            },
            {
              prop: 'createDate',
              label: 'website.signupSignin.list.createDate'
            },
            {
              prop: 'signinWay',
              label: 'website.signupSignin.list.signinWay'
            },
            {
              prop: 'signupData',
              label: 'website.signupSignin.list.signupData'
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
    this.sceneList()
  },
  methods: {
    dialogHandler() {
      this.sceneList()
    },
    sceneList() {
      request({
        url: '/api/register/signupDictype/page',
        method: 'POST',
        data: {
          data: {
            type: '2',
            eventCode: this.form.listQuery.data.eventCode
          },
          funcModule: '会议字典',
          funcOperation: '查询列表'
        }
      }).then(response => {
        this.mainData.tabs = []
        this.mainData.tabs.push({
          code: '',
          name: '默认'
        })

        response.data.forEach((item, key) => {
          this.mainData.tabs.push(item)
        })
        //this.mainData.tabs = response.data
      })
    },
    signAdd(){
      // if (this.$refs.bsTable.currentRow.signinStatus=='已签到') {
      //   this.$alert('请勿重复签到', '签到', { confirmButtonText: '确定'});
      //   return
      // }
      console.log(this.$refs.bsTable.currentRow)
      request({
            url: '/api/register/signupSignin/save',
            method: 'POST',
            data: {
              data:{
                eventCode:this.form.listQuery.data.eventCode,
                contactCode:this.$refs.bsTable.currentRow.contactCode,
                sceneCode:this.$refs.bsTable.currentRow.sceneCode,
                signinWay:"pc"
              },
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: this.$t('biz.btn.check')
            }
          })
          .then(response => {
            debugger;
            if (response.status) {
              this.$refs.bsTable.doRefresh();
              this.$notify(notifyInfo({ msg: '签到成功' }));
            } else {
              this.sceneList();
            }
          })
            .catch(() => {})
    },
    onChangeAll(params) {
      this.$refs.bsTable.doRefresh()
    },
    toRecord() {
      this.$router.push({
        name: 'signupSigninRecord',
        params: {
          back: 'signupSignin',
          data: this.$refs.bsTable.currentRow
        }
      })
    },
    handleTabClick(tab, event) {
      this.currentRow = null
      this.form.listQuery.data.sceneCode = tab.name
      this.$refs.bsTable.getList({ name: 'search' })
    },
    removeScene() {
      if (this.form.listQuery.data.sceneCode == '' || this.form.listQuery.data.sceneCode == undefined) {
        this.$notify(notifyInfo({ msg: '无法删除默认场景' }));
        return
      }
      if ( this.form.listQuery.data.sceneCode == undefined) {
        this.$notify(notifyInfo({ msg: '无法获取场景code' }));
        return
      }
      this.$confirm('确认删除?', '提示', 
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => 
      { 
        request({
        url: '/api/register/signupDictype/remove',
        method: 'POST',
        data: {
          data: this.form.listQuery.data.sceneCode,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.check')
        }
      })
        .then(response => {
          if (response.status) {
            this.$notify(
              notifyError({
                msg: response.msgText
              })
            )
            this.$message({ type: 'success', message: '删除成功!' }); 
          } else {
            this.sceneList()
          }
        })
        .catch(() => {})
      }).catch(() => { this.$message({ type: 'info', message: '已取消删除' }); });
      
    }
  }
}
</script>
