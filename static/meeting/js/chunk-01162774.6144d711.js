(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01162774"],{"1a65":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content"},[e._m(0),a("div",{staticClass:"approval-body"},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"122px"}},[a("el-form-item",{attrs:{label:"审批步骤名称",prop:"approve_name"}},[a("el-input",{model:{value:e.ruleForm.approve_name,callback:function(t){e.$set(e.ruleForm,"approve_name",t)},expression:"ruleForm.approve_name"}})],1),a("el-form-item",{attrs:{label:"备注/描述"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.remarks,callback:function(t){e.$set(e.ruleForm,"remarks",t)},expression:"ruleForm.remarks"}})],1),a("el-form-item",{attrs:{label:"审批条件"}},[a("el-row",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.complianceMeal=!0}}},[e._v("添加条件/Add Condition")])],1)],1),a("el-form-item",{attrs:{label:"审批人"}},[a("el-checkbox-group",{model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}},[a("div",{staticStyle:{"margin-left":"100px"}},[a("el-radio",{attrs:{label:0},model:{value:e.aa,callback:function(t){e.aa=t},expression:"aa"}},[e._v("内部审批")])],1),a("div",[a("el-radio",{staticStyle:{"margin-left":"120px"},attrs:{label:0},on:{change:function(t){e.ruleForm.designated_personnel_bit=null}},model:{value:e.ruleForm.relevant_personnel_bit,callback:function(t){e.$set(e.ruleForm,"relevant_personnel_bit",t)},expression:"ruleForm.relevant_personnel_bit"}},[e._v("相关人员")])],1),a("div",{staticStyle:{"margin-left":"140px"}},[a("el-checkbox-group",{model:{value:e.ruleForm.relevant_personnel,callback:function(t){e.$set(e.ruleForm,"relevant_personnel",t)},expression:"ruleForm.relevant_personnel"}},[a("el-checkbox",{attrs:{label:"会议创建人",name:"type"}}),a("el-checkbox",{attrs:{label:"会议Owner",name:"type"}}),a("el-checkbox",{attrs:{label:"会议Owner的直属上级",name:"type"}}),a("el-checkbox",{attrs:{label:"会议指定采购",name:"type"}}),a("el-checkbox",{attrs:{label:"会议指定合规人员",name:"type"}}),a("el-checkbox",{attrs:{label:"结算员",name:"type"}})],1)],1),a("div",{staticStyle:{"margin-left":"120px"}},[a("el-radio",{attrs:{label:0},on:{change:function(t){e.ruleForm.relevant_personnel_bit=null}},model:{value:e.ruleForm.designated_personnel_bit,callback:function(t){e.$set(e.ruleForm,"designated_personnel_bit",t)},expression:"ruleForm.designated_personnel_bit"}},[e._v("指定人员")])],1),a("div",[a("el-row",[a("el-button",{staticStyle:{padding:"7px 6px","font-size":"7px","margin-left":"50px"},attrs:{type:"primary"},on:{click:e.addList}},[e._v("添加")])],1)],1),a("div",{staticStyle:{"margin-left":"100px"}},[a("el-radio",{attrs:{disabled:""},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[e._v(" 第三方审批 "),a("span",[e._v("该审批暂不支持第三方审批")])])],1)])],1),a("el-form-item",{attrs:{label:"审批通知"}},[a("div",{staticStyle:{"margin-left":"100px"}},[a("el-checkbox",{attrs:{label:"给审批人发送短信",name:"type"},model:{value:e.ruleForm.short_message,callback:function(t){e.$set(e.ruleForm,"short_message",t)},expression:"ruleForm.short_message"}})],1),a("div",{staticStyle:{"margin-left":"100px"}},[a("el-checkbox",{attrs:{label:"给审批人发送邮件",name:"type"},model:{value:e.ruleForm.mail,callback:function(t){e.$set(e.ruleForm,"mail",t)},expression:"ruleForm.mail"}})],1),a("div",{staticStyle:{"margin-left":"100px"}},[a("el-checkbox",{attrs:{label:"给指定人员发送邮件",name:"type"},model:{value:e.ruleForm.appoint_mail_bit,callback:function(t){e.$set(e.ruleForm,"appoint_mail_bit",t)},expression:"ruleForm.appoint_mail_bit"}})],1),a("div",[a("el-row",[a("el-button",{staticStyle:{padding:"7px 6px","font-size":"7px","margin-left":"50px"},attrs:{type:"primary"},on:{click:e.addList}},[e._v("添加")])],1)],1)]),a("el-form-item",{attrs:{label:"供应商催审"}},[a("el-checkbox-group",{model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}},[a("div",{staticStyle:{"margin-left":"100px"}},[a("el-checkbox",{attrs:{label:"允许供应商催审",name:"type"}})],1)])],1),a("el-form-item",{attrs:{label:"审批超时处理",prop:"type"}},[a("span",{staticStyle:{"margin-left":"110px",display:"flex"}},[e._v("超过")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.ruleForm.overtime,expression:"ruleForm.overtime"}],staticStyle:{width:"100px",height:"30px","margin-left":"155px","margin-top":"-36px",position:"absolute"},attrs:{name:"",id:"",cols:"30",rows:"10"},domProps:{value:e.ruleForm.overtime},on:{input:function(t){t.target.composing||e.$set(e.ruleForm,"overtime",t.target.value)}}}),e._v(" 小时不审核，则 "),a("div",{staticStyle:{"margin-left":"120px"}},[a("el-checkbox",{attrs:{label:"自动审批通过",name:"type"},model:{value:e.ruleForm.adopt,callback:function(t){e.$set(e.ruleForm,"adopt",t)},expression:"ruleForm.adopt"}})],1),a("div",{staticStyle:{"margin-left":"120px"}},[a("el-checkbox",{attrs:{label:"再次通知审批人（仅一次）",name:"type"},model:{value:e.ruleForm.notify_approver_again,callback:function(t){e.$set(e.ruleForm,"notify_approver_again",t)},expression:"ruleForm.notify_approver_again"}})],1),a("div",{staticStyle:{"margin-left":"120px"}},[a("el-checkbox",{attrs:{label:"通知相关人员",name:"type"},model:{value:e.ruleForm.notice_relevant_personnel_bit,callback:function(t){e.$set(e.ruleForm,"notice_relevant_personnel_bit",t)},expression:"ruleForm.notice_relevant_personnel_bit"}})],1),a("div",{staticStyle:{"margin-left":"140px"}},[a("el-checkbox",{attrs:{label:"会议创建人",name:"type"}}),a("el-checkbox",{attrs:{label:"会议Owner",name:"type"}}),a("el-checkbox",{attrs:{label:"会议Owner的直属上级",name:"type"}}),a("el-checkbox",{attrs:{label:"会议申请部门的领导",name:"type"}}),a("el-checkbox",{attrs:{label:"会议指定合规人员",name:"type"}})],1),a("div",{staticStyle:{"margin-left":"120px"}},[a("el-checkbox",{attrs:{label:"指定人员",name:"type"},model:{value:e.ruleForm.notice_designated_personnel_bit,callback:function(t){e.$set(e.ruleForm,"notice_designated_personnel_bit",t)},expression:"ruleForm.notice_designated_personnel_bit"}})],1),a("div",[a("el-row",[a("el-button",{staticStyle:{padding:"7px 6px","font-size":"7px","margin-left":"50px"},attrs:{type:"primary"},on:{click:e.addList}},[e._v("添加")])],1)],1),a("el-dialog",{attrs:{title:"查找指定人员",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("select",{staticClass:"approval-select condition-var",staticStyle:{width:"350px"}},[a("option",{attrs:{value:"department"}},[e._v("会议部门")]),a("option",{attrs:{value:"event_type"}},[e._v("会议类型")]),a("option",{attrs:{value:"dmc_staff_num"}},[e._v("旅行社陪同人员")]),a("option",{attrs:{value:"event_total_budget"}},[e._v("会议总预算")]),a("option",{attrs:{value:"event_start_date"}},[e._v("会议开始日期")]),a("option",{attrs:{value:"bill_amount"}},[e._v("结算金额")])]),a("select",{staticClass:"approval-select condition-var",staticStyle:{width:"350px"}},[a("option",{attrs:{value:"department"}},[e._v("会议部门")]),a("option",{attrs:{value:"event_type"}},[e._v("会议类型")]),a("option",{attrs:{value:"dmc_staff_num"}},[e._v("旅行社陪同人员")]),a("option",{attrs:{value:"event_total_budget"}},[e._v("会议总预算")]),a("option",{attrs:{value:"event_start_date"}},[e._v("会议开始日期")]),a("option",{attrs:{value:"bill_amount"}},[e._v("结算金额")])]),a("select",{staticClass:"approval-select condition-var",staticStyle:{width:"350px"}},[a("option",{attrs:{value:"department"}},[e._v("会议部门")]),a("option",{attrs:{value:"event_type"}},[e._v("会议类型")]),a("option",{attrs:{value:"dmc_staff_num"}},[e._v("旅行社陪同人员")]),a("option",{attrs:{value:"event_total_budget"}},[e._v("会议总预算")]),a("option",{attrs:{value:"event_start_date"}},[e._v("会议开始日期")]),a("option",{attrs:{value:"bill_amount"}},[e._v("结算金额")])]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)])],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("保存")]),a("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("取消")])],1)],1)],1),a("el-dialog",{attrs:{title:"添加/编辑条件",visible:e.complianceMeal,width:"50%",center:""},on:{"update:visible":function(t){e.complianceMeal=t}}},[a("div",[a("span",[e._v("if")]),a("select",{staticClass:"approval-select condition-var",staticStyle:{width:"150px"}},[a("option",{attrs:{value:"department"}},[e._v("会议部门")]),a("option",{attrs:{value:"event_type"}},[e._v("会议类型")]),a("option",{attrs:{value:"dmc_staff_num"}},[e._v("旅行社陪同人员")]),a("option",{attrs:{value:"event_total_budget"}},[e._v("会议总预算")]),a("option",{attrs:{value:"event_start_date"}},[e._v("会议开始日期")]),a("option",{attrs:{value:"bill_amount"}},[e._v("结算金额")])]),a("select",{staticClass:"approval-select condition-operator"},[a("option",{attrs:{value:"yes"}},[e._v("是")]),a("option",{attrs:{value:"no"}},[e._v("不是")])]),a("select",{directives:[{name:"show",rawName:"v-show",value:e.size,expression:"size"},{name:"model",rawName:"v-model",value:e.sizeindex,expression:"sizeindex"}],staticClass:"approval-select condition-operator",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.sizeindex=t.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"min"}},[e._v("小于")]),a("option",{attrs:{value:"max"}},[e._v("大于等于")])]),a("input",{directives:[{name:"show",rawName:"v-show",value:e.operator,expression:"operator"}],staticStyle:{height:"33px",border:"1px solid #dedfe6"},attrs:{type:"text",name:"",id:"",placeholder:"请输入内容"}}),a("a",{staticClass:"approval-a multi",on:{click:e.elect}},[e._v("选择")]),a("el-dialog",{attrs:{title:"请选择",visible:e.mataddialogVisible,width:"30%"},on:{"update:visible":function(t){e.mataddialogVisible=t}}},[a("div",{staticClass:"comlist"},e._l(e.meetList,(function(t,l){return a("el-checkbox",{key:l,model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"item.value"}},[e._v(e._s(t.name))])})),1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.mataddialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)]),a("a",{staticClass:"approval-empty del"},[e._v("删除")])],1),a("span",{staticClass:"addevent"},[e._v("添加条件")]),a("div",{staticClass:"thread"}),a("div",{staticClass:"text"},[a("p",{staticStyle:{"margin-top":"10px"}},[e._v("条件预览")]),a("textarea",{staticClass:"frame",attrs:{name:"",id:"",cols:"30",rows:"10"}})]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.complianceMeal=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.complianceMeal=!1}}},[e._v("确定")])],1)])],1)},o=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"approval-box"},[a("div",{staticClass:"approval-title"},[e._v("添加审批步骤")])])}],i=(a("e9c4"),a("d3b7"),{data:function(){return{aa:0,size:!1,sizeindex:"min",operator:!1,complianceMeal:!1,mataddialogVisible:!1,dialogVisible:!1,input:"",radio:"1",ruleForm:{approve_name:"",remarks:"",designated_personnel_bit:null,relevant_personnel_bit:null,relevant_personnel:"",designated_personnel:"",multi_level_approval:null,short_message:null,mail:null,appoint_mail_bit:null,appoint_mail:null,overtime:null,adopt:null,notify_approver_again:!1,notice_relevant_personnel_bit:null,notice_relevant_personnel:null,notice_designated_personnel_bit:null,notice_designated_personnel:null,type:""},rules:{approve_name:[{required:!0,message:"请输入审批步骤名称",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}]},value:"",meetList:[{name:"HZ_外部会-多项服务",value:!1},{name:"LY_外部会-单项服务",value:!1}]}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;var a=JSON.parse(JSON.stringify(t.ruleForm));["short_message","mail","appoint_mail_bit","adopt","notify_approver_again","notice_relevant_personnel_bit","notice_designated_personnel_bit"].forEach((function(e){a[e]=a[e]?0:1})),a.id="",a.relevant_personnel="5",t.$api.save({id:"",approve_name:"第一步",remarks:"1",relevant_personnel_bit:"1",relevant_personnel:"1",designated_personnel_bit:"0",designated_personnel:"MZH,MLF",multi_level_approval_bit:"1",multi_level_approval:"1",short_message:"1",mail:"1",appoint_mail_bit:"1",appoint_mail:"1",overtime:"3",adopt:"1",notify_approver_again:"0",notice_relevant_personnel_bit:"1",notice_relevant_personnel:"1",notice_designated_personnel_bit:"1",notice_designated_personnel:"1",type:"2"},"POST").then((function(e){console.log(e)})),console.log(a)}))},resetForm:function(e){this.$refs[e].resetFields(),this.$router.push("/outbid")},elect:function(){this.mataddialogVisible=!0},addList:function(){this.dialogVisible=!0}},mounted:function(){var e=this,t=this.$route.query.id;this.$api.detail({ID:t,type:this.$route.query.type},"POST").then((function(t){["short_message","mail","appoint_mail_bit","adopt","notify_approver_again","notice_relevant_personnel_bit","notice_designated_personnel_bit"].forEach((function(e){console.log(t[e]),t[e]=1!=t[e]})),console.log(t),e.ruleForm=t}))}}),n=i,r=(a("95cb"),a("2877")),s=Object(r["a"])(n,l,o,!1,null,"3c911000",null);t["default"]=s.exports},"67a5":function(e,t,a){},"95cb":function(e,t,a){"use strict";a("67a5")}}]);