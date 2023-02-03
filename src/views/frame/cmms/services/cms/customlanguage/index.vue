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
        <el-button v-if="multiLanguage.length>0 && activeName != '富文本'" type="primary" v-show="batchShow" @click="batchClick">{{ $t('website.customlanguage.btn.batchEditing') }}</el-button>
        <el-button v-if="multiLanguage.length>0" @click="batchCancel" v-show="!batchShow">{{ $t('website.customlanguage.btn.cancel') }}</el-button>
        <el-button v-if="multiLanguage.length>0" @click="batchSave" type="primary" v-show="!batchShow">{{ $t('website.customlanguage.btn.save') }}</el-button>
        <el-button v-if="activeName != '富文本'" type="primary" @click="exportExcel">{{ $t('website.customlanguage.btn.export') }}</el-button>
      </div>
      <!-- 表格数据 -->
      <bs-table ref='bsTable' :mainData='mainData' :mainDataTabs="mainData.tabs" @initCallback='initCallback' v-if="date">
        <template slot="operation" slot-scope="scope">
          <el-button type="text" v-if="!scope.row.isEdit && multiLanguage.length>0 && activeName != '富文本'" @click="handleEditClick(scope.row)">{{ $t('website.customlanguage.btn.edit') }}</el-button>
          <el-button type="text" v-if="scope.row.isEdit && batchShow" @click="handleSaveClick(scope.row,scope)">{{ $t('website.customlanguage.btn.save') }}</el-button>
          <!--  -->
          <el-button type="text" v-if="scope.row.isEdit && multiLanguage.length>0 && batchShow" @click="handleCalClick(scope.row,scope)">{{ $t('website.customlanguage.btn.cancel') }}</el-button>
          <el-button type="text" size="small" @click="handleSetClick(scope.row)">{{ $t('website.customlanguage.btn.functionSet') }}</el-button>
        </template>
        <!-- 中文 -->
        <template slot="zh" slot-scope="scope">
          <span v-if="activeName == '富文本'">
            <!-- 富文本 -->
            <el-button type="text" @click="editClick(scope.row,'zh',true)">{{ $t('website.customlanguage.btn.preview') }}</el-button>
            <el-button type="text" @click="editClick(scope.row,'zh',false)">{{ $t('website.customlanguage.btn.edit') }}</el-button>
          </span>
          <span v-else>
            <el-input :disabled="mainLanguage == 'zh'" v-if="scope.row.isEdit" v-model="scope.row.zh" placeholder="请输入内容"></el-input>
            <span v-else>{{ scope.row.zh }}</span>
          </span>
        </template>
        <!-- 英文 -->
        <template slot="en" slot-scope="scope">
          <span v-if="activeName == '富文本'">
            <!-- 富文本 -->
            <el-button type="text" @click="editClick(scope.row,'en',true)">{{ $t('website.customlanguage.btn.preview') }}</el-button>
            <el-button type="text" @click="editClick(scope.row,'en',false)">{{ $t('website.customlanguage.btn.edit') }}</el-button>
          </span>
          <span v-else>
            <el-input :disabled="mainLanguage == 'en'" v-if="scope.row.isEdit" v-model="scope.row.en" placeholder="Please enter the content"></el-input>
            <span v-else>{{ scope.row.en }}</span>
          </span>
        </template>
      </bs-table>
      <!-- end -->
    </div>
    <el-dialog title="富文本信息" :visible.sync="dialogVisible" width="950px" :before-close="handleClose">
      <div :key="new Date().getTime()">
        <bs-editor></bs-editor>
        <!-- <iframe name="myframe" ref="bsEditorFrame" src="static/qmeditor/index.html" style="width: 100%; height: 30rem; border-width: 1px"></iframe> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSave">确 定</el-button>
      </span>
    </el-dialog>
    <!--  -->
    <el-dialog title="预览" :visible.sync="dialogVisible_" width="1200px" :before-close="handleClose_">
      <div style="padding: 0 10px; height: 500px;overflow-y: scroll;" :key="new Date().getTime()" v-html="innerHtmlData">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible_ = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--  -->
  </div>

