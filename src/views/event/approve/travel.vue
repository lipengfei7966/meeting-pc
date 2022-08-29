<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="'待审批'+'('+`${waitTotalCount}`+')'" name="1">
        <div class="approve-wait">
          <div class="approve-inputs">
            <div class="approve-input">
              <span>会议名称 Event Name</span>
              <el-input type="text" v-model="eventName" />
            </div>
            <div class="approve-input">
              <span>供应商 Supplier</span>
              <el-input type="text" v-model="supplierName" />
            </div>
            <div class="approve-input">
              <span class="chocked">审核类型 Type</span>
              <el-select v-model="approveType" filterable clearable>
                <el-option label="初次提交" value="初次提交"></el-option>
                <el-option label="重新提交" value="重新提交"></el-option>
                <el-option label="已补充材料" value="已补充材料"></el-option>
                <el-option label="审批不通过" value="审批不通过"></el-option>
                <el-option label="要求补充材料" value="要求补充材料"></el-option>
                <el-option label="审批通过" value="审批通过"></el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="approve-wait">
          <div class="approve-inputs">
            <div class="approve-input">
              <span>PO单号 PO NO.</span>
              <el-input type="text" class="icont" v-model="PO" />
            </div>
            <div class="approve-input">
              <span>PR单号 PR NO.</span>
              <el-input type="text" class="icont" v-model="PR" />
            </div>
            <el-button type="primary" class="seek" @click="condition">搜索</el-button>
          </div>
        </div>

        <el-table :data="tableData" border style="width: 100%; " :row-class-name="tableRowClassName" sortable="custom" @sort-change="waitTopTableSort">
          <el-table-column prop="event_name" label="会议名称" align="center" width="180"></el-table-column>
          <el-table-column prop="date" label="会议时间" align="center" width="180"></el-table-column>
          <el-table-column prop="abbreviationname" label="会议城市" align="center"></el-table-column>
          <el-table-column prop="approce_status" label="审核类型" align="center" width="100"></el-table-column>
          <el-table-column prop="supplier_name" label="供应商名称" width="180"></el-table-column>
          <el-table-column prop="supplier_contacts" label="供应商联系人" width="180"></el-table-column>
          <el-table-column prop="po" label="PO 单号" align="center"></el-table-column>
          <el-table-column prop="pr" label="PR 单号" align="center"></el-table-column>
          <el-table-column prop="money" label="结算金额">
            <template slot-scope="scope">
              {{scope.row.money.toFixed(2)}}
            </template>
          </el-table-column>
          <el-table-column prop="submit_time" label="提交时间" align="center" width="180"></el-table-column>
          <el-table-column label="团组已结束天数" prop="end_day" sortable align="center" width="150"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scoped">
              <p class="confirmButton" @click="transfer(scoped.row,'待审核')">查看详情</p>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 20px;width: 100%;text-align: right" @size-change="waitHandleSizeChange" @current-change="waitCurrentChange" :current-page.sync="waitCurrentPage" :page-sizes="[5, 10, 20, 50]" :page-size="waitPageSize" background layout="total, prev, pager, next" :total="waitTotalCount">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane :label="'审批中'+'('+`${approvingTotalCount}`+')'" name="second">
        <div class="approve-wait">
          <div class="approve-inputs">
            <div class="approve-input">
              <span>会议名称 Event Name</span>
              <el-input type="text" v-model="eventName" />
            </div>
            <div class="approve-input">
              <span>供应商 Supplier</span>
              <el-input type="text" v-model="supplierName" />
            </div>
            <div class="approve-input">
              <span class="chocked">审核类型 Type</span>
              <el-select v-model="approveType" filterable clearable>
                <el-option label="初次提交" value="初次提交"></el-option>
                <el-option label="重新提交" value="重新提交"></el-option>
                <el-option label="已补充材料" value="已补充材料"></el-option>
                <el-option label="审批不通过" value="审批不通过"></el-option>
                <el-option label="要求补充材料" value="要求补充材料"></el-option>
                <el-option label="审批通过" value="审批通过"></el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="approve-wait">
          <div class="approve-inputs">
            <div class="approve-input">
              <span>PO单号 PO NO.</span>
              <el-input type="text" class="icont" v-model="PO" />
            </div>
            <div class="approve-input">
              <span>PR单号 PR NO.</span>
              <el-input type="text" class="icont" v-model="PR" />
            </div>
            <el-button type="primary" class="seek" @click="apprivingSearchFn">搜索</el-button>
          </div>
        </div>

        <el-table border :data="approvingTableData" :row-class-name="tableRowClassName" sortable="custom" @sort-change="approvingTopTableSort">
          <el-table-column prop="event_name" label="会议名称" align="center" width="180"></el-table-column>
          <el-table-column prop="date" label="会议时间" align="center" width="180"></el-table-column>
          <el-table-column prop="abbreviationname" label="会议城市" align="center"></el-table-column>
          <el-table-column prop="approce_status" label="审核类型" align="center" width="100"></el-table-column>
          <el-table-column prop="supplier_name" label="供应商名称" width="180"></el-table-column>
          <el-table-column prop="supplier_contacts" label="供应商联系人" width="180"></el-table-column>
          <el-table-column prop="po" label="PO 单号" align="center"></el-table-column>
          <el-table-column prop="pr" label="PR 单号" align="center"></el-table-column>
          <el-table-column prop="money" label="结算金额">
            <template slot-scope="scope">
              {{scope.row.money.toFixed(2)}}
            </template>
          </el-table-column>
          <el-table-column prop="submit_time" label="提交时间" align="center" width="180"></el-table-column>
          <el-table-column label="团组已结束天数" prop="end_day" sortable align="center" width="150"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scoped">
              <p class="confirmButton" @click="transfer(scoped.row)">查看详情</p>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 20px;width: 100%;text-align: right" @size-change="approvingHandleSizeChange" @current-change="approvingCurrentChange" :current-page.sync="approvingCurrentPage" :page-sizes="[5, 10, 20, 50]" :page-size="approvingPageSize" background layout="total, prev, pager, next" :total="approvingTotalCount">
        </el-pagination>
      </el-tab-pane>

      <el-tab-pane :label="'所有已处理'+'('+`${allTotalCount}`+')'" name="third">
        <div class="approve-wait">
          <div class="approve-inputs">
            <div class="approve-input">
              <span>会议名称 Event Name</span>
              <el-input type="text" v-model="eventName" />
            </div>
            <div class="approve-input">
              <span>供应商 Supplier</span>
              <el-input type="text" v-model="supplierName" />
            </div>
            <div class="approve-input">
              <span class="chocked">审核类型 Type</span>
              <el-select v-model="approveType" filterable clearable>
                <el-option label="初次提交" value="初次提交"></el-option>
                <el-option label="重新提交" value="重新提交"></el-option>
                <el-option label="已补充材料" value="已补充材料"></el-option>
                <el-option label="审批不通过" value="审批不通过"></el-option>
                <el-option label="要求补充材料" value="要求补充材料"></el-option>
                <el-option label="审批通过" value="审批通过"></el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="approve-wait">
          <div class="approve-inputs">
            <div class="approve-input">
              <span>PO单号 PO NO.</span>
              <el-input type="text" class="icont" v-model="PO" />
            </div>
            <div class="approve-input">
              <span>PR单号 PR NO.</span>
              <el-input type="text" class="icont" v-model="PR" />
            </div>
            <el-button type="primary" class="seek" @click="speed">搜索</el-button>
          </div>
        </div>

        <el-table :data="tablepro" border :row-class-name="tableRowClassName" sortable="custom" @sort-change="finishTopTableSort">
          <el-table-column prop="event_name" label="会议名称" align="center" width="180"></el-table-column>
          <el-table-column prop="date" label="会议时间" align="center" width="180"></el-table-column>
          <el-table-column prop="abbreviationname" label="会议城市" align="center"></el-table-column>
          <el-table-column prop="approce_status" label="审核类型" align="center" width="100"></el-table-column>
          <el-table-column prop="supplier_name" label="供应商名称" width="180"></el-table-column>
          <el-table-column prop="supplier_contacts" label="供应商联系人" width="180"></el-table-column>
          <el-table-column prop="po" label="PO 单号" align="center"></el-table-column>
          <el-table-column prop="pr" label="PR 单号" align="center"></el-table-column>
          <el-table-column prop="money" label="结算金额">
            <template slot-scope="scope">
              {{scope.row.money.toFixed(2)}}
            </template>
          </el-table-column>
          <el-table-column prop="submit_time" label="提交时间" align="center" width="180"></el-table-column>
          <el-table-column label="团组已结束天数" prop="end_day" sortable align="center" width="150"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scoped">
              <p class="confirmButton" @click="transfer(scoped.row)">查看详情</p>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 20px;width: 100%;text-align: right" @size-change="allHandleSizeChange" @current-change="allCurrentChange" :current-page.sync="allCurrentPage" :page-sizes="[5, 10, 20, 50]" :page-size="allPageSize" background layout="total, prev, pager, next" :total="allTotalCount">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
	data() {
		return {
			activeName: "1",
			recored: true,
			tableData: [],
			eventName: "",
			supplierName: "", // 供应商名称
			approveType:'', // 审批类型
			PO: "",
			PR: '',
			responsible: "",
			tablecalled: [],
			tablepro: [],
			approvingTableData: [],
			pickerOptions: {
				shortcuts: [
					{
						text: "今天",
						onClick(picker) {
							picker.$emit("pick", new Date());
						},
					},
					{
						text: "昨天",
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit("pick", date);
						},
					},
					{
						text: "一周前",
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit("pick", date);
						},
					},
				],
			},
			endTime: "",
			beginTime: "",
			value3: "",
			searchData: {
				type: 1,
				eventName: "",
				supplierName: "", // 供应商名称
				approveType:'', // 审批类型
				po: "",
				pr: '',
				pageIndex: 1,
				pageSize: 5,
			},
			// 待审批数据
			waitCurrentPage: 1,
			waitPageIndex: 1,
			waitPageSize: 5,
			approveWaitIndex: 1,
			approveWaitSize: 5,
			waitTotalCount: 0,
			// 审批中数据
			approvingCurrentPage: 1,
			approvingPageIndex: 1,
			approvingPageSize: 5,
			approvingIndex: 1,
			approvingSize: 5,
			approvingTotalCount: 0,
			// 所有已处理数据
			allCurrentPage: 1,
			allPageIndex: 1,
			allPageSize: 5,
			approveAllIndex: 1,
			approveAllSize: 5,
			allTotalCount: 0,
		};
	},
	mounted() {
		this.condition();
		this.apprivingSearchFn();
		// this.stocks();
		this.speed();
	},
	methods: {
		// 待审批切换排序
    waitTopTableSort({ column, prop, order }) {
      debugger
      if (column) {
        this.searchData.sortField = prop; // 排序字段
        if (order == "descending") {
          this.searchData.isSort = 1  //0顺序 1倒叙
        }else if (order == "ascending") {
          this.orderBy = 1;
          this.searchData.isSort = 0  //0顺序 1倒叙
        }else {
          this.searchData.isSort = ''
        }
        this.condition();
      }
    },
		// 审批中切换排序
    approvingTopTableSort({ column, prop, order }) {
      debugger
      if (column) {
        this.searchData.sortField = prop; // 排序字段
        if (order == "descending") {
          this.searchData.isSort = 1  //0顺序 1倒叙
        }else if (order == "ascending") {
          this.orderBy = 1;
          this.searchData.isSort = 0  //0顺序 1倒叙
        }else {
          this.searchData.isSort = ''
        }
        this.apprivingSearchFn();
      }
    },
		// 已完成切换排序
    finishTopTableSort({ column, prop, order }) {
      debugger
      if (column) {
        this.searchData.sortField = prop; // 排序字段
        if (order == "descending") {
          this.searchData.isSort = 1  //0顺序 1倒叙
        }else if (order == "ascending") {
          this.orderBy = 1;
          this.searchData.isSort = 0  //0顺序 1倒叙
        }else {
          this.searchData.isSort = ''
        }
        this.speed();
      }
    },
		// 旅行社酒店tab切换选项卡
		handleClick(tab, event) {
			console.log(tab, event);
		},
		tableRowClassName({ row, rowIndex }) {
      // debugger
      if (row.is_overtime === 1) {
        return "warning-row";
      }
      return "";
    },
		// 结算审批会议基本信息传参e
		transfer(item,status) { // a 会议ID， b 审批ID， c 结算单ID, d 会议名称, e 待审核
			this.$router.push({
				path: "/msd",
				query: {
					id: item.event_info_id,  //会议ID
					approveId: item.id,  // 审批ID
					settlementId: item.foreign_key_id, // 结算单ID
					event_name: item.event_name, //  会议名称
					orderId: item.orderform_id, // 订单ID
					statu: status || '', // 待审核 || ‘’
					from: 'approve',
					
				},
			});
		},
		// 调用待审批搜索接口
		condition() {
			this.searchData.type = 1
			this.searchData.pageIndex = this.waitPageIndex
			this.searchData.eventName = this.eventName
			this.searchData.supplierName = this.supplierName
			this.searchData.approveType = this.approveType
			this.searchData.po = this.PO
			this.searchData.pr = this.PR
      this.requestApi({
        url: '/MeetingMa/GetSettlementApprove',
        method: 'POST',
        data: this.searchData,
      }).then((res) => {
        this.tableData = res.EvetModels;
        this.waitTotalCount = res.pageInfo.totalCount;
        this.$emit('travelAwaitCount', this.waitTotalCount)
      });
		},
		// 调用审批中搜索接口
		apprivingSearchFn() {
			this.searchData.type = 2
			this.searchData.pageIndex = this.approvingPageIndex
			this.searchData.eventName = this.eventName
			this.searchData.supplierName = this.supplierName
			this.searchData.approveType = this.approveType
			this.searchData.po = this.PO
			this.searchData.pr = this.PR
			this.requestApi({
        url: '/MeetingMa/GetSettlementApprove',
        method: 'POST',
        data: this.searchData,
      }).then((res) => {
					if (res) {
						this.approvingTableData = res.EvetModels;
						this.approvingTotalCount = res.pageInfo.totalCount;
					}
				});
		},
		// 调用已完成接口
		speed() {
			this.searchData.type = 3
			this.searchData.pageIndex = this.allPageIndex
			this.searchData.eventName = this.eventName
			this.searchData.supplierName = this.supplierName
			this.searchData.approveType = this.approveType
			this.searchData.po = this.PO
			this.searchData.pr = this.PR
			this.requestApi({
        url: '/MeetingMa/GetSettlementApprove',
        method: 'POST',
        data: this.searchData,
      }).then((res) => {
					this.tablepro = res.EvetModels;
					this.allTotalCount = res.pageInfo.totalCount;
				});
		},

		waitHandleSizeChange (val) {
      this.waitPageSize = val;
      this.condition();
    },
		waitCurrentChange(val) {
			this.waitPageIndex = val;
			this.condition();
		},
		approvingHandleSizeChange (val) {
      this.approvingPageSize = val;
      this.apprivingSearchFn();
    },
		approvingCurrentChange(val) {
			this.approvingPageIndex = val;
			this.apprivingSearchFn();
		},
		allHandleSizeChange (val) {
      this.allPageSize = val;
      this.speed();
    },
		allCurrentChange(val) {
			this.allPageIndex = val;
			this.speed();
		}
	},
};
</script>

