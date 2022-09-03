<template>
  <div>
    <div class="content" id="content">
      <div class="boss">
        <ul>
          <li style="color: #0084e9;cursor: pointer" @click="$router.go(-2)">我的会议</li>
          <li style="color: #7c7f82">></li>
          <li style="color: #0084e9;cursor: pointer" @click="$router.go(-1)">会议详情（{{$route.query.eventName}}）</li>
          <li style="color: #7c7f82">></li>
          <li style="color: #7c7f82">高级设置</li>
        </ul>
      </div>

      <div class="air-home-title">高级设置</div>

      <div class="air-box">
        <div class="air-box-body">
          <div class="setting-row">
            <span class="setting-row-title">会议所属人（创建人）：</span>
            <span id="change_create_user_span" style="display: inline">
              <span class="setting-row-value">{{createUser.create_user}}</span>
              <el-button type="text" @click="handleRemove" v-show="demonstrate">更改</el-button>
            </span>
            <!-- style="display: none" -->
            <span id="change_create_user_form" v-show="exhibit">
              <el-select v-model="username" filterable placeholder="请选择">
                <el-option v-for="item in userList" :key="item.value" :label="item.fullname" :value="item.username"></el-option>
              </el-select>
              <el-button class="mar_l20" type="primary" size="small" @click="handleRemove(type = 1)">保存 </el-button>
              <el-button class="mar_l20" type="primary" size="small" @click="abolishOne">取消</el-button>
            </span>
          </div>
          <div class="setting-row">
            <span class="setting-row-title">会议负责人（授权人）：</span>
            <span id="change_project_owner_span" style="display: inline">
              <span class="setting-row-value">{{createUser.event_owner}}</span>
              <el-button type="text" @click="handleRemovd" v-show="demonstrated">更改</el-button>
            </span>
            <!-- style="display: none" -->
            <span id="change_project_owner_form" v-show="exhibito">
              <el-select v-model="username" filterable placeholder="请选择">
                <el-option v-for="item in userList" :key="item.value" :label="item.fullname" :value="item.username"></el-option>
              </el-select>
              <el-button class="mar_l20" type="primary" size="small" @click="handleRemovd(type = 2)">保存</el-button>
              <el-button class="mar_l20" type="primary" size="small" @click="abolishTwo">取消</el-button>
            </span>
          </div>
          <div class="setting-row">
            <span class="setting-row-title">会议助理（部门助理）/ 会议支持人：</span>
            <span id="change_event_assistant_span" style="display: inline">
              <span class="setting-row-value">{{createUser.event_assistant}}</span>
              <a v-show="supporter" @click="supporterr" class="change_event_assistant setting-row-a" data-type="event_assistant">更改</a>
            </span>
            <span id="change_event_assistant_form" v-show="supporters">
              <el-select v-model="username" filterable placeholder="请选择">
                <el-option v-for="item in userList" :key="item.value" :label="item.fullname" :value="item.username"></el-option>
              </el-select>
              <button @click="supporterr(type = 3)" type="button" id="btn_change_event_assistant" class="btn btn-primary btn-sm setting-row-btn">保存</button>
              <el-button class="mar_l20" type="primary" size="small" @click="abolishThree">取消</el-button>
            </span>
          </div>

          <div class="setting-row">
            <span class="setting-row-title">会议采购人员（会议顾问）：</span>
            <span id="change_buyer_span" style="display: inline">
              <span class="setting-row-value">{{createUser.event_purchase}}</span>
              <a v-show="dominate" @click="dominated" class="change_buyer setting-row-a" data-type="change_buyer">更改</a>
            </span>
            <span id="change_buyer_form" v-show="regulate">
              <el-select v-model="username" filterable placeholder="请选择">
                <el-option v-for="item in userList" :key="item.value" :label="item.fullname" :value="item.username"></el-option>
              </el-select>
              <button @click="dominated(type = 4)" type="button" id="btn_change_buyer" class="btn btn-primary btn-sm setting-row-btn">保存</button>
              <el-button class="mar_l20" type="primary" size="small" @click="abolishFour">取消</el-button>
            </span>
          </div>

          <div class="setting-row">
            <span class="setting-row-title">会议合规人员（结算人员）：</span>
            <span id="change_biller_span" style="display: inline">
              <span class="setting-row-value">{{createUser.event_settlement}}</span>
              <a v-show="control" @click="widgeted" class="change_biller setting-row-a" data-type="change_biller">更改</a>
            </span>
            <span id="change_biller_form" v-show="widget">
              <el-select v-model="username" filterable placeholder="请选择">
                <el-option v-for="item in userList" :key="item.username" :label="item.fullname" :value="item.username"></el-option>
              </el-select>
              <button @click="widgeted(type = 5)" type="button" id="btn_change_biller" class="btn btn-primary btn-sm setting-row-btn">保存</button>
              <el-button class="mar_l20" type="primary" size="small" @click="abolishFive">取消</el-button>
            </span>
          </div>
        </div>
      </div>
      <div class="air-box">
        <div class="air-box-title">
          <div class="air-box-title-value">设置记录</div>
        </div>
        <div class="air-box-body">
          <el-table :data="tableData" height="400" border style="width: 100%">
            <el-table-column prop="replace_type" label="更改类型" width="180"></el-table-column>
            <el-table-column prop="replace_time" label="更改时间" width="180"></el-table-column>
            <el-table-column prop="original_user" label="更改前" width="180"></el-table-column>
            <el-table-column prop="new_user" label="更改后"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exhibit: false,
      demonstrate: true,
      exhibito: false,
      demonstrated: true,
      supporter: true,
      supporters: false,
      dominate: true,
      regulate: false,
      control: true,
      widget: false,
      userList: [],
      username: 'GHQ243',
      createUser: {},
      tableData: []
    }
  },
  mounted() {
    this.GetMeetingPersonnels()
    // this.MeetingSetUp();
    this.infoReplaceRecord()
    this.getUser()
  },
  methods: {
    handleRemove(type) {
      this.exhibit = !this.exhibit
      this.demonstrate = !this.demonstrate
      if (this.exhibit == false && this.demonstrate == true) {
        this.MeetingSetUp(type)
      }
    },
    abolishOne() {
      this.exhibit = !this.exhibit
      this.demonstrate = !this.demonstrate
    },
    handleRemovd(type) {
      this.exhibito = !this.exhibito
      this.demonstrated = !this.demonstrated
      if (this.exhibito == false && this.demonstrated == true) {
        this.MeetingSetUp(type)
      }
    },
    abolishTwo() {
      this.exhibito = !this.exhibito
      this.demonstrated = !this.demonstrated
    },
    supporterr(type) {
      this.supporter = !this.supporter
      this.supporters = !this.supporters
      if (this.supporters == false && this.supporter == true) {
        this.MeetingSetUp(type)
      }
    },
    abolishThree() {
      this.supporter = !this.supporter
      this.supporters = !this.supporters
    },
    dominated(type) {
      this.dominate = !this.dominate
      this.regulate = !this.regulate
      if (this.regulate == false && this.dominate == true) {
        this.MeetingSetUp(type)
      }
    },
    abolishFour() {
      this.dominate = !this.dominate
      this.regulate = !this.regulate
    },
    widgeted(type) {
      this.control = !this.control
      this.widget = !this.widget
      if (this.widget == false && this.control == true) {
        this.MeetingSetUp(type)
      }
    },
    abolishFive() {
      this.control = !this.control
      this.widget = !this.widget
    },
    // MeetingSetUp
    MeetingSetUp(type) {
      this.requestApi({
        url: '/MeetingMa/MeetingSetUp',
        method: 'post',
        data: {
          Parameter: JSON.stringify({
            // meeting_id: 'df0259a4-16c1-11ec-ba42-fa163ed463f8', //	会议ID
            meeting_id: this.$route.query.id, //	会议ID
            type: type, //	1是创建人，2是负责人，3是会议助理，4是采购人，5是合规(结算人)
            username: this.username //用户账号
          })
        }
      }).then(res => {
        if (res && res === true) {
          location.reload()
        }
      })
    },
    infoReplaceRecord() {
      this.requestApi({
        url: '/MeetingMa/InfoReplaceRecord',
        method: 'post',
        data: { MeetingID: this.$route.query.id }
      }).then(res => {
        this.tableData = res
      })
    },
    getUser() {
      this.requestApi({
        url: '/MeetingMa/GetUser',
        method: 'post',
        data: {}
      }).then(res => {
        this.userList = res
      })
    },
    GetMeetingPersonnels() {
      this.requestApi({
        url: '/MeetingMa/GetMeetingPersonnels',
        method: 'post',
        data: { MeetingID: this.$route.query.id }
      }).then(res => {
        this.createUser = res[0]
      })
    }
  }
}
</script>

