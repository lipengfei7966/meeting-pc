<template>
  <div class="report_layout">
    <div class="report_info">
      <div class="rt_title clx" style="margin-bottom: 70px; height: 28px">
        <h3 class="rt_left">
          <i class="ico">
            <img :src="require('@/assets/images/log.png')" alt="" />
          </i>
          <strong>部门费用统计</strong>
        </h3>
        <br />
        <div class="rt_box">
          <div class="filter clx">
            <!-- 需要数据支撑循环 -->
            <div class="filter_item">
              <div class="filter_box">
                <select style="width: 120px" autocomplete="off" name="time_type">
                  <option value="1">全部</option>
                  <option value="2">中旅会展</option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year">
                  <option :value="item.datey" v-for="item in dateList" :key="item.id">
                    {{ item.datey }} 年
                  </option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off">
                  <option :value="item.datem" v-for="(item, index) in monthList" :key="item.id">
                    {{ item.datem }} 月
                  </option>
                </select>
              </div>
              <div class="filter_sl">～</div>
              <div class="filter_box filter_date">
                <select class="date_select" autocomplete="off" name="start_year">
                  <option :value="item.datey" v-for="item in dateList" :key="item.id">
                    {{ item.datey }} 年
                  </option>
                </select>
                <select name="start_month" class="date_select" autocomplete="off">
                  <option value="" v-for="(item, index) in monthList" :key="item.id">
                    {{ item.datem }} 月
                  </option>
                </select>
              </div>
            </div>
            <div class="filter_item">
              <a href="" class="filter_btn">确定</a>
            </div>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="rt_overview rt_public">
        <div class="title">数据概览</div>
        <div class="rt_box">
          <div class="overview_box clx" style="display: flex; justify-content: space-around">
            <div class="overview_item" v-for="(item, index) in rfqList" :key="item.id">
              <div class="hot">{{ item.hot }}</div>
              <p>{{ item.list }}</p>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="rt_overview rt_public">
        <div class="title">费用统计（会议类型）</div>
        <div class="spadding">
          <div class="none">
            <i class="ico">
              <img :src="require('@/assets/images/wsj.png')" alt="" />
            </i>
            <p>暂无数据</p>
          </div>
        </div>
      </div>
      <!--  -->
      <!--  -->
      <div class="rt_overview rt_public">
        <div class="title">费用统计（供应商）</div>
        <div class="spadding">
          <div class="none">
            <i class="ico">
              <img :src="require('@/assets/images/wsj.png')" alt="" />
            </i>
            <p>暂无数据</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rfqList: [
        {
          id: '1',
          hot: '0.00',
          list: '已支出费用总计',
        },
        {
          id: '2',
          hot: '0.00',
          list: '计划费用总计',
        },
        {
          id: '3',
          hot: '0.00',
          list: '办会数量',
        },
        {
          id: '4',
          hot: '0.00',
          list: '平均会议成本',
        },
      ],
      dateList: [
        {
          id: '1',
          datey: '2012',
        },
        {
          id: '2',
          datey: '2013',
        },
        {
          id: '3',
          datey: '2014',
        },
        {
          id: '4',
          datey: '2015',
        },
        {
          id: '5',
          datey: '2016',
        },
        {
          id: '6',
          datey: '2017',
        },
        {
          id: '7',
          datey: '2018',
        },
        {
          id: '8',
          datey: '2019',
        },
        {
          id: '9',
          datey: '2020',
        },
        {
          id: '10',
          datey: '2021',
        },
        {
          id: '11',
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
    };
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
</style>