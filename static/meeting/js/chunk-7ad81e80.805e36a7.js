(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ad81e80"],{2654:function(e,t,r){"use strict";r.d(t,"j",(function(){return n})),r.d(t,"k",(function(){return o})),r.d(t,"i",(function(){return i})),r.d(t,"h",(function(){return s})),r.d(t,"l",(function(){return l})),r.d(t,"e",(function(){return u})),r.d(t,"f",(function(){return c})),r.d(t,"b",(function(){return m})),r.d(t,"g",(function(){return d})),r.d(t,"a",(function(){return f})),r.d(t,"c",(function(){return p})),r.d(t,"d",(function(){return b}));var a=r("53ca");r("ac1f"),r("00b4"),r("d9e2"),r("a9e3"),r("d3b7"),r("159b");function n(e,t,r){var a=/^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;""==t||void 0==t||null==t||a.test(t)||""==t?r():r(new Error("请输入正确的电话号码或者固话号码"))}function o(e,t,r){var a=/0\d{2}-\d{7,8}/;""==t||void 0==t||null==t||a.test(t)||""==t?r():r(new Error("请输入正确的固话（格式：区号+号码,如010-1234567）"))}function i(e,t,r){var a=/^[1][3,4,5,7,8][0-9]{9}$/;""==t||void 0==t||null==t||a.test(t)||""==t?r():r(new Error("请输入正确的电话号码"))}function s(e,t,r){var a=/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;""==t||void 0==t||null==t||a.test(t)?r():r(new Error("请输入正确的邮箱地址"))}function l(e,t,r){var a=/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;""==t||void 0==t||null==t||a.test(t)?r():r(new Error("请输入正确的URL"))}function u(e,t,r){if(!t)return r(new Error("输入不可以为空"));setTimeout((function(){if(Number(t)){var e=/^[0-9]*[1-9][0-9]*$/,a=e.test(t);a?r():r(new Error("请输入正整数"))}else r(new Error("请输入正整数"))}),0)}function c(e,t,r){t||r(),setTimeout((function(){if(Number(t)){var e=/^[0-9]*[1-9][0-9]*$/,a=e.test(t);a?r():r(new Error("请输入正整数"))}else r(new Error("请输入正整数"))}),1e3)}function m(e,t){var r={},n=[];if(e=Array.isArray(e)?e:[],t)for(var o=0;o<e.length;o++)if(r[e[o].date]){for(var i=0;i<n.length;i++)if(e[o].date===n[i].date){n[i].settlement+=Number("object"==Object(a["a"])(e[o].settlement_total_price)?e[o].settlement_total_price.value:e[o].settlement_total_price),n[i].orgSettlement+=Number("object"==Object(a["a"])(e[o].total_price)?e[o].total_price.value:e[o].total_price),n[i].data.push(e[o]);break}}else n.push({date:e[o].date,settlement:Number("object"==Object(a["a"])(e[o].settlement_total_price)?e[o].settlement_total_price.value:e[o].settlement_total_price),orgSettlement:Number("object"==Object(a["a"])(e[o].total_price)?e[o].total_price.value:e[o].total_price),data:[e[o]]}),r[e[o].date]=e[o];else for(var s=0;s<e.length;s++)if(r[e[s].date]){for(var l=0;l<n.length;l++)if(e[s].date===n[l].date){n[l].settlement+="object"==Object(a["a"])(e[s].settlement_price)?e[s].settlement_price.value:e[s].settlement_price,n[l].orgSettlement+="object"==Object(a["a"])(e[s].price)?e[s].price.value:e[s].price,n[l].data.push(e[s]);break}}else n.push({date:e[s].date,settlement:"object"==Object(a["a"])(e[s].settlement_price)?e[s].settlement_price.value:e[s].settlement_price,orgSettlement:"object"==Object(a["a"])(e[s].price)?e[s].price.value:e[s].price,data:[e[s]]}),r[e[s].date]=e[s];return n}function d(e){var t={},r=[];e=Array.isArray(e)?e:[];for(var a=0;a<e.length;a++)if(t[e[a].checkindate]){for(var n=0;n<r.length;n++)if(e[a].checkindate===r[n].checkindate){"大床房"==e[a].roomtype?(r[n].bigBedNum=e[a].roomcount,r[n].totalNum+=e[a].roomcount):"双床房"==e[a].roomtype?(r[n].doubleBedNum=e[a].roomcount,r[n].totalNum+=e[a].roomcount):(r[n].suiteNum=e[a].roomcount,r[n].totalNum+=e[a].roomcount);break}}else e[a].bigBedNum=0,e[a].doubleBedNum=0,e[a].suiteNum=0,e[a].totalNum=0,"大床房"==e[a].roomtype?(e[a].bigBedNum=e[a].roomcount,e[a].totalNum+=e[a].roomcount):"双床房"==e[a].roomtype?(e[a].doubleBedNum=e[a].roomcount,e[a].totalNum+=e[a].roomcount):(e[a].suiteNum=e[a].roomcount,e[a].totalNum+=e[a].roomcount),r.push(e[a]),t[e[a].checkindate]=e[a];return r}function f(e){for(var t={},r=[],a=0;a<e.length;a++){var n=(e[a].build?e[a].build.price:0)+(e[a].rentalCosts?e[a].rentalCosts.price:0);if(e[a].equipment&&e[a].equipment.forEach((function(e){n+=e.price||0})),t[e[a].rentalCosts.time])for(var o=function(t){if(e[a].rentalCosts.time===r[t].time)return r[t].totalPrice+=(e[a].build?e[a].build.price:0)+(e[a].rentalCosts?e[a].rentalCosts.price:0),e[a].equipment&&e[a].equipment.forEach((function(e){r[t].totalPrice+=e.price||0})),r[t].data.push(e[a]),"break"},i=0;i<r.length;i++){var s=o(i);if("break"===s)break}else r.push({time:e[a].rentalCosts.time,totalPrice:n,data:[e[a]]}),t[e[a].rentalCosts.time]=e[a]}return r}function p(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"time",r={},a=[];e=e||[];for(var n=0;n<e.length;n++)if(r[e[n][t]]){for(var o=0;o<a.length;o++)if(e[n][t]===a[o].time){a[o].data.push(e[n]),a[o].car.push(e[n]);break}}else a.push({time:e[n][t],car_date:e[n][t].substring(0,10),breakfast:e[n].breakfast,networks:e[n].networks,describe:e[n].describe,otherrequirements:e[n].otherrequirements,type:e[n].type,room_budget:e[n].room_budget,purpose:e[n].purpose,offer_remarks:e[n].offer_remarks,comments:e[n].comments,data:[e[n]],car:[e[n]]}),r[e[n][t]]=e[n];return a}function b(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"time",r={},a=[];e=e||[];for(var n=0;n<e.length;n++)a.push({time:e[n][t],car_date:e[n][t].substring(0,10),breakfast:e[n].breakfast,networks:e[n].networks,describe:e[n].describe,otherrequirements:e[n].otherrequirements,type:e[n].type,room_budget:e[n].room_budget,purpose:e[n].purpose,offer_remarks:e[n].offer_remarks,comments:e[n].comments,data:[e[n]],car:[e[n]]}),r[e[n][t]]=e[n];return a}},"26d6":function(e,t,r){"use strict";r("d0bc")},"53ca":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0");function a(e){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}},"9f09":function(e,t,r){},ab0b:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=this,r=t.$createElement,a=t._self._c||r;return a("div",{staticClass:"MemberList"},[a("div",{staticClass:"title"},[t._v("成员管理")]),a("div",{staticClass:"content"},[a("div",{staticClass:"tools"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addMemberStatus=!0}}},[t._v("添加成员")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData.List,stripe:"",height:"100%"}},[a("el-table-column",{attrs:{prop:"real_name",label:"真实姓名"}}),a("el-table-column",{attrs:{prop:"phone_number",label:"手机号码"}}),a("el-table-column",{attrs:{prop:"contact_email",label:"邮箱地址"}}),a("el-table-column",{attrs:{prop:"isdefault",label:"是否默认"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.isdefault?a("el-tag",[t._v("默认接待员")]):a("el-tag",{attrs:{type:"info"}},[t._v("接待员")])]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticClass:"tools_btn",attrs:{size:"mini",type:"text"},on:{click:function(r){return t.update(e.$index,e.row)}}},[t._v("重设")]),a("el-popconfirm",{attrs:{"confirm-button-text":"删除","cancel-button-text":"取消",icon:"el-icon-info","icon-color":"red",title:"确定要删除此用户吗？"},on:{confirm:function(r){return t.onDelete(e.$index,e.row)}}},[a("el-button",{staticClass:"tools_btn",attrs:{slot:"reference",size:"mini",type:"text"},slot:"reference"},[t._v("删除")])],1)]}}])})],1),a("el-pagination",{staticClass:"pages",attrs:{background:"",layout:"prev, pager, next",total:t.tableData.Counts,"current-page":t.tableData.CurrentPage},on:{"current-change":t.currentChange}})],1),a("el-dialog",{attrs:{title:"添加成员",visible:t.addMemberStatus,"before-close":function(t){e.itemData=null,t()},width:"500px"},on:{"update:visible":function(e){t.addMemberStatus=e}}},[t.addMemberStatus?a("memberAdded",{attrs:{"item-data":t.itemData},on:{onColse:t.save}}):t._e()],1)],1)},n=[],o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"case-study-added"},[r("el-form",{ref:"ruleForm",attrs:{"label-width":"80px",model:e.FormData,rules:e.rules}},[r("el-form-item",{attrs:{label:"真实姓名",prop:"real_name"}},[r("el-input",{attrs:{placeholder:"真实姓名"},model:{value:e.FormData.real_name,callback:function(t){e.$set(e.FormData,"real_name",t)},expression:"FormData.real_name"}})],1),r("el-form-item",{attrs:{label:"手机号码",prop:"phone_number"}},[r("el-input",{attrs:{placeholder:"手机号码"},model:{value:e.FormData.phone_number,callback:function(t){e.$set(e.FormData,"phone_number",e._n(t))},expression:"FormData.phone_number"}})],1),r("el-form-item",{attrs:{label:"邮箱地址",prop:"contact_email"}},[r("el-input",{attrs:{placeholder:"邮箱地址"},model:{value:e.FormData.contact_email,callback:function(t){e.$set(e.FormData,"contact_email",t)},expression:"FormData.contact_email"}})],1),r("el-form-item",{attrs:{label:"是否默认",prop:"isdefault"}},[r("el-radio-group",{model:{value:e.FormData.isdefault,callback:function(t){e.$set(e.FormData,"isdefault",e._n(t))},expression:"FormData.isdefault"}},[r("el-radio",{attrs:{label:1,border:""}},[e._v("默认接待员")]),r("el-radio",{attrs:{label:0,border:""}},[e._v("接待员")])],1)],1),r("div",{staticClass:"btnGroup"},[r("el-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v(e._s(null==e.itemData?"立即添加":"确认修改"))])],1)],1)],1)},i=[],s=(r("d3b7"),r("25f0"),r("2654")),l={props:{itemData:null|JSON},data:function(){return{FormData:{login_name:"",login_password:"",real_name:"",phone_number:"",contact_email:"",isdefault:0,roleIds:[]},roleIds:[],roleList:[],rules:{login_name:[{required:!0,message:"登录名不能为空",trigger:"change"}],login_password:[{required:!0,message:"登录密码不能为空",trigger:"change"}],real_name:[{required:!0,message:"真实姓名不能为空",trigger:"change"}],phone_number:[{required:!0,message:"电话号码不能为空",trigger:"change"},{validator:s["i"],trigger:"blur"}],contact_email:[{validator:s["h"],trigger:"blur"}]}}},mounted:function(){var e=this;this.$api.memberInfo({id:null==this.itemData?"":this.itemData.id},"POST").then((function(t){e.roleList=t.roles_list,null!=e.itemData&&(e.FormData=t.member,e.$set(e.FormData,"roleIds",t.roleIds))}))},methods:{add:function(){var e=this;this.$refs["ruleForm"].validate((function(t){if(!t)return console.log("error submit!!"),!1;e.FormData.roleIds=e.FormData.roleIds.toString(),e.$emit("onColse",e.FormData)}))},handlePreviewImage:function(e){this.waitUpload.push(e)}}},u=l,c=(r("26d6"),r("2877")),m=Object(c["a"])(u,o,i,!1,null,"6c4a696a",null),d=m.exports,f={name:"MemberList",components:{memberAdded:d},data:function(){return{addMemberStatus:!1,itemData:null,tableData:{CurrentPage:1,List:[]}}},methods:{update:function(e,t){this.itemData=t,this.addMemberStatus=!0},onShelf:function(e,t){var r=this;this.$api.memberActivation({id:t.id},"POST").then((function(e){r.$message({message:"激活成功！",type:"success"}),r.GetList()}))},offShelf:function(e,t){var r=this;this.$api.memberFrozen({id:t.id},"POST").then((function(e){r.$message({message:"冻结成功！",type:"success"}),r.GetList()}))},onDelete:function(e,t){var r=this;this.$api.memberDelete({id:t.id},"POST").then((function(e){r.$message({message:"删除成功！",type:"success"}),r.GetList()}))},GetList:function(){var e=this;this.$api.memberList({Page:this.tableData.CurrentPage,Rows:10},"POST").then((function(t){e.tableData=t}))},currentChange:function(e){this.tableData.CurrentPage=e,this.GetList()},save:function(e){var t=this;this.$api.memberSave({member:e,roleIds:e.roleIds},"POST").then((function(r){t.$message({message:e.id?"修改成功！":"添加成功！",type:"success"}),t.addMemberStatus=!1,e.id||(t.tableData.CurrentPage=1),t.GetList()}))}},mounted:function(){this.GetList()}},p=f,b=(r("f4c2"),Object(c["a"])(p,a,n,!1,null,"e3fddc5c",null));t["default"]=b.exports},d0bc:function(e,t,r){},f4c2:function(e,t,r){"use strict";r("9f09")}}]);