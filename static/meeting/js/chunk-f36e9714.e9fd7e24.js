(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f36e9714"],{"19b9":function(e,t,i){"use strict";i("8d7b")},"2d84":function(e,t,i){"use strict";i("59a0")},"59a0":function(e,t,i){},"76cc":function(e,t,i){"use strict";i("eacc")},8049:function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{ref:"create_demand",class:e.isCheck?"see_demand box":"create_demand box"},[r("div",{staticClass:"path"},[r("ul",[r("el-button",{attrs:{type:"text"},on:{click:function(t){return e.$router.replace({path:"/eventlist"})}}},[e._v("我的会议")]),e.$route.query.type?r("li",{staticStyle:{color:"#7c7f82"}},[e._v(">")]):e._e(),e.$route.query.type?r("li",{staticStyle:{color:"#409eff",cursor:"pointer"},on:{click:function(t){return e.$router.replace({path:"/EventDetail?id="+e.$route.query.id+"&name="+e.$route.query.name+"&eventSearchType="+e.$route.query.eventSearchType})}}},[e._v(" 会议详情 ("+e._s(e.$route.query.name)+") ")]):e._e(),e.$route.query.type&&"edit"!=e.$route.query.type&&"check"!=e.$route.query.type?r("li",{staticStyle:{color:"#7c7f82"}},[e._v(" > ")]):e._e(),e.$route.query.type&&"edit"!=e.$route.query.type&&"check"!=e.$route.query.type?r("li",{staticStyle:{color:"#409eff",cursor:"pointer"},on:{click:function(t){return e.$router.replace({path:"/CreateEvent?id="+e.$route.query.id+"&name="+e.$route.query.name+"&eventSearchType="+e.$route.query.eventSearchType+"&type="+e.$route.query.type})}}},[e._v(" 创建会议 ")]):e._e(),r("li",{staticStyle:{color:"#7c7f82"}},[e._v(">")]),r("li",{staticStyle:{color:"#7c7f82"}},[e._v("采购需求")])],1)]),e.isCheck?e._e():r("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],staticClass:"edit_base_info"},[r("span",{staticClass:"el-icon-warning"}),e._v(" 已根据会议基本信息的会议时间自动匹配好需求可选日期，若有误请您先 "),r("a",{on:{click:e.goEdit}},[e._v("修改会议基本信息>")])]),r("div",{staticClass:"demand_title"}),r("div",{staticClass:"guestRoom_demand"},[r("div",{staticClass:"demand_item_title"},[e.isCheck?r("span",[e._v("查看采购需求")]):e._e(),e.isCheck?e._e():r("span",[e._v("编辑采购需求")])]),e.dateArr.length?r("room",{ref:"room",attrs:{dateArr:e.roomDate,outDate:e.outDate,isCheck:e.isCheck}}):e._e(),e.dateArr.length?r("event",{ref:"event",attrs:{dateArr:e.dateArr,swingList:e.swingList,isCheck:e.isCheck}}):e._e(),e.dateArr.length?r("foodDemand",{ref:"food",attrs:{dateArr:e.allDate,foodList:e.foodList,isCheck:e.isCheck}}):e._e(),e.dateArr.length?r("foodOutDemand",{ref:"foodOut",attrs:{dateArr:e.allDate,foodList:e.foodList,isCheck:e.isCheck}}):e._e(),e.dateArr.length?r("intercity",{ref:"intercity",attrs:{dateArr:e.allDate,trafficType:e.trafficType,isCheck:e.isCheck}}):e._e(),e.dateArr.length?r("car",{ref:"car",attrs:{carType:e.carType,dateArr:e.allDate,purposeList:e.purposeList,isCheck:e.isCheck}}):e._e(),r("other",{ref:"other",attrs:{isCheck:e.isCheck}})],1),e.$route.query.isNext?r("div",{staticClass:"sub_part"},[r("el-button",{staticClass:"sub_btn",attrs:{type:"primary"},on:{click:function(t){return e.subTap(1)}}},[e._v("下一步")]),e.isCheck?r("el-button",{staticClass:"sub_btn",attrs:{type:"cancel"},on:{click:e.backPrePage}},[e._v("返回")]):e._e()],1):e._e(),e.$route.query.isNext?e._e():r("div",{staticClass:"sub_part"},[e.isCheck?r("el-button",{staticClass:"sub_btn back",attrs:{type:"primary",plain:""},on:{click:e.backPrePage}},[r("img",{attrs:{src:i("5f25"),alt:""}}),e._v("  返回 ")]):e._e(),e.isCheck?e._e():r("el-button",{staticClass:"sub_btn",on:{click:e.backPrePage}},[r("span",{staticClass:"el-icon-circle-close"}),e._v(" 取消 ")]),e.isCheck?e._e():r("el-button",{staticClass:"sub_btn",attrs:{type:"primary"},on:{click:function(t){return e.subTap(0)}}},[r("span",{staticClass:"el-icon-download"}),e._v(" 保存 ")])],1),r("el-dialog",{attrs:{title:"保存成功",visible:e.nextDialog,align:"center",top:"200px"},on:{"update:visible":function(t){e.nextDialog=t}}},[r("el-table",{ref:"multipleTable",staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:e.tableData,fit:"","show-header":!1,"tooltip-effect":"dark"},on:{"row-click":e.checkedRow,select:e.selectRow,"selection-change":e.handleSelectionChange}},[r("el-table-column",{attrs:{type:"selection"}}),r("el-table-column",{attrs:{label:"询价单"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" 询价单号【"+e._s(t.row.inquiry_sheet_code)+"】 ")]}}])}),r("el-table-column",{attrs:{prop:"company_name",label:"公司","show-overflow-tooltip":""}}),r("el-table-column",{attrs:{prop:"total_amount",label:"金额",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",{staticStyle:{color:"#f91"}},[e._v("￥"+e._s(e.positiveFloat(t.row.total_amount).toFixed(2)))])]}}])}),r("el-table-column",{attrs:{prop:"name",width:"100",label:"状态","show-overflow-tooltip":""}})],1),0===e.isShowHotelBtn?r("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){return e.goNext(1)}}},[e._v("找酒店采购")]):e._e(),r("el-button",{staticClass:"mar_lr20",attrs:{size:"small",type:"primary"},on:{click:function(t){return e.goNext(2)}}},[e._v("找会议服务商采购")]),r("el-button",{staticClass:"mar_lr20",attrs:{size:"small",type:"primary"},on:{click:function(t){return e.goNext(6)}}},[e._v("更新询价单，邀请重新报价")]),r("el-button",{attrs:{size:"small"},on:{click:function(t){return e.goNext(5)}}},[e._v("返回会议详情")])],1),r("el-dialog",{attrs:{visible:e.isDemandHotel,width:"30%",align:"center"},on:{"update:visible":function(t){e.isDemandHotel=t}}},[r("span",[e._v("请选择会议服务商进行采购的方式")]),r("span",{staticClass:"dialog-footer flex_row justify_center",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){return e.goNext(3)}}},[e._v("立即采购(不含酒店)")]),r("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){return e.goNext(4)}}},[e._v("立即采购(含酒店)")])],1)]),r("el-dialog",{attrs:{title:"请完善信息",visible:e.perfectDialog,align:"left",top:"200px"},on:{"update:visible":function(t){e.perfectDialog=t}}},[r("p",{staticStyle:{"font-size":"16px","line-height":"20px"},domProps:{innerHTML:e._s(e.perfectMsg)}})])],1)},o=[],a=i("5530"),s=i("2909"),n=(i("4de4"),i("d3b7"),i("99af"),i("159b"),i("e9c4"),i("caad"),i("2532"),i("ac1f"),i("1276"),i("a9e3"),i("5319"),i("25f0"),i("b0c0"),i("6813")),c=i("2905"),l=i("e99c"),u=i("e885"),d=i("a365"),_=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"car"},[i("div",{staticClass:"demand_item"},[i("div",{staticClass:"demand_top flex_row justify_between"},[i("div",{staticClass:"demand_name flex_row align_center"},[i("h2",{staticStyle:{"margin-right":"20px"}},[e._v("地面交通")]),i("el-switch",{model:{value:e.is_car_rental,callback:function(t){e.is_car_rental=t},expression:"is_car_rental"}})],1)]),i("div",{directives:[{name:"show",rawName:"v-show",value:"1"==e.is_car_rental,expression:"is_car_rental == '1'"}]},[e._l(e.carList,(function(t,r){return i("div",{key:r},[i("div",{staticClass:"flex_row"},[e.isCheck?e._e():i("div",{staticClass:"demand_date mar_t20 mar_l20"},[i("span",[e._v("日期")]),i("el-select",{attrs:{size:"small"},on:{change:e.selectDateTap},model:{value:t.car_date,callback:function(i){e.$set(t,"car_date",i)},expression:"item.car_date"}},e._l(e.dateArr,(function(t,r){return i("el-option",{key:r,attrs:{disabled:e.getDisTap(t),label:t,value:t}})})),1)],1),i("el-button",{staticClass:"mar_20 add_new_item",attrs:{type:"text",size:"medium"},on:{click:function(t){return e.addOtherCar(r)}}},[e._v("添加该日交通需求 ")])],1),i("el-table",{attrs:{border:"",data:t.car}},[e.isCheck?i("el-table-column",{attrs:{label:"日期",width:"180",align:"center"}},[[i("p",{staticClass:"text_left"},[i("span",[e._v(e._s(t.car_date))])])]],2):e._e(),i("el-table-column",{attrs:{label:"用车城市",prop:"is_important",width:e.isCheck?130:140,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.isCheck?i("p",{staticClass:"text_left"},e._l(e.cityList,(function(r){return i("span",{directives:[{name:"show",rawName:"v-show",value:r.id==t.row.city_code,expression:"item.id == scope.row.city_code"}],key:r.id},[e._v(e._s(r.value))])})),0):e._e(),e.isCheck?e._e():i("el-select",{staticClass:"demand_120",attrs:{size:"small",filterable:""},on:{change:function(i){return e.citySelect(t.row)}},model:{value:t.row.city_code,callback:function(i){e.$set(t.row,"city_code",i)},expression:"scope.row.city_code"}},e._l(e.cityList,(function(e){return i("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})})),1)]}}],null,!0)}),i("el-table-column",{attrs:{label:"用车目的",width:"150",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.isCheck?i("p",{staticClass:"text_left"},e._l(e.goalList,(function(r){return i("span",{directives:[{name:"show",rawName:"v-show",value:r.id==t.row.purpose,expression:"item.id == scope.row.purpose"}],key:r.id},[e._v(e._s(r.value))])})),0):e._e(),e.isCheck?e._e():i("el-select",{staticClass:"demand_120",attrs:{size:"small",filterable:""},on:{change:function(i){return e.changePurpose(t.row)}},nativeOn:{click:function(i){return e.purposeClick(t.row)}},model:{value:t.row.purpose,callback:function(i){e.$set(t.row,"purpose",i)},expression:"scope.row.purpose"}},e._l(e.goalList,(function(e){return i("el-option",{directives:[{name:"show",rawName:"v-show",value:"机场接送"!=e.value&&"机场接送(单程)"!=e.value,expression:"item.value != '机场接送'&&item.value != '机场接送(单程)'"}],key:e.id,attrs:{label:e.value,value:e.id}})})),1)]}}],null,!0)}),i("el-table-column",{attrs:{label:"用车类型",prop:"is_important",width:e.isCheck?180:140,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.isCheck?i("p",{staticClass:"text_left"},e._l(e.carType,(function(r){return i("span",{directives:[{name:"show",rawName:"v-show",value:r.id==t.row.vehicle_type,expression:"item.id == scope.row.vehicle_type"}],key:r.id},[e._v(e._s(r.value))])})),0):e._e(),e.isCheck?e._e():i("el-select",{staticClass:"demand_120",attrs:{size:"small"},on:{change:function(i){return e.selectTraffic(t.row,t.row.vehicle_type)}},model:{value:t.row.vehicle_type,callback:function(i){e.$set(t.row,"vehicle_type",i)},expression:"scope.row.vehicle_type"}},e._l(e.carType,(function(e){return i("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})})),1)]}}],null,!0)}),i("el-table-column",{attrs:{label:"车型名称",prop:"is_important",width:e.isCheck?180:140,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.isCheck?i("p",{staticClass:"text_left"},e._l(e.modelNameList,(function(r){return i("span",{directives:[{name:"show",rawName:"v-show",value:r.id==t.row.vehicle_id,expression:"item.id == scope.row.vehicle_id"}],key:r.id},[e._v(e._s(r.value))])})),0):e._e(),e.isCheck?e._e():i("el-select",{staticClass:"demand_120",attrs:{disabled:"998"==t.row.vehicle_type,size:"small"},on:{change:function(i){return e.modelNameListChange(t.row)}},nativeOn:{click:function(i){return e.modelNameClick(t.row)}},model:{value:t.row.vehicle_id,callback:function(i){e.$set(t.row,"vehicle_id",i)},expression:"scope.row.vehicle_id"}},e._l(e.modelNameList,(function(e){return i("el-option",{key:e.id,attrs:{label:e.value,value:e.id}})})),1)]}}],null,!0)}),i("el-table-column",{attrs:{label:"用车数量",prop:"is_important",width:e.isCheck?110:140,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.isCheck?i("p",{staticClass:"text_right"},[i("span",[e._v(e._s(t.row.car_count))])]):e._e(),e.isCheck?e._e():i("el-input",{directives:[{name:"input-filter",rawName:"v-input-filter:int",arg:"int"}],attrs:{size:"small",placeholder:"必填"},on:{blur:function(i){return e.vehicleQuantity(t.row)}},model:{value:t.row.car_count,callback:function(i){e.$set(t.row,"car_count",e._n(i))},expression:"scope.row.car_count"}})]}}],null,!0)}),i("el-table-column",{attrs:{label:"搭乘人数",prop:"is_important",width:e.isCheck?125:140,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.isCheck?i("p",{staticClass:"text_right"},[i("span",[e._v(e._s(t.row.vehicle_count))])]):e._e(),e.isCheck?e._e():i("el-input",{directives:[{name:"input-filter",rawName:"v-input-filter:int",arg:"int"}],attrs:{size:"small",placeholder:"非必填"},model:{value:t.row.vehicle_count,callback:function(i){e.$set(t.row,"vehicle_count",i)},expression:"scope.row.vehicle_count"}})]}}],null,!0)}),i("el-table-column",{attrs:{label:"采购指导价",prop:"is_important",width:"125",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",{staticStyle:{"font-size":"16px",color:"rgb(235, 88, 81)"}},[e._v(e._s(t.row.indicativePrice?t.row.indicativePrice:"-"))])]}}],null,!0)}),i("el-table-column",{attrs:{label:"用车说明",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.isCheck?i("p",{staticClass:"text_left"},[i("span",[e._v(e._s(t.row.explain))])]):e._e(),e.isCheck?e._e():i("el-input",{attrs:{type:"text",rows:5,size:"small",placeholder:"请填写用车说明"},model:{value:t.row.explain,callback:function(i){e.$set(t.row,"explain",i)},expression:"scope.row.explain"}})]}}],null,!0)}),e.isCheck?e._e():i("el-table-column",{attrs:{label:"操作",prop:"is_important",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-tooltip",{attrs:{effect:"light",content:"删除",offset:"10",placement:"top-start"}},[i("el-button",{staticClass:"el-icon-delete",staticStyle:{"font-size":"18px"},attrs:{type:"text"},on:{click:function(i){return e.deleteCar(r,t.$index)}}})],1)]}}],null,!0)})],1)],1)})),i("div",{staticClass:"bottom_tr"},[i("el-button",{directives:[{name:"show",rawName:"v-show",value:e.carList.length<e.dateArr.length,expression:"carList.length < dateArr.length"}],staticClass:"mar_5",attrs:{type:"primary",size:"medium"},on:{click:e.addOther}},[e._v("添加其他日期地面交通")])],1)],2)])])},h=[],f=i("53ca"),p=(i("a434"),i("393b")),m={name:"car",props:["purposeList","dateArr","isCheck"],directives:{inputFilter:p["a"]},data:function(){return{goalList:[],carType:[],modelNameList:[],is_car_rental:"1",car_rental_budget:0,eventCity:"",cityList:[],carDate:[],disCarDate:[],carList:[{car_date:"",car:[{id:"",event_info_id:"",purpose:"",vehicle_type:"",car_count:"",vehicle_count:"",city_code:this.eventCity,vehicle_id:"",explain:"",indicativePrice:"",is_delete:0,city_name:"",purpose_name:"",vehicle_name:"",brand_name:""}]}]}},created:function(){},mounted:function(){var e=this;this.getCity(),this.getCarType(),this.getGoal(),this.getModelName(),this.$nextTick((function(){e.addDate(),e.carList.forEach((function(t){t.car.forEach((function(t){var i;t.city_code=null!==(i=t.city_code)&&void 0!==i?i:e.eventCity}))}))}))},updated:function(){var e=this;this.carList.forEach((function(t){t.car.forEach((function(i){i.city_name||(i.city_name=""),i.purpose_name||(i.purpose_name=""),i.vehicle_name||(i.vehicle_name=""),i.brand_name||(i.brand_name=""),console.log(t.car),i.city_code=i.city_code?i.city_code:e.eventCity,i.indicativePrice||(i.indicativePrice=""),i.airport_id&&0==i.purpose.includes(".")&&(i.purpose=i.purpose+"."+i.airport_id),i.city_code&&i.purpose&&i.vehicle_type&&i.car_count&&e.getPrice(i)}))}))},methods:{formatNum:function(){var e=this.car_rental_budget.toString();e=e.replace(/。/g,"."),e=e.replace(/\b(0+)/gi,""),e=e.replace(/[^\d.]/g,""),e=e.replace(/^\./g,""),e=e.replace(/\.{2,}/g,""),e=e.replace(".","$#$").replace(/\./g,"").replace("$#$","."),e=e.replace(/^(\-)*(\d+)\.(\d\d).*$/,"$1$2.$3"),this.car_rental_budget=e},addDate:function(){var e=this;this.carList.forEach((function(t){!t.car_date&&e.carDate.length&&(t.car_date=e.carDate[0],-1===e.disCarDate.indexOf(t.car_date)&&e.disCarDate.push(t.car_date))}))},selectDateTap:function(){var e=this;this.disCarDate=[],this.carList.forEach((function(t){t.car_date&&e.disCarDate.push(t.car_date)}))},getDisTap:function(e){return-1!==this.disCarDate.indexOf(e)},selectTraffic:function(e,t){e.vehicle_id="",this.carType.forEach((function(t){t.id==e.vehicle_type&&(e.vehicle_name=t.value)})),console.log(e,t),this.getPrice(e)},citySelect:function(e){e.purpose="",this.cityList.forEach((function(t){t.id==e.city_code&&(e.city_name=t.value)})),console.log(e,this.cityList)},addOtherCar:function(e){var t=this.carList[e].car.length,i=Object(a["a"])({},this.carList[e].car[t-1]);i.id="",this.carList[e].car.push(i)},deleteCar:function(e,t){1===this.carList.length?1===this.carList[e].car.length?this.is_car_rental="0":this.carList[e].car.splice(t,1):0!==t?this.carList[e].car.splice(t,1):this.carList.splice(e,1),this.selectDateTap()},addOther:function(){var e=this,t=this.carDate.filter((function(t){return-1===e.disCarDate.indexOf(t)})),i={car_date:t.length?t[0]:"",car:[{id:"",event_info_id:"",purpose:"",vehicle_type:"",car_count:"",vehicle_count:"",city_code:this.eventCity,vehicle_id:"",explain:"",indicativePrice:"",is_delete:0,city_name:"",purpose_name:"",vehicle_name:"",brand_name:""}]},r=this.carList.length;"0"===this.is_car_rental?this.is_car_rental="1":this.carList.splice(r,0,i),this.selectDateTap()},getCity:function(){var e=this;this.$api.getNewCityList({},"POST").then((function(t){e.cityList=t,e.cityList.forEach((function(e){e.id=e.id.toString()})),console.log(e.cityList)}))},getGoal:function(e){var t=this;e?this.$api.getGoal({citycode:e},"POST").then((function(e){t.goalList=e;var i=[];t.goalList.forEach((function(e,t){e.id=e.id.toString(),e.airports&&e.airports.forEach((function(t){var r={id:e.id+"."+t.airid,value:e.value+"-"+t.airvalue};i.push(r)}))})),i.forEach((function(e){t.goalList.unshift(e)}));var r={id:"999",value:"其他"};t.goalList.push(r),console.log(Object(f["a"])(t.goalList[0].id),i),console.log(t.goalList)})):this.$api.getGoal({},"POST").then((function(e){t.goalList=e;var i=[];t.goalList.forEach((function(e,t){e.id=e.id.toString(),e.airports&&e.airports.forEach((function(t){var r={id:e.id+"."+t.airid,value:e.value+"-"+t.airvalue};i.push(r)}))})),i.forEach((function(e){t.goalList.unshift(e)}));var r={id:"999",value:"其他"};t.goalList.push(r),console.log(Object(f["a"])(t.goalList[0].id),i),console.log(t.goalList)}))},getCarType:function(){var e=this;this.$api.getCarType({},"POST").then((function(t){e.carType=t,e.carType.forEach((function(e){e.id=e.id.toString()}));var i={id:"998",value:"其他"};e.carType.push(i),console.log(e.carType)}))},getModelName:function(e){var t=this;e?this.$api.getModelName({id:e},"POST").then((function(e){t.modelNameList=e,t.modelNameList.forEach((function(e){e.id=e.id.toString()})),console.log(t.modelNameList)})):this.$api.getModelName({},"POST").then((function(e){t.modelNameList=e,t.modelNameList.forEach((function(e){e.id=e.id.toString()})),console.log(t.modelNameList)}))},modelNameClick:function(e){this.modelNameList=[],e.vehicle_type&&"998"!=e.vehicle_type&&this.getModelName(e.vehicle_type),console.log(e)},purposeClick:function(e){this.goalList=[],e.city_code&&this.getGoal(e.city_code)},changePurpose:function(e){this.getPrice(e),this.goalList.forEach((function(t){t.id==e.purpose&&(e.purpose_name=t.value)})),console.log(e)},modelNameListChange:function(e){this.getPrice(e),this.modelNameList.forEach((function(t){t.id==e.vehicle_id&&(e.brand_name=t.value)})),console.log(e)},vehicleQuantity:function(e){console.log(e.car_count),this.getPrice(e)},getPrice:function(e){if(console.log(e,93),e.city_code&&e.purpose&&e.vehicle_type){var t="",i="";if(e.purpose.includes(".")){var r=[];r=e.purpose.split("."),t=r[1],i=r[0]}else t="",i=e.purpose;console.log(t,i),console.log(i,e.vehicle_type),"999"==i||""==i||"998"==e.vehicle_type||""==e.vehicle_type?(e.indicativePrice="-",e.explain=e.explain+"..ide",e.explain=e.explain.replace("..ide","")):this.$api.getPrice({cityCode:e.city_code,usingVehiclePurposeId:i,airportId:t,usingVehicleTypeId:e.vehicle_type,vehicleBrandId:e.vehicle_id,number:""==e.car_count?1:e.car_count},"POST").then((function(t){console.log(t,e.vehicle_id);var i="";t?t.minPrice&&t.maxPrice&&t.minPrice-0==t.maxPrice-0?i="￥"+t.minPrice:""==e.vehicle_id?t.minPrice?i="￥"+t.minPrice:i+="暂无价格":(t.minPrice?i+="￥"+t.minPrice:i+="暂无最低价",t.maxPrice?i+="-￥"+t.maxPrice:i+="-暂无最高价"):i+="暂无指导价",e.indicativePrice=i,e.explain=e.explain+"..ide",e.explain=e.explain.replace("..ide","")}))}}}},g=m,v=i("2877"),y=Object(v["a"])(g,_,h,!1,null,"31b5ecd0",null),b=y.exports,$=i("e45d"),w=i("cf45"),k=i("2654"),C={name:"EventDemand",data:function(){return{isDemandHotel:!1,eventId:"",eventName:"",tableData:[],hasCheckedRow:!1,dateArr:[],allDate:[],roomDate:[],outDate:[],demandList:[],swingList:[],equipmentList:[],foodList:[],trafficType:[],purposeList:[],carType:[],otherService:[],nextDialog:!1,perfectDialog:!1,perfectMsg:"",purchaseId:"",isShowHotelBtn:0,isCheck:!1,InquirySheetObjectID:"",isSite:[],isShow:!0,transportation:[]}},components:{room:n["a"],event:c["a"],intercity:l["a"],foodDemand:u["a"],foodOutDemand:d["a"],car:b,other:$["a"]},mounted:function(){var e=this;this.eventId=this.$route.query.id,this.getDemandList().then((function(t){var i=[],r=Object(w["h"])(e.dateArr[0],-1),o=Object(w["h"])(e.dateArr[0],-2),a=Object(w["h"])(e.dateArr[0],-3),n=Object(w["h"])(e.dateArr[e.dateArr.length-1],1),c=Object(w["h"])(e.dateArr[e.dateArr.length-1],2),l=Object(w["h"])(e.dateArr[e.dateArr.length-1],3);e.roomDate=[a,o,r].concat(Object(s["a"])(e.dateArr),[n]).filter((function(e){return e})),e.outDate=[a,o,r].concat(Object(s["a"])(e.dateArr),[n,c]).filter((function(e){return e})),e.allDate=[a,o,r].concat(Object(s["a"])(e.dateArr),[n,c,l]).filter((function(e){return e})),e.roomDate.forEach((function(e){var t={id:"",check_in_date:e,twin_bed_count:"",king_bed_count:"",superior_room_count:"",other_requirements:"",is_delete:0};i.push(t)})),e.$refs.event.meetDate=e.dateArr,e.$refs.intercity.interDate=e.allDate,e.$refs.intercity.eventEndTime=e.demandList.EndTime.substring(0,10),e.$refs.car.carDate=e.allDate,e.$refs.room.room=JSON.parse(JSON.stringify(i)),e.$refs.room.orgRoom=JSON.parse(JSON.stringify(i)),e.swingList=e.demandList.Tower,e.$refs.foodOut.FoodOutside=e.demandList.FoodOutside,e.$refs.foodOut.dateArr=e.allDate,e.$refs.food.dateArr=e.allDate;var u=e.demandList.Equipment;e.equipmentList=u,e.$refs.event.conferenceList[0].conference[0].equipment=JSON.parse(JSON.stringify(u)),e.$refs.event.tagList=JSON.parse(JSON.stringify(u)),e.foodList=e.demandList.Food,e.$refs.intercity.trafficType=e.demandList.Car,e.$refs.intercity.init(),e.purposeList=e.demandList.Purpose,e.carType=e.demandList.CarType;var d=e.demandList.OtherService;d.forEach((function(e){e.is_delete=1})),e.$refs.other.otherList=JSON.parse(JSON.stringify(d));var _=e.$route.query;_&&_.type&&"check"===_.type&&(e.isCheck=!0),e.getDemandDetail()})),JSON.parse(sessionStorage.getItem("isSite"))&&(console.log(JSON.parse(sessionStorage.getItem("isSite"))),this.isSite=JSON.parse(sessionStorage.getItem("isSite")),this.isShow=!1)},methods:{positiveFloat:w["m"],checkedRow:function(e,t,i){var r=this;this.tableData.forEach((function(t){t.inquiry_sheet_code==e.inquiry_sheet_code&&r.$refs.multipleTable.toggleRowSelection(t)}))},selectRow:function(e,t){var i=this;this.$refs.multipleTable.toggleRowSelection(t),this.tableData.forEach((function(e){e.inquiry_sheet_code==t.inquiry_sheet_code&&i.$refs.multipleTable.toggleRowSelection(e)}))},handleSelectionChange:function(e){var t="";e.forEach((function(e){t&&e.id?t+=","+e.id:e.id&&(t+=e.id)})),this.InquirySheetObjectID=t},subTap:function(e){var t=this,i=this.$refs.room.room,r=this.$refs.event.conferenceList,o=[];r.forEach((function(e){e.conference.forEach((function(t){o.push(Object(a["a"])(Object(a["a"])({},t),{},{conference_date:e.conference_date}))}))}));this.$refs.food.foodBudgetList;var s=this.$refs.intercity.transportationList,n=[];s.forEach((function(e){e.transportation.forEach((function(t){n.push(Object(a["a"])(Object(a["a"])({},t),{},{transportation_date:e.transportation_date.substring(0,10)}))}))}));var c=this.$refs.car.carList,l=[];c.forEach((function(e){e.car.forEach((function(t){l.push(Object(a["a"])(Object(a["a"])({},t),{},{car_date:e.car_date}))}))})),l.forEach((function(e){if(e.purpose.includes(".")){var t=[];t=e.purpose.split("."),e.purpose=t[0],e.airport_id=t[1]}else e.airport_id=""})),console.log(l);var u=this.$refs.other.otherAddList,d=this.$refs.other.otherCustom,_={is_guest_room:this.$refs.room.is_guest_room,guest_room_budget:Number(this.$refs.room.guest_room_budget),check_in_date:this.$refs.room.check_in_date,out_date:this.$refs.room.out_date,night_budget:Number(this.$refs.room.night_budget),is_networks:this.$refs.room.is_networks?1:0,is_breakfast:this.$refs.room.is_breakfast?1:0,is_Inside_outside:this.$refs.room.is_Inside_outside,is_conference_rooms:this.$refs.event.is_conference_rooms,conference_rooms_budget:Number(this.$refs.event.conference_rooms_budget),is_food_beverage:this.$refs.food.is_food_beverage,food_beverage_budget:Number(this.$refs.food.food_beverage_budget),is_food_outside:this.$refs.foodOut.is_food_outside,food_outside_budget:Number(this.$refs.foodOut.food_outside_budget),is_intercity_transportation:this.$refs.intercity.is_intercity_transportation,intercity_transportation_budget:Number(this.$refs.intercity.intercity_transportation_budget),is_car_rental:this.$refs.car.is_car_rental,car_rental_budget:Number(this.$refs.car.car_rental_budget),is_other:1,other_budget:Number(this.$refs.other.other_budget),order_describe:this.$refs.other.order_describe,is_delete:"0",id:this.purchaseId,event_info_id:this.eventId},h={meetingid:this.eventId,meeting_type:0,purchase:_,room:"1"==this.$refs.room.is_guest_room?i:[],other:u,otherCustom:d,car:"1"==this.$refs.car.is_car_rental?l:[],transportation:"1"==this.$refs.intercity.is_intercity_transportation?n:[],food:"1"==this.$refs.food.is_food_beverage?this.$refs.food.foodBudgetList:[],foodOutside:"1"==this.$refs.foodOut.is_food_outside?this.$refs.foodOut.foodBudgetList:[],conference:"1"==this.$refs.event.is_conference_rooms?r:[]},f="",p="",m="",g="";return h.conference.forEach((function(e,t){e.index=t+1})),h.room.forEach((function(e,i){if("1"==t.$refs.room.is_Inside_outside){var r=parseFloat(e.in_twin_bed_count)?parseFloat(e.in_twin_bed_count):0,o=parseFloat(e.out_twin_bed_count)?parseFloat(e.out_twin_bed_count):0;e.twin_bed_count=r+o;var a=parseFloat(e.in_king_bed_count)?parseFloat(e.in_king_bed_count):0,s=parseFloat(e.out_king_bed_count)?parseFloat(e.out_king_bed_count):0;e.king_bed_count=a+s;var n=parseFloat(e.in_superior_room_count)?parseFloat(e.in_superior_room_count):0,c=parseFloat(e.out_superior_room_count)?parseFloat(e.out_superior_room_count):0;e.superior_room_count=n+c}"0"==t.$refs.room.is_Inside_outside&&(e.in_twin_bed_count=0,e.out_twin_bed_count=e.twin_bed_count,e.in_king_bed_count=0,e.out_king_bed_count=e.king_bed_count,e.in_superior_room_count=0,e.out_superior_room_count=e.superior_room_count),e.index=i+1})),h.food.forEach((function(e,t){e.index=t+1})),h.foodOutside.forEach((function(e,t){e.index=t+1})),h.conference.forEach((function(e){e.conference.forEach((function(t){t.conference_start_time&&t.conference_end_time&&t.attendees&&t.room_setup_type&&(1!==t.is_setting_in_advance||t.setting_in_advance_date&&t.rehearsal_date)||(f+="<b>"+e.conference_date+"</b>会场需求 ",t.conference_start_time||(f+=" 会场开始时间未填写 "),t.conference_end_time||(f+=" 会场结束时间未填写 "),t.attendees||(f+=" 参与人数未填写 "),t.room_setup_type||(f+=" 摆台形式未填写 "),1===t.is_setting_in_advance&&(t.setting_in_advance_date||(f+=" 搭建入场时间未填写 "),t.rehearsal_date||(f+=" 彩排完成时间未填写 ")))}))})),h.transportation.forEach((function(e,t){e.origin_city&&e.destination_city&&e.passenger_count&&e.trans_type||(p+="<br/><b>"+e.transportation_date+"</b>大交通需求 ",e.origin_city||(p+=" 始发地未填写 "),e.destination_city||(p+=" 目的地未填写 "),e.passenger_count||(p+=" 搭乘人数未填写 "),e.trans_type||(p+=" 交通工具未填写 ")),e.index=t+1})),h.car.forEach((function(e,t){e.city_code&&e.purpose&&e.vehicle_type&&e.car_count||(m+="<br/><b>"+e.car_date+"</b> 地面交通需求： ",e.city_code||(m+=" 用车城市未填写 "),e.purpose||(m+=" 用车目的未填写 "),e.vehicle_type||(m+=" 用车类型未填写 "),e.car_count||(m+=" 用车数量未填写 ")),e.index=t+1})),h.other.some((function(e,t){1===e.type||e.participate_count||(g+="<br/>其他需求-"+e.order_name+" 数量未填写"),1!==e.type||e.describe||(g+="<br/>其他需求-"+e.order_name+" 需求描述未填写"),e.index=t+1})),h.otherCustom.some((function(e,t){e.describe||(g+="<br/>其他需求 描述未填写"),e.index=h.other.length+t+1})),g||f||p||m?(this.perfectDialog=!0,void(this.perfectMsg=f+p+m+g)):1===e&&h.room.length<=0&&h.conference.length<=0&&h.food.length<=0?(this.perfectDialog=!0,void(this.perfectMsg="酒店询价必须含有酒店内项目需求")):(console.log(n,87887),void this.$api.addPurchase({Parameter:JSON.stringify(h)},"POST").then((function(i){1===e?i&&(t.$message.success("保存成功"),t.GetEditInquirySheet(),t.$api.selecthotel({hotel:JSON.parse(sessionStorage.getItem("isSite"))},"POST").then((function(e){if(e){var i=1;t.$nextTick((function(){t.$router.push({name:"HotelProcurement",params:{id:t.$route.query.id,type:i}})}))}}))):i&&(console.log(h),t.$message.success("保存成功"),t.getHotelBtn(),t.GetEditInquirySheet(),t.nextDialog=!0)})))},GetEditInquirySheet:function(){var e=this;this.$api.GetEditInquirySheet({MeetingID:this.eventId},"POST").then((function(t){e.tableData=t}))},getHotelBtn:function(){var e=this;this.$api.getPurchase({MeetingID:this.eventId},"POST").then((function(t){e.isShowHotelBtn=t.type}))},goNext:function(e){var t=this,i=localStorage.getItem("event_city_code")?"/"+localStorage.getItem("event_city_code"):"";if(1===e)sessionStorage.setItem("empty",!0),this.$router.push({path:"/hotelcg/"+this.eventId+i+"/addhotel",query:{empty:!0}});else if(2===e)this.isDemandHotel=!0;else if(3===e)this.$router.push({path:"/ServiceProvidercg/"+this.eventId+i+"/"+JSON.stringify(this.$refs.car.carList)+"/3"});else if(4===e)this.$router.push({path:"/ServiceProvidercg/"+this.eventId+i+"/"+JSON.stringify(this.$refs.car.carList)+"/2"});else if(5===e)this.$router.replace({path:"/EventDetail",query:{id:this.eventId}});else if(6===e){if(this.$refs.multipleTable.toggleRowSelection({},!0),this.InquirySheetObjectID&&(this.hasCheckedRow=!0),!this.hasCheckedRow)return void this.$message.error("请选择中要更新的询价单");this.$api.UpdateInquirySheet({MeetingID:this.eventId,InquirySheetObjectID:this.InquirySheetObjectID},"POST").then((function(e){e&&t.$router.replace({path:"/EventDetail",query:{id:t.eventId}})}))}},getDemandDetail:function(){var e=this;this.$api.getDemandDetail({MeetingID:this.eventId},"post").then((function(t){if(t){if(t.room&&t.room.length&&(e.$refs.room.room=t.room),t.purchase&&(e.purchaseId=t.purchase.id,e.$refs.room.night_budget=t.purchase.night_budget,e.$refs.room.check_in_date=t.purchase.check_in_date.substring(0,10),e.$refs.room.is_guest_room=1==t.purchase.is_guest_room.toString(),e.$refs.room.guest_room_budget=t.purchase.guest_room_budget,e.$refs.room.out_date=t.purchase.out_date,e.$refs.room.is_breakfast=1==t.purchase.is_breakfast,e.$refs.room.is_networks=1==t.purchase.is_networks,e.$refs.room.is_Inside_outside=t.purchase.is_inside_outside?t.purchase.is_inside_outside:0),t.conference&&t.conference.length){var i=Object(k["d"])(t.conference,"conference_date");i.forEach((function(t){t.conference_date=t.time.substring(0,10),t.conference=t.data,t.conference.forEach((function(t){t.equipment.forEach((function(t){var i=e.equipmentList.filter((function(e){return e.equipment_code===t.equipment_code}));t.value=i.length?i[0].value:""}))}))})),e.$refs.event.conferenceList=JSON.parse(JSON.stringify(i)),e.$refs.event.addDate()}if(e.$refs.event.is_conference_rooms=1==t.purchase.is_conference_rooms.toString(),e.$refs.event.conference_rooms_budget=t.purchase.conference_rooms_budget,t.food&&t.food.length&&(e.$refs.food.foodBudgetList=t.food),e.$refs.food.is_food_beverage=1==t.purchase.is_food_beverage.toString(),e.$refs.food.food_beverage_budget=t.purchase.food_beverage_budget,e.$refs.food.food_limit=t.purchase.food_limit,t.foodOutside&&t.foodOutside.length&&(e.$refs.foodOut.foodBudgetList=t.foodOutside),e.$refs.foodOut.is_food_outside=1==t.purchase.is_food_outside.toString(),e.$refs.foodOut.food_outside_budget=t.purchase.food_outside_budget,e.$refs.foodOut.food_limit=t.purchase.food_limit,t.transportation&&t.transportation.length){e.$refs.intercity.transportationList=[];var r=t.transportation;r.forEach((function(e){e.transportation_date=e.transportation_date.substring(0,10)})),e.$refs.intercity.transportationList=r}e.$refs.intercity.is_intercity_transportation=1==t.purchase.is_intercity_transportation.toString(),e.$refs.intercity.intercity_transportation_budget=t.purchase.intercity_transportation_budget,t.car&&t.car.length&&(e.$refs.car.carList=Object(k["c"])(t.car,"car_date")),e.$refs.car.is_car_rental=1==t.purchase.is_car_rental.toString(),e.$refs.car.car_rental_budget=t.purchase.car_rental_budget,e.$refs.other.other_budget=t.purchase.other_budget,e.$refs.other.otherAddList=t.other,e.$refs.other.otherCustom=t.otherCustom,e.$refs.other.order_describe=t.purchase.order_describe}}))},getDemandList:function(){var e=this;return new Promise((function(t,i){e.$api.servicePurchase({MeetingID:e.eventId},"POST").then((function(i){e.demandList=i,e.dateArr=Object(w["f"])(e.demandList.BeginTime.substring(0,10),e.demandList.EndTime.substring(0,10)),e.$forceUpdate(),t(i)}))}))},goEdit:function(){this.$router.replace({path:"/CreateEvent",query:{id:this.eventId,type:"edit"}})},backPrePage:function(){this.$router.replace({path:"/EventDetail",query:{id:this.eventId,name:this.$route.query.name,eventSearchType:this.$route.query.eventSearchType}})}},watch:{isCheck:function(e){e&&console.log(this.$refs.room,44)},immediate:!0}},S=C,L=(i("2d84"),i("19b9"),i("76cc"),Object(v["a"])(S,r,o,!1,null,null,null));t["default"]=L.exports},"8d7b":function(e,t,i){},eacc:function(e,t,i){}}]);