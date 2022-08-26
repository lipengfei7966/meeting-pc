<template>
  <div class="report_layout">
    <div class="report_info">
      <div class="rt_title clx" style="height: 28px">
        <h3 class="rt_left">
          <i class="ico">
            <img :src="require('@/assets/images/log.png')" alt="" />
          </i>
          <strong>酒店询价单统计</strong>
          <span class="international-title-span">Hotel RFP Statistics</span>
        </h3>
        <a href="" class="rt_download">
          <i class="ico">
            <img :src="require('@/assets/images/xz.png')" alt="">
          </i>
          <span>导出报表</span>
        </a>
      </div>
      <!--数据概览   -->
      <div class="rt_overview rt_public">
        <div class="title">
          数据概览
          <span class="international-title-span">Data Overview</span>
        </div>
        <div class="rt_box">
          <div class="overview_box clx">
            <div class="overview_item">
              <div class="hot">{{ picList.cumulativeHotelInquiries }}</div>
              <p>累计酒店询价单</p>
            </div>
            <div class="overview_item">
              <div class="hot">{{ picList.cumulativeInquiryHotel }}</div>
              <p>累计询价酒店</p>
            </div>
            <div class="overview_item">
              <div class="hot">{{ picList.cumulativeQuotesReceived }}</div>
              <p>累计收到报价</p>
            </div>
            <div class="overview_item">
              <div class="hot">{{ picList.cumulativeWinningOrders }}</div>
              <p>累计中标订单</p>
            </div>
            <div class="overview_item">
              <div class="hot">{{ this.picList.cumulativeWinningBidAmount }}</div>
              <p>累计中标金额</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 会议负责人统计 - 城市  -->
      <div class="rt_overview rt_public">
        <div class="title">
          会议负责人统计 - 城市
          <span class="international-title-span">City Analysis</span>
        </div>
        <div class="rt_box">
          <div class="filter clx">
            <!-- 需要数据支撑循环 -->
            <div class="filter_item">
              <div class="filter_box">
                <select style="width: 120px" autocomplete="off" name="time_type" v-model="city_time_type">
                  <option value="0">提交询价单时间</option>
                  <option value="1">会议时间</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="city_start_year">
                  <option :value="item.id" v-for="item in dateList" :key="item.id">
                    {{ item.datey }} 年
                  </option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="city_start_month">
                  <option :value="item.datem" v-for="item in monthList" :key="item.id">
                    {{ item.datem }} 月
                  </option>
                </select>
              </div>
              <div class="filter_sl">～</div>
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="city_end_year">
                  <option :value="item.id" v-for="item in dateList" :key="item.id">
                    {{ item.datey }} 年
                  </option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="city_end_month">
                  <option :value="item.datem" v-for="item in monthList" :key="item.id">
                    {{ item.datem }} 月
                  </option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_box">
                <select name="category" v-model="city_category">
                  <option :value="item.code" v-for="(item, index) in conferMetting" :key="index">{{item.name}}</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_box">
                <select name="value_type" autocomplete="off" style="width: 105px; padding-left: 25px" v-model="typenum">
                  <option value="0">金 额</option>
                  <option value="1">数 量</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_btn" @click="mettingHandle">确定</div>
            </div>
          </div>
        </div>
        <div class="none" v-show="cityShow">
          <i class="ico">
            <img :src="require('@/assets/images/wsj.png')" alt="" />
          </i>
          <p>暂无数据</p>
          <!-- <City /> -->
        </div>
        <div class="CNcity" v-show="!cityShow">
          <div class="cn">
            <City :city='city' />
          </div>
          <div class="ed">
            <div class="form_public" style="float: right;width: 100%;" id="city_table">
              <table class="fp_th">
                <thead>
                  <tr>
                    <th width="30%" class="dimension2_col"> 城 市 </th>
                    <th width="35%" class="value_col">金额（元）<i class="biz icon-sort"></i></th>
                    <th width="35%">占比/总数<i class="biz icon-sort sort-left"></i></th>
                  </tr>
                </thead>
              </table>
              <div class="form_sub" style="height: 460px;overflow: auto;">
                <table>
                  <tbody>
                    <tr class="cursor_tr" v-for="(item,index) in city" :key="index">
                      <td width="30%">{{item.city_name}}</td>
                      <td width="35%">{{ item.quantity}}</td>
                      <td width="35%">{{ item.percentage}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 询价单数量统计 -->
      <div class="rt_overview rt_public">
        <div class="title">
          询价单数量统计
          <span class="international-title-span">RFP Satatistics</span>
        </div>
        <div class="rt_box">
          <div class="filter clx">
            <!-- 需要数据支撑循环 -->
            <div>
              <div class="filter_item">
                <div class="filter_box">
                  <select style="width: 120px" autocomplete="off" name="time_type" v-model="tjtime">
                    <option value="0">提交询价单时间</option>
                    <option value="1">会议时间</option>
                  </select>
                </div>
              </div>
              <div class="filter_item">
                <div class="filter_box filter_date">
                  <select class="date_select" autocomplete="off" name="start_year" v-model="dateYears">
                    <option :value="item.id" v-for="item in dateList" :key="item.id">
                      {{ item.datey }} 年
                    </option>
                  </select>
                  <select name="start_month" class="date_select" autocomplete="off" v-model="dateMonth">
                    <option :value="item.id" v-for="item in monthList" :key="item.id">
                      {{ item.datem }} 月
                    </option>
                  </select>
                </div>
                <div class="filter_sl">～</div>
                <div class="filter_box filter_date">
                  <select class="date_select" autocomplete="off" name="start_year" v-model="endYears">
                    <option :value="item.id" v-for="item in dateList" :key="item.id">
                      {{ item.datey }} 年
                    </option>
                  </select>
                  <select name="start_month" class="date_select" autocomplete="off" v-model="endMonth">
                    <option :value="item.id" v-for="item in monthList" :key="item.id">
                      {{ item.datem }} 月
                    </option>
                  </select>
                </div>
              </div>
              <div class="filter_item">
                <div class="filter_box">
                  <select name="category" v-model="settingType">
                    <option :value="index" v-for="(item, index) in conferMetting" :key="index">{{item.name}}</option>
                  </select>
                </div>
              </div>
              <div class="filter_item">
                <div class="filter_box">
                  <select name="creator" v-model="creator">
                    <option :value="index" v-for="(item,index) in contacts" :key="index">{{item.ufullname}}</option>
                  </select>
                </div>
              </div>
              <div class="filter_item">
                <div class="filter_btn" @click="handle">确定</div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="!singular">
          <BrokenLine :rfqQtyList="rfqQtyList" />
          <!-- :rfqQtyList="rfqQtyList" -->
        </div>
        <div class="none" v-show="singular">
          <i class="ico">
            <img :src="require('@/assets/images/wsj.png')" alt="" />
          </i>
          <p>暂无数据</p>
        </div>
      </div>
      <!-- 会议类型及部门 -->
      <div class="rt_overview rt_public">
        <div class="title">
          会议类型及部门
          <span class="international-title-span">Event Type</span>
        </div>
        <div class="rt_box">
          <div class="filter clx">
            <!-- 需要数据支撑循环 -->
            <div class="filter_item">
              <div class="filter_box">
                <select style="width: 120px" autocomplete="off" name="time_type" v-model="type_time_type">
                  <option value="0">提交询价单时间</option>
                  <option value="1">会议时间</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="type_start_year">
                  <option :value="item.id" v-for="item in dateList" :key="item.id">
                    {{ item.datey }} 年
                  </option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="type_start_month">
                  <option :value="item.datem" v-for="item in monthList" :key="item.id">
                    {{ item.datem }} 月
                  </option>
                </select>
              </div>
              <div class="filter_sl">～</div>
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year" v-model="type_end_year">
                  <option :value="item.id" v-for="item in dateList" :key="item.id">
                    {{ item.datey }} 年
                  </option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off" v-model="type_end_month">
                  <option :value="item.datem" v-for="item in monthList" :key="item.id">
                    {{ item.datem }} 月
                  </option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_box">
                <select name="category" v-model="type_meetting_type">
                  <option :value="index" v-for="(item, index) in conferMetting" :key="index">{{item.name}}</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_box">
                <select name="creator" v-model="type_creator">
                  <option :value="index" v-for="(item,index) in contacts" :key="index">{{item.ufullname}}</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_box">
                <select name="value_type" autocomplete="off" style="width: 105px; padding-left: 25px" v-model="type_money_amount">
                  <option value="0">金 额</option>
                  <option value="1">数 量</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div href="" class="filter_btn" @click="seeting">确定</div>
            </div>
          </div>
        </div>

        <div class="rector" v-show="!mettingTypeCost">
          <div class="leftmetting">
            <Bingtu :meetinglist="meetinglist" />
          </div>
          <div class="rightmeeting" style="display: none;">
            <Bingyu :meetinglist="meetinglist" />
          </div>
        </div>
        <div class="rector" v-show="!mettingTypeCost">
          <div class="leftmetting">
            <div id="type_box" class="form_public" style="margin: 0;float: left;width: 99%;">
              <table class="fp_th">
                <thead>
                  <tr>
                    <th width="50%;">会议类型</th>
                    <th width="25%;" class="value_col">金额（元）
                      <i class="biz icon-sort"></i>
                    </th>
                    <th width="25%">占比/总数
                      <i class="biz icon-sort sort-left"></i>
                    </th>
                    <th id="pre_percent" style="padding:0;">占比/上级分类
                    </th>
                  </tr>
                </thead>
              </table>
              <div class="form_sub" style="height: 250px;overflow: auto;">
                <table v-for="(item,index) in seetingoption" :key="index">
                  <tbody>
                    <tr class="cursor_tr" :data-index="0">
                      <td width="40%">
                        <div class="type_fa">
                          <span class="piece" style="background: #6cc99c">
                          </span>{{item.EventTypeName}}
                        </div>
                      </td>
                      <td width="20%">{{item.Amount}}</td>
                      <td width="20%">{{item.Percentage}}%</td>
                      <td width="20%"></td>
                    </tr>
                    <tr class="cursor_tr_sub sub0" :data-index="index" v-for="(ele,index) in item.ActivityTypes" :key="index">
                      <td>
                        <div class="type_sub">
                          <span class="piece" style="background: #61a0a8">
                          </span>{{ele.ActivityTypeName}}
                        </div>
                      </td>
                      <td>{{ele.Amount}}</td>
                      <td>{{ele.EventTypePercentage}}%</td>
                      <td>{{ele.AllPercentage}}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="rightmeeting" style="display:none;">
            <div id="department_box" class="form_public" style="margin: 0;float: right;width: 99%;">
              <table class="fp_th">
                <thead>
                  <tr>
                    <th width="50%" class="dimension1_col">部门</th>
                    <th width="25%" class="value_col">金额（元）
                      <i class="biz icon-sort"></i>
                    </th>
                    <th width="25%">占比/总数
                      <i class="biz icon-sort sort-left"></i>
                    </th>
                  </tr>
                </thead>
              </table>
              <div class="form_sub" style="height: 250px;overflow: auto;">
                <table>
                  <tbody class="js-department-table">
                    <tr class="cursor_tr" data-index="0">
                      <td width="50%">
                        <span class="piece" style="background: #6cc99c">
                        </span>其他
                      </td>
                      <td width="25%">2,038,413</td>
                      <td width="25%">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="rects" style="display:none">
          <div class="wokersetting">
            <Bingdu :meetinglist="meetinglist" />
          </div>
          <div class="fotters">
            <Bingru :meetinglist="meetinglist" />
          </div>
          <div class="lender">
            <Bingku :meetinglist="meetinglist" />
          </div>
        </div>
        <div class="rectser" style="display:none">
          <div class="tl_txt"><span class="piece" style="background: #6cc99c"></span><strong>其它分布图</strong></div>
          <div class="tl_txt"><span class="piece" style="background: #f07273"></span><strong>内部会分布图</strong></div>
          <div class="tl_txt"><span class="piece" style="background: #61c7de"></span><strong>外部会分布图</strong></div>
        </div>
        <div class="none" v-show="mettingTypeCost">
          <i class="ico">
            <img :src="require('@/assets/images/wsj.png')" alt="" />
          </i>
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import City from '@/components/event/city.vue';
import BrokenLine from '@/components/event/brokenLine';
import Bingtu from '@/components/event/bingtu.vue';
import Bingyu from '@/components/event/bingyu.vue';
import Bingru from '@/components/event/bingru.vue';
import Bingku from '@/components/event/bingku.vue';
import Bingdu from '@/components/event/bingdu.vue';
import requestApi from '@/utils/requestData'
export default {
  // props: {
  //   picList: {
  //     type: Object,
  //     default: {}
  //   },
  //   city: {
  //     type: Array,
  //     default: []
  //   },
  //   rfqQtyList: {
  //     type: Array,
  //     default: []
  //   },
  //   meetinglist: {
  //     type: Array,
  //     default: []
  //   }
  // },
  components: {
    BrokenLine,
    City,
    Bingtu,
    Bingyu,
    Bingru,
    Bingku,
    Bingdu,
  },
  props: {},
  data() {
    return {
      dateList: [
        {
          id: 2012,
          datey: '2012',
        },
        {
          id: 2013,
          datey: '2013',
        },
        {
          id: 2014,
          datey: '2014',
        },
        {
          id: 2015,
          datey: '2015',
        },
        {
          id: 2016,
          datey: '2016',
        },
        {
          id: 2017,
          datey: '2017',
        },
        {
          id: 2018,
          datey: '2018',
        },
        {
          id: 2019,
          datey: '2019',
        },
        {
          id: 2020,
          datey: '2020',
        },
        {
          id: 2021,
          datey: '2021',
        },
        {
          id: 2022,
          datey: '2022',
        },
      ],
      monthList: [
        {
          id: '1',
          datem: '1',
        },
        {
          id: '2',
          datem: '2',
        },
        {
          id: '3',
          datem: '3',
        },
        {
          id: '4',
          datem: '4',
        },
        {
          id: '5',
          datem: '5',
        },
        {
          id: '6',
          datem: '6',
        },
        {
          id: '7',
          datem: '7',
        },
        {
          id: '8',
          datem: '8',
        },
        {
          id: '9',
          datem: '9',
        },
        {
          id: '10',
          datem: '10',
        },
        {
          id: '11',
          datem: '11',
        },
        {
          id: '12',
          datem: '12',
        },
      ],
      seetingoption: [],
      picList: {
        cumulativeHotelInquiries: '',
        cumulativeInquiryHotel: '',
        cumulativeQuotesReceived:'',
        cumulativeWinningOrders:'',
      },
      city: [],
      // aaa:true,
      // rightmeeting:false,
      dateYears: 2019, //开始日期（年）
      endYears: 2018, //结束日期（年）
      dateMonth: '1', //开始日期（月）
      endMonth: '12', //结束日期（月）
      tjtime: '0',
      settingType: '0',
      rfqQtyList: [], //询价单数量统计
      meetinglist: [], //会议类型及部门
      typenum: 0,
      creator: 0,

      //会议负责人统计默认值
      city_time_type: '0',
      city_start_year: 2019,
      city_start_month: 2,
      city_end_year: 2020,
      city_end_month: 1,
      city_category: '0035-3',

      //询价单数量统计默认值

      //会议类型及部门默认值
      type_time_type: '0',
      type_start_year: 2021,
      type_start_month: 1,
      type_end_year: 2021,
      type_end_month: 10,
      type_meetting_type: '0',
      type_creator: 0,
      type_money_amount: '0',

      //城市暂无数据
      cityShow: false,
      //询价单数量
      singular: false,
      //
      mettingTypeCost: false,
      //
      conferMetting: [],
      //
      contacts: [],
    };
  },
  mounted() {
    this.getDataOverview();
    this.rfqQty();
    this.MeetingLeader();
    // this.meetingType();
    this.seeting();
    this.dictionaryTable();
    this.getCustomerContacts();
  },
  methods: {
    //获取字典表
    dictionaryTable() {
      requestApi({
        url: '/CustomerConfiguration/Get_event_dictionary_detail',
        method: 'GET',
        data: {
          event_dictionary_code: '0035',
        },
      }).then((res) => {
        this.conferMetting = res;
        console.log(this.conferMetting, 'wqeqweqwewqeqq');
      });
    },
    //负责人
    getCustomerContacts() {
      requestApi({
        url: '/CustomerConfiguration/Get_tmc_account_user_account',
        method: 'GET',
        data: {},
      }).then((res) => {
        this.contacts = res;
      });
    },
    //获取数据概览
    getDataOverview() {
      requestApi({
        url: '/CustomerConfiguration/HotelInquiryDataOverview',
        method: 'GET',
        data: {},
      }).then((res) => {
        if(res){
          this.picList = res;
        }
        
      });
    },

    //会议负责人统计
    MeetingLeader() {
      requestApi({
        url: '/CustomerConfiguration/CityAnalysis',
        method: 'GET',
        data: {
          TimeType: this.city_time_type,
          BeginYear: this.city_start_year,
          BeginMonth: this.city_start_month,
          EndYear: this.city_end_year,
          EndMonth: this.city_end_month,
          EventType: this.city_category , //会议类型  //接口
          mountOrQuantity: this.typenum, //按金额或者数量
        },
      }).then((res) => {
          if (res.length === 0) {
            this.cityShow = true;
          } else {
            this.cityShow = false;
            this.city = res;
          }
        });
    },
    //  询价单数量统计
    // 
    rfqQty() {
      requestApi({
        url: '/CustomerConfiguration/RFPSatatistics',
        method: 'GET',
        data: {
          // TimeType: this.tjtime, //提交询价单时间
          TimeType: this.tjtime, //提交询价单时间
          BeginYear: this.dateYears, //开始年份
          BeginMonth: this.dateMonth, //开始月份
          EndYear: this.endYears, //结束年份
          EndMonth: this.endMonth, //结束月份
          EventType: this.settingType || '', //会议类型
          SubmitUser: this.creator, //提交人
        },
      }).then((res) => {
          if (res.length === 0) {
            this.singular = true;
          } else {
            this.singular = false;
            this.rfqQtyList = res;
          }
        });
    },
    //会议类型及部门

    seeting() {
      requestApi({
        url: '/CustomerConfiguration/EventType',
        method: 'GET',
        data: {
          // TimeType: 0, //提交询价单时间
          TimeType: this.type_time_type, //提交询价单时间
          BeginYear: this.type_start_year, //开始年份
          BeginMonth: this.type_start_month, //开始月份
          EndYear: this.type_end_year, //结束年份
          EndMonth: this.type_end_month, //结束月份
          EventType: this.type_meetting_type || '', //会议类型
          SubmitUser: this.type_creator || '', //提交人
          mountOrQuantity: this.type_money_amount, //按金额或者数量
        },
      }).then((res) => {
          if (!res) {
            this.mettingTypeCost = true;
          } else {
            this.mettingTypeCost = false;
            this.meetinglist = res;
            this.seetingoption = this.meetinglist.EventTypes;
          }
        });
    },
    //点击确定
    handle() {
      this.rfqQty();
      return;
    },
    mettingHandle() {
      this.MeetingLeader();
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.CNcity {
  display: flex;
  justify-content: space-around;
}
.CNcity .cn {
  width: 60%;
}
.CNcity .ed {
  width: 34%;
}
.rector {
  display: flex;
  justify-content: space-around;
}
.rects {
  display: flex;
  justify-content: space-around;
}
.rectser {
  display: flex;
  justify-content: space-around;
  margin-bottom: 200px;
}
.rects .fotters {
  width: 33%;
}
.rects .wokersetting {
  width: 33%;
}
.rects .lender {
  width: 33%;
}
.rector .leftmetting {
  width: 49%;
}
.rector .rightmeeting {
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
.rt_left .ico img {
  width: 22px;
  margin-right: 4px;
}
.rt_download .ico img {
  width: 14px;
  margin-top: 5px;
}
//

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
.icon-sort {
  float: none;
  cursor: pointer;
}
.sort-left {
  margin-left: 5px;
}

.icon-sort {
  float: none;
  cursor: pointer;
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
.form_public .form_sub td {
  word-break: break-all;
  word-wrap: break-word;
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
.form_public .form_sub .cursor_tr_sub {
  cursor: pointer;
}
.form_public .form_sub .type_sub {
  padding: 0 0 0 29px;
  width: 155px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form_public .form_sub .cursor_tr {
  cursor: pointer;
  height: 50px;
}
</style>