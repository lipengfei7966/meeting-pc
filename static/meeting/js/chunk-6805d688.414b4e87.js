(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6805d688"],{"0e5b":function(e,t,s){"use strict";s("6ed5")},"0f45":function(e,t,s){},"11ed":function(e,t,s){"use strict";s("0f45")},"2d91":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"activityOrderList"},[t("div",{staticClass:"content"},[t("div",[t("screen",{ref:"screen",attrs:{filtrate:e.filtrate},on:{screen:e.screen,reset:e.reset}})],1),t("mettingList",{ref:"mettingList",attrs:{tableData:e.tableData.List,columns:e.columns,operate:e.operate},on:{classifyName:e.classifyName,handleSizeChange:e.handleSizeChange,handleCurrentChange:e.handleCurrentChange}})],1),t("el-dialog",{attrs:{title:"留言",visible:e.leaveMessageStatus,"before-close":e=>{this.itemData=null,this.GetList(),e()},center:!0,width:"600px"},on:{"update:visible":function(t){e.leaveMessageStatus=t}}},[e.leaveMessageStatus?t("leaveMessage",{attrs:{id:e.leaveMessageId}}):e._e()],1)],1)},i=[],l=s("3e9f"),n=s("87da"),o=s("b7e4"),d=s("cf45"),r={name:"activityOrderList",components:{leaveMessage:l["a"],screen:n["a"],mettingList:o["a"]},data(){return{leaveMessageStatus:!1,leaveMessageId:null,allStatus:[{code:"0012-1",name:"未报价"},{code:"0012-2",name:"等待客户决定"},{code:"0012-3",name:"已签约"},{code:"0012-4",name:"您已拒绝报价"},{code:"0012-5",name:"未中标"},{code:"0012-6",name:"要求重新报价"},{code:"0012-7",name:"已取消"}],po:{inquiry_sheet_code:"",startdate:null,enddate:null,status:""},tableData:{CurrentPage:1,List:[]},page_size:10,filtrate:[{label:"询价单号",type:"input",modelVal:"",fieId:"inquiry_sheet_code",inputType:"string"},{label:"开始时间",type:"datePicker",modelVal:"",fieId:"startdate"},{label:"结束时间",type:"datePicker",modelVal:"",fieId:"enddate"},{label:"状态",type:"select",fieId:"status",modelVal:"",selsetVal:[{code:"0012-1",name:"未报价"},{code:"0012-2",name:"等待客户决定"},{code:"0012-3",name:"已签约"},{code:"0012-4",name:"您已拒绝报价"},{code:"0012-5",name:"未中标"},{code:"0012-6",name:"要求重新报价"},{code:"0012-7",name:"已取消"}]}],columns:[{label:"询价单号",width:"160",prop:"inquiry_sheet_code",hidden:!1},{label:"公司名称",width:"200",prop:"company_name",hidden:!0},{label:"活动名称",width:"180",align:"left",prop:"activity_name",hidden:!0},{label:"联系人",width:"120",prop:"contacts",hidden:!1},{label:"参会人数",width:"80",prop:"activity_count",hidden:!1},{label:"活动日期",prop:"activity_date",hidden:!0},{label:"报价截至日期",prop:"offerenddate",hidden:!0},{label:"报价",width:"100",prop:"total_price",hidden:!1},{label:"状态",width:"120",prop:"status",slot:"status",hidden:!1}],operate:[{propName:"留言",badge:!0,classifyName:"leaveWord"},{propName:"查看",badge:!0,classifyName:"lookOver"}],state:!0}},methods:{leaveMessage(e,t){var s=this.tableData.List.filter(e=>e.object_id==t.object_id);s.length>0&&(s[0].new_message_count=0),this.leaveMessageId=t.object_id,this.leaveMessageStatus=!0},goInfo(e,t){this.$router.push({name:"DMCactivityOrderInfo",params:{id:t.object_id}})},GetList(e){this.$api.inquirysheetList({Page:e?1:this.tableData.CurrentPage,Rows:this.page_size,po:this.po},"POST").then(e=>{e&&(this.state=!0),this.tableData=e,this.$refs.mettingList.pageIndex=this.tableData.CurrentPage,this.$refs.mettingList.pageSize=this.page_size,this.$refs.mettingList.totalCount=this.tableData.Counts,this.tableData.List.forEach(e=>{e.total_price=Object(d["m"])(e.total_price,!0)})})},screen(e){this.po=e,this.GetList(0),console.log(e)},reset(e){this.po={inquiry_sheet_code:"",startdate:null,enddate:null,status:""},this.tableData.CurrentPage=1,this.page_size=10,this.GetList(0),console.log(e)},classifyName(e,t){let s=this.$options.methods;const a=this;s[e](a,t)},handleSizeChange(e){this.page_size=e,this.tableData.CurrentPage=1,this.state=!1,this.GetList(),console.log(`每页 ${e} 条-`)},handleCurrentChange(e){this.state&&(this.tableData.CurrentPage=e,this.GetList(),console.log(`当前页: ${e}-`))},leaveWord(e,t){console.log(t),e.leaveMessage(0,t)},lookOver(e,t){console.log(t),e.goInfo(0,t)}},mounted(){this.GetList()}},c=r,h=(s("11ed"),s("0b56")),p=Object(h["a"])(c,a,i,!1,null,"f825ce06",null);t["default"]=p.exports},"3e9f":function(e,t,s){"use strict";var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"leave-message"},[t("a",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"a_click",attrs:{href:e.downloadUrl,target:"_blank",download:""}}),t("div",{staticClass:"srcoll"},[t("div",{staticClass:"message"},e._l(e.list,(function(s){return t("div",{key:s.id,staticClass:"item",class:{me:0==s.type}},[t("div",{staticClass:"date"},[e._v(e._s(0==s.type?s.Party_A+"@":s.Party_B+"@")+e._s(s.createtime))]),0==s.message_type?t("div",{staticClass:"msg"},[e._v(e._s(s.message))]):t("div",{staticClass:"msg"},[t("a",{staticStyle:{cursor:"pointer"},on:{click:function(t){return e.handlePreview(s.filepath)}}},[e._v(e._s(s.filename))])])])})),0)]),t("div",{staticClass:"edit"},[t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.text,expression:"text"}],attrs:{placeholder:"在此给客户留言..."},domProps:{value:e.text},on:{input:function(t){t.target.composing||(e.text=t.target.value)}}}),t("el-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:e.addMsg}},[e._v("留言")])],1)])},i=[],l={props:{id:String},data(){return{downloadUrl:"",list:[],text:""}},mounted(){this.getMsgList()},methods:{getMsgList(){this.$api.Leavingmessagelist({id:this.id},"POST").then(e=>{this.list=e})},addMsg(){this.text.trim()?this.$api.addLeavingmessage({message:this.text,inquiry_sheet_object_id:this.id},"POST").then(e=>{this.text="",this.getMsgList()}):this.$message.error("请输入留言信息")},handlePreview(e){if(!e)return;let t=e.substring(e.lastIndexOf(".")+1),s=["pdf","jpeg","jpg","png","txt"],a=["docx","doc","xls","xlsx","xlsm","ppt","pptx"];e=e.replace(/http:/,"https:"),this.downloadUrl=e,a.includes(t)?this.downloadUrl="https://view.officeapps.live.com/op/view.aspx?src="+encodeURIComponent(e):s.includes(t)?this.downloadUrl=e:(this.downloadUrl=e,this.$message.info("文件格式不支持预览，ssss下载后查看")),setTimeout(()=>{this.$refs.a_click.click()},100)},downloadFile(e){let t=e.slice(e.lastIndexOf(",")+1),s=e.slice(0,e.lastIndexOf(",")),a=document.createElement("a");a.href=t,a.download=s,document.body.appendChild(a),a.click()}}},n=l,o=(s("0e5b"),s("0b56")),d=Object(o["a"])(n,a,i,!1,null,"12af1877",null);t["a"]=d.exports},"6ed5":function(e,t,s){}}]);