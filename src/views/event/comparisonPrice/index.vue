<template>
  <div ref="all" class="all">
    <div class="main">
      <ul>
        <!-- <li style="color:#0084e9;" @click="skip(EventList)">首页</li> -->
        <!-- <li style="color:#7c7f82;">></li> -->
        <li style="color:#0084e9;cursor: pointer;" @click="conference()">我的会议</li>
        <li style="color:#7c7f82;">></li>
        <li style="color:#0084e9;cursor: pointer;" @click="conferencedeatail()">会议详情</li>
        <li style="color:#0084e9;cursor: pointer;" @click="conferencedeatail()">({{ meeting.event_name }})</li>
        <li style="color:#7c7f82;">></li>
        <li style="color:#0084e9;cursor: pointer;" @click="inquiry()">{{ hotelOrSupplier ? '酒店询价单详情' : '会议服务商询价单详情' }}</li>
        <li style="color:#0084e9;cursor: pointer;" @click="inquiry()">({{ inquiry_sheet_code }})</li>
        <li style="color:#7c7f82;">></li>
        <li style="color:#7c7f82;">{{ hotelOrSupplier ? '酒店比价详情' : '会议服务商比价详情' }}</li>
      </ul>
    </div>
    <div class="content">
      <img :src="require('@/assets/images/锁定.png')" alt />
      <span>比价信息</span>
      <a class="excel" @click="excelExport" style="cursor: pointer;">下载Excel</a>
      <!-- <a class="excel" @click="pdfExport" style="cursor: pointer;">下载PDF</a> -->
      <!-- 未完成、待完成 -->
    </div>
    <div class="nformation">
      <p>会议基本信息</p>
      <p>Event Profile</p>
      <p>（敏感信息对供应商隐藏）</p>
      <img @click="isopen = !isopen" v-if="!isopen" :src="require('@/assets/images/open.png')" width="20px" height="20px" alt="" />
      <img @click="isopen = !isopen" v-else :src="require('@/assets/images/close.png')" width="20px" height="20px" alt="" />
    </div>
    <div class="information" v-if="isopen">
      <ul>
        <li>
          <span syle="margin-left:6px;">会议名称</span>
          <span class="tl">Event Name</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.event_name }}</span>
        </li>
        <li>
          <span>建团类型</span>
          <span style="font-size:12px; font-weight: bold; margin-left:6px;">:</span>
          <span style="margin-left:13px; color: #999999;">{{ meeting.tourist_group_type }}</span>
        </li>
        <li>
          活动类型
          <span style="margin-left:10px; color: #999999;">Event Type:</span>
          <span style="margin-left:10px;">{{ meeting.activity_type }}</span>
        </li>
        <li>
          Cvent号
          <span style="font-size:12px; font-weight: bold; margin-left:10px;">:</span>
          <span style="margin-left:10px;">{{ meeting.cvent_no }}</span>
        </li>
        <li>
          客户
          <span style="margin-left:10px; color: #999999;">Consumer</span>
          <span style=" font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.company_name }}</span>
        </li>
        <li>
          团电脑号
          <span style="margin-left:10px; color:#999999;">Team No</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.tourist_group_no }}</span>
        </li>
        <li>
          服务类型
          <span style="margin-left:10px; color: #999999; ">Service Type</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.service_type }}</span>
        </li>
        <li>
          会议城市
          <span style="margin-left:10px; color: #999999; ">City</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.event_city }}</span>
        </li>
        <li>
          餐标限制
          <span style="margin-left:10px; color: #999999;">Food Limit</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.food_limit }}</span>
        </li>
        <li>
          参会人数
          <span style="margin-left:10px; color: #999999;">Attendee NO.</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.attendee_no }}</span>
        </li>
        <li>
          会议开始日期
          <span style="margin-left:10px; color: #999999; ">Start Date</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.event_startdate }}</span>
        </li>
        <li>
          会议结束日期
          <span style="margin-left:10px; color: #999999; ">End Date</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.event_enddate }}</span>
        </li>
        <li>
          PR
          <span style="font-size:12px; font-weight: bold;  margin-left:4px;">:</span>
          <span>{{ meeting.pr }}</span>
        </li>
        <li>
          会议总预算
          <span style="margin-left:10px; color: #999999; ">Total Budget</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.total_budget }}</span>
        </li>
        <li>
          会议ID
          <span style="margin-left:10px; color: #999999;">Event ID</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.event_num }}</span>
        </li>
        <li>
          会议创建人
          <span style="margin-left:10px; color: #999999;">Submitor</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.create_user }}</span>
        </li>
        <li>
          客户联系人
          <span style="margin-left:10px; color: #999999;">Event Owner</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.username }}</span>
        </li>
        <li>
          客户所属部门
          <span style="margin-left:10px; color: #999999;">Owner's Department</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.department }}</span>
        </li>
        <li>
          客户联系电话
          <span style="margin-left:10px; color: #999999;">Owner's Phone NO.</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.mobile }}</span>
        </li>
        <li>
          客户邮箱
          <span style="margin-left:10px; color: #999999;">Owner's E-mail</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.email }}</span>
        </li>
        <li>
          指定服务商
          <span style="margin-left:10px; color: #999999;">Service Name</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.service_provider_name }}</span>
        </li>
        <li>
          发票类型
          <span style="margin-left:10px; color: #999999;">Invoice Type</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.invoice_type }}</span>
        </li>
        <li>
          是否办理免税
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.duty_free }}</span>
        </li>
        <li>
          创建时间
          <span style="margin-left:10px; color: #999999;">Create Date</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.create_date }}</span>
        </li>
        <li>
          客户材料
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">--</span>
        </li>
        <li>
          PO信息
          <span style="margin-left:10px; color: #999999;">PO information</span>
          <span style="font-size:12px; font-weight: bold;">:</span>
          <span style="margin-left:10px;">{{ meeting.po }}</span>
        </li>
      </ul>
    </div>
    <div style="margin-top: 20px;"></div>
    <div ref="div_table_left" class="div-table-left" v-show="is_top_head">
      <table class="table-left">
        <tr class="floatTr">
          <th class="th-name" ref="BorderHeight_hotel_float">{{ hotelOrSupplier ? '酒店名称' : '会议服务商名称' }}</th>
        </tr>
      </table>
    </div>
    <div ref="div_head" class="div-all div-head-ref" v-show="is_top_head">
      <table ref="table_head" class="table-all table-zindex">
        <tr class="floatTr head-tr">
          <th class="th-name" ref="BorderHeight_hotel_top">{{ hotelOrSupplier ? '酒店名称' : '会议服务商名称' }}</th>
          <td v-for="item in tableData" :class="[tableData.length > 1 ? 'td-upstep' : 'td-name']" :colspan="item.lastQuotedPrice ? '2' : '1'">
            <div class="hotel clx">
              <a href="" class="hotel_pic" target="_blank">
                <img :src="item.service.logo" width="56" height="56" alt="" />
              </a>
              <div class="hotel_info js-hiden-btn" data-organizer_id="2443">
                <div class="hotel_name">
                  <a class="a-name" href="" target="_blank">{{ item.service ? item.service.name : '' }}</a>
                  <!-- <span class="vendor-code">{{item.service.number?'('+item.service.number+')':''}}</span> -->
                </div>
                <p class="kind">
                  <i class="ico non"></i>
                  {{ item.service ? item.service.agreement : '' }}
                </p>
                <span class="status_icon"><img v-if="item.service.type == 1" :src="require('@/assets/images/accept_new.png')" /></span>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div ref="div_leftTop" class="div-all">
      <div @click="leftMove" v-show="left_arrow" class="left-arrow" id="js-icon-left"><img class="img-name" :src="require('@/assets/images/左箭头.png')" alt="" /></div>

      <div @click="rightMove" v-show="right_arrow" class="right-arrow" id="js-icon-right"><img class="img-name" :src="require('@/assets/images/右箭头.png')" alt="" /></div>

      <table ref="table_move" class="table-all">
        <tr ref="float_tr" class="floatTr">
          <th class="th-name" ref="BorderHeight_hotel">{{ hotelOrSupplier ? '酒店名称' : '会议服务商名称' }}</th>
          <td v-for="item in tableData" :class="[tableData.length > 1 ? 'td-upstep' : 'td-name']" :colspan="item.lastQuotedPrice ? '2' : '1'">
            <div class="hotel clx">
              <a href="" class="hotel_pic" target="_blank">
                <img :src="item.service.logo" width="56" height="56" alt="" />
              </a>
              <div class="hotel_info js-hiden-btn" data-organizer_id="2443">
                <div class="hotel_name">
                  <a class="a-name" href="" target="_blank">{{ item.service ? item.service.name : '' }}</a>
                  <!-- <span class="vendor-code">{{item.service.number?'('+item.service.number+')':''}}</span> -->
                </div>
                <p class="kind">
                  <i class="ico non"></i>
                  {{ item.service ? item.service.agreement : '' }}
                </p>
                <span class="status_icon"><img v-if="item.service.type == 1" :src="require('@/assets/images/accept_new.png')" /></span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="hotelOrSupplier">
          <th class="star th-width" ref="BorderHeight_site">{{ hotelOrSupplier ? '酒店场地类型' : '' }}</th>
          <td class="star" :colspan="item.lastQuotedPrice ? '2' : '1'" v-for="item in tableData">
            <span class="hot">{{ item.service.first.hotel_type }}</span>
          </td>
        </tr>
        <tr>
          <th class="address th-width" ref="BorderHeight_address">{{ hotelOrSupplier ? '酒店地址' : '会议服务商地址' }}</th>
          <td :colspan="item.lastQuotedPrice ? '2' : '1'" v-for="item in tableData" class="address">{{ item.service.address ? item.service.address : '' }}</td>
        </tr>
        <tr>
          <th class="contactName th-width" ref="BorderHeight_name">{{ hotelOrSupplier ? '酒店联系人 - 姓名' : '会议服务商联系人' }}</th>
          <td :colspan="item.lastQuotedPrice ? '2' : '1'" v-if="hotelOrSupplier" v-for="item in tableData" class="contactName">{{ item.service.contacts ? item.service.contacts : '' }}</td>
          <td :colspan="item.lastQuotedPrice ? '2' : '1'" v-if="!hotelOrSupplier" v-for="item in tableData" class="contactName">
            {{ item.service.contacts ? item.service.contacts : '' }}&nbsp;&nbsp;&nbsp;{{ item.service.phone ? item.service.phone : '' }}&nbsp;&nbsp;&nbsp;{{ item.service.email?item.service.email:'' }}
          </td>
        </tr>
        <tr v-if="hotelOrSupplier">
          <th class="contactPhone th-width" ref="BorderHeight_phone">酒店联系人 - 电话</th>
          <td :colspan="item.lastQuotedPrice ? '2' : '1'" v-for="item in tableData" class="contactPhone">{{ item.service.phone ? item.service.phone : '' }}</td>
        </tr>
        <tr v-if="hotelOrSupplier">
          <th class="contactEMail th-width" ref="BorderHeight_email">酒店联系人 - 邮箱</th>
          <td :colspan="item.lastQuotedPrice ? '2' : '1'" v-for="item in tableData" class="contactEMail">{{ item.service.email }}</td>
        </tr>
        <tr>
          <th class="contactPhone th-width" ref="BorderHeight_offerer">{{hotelOrSupplier?'酒店报价人':'会议服务商报价人'}} </th>
          <template v-for="item in tableData">
            <td class="contactPhone">
              {{ item.service.first ? item.service.first.service_name : '' }}&nbsp;&nbsp;&nbsp; {{ item.service.first ? item.service.first.service_mobile : '' }}&nbsp;&nbsp;&nbsp; {{
								item.service.first.service_email ? item.service.first.service_email : ''
							}}
            </td>
            <td class="contactPhone" v-if="item.service.last">
              {{ item.service.last ? item.service.last.service_name : '' }}&nbsp;&nbsp;&nbsp; {{ item.service.last ? item.service.last.service_mobile : '' }}&nbsp;&nbsp;&nbsp; {{
								item.service.last.service_email ? item.service.last.service_email : ''
							}}
            </td>
          </template>
        </tr>
        <tr v-if="hotelOrSupplier">
          <th class="link link-detail th-width" ref="BorderHeight_site">详情链接</th>
          <td :colspan="item.lastQuotedPrice ? '2' : '1'" v-for="item in tableData" class="link">
            <a class="view_detail" :href="item.service.hotel_url + item.service.hotel_id" target="_blank">
              <i class="ico"></i>
              酒店详情
            </a>
            <!-- <a class="view_detail" href="" target="_blank">
							<i class="ico"></i>酒店位置
						</a> -->
          </td>
        </tr>
        <tr v-if="command === '1'">
          <th class="need need-head th-width" ref="BorderHeight_need">需求</th>
          <template v-for="item in tableData">
            <td class="need">
              <div class="total">
                初次报价：
                <strong class="hot">
                  <dfn></dfn>
                  {{ item.service.first ? '¥' + positiveFloat(item.service.first.total_price) : '' }}
                </strong>
                <p class="light">报价时间：[{{ item.service.first ? item.service.first.offer_data : '' }}]</p>
              </div>
            </td>
            <td class="need" v-if="item.service.last">
              <div class="total">
                最终报价：
                <strong class="hot">
                  <dfn></dfn>
                  {{ item.service.last ? '¥' + positiveFloat(item.service.last.total_price) : '' }}

                </strong>
                <span v-if="!compareNum(item)" style="color:green;font-weight:900">
                  <span>⇩</span>{{riseInPrice(item)}}%
                </span>
                <span v-if="compareNum(item)" style="color:red;font-weight:900">
                  <span>⇧</span>{{riseInPrice(item)}}%
                </span>
                <p class="light">报价时间：[{{ item.service.last ? item.service.last.offer_data : '' }}]</p>
              </div>
            </td>
          </template>
        </tr>
        <tr v-if="hotelOrSupplier == false">
          <th class="purchase need-head th-width" ref="BorderHeight_buy">采购酒店</th>
          <template v-for="item in tableData">
            <td class="purchase">
              <div class="hotel clx">
                <img v-if="item.service.first.name" :src="'https://ctgbs-obs-storage.obs.myhuaweicloud.com/meeting' + item.service.first.hotel_img" width="56" height="56" alt="" />
                <div class="hotel_info js-hiden-btn" data-organizer_id="2443">
                  <div class="hotel_name">
                    <a v-if="item.service.first.name" class="a-name" target="_blank">{{ item.service.first.name }}</a>
                    <span v-else>未选择采购酒店</span>
                    <el-checkbox v-model="item.service.first.isuser_preferred_hotel" :true-label="1" :false-label="0" style="line-height:30px;margin-left:20px">是否使用首选酒店</el-checkbox>
                    <div style="color: #f91;font-weight: 600;">{{ item.service.first.hotel_type }}</div>
                  </div>
                </div>
              </div>
            </td>
            <td class="purchase" v-if="item.service.last">
              <div class="hotel clx">
                <img v-if="item.service.last.name" :src="'https://ctgbs-obs-storage.obs.myhuaweicloud.com/meeting' + item.service.last.hotel_img" width="56" height="56" alt="" />
                <div class="hotel_info js-hiden-btn" data-organizer_id="2443">
                  <div class="hotel_name">
                    <a v-if="item.service.last.name" class="a-name" target="_blank">{{ item.service.last.name }}</a>
                    <span v-else>未选择采购酒店</span>
                    <el-checkbox v-model="item.service.last.isuser_preferred_hotel" :true-label="1" :false-label="0" style="line-height:30px;margin-left:20px">是否使用首选酒店</el-checkbox>
                    <div style="color: #f91;font-weight: 600;">{{ item.service.last.hotel_type }}</div>
                  </div>
                </div>
              </div>
            </td>
          </template>
        </tr>
        <!--报价总额-->
        <template v-if="command === '2'">
          <tr style="height: 200px">
            <th class="roomPrice roomPrice-img th-width" ref="BorderHeight_totalprice">报价总额</th>
            <template v-for="item in tableData">
              <td class="roomPrice" v-if="item.service.first">
                <div class="column">
                  <span>初次报价：</span>
                  <span class="hot">总价：{{ item.service.first ? positiveFloat(item.service.first.net_price).toFixed(2) : '' }}</span>
                  <span class="hot">净价：{{ item.service.first ? positiveFloat(item.service.first.total_service_price).toFixed(2) : '' }}</span>
                  <span class="hot">税前价：{{ item.service.first ? positiveFloat(item.service.first.total_taxation_price).toFixed(2) : '' }}</span>
                </div>
              </td>
              <td class="roomPrice" v-if="item.service.last">
                <div class="column">
                  <span>最终报价：</span>
                  <span class="hot">总价：{{ item.service.last ? positiveFloat(item.service.last.net_price) : 0.00 }}</span>
                  <span class="hot">净价：{{ item.service.last ? positiveFloat(item.service.last.total_service_price) : 0.00 }}</span>
                  <span class="hot">税前价：{{ item.service.last ? positiveFloat(item.service.last.total_taxation_price) : 0.00 }}</span>
                </div>
              </td>
            </template>
          </tr>
        </template>

        <!-- 线上客房 -->
        <tr v-if="tableData[0] && tableData[0].room && tableData[0].room.length > 0">
          <th class="roomPrice roomPrice-img th-width h_40" ref="BorderHeight_room">
            <div @click="unflod = !unflod">
              <img class="img-top" v-show="!unflod" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod" :src="require('@/assets/images/close_1.png')" alt="" />
              客房总价
            </div>
          </th>
          <template v-for="item in tableData">
            <td class="roomPrice h_40">
              <strong class="hot">{{ item.firstQuotedPrice ? '¥' + positiveFloat(item.firstQuotedPrice.room) : '' }}</strong>
              <div v-if="(type === 'hotel' && command === '1')">
                {{ item.firstQuotedPrice && item.firstQuotedPrice.roomname ? item.firstQuotedPrice.roomname : '' }}
              </div>
            </td>
            <td class="roomPrice h_40" v-show="item.lastQuotedPrice">
              <strong class="hot">
                {{ item.lastQuotedPrice ? '¥' + positiveFloat(item.lastQuotedPrice.room) : '' }}
                <span class=""></span>
              </strong>
              <div v-if="(type === 'hotel' && command === '1') ">
                {{ item.lastQuotedPrice && item.lastQuotedPrice.roomname ? item.lastQuotedPrice.roomname : '' }}
              </div>
            </td>
          </template>
        </tr>
        <tbody v-show="unflod" v-for="(item, index) in tableData[0] ? tableData[0].room : []">
          <tr class="room-tr">
            <th class="roomPrice roomPrice-th th-width" ref="BorderHeight_roomprice">{{ item.time }} 客房价格</th>
            <template v-for="i in tableData">
              <td class="roomPrice price-td">{{ i.room[index] ? '¥' + positiveFloat(i.room[index].first_price) : '' }}</td>
              <td class="roomPrice price-td" v-if="i.lastQuotedPrice">{{ i.room[index] ? '¥' + positiveFloat(i.room[index].last_price) : '' }}</td>
            </template>
          </tr>
          <tr>
            <th class="roomPrice budget-price th-width" ref="BorderHeight_roominfo">
              <div class="column">
                <span>{{ item.room_budget }}</span>
                <span>{{ item.networks }}</span>
                <span>{{ item.breakfast }}</span>
                <span>{{ item.roomtype }}</span>
                <span>入住时间：{{ item.check_in_date?item.check_in_date:'' }}</span>
                <span>离店时间：{{ item.out_date?item.out_date:'' }}</span>
                <span>需求备注：{{ item.other_requirements?item.other_requirements:'' }}</span>
              </div>
            </th>
            <template v-for="i in tableData">
              <td class="roomPrice budget-price">
                <ul class="view_list">
                  <li v-for="first in i.room[index]?i.room[index].data:[]">
                    <div class="dark" v-if="first.first">
                      {{ first.first ? first.first.roomtype : '' }}：
                      <span v-if="first.first != undefined">{{ first.first ? '¥' + positiveFloat(first.first.unitprice) : '' }}</span>
                      *
                      <span v-if="first.first != undefined">{{ first.first ? first.first.provide_count : '' }}</span>
                      间
                      <strong v-if="first.first != undefined && first.first.provide_count != undefined" class="ml_10 text-align-right">
                        ¥ {{ positiveFloat((first.first ? first.first.unitprice : '') * (first.first ? first.first.provide_count : '')).toFixed(2) }}
                        <br />
                      </strong>
                      <br />
                      报价备注：
                      <span v-if="first.first != undefined">{{ first.first ? first.first.remarks : '' }}</span>
                    </div>
                  </li>
                </ul>
              </td>
              <td class="roomPrice budget-price" v-if="i.lastQuotedPrice">
                <ul class="view_list">
                  <li v-for="last in i.room[index]?i.room[index].data:[]">
                    <div class="dark" v-if="last.last">
                      {{ last.last ? last.last.roomtype : '' }}：
                      <span v-if="last.last != undefined">{{ last.last ? '¥' + positiveFloat(last.last.unitprice) : '' }}</span>
                      *
                      <span v-if="last.last != undefined">{{ last.last ? last.last.provide_count : '' }}</span>
                      间
                      <strong v-if="last.last != undefined && last.last.provide_count != undefined" class="ml_10 text-align-right">
                        ¥ {{ positiveFloat((last.last ? last.last.unitprice : '') * (last.last ? last.last.provide_count : '')).toFixed(2) }}
                        <br />
                      </strong>
                      <br />
                      报价备注：
                      <span v-if="last.last != undefined">{{ last.last ? last.last.remarks : '' }}</span>
                    </div>
                  </li>
                </ul>
              </td>
            </template>
          </tr>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].room && tableData[0].room.length > 0" class="room-tr">
          <th class="roomPrice roomPrice-th th-width" ref="BorderHeight_roomremark">客房报价总备注</th>
          <template v-for="item in tableData">
            <td class="roomPrice price-td" v-if="item.firstQuotedPrice">{{ item.firstQuotedPrice ? item.firstQuotedPrice.room_remarks : '' }}</td>
            <td class="roomPrice price-td" v-show="item.lastQuotedPrice">{{ item.lastQuotedPrice ? item.lastQuotedPrice.room_remarks : '' }}</td>
          </template>
        </tr>

        <!-- 线上会场 -->
        <tr v-if="tableData[0] && tableData[0].conference && tableData[0].conference.length > 0">
          <th class="roomPrice roomPrice-img th-width h_40" ref="BorderHeight_conferencetotalprice">
            <div @click="unflod_conference = !unflod_conference">
              <img class="img-top" v-show="!unflod_conference" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod_conference" :src="require('@/assets/images/close_1.png')" alt="" />
              会场总价
            </div>
          </th>
          <template v-for="item in tableData">
            <td class="roomPrice h_40">
              <strong class="hot" v-if="item.firstQuotedPrice">
                {{ item.firstQuotedPrice ? '¥' + positiveFloat(item.firstQuotedPrice.conference) : '' }}
                <span class=""></span>
              </strong>
              <div v-if="(type === 'hotel' && command === '1')">
                {{ item.firstQuotedPrice && item.firstQuotedPrice.conferencename ? item.firstQuotedPrice.conferencename : '' }}
              </div>
            </td>
            <td class="roomPrice h_40" v-show="item.lastQuotedPrice">
              <strong class="hot">
                {{ item.lastQuotedPrice ? '¥' + positiveFloat(item.lastQuotedPrice.conference) : '' }}
                <span class=""></span>
              </strong>
              <div v-if="(type === 'hotel' && command === '1')">
                {{ item.lastQuotedPrice && item.lastQuotedPrice.conferencename ? item.lastQuotedPrice.conferencename : '' }}
              </div>
            </td>
          </template>
        </tr>
        <tbody v-show="unflod_conference" v-for="(item, index) in tableData[0] ? tableData[0].conference : []">
          <tr v-if="item.rentalCosts.length" class="room-tr">
            <th class="roomPrice roomPrice-th th-width" ref="BorderHeight_conferenceprice">{{ item.time }} 会场价格</th>
            <template v-for="i in tableData">
              <td class="roomPrice price-td">{{ i.conference[index] ? '¥' + positiveFloat(i.conference[index].first_price) : '' }}</td>
              <td class="roomPrice price-td" v-if="i.lastQuotedPrice">{{ i.conference[index] ? '¥' + positiveFloat(i.conference[index].last_price) : '' }}</td>
            </template>
          </tr>
          <template v-for="(itemc, indexc) in item.rentalCosts ? item.rentalCosts : []">

            <tr v-if="item.rentalCosts.length && itemc.type == 1">
              <th class="roomPrice budget-price th-width" ref="BorderHeight_conferenceinfo1">
                <div class="column">
                  <span>{{ itemc.name }}</span>
                  <span>时间:{{ itemc.starttime }}-{{ itemc.endtime }}</span>
                  <span>台型:{{ itemc.roomsetuptype }}</span>
                  <span>人数:{{ itemc.attendees }}</span>
                  <span>面积:{{ itemc.min_area }}-{{ itemc.max_area }} sqm</span>
                </div>
              </th>
              <template v-for="i in tableData">
                <td class="roomPrice budget-price">
                  <ul class="view_list">
                    <li v-for="(firstItem,firstIndex) in i.conference[index].rentalCosts[indexc].first" :key="firstIndex">
                      <div class="dark">
                        <span> {{ '¥ ' + positiveFloat(firstItem.unit_price) + ' * ' + firstItem.count }} </span>
                        <strong class="ml_10 text-align-right">
                          {{ '¥' + positiveFloat(firstItem.price) }}
                          <br />
                        </strong>
                        <br />
                        报价备注：
                        <span>{{ firstItem.comments }}</span>
                      </div>
                    </li>
                  </ul>
                </td>
                <td class="roomPrice budget-price" v-if="i.lastQuotedPrice">
                  <ul class="view_list">
                    <li v-for="(lastItem,lastIndex) in i.conference[index].rentalCosts[indexc].last" :key="lastIndex">
                      <div class="dark">
                        <span> {{ '¥ ' + positiveFloat(lastItem.unit_price) + ' * ' + lastItem.count }} </span>
                        <strong class="ml_10 text-align-right">
                          {{ positiveFloat(lastItem.price) }}
                          <br />
                        </strong>
                        <br />
                        报价备注：
                        <span>{{ lastItem.comments }}</span>
                      </div>
                    </li>
                  </ul>
                </td>
              </template>
            </tr>
            <tr v-if="item.rentalCosts.length && itemc.type==2">
              <th class="roomPrice budget-price th-width" ref="BorderHeight_conferenceinfo2">
                <div class="column">
                  <span>{{ itemc.name }}</span>
                  <span>搭建时间:{{ itemc.starttime }}~{{ itemc.endtime }}</span>
                  <span>备注:{{ itemc.describe }}</span>
                  <span>是否提前搭建:{{ itemc.issettinginadvance }}</span>
                </div>
              </th>
              <template v-for="i in tableData">
                <td class="roomPrice budget-price">
                  <ul class="view_list">
                    <li v-for="(firstItem,firstIndex) in i.conference[index].rentalCosts[indexc].first" :key="firstIndex">
                      <div class="dark">
                        <span> {{ '¥ ' + positiveFloat(firstItem.unit_price) + ' * ' + firstItem.count }} </span>
                        <strong class="ml_10 text-align-right">
                          {{ positiveFloat(firstItem.price2) }}
                          <br />
                        </strong>
                        <br />
                        报价备注：
                        <span>{{ firstItem.comments }}</span>
                      </div>
                    </li>
                  </ul>
                </td>
                <td class="roomPrice budget-price" v-if="i.lastQuotedPrice">
                  <ul class="view_list">
                    <li v-for="(lastItem,lastIndex) in i.conference[index].rentalCosts[indexc].last" :key="lastIndex">
                      <div class="dark">
                        <span> {{ '¥ ' + positiveFloat(lastItem.unit_price) + ' * ' + lastItem.count }} </span>
                        <strong class="ml_10 text-align-right">
                          {{ positiveFloat(lastItem.price) }}
                          <br />
                        </strong>
                        <br />
                        报价备注：
                        <span>{{ lastItem.comments }}</span>
                      </div>
                    </li>
                  </ul>
                </td>
              </template>
            </tr>
            <tr v-if="item.rentalCosts.length && itemc.type == 3">
              <th class="roomPrice budget-price th-width" ref="BorderHeight_conferenceinfo3">
                <div class="column">
                  <span>{{ itemc.equipmentname }}</span>
                  <span>{{ itemc.equipment }}</span>
                  <span>备注：{{ itemc.microphonedescribe }}</span>
                </div>
              </th>
              <template v-for="i in tableData">
                <td class="roomPrice budget-price">
                  <ul class="view_list">
                    <li v-for="(firstItem,firstIndex) in i.conference[index].rentalCosts[indexc].first" :key="firstIndex">
                      <div class="dark">
                        <span> {{ '¥ ' + positiveFloat(firstItem.unit_price) + ' * ' + firstItem.count }} </span>
                        <strong class="ml_10 text-align-right">
                          {{ positiveFloat(firstItem.price2) }}
                          <br />
                        </strong>
                        <br />
                        报价备注：
                        <span>{{ firstItem.comments }}</span>
                      </div>
                    </li>
                  </ul>
                </td>
                <td class="roomPrice budget-price" v-if="i.lastQuotedPrice">
                  <ul class="view_list">
                    <li v-for="(lastItem,lastIndex) in i.conference[index].rentalCosts[indexc].last" :key="lastIndex">
                      <div class="dark">
                        <span> {{ '¥ ' + positiveFloat(lastItem.unit_price) + ' * ' + lastItem.count }} </span>
                        <strong class="ml_10 text-align-right">
                          {{ positiveFloat(lastItem.price) }}
                          <br />
                        </strong>
                        <br />
                        报价备注：
                        <span>{{ lastItem.comments }}</span>
                      </div>
                    </li>
                  </ul>
                </td>
              </template>
            </tr>
            <tr v-if="item.rentalCosts.length && itemc.type==5">
              <th class="roomPrice budget-price th-width" ref="BorderHeight_conferenceinfo2">
                <div class="column">
                  <span>{{ itemc.equipmentname }}</span>
                  <!-- <span>{{ itemc.equipment }}</span> -->
                </div>
              </th>
              <template v-for="i in tableData">
                <td class="roomPrice budget-price">
                  <ul class="view_list">
                    <li v-for="(firstItem,firstIndex) in i.conference[index].rentalCosts[indexc].first" :key="firstIndex">
                      <div class="dark">
                        <span> {{ '¥ ' + positiveFloat(firstItem.unit_price) + ' * ' + firstItem.count }} </span>
                        <strong class="ml_10 text-align-right">
                          {{ positiveFloat(firstItem.price)}}
                          <br />
                        </strong>
                        <br />
                        报价备注：
                        <span>{{ firstItem.comments }}</span>
                      </div>
                    </li>
                  </ul>
                </td>
                <td class="roomPrice budget-price" v-if="i.lastQuotedPrice">
                  <ul class="view_list">
                    <li v-for="(lastItem,lastIndex) in i.conference[index].rentalCosts[indexc].last" :key="lastIndex">
                      <div class="dark">
                        <span> {{ '¥ ' + positiveFloat(lastItem.unit_price) + ' * ' + lastItem.count }} </span>
                        <strong class="ml_10 text-align-right">
                          {{ positiveFloat(lastItem.price) }}
                          <br />
                        </strong>
                        <br />
                        报价备注：
                        <span>{{ lastItem.comments }}</span>
                      </div>
                    </li>
                  </ul>
                </td>
              </template>
            </tr>
          </template>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].conference && tableData[0].conference.length > 0" class="room-tr">
          <th class="roomPrice roomPrice-th th-width" ref="BorderHeight_conferenceremark">会场报价总备注</th>
          <template v-for="item in tableData">
            <td class="roomPrice price-td">{{ item.firstQuotedPrice ? item.firstQuotedPrice.conference_remarks : '' }}</td>
            <td class="roomPrice price-td" v-show="item.lastQuotedPrice">{{ item.lastQuotedPrice ? item.lastQuotedPrice.conference_remarks : '' }}</td>
          </template>
        </tr>

        <!-- 酒店内餐饮 -->
        <tr v-if="tableData[0] && tableData[0].food && tableData[0].food.length > 0">
          <th class="repastPrice repastPrice-img th-width h_40" ref="BorderHeight_foodtotalprice">
            <div class="repastPrice-div" @click="unflod_repast = !unflod_repast">
              <img class="img-top" v-show="!unflod_repast" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod_repast" :src="require('@/assets/images/close_1.png')" alt="" />
              餐饮总价
            </div>
          </th>
          <template v-for="item in tableData">
            <td class="repastPrice h_40">
              <strong class="hot">
                {{ item.firstQuotedPrice.food ? '¥' + positiveFloat(item.firstQuotedPrice.food) : '' }}
                <span class=""></span>
              </strong>
              <div v-if="(type === 'hotel' && command === '1')">
                {{ item.firstQuotedPrice && item.firstQuotedPrice.foodname ? item.firstQuotedPrice.foodname : '' }}
              </div>
            </td>
            <td class="repastPrice h_40" v-show="item.lastQuotedPrice">
              <strong class="hot">
                {{ item.lastQuotedPrice ? '¥' + positiveFloat(item.lastQuotedPrice.food) : '' }}
                <span class=""></span>
              </strong>
              <div v-if="(type === 'hotel' && command === '1')">
                {{ item.lastQuotedPrice && item.lastQuotedPrice.foodname ? item.lastQuotedPrice.foodname : '' }}
              </div>
            </td>
          </template>
        </tr>
        <tbody v-show="unflod_repast" v-for="(item, index) in tableData[0] ? tableData[0].food : []">
          <tr class="room-tr">
            <th class="repastPrice roomPrice-th th-width" ref="BorderHeight_foodprice">{{ item.time }} 餐饮价格</th>
            <template v-for="i in tableData">
              <td class="repastPrice price-td">
                {{ i.food[index] ? '¥' + positiveFloat(i.food[index].first_price) : '' }}
                <span class=""></span>
              </td>
              <td class="repastPrice price-td" v-if="i.lastQuotedPrice">
                {{ i.food[index] ? '¥' + positiveFloat(i.food[index].last_price) : '' }}
                <span class=""></span>
              </td>
            </template>
          </tr>
          <tr>
            <th class="repastPrice repastPrice-th th-width" ref="BorderHeight_foodinfo">
              <div class="column">
                <span>{{ item.time }}</span>
                <span>{{ item.foodname }}</span>
                <span>餐标：{{ item.food_limit }}</span>
                <span>备注：{{ item.comments }}</span>
              </div>
            </th>
            <template v-for="i in tableData">
              <td class="repastPrice">
                <ul class="price_sub_list">
                  <li v-for="first in i.food&&i.food[index]?i.food[index].data:[]">
                    <div v-if="first.first">
                      <p>
                        {{ first.first ? first.first.foodname : '' }}
                        <br />
                        ¥{{ first.first ? positiveFloat(first.first.price) : '' }} * {{ first.personcount ? first.personcount : '' }}人
                        <strong class="ml_10 text-align-right">
                          <span>¥</span>
                          {{ positiveFloat((first.first ? first.first.price : '') * first.personcount).toFixed(2) }}
                          <br />
                        </strong>
                      </p>
                      <p class="f_gray">
                        <strong style="font-weight: normal;">报价备注：{{ first.first ? first.first.offer_remarks : '' }}</strong>
                      </p>
                    </div>

                  </li>
                  <li></li>
                </ul>
              </td>
              <td class="repastPrice" v-if="i.lastQuotedPrice">
                <ul class="price_sub_list">
                  <li v-for="last in i.food&&i.food[index]?i.food[index].data:[]">
                    <div v-if="last.last">
                      <p>
                        {{ last.last ? last.last.foodname : '' }}
                        <br />
                        ¥{{ last.last ? positiveFloat(last.last.price) : '' }} * {{ last.personcount ? last.personcount : '' }}人
                        <strong class="ml_10 text-align-right">
                          <span>¥</span>
                          {{ positiveFloat((last.last ? last.last.price : '') * last.personcount).toFixed(2) }}
                          <br />
                        </strong>
                      </p>
                      <p class="f_gray">
                        <strong style="font-weight: normal;">报价备注：{{ last.last ? last.last.offer_remarks : '' }}</strong>
                      </p>
                    </div>

                  </li>
                  <li></li>
                </ul>
              </td>
            </template>
          </tr>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].food && tableData[0].food.length > 0" class="room-tr">
          <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_foodremark">餐饮报价总备注</th>
          <template v-for="item in tableData">
            <td class="repastPrice price-td">{{ item.firstQuotedPrice ? item.firstQuotedPrice.food_remarks : '' }}</td>
            <td class="repastPrice price-td" v-show="item.lastQuotedPrice">{{ item.lastQuotedPrice ? item.lastQuotedPrice.food_remarks : '' }}</td>
          </template>
        </tr>

        <!--酒店外餐饮总价   开始-->
        <tr v-if="tableData[0] && tableData[0].foodOutside && tableData[0].foodOutside.length > 0">
          <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_foodouttotalprice">
            <div class="repastPrice-div" @click="unflod_foodOut = !unflod_foodOut">
              <img class="img-top" v-show="!unflod_foodOut" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod_foodOut" :src="require('@/assets/images/close_1.png')" alt="" />
              酒店外餐饮总价
            </div>
          </th>
          <template v-for="item in tableData">
            <td class="repastPrice">
              <strong class="hot">
                {{ item.firstQuotedPrice ? '¥' + positiveFloat(item.firstQuotedPrice.foodOutside) : '' }}
                <span class=""></span>
              </strong>
            </td>
            <td class="repastPrice" v-show="item.lastQuotedPrice">
              <strong class="hot">
                {{ item.lastQuotedPrice ? '¥' + positiveFloat(item.lastQuotedPrice.foodOutside) : '' }}
                <span class=""></span>
              </strong>
            </td>
          </template>
        </tr>
        <tbody v-show="unflod_foodOut" v-for="(item, index) in tableData[0] ? tableData[0].foodOutside : []">
          <tr class="room-tr">
            <th class="repastPrice roomPrice-th th-width" ref="BorderHeight_foodoutprice">{{ item.time }} 餐饮价格</th>
            <template v-for="i in tableData">
              <td class="repastPrice price-td">
                {{ i.foodOutside[index] ? '¥' + positiveFloat(i.foodOutside[index].first_price) : '' }}
                <span class=""></span>
              </td>
              <td class="repastPrice price-td" v-if="i.lastQuotedPrice">
                {{ i.foodOutside[index] ? '¥' + positiveFloat(i.foodOutside[index].last_price) : '' }}
                <span class=""></span>
              </td>
            </template>
          </tr>
          <tr>
            <th class="repastPrice repastPrice-th th-width" ref="BorderHeight_foodoutinfo">
              <div class="column">
                <span>{{ item.time }}</span>
                <span>{{ item.foodoutsidename }}</span>
                <span>餐标：{{ item.food_limit }}</span>
                <span>备注：{{ item.comments }}</span>
              </div>
            </th>
            <template v-for="i in tableData">
              <td class="repastPrice">
                <ul class="price_sub_list">
                  <li v-for="first in i.foodOutside&&i.foodOutside[index]?i.foodOutside[index].data:[]">
                    <div v-if="first.first">
                      <p>
                        {{ first.first ? first.first.foodname : '' }}
                        <br />
                        ¥{{ first.first ? positiveFloat(first.first.price) : '' }} * {{ first.personcount ? first.personcount : '' }}人
                        <strong class="ml_10 text-align-right">
                          <span>¥</span>
                          {{ positiveFloat((first.first ? first.first.price : '') * first.personcount).toFixed(2) }}
                          <br />
                        </strong>
                      </p>
                      <p class="f_gray">
                        <strong style="font-weight: normal;">报价备注：{{ first.first ? first.first.offer_remarks : '' }}</strong>
                      </p>
                    </div>
                  </li>
                  <li></li>
                </ul>
              </td>
              <td class="repastPrice" v-if="i.lastQuotedPrice">
                <ul class="price_sub_list">
                  <li v-for="last in i.foodOutside[index]?i.foodOutside[index].data:[]">
                    <div v-if="last.last">
                      <p>
                        {{ last.last ? last.last.foodname : '' }}
                        <br />
                        ¥{{ last.last ? positiveFloat(last.last.price) : '' }} * {{ last.personcount ? last.personcount : '' }}人
                        <strong class="ml_10 text-align-right">
                          <span>¥</span>
                          {{ positiveFloat((last.last ? last.last.price : '') * last.personcount).toFixed(2) }}
                          <br />
                        </strong>
                      </p>
                      <p class="f_gray">
                        <strong style="font-weight: normal;">报价备注：{{ last.last ? last.last.offer_remarks : '' }}</strong>
                      </p>
                    </div>
                  </li>
                  <li></li>
                </ul>
              </td>
            </template>
          </tr>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].foodOutside && tableData[0].foodOutside.length > 0" class="room-tr">
          <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_foodoutremark">酒店外餐饮报价总备注</th>
          <template v-for="item in tableData">
            <td class="repastPrice price-td">{{ item.firstQuotedPrice ? item.firstQuotedPrice.food_outside_remarks : '' }}</td>
            <td class="repastPrice price-td" v-show="item.lastQuotedPrice">{{ item.lastQuotedPrice ? item.lastQuotedPrice.food_outside_remarks : '' }}</td>
          </template>
        </tr>
        <!--酒店外餐饮总总价   结束-->

        <!-- 大交通 -->
        <tr v-if="tableData[0] && tableData[0].transportation && tableData[0].transportation.length > 0">
          <th class="repastPrice repastPrice-img th-width h_40" ref="BorderHeight_transportationtotalprice">
            <div class="repastPrice-div" @click="unflod_transport = !unflod_transport">
              <img class="img-top" v-show="!unflod_transport" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod_transport" :src="require('@/assets/images/close_1.png')" alt="" />
              大交通总价
            </div>
          </th>
          <template v-for="item in tableData">
            <td class="repastPrice h_40">
              <strong class="hot">
                {{ item.firstQuotedPrice ? '¥' + positiveFloat(item.firstQuotedPrice.transportation) : '' }}
                <span class=""></span>
              </strong>
              <!-- <div v-if="(type === 'hotel' && command === '1') || (type === 'service' && command === '1')">
								{{ item.firstQuotedPrice && item.firstQuotedPrice.transportationname ? item.firstQuotedPrice.transportationname : '' }}
							</div> -->
            </td>
            <td class="repastPrice h_40" v-show="item.lastQuotedPrice">
              <strong class="hot">
                {{ item.firstQuotedPrice && item.lastQuotedPrice ? '¥' + positiveFloat(item.lastQuotedPrice.transportation) : '' }}
                <span class=""></span>
              </strong>
              <!-- <div v-if="(type === 'hotel' && command === '1') || (type === 'service' && command === '1')">
								{{ item.lastQuotedPrice && item.lastQuotedPrice.transportationname ? item.lastQuotedPrice.transportationname : '' }}
							</div> -->
            </td>
          </template>
        </tr>
        <tbody v-show="unflod_transport" v-for="(item, index) in tableData[0] ? tableData[0].transportation : []">
          <tr class="room-tr">
            <th class="repastPrice roomPrice-th th-width" ref="BorderHeight_transportationprice">{{ item.datatime ? item.datatime : '' }} 交通价格</th>
            <template v-for="i in tableData">
              <td class="repastPrice price-td">
                {{
									i.transportation[index].passengercount && i.transportation[index].first
										? '¥' + positiveFloat(i.transportation[index].passengercount * i.transportation[index].first.unitprice).toFixed(2)
										: ''
								}}
                <span class=""></span>
              </td>
              <td class="repastPrice price-td" v-if="i.lastQuotedPrice">
                {{
									i.transportation[index].passengercount && i.transportation[index].last
										? '¥' + positiveFloat(i.transportation[index].passengercount * i.transportation[index].last.unitprice).toFixed(2)
										: ''
								}}
                <span class=""></span>
              </td>
            </template>
          </tr>
          <tr>
            <th class="repastPrice repastPrice-th th-width" ref="BorderHeight_transportationinfo">
              <div class="column">
                <span>{{ item.datatime ? item.datatime : '' }}</span>
                <span>
                  {{ item.origincity ? item.origincity : '' }} - {{ item.destinationcity ? item.destinationcity : '' }} {{ item.transtype ? item.transtype : '' }}
                  {{ item.seatclasses ? item.seatclasses : '' }} {{ item.specialprice ? item.specialprice : '' }}
                </span>
                <span>{{ item.passengercount ? item.passengercount : '' }}人</span>
                <span>抵达时间：{{item.arrivetime}}</span>
                <span>备注:{{ item.requirement ? item.requirement : '' }}</span>
              </div>
            </th>
            <template v-for="i in tableData">
              <td class="repastPrice">
                <ul class="price_sub_list">
                  <li v-if="i.transportation[index].first">
                    <p>
                      {{ i.transportation[index] ? i.transportation[index].origincity : '' }} -
                      {{ i.transportation[index] ? i.transportation[index].destinationcity : '' }} ¥
                      {{
												i.transportation[index] && i.transportation[index].first ? positiveFloat(i.transportation[index].first.unitprice) : ''
											}}
                      * {{ i.transportation[index].passengercount }}人
                      <strong class="ml_10 text-align-right">
                        <span>¥</span>
                        {{
													positiveFloat(
														(i.transportation[index] && i.transportation[index].first? i.transportation[index].first.unitprice : '') *
														(i.transportation[index] ? i.transportation[index].passengercount : '')
													).toFixed(2)
												}}
                        <br />
                      </strong>
                    </p>
                    <p class="f_gray">
                      <strong style="font-weight: normal;">报价备注：{{ (i.transportation[index] && i.transportation[index].first) ? i.transportation[index].first.offerremarks : '' }}</strong>
                    </p>
                  </li>
                  <li></li>
                </ul>
              </td>
              <td class="repastPrice" v-if="i.lastQuotedPrice">
                <ul class="price_sub_list">
                  <li v-if="i.transportation[index].last">
                    <p>
                      {{ i.transportation[index] ? i.transportation[index].origincity : '' }} -
                      {{ i.transportation[index] ? i.transportation[index].destinationcity : '' }} ¥{{
												i.transportation[index] && i.transportation[index].last ? positiveFloat(i.transportation[index].last.unitprice) : ''
											}}
                      * {{ i.transportation[index] ? i.transportation[index].passengercount : '' }}人
                      <strong class="ml_10 text-align-right">
                        <span>¥</span>
                        {{
													positiveFloat(
														(i.transportation[index] && i.transportation[index].last ? i.transportation[index].last.unitprice : '') *
														(i.transportation[index] ? i.transportation[index].passengercount : '')
													).toFixed(2)
												}}
                        <br />
                      </strong>
                    </p>
                    <p class="f_gray">
                      <strong style="font-weight: normal;">报价备注：{{ (i.transportation[index] && i.transportation[index].last)? i.transportation[index].last.offerremarks : '' }}</strong>
                    </p>
                  </li>
                  <li></li>
                </ul>
              </td>
            </template>
          </tr>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].transportation && tableData[0].transportation.length > 0" class="room-tr">
          <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_transportationtotalremark">大交通报价总备注</th>
          <template v-for="item in tableData">
            <td class="repastPrice price-td">{{ item.firstQuotedPrice ? item.firstQuotedPrice.transportation_remarks : '' }}</td>
            <td class="repastPrice price-td" v-show="item.lastQuotedPrice">{{ item.lastQuotedPrice ? item.lastQuotedPrice.transportation_remarks : '' }}</td>
          </template>
        </tr>

        <!-- 地面交通 -->
        <tr v-if="tableData[0] && tableData[0].car && tableData[0].car.length > 0">
          <th class="repastPrice repastPrice-img th-width h_40" ref="BorderHeight_cartotalprice">
            <div class="repastPrice-div" @click="unflod_car = !unflod_car">
              <img class="img-top" v-show="!unflod_car" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod_car" :src="require('@/assets/images/close_1.png')" alt="" />
              地面交通总价
            </div>
          </th>
          <template v-for="item in tableData">
            <td class="repastPrice h_40">
              <strong class="hot">
                {{ item.firstQuotedPrice ? '¥' + positiveFloat(item.firstQuotedPrice.car) : '' }}
                <span class=""></span>
              </strong>
              <!-- <div v-if="(type === 'hotel' && command === '1') || (type === 'service' && command === '1')">{{ item.firstQuotedPrice && item.firstQuotedPrice.carname ? item.firstQuotedPrice.carname : '' }}</div> -->
            </td>
            <td class="repastPrice h_40" v-show="item.lastQuotedPrice">
              <strong class="hot">
                {{ item.lastQuotedPrice ? '¥' + positiveFloat(item.lastQuotedPrice.car) : '' }}
                <span class=""></span>
              </strong>
              <!-- <div v-if="(type === 'hotel' && command === '1') || (type === 'service' && command === '1')">{{ item.lastQuotedPrice && item.lastQuotedPrice.carname ? item.lastQuotedPrice.carname : '' }}</div> -->
            </td>
          </template>
        </tr>
        <tbody v-show="unflod_car" v-for="(item, index) in tableData[0] ? tableData[0].car : []">
          <tr class="room-tr">
            <th class="repastPrice roomPrice-th th-width" ref="BorderHeight_carprice">{{ item.datatime ? item.datatime : '' }} 用车价格</th>
            <template v-for="i in tableData">
              <td class="repastPrice price-td">
                {{ i.car[index].carcount && i.car[index].first ? '¥' + (i.car[index].carcount * i.car[index].first.price).toFixed(2) : '' }}
                <span class=""></span>
              </td>
              <td class="repastPrice price-td" v-if="i.lastQuotedPrice">
                {{ i.car[index].carcount && i.car[index].last ? '¥' + (i.car[index].carcount * i.car[index].last.price).toFixed(2) : '' }}
                <span class=""></span>
              </td>
            </template>
          </tr>
          <tr>
            <th class="repastPrice repastPrice-th th-width" ref="BorderHeight_carinfo">
              <div class="column">
                <span>{{ item.datatime ? item.datatime : '' }}</span>
                <span>用车目的:{{ item.purpose ? item.purpose : '' }}</span>
                <span>
                  {{ item.vehicletype ? item.vehicletype : '' }} {{ item.carcount }}辆 搭乘{{ item.vehiclecount }}人
                </span>
                <span>用车城市:{{item.city}}</span>
                <span>备注:{{item.explain}}</span>
              </div>
            </th>
            <template v-for="i in tableData">
              <td class="repastPrice">
                <ul class="price_sub_list">
                  <li v-if="i.car[index].first">
                    <p>
                      ¥{{ i.car[index] && i.car[index].first ? positiveFloat(i.car[index].first.price) : '' }} * {{ i.car[index] ? i.car[index].carcount : '' }}车
                      <strong class="ml_10 text-align-right">
                        <span>¥</span>
                        {{ positiveFloat((i.car[index] && i.car[index].first ? i.car[index].first.price : 0) * (i.car[index] ? i.car[index].carcount : 0)).toFixed(2) }}
                        <br />
                      </strong>
                    </p>
                    <p class="f_gray">
                      <strong style="font-weight: normal;">报价备注：{{ i.car[index] && i.car[index].first ? i.car[index].first.offer_remarks : '' }}</strong>
                    </p>
                  </li>
                  <li></li>
                </ul>
              </td>
              <td class="repastPrice" v-if="i.lastQuotedPrice">
                <ul class="price_sub_list">
                  <li v-if="i.car[index].last">
                    <p>
                      ¥{{ i.car[index] && i.car[index].last ? positiveFloat(i.car[index].last.price) : '' }} * {{ i.car[index] ? i.car[index].carcount : '' }}车
                      <strong class="ml_10 text-align-right">
                        <span>¥</span>
                        {{ positiveFloat((i.car[index] && i.car[index].last ? i.car[index].last.price : 0) * (i.car[index] ? i.car[index].carcount : 0)).toFixed(2) }}
                        <br />
                      </strong>
                    </p>
                    <p class="f_gray">
                      <strong style="font-weight: normal;">报价备注：{{ i.car[index] && i.car[index].last ? i.car[index].last.offer_remarks : '' }}</strong>
                    </p>
                  </li>
                  <li></li>
                </ul>
              </td>
            </template>
          </tr>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].car && tableData[0].car.length > 0" class="room-tr">
          <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_carremark">地面交通报价总备注</th>
          <template v-for="item in tableData">
            <td class="repastPrice price-td">{{ item.firstQuotedPrice ? item.firstQuotedPrice.car_remarks : '' }}</td>
            <td class="repastPrice price-td" v-show="item.lastQuotedPrice">{{ item.lastQuotedPrice ? item.lastQuotedPrice.car_remarks : '' }}</td>
          </template>
        </tr>

        <!-- 其他服务 -->
        <tr v-if="tableData[0] && tableData[0].other && tableData[0].other.length > 0">
          <th class="repastPrice repastPrice-img th-width h_40" ref="BorderHeight_othertotalprice">
            <div class="repastPrice-div" @click="unflod_other = !unflod_other">
              <img class="img-top" v-show="!unflod_other" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod_other" :src="require('@/assets/images/close_1.png')" alt="" />
              其他服务总价
            </div>
          </th>
          <template v-for="item in tableData">
            <td class="repastPrice h_40">
              <strong class="hot">
                {{ item.firstQuotedPrice ? '¥' + positiveFloat(item.firstQuotedPrice.other) : '' }}
                <span class=""></span>
              </strong>
              <!-- <div v-if="(type === 'hotel' && command === '1') || (type === 'service' && command === '1')">
								{{ item.firstQuotedPrice && item.firstQuotedPrice.othername ? item.firstQuotedPrice.othername : '' }}
							</div> -->
            </td>
            <td class="repastPrice h_40" v-show="item.lastQuotedPrice">
              <strong class="hot">
                {{ item.lastQuotedPrice ? '¥' + positiveFloat(item.lastQuotedPrice.other) : '' }}
                <span class=""></span>
              </strong>
              <!-- <div v-if="(type === 'hotel' && command === '1') || (type === 'service' && command === '1')">{{ item.lastQuotedPrice && item.lastQuotedPrice.othername ? item.lastQuotedPrice.othername : '' }}</div> -->
            </td>
          </template>
        </tr>
        <tbody v-show="unflod_other" v-for="(item, index) in tableData[0] ? tableData[0].other : []">
          <tr>
            <th class="repastPrice repastPrice-th th-width" ref="BorderHeight_otherinfo">
              <div class="column">
                <!-- <span>{{ item.name }}人员 {{ item.participatecount }}人 {{ item.servicedaycount }}天</span> -->
                <span>{{ item.name }} 数量{{ item.participatecount }}</span>
                <span>备注：{{ item.describe }}</span>
              </div>
            </th>
            <template v-for="i in tableData">
              <td class="repastPrice">
                <ul class="price_sub_list">
                  <div v-if="i.other[index].first">
                    <li v-for="(firstItem,firstIndex) in i.other[index].first" :key="firstIndex">
                      <div>
                        <p>
                          <!-- ¥{{ i.other[index] ? i.other[index].first.price.toFixed(2) : '' }} * {{ i.other[index] ? i.other[index].first.people_count : '' }}人 *
													{{ i.other[index] ? i.other[index].first.day_count : '' }}天 -->
                          ¥{{ positiveFloat(firstItem.price) }} * {{ firstItem.people_count }}
                          <strong class="ml_10 text-align-right">
                            <span>¥</span>
                            {{
															positiveFloat(
																(firstItem.price ) *
																(firstItem.day_count) *
																(firstItem.people_count )
															).toFixed(2)
														}}
                            <br />
                          </strong>
                        </p>
                        <p class="f_gray">
                          <strong style="font-weight: normal;">需求备注：{{ firstItem.offer_remarks }}</strong>
                        </p>
                      </div>
                    </li>
                  </div>
                  <li></li>
                </ul>
              </td>
              <td class="repastPrice" v-if="i.lastQuotedPrice">
                <ul class="price_sub_list">
                  <div v-if="i.other[index].last">
                    <li v-for="(lastItem,lastIndex) in i.other[index].last" :key="lastIndex">
                      <p>
                        <!-- ¥{{ i.other[index] ? i.other[index].last.price.toFixed(2) : '' }} * {{ i.other[index] ? i.other[index].last.people_count : '' }}人 *
												{{ i.other[index] ? i.other[index].last.day_count : '' }}天 -->
                        ¥{{ positiveFloat(lastItem.price) }} * {{ lastItem.people_count  }}
                        <strong class="ml_10 text-align-right">
                          <span>¥</span>
                          {{
														positiveFloat(
															(lastItem.price) *
															(lastItem.day_count ) *
															(lastItem.people_count )
														).toFixed(2)
													}}
                          <br />
                        </strong>
                      </p>
                      <p class="f_gray">
                        <strong style="font-weight: normal;">需求备注：{{ lastItem.offer_remarks }}</strong>
                      </p>
                    </li>
                  </div>
                  <li></li>
                </ul>
              </td>
            </template>
          </tr>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].other && tableData[0].other.length > 0" class="room-tr">
          <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_otherremark">其它报价总备注</th>
          <template v-for="item in tableData">
            <td class="repastPrice price-td">{{ item.firstQuotedPrice ? item.firstQuotedPrice.other_remarks : '' }}</td>
            <td class="repastPrice price-td" v-show="item.lastQuotedPrice">{{ item.lastQuotedPrice ? item.lastQuotedPrice.other_remarks : '' }}</td>
          </template>
        </tr>
        <tr style="height:100px">
          <th class="tender-c repastPrice-th th-width" ref="BorderHeight_remark">{{ hotelOrSupplier ? '酒店报价说明（付款条件等）' : '服务商报价报价说明' }}</th>
          <template v-for="item in tableData">
            <td class="tender-c" style="white-space: wrap">{{ item.firstQuotedPrice ? item.firstQuotedPrice.offer_remarks : '' }}</td>
            <td class="tender-c" v-show="item.lastQuotedPrice" style="white-space: wrap">{{ item.lastQuotedPrice ? item.lastQuotedPrice.offer_remarks : '' }}</td>
          </template>
        </tr>
        <!-- <tr>
					<th class="indate repastPrice-th th-width">有效期</th>
					<template v-for="item in tableData">
						<td class="indate"></td>
					</template>

				</tr> -->

        <!--线下报价详情 开始 -->
        <template v-if="command == '2'">
          <!--会场-->
          <tr v-if="offlineData.conference && offlineData.conference.length > 0">
            <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlineconferencetotalprice">
              <div class="repastPrice-div" @click="eventOut = !eventOut">
                <img class="img-top" v-show="!eventOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                <img class="img-bottom" v-show="eventOut" :src="require('@/assets/images/close_1.png')" alt="" />
                会场总价
              </div>
            </th>
            <template>
              <td class="repastPrice">
                <strong class="hot">
                  ￥{{ offlineData ? positiveFloat(offlineData.totalPrice.conference) : '' }}
                  <span class=""></span>
                </strong>
              </td>
            </template>
          </tr>
          <tbody v-show="eventOut" v-for="item in offlineData.conference">
            <tr>
              <th class="repastPrice th-width" ref="BorderHeight_offlineconferencedate">{{ item.time }} 会场价格</th>
              <template>
                <td class="repastPrice">￥{{ positiveFloat(item.dayPrice) }}</td>
              </template>
            </tr>
            <tr v-for="eventItem in item.data">
              <td class="repastPrice th-width" ref="BorderHeight_offlineconferenceinfo">
                <div class="column">
                  <span>{{ eventItem.name }}</span>
                  <span>时间：{{ eventItem.starttime }}-{{ eventItem.endtime }}</span>
                  <span>台型：{{ eventItem.roomsetuptype }}</span>
                  <span>人数：{{ eventItem.attendees }}</span>
                </div>
              </td>
              <template>
                <td class="repastPrice">￥{{ positiveFloat(eventItem.price) }}</td>
              </template>
            </tr>
          </tbody>
          <tr v-if="offlineData.conference && offlineData.conference.length > 0" class="room-tr">
            <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlineconferenceremark">会场报价总备注说明</th>
            <td colspan="2" class="repastPrice">{{ offlineData.remarks ? offlineData.remarks.conference_remarks : '' }}</td>
          </tr>

          <!--客房-->
          <tr v-if="offlineData.room && offlineData.room.length > 0">
            <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlineroomtotalprice">
              <div class="repastPrice-div" @click="roomOut = !roomOut">
                <img class="img-top" v-show="!roomOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                <img class="img-bottom" v-show="roomOut" :src="require('@/assets/images/close_1.png')" alt="" />
                客房总价
              </div>
            </th>
            <template>
              <td class="repastPrice">
                <strong class="hot">
                  ￥{{ offlineData ? positiveFloat(offlineData.totalPrice.room) : '' }}
                  <span class=""></span>
                </strong>
              </td>
            </template>
          </tr>
          <tbody v-show="roomOut" v-for="item in offlineData.room">
            <tr>
              <th class="repastPrice th-width" ref="BorderHeight_offlineroomdate">{{ item.time }} 客房价格</th>
              <template>
                <td class="repastPrice" v-html="'￥' + getDateTotalPrice(item.data, 1)"></td>
              </template>
            </tr>
            <tr>
              <td class="repastPrice th-width" ref="BorderHeight_offlineroominfo">
                <div class="column">
                  <span>预算：{{ item.room_budget }}</span>
                  <span>{{ item.networks }}</span>
                  <span>{{ item.breakfast }}</span>
                  <span>{{ item.roomtype }}</span>
                  <span>入住时间：{{ item.check_in_date?item.check_in_date:'' }}</span>
                  <span>离店时间：{{ item.out_date?item.out_date:'' }}</span>
                  <span>需求备注：{{ item.other_requirements?item.other_requirements:'' }}</span>
                </div>
              </td>
              <template>
                <td class="repastPrice">
                  <p v-for="roomItem in item.data">
                    <span class="width_200 dis_block">{{ roomItem.roomtype }}：￥{{ positiveFloat(roomItem.price) }}*{{ roomItem.count }}</span>
                    <span class="mar_l20">报价备注：{{ roomItem.remarks }}</span>
                  </p>
                </td>
              </template>
            </tr>
          </tbody>
          <tr v-if="offlineData.room && offlineData.room.length > 0" class="room-tr">
            <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlineroomremark">客房报价总备注说明</th>
            <td colspan="2" class="repastPrice">{{ offlineData.remarks ? offlineData.remarks.room_remarks : '' }}</td>
          </tr>

          <!--酒店餐饮总价-->
          <tr v-if="offlineData.food && offlineData.food.length > 0">
            <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlinefoodtotalprice">
              <div class="repastPrice-div" @click="hotelOut = !hotelOut">
                <img class="img-top" v-show="!hotelOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                <img class="img-bottom" v-show="hotelOut" :src="require('@/assets/images/close_1.png')" alt="" />
                酒店餐饮总价
              </div>
            </th>
            <template>
              <td class="repastPrice">
                <strong class="hot">
                  ￥{{ offlineData && offlineData.totalPrice? positiveFloat(offlineData.totalPrice.food) : '' }}
                  <span class=""></span>
                </strong>
              </td>
            </template>
          </tr>
          <tbody v-show="hotelOut" v-for="item in offlineData.food">
            <tr>
              <th class="repastPrice th-width" ref="BorderHeight_offlinefooddate">{{ item.time }} 酒店餐饮价格</th>
              <template>
                <td class="repastPrice" v-html="'￥' + getDateTotalPrice(item.data, 2)"></td>
              </template>
            </tr>
            <tr>
              <th class="repastPrice repastPrice-th th-width" ref="BorderHeight_offlinefoodinfo">
                <div class="column">
                  <span>{{ item.time }}</span>
                  <span>{{ item.foodname }}</span>
                  <span>餐标：{{ item.food_limit }}</span>
                  <span>备注：{{ item.comments }}</span>
                </div>
              </th>
              <template>
                <td class="repastPrice">
                  <p v-for="foodItem in item.data">
                    <span class="width_200 dis_block">{{ foodItem.foodname }} {{ foodItem.personcount }}* {{ positiveFloat(foodItem.price) }}</span>
                    <span class="mar_l20">报价备注：{{ foodItem.offer_remarks }}</span>
                  </p>
                </td>
              </template>
            </tr>
          </tbody>
          <tr v-if="offlineData.food && offlineData.food.length > 0" class="room-tr">
            <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlinefoodremark">酒店餐饮报价总备注说明</th>
            <td colspan="2" class="repastPrice">{{ offlineData.remarks ? offlineData.remarks.food_remarks : '' }}</td>
          </tr>

          <!--    酒店外餐饮总价-->
          <tr v-if="offlineData.foodOutside && offlineData.foodOutside.length > 0">
            <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlinefoodouttotalprice">
              <div class="repastPrice-div" @click="foodOut = !foodOut">
                <img class="img-top" v-show="!foodOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                <img class="img-bottom" v-show="foodOut" :src="require('@/assets/images/close_1.png')" alt="" />
                酒店外餐饮总价
              </div>
            </th>
            <template>
              <td class="repastPrice" colspan="2">
                <strong class="hot">
                  ￥{{ offlineData ? positiveFloat(offlineData.totalPrice.foodOutsi) : '' }}
                  <span class=""></span>
                </strong>
              </td>
            </template>
          </tr>
          <tbody v-show="foodOut" v-for="item in offlineData.foodOutside">
            <tr>
              <th class="repastPrice th-width" ref="BorderHeight_offlinefoodoutdate">{{ item.time }} 酒店外餐饮价格</th>
              <template>
                <td colspan="2" class="repastPrice" v-html="'￥' + getDateTotalPrice(item.data, 2)"></td>
              </template>
            </tr>
            <tr>
              <td class="repastPrice repastPrice-th th-width" ref="BorderHeight_offlinefoodoutinfo">
                <div class="column">
                  <span>{{ item.time }}</span>
                  <span>{{ item.foodname }}</span>
                  <span>餐标：{{ item.food_limit }}</span>
                  <span>备注：{{ item.comments }}</span>
                </div>
              </td>
              <template>
                <td colspan="2" class="repastPrice">
                  <p v-for="foodItem in item.data">
                    <span class="width_200 dis_block">{{ foodItem.foodname }} {{ foodItem.personcount }}* {{ positiveFloat(foodItem.price) }}</span>
                    <span class="mar_l20">报价备注：{{ foodItem.offer_remarks }}</span>
                  </p>
                </td>
              </template>
            </tr>
          </tbody>
          <tr v-if="offlineData.foodOutside && offlineData.foodOutside.length > 0" class="room-tr">
            <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlinefoodoutremark">酒店外餐饮报价总备注说明</th>
            <td colspan="2" class="repastPrice">{{ offlineData.remarks ? offlineData.remarks.food_qutside_remarks : '' }}</td>
          </tr>

          <!--    大交通-->
          <tr v-if="offlineData.transportation && offlineData.transportation.length > 0">
            <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlinetransportationtotalprice">
              <div class="repastPrice-div" @click="trafficOut = !trafficOut">
                <img class="img-top" v-show="!trafficOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                <img class="img-bottom" v-show="trafficOut" :src="require('@/assets/images/close_1.png')" alt="" />
                大交通总价
              </div>
            </th>
            <template>
              <td colspan="2" class="repastPrice">
                <strong class="hot">
                  ￥{{ offlineData ? positiveFloat(offlineData.totalPrice.transportation) : '' }}
                  <span class=""></span>
                </strong>
              </td>
            </template>
          </tr>
          <tbody v-show="trafficOut" v-for="item in offlineData.transportation">
            <tr>
              <th class="repastPrice th-width" ref="BorderHeight_offlinetransportationdate">{{ item.time }} 大交通价格</th>
              <template>
                <td colspan="2" class="repastPrice" v-html="'￥' + getDateTotalPrice(offlineData.transportation, 1)"></td>
              </template>
            </tr>
            <tr>
              <td class="repastPrice th-width" ref="BorderHeight_offlinetransportationinfo">
                <div class="column">
                  <span>{{ item.transtype }}：{{ item.origincity }}-{{ item.destinationcity }}</span>
                  <span>人数：{{ item.count }}</span>
                  <span>抵达时间：{{item.arrivetime}}</span>
                  <span>{{ item.seatclasses }} {{ item.specialprice }}</span>
                  <span>{{ item.requirement }}</span>
                </div>
              </td>
              <template>
                <td colspan="2" class="repastPrice">
                  <div class="column">
                    <span>￥{{ positiveFloat(item.price) }} * {{ item.count }}</span>
                    <span>报价备注：{{ item.offerremarks }}</span>
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
          <tr v-if="offlineData.transportation && offlineData.transportation.length > 0" class="room-tr">
            <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlinetransportationremark">大交通报价总备注说明</th>
            <td colspan="2" class="repastPrice">{{ offlineData.remarks ? offlineData.remarks.transportation_remarks : '' }}</td>
          </tr>

          <!--    地面交通总价-->
          <tr v-if="offlineData.car && offlineData.car.length > 0">
            <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlinecartotalprice">
              <div class="repastPrice-div" @click="urbanOut = !urbanOut">
                <img class="img-top" v-show="!urbanOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                <img class="img-bottom" v-show="urbanOut" :src="require('@/assets/images/close_1.png')" alt="" />
                地面交通总价
              </div>
            </th>
            <template>
              <td colspan="2" class="repastPrice">
                <strong class="hot">
                  ￥{{ offlineData ? positiveFloat(offlineData.totalPrice.car) : '' }}
                  <span class=""></span>
                </strong>
              </td>
            </template>
          </tr>
          <tbody v-show="urbanOut" v-for="item in offlineData.car">
            <tr>
              <th class="repastPrice th-width" ref="BorderHeight_offlinecardate">{{ item.time }} 用车价格</th>
              <template>
                <td colspan="2" class="repastPrice" v-html="'￥' + getDateTotalPrice(offlineData.car, 3)"></td>
              </template>
            </tr>
            <tr>
              <td class="repastPrice th-width" ref="BorderHeight_offlinecarinfo">
                <div class="column">
                  <span>用车目的：{{ item.purpose }}</span>
                  <span>车型：{{ item.vehicletype }}</span>
                  <span>用车城市:{{item.city}}</span>
                  <span>用车数量：{{ item.carcount }}</span>
                  <span>搭乘人数：{{ item.vehiclecount }}</span>
                  <span>备注:{{item.explain}}</span>
                </div>
              </td>
              <template>
                <td class="repastPrice">
                  <div class="column">
                    <span>￥{{ positiveFloat(item.price) }} * {{ item.carcount }}</span>
                    <span>报价备注：{{ item.offer_remarks }}</span>
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
          <tr v-if="offlineData.car && offlineData.car.length > 0" class="room-tr">
            <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlinecarremark">地面交通报价总备注说明</th>
            <td colspan="2" class="repastPrice">{{ offlineData.remarks ? offlineData.remarks.car_remarks : '' }}</td>
          </tr>

          <!--    其他服务总价-->
          <tr v-if="offlineData.other && offlineData.other.length > 0">
            <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlineothertotalprice">
              <div class="repastPrice-div" @click="otherOut = !otherOut">
                <img class="img-top" v-show="!otherOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                <img class="img-bottom" v-show="otherOut" :src="require('@/assets/images/close_1.png')" alt="" />
                其他服务总价
              </div>
            </th>
            <template>
              <td colspan="2" class="repastPrice">
                <strong class="hot">
                  ￥{{ offlineData ? offlineData.totalPrice.other.toFixed(2) : '' }}
                  <span class=""></span>
                </strong>
              </td>
            </template>
          </tr>
          <tbody v-show="otherOut" v-for="item in offlineData.other">
            <tr>
              <td class="repastPrice th-width" ref="BorderHeight_offlineotherinfo">
                <div class="column">
                  <span>{{ item.name }}</span>
                  <span>数量：{{ item.count }}</span>
                  <span>需求备注：{{ item.offer_remarks }}</span>
                </div>
              </td>
              <template>
                <td colspan="2" class="repastPrice">￥{{ positiveFloat(item.price) }} * {{ item.count }}</td>
              </template>
            </tr>
          </tbody>
          <tr v-if="offlineData.other && offlineData.other.length > 0" class="room-tr">
            <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlineotherremark">其他服务报价总备注说明</th>
            <td colspan="2" class="repastPrice">{{ offlineData.remarks ? offlineData.remarks.other_remarks : '' }}</td>
          </tr>
        </template>
        <!--线下报价详情 结束-->

        <!--税费服务费模块-->
        <template v-if="(type === 'hotel' && command == '2') || type === 'service'">
          <tr v-if="tableData[0] && tableData[0].firstQuotedPrice.serviceData && tableData[0].firstQuotedPrice.serviceData.length > 0">
            <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_serviceprice">
              <div class="repastPrice-div" @click="unflod_service = !unflod_service">
                <img class="img-top" v-show="!unflod_service" :src="require('@/assets/images/tri-open.png')" alt="" />
                <img class="img-bottom" v-show="unflod_service" :src="require('@/assets/images/close_1.png')" alt="" />
                服务费
              </div>
            </th>
            <template v-for="item in tableData">
              <td class="repastPrice">
                <strong class="hot">
                  {{ item.firstQuotedPrice &&  item.firstQuotedPrice.serviceCharge? '¥' + positiveFloat(item.firstQuotedPrice.serviceCharge) : '' }}
                  <span class=""></span>
                </strong>
              </td>
              <td class="repastPrice" v-if="item.lastQuotedPrice">
                <strong class="hot">
                  {{ item.lastQuotedPrice && item.lastQuotedPrice.serviceCharge? '¥' + positiveFloat(item.lastQuotedPrice.serviceCharge) : '' }}
                  <span class=""></span>
                </strong>
              </td>
            </template>
          </tr>
          <tbody v-show="unflod_service">
            <tr v-if="tableData[0] && tableData[0].firstQuotedPrice.serviceData && tableData[0].firstQuotedPrice.serviceData.length > 0">
              <th class="repastPrice th-width" ref="BorderHeight_serviceinfo">
                <template v-for="(item,idx) in tableData">
                  <p v-for="serviceItem in item.firstQuotedPrice.serviceData">
                    <span v-if="idx === 0">{{ serviceItem.name }}</span>
                  </p>
                </template>
              </th>
              <template v-for="i in tableData">
                <td class="repastPrice">
                  <div class="column">
                    <span v-for="item in i.firstQuotedPrice.serviceData">{{ item.value }}</span>
                  </div>
                </td>
                <td class="repastPrice" v-if="i.lastQuotedPrice">
                  <div class="column">
                    <span v-for="item in i.lastQuotedPrice.serviceData">{{ item.value }}</span>
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
          <tr v-if="tableData[0] && tableData[0].firstQuotedPrice.taxationData && tableData[0].firstQuotedPrice.taxationData.length > 0">
            <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_taxationprice">
              <div class="repastPrice-div" @click="unflod_tax = !unflod_tax">
                <img class="img-top" v-show="!unflod_tax" :src="require('@/assets/images/tri-open.png')" alt="" />
                <img class="img-bottom" v-show="unflod_tax" :src="require('@/assets/images/close_1.png')" alt="" />
                税费
              </div>
            </th>
            <template v-for="item in tableData">
              <td class="repastPrice">
                <strong class="hot">
                  {{ item.firstQuotedPrice ? '¥' + positiveFloat(item.firstQuotedPrice.taxation) : '' }}
                  <span class=""></span>
                </strong>
              </td>
              <td class="repastPrice" v-if="item.lastQuotedPrice">
                <strong class="hot">
                  {{ item.lastQuotedPrice ? '¥' + positiveFloat(item.lastQuotedPrice.taxation) : '' }}
                  <span class=""></span>
                </strong>
              </td>
            </template>
          </tr>
          <tbody v-show="unflod_tax">
            <tr v-if="tableData[0] && tableData[0].firstQuotedPrice.taxationData && tableData[0].firstQuotedPrice.taxationData.length > 0">
              <th class="repastPrice th-width" ref="BorderHeight_taxationinfo">
                <div class="column">
                  <template v-for="(item,idx) in tableData">
                    <p v-for="taxItem in item.firstQuotedPrice.taxationData">
                      <span v-if="idx === 0">{{ taxItem.name }}</span>
                    </p>
                  </template>
                </div>
              </th>
              <template v-for="i in tableData">
                <td class="repastPrice">
                  <div class="column" v-if="i.firstQuotedPrice">
                    <span v-for="taxItem in i.firstQuotedPrice.taxationData">{{ taxItem.value }}</span>
                  </div>
                </td>
                <td class="repastPrice" v-if="i.lastQuotedPrice">
                  <div class="column" v-if="i.lastQuotedPrice">
                    <span v-for="taxItem in i.lastQuotedPrice.taxationData">{{ taxItem.value }}</span>
                  </div>
                </td>
              </template>
            </tr>
          </tbody>
        </template>

        <tr class="room-tr">
          <th class="operate repastPrice-th-price th-width" ref="BorderHeight_handle">操作</th>
          <template v-for="item in tableData">
            <td class="operate"></td>
            <td class="operate" v-if="item.lastQuotedPrice"></td>
          </template>
        </tr>
        <tr>
          <!-- <th class="operatePage repastPrice-th th-width" ref="BorderHeight_topage">去报价页操作：邀请重新报价/确认中标/谢绝报价</th> -->
          <th class="operatePage repastPrice-th th-width" ref="BorderHeight_topage"></th>
          <template v-for="item in tableData">
            <td class="operatePage">
              <a @click="
									goPage('/offer', {
										id: $route.query.id,
										foreign_key_id: item.firstQuotedPrice.quotedPriceID,
										type: hotelOrSupplier ? 2 : 1,
										serviceId: item.firstQuotedPrice.sheetObjectID,
										inquiryListId: $route.query.InquirySheetID
									})
								" class="go_offer_link">
                去报价页
              </a>
            </td>
            <td class="operatePage" v-if="item.lastQuotedPrice">
              <a @click="
									goPage('/offer', {
										id: $route.query.id,
										foreign_key_id: item.lastQuotedPrice.quotedPriceID,
										type: hotelOrSupplier ? 2 : 1,
										serviceId: item.lastQuotedPrice.sheetObjectID,
										inquiryListId: $route.query.InquirySheetID
									})
								" class="go_offer_link">
                去报价页
              </a>
            </td>
          </template>
        </tr>
      </table>
    </div>

    <!-- 左侧对比项标题 -->
    <div ref="div_left_top" class="left-div">
      <table class="table-left">
        <tr class="floatTr">
          <th class="th-name" ref="BorderHeight_hotel_left">{{ hotelOrSupplier ? '酒店名称' : '会议服务商名称' }}</th>
        </tr>
        <tr v-if="hotelOrSupplier">
          <th class="star th-width" ref="BorderHeight_site_left">{{ hotelOrSupplier ? '酒店场地类型' : '' }}</th>
        </tr>
        <tr>
          <th class="address th-width" ref="BorderHeight_address_left">{{ hotelOrSupplier ? '酒店地址' : '会议服务商地址' }}</th>
        </tr>
        <tr>
          <th class="contactName th-width" ref="BorderHeight_name_left">{{ hotelOrSupplier ? '酒店联系人 - 姓名' : '会议服务商联系人' }}</th>
        </tr>
        <tr v-if="hotelOrSupplier">
          <th class="contactPhone th-width" ref="BorderHeight_phone_left">酒店联系人 - 电话</th>
        </tr>
        <tr v-if="hotelOrSupplier">
          <th class="contactEMail th-width" ref="BorderHeight_email_left">酒店联系人 - 邮箱</th>
        </tr>
        <tr>
          <th class="contactPhone th-width" ref="BorderHeight_offerer_left">{{ hotelOrSupplier ? '酒店报价人' : '会议服务商报价人' }}</th>
        </tr>
        <tr v-if="hotelOrSupplier">
          <th class="link link-detail th-width" ref="BorderHeight_site_left">详情链接</th>
        </tr>
        <tr v-if="command === '1'">
          <th class="need need-head th-width" ref="BorderHeight_need_left">需求</th>
        </tr>
        <tr v-if="hotelOrSupplier == false">
          <th class="purchase purchase-head th-width" ref="BorderHeight_buy_left">采购酒店</th>
        </tr>
        <!--报价总额-->
        <template v-if="command === '2'">
          <tr style="height: 200px">
            <th class="roomPrice roomPrice-img th-width" ref="BorderHeight_totalprice_left">报价总额</th>
          </tr>
        </template>

        <!-- 左侧客房 -->
        <tr v-if="tableData[0] && tableData[0].room && tableData[0].room.length > 0">
          <th class="roomPrice roomPrice-img th-width h_40" ref="BorderHeight_room_left">
            <div @click="unflod = !unflod">
              <img class="img-top" v-show="!unflod" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod" :src="require('@/assets/images/close_1.png')" alt="" />
              客房总价
            </div>
          </th>
        </tr>
        <tbody v-show="unflod" v-for="item in tableData[0] ? tableData[0].room : []">
          <tr class="room-tr">
            <th class="roomPrice roomPrice-th th-width" ref="BorderHeight_roomprice_left">{{ item.time ? item.time : '' }} 客房价格</th>
          </tr>
          <tr>
            <th class="roomPrice budget-price th-width" ref="BorderHeight_roominfo_left">
              <div class="column">
                <span>{{ item.room_budget ? item.room_budget : '' }}</span>
                <span>{{ item.networks ? item.networks : '' }}</span>
                <span>{{ item.breakfast ? item.breakfast : '' }}</span>
                <span>{{ item.roomtype ? item.roomtype : '' }}</span>
                <span>入住时间：{{ item.check_in_date?item.check_in_date:'' }}</span>
                <span>离店时间：{{ item.out_date?item.out_date:'' }}</span>
                <span>需求备注：{{ item.other_requirements?item.other_requirements:'' }}</span>
              </div>
            </th>
          </tr>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].room && tableData[0].room.length > 0" class="room-tr">
          <th class="roomPrice roomPrice-th th-width" ref="BorderHeight_roomremark_left">客房报价总备注</th>
        </tr>

        <!-- 左侧会场 -->
        <tr v-if="tableData[0] && tableData[0].conference && tableData[0].conference.length > 0">
          <th class="roomPrice roomPrice-img th-width h_40" ref="BorderHeight_conferencetotalprice_left">
            <div @click="unflod_conference = !unflod_conference">
              <img class="img-top" v-show="!unflod_conference" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod_conference" :src="require('@/assets/images/close_1.png')" alt="" />
              会场总价
            </div>
          </th>
        </tr>
        <tbody v-show="unflod_conference" v-for="(item, index) in tableData[0] ? tableData[0].conference : []">
          <tr class="room-tr" v-if="item.rentalCosts.length">
            <th class="roomPrice roomPrice-th th-width" ref="BorderHeight_conferenceprice_left">{{ item.time ? item.time : '' }} 会场价格</th>
          </tr>
          <template v-for="(itemc, indexc) in item.rentalCosts ? item.rentalCosts : []">
            <tr v-if="item.rentalCosts.length && itemc.type == 1">
              <th class="roomPrice budget-price th-width" ref="BorderHeight_conferenceinfo1_left">
                <div class="column">
                  <span>{{ itemc.name }}</span>
                  <span>时间:{{ itemc.starttime }}-{{ itemc.endtime }}</span>
                  <span>台型:{{ itemc.roomsetuptype }}</span>
                  <span>人数:{{ itemc.attendees }}</span>
                  <span>面积:{{ itemc.min_area }}-{{ itemc.max_area }} sqm</span>
                </div>
              </th>
            </tr>
            <tr v-if="item.rentalCosts.length && itemc.type == 3">
              <th class="roomPrice budget-price th-width" ref="BorderHeight_conferenceinfo3_left">
                <div class="column">
                  <span>{{ itemc.equipmentname }}</span>
                  <span>{{ itemc.equipment }}</span>
                  <span>备注：{{ itemc.microphonedescribe }}</span>
                </div>
              </th>
            </tr>
            <tr v-if="item.rentalCosts.length && itemc.type == 2">
              <th class="roomPrice budget-price th-width" ref="BorderHeight_conferenceinfo2_left">
                <div class="column">
                  <span>{{ itemc.name }}</span>
                  <span>搭建时间:{{ itemc.starttime }}~{{ itemc.endtime }}</span>
                  <span>备注:{{ itemc.describe }}</span>
                  <span>是否提前搭建:{{ itemc.issettinginadvance }}</span>
                </div>
              </th>
            </tr>
            <tr v-if="item.rentalCosts.length && itemc.type==5">
              <th class="roomPrice budget-price th-width" ref="BorderHeight_conferenceinfo2">
                <div class="column">
                  <span>{{ itemc.equipmentname }}</span>
                  <!-- <span>{{ itemc.equipment }}</span> -->
                </div>
              </th>
            </tr>
          </template>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].conference && tableData[0].conference.length > 0" class="room-tr">
          <th class="roomPrice roomPrice-th th-width" ref="BorderHeight_conferenceremark_left">会场报价总备注</th>
        </tr>

        <!-- 左侧餐饮 -->
        <tr v-if="tableData[0] && tableData[0].food && tableData[0].food.length > 0">
          <th class="repastPrice repastPrice-img th-width h_40" ref="BorderHeight_foodtotalprice_left">
            <div class="repastPrice-div" @click="unflod_repast = !unflod_repast">
              <img class="img-top" v-show="!unflod_repast" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod_repast" :src="require('@/assets/images/close_1.png')" alt="" />
              餐饮总价
            </div>
          </th>
        </tr>
        <tbody v-show="unflod_repast" v-for="item in tableData[0] ? tableData[0].food : []">
          <tr class="room-tr">
            <th class="repastPrice roomPrice-th th-width" ref="BorderHeight_foodprice_left">{{ item.time ? item.time : '' }} 餐饮价格</th>
          </tr>
          <tr>
            <th class="repastPrice repastPrice-th th-width" ref="BorderHeight_foodinfo_left">
              <div class="column">
                <span>{{ item.time ? item.time : '' }}</span>
                <span>{{ item.foodname ? item.foodname : '' }}</span>
                <span>餐标：{{ item.food_limit }}</span>
                <span>备注：{{ item.comments }}</span>
              </div>
            </th>
          </tr>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].food && tableData[0].food.length > 0" class="room-tr">
          <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_foodremark_left">餐饮报价总备注</th>
        </tr>

        <!--酒店外餐饮总价   开始-->
        <tr v-if="tableData[0] && tableData[0].foodOutside && tableData[0].foodOutside.length > 0">
          <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_foodouttotalprice_left">
            <div class="repastPrice-div" @click="unflod_foodOut = !unflod_foodOut">
              <img class="img-top" v-show="!unflod_foodOut" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod_foodOut" :src="require('@/assets/images/close_1.png')" alt="" />
              酒店外餐饮总价
            </div>
          </th>
        </tr>
        <tbody v-show="unflod_foodOut" v-for="item in tableData[0] ? tableData[0].foodOutside : []">
          <tr class="room-tr">
            <th class="repastPrice roomPrice-th th-width" ref="BorderHeight_foodoutprice_left">{{ item.time ? item.time : '' }} 酒店外餐饮价格</th>
          </tr>
          <tr>
            <th class="repastPrice repastPrice-th th-width" ref="BorderHeight_foodoutinfo_left">
              <div class="column">
                <span>{{ item.time ? item.time : '' }}</span>
                <span>{{ item.foodname ? item.foodname : '' }}</span>
                <span>餐标：{{ item.food_limit }}</span>
                <span>备注：{{ item.comments }}</span>
              </div>
            </th>
          </tr>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].foodOutside && tableData[0].foodOutside.length > 0" class="room-tr">
          <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_foodoutremark_left">酒店外餐饮报价总备注</th>
        </tr>
        <!--酒店外餐饮总价   结束-->

        <!-- 左侧大交通 -->
        <tr v-if="tableData[0] && tableData[0].transportation && tableData[0].transportation.length > 0">
          <th class="repastPrice repastPrice-img th-width h_40" ref="BorderHeight_transportationtotalprice_left">
            <div class="repastPrice-div" @click="unflod_transport = !unflod_transport">
              <img class="img-top" v-show="!unflod_transport" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod_transport" :src="require('@/assets/images/close_1.png')" alt="" />
              大交通总价
            </div>
          </th>
        </tr>
        <tbody v-show="unflod_transport" v-for="(item, index) in tableData[0] ? tableData[0].transportation : []">
          <tr class="room-tr">
            <th class="repastPrice roomPrice-th th-width" ref="BorderHeight_transportationprice_left">{{ item.datatime ? item.datatime : '' }} 交通价格</th>
          </tr>
          <tr>
            <th class="repastPrice repastPrice-th th-width" ref="BorderHeight_transportationinfo_left">
              <div class="column">
                <span>{{ item.datatime ? item.datatime : '' }}</span>
                <span>
                  {{ item.origincity ? item.origincity : '' }} - {{ item.destinationcity ? item.destinationcity : '' }} {{ item.transtype ? item.transtype : '' }}
                  {{ item.seatclasses ? item.seatclasses : '' }} {{ item.specialprice ? item.specialprice : '' }}
                </span>
                <span>{{ item.passengercount ? item.passengercount : '' }}人</span>
                <span>抵达时间：{{item.arrivetime}}</span>
                <span>备注:{{ item.requirement ? item.requirement : '' }}</span>
              </div>
            </th>
          </tr>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].transportation && tableData[0].transportation.length > 0" class="room-tr">
          <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_transportationtotalremark_left">大交通报价总备注</th>
        </tr>

        <!-- 左侧地面交通 -->
        <tr v-if="tableData[0] && tableData[0].car && tableData[0].car.length > 0">
          <th class="repastPrice repastPrice-img th-width h_40" ref="BorderHeight_cartotalprice_left">
            <div class="repastPrice-div" @click="unflod_car = !unflod_car">
              <img class="img-top" v-show="!unflod_car" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod_car" :src="require('@/assets/images/close_1.png')" alt="" />
              地面交通总价
            </div>
          </th>
        </tr>
        <tbody v-show="unflod_car" v-for="(item, index) in tableData[0] ? tableData[0].car : []">
          <tr class="room-tr">
            <th class="repastPrice roomPrice-th th-width" ref="BorderHeight_carprice_left">{{ item.datatime ? item.datatime : '' }} 用车价格</th>
          </tr>
          <tr>
            <th class="repastPrice repastPrice-th th-width" ref="BorderHeight_carinfo_left">
              <div class="column">
                <span>{{ item.datatime ? item.datatime : '' }}</span>
                <span>用车目的:{{ item.purpose ? item.purpose : '' }}</span>
                <span>
                  {{ item.vehicletype ? item.vehicletype : '' }} {{ item.carcount ? item.carcount : '' }}辆 搭乘{{ item.vehiclecount ? item.vehiclecount : '' }}人
                </span>
                <span>用车城市:{{item.city}}</span>
                <span>备注:{{item.explain}}</span>
              </div>
            </th>
          </tr>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].car && tableData[0].car.length > 0" class="room-tr">
          <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_carremark_left">地面交通报价总备注</th>
        </tr>

        <!-- 左侧其他服务 -->
        <tr v-if="tableData[0] && tableData[0].other && tableData[0].other.length > 0">
          <th class="repastPrice repastPrice-img th-width h_40" ref="BorderHeight_othertotalprice_left">
            <div class="repastPrice-div" @click="unflod_other = !unflod_other">
              <img class="img-top" v-show="!unflod_other" :src="require('@/assets/images/tri-open.png')" alt="" />
              <img class="img-bottom" v-show="unflod_other" :src="require('@/assets/images/close_1.png')" alt="" />
              其他服务总价
            </div>
          </th>
        </tr>
        <tbody v-show="unflod_other" v-for="(item, index) in tableData[0] ? tableData[0].other : []">
          <tr>
            <th class="repastPrice repastPrice-th th-width" ref="BorderHeight_otherinfo_left">
              <div class="column">
                <!-- <span>{{ item.name }}人员 {{ item.participatecount }}人 {{ item.servicedaycount }}天</span> -->
                <span>{{ item.name }} </span>
                <span v-if="item.type != 5">数量{{ item.participatecount }}</span>
                <span>备注：{{ item.describe }}</span>
              </div>
            </th>
          </tr>
        </tbody>
        <tr v-if="tableData[0] && tableData[0].other && tableData[0].other.length > 0" class="room-tr">
          <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_otherremark_left">其它报价总备注</th>
        </tr>
        <tr style="height:100px">
          <th class="tender-c repastPrice-th th-width" ref="BorderHeight_remark_left">{{ hotelOrSupplier ? '酒店报价说明（付款条件等）' : '服务商报价报价说明' }}</th>
        </tr>
        <!-- <tr>
					<th class="indate repastPrice-th th-width">有效期</th>
				</tr> -->

        <!--线下报价详情 开始-->
        <template v-if="command == '2'">
          <!--会场-->
          <template v-if="offlineData.conference && offlineData.conference.length > 0">
            <tr>
              <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlineconferencetotalprice_left">
                <div class="repastPrice-div" @click="eventOut = !eventOut">
                  <img class="img-top" v-show="!eventOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                  <img class="img-bottom" v-show="eventOut" :src="require('@/assets/images/close_1.png')" alt="" />
                  会场总价
                </div>
              </th>
            </tr>
            <tbody v-show="eventOut" v-for="item in offlineData.conference">
              <tr>
                <th class="repastPrice th-width" ref="BorderHeight_offlineconferencedate_left">{{ item.time }} 会场价格</th>
              </tr>
              <tr v-for="eventItem in item.data">
                <td class="repastPrice th-width" ref="BorderHeight_offlineconferenceinfo_left">
                  <div class="column">
                    <span>{{ eventItem.name }}</span>
                    <span>时间：{{ eventItem.starttime }}-{{ eventItem.endtime }}</span>
                    <span>台型：{{ eventItem.roomsetuptype }}</span>
                    <span>人数：{{ eventItem.attendees }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tr class="room-tr">
              <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlineconferenceremark_left">会场报价总备注说明</th>
            </tr>
          </template>

          <!--客房-->
          <template v-if="offlineData.room && offlineData.room.length > 0">
            <tr>
              <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlineroomtotalprice_left">
                <div class="repastPrice-div" @click="roomOut = !roomOut">
                  <img class="img-top" v-show="!roomOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                  <img class="img-bottom" v-show="roomOut" :src="require('@/assets/images/close_1.png')" alt="" />
                  客房总价
                </div>
              </th>
            </tr>
            <tbody v-show="roomOut" v-for="item in offlineData.room">
              <tr>
                <th class="repastPrice th-width" ref="BorderHeight_offlineroomdate_left">{{ item.time }} 客房价格</th>
              </tr>
              <tr>
                <td class="repastPrice th-width" ref="BorderHeight_offlineroominfo_left">
                  <div class="column">
                    <span>预算：{{ item.room_budget }}</span>
                    <span>{{ item.networks }}</span>
                    <span>{{ item.breakfast }}</span>
                    <span>{{ item.roomtype }}</span>
                    <span>入住时间：{{ item.check_in_date?item.check_in_date:'' }}</span>
                    <span>离店时间：{{ item.out_date?item.out_date:'' }}</span>
                    <span>需求备注：{{ item.other_requirements?item.other_requirements:'' }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tr class="room-tr">
              <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlineroomremark_left">客房报价总备注说明</th>
            </tr>
          </template>

          <!--酒店餐饮总价-->
          <template v-if="offlineData.food && offlineData.food.length > 0">
            <tr>
              <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlinefoodtotalprice_left">
                <div class="repastPrice-div" @click="hotelOut = !hotelOut">
                  <img class="img-top" v-show="!hotelOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                  <img class="img-bottom" v-show="hotelOut" :src="require('@/assets/images/close_1.png')" alt="" />
                  酒店餐饮总价
                </div>
              </th>
            </tr>
            <tbody v-show="hotelOut" v-for="item in offlineData.food">
              <tr>
                <th class="repastPrice th-width" ref="BorderHeight_offlinefooddate_left">{{ item.time }} 酒店餐饮价格</th>
              </tr>
              <tr>
                <th class="repastPrice repastPrice-th th-width" ref="BorderHeight_offlinefoodinfo_left">
                  <div class="column">
                    <span>{{ item.time }}</span>
                    <span>{{ item.foodname }}</span>
                    <span>餐标：{{ item.food_limit }}</span>
                    <span>备注：{{ item.comments }}</span>
                  </div>
                </th>
              </tr>
            </tbody>
            <tr class="room-tr">
              <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlinefoodremark_left">酒店餐饮报价总备注说明</th>
            </tr>
          </template>

          <!--酒店外餐饮总价-->
          <template v-if="offlineData.foodOutside && offlineData.foodOutside.length > 0">
            <tr>
              <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlinefoodouttotalprice_left">
                <div class="repastPrice-div" @click="foodOut = !foodOut">
                  <img class="img-top" v-show="!foodOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                  <img class="img-bottom" v-show="foodOut" :src="require('@/assets/images/close_1.png')" alt="" />
                  酒店外餐饮总价
                </div>
              </th>
            </tr>
            <tbody v-show="foodOut" v-for="item in offlineData.foodOutside">
              <tr>
                <th class="repastPrice th-width" ref="BorderHeight_offlinefoodoutdate_left">{{ item.time }} 酒店外餐饮价格</th>
              </tr>
              <tr>
                <td class="repastPrice repastPrice-th th-width" ref="BorderHeight_offlinefoodoutinfo_left">
                  <div class="column">
                    <span>{{ item.time }}</span>
                    <span>{{ item.foodname }}</span>
                    <span>餐标：{{ item.food_limit }}</span>
                    <span>备注：{{ item.comments }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tr class="room-tr">
              <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlinefoodoutremark_left">酒店外餐饮报价总备注说明</th>
            </tr>
          </template>

          <!--大交通-->
          <template v-if="offlineData.transportation && offlineData.transportation.length > 0">
            <tr>
              <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlinetransportationtotalprice_left">
                <div class="repastPrice-div" @click="trafficOut = !trafficOut">
                  <img class="img-top" v-show="!trafficOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                  <img class="img-bottom" v-show="trafficOut" :src="require('@/assets/images/close_1.png')" alt="" />
                  大交通总价
                </div>
              </th>
            </tr>
            <tbody v-show="trafficOut" v-for="item in offlineData.transportation">
              <tr>
                <th class="repastPrice th-width" ref="BorderHeight_offlinetransportationdate_left">{{ item.time }} 大交通价格</th>
              </tr>
              <tr>
                <td class="repastPrice th-width" ref="BorderHeight_offlinetransportationinfo_left">
                  <div class="column">
                    <span>{{ item.transtype }}：{{ item.origincity }}-{{ item.destinationcity }}</span>
                    <span>人数：{{ item.count }}</span>
                    <span>抵达时间：{{item.arrivetime}}</span>
                    <span>{{ item.seatclasses }} {{ item.specialprice }}</span>
                    <span>{{ item.requirement }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tr class="room-tr">
              <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlinetransportationremark_left">大交通报价总备注说明</th>
            </tr>
          </template>

          <!--地面交通总价-->
          <template v-if="offlineData.car && offlineData.car.length > 0">
            <tr>
              <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlinecartotalprice_left">
                <div class="repastPrice-div" @click="urbanOut = !urbanOut">
                  <img class="img-top" v-show="!urbanOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                  <img class="img-bottom" v-show="urbanOut" :src="require('@/assets/images/close_1.png')" alt="" />
                  地面交通总价
                </div>
              </th>
            </tr>
            <tbody v-show="urbanOut" v-for="item in offlineData.car">
              <tr>
                <th class="repastPrice th-width" ref="BorderHeight_offlinecardate_left">{{ item.time }} 用车价格</th>
              </tr>
              <tr>
                <td class="repastPrice th-width" ref="BorderHeight_offlinecarinfo_left">
                  <div class="column">
                    <span>用车目的：{{ item.purpose }}</span>
                    <span>车型：{{ item.vehicletype }}</span>
                    <span>用车城市:{{item.city}}</span>
                    <span>用车数量：{{ item.carcount }}</span>
                    <span>搭乘人数：{{ item.vehiclecount }}</span>
                    <span>备注:{{item.explain}}</span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tr class="room-tr">
              <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlinecarremark_left">地面交通报价总备注说明</th>
            </tr>
          </template>

          <!--其他服务总价-->
          <template v-if="offlineData.other && offlineData.other.length > 0">
            <tr>
              <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_offlineothertotalprice_left">
                <div class="repastPrice-div" @click="otherOut = !otherOut">
                  <img class="img-top" v-show="!otherOut" :src="require('@/assets/images/tri-open.png')" alt="" />
                  <img class="img-bottom" v-show="otherOut" :src="require('@/assets/images/close_1.png')" alt="" />
                  其他服务总价
                </div>
              </th>
            </tr>
            <tbody v-show="otherOut" v-for="item in offlineData.other">
              <tr>
                <td class="repastPrice th-width" ref="BorderHeight_offlineotherinfo_left">
                  <div class="column">
                    <span>{{ item.name }}</span>
                    <span>数量：{{ item.count }}</span>
                    <span>需求备注：{{ item.offer_remarks }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tr class="room-tr">
              <th class="repastPrice repastPrice-th-price th-width" ref="BorderHeight_offlineotherremark_left">其他服务报价总备注说明</th>
            </tr>
          </template>
        </template>
        <!--线下报价详情 结束-->

        <!--税费服务费模块-->
        <template v-if="(type === 'hotel' && command == '2') || type === 'service'">
          <tr v-if="tableData[0] && tableData[0].firstQuotedPrice.serviceData && tableData[0].firstQuotedPrice.serviceData.length > 0">
            <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_serviceprice_left">
              <div class="repastPrice-div" @click="unflod_service = !unflod_service">
                <img class="img-top" v-show="!unflod_service" :src="require('@/assets/images/tri-open.png')" alt="" />
                <img class="img-bottom" v-show="unflod_service" :src="require('@/assets/images/close_1.png')" alt="" />
                服务费
              </div>
            </th>
          </tr>
          <tbody v-show="unflod_service">
            <tr v-if="tableData[0] && tableData[0].firstQuotedPrice.serviceData && tableData[0].firstQuotedPrice.serviceData.length > 0">
              <th class="repastPrice th-width" ref="BorderHeight_serviceinfo_left">
                <div>
                  <template v-for="(item, idx) in tableData">
                    <p v-for="serviceItem in item.firstQuotedPrice.serviceData">
                      <span v-if="idx === 0">{{ serviceItem.name }}</span>
                    </p>
                  </template>
                </div>
              </th>
            </tr>
          </tbody>
          <tr v-if="tableData[0] && tableData[0].firstQuotedPrice.taxationData && tableData[0].firstQuotedPrice.taxationData.length > 0">
            <th class="repastPrice repastPrice-img th-width" ref="BorderHeight_taxationprice_left">
              <div class="repastPrice-div" @click="unflod_tax = !unflod_tax">
                <img class="img-top" v-show="!unflod_tax" :src="require('@/assets/images/tri-open.png')" alt="" />
                <img class="img-bottom" v-show="unflod_tax" :src="require('@/assets/images/close_1.png')" alt="" />
                税费
              </div>
            </th>
          </tr>
          <tbody v-show="unflod_tax">
            <tr v-if="tableData[0] && tableData[0].firstQuotedPrice.taxationData && tableData[0].firstQuotedPrice.taxationData.length > 0">
              <th class="repastPrice th-width" ref="BorderHeight_taxationinfo_left">
                <template v-for="(item, idx) in tableData">
                  <p v-for="taxItem in item.firstQuotedPrice.taxationData">
                    <span v-if="idx === 0">{{ taxItem.name }}</span>
                  </p>
                </template>
              </th>
            </tr>
          </tbody>
        </template>

        <!-- <tr v-if="hotelOrSupplier">
					<th class="cancel cancel-img th-width">
						<div @click="unflod_can=!unflod_can">
							<img class="img-top" v-show="!unflod_can" :src="require('@/assets/images/tri-open.png')" alt="">
							<img class="img-bottom" v-show="unflod_can" :src="require('@/assets/images/close_1.png')" alt="">
							取消条款
						</div>
					</th>
				</tr>
				<tbody v-show="unflod_can">
					<tr>
						<th class="cancel repastPrice-th th-width">取消条款明细</th>
					</tr>
				</tbody> -->
        <tr class="room-tr">
          <th class="operate repastPrice-th-price th-width" ref="BorderHeight_handle_left">操作</th>
        </tr>
        <tr>
          <th class="operatePage repastPrice-th th-width" ref="BorderHeight_topage_left">去报价页操作：邀请重新报价/确认中标/谢绝报价</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import offline from './components/offline';
import { positiveFloat}  from '@/utils/common';

export default {
	data() {
		return {
			offlineData: {
				room: [],
				totalPrice: {
					room: ''
				},
				remarks: {
					room_remarks: ''
				}
			}, // 线下
			eventOut: true, // 会场总价
			roomOut: true, // 客房总价
			foodOut: true, // 酒店外总价
			hotelOut: true, // 酒店外总价
			trafficOut: true, // 大交通
			urbanOut: true, // 地面交通
			otherOut: true, // 其他需求
			unflod: true,//客房展开、收起
			unflod_conference: true,//会场展开、收起
			unflod_repast: true,//酒店内餐饮展开、收起
			unflod_foodOut: true,//酒店外餐饮展开、收起
			unflod_transport: true,//大交通展开、收起
			unflod_car: true,//地面交通展开、收起
			unflod_other: true,//其他服务展开、收起
			unflod_service: true,//服务费展开、收起
			unflod_tax: true,//税费展开、收起
			unflod_can: true,//取消条款展开、收起
			is_top_head: false,
			left_arrow: false,
			right_arrow: false,
			isopen: true,//会议基本信息展开、收起
			margin_l: 0,
			hotelOrSupplier: null, //true为酒店，false为服务商
			tableData: [],
			meeting: {},
			inquiry_sheet_code: '',
			type: 1, //hotel 酒店
			command: 1 //2含线下
		};
	},
	components: { offline },
	mounted() {
		this.type = this.$route.query.type;
		this.command = this.$route.query.command;
		this.$nextTick(() => {
			let _this = this;
			/* _this.$refs.all.style.height=document.body.scrollHeight+'px' */
			document.addEventListener('scroll', function() {
				_this.$refs.div_left_top.style.left = _this.$refs.div_leftTop.offsetLeft + 'px';
				_this.$refs.div_left_top.style.top = _this.$refs.div_leftTop.offsetTop + 'px';
				_this.$refs.div_head.style.left = _this.$refs.div_leftTop.offsetLeft + 'px';
				_this.$refs.div_table_left.style.left = _this.$refs.div_leftTop.offsetLeft + 'px';

				_this.$refs.all.style.height = document.body.scrollHeight + 'px';

				if (window.pageYOffset > _this.$refs.float_tr.offsetTop) {
					_this.is_top_head = true;
					_this.left_arrow = true;
					_this.right_arrow = true;
					_this.$refs.div_head.style.position = 'fixed';
					_this.$refs.div_head.style.top = '0px';
				} else {
					_this.is_top_head = false;
					_this.left_arrow = false;
					_this.right_arrow = false;
				}
			});
		});
		this.room();
		this.getMeetingList();
		this.getsheet();
		this.summaryThanPrice();
	},
	computed: {
		riseInPrice (){	// 价格上涨金额
			return function(item){
				let price = Math.abs(item.service.last.total_price - item.service.first.total_price)/Number(item.service.first.total_price)
				return (price*100).toFixed(2)
			}
		},
		compareNum(){
			return function(item){
				item.service.last.total_price > item.service.first.total_price? true:false
			}
		}
	},
	methods: {
		positiveFloat,
		//坐栏高度
		leftHeight(){
			this.$nextTick(()=>{
				//线上
				var room=this.tableData[0]&&this.tableData[0].room ? this.tableData[0].room : [];
				if(room){
					room.forEach((e,i)=>{//客房
					if(this.$refs.BorderHeight_roominfo_left && this.$refs.BorderHeight_roominfo_left[i]){
						this.$refs.BorderHeight_roominfo_left[i].style.height=this.$refs.BorderHeight_roominfo[i].offsetHeight+'px'
						this.$refs.BorderHeight_roominfo[i].style.height=this.$refs.BorderHeight_roominfo[i].offsetHeight+'px'
					}
					})
				}
				var conference=this.tableData[0]&&this.tableData[0].conference ? this.tableData[0].conference : [];
				if(conference){
					conference.forEach((e,i)=>{//会场
						if(this.$refs.BorderHeight_conferenceinfo1_left && this.$refs.BorderHeight_conferenceinfo1_left[i]){
							this.$refs.BorderHeight_conferenceinfo1_left[i].style.height=this.$refs.BorderHeight_conferenceinfo1[i].offsetHeight+'px'
							this.$refs.BorderHeight_conferenceinfo1[i].style.height=this.$refs.BorderHeight_conferenceinfo1[i].offsetHeight+'px'
						}
						if(this.$refs.BorderHeight_conferenceinfo2_left && this.$refs.BorderHeight_conferenceinfo2_left[i]){
							this.$refs.BorderHeight_conferenceinfo2_left[i].style.height=this.$refs.BorderHeight_conferenceinfo2[i].offsetHeight+'px'
							this.$refs.BorderHeight_conferenceinfo2[i].style.height=this.$refs.BorderHeight_conferenceinfo2[i].offsetHeight+'px'
						}
						if(this.$refs.BorderHeight_conferenceinfo3_left && this.$refs.BorderHeight_conferenceinfo3_left[i]){
							this.$refs.BorderHeight_conferenceinfo3_left[i].style.height=this.$refs.BorderHeight_conferenceinfo3[i].offsetHeight+'px'
							this.$refs.BorderHeight_conferenceinfo3[i].style.height=this.$refs.BorderHeight_conferenceinfo3[i].offsetHeight+'px'
						}
						
					})
				}
				var food=this.tableData[0] &&this.tableData[0].food? this.tableData[0].food : [];
				if(food){
					food.forEach((e,i)=>{//酒店内餐饮
						if(this.$refs.BorderHeight_foodinfo_left && this.$refs.BorderHeight_foodinfo_left[i]){
							this.$refs.BorderHeight_foodinfo_left[i].style.height=this.$refs.BorderHeight_foodinfo[i].offsetHeight+'px'
							this.$refs.BorderHeight_foodinfo[i].style.height=this.$refs.BorderHeight_foodinfo[i].offsetHeight+'px'
						}
					})
				}
				var foodOutside=this.tableData[0]&&this.tableData[0].foodOutside ?this.tableData[0].foodOutside : [];
				if(foodOutside){
					foodOutside.forEach((e,i)=>{//酒店外餐饮
						if(this.$refs.BorderHeight_foodoutinfo_left && this.$refs.BorderHeight_foodoutinfo_left[i]){
							this.$refs.BorderHeight_foodoutinfo_left[i].style.height=this.$refs.BorderHeight_foodoutinfo[i].offsetHeight+'px'
							this.$refs.BorderHeight_foodoutinfo[i].style.height=this.$refs.BorderHeight_foodoutinfo[i].offsetHeight+'px'
						}
					})
				}
				var transportation=this.tableData[0] &&this.tableData[0].transportation? this.tableData[0].transportation : [];
				if(transportation){
					transportation.forEach((e,i)=>{//大交通
						if(this.$refs.BorderHeight_transportationinfo_left && this.$refs.BorderHeight_transportationinfo_left[i]){
							this.$refs.BorderHeight_transportationinfo_left[i].style.height=this.$refs.BorderHeight_transportationinfo[i].offsetHeight+'px'
							this.$refs.BorderHeight_transportationinfo[i].style.height=this.$refs.BorderHeight_transportationinfo[i].offsetHeight+'px'
						}
					})
				}
				var car=this.tableData[0]&&this.tableData[0].car ? this.tableData[0].car : [];
				if(car){
					car.forEach((e,i)=>{//地面交通
						if(this.$refs.BorderHeight_carinfo_left && this.$refs.BorderHeight_carinfo_left[i]){
							this.$refs.BorderHeight_carinfo_left[i].style.height=this.$refs.BorderHeight_carinfo[i].offsetHeight+'px'
							this.$refs.BorderHeight_carinfo[i].style.height=this.$refs.BorderHeight_carinfo[i].offsetHeight+'px'
						}
					})
				}
				var other=this.tableData[0] &&this.tableData[0].other? this.tableData[0].other : [];
				if(other){
					other.forEach((e,i)=>{//其他服务
						if(this.$refs.BorderHeight_otherinfo_left && this.$refs.BorderHeight_otherinfo_left[i]){
							this.$refs.BorderHeight_otherinfo_left[i].style.height=this.$refs.BorderHeight_otherinfo[i].offsetHeight+'px'
							this.$refs.BorderHeight_otherinfo[i].style.height=this.$refs.BorderHeight_otherinfo[i].offsetHeight+'px'
						}
					})
				}
				//服务商报价说明
				this.$refs.BorderHeight_remark_left.style.height=this.$refs.BorderHeight_remark.offsetHeight+'px'
				this.$refs.BorderHeight_remark.style.height=this.$refs.BorderHeight_remark.offsetHeight+'px'
				
				
				//线下
				//会场
				if(this.offlineData.conference)
				this.offlineData.conference.forEach((e,i)=>{
					this.$refs.BorderHeight_offlineconferencedate_left[i].style.height=this.$refs.BorderHeight_offlineconferencedate[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlineconferencedate[i].style.height=this.$refs.BorderHeight_offlineconferencedate[i].offsetHeight+'px'
					e.data.forEach((item,index)=>{
						this.$refs.BorderHeight_offlineconferenceinfo_left[index].style.height=this.$refs.BorderHeight_offlineconferenceinfo[index].offsetHeight+'px'
						this.$refs.BorderHeight_offlineconferenceinfo[index].style.height=this.$refs.BorderHeight_offlineconferenceinfo[index].offsetHeight+'px'
					})
				})
				//客房
				if(this.offlineData.room)
				this.offlineData.room.forEach((e,i)=>{
					this.$refs.BorderHeight_offlineroomdate_left[i].style.height=this.$refs.BorderHeight_offlineroomdate[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlineroomdate[i].style.height=this.$refs.BorderHeight_offlineroomdate[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlineroominfo_left[i].style.height=this.$refs.BorderHeight_offlineroominfo[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlineroominfo[i].style.height=this.$refs.BorderHeight_offlineroominfo[i].offsetHeight+'px'
				})
				//酒店内餐饮
				if(this.offlineData.food)
				this.offlineData.food.forEach((e,i)=>{
					this.$refs.BorderHeight_offlinefooddate_left[i].style.height=this.$refs.BorderHeight_offlinefooddate[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlinefooddate[i].style.height=this.$refs.BorderHeight_offlinefooddate[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlinefoodinfo_left[i].style.height=this.$refs.BorderHeight_offlinefoodinfo[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlinefoodinfo[i].style.height=this.$refs.BorderHeight_offlinefoodinfo[i].offsetHeight+'px'
				})
				//酒店外餐饮
				if(this.offlineData.foodOutside)
				this.offlineData.foodOutside.forEach((e,i)=>{
					this.$refs.BorderHeight_offlinefoodoutdate_left[i].style.height=this.$refs.BorderHeight_offlinefoodoutdate[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlinefoodoutdate[i].style.height=this.$refs.BorderHeight_offlinefoodoutdate[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlinefoodoutinfo_left[i].style.height=this.$refs.BorderHeight_offlinefoodoutinfo[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlinefoodoutinfo[i].style.height=this.$refs.BorderHeight_offlinefoodoutinfo[i].offsetHeight+'px'
				})
				//大交通
				if(this.offlineData.transportation)
				this.offlineData.transportation.forEach((e,i)=>{
					this.$refs.BorderHeight_offlinetransportationdate_left[i].style.height=this.$refs.BorderHeight_offlinetransportationdate[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlinetransportationdate[i].style.height=this.$refs.BorderHeight_offlinetransportationdate[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlinetransportationinfo_left[i].style.height=this.$refs.BorderHeight_offlinetransportationinfo[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlinetransportationinfo[i].style.height=this.$refs.BorderHeight_offlinetransportationinfo[i].offsetHeight+'px'
				})
				//地面交通
				if(this.offlineData.car)
				this.offlineData.car.forEach((e,i)=>{
					this.$refs.BorderHeight_offlinecardate_left[i].style.height=this.$refs.BorderHeight_offlinecardate[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlinecardate[i].style.height=this.$refs.BorderHeight_offlinecardate[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlinecarinfo_left[i].style.height=this.$refs.BorderHeight_offlinecarinfo[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlinecarinfo[i].style.height=this.$refs.BorderHeight_offlinecarinfo[i].offsetHeight+'px'
				})
				//其他服务
				if(this.offlineData.other)
				this.offlineData.other.forEach((e,i)=>{
					debugger
					this.$refs.BorderHeight_offlineotherinfo_left[i].style.height=this.$refs.BorderHeight_offlineotherinfo[i].offsetHeight+'px'
					this.$refs.BorderHeight_offlineotherinfo[i].style.height=this.$refs.BorderHeight_offlineotherinfo[i].offsetHeight+'px'
				})
				//服务费
				if(this.$refs.BorderHeight_serviceinfo_left){
					this.$refs.BorderHeight_serviceinfo_left.style.height=this.$refs.BorderHeight_serviceinfo.offsetHeight+'px'

					this.$refs.BorderHeight_serviceinfo.style.height=this.$refs.BorderHeight_serviceinfo.offsetHeight+'px'
				}
				//税费
				if(this.$refs.BorderHeight_taxationinfo_left){

					this.$refs.BorderHeight_taxationinfo_left.style.height=this.$refs.BorderHeight_taxationinfo.offsetHeight+'px'
					this.$refs.BorderHeight_taxationinfo.style.height=this.$refs.BorderHeight_taxationinfo.offsetHeight+'px'
				}
				
				//客房总备注
				if(this.tableData[0] && this.tableData[0].room && this.tableData[0].room.length > 0){
					if(this.$refs.BorderHeight_roomremark_left){

						this.$refs.BorderHeight_roomremark_left.style.height=this.$refs.BorderHeight_roomremark.offsetHeight+'px'
						this.$refs.BorderHeight_roomremark.style.height=this.$refs.BorderHeight_roomremark.offsetHeight+'px'
					}
				}
				//会场总备注
				if(this.tableData[0] && this.tableData[0].conference && this.tableData[0].conference.length > 0){
					if(this.$refs.BorderHeight_conferenceremark_left){

						this.$refs.BorderHeight_conferenceremark_left.style.height=this.$refs.BorderHeight_conferenceremark.offsetHeight+'px'
						this.$refs.BorderHeight_conferenceremark.style.height=this.$refs.BorderHeight_conferenceremark.offsetHeight+'px'
					}
				}
				//酒店内餐饮总备注
				if(this.tableData[0] && this.tableData[0].food && this.tableData[0].food.length > 0){
					if(this.$refs.BorderHeight_foodremark_left){

						this.$refs.BorderHeight_foodremark_left.style.height=this.$refs.BorderHeight_foodremark.offsetHeight+'px'
						this.$refs.BorderHeight_foodremark.style.height=this.$refs.BorderHeight_foodremark.offsetHeight+'px'
					}
				}
				//酒店外餐饮总备注
				if(this.tableData[0] && this.tableData[0].foodOutside && this.tableData[0].foodOutside.length > 0){
					if(this.$refs.BorderHeight_foodoutremark_left){

						this.$refs.BorderHeight_foodoutremark_left.style.height=this.$refs.BorderHeight_foodoutremark.offsetHeight+'px'
						this.$refs.BorderHeight_foodoutremark.style.height=this.$refs.BorderHeight_foodoutremark.offsetHeight+'px'
					}
				}
				//大交通总备注
				if(this.tableData[0] && this.tableData[0].transportation && this.tableData[0].transportation.length > 0){
					if(this.$refs.BorderHeight_transportationtotalremark_left){

						this.$refs.BorderHeight_transportationtotalremark_left.style.height=this.$refs.BorderHeight_transportationtotalremark.offsetHeight+'px'
						this.$refs.BorderHeight_transportationtotalremark.style.height=this.$refs.BorderHeight_transportationtotalremark.offsetHeight+'px'
					}
				}
				//地面交通总备注
				if(this.tableData[0] && this.tableData[0].car && this.tableData[0].car.length > 0){
					if(this.$refs.BorderHeight_carremark_left){

						this.$refs.BorderHeight_carremark_left.style.height=this.$refs.BorderHeight_carremark.offsetHeight+'px'
						this.$refs.BorderHeight_carremark.style.height=this.$refs.BorderHeight_carremark.offsetHeight+'px'
					}
				}
				//其他服务总备注
				if(this.tableData[0] && this.tableData[0].other && this.tableData[0].other.length > 0){
					if(this.$refs.BorderHeight_otherremark_left){

						this.$refs.BorderHeight_otherremark_left.style.height=this.$refs.BorderHeight_otherremark.offsetHeight+'px'
						this.$refs.BorderHeight_otherremark.style.height=this.$refs.BorderHeight_otherremark.offsetHeight+'px'
					}
				}
				
				//线下
				//客房总备注
				if(this.offlineData.room && this.offlineData.room.length > 0){
					this.$refs.BorderHeight_offlineroomremark_left.style.height=this.$refs.BorderHeight_offlineroomremark.offsetHeight+'px'
					this.$refs.BorderHeight_offlineroomremark.style.height=this.$refs.BorderHeight_offlineroomremark.offsetHeight+'px'
				}
				//会场总备注
				if(this.offlineData.conference && this.offlineData.conference.length > 0){
					this.$refs.BorderHeight_offlineconferenceremark_left.style.height=this.$refs.BorderHeight_offlineconferenceremark.offsetHeight+'px'
					this.$refs.BorderHeight_offlineconferenceremark.style.height=this.$refs.BorderHeight_offlineconferenceremark.offsetHeight+'px'
				}
				//酒店内餐饮总备注
				if(this.offlineData.food && this.offlineData.food.length > 0){
					this.$refs.BorderHeight_offlinefoodremark_left.style.height=this.$refs.BorderHeight_offlinefoodremark.offsetHeight+'px'
					this.$refs.BorderHeight_offlinefoodremark.style.height=this.$refs.BorderHeight_offlinefoodremark.offsetHeight+'px'
				}
				//酒店外餐饮总备注
				if(this.offlineData.foodOutside && this.offlineData.foodOutside.length > 0){
					this.$refs.BorderHeight_offlinefoodoutremark_left.style.height=this.$refs.BorderHeight_offlinefoodoutremark.offsetHeight+'px'
					this.$refs.BorderHeight_offlinefoodoutremark.style.height=this.$refs.BorderHeight_offlinefoodoutremark.offsetHeight+'px'
				}
				//大交通总备注
				if(this.offlineData.transportation && this.offlineData.transportation.length > 0){
					this.$refs.BorderHeight_offlinetransportationremark_left.style.height=this.$refs.BorderHeight_offlinetransportationremark.offsetHeight+'px'
					this.$refs.BorderHeight_offlinetransportationremark.style.height=this.$refs.BorderHeight_offlinetransportationremark.offsetHeight+'px'
				}
				//地面交通总备注
				if(this.offlineData.car && this.offlineData.car.length > 0){
					this.$refs.BorderHeight_offlinecarremark_left.style.height=this.$refs.BorderHeight_offlinecarremark.offsetHeight+'px'
					this.$refs.BorderHeight_offlinecarremark.style.height=this.$refs.BorderHeight_offlinecarremark.offsetHeight+'px'
				}
				//其他服务总备注
				if(this.offlineData.other && this.offlineData.other.length > 0){
					this.$refs.BorderHeight_offlineotherremark_left.style.height=this.$refs.BorderHeight_offlineotherremark.offsetHeight+'px'
					this.$refs.BorderHeight_offlineotherremark.style.height=this.$refs.BorderHeight_offlineotherremark.offsetHeight+'px'
				}
				
				
			})
		},
		// 线下需求 日总价
		getDateTotalPrice(data, type) {
			return data && data.length
				? data.reduce((p, n) => {
						if (type === 1) return p + n.count * n.price;
						else if (type === 2) return p + n.total_price;
						else if (type === 3) return p + n.carcount * n.price;
						else return p;
				  }, 0)
				: 0;
		},
		// 获取线下报价信息
		summaryThanPrice() {
      this.requestApi({
        url: '/MeetingMa/SummaryThanPrice',
        method: 'POST',
        data: { InquirySheetID: this.$route.query.InquirySheetID },
      }).then(res => {
				if (res) {
					this.offlineData = res;
				}
			});
		},
		//左移
		leftMove() {
			var left_move = 0;
			if (this.$refs.table_move.offsetLeft < this.$refs.div_leftTop.offsetLeft) {
				if (this.$refs.div_leftTop.offsetLeft - this.$refs.table_move.offsetLeft < 150) {
					this.margin_l += this.$refs.div_leftTop.offsetLeft - this.$refs.table_move.offsetLeft;
					left_move = this.$refs.div_leftTop.offsetLeft - this.$refs.table_move.offsetLeft;
				} else {
					this.margin_l += 150;
					left_move = 150;
				}
				this.$refs.table_move.style.marginLeft = this.margin_l + 'px';
				this.$refs.table_head.style.left = this.$refs.table_head.offsetLeft + left_move + 'px';
			}
		},
		//右移
		rightMove() {
			var left_move = 0;
			if (this.$refs.table_move.offsetLeft > this.$refs.div_leftTop.offsetLeft - (this.$refs.table_move.offsetWidth - this.$refs.div_leftTop.offsetWidth)) {
				if (this.$refs.table_move.offsetLeft - (this.$refs.div_leftTop.offsetLeft - (this.$refs.table_move.offsetWidth - this.$refs.div_leftTop.offsetWidth)) < 150) {
					this.margin_l -=
						this.$refs.table_move.offsetLeft - (this.$refs.div_leftTop.offsetLeft - (this.$refs.table_move.offsetWidth - this.$refs.div_leftTop.offsetWidth));
					left_move = this.$refs.table_move.offsetLeft - (this.$refs.div_leftTop.offsetLeft - (this.$refs.table_move.offsetWidth - this.$refs.div_leftTop.offsetWidth));
				} else {
					this.margin_l -= 150;
					left_move = 150;
				}
				this.$refs.table_move.style.marginLeft = this.margin_l + 'px';
				this.$refs.table_head.style.left = this.$refs.table_head.offsetLeft - left_move + 'px';
			}
		},
		excelExport() {
			//导出excel
			if (this.command == 1) {
        this.requestApi({
          url: '/ExcelExport/ThanPriceExcelExport',
          method: 'POST',
          data: { InquirySheetID: this.$route.query.InquirySheetID },
        }).then(res => {
          console.log(res);
          window.location.href = res;
        });
			} else if (this.command == 2) {
        this.requestApi({
          url: '/ExcelExport/SummaryThanPriceExcelExport',
          method: 'POST',
          data: { InquirySheetID: this.$route.query.InquirySheetID },
        }).then(res => {
          console.log(res);
          window.location.href = res;
        });
			}
		},
		// 导出PDF
		pdfExport() {},
		room() {
			if(this.command == '1'){
        this.requestApi({
          url: '/MeetingMa/ThanPrice',
          method: 'POST',
          data: { InquirySheetID: this.$route.query.InquirySheetID },
        }).then(res => {
					this.tableData = res;
					this.hotelOrSupplier = this.tableData[0].service.service_hotel == 0 ? true : false; //true为酒店  false为服务商
					this.leftHeight()
				});
			}else{
        this.requestApi({
          url: '/MeetingMa/OfflineThanPrice',
          method: 'POST',
          data: { InquirySheetID: this.$route.query.InquirySheetID },
        }).then(res => {
					this.tableData = res;
					this.hotelOrSupplier = this.tableData[0].service.service_hotel == 0 ? true : false; //true为酒店  false为服务商
					this.leftHeight()
				});
			}
			
		},
		getMeetingList() {
      this.requestApi({
        url: '/MeetingMa/GetMeetingList',
        method: 'POST',
        data: { MeetingID: this.$route.query.eventId },
      }).then(res => {
        this.meeting = res;
        //console.log(res)
      });
		},
		getsheet() {
      this.requestApi({
        url: '/MeetingMa/GetInquirySheet',
        method: 'POST',
        data: { InquirySheetID: this.$route.query.InquirySheetID },
      }).then(res => {
					this.inquiry_sheet_code = res.inquiry_sheet.inquiry_sheet_code;
				});
		},
		conference() {
			this.$router.push({
				name: 'EventList',
				query: {}
			});
		},
		conferencedeatail() {
			this.$router.push({
				name: 'EventDetail',
				query: {
					id: this.$route.query.eventId,
					name: this.meeting.event_name,
					eventSearchType: this.$route.query.eventSearchType
				}
			});
		},
		inquiry() {
			this.$router.push({
				name: 'serviceDetails',
				query: {
					id: this.$route.query.eventId,
					sheetId: this.$route.query.InquirySheetID
				}
			});
		},
		goPage(url, query) {
			this.$router.push({ path: url, query });
		}
	}
};
</script>

<style lang="scss" scoped>
.all {
  background: #f8f8ff;
  /* min-height: 300vh; */
}

* {
  font-style: normal;
  word-wrap: break-word;
  word-break: keep-all;
}

.main {
  width: 1100px;
  height: 55px;
  margin: auto;

  margin-top: 15px;
}

.main ul {
  display: flex;
  line-height: 55px;
}

.main ul li {
  margin-left: 4px;
}

.content {
  width: 1100px;
  height: 55px;
  background: #626e95;
  margin: auto;
}

.content img {
  width: 30px;
  height: 30px;
  float: left;
  margin-top: 11px;
  margin-left: 15px;
}

.content span {
  line-height: 55px;
  font-size: 18px;
  color: #ffffff;
}

.nformation {
  width: 1100px;
  height: 50px;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  margin: auto;
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.nformation p {
  line-height: 50px;
}

.nformation p:nth-of-type(1) {
  font-weight: 600;
  font-size: 14px;
  color: #282828;
  margin-left: 15px;
}

.nformation p:nth-of-type(2) {
  font-size: 12px;
  color: #999999;
  font-weight: normal;
  margin-left: 6px;
}

.nformation p:nth-of-type(3) {
  font-weight: 600;
  font-size: 14px;
  color: #282828;
}

.information {
  width: 1100px;
  background: #ffffff;
  margin: auto;
  margin-bottom: 10px;
}

.information ul {
  margin-left: 20px;
  overflow: hidden;
}

.information ul li {
  line-height: 32px;
  font-size: 14px;
  margin-top: 10px;
  color: #777;
}

.information ul li:nth-of-type(1) {
  margin-top: 18px;
}

.information ul li:last-of-type {
  margin-bottom: 18px;
}

.service {
  width: 1100px;
  background: #ffffff;
  margin: auto;
  margin-top: 18px;
  margin-bottom: 10px;
}

.Confirm {
  width: 1100px;
  height: 185px;
  background: #edf7fd;
  border: 1px solid #aedcfa;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.06);
}

.b1 {
  width: 120px;
  height: 30px;
  color: #ffffff;
  border: none;
  background: #2896eb;
  margin-top: 35px;
  margin-left: 20px;
}

.Confirm button:nth-of-type(3) {
  width: 120px;
  height: 30px;
  border: 1px solid #2896eb;
  color: #2896eb;
  background: #edf7fd;
  margin-top: 35px;
  margin-left: 17px;
}

.blueness {
  width: 1000px;
  border-top: 1px dashed #aedcfa;
  margin-top: 15px;
  margin-left: 20px;
}

.inputs input {
  width: 650px;
  height: 30px;
  line-height: 30px;
  padding: 0 4px;
  background: #fff;
  border: 1px solid #aedcfa;
  border-radius: 2px;
  color: #282828;
  font-size: 14px;
  margin-top: 35px;
  margin-left: 20px;
  float: left;
}

.mark {
  width: 180px;
  height: 32px;
  float: left;
  background: #2896eb;
  margin-top: 35px;
  border: none;
  color: #ffffff;
  margin-left: 10px;
}

.gray {
  width: 1100px;
  height: 55px;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
}

.gray p {
  line-height: 55px;
  margin-left: 15px;
  font-weight: 600;
  font-size: 14px;
  color: #282828;
}

.six {
  width: 1100px;
  height: 70px;
  background: #ffffff;
  margin: auto;
  margin-top: -10px;
  margin-bottom: 10px;
}

.six ul {
  display: flex;
}

.six ul li {
  line-height: 70px;
}

.el-icon-close:before {
  content: '\e6db';
  position: absolute;
  margin-top: -14px;
  margin-left: -15px;
}

.el-dialog__title {
  line-height: 24px;
  font-size: 13px;
  color: #303133;
}

.contentd {
  float: left;
}

.black {
  width: 120px;
  height: 30px;
  position: absolute;
  margin-top: -23px;
  margin-left: 120px;
}

.el-input--prefix .el-input__inner {
  padding-left: 30px;
  width: 200px;
  height: 30px;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 206px;

  .el-input__suffix {
    top: -4px;
  }
}

.leave {
  width: 96%;
  height: 100px;
  margin-top: 40px;
}

.el-dialog--center .el-dialog__footer {
  text-align: inherit;
  margin-left: -20px;
}

.winning {
  margin-left: 96px;
}

.submit {
  width: 100px;
}

.top {
  width: 90%;
  height: 100px;
  margin-left: 11px;
}

.turn {
  margin-left: 11px;
}

.el-icon-time:before {
  content: '\e71f';
  position: absolute;
  margin-top: -5px;
  margin-left: -8px;
}

.cannot {
  margin-left: 294px;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  background-color: #fff;
  overflow-x: auto;
}

tr,
th,
td {
  border: 1px solid #e4e4e4;
}

tr {
  width: 2200px;
}

th {
  width: 200px;
}

td {
  width: 817px;
}

.hotel_pic {
  margin: 0 10px 0 0px;
  float: left;
}

.status_icon {
  float: right;
  margin-right: -20px;
}

.offer_detail,
.hot {
  color: #f91;
  font-weight: 600;
}

.offer_detail a {
  text-decoration: none;
  color: #2896eb;
}

.total {
  color: #282828;
}

.light {
  color: #a7a7a7;
}

.dark {
  color: #282828;
}

.ml_10 {
  color: #ccc;
  float: right;
  margin-right: 10px;
}

.price_sub_list {
  color: #787878;
}

.floatTr {
  position: relative;
  top: 0;
}

.floatTr th,
.floatTr td {
  background-color: #fff;
}

.left-arrow {
  position: fixed;
  background: rgba(1, 1, 1, 0.5);
  cursor: pointer;
  width: 60px;
  text-align: center;
  top: 50%;
  top: 353.709px;
  z-index: 9999;
}

.right-arrow {
  position: fixed;
  background: rgba(1, 1, 1, 0.5);
  cursor: pointer;
  width: 60px;
  text-align: center;
  top: 50%;
  margin-left: 1039.5px;
  top: 353.709px;
  z-index: 9999;
}

.star,
.address,
.contactName,
.contactEMail,
.contactPhone,
.link,
.need,
.roomPrice,
.repastPrice,
.tender-c,
.indate,
.cancel,
.operate,
.operatePage,
.purchase {
  padding: 12px 20px;
}

.star,
.address,
.contactName,
.contactEMail,
.contactPhone,
.link-detail {
  font-weight: normal;
}

.need {
  background: #fff5ea;
}

.purchase {
  height: 110px;
}

.go_offer_link {
  background: #09e;
  width: 130px;
  height: 30px;
  line-height: 30px;
  display: block;
  text-align: center;
  color: #fff;
}

.roomPrice-img {
  cursor: pointer;
  color: #282828;
  font-weight: 600;
}

.roomPrice-img:hover {
  color: #f91;
}

.repastPrice-img {
  cursor: pointer;
  color: #282828;
  font-weight: 600;
}

.repastPrice-img:hover {
  color: #f91;
}

.cancel-img {
  cursor: pointer;
  color: #282828;
  font-weight: 600;
}

.cancel-img:hover {
  color: #f91;
}

.view_detail {
  color: #2896eb;
}

.view_detail:hover {
  color: #f91;
}

.a-name {
  color: #282828;
}

.div-all {
  text-align: left;
  width: 1100px;
  margin: auto;
  overflow: hidden;
}

.table-all {
  color: #787878;
  font-size: 14px;
  border: 1px solid #e4e4e4;
  box-shadow: 0 0 2px #e4e4e4;
  width: 1100px;
}

.th-name {
  width: 200px;
  padding: 12px 20px;
  font-weight: normal;
  height: 87px;
}

.td-name {
  width: 817px;
  padding: 12px 20px;
}

.need-head {
  background: #fff5ea;
  font-size: 16px;
  color: #282828;
  font-weight: normal;
}

.purchase-head {
  font-size: 16px;
  color: #282828;
  font-weight: normal;
}

.td-upstep {
  width: 600px;
  padding: 12px 20px;
}

.img-top {
  width: 10px;
  height: 7px;
}

.img-bottom {
  width: 10px;
  height: 14px;
}

.room-tr {
  background-color: #fafafa;
}

.roomPrice-th {
  color: #282828;
  font-weight: normal;
}

.price-td {
  color: #282828;
}

.budget-price {
  font-weight: normal;
  height: 150px;
}

.repastPrice-th {
  font-weight: normal;
}

.repastPrice-th-price {
  color: #282828;
  font-weight: normal;
}

.img-name {
  width: 62px;
  height: 62px;
}

.th-width {
  width: 200px;
}

.table-head {
  position: absolute;
  top: 0px;
}

.head-div {
  width: 1100px;
  margin: auto;
  overflow: hidden;
}

.head-tr {
  z-index: 99999;
}

.left-div {
  position: absolute;
  width: 242px;
  margin: auto;
  z-index: 2000;
}

.table-left {
  color: #787878;
  font-size: 14px;
  border: 1px solid #e4e4e4;
  box-shadow: 0 0 2px #e4e4e4;
  text-align: left;
}

.star,
.address,
.contactName,
.contactPhone,
.contactEMail,
.link,
.roomPrice-th,
.repastPrice-img,
.repastPrice-th-price,
.tender-c,
.indate,
.cancel,
.operate {
  height: 20px;
}

.need {
  height: 40px;
}

.repastPrice-th {
  // height: 300px;
}

.operatePage {
  height: 40px;
}

.table-zindex {
  z-index: 2222;
  position: relative;
  top: 0;
  left: 0;
}

.div-head-ref {
  z-index: 3333;
}

.div-table-left {
  position: fixed;
  top: 0;
  z-index: 4444;
}
.excel {
  float: right;
  font-size: 14px;
  color: #ffffff;
  line-height: 55px;
  margin-right: 10px;
  cursor: pointer;
}
.row {
  display: flex;
  flex-direction: row;
}
.column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.h_350 {
  height: 350px;
}
.h_500 {
  height: 500px;
}
.h_40 {
  height: 40px !important;
}
@media only screen and (max-width: 1100px) {
  .main {
    width: 100%;
  }
  .content {
    width: 100%;
  }
  .nformation {
    width: 100%;
  }
  .information {
    width: 100%;
  }
  .div-all {
    width: 100%;
  }
  .table-all {
    width: 100%;
  }
  .right-arrow {
    right: 0;
  }
}
</style>
