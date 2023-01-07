<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <bs-table ref="bsTable" :mainData="mainData" @fileCallback="fileCallback"></bs-table>
  </div>
</template>

<script>
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
import request from '@/utils/frame/base/request'
import axios from 'axios'
export default {
  name: 'attendeeManage',
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
          export: '/api/register/signupContactCol/exportModel',
          set: '/api/register/signupContact/resetPwd'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            name: 'add',
            type: 'route',
            event: this.toAddSetting
          },
          {
            name: 'update',
            type: 'route',
            event: this.toUpdateSetting
          },
          {
            name: 'view',
            type: 'route',
            event: this.toViewSetting
          },
          {
            name: 'remove',
            getParam: () => {
              return this.$refs.bsTable.currentRow.id
            }
          },
          {
            name: 'set',
            permitName: ['resetPassword'],
            i18n: 'biz.btn.resetPwd',
            getParam: () => {
              return this.$refs.bsTable.currentRow.id
            }
          },
          {
            name: 'set',
            permitName: ['audit'],
            url: '/api/register/signupContact/auditing',
            successMsgInfo: this.$t('attendee.AuditApprovedMsg'),
            i18n: this.$t('attendee.ApprovedMsg'),
            getParam: () => {
              return {
                id: this.$refs.bsTable.currentRow.id,
                checkFlag: '1'
              }
            }
          },
          {
            name: 'set',
            permitName: ['audit'],
            url: '/api/register/signupContact/auditing',
            successMsgInfo: this.$t('attendee.AuditApprovedMsg'),
            i18n: this.$t('attendee.FailedApprovedMsg'),
            getParam: () => {
              return {
                id: this.$refs.bsTable.currentRow.id,
                checkFlag: '0'
              }
            }
          },
          {
            name: 'set',
            permitName: ['unlock'],
            i18n: 'biz.btn.unlock',
            url: '/api/register/signupContact/unlock',
            successMsgInfo: this.$t('attendee.UnlockSucess'),
            getParam: () => {
              return this.$refs.bsTable.currentRow.id
            }
          },
          {
            name: 'export',
            i18n: 'biz.btn.downloadTemplate',
            event: this.exportExcel
          },
          {
            name: 'upload',
            iconName: 'import',
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
              prop: 'code',
              label: 'website.signupContact.list.code',
              width: 120
            },
            {
              prop: 'personnelCode',
              label: 'website.signupContact.list.personnelCode',
              width: 120
            },
            {
              prop: 'contactType',
              label: 'website.signupContact.list.contactType',
              align: 'center',
              format: {
                dict: this.$t('datadict.contantType')
              },
              width: 120
            },
            {
              prop: 'name',
              label: 'website.signupContact.list.name',
              width: 120
            },
            {
              prop: 'mobile',
              label: 'website.signupContact.list.mobile',
              width: 150
            },

            {
              prop: 'checkFlag',
              label: 'website.signupContact.list.checkFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.checkFlag')
              },
              width: 120
            },
            {
              prop: 'email',
              label: 'website.signupContact.list.email',
              width: 120
            },
            // {
            //   prop: 'surname',
            //   label: 'website.signupContact.list.surname'
            // },
            // {
            //   prop: 'ming',
            //   label: 'website.signupContact.list.ming'
            // },
            {
              prop: 'sex',
              label: 'website.signupContact.list.sex',
              width: 120
            },
            {
              prop: 'certificateType',
              label: 'website.signupContact.list.certificateType',
              format: {
                dict: this.$t('datadict.certificateType')
              },
              width: 120
            },
            {
              prop: 'certificate',
              label: 'website.signupContact.list.certificate',
              width: 120
            },
            // {
            //   prop: 'photo',
            //   label: 'website.signupContact.list.photo',
            //   width: 120
            // },
            {
              prop: 'nations',
              label: 'website.signupContact.list.nations',
              format: {
                dict: this.$t('datadict.countryCode')
              },
              width: 120
            },
            {
              prop: 'province',
              label: 'website.signupContact.list.province',
              width: 120
            },
            {
              prop: 'city',
              label: 'website.signupContact.list.city',
              width: 120
            },
            {
              prop: 'county',
              label: 'website.signupContact.list.county',
              width: 120
            },
            {
              prop: 'fullAddress',
              label: 'website.signupContact.list.fullAddress',
              width: 120
            },
            {
              prop: 'postcode',
              label: 'website.signupContact.list.postcode',
              width: 120
            },
            // {
            //   prop: 'mobileIntCode',
            //   label: 'website.signupContact.list.mobileIntCode'
            // },
            // {
            //   prop: 'spareMobileIntXode',
            //   label: 'website.signupContact.list.spareMobileIntXode'
            // },
            {
              prop: 'spareMobile',
              label: 'website.signupContact.list.spareMobile',
              width: 120
            },
            // {
            //   prop: 'phoneIntCode',
            //   label: 'website.signupContact.list.phoneIntCode'
            // },
            // {
            //   prop: 'phoneAreaCode',
            //   label: 'website.signupContact.list.phoneAreaCode'
            // },
            {
              prop: 'phone',
              label: 'website.signupContact.list.phone',
              width: 120
            },
            // {
            //   prop: 'phoneRunNumber',
            //   label: 'website.signupContact.list.phoneRunNumber'
            // },
            // {
            //   prop: 'faxIntCode',
            //   label: 'website.signupContact.list.faxIntCode'
            // },
            // {
            //   prop: 'faxAreaCode',
            //   label: 'website.signupContact.list.faxAreaCode'
            // },
            {
              prop: 'fax',
              label: 'website.signupContact.list.fax',
              width: 120
            },
            // {
            //   prop: 'faxRunNumber',
            //   label: 'website.signupContact.list.faxRunNumber'
            // },
            {
              prop: 'spareEmail',
              label: 'website.signupContact.list.spareEmail',
              width: 120
            },
            {
              prop: 'wechat',
              label: 'website.signupContact.list.wechat',
              width: 120
            },
            {
              prop: 'qq',
              label: 'website.signupContact.list.qq',
              width: 120
            },
            {
              prop: 'company',
              label: 'website.signupContact.list.company',
              width: 120
            },
            {
              prop: 'department',
              label: 'website.signupContact.list.department',
              width: 120
            },
            {
              prop: 'position',
              label: 'website.signupContact.list.position',
              width: 120
            },
            {
              prop: 'certificateFlag',
              label: 'website.signupContact.list.certificateFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.certificateFlag')
              },
              width: 120
            },
            {
              prop: 'signFlag',
              label: 'website.signupContact.list.signFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.signFlag')
              },
              width: 120
            },
            {
              prop: 'signNum',
              label: 'website.signupContact.list.signNum',
              width: 120
            },
            {
              prop: 'createDate',
              label: 'website.signupContact.list.createDate',
              width: 140
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
      this.mainData.topBar.forEach((item) => {
        if (item.name === 'upload') {
          item.atrrs.paramData = {
            eventCode: this.form.listQuery.data.eventCode
          }
        }
      })

      this.$refs.bsTable.doRefresh()
    },
    exportExcel() {
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
        .then((response) => {
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
        .catch((error) => {
          console.log(error)
        })
    },
    fileCallback(data) {
      this.$notify.success({
        message: data,
        position: 'bottom-right'
      })
    },
    toAddSetting() {
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning(this.$t('attendee.chooseMeetMsg'))
        return
      }
      this.$router.push({
        name: 'attendeeEdit',
        params: {
          back: 'attendeeManage',
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
      if (!this.$refs.bsTable.currentRow) {
        this.$message.warning(this.$t('attendee.chooseAttendeeMsg'))
        return
      }

      this.$router.push({
        name: 'attendeeEdit',
        params: {
          back: 'attendeeManage',
          data: this.form.listQuery.data.eventCode,
          id: this.$refs.bsTable.currentRow.id,
          type: 'update'
        }
      })
    },
    toViewSetting() {
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning(this.$t('attendee.chooseMeetMsg'))
        return
      }

      if (!this.$refs.bsTable.currentRow) {
        this.$message.warning(this.$t('attendee.chooseAttendeeMsg'))
        return
      }
      this.$router.push({
        name: 'attendeeEdit',
        params: {
          back: 'attendeeManage',
          data: this.form.listQuery.data.eventCode,
          id: this.$refs.bsTable.currentRow.id,
          type: 'view'
        }
      })
    }
  }
}
</script>
