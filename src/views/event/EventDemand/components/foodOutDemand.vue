<template>
  <div class="foodDemand">
    <div class="demand_item">
      <div class="demand_top flex_row justify_between">
        <div class="demand_name flex_row align_center">
          <h2 style="margin-right: 20px">酒店外餐饮需求</h2>
          <el-radio-group v-model="is_food_outside" size="mini">
            <el-radio label="1">Yes</el-radio>
            <el-radio label="0">No</el-radio>
          </el-radio-group>
        </div>
        <div class="budget flex_row align_center">
          <span class="nowrap mar_r10">餐标 &nbsp;Dining Standard：</span>
          <span>￥{{food_limit}}</span>
        </div>
        <!-- <div class="budget flex_row align_center">
          <span class="nowrap mar_r10">项目预算 &nbsp;Total Accommodation Budget</span>
          <el-input v-model="food_outside_budget" placeholder="非必填" type="text" size="small" @input="formatNum()"></el-input>
        </div> -->
      </div>
      <el-table border :data="foodBudgetList" v-show="is_food_outside == 1">
        <el-table-column label="日期" prop="is_important" width="150" align="center">
          <template slot-scope="scope">
            <el-select size="small" v-model="scope.row.food_date" class="demand_120">
              <el-option v-for="(item, index) in dateArr" :label="item" :value="item" :key=index></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="用餐时间" prop="is_important" width="200" align="center">
          <template slot-scope="scope">
            <el-select size="small" v-model="scope.row.food_time" class="demand_120 mar_t10">
              <el-option label="早餐" :value="2"></el-option>
              <el-option label="午餐" :value="0"></el-option>
              <el-option label="茶歇" :value="3"></el-option>
              <el-option label="晚餐" :value="1"></el-option>
              <!-- <el-option :label="item.value" :value="item.key" v-for="item in FoodOutside" :key="item.key"></el-option> -->
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="用餐类型" prop="is_important" width="150" align="center">
          <template slot-scope="scope">
            <!--用餐类型-->
            <el-select size="small" v-model="scope.row.food_type" class="demand_120 mar_t10">
              <el-option :label="item.value" :value="item.key" v-for="item in FoodOutside" :key="item.key"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="用餐人数" prop="is_important" width="150" align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.food_count" placeholder="人数" v-input-filter:int clearable></el-input>
          </template>
        </el-table-column>

        <el-table-column label="需求备注" prop="is_important" align="center">
          <template slot-scope="scope">
            <el-input type="textarea" :rows="5" size="small" v-model="scope.row.comments" placeholder="酒店一般用餐时间为午餐12:00-14:00、晚餐18:00-20:00，如有特殊需求请在此注明。"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="is_important" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="deleteFoodDemand(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mar_20" type="primary" size="medium" @click="addFoodDemand">添加酒店外餐饮需求</el-button>
    </div>
  </div>
</template>

<script>
import inputFilter from '@/assets/js/filter'
export default {
  name: 'foodDemand',
  props: ['foodList'],
  directives: {
    inputFilter
  },
  data() {
    return {
      is_food_outside: '1', //e 餐饮(0:不需要1：需要) 当为1时需要关联餐饮需求表
      food_outside_budget: 0, // 餐饮需求总预算
      food_limit: 0, // 餐标
      dateArr: [],
      FoodOutside: [], // 用餐类型
      foodBudgetList: [
        {
          id: '',
          event_info_id: '', // 会议ID
          food_date: '', // 日期
          food_time: '', // 用餐时间 0是午餐，1是晚餐
          food_count: '', // 用餐人数
          food_type: '', // 用餐类型
          comments: '' // 备注
        }
      ]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.foodBudgetList.forEach(item => {
        if (!item.food_date) {
          item.food_date = this.dateArr[0]
        }
      })
    })
  },
  methods: {
    formatNum() {
      let temp = this.food_outside_budget.toString()
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
      this.food_outside_budget = temp
    },
    isSHow() {
      return this.foodBudgetList.length < this.dateArr.length
    },
    // 删除餐饮需求
    deleteFoodDemand(id) {
      if (id === 0 && this.foodBudgetList.length === 1) {
        this.is_food_beverag = '0'
      } else {
        this.foodBudgetList.splice(id, 1)
      }
    },
    // 添加餐饮需求
    addFoodDemand() {
      if (this.is_food_outside == 0) {
        this.is_food_outside = '1'
        return
      }
      let id = this.foodBudgetList.length - 1
      let item = { ...this.foodBudgetList[id] }
      item.id = ''
      this.foodBudgetList.push(item)
    }
  }
}
</script>

<style scoped>
</style>
