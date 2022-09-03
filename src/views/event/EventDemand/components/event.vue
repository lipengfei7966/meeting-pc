<template>
  <div class="event">
    <div class="demand_item">
      <div class="demand_top flex_row justify_between">
        <div class="demand_name flex_row align_center">
          <h2 style="margin-right: 20px">会场需求</h2>
          <el-radio-group v-model="is_conference_rooms" size="mini" @change="addDate">
            <el-radio label="1">Yes</el-radio>
            <el-radio label="0">No</el-radio>
          </el-radio-group>
        </div>
        <!-- <div class="budget flex_row align_center">
          <span class="nowrap mar_r10">项目预算 &nbsp;Total Accommodation Budget</span>
          <el-input v-model="conference_rooms_budget" placeholder="非必填" type="text" size="small" @input="formatNum()"></el-input>
        </div> -->
      </div>
      <div v-show="is_conference_rooms == 1">
        <div v-for="(meetItem,index) in conferenceList" :key="index">
          <div class="demand_main">
            <div class="demand_main_base flex_row align_center" style="justify-content: flex-end;">
              <!-- <div>
                <span>日期：</span>
                <el-select size="small" v-model="meetItem.conference_date" @change="selectDateTap" placeholder="请选择" style="width:120px">
                  <el-option v-for="item in meetDate" :disabled="getDisTap(item)" :label="item" :value="item" :key="item"></el-option>
                </el-select>
              </div> -->
              <div>
                <!-- <el-button icon="el-icon-circle-plus-outline" @click="copyPreDate(index)" v-if="index !== 0">复制上一场Copy Last Day Data</el-button> -->
                <!-- <el-button icon="el-icon-circle-plus-outline" @click="addTodayEvent(index)">添加该日分会场 Add Break-out Room</el-button> -->
              </div>
            </div>
            <el-table border :show-header="false" :data="meetItem.conference">
              <el-table-column label="日期" prop="is_important" width="240" align="center">
                <template slot-scope="scope">
                  <div>
                    <span>日期：</span>
                    <el-select size="small" v-model="meetItem.conference_date" @change="selectDateTap" placeholder="请选择" style="width:120px">
                      <el-option v-for="item in meetDate" :disabled="getDisTap(item)" :label="item" :value="item" :key="item"></el-option>
                    </el-select>
                  </div>
                  <el-button style="margin:30px 0" icon="el-icon-circle-plus-outline" @click="copyPreDate(index)" v-if="index !== 0">复制上一场</el-button>
                  <div>
                    <span>会场</span>
                    <!-- <span v-if="index !== 0 ">{{index}}</span> -->
                    <span>{{index+1}}</span>
                  </div>
                  <el-button size="small" type="text" @click="deleteEvent(index,scope.$index)">删除会场</el-button>
                  <el-button size="small" v-if="scope.$index !== 0" type="text" @click="copyPreEvent(index,scope.$index)">复制上一场</el-button>
                </template>
              </el-table-column>
              <el-table-column label="时间" prop="is_important" width="220">
                <template slot-scope="scope">
                  <div class="flex_column align_start time" style="height: 320px">
                    <div class="text_left">会场时间 Conference Room</div>
                    <div class="text_left">开始时间 Start Time</div>
                    <el-time-select @change="scope.row.conference_end_time = ''" placeholder="起始时间" value='12:00' v-model="scope.row.conference_start_time" :picker-options="{
                              start: '00:00',
                              step: '01:00',
                              end: '24:00'
                            }" size="small" class="demand_200"></el-time-select>
                    <div class="text_left">结束时间 Start Time</div>
                    <el-time-select placeholder="结束时间" v-model="scope.row.conference_end_time" size="small" class="demand_200" :picker-options="getStep(scope.row.conference_start_time)"></el-time-select>
                    <div class="text_left">参与人数 Attendees</div>
                    <el-input v-model="scope.row.attendees" size="small" class="demand_200" v-input-filter:int clearable></el-input>
                    <div class="text_left">会场面积范围 Area</div>
                    <div style="display: flex">
                      <el-input v-model="scope.row.min_area" size="small" v-input-filter:number style="width:80px"></el-input>~
                      <el-input v-model="scope.row.max_area" size="small" v-input-filter:number style="width:80px"></el-input>sqm
                    </div>

                  </div>
                </template>
              </el-table-column>
              <el-table-column label="摆台" prop="is_important" width="300">
                <template slot-scope="scope">
                  <div class="stage flex_column align_start" style="height: 320px">
                    <div class="text_left">摆台形式 Room Setup Type</div>
                    <el-select size="small" v-model="scope.row.room_setup_type" class="demand_250" clearable>
                      <el-option v-for="item in swingList" :label="item.value" :value="item.key" :key="item.key"></el-option>
                    </el-select>
                    <div class="flex_row" @click="isSetStageTap(index, scope.$index, scope.row.is_setting_in_advance)">
                      <el-checkbox disabled v-model="scope.row.is_setting_in_advance == 1"></el-checkbox>
                      &nbsp;提前搭建 Setting in Advance
                    </div>
                    <div v-show="scope.row.is_setting_in_advance == 1">
                      <p>搭建入场时间</p>
                      <!-- <el-date-picker
                              type="datetime" class="demand_250"
                              placeholder="搭建入场时间"
                              v-model="scope.row.setting_in_advance_date"
                              size="small" value-format="yyyy-MM-dd HH:mm"
                              @change="setLimitEnd(scope.row.setting_in_advance_date,scope.row.rehearsal_date, index, scope.$index)"
                              :picker-options="getStepStart"></el-date-picker> -->
                      <!-- <el-input v-model="scope.row.setting_in_advance_date" placeholder="yyyy-MM-dd HH:mm:ss" suffix-icon="el-icon-date" size='small'></el-input> -->
                      <div style="display: flex;">
                        <el-date-picker v-model="scope.row.setting_in_advance_date" value-format="yyyy-MM-dd" style="width:130px" type="date" placeholder="搭建日期" size="mini" @change="setLimitEnd(scope.row.setting_in_advance_date,scope.row.setting_in_advance_time,scope.row.rehearsal_date,scope.row.rehearsal_time, index, scope.$index)" :picker-options="datePickers[index]"></el-date-picker>
                        <el-time-select placeholder="搭建时间" v-model="scope.row.setting_in_advance_time" style="width:120px" @change="setLimitEnd(scope.row.setting_in_advance_date,scope.row.setting_in_advance_time,scope.row.rehearsal_date,scope.row.rehearsal_time, index, scope.$index)" :picker-options="{ start: '00:00', step: '01:00',end: '24:00'}" size="mini"></el-time-select>
                      </div>

                      <!-- <el-date-picker
                              type="datetime" class="demand_250 mar_tb10"
                              placeholder="搭建彩排完成时间"
                              v-model="scope.row.rehearsal_date"
                              size="small" value-format="yyyy-MM-dd HH:mm"
                              @change="setLimitEnd(scope.row.setting_in_advance_date,scope.row.rehearsal_date, index, scope.$index)"
                              :picker-options="getStepEnd"></el-date-picker> -->
                      <p style="margin-top: 10px">搭建彩排完成时间</p>
                      <!-- <el-input v-model="scope.row.rehearsal_date" placeholder="yyyy-MM-dd HH:mm:ss" suffix-icon="el-icon-date" size='small'></el-input> -->
                      <div style="display: flex;margin-bottom:10px">
                        <el-date-picker v-model="scope.row.rehearsal_date" value-format="yyyy-MM-dd" style="width:130px" type="date" placeholder="搭建日期" size="mini" @change="setLimitEnd(scope.row.setting_in_advance_date,scope.row.setting_in_advance_time,scope.row.rehearsal_date,scope.row.rehearsal_time, index, scope.$index)" :picker-options="datePickers[index]"></el-date-picker>
                        <el-time-select placeholder="彩排时间" v-model="scope.row.rehearsal_time" style="width:120px" @change="setLimitEnd(scope.row.setting_in_advance_date,scope.row.setting_in_advance_time,scope.row.rehearsal_date,scope.row.rehearsal_time, index, scope.$index)" :picker-options="{ start: '00:00', step: '01:00',end: '24:00'}" size="mini"></el-time-select>
                      </div>

                      <el-input type="textarea" placeholder="提前进场搭建酒店会收取相应费用，请根据实际需求进行填写，但务必预留充分搭建彩排时间。" v-model="scope.row.describe" size="small" class="demand_250" :rows="5"></el-input>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="会场设备">
                <template slot-scope="scope">
                  <div class="tag flex_column align_start" style="min-height: 320px">
                    <div>会场设备Site Equipment</div>
                    <div class="equipment_tag">
                      <span @click="selectTagTap(a, index, scope.$index)" :class="item.is_delete == 0?'select_tag':''" v-for="(item,a) in scope.row.equipment">{{item.value}}</span>
                      <el-button type="text" @click="clearCheckTap(index, scope.$index)">X清空勾选</el-button>
                    </div>
                    <!-- <div class="mar_b10">
                      <span>有线麦克风数量：</span>
                      <el-input size="small" class="demand_120" v-model="scope.row.wire_microphone_count"
                                placeholder="请填写数量" v-input-filter:int clearable></el-input>
                    </div>
                    <div class="mar_b10">
                      <span>无线麦克风数量：</span>
                      <el-input size="small" class="demand_120" v-model="scope.row.wireless_microphone_count"
                                placeholder="请填写数量" v-input-filter:int clearable></el-input>
                    </div> -->
                    <el-input type="textarea" v-model="scope.row.microphone_describe" :rows="5" placeholder="说明以上设备数量和尺寸 / 补充其他设备"></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <el-button class="mar_20" type="primary" size="medium" @click="addOtherEvent">添加其他会场需求</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="setStageShow" width="30%" title="提示" align="center">
      <span v-show="stageBtn">提前进场搭建酒店会收取相应费用，请根据实际需求进行填写，但务必预留充分搭建彩排时间。</span>
      <span v-show="!stageBtn">如果您在会议时间之外还需占用场地（如搭建、彩排），请务必填写此项。</span>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="stageBtn" type="primary" @click="changeStageTap(1)">确 定</el-button>
        <el-button v-show="!stageBtn" type="primary" @click="changeStageTap(1)">保 留</el-button>
        <el-button v-show="!stageBtn" type="primary" @click="changeStageTap(0)">不需要</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import inputFilter from '@/assets/js/filter'
