<template>
  <div class="report_layout">
    <div class="report_info">
      <div class="rt_title clx" style="height: 28px">
        <h3 class="rt_left">
          <i class="ico"><img :src="require('@/assets/images/log.png')" alt="" /></i>
          <strong>会议服务商费用分析</strong>
          <span class="international-title-span">Hotel RFP Statistics</span>
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
      </div>
      <!--  -->
      <div class="rt_overview rt_public">
        <div class="title">
          部门费用
          <span class="international-title-span">Spend by Division</span>
        </div>
        <div class="rt_box">
          <div class="filter clx">
            <!-- 需要数据支撑循环 -->
            <!-- <div class="filter_item">
							<div class="filter_box">
								<select style="width: 120px" autocomplete="off" name="time_type" v-model="division_time_type">
									<option value="1">提交询价单时间</option>
									<option value="2">会议时间</option>
								</select>
							</div>
						</div> -->
            <div class="filter_text">客户 :</div>
            <div class="filter_item">
              <div class="filter_box">
                <select name="creator" v-model="customerOne">
                  <option :value="null"></option>
                  <option :value="item.id" v-for="(item, index) in customers">{{ item.shortname }}</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="division_start_year">
                  <option :value="item.datey" v-for="(item, index) in dateList" :key="item.id">{{ item.datey }} 年</option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="division_start_month">
                  <option :value="item.datem" v-for="(item, index) in monthList" :key="item.id">{{ item.datem }} 月</option>
                </select>
              </div>
              <div class="filter_sl">～</div>
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="division_end_year">
                  <option :value="item.datey" v-for="(item, index) in dateList" :key="item.id">{{ item.datey }} 年</option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="division_end_month">
                  <option :value="item.datem" v-for="(item, index) in monthList" :key="item.id">{{ item.datem }} 月</option>
                </select>
              </div>
            </div>
            <div class="filter_item"><a class="filter_btn" @click="searchDivision">确定</a></div>
          </div>
        </div>
        <div class="spadding" v-show="!singular">
          <div class="aaa">
            <div class="bbb">
              <Spend :departmentType="departmentType.llist" />
            </div>
            <div class="ccc">
              <div class="form_public">
                <table class="fp_th">
                  <thead>
                    <tr>
                      <th width="50%">部门 Division</th>
                      <th width="25%" class="hg-oversea-th hg-align-right">
                        总占比
                        <br />
                        Total %
                      </th>
                      <th width="25%" class="hg-align-right">
                        总费用(元) Total Spend
                        <i class="biz icon-sort sort-left"></i>
                      </th>
                    </tr>
                  </thead>
                </table>
                <div class="form_sub">
                  <table>
                    <tbody>
                      <tr class="cursor_tr" :data-index="index" v-for="(item, index) in departmentType.rlist">
                        <td width="50%">
                          <div class="type_fa">
                            <span class="piece" style="background: #6cc99c"></span>
                            其它{{ item.name }}
                          </div>
                        </td>
                        <td width="25%" class="hg-align-right">{{ item.b }}%</td>
                        <td width="25%" class="hg-align-right">{{ item.mentsum }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="none" style="display: none">
            <i class="ico"><img :src="require('@/assets/images/wsj.png')" alt="" /></i>
            <p>暂无数据</p>
          </div>
        </div>
        <div class="none" v-show="singular">
          <i class="ico"><img :src="require('@/assets/images/wsj.png')" alt="" /></i>
          <p>暂无数据</p>
        </div>
      </div>
      <div class="rt_overview rt_public">
        <div class="title">
          会议类型费用
          <span class="international-title-span">Spend by project type</span>
        </div>
        <div class="rt_box">
          <div class="filter clx">
            <!-- 需要数据支撑循环 -->
            <!-- <div class="filter_item">
							<div class="filter_box">
								<select style="width: 120px" autocomplete="off" name="time_type" v-model="type_time_type">
									<option value="1">提交询价单时间</option>
									<option value="2">会议时间</option>
								</select>
							</div>
						</div> -->
            <div class="filter_text">客户 :</div>
            <div class="filter_item">
              <div class="filter_box">
                <select name="creator" v-model="customerTwo">
                  <!-- <option :value="null"></option> -->
                  <option :value="item.id" v-for="(item, index) in customers">{{ item.shortname }}</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="type_start_year">
                  <option :value="item.datey" v-for="(item, index) in dateList" :key="item.id">{{ item.datey }} 年</option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="type_start_month">
                  <option :value="item.datem" v-for="(item, index) in monthList" :key="item.id">{{ item.datem }} 月</option>
                </select>
              </div>
              <div class="filter_sl">～</div>
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="type_end_year">
                  <option :value="item.datey" v-for="(item, index) in dateList" :key="item.id">{{ item.datey }} 年</option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="type_end_month">
                  <option :value="item.datem" v-for="(item, index) in monthList" :key="item.id">{{ item.datem }} 月</option>
                </select>
              </div>
            </div>
            <div class="filter_item"><a class="filter_btn" @click="searchType">确定</a></div>
          </div>
        </div>
        <div class="spadding" v-show="!settingProject">
          <div class="aaa">
            <div class="bbb">
              <Projectype :meetingType="meetingType.llist" />
            </div>
            <div class="ccc">
              <div class="form_public">
                <table class="fp_th">
                  <thead>
                    <tr>
                      <th width="50%">会议类型 Project Type</th>
                      <th width="25%;" class="hg-align-right">
                        总占比Total
                        <i class="biz icon-sort sort-left"></i>
                      </th>
                      <th width="25%" class="hg-align-right">
                        总费用(元)Total Spend
                        <i class="biz icon-sort sort-left"></i>
                      </th>
                    </tr>
                  </thead>
                </table>
                <div class="form_sub">
                  <table>
                    <tbody>
                      <tr class="cursor_tr" :data-index="index" v-for="(item, index) in meetingType.rlist">
                        <td width="50%">
                          <div class="type_fa">
                            <span class="piece" style="background: #6cc99c"></span>
                            {{ item.activityTypeName }}
                          </div>
                        </td>
                        <td width="25%" class="hg-align-right">{{ item.percentage }}%</td>
                        <td width="25%" class="hg-align-right">{{ item.amount?item.amount.toFixed(2):0 }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="none" style="display: none">
            <i class="ico"><img :src="require('@/assets/images/wsj.png')" alt="" /></i>
            <p>暂无数据</p>
          </div>
        </div>
        <div class="none" v-show="settingProject">
          <i class="ico"><img :src="require('@/assets/images/wsj.png')" alt="" /></i>
          <p>暂无数据</p>
        </div>
      </div>
      <div class="rt_overview rt_public">
        <div class="title">
          项目成本构成
          <span class="international-title-span">Spend by cost elements</span>
        </div>
        <div class="rt_box">
          <div class="filter clx">
            <!-- 需要数据支撑循环 -->
            <!-- <div class="filter_item">
							<div class="filter_box">
								<select style="width: 120px" autocomplete="off" name="time_type" v-model="elements_time_type">
									<option value="1">提交询价单时间</option>
									<option value="2">会议时间</option>
								</select>
							</div>
						</div> -->
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
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="elements_start_year">
                  <option :value="item.datey" v-for="(item, index) in dateList" :key="item.id">{{ item.datey }} 年</option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="elements_start_month">
                  <option :value="item.datem" v-for="(item, index) in monthList" :key="item.id">{{ item.datem }} 月</option>
                </select>
              </div>
              <div class="filter_sl">～</div>
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="elements_end_year">
                  <option :value="item.datey" v-for="(item, index) in dateList" :key="item.id">{{ item.datey }} 年</option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="elements_end_month">
                  <option :value="item.datem" v-for="(item, index) in monthList" :key="item.id">{{ item.datem }} 月</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div href="" class="filter_btn" @click="searchElements">确定</div>
            </div>
          </div>
        </div>
        <div class="spadding" v-show="!ElementsCost">
          <div class="aaa">
            <div class="bbb">
              <Costelements :projectCost="projectCost" />
            </div>
            <div class="ccc">
              <div class="form_public">
                <table class="fp_th">
                  <thead>
                    <tr>
                      <th width="50%">项目 Elements</th>
                      <th width="25%" class="hg-oversea-th hg-align-right">
                        总占比
                        <br />
                        Total %
                      </th>
                      <th width="25%" class="hg-align-right">
                        总费用(元) Total Spend
                        <i class="biz icon-sort sort-left"></i>
                      </th>
                    </tr>
                  </thead>
                </table>
                <div class="form_sub">
                  <table>
                    <tbody>
                      <tr class="cursor_tr" :data-index="index" v-for="(item, index) in projectCost">
                        <td width="50%">
                          <div class="type_fa">
                            <span class="piece" style="background: #6cc99c"></span>
                            {{ item.projectName }}
                          </div>
                        </td>
                        <td width="25%" class="hg-align-right">{{ item.percentage }}%</td>
                        <td width="25%" class="hg-align-right">{{ item.amount?item.amount.toFixed(2):0 }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="none" style="display: none">
            <i class="ico"><img :src="require('@/assets/images/wsj.png')" alt="" /></i>
            <p>暂无数据</p>
          </div>
        </div>
        <div class="none" v-show="ElementsCost">
          <i class="ico"><img :src="require('@/assets/images/wsj.png')" alt="" /></i>
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spend from '@/components/event/spendby.vue';
import Projectype from '@/components/event/projectype.vue';
import Costelements from '@/components/event/costelements.vue';
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
			//部门费用显示隐藏
			singular: false,
			//
			settingProject: false,
			//
			ElementsCost: false,

			//部门费用搜索条件默认值
			division_time_type: '1',
			division_start_year: new Date(new Date().setMonth(new Date().getMonth()-3)).getFullYear(),
			division_start_month: new Date(new Date().setMonth(new Date().getMonth()-3)).getMonth()+1,
			division_end_year: new Date().getFullYear(),
			division_end_month: new Date().getMonth() + 1,

			//会议类型费用搜索条件默认值
			type_time_type: '1',
			type_start_year: new Date(new Date().setMonth(new Date().getMonth()-3)).getFullYear(),
			type_start_month: new Date(new Date().setMonth(new Date().getMonth()-3)).getMonth()+1,
			type_end_year: new Date().getFullYear(),
			type_end_month: new Date().getMonth() + 1,

			//项目成本构成搜索条件默认值
			elements_time_type: '1',
			elements_start_year: new Date(new Date().setMonth(new Date().getMonth()-3)).getFullYear(),
			elements_start_month: new Date(new Date().setMonth(new Date().getMonth()-3)).getMonth()+1,
			elements_end_year: new Date().getFullYear(),
			elements_end_month: new Date().getMonth() + 1,

			//
			departmentType: {}, //图表部门费用
			meetingType: {}, //图表会议类型
			projectCost: [], //项目成本
			customers: [],
			customerOne: null,
			customerTwo: null,
			customerThree: null,
			dialogVisible:false,
			beginExcelYear: new Date(new Date().setMonth(new Date().getMonth() - 3)).getFullYear(),
			beginExcelMonth: new Date(new Date().setMonth(new Date().getMonth() - 3)).getMonth() + 1,
			EndExcelYear: new Date().getFullYear(),
			EndExcelMonth: new Date().getMonth() + 1,
		};
	},
	components: {
		Spend,
		Projectype,
		Costelements
	},
	mounted() {
		var timeList = new Date().getFullYear() - 2019;
		for (var i = 0; i < timeList + 1; i++) {
			this.dateList.push({ id: i + 1, datey: 2019 + i });
		}
		this.spendTypeAnalysisReport();
		this.spendByProjectType();
		this.spendCyCostElements();
		this.getCustomers()
	},
	methods: {
		//客户
		getCustomers() {
      requestApi({
        url: '/MeetingMa/GetCompany',
        method: 'post',
        data: {},
      }).then(res => {
				this.customers = res;
				this.customerTwo=this.customers[0].id
			});
		},
		//
		spendTypeAnalysisReport() {
      requestApi({
        url: '/EventReport/SpendTypeAnalysis',
        method: 'GET',
        data: {
          // TimeType: this.division_time_type,
          BeginYear: this.division_start_year,
          BeginMonth: this.division_start_month,
          EndYear: this.division_end_year,
          EndMonth: this.division_end_month,
          CompanyId:this.customerOne
        },
      }).then(res => {
					if (res.length === 0) {
						this.singular = true;
					} else {
						this.singular = false;
					}
					this.departmentType = res;
					console.log(res, '21321321321');
				});
		},
		//部门费用
		searchDivision() {
			this.spendTypeAnalysisReport();
		},
		//
		spendByProjectType() {
      requestApi({
        url: '/CustomerConfiguration/SpendByProjectType',
        method: 'GET',
        data: {
          // TimeType: this.division_time_type,
          BeginYear: this.type_start_year,
          BeginMonth: this.type_start_month,
          EndYear: this.type_end_year,
          EndMonth: this.type_end_month,
          CompanyId:this.customerTwo
        },
      }).then(res => {
					if (res.length === 0) {
						this.settingProject = true;
					} else {
						this.settingProject = false;
					}
					console.log(res, '21321321321');
					this.meetingType = res;
				});
		},
		//会议类型费用
		searchType() {
			this.spendByProjectType();
		},
		//
		spendCyCostElements() {
      requestApi({
        url: '/CustomerConfiguration/SpendCyCostElements',
        method: 'GET',
        data: {
          // TimeType: this.division_time_type,
          BeginYear: this.elements_start_year,
          BeginMonth: this.elements_start_month,
          EndYear: this.elements_end_year,
          EndMonth: this.elements_end_month,
          CompanyId:this.customerThree
        },
      }).then(res => {
					if (!res) {
						this.ElementsCost = true;
					} else {
						this.ElementsCost = false;
					}
					console.log(res, '21321321321------');
					this.projectCost = res;
				});
		},
		//项目成本构成
		searchElements() {
			this.spendCyCostElements();
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
.aaa {
  display: flex;
  justify-content: space-around;
  margin-top: -50px;
}
.aaa .bbb {
  // border: 1px solid red;
  width: 49%;
}
.aaa .ccc {
  // border: 1px solid red;
  width: 49%;
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
.international-title-span {
  font-size: 12px;
  padding-left: 5px;
  color: #999999;
  font-weight: normal;
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
  margin: 0 0 20px 0;
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
  height: 44px;
  line-height: 16px;
}
.sort-left {
  margin-left: 5px;
}

.icon-sort {
  float: none;
  cursor: pointer;
}
.biz {
  font-style: normal;
  font-family: 'biz';
}
.form_public .form_sub {
  height: 350px;
  overflow: scroll;
}
.form_public table {
  width: 100%;
  border-collapse: collapse;
}
.form_public .form_sub .cursor_tr {
  cursor: pointer;
  height: 50px;
}
.form_public .form_sub td {
  // word-break: break-all;
  // word-wrap: break-word;
  padding: 14px 10px;
  border-bottom: 1px dashed #d5d5d5;
  font-size: 14px;
  color: #6b6b6b;
  max-width: 230px;
}
.form_public .form_sub .type_fa {
  /* width: 215px; */
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.piece {
  display: inline-block;
  width: 24px;
  height: 12px;
  border-radius: 2px;
  margin: 0 5px 0 0;
}
.clx:after {
  content: '.';
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
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
.filter_text {
  float: left;
  margin: 5px 0;
  // margin-top: 15px;
  // padding-left: 10px;
}
</style>
