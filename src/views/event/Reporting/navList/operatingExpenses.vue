/event<template>
  <div class="report_layout">
    <div class="report_info">
      <div class="rt_title clx" style="margin-bottom: 70px; height: 28px">
        <h3 class="rt_left">
          <i class="ico"><img :src="require('@/assets/images/log.png')" alt="" /></i>
          <strong>业务费用统计</strong>
        </h3>
        <a href="" class="rt_download" @click.prevent="dialogVisible=true">
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
        <br />
        <div class="rt_box">
          <div class="filter clx">
            <!-- 需要数据支撑循环 -->
            <div class="filter_text">客户 :</div>
            <div class="filter_item">
              <div class="filter_box">
                <select name="creator" v-model="customerOne">
                  <option :value="null"></option>
                  <option :value="item.id" v-for="(item, index) in customers">{{ item.shortname }}</option>
                </select>
              </div>
            </div>
            <!-- <div class="filter_item">
							<div class="filter_box">
								<select style="width: 120px" autocomplete="off" name="time_type">
									<option value="1">全部</option>
									<option value="2">中旅会展</option>
								</select>
							</div>
						</div> -->
            <div class="filter_item">
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="totalBeginYears">
                  <option :value="item.datey" v-for="item in dateList" :key="item.id">{{ item.datey }} 年</option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="totalBeginMonth">
                  <option :value="item.datem" v-for="item in monthList" :key="item.id">{{ item.datem }} 月</option>
                </select>
              </div>
              <div class="filter_sl">～</div>
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="totalEndYears">
                  <option :value="item.datey" v-for="item in dateList" :key="item.id">{{ item.datey }} 年</option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="totalEndMonth">
                  <option :value="item.datem" v-for="item in monthList" :key="item.id">{{ item.datem }} 月</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div href="" class="filter_btn" @click="costofOperation()">确定</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 数据概览 -->
      <div class="rt_overview rt_public" style="margin-top: 100px;">
        <div class="title">数据概览</div>
        <div class="rt_box">
          <div class="overview_box clx" style="display: flex; justify-content: space-around">
            <div class="overview_item">
              <div class="hot">{{ piclist.cumulativeHotelInquiries?piclist.cumulativeHotelInquiries.toFixed(2):0 }}</div>
              <p>已支出费用总计</p>
            </div>
            <div class="overview_item">
              <div class="hot">{{ piclist.cumulativeInquiryHotel?piclist.cumulativeInquiryHotel.toFixed(2):0 }}</div>
              <p>计划费用总计</p>
            </div>
            <div class="overview_item">
              <div class="hot">{{ piclist.cumulativeQuotesReceived }}</div>
              <p>办会数量</p>
            </div>
            <div class="overview_item">
              <div class="hot">{{ piclist.cumulativeWinningOrders?piclist.cumulativeWinningOrders.toFixed(2):0 }}</div>
              <p>平均会议成本</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 费用统计（会议类型） -->
      <div class="rt_overview rt_public">
        <div class="title">费用统计（会议类型）</div>
        <div class="spadding">
          <div style="margin-top: -28px;">
            <div class="filter_text">客户 :</div>
            <div class="filter_item">
              <div class="filter_box">
                <select name="creator" v-model="customerTwo">
                  <option :value="null"></option>
                  <option :value="item.id" v-for="(item, index) in customers">{{ item.shortname }}</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_box">
                <select style="width: 120px" autocomplete="off" name="time_type" v-model="tjtime">
                  <option value="0">支出费用</option>
                  <option value="1">计划费用</option>
                </select>
              </div>
            </div>
            <!-- <div class="filter_item">
							<div class="filter_box">
								<select style="width: 120px" autocomplete="off" name="time_type" v-model="typeID">
									<option :value="item.id" v-for="(item, index) in departmentList" :key="index">{{ item.name }}</option>
								</select>
							</div>
						</div> -->
            <div class="filter_item">
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="meetBeginYears">
                  <option :value="item.datey" v-for="item in dateList" :key="item.id">{{ item.datey }} 年</option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="meetBeginMonth">
                  <option :value="item.datem" v-for="item in monthList" :key="item.id">{{ item.datem }} 月</option>
                </select>
              </div>
              <div class="filter_sl">～</div>
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="meetEndYears">
                  <option :value="item.datey" v-for="item in dateList" :key="item.id">{{ item.datey }} 年</option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="meetEndMonth">
                  <option :value="item.datem" v-for="item in monthList" :key="item.id">{{ item.datem }} 月</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_btn" @click="seetingsTatistics">确定</div>
            </div>
          </div>
          <div style="margin-top: 100px;">
            <SettingType :typelist="typelist" />
          </div>
          <div class="enter">
            <div class="enterfoom">
              <Bingtuseeting :monthlist="monthlist" />
            </div>
            <div class="enterven">
              <Bingseeting :seetingtypeList="seetingtypeList" />
            </div>
          </div>

          <div class="none" style="display:none">
            <i class="ico"><img :src="require('@/assets/images/wsj.png')" alt="" /></i>
            <p>暂无数据</p>
          </div>
        </div>
      </div>
      <!--  -->
      <!-- 费用统计（供应商） -->
      <div class="rt_overview rt_public">
        <div class="title">费用统计（供应商）</div>
        <div class="spadding">
          <div style="margin-top: -28px;margin-bottom: 100px;">
            <div class="filter_text">客户 :</div>
            <div class="filter_item">
              <div class="filter_box">
                <select name="creator" v-model="customerThree">
                  <option :value="null"></option>
                  <option :value="item.id" v-for="(item, index) in customers">{{ item.shortname }}</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_box">
                <select style="width: 120px" autocomplete="off" name="time_type" v-model="AmountType">
                  <option value="0">支出费用</option>
                  <option value="1">计划费用</option>
                </select>
              </div>
            </div>
            <!-- <div class="filter_item">
							<div class="filter_box">
								<select style="width: 120px" autocomplete="off" name="time_type" v-model="seetingId">
									<option :value="item.id" v-for="(item, index) in company_name" :key="index">{{ item.company_name }}</option>
								</select>
							</div>
						</div> -->
            <div class="filter_item">
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="serviceBeginYears">
                  <option :value="item.datey" v-for="item in dateList" :key="item.id">{{ item.datey }} 年</option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="serviceBeginMonth">
                  <option :value="item.datem" v-for="item in monthList" :key="item.id">{{ item.datem }} 月</option>
                </select>
              </div>
              <div class="filter_sl">～</div>
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="serviceEndYears">
                  <option :value="item.datey" v-for="item in dateList" :key="item.id">{{ item.datey }} 年</option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="serviceEndMonth">
                  <option :value="item.datem" v-for="item in monthList" :key="item.id">{{ item.datem }} 月</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_btn" @click="provider">确定</div>
              <!-- @click="handle" -->
            </div>
          </div>
          <div>
            <Bingcity :cityList="cityList" />
          </div>
          <div class="center">
            <div class="centerleft">
              <ServiceproviderList :serviceList="serviceList" />
            </div>
            <div class="centerright">
              <el-table :data="cityList" border style="width: 100%">
                <el-table-column prop="cityName" label="城市" width="180"></el-table-column>
                <el-table-column prop="amount" label="数量" width="180"></el-table-column>
              </el-table>
            </div>
          </div>

          <div class="none" style="display: none;">
            <i class="ico" style="width: 100px; height: 100px;"><img :src="require('@/assets/images/wsj.png')" alt="" /></i>
            <p>暂无数据</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingType from '@/components/event/conferencetype.vue';
