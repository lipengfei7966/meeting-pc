(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-583c95b2"],{2613:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"orderInfo"},[e("div",{staticClass:"title"},[t._v(" 我的订单 - "),t.info?[t._v(" "+t._s(t.info.num)+" ")]:t._e()],2),t.info?e("div",{staticClass:"content"},["0020-1"===this.info.status?e("div",{staticClass:"tips"},[e("p",[t._v("订单状态：订单执行中")]),e("p",[t._v(" 会议进行中，请实时上传结算凭证文件！ ")]),e("p",[e("el-button",{attrs:{type:"primary"},on:{click:t.settlement}},[t._v(" "+t._s(t.info.settlement_sheet_status===t.settlement_sheet_status_draft?"提交结算单(草稿)":"提交结算单")+" ")])],1)]):t._e(),"0020-3"===this.info.status?e("div",{staticClass:"tips"},[e("p",[t._v("订单状态：已创建待执行")]),e("p",[t._v(" 请查看以下订单详情，如果客户需要使用会议室等场地，请为客户预留档期。 ")]),e("p",{staticClass:"special"},[e("span",[t._v("如果您遇到特殊情况需要取消订单，可以点击")]),e("el-link",{staticClass:"special_link",attrs:{name:"cancel",type:"primary"},on:{click:t.cancelorderform}},[t._v("取消订单")]),e("span",[t._v("并说明原委，我们将同时为您发送短信和邮件向客户致歉。")])],1)]):"0020-2"===this.info.status?e("div",{staticClass:"tips"},[e("p",[t._v("订单状态：已取消")]),e("p",[t._v(" "+t._s(t.info.contacts)+" - "+t._s(t.info.company_name)+" - 取消了订单 ("+t._s(t.info.activity_name)+") ")])]):"0020-4"===this.info.status?e("div",{staticClass:"tips"},[e("p",[t._v("订单状态：已执行待结算")]),e("p",[t._v(" 会议服务商服务已经结束，请向客户提交结算单。结算单被确认后，您可以快递发票和结算单，以便客户付款。 ")]),e("p",[e("el-button",{attrs:{type:"primary"},on:{click:t.settlement}},[t._v(" "+t._s(t.info.settlement_sheet_status===t.settlement_sheet_status_draft?"提交结算单(草稿)":"提交结算单")+" ")])],1)]):"0020-5"===this.info.status?e("div",{staticClass:"tips"},[e("p",[t._v("订单状态：待确认结算单")]),e("p",{staticClass:"special"},[e("span",[t._v("已提交结算单，正在等待客户确认。 如果客户长时间未确认，您可以")]),e("el-link",{staticClass:"special_link",attrs:{name:"remind",type:"primary"},on:{click:t.againform}},[t._v("再次提醒客户")]),e("span",[t._v("。")])],1),e("p",[e("el-button",{attrs:{type:"primary"},on:{click:t.settlement}},[t._v("查看结算单")])],1)]):"0020-6"===this.info.status?e("div",{staticClass:"tips"},[e("p",[t._v("订单状态：已确认结算单")]),e("p",[t._v(" 客户确认了您的结算单，您可以与客户沟通发票、付款的事宜。 ")])]):"0020-7"===this.info.status?e("div",{staticClass:"tips"},[e("p",[t._v("订单状态：客户驳回结算单")]),e("p",[t._v(" 客户对结算单有异议，请查看、修改后重新移交结算单。 ")]),this.info.orderform_settlement_customer_objection?e("p",[t._v(" 客户异议："+t._s(this.info.orderform_settlement_customer_objection)+" ")]):t._e(),e("p",[e("el-button",{attrs:{type:"primary"},on:{click:t.settlement}},[t._v("提交结算单")])],1)]):"0020-8"===this.info.status?e("div",{staticClass:"tips"},[e("p",[t._v("订单状态：要求补充结算单材料")]),e("p",[t._v(" 客户对结算单有异议，请查看、修改后重新移交结算单。 ")]),this.info.orderform_settlement_customer_objection?e("p",[t._v(" 客户异议："+t._s(this.info.orderform_settlement_customer_objection)+" ")]):t._e(),e("p",[e("el-button",{attrs:{type:"primary"},on:{click:t.settlement}},[t._v("提交结算单")])],1)]):t._e(),e("div",{staticClass:"info"},[e("div",{staticClass:"line"},[e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("订单号")]),e("div",{staticClass:"context"},[t._v(t._s(t.info.num))])]),e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("联系人")]),e("div",{staticClass:"context"},[t._v(t._s(t.info.contacts))])])]),e("div",{staticClass:"line"},[e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("下单时间")]),e("div",{staticClass:"context"},[t._v(t._s(t._f("date_ex")(t.info.submit_time)))])]),e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("联系方式")]),e("div",{staticClass:"context"},[t._v(t._s(t.info.customer_service_telephone_numbers))])])]),e("div",{staticClass:"line"},[e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("活动名称")]),e("div",{staticClass:"context"},[t._v(t._s(t.info.activity_name))])]),e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("客户名称")]),e("div",{staticClass:"context"},[t._v(t._s(t.info.company_name))])])]),e("div",{staticClass:"line"},[e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("活动日期")]),e("div",{staticClass:"context"},[t._v(t._s(t.info.activity_date))])]),e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("报价日期")]),e("div",{staticClass:"context"},[t._v(t._s(t._f("date_ex")(t.info.offer_data)))])])])]),e("div",{staticClass:"info"},[e("div",{staticClass:"line"},[e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("报价人")]),e("div",{staticClass:"context"},[t._v(t._s(t.info.bidder))])]),e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("报价时间")]),e("div",{staticClass:"context"},[t._v(" "+t._s(t._f("date_ex")(t.info.offer_data))+" ")])])])]),e("div",{staticClass:"info"},[e("div",{staticClass:"line"},[e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("历史附件")]),e("div",{staticClass:"context"},[e("p",[t._v("客户已通过邮件发送该订单的 “询价单” 至以下人员：")]),e("p",[t._v(t._s(t.info.mailbox))]),e("p",[e("el-button",{attrs:{type:"primary"},on:{click:t.quotedprice}},[t._v("最终报价单")]),"0020-6"===this.info.status?e("el-button",{attrs:{type:"primary"},on:{click:t.settlement}},[t._v("结算单 ")]):t._e()],1)])])])]),e("div",{staticClass:"info"},[e("div",{staticClass:"line"},[e("div",{staticClass:"item"},[e("div",{staticClass:"label need",staticStyle:{width:"100%"}},[t._v(" 客户需求 "),e("div",{staticClass:"excel"},[e("a",{staticStyle:{cursor:"pointer"},on:{click:t.excelexport}},[t._v("下载excel")])])])])]),e("div",{staticClass:"line"},[e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("客房需求")]),e("div",{staticClass:"context"},[t._l(t.info.quoted_price_room,(function(i){return e("div",{key:i.id,staticClass:"hyxq_item"},[e("div",{staticClass:"date"},[t._v(" 日期："+t._s(t._f("date_day")(i.date))+" 客房价格 ")]),t._l(i.room_list,(function(i){return e("div",{key:i.id,staticClass:"c_item"},[t._v(" "+t._s(i.roomtypename)+" "+t._s(i.roomcount)+"间 "),e("span",{staticClass:"quotedprice"},[t._v("报价：￥"+t._s(i.unitprice.toFixed(2))+"*"+t._s(i.provide_count)+"间 ￥"+t._s(i.totalprice.toFixed(2)))]),e("p",[t._v("报价备注："+t._s(i.remarks))])])}))],2)})),e("br"),e("br"),t._v(" 客房报价总备注："+t._s(t.info.room_remarks)+" "),e("br"),t._v(" 客房报价小计："),e("span",{staticClass:"quotedprice"},[t._v("￥"+t._s(this.allMoney.toFixed(2)))])],2)]),e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("会议需求")]),e("div",{staticClass:"context"},[t._l(t.info.quoted_price_conference,(function(i){return e("div",{key:i.id,staticClass:"hyxq_item"},[e("div",{staticClass:"date"},[t._v(" 日期："+t._s(t._f("date_day")(i.date))+" ")]),t._l(i.conference_list,(function(s){return e("div",{key:s.id,staticClass:"c_item"},[1==s.type?e("div",[t._v(" "+t._s(s.item)+" "+t._s(s.starttime)+"-"+t._s(s.endtime)+" "+t._s(s.roomsetuptypename)+" "+t._s(s.attendees)+" 人，会场面积范围："+t._s(s.min_area)+"~"+t._s(s.max_area)+" sqm "),e("div",{staticClass:"quotedprice"},[t._v(" 报价：￥"+t._s(s.price.toFixed(2))+" 备注:"+t._s(s.describe)+" ")])]):2==s.type?e("div",[t._v(" "+t._s(s.item+s.typename)+" "+t._s(t._f("date_day")(i.date))+" "+t._s(s.starttime)+"~"+t._s(t._f("date_day")(i.date))+" "+t._s(s.endtime)+" "+t._s(s.related_information)+" "),e("div",{staticClass:"quotedprice"},[t._v(" 报价：￥"+t._s(s.price.toFixed(2))+" ")])]):3==s.type?e("div",[t._v(" "+t._s(s.item+s.typename)+" "),e("span",{staticClass:"quotedprice"},[t._v("报价：￥"+t._s(s.price.toFixed(2))+" ")]),t._v(" "+t._s(s.equipment)+" 备注："+t._s(s.microphonedescribe)+" ")]):4==s.type?e("div",[e("p",[t._v(t._s(s.item+s.order_name+s.quoted_name)+": "+t._s(s.equipment))]),e("p",[e("span",{staticClass:"quotedprice"},[t._v("报价：￥"+t._s(s.price.toFixed(2))+" ")])]),e("p",[t._v("报价备注："+t._s(s.comments))])]):t._e()])}))],2)})),e("br"),e("br"),t._v(" 会场报价总备注："+t._s(t.info.conference_remarks)+" "),e("div",{staticClass:"quotedpricesum"},[t._v("会场报价小计"),e("span",{staticClass:"quotedprice"},[t._v("￥"+t._s((this.EquipmentMoney+this.meetingMoney).toFixed(2)))])])],2)])]),e("div",{staticClass:"line"},[e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("用餐需求")]),e("div",{staticClass:"context"},[t._l(t.info.quoted_price_food,(function(i){return e("div",{key:i.id,staticClass:"hyxq_item"},[e("div",{staticClass:"date"},[t._v(" 日期："+t._s(t._f("date_day")(i.date))+" ")]),t._l(i.food_list,(function(i){return e("div",{key:i.id,staticClass:"c_item"},[e("span",[t._v(t._s(i.foodtypename))]),t._v(" "+t._s(i.usetype?`[${i.usetype}]`:"")+" "+t._s(i.personcount)+" 人 "),e("p",{staticClass:"quotedprice"},[t._v("报价：￥"+t._s(i.price.toFixed(2))+"*"+t._s(i.personcount)+" 人 ￥"+t._s((i.price*i.personcount).toFixed(2))+" 备注："+t._s(i.offer_remarks))])])}))],2)})),e("br"),e("br"),e("div",{staticClass:"quotedpricesum"},[t._v("餐饮报价小计："),e("span",{staticClass:"quotedprice"},[t._v("￥"+t._s(this.repastAllMoney.toFixed(2)))])])],2)])]),e("div",{staticClass:"line"},[e("div",{staticClass:"item"},[e("div",{staticClass:"label"},[t._v("总报价")]),e("div",{staticClass:"context"},[e("span",{staticClass:"quotedprice"},[t._v("￥"+t._s(this.OrderPrice.toFixed(2)))])])])])]),e("el-dialog",{attrs:{title:"添加项目",visible:t.addProjectStatus,"before-close":t=>{this.itemData=null,t()},width:"700px"},on:{"update:visible":function(e){t.addProjectStatus=e}}},[t.addProjectStatus?e("projectAdded",{attrs:{"item-data":t.itemData},on:{onColse:t.projectSave}}):t._e()],1)],1):t._e()])},o=[],a=i("97aa"),n=i("cf45"),c=(i("4ff3"),i("acd6")),r={name:"OrderInfo",components:{projectAdded:a["a"]},data(){return{info:null,addProjectStatus:!1,itemData:null,settlement_sheet_status_draft:"0029-1",excelAddress:""}},computed:{dayMoney:()=>function(t){let e=0;return t.forEach(t=>{e+=this.positiveInteger(t.provide_count)*this.positiveFloat(t.unitprice)}),this.positiveFloat(e)},allMoney:function(){let t=0;return this.info.quoted_price_room&&this.info.quoted_price_room.length>0&&this.info.quoted_price_room.forEach(e=>{t+=this.positiveFloat(this.dayMoney(e.room_list))}),this.positiveFloat(t)},meetingDayMoney:()=>function(t,e){let i=0;return t.forEach(t=>{i+=this.positiveFloat(t.price)}),this.positiveFloat(i)},meetingMoney:function(){let t=0;return this.info.quoted_price_conference&&this.info.quoted_price_conference.length>0&&this.info.quoted_price_conference.forEach(e=>{let i=e.conference_list.filter(t=>3!=t.type);t+=this.meetingDayMoney(i)}),this.positiveFloat(t)},EquipmentMoney:function(){let t=0;return this.info.quoted_price_conference&&this.info.quoted_price_conference.length>0&&this.info.quoted_price_conference.forEach(e=>{let i=e.conference_list.filter(t=>3==t.type);t+=this.meetingDayMoney(i)}),this.positiveFloat(t)},meetingAllMoney:function(){let t=0;return this.info.quoted_price_conference&&this.info.quoted_price_conference.length>0&&this.info.quoted_price_conference.forEach(e=>{t+=this.meetingDayMoney(e.conference_list)}),this.positiveFloat(t)},repastDayMoney:()=>function(t){let e=0;return t.forEach(t=>{e+=this.positiveInteger(t.personcount)*this.positiveFloat(t.price)}),this.positiveFloat(e)},repastAllMoney:function(){let t=0;return this.info.quoted_price_food&&this.info.quoted_price_food.length>0&&this.info.quoted_price_food.forEach(e=>{t+=this.repastDayMoney(e.food_list)}),this.positiveFloat(t)},IntercityTransportationDayMoney:()=>function(t){let e=0;return t.forEach(t=>{e+=this.positiveInteger(t.passengercount)*this.positiveFloat(t.unitprice)}),this.positiveFloat(e)},IntercityTransportationAllMoney:function(){let t=0;return this.info.quoted_price_transportation&&this.info.quoted_price_transportation.length>0&&this.info.quoted_price_transportation.forEach(e=>{t+=this.IntercityTransportationDayMoney(e.transportation_list)}),this.positiveFloat(t)},CityDayMoney:()=>function(t){let e=0;return t.forEach(t=>{e+=this.positiveInteger(t.carcount)*this.positiveFloat(t.price)}),this.positiveFloat(e)},CityAllMoney:function(){let t=0;return this.info.quoted_price_car&&this.info.quoted_price_car.length>0&&this.info.quoted_price_car.forEach(e=>{t+=this.CityDayMoney(e.car_list)}),this.positiveFloat(t)},otherAllMoney:function(){let t=0;return this.info.quoted_price_other&&this.info.quoted_price_other.length>0&&this.info.quoted_price_other.forEach(e=>{t+=this.positiveInteger(e.offerparticipatecount)*this.positiveInteger(e.offerservicedaycount)*this.positiveFloat(e.price)}),this.positiveFloat(t)},money:function(){return this.info.total_price=Object(n["q"])(this.allMoney)+Object(n["q"])(this.meetingAllMoney)+Object(n["q"])(this.repastAllMoney)+Object(n["q"])(this.IntercityTransportationAllMoney)+Object(n["q"])(this.CityAllMoney)+Object(n["q"])(this.otherAllMoney),Object(n["m"])(this.info.total_price)},TravelAgencyMoney:function(){return this.positiveFloat(this.info.travelagency_payment_money*this.info.travelagency_payment_proportion/100)},AdvancesMoney:function(){return Object(n["m"])(this.positiveFloat(this.info.advance_amount)*(this.positiveFloat(this.info.advance_proportion)/100))},OutsideHotelMoney:function(){return this.positiveFloat(this.info.off_hotel_expenses*this.info.off_hotel_proportion/100)},serviceAllMoney:function(){return Object(n["m"])(this.TravelAgencyMoney+this.AdvancesMoney+this.OutsideHotelMoney)},Taxes:function(){return"VAT"==this.info.taxtype?Object(n["m"])((this.money+this.serviceAllMoney)*this.positiveInteger(this.info.taxrate)/100):0*(this.money+this.serviceAllMoney)},OrderPrice:function(){return Object(n["m"])(this.money+this.serviceAllMoney+this.Taxes)}},methods:{positiveInteger:n["q"],positiveFloat:n["m"],excelExport:c["a"],excelexport(){var t="订单"+this.info.inquiry_sheet_code;this.excelExport("/orderform/exportexcel",{id:this.$route.params.id},t)},project(){this.info.project_id?this.$router.push({name:"ItineraryManagement",params:{id:this.info.project_id}}):this.addProjectStatus=!0},projectSave(t){this.$api.projectsave(t,"POST").then(e=>{this.$message({message:t.id?"修改成功！":"添加成功！",type:"success"}),this.$router.push({name:"ItineraryManagement",params:{id:this.info.project_id}})})},quotedprice(){let t=this.$router.resolve({name:"quotedprice",params:{id:this.info.quoted_price_id,isSubmit:0}});window.open(t.href,"_blank")},settlement(){let t=this.$route.params.id,e=1;this.info.settlement_sheet_status===this.settlement_sheet_status_draft&&(t=this.info.settlement_sheet_id),"0020-5"!==this.info.status&&"0020-6"!==this.info.status&&"0020-8"!==this.info.status||(t=this.info.settlement_sheet_id,e=0),0==this.info.serviceprovider_or_hotel?this.$router.push({name:"settleAccounts_Hotel",params:{id:t,issubmit:e}}):this.$router.push({name:"settleAccounts",params:{id:t,issubmit:e}})},cancelorderform(){this.$prompt("请简要说明取消订单的原因","拒绝接单",{confirmButtonText:"确定",cancelButtonText:"取消",inputType:"textarea"}).then(({value:t})=>{this.$api.cancelorderform({id:this.info.orderform_id,object_id:this.info.object_id,reason:t},"POST").then(t=>{t?(this.$message({message:"订单已取消",type:"success"}),this.$router.go(0)):this.$message({message:"订单取消失败",type:"fail"})})}).catch(()=>{})},againform(){this.$api.againform({id:this.info.orderform_id,object_id:this.info.object_id},"POST").then(t=>{t?this.$message({message:"提醒成功",type:"success"}):this.$message({message:"提醒失败",type:"fail"})})}},mounted(){this.$api.orderInfo({id:this.$route.params.id},"POST").then(t=>{this.info=t})}},l=r,_=(i("a339"),i("0b56")),d=Object(_["a"])(l,s,o,!1,null,"0e3f7042",null);e["default"]=d.exports},a339:function(t,e,i){"use strict";i("e639")},acd6:function(t,e,i){"use strict";var s=i("4ff3"),o=i.n(s),a=i("f121");const n=a["b"];e["a"]=function(t,e,i){return new Promise((function(s,a){const c=()=>{"/Template/GetTemplate"==t?o()({method:"post",url:n+t,data:e,headers:{"Content-Type":"application/json;charset=utf-8"}}).then(t=>{let s=document.createElement("a"),o=t.data.path.substring(t.data.path.lastIndexOf("."));fetch(t.data.path).then(t=>t.blob()).then(t=>{s.href=URL.createObjectURL(t),console.log(s.href),5==e.type||e.type,s.download=i+o,document.body.appendChild(s),s.click()})}):o()({method:"post",url:n+t,data:e,responseType:"blob",headers:{"Content-Type":"application/json;charset=utf-8"}}).then(s=>{console.log(s);let o=s.data;const a=new FileReader;a.readAsDataURL(o),a.onload=s=>{let o=document.createElement("a");o.style.display="none","/quotation/exportexcel"==t||"/SettlementSheet/ExportExcel1"==t||"/orderform/exportexcel"==t||"/Quotation/ExportExcel"==t?o.download=i+".xls":"/Template/GetTemplate"==t?5==e.type||6==e.type?o.download=i+".docx":o.download=i+".xls":"/Reporting/GetExcel"==t&&(o.download=i+".xls"),o.href=s.target.result;document.body;document.body.appendChild(o),o.click(),document.body.removeChild(o)}})};c()}))}},e639:function(t,e,i){}}]);