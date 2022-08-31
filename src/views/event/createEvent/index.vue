<template>
  <div class="create_event box">
    <div class="path">
      <ul>
        <el-button type="text" @click="$router.replace({path:'/eventlist'})">我的会议</el-button>
        <li v-if="$route.query.type" style="color: #7c7f82">></li>
        <li v-if="$route.query.type" style="color: #409EFF;cursor:pointer" @click="$router.go(-1)">会议详情 ({{$route.query.name}})</li>
        <li style="color: #7c7f82">></li>
        <li style="color: #7c7f82">{{eventId?"编辑会议":"创建会议"}}</li>
      </ul>
    </div>
    <el-container style="height:100%">
      <el-header class="header_title space-between">
        <h2>填写会议基本信息</h2>
        <h2 style="cursor:pointer" v-on:click="hisDialog = true">复制历史会议</h2>
      </el-header>
      <el-main>
        <div class="base_meet">
          <el-form :model="baseMeet" :rules="rules" ref="baseMeet" label-width="300px">
            <el-form-item label="会议名称 Event Name" prop="event_name">
              <el-input class="demand_500" clearable v-model="baseMeet.event_name"></el-input>
            </el-form-item>
            <el-form-item label="建团类型 Group Type" prop="tourist_group_type">
              <el-select class="demand_500" clearable v-model="baseMeet.tourist_group_type">
                <el-option label="普通团" value="1"></el-option>
                <el-option label="转团" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="baseMeet.tourist_group_type == 0" label="原团电脑号" prop="oldEventId">
              <el-input class="demand_500" clearable v-model="baseMeet.oldEventId"></el-input>
            </el-form-item>
            <el-form-item label="客户 Consumer" prop="company_id">
              <el-select class="demand_500" clearable filterable v-model="baseMeet.company_id" @change="getCustomerConfig(2)">
                <el-option v-for="item in customerList" :label="item.shortname" :value="item.id.toString()" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户联系人 Event Owner" prop="company_contacts">
              <el-select class="demand_500" clearable filterable v-model="baseMeet.company_contacts" @change="getContact">
                <el-option v-for="item in customerContactList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
              <el-button class="mar_l10" size="small" type="text" @click="addContactDialogTap">添加客户联系人</el-button>
            </el-form-item>
            <el-form-item label="客户所属部门 Owner's Department" prop="departmentName">
              <el-input class="demand_500" disabled v-model="baseMeet.departmentName"></el-input>
            </el-form-item>
            <el-form-item label="客户联系电话 Owner's Phone NO.">
              <el-input class="demand_500" disabled v-model="baseMeet.phone"></el-input>
            </el-form-item>
            <el-form-item label="客户邮箱 Owner's E-mail">
              <el-input class="demand_500" disabled v-model="baseMeet.email"></el-input>
            </el-form-item>
            <el-form-item label="MSA" prop="MSA">
              <el-input class="demand_500" clearable v-model="baseMeet.MSA"></el-input>
            </el-form-item>
            <el-form-item label="活动类型 Event Type" prop="activity_type">
              <el-select class="demand_500" clearable v-model="baseMeet.activity_type" @change="selectActive">
                <el-option v-for="item in activityList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="餐标限制 Food Limit" prop="food_limit">
              <el-input disabled class="demand_500" clearable v-model="baseMeet.food_limit"></el-input>
            </el-form-item>
            <el-form-item label="Cvent号" prop="cvent_no">
              <el-input class="demand_500" clearable v-model="baseMeet.cvent_no"></el-input>
            </el-form-item>
            <el-form-item label="会议总预算 Total Budget">
              <el-input class="demand_500" clearable v-model="baseMeet.total_budget"></el-input>
            </el-form-item>
            <el-form-item label="服务类型 Service Type" prop="service_type">
              <el-select class="demand_500" clearable v-model="baseMeet.service_type" @change="serviceTypeChange">
                <el-option v-for="item in serviceList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会议城市 City" prop="event_city">
              <el-select :disabled="Boolean(baseMeet.online_meeting)" class="demand_500" clearable filterable v-model="baseMeet.event_city">
                <el-option v-for="item in cityList" :label="item.value" :value="item.code" :key="item.code"></el-option>
              </el-select>
              <el-checkbox v-model="baseMeet.online_meeting" :true-label="1" :false-label="0" style="margin-left:20px">线上会议</el-checkbox>
            </el-form-item>
            <el-form-item label="会议地点 Place" prop="meeting_place">
              <el-input class="demand_500" clearable v-model="baseMeet.meeting_place"></el-input>
              <el-checkbox v-model="baseMeet.is_hotel" :true-label="1" :false-label="0" style="margin-left:20px">是否在酒店开会</el-checkbox>
            </el-form-item>
            <el-form-item label="参会人数 Attendee NO." class="attendee_no" prop="attendee_no">
              <el-col :span="5" class="flex_row">
                <el-form-item class="attendee_no" prop="inside_number">
                  内部人数：
                  <el-input clearable v-model.number="baseMeet.inside_number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" class="flex_row">
                <el-form-item class="attendee_no" prop="external_number">
                  外部人数：
                  <el-input clearable v-model.number="baseMeet.external_number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" class="flex_row">
                总人数：{{baseMeet.attendee_no}}
                <!-- <el-input v-input-filter:int clearable v-model.number="baseMeet.attendee_no"></el-input> -->
              </el-col>
            </el-form-item>
            <el-form-item label="会议开始日期 Start Date" prop="event_startdate">
              <el-date-picker class="demand_500" clearable type="date" :picker-options="pickerStart" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="baseMeet.event_startdate" @change="timeStart"></el-date-picker>
            </el-form-item>
            <el-form-item label="会议结束日期 End Date" prop="event_enddate">
              <el-date-picker class="demand_500" clearable type="date" :picker-options="pickerEnd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="baseMeet.event_enddate"></el-date-picker>
            </el-form-item>
            <el-form-item label="发票类型 Invoice Type" prop="invoice_type">
              <el-radio v-model="baseMeet.invoice_type" disabled :label="0">普票</el-radio>
              <el-radio v-model="baseMeet.invoice_type" disabled :label="1">专票</el-radio>
              <el-radio v-model="baseMeet.invoice_type" disabled :label="2">免税</el-radio>
            </el-form-item>
            <el-form-item label="是否办理免税 Duty Free" prop="is_duty_free">
              <el-radio v-model="baseMeet.is_duty_free" :label="0">否</el-radio>
              <el-radio v-model="baseMeet.is_duty_free" :label="1">是</el-radio>
            </el-form-item>
            <el-form-item label="是否是DMC创建会议" prop="meeting_type" hidden>
              <el-input value="0"></el-input>
            </el-form-item>
            <el-form-item label="附件 Document Attachments">
              <div class="demand_500 text_left">
                <el-upload ref="upload" :action="UploadFilesUrl" :before-upload="fileLimit" :on-success="uploadFile" :on-preview="downloadFile" :on-remove="deleteFile" :file-list="fileList" :show-file-list="true" :multiple="true">
                  <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                </el-upload>
                <br>
                <span class="ps">注意: 只允许上传以下文件类型：doc、docx、xls、xlsx、pdf、ppt、pptx、jpeg、jpg、png、zip、eml、rtf、msg、gif、bmp、tif、tiff、rar、iso、7z、tar、bz2、gzip、txt、mp4、xps、odf，最大30M</span>
              </div>

            </el-form-item>
            <div class="row_around" style="margin-right:50px">
              <!-- <el-button class="submit_btn" v-on:click="subEvent(0)" type="primary"> 创建会议 </el-button> -->
              <el-button class="submit_btn" v-on:click="subEvent(0)" type="primary">{{ (this.$route.query.eventSearchType && this.$route.query.eventSearchType != 4)?'保存':'创建会议'}}</el-button>
              <el-button v-if="(!eventId || this.$route.query.eventSearchType == 4)" class="submit_btn" v-on:click="subEvent(1)" type="info">保存草稿</el-button>
            </div>
          </el-form>
        </div>
      </el-main>
    </el-container>
    <el-dialog title="复制历史会议" :visible.sync="hisDialog" v-if="hisDialog" width="650px" center @close="hisDialog = false">
      <div class="event_list" v-if="eventList.length">
        <div v-for="(item, index) in eventList" class="event_item" :key=index>
          <p class="text_left">会议名称：{{item.event_name}}</p>
          <p class="text_left">活动类型：{{item.activity_name}}</p>
          <p class="text_left" v-if="item.event_startdate && item.event_enddate">会议时间：{{item.event_startdate.substring(0,10)}}--{{item.event_enddate.substring(0,10)}}</p>
          <p class="text_left">参会人数：{{item.attendee_no}}</p>
          <div class="flex_row justify_center">
            <el-button type="primary" size="mini" @click="copyEvent(item, 1)">复制此会议</el-button>
          </div>
        </div>
        <div style="width: 100%" class="flex_row justify_center">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next" :total="pageInfo.totalCount"></el-pagination>
        </div>

      </div>
    </el-dialog>
    <el-dialog v-bind:visible.sync="hisStartDialog" width="650px" center @close="hisStartDialog = false">
      <div class="his_title">
        <span>复制会议</span>
        <em>（复制完成后可在会议详情页编辑会议基本信息和采购需求）</em>
      </div>
      <div class="his_date">
        <span>会议开始时间：</span>
        <el-date-picker size="small" class="demand_200" clearable type="date" :picker-options="pickerStart" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="hisStartDate"></el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button @click="preStep">上一步</el-button>
        <el-button type="primary" @click="copyEvent(0,2)">完 成</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="eventId?'保存成功':'会议创建完成'" :visible.sync="demandDialog" width="650px" center @close="demandDialog = false">
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button type="primary" size="small" @click="goDemand">填写采购需求</el-button>
        <el-button type="primary" size="small" @click="goDetail">查看会议详情</el-button>
      </span>
    </el-dialog>
    <!--    客户联系人-->
    <el-dialog title="客户联系人" :visible.sync="addContactDialog" :close-on-click-modal="false" width="500px" center @close="addContactDialog = false">
      <el-form :model="contactInfo" :rules="contactRules" ref="contactInfo" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input class="demand_300" size="small" v-model="contactInfo.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input type="number" class="demand_300" :maxlength="11" size="small" v-model="contactInfo.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mailbox">
          <el-input type="email" class="demand_300" size="small" v-model.trim="contactInfo.mailbox" clearable></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company_id">
          <el-select class="demand_300" size="small" clearable filterable v-model="contactInfo.company_id" @change="getCustomerConfig(1)">
            <el-option v-for="item in customerList" :label="item.shortname" :value="item.id.toString()" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="customer_id">
          <el-select class="demand_300" size="small" clearable filterable v-model.number="contactInfo.customer_id">
            <el-option v-for="item in departmentList" :label="item.shortname" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button size="small" @click="addContactDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addContactTap('contactRules')">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import inputFilter from '@/assets/js/filter'
