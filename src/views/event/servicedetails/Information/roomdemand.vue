<template>
  <div>
    <div class="rfp_item">
      <div class="rfp_title clx">
        <div class="title">
          <strong>客房需求</strong>
          <span class="international-formevent-title">Guest Rooms</span>
        </div>
      </div>
      <div class="rfp_box">
        <div class="rfp_room clx" v-for="(item,index) in roomList" :key="index">
          <div class="room_date">
            入住起始日期 Check-in Date：<strong>{{item.check_in_date}}</strong>
          </div>
          <div class="room_budget">{{item.networks}}</div>
          <div class="room_budget">{{item.breakfast}}</div>
          <div class="room_budget">
            离店日期 Check-in Date：<strong>{{item.out_date}}</strong>
          </div>

        </div>
        <el-table :data="room" border align="center">
          <el-table-column prop="checkindate" label="日期" width="180" align="center"></el-table-column>
          <el-table-column prop="doubleBedNum" label="双床房" width="100" align="center"></el-table-column>
          <el-table-column prop="bigBedNum" label="大床房" width="100" align="center"></el-table-column>
          <el-table-column prop="suiteNum" label="行政房/套房" width="120" align="center"></el-table-column>
          <el-table-column prop="totalNum" label="总计" width="100" align="center"></el-table-column>
          <el-table-column prop="otherrequirements" label="其它要求" align="center"></el-table-column>
          <!-- <el-table-column prop="fullname" label="是否采购"></el-table-column> -->
        </el-table>
        <!-- <table class="rfp_public room">
          <thead >
            <tr>
              <th width="120">日期</th>
              <th width="120">双床房</th>
              <th width="120">大床房</th>
              <th width="120">行政房/套房</th>
              <th width="120">总计</th>
              <th>其它要求</th>
              <th width="110" class="blue">是否采购</th>
            </tr>
          </thead>
          <tbody v-for="(item,index) in room" :key="index">
            <tr >
              <td>{{item.checkindate}}</td>
              <td>{{item.doubleBedNum}}</td>
              <td>{{item.bigBedNum}}</td>
              <td>{{item.suiteNum}}</td>
              <td>
                <strong class="bold">{{item.totalNum}}</strong>
              </td>
              <td>{{item.otherrequirements}}</td>
              <td class="blue">
                <a
                  href="javascript:void(0);"
                  class="select_icon"
                  data-key="event_guestroom,2021-09-30"
                ></a>
              </td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['roomList', 'room'],
  data: function() {
    return {
      allRoomList: []
    }
  },
  updated() {
    console.log(this.room, '2222222222')
  }
}
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