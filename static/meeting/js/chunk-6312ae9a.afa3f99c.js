(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6312ae9a"],{"76a2":function(t,e,i){},b4a7:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"approve-page-body",staticStyle:{"padding-top":"40px"}},[e("div",{staticClass:"centerBox"},[e("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[e("el-breadcrumb-item",{staticClass:"el-breadcrumb-item",attrs:{to:{path:"/"}}},[t._v(" 首页 ")]),e("el-breadcrumb-item",{staticClass:"el-bread-item",attrs:{to:{path:"/otherSettings"}}},[t._v(" 其他配置 ")]),e("el-breadcrumb-item",{staticClass:"el-bread-item"},[t._v(" 报表权限 ")])],1)],1)]),e("div",{staticClass:"search_area"},[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("div",{staticStyle:{width:"130px"}},[t._v("会议台账名称")]),e("el-input",{attrs:{placeholder:"输入报表名称模糊查询",size:"mini",type:"text"},model:{value:t.reportname,callback:function(e){t.reportname=e},expression:"reportname"}})],1),e("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"mini"},on:{click:t.query}},[t._v("查询")]),e("el-button",{staticStyle:{"margin-left":"20px"},attrs:{size:"mini"},on:{click:t.reset}},[t._v("重置")]),e("el-button",{staticStyle:{"margin-left":"80px"},attrs:{type:"primary",size:"mini"},on:{click:t.addUser}},[t._v("添加报表权限")]),e("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"mini"},on:{click:t.batchDel}},[t._v("批量移除报表权限")])],1),e("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableInfo.EvetModels,"tooltip-effect":"dark"},on:{"selection-change":t.userSelection}},[e("el-table-column",{attrs:{type:"selection",width:"55"}}),e("el-table-column",{attrs:{prop:"name",label:"报表名称",width:"180"}}),e("el-table-column",{attrs:{prop:"group_user_name",label:"所属用户组",width:"160"}}),e("el-table-column",{attrs:{label:"操作",width:"260"},scopedSlots:t._u([{key:"default",fn:function(i){return[e("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.delUser(i.$index,i.row)}}},[t._v("移除报表权限")])]}}])})],1),t.tableInfo.EvetModels.length?e("el-pagination",{staticStyle:{"margin-top":"30px",width:"100%","text-align":"center"},attrs:{"hide-on-single-page":!0,"current-page":t.pageIndex,"page-size":t.pageSize,background:"",layout:"total, prev, pager, next",total:t.tableInfo.pageInfo.totalCount},on:{"current-change":t.currentChange}}):t._e(),e("el-dialog",{attrs:{title:"请选择",visible:t.dialogVisible,width:"70%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[e("div",{staticClass:"grid_content"},[e("div",{staticClass:"search_condition"},[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("div",{staticStyle:{width:"130px"}},[t._v("会议台账名称")]),e("el-input",{attrs:{size:"mini",type:"text"},model:{value:t.grid.reportname,callback:function(e){t.$set(t.grid,"reportname",e)},expression:"grid.reportname"}})],1),e("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary",size:"mini"},on:{click:t.queryGrid}},[t._v("查询")])],1),e("div",{staticClass:"search_result"},[e("el-table",{ref:"gridMultipleTable",staticStyle:{width:"100%"},attrs:{data:t.gridResult.EvetModels,"tooltip-effect":"dark",height:"250"},on:{"selection-change":t.handleSelectionChange}},[e("el-table-column",{attrs:{type:"selection",width:"55"}}),e("el-table-column",{attrs:{prop:"name",label:"报表名称",width:"180"}})],1)],1)]),e("span",{staticClass:"dialog-footer",staticStyle:{display:"flex","justify-content":"center"},attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:t.handleClose}},[t._v("取 消")]),e("el-button",{attrs:{type:"primary"},on:{click:t.saveGrid}},[t._v("确 定")])],1)])],1)},a=[],r={data:function(){return{id:"",reportname:"",pageIndex:1,pageSize:10,tableInfo:{EvetModels:[],pageInfo:{totalCount:0}},batchList:[],dialogVisible:!1,grid:{reportname:""},gridResult:{EvetModels:[]},chooseList:[]}},mounted(){this.id=this.$route.query.id,this.getReportGroupList()},methods:{getReportGroupList(){this.$api.GetReportGroupList({usergroup_id:this.id,reportname:this.reportname,pageIndex:this.pageIndex,pageSize:this.pageSize},"POST").then(t=>{this.tableInfo=t})},userSelection(t){this.batchList=t},query(){this.getReportGroupList()},reset(){this.reportname="",this.pageIndex=1,this.pageSize=10,this.getReportGroupList()},batchDel(){if(!this.batchList.length)return this.$message.success("未选中需要操作的记录！"),!1;this.$confirm("是否将选中报表权限移除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{let t=[];this.batchList.forEach(e=>{t.push(e.reportid)}),this.$api.DeleteReportDate({usergroup_id:this.id,reportid:t.join(",")},"POST").then(t=>{t&&this.$message.success("删除成功"),this.batchList=[],this.reset()})})},delUser(t,e){this.$confirm("是否将当前报表权限移除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{this.$api.DeleteReportDate({usergroup_id:this.id,reportid:e.reportid},"POST").then(t=>{t&&this.$message.success("删除成功"),this.reset()})})},currentChange(t){this.pageIndex=t,this.getReportGroupList()},getUserlist(t){this.$api.GetReportList(this.grid,"POST").then(e=>{e.EvetModels=e.EvetModels.map(t=>(t.chooseSave=0,t)),this.gridResult=e,t&&(this.dialogVisible=!0)})},addUser(){this.getUserlist(!0)},handleSelectionChange(t){this.chooseList=t},queryGrid(){this.getUserlist()},handleClose(){this.resetSearch(),this.dialogVisible=!1},resetSearch(){this.grid={reportname:""},this.chooseList=[]},saveGrid(){if(!this.chooseList.length)return this.$message.success("请先选择报表"),!1;let t=[];this.chooseList.forEach(e=>{t.push(e.id)}),this.$api.PostReportList({usergroup_id:this.id,reportid:t.join(",")},"POST").then(t=>{this.$message.success(t.info),this.handleClose(),this.reset()})}}},l=r,o=(i("b724"),i("0b56")),n=Object(o["a"])(l,s,a,!1,null,null,null);e["default"]=n.exports},b724:function(t,e,i){"use strict";i("76a2")}}]);