import { validatePhone,validateEMail } from '@/assets/js/validator'
import { MAINHOST, } from "@/config";
import {limitsEffect} from "@/utils/uploadRestrictions.js"

export default {
  name: "createEvent",
  data() {
    return {
      fileList:[],
      UploadFilesUrl: MAINHOST + "/MeetingMa/UploadFiles",
      uploadList:{}, // 附件信息
      eventId:'',
      limitDate:new Date(),
      addContactDialog: false, //添加客户联系人弹窗
      contactInfo:{
        id:"",
        name:'',
        phone:'',
        mailbox:'',
        customer_id:"",
        company_id:""
      },
      contactRules:{
        name: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' },
          { pattern:/^((0\d{2,3}-\d{7,8})|(1[3567849]\d{9}))$/, message: "请输入合法手机号/电话号", trigger: "blur" }
        ],
        mailbox: [
          { required: true, message: '请输入联系人邮箱', trigger: 'blur' },
          {validator:validateEMail, trigger: "blur"},
          // { pattern:/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: "请输入正确的邮箱", trigger: "blur"}
        ],
        customer_id: [{ required: true, message: '请选择部门', trigger: 'change' }],
        company_id: [{ required: true, message: '请选择公司', trigger: 'change' }]
      },
      hisDialog: false,
      hisStartDialog: false,
      demandDialog: false,
      hisStartDate:'',// 复制会议 开始时间
      container_height: document.documentElement.clientHeight - 20,
      eventList: [],
      cityList: [],
      customerList: [],
      customerContactList: [],
      mealList: [],
      activityList: [],
      departmentList: [],
      serviceList: [],
      cityLisy:[],
      rules: {
        attendee_no: [{ required: true, message: '请输入参会人数', trigger: 'blur' }],
        external_number: [{ required: true, message: '请输入外部人数', trigger: 'blur' }],
        inside_number: [{ required: true, message: '请输入内部人数', trigger: 'blur' }],
        event_name: [{ required: true, message: '请输入会议名称', trigger: 'blur' }],
        // cvent_no: [{required: true, message: '请输入Cvent号', trigger: 'blur' }],
        oldEventId: [{ required: true, message: '请输入原团电脑号', trigger: 'blur' }],
        tourist_group_type: [{ required: true, message: '请选择建团类型', trigger: 'change' }],
        company_id: [{ required: true, message: '请选择客户', trigger: 'change' }],
        activity_type: [{ required: true, message: '请选择活动类型', trigger: 'change' }],
        event_city: [{ required: true, message: '请选择会议城市', trigger: 'change' }],
        company_contacts: [{ required: true, message: '请选择客户联系人', trigger: 'change' }],
        departmentName: [{ required: true, message: '客户联系人必须有所属部门', trigger: ['blur','change'] }],
        //food_limit: [{ required: true, message: '请选择餐标限制', trigger: 'change' }],
        event_startdate: [{required: true, message: '请选择日期', trigger: 'change' }],
        event_enddate: [{ required: true, message: '请选择日期', trigger: 'change' }],
        service_type: [{ required: true, message: '请选择服务类型', trigger: 'change' }],
        invoice_type: [{ required: true, message: '请选择发票类型', trigger: 'change' }],
      },
      baseMeet: {
        event_name:'',
        tourist_group_type:'1',
        oldEventId: '',
        company_id: '',
        activity_type: '',
        cvent_no: '',
        total_budget: '',
        service_type: '',
        food_limit: '',
        attendee_no: 0,
        inside_number: '',
        external_number: '',
        event_startdate: '',
        event_enddate: '',
        company_contacts: '',
        email: '',
        phone: '',
        MSA: '',
        invoice_type: 1,
        is_duty_free: '',
        department: '',
        departmentName:'',
        event_city: '',
        document_attachments_file_path:[],
        files:[],
        fileInfos:[],
        service_provider_id:'',
        online_meeting:false, // 是否线上会议
        meeting_place:"", // 会议地点
        is_hotel: false,
        meeting_type: 0, // DMC创建会议：1
      },
      pageInfo:{
        totalCount: 0
      },
      createDate: new Date().getTime(),
      pageSize: 6,
      page: 1,
      hisId: '',
      hisItem: '',
      his_startDate:'',
      newEventId:'',// 新会议id
      newEventName:'',// 新会议name
      pickerStart: {
        disabledDate :(time)=>{
          return time.getTime() < Date.now() - 8.64e7;
         // if (this.baseMeet.event_startdate) {
         //    return time.getTime() < new Date(this.baseMeet.event_startdate).getTime();
         //  }
         //  return time.getTime() <= new Date(this.baseMeet.event_enddate).getTime() - 8.64e7;
        }
      },
      pickerEnd: {
         disabledDate :(time)=> {
          if (this.baseMeet.event_enddate){
            return time.getTime() <= new Date(this.baseMeet.event_startdate).getTime()- 8.64e7 || time.getTime() <= new Date(this.baseMeet.createDate).getTime() - 8.64e7;
          }
          return time.getTime() >= new Date(this.event_startdate).getTime() - 8.64e7;
          }
      },
    }
  },
  directives: {
    inputFilter
  },
  watch:{
    'baseMeet.company_id':{
      deep:true,
      handler:function(newV,oldV){
        // this.contactInfo.company_id = newV
        // this.getCustomerConfig(2)
      }
    },
    'baseMeet.company_contacts':{
      deep:true,
      handler:function(newV,oldV){
        // this.getContact()
      }
    },
    'baseMeet.online_meeting':{
      deep:true,
      handler:function(newV,oldV){
        if(newV){
          this.rules.event_city[0].required = false;
          this.baseMeet.event_city = '';
        }else{
          this.rules.event_city[0].required = true;
        }
      }
    },
    'baseMeet.inside_number':{
      deep:true,
      handler:function(newV,oldV){
        if(Number(newV) && newV> 0){
          this.rules.external_number[0].required = false;
          this.baseMeet.attendee_no = Number(newV) + Number(this.baseMeet.external_number);
        }else{
          
          this.baseMeet.inside_number = ''
          this.baseMeet.attendee_no = this.baseMeet.external_number;
        }
      }
    },
    'baseMeet.external_number':{
      deep:true,
      handler:function(newV,oldV){
        if(Number(newV) && newV> 0){
          this.rules.inside_number[0].required = false;
          this.baseMeet.attendee_no = Number(newV) + Number(this.baseMeet.inside_number) ;
        }else{
          this.baseMeet.external_number = '';
          this.baseMeet.attendee_no = this.baseMeet.inside_number;
        }
      }
    },
  },
  created() {
    this.getCustomerList();
    this.getCityList();
    // this.getHistoryEvent();
    this.getServiceType();
  },
  mounted() {
    this.$nextTick(()=>{
      let query = this.$route.query;
      if(query && query.type && query.type === 'edit') {
        this.eventId = this.$route.query.id;
        this.baseMeet.id = this.$route.query.id;
        this.baseMeet.event_num = this.$route.query.event_num;
        this.getEventDetail()
      }else {
        this.eventId = ''
      }
    })
  },
  methods: {
    // 获取会议基本信息
    getEventDetail(){
      this.requestApi({
          url: '/CustomerConfiguration/Get_event_info',
          method: 'get',
          data: {eventId:this.baseMeet.event_num,eventSearchType: this.$route.query.eventSearchType},
        }).then(res => {
        // debugger
        if(res.EventModels) {
          this.baseMeet = res.EventModels[0];
          this.fileList = []; // 附件列表赋值
          this.baseMeet.fileInfos.forEach(file => {
            this.fileList.push({id:file.id,name:file.file_name, url:file.file_path})
          })
          this.baseMeet.tourist_group_type = this.baseMeet.tourist_group_type.toString();
        }

        if( this.baseMeet.company_id){
          this.requestApi({
            url: '/MeetingMa/GetCustomerContactList',
            method: 'get',
            data: { id: this.baseMeet.company_id, type:1},
          }).then(res=>{
            if(res && res !== true) {
              this.customerContactList = res;
              let ContactInfo = this.customerContactList.find(item => { return item.id == this.baseMeet.company_contacts });
              this.baseMeet.email = ContactInfo.mailbox;
              this.baseMeet.phone = ContactInfo.phone;
              // debugger
              this.getContactInfo(ContactInfo.id)
              // this.getContact()
            }else {
              this.customerContactList = [];
            }
          });
        }
        console.log(this.baseMeet)
      })
    },
    // 切换客户、公司
    getCustomerConfig(type,addContact) {
      if(type === 2) {
        this.baseMeet.company_contacts = '';
        this.baseMeet.department = '';
        this.baseMeet.departmentName = '';
        this.baseMeet.email = '';
        this.baseMeet.phone = '';
        this.baseMeet.activity_type = '';
        this.baseMeet.food_limit = '';
        this.requestApi({
          url: '/MeetingMa/GetCustomerContactList',
          method: 'post',
          data: { id: this.baseMeet.company_id, type:1},
        }).then(res=>{
          if(res && res !== true) {
            this.customerContactList = res;
            // 新增联系人成功调用查询联系人接口
            if(addContact){
              this.getContact()
            }
          }else {
            this.customerContactList = [];
          }
        });
      } else if (type === 1) {
        this.contactInfo.customer_id = '';
        this.requestApi({
          url: '/MeetingMa/GetDepartmenty',
          method: 'post',
          data: {CompanyID:this.contactInfo.company_id},
        }).then(res => {
          if(res && res!== true){
            this.departmentList = res
          } else {
            this.$message.warning('请配置该公司部门');
            this.contactInfo.customer_id = ''
          }
        })
      }

    },
    //选择客户联系人
    getContact() {
      debugger
      let data = this.customerContactList.filter(item => { return item.id == this.baseMeet.company_contacts });
      this.baseMeet.activity_type = '';
      this.baseMeet.food_limit = '';
      if(data[0]){
        this.baseMeet.email = data[0].mailbox;
        this.baseMeet.phone = data[0].phone;
        this.getContactInfo(data[0].id)
      }else{
        this.baseMeet.email = '';
        this.baseMeet.phone = '';
        this.getContactInfo('')
      }

    },
    // 客户联系人所属信息
    getContactInfo(id){
      this.requestApi({
        url: '/MeetingMa/GetCustomerContactEdit',
        method: 'post',
        data: {ContactID: id},
      }).then(res => {
        if(res) {
            this.baseMeet.department = res.departmentyid;
            // this.baseMeet.departmentName = res.shortname;
            this.$set(this.baseMeet,'departmentName',res.shortname)
            if(id){ // 如果选了客户联系人，有客户联系人ID
              this.getMeetingType(res.departmentyid);
            }else{
              this.activityList = [];
            }
        }
      })
    },
     // 活动类型
    getMeetingType(id){
      let params ={};
      if(id){
        params = {
          DepartmentyID: id
        }
      }else{
        params = {
          CompanyID: this.baseMeet.company_id
        }
      }
      this.requestApi({
        url: '/MeetingMa/GetMeetingTypeShow',
        method: 'post',
        data: params,
      }).then(res => {
        this.activityList = res
      });
    },

    // 选择活动类型
    selectActive(){
      debugger
      let data = this.activityList.find(item => {return this.baseMeet.activity_type == item.id});
      this.baseMeet.food_limit = data?data.meal_label:'';
    },
    // 是否线上会议切换
    // online_meetingChange(e){
    //   if(e){
    //     this.rules.event_city[0].required = false;
    //     this.baseMeet.event_city = '';
    //   }else{
    //     this.rules.event_city[0].required = true;
    //   }
    // },
    timeStart(){
      if(this.baseMeet.event_startdate>this.baseMeet.event_enddate){
       return this.baseMeet.event_enddate=this.baseMeet.event_startdate
      }
    },
    getServiceType(){
      this.requestApi({
        url: '/MeetingMa/GetServiceType',
        method: 'post',
        data: {},
      }).then(res => {
        this.serviceList = res;
        if(!this.baseMeet.service_type){
          this.baseMeet.service_type = this.serviceList[0].id // 取默认值： 会议等非旅游服务 
          // 会议等非旅游服务  发票类型 默认专票
          this.baseMeet.invoice_type = 1
        }
        
      })
    },
    // 服务类型切换
    serviceTypeChange(value){
      debugger
      if(value == '456d1027-413b-11ec-9db6-fa163ed463f8'){ // 会议等非旅游服务
        // 发票类型 默认专票
        this.baseMeet.invoice_type = 1
      }else if(value == '59266863-413b-11ec-9db6-fa163ed463f8'){ // 旅游服务
        // 发票类型 默认普票
         this.baseMeet.invoice_type = 0
      }
    },
    addContactDialogTap(){
      this.addContactDialog = true;
      this.contactInfo = {id:"", name:'', phone:'', mailbox:'', customer_id:"", company_id:""};
      this.contactInfo.company_id = this.baseMeet.company_id;
      this.getCustomerConfig(1);
    },
    // 添加客户联系人
     addContactTap(formName) {
      this.$refs.contactInfo.validate((valid) => {
        if (valid) {
          this.requestApi({
            url: '/MeetingMa/CustomerContactSava',
            method: 'post',
            data: {Parameter: JSON.stringify(this.contactInfo)},
          }).then(res => {
            if(res) {
              this.addContactDialog = false;
              this.$message.success('添加成功');
              this.getCustomerConfig(2,'addContactSuccess');
              this.baseMeet.company_contacts = res;
            }
          })
        }
      })
    },
    
    // 创建会议0 保存草稿1
    subEvent(id) {
      this.baseMeet.event_status = id;
      if(id === 0){
        localStorage.setItem('event_city_code', this.baseMeet.event_city);
        this.$refs["baseMeet"].validate((valid) => {
          if(valid){
            this.baseMeet.event_enddate = this.baseMeet.event_enddate.slice(0,10) + ' 23:59:59'
            if(this.eventId){
              this.baseMeet.id = this.eventId;
              this.requestApi({
                url: '/CustomerConfiguration/Update_event_info',
                method: 'post',
                data: this.baseMeet,
              }).then(res => {
                if(res){
                  this.demandDialog = true;
                  this.newEventId = this.$route.query.id || this.eventId;
                  this.newEventName = this.$route.query.name || this.baseMeet.event_name;
                }
                
              })
            }else{
              this.requestApi({
                url: '/CustomerConfiguration/Create_event_info',
                method: 'post',
                data: this.baseMeet,
              }).then(res => {
                if(res){
                  this.demandDialog = true;
                  this.newEventId = res.eventId;
                  this.newEventName = res.eventName;
                }
              })
            }
          }else{
            this.$message.warning('请完善会议信息')
          }
        })
      } else {
        if(this.eventId){
          this.baseMeet.id = this.eventId;
          this.requestApi({
            url: '/CustomerConfiguration/Update_event_info',
            method: 'post',
            data: this.baseMeet,
          }).then(res => {
            this.$message.success('已保存至草稿')
            
          })
        }else{
          this.requestApi({
            url: '/CustomerConfiguration/Create_event_info',
            method: 'post',
            data: this.baseMeet,
          }).then(res => {
            this.eventId = res.eventId
            this.$message.success('已保存至草稿')
          })
        }
      }

    },
    fileLimit(file){
      const isLt30M = file.size / 1024 / 1024 < 30;
      if (!isLt30M) {
				this.$message.error('上传附件大小不能超过 30MB!');
				return false;
			}
        return limitsEffect(file) 
    },
    // 上传文件
    uploadFile(e) {
      this.uploadList = e;
      // this.fileList = [{name:e.title, url: e.weburl}];
      if(!this.baseMeet.fileInfos){
        this.baseMeet.fileInfos = []
      }
      // this.baseMeet.files.push({name:e.title, url: e.weburl});
      this.baseMeet.fileInfos.push({id:'',file_name:e.title, file_path: e.weburl});
    },
    // 文件删除
    deleteFile(file, fileList) {
      this.baseMeet.fileInfos = [];
      fileList.forEach(file => {
        if(file.id){
          this.baseMeet.fileInfos.push({id:file.id, file_name: file.name, file_path: file.url});
        }else{
          this.baseMeet.fileInfos.push({id: '', file_name: file.name, file_path: file.response.weburl});
        }
      });
      // this.waitUpload = e;
    },
    // 下载文件
    downloadFile(file){
      let downloadUrl = file.response?file.response.weburl:file.url;
      window.open(downloadUrl, "_blank");
    },

    goDemand(){
      this.$router.push({name:'EventDemand',query:{id: this.newEventId, name: this.newEventName}})
    },
    goDetail() {
      this.$router.push({name:'eventDetail',query:{id: this.newEventId, name: this.newEventName}})
    },
    // 获取客户列表l
    getCustomerList() {
      this.requestApi({
        url: '/UserGroupmanagement/GetCustomerEventInfoPost',
        method: 'post',
        data: {},
      }).then((res) => {
        this.customerList = res
      })
    },
    
    
   
    
    
    // 获取城市
    getCityList() {
      this.requestApi({
        url: '/CustomerConfiguration/GetCitys',
        method: 'GET',
      }).then((res) => {
        this.cityList = res
      })
    },
    // 获取会议历史
    getHistoryEvent(){
      this.requestApi({
        url: '/CustomerConfiguration/Get_event_info',
        method: 'GET',
        data: {page:this.page,pageSize:this.pageSize}
      }).then(res =>{
        this.eventList = res.EventModels;
        this.pageInfo = res.pageInfo
      })
    },
    // 上一步
    preStep(){
      this.hisDialog = true;
      this.hisStartDialog = false;
    },
    //复制会议
    copyEvent(data, type) {
      if(type === 1){
        localStorage.setItem('event_city_code', data.event_city);
        this.hisItem = data;
        this.hisDialog = false;
        this.hisStartDialog = true;
      } else {
        if(!this.hisStartDate){
          this.$message.warning('请选择时间！');
          return
        }
        this.requestApi({
        url: '/CustomerConfiguration/CopyEventInfo',
        method: 'POST',
        data: {id: this.hisItem.id,eventStartDate: this.hisStartDate}
      }).then(res => {
          this.hisStartDialog = false;
          this.demandDialog = true;
          this.newEventId = res.newEventId
        })
      }
    },
    
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getHistoryEvent();
    },
    handleCurrentChange(val) {
      this.page = val;
      console.log(`当前页: ${val}`);
      this.getHistoryEvent();
    },
  }
}
</script>

