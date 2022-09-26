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

    <div>

      <div v-for="(item,index) in tableData" :key="index" :id="'content'+ index" class="content">
        <div class="p-event" v-html="item.certificateLayout"></div>
      </div>

    </div>

  </div>
</template>

<script>
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
import request from '@/utils/frame/base/request'
import Print from 'print-js'
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
          data: {}
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
              return this.$refs.bsTable.currentRow.code
            }
          },
          {
            msg: '请选择一条数据'
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
            event: this.print
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
      },
      tableData:[],
      certificateContentList:[],
      certificateLayout: `
        <div data-v-6e21c36e=\"\" class=\"draggable resizable vdr\" left=\"0\" style=\"transform: translate(99px, 136px); width: 176px; height: 43px; z-index: auto; user-select: auto;\">
          <div class=\"handle handle-tl\" style=\"display: none;\"></div>
          <div class=\"handle handle-tm\" style=\"display: none;\"></div>
          <div class=\"handle handle-tr\" style=\"display: none;\"></div>
          <div class=\"handle handle-mr\" style=\"display: none;\"></div>
          <div class=\"handle handle-br\" style=\"display: none;\"></div>
          <div class=\"handle handle-bm\" style=\"display: none;\"></div>
          <div class=\"handle handle-bl\" style=\"display: none;\"></div>
          <div class=\"handle handle-ml\" style=\"display: none;\"></div>
          <p data-v-6e21c36e=\"\" class=\"printItem\" style=\"font-size: 34px; color: rgb(0, 0, 0); line-height: 34px; text-align: center;\">\n              单位名称\n              </p>
        </div>
        <div data-v-6e21c36e=\"\" class=\"draggable resizable vdr\" left=\"0\" style=\"transform: translate(101px, 59px); width: 174px; height: 43px; z-index: auto; user-select: auto;\">
          <div class=\"handle handle-tl\" style=\"display: none;\"></div>
          <div class=\"handle handle-tm\" style=\"display: none;\"></div>
          <div class=\"handle handle-tr\" style=\"display: none;\"></div>
          <div class=\"handle handle-mr\" style=\"display: none;\"></div>
          <div class=\"handle handle-br\" style=\"display: none;\"></div>
          <div class=\"handle handle-bm\" style=\"display: none;\"></div>
          <div class=\"handle handle-bl\" style=\"display: none;\"></div>
          <div class=\"handle handle-ml\" style=\"display: none;\"></div>
          <p data-v-6e21c36e=\"\" class=\"printItem\" style=\"font-size: 34px; color: rgb(0, 0, 0); line-height: 34px; text-align: center;\">\n              姓名\n              </p>
        </div>
        <div data-v-6e21c36e=\"\" class=\"draggable resizable vdr\" left=\"0\" style=\"transform: translate(105px, 218px); width: 174px; height: 43px; z-index: auto; user-select: auto;\">
          <div class=\"handle handle-tl\" style=\"display: none;\"></div>
          <div class=\"handle handle-tm\" style=\"display: none;\"></div>
          <div class=\"handle handle-tr\" style=\"display: none;\"></div>
          <div class=\"handle handle-mr\" style=\"display: none;\"></div>
          <div class=\"handle handle-br\" style=\"display: none;\"></div>
          <div class=\"handle handle-bm\" style=\"display: none;\"></div>
          <div class=\"handle handle-bl\" style=\"display: none;\"></div>
          <div class=\"handle handle-ml\" style=\"display: none;\"></div>
          <p data-v-6e21c36e=\"\" class=\"printItem\" style=\"font-size: 34px; color: rgb(0, 0, 0); line-height: 34px; text-align: center;\">\n              手机\n              </p>
        </div>
        <div data-v-6e21c36e=\"\" class=\"draggable resizable vdr\" left=\"0\" style=\"transform: translate(106px, 295px); width: 166px; height: 43px; z-index: auto; user-select: auto;\">
          <div class=\"handle handle-tl\" style=\"display: none;\"></div>
          <div class=\"handle handle-tm\" style=\"display: none;\"></div>
          <div class=\"handle handle-tr\" style=\"display: none;\"></div>
          <div class=\"handle handle-mr\" style=\"display: none;\"></div>
          <div class=\"handle handle-br\" style=\"display: none;\"></div>
          <div class=\"handle handle-bm\" style=\"display: none;\"></div>
          <div class=\"handle handle-bl\" style=\"display: none;\"></div>
          <div class=\"handle handle-ml\" style=\"display: none;\"></div>
           <p data-v-6e21c36e=\"\" class=\"printItem\" style=\"font-size: 34px; color: rgb(0, 0, 0); line-height: 34px; text-align: center;\">\n              证件号码\n              </p>
        </div>`
    }
  },
  mounted() {
    //
    // 获取打印类型数据字典
    request({
      url: '/api/sys/dict/listItem',
      method: 'POST',
      data: { data: 'CERTIFICATE_CONTENT', funcModule: '获取模块类型', funcOperation: '获取模块类型' }
    }).then(res => {
      //
      this.certificateContentList = res.data
    })
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
    //给div添加样式,调出打印界面
    print() {
      const styleSheet = `<style>
      @media print { @page {size:210mm 230mm!important; margin: 0;padding: 0;} .noprint { display: none;}}
        body{margin: 0 0;display:flex;flex-wrap:wrap;justify-content: space-around; width:210mm;height:297mm}
        .content {width: 80mm;height: 118mm;margin:5mm 5mm;background-color:#e2f4d2;page-break-after:always}
        .draggable {position:absolute}
        .printItem {width: 100%;height: auto;margin:0;background-color: #fff;word-wrap: break-word;}
        .p-event { border: 1px solid red; box-sizing: border-box; position: relative; }
      </style>`
      this.tableData = this.$refs.bsTable.currentRow || []
      if(this.tableData.length == 0){
        this.$message.warning('请选择办证人员')
        return
      }
      let isCanPrint = true
      this.tableData.forEach(item => {
        // item.certificateLayout = this.certificateLayout
        if(item.certificateLayout){
          item.certificateLayout = item.certificateLayout.replace('姓名',item.name)
          item.certificateLayout = item.certificateLayout.replace('单位名称',item.department)
          item.certificateLayout = item.certificateLayout.replace('手机',item.mobile)
          item.certificateLayout = item.certificateLayout.replace('邮箱',item.email)
          item.certificateLayout = item.certificateLayout.replace('参会人编码',item.code)
          item.certificateLayout = item.certificateLayout.replace('职务','')
          item.certificateLayout = item.certificateLayout.replace('地址','')
        }else{
          this.$message.warning(`${item.name} 未添加证件模板`)
          isCanPrint = false
        }
        
      })
      if (!isCanPrint) return
      const that = this
      const data = this.tableData
      const params = {}
      console.log('this.printDoubleData: ', this.$refs.bsTable.tableData)
      //打印
      var newWin = window.open('') //新打开一个空窗口
      this.$nextTick(() => {
        data.map((item, i) => {
          var imageToPrint = document.getElementById('content' + i) //获取需要打印的内容
          // console.log('imageToPrint: ', imageToPrint)
          newWin.document.write(imageToPrint.outerHTML) //将需要打印的内容添加进新的窗口
        })
        newWin.document.head.innerHTML = styleSheet //给打印的内容加上样式
        newWin.document.close() //在IE浏览器中使用必须添加这一句
        newWin.focus() //在IE浏览器中使用必须添加这一句
        if (data.length == 1) {
            params.name = data[0].name
            params.code = data[0].code
            params.mobile = data[0].mobile
            params.issuingResult = 1
        } else if (data.length > 1) {
            params.issuingResult = 1
            const certificatePrintList = []
            data.map((item) => {
                certificatePrintList.push({ name: item.name, code: item.code, mobile: item.mobile })
            })
            params.certificatePrintList = certificatePrintList
        }

        setTimeout(function () {
            newWin.print() //打开打印窗口
            // newWin.close() //关闭打印窗口s
            // issueUpdate(params).then(() => {
            //     that.fetch()
            //     that.$message.success('打印结束')
            // })
        }, 100)
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
      console.log(this.$refs.bsTable.tableData)
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

<style scoped>
.p-event {
  border: 1px solid red;
  box-sizing: border-box;
  height: 500px;
  width: 100%;
  position: relative;
}
.draggable {
  transform: translateY(0);
}
</style>