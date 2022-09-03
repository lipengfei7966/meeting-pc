<template>
  <div class="room">
    <div class="demand_item">
      <div class="demand_top flex_row justify_between">
        <div class="demand_name flex_row align_center">
          <h2 style="margin-right: 20px">客房需求</h2>
          <el-radio-group v-model="is_guest_room" size="mini">
            <el-radio label="1">Yes</el-radio>
            <el-radio label="0">No</el-radio>
          </el-radio-group>
        </div>
        <!-- <div class="budget flex_row align_center">
          <span class="nowrap mar_r10">项目预算 &nbsp;Total Accommodation Budget</span>
          <el-input v-model="guest_room_budget" placeholder="非必填" type="text" size="small" @input="formatNum(1)"></el-input>
        </div> -->
      </div>
      <div class="demand_main" v-show="is_guest_room == 1">
        <div class="demand_main_base flex_row align_center">
          <div class="mar_r20">
            <span class="mar_r10">入住日期 Check-in Date</span>
            <el-select size="small" v-model="check_in_date" @change="changeCheckDate" style="width:120px">
              <el-option v-for="(item, index) in dateArr" :label="item" :value="item" :key="index"></el-option>
            </el-select>
            ~
            <span class="mar_r10">离店日期 Out Date</span>
            <el-select size="small" v-model="out_date" @change="changeCheckDate" style="width:120px">
              <el-option v-for="(item, index) in outDate" :disabled="index <= disabledIndex" :label="item" :value="item" :key='index'></el-option>
            </el-select>
          </div>

          <div class="mar_r20">
            <span class="mar_r10">房标 Room Standard</span>
            <el-input style="width: 80px" v-model="night_budget" type="text" @input="formatNum(2)" placeholder="非必填" size="small"></el-input>
            元/间夜
          </div>
          <div class="mar_r20">
            <el-checkbox v-model="is_networks">需要宽带 Networks</el-checkbox>
            <el-checkbox v-model="is_breakfast">需要早餐 Breakfast</el-checkbox>
          </div>

        </div>
        <div class="demand_main_base flex_row align_center">
          <div class="mar_r20">
            <el-select size="small" v-model="is_Inside_outside" style="width:160px">
              <el-option v-for="io in inneroutter" :label="io.label" :value="io.value" :key="io.value"></el-option>
            </el-select>
          </div>
        </div>

        <div class="demand_hotel">
          <el-table border :data="room" size="small">
            <el-table-column label="日期" prop="check_in_date" width="125" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.check_in_date.substring(0, 10)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="双床房" prop="twin_bed_count" width="125" align="center">
              <template slot-scope="scope">
                <el-input v-show="is_Inside_outside == 0" v-model="scope.row.twin_bed_count" size="small" placeholder="请填写" class="demand_100" v-input-filter:int oninput="value=value.replace(/\D/g,'')" onafterpaste="value=value.replace(/\D/g,'')" clearable></el-input>
                <div v-show="is_Inside_outside == 1">
                  内部数量
                  <el-input v-model="scope.row.in_twin_bed_count" size="small" placeholder="请填写" class="demand_100" v-input-filter:int oninput="value=value.replace(/\D/g,'')" onafterpaste="value=value.replace(/\D/g,'')" clearable></el-input>
                  外部数量
                  <el-input v-model="scope.row.out_twin_bed_count" size="small" placeholder="请填写" class="demand_100" v-input-filter:int oninput="value=value.replace(/\D/g,'')" onafterpaste="value=value.replace(/\D/g,'')" clearable></el-input>
                </div>

              </template>
            </el-table-column>
            <el-table-column label="大床房" prop="king_bed_count" width="125" align="center">
              <template slot-scope="scope">
                <el-input v-show="is_Inside_outside == 0" v-model="scope.row.king_bed_count" size="small" placeholder="请填写" class="demand_100" v-input-filter:int oninput="value=value.replace(/\D/g,'')" onafterpaste="value=value.replace(/\D/g,'')" clearable></el-input>

                <div v-show="is_Inside_outside == 1">
                  内部数量
                  <el-input v-model="scope.row.in_king_bed_count" size="small" placeholder="请填写" class="demand_100" v-input-filter:int oninput="value=value.replace(/\D/g,'')" onafterpaste="value=value.replace(/\D/g,'')" clearable></el-input>
                  外部数量
                  <el-input v-model="scope.row.out_king_bed_count" size="small" placeholder="请填写" class="demand_100" v-input-filter:int oninput="value=value.replace(/\D/g,'')" onafterpaste="value=value.replace(/\D/g,'')" clearable></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="行政房/套房" prop="superior_room_count" width="150" align="center">
              <template slot-scope="scope">
                <el-input v-show="is_Inside_outside == 0" v-model="scope.row.superior_room_count" size="small" placeholder="请填写" class="demand_100" v-input-filter:int oninput="value=value.replace(/\D/g,'')" onafterpaste="value=value.replace(/\D/g,'')" clearable></el-input>
                <div v-show="is_Inside_outside == 1">
                  <div>内部数量</div>
                  <el-input v-model="scope.row.in_superior_room_count" size="small" placeholder="请填写" class="demand_100" v-input-filter:int oninput="value=value.replace(/\D/g,'')" onafterpaste="value=value.replace(/\D/g,'')" clearable></el-input>
                  <div>外部数量</div>
                  <el-input v-model="scope.row.out_superior_room_count" size="small" placeholder="请填写" class="demand_100" v-input-filter:int oninput="value=value.replace(/\D/g,'')" onafterpaste="value=value.replace(/\D/g,'')" clearable></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="总计" prop="superior_room_count" width="80" align="center">
              <template slot-scope="scope">
                <div v-if="is_Inside_outside == 0">
                  {{parseInt(scope.row.superior_room_count || 0) + parseInt(scope.row.king_bed_count || 0) +
                parseInt(scope.row.twin_bed_count || 0)}}

                </div>
                <div v-if="is_Inside_outside == 1">
                  {{ parseInt(scope.row.in_twin_bed_count || 0) + parseInt(scope.row.out_twin_bed_count || 0) +
                  parseInt(scope.row.in_superior_room_count || 0) + parseInt(scope.row.out_superior_room_count || 0) +
                  parseInt(scope.row.in_king_bed_count || 0) + parseInt(scope.row.out_king_bed_count || 0) }}
                </div>

              </template>
            </el-table-column>
            <el-table-column label="其他需求" prop="superior_room_count" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.other_requirements" size="small" placeholder="几间无烟／有烟、无窗／有窗"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="superior_room_count" align="center" width="150">
              <template slot-scope="scope">
                <el-button v-if="scope.$index !== 0" type="text" size="small" @click="copyPreTap('room', scope.$index)">复制昨日数据
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inputFilter from '@/assets/js/filter'
import { getBetweenDate, getNextDate } from '@/utils/common'
export default {
  name: 'room',
  props: ['dateArr', 'outDate'],
  directives: {
    inputFilter
  },
  data() {
    return {
      // 客房需求
      is_guest_room: '1',
      guest_room_budget: 0,
      check_in_date: '',
      out_date: '',
      disabledIndex: 0, // 日期禁选Index
      night_budget: 0,
      is_networks: true, //是否需要宽带（0:不需要 1：需要） (客房为1时启用)
      is_breakfast: true, // 是否需要早餐(0:不需要1：需要) (客房为1时启用)
      checkDate: [],
      roomItem: { check_in_date: '', twin_bed_count: '', king_bed_count: '', superior_room_count: '', other_requirements: '' },
      orgRoom: [],
      room: [],
      outDateArr: [], // 离店日期下拉选项
      inneroutter: [
        {
          label: '不区分内外部人员',
          value: 0
        },
        {
          label: '区分内外部人员',
          value: 1
        }
      ],
      is_Inside_outside: '0'
    }
  },
  mounted() {},
  methods: {
    formatNum(type) {
      let temp
      if (type === 1) temp = this.guest_room_budget.toString()
      if (type === 2) temp = this.night_budget.toString()
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
      if (type === 1) this.guest_room_budget = temp
      if (type === 2) this.night_budget = temp
    },
    changeInout() {},
    // 入住日期修改
    changeCheckDate() {
      let startid = this.dateArr.indexOf(this.check_in_date)
      this.disabledIndex = startid
      let endid = this.outDate.indexOf(this.out_date)

      if (startid >= endid) {
        this.out_date = this.dateArr[this.dateArr.length - 1]
        this.room.forEach(item => {
          this.orgRoom.forEach((Element, index) => {
            if (item.check_in_date.slice(0, 10) == Element.check_in_date) {
              this.orgRoom[index] = item
            }
          })
        })
        this.room = this.orgRoom.slice(startid, this.dateArr.length - 1)
      } else {
        this.room.forEach(item => {
          this.orgRoom.forEach((Element, index) => {
            if (item.check_in_date.slice(0, 10) == Element.check_in_date) {
              this.orgRoom[index] = item
            }
          })
        })
        this.room = this.orgRoom.slice(startid, endid)
      }
    },
    // 复制昨天
    copyPreTap(type, idx) {
      if (type === 'room') {
        let id = this.room[idx].id
        let date = this.room[idx].check_in_date
        let isDelete = this.room[idx].is_delete

        this.room[idx] = Object.assign(this.room[idx], this.room[idx - 1])
        this.room[idx].id = id
        this.room[idx].check_in_date = date
        this.room[idx].is_delete = isDelete

        console.log(this.room[idx - 1])
        console.log(this.room[idx])
      } else {
        console.log(type)
      }
    }
  },
  watch: {
    dateArr: {
      handler(newVal, oldVal) {
        this.checkDate = [...newVal]
        this.check_in_date = newVal[1]
        let id = this.dateArr.indexOf(this.check_in_date)
        this.room = this.orgRoom.slice(id)
        this.out_date = this.outDate[this.outDate.length - 1]
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped>
</style>