<style lang="scss" scoped>
.approve-wait {
  display: flex;
  align-items: center;
  flex-direction: column;
  .approve-inputs {
    width: 100%;
    display: flex;
    margin: 0 0 20px 0;
    .approve-input {
      display: flex;
      align-items: center;
      justify-content: space-around;
      line-height: 32px;
      margin: 0 15px 0 0;
      font-size: 14px;
      color: #787878;
      padding: 5px;
      span {
        line-height: 32px;
        font-size: 14px;
        color: #787878;
        width: auto;
      }
      .el-input {
        width: auto;
      }
      input {
        width: 160px;
        height: 30px;
        line-height: 30px;
        margin: 0 0 0 10px;
        vertical-align: top;
        padding: 0 4px;
        border: 1px solid #dcdcdc;
        border-radius: 2px;
      }
      .iconf {
        margin-left: 35px;
      }
      .iconh {
        margin-left: 40px;
      }
    }
    // .approve-search {
    // 	width: 70px;
    // 	text-align: center;
    // 	height: 32px;
    // 	padding: 0;
    // 	margin: 5px;
    // 	font-size: 14px;
    // 	color: #fff;
    // 	background: #2896eb;
    // 	border-radius: 2px;
    // 	border: none;
    // 	cursor: pointer;
    // }
  }
  // .approve-recored {
  // 	width: 100%;
  // 	background: #fafafa;
  // 	padding: 40px 0;
  // 	text-align: center;
  // 	span {
  // 		text-align: center;
  // 		font-size: 14px;
  // 		color: #bebebe;
  // 		line-height: 20px;
  // 	}
  // }
}
tr th div {
  text-align: center;
}
tr td div {
  text-align: center;
  padding: 0 10px !important;
}
.confirmButton {
  color: #2896eb;
  cursor: pointer;
}
.confirmButton:hover {
  color: #f91;
}
/deep/ .el-table tr.warning-row {
  color: red;
}
// .txtn{
// 	width: 760px;
// 	height: 200px;
// 	float: left;
// 	display: flex;
// 	.app-inputs{
// 		width: 160px;
// 		height: 30px;
// 		line-height: 30px;
// 		float: left;
// 		font-size: 14px;
// 		color: #999999;

