<template>
  <div class="bs-new-container app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <template v-if="mainData.tabs" :style="{ width: clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto' }">
      <el-tabs v-model="activeName" type="border-card" style="margin-top: 3px" @tab-click="handleTabClick">
        <template v-for="tab in mainData.tabs">
          <el-tab-pane :key="tab.name" :index="tab.name" :name="tab.name">
            <span slot="label">{{ $t(tab.label) }} </span>
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
import excelUtil from '@/utils/frame/base/excelUtil.js'
import certificatePrintTemplate from '@/assets/frame/excel/certificatePrintTemplate.xlsx'
export default {
  name: 'singnupContactCertificateRecord',
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
              code: 'code',
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
              code: 'certificateType',
              name: '证件类型',
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
              code: 'updateDate',
              name: '办证时间',
              dictCode: null,
              funcName: null,
              dict: null
            }
          ]
        }
      ],
      tempExcelPath: certificatePrintTemplate,
      activeName: '0001',
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
            label: 'website.signupCertificatePrint.query.eventCode',
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
            label: 'website.signupCertificatePrint.query.name',
            prop: 'name',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupCertificatePrint.query.mobile',
            prop: 'mobile',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupCertificatePrint.query.email',
            prop: 'email',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupCertificatePrint.query.department',
            prop: 'department',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupCertificatePrint.query.contactCode',
            prop: 'code',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupCertificatePrint.query.personnelCode',
            prop: 'personnelCode',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupCertificatePrint.query.contactType',
            prop: 'contactType',
            element: 'base-select',
            list: this.$t('datadict.contantType'),
            attrs: {
              clearable: true
            }
          },
          {
            type: 'datetime',
            label: 'website.signupCertificatePrint.query.certificateTime',
            prop: 'certificateTime',
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
          },
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
              label: 'website.signupCertificatePrint.list.name'
            },
            {
              prop: 'mobile',
              label: 'website.signupCertificatePrint.list.mobile'
            },
            {
              prop: 'email',
              label: 'website.signupCertificatePrint.list.email'
            },
            {
              prop: 'department',
              label: 'website.signupCertificatePrint.list.department'
            },
            {
              prop: 'code',
              label: 'website.signupCertificatePrint.list.code'
            },
            {
              prop: 'personnelCode',
              label: 'website.signupCertificatePrint.list.personnelCode'
            },
            {
              prop: 'contactType',
              label: 'website.signupCertificatePrint.list.contactType',
              align: 'center',
              format: {
                dict: this.$t('datadict.contantType')
              }
            },
            {
              prop: 'certificateFlag',
              label: 'website.signupCertificatePrint.list.certificateFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.certificateFlag')
              }
            },
            {
              prop: 'checkFlag',
              label: 'website.signupCertificatePrint.list.checkFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.checkFlag')
              }
            },
            {
              prop: 'certificateTime',
              label: 'website.signupCertificatePrint.list.createDate'
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
    request({
      url: '/api/dd/selectData/list',
      method: 'POST',
      data: {
        data: {
          queryParams: { type: '1', eventCode: this.$route.params.data },
          type: 'DICTYPE'
        },
        funcModule: '会议字典',
        funcOperation: '查询列表'
      }
    }).then((response) => {
      response.data.forEach((element) => {
        this.mainData.tabs.push({
          label: element.name,
          name: element.code
        })
        this.handleTabClick(this.mainData.tabs[0])
      })
    })
  },
  methods: {
    download() {
      const url = this.tempExcelPath
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '办证记录导入模板.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    Load() {
      this.$refs.bsTable.getList({ name: 'search' })
    },
    Excel() {
      excelUtil.uploadTemplateData(this, '/api/register/signupCertificatePrint/uploadExcel', '办证记录导入', this.colList, this.Load)
    },
    onChangeAll(params) {
      this.$refs.bsTable.doRefresh()
    },
    handleTabClick(tab) {
      this.currentRow = null
      this.form.listQuery.data.certificateType = tab.name
      this.$refs.bsTable.getList({ name: 'search' })
    }
  }
}
</script>
