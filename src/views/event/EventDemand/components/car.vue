<template>
  <div class="car">
    <div class="demand_item">
      <div class="demand_top flex_row justify_between">
        <div class="demand_name flex_row align_center">
          <h2 style="margin-right: 20px">地面交通</h2>
          <el-radio-group v-model="is_car_rental" size="mini">
            <el-radio label="1">Yes</el-radio>
            <el-radio label="0">No</el-radio>
          </el-radio-group>
        </div>
        <!-- <div class="budget flex_row align_center">
          <span class="nowrap mar_r10">项目预算 &nbsp;Total Accommodation Budget</span>
          <el-input v-model="car_rental_budget" placeholder="非必填" type="text" size="small"  @input="formatNum()"></el-input>
        </div> -->
      </div>
      <div v-show="is_car_rental == 1">
        <div v-for="(item,index) in carList" :key="index">
          <div class="flex_row">
            <div class="demand_date mar_t20 mar_l20">
              <span>Date：</span>
              <el-select size="small" v-model="item.car_date" @change="selectDateTap">
                <el-option v-for="(item, index) in dateArr" :key="index" :disabled="getDisTap(item)" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <el-button class="mar_20" type="text" size="medium" @click="addOtherCar(index)">添加该日交通需求 Add New Item
            </el-button>
          </div>
          <el-table border :data="item.car">
            <el-table-column label="用车目的" width="150" align="center">
              <template slot-scope="scope">
                <el-select size="small" v-model="scope.row.purpose" class="demand_120">
                  <el-option v-for="item in purposeList" :label="item.value" :value="item.key" :key="item.key"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="用车类型" prop="is_important" width="150" align="center">
              <template slot-scope="scope">
                <el-select size="small" v-model="scope.row.vehicle_type" class="demand_120" @change="selectTraffic(scope.row.vehicle_type)">
                  <el-option :label="item.value" :value="item.key" v-for="item in carType" :key="item.key"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="用车数量" prop="is_important" width="100" align="center">
              <template slot-scope="scope">
                <el-input v-input-filter:int size="small" v-model.number="scope.row.car_count" placeholder="必填"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="搭乘人数" prop="is_important" width="125" align="center">
              <template slot-scope="scope">
                <el-input v-input-filter:int size="small" v-model="scope.row.vehicle_count" placeholder="非必填"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="用车城市" prop="is_important" width="175" align="center">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.city" placeholder="非必填"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="用车说明" align="center">
              <template slot-scope="scope">
                <el-input type="text" :rows="5" size="small" v-model="scope.row.explain" placeholder="请填写用车说明"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="is_important" width="80" align="center">
              <template slot-scope="scope">
                <el-button size="small" type="text" @click="deleteCar(index,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
      <el-button v-show="carList.length < dateArr.length" class="mar_20" type="primary" size="medium" @click="addOther">添加其他日期地面交通</el-button>
    </div>
  </div>
</template>

<script>
  import inputFilter from '@/assets/js/filter';
  export default {
    name: "car",
    props:['purposeList', 'carType', 'dateArr'],
    directives: {
      inputFilter
    },
    data() {
      return {
        is_car_rental: '1', // 地面交通(0:不需要 1:需要) 当为1时需要关联地面交通关系表
        car_rental_budget: 0, // 地面交通总预算
        eventCity:'',
        carDate:[],
        disCarDate:[],
        carList: [
          {
            car_date: '', //  用车时间
            car: [
              {
                id:'',
                event_info_id: '', //  会议id
                purpose: '', //  用车目的(数据字典)
                vehicle_type: '', //  用车类型(数据字典)
                car_count: '', //  用车数量
                vehicle_count: '', //  搭乘人数
                city: this.eventCity, // 用车城市
                explain: '', //  用车说明
                is_delete: 0, //  删除位(0:未删除1：已删除
              }
            ]
          }
        ],
        // 添加其他日期用车
        // car:
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.addDate();
        this.carList.forEach(Element => {
          Element.car.forEach(item => {
            item.city = item.city?item.city:this.eventCity
          })
        })
      })
    },
    updated(){
      // this.carList[0].car[0].city = this.eventCity
      // debugger
      this.carList.forEach(Element => {
        Element.car.forEach(item => {
          // debugger
          item.city = item.city?item.city:this.eventCity
        })
      })
    },
    methods: {
      formatNum(){
        let temp = this.car_rental_budget.toString();
        temp = temp.replace(/。/g, ".");
        temp = temp.replace(/\b(0+)/gi,"");
        temp = temp.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
        temp = temp.replace(/^\./g, ""); //验证第一个字符是数字
        temp = temp.replace(/\.{2,}/g, ""); //只保留第一个, 清除多余的
        temp = temp.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
        this.car_rental_budget = temp
      },
      addDate(){
        this.carList.forEach(item =>{
          if(!item.car_date && this.carDate.length){
            item.car_date = this.carDate[0];
            if(this.disCarDate.indexOf(item.car_date) === -1){
              this.disCarDate.push(item.car_date)
            }
          }
        })
      },
      // 筛选不能选择会议的日期
      selectDateTap(){
        this.disCarDate = [];
        this.carList.forEach(item =>{
          if(item.car_date){
            this.disCarDate.push(item.car_date)
          }
        });
      },
      //会议值日禁选
      getDisTap(date){
        return this.disCarDate.indexOf(date) !== -1
      },
      selectTraffic(id){
        //debugger
      },
      addOtherCar(id) {
        let len = this.carList[id].car.length;
        let item = {...this.carList[id].car[len - 1]};
        item.id = '';
        // this.carList[id].car.splice(len - 1, 0, item)
        this.carList[id].car.push(item)
      },
      // 删除地面交通
      deleteCar(id, idx) {
        if(this.carList.length === 1){
          if(this.carList[id].car.length === 1) {
            this.is_car_rental = '0'
          }else {
            this.carList[id].car.splice(idx, 1)
          }
        }else {
          if(idx !== 0){
            this.carList[id].car.splice(idx, 1)
          }else{
            this.carList.splice(id,1)
          }
        }
        this.selectDateTap();
      },
      // 添加其他日期用车
      addOther() {
        let optional = this.carDate.filter(item=>{
          return this.disCarDate.indexOf(item) === -1
        });
        let car = {
          car_date: optional.length? optional[0] : '', //  用车时间
          car: [
            {
              id:'',
              event_info_id: '', //  会议id
              purpose: '', //  用车目的(数据字典)
              vehicle_type: '', //  用车类型(数据字典)
              car_count: '', //  用车数量
              vehicle_count: '', //  搭乘人数
              city: this.eventCity, // 用车城市
              explain: '', //  用车说明
              is_delete: 0, //  删除位(0:未删除1：已删除
            }
          ]
        };
        let len = this.carList.length;
        if(this.is_car_rental === '0'){
          this.is_car_rental = '1'
        }else {
          this.carList.splice(len, 0, car)
        }
        this.selectDateTap();
      }
    }
  }
</script>

<style scoped>
</style>