import Bingseeting from '@/components/event/bingseeting.vue';
import Bingtuseeting from '@/components/event/bingtuseeting.vue';
import Bingcity from '@/components/event/bingcity.vue';
import ServiceproviderList from '@/components/event/serviceproviderList.vue';
import excelExport from '@/utils/exportexcel.js'
import requestApi from '@/utils/requestData'
export default {
	data() {
		return {
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
			AmountType: 0,
			piclist: {
				cumulativeHotelInquiries: '',
				cumulativeInquiryHotel: '',
				cumulativeQuotesReceived: '',
				cumulativeWinningOrders: ''
			},
			typeID: '',
			tjtime: '0',
			// 业务费用统计查询条件字段
			totalBeginYears: new Date(new Date().setMonth(new Date().getMonth()-3)).getFullYear(),
			totalBeginMonth: new Date(new Date().setMonth(new Date().getMonth()-3)).getMonth()+1,
			totalEndYears: new Date().getFullYear(),
			totalEndMonth: new Date().getMonth()+1,
			// 会议类型费用统计查询条件字段
			meetBeginYears: new Date(new Date().setMonth(new Date().getMonth()-3)).getFullYear(),
			meetBeginMonth: new Date(new Date().setMonth(new Date().getMonth()-3)).getMonth()+1,
			meetEndYears: new Date().getFullYear(),
			meetEndMonth: new Date().getMonth()+1,
			settingType: '0',
			typelist: [],
			monthlist: [],
			seetingtypeList: [],
			cityList: [],
			serviceList: [],
			departmentList: [],
			seetingId: '2d207dbd-0bd4-11ec-ba42-fa163ed463f8',
			company_name: [],
			customers: [],
			customerOne: null,
			customerTwo: null,
			customerThree: null,
			serviceBeginYears:new Date(new Date().setMonth(new Date().getMonth()-3)).getFullYear(),
			serviceBeginMonth:new Date(new Date().setMonth(new Date().getMonth()-3)).getMonth()+1,
			serviceEndYears:new Date().getFullYear(),
			serviceEndMonth:new Date().getMonth()+1,
			dialogVisible:false,
			beginExcelYear: new Date(new Date().setMonth(new Date().getMonth() - 3)).getFullYear(),
			beginExcelMonth: new Date(new Date().setMonth(new Date().getMonth() - 3)).getMonth() + 1,
			EndExcelYear: new Date().getFullYear(),
			EndExcelMonth: new Date().getMonth() + 1,
		};
	},
	components: {
		SettingType,
		Bingseeting,
		Bingtuseeting,
		Bingcity,
		ServiceproviderList
	},
	mounted() {
		var timeList = new Date().getFullYear() - 2019;
		for (var i = 0; i < timeList + 1; i++) {
			this.dateList.push({ id: i + 1, datey: 2019 + i });
		}
		this.suppliers();
		this.costofOperation();
		this.seetingtypes();
		this.DepartmentId();
		this.serviceProvider();
		this.getCustomers()
	},
	methods: {
		//客户
		getCustomers() {
      requestApi({
        url: '/MeetingMa/GetCompany',
        method: 'POST',
        data: {},
      }).then(res => {
				this.customers = res;
			});
		},
		//获取部门id
		DepartmentId() {
      requestApi({
        url: '/CustomerConfiguration/GetDepartment',
        method: 'GET',
        data: {},
      }).then(res => {
				this.departmentList = res;
			});
		},
		costofOperation() {
      requestApi({
        url: '/CustomerConfiguration/BusinessExpenseStatistics',
        method: 'GET',
        data: {
          BeginYear: this.totalBeginYears,
          BeginMonth: this.totalBeginMonth,
          EndYear: this.totalEndYears,
          EndMonth: this.totalEndMonth,
          CompanyId:this.customerOne
        },
      }).then(res => {
					if (res) {
						this.piclist = res;
					}
				});
		},
		seetingtypes() {
      requestApi({
        url: '/CustomerConfiguration/CostStatisticsByEventType',
        method: 'GET',
        data: {
          BeginYear: this.meetBeginYears,
          BeginMonth: this.meetBeginMonth,
          EndYear: this.meetEndYears,
          EndMonth: this.meetEndMonth,
          // DepartmentId: this.typeID,
          AmountType: this.tjtime,
          CompanyId:this.customerTwo
        },
      }).then(res => {
					if (res) {
						this.typelist = res.monthTypeList;
						this.monthlist = res.monthList;
						this.seetingtypeList = res.typeList;
					}
				});
		},
		serviceProvider() {
      requestApi({
        url: '/CustomerConfiguration/GetServiceprovider',
        method: 'GET',
        data: {},
      }).then(res => {
				console.log(res, '228828282828282');
				this.company_name = res;
			});
		},
		suppliers() {
      requestApi({
        url: '/CustomerConfiguration/CostStatisticsByEventServiceprovider',
        method: 'GET',
        data: {
          // ServiceproviderId: this.seetingId,
          BeginYear: this.serviceBeginYears,
          BeginMonth: this.serviceBeginMonth,
          EndYear: this.serviceEndYears,
          EndMonth: this.serviceEndMonth,
          AmountType: this.AmountType,
          CompanyId:this.customerThree
        },
      }).then(res => {
					console.log(res, '266262626262626626');
					this.cityList = res.cityList;
					this.serviceList = res.serviceproviderList;
				});
		},
		seetingsTatistics() {
			this.seetingtypes();
		},
		provider() {
			this.suppliers();
		},
		downloadReport() {
			if(!this.beginExcelYear || !this.beginExcelMonth || !this.EndExcelYear || !this.EndExcelMonth){
				this.$message({
					type: 'warning',
					message: '日期不可为空'
				});
				return
			}
			this.$confirm('是否要导出报表','提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			)
				.then(() => {
					this.dialogVisible=false
					excelExport('/Reporting/GetExcel',{
						BeginYear: this.beginExcelYear,
						BeginMonth: this.beginExcelMonth,
						EndYear: this.EndExcelYear,
						EndMonth: this.EndExcelMonth
					},'报表')
				})
				.catch(() => {
					
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: space-around;
}
.center .centerleft {
  width: 60%;
}
.center .centerright {
  width: 34%;
}
.enter {
  display: flex;
  justify-content: space-around;
  margin-bottom: 50px;
}
.enter .enterven {
  width: 49%;
  height: 300px;
}
.enter .enterfoom {
  width: 49%;
  height: 300px;
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
.rt_public .rt_box {
  padding: 20px;
}
.overview_box {
  padding: 20px 0;
  text-align: center;
}
.overview_box .overview_item:first-child {
  border: none;
  margin: 10px 0 0;
}

.overview_box .overview_item p {
  text-align: center;
  font-size: 14px;
  color: #727f88;
  line-height: 20px;
}
.overview_box .overview_item {
  display: inline-block;
  min-width: 175px;
  border-left: 1px solid #e7e7e7;
  margin: 10px 0 0 -1px;
  padding: 0 24px;
  box-sizing: border-box;
}

.overview_item p {
  text-align: center;
  font-size: 14px;
  color: #727f88;
  line-height: 20px;
}

.overview_box .overview_item p {
  text-align: center;
  font-size: 14px;
  color: #727f88;
  line-height: 20px;
}

.overview_box .overview_item .hot {
  font-size: 30px;
  color: #f99857;
  font-weight: normal;
  line-height: 40px;
  text-align: center;
}
.overview_box {
  padding: 20px 0;
  margin: 0 auto;
}
.filter {
  margin: 0 0 32px -19px;
}
.filter_item {
  margin: 0 0 0 20px;
}
.filter_item,
.filter_name,
.filter_box,
.filter_sl {
  float: left;
}
.filter_item .filter_box select {
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
  margin: 0 10px;
  color: #323232;
  font-size: 14px;
  line-height: 32px;
}
.filter_item .filter_btn {
  display: inline-block;
  width: 80px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  background: #3da1e3;
  font-size: 16px;
  color: #fff;
  border-radius: 2px;
  cursor: pointer;
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
.none p {
  font-size: 14px;
  color: #999;
  line-height: 30px;
}
.spadding {
  padding: 50px;
}

.rt_left .ico img {
  width: 22px;
  margin-right: 4px;
}
.rt_download .ico img {
  width: 14px;
  margin-top: 5px;
}
.filter_text {
  float: left;
  margin: 5px 0;
  // margin-top: 15px;
  padding-left: 20px;
}
</style>
