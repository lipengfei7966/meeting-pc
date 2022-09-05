(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a0bf73f6"],{1568:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"addPrincipal"},[t("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[t("el-breadcrumb-item",{staticClass:"el-breadcrumb-item",attrs:{to:{path:"/"}}},[e._v(" 首页 ")]),t("el-breadcrumb-item",{staticClass:"el-bread-item",attrs:{to:{path:"/distributionParent"}}},[e._v("会议相关人员配置")]),t("el-breadcrumb-item",{staticClass:"el-bread-item"},[e._v("编辑会议采购人规则")])],1),t("p",{staticStyle:{"font-size":"17px",padding:"15px 0"}},[e._v("新建/编辑会议采购人规则 ")]),t("el-form",{ref:"headeRuleForm",staticClass:"addPrincipalForm",attrs:{model:e.formData,rules:e.rules,"label-width":"250px","label-position":"left"}},[t("el-form-item",{attrs:{label:"采购人用户:",prop:"username"}},[t("el-select",{attrs:{size:"small",filterable:"",placeholder:"请选择"},model:{value:e.formData.username,callback:function(t){e.$set(e.formData,"username",t)},expression:"formData.username"}},e._l(e.userNameList,(function(e){return t("el-option",{key:e.username,attrs:{label:e.fullname,value:e.username}})})),1)],1),t("el-form-item",{attrs:{label:"客户:",prop:"company_id"}},[t("el-select",{attrs:{size:"small",filterable:"",placeholder:"请选择"},on:{change:e.changeCustomer},model:{value:e.formData.company_id,callback:function(t){e.$set(e.formData,"company_id",t)},expression:"formData.company_id"}},e._l(e.customerList,(function(e){return t("el-option",{key:e.id,attrs:{label:e.shortname,value:e.id}})})),1)],1),t("el-form-item",{attrs:{label:"会议类型:"}},[t("el-checkbox-group",{model:{value:e.formData.meeting_type,callback:function(t){e.$set(e.formData,"meeting_type",t)},expression:"formData.meeting_type"}},e._l(e.meetingTypeList,(function(i){return t("el-checkbox",{key:i.id,attrs:{value:i.id,label:i.name},on:{change:function(t){return e.chooseItem(t,i.id)}}})})),1)],1),t("el-form-item",{attrs:{label:"会议城市:"}},[t("el-select",{attrs:{size:"small",multiple:"",filterable:"",placeholder:"请选择"},model:{value:e.formData.city_code,callback:function(t){e.$set(e.formData,"city_code",t)},expression:"formData.city_code"}},e._l(e.meetingCityList,(function(e){return t("el-option",{key:e.code,attrs:{label:e.name,value:e.code}})})),1)],1),t("el-form-item",{attrs:{label:"会议指定供应商:",prop:"service"}},[t("el-select",{attrs:{size:"small",multiple:"",filterable:"",placeholder:"请选择"},model:{value:e.formData.service,callback:function(t){e.$set(e.formData,"service",t)},expression:"formData.service"}},e._l(e.serviceList,(function(e){return t("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),t("el-form-item",{attrs:{label:"会议创建用户:",prop:"user_name_list"}},[t("el-select",{attrs:{size:"small",multiple:"",filterable:"",placeholder:"请选择"},model:{value:e.formData.user_name_list,callback:function(t){e.$set(e.formData,"user_name_list",t)},expression:"formData.user_name_list"}},e._l(e.userNameList,(function(e){return t("el-option",{key:e.username,attrs:{label:e.fullname,value:e.username}})})),1)],1)],1),t("div",{staticStyle:{"text-align":"center"}},[t("el-button",{attrs:{type:"primary",disabled:e.saveDisabled},on:{click:e.save}},[e._v("保存")]),t("el-button",{on:{click:e.cancel}},[e._v("取消")])],1)],1)},s=[],r={data:function(){return{formData:{id:"",username:"",company_id:"",meeting_type:[],city_code:[],service:[],user_name_list:[]},checkedMeetingTypes:[],checkedMeetingTypeIDs:[],selectCityCodes:[],userNameList:[],customerList:[],meetingTypeList:[],meetingCityList:[],serviceList:[],saveDisabled:!1,rules:{username:[{required:!0,message:"请选择负责人用户",trigger:"change"}],company_id:[{required:!0,message:"请选择客户",trigger:"change"}]}}},watch:{meetingTypeList:{handler(e,t){this.meetingTypeList.forEach(e=>{this.formData.meeting_type.forEach(t=>{e.name===t&&this.checkedMeetingTypeIDs.push(e.id)})})},deep:!0}},mounted(){this.ProvinceCity(),this.GetUser(),this.getCompany(),this.GetService(),this.$route.query.id&&this.OwnerRuleEdit()},methods:{OwnerRuleEdit(){this.$api.OwnerRuleEdit({id:this.$route.query.id},"POST").then(e=>{this.formData.id=e.id,this.formData.username=e.username,this.formData.company_id=Number(e.company_id),this.GetMeetingType(this.formData.company_id),this.formData.meeting_type=e.meeting_type.split(","),e.city_code&&(this.formData.city_code=e.city_code.split(",")),e.service&&e.service.forEach(e=>{this.formData.service.push(e.serviceid)}),e.user_name_list&&e.user_name_list.forEach(e=>{this.formData.user_name_list.push(e.username)})})},GetService(){this.$api.GetService({},"POST").then(e=>{this.serviceList=e})},GetUser(){this.$api.GetUser({},"POST").then(e=>{this.userNameList=e})},getCompany(){this.$api.getCompany({},"POST").then(e=>{this.customerList=e})},GetMeetingType(e){this.$api.GetMeetingType({CompanyID:e},"PSOT").then(e=>{this.meetingTypeList=e})},ProvinceCity(){this.$api.ProvinceCity({},"POST").then(e=>{this.meetingCityList=e})},save(){this.$refs["headeRuleForm"].validate(e=>{if(e){this.saveDisabled=!0;let e={id:this.formData.id,username:this.formData.username,company_id:this.formData.company_id,meeting_type:this.checkedMeetingTypeIDs.join(","),city_code:this.formData.city_code.join(","),type:2,service:this.formData.service.join(","),user_name_list:this.formData.user_name_list.join(",")};e=JSON.stringify(e),this.$api.OwnerRuleSava({Parameter:e},"PSOT").then(e=>{e&&(this.$message.success("保存成功"),this.saveDisabled=!1,this.cancel())})}else this.$message.warning("请完善规则信息")})},cancel(){this.$router.push({path:"/distributionParent",query:{activeName:"first"}})},changeCustomer(){this.GetMeetingType(this.formData.company_id)},chooseItem(e,t){e?this.checkedMeetingTypeIDs.push(t):this.checkedMeetingTypeIDs.splice(this.checkedMeetingTypeIDs.indexOf(t),1)}}},l=r,n=(i("2d0f"),i("0b56")),o=Object(n["a"])(l,a,s,!1,null,null,null);t["default"]=o.exports},"2d0f":function(e,t,i){"use strict";i("bc09")},bc09:function(e,t,i){}}]);