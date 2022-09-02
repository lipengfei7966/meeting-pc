<template>
  <div class="event_list box">
    <div class="header_title flex_row align_center" style="margin-top: 20px">
      <h2>我的会议</h2>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我创建的会议" name="0"></el-tab-pane>
      <el-tab-pane label="我负责的会议" name="1"></el-tab-pane>
      <el-tab-pane label="我采购的" name="2"></el-tab-pane>
      <el-tab-pane label="全部会议" name="3"></el-tab-pane>
      <el-tab-pane label="我的草稿" name="4"></el-tab-pane>
    </el-tabs>
    <div class="search_part">
      <el-form :model="eventSearch" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户">
              <el-select clearable filterable v-model="eventSearch.company_id">
                <el-option v-for="item in customerList" :label="item.shortname" :value="item.id.toString()" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会议名称">
              <el-input size="small" v-model="eventSearch.eventName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会议状态">
              <el-select filterable size="small" v-model="eventSearch.biddingStatus" clearable>
                <el-option v-for="item in biddingStatus" :label="item.name" :value="item.code" :key="item.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会议时间">
              <el-date-picker @change="changeEventDate" style="width:100%" size="small" v-model="event_date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="!showMoreSearch">
          <el-col :span="6">
            <el-form-item label="会议ID">
              <el-input size="small" v-model="eventSearch.eventId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="团电脑号">
              <el-input size="small" v-model="eventSearch.tourist_group_no" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item v-show="activeName != 4" label="PO单号">
              <el-input size="small" v-model="eventSearch.po" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="询价单号">
              <el-input size="small" v-model="eventSearch.RFPNo" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="!showMoreSearch">
          <el-col :span="6">
            <el-form-item label="会议城市" prop="event_city">
              <el-select v-model="eventSearch.event_city" clearable filterable placeholder="请选择">
                <el-option v-for="item in cityList" :label="item.value" :value="item.code" :key="item.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会议创建人">
              <el-select v-model="eventSearch.createUser" filterable clearable :disabled="activeName == 0">
                <el-option v-for="item in buyerOptions" :key="item.uclient_code" :label="item.ufullname" :value="item.uusername"></el-option>
              </el-select>
              <!-- <el-input size="small"  v-model="eventSearch.createUser" clearable></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会议负责人">
              <el-select v-model="eventSearch.ownerUser" filterable clearable :disabled="activeName == 1">
                <el-option v-for="item in buyerOptions" :key="item.uclient_code" :label="item.ufullname" :value="item.uusername"></el-option>
              </el-select>
              <!-- <el-input size="small"  v-model="eventSearch.ownerUser" clearable></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="采购负责人">
              <el-select v-model="eventSearch.buyer" filterable clearable placeholder="请选择采购负责人" :disabled="activeName == 2">
                <el-option v-for="item in buyerOptions" :key="item.uclient_code" :label="item.ufullname" :value="item.uusername"></el-option>
              </el-select>
              <!-- <el-input class="demand_170" size="small" v-model="eventSearch.buyer" clearable></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="!showMoreSearch">
          <el-col :span="6">
            <el-form-item label="会议助理">
              <el-select v-model="eventSearch.event_assistant" filterable clearable>
                <el-option v-for="item in buyerOptions" :key="item.uclient_code" :label="item.ufullname" :value="item.uusername"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合规审查人">
              <el-select v-model="eventSearch.event_settlement" filterable clearable>
                <el-option v-for="item in buyerOptions" :key="item.uclient_code" :label="item.ufullname" :value="item.uusername"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Cvent 号">
              <el-input size="small" v-model="eventSearch.cvent_no" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="PR 号">
              <el-input size="small" v-model="eventSearch.pr" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="6" align="right">
            <span style="margin: 0 20px;color:#3a8ee6;cursor:pointer" v-show="showMoreSearch" @click="changeMore"> ⩔ 更多查询条件</span>
            <span style="margin: 0 20px;color:#3a8ee6;cursor:pointer" v-show="!showMoreSearch" @click="changeMore"> ⩓ 收起</span>
            <el-button size="small" type="primary" @click="getDataList(1)">搜 索</el-button>
            <el-button size="small" type="primary" @click="getDataList(2)">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table style="height: 390px" max-height="390" border :data="dataList">
      <!-- <el-table-column label="会议ID" prop="id" align="center" width="180" show-overflow-tooltip></el-table-column> -->
      <el-table-column label="会议名称" prop="event_name" align="center" width="200" show-overflow-tooltip></el-table-column>
      <el-table-column label="团电脑号" prop="tourist_group_no" align="center" width="150" show-overflow-tooltip></el-table-column>

      <el-table-column label="会议时间" align="center" width="120">
        <template slot-scope="scope">
          <p v-if="scope.row.event_startdate">{{scope.row.event_startdate.slice(0,10)}}</p>
          <p v-if="scope.row.event_enddate">{{scope.row.event_enddate.slice(0,10)}}</p>
        </template>
      </el-table-column>
      <el-table-column label="会议城市" prop="event_city_name" align="center" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column label="采购负责人" prop="purchaseInfo.name" align="center" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column label="客户联系人" prop="contact_name" align="center" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column label="会议概况" prop="" align="center" width="110">
        <template slot-scope="scope">
          <p style="text-align:left">询价单 <span>({{scope.row.inquiry_count}})</span></p>
          <p style="text-align:left">订单 <span>({{scope.row.order_count}})</span></p>
        </template>
      </el-table-column>
      <el-table-column label="会议状态" align="center" width="150">
        <template slot-scope="scope" style="color: #f91">
          <img style="width:30px;cursor:pointer;position:absolute;top:0;right:0" :src="scope.row.remind == 1 ? require('@/assets/images/new_message.png') : require('@/assets/images/message2.png')" @mouseover="mouseOver(scope)" @mouseleave="mouseLeave()" alt="" />

          <p style="color: #f91;margin-top:10px" :ref="'eventTypeName' + scope.$index">
            {{scope.row.eventTypeName}}
          </p>

        </template>
      </el-table-column>
      <el-table-column label="查看详情" prop="" align="center">
        <template slot-scope="scope">
          <el-button v-if="activeName == 4" type="text" size="small" @click="editBaseTap(scope.row)">编辑会议</el-button>
          <el-button v-else type="text" size="small" @click="goDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="eventSearch.page" class="pagination_part" background layout="total, prev, pager, next" :total="pageInfo.totalCount">
      </el-pagination>
    </div>

    <div ref="newMessageBox" v-show="newMessageShow" @mouseover="newMessageShow = true" @mouseleave="newMessageShow=false" class="newMessageBox">
      <div style="font-size:20px;color:#999;border-bottom:1px solid #999;padding:10px 20px">会议动态</div>
      <ul style="padding: 20px">
        <li v-for="(message,index) in messageList" :key="index">
          <span> {{message.date_time}} </span>
          <span> {{message.company_name}} </span>
          <span> {{message.content}} </span>
          <span v-show="message.remind == 1" style="color:red;font-weight:bold;font-style:oblique"> NEW </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/utils/common';

