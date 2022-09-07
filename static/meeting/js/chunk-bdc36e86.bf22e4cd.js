(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bdc36e86"],{"456e":function(t,e,a){},"7ac6":function(t,e,a){"use strict";a("456e")},aa2b:function(t,e,a){},c5d7:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=this,a=e.$createElement,n=e._self._c||a;return n("div",{staticClass:"ServiceProjectManagement"},[n("div",{staticClass:"title"},[e._v("服务项目管理")]),n("div",{staticClass:"content"},[n("div",{staticClass:"tools"},[n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addServiceStatus=!0}}},[e._v("添加服务项目")])],1),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData.List,stripe:"",height:"100%"}},[n("el-table-column",{attrs:{type:"index",width:"50"}}),n("el-table-column",{attrs:{prop:"name",label:"服务名称"}}),n("el-table-column",{attrs:{prop:"price",label:"服务价格"}}),n("el-table-column",{attrs:{prop:"content",label:"内容备注",width:"200"}}),n("el-table-column",{attrs:{prop:"statusname",label:"状态"}}),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{staticClass:"tools_btn",attrs:{size:"mini",type:"text"},on:{click:function(a){return e.update(t.$index,t.row)}}},[e._v("编辑")]),"0016-1"===t.row.status?n("el-popconfirm",{attrs:{"confirm-button-text":"下架","cancel-button-text":"取消",icon:"el-icon-info","icon-color":"red",title:"确定要下架此项目吗？"},on:{confirm:function(a){return e.offShelf(t.$index,t.row)}}},[n("el-button",{staticClass:"tools_btn",attrs:{slot:"reference",size:"mini",type:"text"},slot:"reference"},[e._v("下架")])],1):n("el-popconfirm",{attrs:{"confirm-button-text":"上架","cancel-button-text":"取消",icon:"el-icon-info","icon-color":"red",title:"确定要上架此项目吗？"},on:{confirm:function(a){return e.onShelf(t.$index,t.row)}}},[n("el-button",{staticClass:"tools_btn",attrs:{slot:"reference",size:"mini",type:"text"},slot:"reference"},[e._v("上架")])],1),n("el-popconfirm",{attrs:{"confirm-button-text":"删除","cancel-button-text":"取消",icon:"el-icon-info","icon-color":"red",title:"确定要删除此项目吗？"},on:{confirm:function(a){return e.onDelete(t.$index,t.row)}}},[n("el-button",{staticClass:"tools_btn",attrs:{slot:"reference",size:"mini",type:"text"},slot:"reference"},[e._v("删除")])],1)]}}])})],1),n("el-pagination",{staticClass:"pages",attrs:{background:"",layout:"prev, pager, next",total:e.tableData.Counts,"current-page":e.tableData.CurrentPage},on:{"current-change":e.currentChange}})],1),n("el-dialog",{attrs:{title:"添加服务项目",visible:e.addServiceStatus,"before-close":function(e){t.itemData=null,e()},width:"500px"},on:{"update:visible":function(t){e.addServiceStatus=t}}},[e.addServiceStatus?n("serviceItemsAdded",{attrs:{"item-data":e.itemData},on:{onColse:e.save}}):e._e()],1)],1)},i=[],s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"service_items_added"},[a("el-form",{ref:"ruleForm",attrs:{"label-width":"80px",model:t.FormData,rules:t.rules}},[a("el-form-item",{attrs:{label:"服务名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"服务名称"},model:{value:t.FormData.name,callback:function(e){t.$set(t.FormData,"name",e)},expression:"FormData.name"}})],1),a("el-form-item",{attrs:{label:"服务价格",prop:"price"}},[a("el-input",{attrs:{placeholder:"服务价格"},model:{value:t.FormData.price,callback:function(e){t.$set(t.FormData,"price",e)},expression:"FormData.price"}})],1),a("el-form-item",{attrs:{label:"内容备注"}},[a("el-input",{attrs:{type:"textarea",placeholder:"内容备注",rows:"5"},model:{value:t.FormData.content,callback:function(e){t.$set(t.FormData,"content",e)},expression:"FormData.content"}})],1),a("div",{staticClass:"btnGroup"},[a("el-button",{attrs:{type:"primary"},on:{click:t.add}},[t._v(t._s(null==t.itemData?"立即添加":"确认修改"))])],1)],1)],1)},r=[],o=(a("ac1f"),a("00b4"),a("d9e2"),a("e9c4"),{props:{itemData:null|JSON},data:function(){var t=function(t,e,a){var n=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;if(!n.test(e))return a(new Error("金额输入有误"));a()};return{FormData:{name:"",price:"",content:""},rules:{name:[{required:!0,message:"请输入服务名称",trigger:"change"}],price:[{required:!0,message:"请输入服务价格",trigger:"change"},{validator:t,trigger:"change"}]}}},mounted:function(){null!=this.itemData&&(this.FormData=JSON.parse(JSON.stringify(this.itemData)))},methods:{add:function(){var t=this;this.$refs["ruleForm"].validate((function(e){if(!e)return console.log("error submit!!"),!1;t.$emit("onColse",t.FormData)}))}}}),c=o,l=(a("7ac6"),a("2877")),u=Object(l["a"])(c,s,r,!1,null,"270570d8",null),m=u.exports,d={name:"ServiceProjectManagement",components:{serviceItemsAdded:m},data:function(){return{addServiceStatus:!1,itemData:null,tableData:{CurrentPage:1,List:[]}}},methods:{update:function(t,e){this.itemData=e,this.addServiceStatus=!0},onShelf:function(t,e){var a=this;this.$api.serviceitemsonline({id:e.id},"POST").then((function(t){a.$message({message:"上架成功！",type:"success"}),a.GetList()}))},offShelf:function(t,e){var a=this;this.$api.serviceitemsoffline({id:e.id},"POST").then((function(t){a.$message({message:"下架成功！",type:"success"}),a.GetList()}))},onDelete:function(t,e){var a=this;this.$api.serviceitemsdelete({id:e.id},"POST").then((function(t){a.$message({message:"删除成功！",type:"success"}),a.GetList()}))},GetList:function(){var t=this;this.$api.serviceitemslist({Page:this.tableData.CurrentPage,Rows:10},"POST").then((function(e){t.tableData=e}))},currentChange:function(t){this.tableData.CurrentPage=t,this.GetList()},save:function(t){var e=this;this.$api.serviceitemssave(t,"POST").then((function(a){e.$message({message:t.id?"修改成功！":"添加成功！",type:"success"}),e.addServiceStatus=!1,t.id||(e.tableData.CurrentPage=1),e.GetList()}))}},mounted:function(){this.GetList()}},f=d,p=(a("ff32"),Object(l["a"])(f,n,i,!1,null,"57c501d3",null));e["default"]=p.exports},ff32:function(t,e,a){"use strict";a("aa2b")}}]);