import { getBetweenDate, getNextDate } from '@/utils/common'
export default {
  name: 'event',
  props: ['swingList', 'dateArr'],
  directives: {
    inputFilter
  },
  data() {
    return {
      // 会场需求
      is_conference_rooms: '1', // 会场（0:不需要 1:需要） 当为1时需要关联会场需求表
      conference_rooms_budget: 0, // 会场总预算
      conferenceList: [
        {
          conference_date: '',
          conference: [
            {
              id: '',
              order_name: 1,
              conference_id: '',
              event_info_id: '',
              is_important: 0, // 是否主会场（0：主会场 1：子会场）
              conference_start_time: '09:00', // 会场开始使用时间（24时制 如 8:00）
              conference_end_time: '16:00', // 会场结束使用时间（24时制 如 16:00）
              attendees: '', //  参会人数
              room_setup_type: '001-1', //  摆台形式（字典存储）
              is_setting_in_advance: 1, //  是否提前搭建(0:否 1:是)
              setting_in_advance_date: '', //  提前搭建日期
              setting_in_advance_time: '09:00', // 提前搭建时间
              rehearsal_date: '', //  彩排日期
              rehearsal_time: '18:00', // 彩排时间
              describe: '', //  描述
              wire_microphone_count: '', //  有线麦克风数量
              wireless_microphone_count: '', //  无线麦克风数量
              microphone_describe: '', //  麦克风或其他设备描述
              equipment: [],
              is_delete: 0
            }
          ]
        }
      ],
      isChangeStageIdx_a: 0,
      isChangeStageIdx_b: 0,
      setStageShow: false,
      stageBtn: false,
      step: { start: '08:00', step: '01:00', end: '22:00' },
      // : {start: '08:00', step: '01:00', end: '22:00',minTime: startTime},
      tagList: [],
      meetDate: [],
      disMeetDate: [],
      datePickers: [], // 会场日期选择限制

      getStepEnd: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      getStepStart: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.addDate()
    })
  },
  methods: {
    formatNum() {
      let temp = this.conference_rooms_budget.toString()
      temp = temp.replace(/。/g, '.')
      temp = temp.replace(/\b(0+)/gi, '')
      temp = temp.replace(/[^\d.]/g, '') //清除"数字"和"."以外的字符
      temp = temp.replace(/^\./g, '') //验证第一个字符是数字
      temp = temp.replace(/\.{2,}/g, '') //只保留第一个, 清除多余的
      temp = temp
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
      this.conference_rooms_budget = temp
    },
    setLimitEnd(date1, time1, date2, time2, a, b) {
      debugger
      let start = date1 + ' ' + time1
      let emd = date2 + ' ' + time2
      start = new Date(start).getTime()
      emd = new Date(emd).getTime()
      if (date1 && date2 && start >= emd) {
        this.$message.warning('搭建入场时间不能早于彩排完成时间')
        // this.conferenceList[a].conference[b].rehearsal_date = '';
        this.conferenceList[a].conference[b].rehearsal_time = ''
      }
    },
    getStep(time) {
      return { start: '00:00', step: '01:00', end: '24:00', minTime: time }
    },
    addDate() {
      this.conferenceList.forEach((item, idx) => {
        if (!item.conference_date && this.meetDate.length) {
          if (idx === 0) item.conference_date = this.meetDate[0]
        }
        if (this.disMeetDate.indexOf(item.conference_date) === -1) {
          this.disMeetDate.push(item.conference_date)
        }
      })
    },
    // 筛选不能选择会议的日期
    selectDateTap() {
      this.disMeetDate = []
      this.conferenceList.forEach(item => {
        if (item.conference_date) {
          this.disMeetDate.push(item.conference_date)
        }
      })
    },
    //会议值日禁选
    getDisTap(date) {
      // return this.disMeetDate.indexOf(date) !== -1
    },
    // 是否提前搭建舞台
    changeStageTap(id) {
      let a = this.isChangeStageIdx_a
      let b = this.isChangeStageIdx_b
      let data = this.conferenceList[a].conference[b]
      data.is_setting_in_advance = id
      this.conferenceList[a].conference.splice(b, 1, data)
      this.stageBtn = id === 1
      this.setStageShow = false
    },
    isSetStageTap(a, b, isSetting) {
      this.stageBtn = isSetting == 0
      this.setStageShow = true
      this.isChangeStageIdx_a = a
      this.isChangeStageIdx_b = b
    },
    // 勾选会场设备 item.is_delete == 0
    selectTagTap(id, a, b) {
      let data = this.conferenceList[a].conference[b].equipment[id]
      data.is_delete = data.is_delete == 0 ? 1 : 0
      this.conferenceList[a].conference[b].equipment.splice(id, 1, data)
    },
    // 清空勾选
    clearCheckTap(a, b) {
      this.conferenceList[a].conference[b].equipment = JSON.parse(JSON.stringify(this.tagList))
    },
    // 删除会场
    deleteEvent(a, b) {
      if (this.conferenceList.length === 1) {
        if (this.conferenceList[a].conference.length === 1) {
          this.is_conference_rooms = '1'
        } else {
          this.conferenceList[a].conference.splice(b, 1)
        }
      } else {
        if (this.conferenceList[a].conference.length === 1) {
          this.conferenceList.splice(a, 1)
        } else {
          this.conferenceList[a].conference.splice(b, 1)
        }
      }
      this.conferenceList.forEach((item, index) => {
        item.conference.order_name = index + 1
      })
      this.selectDateTap()
    },
    // 复制上一场会议
    copyPreEvent(a, b) {
      if (b > 0) {
        let orgData = JSON.parse(JSON.stringify({ ...this.conferenceList[a].conference[b - 1] }))
        // 复制上一次会议，不能复制会场ID和是否是分会场
        orgData.id = this.conferenceList[a].conference[b].id
        orgData.is_important = 1 //分会场
        this.conferenceList[a].conference.splice(b, 1, orgData)
      }
    },
    // 复制上一天会议
    copyPreDate(a) {
      let orgData = JSON.parse(JSON.stringify({ ...this.conferenceList[a - 1] }))
      debugger
      orgData.conference.forEach((conference, index) => {
        conference.id = this.conferenceList[a].conference[index] ? this.conferenceList[a].conference[index].id : ''
      })
      orgData.conference_date = this.conferenceList[a].conference_date
      orgData.conference[0].order_name = a + 1
      this.conferenceList.splice(a, 1, orgData)
    },
    // 添加该日分会场
    addTodayEvent(a) {
      let conference = {
        id: '',
        conference_id: '',
        event_info_id: '',
        conference_date: '',
        is_important: 1, // 是否主会场（0：主会场 1：子会场）
        conference_start_time: '', // 会场开始使用时间（24时制 如 8:00）
        conference_end_time: '', // 会场结束使用时间（24时制 如 16:00）
        attendees: '', //  参会人数
        room_setup_type: '', //  摆台形式（字典存储）
        is_setting_in_advance: 1, //  是否提前搭建(0:否 1:是)
        setting_in_advance_date: '', //  提前搭建日期
        rehearsal_date: '', //  彩排时间
        describe: '', //  描述
        wire_microphone_count: '', //  有线麦克风数量
        wireless_microphone_count: '', //  无线麦克风数量
        microphone_describe: '', //  麦克风或其他设备描述
        equipment: JSON.parse(JSON.stringify(this.tagList)),
        is_delete: 0
      }
      let len = this.conferenceList[a].conference.length
      this.conferenceList[a].conference.splice(len, 0, conference)
    },
    // 添加其他日期 会议
    addOtherEvent() {
      // this.addDate();

      let optional = this.meetDate.filter(item => {
        return this.disMeetDate.indexOf(item) === -1
      })
      let conference = [
        {
          id: '',
          order_name: '',
          event_info_id: '',
          conference_id: '',
          conference_date: optional.length ? optional[0] : '',
          is_important: 0, // 是否主会场（0：主会场 1：子会场）
          conference_start_time: '09:00', // 会场开始使用时间（24时制 如 8:00）
          conference_end_time: '16:00', // 会场结束使用时间（24时制 如 16:00）
          attendees: '', //  参会人数
          room_setup_type: '001-1', //  摆台形式（字典存储）
          is_setting_in_advance: 1, //  是否提前搭建(0:否 1:是)
          setting_in_advance_date: '', //  提前搭建日期
          setting_in_advance_time: '09:00', // 提前搭建时间
          rehearsal_date: '', //  彩排日期
          rehearsal_time: '18:00', // 彩排时间
          describe: '', //  描述
          wire_microphone_count: '', //  有线麦克风数量
          wireless_microphone_count: '', //  无线麦克风数量
          microphone_describe: '', //  麦克风或其他设备描述
          equipment: JSON.parse(JSON.stringify(this.tagList)),
          is_delete: 0
        }
      ]
      let len = this.conferenceList.length
      conference[0].setting_in_advance_date = getNextDate(this.meetDate[0], -1)
      conference[0].rehearsal_date = getNextDate(this.meetDate[0], -1)
      conference[0].order_name = len + 1
      debugger
      this.conferenceList.splice(len, 0, { conference, conference_date: optional.length ? optional[0] : '' })
      this.disMeetDate.push(optional.length ? optional[0] : '')
    }
  },
  watch: {
    meetDate: {
      handler(newVal, oldVal) {
        // 搭建入场日期默认值
        this.conferenceList[0].conference[0].setting_in_advance_date = getNextDate(newVal[0], -1)
        // 彩排完成日期默认值
        this.conferenceList[0].conference[0].rehearsal_date = getNextDate(newVal[0], -1)
      },
      deep: true,
      immediate: true
    },
    // 监听会场列表，动态添加搭建、彩排日期选择范围
    conferenceList: {
      handler(newVal, oldVal) {
        this.datePickers = []
        // debugger
        newVal.forEach(item => {
          this.datePickers.push({
            disabledDate: time => {
              return time.getTime() > new Date(item.conference_date)
            }
          })
        })
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>
</style>
