(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0dc389f8"],{"1a65":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[e._m(0),t("div",{staticClass:"approval-body"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"122px"}},[t("el-form-item",{attrs:{label:"审批步骤名称",prop:"approve_name"}},[t("el-input",{model:{value:e.ruleForm.approve_name,callback:function(t){e.$set(e.ruleForm,"approve_name",t)},expression:"ruleForm.approve_name"}})],1),t("el-form-item",{attrs:{label:"备注/描述"}},[t("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.remarks,callback:function(t){e.$set(e.ruleForm,"remarks",t)},expression:"ruleForm.remarks"}})],1),t("el-form-item",{attrs:{label:"审批条件"}},[t("el-row",[t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.complianceMeal=!0}}},[e._v("添加条件/Add Condition")])],1)],1),t("el-form-item",{attrs:{label:"审批人"}},[t("el-checkbox-group",{model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}},[t("div",{staticStyle:{"margin-left":"100px"}},[t("el-radio",{attrs:{label:0},model:{value:e.aa,callback:function(t){e.aa=t},expression:"aa"}},[e._v("内部审批")])],1),t("div",[t("el-radio",{staticStyle:{"margin-left":"120px"},attrs:{label:0},on:{change:function(t){e.ruleForm.designated_personnel_bit=null}},model:{value:e.ruleForm.relevant_personnel_bit,callback:function(t){e.$set(e.ruleForm,"relevant_personnel_bit",t)},expression:"ruleForm.relevant_personnel_bit"}},[e._v("相关人员")])],1),t("div",{staticStyle:{"margin-left":"140px"}},[t("el-checkbox-group",{model:{value:e.ruleForm.relevant_personnel,callback:function(t){e.$set(e.ruleForm,"relevant_personnel",t)},expression:"ruleForm.relevant_personnel"}},[t("el-checkbox",{attrs:{label:"会议创建人",name:"type"}}),t("el-checkbox",{attrs:{label:"会议Owner",name:"type"}}),t("el-checkbox",{attrs:{label:"会议Owner的直属上级",name:"type"}}),t("el-checkbox",{attrs:{label:"会议指定采购",name:"type"}}),t("el-checkbox",{attrs:{label:"会议指定合规人员",name:"type"}}),t("el-checkbox",{attrs:{label:"结算员",name:"type"}})],1)],1),t("div",{staticStyle:{"margin-left":"120px"}},[t("el-radio",{attrs:{label:0},on:{change:function(t){e.ruleForm.relevant_personnel_bit=null}},model:{value:e.ruleForm.designated_personnel_bit,callback:function(t){e.$set(e.ruleForm,"designated_personnel_bit",t)},expression:"ruleForm.designated_personnel_bit"}},[e._v("指定人员")])],1),t("div",[t("el-row",[t("el-button",{staticStyle:{padding:"7px 6px","font-size":"7px","margin-left":"50px"},attrs:{type:"primary"},on:{click:e.addList}},[e._v("添加")])],1)],1),t("div",{staticStyle:{"margin-left":"100px"}},[t("el-radio",{attrs:{disabled:""},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[e._v(" 第三方审批 "),t("span",[e._v("该审批暂不支持第三方审批")])])],1)])],1),t("el-form-item",{attrs:{label:"审批通知"}},[t("div",{staticStyle:{"margin-left":"100px"}},[t("el-checkbox",{attrs:{label:"给审批人发送短信",name:"type"},model:{value:e.ruleForm.short_message,callback:function(t){e.$set(e.ruleForm,"short_message",t)},expression:"ruleForm.short_message"}})],1),t("div",{staticStyle:{"margin-left":"100px"}},[t("el-checkbox",{attrs:{label:"给审批人发送邮件",name:"type"},model:{value:e.ruleForm.mail,callback:function(t){e.$set(e.ruleForm,"mail",t)},expression:"ruleForm.mail"}})],1),t("div",{staticStyle:{"margin-left":"100px"}},[t("el-checkbox",{attrs:{label:"给指定人员发送邮件",name:"type"},model:{value:e.ruleForm.appoint_mail_bit,callback:function(t){e.$set(e.ruleForm,"appoint_mail_bit",t)},expression:"ruleForm.appoint_mail_bit"}})],1),t("div",[t("el-row",[t("el-button",{staticStyle:{padding:"7px 6px","font-size":"7px","margin-left":"50px"},attrs:{type:"primary"},on:{click:e.addList}},[e._v("添加")])],1)],1)]),t("el-form-item",{attrs:{label:"供应商催审"}},[t("el-checkbox-group",{model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}},[t("div",{staticStyle:{"margin-left":"100px"}},[t("el-checkbox",{attrs:{label:"允许供应商催审",name:"type"}})],1)])],1),t("el-form-item",{attrs:{label:"审批超时处理",prop:"type"}},[t("span",{staticStyle:{"margin-left":"110px",display:"flex"}},[e._v("超过")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.ruleForm.overtime,expression:"ruleForm.overtime"}],staticStyle:{width:"100px",height:"30px","margin-left":"155px","margin-top":"-36px",position:"absolute"},attrs:{name:"",id:"",cols:"30",rows:"10"},domProps:{value:e.ruleForm.overtime},on:{input:function(t){t.target.composing||e.$set(e.ruleForm,"overtime",t.target.value)}}}),e._v(" 小时不审核，则 "),t("div",{staticStyle:{"margin-left":"120px"}},[t("el-checkbox",{attrs:{label:"自动审批通过",name:"type"},model:{value:e.ruleForm.adopt,callback:function(t){e.$set(e.ruleForm,"adopt",t)},expression:"ruleForm.adopt"}})],1),t("div",{staticStyle:{"margin-left":"120px"}},[t("el-checkbox",{attrs:{label:"再次通知审批人（仅一次）",name:"type"},model:{value:e.ruleForm.notify_approver_again,callback:function(t){e.$set(e.ruleForm,"notify_approver_again",t)},expression:"ruleForm.notify_approver_again"}})],1),t("div",{staticStyle:{"margin-left":"120px"}},[t("el-checkbox",{attrs:{label:"通知相关人员",name:"type"},model:{value:e.ruleForm.notice_relevant_personnel_bit,callback:function(t){e.$set(e.ruleForm,"notice_relevant_personnel_bit",t)},expression:"ruleForm.notice_relevant_personnel_bit"}})],1),t("div",{staticStyle:{"margin-left":"140px"}},[t("el-checkbox",{attrs:{label:"会议创建人",name:"type"}}),t("el-checkbox",{attrs:{label:"会议Owner",name:"type"}}),t("el-checkbox",{attrs:{label:"会议Owner的直属上级",name:"type"}}),t("el-checkbox",{attrs:{label:"会议申请部门的领导",name:"type"}}),t("el-checkbox",{attrs:{label:"会议指定合规人员",name:"type"}})],1),t("div",{staticStyle:{"margin-left":"120px"}},[t("el-checkbox",{attrs:{label:"指定人员",name:"type"},model:{value:e.ruleForm.notice_designated_personnel_bit,callback:function(t){e.$set(e.ruleForm,"notice_designated_personnel_bit",t)},expression:"ruleForm.notice_designated_personnel_bit"}})],1),t("div",[t("el-row",[t("el-button",{staticStyle:{padding:"7px 6px","font-size":"7px","margin-left":"50px"},attrs:{type:"primary"},on:{click:e.addList}},[e._v("添加")])],1)],1),t("el-dialog",{attrs:{title:"查找指定人员",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("select",{staticClass:"approval-select condition-var",staticStyle:{width:"350px"}},[t("option",{attrs:{value:"department"}},[e._v("会议部门")]),t("option",{attrs:{value:"event_type"}},[e._v("会议类型")]),t("option",{attrs:{value:"dmc_staff_num"}},[e._v("旅行社陪同人员")]),t("option",{attrs:{value:"event_total_budget"}},[e._v("会议总预算")]),t("option",{attrs:{value:"event_start_date"}},[e._v("会议开始日期")]),t("option",{attrs:{value:"bill_amount"}},[e._v("结算金额")])]),t("select",{staticClass:"approval-select condition-var",staticStyle:{width:"350px"}},[t("option",{attrs:{value:"department"}},[e._v("会议部门")]),t("option",{attrs:{value:"event_type"}},[e._v("会议类型")]),t("option",{attrs:{value:"dmc_staff_num"}},[e._v("旅行社陪同人员")]),t("option",{attrs:{value:"event_total_budget"}},[e._v("会议总预算")]),t("option",{attrs:{value:"event_start_date"}},[e._v("会议开始日期")]),t("option",{attrs:{value:"bill_amount"}},[e._v("结算金额")])]),t("select",{staticClass:"approval-select condition-var",staticStyle:{width:"350px"}},[t("option",{attrs:{value:"department"}},[e._v("会议部门")]),t("option",{attrs:{value:"event_type"}},[e._v("会议类型")]),t("option",{attrs:{value:"dmc_staff_num"}},[e._v("旅行社陪同人员")]),t("option",{attrs:{value:"event_total_budget"}},[e._v("会议总预算")]),t("option",{attrs:{value:"event_start_date"}},[e._v("会议开始日期")]),t("option",{attrs:{value:"bill_amount"}},[e._v("结算金额")])]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)])],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("保存")]),t("el-button",{on:{click:function(t){return e.resetForm("ruleForm")}}},[e._v("取消")])],1)],1)],1),t("el-dialog",{attrs:{title:"添加/编辑条件",visible:e.complianceMeal,width:"50%",center:""},on:{"update:visible":function(t){e.complianceMeal=t}}},[t("div",[t("span",[e._v("if")]),t("select",{staticClass:"approval-select condition-var",staticStyle:{width:"150px"}},[t("option",{attrs:{value:"department"}},[e._v("会议部门")]),t("option",{attrs:{value:"event_type"}},[e._v("会议类型")]),t("option",{attrs:{value:"dmc_staff_num"}},[e._v("旅行社陪同人员")]),t("option",{attrs:{value:"event_total_budget"}},[e._v("会议总预算")]),t("option",{attrs:{value:"event_start_date"}},[e._v("会议开始日期")]),t("option",{attrs:{value:"bill_amount"}},[e._v("结算金额")])]),t("select",{staticClass:"approval-select condition-operator"},[t("option",{attrs:{value:"yes"}},[e._v("是")]),t("option",{attrs:{value:"no"}},[e._v("不是")])]),t("select",{directives:[{name:"show",rawName:"v-show",value:e.size,expression:"size"},{name:"model",rawName:"v-model",value:e.sizeindex,expression:"sizeindex"}],staticClass:"approval-select condition-operator",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.sizeindex=t.target.multiple?a:a[0]}}},[t("option",{attrs:{value:"min"}},[e._v("小于")]),t("option",{attrs:{value:"max"}},[e._v("大于等于")])]),t("input",{directives:[{name:"show",rawName:"v-show",value:e.operator,expression:"operator"}],staticStyle:{height:"33px",border:"1px solid #dedfe6"},attrs:{type:"text",name:"",id:"",placeholder:"请输入内容"}}),t("a",{staticClass:"approval-a multi",on:{click:e.elect}},[e._v("选择")]),t("el-dialog",{attrs:{title:"请选择",visible:e.mataddialogVisible,width:"30%"},on:{"update:visible":function(t){e.mataddialogVisible=t}}},[t("div",{staticClass:"comlist"},e._l(e.meetList,(function(a,l){return t("el-checkbox",{key:l,model:{value:a.value,callback:function(t){e.$set(a,"value",t)},expression:"item.value"}},[e._v(e._s(a.name))])})),1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.mataddialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)]),t("a",{staticClass:"approval-empty del"},[e._v("删除")])],1),t("span",{staticClass:"addevent"},[e._v("添加条件")]),t("div",{staticClass:"thread"}),t("div",{staticClass:"text"},[t("p",{staticStyle:{"margin-top":"10px"}},[e._v("条件预览")]),t("textarea",{staticClass:"frame",attrs:{name:"",id:"",cols:"30",rows:"10"}})]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.complianceMeal=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){e.complianceMeal=!1}}},[e._v("确定")])],1)])],1)},o=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"approval-box"},[t("div",{staticClass:"approval-title"},[e._v("添加审批步骤")])])}],i={data(){return{aa:0,size:!1,sizeindex:"min",operator:!1,complianceMeal:!1,mataddialogVisible:!1,dialogVisible:!1,input:"",radio:"1",ruleForm:{approve_name:"",remarks:"",designated_personnel_bit:null,relevant_personnel_bit:null,relevant_personnel:"",designated_personnel:"",multi_level_approval:null,short_message:null,mail:null,appoint_mail_bit:null,appoint_mail:null,overtime:null,adopt:null,notify_approver_again:!1,notice_relevant_personnel_bit:null,notice_relevant_personnel:null,notice_designated_personnel_bit:null,notice_designated_personnel:null,type:""},rules:{approve_name:[{required:!0,message:"请输入审批步骤名称",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}]},value:"",meetList:[{name:"HZ_外部会-多项服务",value:!1},{name:"LY_外部会-单项服务",value:!1}]}},methods:{submitForm(e){this.$refs[e].validate(e=>{if(!e)return console.log("error submit!!"),!1;{let e=JSON.parse(JSON.stringify(this.ruleForm));["short_message","mail","appoint_mail_bit","adopt","notify_approver_again","notice_relevant_personnel_bit","notice_designated_personnel_bit"].forEach(t=>{e[t]=e[t]?0:1}),e.id="",e.relevant_personnel="5",this.$api.save({id:"",approve_name:"第一步",remarks:"1",relevant_personnel_bit:"1",relevant_personnel:"1",designated_personnel_bit:"0",designated_personnel:"MZH,MLF",multi_level_approval_bit:"1",multi_level_approval:"1",short_message:"1",mail:"1",appoint_mail_bit:"1",appoint_mail:"1",overtime:"3",adopt:"1",notify_approver_again:"0",notice_relevant_personnel_bit:"1",notice_relevant_personnel:"1",notice_designated_personnel_bit:"1",notice_designated_personnel:"1",type:"2"},"POST").then(e=>{console.log(e)}),console.log(e)}})},resetForm(e){this.$refs[e].resetFields(),this.$router.push("/outbid")},elect(){this.mataddialogVisible=!0},addList(){this.dialogVisible=!0}},mounted(){let e=this.$route.query.id;this.$api.detail({ID:e,type:this.$route.query.type},"POST").then(e=>{["short_message","mail","appoint_mail_bit","adopt","notify_approver_again","notice_relevant_personnel_bit","notice_designated_personnel_bit"].forEach(t=>{console.log(e[t]),e[t]=1!=e[t]}),console.log(e),this.ruleForm=e})}},r=i,n=(a("9cba"),a("0b56")),s=Object(n["a"])(r,l,o,!1,null,"c4f4f6c6",null);t["default"]=s.exports},"9cba":function(e,t,a){"use strict";a("d128")},d128:function(e,t,a){}}]);