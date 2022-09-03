<template>
  <div>
    <div class="centerBox-left">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="'待审批'+'('+`${waitTotalCount}`+')'" name="first">
          <div class="approve-wait">
            <div class="approve-inputs">
              <div class="approve-input">
                <span>会议名称 Event Name</span>
                <el-input type="text" v-model="eventName" />
              </div>
              <div class="approve-input">
                <span>会议ID Event ID</span>
                <el-input type="text" v-model="eventId" />
              </div>
              <div class="approve-input">
                <span>项目负责人</span>
                <el-input type="text" v-model="responsible" />
              </div>

              <el-button type="primary" class="approve-search" @click="seek">搜索</el-button>
            </div>
            <!-- <div class="approve-recored">
							<span v-if="recored">暂无记录</span>
						</div>-->
            <el-table border style="width: 100%" :data="tablet" :row-class-name="tableRowClassName" sortable="custom" @sort-change="waitTopTableSort">
              <!-- <el-table-column prop="event_info_id" label="会议ID" width="180"></el-table-column> -->
              <el-table-column prop="event_name" label="会议名称" width="180"></el-table-column>
              <el-table-column prop="apply_for_data" label="申请时间"></el-table-column>
              <el-table-column prop="event_startdate" label="会议开始时间">
                <template slot-scope="scope">
                  {{scope.row.event_startdate.slice(0,10)}}
                </template>
              </el-table-column>
              <el-table-column prop="event_purchase" label="采购"></el-table-column>
              <el-table-column prop="money" label="金额" :formatter="moneyFormatter"></el-table-column>
              <el-table-column prop="type" label="状态"></el-table-column>
              <el-table-column label="团组已结束天数" prop="end_day" sortable align="center" width="150"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scoped">
                  <p class="confirmButton" @click="transfertransfer(scoped.row.event_info_id,scoped.row.foreign_key_id,scoped.row.group_id,scoped.row.id,scoped.row.type,scoped.row.event_name)">立即确认</p>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 20px;width: 100%;text-align: right" @size-change="waitHandleSizeChange" @current-change="waitCurrentChange" :current-page.sync="waitCurrentPage" :page-size="waitPageSize" background layout="total, prev, pager, next" :total="waitTotalCount">
            </el-pagination>
            <!-- <el-pagination background layout="prev, pager, next" :total="tablet.length"></el-pagination> -->
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'审批中'+'('+`${approvingTotalCount}`+')'" name="second">
          <div class="approve-wait">
            <div class="approve-inputs">
              <div class="approve-input">
                <span>会议名称Event Name</span>
                <el-input type="text" v-model="eventName" />
              </div>
              <div class="approve-input">
                <span>会议IDEvent ID</span>
                <el-input type="text" v-model="eventId" />
              </div>
              <div class="approve-input">
                <span>项目负责人</span>
                <el-input type="text" v-model="responsible" />
              </div>
              <el-button type="primary" class="approve-search" @click="apprivingSearchFn">搜索</el-button>
            </div>

            <el-table border :data="approvingTableData" :row-class-name="tableRowClassName" sortable="custom" @sort-change="approvingTopTableSort">
              <!-- <el-table-column prop="event_info_id" label="会议ID" width="180"></el-table-column> -->
              <el-table-column prop="event_name" label="会议名称" width="180"></el-table-column>
              <el-table-column prop="apply_for_data" label="申请时间"></el-table-column>
              <el-table-column prop="event_startdate" label="会议开始时间">
                <template slot-scope="scope">
                  {{scope.row.event_startdate.slice(0,10)}}
                </template>
              </el-table-column>
              <el-table-column prop="event_purchase" label="采购"></el-table-column>
              <el-table-column prop="money" label="金额" :formatter="moneyFormatter"></el-table-column>
              <el-table-column prop="type" label="状态"></el-table-column>
              <el-table-column label="团组已结束天数" prop="end_day" sortable align="center" width="150"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <p class="confirmButton" @click="examine(scope.row.event_info_id,scope.row.foreign_key_id,scope.row.group_id,scope.row.id,scope.row.type)">查看详情</p>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 20px;width: 100%;text-align: right" @size-change="approvingHandleSizeChange" @current-change="approvingCurrentChange" :current-page.sync="approvingCurrentPage" :page-size="approvingPageSize" background layout="total, prev, pager, next" :total="approvingTotalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'已完成'+'('+`${finishTotalCount}`+')'" name="third">
          <div class="approve-wait">
            <div class="approve-inputs">
              <div class="approve-input">
                <span>会议名称Event Name</span>
                <el-input type="text" v-model="eventName" />
              </div>
              <div class="approve-input">
                <span>会议IDEvent ID</span>
                <el-input type="text" v-model="eventId" />
              </div>
              <div class="approve-input">
                <span>项目负责人</span>
                <el-input type="text" v-model="responsible" />
              </div>
              <el-button type="primary" class="approve-search" @click="sear">搜索</el-button>
            </div>
            <el-table border :data="tableData" :row-class-name="tableRowClassName" sortable="custom" @sort-change="finishTopTableSort">
              <!-- <el-table-column prop="event_info_id" label="会议ID" width="180"></el-table-column> -->
              <el-table-column prop="event_name" label="会议名称" width="180"></el-table-column>
              <el-table-column prop="apply_for_data" label="申请时间"></el-table-column>
              <el-table-column prop="event_startdate" label="会议开始时间">
                <template slot-scope="scope">
                  {{scope.row.event_startdate.slice(0,10)}}
                </template>
              </el-table-column>
              <el-table-column prop="event_purchase" label="采购"></el-table-column>
              <el-table-column prop="money" label="金额" :formatter="moneyFormatter"></el-table-column>
              <el-table-column prop="type" label="状态">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.type==='审批不通过'" style="color:red;">{{scope.row.type}}</el-tag>
                  <el-tag v-else style="color:green;">{{scope.row.type}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="团组已结束天数" prop="end_day" sortable align="center" width="150"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <p class="confirmButton" @click="examine(scope.row.event_info_id,scope.row.foreign_key_id,scope.row.group_id,scope.row.id,scope.row.type)">查看详情</p>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination style="margin-top: 20px;width: 100%;text-align: right" @size-change="finishHandleSizeChange" @current-change="finishCurrentChange" :current-page.sync="finishCurrentPage" :page-size="finishPageSize" background layout="total, prev, pager, next" :total="finishTotalCount">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      // recored: true,
      tableData: [],
      tablet: [],
      approvingTableData: [],
      eventName: '',
      eventId: '',
      responsible: '',
      searchData: {
        type: 1,
        eventName: '',
        eventId: '',
        responsible: '',
        pageIndex: 1,
        pageSize: 5
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
      // 审批完成数据
      finishCurrentPage: 1,
      finishPageIndex: 1,
      finishPageSize: 5,
      approveFinishIndex: 1,
      approveFinishSize: 5,
      finishTotalCount: 0
    }
  },
  methods: {
    // 待审批切换排序
    waitTopTableSort({ column, prop, order }) {
      debugger
      if (column) {
        this.searchData.sortField = prop // 排序字段
        if (order == 'descending') {
          this.searchData.isSort = 1 //0顺序 1倒叙
        } else if (order == 'ascending') {
          this.orderBy = 1
          this.searchData.isSort = 0 //0顺序 1倒叙
        } else {
          this.searchData.isSort = ''
        }
        this.seek()
      }
    },
    // 审批中切换排序
    approvingTopTableSort({ column, prop, order }) {
      debugger
      if (column) {
        this.searchData.sortField = prop // 排序字段
        if (order == 'descending') {
          this.searchData.isSort = 1 //0顺序 1倒叙
        } else if (order == 'ascending') {
          this.orderBy = 1
          this.searchData.isSort = 0 //0顺序 1倒叙
        } else {
          this.searchData.isSort = ''
        }
        this.apprivingSearchFn()
      }
    },
    // 已完成切换排序
    finishTopTableSort({ column, prop, order }) {
      debugger
      if (column) {
        this.searchData.sortField = prop // 排序字段
        if (order == 'descending') {
          this.searchData.isSort = 1 //0顺序 1倒叙
        } else if (order == 'ascending') {
          this.orderBy = 1
          this.searchData.isSort = 0 //0顺序 1倒叙
        } else {
          this.searchData.isSort = ''
        }
        this.sear()
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    tableRowClassName({ row, rowIndex }) {
      // debugger
      if (row.is_overtime === 1) {
        return 'warning-row'
      }
      return ''
    },
    // 调用待审批搜索接口
    seek() {
      let seekSearck = { ...this.searchData }
      seekSearck.type = 1
      seekSearck.pageIndex = this.waitPageIndex
      seekSearck.eventName = this.eventName
      seekSearck.eventId = this.eventId
      seekSearck.responsible = this.responsible
      this.requestApi({
        url: '/MeetingMa/GetWinthebiddingApprove',
        method: 'POST',
        data: seekSearck
      }).then(res => {
        console.log(res)
        if (res) {
          this.tablet = res.EvetModels
          this.waitTotalCount = res.pageInfo.totalCount
          this.$emit('biddingAwaitCount', this.waitTotalCount)
        }
      })
    },
    // 调用审批中搜索接口
    apprivingSearchFn() {
      let apprivingSearch = { ...this.searchData }
      apprivingSearch.type = 2
      apprivingSearch.pageIndex = this.approvingPageIndex
      apprivingSearch.eventName = this.eventName
      apprivingSearch.eventId = this.eventId
      apprivingSearch.responsible = this.responsible
      this.requestApi({
        url: '/MeetingMa/GetWinthebiddingApprove',
        method: 'POST',
        data: apprivingSearch
      }).then(res => {
        if (res) {
          this.approvingTableData = res.EvetModels
          this.approvingTotalCount = res.pageInfo.totalCount
        }
      })
    },
    // 调用已完成搜索接口
    sear() {
      let searSearch = { ...this.searchData }
      searSearch.type = 3
      searSearch.pageIndex = this.finishPageIndex
      searSearch.eventName = this.eventName
      searSearch.eventId = this.eventId
      searSearch.responsible = this.responsible
      this.requestApi({
        url: '/MeetingMa/GetWinthebiddingApprove',
        method: 'POST',
        data: searSearch
      }).then(res => {
        if (res) {
          this.tableData = res.EvetModels
          this.finishTotalCount = res.pageInfo.totalCount
        }
      })
    },

    transfertransfer(a, b, c, d, e, f) {
      // 待审批 立即确认详情传参
      this.$router.push({
        name: 'biddingDetail',
        // path: "/offercart",
        query: {
          id: a, // 会议ID
          foreign_key_id: b, // 报价单ID
          group_id: c, // 组ID
          ApproveID: d, //审批ID
          type: e, // '待审核'
          event_name: f // 会议名称
        }
      })
    },

    examine(a, b, c, d, e) {
      //  已完成 查看详情传参
      this.$router.push({
        name: 'biddedDetail',
        // path: "/cmms",
        query: {
          id: a, // 会议ID
          foreign_key_id: b, // 报价单ID
          group_id: c, // 组ID
          ApproveID: d, //审批ID
          type: e // '审核通过/审核不通过'
        }
      })
    },
    waitHandleSizeChange(val) {
      this.waitPageSize = val
      this.seek()
    },
    waitCurrentChange(val) {
      this.waitPageIndex = val
      this.seek()
    },
    approvingHandleSizeChange(val) {
      this.approvingPageSize = val
      this.apprivingSearchFn()
    },
    approvingCurrentChange(val) {
      this.approvingPageIndex = val
      this.apprivingSearchFn()
    },
    finishHandleSizeChange(val) {
      this.finishPageSize = val
      this.sear()
    },
    finishCurrentChange(val) {
      this.finishPageIndex = val
      this.sear()
    },
    moneyFormatter(row, column, value) {
      return value.toFixed(2)
    }
  },

  mounted() {
    this.seek()
    this.sear()
    this.apprivingSearchFn()
  }
}
</script>

<style lang="scss" scoped>
.centerBox-left {
  padding-left: 20px;
  tr th div {
    text-align: center;
  }
  tr td div {
    text-align: center;
    padding: 0 10px !important;
    font-size: 14px;
    line-height: 20px;
    color: #282828;
    // border: 1px solid #e4e4e4;
    word-break: break-all;
    word-wrap: break-word;
  }
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
      }
      .approve-search {
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
    .confirmButton {
      color: #2896eb;
      cursor: pointer;
    }
    .confirmButton:hover {
      color: #f91;
    }
  }
  .el-table-column {
    font-size: 14px;
  }
  .el-pagination {
  }
  ::deep .el-table tr.warning-row {
    color: red;
  }
}
</style>
