<template>
  <div class="app-container">
    <bs-form ref="bsForm" :form="form"></bs-form>
    <!-- 未完成表单设置 -->
    <div style="padding: 0 5px">
      <div class="steps">
        <el-steps :active="stepIndex" align-center>
          <el-step style="cursor: pointer" @click="stepIndexChange(0)">
            <span slot="icon" @click="stepIndexChange(0)" style="cursor: pointer"> 1 </span>
            <span slot="title" @click="stepIndexChange(0)" style="cursor: pointer"> {{$t('appearance.registrationSetup')}} </span>
          </el-step>
          <el-step title="表单设置" style="cursor: pointer" @click="stepIndexChange(1)">
            <span slot="icon" @click="stepIndexChange(1)" style="cursor: pointer"> 2 </span>
            <span slot="title" @click="stepIndexChange(1)" style="cursor: pointer"> {{$t('form.formSettings')}} </span>
          </el-step>
          <el-step title="结果设置" @click="stepIndexChange(2)" style="cursor: pointer">
            <span slot="icon" @click="stepIndexChange(2)" style="cursor: pointer"> 3 </span>
            <span slot="title" @click="stepIndexChange(2)" style="cursor: pointer"> {{$t('result.resultSettings')}} </span>
          </el-step>
          <el-step title="注册报名设置" @click="stepIndexChange(3)" style="cursor: pointer">
            <span slot="icon" @click="stepIndexChange(3)" style="cursor: pointer"> 4 </span>
            <span slot="title" @click="stepIndexChange(3)" style="cursor: pointer"> {{$t('applySet.registrationSetup')}} </span>
          </el-step>
        </el-steps>
      </div>
      <!-- 外观设置 -->
      <div v-show="stepIndex == 0" class="appearanceSet" :style="{ height: formSetHeight + 'px' }">
        <appearanceSet ref="appearanceSet" @stepIndex="stepIndexFn"></appearanceSet>
      </div>

      <!-- 表单设置 -->
      <div v-show="stepIndex == 1" class="formSet">
        <formSet ref="formSet" @stepIndex="stepIndexFn" @formUpdateStatus="formUpdateStatusFn"></formSet>
      </div>

      <!-- 结果页设置 -->
      <div v-show="stepIndex == 2" class="resultSet" :style="{ height: formSetHeight + 'px' }">
        <resultSet ref="resultSet" @stepIndex="stepIndexFn" :isNeedApprove.sync="resultSetForm.isNeedApprove"></resultSet>
      </div>

      <!-- 注册报名设置 -->
      <div v-show="stepIndex == 3" class="resultSet" :style="{ height: formSetHeight + 'px' }">
        <apply-set :isNeedApprove.sync="resultSetForm.isNeedApprove" :formUpdateStatus.sync="formUpdateStatus" :eventCode="form.listQuery.data.eventCode" :eventName="eventName" @setResult="setResult" ref="attCodeSet" @applySetForm="applySetForm"></apply-set>
      </div>

    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import screenfull from 'screenfull'
