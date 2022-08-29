<template>
  <div>
    <div class="rfp_item">
      <div class="rfp_title clx">
        <div class="title">
          <strong>酒店内餐饮需求</strong>
          <span class="international-formevent-title">Hotel Food & Beverage</span>
        </div>
      </div>
      <div class="rfp_box">
        <table class="rfp_public room">
          <thead>
            <tr>
              <th width="120">Date</th>
              <th width="120">Moring Break</th>
              <th width="150">Lunch</th>
              <th width="120">Afternoon Break</th>
              <th width="150">Dinner</th>
              <th>Comments</th>
              <th width="110" class="blue">是否采购</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in food">
              <td>{{item.fooddate}}</td>
              <td>{{item.forenoon}}人</td>
              <td>{{item.noon}}人</td>
              <td>{{item.afternoon}}人</td>
              <td>
                {{item.evening}}人
              </td>
              <td>{{item.comments}}</td>
              <td class="blue">
                <a href="javascript:void(0);" class="select_icon" data-key="event_guestroom,2021-09-30"></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['food']
};
</script>

<style lang="scss">
.clx {
    zoom: 1;
}
.rfp_title {
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  padding: 10px 20px;
  height: 27px;
}
.rfp_title .title strong {
  float: left;
  font-weight: 600;
  font-size: 14px;
  color: #282828;
}

.international-formevent-title {
  font-size: 12px;
  color: #999999;
  font-weight: normal;
  margin-left: 5px;
}
.clx {
  zoom: 1;
}
.rfp_title .spread_retract {
  cursor: pointer;
}
.rfp_title .title {
  float: left;
  line-height: 28px;
}
.rfp_item {
  margin: 20px 0 0 0;
  background: #fff;
  box-shadow: 0 0 4px 1px #e8e8e8;
}
.demand .rfp_box {
  padding: 20px;
}
.rfp_room {
  margin: 0 0 50px 0;
}
.rfp_public {
    width: 100%;
    // border: 1px solid #e2e2e2;
    margin: 10px 0 0 0;
}
.room_date,
.room_budget {
  float: left;
  color: #787878;
  line-height: 28px;
  font-size: 14px;
}
.room_date strong,
.room_budget strong {
  color: #282828;
}
.room_budget {
  margin: 0 0 0 30px;
}

.rfp_public td {
  border: 1px solid #e2e2e2;
  padding: 8px 10px;
  font-size: 14px;
  color: #282828;
  line-height: 20px;
  word-break: break-all;
  word-wrap: break-word;
}
.rfp_item .rfp_public th.blue,
.rfp_item .rfp_public td.blue,
.select_icon {
  display: none;
}
.rfp_item .rfp_public th.blue,
.rfp_item .rfp_public td.blue {
  background: #e2f3fe;
}

</style>