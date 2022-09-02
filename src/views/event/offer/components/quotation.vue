<template>
  <div class="quotation bd_r bd_l">
    <a v-show="false" :href="downloadUrl" target="_blank" ref="a_click" download></a>
    <table class="hotel_info" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td class="bd_r">{{type == 1? '会议服务商': '酒店'}}名称</td>
        <td class="t78">
          <div class="flex_row align_center">
            <img style="width: 60px;height: 60px" :src="hotelInfo.logo" alt="">
            <div class="flex_column mar_l20">
              <span>{{hotelInfo.name}}<em></em></span>
              <!--              <span>?</span>-->
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="bd_r">{{type == 1? '会议服务商': '酒店'}}地址</td>
        <td class="t78">{{hotelInfo.address}}</td>
      </tr>
      <tr>
        <td class="bd_r">{{type == 1? '会议服务商': '酒店'}}联系人</td>
        <td class="t78">{{hotelInfo.contacts }} {{ hotelInfo.phone }} {{ hotelInfo.email}}</td>
      </tr>
      <tr>
        <td class="bd_r">{{hotelInfo.service_hotel == 1? '会议服务商': '酒店'}}报价人</td>
        <td class="t78">{{hotelInfo.service_name }} {{ hotelInfo.service_mobile }} {{ hotelInfo.service_email}}</td>
      </tr>
      <tr class="bg_pink">
        <td class="bd_r">需求</td>
        <td>
          <div class="flex_column" style="text-align:left">
            <span>
              总报价：<h2 class="dis_block t_orange">￥{{positiveFloat(hotelInfo.total_price).toFixed(2)}}</h2>
              <span v-if="hotelInfo.service_hotel == 1">
                <!-- （税前<h2 class="dis_block t_orange">￥{{additional.pretax}}</h2>） -->
              </span>

            </span>
            <span class="t_ccc">报价时间：{{hotelInfo.offer_data}}</span>
          </div>
        </td>
      </tr>
      <tr class="bg_7fd" v-if="hotelInfo.service_hotel == 1">
        <td class="bd_r">净价</td>
        <td><span class="t_orange" style="font-weight:bold">￥{{positiveFloat(hotelInfo.net_price)}}</span> </td>
      </tr>
      <tr v-if="hotelInfo.service_hotel == 1">
        <td class="bd_r">采购酒店</td>
        <td>
          {{hotelInfo.hotel_name?hotelInfo.hotel_name:'未选择采购酒店'}}
          <el-checkbox v-model="hotelInfo.isuser_preferred_hotel" :true-label="1" :false-label="0" style="line-height:30px;margin-left:20px">是否使用首选酒店</el-checkbox>
        </td>
      </tr>
    </table>
    <roomPart v-if="roomList.length" :roomList="roomList" :additional="additional" :hotelInfo="hotelInfo" ref="room"></roomPart>
    <eventPart v-if="eventList.length" :eventList="eventList" :additional="additional" :hotelInfo="hotelInfo" ref="event"></eventPart>
    <foodPart v-if="foodList.length" :foodList="foodList" :additional="additional" :hotelInfo="hotelInfo" ref="food"></foodPart>
    <foodOutsidePart v-if="foodOutsideList.length" :foodOutsideList="foodOutsideList" :additional="additional" :hotelInfo="hotelInfo" ref="foodOutside"></foodOutsidePart>
    <transportPart v-if="transportList.length" :transportList="transportList" :additional="additional" :hotelInfo="hotelInfo" ref="transport"></transportPart>
    <carPart v-if="carList.length" :carList="carList" :additional="additional" :hotelInfo="hotelInfo" ref="car"></carPart>
    <otherPart v-if="otherList.length" :otherList="otherList" :additional="additional" :hotelInfo="hotelInfo" ref="other"></otherPart>
    <div class="flex_row car_date bd_b">
      <div class="bd_r flex_1 pad_tb10_lr20">服务商报价说明（付款条件等）</div>
      <div class="flex_2 pad_tb10_lr20">{{additional.offer_remarks}}</div>
    </div>
    <div class="flex_row car_date bd_b">
      <div class="bd_r flex_1 pad_tb10_lr20">报价有效期</div>
      <div class="flex_2 pad_tb10_lr20">{{hotelInfo.quotationenddate}}</div>
    </div>
    <div class="flex_row car_date bd_b">
      <div class="bd_r flex_1 pad_tb10_lr20">报价书文件</div>
      <div class="flex_2 pad_tb10_lr20">
        <p v-for="(file,fileIndex) in hotelInfo.file" :key="fileIndex">
          <el-button size="mini" type="text" @click="handlePreview(file)">
            {{file.filename}}
          </el-button>
        </p>

      </div>

    </div>
    <servicePart v-if="additional.serviceData && additional.serviceData.length" :serviceList="additional" ref="service"></servicePart>
    <taxPart v-if="additional.taxationData && additional.taxationData.length" :taxList="additional" ref="tax"></taxPart>
  </div>
