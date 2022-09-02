<template>
  <div class="intercity">
    <div class="demand_item">
      <div class="demand_top flex_row justify_between">
        <div class="demand_name flex_row align_center">
          <H2 style="margin-right: 20px">大交通</H2>
          <el-radio-group v-model="is_intercity_transportation" size="mini">
            <el-radio label="1">Yes</el-radio>
            <el-radio label="0">No</el-radio>
          </el-radio-group>
        </div>
        <!-- <div class="budget flex_row align_center">
          <span class="nowrap mar_r10">项目预算 &nbsp;Total Accommodation Budget</span>
          <el-input v-model="intercity_transportation_budget" placeholder="非必填" type="text" size="small" @input="formatNum()"></el-input>
        </div> -->
      </div>
      <div v-show="is_intercity_transportation == 1">
        <div v-for="(item, index) in transportationList" :key="index">
          <div class="flex_row">
            <div class="demand_date mar_t20 mar_l20">
              <span>Date：</span>
              <el-select size="small" v-model="item.transportation_date" @change="selectDateTap">
                <el-option v-for="(item, index) in interDate" :key="index" :disabled="getDisTap(item)" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <el-button class="mar_20" type="text" size="medium" @click="addOtherTraffic(index)">添加该日交通需求 Add New Item</el-button>
          </div>
          <el-table border :data="item.transportation">
            <el-table-column label="始发地" width="110" align="center">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.origin_city" placeholder="出发城市"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="目的地" prop="is_important" width="110" align="center">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.destination_city" placeholder="到达城市"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="交通工具" prop="is_important" width="105" align="center">
              <template slot-scope="scope">
                <el-select size="small" v-model="scope.row.trans_type" class="demand_80" @change="selectTraffic(scope.row.trans_type, index, scope.$index)">
                  <el-option :label="item.value" :value="item.key" v-for="item in trafficType" :key="item.key"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="搭乘人数" prop="is_important" width="100" align="center">
              <template slot-scope="scope">
                <el-input v-input-filter:int size="small" v-model="scope.row.passenger_count" placeholder="人数"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="抵达时间" prop="is_important" width="125" align="center">
              <template slot-scope="scope">
                <el-time-select placeholder="抵达时间" v-model="scope.row.arrive_time" size="small" class="demand_100" :picker-options="step"></el-time-select>
              </template>
            </el-table-column>
            <el-table-column label="座位等级" prop="is_important" width="150" align="center">
              <template slot-scope="scope" v-if="scope.row.trans_type && scope.row.trans_type !== '003-3'">
                <el-select size="small" v-model="scope.row.seat_classes" class="demand_120">
                  <template v-if="trainSeatType.length && scope.row.trans_type === '003-2'">
                    <el-option :label="item.value" :value="item.key" v-for="item in trainSeatType" :key="item.key"></el-option>
                  </template>
                  <template v-if="airSeatType.length && scope.row.trans_type === '003-1'">
                    <el-option :label="item.value" :value="item.key" v-for="item in airSeatType" :key="item.key"></el-option>
                  </template>
                  <template v-else>
                    <el-option :label="item.value" :value="item.key" v-for="item in scope.row.seatList" :key="item.key"></el-option>
                  </template>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="票价/折扣" prop="is_important" width="150" align="center">
              <template slot-scope="scope" v-if="scope.row.trans_type === '003-1'">
                <el-select size="small" v-model="scope.row.special_price" class="demand_120">
                  <template v-if="trainSeatType.length && scope.row.trans_type === '003-2'">
                    <el-option :label="item.value" :value="item.key" v-for="item in trainDiscount" :key="item.key"></el-option>
                  </template>
                  <template v-if="airSeatType.length && scope.row.trans_type === '003-1'">
                    <el-option :label="item.value" :value="item.key" v-for="item in airDiscount" :key="item.key"></el-option>
                  </template>
                  <template v-else>
                    <el-option :label="item.value" :value="item.key" v-for="item in scope.row.discountList" :key="item.key"></el-option>
                  </template>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="需求备注" prop="is_important" align="center">
              <template slot-scope="scope">
                <el-input type="text" :rows="5" size="small" v-model="scope.row.requirement" placeholder="请备注退改条件等"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="is_important" width="100" align="center">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click="addBack(index, scope.$index)">添加返程</el-button>
                <el-button size="small" type="text" @click="deleteIntercity(index, scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-button v-show="transportationList.length < dateArr.length" class="mar_20" type="primary" size="medium" @click="addOther">添加其他日期交通需求</el-button>
    </div>
  </div>
