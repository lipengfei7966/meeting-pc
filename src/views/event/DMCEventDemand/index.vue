<template>
  <div class="create_demand box">
    <div class="path">
      <ul>
        <el-button type="text" @click="$router.replace({name:'DMCEventList'})">我的会议</el-button>
        <li v-if="$route.query.type" style="color: #7c7f82">></li>
        <li v-if="$route.query.type" style="color: #409EFF;cursor:pointer" @click="$router.replace({name:`DMCEventDetail?id=${$route.query.id}&name=${$route.query.name}&eventSearchType=${$route.query.eventSearchType}`})">会议详情 ({{$route.query.name}})</li>
        <li style="color: #7c7f82">></li>
        <li v-if="$route.query.type" style="color: #409EFF;cursor:pointer" @click="$router.replace({name:`DMCcreateEvent?id=${$route.query.id}&name=${$route.query.name}&eventSearchType=${$route.query.eventSearchType}&type=${$route.query.type}`})">创建会议</li>
        <li style="color: #7c7f82">></li>
        <li style="color: #7c7f82">采购需求</li>
      </ul>
    </div>
    <div class="edit_base_info" v-if="!isCheck">
      已根据会议基本信息的会议时间自动匹配好需求可选日期，若有误请您先 <span @click="goEdit">修改会议基本信息></span>
    </div>
    <div class="demand_title"></div>

    <div class="guestRoom_demand">
      <div class="demand_item_title">
        <span>填写会议采购需求</span>Event Requirements
      </div>
      <!--客房需求-->
      <room ref="room" v-if="dateArr.length" :dateArr="roomDate" :outDate="outDate" :isDMC="true"></room>
      <!--会场需求-->
      <event ref="event" v-if="dateArr.length" :dateArr="dateArr" :swingList="swingList" :isDMC="true"></event>
      <!--酒店内餐饮需求-->
      <foodDemand ref="food" v-if="dateArr.length" :dateArr="allDate" :foodList="foodList" :isDMC="true"></foodDemand>
      <!-- 酒店外餐饮需求 -->
      <foodOutDemand ref="foodOut" v-if="dateArr.length" :dateArr="allDate" :foodList="foodList" :isDMC="true"></foodOutDemand>
      <!--大交通-->
      <intercity v-if="dateArr.length" ref="intercity" :dateArr="allDate" :trafficType="trafficType" :isDMC="true"></intercity>
      <!--地面交通-->
      <car ref="car" v-if="dateArr.length" :carType="carType" :dateArr="allDate" :purposeList="purposeList" :isDMC="true"></car>
      <!--其他服务-->
      <other ref="other" :isDMC="true"></other>
    </div>
    <div class="flex_row justify_center mar_b20 sub_part">
      <el-button v-if="!isCheck" type="primary" class="sub_btn" @click="subTap">保存</el-button>
      <el-button v-if="isCheck" type="cancel" class="sub_btn" @click="backPrePage">返回</el-button>
    </div>
    <el-dialog title="保存成功" :visible.sync="nextDialog" align="center" top="200px">
      <!-- <el-button size="small" v-if="isShowHotelBtn === 0" type="primary" @click="goNext(1)">找酒店采购</el-button> -->
      <!-- <el-button class="mar_lr20" size="small" type="primary" @click="goNext(1)">填写报价</el-button> -->
      <el-table ref="multipleTable" :data="tableData" @row-click="checkedRow" fit :show-header="false" tooltip-effect="dark" style="width: 100%;margin-bottom: 20px;" @selection-change="handleSelectionChange">
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="询价单">
          <template slot-scope="scope">
            询价单号【{{ scope.row.inquiry_sheet_code }}】
          </template>
        </el-table-column>
        <el-table-column prop="company_name" label="公司" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="total_amount" label="金额" width="100">
          <template slot-scope="scope">
            <span style="color:#f91">￥{{ positiveFloat(scope.row.total_amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" width="100" label="状态" show-overflow-tooltip> </el-table-column>
      </el-table>
      <el-button class="mar_lr20" size="small" type="primary" @click="goNext(1)">生成新询价单，立即报价</el-button>
      <el-button class="mar_lr20" size="small" type="primary" @click="goNext(2)">更新询价单，更新报价</el-button>
      <el-button size="small" @click="goNext(5)">返回会议详情</el-button>
    </el-dialog>
    <el-dialog :visible.sync="isDemandHotel" width="30%" align="center">
      <span>请选择会议服务商进行采购的方式</span>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button type="primary" plain @click="goNext(3)">立即采购(不含酒店)</el-button>
        <el-button type="primary" plain @click="goNext(4)">立即采购(含酒店)</el-button>
      </span>
    </el-dialog>
    <el-dialog title="请完善信息" :visible.sync="perfectDialog" align="left" top="200px">
      <p style="font-size: 16px;line-height: 20px" v-html="perfectMsg"></p>
    </el-dialog>
  </div>
</template>

<script>
  import room from '@/views/event/EventDemand/components/room'
  import event from '@/views/event/EventDemand/components/event'
  import intercity from '@/views/event/EventDemand/components/intercity'
  import foodDemand from '@/views/event/EventDemand/components/foodDemand'
  import foodOutDemand from '@/views/event/EventDemand/components/foodOutDemand'
  import car from '@/views/event/EventDemand/components/car'
  import other from '@/views/event/EventDemand/components/other'
  import {getBetweenDate, getNextDate} from '@/utils/common'
  import {guid, positiveInteger, positiveFloat, positiveFloatSix, formatDate, formatNum } from '@/utils/common';

  import {classifyByTime,eventifyByTime, SortByTimeUp} from '@/assets/js/validator.js'
  export default {
    name: "EventDemand",
    data() {
      return {
        isDemandHotel: false,
        eventId:'',
        eventName:'',
        tableData:[],
        hasCheckedRow:false, // 跟新采购需求、更新报价是否勾选询价单
        dateArr: [],
        allDate: [],
        roomDate: [],
        outDate: [], // 客房离店日期下拉选项
        demandList: [],
        swingList: [], // 摆台形式
        equipmentList: [], //会场设备
        foodList: [],//餐饮类型
        trafficType: [],//交通类型
        purposeList: [],//用车目的
        carType: [],//用车类型
        otherService: [],//其他服务
        nextDialog: false,
        perfectDialog: false,// 完善信息
        perfectMsg: '',//
        purchaseId:'',
        isShowHotelBtn: 0,// 是否展示酒店采购按钮
        isCheck: false, //是否是查看需求
        InquirySheetObjectID:'',
      }
    },
    components:{
      room,
      event,
      intercity,
      foodDemand,
      foodOutDemand,
      car,
      other,
    },
    mounted() {// getDemandDetail
      this.eventId = this.$route.query.id;
      this.getDemandList().then((res)=>{
        // 各需求数据渲染
        let roomArr = [];
        let BeginTime = res.BeginTime.substring(0,10)
        let a = getNextDate(BeginTime, -1);
        let b = getNextDate(BeginTime, -2);
        let c = getNextDate(BeginTime, -3);
        let d = getNextDate(this.dateArr[this.dateArr.length-1], 1);
        let e = getNextDate(this.dateArr[this.dateArr.length-1], 2);
        let f = getNextDate(this.dateArr[this.dateArr.length-1], 3);
        this.roomDate = [c,b,a,...this.dateArr,d].filter(item => {
          return item;
        });
        this.outDate = [c,b,a,...this.dateArr,d,e].filter(item => {
          return item;
        });
        this.allDate = [c,b,a,...this.dateArr,d,e,f].filter(item => {
          return item;
        });
        this.roomDate.forEach(date=>{
          let roomItem = {id: '', check_in_date: date, twin_bed_count: '', king_bed_count: '', superior_room_count: '', other_requirements: '',is_delete: 0,};
          roomArr.push(roomItem)
        });
        this.$refs.event.meetDate = this.dateArr;
        this.$refs.intercity.interDate = this.allDate;
        this.$refs.intercity.eventEndTime = this.demandList.EndTime.substring(0,10);
        this.$refs.car.carDate = this.allDate;
        this.$refs.room.room = JSON.parse(JSON.stringify(roomArr));
        this.$refs.room.orgRoom = JSON.parse(JSON.stringify(roomArr));
        this.swingList = this.demandList.Tower;
        this.$refs.foodOut.FoodOutside = this.demandList.FoodOutside;
        this.$refs.foodOut.dateArr = this.allDate;
        this.$refs.food.dateArr = this.allDate;
        let equipmentList = this.demandList.Equipment;
        this.equipmentList = equipmentList;
        this.$refs.event.conferenceList[0].conference[0].equipment = JSON.parse(JSON.stringify(equipmentList));
        this.$refs.event.tagList = JSON.parse(JSON.stringify(equipmentList));
        this.foodList = this.demandList.Food;
        // this.trafficType = this.demandList.Car;
        this.$refs.intercity.trafficType = this.demandList.Car;
        this.$refs.intercity.init();
        this.purposeList = this.demandList.Purpose;
        this.carType = this.demandList.CarType;
        let otherService = this.demandList.OtherService;
        otherService.forEach(item => {
          item.is_delete = 1
        });
        this.$refs.other.otherList = JSON.parse(JSON.stringify(otherService));
        // 编辑 数据回填
        let query = this.$route.query;
        if(query && query.type && query.type === 'check'){
          this.isCheck = true;
        }
        this.getDemandDetail();
        // if(query && query.type && query.type === 'edit'){
        //   this.getDemandDetail()
        // }else if(query && query.type && query.type === 'check'){
        //   this.getDemandDetail();
        //   this.isCheck = true;
        // }
      })
    },
    methods: {
      positiveFloat,
      // 点击询价单行事件
      checkedRow(row, column, event){
        if(row.state == 1){
          this.$refs.multipleTable.toggleRowSelection(row, true)
        }
      },
      // 选中询价单改变
      handleSelectionChange(row){
        if(row.length > 0) this.hasCheckedRow = true;
        // DMC 只有一条询价单
        this.InquirySheetObjectID = row[0].id;
      },
      subTap(){
        let room = this.$refs.room.room;
        let conferenceArr = this.$refs.event.conferenceList, conference = [];
        conferenceArr.forEach(item => {
          item.conference.forEach( conItem =>{
            conference.push({...conItem, conference_date:item.conference_date})
          })
        });
        let food = this.$refs.food.foodBudgetList;
        let transportation = this.$refs.intercity.transportationList, transportationArr = [];
        transportation.forEach(item => {
          item.transportation.forEach( conItem =>{
            transportationArr.push({...conItem, transportation_date:item.transportation_date.substring(0,10)})
          })
        });
        let carList = this.$refs.car.carList, carArr = [];
        carList.forEach(item => {
          item.car.forEach( conItem =>{
            carArr.push({...conItem, car_date:item.car_date})
          })
        });
        let other = this.$refs.other.otherAddList;
        console.log(JSON.stringify(other));
        let otherCustom = this.$refs.other.otherCustom
        let purchase = {
          // 客房需求
          is_guest_room:this.$refs.room.is_guest_room,// 客房（0：不需要 1:需要）
          guest_room_budget:Number(this.$refs.room.guest_room_budget), // 客房总预算
          check_in_date:this.$refs.room.check_in_date, // 入住日期
          out_date:this.$refs.room.out_date, // 离店日期
          night_budget:Number(this.$refs.room.night_budget), //间夜预算
          is_networks:this.$refs.room.is_networks ? 1:0, //是否需要宽带
          is_breakfast:this.$refs.room.is_breakfast ? 1:0, //是否需要早餐
          // 区分内外部
          is_Inside_outside:this.$refs.room.is_Inside_outside, 


          // 会场需求
          is_conference_rooms:this.$refs.event.is_conference_rooms, // 会场（0:不需要 1:需要） 当为1时需要关联会场需求表
          conference_rooms_budget:Number(this.$refs.event.conference_rooms_budget), //会场总预算

          // 酒店内餐饮需求
          is_food_beverage:this.$refs.food.is_food_beverage, //餐饮(0:不需要1：需要) 当为1时需要关联餐饮需求
          food_beverage_budget:Number(this.$refs.food.food_beverage_budget), //餐饮需求总预算

          // 酒店外餐饮需求
          is_food_outside:this.$refs.foodOut.is_food_outside, //餐饮(0:不需要1：需要) 当为1时需要关联餐饮需求
          food_outside_budget:Number(this.$refs.foodOut.food_outside_budget), //餐饮需求总预算

          // 大交通
          is_intercity_transportation:this.$refs.intercity.is_intercity_transportation, //大交通(0:不需要 1：需要) 当为1时需要关联大交通需求
          intercity_transportation_budget:Number(this.$refs.intercity.intercity_transportation_budget), //大交通总预算
          // 地面交通
          is_car_rental: this.$refs.car.is_car_rental, //地面交通(0:不需要 1:需要) 当为1时需要关联地面交通关系
          car_rental_budget: Number(this.$refs.car.car_rental_budget), //地面交通总预算

          // 其他需求
          is_other: 1, //其他 (0：不需要 1:需要) 当为1时需要关联其他关系
          other_budget:Number(this.$refs.other.other_budget), //其他总预算
          order_describe:this.$refs.other.order_describe, //
          is_delete:"0", //

          id: this.purchaseId, //
          event_info_id: this.eventId, //
        };
        let data = {
          meetingid: this.eventId,
          meeting_type: 1, // 1 为服务商提交
          purchase: purchase,
          room:this.$refs.room.is_guest_room == '1' ? room : [],
          other: other,
          otherCustom: otherCustom,
          car:this.$refs.car.is_car_rental == '1' ? carArr : [],
          transportation: this.$refs.intercity.is_intercity_transportation == '1' ? transportationArr : [],
          food:this.$refs.food.is_food_beverage == '1' ? this.$refs.food.foodBudgetList : [],
          foodOutside: this.$refs.foodOut.is_food_outside == '1'? this.$refs.foodOut.foodBudgetList : [],
          conference:this.$refs.event.is_conference_rooms == '1' ? conferenceArr : [],
        };
        // 必填数据效验
        let eventMsg = '', intercityMsg = '', carMsg = '', otherMsg = '';
        data.conference.forEach((item, index) => {
          item.index = index + 1;
        });
        data.room.forEach((item, index) => {
          if(this.$refs.room.is_Inside_outside == '1') {
            let in_twin_bed_count = parseFloat(item.in_twin_bed_count) ? parseFloat(item.in_twin_bed_count) : 0;
            let out_twin_bed_count = parseFloat(item.out_twin_bed_count) ? parseFloat(item.out_twin_bed_count) : 0;
            item.twin_bed_count = in_twin_bed_count + out_twin_bed_count;

            let in_king_bed_count = parseFloat(item.in_king_bed_count) ? parseFloat(item.in_king_bed_count) : 0;
            let out_king_bed_count = parseFloat(item.out_king_bed_count) ? parseFloat(item.out_king_bed_count) : 0;
            item.king_bed_count = in_king_bed_count + out_king_bed_count;

            let in_superior_room_count = parseFloat(item.in_superior_room_count) ? parseFloat(item.in_superior_room_count) : 0;
            let out_superior_room_count = parseFloat(item.out_superior_room_count) ? parseFloat(item.out_superior_room_count): 0;
            item.superior_room_count = in_superior_room_count + out_superior_room_count;
          }
          if(this.$refs.room.is_Inside_outside == '0') {
            item.in_twin_bed_count = 0;
            item.out_twin_bed_count = item.twin_bed_count;
            item.in_king_bed_count = 0;
            item.out_king_bed_count = item.king_bed_count;
            item.in_superior_room_count = 0;
            item.out_superior_room_count = item.superior_room_count;
          }
          item.index = index + 1;
        });
        data.food.forEach((item, index) => {
          item.index = index + 1;
        });
        data.foodOutside.forEach((item, index) => {
          item.index = index + 1;
        });
        data.conference.forEach(items => {
          items.conference.forEach(item => {
            if(!item.conference_start_time || !item.conference_end_time || !item.attendees || !item.room_setup_type
              || (item.is_setting_in_advance === 1 && (!item.setting_in_advance_date || !item.rehearsal_date))){
              eventMsg += '<b>' + items.conference_date + '</b>'+ '会场需求 ';
              if(!item.conference_start_time){
                eventMsg += ' 会场开始时间未填写 '
              }
              if(!item.conference_end_time){
                eventMsg += ' 会场结束时间未填写 '
              }
              if(!item.attendees){
                eventMsg += ' 参与人数未填写 '
              }
              if(!item.room_setup_type){
                eventMsg += ' 摆台形式未填写 '
              }
              if(item.is_setting_in_advance === 1){
                if(!item.setting_in_advance_date){
                  eventMsg += ' 搭建入场时间未填写 '
                }
                if(!item.rehearsal_date){
                  eventMsg += ' 彩排完成时间未填写 '
                }
              }
            }
          })
        });
        data.transportation.forEach((item, index) => {
          if(!item.origin_city || !item.destination_city || !item.passenger_count ||!item.trans_type){
            intercityMsg += '<br/><b>' + item.transportation_date +'</b>' +  '大交通需求 ';
            if(!item.origin_city){
              intercityMsg += ' 始发地未填写 '
            }
            if(!item.destination_city){
              intercityMsg += ' 目的地未填写 '
            }
            if(!item.passenger_count){
              intercityMsg += ' 搭乘人数未填写 '
            }
            if(!item.trans_type){
              intercityMsg += ' 交通工具未填写 '
            }
          }
          item.index = index + 1;
        });
        data.car.forEach((item, index) => {
          if(!item.purpose || !item.vehicle_type || !item.car_count){
            carMsg += '<br/><b>' + item.car_date + '</b>' + '地面交通需求 ';
            if(!item.purpose){
              carMsg += ' 用车目的未填写 '
            }
            if(!item.vehicle_type){
              carMsg += ' 用车类型未填写 '
            }
            if(!item.car_count){
              carMsg += ' 用车数量未填写 '
            }
          }
          item.index = index + 1;
        });

        data.other.some((tagItem, index) => {
          if(tagItem.type !== 1 && (!tagItem.participate_count)){
            otherMsg += '<br/>' + '其他需求-'+ tagItem.order_name +' 数量未填写'
          }
          if(tagItem.type === 1 && !tagItem.describe){
            otherMsg += '<br/>' + '其他需求-'+ tagItem.order_name +' 需求描述未填写'
          }
          tagItem.index = index + 1;
        });
        data.otherCustom.some((item, index) => {
          if(!item.describe){
            otherMsg += '<br/>' + '其他需求 描述未填写'
          }
          item.index = (data.other.length) + index + 1;
        });
          
        if(otherMsg || eventMsg || intercityMsg || carMsg){
          this.perfectDialog = true;
          this.perfectMsg = eventMsg + intercityMsg  + carMsg +  otherMsg;
          return
        }
        this.requestApi({
          url: '/MeetingMa/MeetingPurchaseSave',
          method: 'POST',
          data: {Parameter:JSON.stringify(data)},
        }).then(res => {
          if(res) {
            this.$message.success('保存成功');
            this.getHotelBtn();
            this.GetEditInquirySheet();
            this.nextDialog = true;
          }else {
            // this.$message.warning('保存失败')
          }
        })
      },
      // 采购需求保存询价单列表查询
      GetEditInquirySheet(){
        this.requestApi({
          url: '/EditInquirySheet/GetEditInquirySheet',
          method: 'POST',
          data: {  MeetingID: this.eventId },
        }).then(res => {
          this.tableData = res 
        })
      },
      // 是否展示  酒店采购按钮
      getHotelBtn(){
        // 获取采购需求信息
        this.requestApi({
          url: '/MeetingMa/GetPurchase',
          method: 'POST',
          data: { MeetingID: this.eventId },
        }).then(res => {
          this.isShowHotelBtn = res.type;
        });
      },
      // 跳转
      goNext(type){
        let city_code = localStorage.getItem('event_city_code');
        if(type === 1){// 生成新询价单，立即报价
          this.requestApi({
            url: '/MeetingMa/CreateInquirySheet',
            method: 'POST',
            data: { MeetingID: this.eventId },
          }).then(res => {
            if(res){
             this.$router.push({
                name: "DMCinquiryInfo",
                params: {
                  id: res
                },
              });
            }
          })
        }else if(type == 2 ){ // 更新询价，更新报价
          if(this.hasCheckedRow){
            // 已选择要更新询价单
            this.requestApi({
              url: '/EditInquirySheet/UpdateInquirySheet',
              method: 'POST',
              data: { 
                MeetingID: this.eventId,
                InquirySheetObjectID: this.InquirySheetObjectID
              },
            }).then(res => {
              if(res){
              this.$router.push({
                  name: "DMCinquiryInfo",
                  params: {
                    id: this.InquirySheetObjectID
                  },
                });
              }
            })
          }else{
            this.$message.error('请选择中要更新的询价单');
				    return
          }
        } else if(type === 5){// 详情
          this.$router.replace({name: 'DMCEventDetail',query:{id: this.eventId}})
        }
      },
      // 获取采购需求
      getDemandDetail(){
        this.requestApi({
          url: '/MeetingMa/GetMeetingID',
          method: 'POST',
          data: { MeetingID: this.eventId },
        }).then(res => {
          if(!res) return;
          let demandDetail = res;
          // 客房需求
          if(res.room && res.room.length) {
            this.$refs.room.room = res.room;// .reverse()
          }
          if(res.purchase) {
            this.purchaseId = res.purchase.id;
            this.$refs.room.night_budget = res.purchase.night_budget;
            this.$refs.room.check_in_date = res.purchase.check_in_date.substring(0, 10);
            this.$refs.room.is_guest_room = res.purchase.is_guest_room.toString();
            this.$refs.room.guest_room_budget = res.purchase.guest_room_budget;
            this.$refs.room.out_date = res.purchase.out_date;
            this.$refs.room.is_breakfast = res.purchase.is_breakfast == 1? true : false;
            this.$refs.room.is_networks = res.purchase.is_networks == 1? true : false;
            this.$refs.room.is_Inside_outside = res.purchase.is_inside_outside ? res.purchase.is_inside_outside : 0;
          }
          // 会场需求
          if(res.conference && res.conference.length){
            let conference = eventifyByTime(res.conference, 'conference_date'), conferenceList = [];
            conference.forEach(item => {
              item.conference_date = item.time.substring(0, 10);
              item.conference = item.data;
              // debugger
              item.conference.forEach(conferenceItem => {
                conferenceItem.equipment.forEach(tagItem => {
                  let tag = this.equipmentList.filter(equipmentItem => {
                    return equipmentItem.equipment_code === tagItem.equipment_code
                  });
                  tagItem.value = tag.length?tag[0].value : ''
                });
              })
            });
            // this.dateArr.forEach(date=>{
            //   let conferenceArr = {conference: [], conference_date: date};
            //   conferenceArr.conference = conference.filter(item => {
            //     item.equipment.forEach(tagItem => {
            //       let tag = this.equipmentList.filter(equipmentItem => {
            //         return equipmentItem.equipment_code === tagItem.equipment_code
            //       });
            //       tagItem.value = tag.length?tag[0].value : ''
            //     });
            //     return date = item.conference_date.substring(0, 10);
            //   });
            //   conferenceList.push(conferenceArr);
            // });
            this.$refs.event.conferenceList = JSON.parse(JSON.stringify(conference));
            this.$refs.event.addDate();
          }

          this.$refs.event.is_conference_rooms = res.purchase.is_conference_rooms.toString();// 会场（0:不需要 1:需要） 当为1时需要关联会场需求表
          this.$refs.event.conference_rooms_budget = res.purchase.conference_rooms_budget; //会场总预算
          // 酒店内餐饮需求
          if(res.food && res.food.length) this.$refs.food.foodBudgetList = res.food;
          this.$refs.food.is_food_beverage = res.purchase.is_food_beverage.toString(); //餐饮(0:不需要1：需要) 当为1时需要关联餐饮需求
          this.$refs.food.food_beverage_budget = res.purchase.food_beverage_budget;
          this.$refs.food.food_limit = res.purchase.food_limit;

          // 酒店外餐饮需求
          if(res.foodOutside && res.foodOutside.length) this.$refs.foodOut.foodBudgetList = res.foodOutside;
          this.$refs.foodOut.is_food_outside = res.purchase.is_food_outside.toString(); //餐饮(0:不需要1：需要) 当为1时需要关联餐饮需求
          this.$refs.foodOut.food_outside_budget = res.purchase.food_outside_budget;
          this.$refs.foodOut.food_limit = res.purchase.food_limit;

          // 大交通
          if(res.transportation && res.transportation.length) {
            this.$refs.intercity.transportationList = [];
            let transportation = res.transportation;
            transportation.forEach(item => {
              item.transportation_date = item.transportation_date.substring(0, 10)
            })
            this.$refs.intercity.transportationList = transportation;
          }
          this.$refs.intercity.is_intercity_transportation = res.purchase.is_intercity_transportation.toString(); //大交通(0:不需要 1：需要) 当为1时需要关联大交通需求
          this.$refs.intercity.intercity_transportation_budget = res.purchase.intercity_transportation_budget;
          // 地面交通
          if(res.car && res.car.length) {
            this.$refs.car.carList = classifyByTime(res.car, 'car_date');
          }
          this.$refs.car.is_car_rental = res.purchase.is_car_rental.toString(); //地面交通(0:不需要 1:需要) 当为1时需要关联地面交通关系
          this.$refs.car.car_rental_budget = res.purchase.car_rental_budget;
          this.$refs.car.eventCity = res.purchase.cityname;

          // 其他需求
          this.$refs.other.other_budget = res.purchase.other_budget;
          this.$refs.other.otherAddList = res.other;
          this.$refs.other.otherCustom = res.otherCustom;
          this.$refs.other.order_describe = res.purchase.order_describe;
        })
      },
      // 采购下拉数据处理与渲染
      getDemandList() {
        return new Promise((resolve, reject) => {
          this.requestApi({
            url: '/MeetingMa/Purchase',
            method: 'POST',
            data: { MeetingID: this.eventId },
          }).then((res) => {
            this.demandList = res;
            
            this.dateArr = getBetweenDate(this.demandList.BeginTime.substring(0,10), this.demandList.EndTime.substring(0,10));
            this.$forceUpdate();
            resolve(res)
          });
        })
      },
      goEdit() {
        this.$router.replace({name:'DMCcreateEvent',query: {id: this.eventId,type:'edit'}})
      },
      backPrePage(){
        this.$router.replace({name:'DMCEventDetail',query: {id:this.eventId,name:this.$route.query.name,eventSearchType:this.$route.query.eventSearchType}})
      }
    }
  }
</script>

<style lang="scss">
.create_demand {
  .edit_base_info {
    padding: 10px 20px;
    margin: 20px 0;
    border: 1px solid #ede7b8;
    background: #fbf6de;
    span {
      color: #428bca;
      cursor: pointer;
    }
  }
  .demand_item_title {
    background: #626e95;
    height: 44px;
    line-height: 44px;
    border-radius: 2px;
    padding: 0 20px;
    margin: 0 0 15px 0;
    color: #fff;

    span {
      font-size: 18px;
      padding-right: 10px;
    }
  }
  .demand_item {
    background: #fff;
    margin-top: 20px;
    border: 1px solid #e8e8e8;
    .demand_date {
    }
    .demand_top {
      background: #fafafa;
      border-bottom: 1px solid #eaeaea;
      padding: 10px 20px;
    }

    .demand_main {
      padding: 10px 20px;
      box-sizing: border-box;

      .demand_main_base {
        padding: 10px 0;
      }

      .time > div,
      .stage > div {
        margin-bottom: 5px;
      }
    }

    .demand_top_main_base {
      padding: 10px 20px;
    }

    .equipment_tag > span {
      display: inline-block;
      padding: 8px 15px;
      margin: 0 10px 10px 0;
      border: 1px solid #e7e7e7;
      cursor: pointer;
      user-select: none;
    }

    .select_tag {
      border: 1px solid #88c6f5 !important;
      color: #88c6f5;
      background: url(require('@/assets/images/check_icon.png'));
      background-position: right bottom;
      background-repeat: no-repeat;
    }
  }
  .sub_part {
    padding: 20px 0;
    .sub_btn {
      width: 250px;
      height: 54px;
      font-size: 18px;
    }
  }
}
.path {
  // width: 1100px;
  height: 55px;
  // background: red;
  margin: auto;
  margin-top: 15px;
}

.path ul {
  display: flex;
  line-height: 55px;
}

.path ul li {
  padding-left: 10px;
}
</style>
