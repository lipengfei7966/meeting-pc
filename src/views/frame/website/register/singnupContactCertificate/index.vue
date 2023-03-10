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

    <div v-if="isprint" ref="content">
      <div ref="contents" v-for="(item, index) in tableData" :key="index" :id="'content' + index" class="content" :style="`width: ${item.printWight}mm;height: ${item.printHeight}mm`">
        <p v-show="false">
          <vue-qr class="newQR" v-if="item.code" :text="item.code" :size="200" style="width: 100%"> </vue-qr>
        </p>
        <p v-show="false">
          <vue-barcode class="newBar" v-if="item.code" :value="item.code" :width="1" :height="50" style="width: 100%"> </vue-barcode>
        </p>

        <p v-show="false">
          <vue-qr class="newPersonQR" v-if="item.personnelCode" :text="item.personnelCode" :size="200" style="width: 100%"> </vue-qr>
        </p>
        <p v-show="false">
          <vue-barcode class="newPersonBar" v-if="item.personnelCode" :value="item.personnelCode" :width="1" :height="50" style="width: 100%"> </vue-barcode>
        </p>

        <div class="p-event" v-html="item.certificateLayout"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 调用Vue全局过滤器
import Vue from 'vue'
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
import request from '@/utils/frame/base/request'
import Print from 'print-js'
import VueQr from 'vue-qr'
import VueBarcode from 'vue-barcode'
export default {
  name: 'singnupContactCertificate',
  data() {
    return {
      activeName: '2',
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
          // defaultSortString: 'code.desc',
          data: {}
        },
        formData: [
          {
            label: 'website.signupCertificate.query.eventCode',
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
            label: 'website.signupCertificate.query.name',
            prop: 'name',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupCertificate.query.mobile',
            prop: 'mobile',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupCertificate.query.email',
            prop: 'email',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupCertificate.query.department',
            prop: 'department',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupCertificate.query.contactCode',
            prop: 'code',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupCertificate.query.personnelCode',
            prop: 'personnelCode',
            element: 'input-validate',
            attrs: {
              clearable: true
            }
          },
          {
            label: 'website.signupCertificate.query.contactType',
            prop: 'contactType',
            element: 'base-select',
            list: this.$t('datadict.contantType'),
            attrs: {
              clearable: true
            }
          },
          {
            type: 'datetime',
            label: 'website.signupCertificate.query.createDate',
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
              return {
                eventCode: this.form.listQuery.data.eventCode
              }
            }
          },
          {
            name: 'update',
            type: 'dialog',
            i18n: '修改参会人',
            component: () => import('../signupContact/edit.vue'),
            getParam: () => {
              return {
                eventCode: this.form.listQuery.data.eventCode,
                code: this.$refs.bsTable.currentRow[0].code
              }
            },
            validate: () => {
              if (!this.$refs.bsTable.currentRow || this.$refs.bsTable.currentRow.length != 1) {
                return false
              } else {
                return true
              }
            },
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
              label: 'website.signupCertificate.list.name'
            },
            {
              prop: 'mobile',
              label: 'website.signupCertificate.list.mobile'
            },
            {
              prop: 'email',
              label: 'website.signupCertificate.list.email'
            },
            {
              prop: 'department',
              label: 'website.signupCertificate.list.department'
            },
            {
              prop: 'certificateNum',
              label: 'website.signupCertificate.list.certificateNum'
            },
            {
              prop: 'code',
              label: 'website.signupCertificate.list.code'
            },
            {
              prop: 'personnelCode',
              label: 'website.signupCertificate.list.personnelCode'
            },
            {
              prop: 'contactType',
              label: 'website.signupCertificate.list.contactType',
              align: 'center',
              format: {
                dict: this.$t('datadict.contantType')
              }
            },
            {
              prop: 'certificateFlag',
              label: 'website.signupCertificate.list.certificateFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.certificateFlag')
              }
            },
            {
              prop: 'checkFlag',
              label: 'website.signupCertificate.list.checkFlag',
              align: 'center',
              format: {
                dict: this.$t('datadict.checkFlag')
              }
            },
            {
              prop: 'createDate',
              label: 'website.signupCertificate.list.createDate'
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
      tableData: [],
      isprint: false,
      hasBarCode: false,
      certificateContentList: [],
      certificateLayout: ``
    }
  },
  components: {
    VueQr,
    VueBarcode
  },
  mounted() {
    // 获取打印类型数据字典
    // this.onChangeAll()
  },
  methods: {
    onChangeAll(params) {
      //
      this.$refs.bsTable.doRefresh()
      this.meetingdictCode()
    },
    // 获取会议具体证件内容选项
    meetingdictCode() {
      // 获取打印类型数据字典
      request({
        url: '/api/register/signupContactCol/page',
        method: 'POST',
        data: { data: { eventCode: this.form.listQuery.data.eventCode }, isPage: false, funcModule: '获取模块类型', funcOperation: '获取模块类型' }
      }).then((res) => {
        this.certificateContentList = res.data.filter((item) => {
          return item.systmeName != '附件'
        })
        this.certificateContentList.push({ title: '参会人类型', mapCode: 'contactType' })
      })
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
    async print() {
      const styleSheet = `<style>
      @media print { @page { margin: 0;padding: 0;} .noprint { display: none;}}
        body{margin: 0 0;}
        .content {background-color:#e2f4d2;page-break-after:always}
        .draggable {position:absolute;}
        .printItem {width: auto!important;height: auto;margin:0;background-color: #fff;word-wrap: break-word;}
        .p-event { box-sizing: border-box; position: relative;width:100%;height:100% }
        p{margin:0}
        .newBar svg{width:auto;max-width:100%;max-height: 92px;height: 100%;}
        .newPersonBar svg{width:auto;max-width:100%;max-height: 92px;height: 100%;}
        .printItem
      </style>`
      this.tableData = this.$refs.bsTable.currentRow || []
      if (this.tableData.length == 0) {
        this.$message.warning('请选择办证人员')
        return
      }
      let isCanPrint = true
      let msg = ''
      this.isprint = true
      this.tableData.forEach((item, index) => {
        if (item.certificateLayout) {
          this.certificateContentList.forEach((dictItem, dictIndex) => {
            if (item.certificateLayout.indexOf(dictItem.title) >= 0) {
              // debugger
              if(dictItem.title == '参会人类型'){
                debugger
                // 参会人类型 是数据字典, 取到列表 contantType 的值是 value值,需要转换成对应的name
               let mapVal =  Vue.filter('dataDictFormat')(item[dictItem.mapCode], this.$t('datadict.contantType'))
                item.certificateLayout = item.certificateLayout.replace(dictItem.title, mapVal || '')
              }else{
                item.certificateLayout = item.certificateLayout.replace(dictItem.title, item[dictItem.mapCode] || '')
              }
            }
          })
        } else {
          msg = msg + item.name + '未添加证件模板<br/>'
        }
      })
      this.$nextTick(() => {
        let contents = this.$refs.contents
        try{
          contents.forEach((node, nodeindex) => {
            // 替换参会人二维码
            let qrCode = node.getElementsByClassName('qrCode')
            let newQR = node.getElementsByClassName('newQR')[0]
            if (qrCode.length > 0) {
              qrCode[0].parentNode.appendChild(newQR)
              qrCode[0].parentNode.removeChild(qrCode[0])
            }
            // 替换参会人条形码
            let barCode = node.getElementsByClassName('barCode')
            let newBar = node.getElementsByClassName('newBar')[0]
            if (barCode.length > 0) {
              // item.hasBarCode = true;
              barCode[0].parentNode.appendChild(newBar)
              barCode[0].parentNode.removeChild(barCode[0])
            } else {
              newBar.parentNode.removeChild(newBar)
            }

            // 替换人员二维码
            let personQrCode = node.getElementsByClassName('personQrCode')
            let newPersonQR = node.getElementsByClassName('newPersonQR')[0]
            if (personQrCode.length > 0) {
              if(newPersonQR){
                personQrCode[0].parentNode.appendChild(newPersonQR)
                personQrCode[0].parentNode.removeChild(personQrCode[0])
              }else{
                isCanPrint = false
                this.isprint = false
                throw Error();
              }
            }
            // 替换人员条形码
            let personBarCode = node.getElementsByClassName('personBarCode')
            let newPersonBar = node.getElementsByClassName('newPersonBar')[0]
            if (personBarCode.length > 0) {
              // item.hasBarCode = true;
              if(newPersonBar){
                personBarCode[0].parentNode.appendChild(newPersonBar)
                personBarCode[0].parentNode.removeChild(personBarCode[0])
              }else{
                isCanPrint = false
                this.isprint = false
                throw Error();
              }
            } else {
              newPersonBar.parentNode.removeChild(newPersonBar)
            }
          })
          if (msg !== '') {
            this.$message({
              dangerouslyUseHTMLString: true,
              message: msg,
              type: 'warning'
            })
            isCanPrint = false
            this.isprint = false
          }

          if (!isCanPrint && !this.isprint) return

          const response = request({
            url: '/api/register/signupCertificatePrint/save',
            method: 'POST',
            data: {
              data: this.$refs.bsTable.currentRow,
              funcModule: '办证',
              funcOperation: '查询列表'
            }
          }).then((response) => {
            debugger
            console.log(response.data)
            if (response.data.certificateFlag) {
              this.$message.success(response.data.msg)

              const data = this.tableData
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

                this.isprint = false
                setTimeout(function () {
                  newWin.print() //打开打印窗口
                  // newWin.close() //关闭打印窗口
                }, 100)
              })
            } else {
              this.$message.warning(response.data.msg)
              isCanPrint = false
              this.isprint = false
            }
          })
        }catch(e){
          debugger
          this.$message.warning("参会人没有人员编码")
          return
        }
      })
    },
    toSaveRecord() {
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning('请选择会议')
        return
      }
      if (this.$refs.bsTable.currentRow == null) {
        this.$message.warning('请选择参会人')
        return
      }
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
      // console.log(tab.name)
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