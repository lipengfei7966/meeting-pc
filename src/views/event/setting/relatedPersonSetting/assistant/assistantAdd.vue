<template>
  <div class="addPrincipal">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }" class="el-breadcrumb-item">
        首页
        <!-- <span class="rights">></span> ···· -->
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{name: 'relatedPersonSetting'}" class="el-bread-item">会议相关人员配置</el-breadcrumb-item>
      <el-breadcrumb-item class="el-bread-item">编辑会议助理规则</el-breadcrumb-item>
    </el-breadcrumb>

    <p style="font-size: 17px; padding: 15px 0">新建/编辑会议助理规则 </p>

    <el-form ref="headeRuleForm" :model="formData" :rules="rules" label-width="250px" label-position="left" class="addPrincipalForm">
      <el-form-item label="助理用户:" prop="username">
        <el-select v-model="formData.username" size="small" filterable placeholder="请选择">
          <el-option v-for="item in userNameList" :key="item.username" :label="item.fullname" :value="item.username">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户:" prop="company_id">
        <el-select v-model="formData.company_id" size="small" filterable @change="changeCustomer" placeholder="请选择">
          <el-option v-for="item in customerList" :key="item.id" :label="item.shortname" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会议类型:">
        <el-checkbox-group v-model="formData.meeting_type">
          <el-checkbox v-for="item in meetingTypeList" @change="chooseItem($event, item.id)" :value="item.id" :key="item.id" :label="item.name">
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="会议城市:">
        <el-select v-model="formData.city_code" size="small" multiple filterable placeholder="请选择">
          <el-option v-for="item in meetingCityList" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="会议指定供应商:" prop="service">
        <el-select v-model="formData.service" size="small" multiple filterable placeholder="请选择">
          <el-option v-for="item in serviceList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="会议创建用户:" prop="user_name_list">
        <el-select v-model="formData.user_name_list" size="small" multiple filterable placeholder="请选择">
          <el-option v-for="item in userNameList" :key="item.username" :label="item.fullname" :value="item.username">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div style="text-align: center">
      <el-button type="primary" @click="save" :disabled="saveDisabled">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>

  </div>
</template>

<script scoped>
export default {
  data: function() {
    return {
      formData:{
        id:'',
        username:'',
        company_id:'',
        meeting_type:[],
        city_code:[],
        service: [],
        user_name_list: []
      },
      checkedMeetingTypes: [], 
      checkedMeetingTypeIDs:[], // 选中会议类型 ID
      selectCityCodes: [],

      userNameList:[],
      customerList:[],
      meetingTypeList:[], // 客户所有会议类型
      meetingCityList:[], // 会议省份直辖市
      serviceList: [], // 服务商列表
      saveDisabled: false, // 保存按钮是否禁用
      rules: {
        username: [{ required: true, message: '请选择会议助理用户', trigger: 'change' }],
        company_id: [{ required: true, message: '请选择客户', trigger: 'change' }],
      }
    }
  },
  watch:{
    meetingTypeList: {
      handler(newVal, oldVal) {
        this.meetingTypeList.forEach(item => {
          this.formData.meeting_type.forEach(element => {
            if(item.name === element){
              // this.formData.meeting_type.push(item.name)
              this.checkedMeetingTypeIDs.push(item.id)
            }
          })
        })
      },
      deep: true
  }
  },
  mounted(){
    this.ProvinceCity();
    this.GetUser();
    this.getCompany();
    this.GetService();
    if(this.$route.query.id){
      this.OwnerRuleEdit();
    }
    
  },
  methods: {
    // 编辑信息查询
    OwnerRuleEdit(){
      this.requestApi({
        url: '/InfoConfig/OwnerRuleEdi',
        method: 'POST',
        data: {id:this.$route.query.id},
      }).then(res => {
        this.formData.id = res.id;
        this.formData.username = res.username;
        this.formData.company_id = Number(res.company_id);
        this.GetMeetingType(this.formData.company_id)
        this.formData.meeting_type = res.meeting_type.split(',');

        // this.checkedMeetingTypeIDs  = res.meeting_type.split(',');
        if(res.city_code){
          this.formData.city_code = res.city_code.split(',');
        }
        if(res.service){
          res.service.forEach(item => {
            this.formData.service.push(item.serviceid) 
          })
        }
        if(res.user_name_list){
          res.user_name_list.forEach(item => {
            this.formData.user_name_list.push(item.username) 
          })
        }
        
      })
    },
    // 获取服务商列表
    GetService(){
      this.requestApi({
        url: '/InfoConfig/GetService',
        method: 'POST',
        data: {},
      }).then(res => {
        this.serviceList = res;
      })
    },
    // 负责人用户查询
    GetUser(){
      this.requestApi({
        url: '/MeetingMa/GetUser',
        method: 'POST',
        data: {},
      }).then(res => {
        this.userNameList = res;
      })
    },
    // 客户查询
    getCompany(){
      this.requestApi({
        url: '/MeetingMa/GetCompany',
        method: 'POST',
        data: {},
      }).then(res => {
        this.customerList = res;
      })
    },
    // 会议类型查询
    GetMeetingType(id){
      this.requestApi({
        url: '/MeetingMa/GetMeetingType',
        method: 'POST',
        data: {CompanyID: id},
      }).then(res => {
        this.meetingTypeList = res;
      })
    },
    ProvinceCity(){
      this.requestApi({
        url: '/MeetingMa/ProvinceCity',
        method: 'POST',
        data: {CompanyID: id},
      }).then(res => {
				this.meetingCityList = res;
			})
		},
    // 保存规则信息
    save(){ 
      this.$refs["headeRuleForm"].validate((valid) => {
        if(valid){
          this.saveDisabled = true;
          let Parameter = {
            id: this.formData.id,
            username: this.formData.username,
            company_id: this.formData.company_id,
            meeting_type: this.checkedMeetingTypeIDs.join(','),
            city_code: this.formData.city_code.join(','),
            type: 3, //1、负责人，2、采购人，3、会议助理，4、合规人员
            service: this.formData.service.join(','),
            user_name_list: this.formData.user_name_list.join(','),
          }
          Parameter = JSON.stringify(Parameter)
          this.requestApi({
            url: '/InfoConfig/OwnerRuleSava',
            method: 'POST',
            data: {Parameter},
          }).then( res => {
            if(res){
              this.$message.success('保存成功');
              this.saveDisabled = false;
              this.cancel(); // 返回列表页
            }
          })
        }else{
          this.$message.warning('请完善规则信息')
        }
      })
      
      
    },
    cancel() {
      this.$router.push({name:'relatedPersonSetting',query:{activeName:'third'}})
    },
    changeCustomer(){
      this.GetMeetingType(this.formData.company_id)
    },
    // 选择会议类型
    chooseItem(event, id) {
      // 如果是选中
      if (event) {
        // 把选中的id存入数组
        debugger
        this.checkedMeetingTypeIDs.push(id);
      } else {
        //如果是取消选中则从数组中删除该id
        this.checkedMeetingTypeIDs.splice(this.checkedMeetingTypeIDs.indexOf(id), 1);
      }
    }
  }
}
</script>

<style>
.addPrincipal {
  background: #fff;
  height: 100%;
  max-width: 1300px;
  width: 1300px;
  margin: 0 auto;
  padding: 20px 0;
}
.addPrincipalForm {
  padding: 20px 200px;
}
@media only screen and (max-width: 1600px) {
  .addPrincipal {
    width: 100%;
  }
}
</style>