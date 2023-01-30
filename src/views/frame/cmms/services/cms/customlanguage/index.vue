<template>
  <div class="containerBox">
    <div class="bs-new-container app-container">
      <!-- 上边查询 -->
      <bs-form ref="bsForm" :form="form"></bs-form>
      <!-- 模块Tabs -->
      <template v-if="mainData.tabs" :style="{ width: clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto' }">
        <el-tabs v-model="activeName" type="border-card" style="margin-top: 3px" @tab-click="handleTabClick">
          <el-tab-pane v-for="tab in mainData.tabs" :key="tab.id" :label="$t(`website.customlanguage.tab.${tab.label}`)" :name="tab.name">
            <!--  -->
            <!-- 简单文本---=---富文本 -->
            <!-- <template v-if="mainData.sonTabs" :style="{ width: clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto' }">
              <el-tabs v-model="sonActiveName" type="border-card" style="margin-top: 3px" @tab-click="texHandleTabClick">
                <el-tab-pane v-for="tab in mainData.sonTabs" :key="tab.id" :label="tab.label" :name="tab.name">
                </el-tab-pane>
              </el-tabs>
            </template> -->
            <!--  -->
          </el-tab-pane>
        </el-tabs>
      </template>
      <!-- 操作按钮 -->
      <div class="options">
        <el-button v-if="multiLanguage.length>0" type="primary" v-show="batchShow" @click="batchClick">{{ $t('website.customlanguage.btn.batchEditing') }}</el-button>
        <el-button v-if="multiLanguage.length>0" @click="batchCancel" v-show="!batchShow">{{ $t('website.customlanguage.btn.cancel') }}</el-button>
        <el-button v-if="multiLanguage.length>0" @click="batchSave" type="primary" v-show="!batchShow">{{ $t('website.customlanguage.btn.save') }}</el-button>
        <el-button type="primary" @click="exportExcel">{{ $t('website.customlanguage.btn.export') }}</el-button>
      </div>
      <!-- 表格数据 -->
      <bs-table ref='bsTable' :mainData='mainData' :mainDataTabs="mainData.tabs" @initCallback='initCallback' v-if="date">
        <template slot="operation" slot-scope="scope">
          <el-button type="text" v-if="!scope.row.isEdit && multiLanguage.length>0" @click="handleEditClick(scope.row)">{{ $t('website.customlanguage.btn.edit') }}</el-button>
          <el-button type="text" v-if="scope.row.isEdit && batchShow" @click="handleSaveClick(scope.row,scope)">{{ $t('website.customlanguage.btn.save') }}</el-button>
          <!--  -->
          <el-button type="text" v-if="scope.row.isEdit && multiLanguage.length>0 && batchShow" @click="handleCalClick(scope.row,scope)">{{ $t('website.customlanguage.btn.cancel') }}</el-button>
          <el-button type="text" size="small" @click="handleSetClick(scope.row)">{{ $t('website.customlanguage.btn.functionSet') }}</el-button>
        </template>
        <!-- 中文 -->
        <template slot="zh" slot-scope="scope">
          <el-input :disabled="mainLanguage == 'zh'" v-if="scope.row.isEdit" v-model="scope.row.zh" placeholder="请输入内容"></el-input>
          <span v-else>{{ scope.row.zh }}</span>
        </template>
        <!-- 英文 -->
        <template slot="en" slot-scope="scope">
          <el-input :disabled="mainLanguage == 'en'" v-if="scope.row.isEdit" v-model="scope.row.en" placeholder="Please enter the content"></el-input>
          <span v-else>{{ scope.row.en }}</span>
        </template>
      </bs-table>
      <!-- end -->
    </div>
  </div>

</template>

