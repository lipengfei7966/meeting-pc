<template>
  <div class="activityOrderList">
    <div class="title">活动询价订单</div>
    <div class="content">
      <div class="tools">
        <el-form :inline="true" label-width="120px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="询价单号">
                <el-input placeholder="询价单号" v-model="po.inquiry_sheet_code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="选择开始时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="po.startdate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="选择结束时间">
                <el-date-picker type="date" placeholder="选择日期" v-model="po.enddate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态">
                <el-select class="demand_170" filterable v-model="po.status" clearable>
                  <el-option v-for="item in allStatus" :label="item.name" :value="item.code" :key="item.code"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item>
                <el-button type="primary" @click="GetList">查询</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="6">

            </el-col>
            <el-col :span="6">

            </el-col>
            <el-col :span="6">

            </el-col>
          </el-row>

        </el-form>
      </div>
      <el-table :data="tableData.List" stripe height="100%" style="width: 100%">
        <el-table-column prop="inquiry_sheet_code" label="询价单号">
        </el-table-column>
        <!-- <el-table-column prop="price" label="来源"> </el-table-column> -->
        <el-table-column prop="company_name" label="公司名称">
        </el-table-column>
        <el-table-column prop="activity_name" label="活动名称">
        </el-table-column>
        <el-table-column prop="contacts" label="联系人"> </el-table-column>
        <el-table-column prop="activity_count" label="参会人数">
        </el-table-column>
        <el-table-column prop="activity_date" label="活动日期">
        </el-table-column>
        <el-table-column prop="offerenddate" label="报价截至日期">
        </el-table-column>
        <el-table-column prop="total_price" label="报价"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span :class="{signed:scope.row.status == '已签约' }">{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-badge is-dot :hidden="scope.row.new_message_count == '0' ">
              <el-button size="mini" type="text" @click="leaveMessage(scope.$index, scope.row)">留言</el-button>
            </el-badge>
            <el-badge is-dot :hidden="scope.row.remind == '0' ">
              <el-button class="tools_btn" size="mini" type="text" @click="goInfo(scope.$index, scope.row)">查看</el-button>
            </el-badge>

          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination class="pages" background layout="total,prev, pager, next" :total="tableData.Counts" :current-page="tableData.CurrentPage" @current-change="currentChange">
        </el-pagination>
      </div>

    </div>
    <!-- 留言 -->
    <el-dialog title="留言" :visible.sync="leaveMessageStatus" :before-close="
        (done) => {
          this.itemData = null;
          done();
        }
      " :center="true" width="600px">
      <leaveMessage v-if="leaveMessageStatus" :id="leaveMessageId" />
    </el-dialog>
  </div>
</template>

<script>
/**
 * @page 活动询价订单
 */
import leaveMessage from "@/components/event/leave-message.vue";
import {guid, positiveInteger, positiveFloat, positiveFloatSix, formatDate, formatNum } from '@/utils/common';
import requestApi from '@/utils/requestData'
export default {
  name: "activityOrderList",
  components: { leaveMessage },
  data() {
    return {
      leaveMessageStatus: false,
      leaveMessageId: null,
      allStatus:[
        {code:'0012-1', name: '未报价'},
        {code:'0012-2', name: '等待客户决定'},
        {code:'0012-3', name: '已签约'},
        {code:'0012-4', name: '您已拒绝报价'},
        {code:'0012-5', name: '未中标'},
        {code:'0012-6', name: '要求重新报价'},
        {code:'0012-7', name: '已取消'},
      ],
      po:{
        inquiry_sheet_code:"",
        startdate:null,
        enddate:null,
        status:''
      },
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
      var inquiry =this.tableData.List.filter(w=> w.object_id ==item.object_id)
      if(inquiry.length > 0){
        inquiry[0].new_message_count =0;
      }
      
      // this.tableData.List.forEach((model)=>{
      //    if(model.object_id ==item.object_id)
      //     model.new_message_count =0;
      // })
      this.leaveMessageId = item.object_id;
      this.leaveMessageStatus = true;
    },
    // 跳转详情页
    goInfo(index, item) {
      this.$router.push({
        name: "DMCactivityOrderInfo",
        params: {
          id: item.object_id,
        },
      });
    },
    // 获取列表
    GetList() {
      requestApi({
        url: '/inquirysheet/list',
        method: 'POST',
        data: {
          Page: this.tableData.CurrentPage,
          Rows: 10,
          po:this.po
        },
      }).then((res) => {
          this.tableData = res;
          this.tableData.List.forEach(element => {
            element.total_price = positiveFloat(element.total_price, true);
          });
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
.activityOrderList {
  display: flex;
  flex-direction: column;
  .pagination {
    text-align: right;
    width: 100%;
    // .pagination_part{margin: 20px 0;width: 100%;text-align: right}
  }
  .signed {
    color: limegreen;
  }
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
    margin-left: 20px;
  }
  .pages {
    margin-top: 20px;
  }
}
</style>
