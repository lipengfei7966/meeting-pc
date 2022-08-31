<template>
  <div class="base_part">
    <a v-show="false" :href="downloadUrl" target="_blank" ref="a_click" download></a>
    <div v-if="source == 'approve' || source == 'bid' || source == 'order'" class="nformation flex_row align_center">
      <p>会议基本信息</p>
      <p>Event Profile</p>
      <p v-if="source == 'bid' || source == 'order' || source == 'approve'">（敏感信息对供应商隐藏）</p>
      <img v-if="source == 'bid' || source == 'order' || source == 'approve'" src="@/assets/images/jia.png" @click="conferenceHiding =!conferenceHiding" style="width: 10px; height: 10px;" v-show="!conferenceHiding">
      <img v-if="source == 'bid' || source == 'order' || source == 'approve'" src="@/assets/images/reduce.png" @click="conferenceHiding =!conferenceHiding" alt="" style="width: 11px; height: 11px;" v-show="conferenceHiding">
    </div>

    <div v-if="source == 'stepOne'" class="flex_row justify_between">
      <div class="flex_row align_center">
        <span class="base_title">会议基本信息<em>Event Basic Info. </em></span>
        <span class="base_time"> ({{this.menus.create_date}})</span>
        <div class="showBase_tap flex_row align_center" @click="conferenceHiding = !conferenceHiding">
          <img :src="conferenceHiding ? require('@/assets/images/close.png'):require('@/assets/images/open.png')" alt="">
          <span> {{conferenceHiding?'收起':'展开'}}</span>
        </div>
      </div>
      <div :class="['edit_base_tap']" @click="editBaseTap">
        <!-- <span :class="['base_title', (menus.b2baudstatus == 1 || (!isShowCancelBtn && eventStatu > 0))?'disableColor':'']">编辑基本信息
           <em :class="[(menus.b2baudstatus == 1 || (!isShowCancelBtn && eventStatu > 0))?'disableColor':'']">Edit Basic Info.</em></span> -->
        <span :class="['base_title', (menus.b2baudstatus == 1 || (!isShowCancelBtn && eventStatu > 0))&&!isDMC?'disableColor':'']">编辑基本信息
          <em :class="[(menus.b2baudstatus == 1 || (!isShowCancelBtn && eventStatu > 0))&&!isDMC?'disableColor':'']">Edit Basic Info.</em></span>
      </div>
    </div>
    <div :class="['information',(source == 'approve' || source == 'bid'|| source == 'order')?'margin_auto':'']" v-show=" conferenceHiding">
      <ul>
        <li>
          <span syle="margin-left:6px;">会议名称</span>
          <span style="margin-left:10px; color: #999999;">Event Name:</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.event_name}}</span>
        </li>
        <li>
          <span>建团类型</span>
          <span style="margin-left:10px; color: #999999;">Group Type:</span>
          <span style="margin-left:13px; color: #999999;">{{this.menus.tourist_group_type}}</span>
        </li>
        <li>
          活动类型
          <span style="margin-left:10px; color: #999999;">Event Type:</span>
          <span style="margin-left:10px;">{{this.menus.activity_type}}</span>
        </li>
        <li>
          Cvent号
          <span style="font-size:12px; font-weight: bold; margin-left:10px;">:</span>
          <span style="margin-left:10px;">{{this.menus.cvent_no}}</span>
        </li>
        <li>
          客户
          <span style="margin-left:10px; color: #999999;">Consumer</span>
          <span style=" font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.company_name}}</span>
        </li>
        <li>
          团电脑号
          <span style="margin-left:10px; color:#999999;">Team No</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.tourist_group_no}}</span>
        </li>
        <li>
          团开始日期
          <span style="margin-left:10px; color:#999999;">Team Begin Dare</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.b2b_begin}}</span>
        </li>
        <li>
          团结束日期
          <span style="margin-left:10px; color:#999999;">Team End Date</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.b2b_end}}</span>
        </li>
        <li>
          服务类型
          <span style="margin-left:10px; color: #999999; ">Service Type</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.service_type}}</span>
        </li>
        <li>
          会议城市
          <span style="margin-left:10px; color: #999999; ">City</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span v-if="menus.online_meeting == '1' " style="margin-left:10px;">（线上会议）</span>
          <span v-else style="margin-left:10px;">{{this.menus.event_city}}</span>
        </li>
        <li>
          会议地点
          <span style="margin-left:10px; color: #999999; ">Place</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.meeting_place}}</span>
          <span v-if="menus.is_hotel == '1' " style="margin-left:10px;">（在酒店开会）</span>
        </li>
        <li>
          餐标限制
          <span style="margin-left:10px; color: #999999;">Food Limit</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.food_limit}}</span>
        </li>
        <li>
          参会人数
          <span style="margin-left:10px; color: #999999;">Attendee NO.</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.attendee_no + `（内部：${menus.inside_number},  外部：${menus.external_number}）`}}</span>
        </li>
        <li>
          会议开始日期
          <span style="margin-left:10px; color: #999999; ">Start Date</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.event_startdate}}</span>
        </li>
        <li>
          会议结束日期
          <span style="margin-left:10px; color: #999999; ">End Date</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus. event_enddate}}</span>
        </li>
        <!-- <li>
          PR
          <span style="font-size:12px; font-weight: bold;  margin-left:4px;">:</span>
          <span>{{this.menus.pr}}</span>
        </li> -->
        <li>
          会议总预算
          <span style="margin-left:10px; color: #999999; ">Total Budget</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.total_budget}}</span>
        </li>
        <li>
          会议ID
          <span style="margin-left:10px; color: #999999;">Event ID</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.event_num}}</span>
        </li>
        <li>
          会议创建人
          <span style="margin-left:10px; color: #999999;">Submitor</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.create_user}}</span>
        </li>
        <li>
          客户联系人
          <span style="margin-left:10px; color: #999999;">Event Owner</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.username}}</span>
        </li>
        <li>
          客户所属部门
          <span style="margin-left:10px; color: #999999;">Owner's Department</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.department}}</span>
        </li>
        <li>
          客户联系电话
          <span style="margin-left:10px; color: #999999;">Owner's Phone NO.</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.mobile}}</span>
        </li>
        <li>
          客户邮箱
          <span style="margin-left:10px; color: #999999;">Owner's E-mail</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.email}}</span>
        </li>
        <li>
          发票类型
          <span style="margin-left:10px; color: #999999;">Invoice Type</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.invoice_type}}</span>
        </li>
        <li>
          是否办理免税
          <span style="margin-left:10px; color: #999999;">Duty Free:</span>
          <span style="margin-left:10px;">{{this.menus.duty_free}}</span>
        </li>
        <li>
          创建时间
          <span style="margin-left:10px; color: #999999;">Create Date</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.create_date}}</span>
        </li>
        <li v-if="this.menus.service_provider_name">
          指定供应商
          <span style="margin-left:10px; color: #999999;">Supplier</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{this.menus.service_provider_name}}</span>
        </li>
        <li>
          客户材料
          <span style="font-size:12px; font-weight: bold;">:</span>
        </li>
        <li v-if="menus.files.length" style="display:flex">
          <span>附件 <span style="margin-left:10px; color: #999999;">Document Attachments: </span> </span>
          <span>
            <p v-for="(item,index) in menus.files" :key="index">
              <!-- <span @click="downloadFile(item)" style="cursor:pointer;color:#4ea9f0;margin:0 10px"> {{item.file_name}} </span> -->
              <span @click="handlePreview(item)" style="cursor:pointer;color:#4ea9f0;margin:0 10px"> {{item.file_name}} </span>
              <!-- <span> 上传于 {{item.create_date}}</span> -->
            </p>
          </span>

        </li>

        <li style="display:flex">
          PO信息
          <span style="margin-left:10px; color: #999999;"> PO infomation: </span>
          <span>
            <p v-for="(po,index) in UnDelPoData" :key="index">
              <span style="margin:0 10px;">PO单号 {{po.po_order_no}}</span>
              <span style="margin:0 10px;">PO金额 ￥{{po.po_price}}</span>
              <span style="margin:0 10px;">PO创建时间 {{dateFromat(po.po_create_date)}}</span>
              <span style="margin:0 10px;">PR 单号 {{ po.pr_order_no }}</span>
              <!-- <el-button v-if="hasUnDelPoData" type="text" size="mini" @click="poEdit(UnDelPoData)">修改</el-button> -->
              <el-button type="text" size="mini" @click="handleTap('delete', po.id)">删除</el-button>
            </p>
          </span>

        </li>
      </ul>

      <el-button class="add_po mar_20" type="primary" @click="poShow = true">添加PO</el-button>

    </div>
    <!--添加PO-->
    <el-dialog :visible.sync="poShow" width="500px" title="PO" align="center">
      <div>
        <el-form ref="poDataForm" :model="poData" label-width="120px" :rules="rules">
          <el-form-item label="PO单" prop="po_order_no">
            <el-input placeholder="请输入PO单号" size="small" class="demand_300" v-model="poData.po_order_no" clearable></el-input>
          </el-form-item>
          <el-form-item label="PO金额" prop="po_price">
            <el-input placeholder="请输入PO金额" size="small" class="demand_300" v-model="poData.po_price" clearable></el-input>
          </el-form-item>
          <el-form-item label="PO创建时间" prop="po_create_date">
            <el-date-picker value-format="yyyy-MM-dd HH:mm" placeholder="请选择PO创建时间" size="small" class="demand_300" v-model="poData.po_create_date" clearable></el-date-picker>
          </el-form-item>
          <el-form-item label="PR" prop="pr_order_no">
            <el-input placeholder="请输入PR号" size="small" class="demand_300" v-model="poData.pr_order_no" clearable></el-input>
          </el-form-item>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button type="info" @click="poShow = false">取 消</el-button>
        <el-button type="primary" @click="handleTap('add')">确 认</el-button>
        <!-- <el-button v-if="hasUnDelPoData" type="primary" @click="handleTap('edit',UnDelPoData.id)">确 认</el-button> -->
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "basePart_2",
  props: ['source','isDMC','isShowCancelBtn',"eventStatu"],
  data() {
    return{
      downloadUrl:'',
      menus:{
        files:[]
      },
      poShow:false,
      conferenceHiding:false,
      cityCode:'',
      // PO
      poData:{
        id: '',
        pr_order_no:'',
        event_info_id:'',
        po_order_no:'',
        po_price:'',
        po_create_date:'',
        cmd:'add',
        create_user: 'test',
      },
      UnDelPoData:[], // 未删除PO单信息
      hasUnDelPoData: false,
      poList:[],
      files: [],
      rules:{
        po_order_no:[{ required: true, message: '请输入PO单号', trigger: 'blur' },],
        po_price:[{ required: true, message: '请输入PO金额', trigger: 'blur' },],
        po_create_date:[{ required: true, message: '请选择PO创建时间', trigger: 'blur' },],
        pr_order_no:[{ required: true, message: '请输入PR', trigger: 'blur' },],
      }
    }
  },
  mounted() {
    this.Service();
    this.getPO();
  },
  methods:{
    // 获取PO
    getPO(){
      this.requestApi({
        url: '/CustomerConfiguration/Get_event_po',
        method: 'GET',
        data: {eventInfoId:this.$route.query.id},
      }).then(res => {
        this.poList = res;
         this.UnDelPoData = this.poList.filter((val,index,arr) => {
           return val.is_delete == 0;
        })
        this.hasUnDelPoData = this.UnDelPoData?true:false
        console.log(this.hasUnDelPoData)
        // this.UnDelPoData = po_order?po_order:'';

      })
    },
    // PO操作
    handleTap(type, id) {
      this.poData.event_info_id = this.$route.query.id;
      this.poData.cmd = type;
      if(!id){ // 没有id 是新增po，新增po需要校验信息
        this.$refs.poDataForm.validate((valid) => {
          // debugger
          if(valid) {
            this.requestApi({
              url: '/CustomerConfiguration/Set_event_po',
              method: 'POST',
              data: this.poData,
            }).then(res => {
              this.poData.po_order_no = '';
              this.poData.po_price = '';
              this.poData.po_create_date = '';
              this.poShow = false;
              this.getPO();
            })
          }
        })
      }else{
        this.poData.id = id;
        this.requestApi({
          url: '/CustomerConfiguration/Set_event_po',
          method: 'POST',
          data: this.poData,
        }).then(res => {
          this.poData.po_order_no = '';
          this.poData.po_price = '';
          this.poData.po_create_date = '';
          this.poShow = false;
          this.getPO();
        })
      }
    },
    poEdit(UnDelPoData){
      this.poShow = true;
      this.poData = UnDelPoData;
      // debugger
      if(this.poData.po_create_date.indexOf(' ') < 0){
        var poCreateDate = this.dateFromat(this.poData.po_create_date);
        this.poData.po_create_date = new Date(poCreateDate);
      }
    },
    // 预览附件
    handlePreview(file) {
			debugger
			if(!file.file_path) return;
			// 获取文件后缀名
			let suffix = file.file_path.substring(file.file_path.lastIndexOf(".")+1)
			// doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
			let types1 = ['pdf','jpeg','jpg','png','txt'];
			let types2 = ['docx','doc','xls','xlsx','xlsm','ppt','pptx'];
			file.file_path = file.file_path.replace(/http:/, 'https:');
			this.downloadUrl= file.file_path
			if(types2.includes(suffix)){
				this.downloadUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(file.file_path)
			}else if(types1.includes(suffix)){
				this.downloadUrl = file.file_path
			}else{
				this.$message.info('文件格式不支持预览，下载后查看')
			}
			setTimeout(() => {
				this.$refs.a_click.click();
			}, 100);
		},
    // 下载附件
    downloadFile(file){
      // window.open(file.file_path, "_blank");
      let a_link = document.createElement('a')
        // 这里是将url转成blob地址，
        fetch(file.file_path).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
          a_link.href = URL.createObjectURL(blob)
          console.log(a_link.href)
          a_link.download = file.file_name //下载的文件的名字
          document.body.appendChild(a_link)
          a_link.click()
        })
    },
    // 后端返回时间格式处理(/Date(1634659200000)/ => yyyy-MM-dd)
    dateFromat(timeStr){
      if(typeof timeStr == 'string'){
        var time = timeStr.replace("/Date(", "").replace(")/", "");
        time = new Date(time*1)
        var year = time.getFullYear();
        var month = time.getMonth()*1+1;
        var date = time.getDate()
        var formatDate = year+'-'+month+'-'+date;
        return formatDate;
      }
    },
    // 编辑基本信息
    editBaseTap(){
      debugger
      // if(this.isDMC && (this.isShowCancelBtn || this.eventStatu == 0)){
      if(this.isDMC ){
        this.$router.push({
          name:'DMCcreateEvent',
          query: {
            event_num: this.menus.event_num,
            id: this.$route.query.id,
            name: this.$route.query.name,
            eventSearchType: this.$route.query.eventSearchType,
            type:'edit'
          }
        })
      }else if(this.menus.b2baudstatus != 1 && (this.isShowCancelBtn || this.isShowCancelBtn===undefined|| this.eventStatu == 0)){
        this.$router.push({
          name:'createEvent',
          query: {
            event_num: this.menus.event_num,
            id: this.$route.query.id,
            name: this.$route.query.name,
            eventSearchType: this.$route.query.eventSearchType,
            type:'edit'
          }
        })
      }

      
      
    },
    Service() { // 会议基本信息
      this.requestApi({
        url: '/MeetingMa/GetMeetingList',
        method: 'POST',
        data: { MeetingID:this.$route.query.id },
      }).then((res) => {
        this.menus = res;
        this.menus.files =  this.menus.files? this.menus.files : []
        this.cityCode = this.menus.event_city_code;
        localStorage.setItem('event_city_code', this.cityCode)
      });
    },
  }
}
</script>