<style lang="scss">
.boss {
  width: 1100px;
  height: 55px;
  // background: red;
  margin: auto;
  margin-top: 15px;
}
.boss ul {
  display: flex;
  line-height: 55px;
}
.boss ul li {
  margin-left: 5px;
  font-size: 14px;
  color: #0084e9;
}
.content {
  width: 1100px;
  margin: 0 auto;
}
.path {
  font-size: 14px;
  color: #7c7f82;
  line-height: 20px;
  margin: 0 0 30px 0;
  font-family: 'Microsoft Yahei';
}
a:link {
  color: #2896eb;
}
.path em {
  color: #7c7f82;
}
.air-home-title {
  position: relative;
  height: 44px;
  line-height: 44px;
  background-color: #626e95;
  border: solid 1px #626e95;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  border-radius: 4px;
  padding-left: 25px;
  margin-bottom: 15px;
}
.air-box {
  width: 100%;
  border: solid 1px #d8d8d8;
  margin-bottom: 30px;
}
.air-box-body {
  background-color: #ffffff;
  padding: 30px;
}
.setting-row:first-child {
  margin-top: 0;
}
.setting-row {
  line-height: 22px;
  margin-top: 15px;
  margin-bottom: 35px;
}
.setting-row-title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}
.setting-row:last-child {
  margin-bottom: 0;
}
.air-box {
  width: 100%;
  border: solid 1px #d8d8d8;
  margin-bottom: 30px;
}
.air-box-title {
  position: relative;
  background-color: #fafafa;
  border-bottom: solid 1px #d8d8d8;
  padding: 8px 0;
}
.air-box-title-value:first-child {
  padding-left: 30px;
}
.air-box-title-value {
  float: left;
  font-size: 16px;
  font-weight: 500;
  padding-top: 5px;
  color: #333333;
  padding-left: 85px;
}
.air-box-title:after {
  display: block;
  clear: both;
  content: '';
  visibility: hidden;
  height: 0;
}
.air-box-body {
  background-color: #ffffff;
  padding: 30px;
}
.setting-row-value {
  font-size: 16px;
  color: #333333;
  font-weight: normal;
  padding-left: 15px;
}

.setting-row-a {
  font-size: 14px;
  color: #0c78e7;
  padding-left: 50px;
}
.setting-row-input {
  line-height: 32px;
  border: 1px solid #c8c8c8;
  border-radius: 4px;
  padding: 0 5px;
  height: 32px;
}
.setting-row-btn {
  margin-left: 20px;
}
.btn-primary {
  color: #fff;
  background-color: #2896eb;
  border-color: #2896eb;
}
.btn-sm,
.btn-xs {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
.el-popper {
  margin-top: 57px;
}
@media only screen and (max-width: 1270px) {
  .content {
    width: 100%;
  }
  .boss {
    width: 100%;
  }
}
</style>