</template>

<script>
import {guid, positiveInteger, positiveFloat, positiveFloatSix, formatDate, formatNum } from '@/utils/common';
import carPart from './car'
import roomPart from './room'
import eventPart from './event'
import foodPart from './food'
import foodOutsidePart from './foodOutside'
import transportPart from './transport'
import otherPart from './other'
import servicePart from './service'
import taxPart from './tax'
import { MAINHOST, } from "@/config";
export default {
  name: "quotation",
  data() {
    return {
      downloadUrl:'',
      hotelInfo: {}, // 酒店信息
      baseInfo:{},
      carList: [],
      roomList: [],
      foodList: [],
      foodOutsideList: [],
      eventList: [],
      otherList: [],
      transportList: [],
      additional: {},
      taxList: {},
      serviceList: {},
      type: 1,
      MAINHOST: MAINHOST
    }
  },
  components: {carPart, roomPart, eventPart, foodPart,foodOutsidePart, transportPart, otherPart, servicePart, taxPart},
  mounted() {
    this.$nextTick(() => {
      this.type = this.$route.query.type;
    })
  },
  watch:{
    hotelInfo(val,newVal){
      this.baseInfo = val;
    }
  },
  methods:{
    positiveFloat(num) {
			return positiveFloat(num);
		},
    // 预览附件
    handlePreview(file) {
			debugger
			if(!file.filepath) return;
			// 获取文件后缀名
			let suffix = file.filepath.substring(file.filepath.lastIndexOf(".")+1)
			// doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
			let types1 = ['pdf','jpeg','jpg','png','txt'];
			let types2 = ['docx','doc','xls','xlsx','xlsm','ppt','pptx'];
			file.filepath = file.filepath.replace(/http:/, 'https:');
			this.downloadUrl= file.filepath
			if(types2.includes(suffix)){
				this.downloadUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(file.filepath)
			}else if(types1.includes(suffix)){
				this.downloadUrl = file.filepath
			}else{
				this.$message.info('文件格式不支持预览，下载后查看')
			}
			setTimeout(() => {
				this.$refs.a_click.click();
			}, 100);
		},
    downloadFile(file){
      let a_link = document.createElement('a')
        // 这里是将url转成blob地址，
        fetch(file.filepath ).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
          a_link.href = URL.createObjectURL(blob)
          console.log(a_link.href)
          a_link.download = file.filename //下载的文件的名字
          document.body.appendChild(a_link)
          a_link.click()
        })
      // window.location.href = this.hotelInfo.quotationfile_url;
    }
  },
}
</script>

<style lang="scss" scoped>
.quotation {
  /*border-left: 1px solid #e4e4e4;border-right: 1px solid #e4e4e4;*/
  table {
  }
  .hotel_info {
    tr {
      display: flex;
      border-bottom: 1px solid #e4e4e4;
      td:nth-child(1) {
        flex: 1;
      }
      td:nth-child(2) {
        flex: 2;
      }
      td {
        padding: 10px 20px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