// 	}
// }
.pull-down {
  width: 160px;
  height: 30px;
  margin-left: 21px;
  border: 1px solid #dcdcdc;
}
.seek {
  width: 75px;
  text-align: center;
  height: 32px;
  padding: 0;
  margin: 5px;
  font-size: 13px;
  color: #fff;

  border: none;
  cursor: pointer;
}
.sear {
  width: 75px;
  text-align: center;
  height: 40px;
  padding: 0;
  margin: 0px;
  margin-left: 10px;
  font-size: 13px;
  color: #fff;

  border: none;
  cursor: pointer;
}
.check {
  margin-left: 5px;
}
.character {
  margin-left: 18px;
}
.data {
  color: #787878;
  margin-top: 10px;
}

.down {
  width: 160px;
  height: 30px;
  margin-left: 20px;
  border: 1px solid #dcdcdc;
  position: flex;
  margin-left: 20px;
}
.chocked {
  margin-left: 7px;
}
.icont {
  margin-left: 35px;
}
.proict {
  width: 75px;
  height: 30px;
  margin-top: 5px;
  border: none;
  background: #2896eb;
  color: #fff;
}
.xq p {
  color: #2896eb;
  margin-left: -16px;
}
.el-tbale {
  margin-top: 10px;
}
.el-table .cell,
.el-table--border .el-table__cell:first-child .cell {
  padding-left: 38px;
}
.approve-recored {
  width: 100%;
  background: #fafafa;
  padding: 40px 0;
  text-align: center;
  span {
    text-align: center;
    font-size: 14px;
    color: #bebebe;
    line-height: 20px;
  }
}

.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.view {
  margin-left: -15px;
}

.element.style {
  margin-top: 2px;
  height: 55px;
}
.sou {
  width: 70px;
  height: 34px;
  margin-top: 3px;
}
</style>
