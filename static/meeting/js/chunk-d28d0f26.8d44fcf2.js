(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d28d0f26"],{"0cb8":function(t,e,a){},"30f5":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"approve-page"},[a("div",{staticClass:"approve-page-body"},[a("div",{staticClass:"centerBox"},[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{staticClass:"el-breadcrumb-item",attrs:{to:{path:"/"}}},[t._v(" 首页 ")]),a("el-breadcrumb-item",{staticClass:"el-bread-item"},[t._v("其他配置")])],1),a("el-tabs",{attrs:{type:"border-card"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{name:"first",label:"部门-会议类型设置"}},[a("approval")],1),a("el-tab-pane",{attrs:{name:"second",label:"报价结算规则配置"}},[a("quotationSettlement")],1),a("el-tab-pane",{attrs:{name:"third",label:"DMC-用户绑定配置"}},[a("DMCuserbind")],1),a("el-tab-pane",{attrs:{name:"fourth",label:"消息通知配置"}},[a("message")],1),a("el-tab-pane",{attrs:{name:"fifth",label:"会议附加信息配置"}},[a("otherMessage")],1),a("el-tab-pane",{attrs:{name:"sixth",label:"数据权限配置"}},[a("permissionConfig")],1)],1)],1)])])},i=[],s=a("52f1"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(e){return t.toPage()}}},[t._v("新增报价结算规则")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"company_name",label:"客户",width:"180"}}),a("el-table-column",{attrs:{prop:"eventtype",label:"会议类型",width:"180"}}),a("el-table-column",{attrs:{prop:"province_code",label:"会议城市"}}),a("el-table-column",{attrs:{prop:"servicerule",label:"服务费计算方式"}}),a("el-table-column",{attrs:{prop:"isrestore",label:"专票还原税前"}}),a("el-table-column",{attrs:{prop:"remark",label:"备注"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return t.toPage(e.row)}}},[t._v("编辑")]),e.row.is_default?a("el-button",{attrs:{size:"small"},on:{click:function(a){return t.deleteRule(e.row.id)}}},[t._v("删除")]):t._e(),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("span",[t._v("删除规则后不可恢复，请确认是否删除")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitDeleteRule()}}},[t._v("确 定")])],1)])]}}])})],1),a("el-pagination",{attrs:{"hide-on-single-page":"",background:"","current-page":t.pager,layout:"prev, pager, next",total:t.total},on:{"update:currentPage":function(e){t.pager=e},"update:current-page":function(e){t.pager=e}}})],1)},l=[],o=a("cf45"),u={data:function(){return{tableData:[],pager:1,total:0,dialogVisible:!1,id:""}},mounted:function(){this.getRuleList()},watch:{pager:function(t,e){this.getRuleList()}},methods:{guid:o["k"],getRuleList:function(){var t=this;this.$api.getRuleList({pageIndex:this.pager,pageSize:10},"POST").then((function(e){t.tableData=e.EvetModels,t.pager=e.pageInfo.pageIndex,t.total=e.pageInfo.totalCount}))},toPage:function(t){t?this.$router.push({name:"quotationSettlementEditor",params:{type:t.is_default,id:t.id,company_name:t.company_name,addOrEdit:0}}):this.$router.push({name:"quotationSettlementEditor",params:{type:1,id:this.guid(),company_name:"increase",addOrEdit:1}})},submitDeleteRule:function(){var t=this;this.$api.ruleDelete({RuleID:this.id},"POST").then((function(e){e?t.$message({message:"删除成功",type:"success"}):t.$message.error("删除失败"),t.dialogVisible=!1,t.getRuleList()}))},deleteRule:function(t){this.id=t,this.dialogVisible=!0}}},c=u,d=(a("aa73"),a("2877")),p=Object(d["a"])(c,r,l,!1,null,"4fc5a059",null),m=p.exports,f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{attrs:{model:t.searchFormData,"label-width":"120px"}},[a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"DMC供应商名称"}},[a("el-input",{staticClass:"demand_170",attrs:{size:"small",clearable:"",placeholder:"请输入名称模糊查询"},model:{value:t.searchFormData.name,callback:function(e){t.$set(t.searchFormData,"name",e)},expression:"searchFormData.name"}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"绑定用户"}},[a("div",{staticStyle:{display:"flex"}},[a("el-select",{staticStyle:{width:"100px"},attrs:{size:"small"},on:{change:t.isnullChange},model:{value:t.searchFormData.isnull,callback:function(e){t.$set(t.searchFormData,"isnull",e)},expression:"searchFormData.isnull"}},[a("el-option",{attrs:{label:"全部",value:-1}}),a("el-option",{attrs:{label:"不为空",value:0}}),a("el-option",{attrs:{label:"为空",value:1}})],1),a("el-input",{directives:[{name:"show",rawName:"v-show",value:-1==t.searchFormData.isnull||0==t.searchFormData.isnull,expression:"searchFormData.isnull==-1 || searchFormData.isnull==0"}],staticClass:"demand_170",attrs:{size:"small",clearable:"",placeholder:"请输入账号模糊查询"},model:{value:t.searchFormData.username,callback:function(e){t.$set(t.searchFormData,"username",e)},expression:"searchFormData.username"}})],1)])],1),a("el-col",{attrs:{span:6,align:"right"}},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){return t.getDataList(1)}}},[t._v("搜 索")]),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){return t.getDataList(2)}}},[t._v("重 置")])],1)],1)],1),a("el-table",{staticStyle:{height:"380px"},attrs:{border:"",data:t.userbidData}},[a("el-table-column",{attrs:{label:"DMC供应商名称 ",prop:"company_name",align:"center",width:"350px","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"地址",prop:"company_address",align:"center",width:"330","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"绑定用户账号",prop:"username",align:"center",formatter:"","show-overflow-tooltip":""}}),a("el-table-column",{attrs:{label:"操作",prop:"",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.updateBind(e.row)}}},[t._v("更新绑定用户")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.pageInfo.totalCount},on:{"current-change":t.handleCurrentChange}})],1),a("el-dialog",{attrs:{title:"更新绑定用户",visible:t.dialogVisible,top:"30vh",width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",{staticStyle:{"line-height":"40px"}},[a("p",{staticClass:"flex_row"},[a("span",{staticStyle:{width:"150px"}},[t._v("DMC供应商名称：")]),a("span",[t._v(" "+t._s(t.updateInfo.company_name)+" ")])]),a("p",{staticClass:"flex_row"},[a("span",{staticStyle:{width:"150px"}},[t._v("地址：")]),a("span",[t._v(" "+t._s(t.updateInfo.company_address))])]),a("p",{staticClass:"flex_row"},[a("span",{staticStyle:{width:"150px"}},[t._v("绑定用户账号：")]),a("el-select",{attrs:{size:"mini",filterable:"",multiple:"",placeholder:"请选择"},model:{value:t.updateInfo.username,callback:function(e){t.$set(t.updateInfo,"username",e)},expression:"updateInfo.username"}},t._l(t.userOptionsList,(function(t){return a("el-option",{key:t.username,attrs:{label:t.fullname,value:t.username}})})),1)],1),a("p",{staticStyle:{color:"#999","line-height":"20px",margin:"20px 0"}},[t._v("注释：更新绑定用户后，当前供应商的历史询、报价、订单、结算单信息只有新绑定用户可见")])]),a("div",{staticStyle:{"text-align":"center"}},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.saveUpdateInfo}},[t._v("保 存")]),a("el-button",{attrs:{size:"small"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")])],1)])],1)},h=[],b=a("5530"),g=(a("b0c0"),a("ac1f"),a("1276"),a("a15b"),a("d3b7"),a("159b"),{data:function(){return{searchFormData:{pageIndex:1,pageSize:10,name:"",isnull:-1,username:""},isEmpty:1,userbidData:[{id:"",name:"昆明中国国际旅行社有限公司",address:"云南省昆明市环城南路1118号",username:"service001"},{id:"",name:"中国国旅（武汉）国际旅行社有限公司",address:"湖北省武汉市硚口区古田四路江城壹号文化创意园10号楼",username:"service002"},{id:"",name:"中国国旅（辽宁）国际旅行社有限公司",address:"沈阳市和平区南京北街65号华银大厦13层",username:"service003"},{id:"",name:"中国国旅（宁波）国际旅行社有限公司",address:"宁波市海曙区开明街396号平安大厦12楼",username:"service004"},{id:"",name:"中国国旅（青岛）国际旅行社有限公司",address:"青岛市市北区连云港路33号B座5层517-520室",username:"service005"}],userOptionsList:[],updateInfo:{id:"",name:"",address:"",username:""},pageInfo:{totalCount:0},dialogVisible:!1}},mounted:function(){this.getDataList(),this.GetUser()},methods:{handleCurrentChange:function(t){this.searchFormData.pageIndex=t,console.log("当前页: ".concat(t)),this.getDataList()},getDataList:function(t){var e=this;2==t&&(this.searchFormData.name="",this.searchFormData.isnull=-1,this.searchFormData.username=""),this.$api.GetServiceProviderUser(this.searchFormData,"POST").then((function(t){e.userbidData=t.EvetModels,e.pageInfo=t.pageInfo}))},GetUser:function(){var t=this;this.$api.GetUser({},"POST").then((function(e){t.userOptionsList=e}))},isnullChange:function(t){1==t&&(this.searchFormData.username="")},updateBind:function(t){this.dialogVisible=!0,this.updateInfo=Object(b["a"])({},t),this.updateInfo.username=this.updateInfo.username.split(",")},saveUpdateInfo:function(){var t=this,e={ID:this.updateInfo.id,UserName:this.updateInfo.username.join()};this.$api.ServiceProviderEditUser(e,"POST").then((function(e){e?(t.$message.success("修改成功"),t.dialogVisible=!1,t.getDataList()):t.$message.error("已经有其他服务商使用该用户")}))},userFormatter:function(t){var e="",a=t.username.split(",");return this.userOptionsList.forEach((function(t){a.forEach((function(a){a==t.username&&(e.length>0?e+="，"+t.fullname:e=t.fullname)}))})),e}}}),v=g,y=(a("b777"),Object(d["a"])(v,f,h,!1,null,null,null)),_=y.exports,w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v(" 消息通知配置 ")])},x=[],D={},S=Object(d["a"])(D,w,x,!1,null,null,null),k=S.exports,$=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"permission_header"},[a("el-button",{staticClass:"add_button",attrs:{type:"primary"},on:{click:t.addPermission}},[t._v("新增用户组")])],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableInfo.EvetModels}},[a("el-table-column",{attrs:{align:"left",prop:"group_user_name",label:"用户组名称",width:"160"}}),a("el-table-column",{attrs:{align:"center",label:"组内用户",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticStyle:{color:"blue",cursor:"pointer"},on:{click:function(a){return t.member(e.$index,e.row)}}},[t._v(t._s(e.row.counts))])]}}])}),a("el-table-column",{attrs:{align:"center",prop:"group_user_type",label:"类型",width:"180"}}),a("el-table-column",{attrs:{align:"center",prop:"group_user_remarks",label:"备注",width:"180"}}),a("el-table-column",{attrs:{align:"right",label:"操作",width:"420"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.edit(e.$index,e.row)}}},[t._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.member(e.$index,e.row)}}},[t._v("组员管理")]),1!=e.row.grouptype?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.customer(e.$index,e.row)}}},[t._v("客户权限")]):t._e(),1!=e.row.grouptype?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.report(e.$index,e.row)}}},[t._v("报表权限")]):t._e(),a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.del(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t.tableInfo.EvetModels.length?a("el-pagination",{staticStyle:{"margin-top":"30px",width:"100%","text-align":"center"},attrs:{"current-page":t.pageIndex,"page-size":t.pageSize,background:"",layout:"total, prev, pager, next",total:t.tableInfo.pageInfo.totalCount},on:{"current-change":t.currentChange}}):t._e()],1)},C=[],I={components:{},data:function(){return{pageIndex:1,pageSize:10,tableInfo:{EvetModels:[],pageInfo:{totalCount:0}}}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.$api.GetUserGroupList({pageIndex:this.pageIndex,pageSize:this.pageSize},"POST").then((function(e){t.tableInfo=e}))},addPermission:function(){this.$router.push({name:"addeditUsergroup",query:{}})},edit:function(t,e){this.$router.push({name:"addeditUsergroup",query:{id:e.id}})},member:function(t,e){this.$router.push({name:"membermanage",query:{id:e.id}})},customer:function(t,e){this.$router.push({name:"customermanage",query:{id:e.id}})},report:function(t,e){this.$router.push({name:"reportmanage",query:{id:e.id}})},del:function(t,e){var a=this;this.$confirm("请确认是否执行删除操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.$api.DeleteUserGroupDate({usergroup_id:e.id},"POST").then((function(t){a.$message.success("删除成功"),a.pageIndex=1,a.pageSize=10,a.getList()})).catch((function(){}))}))},currentChange:function(t){this.pageIndex=t,this.getList()}}},L=I,z=(a("a252"),Object(d["a"])(L,$,C,!1,null,null,null)),O=z.exports,E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(e){return t.toPage()}}},[t._v("新增附加信息规则配置")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","header-cell-style":{"text-align":"center"},"cell-style":{"text-align":"center"}}},[a("el-table-column",{attrs:{prop:"cusname",label:"客户",width:"380"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(e.row.isdefault?"ALL":e.row.cusname)+" ")]}}])}),a("el-table-column",{attrs:{prop:"fieldcount",label:"自定义字段",width:"180"}}),a("el-table-column",{attrs:{prop:"remark",label:"备注"}}),a("el-table-column",{attrs:{label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return t.toPage(e.row)}}},[t._v("编辑")]),a("div",{staticStyle:{display:"inline-block","margin-left":"10px",width:"56px"}},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.row.isdefault,expression:"!scope.row.isdefault"}],attrs:{size:"small"},on:{click:function(a){return t.deleteRule(e.row.id)}}},[t._v("删除")])],1),a("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("span",[t._v("删除规则后不可恢复，请确认是否删除")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitDeleteRule()}}},[t._v("确 定")])],1)])]}}])})],1),a("el-pagination",{attrs:{"hide-on-single-page":"",background:"","current-page":t.pager,layout:"prev, pager, next",total:t.total},on:{"update:currentPage":function(e){t.pager=e},"update:current-page":function(e){t.pager=e}}})],1)},F=[],P={data:function(){return{tableData:[],pager:1,total:0,dialogVisible:!1,id:""}},mounted:function(){this.getSelfformList()},watch:{pager:function(t,e){this.getSelfformList()}},methods:{guid:o["k"],getSelfformList:function(){var t=this;this.$api.getSelfformList({},"POST").then((function(e){t.tableData=e.list}))},toPage:function(t){t?this.$router.push({path:"/otherMessageSeetingEditor",query:{isdefault:t.isdefault,id:t.id,addOrEdit:0}}):this.$router.push({path:"/otherMessageSeetingEditor",query:{isdefault:0,id:this.guid(),addOrEdit:1}})},submitDeleteRule:function(){var t=this;this.$api.DeleteSelfForm({id:this.id},"POST").then((function(e){e?t.$message({message:"删除成功",type:"success"}):t.$message.error("删除失败"),t.dialogVisible=!1,t.getSelfformList()}))},deleteRule:function(t){this.id=t,this.dialogVisible=!0}}},V=P,M=(a("3b4f"),Object(d["a"])(V,E,F,!1,null,"5fa00d20",null)),R=M.exports,j={components:{approval:s["default"],DMCuserbind:_,message:k,quotationSettlement:m,otherMessage:R,permissionConfig:O},data:function(){return{activeName:"first"}},methods:{},mounted:function(){this.$route.params.activeName&&(this.activeName=this.$route.params.activeName)}},U=j,q=(a("9db4"),Object(d["a"])(U,n,i,!1,null,null,null));e["default"]=q.exports},"3b4f":function(t,e,a){"use strict";a("9f31")},5673:function(t,e,a){},"93a7":function(t,e,a){},"9db4":function(t,e,a){"use strict";a("0cb8")},"9f31":function(t,e,a){},a15b:function(t,e,a){"use strict";var n=a("23e7"),i=a("e330"),s=a("44ad"),r=a("fc6a"),l=a("a640"),o=i([].join),u=s!=Object,c=l("join",",");n({target:"Array",proto:!0,forced:u||!c},{join:function(t){return o(r(this),void 0===t?",":t)}})},a252:function(t,e,a){"use strict";a("93a7")},aa73:function(t,e,a){"use strict";a("5673")},b777:function(t,e,a){"use strict";a("c4d3")},c4d3:function(t,e,a){}}]);