(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f14a18f4"],{"070e":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"boss"},[a("ul",[a("li",{staticStyle:{color:"#0084e9",cursor:"pointer"},on:{click:function(e){return t.$router.go(-1)}}},[t._v("我的审批")]),a("li",{staticStyle:{color:"#7c7f82"}},[t._v(">")]),a("li",{staticStyle:{color:"#7c7f82"}},[t._v("中标审批（"+t._s(t.$route.query.event_name)+"）")])])]),t._m(0),a("base-part",{attrs:{source:"approve"}}),t._m(1),a("div",{staticClass:"numbers"},[a("el-table",{ref:"multipleTable",attrs:{data:t.num}},[a("el-table-column",{attrs:{label:"询价单号",prop:"inquiry_sheet_code",align:"center"}}),a("el-table-column",{attrs:{prop:"company_name",label:"旅行社名称 Travel Agency Name","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{staticStyle:{color:"#f91"},attrs:{prop:"total_price",label:"报价 Quotation","class-name":"offerPrice",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticStyle:{color:"#f91","font-weight":"bold"}},[t._v(" ￥ "+t._s(e.row.total_price))])]}}])}),a("el-table-column",{attrs:{label:"操作 Actions",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"checkOffer",attrs:{type:"text",size:"small"},on:{click:function(a){return t.checkOffer(e.row.quoted_price_id)}}},[t._v(" 查看报价 ")])]}}])})],1)],1),t._m(2),a("div",{staticClass:"opinion"},[a("p",[t._v("审批意见:")]),a("div",{staticClass:"right"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.ApprovalOpinion,expression:"ApprovalOpinion"}],attrs:{name:"",id:"",cols:"30",rows:"10"},domProps:{value:t.ApprovalOpinion},on:{input:function(e){e.target.composing||(t.ApprovalOpinion=e.target.value)}}})]),a("div",{staticClass:"underside"},[a("el-button",{staticStyle:{"margin-left":"20px",width:"160px","margin-top":"30px"},attrs:{type:"primary",plain:""}},[t._v("邀请其他人审批")]),a("el-button",{staticStyle:{"margin-left":"70px",width:"160px","margin-top":"30px"},attrs:{type:"danger"},on:{click:function(e){return t.max("不通过")}}},[t._v("审批不通过")]),a("el-dialog",{attrs:{title:"确认审批结果",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("span",[t._v(" 审批意见一旦提交则无法修改，是否确认当前审批 "),a("span",{staticClass:"disapprove",class:["通过"===t.passMessage?"pass":""]},[t._v(t._s(t.passMessage))])]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.sendApprove}},[t._v("确 定")])],1)]),a("el-button",{staticStyle:{"margin-left":"70px",width:"160px","margin-top":"30px"},attrs:{type:"success"},on:{click:function(e){return t.max("通过")}}},[t._v("审批通过")])],1)]),t._m(3),a("div",{staticClass:"Steps"},[a("el-table",{ref:"multipleTable",attrs:{data:t.arr}},[a("el-table-column",{attrs:{label:"审批步骤",prop:"approve_name",align:"center"}}),a("el-table-column",{attrs:{prop:"fullname",label:"审批人","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{label:"审批状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("button",{class:["approveStatusBtn","待审核"==e.row.type?"":"审核通过"==e.row.type?"approvePassBtn":"approveNotPassBtn"]},[t._v(t._s(e.row.type))])]}}])}),a("el-table-column",{attrs:{prop:"remarks",label:"说明","show-overflow-tooltip":"",align:"center"}}),a("el-table-column",{attrs:{prop:"approve_data",label:"操作时间","show-overflow-tooltip":"",align:"center"}})],1)],1)],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"blue_tit"},[s("img",{attrs:{src:a("ed89"),alt:""}}),s("p",[t._v("中标报价审批")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tour"},[a("p",[t._v("旅行社报价")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"interior"},[a("p",[t._v("内保审批")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"record"},[a("p",[t._v("审批记录")])])}],o=(a("e9c4"),a("7dc4")),l={data:function(){return{menus:[],arr:[],num:[],dialogVisible:!1,dialogVisibles:!1,passMessage:"",selectQuery:{},ApprovalOpinion:""}},components:{basePart:o["a"]},mounted:function(){this.selectQuery=this.$route.query,this.getDetail()},methods:{getDetail:function(){var t=this;this.$api.getEvent({ApproveID:this.selectQuery.ApproveID},"POST").then((function(e){t.arr=e.approve,t.num=e.inquirySheet,console.log(e)}))},max:function(t){this.dialogVisible=!0,this.passMessage=t},checkOffer:function(t){this.$router.push({path:"/offer",query:{foreign_key_id:t,id:this.$route.query.id,type:this.$route.query.type}})},sendApprove:function(){var t=this,e="不通过"===this.passMessage?"1":"0";this.$api.getsave({Parameter:JSON.stringify({status:e,id:this.selectQuery.ApproveID,remarks:this.ApprovalOpinion,message:"",objection:""})},"POST").then((function(e){e&&t.$message({message:"操作成功",type:"success"}),t.dialogVisible=!1,console.log(e),t.$router.push({path:"/approve"}),t.getDetail()}))}}},r=l,n=(a("32f9"),a("2877")),c=Object(n["a"])(r,s,i,!1,null,null,null);e["default"]=c.exports},"32f9":function(t,e,a){"use strict";a("e2c0")},e2c0:function(t,e,a){},ed89:function(t,e,a){t.exports=a.p+"img/锁定.f16270db.png"}}]);