<template>
  <div class="bs-new-container app-container">
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

    <bs-table ref="bsTable" :mainData="mainData" :mainDataTabs="mainData.tabs"></bs-table>
  </div>
</template>

<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'
// 日期格式化方法
import { notifyInfo } from '@/utils/frame/base/notifyParams'
export default {
  name: 'attendeeSignin',
  data() {
    return {
      activeName: '0',
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
            label: 'website.signin.query.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO', // 统一基础档案组件，传值data区分,
              isDefault: true,
              clearable: false
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
          },
          {
            label: 'website.signin.query.name',
            prop: 'name',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signin.query.mobile',
            prop: 'mobile',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signin.query.email',
            prop: 'email',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signin.query.department',
            prop: 'department',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signin.query.contactCode',
            prop: 'code',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signin.query.personnelCode',
            prop: 'personnelCode',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signin.query.contactType',
            prop: 'contactType',
            element: 'base-select',
            attrs: {
              clearable: true
            },
            list: this.$t('datadict.contantType')
          },
          {
            label: 'website.signin.query.certificateFlag',
            prop: 'certificateFlag',
            element: 'base-select',
            attrs: {
              clearable: true
            },
            list: [
              { label: '已办证', value: 1 },
              { label: '未办证', value: 0 }
            ]
          },
          {
            type: 'datetime',
            label: 'website.signin.query.signupData',
            prop: 'signupData',
            element: 'input-validate',
            attrs: {
              clearable: true,
              format: 'yyyy-MM-dd',
              pickerOptions: this.$toolUtil.getDefaultPickerOptions()
            }
          }
        ]
      },
      mainData: {
        isTabBar: true,
        tabs: [
          { name: '2', label: '全部' },
          { name: '0', label: '未签到' },
          { name: '1', label: '已签到' }
        ],
        api: {
          search: '/api/register/signupContactSceneRel/page',
          doDelete: '/api/register/signupContactSceneRel/remove'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            i18n: 'attendee.btn.addAttendee',
            event: this.toAddSetting
          },
          {
            name: 'update',
            type: 'dialog',
            i18n: 'attendee.btn.changeAttendee',
            event: this.toUpdateSetting
          },
          {
            name: 'add',
            type: 'dialog',
            i18n: 'attendee.btn.signIn',
            msg: 'attendee.chooseData',
            event: this.signin,
            getParam: () => {
              return { eventCode: this.form.listQuery.data.eventCode, contactCode: this.$refs.bsTable.currentRow.code }
            }
          },
          {
            name: 'record',
            type: 'route',
            i18n: 'attendee.btn.signInSet',
            event: this.doSet
          },
          {
            name: 'record',
            type: 'route',
            i18n: 'attendee.btn.signInHistory',
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
              prop: 'personnelCode',
              label: 'website.signupContact.list.personnelCode'
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
  mounted() {},
  methods: {
    toAddSetting() {
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning(this.$t('attendee.chooseMeetMsg'))
        return
      }
      this.$router.push({
        name: 'attendeeEdit',
        params: {
          back: 'attendeeSignin',
          data: this.form.listQuery.data.eventCode,
          type: 'add'
        }
      })
    },
    toUpdateSetting() {
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning(this.$t('attendee.chooseMeetMsg'))
        return
      }
      if (!this.$refs.bsTable.currentRow || this.$refs.bsTable.currentRow.length != 1) {
        this.$message.warning(this.$t('attendee.chooseData'))
        return
      }

      this.$router.push({
        name: 'attendeeEdit',
        params: {
          back: 'attendeeSignin',
          data: this.form.listQuery.data.eventCode,
          id: this.$refs.bsTable.currentRow[0].id,
          type: 'update'
        }
      })
    },

    onChangeAll(params) {
      this.$refs.bsTable.doRefresh()
    },
    toRecord() {
      if (!this.form.listQuery.data.eventCode || this.form.listQuery.data.eventCode === '') {
        this.$message.warning(this.$t('attendee.chooseMeetMsg'))
        return
      }
      this.$router.push({
        name: 'attendeeSigninRecord',
        params: {
          back: 'attendeeSignin',
          data: this.form.listQuery.data.eventCode
        }
      })
    },
    doSet() {
      if (!this.form.listQuery.data.eventCode || this.form.listQuery.data.eventCode === '') {
        this.$message.warning(this.$t('attendee.chooseMeetMsg'))
        return
      }
      this.$router.push({
        name: 'attendeeSigninSet',
        params: {
          back: 'attendeeSignin',
          data: this.form.listQuery.data.eventCode
        }
      })
    },
    signin(buttonInfo) {
      if (!this.form.listQuery.data.eventCode || this.form.listQuery.data.eventCode === '' || this.$refs.bsTable.currentRow == null) {
        this.$notify(notifyInfo({ msg: this.$t('attendee.chooseData') }))
      }
      request({
        url: '/api/register/signupContactSceneRel/listSceneSelect',
        method: 'POST',
        data: {
          data: {
            eventCode: this.form.listQuery.data.eventCode,
            contactCode: this.$refs.bsTable.currentRow.code
          },
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.check')
        }
      }).then(response => {
        if (response.status) {
          if (response.data.length == 0) {
            request({
              url: '/api/register/signupSignin/save',
              method: 'POST',
              data: {
                data: {
                  eventCode: this.form.listQuery.data.eventCode,
                  contactCode: this.$refs.bsTable.currentRow.code,
                  sceneCode: '',
                  signinWay: 'pc'
                },
                funcModule: this.$t('route.' + this.$route.meta.title),
                funcOperation: this.$t('biz.btn.check')
              }
            }).then(result => {
              if (result.status) {
                this.$refs.bsTable.getList({ name: 'search' })
                this.$notify(notifyInfo({ msg: this.$t('attendee.signInSuccess') }))
              } else {
                this.$notify(notifyInfo({ msg: this.$t('attendee.signInError') }))
              }
            })
          } else {
            //this.mainData.topBar[2].component=import('../signupSignin/signin.vue');
            // 注册组件 '../signupSignin/signin.vue'
            Vue.component('view-form-table', () => import('../signin/signin.vue'))
            if (buttonInfo.getParam) {
              this.$refs.bsTable.param = buttonInfo.getParam(this.currentRow)
            }
            this.$refs.bsTable.opType = 'add'
            this.$refs.bsTable.opMode = buttonInfo.type
            this.$refs.bsTable.dialogDetailVisible = true
          }
        }
      })
    },

    handleTabClick(tab, event) {
      this.currentRow = null
      this.form.listQuery.data.signFlag = tab.name
      this.$refs.bsTable.getList({ name: 'search' })
    }
  }
}
</script>