</template>

<script>
import request from '@/utils/frame/base/request'
import axios from 'axios'
export default {
  name:'customlanguage',
  data(){
    return {
      innerHtmlData:'',//预览内容
      sheetData:{},// 富文本其他语言协议 简介 数据暂存
      formId:'',
      privacyName_:'',//会议简介其他语言
      profile_:'',//协议其他语言
      language_:'',//表单多语言
      // 表单暂存字段
      menuId:'',
      menuLang:'',
      meunVal:'',
      neunType:'',
      // 文章暂存字段
      code_:'',
      eventCode_:'',
      type_:'',
      lang:'',//主语言/其他语言
      essayData:'',//文章富文本主语言内容
      restData:'',//文章富文本其他语言内容
      synopsisData:'',//表单会议简介主语言
      synopsisRestData:'',//表单会议简介其他语言
      agreementData:'',//表单协议主语言
      agreementRestData:'',//表单协议其他语言
      dialogVisible: false,//编辑
      dialogVisible_: false,//查看
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
              label: 'website.customlanguage.list.settingType',//类型
              prop: 'typeName',
              width: '150',
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
    // debugger
    console.log(this.$t('datadict'));
    console.log(this.$t('datadict.langType'));
  },
  methods:{
    // 外层tabs（模块类型）
    handleTabClick(tab) {
      console.log(tab._props.label,311)
      this.form.listQuery.data.functions = ''
      this.form.listQuery.data.setUpName = ''
      this.activeName = tab._props.label
      // 初始化普通文本接口
      this.mainData.api.search = '/api/register/cmsEventFormLang/page'
      // 初始化分页显示
      this.mainData.bottomBar.pagination.show = true
      this.form.listQuery.isPage = true
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
      }else if(tab._props.label == '会议管理'){
        this.form.formData[1].list = []
        this.mainData.table.cols[1].format.dict = []
        this.form.listQuery.data.module = 'management'
        this.$refs.bsTable.getList()
      }else if(tab._props.label == '富文本'){
        this.goTo()
      }
      console.log(tab, this.form.listQuery.data,this.form.formData);
    },
    // 获取富文本其他语言会议简介 会议协议
    getMeetingData(language,formId){
      this.formId = formId
      let params = {
        eventCode:this.form.listQuery.data.eventCode,
        language:language
      }
      request({
          url: '/api/biz/cmsEventInfoLang/get',
          method: 'POST',
          data: { data: params, funcModule: '获取富文本其他语言', funcOperation: '获取富文本其他语言' }
        })
          .then(res => {
            if(res){
              this.sheetData = res.data
              if(res.data.privacyName){
          this.privacyName_ = res.data.privacyName
             }
            if(res.data.profile){
          this.profile_ = res.data.profile
            }
            if(res.data.language){
          this.language_ = res.data.language
           }
            }
            if(formId == '00001'){
              // 预览暂存
              if(res.data.profile){
                this.innerHtmlData = res.data.profile
              }else{
                this.innerHtmlData = ''
              }
              setTimeout(() => {
                if (window.frames['myframe']){
                  window.frames['myframe'].setContents('')
                  window.frames['myframe'].setContents(this.profile_)
                }
              }, 2000)
            }else if(formId == '00002'){
              // 预览暂存
              if(res.data.privacyName){
                this.innerHtmlData = res.data.privacyName
              }else{
                this.innerHtmlData = ''
              }
              setTimeout(() => {
                if (window.frames['myframe']){
                  window.frames['myframe'].setContents('')
                  window.frames['myframe'].setContents(this.privacyName_)
                }
              }, 2000)
            }
          })
          .catch(() => {
            // debugger
          })
    },
    getArticle(){
      let params = {
        articleName: "",
        eventCode: this.form.listQuery.data.eventCode,
        usingFlag: "",
      }
      request({
          url: '/api/biz/cmsArticle/page',
          method: 'POST',
          data: { data: params,current: 1,isPage: false,size: 18, funcModule: '文章管理', funcOperation: '查询' }
        })
          .then(res => {
            if(res){
              let articleData = res.data
              if(articleData.length>0){
                articleData.forEach(item=>{
                  let obj = {}
                  obj = {
                    en:'暂未配置',
                    zh:'暂未配置',
                    eventCode:this.form.listQuery.data.eventCode,
                    functions:'',
                    module:'article',
                    setUpCode:'',
                    setUpName:item.articleName,
                    type:'',
                    code:item.code,
                    id:item.id,
                    languageType:item.languageType
                  }
                  this.$refs.bsTable.tableData.unshift(obj)
                  this.mainData.bottomBar.pagination.show = false
                  this.form.listQuery.isPage = false
                })
                console.log(this.$refs.bsTable.tableData);
              }
            }
          })
          .catch(() => {})
    },
    // 内层tabs（文本类型）
    // texHandleTabClick(tab){
    //   console.log(tab);
    // },
    // 初始化
    initCallback(data){
      if(this.activeName == '富文本'){
        if(data.data.privacyName){
          this.privacyName_ = data.data.privacyName
        }
        if(data.data.profile){
          this.profile_ = data.data.profile
        }
        if(data.data.language){
          this.language_ = data.data.language
        }
        this.goTo()
      }else{
        data.data.forEach(item=>{
        if(item){
          item.isEdit = false
        }
      })
      this.dataList = data
      }
    },
    handleEditClick(val){
      // debugger
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
        // debugger
        this.$router.push({ name: 'attendeeSigninSet', params: { data: val.eventCode ,name:this.codeName,code:val.setUpCode} })
      }else if(this.activeName == this.$t('website.customlanguage.tab.articleManagement')){
        // 文章管理
        // debugger
        this.$router.push({ name: 'articleManage', params: { data: val.eventCode ,name:this.codeName,code:val.setUpCode} })
      }else if(this.activeName == this.$t('website.customlanguage.tab.meetingManagement')){
        // 会议管理
        this.$router.push({ name: 'eventInfoManage', params: { data: val.eventCode ,name:this.codeName,code:val.setUpCode} })
      }else if(this.activeName == this.$t('website.customlanguage.tab.richText')){
        // 富文本
        if(val.menu){
          //报名表单
          // debugger
          this.$router.push({ name: 'attendeeFormConfig', params: { data: this.form.listQuery.data.eventCode ,name:this.codeName} })
        }else{
          // 文章
          // debugger
          this.$router.push({ name: 'articleManage', params: { data: val.eventCode ,name: this.codeName,code:val.id} })
        }
        console.log(val);
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
                this.multiLanguage = JSON.parse(res.data.multiLanguage)
              }else{
                this.multiLanguage = []
              }
              this.$nextTick(() => {
                  this.mainData.table.cols.forEach(item=>{
                    // debugger
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
      if(this.activeName == '富文本'){
        // debugger
        this.goTo()
      }else{
      this.$refs.bsTable.getList()
      }
    },
    goTo(){
      // debugger
      this.form.formData[1].list = []
        this.mainData.table.cols[1].format.dict = []
        this.form.listQuery.data.module = ''
        this.mainData.api.search = '/api/biz/cmsEventInfoLang/get'
        this.form.listQuery.data.language = this.mainLanguage
      this.$refs.bsTable.tableData = [
          {
            module:'signup',
            functions:'',
            setUpName:'宣传页会议简介',
            en:'暂未配置',
            zh:'暂未配置',
            id:'00001',
            menu:true
          },
          {
            module:'signup',
            functions:'',
            setUpName:'协议内容',
            en:'暂未配置',
            zh:'暂未配置',
            id:'00002',
            menu:true
          },
        ]
        this.getArticle()
        this.$refs.bsTable.$refs.singleTable.reloadData(this.$refs.bsTable.tableData)
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
    previewClick(){
      this.dialogVisible_ = true
    },
    // 修改
    editClick(val,type,preview){
      // debugger
      // 主语言
      if(type == this.mainLanguage){
        if(val.menu){
          // 表单的富文本
          // debugger
          this.getMenuData(val.id,'main',val,type)
        }else{
          // 文章的富文本
        this.getData('main',val.code,val.eventCode,type)
        }
      }else{
        // 其他语言
        if(val.menu){
          // 表单的富文本
          this.getMenuData(val.id,'rest',val,type)
        }else{
          // 文章的富文本
        this.getData('rest',val.code,val.eventCode,type)
        }
      }
      if(preview){
        //预览
        this.previewClick()
      }else{
        // 编辑
        this.dialogVisible = true
      }
      console.log(val,type);
    },
    handleClose(done) {
      done();
    },
    handleClose_(done) {
      done();
    },
    getMenuData(id,lang,val,type){
      // debugger
      this.menuId = id
      this.menuLang = lang
      this.meunVal = val
      this.neunType = type
      if(id == '00001'){
        // 会议简介
        if(lang == 'main'){
          //主语言
          request({
          url: '/api/register/signupExterior/get',
          method: 'POST',
          data: { data: this.form.listQuery.data.eventCode, funcModule: '获取表单会议简介富文章内容', funcOperation: '获取表单会议简介富文章内容' }
        })
          .then(res => {
            if(res){
              this.synopsisData = res.data
              // debugger
              // 预览暂存
              if(res.data.profile){
                this.innerHtmlData = res.data.profile
              }else{
                this.innerHtmlData = ''
              }
              setTimeout(() => {
                if (window.frames['myframe']){
                  window.frames['myframe'].setContents('')
                  window.frames['myframe'].setContents(res.data.profile)
                }
              }, 2000)
            }
          })
          .catch(() => {})
        }else if(lang == 'rest'){
          // 其他语言
          this.getMeetingData(type,id)
        }
      }else if('00002'){
        //协议内容
        if(lang == 'main'){
          //主语言
          request({
          url: '/api/register/signupContactCodeRule/get',
          method: 'POST',
          data: { data: this.form.listQuery.data.eventCode, funcModule: '获取表单协议富文章内容', funcOperation: '获取表单协议富文章内容' }
        })
          .then(res => {
            if(res){
              this.agreementData = res.data
              // debugger
              // 预览暂存
              if(res.data.privacyContent){
                this.innerHtmlData = res.data.privacyContent
              }else{
                this.innerHtmlData = ''
              }
              setTimeout(() => {
                if (window.frames['myframe']){
                  window.frames['myframe'].setContents('')
                  window.frames['myframe'].setContents(res.data.privacyContent)
                }
              }, 2000)
            }
          })
          .catch(() => {})
        }else if(lang == 'rest'){
          // 其他语言
          this.getMeetingData(type,id)
        }
      }
      console.log(id,lang,val,type);
    },
      getData(lang,code,eventCode,type){
        this.lang = lang
        this.code_ = code
        this.eventCode_ = eventCode
        this.type_ = type
        if(lang == 'main'){
          let params = {
          code:code,
          languageType:type,
          // eventCode:eventCode
        }
        request({
          url: '/api/biz/cmsArticle/get',
          method: 'POST',
          data: { data: params, funcModule: '获取文章富文章文本内容', funcOperation: '获取文章富文章文本内容' }
        })
          .then(res => {
            if(res){
              // debugger
              this.essayData = res.data
              // 预览暂存
              if(res.data.articleContent){
                this.innerHtmlData = res.data.articleContent
              }else{
                this.innerHtmlData = ''
              }
              setTimeout(() => {
                if (window.frames['myframe']){
                  window.frames['myframe'].setContents('')
                  window.frames['myframe'].setContents(this.essayData.articleContent)
                  //  const req = window.frames['myframe'].getContent()
                }
              }, 2000)
            }
          })
          .catch(() => {})
        }else if(lang == 'rest'){
          // 其他语言
          let params = {
          articlCode:code,
          language:type,
          eventCode:eventCode
        }
        request({
          url: '/api/cms/articleLang/get',
          method: 'POST',
          data: { data: params, funcModule: '获取富文章文本内容', funcOperation: '获取富文章文本内容' }
        })
          .then(res => {
            if(res){
              this.restData = res.data
              // debugger
              // 预览暂存
              if(res.data.articleContent){
                this.innerHtmlData = res.data.articleContent
              }else{
                this.innerHtmlData = ''
              }
              setTimeout(() => {
                if (window.frames['myframe']){
                  window.frames['myframe'].setContents('')
                  window.frames['myframe'].setContents(this.restData.articleContent)
                }
              }, 2000)
            }
          })
          .catch(() => {})
        }
      },
      menuSave(){
      //   this.menuId = id
      // this.menuLang = lang
      // this.meunVal = val
      // this.neunType = type
      if(this.menuId == '00001'){
        if(this.menuLang == 'main'){
          this.synopsisData.profile = window.frames['myframe'].getContent()
          request({
          url: '/api/register/signupExterior/update',
          method: 'POST',
          data: { data:this.synopsisData, funcModule: '表单简介富文本保存', funcOperation: '表单简介富文本保存' }
        })
          .then(res => {
            if(res){
              // debugger
              this.dialogVisible = false
              this.$message({
              message: this.$t('biz.msg.saveSuccess'),
              type: 'success'
          })
            }
          })
          .catch(() => {})
        }else if(this.menuLang == 'rest'){
          // 其他语言
          if(this.privacyName_ != '' || this.profile_ != ''){
            // 有会议简介数据 修改富文本
            this.sheetData.profile = window.frames['myframe'].getContent()
            request({
          url: '/api/biz/cmsEventInfoLang/update',
          method: 'POST',
          data: { data:this.sheetData, funcModule: '会议简介富文本创建', funcOperation: '会议简介富文本创建' }
        })
          .then(res => {
            if(res){
              this.dialogVisible = false
              this.$message({
              message: this.$t('biz.msg.saveSuccess'),
              type: 'success'
          })
            }
          })
          .catch(() => {})
          }else{
            // 无会议简介数据 创建富文本
            // 没id 调取创建接口
            // debugger
            this.sheetData.profile = window.frames['myframe'].getContent()
            this.sheetData.privacyName = ''
            this.sheetData.eventCode = this.form.listQuery.data.eventCode
            this.sheetData.language = this.neunType
            request({
              url: '/api/biz/cmsEventInfoLang/save',
              method: 'POST',
              data: { data:this.sheetData, funcModule: '文章富文本保存', funcOperation: '文章富文本保存' }
            })
              .then(res => {
                if(res){
                  this.dialogVisible = false
                  this.$message({
                  message: this.$t('biz.msg.saveSuccess'),
                  type: 'success'
              })
                }
              })
                .catch(() => {})
                //
              }
        }
      }else if(this.menuId == '00002'){
        if(this.menuLang == 'main'){
          //
          let querySaveHref = {
            isVerification: this.agreementData.isVerification,
            registerVerification: this.agreementData.registerVerification,
            loginVerification: this.agreementData.loginVerification,
            customize: this.agreementData.customize,
            isRequired: this.agreementData.isRequired,
            isPrivacy: this.agreementData.isPrivacy,
            privacyName: this.agreementData.privacyName,
            privacyContent: window.frames['myframe'].getContent(),
            beginTime: this.agreementData.beginTime,
            endTime: this.agreementData.endTime,
            isApproval: this.agreementData.applyCheck,
            approvalUser: this.agreementData.approvalUser,
            assistSignupPower: this.agreementData.assistApplyPermission,
            signupField: this.agreementData.signupField,
            eventCode: this.agreementData.eventCode,
            id: this.agreementData.id
          }
          //
          request({
          url: '/api/register/signupContactCodeRule/update',
          method: 'POST',
          data: { data:querySaveHref, funcModule: '表单协议富文本保存', funcOperation: '表单协议富文本保存' }
        })
          .then(res => {
            if(res){
              // debugger
              this.dialogVisible = false
              this.$message({
              message: this.$t('biz.msg.saveSuccess'),
              type: 'success'
          })
            }
          })
          .catch(() => {})
        }else if(this.menuLang == 'rest'){
          // 其他语言
          if(this.privacyName_ != '' || this.profile_ != ''){
            // debugger
            // 有会议简介数据 修改富文本
            this.sheetData.privacyName = window.frames['myframe'].getContent()
            request({
          url: '/api/biz/cmsEventInfoLang/update',
          method: 'POST',
          data: { data:this.sheetData, funcModule: '会议简介富文本创建', funcOperation: '会议简介富文本创建' }
        })
          .then(res => {
            if(res){
              this.dialogVisible = false
              this.$message({
              message: this.$t('biz.msg.saveSuccess'),
              type: 'success'
          })
            }
          })
          .catch(() => {})
          }else{
            // 无会议协议数据 创建富文本
            // 没id 调取创建接口
            // debugger
            this.sheetData.privacyName = window.frames['myframe'].getContent()
            this.sheetData.profile = ''
            this.sheetData.eventCode = this.form.listQuery.data.eventCode
            this.sheetData.language = this.neunType
            request({
              url: '/api/biz/cmsEventInfoLang/save',
              method: 'POST',
              data: { data:this.sheetData, funcModule: '文章富文本保存', funcOperation: '文章富文本保存' }
            })
              .then(res => {
                if(res){
                  this.dialogVisible = false
                  this.$message({
                  message: this.$t('biz.msg.saveSuccess'),
                  type: 'success'
              })
                }
              })
                .catch(() => {})
                //
          }
        }
      }
      },
      dialogSave(){
        if(this.menuId){
          // 表单富文本保存
          this.menuSave()
        }else{
          // 文章保存
          if(this.lang == 'main'){
        this.essayData.articleContent = window.frames['myframe'].getContent()
        request({
          url: '/api/biz/cmsArticle/update',
          method: 'POST',
          data: { data:this.essayData, funcModule: '文章富文本保存', funcOperation: '文章富文本保存' }
        })
          .then(res => {
            if(res){
              this.dialogVisible = false
              this.$message({
              message: this.$t('biz.msg.saveSuccess'),
              type: 'success'
          })
            }
          })
          .catch(() => {})
        }else if(this.lang == 'rest'){
          // 文章其他语言
          if(this.restData.id){
            // debugger
            //有id 调取更新接口
            this.restData.articleContent = window.frames['myframe'].getContent()
        this.restData.articlCode = this.code_
        this.restData.eventCode = this.eventCode_
        this.restData.language = this.type_
        request({
          url: '/api/cms/articleLang/update',
          method: 'POST',
          data: { data:this.restData, funcModule: '文章富文本保存', funcOperation: '文章富文本保存' }
        })
          .then(res => {
            if(res){
              this.dialogVisible = false
              this.$message({
              message: this.$t('biz.msg.saveSuccess'),
              type: 'success'
          })
            }
          })
          .catch(() => {})
          }else{
            // 没id 调取创建接口
            // debugger
            this.restData.articleContent = window.frames['myframe'].getContent()
        this.restData.articlCode = this.code_
        this.restData.eventCode = this.eventCode_
        this.restData.language = this.type_
        request({
          url: '/api/cms/articleLang/save',
          method: 'POST',
          data: { data:this.restData, funcModule: '文章富文本保存', funcOperation: '文章富文本保存' }
        })
          .then(res => {
            if(res){
              this.dialogVisible = false
              this.$message({
              message: this.$t('biz.msg.saveSuccess'),
              type: 'success'
          })
            }
          })
          .catch(() => {})
          }
        }
        }

      }
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
// 改变默认滚动条样式
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #ebeef5;
}
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ccc;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background: rgba(255, 255, 255, 1);
}
</style>