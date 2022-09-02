<template>
  <div class="other">
    <div class="demand_item">
      <div class="demand_top flex_row justify_between">
        <div class="demand_name flex_row align_center">
          <div style="margin-right: 20px">其它服务 Other 必填内容若无服务，请填写1</div>
        </div>
        <!-- <div class="budget flex_row align_center">
          <span class="nowrap mar_r10">项目预算 &nbsp;Total Accommodation Budget</span>
          <el-input v-model="other_budget" placeholder="非必填" type="text" size="small" @input="formatNum()"></el-input>
        </div> -->
      </div>
      <div class="demand_main">
        <div>
          <div class="equipment_tag">
            <span @click="selectTagTap(item)" :class="item.is_delete == 0?'select_tag':''"
                  v-for="(item,idx) in otherList" :key="idx">{{item.order_name}}</span>

            <!-- <span @click="addOtherDemand">+增加其他</span> -->
          </div>
          <div>
            <div v-for="(item,key) in otherAddList" :key="key" >
              <div class="mar_b10 flex_row">
                <!-- <div v-for="(tagItem,tagIndex) in item.Detaile" :key="tagIndex" class="mar_b10 flex_row"> -->
                  <span class="dis_block demand_100 text_left" style="padding-right: 30px;line-height: 32px;">{{item.order_name}}</span>
                  
                  <div style="min-width:200px">
                    <el-select 
                      v-show="['009-5','009-6','009-7','009-11','009-12'].includes(item.order_code)" 
                      v-model="item.two_level_code" 
                      clearable size="small" style="width:200px"
                    >
                      <el-option v-for="option in item.detail" :key="option.order_code" :label="option.order_name" :value="option.order_code"></el-option>
                    </el-select>
                  </div>
                  
                  <div style="min-width:150px">
                    <span class="dis_block demand_50">数量</span>
                    <el-input v-model.number="item.participate_count" size="small" v-input-filter:int class="demand_100"></el-input>
                  </div>
                    
                  <el-input v-model="item.describe" clearable placeholder="请填写针对这个项目的特殊需求" size="small" class="mar_l20" style="width: 50%"></el-input>
                  <i class="pad_lr5 pad_tb5 el-icon-close mar_r20" @click="deleteOther(key)" style="cursor: pointer;font-size: 22px; line-height: 32px;"></i>
                <!-- </div> -->
              </div>
            </div>
          </div>

          <!-- 新增其他 -->
          <div class="other_list mar_t10">
            <div v-for="(item, otherIndex) in otherCustom" :key="otherIndex" class="flex_row align_center mar_b10">
              <div class="mar_b10 flex_row">
                <!-- <div v-for="(tagItem,tagIndex) in item.Detaile" :key="tagIndex" class="mar_b10 flex_row"> -->
                  <span class="dis_block demand_100 text_left" style="padding-right: 30px;line-height: 32px;">{{item.order_name}}</span>
                  <div style="min-width:200px">
                    <el-select 
                      v-model="item.two_level_code" 
                      clearable size="small" style="width:200px"
                    >
                      <el-option v-for="option in item.detail" :key="option.order_code" :label="option.order_name" :value="option.order_code"></el-option>
                    </el-select>
                  </div>
                  <div style="min-width:150px">
                    <span class="dis_block demand_50">数量</span>
                    <el-input v-model.number="item.participate_count" size="small" v-input-filter:int class="demand_100"></el-input>
                    
                  </div>
                  <!-- <el-input v-model="item.describe" clearable placeholder="请填写针对这个项目的特殊需求" size="small" class="mar_l20" style="width: 50%"></el-input> -->
                  <el-input v-model="item.describe" clearable placeholder="请填写针对这个项目的特殊需求" size="small" class="mar_l20" style="width: 50%"></el-input>
                  <i class="pad_lr5 pad_tb5 el-icon-close mar_r20" @click="deleteCustom(otherIndex)" style="cursor: pointer;font-size: 22px; line-height: 32px;"></i>
                <!-- </div> -->
              </div>
              
              <!-- <span class="dis_block" style="padding-right: 163px">{{item.order_name}}</span>
              <el-input placeholder="请填写针对这个项目的特殊需求" clearable size="small" v-model="item.describe" style="width: 800px"></el-input>
              <i class="pad_lr5 pad_tb5 el-icon-close mar_r20" @click="deleteCustom(otherIndex)" style="cursor: pointer;font-size: 22px"></i> -->
            </div>
          </div>
          <el-input class="mar_t10" v-model="order_describe" type="textarea" size="small" :rows="6" placeholder="如果您还有什么额外的需求，请在此填写..."></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import inputFilter from '@/assets/js/filter';
export default {
  name: "other",
  directives: {
    inputFilter
  },
  data(){
    return{
      is_other: '', // 其他 (0：不需要 1:需要) 当为1时需要关联其他关系表
      other_budget: 0, // 其他总预算
      order_describe: '', // 需求描述
      otherList:[],
      otherCustom:[],
      otherAddList:[],
    }
  },
  mounted() {

  },
  updated(){
    // debugger
    console.log(this.otherAddList)
  },
  methods:{
    selectTagTap(item) {
      let other = {
        id: '',
        event_info_id: this.$route.query.id,
        order_code: item.order_code,
        order_name: item.order_name,
        two_level_code: '',
        type: 0,
        participate_count:'',
        describe:'',
        detail: item.detail
      };

      this.otherAddList.splice(this.otherAddList.length,0, other)

    },
    addOtherDemand() {
      let other = {
        id: '',
        order_name:'其他'+(this.otherCustom.length+1),
        participate_count: "" ,
        describe:''
      };
      this.otherCustom.splice(this.otherCustom.length,0, other)
    },
    deleteOther(id){
      this.otherAddList.splice(id, 1)
    },
    deleteCustom(id) {
      this.otherCustom.splice(id, 1)
    },
    formatNum(){
      let temp = this.other_budget.toString();
      temp = temp.replace(/。/g, ".");
      temp = temp.replace(/\b(0+)/gi,"");
      temp = temp.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
      temp = temp.replace(/^\./g, ""); //验证第一个字符是数字
      temp = temp.replace(/\.{2,}/g, ""); //只保留第一个, 清除多余的
      temp = temp.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
      this.other_budget = temp
    },
  },
}
</script>

<style scoped>

</style>
