<template>
  <div class="report_layout">
    <div class="report_info">
      <div class="rt_title clx" style="height: 28px">
        <h3 class="rt_left">
          <i class="ico"><img :src="require('@/assets/images/log.png')" alt="" /></i>
          <strong>酒店费用分析</strong>
          <span class="international-title-span">Spend Analysis</span>
        </h3>
        <a href="" class="rt_download" @click.prevent="dialogVisible = true">
          <i class="ico"><img :src="require('@/assets/images/xz.png')" alt="" /></i>
          <span>导出报表</span>
        </a>
        <el-dialog title="请选择日期" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
          <div class="filter_item">
            <div class="filter_box filter_date">
              <select class="date_select" autocomplete="off" name="start_year" v-model="beginExcelYear">
                <option :value="item.datey" v-for="(item, index) in dateList" :key="index">{{ item.datey }} 年</option>
              </select>
              <select name="start_month" class="date_select" autocomplete="off" v-model="beginExcelMonth">
                <option :value="item.datem" v-for="(item, index) in monthList" :key="index">{{ item.datem }} 月</option>
              </select>
            </div>
            <div class="filter_sl">～</div>
            <div class="filter_box filter_date">
              <select class="date_select" autocomplete="off" name="start_year" v-model="EndExcelYear">
                <option :value="item.datey" v-for="(item, index) in dateList" :key="index">{{ item.datey }} 年</option>
              </select>
              <select name="start_month" class="date_select" autocomplete="off" v-model="EndExcelMonth">
                <option :value="item.datem" v-for="(item, index) in monthList" :key="index">{{ item.datem }} 月</option>
              </select>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="downloadReport()">导 出</el-button>
          </span>
        </el-dialog>
      </div>
      <!--  -->
      <div class="rt_overview rt_public" style="position: relative;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="支出统计" name="first">
            <Expenditurestatistics :pice="pice" @hotelExpenses="hotelExpenses" />
          </el-tab-pane>
          <el-tab-pane label="Saving统计" name="second">
            <!-- <Savingstatistics :pice="pice" @hotelExpenses="hotelExpenses" /> -->
          </el-tab-pane>
        </el-tabs>
        <div>
          <Savingstatistics :style="{left:activeName=='second'?'0px':'-10000px',position:activeName=='second'?'initial':'absolute'}" :pice="pice" @hotelExpenses="hotelExpenses" />
        </div>
        <div class="rt_box">
          <div class="overview_box clx"></div>
        </div>
      </div>

      <div class="rt_overview rt_public">
        <div class="title">
          支出类型分布
          <span class="international-title-span">Spend Type Analysis</span>
        </div>
        <div class="rt_box">
          <div class="filter clx">
            <div>
              <div class="filter_text">会议时间 :</div>
              <div class="filter_item">
                <div class="filter_box filter_date">
                  <select class="date_select" autocomplete="off" name="start_year" v-model="beginYear">
                    <option :value="item.datey" v-for="(item, index) in dateList" :key="index">{{ item.datey }} 年</option>
                  </select>
                  <select name="start_month" class="date_select" autocomplete="off" v-model="beginMonth">
                    <option :value="item.datem" v-for="(item, index) in monthList" :key="index">{{ item.datem }} 月</option>
                  </select>
                </div>
                <div class="filter_sl">～</div>
                <div class="filter_box filter_date">
                  <select class="date_select" autocomplete="off" name="start_year" v-model="EndYear">
                    <option :value="item.datey" v-for="(item, index) in dateList" :key="index">{{ item.datey }} 年</option>
                  </select>
                  <select name="start_month" class="date_select" autocomplete="off" v-model="EndMonth">
                    <option :value="item.datem" v-for="(item, index) in monthList" :key="index">{{ item.datem }} 月</option>
                  </select>
                </div>
              </div>
              <div class="filter_text">客户 :</div>
              <div class="filter_item">
                <div class="filter_box">
                  <select name="creator" v-model="customer" @change="getEventType">
                    <option :value="null"></option>
                    <option :value="item.id" v-for="(item, index) in customers">{{ item.shortname }}</option>
                  </select>
                </div>
              </div>
              <div class="filter_text">{{&nbsp}}</div>
              <div class="filter_item">
                <div class="filter_box">
                  <select name="category" v-model="city_category">
                    <option :value="null"></option>
                    <option :value="item.code" v-for="(item, index) in conferMetting" :key="index">{{ item.name }}</option>
                  </select>
                </div>
              </div>
              <div class="filter_text">负责人 :</div>

              <div class="filter_item">
                <div class="filter_box">
                  <select name="creator" v-model="creator">
                    <option :value="null"></option>
                    <option :value="item.uusername" v-for="(item, index) in contacts" :key="index">{{ item.ufullname }}</option>
                  </select>
                </div>
              </div>
              <div class="filter_item"><a class="filter_btn" @click="search">确定</a></div>
            </div>
          </div>
          <div class="rector">
            <div class="bbb">
              <Pig :expenseTypeList="expenseTypeList" v-show="expenseTypeList" />
            </div>
            <div class="ccc">
              <div class="form_public">
                <table class="fp_th" v-show="expenseTypeList">
                  <tbody>
                    <tr>
                      <th width="50%">费用类型</th>
                      <th width="25%">金额（元）</th>
                      <th>占比</th>
                    </tr>
                  </tbody>
                </table>
                <div class="form_sub">
                  <table>
                    <tbody>
                      <tr class="cursor_tr" :data-index="index" v-for="(item, index) in expenseTypeList" :key="index">
                        <td width="50%">
                          <div class="type_fa">
                            <span class="piece" style="background: #fcae59"></span>
                            {{ item.CostType }}
                          </div>
                        </td>
                        <td width="25%">{{ item.Amount?item.Amount.toFixed(2):0 }}</td>
                        <td>{{ item.Percentage }}%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- <Pig />  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Expenditurestatistics from './Statistics/expenditureStatistics.vue'