export default {
  name: "eventList",
  data(){
    return{
      newMessageShow:false,
      showMoreSearch: true,
      messageList:[],
      biddingStatus:[
        {code:'0010-11', name: '结算完成'},
        {code:'0010-5', name: '会议已创建'},
        {code:'0010-8', name: '会议进行中'},
        {code:'0010-6', name: '询价中'},
        {code:'0010-1', name: '已取消'},
        {code:'0010-7', name: '已确定供应商'},
        {code:'0010-9', name: '待结算（尚无结算单）'},
        {code:'0010-12', name: '会议过期'},
        {code:'0010-10', name: '结算中（待审核）'},
      ],
      cityList: [],
      event_date:[],
      eventSearch:{
        eventName:'',
        eventId:'',
        buyer:'',
        RFPNo:'',
        po: '',
        biddingStatus:'',
        pageSize: 10,
        page: 1,
        eventSearchType: '3',
        tourist_group_no:'',
        event_city:'',
        createUser:'',
        ownerUser:'',
        event_assistant:'', // 会议助理
        event_settlement:'', //合规审查人
        cvent_no: '',
        pr:'',
        event_startdate: '',
        event_enddate:'',
      },
      customerList:[],
      pageInfo:{
        totalCount: 0
      },
      searchInfo:{

      },
      activeName: '3',
      dataList:[],
      buyerOptions: [], // 采购负责人下拉列表
    }
  },
  mounted() {
    this.getDataList();
    this.getBuyerOptions();
    this.company();
    this.getCityList();

   
  },
  methods:{
    formatDate,
    goDetail(val){
		console.log(val)
    // this.$store.dispatch('delVisitedViews', this.$route).then(() => {
      this.$router.push({name:'eventDetail',query:{id: val.id, name: val.event_name, eventSearchType:this.eventSearch.eventSearchType}})
    // })
      
    },
    // 编辑基本信息
    editBaseTap(rowInfo){
      debugger
      // if(this.isDMC && (this.isShowCancelBtn || this.eventStatu == 0)){

        this.$router.push({
          name:'CreateEvent',
          query: {
            event_num: rowInfo.event_num,
            id: rowInfo.id,
            name: rowInfo.name,
            eventSearchType: this.eventSearch.eventSearchType,
            type:'edit'
          }
        })
    },
    // 公司查询
    company() {
      // this.$api.getCompany({},"POST").then((res) => {
      //   this.customerList = res
      // });
      // 替换成权限控制
      this.requestApi({
        url: '/UserGroupmanagement/GetCustomerEventInfoPost',
        method: 'post',
        data: {},
      }).then((res) => {
        this.customerList = res
      })
      // this.$api.GetCustomerEventInfoPost({},'POST').then(res => {
      //   this.customerList = res;
      // });
    },
    changeEventDate(date){
      this.eventSearch.event_startdate = this.formatDate('YYYY-mm-dd', date[0]) ? this.formatDate('YYYY-mm-dd', date[0]) : ''
      this.eventSearch.event_enddate = this.formatDate('YYYY-mm-dd', date[1]) ? this.formatDate('YYYY-mm-dd', date[1]) : ''
    },
    // 获取城市
    getCityList() {
      this.requestApi({
        url: '/CustomerConfiguration/GetCitys',
        method: 'GET',
      }).then((res) => {
        this.cityList = res
      })
      // this.$api.getCityList({}, 'GET').then(res =>{
      //   this.cityList = res;
      // })
    },
    mouseOver(data){
      // debugger
      this.newMessageShow = true;
      this.messageList = data.row.message_list
      // this.$refs.subnav.getBoundingClientRect().top
      let top = this.$refs['eventTypeName'+data.$index].getBoundingClientRect().top
      let right = this.$refs['eventTypeName'+data.$index].getBoundingClientRect().right
      this.$refs.newMessageBox.style.top = top+'px';
      // debugger
      
      this.$nextTick(res => {
        let megBoxWidth = this.$refs.newMessageBox.offsetWidth;
      this.$refs.newMessageBox.style.left = (right - megBoxWidth)+'px'
      })
    },
    mouseLeave(){
      this.newMessageShow = false;
    },
    getDataList(id=0){
      if(id === 1){// 点击搜索
        this.eventSearch.page = 1
      }else if(id === 2) {
        this.eventSearch = {
          eventName:'',
          eventId:'',
          buyer:'',
          RFPNo:'',
          po: '',
          biddingStatus:'',
          pageSize: 10,
          page: 1,
          tourist_group_no:'',
          event_city:'',
          createUser:'',
          ownerUser:'',
          event_assistant:'', // 会议助理
          event_settlement:'', //合规审查人
          cvent_no: '',
          pr:'',
          event_startdate: '',
          event_enddate:'',
          eventSearchType: this.activeName,
        }
        this.event_date = [] // 查询条件-时间重置
      }
      this.requestApi({
        url: '/CustomerConfiguration/Get_event_info',
        method: 'GET',
        data: this.eventSearch,
      }).then((res) => {
        this.dataList = res.EventModels
        this.pageInfo = res.pageInfo
      })
      // this.$api.getEventList(this.eventSearch, "GET").then((res) => {
      //   this.dataList = res.EventModels;
      //   this.pageInfo = res.pageInfo;
      // });
    },
    changeMore(){
      this.showMoreSearch = !this.showMoreSearch;
      this.eventSearch.eventId = '';
      this.eventSearch.tourist_group_no = '';
      this.eventSearch.po = '';
      this.eventSearch.RFPNo = '';
      this.eventSearch.event_city = '';
      this.eventSearch.createUser = '';
      this.eventSearch.ownerUser = '';
      this.eventSearch.buyer = '';
      this.eventSearch.event_assistant = '';
      this.eventSearch.event_settlement = '';
      this.eventSearch.cvent_no = '';
      this.eventSearch.pr = '';
      
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.eventSearch.pageSize = val;
      this.getDataList();
    },
    handleCurrentChange(val) {
      this.eventSearch.page = val;
      console.log(`当前页: ${val}`);
      this.getDataList();
    },
    handleClick(tab, event){
      this.eventSearch.eventSearchType = this.activeName;
      this.eventSearch.page = 1;
      this.getDataList();
    },
    getBuyerOptions(){
      this.requestApi({
        url: '/CustomerConfiguration/Get_tmc_account_user_account',
        method: 'GET',
        data: {},
      }).then((res) => {
        this.buyerOptions = res
      })
      // this.$api.getCustomerContacts({},"get").then( res => {
      //   this.buyerOptions = res;
      //   // console.log(res)
      // })
    }
  }
}
</script>

<style lang="scss">
.event_list {
  height: 100%;
  .list_title {
  }
  .pagination {
    width: 100%;
    .pagination_part {
      margin: 20px 0;
      width: 100%;
      text-align: right;
    }
  }
  .el-table__body-wrapper {
    overflow-y: auto;
    // overflow-x: hidden
  }
  .newMessageBox {
    width: auto;
    min-width: 300px;
    min-height: 200px;
    // padding: 20px;
    z-index: 200;
    position: absolute;
    background: #fff;
    border: 1px solid #eee;
  }
}
</style>
