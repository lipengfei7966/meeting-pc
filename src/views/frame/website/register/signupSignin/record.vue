<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <!-- table必须包上v-if清除缓存 防止切换tab速度过慢 -->
    <bs-table ref="bsTable" :mainData="mainData"></bs-table>
  </div>
</template>

<script>
import excelUtil from '@/utils/frame/base/excelUtil.js'
import signinTemplate from '@/assets/frame/excel/signinTemplate.xlsx'

export default {
  name: 'signupSigninRecord',
  data() {
    return {
      colList: [
        {
          title: '导入',
          colList: [
            {
              code: 'eventCode',
              name: '会议名称',
              dictCode: null,
              funcName: null,
              dict: null
            }
          ]
        },
        {
          title: '导入',
          colList: [
            {
              code: 'contactCode',
              name: '参会人编码',
              dictCode: null,
              funcName: null,
              dict: null
            }
          ]
        },
        {
          title: '导入',
          colList: [
            {
              code: 'sceneName',
              name: '场景名称',
              dictCode: null,
              funcName: null,
              dict: null
            }
          ]
        },
        {
          title: '导入',
          colList: [
            {
              code: 'signinWay',
              name: '签到方式',
              dictCode: null,
              funcName: null,
              dict: null
            }
          ]
        },
        {
          title: '导入',
          colList: [
            {
              code: 'signinDate',
              name: '签到时间',
              dictCode: null,
              funcName: null,
              dict: null
            }
          ]
        }
      ],
      tempExcelPath: signinTemplate,
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
          defaultSortString: 'signinDate.desc',
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
          },
          {
            label: '场景',
            prop: 'sceneCode',
            element: 'base-select',
            //default:'',
            attrs: {
              clearable: false,
              data: 'DICTYPE',
              params: {
                type: '2',
                eventCode: this.$route.params.data
              }
            },
            event: {
              changeAll: this.onChangeAll
            }
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
            type: 'date',
            label: 'website.signin.query.signinDate',
            prop: 'signinDate',
            attrs: {
              clearable: true,
              format: 'yyyy-MM-dd',
              'value-format': 'yyyy-MM-dd'
            }
          },
          {
            label: 'website.signin.query.signinWay',
            prop: 'signinWay',
            element: 'base-select',
            attrs: {
              clearable: true
            },
            list: [
              { label: 'pc签到', value: 'pc' },
              { label: '扫码签到', value: 'scan' }
            ]
          },
          {
            type: 'date',
            label: 'website.signin.query.signupData',
            prop: 'signupData',
            attrs: {
              clearable: true,
              format: 'yyyy-MM-dd',
              'value-format': 'yyyy-MM-dd'
            }
          }
        ]
      },

      mainData: {
        api: {
          search: '/api/register/signupSignin/listSigninRecord',
          doDelete: '/api/register/signupSignin/remove'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            iconName: '导入',
            i18n: 'biz.btn.import',
            permitName: ['import'],
            event: this.Excel,
            showLoading: true
          },
          {
            iconName: '下载',
            i18n: 'biz.btn.downloadTemplate',
            permitName: ['downloadTemplate'],
            $refs: this.$refs,
            event: this.download
          },
          {
            name: 'export'
          }
        ],
        isColset: true,
        table: {
          cols: [
            {
              prop: 'name',
              align: 'center',
              label: 'website.signupSignin.list.name'
            },
            {
              prop: 'mobile',
              align: 'center',
              label: 'website.signupSignin.list.mobile'
            },
            {
              prop: 'email',
              align: 'center',
              label: 'website.signupSignin.list.email'
            },
            {
              prop: 'department',
              align: 'center',
              label: 'website.signupSignin.list.department'
            },
            {
              prop: 'contactCode',
              align: 'center',
              label: 'website.signupSignin.list.contactCode'
            },
            {
              prop: 'personnelCode',
              align: 'center',
              label: 'website.signupSignin.list.personnelCode'
            },
            {
              prop: 'contactType',
              align: 'center',
              label: 'website.signupSignin.list.contactType',
              format: {
                dict: this.$t('datadict.contantType')
              }
            },
            {
              prop: 'sceneName',
              align: 'center',
              label: 'website.signupSignin.list.sceneName'
            },
            {
              prop: 'signinWay',
              align: 'center',
              label: 'website.signupSignin.list.signinWay',
              format: {
                dict: this.$t('datadict.singWay')
              }
            },
            {
              prop: 'signinDate',
              align: 'center',
              label: 'website.signupSignin.list.signinDate'
            },
            {
              prop: 'signupData',
              align: 'center',
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
    // debugger
    // 不设置表格高度
    this.$refs.bsTable.isHeight = false
    // 设置行高为38
    this.$refs.bsTable.rowHeight = 38
  },
  methods: {
    download() {
      const url = this.tempExcelPath
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '签到记录导入模板.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    Load(result) {
      this.$refs.bsTable.getList({ name: 'search' })
      let str = result.join(' <br/> ')
      this.$message({
        dangerouslyUseHTMLString: true,
        message: str,
        type: 'warning'
      })
    },
    Excel() {
      excelUtil.uploadTemplateData(this, '/api/register/signupSignin/uploadExcel', '签到记录导入', this.colList, this.Load)
    }
  }
}
</script>