import applySet from './components/applySet.vue'
import appearanceSet from './components/appearanceSet.vue'
import formSet from './components/formSet.vue'
import resultSet from './components/resultSet.vue'
import { mapGetters } from 'vuex'
// 日期格式化方法
import { dateFormate } from '@/utils/frame/base/index'
import request from '@/utils/frame/base/request'
export default {
  name: 'attendeeFormConfig',
  data () {
    return {
      appearanceSetObj:{

      },
      theCertificateType:[],
      formUpdateStatus:false,
      getActiveObj: {},
      resPcImageList: [],
      resPcdialogImageUrl: '',
      resPcdialogVisible: false,
      resAppImageList: [],
      resAppdialogImageUrl: '',
      resAppdialogVisible: false,
      AppImageList: [],
      AppdialogImageUrl: '',
      AppdialogVisible: false,
      meetingImageList: [],
      mettingdialogImageUrl: '',
      meetingdialogVisible: false,
      fileList: [],
      successBannerImageList: [],
      waitReviewBannerImageList: [],
      noPassBannerImageList: [],
      successBgcImageList: [],
      waitReviewBgcImageList: [],
      noPassBgcImageList: [],
      uploadUrl: process.env.BASE_API + '/api/obs/file/uploadImg',
      bannerBgcImageUrl: '',
      bannerBgcVisible: false,
      bgcVisible: false,
      bgcImageUrl: '',
      waitReviewdialogVisible: false,
      waitReviewdialogImageUrl: '',
      waitReviewbannerBgcVisible: false,
      waitReviewbannerBgcImageUrl: '',
      noPassdialogVisible: false,
      noPassdialogImageUrl: '',
      noPassbannerBgcVisible: false,
      noPassbannerBgcImageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      applySetForm: {
        isVerification: '', // 验证方式
        registerVerification: [], // 注册验证
        loginVerification: [], // 登录验证
        coustomVerification: [], // 自定义验证项
        isNeedCompleteMustInfo: true, // 是否需要完善必填信息
        IsIintimateAgreement: true, // 隐私协议
        applyDate: '', // 报名日期
        attendanceCodePrefix: '', // 参会码前缀
        attendanceCodeLength: '', // 参会码长度
        createType: '', // 生成类型
        attendanceCodeStartNum: 0, // 起始码
        applyCheck: '', // 报名审核
        checkUser: '', // 审核权限用户
        assistApply: true, // 协助报名
        assistApplyPermission: '', // 协助报名权限
        assistApplyOpenField: [] // 协助报名开放字段
      },
      drawer: false,
      auditStatusDrawer: false,
      noPassDrawer: false,
      stepIndex: 0,
      header: {
        token: window.sessionStorage.getItem('token')
      },
      resultSetForm: {
        // successTitle: [
        //   { required: true, message: '请输入提示主题', trigger: 'blur' }
        // ],
        // waitReviewTitle: [
        //   { required: true, message: '请输入提示主题', trigger: 'blur' }
        // ],
        // noPassTitle: [
        //   { required: true, message: '请输入提示主题', trigger: 'blur' }
        // ],
      },
      form: {
        moreShowFlg: false,
        listQuery: {
          current: 1,
          size: 20,
          isPage: false,
          importance: undefined,
          title: undefined,
          type: undefined,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          defaultSortString: 'mapSort.asc',
          data: {
            usingFlag: ''
          }
        },
        formData: [
          {
            label: 'website.signupContactCol.query.eventCode',
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
        api: {
          search: '/api/register/signupContactCol/page',
          doDelete: '/api/register/signupContactCol/remove'
        },
        initSearch: false,
        isTopBar: true,
        topBar: [
          {
            name: 'initialize',
            type: 'route',
            i18n: '初始化表单',
            event: this.initialize
          },
          {
            name: 'update',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow
            }
          },
          {
            name: 'view',
            type: 'dialog',
            component: () => import('./edit.vue'),
            getParam: () => {
              return this.$refs.bsTable.currentRow
            }
          },
          {
            name: 'refresh'
          }
        ],
        isColset: true,
        table: {
          cols: [
            {
              prop: 'mapCode',
              label: 'website.signupContactCol.list.mapCode'
            },
            {
              prop: 'mapName',
              label: 'website.signupContactCol.list.mapName'
            },
            {
              prop: 'mapComp',
              label: 'website.signupContactCol.list.mapComp',
              align: 'center',
              format: {
                dict: this.$t('datadict.mapComp')
              }
            },
            {
              prop: 'mapBase',
              label: 'website.signupContactCol.list.mapBase',
              align: 'center',
              format: {
                dict: this.$t('datadict.mapBase')
              }
            },

            {
              prop: 'mapCompAttr',
              label: 'website.signupContactCol.list.mapCompAttr',
              align: 'center',
              format: {
                dict: this.$t('datadict.mapCompAttr')
              }
            },
            {
              prop: 'enumLable',
              label: 'website.signupContactCol.list.enumLable'
            },
            {
              prop: 'mapType',
              label: 'website.signupContactCol.list.mapType',
              align: 'center',
              format: {
                dict: this.$t('datadict.yesNo')
              }
            },
            {
              prop: 'mapSort',
              label: 'website.signupContactCol.list.mapSort'
            }
          ]
        }
      },
      baseInfoList: [
        { label: '姓名', value: 'name', isSee: false },
        { label: '性别', value: 'sex', isSee: false },
        { label: '证件', value: 'certificate', isSee: false },
        { label: '照片', value: 'photo', isSee: false }
      ],
      contactWayList: [
        { label: '地址', value: 'addres', isSee: false },
        { label: '手机号', value: 'mobile', isSee: false },
        { label: '备用手机', value: 'spareMobile', isSee: false },
        { label: '固定电话', value: 'phone', isSee: false },
        { label: '传真', value: 'fax', isSee: false },
        { label: '邮箱', value: 'email', isSee: false },
        { label: '备用邮箱', value: 'spareEmail', isSee: false },
        { label: '微信号', value: 'wechat', isSee: false },
        { label: 'QQ号', value: 'qq', isSee: false }
      ],
      workInfoList: [
        { label: '公司', value: 'company' },
        { label: '部门', value: 'department' },
        { label: '职位', value: 'position' }
      ],
      customInfoList: [
        { label: '短文本', value: 'input' },
        { label: '长文本', value: 'textarea' },
        { label: '数字', value: 'number' },
        { label: '单选框', value: 'radio' },
        { label: '复选框', value: 'checkbox' },
        { label: '下拉列表', value: 'select' },
        { label: '下拉复选框', value: 'selects' },
        { label: '附件', value: 'file' },
        { label: '日期', value: 'date' }
      ],
      specialInfoList: [
        { label: '分割线', value: 'crossLine' },
        { label: '分页', value: 'paging' },
        { label: '说明信息', value: 'explainInfo' }
      ],
      test: '',
      checkAll: false,
      isIndeterminate: true,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      isCommonSetShow: true, // 通用设置是否显示
      isPublicitySetShow: true, // 会议宣传是否显示
      isRegisterSetShow: true, // 注册登录是否显示
      customInfoCount: 0, // 自定义信息数量
      textareaNum: 35, // 长文本字段序号为 36-40
      pagingCount: 0, // 分页数量
      pageTotal:0,
      eventName: '', // 会议名称
      drag: false,
      countryCodeOptions: [], // 国际区号下拉选项  label - value
      buttonCodeOptions: [], //按钮字典
      skipCodeOptions: [], //跳转页面字典
      setInfoList: [], // 选中的配置信息列表
      batchEditOptions: '', // 批量编辑信息
      // 表格高度
      formSetHeight: 0,

      appearanceSetForm: {
        titleChinese: '', // 标题
        titleEnglish: '', // 英文标题
        language: ['中文'], // 语言
        // language: ['中文'], // 语言
        color: '#409EFF', // 主色调
        isPropaganda: 0, // 是否开启会议宣传
        // BannerList: [], // banner 列表
        meetingFile: '',
        appFile: '',
        isMeetingDate: 0, // 是否显示会议时间
        isMeetinPlace: 0, // 是否显示会议地点
        isMeetinCountdown: 0, // 是否显示倒计时
        profile: '', // 会议简介

        // registerBannerPCList: [], // 注册登录PC BannerList
        loginPcFile: '',
        // registerBannerMobileList: [], // 注册登录移动端 BannerList
        loginAppFile: '',
        isLoginDate: 0, // 是否显示会议时间
        isLoginPlace: 0, // 是否显示会议地点
        isLoginCountdown: 0 // 是否显示倒计时
      },
      setForm: {
        checkedSex: '',
        chenkedCertificate: [],
        verifyType: '',
        nation: '',
        province: '',
        city: '',
        county: '',
        detailedAdress: '',
        defaultCountryCode: '',
        secondPhonedefaultCountryCode: '',
        mobilePhoneVerify: [],
        telephoneDefaultCountryCode: '',
        faxDefaultCountryCode: '',
        checkedOptions: [],
        selectMultipleCheckedOptions: [],
        date: ''
      },
      checkedIndex: 0, // 选中预览item下标
      queryResult: {
        appFile: '', //手机文件
        backgroundFile: '', //背景图文件
        describe: '', //描述
        eventCode: '', //会议code
        isSkip: '', //是否跳过当前页(1是0否)
        resultButton: [], //结果页按钮表
        skipPage: '', //跳转页面(数据字典SKIP_PAGE)
        skipWebsite: '', //跳转网址
        theme: '', //提示主题
        type: '' //1、报名成功，2、待审核，3、不通过
      },
      resultSetForm: {
        isNeedApprove: '0', // 是否需要审核
        successTitle: '', // 报名成功提示主题
        successDescribe: '', // 报名成功描述
        successBanner: '', // 报名成功Banner
        successBackground: '', // 报名成功背景图
        successIsJumpCurrentPage: '0', // 是否跳过当前页面
        successJumpPage: '', // 选择跳转页面
        successOutPageUrl: '', // 站外页面URL
        successButtonList: [
          {
            name: '', // 按钮名称
            value: '' // 按钮功能
          }
        ],

        waitReviewTitle: '', // 待审核 提示主题
        waitReviewDescribe: '', // 待审核 描述
        waitReviewBanner: '', // 待审核 Banner
        waitReviewBackground: '', // 待审核 背景图
        waitReviewIsJumpCurrentPage: '0', // 待审核 是否跳过当前页面
        waitReviewJumpPage: '', // 待审核 选择跳转页面
        waitReviewOutPageUrl: '', // 待审核 站外页面URL
        waitReviewButtonList: [
          {
            name: '', // 按钮名称
            value: '' // 按钮功能
          }
        ],

        noPassTitle: '', // 不通过提示主题
        noPassDescribe: '', // 不通过 描述
        noPassBanner: '', // 不通过Banner
        noPassBackground: '', // 不通过背景图
        noPassIsJumpCurrentPage: '0', // 不通过 是否跳过当前页面
        noPassJumpPage: '', // 不通过 选择跳转页面
        noPassOutPageUrl: '', // 不通过 站外页面URL
        noPassButtonList: [
          {
            name: '', // 按钮名称
            value: '' // 按钮功能
          }
        ]
      },
      successIsShow: true, // 报名成功是否显示
      waitReviewIsShow: true, // 报名成功是否显示
      noPassIsShow: true, // 报名成功是否显示
      isFormSetComplete: false, // 表单设置是否完成
      resultNoFrom: [{ appFile: '', backgroundFile: '', describeInfo: '', isSkip: 0, skipPage: '', skipWebsite: '', theme: '', resultButton: [], type: '' }],
      resultFrom: [
        { appFile: '', backgroundFile: '', describeInfo: '', isSkip: 0, skipPage: '', skipWebsite: '', theme: '', resultButton: [], type: '' },
        { appFile: '', backgroundFile: '', describeInfo: '', isSkip: 0, skipPage: '', skipWebsite: '', theme: '', resultButton: [], type: '' },
        { appFile: '', backgroundFile: '', describeInfo: '', isSkip: 0, skipPage: '', skipWebsite: '', theme: '', resultButton: [], type: '' }
      ],
      numDigit:{code:'009',name:4},
      decimalPlaces:{code:'010',name:4}
    }
  },
  components: {
    draggable,
    applySet,
    appearanceSet,
    formSet,
    resultSet
  },
  mounted () {
    this.tableComputed()
    // this.getEventInfo()
    // 获取国际区号数据字典
    this.countryCodeOptions = this.$t('datadict.countryCode')
    // 获取按钮下拉数据字典
    this.buttonCodeOptions = this.$t('datadict.resultSkipPage')
    // 获取跳转页面数据字典
    this.skipCodeOptions = this.$t('datadict.resultBtn')
  },
  computed: {
    ...mapGetters(['dataDictList', 'sidebar', 'clientWidth', 'clientHeight']),
    httpHeaders () {
      return {
        Authorization: 'Bearer ' + this.$store.getters.token
      }
    }
  },
  watch: {

    customInfoCount (newVal, oldVal) {
      if (newVal > 0) {
        let coustomInfoIndex = 0
        let textareaNum = 35 // 长文本字段需要为 36-40
        this.setInfoList.forEach((item, index) => {
          if (item.isCoustomInfo) {
            if (item.isTexeArea) {
              textareaNum++
              item.mapCode = 'reservedStr' + textareaNum
            } else {
              coustomInfoIndex++
              item.mapCode = 'reservedStr' + coustomInfoIndex
            }
          }
        })
      }
    },
    pagingCount (newVal, oldVal) {
      if (newVal > 0) {
        let pagingIndex = 0
        this.setInfoList.forEach((item, index) => {
          if (item.isPaging) {
            pagingIndex++
            item.pagingIndex = pagingIndex
            item.mapCode = 'paging' + pagingIndex
          }
        })
      }
    },
    clientHeight () {
      this.tableComputed()
    },
    stepIndex (newVal, oldVal) {
      if (newVal == 0) {
        // this.getAppearanceSet()
      }
    },
    formUpdateStatus (newVal, oldVal) {
      if (newVal==true) {
        this.$refs.resultSet.getEventInfo(this.form.listQuery.data.eventCode)
      }
    }
  },
  methods: {
    formUpdateStatusFn(v){
      this.formUpdateStatus=v
    },
    stepIndexFn(v){
      this.stepIndex = v
    },
    applySetFormFn (applySetForm) {
      this.applySetForm = applySetForm
    },
    setResult () {
      this.stepIndex = 2
      this.resultSetForm.isNeedApprove = '1'
    },

    selectMultipleChange (val) { },
    // 分步改变
    stepIndexChange (setpIndex) {
      this.stepIndex = setpIndex
    },
    isFormSetCompleteFn (status) {
      this.isFormSetComplete = status
    },

    numberChange (val) {
      // numberDigitLimit: 4, // 数字位数限制
      // decimalPlacesLimit: 4, // 小数点位数限制.
      let integer = val.split('.')[0] || ''
      let decimal = val.split('.')[1] || ''
      if (Number(integer) >= Math.pow(10, this.setInfoList[this.checkedIndex].numberDigitLimit)) {
        this.test = this.test
      }
      if (decimal.length > this.setInfoList[this.checkedIndex].decimalPlacesLimit) {
        this.test = this.test
        return
      }
    },

    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    onChangeAll (params) {
      // 会议编码 params.code
      // 会议名称 params.name

      this.form.listQuery.data.eventCode = params.code
      this.eventName = params.name
      this.stepIndex = 0
      this.$refs.formSet.pageTotal=0
      this.$refs.formSet.pagingCount=0
      // setTimeout(() => {
      //   if (window.frames['myframe']){
      //     window.frames['myframe'].setContentProfile('')
      //   }
      // }, 2000)
      // setTimeout(() => {
      //  if (window.frames['myframe_']){
      //     window.frames['myframe_'].setContentProfile('')
      //   }
      // }, 1000)
      setTimeout(() => {
        if (window.frames['myframe']){
          window.frames['myframe'].setContents('')
          window.frames['myframe'].setContents(this.appearanceSetForm.profile)
        }
      }, 3000)
      this.$refs.attCodeSet.signupContactCodeRuleFn(params.code)
      this.$refs.attCodeSet.pagingCount=0
      this.$refs.appearanceSet.getAppearanceSet(params.code)
      this.$refs.formSet.getEventInfo(params.code,params.name )
      this.$refs.attCodeSet.cmsEventInfoChildrenFn(params.code )
      this.$refs.formSet.cmsEventInfoChildrenFn(params.code )
      this.$refs.resultSet.getResultFn(params.code)
      this.$refs.resultSet.getEventInfo(params.code)
      this.$refs.attCodeSet.copyHrefShow=false
    },
    initialize () {
      if (this.form.listQuery.data.eventCode == '') {
        this.$message.warning(this.$t('form.pleaseSelectMeeting'))
        return
      }
      request({
        url: '/api/register/signupContactCol/initialize',
        method: 'POST',
        data: {
          data: this.form.listQuery.data.eventCode,
          funcModule: '表单设置',
          funcOperation: '表单初始化'
        }
      })
        .then(response => {
          this.$notify(notifySuccess({ msg: this.$t('biz.msg.updateSuccess') }))
          this.loading = false
          this.handleCloseDialog(true)
        })
        .catch(() => {
          this.$refs.bsTable.doRefresh()
        })
    },

    // 计算列表高度
    tableComputed () {
      // const elHead = document.getElementById('elHead')
      this.formSetHeight = 0

      // 顶部菜单 高48px
      this.formSetHeight -= 48
      // tagView 高 36px
      this.formSetHeight -= 36
      // 头部表单 高 68
      this.formSetHeight -= 68
      // 步骤条 高 57
      this.formSetHeight -= 57
      // padding 10px
      this.formSetHeight -= 20
      // 调节尺寸
      this.formSetHeight -= 10

      // 是否最大化
      if (screenfull.isFullscreen) {
        this.formSetHeight += 48
        this.formSetHeight += 36
      }
      this.formSetHeight += this.clientHeight

      // this.formSetHeight = this.clientWidth < 1366 ? (this.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 97 : this.clientHeight - getElHeadHeight - 67) : this.mainData.isTopBar ? this.clientHeight - getElHeadHeight - 77 : this.clientHeight - getElHeadHeight - 47
      // this.formSetHeight = this.formSetHeight - 50
    }
  }
}
</script>
<style>
.el-form-label__frameBox {
  display: none;
}

.el-upload .el-upload-dragger {
  width: 150px;
  height: 150px;
}

.upload-demo .el-upload--picture-card {
  position: static;
  overflow: inherit;
}
</style>

<style lang="scss" scoped>
.transition-box {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0;
  width: 100%;
  height: 700px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 90%;
  height: 90%;
  background-color: #f2f2f2;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .centerContent {
    width: 80%;
    height: 500px;

    .themeTitle {
      width: 100%;
      height: 150px;
      padding-top: 40px;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-bottom: 30px;
      text-align: center;
      // display: flex;
      // flex-direction: columns;
      // justify-content: center;
      // align-items: center;
    }

    .successInfo {
      position: relative;
      width: 100%;
      height: 200px;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-bottom: 80px;
    }
  }

  .pageStatus {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px;
    border-radius: 50%;
    background-color: #f2f2f2;
    border: 1px solid #ccc;
  }
}

