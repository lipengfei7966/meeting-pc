(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bf093eca"],{"0a1e":function(e,t,i){"use strict";i("84c1")},"2b36":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"content"},[t("div",{staticClass:"approval-box"},[t("div",{staticClass:"path"},[t("ul",[t("el-button",{attrs:{type:"text"},on:{click:function(t){return e.$router.replace({path:"/"})}}},[e._v("首页")]),t("li",{staticStyle:{color:"#7c7f82"}},[e._v(">")]),t("li",{staticStyle:{color:"#409EFF",cursor:"pointer"},on:{click:function(t){return e.$router.replace({path:"/approveSetting"})}}},[e._v("审批流配置")]),t("li",{staticStyle:{color:"#7c7f82"}},[e._v(">")]),t("li",{staticStyle:{color:"#7c7f82"}},[e._v(e._s(1==this.$route.query.typeM?"编辑":"添加")+"审批步骤")])],1)]),t("div",{staticClass:"approval-title"},[e._v(" "+e._s(1==this.$route.query.typeM?"编辑":"添加")+"审批步骤 ")]),t("div",{staticClass:"approval-body"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"122px"}},[t("el-form-item",{attrs:{label:"审批步骤名称",prop:"name"}},[t("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),t("el-form-item",{attrs:{label:"备注/描述"}},[t("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.desc,callback:function(t){e.$set(e.ruleForm,"desc",t)},expression:"ruleForm.desc"}})],1),t("el-form-item",{attrs:{label:"审批条件"}},["1"!=e.isDefalt?t("div",{staticStyle:{display:"flex","margin-bottom":"20px"}},[t("div",{staticStyle:{width:"180px","margin-right":"10px"}},[e._v("会议类型")]),t("div",e._l(e.meetingTypes,(function(i){return t("div",{key:i.company_id,staticStyle:{display:"flex"}},[t("p",{staticStyle:{"min-width":"180px"}},[e._v(e._s(i.company_name)+": ")]),t("el-checkbox-group",{model:{value:i.meetingTypeSelect,callback:function(t){e.$set(i,"meetingTypeSelect",t)},expression:"mt.meetingTypeSelect"}},e._l(i.meeting_type,(function(e){return t("el-checkbox",{key:e.meeting_type_id,attrs:{label:e.meeting_type_name}})})),1)],1)})),0)]):e._e(),t("div",{staticStyle:{display:"flex"}},[t("div",{staticStyle:{width:"180px","margin-right":"10px"}},[e._v("服务类型")]),t("div",[t("el-checkbox-group",{model:{value:e.serviceTypeSelect,callback:function(t){e.serviceTypeSelect=t},expression:"serviceTypeSelect"}},e._l(e.serviceTypes,(function(e){return t("el-checkbox",{key:e.id,attrs:{label:e.name}})})),1)],1)]),t("div",{staticStyle:{display:"flex"}},[t("div",{staticStyle:{width:"180px","margin-right":"10px"}},[e._v("会议城市")]),t("div",[t("el-select",{attrs:{multiple:"",placeholder:"请选择"},model:{value:e.citySelect,callback:function(t){e.citySelect=t},expression:"citySelect"}},e._l(e.citys,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)])]),t("el-form-item",{attrs:{label:"审批人"}},[t("div",{staticStyle:{"margin-left":"100px"}},[t("el-radio",{attrs:{label:"1"},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[e._v("内部审批")])],1),t("div",[t("el-radio",{staticStyle:{"margin-left":"120px"},attrs:{name:"person",label:"0"},model:{value:e.radio1,callback:function(t){e.radio1=t},expression:"radio1"}},[e._v("相关人员")])],1),t("div",{staticStyle:{"margin-left":"140px"}},[t("el-checkbox",{attrs:{label:"会议创建人","true-label":"0032-1"},model:{value:e.meetingCreator,callback:function(t){e.meetingCreator=t},expression:"meetingCreator"}}),t("el-checkbox",{attrs:{label:"会议负责人","true-label":"0032-2"},model:{value:e.meetingOower,callback:function(t){e.meetingOower=t},expression:"meetingOower"}}),t("el-checkbox",{attrs:{label:"会议指定采购","true-label":"0032-3"},model:{value:e.meetingUp,callback:function(t){e.meetingUp=t},expression:"meetingUp"}}),t("el-checkbox",{attrs:{label:"会议指定合规人员","true-label":"0032-4"},model:{value:e.meetingPurchase,callback:function(t){e.meetingPurchase=t},expression:"meetingPurchase"}}),t("el-checkbox",{attrs:{label:"会议助理","true-label":"0032-5"},model:{value:e.meetingPersonnel,callback:function(t){e.meetingPersonnel=t},expression:"meetingPersonnel"}})],1),t("div",{staticStyle:{"margin-left":"120px"}},[t("el-radio",{attrs:{label:"1",name:"person"},model:{value:e.radio1,callback:function(t){e.radio1=t},expression:"radio1"}},[e._v("指定人员")])],1),t("div",{staticStyle:{display:"flex"}},[t("span",{directives:[{name:"show",rawName:"v-show",value:this.namesta,expression:"this.namesta"}],staticClass:"mail_designated_user_list",staticStyle:{"margin-left":"100px"}},[t("span",{attrs:{"data-uid":"9511"}},e._l(this.namesta,(function(i,a){return t("el-tag",{key:a,staticStyle:{"margin-right":"10px"},attrs:{closable:""},on:{close:function(t){return e.handleClose(i)}}},[e._v(" "+e._s(i)+" ")])})),1)]),t("span",{directives:[{name:"show",rawName:"v-show",value:0==this.namesta.length,expression:"this.namesta.length == 0"}],staticClass:"mail_designated_user_list"},[t("span",{attrs:{"data-uid":"9511"}},[e._v(" 暂无人员 ")])]),t("el-row",[t("el-button",{staticStyle:{padding:"7px 6px","font-size":"7px","margin-left":"50px"},attrs:{type:"primary"},on:{click:e.addList}},[e._v("添加")])],1)],1),t("div",{staticStyle:{"margin-left":"100px"}},[t("el-radio",{attrs:{disabled:""},model:{value:e.radio,callback:function(t){e.radio=t},expression:"radio"}},[e._v(" 第三方审批 "),t("span",[e._v("该审批暂不支持第三方审批")])])],1)]),t("el-form-item",{attrs:{label:"审批通知"}},[t("div",{staticStyle:{"margin-left":"100px"}},[t("el-checkbox",{attrs:{label:"给审批人发送短信"},model:{value:e.message,callback:function(t){e.message=t},expression:"message"}})],1),t("div",{staticStyle:{"margin-left":"100px"}},[t("el-checkbox",{attrs:{label:"给审批人发送邮件"},model:{value:e.mail,callback:function(t){e.mail=t},expression:"mail"}})],1),t("div",{staticStyle:{"margin-left":"100px"}},[t("el-checkbox",{attrs:{label:"给指定人员发送邮件"},model:{value:e.appointMailBit,callback:function(t){e.appointMailBit=t},expression:"appointMailBit"}})],1),t("div",{staticStyle:{display:"flex"}},[t("span",{directives:[{name:"show",rawName:"v-show",value:this.namestae,expression:"this.namestae"}],staticClass:"mail_designated_user_list",staticStyle:{"margin-left":"100px"}},[t("span",{attrs:{"data-uid":"9511"}},e._l(this.namestae,(function(i,a){return t("el-tag",{key:a,staticStyle:{"margin-right":"10px"},attrs:{closable:""},on:{close:function(t){return e.handleClose_two(i)}}},[e._v(" "+e._s(i)+" ")])})),1)]),t("span",{directives:[{name:"show",rawName:"v-show",value:0==this.namestae.length,expression:"this.namestae.length == 0"}],staticClass:"mail_designated_user_list",staticStyle:{"margin-left":"100px"}},[t("span",{attrs:{"data-uid":"9511"}},[e._v(" 暂无人员 ")])]),t("el-row",[t("el-button",{staticStyle:{padding:"7px 6px","font-size":"7px","margin-left":"50px"},attrs:{type:"primary"},on:{click:e.addListTwo}},[e._v("添加")])],1)],1)]),t("el-form-item",{attrs:{label:"供应商催审"}},[t("div",{staticStyle:{"margin-left":"100px"}},[t("el-checkbox",{attrs:{label:"允许供应商催审",name:"type"},model:{value:e.allowExpediting,callback:function(t){e.allowExpediting=t},expression:"allowExpediting"}})],1)]),t("el-form-item",{attrs:{label:"审批超时处理",prop:"type"}},[t("div",{staticStyle:{"margin-left":"100px"}},[t("span",[e._v("超过")]),t("el-input",{staticStyle:{width:"61%","margin-left":"-100px"},attrs:{placeholder:"超过多少小时不审核"},model:{value:e.overtime,callback:function(t){e.overtime=t},expression:"overtime"}}),t("span",{staticClass:"input-right-span"},[e._v("小时不审核，则")])],1),t("div",{staticStyle:{"margin-left":"120px"}},[t("el-checkbox",{attrs:{label:"自动审批通过"},model:{value:e.automaticApproval,callback:function(t){e.automaticApproval=t},expression:"automaticApproval"}})],1),t("div",{staticStyle:{"margin-left":"120px"}},[t("el-checkbox",{attrs:{label:"再次通知审批人（仅一次）"},model:{value:e.onceAgain,callback:function(t){e.onceAgain=t},expression:"onceAgain"}})],1),t("div",{staticStyle:{"margin-left":"120px"}},[t("el-checkbox",{attrs:{label:"通知相关人员"},model:{value:e.noticePersonnel,callback:function(t){e.noticePersonnel=t},expression:"noticePersonnel"}})],1),t("div",{staticStyle:{"margin-left":"140px"}},[t("el-checkbox",{attrs:{label:"会议创建人","true-label":"0033-1"},model:{value:e.meetingCreatored,callback:function(t){e.meetingCreatored=t},expression:"meetingCreatored"}}),t("el-checkbox",{attrs:{label:"会议负责人","true-label":"0033-2"},model:{value:e.meetingOowered,callback:function(t){e.meetingOowered=t},expression:"meetingOowered"}}),t("el-checkbox",{attrs:{label:"会议指定采购","true-label":"0033-3"},model:{value:e.meetingUped,callback:function(t){e.meetingUped=t},expression:"meetingUped"}}),t("el-checkbox",{attrs:{label:"会议指定合规人员","true-label":"0033-4"},model:{value:e.meetingPurchaseed,callback:function(t){e.meetingPurchaseed=t},expression:"meetingPurchaseed"}}),t("el-checkbox",{attrs:{label:"会议助理","true-label":"0033-5"},model:{value:e.meetingPersonneled,callback:function(t){e.meetingPersonneled=t},expression:"meetingPersonneled"}})],1),t("div",{staticStyle:{"margin-left":"120px"}},[t("el-checkbox",{attrs:{label:"指定人员"},model:{value:e.designee,callback:function(t){e.designee=t},expression:"designee"}})],1),t("div",{staticStyle:{display:"flex"}},[t("span",{directives:[{name:"show",rawName:"v-show",value:this.namestaed,expression:"this.namestaed"}],staticClass:"mail_designated_user_list",staticStyle:{"margin-left":"100px"}},[t("span",{attrs:{"data-uid":"9511"}},e._l(this.namestaed,(function(i,a){return t("el-tag",{key:a,staticStyle:{"margin-right":"10px"},attrs:{closable:""},on:{close:function(t){return e.handleClose_three(i)}}},[e._v(" "+e._s(i)+" ")])})),1)]),t("span",{directives:[{name:"show",rawName:"v-show",value:0==this.namestaed.length,expression:"this.namestaed.length == 0"}],staticClass:"mail_designated_user_list",staticStyle:{"margin-left":"100px"}},[t("span",{attrs:{"data-uid":"9511"}},[e._v(" 暂无人员 ")])]),t("el-row",[t("el-button",{staticStyle:{padding:"7px 6px","font-size":"7px","margin-left":"50px"},attrs:{type:"primary"},on:{click:e.addListThree}},[e._v("添加")])],1)],1)]),t("el-dialog",{attrs:{title:"查找指定人员",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.getUserValue,callback:function(t){e.getUserValue=t},expression:"getUserValue"}},e._l(e.getUserList,(function(e){return t("el-option",{key:e.value,attrs:{label:e.fullname,value:e.username}})})),1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.addcitys}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"查找指定人员",visible:e.dialogVisibleThree,width:"30%"},on:{"update:visible":function(t){e.dialogVisibleThree=t}}},[t("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.getUserValueThree,callback:function(t){e.getUserValueThree=t},expression:"getUserValueThree"}},e._l(e.getUserList,(function(e){return t("el-option",{key:e.value,attrs:{label:e.fullname,value:e.username}})})),1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogVisibleThree=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.pushlisted}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"查找指定人员",visible:e.dialogVisibleTwo,width:"30%"},on:{"update:visible":function(t){e.dialogVisibleTwo=t}}},[t("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.getUserValueTwo,callback:function(t){e.getUserValueTwo=t},expression:"getUserValueTwo"}},e._l(e.getUserList,(function(e){return t("el-option",{key:e.value,attrs:{label:e.fullname,value:e.username}})})),1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogVisibleTwo=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.dislist}},[e._v("确 定")])],1)],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("保存")]),t("el-button",{on:{click:e.cancel}},[e._v("取消")])],1)],1)],1),t("el-button",{attrs:{type:"text"},on:{click:function(t){e.complianceMeal=!0}}}),t("el-dialog",{attrs:{title:"添加/编辑条件",visible:e.complianceMeal,width:"50%",center:""},on:{"update:visible":function(t){e.complianceMeal=t}}},[e._l(e.emptyArr,(function(i,a){return t("div",{key:a},[t("span",[e._v(e._s(0===a?"if":"and"))]),t("select",{directives:[{name:"model",rawName:"v-model",value:e.department,expression:"department"}],staticClass:"approval-select condition-var",staticStyle:{width:"150px"},on:{change:[function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.department=t.target.multiple?i:i[0]},e.change]}},[t("option",{attrs:{value:"会议部门"}},[e._v("会议部门")]),t("option",{attrs:{value:"会议类型"}},[e._v("会议类型")]),t("option",{attrs:{value:"旅行社陪同人员"}},[e._v("旅行社陪同人员")]),t("option",{attrs:{value:"会议总预算"}},[e._v("会议总预算")]),t("option",{attrs:{value:"会议开始日期"}},[e._v("会议开始日期")]),t("option",{attrs:{value:"结算金额"}},[e._v("结算金额")])]),t("select",{directives:[{name:"model",rawName:"v-model",value:e.Right,expression:"Right"}],staticClass:"approval-select condition-operator",on:{change:[function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.Right=t.target.multiple?i:i[0]},e.change]}},[t("option",{attrs:{value:"是"}},[e._v("是")]),t("option",{attrs:{value:"不是"}},[e._v("不是")])]),t("select",{directives:[{name:"show",rawName:"v-show",value:e.size,expression:"size"},{name:"model",rawName:"v-model",value:e.sizeindex,expression:"sizeindex"}],staticClass:"approval-select condition-operator",on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.sizeindex=t.target.multiple?i:i[0]}}},[t("option",{attrs:{value:"min"}},[e._v("小于")]),t("option",{attrs:{value:"max"}},[e._v("大于等于")])]),t("input",{directives:[{name:"show",rawName:"v-show",value:e.operator,expression:"operator"}],staticStyle:{height:"33px",border:"1px solid #dedfe6"},attrs:{type:"text",name:"",id:"",placeholder:"请输入内容"}}),t("a",{staticClass:"approval-a multi",on:{click:e.elect}},[e._v("选择")]),t("a",{staticClass:"approval-empty del",on:{click:function(t){return e.del(a)}}},[e._v("删除")])])})),t("span",{staticClass:"addevent",on:{click:e.addCondition}},[e._v("添加条件")]),t("div",{staticClass:"thread"}),t("div",{staticClass:"text"},[t("p",{staticStyle:{"margin-top":"10px"}},[e._v("条件预览")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.condition,expression:"condition"}],staticClass:"frame",attrs:{name:"",id:"",cols:"30",rows:"10"},domProps:{value:e.condition},on:{input:function(t){t.target.composing||(e.condition=t.target.value)}}})]),t("span"),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.complianceMeal=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("保存")])],1)],2),t("el-dialog",{attrs:{title:"查找指定人员",visible:e.mataddialogVisible,width:"40%"},on:{"update:visible":function(t){e.mataddialogVisible=t}}},[t("div",{staticClass:"comlist"},[t("el-checkbox",{attrs:{"true-label":"HZ_外部会-多项服务"},model:{value:e.check,callback:function(t){e.check=t},expression:"check"}},[e._v("HZ_外部会-多项服务")]),t("el-checkbox",{attrs:{"true-label":"LY_外部会-单项服务"},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("LY_外部会-单项服务")])],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.mataddialogVisible=!1,e.complianceMeal=!0}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:e.visible}},[e._v("确 定")])],1)])],1)])},l=[],s={data(){return{id:"",type:"",meetingTypes:[],serviceTypeSelect:[],serviceTypes:[],citys:[],citySelect:[],mataddialogVisible:!1,dialogVisible:!1,size:!1,sizeindex:"min",operator:!1,complianceMeal:!1,overtime:"",radio:"1",radio1:"0",radio3:1,notice_relevant_personnel_bit:0,ruleForm:{name:"",type:[],desc:"",checkType:[]},rules:{name:[{required:!0,message:"请输入审批步骤名称",trigger:"blur"}]},value:"",approval:{},isDefalt:"",personArr:[],message:1,mail:1,allowExpediting:1,appointMailBit:1,automaticApproval:1,onceAgain:1,noticePersonnel:1,designee:1,department:"会议部门",condition:"",Right:"是",emptyArr:[{name:0,value:1}],imei:"",imeiMaskShow:!1,cameraShow:!1,brand:null,type:null,name:null,ram:null,color:null,error:null,submitFlag:!0,approvalAreaConditions:"",area:!1,check:"",checked:"",getUserList:[],getUserValue:"",meetingCreator:"",meetingOower:"",meetingUp:"",meetingPurchase:"",meetingPersonnel:"",meetingSettlement:"",meetingCreatored:"",meetingOowered:"",meetingUped:"",meetingPurchaseed:"",meetingPersonneled:"",dialogVisibleTwo:!1,dialogVisibleThree:!1,getUserValueTwo:"",getUserValueThree:"",namestaed:[],namestae:[],namesta:[]}},mounted(){if(this.id=this.$route.query.id,this.type=this.$route.query.type,this.isDefalt=this.$route.query.isDefalt,this.getUser(),this.$route.query.approval){this.approval=JSON.parse(this.$route.query.approval),this.citySelect=this.approval.city_code?this.approval.city_code.split(","):[];const e=this.approval.relevant_personnel.split(","),t=this.approval.notice_relevant_personnel.split(",");this.ruleForm.name=this.approval.approve_name,this.ruleForm.desc=this.approval.remarks,this.radio1=this.approval.relevant_personnel_bit+"",this.message=!this.approval.short_message,this.mail=!this.approval.mail,this.overtime=this.approval.overtime,this.allowExpediting=!this.approval.service_urge,this.appointMailBit=!this.approval.appoint_mail_bit,this.automaticApproval=!this.approval.adopt,this.onceAgain=!this.approval.notify_approver_again,this.noticePersonnel=!this.approval.notice_relevant_personnel_bit,this.designee=!this.approval.notice_designated_personnel_bit,this.approval.designated_personnel&&(this.namesta=this.approval.designated_personnel.split(","),console.log(this.namesta)),this.approval.appoint_mail&&(this.namestae=this.approval.appoint_mail.split(","),console.log(this.namestae)),this.approval.notice_designated_personnel&&(this.namestaed=this.approval.notice_designated_personnel.split(","),console.log(this.namestaed)),e.forEach(e=>{"0032-1"==e?this.meetingCreator=e:"0032-2"==e?this.meetingOower=e:"0032-3"==e?this.meetingUp=e:"0032-4"==e?this.meetingPurchase=e:"0032-5"==e&&(this.meetingPersonnel=e)}),t.forEach(e=>{"0033-1"==e?this.meetingCreatored=e:"0033-2"==e?this.meetingOowered=e:"0033-3"==e?this.meetingUped=e:"0033-4"==e?this.meetingPurchaseed=e:"0033-5"==e&&(this.meetingPersonneled=e)})}this.getProvinceCity(),this.approvaMeetingType(),this.getServiceType()},methods:{handleClose(e){this.namesta.splice(this.namesta.indexOf(e),1)},handleClose_two(e){this.namestae.splice(this.namestae.indexOf(e),1)},handleClose_three(e){this.namestaed.splice(this.namestaed.indexOf(e),1)},getProvinceCity(){this.$api.ProvinceCity({},"POST").then(e=>{this.citys=e.map(e=>(e.label=e.name,e.value=e.code,e))})},approvaMeetingType(){this.$api.ApprovaMeetingType({id:this.id},"POST").then(e=>{this.meetingTypes=e.map(e=>{if(e.meetingTypeSelect=[],this.approval.meeting_type)for(let t=0;t<this.approval.meeting_type.length;t++){let i=this.approval.meeting_type[t];i.company_id==e.company_id&&(e.meetingTypeSelect=[],e.meeting_type.forEach(t=>{i.meeting_type_list.forEach(i=>{t.meeting_type_id==i.meeting_type_id&&e.meetingTypeSelect.push(t.meeting_type_name)})}))}return e})})},getServiceType(){this.$api.getServiceType({},"POST").then(e=>{this.serviceTypes=e;let t=[];if(this.approval.service_type)for(let i=0;i<this.approval.service_type.length;i++){let e=this.approval.service_type[i];for(let i=0;i<this.serviceTypes.length;i++)this.serviceTypes[i].id==e.service_type_id&&t.push(this.serviceTypes[i].name)}this.serviceTypeSelect=t})},addListThree(){this.dialogVisibleThree=!0},addListTwo(){this.dialogVisibleTwo=!0},visible(){this.mataddialogVisible=!1,this.complianceMeal=!0,this.change()},getUser(){this.$api.GetUser({},"POST").then(e=>{this.getUserList=e})},cancel(){"1"==this.type&&this.$router.push({name:"settlementSheet",query:{id:this.id,type:this.type}}),"2"==this.type&&this.$router.push({name:"outbid",query:{id:this.id,type:this.type}})},dislist(){this.dialogVisibleTwo=!1,this.namestae.push(this.getUserValueTwo)},change(){this.condition=`if  ${this.department}  ${this.Right} ${this.check} ${this.checked}`},addcitys(){this.dialogVisible=!1,this.namesta.push(this.getUserValue)},findMeetingId(e,t){for(let i=0;i<e.length;i++)if(t==e[i].meeting_type_name)return e[i].meeting_type_id},submitForm(){let e=[];for(let s=0;s<this.serviceTypeSelect.length;s++)for(let t=0;t<this.serviceTypes.length;t++)this.serviceTypes[t].name==this.serviceTypeSelect[s]&&e.push({id:"",service_type_id:this.serviceTypes[t].id});let t=[];for(let s=0;s<this.meetingTypes.length;s++){let e=this.meetingTypes[s],i=this.meetingTypes[s].meetingTypeSelect,a=e.meeting_type,l=[];if(i&&i.length)for(let t=0;t<i.length;t++){let e=this.findMeetingId(a,i[t]);e&&l.push({id:"",meeting_type_id:e})}t.push({company_id:e.company_id,meeting_type_list:l})}if(""===this.ruleForm.name)return void this.$message("请输入审批步骤名称");let i="";this.namesta&&(i=this.namesta.toString(),console.log(i));let a=[i,this.meetingCreator,this.meetingOower,this.meetingUp,this.meetingPurchase,this.meetingPersonnel,this.meetingSettlement],l=[this.meetingCreatored,this.meetingOowered,this.meetingUped,this.meetingPurchaseed,this.meetingPersonneled];a=a.filter(e=>null!==e&&void 0!==e?e:""),l=l.filter(e=>null!==e&&void 0!==e?e:""),a.every(e=>""==e)&&""==this.getUserValue?this.$message("请选择相关人员或者请填写指定人员"):this.$api.save({Parameter:JSON.stringify({id:this.approval.id||"",approval_id:this.id,city_code:this.citySelect.join(","),service_type:e,meeting_type:t,approve_name:this.ruleForm.name,remarks:this.ruleForm.desc,relevant_personnel_bit:0==this.radio1?0:1,relevant_personnel:a.join(","),designated_personnel_bit:1==this.radio1?0:1,designated_personnel:i,multi_level_approval_bit:"1",multi_level_approval:"1",short_message:!0===this.message?0:1,mail:!0===this.mail?0:1,appoint_mail_bit:!0===this.appointMailBit?0:1,appoint_mail:this.namestae.join(","),overtime:this.overtime,service_urge:!0===this.allowExpediting?0:1,adopt:!0===this.automaticApproval?0:1,notify_approver_again:!0===this.onceAgain?0:1,notice_relevant_personnel_bit:!0===this.noticePersonnel?0:1,notice_relevant_personnel:l.join(","),notice_designated_personnel_bit:!0===this.designee?0:1,notice_designated_personnel:this.namestaed.join(","),type:this.$route.query.type})},"POST").then(e=>{!0===e&&1==this.$route.query.type&&this.$router.push({name:"settlementSheet",query:{id:this.id,type:this.type}}),2==this.$route.query.type&&this.$router.push({name:"outbid",query:{id:this.id,type:this.type}})})},pushlisted(){this.dialogVisibleThree=!1,this.namestaed.push(this.getUserValueThree)},resetForm(e){this.$refs[e].resetFields()},addList(){this.dialogVisible=!0},elect(){this.complianceMeal=!1,this.mataddialogVisible=!0},addCondition(){this.emptyArr.push({name:2,value:1})},del(e){this.emptyArr.splice(e,1)},submit(){this.complianceMeal=!1,this.approvalAreaConditions=this.condition,this.approvalAreaConditions&&(this.area=!0)}}},n=s,o=(i("0a1e"),i("0b56")),r=Object(o["a"])(n,a,l,!1,null,null,null);t["default"]=r.exports},"84c1":function(e,t,i){}}]);