<script>
import request from '@/utils/frame/base/request'
import axios from 'axios'
export default {
  name:'customlanguage',
  data(){
    return {
      languageSwitch:'',//获取语言
      batchShow:true,//是否批量编辑
      dataList:[],//点击保存的数据（浅）
      codeName:'',//会议名称（中文）
      date:Date.parse(new Date()),//解决table表格动态显示页面不刷新问题
      mainLanguage:'',//主语言
      multiLanguage:[],//支持语种
      form: {
        moreShowFlg: true,
        listQuery: {
          current: 1,
          size: 20,
          isPage: true,
          importance: undefined,
          title: undefined,
          type: undefined,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          // defaultSortString: 'createDate.desc',
          data: {
            module:'website'
          }
        },
        formData: [
          {
            label: 'website.signupContact.query.eventCode',
            prop: 'eventCode',
            element: 'base-select',
            attrs: {
              data: 'EVENT_INFO',
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
          // {
          //   label: 'website.customlanguage.query.dictionariesId', //字典ID
          //   prop: 'dictionariesId',
          //   element: 'input-validate',
          //   attrs: {
          //     isDefault: true,
          //     clearable: true
          //   }
          // },
          {
            label: 'website.customlanguage.query.dataFunction',//功能
            prop: 'functions',
            element: 'base-select',
            list: this.$t('datadict.langWebsiteFunction'),
            attrs: {
              isDefault: true,
              clearable: false
            }
          },
          // {
          //   label: 'website.customlanguage.query.superiorSettingId',//上级设置项ID
          //   prop: 'orderNumber',
          //   element: 'input-validate',
          //   attrs: {
          //     isDefault: true,
          //     clearable: true
          //   }
          // },
          {
            label: 'website.customlanguage.query.settingItem',//设置项
            prop: 'setUpName',
            element: 'input-validate',
            attrs: {
              isDefault: true,
              clearable: true
            }
          },
          // {
          //   label: 'website.customlanguage.query.dictionaryContent',//字典内容
          //   prop: 'orderNumber',
          //   element: 'input-validate',
          //   attrs: {
          //     isDefault: true,
          //     clearable: true
          //   }
          // }
        ]
      },
      //
      mainData: {
        isLang:true,
        initSearch: false,
        isTopBar: false,
        // topBar: [
        //   {
        //     name: 'export'
        //   },
        // ],
        isColset: true,
        tabs: [
          // {
          //   id:'1',
          //   label:'全部',
          //   name:'全部'
          // },
          {
            id:'2',
            label:'meetingManagement',
            name:'会议管理'
          },
          {
            id:'3',
            label:'subActivityManagement',
            name:'分活动管理'
          },
          {
            id:'4',
            label:'microstationDesign',
            name:'微站设计'
          },
          {
            id:'5',
            label:'articleManagement',
            name:'文章管理'
          },
          {
            id:'6',
            label:'registrationSetting',
            name:'报名设置'
          },
          {
            id:'7',
            label:'checkinManagement',
            name:'签到管理'
          },
          {
            id:'8',
            label:'richText',
            name:'富文本'
          }
        ],
        api: {
          search:'/api/register/cmsEventFormLang/page',
          export: '/api/register/signupContactCol/exportModel',
        },
        // sonTabs: [
        //   {
        //     id:'5',
        //     label:'简单文本设置',
        //     name:'简单文本设置'
        //   },
        //   {
        //     id:'6',
        //     label:'富文本设置',
        //     name:'富文本设置'
        //   },
        // ],
        table: {
          // showCheckbox: true,
          cols: [
            {
              // LANG_MODULE  langModule
              label: 'website.customlanguage.list.module',//模块
              prop: 'module',
              width: '150',
              format: {
                dict: this.$t('datadict.langModule')
              }
            },
            {
              label: 'website.customlanguage.list.dataFunction',//功能
              prop: 'functions',
              width: '150',
              format: {
                dict: this.$t('datadict.langWebsiteFunction')
                // langWebsiteFunction
                // langSignupFunction
              }
            },
            {
              label: 'website.customlanguage.list.settingItem',//设置项
              prop: 'setUpName',
              width: '150'
            },
            {
              label:'website.customlanguage.list.simplifiedChinese',//中文简体
              prop: 'zh',
              isShow: false,
              width: '240',
              isSlot: true,
            },
            {
              label: 'website.customlanguage.list.english',//英文
              prop: 'en',
              isShow: false,
              width: '240',
              isSlot: true,
            },
            {
              label: 'website.customlanguage.list.operation', //操作
              prop: 'operation',
              width: '260',
              isSlot: true,
              align: 'center',
              fixed: 'right'
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
      activeName:this.$t('website.customlanguage.tab.microstationDesign'),
      sonActiveName:'简单文本设置'
    }
  },
  created(){
    // 初始化数据
    setTimeout(() => {
      if(this.$route.params && this.$route.params.eventCode){
        if(this.$route.params.module == 'website'){
          this.activeName = this.$t('website.customlanguage.tab.microstationDesign')
          this.form.listQuery.data.module = 'website'
        }
        this.form.listQuery.data.eventCode = this.$route.params.eventCode
      }
          this.$refs.bsTable.getList()
          this.languageQuery()
      }, 500)
    // 获取语言信息
  },
  mounted() {
    window.addEventListener("setItem", () => {
      this.languageSwitch = sessionStorage.getItem("LANGUAGE_SWITCH");
      // ---st 调取改变表格语言
      this.languageQuery()
      // ---end
    });
  },
  methods:{
    // 外层tabs（模块类型）
    handleTabClick(tab) {
      console.log(tab._props.label,311)
      this.form.listQuery.data.functions = ''
      this.form.listQuery.data.setUpName = ''
      this.activeName = tab._props.label
      if(tab._props.label == this.$t('website.customlanguage.tab.registrationSetting')){
        // 报名设置
        this.form.formData[1].list = this.$t('datadict.langSignupFunction')
        this.mainData.table.cols[1].format.dict = this.$t('datadict.langSignupFunction')
        this.form.listQuery.data.module = 'signup'
        this.$refs.bsTable.getList()
      }else if(tab._props.label == this.$t('website.customlanguage.tab.microstationDesign')){
        // 微站设计
        this.form.formData[1].list = this.$t('datadict.langWebsiteFunction')
        this.mainData.table.cols[1].format.dict = this.$t('datadict.langWebsiteFunction')
        this.form.listQuery.data.module = 'website'
        this.$refs.bsTable.getList()
      }else if(tab._props.label == this.$t('website.customlanguage.tab.subActivityManagement')){
        // 分活动管理
        this.form.formData[1].list = []
        this.mainData.table.cols[1].format.dict = []
        this.form.listQuery.data.module = 'sonActivity'
        this.$refs.bsTable.getList()
      }else if(tab._props.label == this.$t('website.customlanguage.tab.checkinManagement')){
        // 签到管理
        this.form.formData[1].list = []
        this.mainData.table.cols[1].format.dict = []
        this.form.listQuery.data.module = 'scene'
        this.$refs.bsTable.getList()
      }else if(tab._props.label == this.$t('website.customlanguage.tab.articleManagement')){
        // 文章管理
        this.form.formData[1].list = []
        this.mainData.table.cols[1].format.dict = []
        this.form.listQuery.data.module = 'article'
        this.$refs.bsTable.getList()
      }
      console.log(tab, this.form.listQuery.data,this.form.formData);
    },
    // 内层tabs（文本类型）
    // texHandleTabClick(tab){
    //   console.log(tab);
    // },
    // 初始化
    initCallback(data){
      data.data.forEach(item=>{
        if(item){
          item.isEdit = false
        }
      })
      this.dataList = data
      // debugger
      console.log(data);
    },
    handleEditClick(val){
      debugger
      val.setUpName += '.卐.'
      let str = new RegExp(".卐.","g")
      var str_one = val.setUpName.replace(str,"");
      val.setUpName = str_one
      val.isEdit = true
    },
    handleSaveClick(val,data){
      console.log(data , this.dataList.data);
      val.setUpName += '.卐.'
      let str = new RegExp(".卐.","g")
      var str_one = val.setUpName.replace(str,"");
      val.setUpName = str_one
      // 保存调取接口
      // /api/register/cmsEventInfoLang/update
      request({
          url: '/api/register/cmsEventFormLang/update',
          method: 'POST',
          data: { data: this.dataList.data, funcModule: '更新语言', funcOperation: '更新语言' }
        })
          .then(res => {
            if(res){
              this.$message({
              message: this.$t('biz.msg.saveSuccess'),
              type: 'success'
          })
          this.$refs.bsTable.getList()
            }
          })
          .catch(() => {})
      //
      val.isEdit = false
    },
    handleCalClick(val){
      val.setUpName += '.卐.'
      let str = new RegExp(".卐.","g")
      var str_one = val.setUpName.replace(str,"");
      val.setUpName = str_one
      val.isEdit = false
      this.$refs.bsTable.getList()
    },
    handleSetClick(val){
      console.log(this.activeName ,404)
      if(this.activeName == this.$t('website.customlanguage.tab.microstationDesign')){
        // 微站设计
        this.$router.push({ name: 'microStationManagement', params: { ids: val.eventCode } })
      }else if(this.activeName == this.$t('website.customlanguage.tab.registrationSetting')){
        // 报名设置
        this.$router.push({ name: 'attendeeFormConfig', params: { data: val.eventCode ,name:this.codeName} })
      }else if(this.activeName == this.$t('website.customlanguage.tab.subActivityManagement')){
        // 分活动管理
        this.$router.push({ name: 'activityManagement', params: { data: val.eventCode ,name:this.codeName,code:val.setUpCode} })
      }else if(this.activeName == this.$t('website.customlanguage.tab.checkinManagement')){
        // 签到管理
        debugger
        this.$router.push({ name: 'attendeeSigninSet', params: { data: val.eventCode ,name:this.codeName,code:val.setUpCode} })
      }else if(this.activeName == this.$t('website.customlanguage.tab.articleManagement')){
        // 文章管理
        this.$router.push({ name: 'articleManage', params: { data: val.eventCode ,name:this.codeName,code:val.setUpCode} })
      }else if(this.activeName == this.$t('website.customlanguage.tab.meetingManagement')){
        // 会议管理
        this.$router.push({ name: 'eventInfoManage', params: { data: val.eventCode ,name:this.codeName,code:val.setUpCode} })
      }else if(this.activeName == this.$t('website.customlanguage.tab.richText')){
        // 富文本
      }
      console.log(val.eventCode);
    },
    languageQuery(){
      // debugger
      console.log(this.form.listQuery);
      request({
          url: '/api/biz/cmsEventInfo/get',
          method: 'POST',
          data: { data: this.form.listQuery.data.eventCode, funcModule: '获取语言表信息', funcOperation: '获取语言表信息' }
        })
          .then(res => {
            if(res){
              if(res.data.mainLanguage){
                this.mainLanguage = res.data.mainLanguage
              }else{
                this.mainLanguage = ''
              }
              if(res.data.multiLanguage){
                this.multiLanguage = res.data.multiLanguage.split(',')
              }else{
                this.multiLanguage = []
              }
              this.$nextTick(() => {
                  this.mainData.table.cols.forEach(item=>{
                    if(item.prop == 'zh' || item.prop == 'en'){
                        item.isShow = false
                        console.log(this.mainLanguage);
                      }
                      if(item.prop == this.mainLanguage){
                        if(item.prop == 'zh'){
                        item.label = this.$t('website.customlanguage.list.simplifiedChinese') + '（' + this.$t('website.customlanguage.list.hostLanguage') + '）'
                      }else if(item.prop == 'en'){
                        item.label = this.$t('website.customlanguage.list.english') + '（' + this.$t('website.customlanguage.list.hostLanguage') + '）'
                      }
                      }else{
                        if(item.prop == 'zh'){
                          item.label = this.$t('website.customlanguage.list.simplifiedChinese')
                        }
                        if(item.prop == 'en'){
                          item.label = this.$t('website.customlanguage.list.english')
                        }
                      }
                    if(this.multiLanguage.length>0){
                    this.multiLanguage.forEach(son=>{
                      if(item.prop == son){
                        item.isShow = true
                      }
                })
              }
                  })
              // debugger
              console.log(this.mainData.table.cols);
              })
            }
          })
          .catch(() => {})
    },
    onChangeAll (params) {
      this.codeName = params.name
      this.languageQuery()
      this.$refs.bsTable.getList()
    },
    // 批量编辑
    batchClick(){
      this.dataList.data.forEach(item=>{
        if(item){
          item.isEdit = true
        }
      })
      this.dataList.data[0].setUpName += '.卐.'
      let str = new RegExp(".卐.","g")
      var str_one = this.dataList.data[0].setUpName.replace(str,"");
      this.dataList.data[0].setUpName = str_one
      this.batchShow = false
    },
    // 取消
    batchCancel(){
      this.dataList.data.forEach(item=>{
        if(item){
          item.isEdit = false
        }
      })
      this.dataList.data[0].setUpName += '.卐.'
      let str = new RegExp(".卐.","g")
      var str_one = this.dataList.data[0].setUpName.replace(str,"");
      this.dataList.data[0].setUpName = str_one
      this.batchShow = true
    },
    // 保存
  batchSave(){
    request({
          url: '/api/register/cmsEventFormLang/update',
          method: 'POST',
          data: { data: this.dataList.data, funcModule: '更新语言', funcOperation: '更新语言' }
        })
          .then(res => {
            if(res){
              this.$message({
              message: this.$t('biz.msg.saveSuccess'),
              type: 'success'
          })
          this.$refs.bsTable.getList()
            }
          })
          .catch(() => {})
          this.dataList.data.forEach(item=>{
        if(item){
          item.isEdit = false
        }
      })
          this.dataList.data[0].setUpName += '.卐.'
          let str = new RegExp(".卐.","g")
          var str_one = this.dataList.data[0].setUpName.replace(str,"");
          this.dataList.data[0].setUpName = str_one
          this.batchShow = true
    },
    // 导出
    exportExcel() {
      let obj = {
        loading: false,
        name: "export"
      }
      this.$refs.bsTable.handleDownload(obj)
    },
  }
}
</script>

<style scoped lang="scss">
::deep .bs-new-container .el-pagination {
  margin: 50px 0;
  line-height: 100px;
}
.options {
  display: flex;
  justify-content: right;
  background-color: white;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-right: 10px;
  // float: right;
}
</style>