import Savingstatistics from './Statistics/savingStatistics.vue'
import Pig from '@/components/event/pig'
import excelExport from '@/utils/exportexcel.js'

export default {
  components: {
    Expenditurestatistics,
    Savingstatistics,
    Pig
  },
  data() {
    return {
      activeName: 'first',
      dateList: [],
      monthList: [
        {
          id: '1',
          datem: '1'
        },
        {
          id: '2',
          datem: '2'
        },
        {
          id: '3',
          datem: '3'
        },
        {
          id: '4',
          datem: '4'
        },
        {
          id: '5',
          datem: '5'
        },
        {
          id: '6',
          datem: '6'
        },
        {
          id: '7',
          datem: '7'
        },
        {
          id: '8',
          datem: '8'
        },
        {
          id: '9',
          datem: '9'
        },
        {
          id: '10',
          datem: '10'
        },
        {
          id: '11',
          datem: '11'
        },
        {
          id: '12',
          datem: '12'
        }
      ],
      // pice: '',
      pice: [], //
      beginYear: new Date(new Date().setMonth(new Date().getMonth() - 3)).getFullYear(),
      beginMonth: new Date(new Date().setMonth(new Date().getMonth() - 3)).getMonth() + 1,
      EndYear: new Date().getFullYear(),
      EndMonth: new Date().getMonth() + 1,
      creator: null,
      city_category: null,
      // expenseType: 1,
      expenseTypeList: [],
      conferMetting: [],
      contacts: [],
      customers: [],
      customer: 0, //搜索客户的默认值
      dialogVisible: false,
      beginExcelYear: new Date(new Date().setMonth(new Date().getMonth() - 3)).getFullYear(),
      beginExcelMonth: new Date(new Date().setMonth(new Date().getMonth() - 3)).getMonth() + 1,
      EndExcelYear: new Date().getFullYear(),
      EndExcelMonth: new Date().getMonth() + 1
    }
  },
  mounted() {
    var timeList = new Date().getFullYear() - 2019
    for (var i = 0; i < timeList + 1; i++) {
      this.dateList.push({ id: i + 1, datey: 2019 + i })
    }
    this.hotelExpenses(this.beginYear, this.beginMonth, this.EndYear, this.EndMonth)
    this.search()
    // this.dictionaryTable();
    this.getCustomerContacts()
    this.getCustomers()
  },
  methods: {
    //会议类型
    getEventType() {
      this.requestApi({
        url: '/CustomerConfiguration/GetEventType',
        method: 'POST',
        data: {
          companyid: this.customer
        }
      }).then(res => {
        this.conferMetting = res
      })
    },
    //客户
    getCustomers() {
      this.requestApi({
        url: '/MeetingMa/GetCompany',
        method: 'POST',
        data: {}
      }).then(res => {
        this.customers = res
      })
    },
    //负责人
    getCustomerContacts() {
      this.requestApi({
        url: '/CustomerConfiguration/Get_tmc_account_user_account',
        method: 'GET',
        data: {}
      }).then(res => {
        this.contacts = res
      })
    },
    dictionaryTable() {
      this.requestApi({
        url: '/CustomerConfiguration/Get_event_dictionary_detail',
        method: 'GET',
        data: { event_dictionary_code: '0035' }
      }).then(res => {
        this.conferMetting = res
      })
    },
    //
    handleClick(tab, event) {
      console.log(tab, event)
    },
    hotelExpenses(beginYear, beginMonth, EndYear, EndMonth) {
      this.requestApi({
        url: '/CustomerConfiguration/SpendAnalysisAccumulateInfo',
        method: 'GET',
        data: {
          BeginYear: beginYear,
          BeginMonth: beginMonth,
          EndYear: EndYear,
          EndMonth: EndMonth
        }
      }).then(res => {
        console.log(res)
        this.pice = res
      })
    },
    search() {
      this.requestApi({
        url: '/CustomerConfiguration/SpendTypeAnalysis',
        method: 'GET',
        data: {
          BeginYear: this.beginYear,
          BeginMonth: this.beginMonth,
          EndYear: this.EndYear,
          EndMonth: this.EndMonth,
          SubmitUser: this.creator,
          EventType: this.city_category,
          CompanyId: this.customer
        }
      }).then(res => {
        this.expenseTypeList = res
      })
    },
    downloadReport() {
      if (!this.beginExcelYear || !this.beginExcelMonth || !this.EndExcelYear || !this.EndExcelMonth) {
        this.$message({
          type: 'warning',
          message: '日期不可为空'
        })
        return
      }
      this.$confirm('是否要导出报表', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.dialogVisible = false
          excelExport(
            '/Reporting/GetExcel',
            {
              BeginYear: this.beginExcelYear,
              BeginMonth: this.beginExcelMonth,
              EndYear: this.EndExcelYear,
              EndMonth: this.EndExcelMonth
            },
            '报表'
          )
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.rector {
  margin-top: 50px;
  position: relative;
  justify-content: space-around;
}
.rector .bbb {
  width: 49%;
}
.rector .ccc {
  position: absolute;
  width: 49%;
  right: 0;
  top: 0;
}
.report_layout {
  padding: 40px 10px;
}
.report_info {
  width: 1100px;
  padding: 0 10px;
  margin: 0 auto;
}
.rt_left {
  float: left;
}
.rt_left .ico {
  font-size: 22px;
  color: #333333;
  vertical-align: middle;
  margin: 0 3px 0 0;
}
.rt_left strong {
  color: #333333;
  font-size: 20px;
  font-weight: normal;
  vertical-align: middle;
}
h3 {
  font-size: 24px;
}
.rt_download {
  float: right;
  border: 1px solid #d4d4d4;
  border-radius: 2px;
  height: 26px;
  line-height: 26px;
}
.rt_download .ico {
  float: left;
  width: 26px;
  text-align: center;
  height: 26px;
  line-height: 26px;
  background: #ededed;
  color: #878787;
  font-size: 12px;
}
.rt_download span {
  float: left;
  padding: 0 10px;
  height: 26px;
  line-height: 26px;
  color: #515151;
}
.rt_public {
  position: relative;
  overflow: hidden;
  margin: 20px 0 0 0;
  border: 1px solid #eaeaea;
  border-radius: 2px;
  box-shadow: 1px 0 3px 0 rgba($color: #858585, $alpha: 1);
}
.international-title-span {
  font-size: 12px;
  padding-left: 5px;
  color: #999999;
  font-weight: normal;
}
.rt_public .rt_box {
  padding: 20px;
}
.overview_box {
  padding: 20px 0;
  text-align: center;
}
.rt_public {
  margin: 20px 0 0 0;
  border: 1px solid #eaeaea;
  border-radius: 2px;
  box-shadow: 1px 0 3px 0 rgba($color: #858585, $alpha: 1);
}
.rt_public .title {
  border-radius: 2px 2px 0 0;
  background: #f4f4f4;
  border-bottom: 1px solid #eaeaea;
  height: 44px;
  line-height: 44px;
  padding: 0 20px;
  color: #626567;
  font-size: 16px;
}
.international-title-span {
  font-size: 12px;
  padding-left: 5px;
  color: #999999;
  font-weight: normal;
}
.rt_public .rt_box {
  padding: 20px;
}
.overview_box {
  margin-top: -30px;
  padding: 20px 0;
  text-align: center;
}
.filter {
  height: 100px;
}
.filter_item {
  margin: 0 0 0 5px;
}
.filter_item,
.filter_name,
.filter_box,
.filter_sl {
  float: left;
}
.filter_item .filter_box select {
  margin-top: 10px;
  height: 32px;
  width: 100px;
  border: 1px solid #dcdcdc;
  color: #666;
}
.filter_item .filter_box .date_select {
  height: 32px;
  width: 75px;
  border: 1px solid #dcdcdc;
  color: #666;
}
.filter_item .filter_sl {
  margin: 10px 10px;
  color: #323232;
  font-size: 14px;
  line-height: 32px;
}
.filter_item .filter_btn {
  margin-top: 10px;
  display: inline-block;
  width: 80px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  background: #3da1e3;
  font-size: 16px;
  color: #fff;
  border-radius: 2px;
}
.filter_text {
  float: left;
  margin: 5px;
  margin-top: 15px;
  padding-left: 10px;
}
.tuBiao {
  position: relative;
}
.overview_box .left {
  border: 1px solid red;
  width: 400px;
  float: left;
}
.overview_box .right {
  width: 100px;
  height: 100px;
  border: 1px solid rgb(44, 175, 87);
}
.rt_left .ico img {
  width: 22px;
  margin-right: 4px;
}

.none {
  text-align: center;
  padding: 50px 0;
}
.none .ico {
  font-size: 56px;
  color: #ddd;
  font-weight: normal;
}
.none .ico img {
  width: 100px;
  margin-right: 4px;
}
.none p {
  font-size: 14px;
  color: #999;
  line-height: 30px;
}
.rt_download .ico img {
  width: 14px;
  margin-top: 5px;
}
//
.chart_box .form_public {
  float: right;
  width: 530px;
  margin: 0 -530px 0 0;
  max-height: 400px;
  position: relative;
}
.form_public .fp_th {
  width: 100%;
}

.form_public .fp_th th {
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  text-align: left;
  background: #727f88;
  font-weight: normal;
  font-size: 14px;
  color: #fff;
}
.form_public table {
  width: 100%;
  border-collapse: collapse;
}
.form_public .form_sub .cursor_tr {
  cursor: pointer;
  height: 50px;
}
.form_public .form_sub .type_fa {
  /* width: 215px; */
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form_public .form_sub td {
  word-break: break-all;
  word-wrap: break-word;
  padding: 14px 10px;
  border-bottom: 1px dashed #d5d5d5;
  font-size: 14px;
  color: #6b6b6b;
  max-width: 230px;
}
</style>
