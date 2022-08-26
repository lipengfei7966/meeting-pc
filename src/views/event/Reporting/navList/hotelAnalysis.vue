<template>
  <div class="report_layout">
    <div class="report_info">
      <div class="rt_title clx" style="height: 28px">
        <h3 class="rt_left">
          <i class="ico">
            <img :src="require('@/assets/images/log.png')" alt="" />
          </i>
          <strong><strong>酒店分析</strong></strong>
          <span class="international-title-span">Cooperate Rate</span>
        </h3>
        <a href="" class="rt_download">
          <i class="ico">
            <img :src="require('@/assets/images/xz.png')" alt="" />
          </i>
          <span>导出报表</span>
        </a>
      </div>
      <!--  -->
      <div class="rt_overview rt_public">
        <div class="title">
          酒店分析
          <span class="international-title-span">Cooperate Rate</span>
        </div>
        <div class="rt_box">
          <div class="overview_box clx">
            <Echarts :detailed="detailed" />
            <div class="fx_check" @click="changeBarSort">
              <label style="cursor: pointer">
                <input type="radio" name="bar_sort" value="1" autocomplete="off" checked="true" /><strong>询价次数</strong>
              </label>
              <label style="cursor: pointer">
                <input type="radio" name="bar_sort" value="2" autocomplete="off" /><strong>报价次数</strong>
              </label>
              <label style="cursor: pointer">
                <input type="radio" name="bar_sort" value="3" autocomplete="off" /><strong>中标次数</strong>
              </label>
              <label style="cursor: pointer">
                <input type="radio" name="bar_sort" value="4" autocomplete="off" /><strong>中标率</strong>
              </label>
              <label style="cursor: pointer">
                <input type="radio" name="bar_sort" value="5" autocomplete="off" /><strong>2小时查看率</strong>
              </label>
              <label style="cursor: pointer">
                <input type="radio" name="bar_sort" value="6" autocomplete="off" /><strong>4小时报价率</strong>
              </label>
            </div>
          </div>
        </div>
        <!-- <div class="none" style="margin:30px 30px 30px 380px" >
        <i class="ico">
          <img :src="require('@/assets/images/wsj.png')" alt="" />
        </i>
        <p style="margin: 20px 0px 0px 100px;">暂无数据</p>
      </div> -->
      </div>
      <!--  -->
      <div class="rt_overview rt_public">
        <div class="title">
          酒店详细数据
          <span class="international-title-span">Detail Information</span>
        </div>
        <div class="rt_box">
          <div class="filter clx">
            <form action="#list" id="submit" method="get">
              <div class="filter_item">
                <span class="filter_name">酒店名称：</span>
                <div class="filter_box hotel_name_in">
                  <input type="text" class="txt" name="keyword" value="" v-model="hotelName" />
                </div>
              </div>
              <div class="filter_item">
                <a href="javascript:;" class="filter_btn" @click="search">确定</a>
              </div>
            </form>
          </div>
          <el-table :data="detailLists" border style="width: 100%">
            <el-table-column prop="name" label="酒店名称" width="180">
            </el-table-column>
            <el-table-column prop="inquiryTimes" sortable label="询价次数" width="180">
            </el-table-column>
            <el-table-column prop="quotationTimes" sortable label="报价次数" width="180">
            </el-table-column>
            <el-table-column prop="winTheBidTimes" sortable label="中标次数" width="180">
            </el-table-column>
            <el-table-column prop="successfulBidRate" sortable label="中标率" width="180">
            </el-table-column>
            <el-table-column prop="twoHourCheck" sortable label="2小时查看率" width="180">
            </el-table-column>
            <el-table-column prop="fourHourInquiry" sortable label="4小时报价率" width="180">
            </el-table-column>
          </el-table>
          <el-pagination background layout="pager" :total="totalCount" :page-size="15" @current-change="pageChange" :current-page="pageIndex">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echarts from '@/components/event/echarts';
import requestApi from '@/utils/requestData'
export default {
  components: {
    Echarts,
  },
  data() {
    return {
      detailLists: [],
      detailed: [],
      hotelName: '',
      totalCount: 0,
      pageIndex: 1,
      sort:1,
    };
  },
  mounted() {
    this.detailedData();
    this.holaleAnalysis();
  },
  methods: {
    changeBarSort($event){
      console.log($event.target,'999394r39r399');
      if($event.target.getAttribute('name')!='bar_sort'){return;}
      this.sort=+$event.target.getAttribute('value');
      console.log($event.target.getAttribute('value'),'23432332323');
      this.holaleAnalysis();
    },
    //酒店详细数据
    detailedData() {
      requestApi({
        url: '/CustomerConfiguration/DetailInformation',
        method: 'GET',
        data: {
          name: '',
          pageIndex: this.pageIndex,
          pageSize: 15,
        },
      }).then((res) => {
          this.totalCount = res.totalCount;
          console.log(res, '1111ooooo');
          this.detailLists = res.infos;
        });
    },

    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.detailedData();
    },

    holaleAnalysis() {
      requestApi({
        url: '/CustomerConfiguration/CooperateRate',
        method: 'GET',
        data: {
          sort: this.sort,
        },
      }).then((res) => {
          this.detailed = res;
          console.log(res, '1111ooooo11111');
        });
    },

    // 酒店名称搜索
    search() {
      requestApi({
        url: '/CustomerConfiguration/DetailInformation',
        method: 'GET',
        data: {
          name: this.hotelName,
          pageIndex: 1,
          pageSize: 15,
        },
      }).then((res) => {
          this.detailLists = res.infos;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
//
.filter .filter_item:first-child {
  margin: 0;
}
.filter_item .filter_name {
  font-size: 14px;
  color: #323232;
  height: 32px;
  line-height: 32px;
  margin: 0 5px 0 0;
}
.filter_item {
  margin: 0 0 0 20px;
}
.filter_item .hotel_name_in .txt {
  border: 1px solid #dcdcdc;
  padding: 0 4px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #666;
  width: 240px;
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
.hotel_con {
  // overflow: scroll;
  padding-top: 20px;
}
.hotel_con .hotel_list {
  width: 100%;
  border-collapse: collapse;
}
.hotel_con .hotel_list tr th:first-child {
  min-width: 260px;
}
.hotel_con .hotel_list .hotel_sq {
  font-size: 14px;
  color: #666;
}
.ico {
  float: none;
  font-family: 'biz';
  font-style: normal;
}
.hotel_con .hotel_list th {
  border: 1px solid #eaeaea;
  background: #fafafa;
  font-size: 14px;
  font-weight: bold;
  color: #555;
  padding: 10px 0;
  text-align: center;
  min-width: 120px;
}
.hotel_con .hotel_list td {
  padding: 10px;
  border: 1px solid #eaeaea;
  font-size: 14px;
  color: #555;
  word-break: break-all;
  word-wrap: break-word;
}
.hotel_con .hotel_list .hotel_name {
  color: #0a87e2;
}
.hotel_con .hotel_list .hotel_sq:hover {
  color: #fa9900;
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
.fx_check {
  text-align: center;
  line-height: 20px;
}
.fx_check label {
  display: inline-block;
  margin: 0 10px;
}
.fx_check input {
  vertical-align: middle;
  margin: 0 3px 0 0;
}
.fx_check strong {
  font-size: 14px;
  color: #323232;
  font-weight: normal;
  vertical-align: middle;
}
.el-pagination {
  text-align: center;
}
</style>