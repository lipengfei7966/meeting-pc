<template>
  <div class="orderList">
    <div class="title">我的订单</div>
    <div class="content">
      <div class="tools">
        <el-form :inline="true" label-width="120px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="订单号">
                <el-input placeholder="订单号" v-model="search.num"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公司名称">
                <el-input placeholder="公司名称" v-model="search.company_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="活动名称">
                <el-input placeholder="活动名称" v-model="search.event_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系人">
                <el-input placeholder="联系人" v-model="search.event_owner"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="选择开始时间">
                <el-date-picker type="date" placeholder="会议开始日期" v-model="search.event_startdate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="选择结束时间">
                <el-date-picker type="date" placeholder="会议结束日期" v-model="search.event_enddate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态">
                <el-select class="demand_170" filterable v-model="search.status" clearable>
                  <el-option v-for="item in allStatus" :label="item.name" :value="item.code" :key="item.code"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" @click="GetList">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table :data="tableData.List" stripe height="100%" style="width: 100%">
        <el-table-column prop="num" label="订单号"> </el-table-column>
        <el-table-column prop="company_name" label="公司名称">
        </el-table-column>
        <el-table-column prop="event_name" label="会议名称"> </el-table-column>
        <el-table-column prop="customer_contact_name" label="联系人"> </el-table-column>
        <el-table-column prop="attendee_no" label="参会人数">
        </el-table-column>
        <el-table-column label="活动日期">
			<template slot-scope="scope">
			  <p v-if="scope.row.event_startdate">{{scope.row.event_startdate.slice(0,10)}}</p>
			  <p v-if="scope.row.event_enddate">{{scope.row.event_enddate.slice(0,10)}}</p>
			</template>
        </el-table-column>
        <el-table-column prop="fullname" label="报价人"> </el-table-column>
        <el-table-column prop="offer_data" label="报价时间"> </el-table-column>
        <el-table-column prop="price" label="报价"> </el-table-column>
        <el-table-column prop="statusname" label="状态"> 
          <template slot-scope="scope">
              <span :class="{signed:scope.row.statusname == '已确认结算单' }">{{scope.row.statusname}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-badge is-dot :hidden="scope.row.remind == '0' ">
              <el-button
                class="tools_btn"
                size="mini"
                type="text"
                @click="select(scope.$index, scope.row)"
                >查看</el-button>
            </el-badge>
            <el-button
              class="tools_btn"
              size="mini"
              type="text"
              @click="selectinquiry(scope.$index, scope.row)"
              >原询价单</el-button>
            <el-badge is-dot :hidden="scope.row.new_message_count == '0' ">
              <el-button
                class="tools_btn"
                size="mini"
                type="text"
                @click="leaveMessage(scope.$index, scope.row)"
                >留言</el-button>
            </el-badge>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          class="pages"
          background
          layout="total,prev, pager, next"
          :total="tableData.Counts"
          :current-page="tableData.CurrentPage"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 留言 -->
    <el-dialog
      title="留言"
      :visible.sync="leaveMessageStatus"
      :before-close="
        (done) => {
          this.itemData = null;
          done();
        }
      "
	  :center="true"
      width="600px"
    >
      <leaveMessage v-if="leaveMessageStatus" :id="leaveMessageId" />
    </el-dialog>
  </div>
</template>

<script>
/**
 * @page 我的订单
 */
import leaveMessage from "@/components/event/leave-message.vue";
import requestApi from '@/utils/requestData'
export default {
  name: "OrderList",
  components: { leaveMessage },
  data() {
    return {
      leaveMessageStatus: false,
      leaveMessageId: null,
      addProjectStatus: false, // 编辑/添加开关
      itemData: null, // 单条数据
      search:{
        num:"",
        company_name:"",
        event_name:"",
        event_owner:"",
        startdate:null,
        enddate:null,
        status:'',
      },
      allStatus:[
        {code:'0020-1', name: '订单执行中'},
        {code:'0020-2', name: '订单取消'},
        {code:'0020-3', name: '已创建待执行'},
        {code:'0020-4', name: '已执行待结算'},
        {code:'0020-5', name: '待确认结算单'},
        {code:'0020-6', name: '已确认待结算'},
        {code:'0020-7', name: '客户驳回结算单'},
        {code:'0020-8', name: '要求补充材料'},
      ],
      tableData: {
        CurrentPage: 1,
        List: [],
      },
    };
  },
  methods: {
    // 留言
    leaveMessage(index, item) {
      //红点
      var inquiry =this.tableData.List.filter(w=> w.event_inquiry_sheet_object_id ==item.event_inquiry_sheet_object_id)
      if(inquiry.length > 0){
        inquiry[0].new_message_count =0;
      }
      this.leaveMessageId = item.event_inquiry_sheet_object_id;
      this.leaveMessageStatus = true;
    },
    // 查看
    select(index, row) {
      this.$router.push({
        // name: "orderInfo_Hotel",
        name: "orderInfo",
        params: {
          id: row.id,
        },
      });
    },
    // 原询价单
    selectinquiry(index, row) {
      //this.$router.push({name: "activityOrderInfo",params: { id: row.event_inquiry_sheet_object_id}});

      // let routeData = this.$router.resolve({ name: "quotedprice", params: { id:row.event_inquiry_sheet_object_id,isSubmit:0 }});
      let routeData = this.$router.resolve({ name: "DMCquotedprice", params: { id:row.event_inquiry_sheet_object_id,isSubmit:0 }});
      window.open(routeData.href, "_blank");//跳转新页面
    },
    // 冻结
    offShelf(index, row) {
      requestApi({
        url: '/serviceprovider/casefrozen',
        method: 'POST',
        data: {
          id: row.id,
        },
      }).then((res) => {
        this.$message({
          message: "冻结成功！",
          type: "success",
        });
        this.GetList();
      });
    },
    // 删除
    onDelete(index, row) {
      requestApi({
        url: '/serviceprovider/casedelete',
        method: 'POST',
        data: {
          id: row.id,
        },
      }).then((res) => {
        this.$message({
          message: "删除成功！",
          type: "success",
        });
        this.GetList();
      });
    },
    // 获取列表
    GetList() {
      requestApi({
        url: '/orderform/list',
        method: 'POST',
        data: {
          Page: this.tableData.CurrentPage,
          Rows: 10,
          search:this.search
        },
      }).then((res) => {
        this.tableData = res;
      });
    },
    // 触发页码
    currentChange(page) {
      this.tableData.CurrentPage = page;
      this.GetList();
    },
  },
  mounted() {
    this.GetList();
  },
};
</script>

<style lang="scss" scoped>
.orderList {
  display: flex;
  flex-direction: column;
  .signed{
    color: limegreen;
  }
}
.pagination{
    text-align: right;
    width: 100%;
    // .pagination_part{margin: 20px 0;width: 100%;text-align: right}
  }
.title {
  font-size: 16px;
  padding: 15px 20px;
  border-bottom: 1px solid #f6f6f6;
}

.content {
  .tools {
    margin-bottom: 15px;
  }
  flex: 1;
  width: 100%;
  overflow: auto;
  padding: 15px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .tools_btn {
    padding-left: 20px;
  }
  .pages {
    margin-top: 20px;
  }
}
</style>
  