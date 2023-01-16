<template>
  <div class="containerBox">
    <div class="bs-new-container app-container">
      <!-- 上边查询 -->
      <bs-form ref="bsForm" :form="form"></bs-form>
      <!-- 模块Tabs -->
      <template v-if="mainData.tabs" :style="{ width: clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto' }">
        <el-tabs v-model="activeName" type="border-card" style="margin-top: 3px" @tab-click="handleTabClick">
          <el-tab-pane v-for="tab in mainData.tabs" :key="tab.id" :label="tab.label" :name="tab.name">
            <!--  -->
            <!-- 简单文本---=---富文本 -->
            <template v-if="mainData.sonTabs" :style="{ width: clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto' }">
              <el-tabs v-model="sonActiveName" type="border-card" style="margin-top: 3px" @tab-click="texHandleTabClick">
                <el-tab-pane v-for="tab in mainData.sonTabs" :key="tab.id" :label="tab.label" :name="tab.name">
                </el-tab-pane>
              </el-tabs>
            </template>
            <!--  -->
          </el-tab-pane>
        </el-tabs>
      </template>
      <!-- 表格数据 -->
      <bs-table ref='bsTable' :mainData='mainData' :mainDataTabs="mainData.tabs" @initCallback='initCallback' v-if="date">
        <template slot="operation" slot-scope="scope">
          <el-button type="text" v-if="!scope.row.isEdit && multiLanguage.length>0" @click="handleEditClick(scope.row)">编辑</el-button>
          <el-button type="text" v-if="scope.row.isEdit" @click="handleSaveClick(scope.row)">保存</el-button>
          <el-button type="text" size="small" @click="handleSetClick(scope.row)">功能设置</el-button>
        </template>
        <!-- 中文 -->
        <template slot="zh" slot-scope="scope">
          <el-input v-if="scope.row.isEdit" v-model="scope.row.zh" placeholder="请输入内容"></el-input>
          <span v-else>{{ scope.row.zh }}</span>
        </template>
        <!-- 英文 -->
        <template slot="en" slot-scope="scope">
          <el-input v-if="scope.row.isEdit" v-model="scope.row.en" placeholder="Please enter the content"></el-input>
          <span v-else>{{ scope.row.en }}</span>
        </template>
      </bs-table>
      <!-- end -->
    </div>
  </div>

</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  name:'customlanguage',
  data(){
    return {
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
          data: {}
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
            list: this.$t('datadict.basicOrderStatus'),
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
        isColset: true,
        tabs: [
          {
            id:'1',
            label:'全部',
            name:'全部'
          },
          {
            id:'2',
            label:'会议管理',
            name:'会议管理'
          },
          {
            id:'3',
            label:'分活动管理',
            name:'分活动管理'
          },
          {
            id:'4',
            label:'微站设计',
            name:'微站设计'
          },
          {
            id:'5',
            label:'文章管理',
            name:'文章管理'
          },
          {
            id:'6',
            label:'报名设置',
            name:'报名设置'
          },
          {
            id:'7',
            label:'签到管理',
            name:'签到管理'
          }
        ],
        api: {
          search:'/api/register/cmsEventInfoLang/page'
        },
        sonTabs: [
          {
            id:'5',
            label:'简单文本设置',
            name:'简单文本设置'
          },
          {
            id:'6',
            label:'富文本设置',
            name:'富文本设置'
          },
        ],
        table: {
          // showCheckbox: true,
          cols: [
            {
              label: '模块',
              prop: 'module',
              width: '150'
            },
            {
              label: '功能',
              prop: 'functions',
              width: '150'
            },
            {
              label: '设置项',
              prop: 'setUpName',
              width: '150'
            },
            {
              label:'中文简体（主语言）',
              prop: 'zh',
              isShow: false,
              width: '240',
              isSlot: true,
            },
            {
              label: '英文',
              prop: 'en',
              isShow: false,
              width: '240',
              isSlot: true,
            },
            {
              label: '操作',
              prop: 'operation',
              width: '160',
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
      activeName:'全部',
      sonActiveName:'简单文本设置'
    }
  },
  created(){
    // 初始化数据
    setTimeout(() => {
          this.$refs.bsTable.getList()
          this.languageQuery()
      }, 500)
    // 获取语言信息
  },
  mounted() {
  },
  methods:{
    // 外层tabs（模块类型）
    handleTabClick(tab) {
      if(tab._props.label == '报名设置'){
        this.form.formData[1].list = this.$t('datadict.langModule')
      }else if(tab._props.label == '微站设计'){
        this.form.formData[1].list = this.$t('datadict.langWebsiteFunction')
      }
      console.log(tab, this.form.listQuery.data,this.form.formData);
      this.form.listQuery.data.functions = ''
      this.form.listQuery.data.setUpName = ''
      this.$refs.bsTable.getList()
    },
    // 内层tabs（文本类型）
    texHandleTabClick(tab){
    },
    // 初始化
    initCallback(data){
      data.data.forEach(item=>{
        if(item){
          item.isEdit = false
        }
      })
      // debugger
      console.log(data);
    },
    handleEditClick(val){
      val.setUpName += '.卐.'
      let str = new RegExp(".卐.","g")
      var str_one = val.setUpName.replace(str,"");
      val.setUpName = str_one
      val.isEdit = true
    },
    handleSaveClick(val){
      val.setUpName += '.卐.'
      let str = new RegExp(".卐.","g")
      var str_one = val.setUpName.replace(str,"");
      val.setUpName = str_one
      val.isEdit = false
    },
    handleSetClick(){

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
    }
  }
}
</script>

<style scoped lang="scss">
::deep .bs-new-container .el-pagination {
  margin: 50px 0;
  line-height: 100px;
}
</style>