<style scoped lang="scss">
.base_part {
  .nformation {
    width: 1100px;
    height: 50px;
    background: #fafafa;
    border-bottom: 1px solid #eaeaea;
    margin: auto;
    margin-top: 15px;
    display: flex;
  }
  .nformation p {
    line-height: 50px;
  }
  .nformation p:nth-of-type(1) {
    font-weight: 600;
    font-size: 14px;
    color: #282828;
    margin-left: 15px;
  }
  .nformation p:nth-of-type(2) {
    font-size: 12px;
    color: #999999;
    font-weight: normal;
    margin-left: 6px;
  }
  .nformation p:nth-of-type(3) {
    font-weight: 600;
    font-size: 14px;
    color: #282828;
  }
  .information {
    width: 1100px;
    background: #ffffff;
    // margin: auto;
    /*margin-bottom: 10px;*/
    ul {
      margin-left: 20px;
      overflow: hidden;
    }
    li {
      line-height: 32px;
      font-size: 14px;
      /*margin-top: 10px;*/
      color: #777;
    }

    li:nth-of-type(1) {
      margin-top: 18px;
    }
    li:last-of-type {
      margin-bottom: 18px;
    }
  }
  .margin_auto {
    margin: auto;
  }
  .disableColor {
    color: #c0c4cc !important;
  }
}
@media only screen and (max-width: 1350px) {
  .nformation {
    width: 100% !important;
  }
  .information {
    width: 100% !important;
  }
}
</style>
