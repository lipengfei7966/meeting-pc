<template>
  <div>
    <div class="rfp_item">
      <div class="rfp_title clx">
        <div class="title spread_retract">
          <strong>会场需求</strong>
          <span class="international-formevent-title">Conference Rooms</span>
        </div>
      </div>
      <div class="rfp_box">
        <div class="event_base clx">
          <table class="rfp_public conference" v-for="(item,index) in conferenceBuild" :key="index">
            <thead>
              <tr>
                <th class="cfm_cfe" colspan="2">
                  <strong class="bold">{{item.time}}</strong>
                </th>
                <th width="110" class="blue">是否采购</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td valign="middle" align="center" width="140">
                  <br />
                  {{item.name}}
                </td>
                <td valign="top">
                  <div class="cfe_list clx" style="clear:both">
                    <span class="cfe_sub_title">Setting Times:</span>
                    <div class="cfe_con">
                      {{item.starttime}} ~ {{item.endtime}}
                    </div>
                  </div>
                  <div class="cfe_list clx" style="clear:both">
                    <span class="cfe_sub_title">Setting Note :</span>
                    <div class="cfe_con">{{item.describe}}</div>
                  </div>
                </td>
                <td class="blue" align="center">
                  <a href="javascript:void(0);" class="select_icon" data-key="event_setting,2021-10-01 00:00:00,1,0">
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <table class="rfp_public conference" v-for="(item,num) in conference" :key="num">
            <thead>
              <tr>
                <th class="cfm_cfe" colspan="2">
                  <strong class="bold">{{item.time}}</strong>
                </th>
                <th width="110" class="blue">是否采购</th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-for="item in conferenceBuild">
                <td valign="middle" align="center" width="140">
                  <br />
                  {{item.name}}
                </td>
                <td valign="top">
                  <div class="cfe_list clx">
                    <span class="cfe_sub_title">Setting Times:</span>
                    <div class="cfe_con">
                      {{item.starttime}} ~ {{item.endtime}}
                    </div>
                  </div>
                  <div class="cfe_list clx">
                    <span class="cfe_sub_title">Setting Note :{{item.describe}}</span>
                    <div class="cfe_con"></div>
                  </div>
                </td>
                <td class="blue" align="center">
                  <a
                    href="javascript:void(0);"
                    class="select_icon"
                    data-key="event_setting,2021-10-01 00:00:00,1,0"
                  >
                  </a>
                </td>
              </tr> -->

              <tr>
                <td valign="middle" align="center" width="140"> {{item.name}}</td>
                <td valign="top">
                  <div class="cfe_list clx" style="clear:both">
                    <span class="cfe_sub_title">Meeting Room :</span>
                    <div class="cfe_con">
                      {{item.begintime}} - {{item.endtime}}
                      {{item.attendees}}人
                      {{item.roomsetuptype}}
                      <span v-show="item.min_area&&item.max_area">{{item.min_area}}~{{item.max_area}}</span>
                    </div>
                  </div>

                  <div class="cfe_list clx" style="clear:both">
                    <span class="cfe_sub_title">Site Equipments :</span>
                    <div class="cfe_con"> {{item.equipment}} </div>
                  </div>

                  <div class="cfe_list clx" style="clear:both">
                    <span class="cfe_sub_title">Setting Note :</span>
                    <div class="cfe_con"> {{item.microphonedescribe}}</div>
                  </div>
                </td>
                <td class="blue" align="center">
                  <a href="javascript:void(0);" class="select_icon" data-key="event_meetingroom,2021-09-30,1,0|event_equipment,2021-09-30,1,0"></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['conferenceBuild', 'conference']
}
</script>

<style lang="scss">
.rfp_title {
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  padding: 10px 20px;
  height: 27px;
}

.clx {
  zoom: 1;
}
.rfp_title .spread_retract {
  cursor: pointer;
}

.demand .rfp_box {
  padding: 20px;
}
.conference .bold {
  font-weight: 600;
  text-align: center;
  line-height: 20px;
  color: #282828;
}
.conference .cfm_cfe {
  padding: 12px 20px;
  text-align: left;
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
.cfe_list {
  padding: 10px 10px;
}
.cfe_list .cfe_sub_title {
  float: left;
  width: 140px;
  color: #787878;
  line-height: 20px;
}
.cfe_list .cfe_con {
  float: left;
  color: #282828;
  line-height: 20px;
  max-width: 680px;
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

.rfp_title .title {
  float: left;
  line-height: 28px;
}
.rfp_item {
  margin: 20px 0 0 0;
  background: #fff;
  box-shadow: 0 0 4px 1px #e8e8e8;
}
.rfp_box {
  padding: 20px;
}
.rfp_title .parity_view {
  float: right;
}
.rfp_title .parity_view a {
  font-size: 14px;
  text-decoration: none;
  line-height: 28px;
  color: #2896eb;
}

.el-table .cell {
  white-space: pre-line;
}
.el-table th.el-table__cell > .cell {
  color: #787878;
  font-weight: 1000;
}
.rfp_public {
  width: 100%;
  border-collapse: collapse;
}
.rfp_public th {
  border-width: 1px 1px 2px 1px;
  border-color: #e4e4e4;
  border-style: solid;
  color: #787878;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal;
  padding: 12px 10px;
  word-break: break-all;
  word-wrap: break-word;
}
.international-order-span {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #999999;
  font-weight: normal;
}
.rfp_public td {
  border: 1px solid #e4e4e4;
  padding: 10px;
  font-size: 14px;
  color: #787878;
  line-height: 20px;
  word-break: break-all;
  word-wrap: break-word;
}
.rfp_public .name {
  padding: 0 0 0 20px;
}
.rfp_public .name .ico {
  font-size: 14px;
  color: #f91;
}
.rfp_public .dark {
  color: #282828;
  line-height: 20px;
  font-size: 14px;
}
.rfp_public .gray {
  color: #787878;
  line-height: 20px;
  font-size: 14px;
}
.rfp_public .refuse {
  display: inline-block;
  line-height: 16px;
  font-size: 12px;
  color: #fff;
  padding: 0 5px;
  border-radius: 8px;
  background: #a2a4a9;
}
.view-deny-reason {
  display: inline-block;
  height: 16px;
  line-height: 16px;
  padding: 0 5px;
  font-size: 12px;
  background: #06c;
  color: #fff;
  cursor: pointer;
  border-radius: 8px;
}
.rfp_public .bid {
  display: inline-block;
  height: 16px;
  line-height: 16px;
  font-size: 12px;
  color: #fff;
  padding: 0 5px;
  border-radius: 8px;
  background: #ff9e48;
}
.rfp_public a {
  font-size: 14px;
  color: #2896eb;
  text-decoration: none;
}
</style>