</template>

<script>
import inputFilter from '@/assets/js/filter';
export default {
  name: "intercity",
  props:['dateArr'],// 'trafficType',
  directives: {
    inputFilter
  },
  data(){
    return{
      trafficType:[],
      interDate:[],
      disInterDate:[],
      discountList: [],
      seatList: [],
      is_intercity_transportation: '1', // 大交通(0:不需要 1：需要) 当为1时需要关联大交通需求表
      intercity_transportation_budget: 0, // 大交通总预算
      transportationList:[
        {
          // event_info_id: '', //  会议id
          transportation_date: '', //  出行日期
          transportation:[
            {
              id:'',
              origin_city: '', //  出发城市
              destination_city: '', //  目的城市
              trans_type: '', //  交通工具(数据字典)
              passenger_count: '', //  搭乘人数
              arrive_time: '', //  抵达时间（24时制 如 15:00）
              seat_classes: '', //  座位(数据字典)
              special_price: '', //  折扣(数据字典)
              requirement: '', //  备注
              trip_type: 0, //  0：去程 1：返程
              group_transportation: '', //  去程返程分组标识
              is_delete: 0,
            }
          ]
        }
      ],
      step: {start: '00:00', step: '00:30', end: '23:59'},
      airSeatType: [],
      trainSeatType: [],
      trainDiscount: [],
      airDiscount: [],
      eventEndTime:'',
    }
  },
  mounted() {
    this.$nextTick(() => {
      let trainSeatType = this.trafficType.filter(item => {
        return item.key === '003-2'
      });
      let airSeatType = this.trafficType.filter(item => {
        return item.key === '003-1'
      });
      this.trainSeatType = trainSeatType.length ? trainSeatType[0].DiscountDetaile : [];
      this.airSeatType = airSeatType.length ? airSeatType[0].DiscountDetaile : [];
      this.trainDiscount = trainSeatType.length ? trainSeatType[0].GradeDetaile : [];
      this.airDiscount = airSeatType.length ? airSeatType[0].GradeDetaile : [];
      this.addDate()
    })
  },
  methods:{
    init(){
      let trainSeatType = this.trafficType.filter(item => {
        return item.key === '003-2'
      });
      let airSeatType = this.trafficType.filter(item => {
        return item.key === '003-1'
      });
      this.trainSeatType = trainSeatType.length ? trainSeatType[0].DiscountDetaile : [];
      this.airSeatType = airSeatType.length ? airSeatType[0].DiscountDetaile : [];
      this.trainDiscount = trainSeatType.length ? trainSeatType[0].GradeDetaile : [];
      this.airDiscount = airSeatType.length ? airSeatType[0].GradeDetaile : [];
    },
    addDate(){
      this.transportationList.forEach(item =>{
        if(!item.transportation_date && this.interDate.length){
          item.transportation_date = this.interDate[0];
          if(this.disInterDate.indexOf(item.transportation_date) === -1){
            this.disInterDate.push(item.transportation_date)
          }
        }
      })
    },
    // 筛选不能选择会议的日期
    selectDateTap(){
      this.disInterDate = [];
      this.transportationList.forEach(item =>{
        if(item.transportation_date){
          this.disInterDate.push(item.transportation_date)
        }
      });
    },
    //会议值日禁选
    getDisTap(date){
      return this.disInterDate.indexOf(date) !== -1
    },
    selectTraffic(id, a, b){
      this.airSeatType= [];
      this.trainSeatType= [];
      this.trainDiscount= [];
      this.airDiscount= [];
      console.log(this.trafficType);
      let selectData = this.trafficType.filter(item => {
        return item.key === id
      });
      this.transportationList[a].transportation[b].special_price = '';
      this.transportationList[a].transportation[b].seat_classes = '';
      this.transportationList[a].transportation[b].discountList = selectData[0].GradeDetaile;
      this.transportationList[a].transportation[b].seatList = selectData[0].DiscountDetaile;
      this.discountList = selectData[0].GradeDetaile;
      this.seatList = selectData[0].DiscountDetaile;
    },
    // 添加该日交通需求
    addOtherTraffic(a){
      let data = {
        id:'',
        origin_city: '', //  出发城市
        destination_city: '', //  目的城市
        trans_type: '', //  交通工具(数据字典)
        passenger_count: '', //  搭乘人数
        arrive_time: '', //  抵达时间（24时制 如 15:00）
        seat_classes: '', //  座位(数据字典)
        special_price: '', //  折扣(数据字典)
        requirement: '', //  备注
        trip_type: 0, //  0：去程 1：返程
        group_transportation: '', //  去程返程分组标识
        is_delete: 0,
      };
      let len = this.transportationList[a].transportation.length;
      this.transportationList[a].transportation.splice(len, 0, data);
    },
    // 添加返程
    addBack(a, b){
      let orgData = JSON.parse(JSON.stringify(this.transportationList[a].transportation[b]));
      if(orgData.id) orgData.id = '';
      let data = {...orgData};
      data.origin_city = orgData.destination_city;
      data.destination_city = orgData.origin_city;
      data.trip_type = 1;
      let idx_1 = this.interDate.indexOf(this.eventEndTime);
      let idx_2 = this.interDate.indexOf(this.transportationList[a].transportation_date);
      if(idx_1 >= idx_2){
        if(this.isHasLast()){
          let interDates = this.interDate[this.interDate.length-3];
          let isHanList = this.transportationList.map( item => { return item.transportation_date === interDates; });
          let idx = isHanList.indexOf(true);
          let len = this.transportationList[idx].transportation.length;
          this.transportationList[idx].transportation.splice(len, 0, data);
        }else {
          let returnList = {transportation_date:this.interDate[this.interDate.length-3],transportation:[data]};
          let len = this.transportationList.length;
          this.transportationList.splice(len, 0, returnList);
        }
      }else {
        this.transportationList[a].transportation.splice(b+1, 0, data);
      }
      // this.transportationList[a].transportation.splice(b+1, 0, data);
    },
    // 判断是否存在最后一天需求
    isHasLast(){
      let interDates = this.interDate[this.interDate.length-3];
      return this.transportationList.filter(item => {
        return item.transportation_date === interDates;
      }).length
    },
    // 删除
    deleteIntercity(a, b){
      let len = this.transportationList[a].transportation.length;
      let lens = this.transportationList.length;
      if(lens === 1){
        if(len === 1) {
          this.is_intercity_transportation = '0'
        }else{
          this.transportationList[a].transportation.splice(b,1)
        }
      } else {
        if(len === 1) {
          this.transportationList.splice(a,1)
        }else {
          this.transportationList[a].transportation.splice(b,1)
        }
      }
      this.selectDateTap()
    },
    // 添加其他日程
    addOther() {
      let optional = this.interDate.filter(item=>{
        return this.disInterDate.indexOf(item) === -1
      });
      let data = {
        event_info_id: '', //  会议id
        transportation_date: optional.length? optional[0] : '', //  出行日期
        transportation:[
          {
            id:'',
            origin_city: '', //  出发城市
            destination_city: '', //  目的城市
            trans_type: '', //  交通工具(数据字典)
            passenger_count: '', //  搭乘人数
            arrive_time: '', //  抵达时间（24时制 如 15:00）
            seat_classes: '', //  座位(数据字典)
            special_price: '', //  折扣(数据字典)
            requirement: '', //  备注
            trip_type: 0, //  0：去程 1：返程
            group_transportation: '', //  去程返程分组标识
            is_delete: 0,
          }
        ]
      };
      let len = this.transportationList.length;
      if(this.is_intercity_transportation === '0'){
        this.is_intercity_transportation = '1'
      }else {
        this.transportationList.splice(len, 0, data)
      }
      this.selectDateTap()
    },
    formatNum(){
      let temp = this.intercity_transportation_budget.toString();
      temp = temp.replace(/。/g, ".");
      temp = temp.replace(/\b(0+)/gi,"");
      temp = temp.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
      temp = temp.replace(/^\./g, ""); //验证第一个字符是数字
      temp = temp.replace(/\.{2,}/g, ""); //只保留第一个, 清除多余的
      temp = temp.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      this.intercity_transportation_budget = temp
    },
  }
}
</script>

<style scoped>
</style>
