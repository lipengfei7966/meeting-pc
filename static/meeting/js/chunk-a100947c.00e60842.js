(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a100947c"],{"1ce7":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"event_list"},[t("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"我创建的会议",name:"0"}}),t("el-tab-pane",{attrs:{label:"我的草稿",name:"4"}})],1),t("div",{staticStyle:{padding:"5px"}},[t("screen",{attrs:{filtrate:e.filtrate},on:{screen:e.screen,reset:e.reset}}),t("mettingList",{ref:"mettingList",attrs:{tableData:e.dataList,columns:e.columns,operate:e.operate},on:{classifyName:e.classifyName,handleSizeChange:e.handleSizeChange,handleCurrentChange:e.handleCurrentChange}})],1)],1)},s=[],i=a("cf45"),l=a("87da"),o=a("b7e4"),r={name:"eventList",components:{screen:l["a"],mettingList:o["a"]},data(){return{showMoreSearch:!0,biddingStatus:[{code:"0010-11",name:"结算完成"},{code:"0010-5",name:"会议已创建"},{code:"0010-8",name:"会议进行中"},{code:"0010-6",name:"询价中"},{code:"0010-1",name:"已取消"},{code:"0010-7",name:"已确定供应商"},{code:"0010-9",name:"待结算（尚无结算单）"},{code:"0010-12",name:"会议过期"},{code:"0010-10",name:"结算中（待审核）"}],cityList:[],event_date:[],eventSearch:{eventName:"",eventId:"",buyer:"",RFPNo:"",po:"",biddingStatus:"",pageSize:10,page:1,eventSearchType:"0",tourist_group_no:"",event_city:"",createUser:"",ownerUser:"",event_assistant:"",event_settlement:"",cvent_no:"",pr:"",event_startdate:"",event_enddate:""},customerList:[],pageInfo:{totalCount:0},searchInfo:{},activeName:"0",dataList:[],buyerOptions:[],username:"",filtrate:[{label:"客户",type:"select",fieId:"company_id",modelVal:"",selsetVal:[]},{label:"会议名称",type:"input",modelVal:"",fieId:"eventName",inputType:"string"},{label:"会议状态",type:"select",fieId:"biddingStatus",modelVal:"",selsetVal:[{code:"0010-11",name:"结算完成"},{code:"0010-5",name:"会议已创建"},{code:"0010-8",name:"会议进行中"},{code:"0010-6",name:"询价中"},{code:"0010-1",name:"已取消"},{code:"0010-7",name:"已确定供应商"},{code:"0010-9",name:"待结算（尚无结算单）"},{code:"0010-12",name:"会议过期"},{code:"0010-10",name:"结算中（待审核）"}]},{label:"会议ID",type:"input",modelVal:"",fieId:"eventId",inputType:"string"},{label:"会议时间",type:"daterange",modelVal:"",fieId:"event_date"},{label:"团电脑号",type:"input",modelVal:"",fieId:"tourist_group_no",inputType:"string"},{label:"PO单号",type:"input",modelVal:"",fieId:"po",inputType:"string"},{label:"询价单号",type:"input",modelVal:"",fieId:"RFPNo",inputType:"string"},{label:"会议城市",type:"select",fieId:"event_city",modelVal:"",selsetVal:[]},{label:"会议创建人",type:"select",fieId:"createUser",disabled:!0,modelVal:"",selsetVal:[]},{label:"会议负责人",type:"select",fieId:"ownerUser",disabled:!1,modelVal:"",selsetVal:[]},{label:"采购负责人",type:"select",fieId:"buyer",disabled:!1,modelVal:"",selsetVal:[]},{label:"会议助理",type:"select",fieId:"event_assistant",modelVal:"",selsetVal:[]},{label:"合规审查人",type:"select",fieId:"event_settlement",modelVal:"",selsetVal:[]},{label:"Cvent号",type:"input",modelVal:"",fieId:"cvent_no",inputType:"string"},{label:"PR号",type:"input",modelVal:"",fieId:"pr",inputType:"string"}],columns:[{label:"会议名称",align:"left",minWidth:"15%",prop:"event_name",hidden:!0},{label:"团电脑号",minWidth:"10%",prop:"tourist_group_no",hidden:!0},{label:"会议时间",minWidth:"20%",prop:"event_startdate",slot:"time",hidden:!0},{label:"会议城市",minWidth:"10%",prop:"event_city_name",hidden:!1},{label:"采购负责人",minWidth:"10%",prop:"purchaseInfo",slot:"purchaseInfo",hidden:!1},{label:"客户联系人",minWidth:"10%",prop:"contact_name",hidden:!1},{label:"会议概况",minWidth:"15%",prop:"inquiry_count",slot:"inquiry_count",hidden:!0},{label:"会议状态",minWidth:"10%",prop:"eventTypeName",slot:"eventTypeName_",hidden:!0}],operate:[{propName:"查看详情",classifyName:"particulars"},{propName:"编辑会议",classifyName:"editClick"}],operates:[],seek:{eventName:"",eventId:"",buyer:"",RFPNo:"",po:"",biddingStatus:"",pageSize:10,page:1,tourist_group_no:"",event_city:"",createUser:"",ownerUser:"",event_assistant:"",event_settlement:"",cvent_no:"",pr:"",event_startdate:"",event_enddate:"",eventSearchType:"0"},state:!0}},mounted(){this.loadData(),this.getBuyerOptions(),this.company(),this.getCityList(),this.$refs.mettingList.tableTitle="会议列表"},created(){this.operates=JSON.parse(JSON.stringify(this.operate)),this.operate.splice(1,1),console.log(this.operates)},methods:{formatDate:i["d"],goDetail(e){console.log(e),this.$router.push({path:"/DMCEventDetail",query:{id:e.id,name:e.event_name,eventSearchType:this.activeName}})},editBaseTap(e){this.$router.push({name:"DMCcreateEvent",query:{event_num:e.event_num,id:e.id,name:e.name,eventSearchType:this.activeName,type:"edit"}})},company(){this.$api.GetCustomerEventInfoPost({},"POST").then(e=>{this.filtrate[0].selsetVal=e})},changeEventDate(e){var t,a;this.eventSearch.event_startdate=null!==(t=this.formatDate("YYYY-mm-dd",e[0]))&&void 0!==t?t:"",this.eventSearch.event_enddate=null!==(a=this.formatDate("YYYY-mm-dd",e[1]))&&void 0!==a?a:""},getCityList(){this.$api.getCityList({},"GET").then(e=>{this.filtrate[8].selsetVal=e})},getDataList(e=0){1===e?this.eventSearch.page=1:2===e&&(this.eventSearch={eventName:"",eventId:"",buyer:"",RFPNo:"",po:"",biddingStatus:"",pageSize:10,page:1,tourist_group_no:"",event_city:"",createUser:"",ownerUser:"",event_assistant:"",event_settlement:"",cvent_no:"",pr:"",event_startdate:"",event_enddate:"",eventSearchType:this.activeName},this.event_date=[]),this.$api.getEventList(this.eventSearch,"GET").then(e=>{this.dataList=e.EventModels,this.pageInfo=e.pageInfo})},changeMore(){this.showMoreSearch=!this.showMoreSearch,this.eventSearch.eventId="",this.eventSearch.tourist_group_no="",this.eventSearch.po="",this.eventSearch.RFPNo="",this.eventSearch.event_city="",this.eventSearch.createUser="",this.eventSearch.ownerUser="",this.eventSearch.buyer="",this.eventSearch.event_assistant="",this.eventSearch.event_settlement="",this.eventSearch.cvent_no="",this.eventSearch.pr=""},handleClick(e,t){this.eventSearch.eventSearchType=this.activeName,this.eventSearch.page=1,this.filtrate.forEach(e=>{"checkbox"==e.type?e.modelVal=[]:e.modelVal=""}),this.seek={eventName:"",eventId:"",buyer:"",RFPNo:"",po:"",biddingStatus:"",pageSize:10,page:1,tourist_group_no:"",event_city:"",createUser:"",ownerUser:"",event_assistant:"",event_settlement:"",cvent_no:"",pr:"",event_startdate:"",event_enddate:"",eventSearchType:this.activeName},this.loadData(),4==e.name?(this.operate=JSON.parse(JSON.stringify(this.operates)),this.operate.splice(0,1),console.log(this.operates)):(this.operate=JSON.parse(JSON.stringify(this.operates)),this.operate.splice(1,1),console.log(this.operates))},getBuyerOptions(){this.$api.getCustomerContacts({},"get").then(e=>{this.filtrate[9].selsetVal=e,this.filtrate[10].selsetVal=e,this.filtrate[11].selsetVal=e,this.filtrate[12].selsetVal=e,this.filtrate[13].selsetVal=e})},screen(e){this.seek=e,e.event_date?(e.event_startdate=e.event_date[0],e.event_enddate=e.event_date[1]):(e.event_startdate="",e.event_enddate=""),this.seek.pageSize=10,this.seek.page=1,this.loadData(),console.log(e)},reset(e){this.seek={eventName:"",eventId:"",buyer:"",RFPNo:"",po:"",biddingStatus:"",pageSize:10,page:1,tourist_group_no:"",event_city:"",createUser:"",ownerUser:"",event_assistant:"",event_settlement:"",cvent_no:"",pr:"",event_startdate:"",event_enddate:"",eventSearchType:this.activeName},this.loadData(),console.log(e)},classifyName(e,t){let a=this.$options.methods;const n=this;a[e](n,t)},handleSizeChange(e){this.seek.pageSize=e,this.seek.page=1,this.state=!1,this.loadData(),console.log(`每页 ${e} 条-`)},handleCurrentChange(e){this.state&&(this.seek.page=e,this.loadData(),console.log(`当前页: ${e}-`))},editClick(e,t){e.editBaseTap(t),console.log(e,t,"编辑")},particulars(e,t){e.goDetail(t),console.log(e,t,"详情")},loadData(){this.seek.eventSearchType=this.activeName,this.$api.getEventList(this.seek,"GET").then(e=>{this.dataList=e.EventModels,e&&(this.state=!0),this.pageInfo=e.pageInfo,this.$refs.mettingList.pageIndex=this.pageInfo.pageIndex,this.$refs.mettingList.pageSize=this.pageInfo.pageSize,this.$refs.mettingList.totalCount=this.pageInfo.totalCount})}}},d=r,h=(a("8765"),a("0b56")),p=Object(h["a"])(d,n,s,!1,null,null,null);t["default"]=p.exports},8765:function(e,t,a){"use strict";a("ab71")},ab71:function(e,t,a){}}]);