.steps {
  width: 80%;
  margin: 0 auto;

  .stepIcon {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid;
    background: #fff;
  }
}

.formSet {
  display: flex;
  justify-content: space-between;
  min-width: 1250px;

  .formInfo {
    width: 20%;
    overflow: auto;

    .formInfoTitle {
      text-align: center;
      font-size: 15px;
    }

    .formInfoItems {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
    }

    .formInfoItem {
      min-width: 50px;
      margin: 10px 10px;
      text-align: center;
      cursor: pointer;
    }
  }

  .formPreview {
    width: 60%;
    overflow: auto;
    position: relative;
    margin: 0 20px;

    .setInfoItem {
      width: 100%;
      margin: 10px 0;
      padding: 10px 30px;
      // background: #eee;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .form-item-input {
        width: 100%;

        .addresItem {
          margin-top: 15px;
        }

        .avatar-uploader {
          // width: 100px;
          display: inline-block;
          vertical-align: top;

          .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }

          .el-upload:hover {
            border-color: #409eff;
          }
        }

        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 100px;
          height: 100px;
          line-height: 100px;
          text-align: center;
        }

        .avatar {
          width: 100px;
          height: 100px;
          display: block;
        }
      }

      .remove-button {
        cursor: pointer;
        font-size: 20px;
        line-height: 28px;
        margin-left: 10px;
      }
    }

    .setInfoItem:hover {
      background: #eee;
    }

    .setInfoItemlabel {
      display: inline-block;
      width: 100px;
      text-align: right;
      margin-right: 10px;
    }

    .optionBtns {
      position: sticky;
      bottom: 0;
      // width: calc(100% - 40px);
      text-align: center;
    }
  }

  .formEdit {
    width: 20%;
    overflow: auto;

    .formInfoTitle {
      text-align: center;
      font-size: 15px;
    }

    .eidtContentItem {
      // line-height: 32px;
    }

    .el-input-number__decrease,
    .el-input-number__increase {
      height: auto !important;
    }

    .systemName {
      background: #eee;
      padding: 10px 20px;
      margin-bottom: 20px;
    }

    .eidtContent {
      padding: 0 20px;

      .eidtContentItem {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 10px 0;

        .eidtContentItemTitle {
          font-weight: bold;
        }

        .VerifyExplain {
          color: #ccc;
          font-weight: 400;
          padding-left: 30px;
          margin-bottom: 10px;
          white-space: normal;
        }
      }
    }
  }
}

