(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f067d4ec"],{1014:function(e,t,a){},a434:function(e,t,a){"use strict";var n=a("23e7"),s=a("da84"),i=a("23cb"),o=a("5926"),l=a("07fa"),r=a("7b0b"),d=a("65f0"),c=a("8418"),h=a("1dde"),p=h("splice"),v=s.TypeError,m=Math.max,u=Math.min,g=9007199254740991,f="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!p},{splice:function(e,t){var a,n,s,h,p,y,b=r(this),_=l(b),S=i(e,_),I=arguments.length;if(0===I?a=n=0:1===I?(a=0,n=_-S):(a=I-2,n=u(m(o(t),0),_-S)),_+a-n>g)throw v(f);for(s=d(b,n),h=0;h<n;h++)p=S+h,p in b&&c(s,h,b[p]);if(s.length=n,a<n){for(h=S;h<_-n;h++)p=h+n,y=h+a,p in b?b[y]=b[p]:delete b[y];for(h=_;h>_-n+a;h--)delete b[h-1]}else if(a>n)for(h=_-n;h>S;h--)p=h+n-1,y=h+a-1,p in b?b[y]=b[p]:delete b[y];for(h=0;h<a;h++)b[h+S]=arguments[h+2];return b.length=_-n+a,s}})},ac14:function(e,t,a){"use strict";a("1014")},e396:function(e,t,a){"use strict";a.r(t);var n,s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"event_list"},[a("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"我创建的会议",name:"0"}}),a("el-tab-pane",{attrs:{label:"我负责的会议",name:"1"}}),a("el-tab-pane",{attrs:{label:"我采购的",name:"2"}}),a("el-tab-pane",{attrs:{label:"全部会议",name:"3"}}),a("el-tab-pane",{attrs:{label:"我的草稿",name:"4"}})],1),a("div",{staticStyle:{padding:"5px 0px"}},[a("screen",{attrs:{filtrate:e.filtrate},on:{screen:e.screen,reset:e.reset}}),a("mettingList",{ref:"mettingList",attrs:{tableData:e.tableData,columns:e.columns,operate:e.operate},on:{classifyName:e.classifyName,handleSizeChange:e.handleSizeChange,handleCurrentChange:e.handleCurrentChange}})],1),a("div",{directives:[{name:"show",rawName:"v-show",value:e.newMessageShow,expression:"newMessageShow"}],ref:"newMessageBox",staticClass:"newMessageBox",on:{mouseover:function(t){e.newMessageShow=!0},mouseleave:function(t){e.newMessageShow=!1}}},[a("div",{staticStyle:{"font-size":"20px",color:"#999","border-bottom":"1px solid #999",padding:"10px 20px"}},[e._v(" 会议动态 ")]),a("ul",{staticStyle:{padding:"20px"}},e._l(e.messageList,(function(t,n){return a("li",{key:n},[a("span",[e._v(" "+e._s(t.date_time)+" ")]),a("span",[e._v(" "+e._s(t.company_name)+" ")]),a("span",[e._v(" "+e._s(t.content)+" ")]),a("span",{directives:[{name:"show",rawName:"v-show",value:1==t.remind,expression:"message.remind == 1"}],staticStyle:{color:"red","font-weight":"bold","font-style":"oblique"}},[e._v(" NEW ")])])})),0)])],1)},i=[],o=a("ade3"),l=(a("e9c4"),a("a434"),a("b0c0"),a("cf45")),r=a("87da"),d=a("b7e4"),c={name:"eventList",components:{screen:r["a"],mettingList:d["a"]},data:function(){return{newMessageShow:!1,showMoreSearch:!0,messageList:[],biddingStatus:[{code:"0010-11",name:"结算完成"},{code:"0010-5",name:"会议已创建"},{code:"0010-8",name:"会议进行中"},{code:"0010-6",name:"询价中"},{code:"0010-1",name:"已取消"},{code:"0010-7",name:"已确定供应商"},{code:"0010-9",name:"待结算（尚无结算单）"},{code:"0010-12",name:"会议过期"},{code:"0010-10",name:"结算中（待审核）"}],cityList:[],event_date:[],eventSearch:{eventName:"",eventId:"",buyer:"",RFPNo:"",po:"",biddingStatus:"",pageSize:10,page:1,eventSearchType:"3",tourist_group_no:"",event_city:"",createUser:"",ownerUser:"",event_assistant:"",event_settlement:"",cvent_no:"",pr:"",event_startdate:"",event_enddate:""},customerList:[],pageInfo:{totalCount:0},searchInfo:{},activeName:"3",dataList:[],buyerOptions:[],filtrate:[{label:"客户",type:"select",fieId:"company_id",modelVal:"",selsetVal:[]},{label:"会议名称",type:"input",modelVal:"",fieId:"eventName",inputType:"string"},{label:"会议状态",type:"select",fieId:"biddingStatus",modelVal:"",selsetVal:[{code:"0010-11",name:"结算完成"},{code:"0010-5",name:"会议已创建"},{code:"0010-8",name:"会议进行中"},{code:"0010-6",name:"询价中"},{code:"0010-1",name:"已取消"},{code:"0010-7",name:"已确定供应商"},{code:"0010-9",name:"待结算（尚无结算单）"},{code:"0010-12",name:"会议过期"},{code:"0010-10",name:"结算中（待审核）"}]},{label:"会议ID",type:"input",modelVal:"",fieId:"eventId",inputType:"string"},{label:"会议时间",type:"daterange",modelVal:"",fieId:"event_date"},{label:"团电脑号",type:"input",modelVal:"",fieId:"tourist_group_no",inputType:"string"},{label:"PO单号",type:"input",modelVal:"",fieId:"po",inputType:"string"},{label:"询价单号",type:"input",modelVal:"",fieId:"RFPNo",inputType:"string"},{label:"会议城市",type:"select",fieId:"event_city",modelVal:"",selsetVal:[]},{label:"会议创建人",type:"select",fieId:"createUser",disabled:!1,modelVal:"",selsetVal:[]},{label:"会议负责人",type:"select",fieId:"ownerUser",disabled:!1,modelVal:"",selsetVal:[]},{label:"采购负责人",type:"select",fieId:"buyer",disabled:!1,modelVal:"",selsetVal:[]},{label:"会议助理",type:"select",fieId:"event_assistant",modelVal:"",selsetVal:[]},{label:"合规审查人",type:"select",fieId:"event_settlement",modelVal:"",selsetVal:[]},{label:"Cvent号",type:"input",modelVal:"",fieId:"cvent_no",inputType:"string"},{label:"PR号",type:"input",modelVal:"",fieId:"pr",inputType:"string"}],seek:{eventName:"",eventId:"",buyer:"",RFPNo:"",po:"",biddingStatus:"",pageSize:10,page:1,eventSearchType:"3",tourist_group_no:"",event_city:"",createUser:"",ownerUser:"",event_assistant:"",event_settlement:"",cvent_no:"",pr:"",event_startdate:"",event_enddate:""},tableData:[],columns:[{label:"会议名称",minWidth:"15%",prop:"event_name",align:"left",hidden:!0},{label:"团电脑号",minWidth:"10%",prop:"tourist_group_no",hidden:!0},{label:"会议时间",minWidth:"15%",prop:"event_startdate",slot:"time",hidden:!0},{label:"会议城市",minWidth:"10%",prop:"event_city_name",hidden:!1},{label:"采购负责人",minWidth:"10%",prop:"purchaseInfo",slot:"purchaseInfo",hidden:!1},{label:"客户联系人",minWidth:"10%",prop:"contact_name",hidden:!1},{label:"会议概况",minWidth:"15%",prop:"inquiry_count",slot:"inquiry_count",hidden:!0},{label:"会议状态",minWidth:"20%",prop:"eventTypeName",slot:"eventTypeName",hidden:!0}],operate:[{propName:"查看详情",classifyName:"particulars"},{propName:"编辑会议",classifyName:"editClick"}],operates:[],state:!0}},created:function(){this.operates=JSON.parse(JSON.stringify(this.operate)),this.operate.splice(1,1),console.log(this.operates)},mounted:function(){this.loadData(),this.getBuyerOptions(),this.company(),this.getCityList(),this.$refs.mettingList.tableTitle="会议列表"},methods:(n={formatDate:l["d"],goDetail:function(e){console.log(e),this.$router.push({path:"/EventDetail",query:{id:e.id,name:e.event_name,eventSearchType:this.eventSearch.eventSearchType}})},editBaseTap:function(e){this.$router.push({name:"CreateEvent",query:{event_num:e.event_num,id:e.id,name:e.name,eventSearchType:this.eventSearch.eventSearchType,type:"edit"}})},company:function(){var e=this;this.$api.GetCustomerEventInfoPost({},"POST").then((function(t){e.filtrate[0].selsetVal=t}))},changeEventDate:function(e){var t,a;this.eventSearch.event_startdate=null!==(t=this.formatDate("YYYY-mm-dd",e[0]))&&void 0!==t?t:"",this.eventSearch.event_enddate=null!==(a=this.formatDate("YYYY-mm-dd",e[1]))&&void 0!==a?a:""},getCityList:function(){var e=this;this.$api.getCityList({},"GET").then((function(t){e.cityList=t,t&&(e.filtrate[8].selsetVal=t)}))},mouseOver:function(e){var t=this;this.newMessageShow=!0,this.messageList=e.row.message_list;var a=this.$refs["eventTypeName"+e.$index].getBoundingClientRect().top,n=this.$refs["eventTypeName"+e.$index].getBoundingClientRect().right;this.$refs.newMessageBox.style.top=a+"px",this.$nextTick((function(e){var a=t.$refs.newMessageBox.offsetWidth;t.$refs.newMessageBox.style.left=n-a+"px"}))},mouseLeave:function(){this.newMessageShow=!1},getDataList:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;1===t?this.eventSearch.page=1:2===t&&(this.eventSearch={eventName:"",eventId:"",buyer:"",RFPNo:"",po:"",biddingStatus:"",pageSize:10,page:1,tourist_group_no:"",event_city:"",createUser:"",ownerUser:"",event_assistant:"",event_settlement:"",cvent_no:"",pr:"",event_startdate:"",event_enddate:"",eventSearchType:this.activeName},this.event_date=[]),this.$api.getEventList(this.eventSearch,"GET").then((function(t){e.tableData=t.EventModels,e.pageInfo=t.pageInfo,e.$refs.mettingList.pageIndex=e.pageInfo.pageIndex,e.$refs.mettingList.pageSize=e.pageInfo.pageSize,e.$refs.mettingList.totalCount=e.pageInfo.totalCount}))},changeMore:function(){this.showMoreSearch=!this.showMoreSearch,this.eventSearch.eventId="",this.eventSearch.tourist_group_no="",this.eventSearch.po="",this.eventSearch.RFPNo="",this.eventSearch.event_city="",this.eventSearch.createUser="",this.eventSearch.ownerUser="",this.eventSearch.buyer="",this.eventSearch.event_assistant="",this.eventSearch.event_settlement="",this.eventSearch.cvent_no="",this.eventSearch.pr=""},handleSizeChange:function(e){console.log("每页 ".concat(e," 条")),this.eventSearch.pageSize=e,this.getDataList()},handleCurrentChange:function(e){console.log("当前页: ".concat(e)),this.eventSearch.page=e,this.getDataList()},handleClick:function(e,t){console.log(e,t),0==e.name?(this.filtrate[9].disabled=!0,this.filtrate[10].disabled=!1,this.filtrate[11].disabled=!1):1==e.name?(this.filtrate[10].disabled=!0,this.filtrate[9].disabled=!1,this.filtrate[11].disabled=!1):2==e.name?(this.filtrate[11].disabled=!0,this.filtrate[10].disabled=!1,this.filtrate[9].disabled=!1):(this.filtrate[9].disabled=!1,this.filtrate[10].disabled=!1,this.filtrate[11].disabled=!1),4==e.name?(this.operate=JSON.parse(JSON.stringify(this.operates)),this.operate.splice(0,1),console.log(this.operates)):(this.operate=JSON.parse(JSON.stringify(this.operates)),this.operate.splice(1,1),console.log(this.operates)),this.seek.eventSearchType=this.activeName,this.seek.page=1,this.loadData()},getBuyerOptions:function(){var e=this;this.$api.getCustomerContacts({},"get").then((function(t){e.filtrate[9].selsetVal=t,e.filtrate[10].selsetVal=t,e.filtrate[11].selsetVal=t,e.filtrate[12].selsetVal=t,e.filtrate[13].selsetVal=t}))},screen:function(e){this.seek=e,this.seek.pageSize=this.pageInfo.pageSize,this.seek.page=1,this.seek.eventSearchType=this.activeName,e.event_date?(e.event_startdate=e.event_date[0],e.event_enddate=e.event_date[1]):(e.event_startdate="",e.event_enddate=""),console.log(this.seek),this.loadData()},loadData:function(){var e=this;this.$api.getEventList(this.seek,"GET").then((function(t){e.tableData=t.EventModels,t&&(e.state=!0),e.pageInfo=t.pageInfo,e.$refs.mettingList.pageIndex=e.pageInfo.pageIndex,e.$refs.mettingList.pageSize=e.pageInfo.pageSize,e.$refs.mettingList.totalCount=e.pageInfo.totalCount}))},classifyName:function(e,t){var a=this.$options.methods,n=this;a[e](n,t)},editClick:function(e,t){console.log(e,t,"编辑"),e.$router.push({name:"CreateEvent",query:{event_num:t.event_num,id:t.id,name:t.name,eventSearchType:e.activeName,type:"edit"}})},particulars:function(e,t){console.log(e,t,"详情"),e.$router.push({path:"/EventDetail",query:{id:t.id,name:t.event_name,eventSearchType:e.activeName}})}},Object(o["a"])(n,"handleSizeChange",(function(e){console.log("每页 ".concat(e," 条-")),this.pageInfo.pageSize=e,this.seek.pageSize=e,this.seek.page=1,this.state=!1,this.loadData()})),Object(o["a"])(n,"handleCurrentChange",(function(e){this.state&&(console.log("当前页: ".concat(e,"-")),this.pageInfo.pageIndex=e,this.seek.page=e,this.loadData())})),Object(o["a"])(n,"reset",(function(){this.seek={eventName:"",eventId:"",buyer:"",RFPNo:"",po:"",biddingStatus:"",pageSize:10,page:1,eventSearchType:this.activeName,tourist_group_no:"",event_city:"",createUser:"",ownerUser:"",event_assistant:"",event_settlement:"",cvent_no:"",pr:"",event_startdate:"",event_enddate:""},this.loadData()})),n)},h=c,p=(a("ac14"),a("2877")),v=Object(p["a"])(h,s,i,!1,null,null,null);t["default"]=v.exports}}]);