<style lang="scss">
.create_event {
  .container {
    width: 80%;
    margin-left: 10%;
  }

  .space-between {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .row_around {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  // /deep/ .el-input__inner, .el-date-editor {width: 500px !important}
  .attendee_no /deep/ .el-input {
    width: 50%;
  }

  /deep/ .el-table__body-wrapper {
    overflow-y: auto;
  }

  /deep/ .el-table__fixed-right {
    overflow-y: hidden;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .bill_title div {
    text-align: center;
  }
  .submit_btn {
    margin-right: 50px;
  }
  .ps {
    display: inline-block;
    font-size: 12px;
    color: #999999;
    line-height: 15px;
    width: 500px;
  }
  .event_list {
    display: flex;
    flex-flow: row wrap;
    box-sizing: border-box;
    .event_item {
      width: 280px;
      background: rgb(241, 241, 241);
      padding: 5px;
      margin-right: 10px;
      margin-bottom: 10px;
      p {
        margin-bottom: 5px;
        font-size: 12px;
        color: #646464;
      }
    }
  }
  .his_title {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 10px;
    span {
      font-size: 16px;
      color: #787878;
      line-height: 20px;
    }
    em {
      font-size: 12px;
      color: #f00;
    }
  }
  .his_date {
    padding: 15px 0;
  }
}
.path {
  // width: 1100px;
  height: 55px;
  // background: red;
  margin: auto;
  margin-top: 15px;
}

.path ul {
  display: flex;
  line-height: 55px;
}

.path ul li {
  padding-left: 10px;
}
</style>