.appearanceSet {
  padding: 20px 50px;
  min-width: 1250px;
  background: #fff;
  overflow: auto;

  .appearanceSetItem {
    .el-form-item {
      // margin-left: 100px;
      .el-form-item__label {
        margin-right: 100px;
      }
    }

    .setItemTitle {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
    }
  }

  .appearanceSetBtns {
    text-align: center;
  }
}

.resultSet {
  padding: 20px 10px;
  min-width: 1250px;
  background: #fff;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .resultSetItem {
    .setItemTitle {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
    }

    .previewCard {
      width: 290px;
      height: 515px;
      position: relative;

      .pageStatus {
        position: absolute;
        top: 15px;
        right: 15px;
        padding: 5px;
        border-radius: 50%;
        background-color: #f2f2f2;
      }

      pre {
        white-space: pre-wrap;
        word-break: break-word;
      }

      .previewBtns {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .el-button {
          width: 150px;
          margin: 5px 0;
        }
      }

      .centerContent .previewBtnsRow {
        // position: absolute;
        width: 100%;
        height: 100px;
        // bottom: 20px;
        // margin: 20px 0;
        // left: 50%;
        // right: 50%;
        // transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        // flex-direction: row;
        // align-items: center;

        .el-button {
          width: 150px;
          margin: 5px 0;
        }
      }
    }

    .el-upload-dragger {
      height: 120px;

      .el-icon-upload {
        margin: 16px 0;
      }
    }

    .el-upload__tip {
      margin-top: 0;
    }

    .remove-button {
      cursor: pointer;
      font-size: 20px;
      line-height: 28px;
      margin-left: 10px;
    }
  }

  .resultSetBtns {
    text-align: center;
  }
}
</style>

<style scoped>
.formPreview /deep/ .el-card__body {
  min-height: 100%;
}

.formEdit /deep/ .el-card__body {
  padding: 0;
}

.certificateOptions {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.certificateVerify {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>