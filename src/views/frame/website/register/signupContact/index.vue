<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref="bsTable" :mainData="mainData" @fileCallback="fileCallback"></bs-table>
  </div>
</template>

<script>
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
import request from '@/utils/frame/base/request'
import axios from 'axios'
export default {
  name: 'signupContact',
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
            label: 'website.signupContact.query.name',
            prop: 'name',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupContact.query.mobile',
            prop: 'mobile',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupContact.query.email',
            prop: 'email',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupContact.query.department',
            prop: 'department',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupContact.query.code',
            prop: 'code',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupContact.query.personnelCode',
            prop: 'personnelCode',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupContact.query.contactType',
            prop: 'contactType',
            element: 'base-select',
            list: this.$t('datadict.contantType'),
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupContact.query.certificateFlag',
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
            label: 'website.signupContact.query.signFlag',
            prop: 'signFlag',
            element: 'base-select',
            attrs: {
              clearable: true
            },
            list: [
              { label: '已签到', value: 1 },
              { label: '未签到', value: 0 }
            ]
          },
          {
            label: 'website.signupContact.query.signNum',
            prop: 'signNum',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            type: 'datetime',
            label: 'website.signupContact.query.createDate',
            prop: 'createDate',
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
        api: {
          search: '/api/register/signupContact/page',
          doDelete: '/api/register/signupContact/remove',
          export: '/api/register/signupContactCol/exportModel'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return {
                eventCode: this.form.listQuery.data.eventCode
              }
            }
          },
          {
            name: 'update',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return {
                eventCode: this.form.listQuery.data.eventCode,
                code: this.$refs.bsTable.currentRow.code
              }
            }
          },
          {
            name: 'view',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return {
                eventCode: this.form.listQuery.data.eventCode,
                code: this.$refs.bsTable.currentRow.code
              }
            }
          },
          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.code
            }
          },
          {
            name: 'export',
            i18n: 'biz.btn.downloadTemplate',
            event: this.exportExcel
          },
          {
            name: 'upload',
            iconName: '线性-导入',
            i18n: 'biz.btn.import',
            atrrs: {
              uploadUrl: process.env.BASE_API + '/api/register/signupContactCol/exportImport', // 文件上传url
              showFileList: false, // 是否展示上传文件，默认false
              accept: '*', // 初始化文件选择类型，默认*
              multiple: false, // 是否可选择多文件，默认false
              disabled: false, // 是否不可操作，默认false
              notifyFlag: false, // 是否弹出通知，默认true
              paramData: {} // 参数，默认{}
            }
          },
          {
            name: 'export'
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
    onChangeAll(params) {
      this.mainData.topBar[5].atrrs.paramData = {
        eventCode: this.form.listQuery.data.eventCode
      }
      this.$refs.bsTable.doRefresh()
    },
    exportExcel() {
      request({
        url: '/api/register/signupContactCol/verifyInitialize',
        method: 'POST',
        data: {
          data: this.form.listQuery.data.eventCode,
          funcModule: '模板导出',
          funcOperation: '根据会议code校验会议表单是否初始化'
        }
      })
        .then(response => {
          if (response.status) {
            this.exportExcel1()
          } else {
            this.$notify(notifyError({ msg: response.msgText }))
          }
        })
        .catch(() => {
          this.$refs.bsTable.doRefresh()
        })
    },
    exportExcel1() {
      axios({
        method: 'post',
        url: process.env.BASE_API + this.mainData.api.export,
        data: {
          data: this.form.listQuery.data.eventCode,
          funcModule: '参会人管理',
          funcOperation: '模板导出'
        },
        headers: {
          Authorization: 'Bearer ' + this.$store.getters.token
          // lang: storage.get('language') || 'zh',
          // module: session.get('auditModule') || ''
        },
        responseType: 'blob'
      })
        .then(response => {
          if (!response.data) {
          } else {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', '参会人导入模板.xlsx')
            document.body.appendChild(link)
            link.click()
            link.remove()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    fileCallback(data) {
      debugger
      this.$notify.success({
        message: data,
        position: 'bottom-right'
      })
    }
  }
}
</script>
