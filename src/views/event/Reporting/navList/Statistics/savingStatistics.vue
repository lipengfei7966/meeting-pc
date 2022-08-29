<template>
  <div>
    <div class="rt_box" style="height: 30px">
      <div class="filter clx">
        <!-- 需要数据支撑循环 -->
        <div class="filter_text">会议时间 :</div>
        <!-- <div class="filter_item">
              <div class="filter_box" style="padding-top: 5px;">
                
              </div>
            </div> -->
        <div class="filter_item">
          <div class="filter_box filter_date">
            <select class="date_select" autocomplete="off" name="start_year" v-model="BeginYearTime">
              <option :value="item.datey" v-for="(item, index) in dateList" :key="item.id">{{ item.datey }} 年</option>
            </select>
            <select name="start_month" class="date_select" autocomplete="off" v-model="BeginMonthTime">
              <option :value="item.datem" v-for="(item, index) in monthList" :key="item.id">{{ item.datem }} 月</option>
            </select>
          </div>
          <div class="filter_sl">～</div>
          <div class="filter_box filter_date">
            <select class="date_select" autocomplete="off" name="start_year" v-model="EndYearTime">
              <option :value="item.datey" v-for="(item, index) in dateList" :key="item.id">{{ item.datey }} 年</option>
            </select>
            <select name="start_month" class="date_select" autocomplete="off" v-model="EndMonthTime">
              <option :value="item.datem" v-for="(item, index) in monthList" :key="item.id">{{ item.datem }} 月</option>
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
            <select name="category" v-model="meetingType">
              <option :value="null"></option>
              <option :value="item.id" v-for="(item, index) in conferMetting">{{ item.name }}</option>
            </select>
          </div>
        </div>
        <div class="filter_text">负责人 :</div>

        <div class="filter_item">
          <div class="filter_box">
            <select name="creator" v-model="creator">
              <option :value="null"></option>
              <option :value="item.uusername" v-for="(item, index) in contacts">{{ item.ufullname }}</option>
            </select>
          </div>
        </div>
        <div class="filter_text">费用类型 :</div>
        <div class="filter_item">
          <div class="filter_box">
            <select name="value_type" autocomplete="off" style="width: 105px; padding-left: 25px" v-model="costType">
              <option :value="null"></option>
              <option value="1">会议消费</option>
              <option value="2">餐饮消费</option>
              <option value="3">客房消费</option>
              <!-- <option value="4">其他</option>
							<option value="5">室内用车</option>
							<option value="6">大交通</option> -->
            </select>
          </div>
        </div>
        <div class="filter_item">
          <div href="" class="filter_btn" @click="tatolSaving">确定</div>
        </div>
      </div>
    </div>
    <div class="canvas_top">
      <BrokenLineTwo :dateL="dateL" v-show="dateL" />
      <div class="none" v-show="!dateL">
        <i class="ico"><img :src="require('@/assets/images/wsj.png')" alt="" /></i>
        <p>暂无数据</p>
      </div>
    </div>
    <div class="ps_tatol">
      <span class="tatol_item">
        历史累计支出：
        <strong class="hot">{{ this.picelist.totalExpenditure?this.picelist.totalExpenditure.toFixed(2):0 }}</strong>
        元
      </span>
      <span class="tatol_item">
        历史累计Saving：
        <strong class="hot">{{ this.picelist.totalSaving?this.picelist.totalSaving.toFixed(2):0 }}</strong>
        元
      </span>
      <span class="tatol_item">
        当前时段累计支出：
        <strong class="hot" id="current_price">{{ this.picelist.CurrentExpenditure?this.picelist.CurrentExpenditure.toFixed(2):0 }}</strong>
        元
      </span>
      <span class="tatol_item">
        当前时段累计Saving：
        <strong class="hot" id="current_saving">{{ this.picelist.CurrentSaving?this.picelist.CurrentSaving.toFixed(2):0 }}</strong>
        元
      </span>
    </div>
  </div>
</template>

<script>
import BrokenLineTwo from '@/components/event/brokenLineTwo';

export default {
	props: ['pice'],
	data() {
		return {
			dateList: [
				
			],
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
			contacts: [],
			picelist: [],
			dateL: [],
			customers: [],
			conferMetting: [],
			BeginYearTime: new Date(new Date().setMonth(new Date().getMonth()-3)).getFullYear(),
			BeginMonthTime: new Date(new Date().setMonth(new Date().getMonth()-3)).getMonth()+1,
			EndYearTime: new Date().getFullYear(),
			EndMonthTime: new Date().getMonth()+1,
			costType: null,
			creator: null,
			meetingType: null,
			customer: 0
		};
	},
	mounted() {
		var timeList = new Date().getFullYear() - 2019;
		for (var i = 0; i < timeList + 1; i++) {
			this.dateList.push({ id: i + 1, datey: 2019 + i });
		}
		this.costStatistics();
		// this.dictionaryTable();
		this.getCustomerContacts();
		this.getCustomers();
	},
	components: {
		BrokenLineTwo
	},
	methods: {
		//会议类型
		getEventType() {
      this.requestApi({
        url: '/CustomerConfiguration/GetEventType',
        method: 'POST',
        data: {
          companyid: this.customer
        },
      }).then(res => {
				this.conferMetting = res;
			});
		},
		//客户
		getCustomers() {
      this.requestApi({
        url: '/MeetingMa/GetCompany',
        method: 'POST',
        data: {},
      }).then(res => {
				this.customers = res;
			});
		},
		//负责人
		getCustomerContacts() {
      this.requestApi({
        url: '/CustomerConfiguration/Get_tmc_account_user_account',
        method: 'GET',
        data: {},
      }).then(res => {
				this.contacts = res;
			});
		},
		//获取字典表

		dictionaryTable() {
      this.requestApi({
        url: '/CustomerConfiguration/Get_event_dictionary_detail',
        method: 'GET',
        data: {event_dictionary_code: '0035'},
      }).then(res => {
					this.conferMetting = res;
					console.log(this.conferMetting, 'wqeqweqwewqeqq');
				});
		},
		//
		costStatistics() {
      this.requestApi({
        url: '/CustomerConfiguration/SpendAnalysisInfo',
        method: 'GET',
        data: {
          BeginYear: this.BeginYearTime,
          BeginMonth: this.BeginMonthTime,
          EndYear: this.EndYearTime,
          EndMonth: this.EndMonthTime,
          EventType: this.meetingType,
          SubmitUser: this.creator,
          CostType: this.costType,
          CompanyId: this.customer
        },
      }).then(res => {
					this.dateL = res.infos;
				});
		},
		tatolSaving() {
			this.costStatistics();
			this.$emit('hotelExpenses', this.BeginYearTime, this.BeginMonthTime, this.EndYearTime, this.EndMonthTime);
		}
	},
	watch: {
		pice(val = []) {
			this.picelist = val;
		}
	}
};
</script>

<style lang="scss" scoped>
.rt_box {
  margin-top: -20px;
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
  margin: 0 0 0 5px;
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
.filter_text {
  float: left;
  margin: 5px;
  padding-left: 10px;
}
.ps_tatol .tatol_item {
  display: inline-block;
  font-size: 14px;
  line-height: 30px;
  color: #323232;
  margin: 0 0 0 40px;
}
.ps_tatol .tatol_item .hot {
  color: #f99857;
  font-weight: 600;
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
.canvas_top {
  margin-top: 50px;
}
</style>
