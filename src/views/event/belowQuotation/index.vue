<template>
  <div class="content box">
    <div class="main">
      <ul>
        <!-- <li style="color:#0084e9;" @click="skip(EventList)">首页</li> -->
        <!-- <li style="color:#7c7f82;">></li> -->
        <li style="color: #0084e9; cursor: pointer" @click="$router.push({ name: 'eventList' })">
          我的会议
        </li>
        <li style="color: #7c7f82">></li>
        <li style="color: #0084e9; cursor: pointer" @click="$router.push({ name: 'eventDetail', query: $route.query })">
          {{ $route.query.name }}
        </li>
        <li style="color: #7c7f82">></li>
        <li style="color: #0084e9; cursor: pointer">线下报价填写</li>
        <li style="color: #0084e9; cursor: pointer"></li>
      </ul>
    </div>
    <div class="contentPrice">
      <img :src="require('@/assets/images/锁定.png')" alt />
      <span>线下报价填写</span>
      <!-- <a class="excel" @click="excelExport" style="cursor: pointer;">下载Excel</a> -->
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
          <span style="font-size: 12px; font-weight: bold">:</span>
          <span style="margin-left: 10px">{{ event_info.event_name }}</span>
        </li>
        <li>
          会议城市
          <span style="margin-left: 10px; color: #999999">City</span>
          <span style="font-size: 12px; font-weight: bold">:</span>
          <span style="margin-left: 10px">{{
            event_info.AbbreviationName
          }}</span>
        </li>
        <li>
          参会人数
          <span style="margin-left: 10px; color: #999999">Attendee NO.</span>
          <span style="font-size: 12px; font-weight: bold">:</span>
          <span style="margin-left: 10px">{{ event_info.attendee_no }}</span>
        </li>
        <li>
          会议开始日期
          <span style="margin-left: 10px; color: #999999">Start Date</span>
          <span style="font-size: 12px; font-weight: bold">:</span>
          <span style="margin-left: 10px">{{
            new Date(
              parseInt(event_info.event_startdate.substr(6, 13))
            ).toLocaleDateString()
          }}</span>
        </li>
        <li>
          会议结束日期
          <span style="margin-left: 10px; color: #999999">End Date</span>
          <span style="font-size: 12px; font-weight: bold">:</span>
          <span style="margin-left: 10px">{{
            new Date(
              parseInt(event_info.event_enddate.substr(6, 13))
            ).toLocaleDateString()
          }}</span>
        </li>
        <li>
          客户
          <span style="margin-left: 10px; color: #999999">Company</span>
          <span style="font-size: 12px; font-weight: bold">:</span>
          <span style="margin-left: 10px">{{ event_info.company_name }}</span>
        </li>
        <li>
          业务部门
          <span style="margin-left: 10px; color: #999999">Department:</span>
          <span style="margin-left: 10px">{{
            event_info.department_name
          }}</span>
        </li>
        <li>
          活动类型
          <span style="margin-left: 10px; color: #999999">Department:</span>
          <span style="margin-left: 10px">{{
            event_info.activity_type_name
          }}</span>
        </li>
      </ul>
    </div>

    <div class="header-select">
      <div class="note">
        <!-- *注释：只显示在填写采购需求中填写了YES的大项* -->
      </div>
      <div>
        <div>采购需求报价</div>
        <div>所有标红星内容都需要填写，如果这个内容是免费的，请填写“0”</div>
        <div>
          <span>专票还原税前：</span>
          <el-radio disabled v-model="event_info_configure.vat_reduction_pre_tax" :label="1">还原</el-radio>
          <el-radio disabled v-model="event_info_configure.vat_reduction_pre_tax" :label="0">不还原</el-radio>
        </div>
        <div>
          <span>服务费计算方式：</span>
          <el-radio disabled v-model="event_info_configure.service_fee_calculation_method" :label="0">分项计费</el-radio>
          <el-radio disabled v-model="event_info_configure.service_fee_calculation_method" :label="1">阶梯计费</el-radio>
        </div>
      </div>
    </div>
    <!-- 客房需求 -->
    <div v-if="offline_quoted_price_room.length > 0" class="title_item">
      <div class="flex_set">客房需求 Guest Rooms</div>
      <div class="flex_row justify_between">
        <div class="flex_set">
          <el-radio-group v-model="event_info_configure.room_inquiry_type" @change="roomTypeChange" disabled>
            <el-radio :label="0" :class="
                event_info_configure.room_inquiry_type == 0 ? 'isChecked' : ''
              ">线上询价</el-radio>
            <el-radio :label="1" :class="
                event_info_configure.room_inquiry_type == 1 ? 'isChecked' : ''
              ">手工填报</el-radio>
          </el-radio-group>
          <!-- <el-radio v-model="event_info_configure.room_inquiry_type" :label="0" :class="event_info_configure.room_inquiry_type==0?'isChecked':''">线上询价</el-radio>
					<el-radio v-model="event_info_configure.room_inquiry_type" :label="1" :class="event_info_configure.room_inquiry_type==1?'isChecked':''">手工填报</el-radio> -->
        </div>
        <!-- <div class="vat">
					<div>
						<span>*</span>VAT
						<el-input 
							v-model="event_info_configure.room_inquiry_taxrate" 
							@input="event_info_configure.room_inquiry_taxrate = formatNum(event_info_configure.room_inquiry_taxrate)" 
							size="mini">
						</el-input>%
					</div>
				</div> -->
        <div class="flex_set2">
          <el-checkbox disabled v-model="event_info_configure.room_inquiry_isnotservice" :class="
              event_info_configure.room_inquiry_isnotservice ? 'isChecked' : ''
            " @change="roomIsnotservice">计入服务费</el-checkbox>
        </div>
        <div class="vat">
          <div v-show="event_info_configure.service_fee_calculation_method == 0">
            <span>*</span>
            服务费
            <el-input :disabled="!event_info_configure.room_inquiry_isnotservice" v-model="event_info_configure.room_inquiry_service_taxrate" @input="
                event_info_configure.room_inquiry_service_taxrate = formatNum(
                  event_info_configure.room_inquiry_service_taxrate
                )
              " size="mini"></el-input>
            %
          </div>
        </div>
      </div>
    </div>
    <div v-show="
        offline_quoted_price_room.length > 0 &&
        event_info_configure.room_inquiry_type == 1
      ">
      <table v-for="(roomDate, roomDateIndex) in offline_quoted_price_room" :key="roomDateIndex">
        <thead>
          <tr class="color_1">
            <th class="topleft datecolor" colspan="4">
              日期: {{ roomDate.date.slice(0, 10) }}
              <el-button type="primary" size="small" class="copy" v-if="roomDateIndex != 0" @click="copyRoomDay(roomDateIndex)">复制上一天</el-button>
              <!-- <el-button type="primary" size="small" class="copy">复制上一天</el-button> -->
            </th>
            <th class="topleft">
              一天总金额 ￥{{
                positiveFloat(dayMoney(roomDate.room_list), true)
              }}
            </th>
          </tr>
          <tr class="color_2">
            <th>房型</th>
            <th>所需数量</th>
            <th><span class="color_red">*</span>酒店可提供数量</th>
            <th><span class="color_red">*</span>单价</th>
            <th>报价备注</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(roomItem, roomItemIndex) in roomDate.room_list" :key="roomItemIndex">
            <td>
              <template v-if="roomItem.inquiry_sheet_room_id != null">
                {{ roomItem.roomtypename }}
              </template>
              <!-- <input v-else type="text" v-model="roomItem.roomtypename" placeholder="请输入房型" /> -->
              <el-select @change="changeCostProject($event, roomItem)" v-else v-model="roomItem.roomtype" size="small" filterable>
                <el-option v-for="rc in roomcostProjects" v-show="rc.detail_type !== '0'" :label="rc.name" :value="rc.code" :key="rc.code"></el-option>
              </el-select>
            </td>
            <td>{{ roomItem.roomcount }}</td>
            <td>
              <el-input v-model="roomItem.provide_count" size="mini" @input="
                  roomItem.provide_count = formatNum(roomItem.provide_count, 3)
                " />
            </td>
            <td>
              <el-input v-model="roomItem.unitprice" size="mini" @input="roomItem.unitprice = formatNum(roomItem.unitprice, 2)" :class="{ difference: roomDifference(roomItem) }" />
            </td>
            <td>
              <el-input v-model="roomItem.remarks" size="mini" :class="{ room_line: !roomItem.inquiry_sheet_room_id }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" @click="delNewRoomType(roomDate, roomItemIndex)" v-if="!roomItem.inquiry_sheet_room_id"></el-button>
            </td>
          </tr>
          <tr>
            <td>其他要求</td>
            <td colspan="3">
              <template>
                {{ roomDate.room_list[0].otherrequirements }}
              </template>
            </td>
            <td style="text-align: center">
              <el-button type="text" size="mini" @click="addNewRoomType(roomDate.room_list)">添加新房型</el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total flex_row justify_between">
        <div>
          客房报价总备注：
          <input type="text" v-model="allQuoteInfo.room_remarks" placeholder="请备注您的客房优势" />
        </div>
        <div class="total_small">
          <div class="total_quotation">客房报价小计：</div>
          <div class="float-right">
            净价：<span class="color_red">￥{{ positiveFloat(allMoney, true) }}</span>
          </div>
          <div class="float-right">
            税费：<span class="color_red">￥{{ positiveFloat(taxMoney, true) }}</span>
          </div>
          <div class="float-right">
            税后：<span class="color_red">￥{{ positiveFloat(taxMoney + allMoney, true) }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 2021-10-20 复杂表单验证代码-->
    <!-- <table v-for="(item, key) in info.quoted_price_room" :key="key">
		  <thead>
			<tr class="color_1">
			  <th class="topleft" colspan="4">
				日期: {{ item.date | date_ex }}
				<el-button
				  type="warning"
				  size="small"
				  class="copy"
				  v-if="key != 0"
				  @click="copyRoomDay(key)"
				  >复制上一天</el-button
				>
			  </th>
			  <th class="topleft">
				一天总金额 ￥{{ dayMoney(item.room_list) }}
			  </th>
			</tr>
			<tr class="color_2">
			  <th>房型</th>
			  <th>所需数量</th>
			  <th>酒店可提供数量</th>
			  <th>报价备注</th>
			  <th>单价</th>
			</tr>
		  </thead>
		  <tbody>
			<tr v-for="(conferenceItem, key_c) in item.room_list" :key="`c_${key_c}`">
			  <td>
				<template v-if="conferenceItem.inquiry_sheet_room_id != ''">
				  {{ conferenceItem.roomtypename }}
				</template>
				<input
				  v-else
				  type="text"
				  v-model="conferenceItem.roomtypename"
				  placeholder="请输入房型"
				/>
			  </td>
			  <td>{{ conferenceItem.roomcount }}</td>
			  <td>
				<el-form-item :prop="`quoted_price_room.${key}.room_list.${key_c}.provide_count`" :rules="rules.IntegerNotMust">
				  <el-input type="number" v-model="conferenceItem.provide_count"  v-number-input placeholder="酒店可提供数量"></el-input>
				</el-form-item>
			  </td>
			  <td>
				 <el-form-item>
				  <el-input v-model="conferenceItem.remarks" placeholder="报价备注"></el-input>
				</el-form-item>
			  </td>
			  <td>
				<el-form-item :prop="`quoted_price_room.${key}.room_list.${key_c}.unitprice`" :rules="rules.IntegerNotMust">
				  <el-input type="number" v-model="conferenceItem.unitprice" placeholder="单价"></el-input>
				</el-form-item>
			  </td>
			</tr>
			<tr>
			  <td>其他要求</td>
			  <td colspan="3">{{ item.otherrequirements }}</td>
			  <td style="text-align: center">
				<el-button
				  type="text"
				  size="mini"
				  @click="addNewRoomType(item.room_list)"
				  >添加新房型</el-button
				>
			  </td>
			</tr>
		  </tbody>
		</table>
		<div class="total">
		  <div>
			客房报价总价: <span>￥{{ allMoney }}</span>
		  </div>
		  <div>
			客房报价总备注：<input
			  type="text"
			  v-model="info.room_remarks"
			  placeholder="请备注您的客房优势"
			/>
		  </div>
		</div> -->

    <!-- 会场需求 -->
    <div v-if="offline_quoted_price_conference.length > 0" class="title_item">
      <div class="flex_set">会场需求 Conference Rooms</div>
      <div class="flex_row justify_between">
        <div class="flex_set">
          <el-radio-group disabled v-model="event_info_configure.conference_inquiry_type" @change="conferenceTypeChange">
            <el-radio :label="0" :class="
                event_info_configure.conference_inquiry_type == 0
                  ? 'isChecked'
                  : ''
              ">线上询价</el-radio>
            <el-radio :label="1" :class="
                event_info_configure.conference_inquiry_type == 1
                  ? 'isChecked'
                  : ''
              ">手工填报</el-radio>
          </el-radio-group>
          <!-- <el-radio v-model="event_info_configure.conference_inquiry_type" :label="0" :class="event_info_configure.conference_inquiry_type==0?'isChecked':''">线上询价</el-radio>
					<el-radio v-model="event_info_configure.conference_inquiry_type" :label="1" :class="event_info_configure.conference_inquiry_type==1?'isChecked':''">手工填报</el-radio> -->
        </div>
        <!-- <div class="vat">
					<div>
						<span>*</span>
						VAT
						<el-input 
							v-model="event_info_configure.conference_inquiry_taxrate" 
							@input="event_info_configure.conference_inquiry_taxrate = formatNum(event_info_configure.conference_inquiry_taxrate)" 
							size="mini">
						</el-input>%
					</div>
				</div> -->
        <div class="flex_set2">
          <el-checkbox disabled v-model="event_info_configure.conference_inquiry_isnotservice" :class="
              event_info_configure.conference_inquiry_isnotservice
                ? 'isChecked'
                : ''
            " @change="conferenceIsnotservice">计入服务费</el-checkbox>
        </div>
        <div class="vat">
          <div v-if="event_info_configure.service_fee_calculation_method == 0">
            <span>*</span>
            服务费
            <el-input :disabled="!event_info_configure.conference_inquiry_isnotservice" v-model="event_info_configure.conference_inquiry_service_taxrate" @input="
                event_info_configure.conference_inquiry_service_taxrate =
                  formatNum(
                    event_info_configure.conference_inquiry_service_taxrate
                  )
              " size="mini"></el-input>
            %
          </div>
        </div>
      </div>
    </div>
    <div v-show="
        offline_quoted_price_conference.length > 0 &&
        event_info_configure.conference_inquiry_type == 1
      ">
      <table v-for="(
          conferenceDate, conferenceDateIndex
        ) in offline_quoted_price_conference" :key="conferenceDateIndex">
        <thead>
          <tr class="color_1">
            <th class="topleft datecolor" colspan="3">
              日期: {{ conferenceDate.date }}
            </th>
            <th class="topleft" colspan="2">
              一天总金额 ￥{{
                positiveFloat(
                  meetingDayMoney(conferenceDate.conference_list),
                  true
                )
              }}
            </th>
          </tr>
          <tr class="color_2">
            <th>项目</th>
            <th>需求</th>
            <th>需求备注</th>
            <th><span class="color_red">*</span>报价</th>
            <th>报价备注</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(
              conferenceItem, conferenceIndex
            ) in conferenceDate.conference_list" :key="conferenceIndex">
            <td>
              <template v-if="conferenceItem.type == 4">
                <el-select v-model="conferenceItem.quoted_code" @change="conferenceChange(conferenceItem)" placeholder="请选择">
                  <el-option v-for="option in addConferenceSelects" v-show="option.detail_type !== '0'" :key="option.code" :label="option.name" :value="option.code"></el-option>
                </el-select>
              </template>

              <template v-else>
                {{ conferenceItem.typename }}-{{ conferenceItem.date }}
                {{ conferenceItem.item }} {{ conferenceItem.order_name }} ({{
                  conferenceItem.roomsetuptypename
                }})
              </template>
            </td>
            <td>
              <!-- 场租 -->
              <div v-show="conferenceItem.type == 1">
                <p>
                  会场时间：{{ conferenceItem.starttime }} ~
                  {{ conferenceItem.endtime }}
                </p>
                <p>参与人数：{{ conferenceItem.attendees }}人，</p>
                <!-- 会场面积范围 -->
                <p>
                  会场面积：{{ conferenceItem.min_area }} ~
                  {{ conferenceItem.max_area }}
                </p>
              </div>
              <!-- 搭建 -->
              <div v-show="conferenceItem.type == 2">
                <p>摆台方式：{{ conferenceItem.roomsetuptypename }}</p>
                <p>
                  搭建时间：{{ conferenceItem.date.slice(0, 10) }}
                  {{ conferenceItem.starttime }} ~
                  {{ conferenceItem.date.slice(0, 10) }}
                  {{ conferenceItem.endtime }}
                </p>
              </div>

              <!-- 设备 -->
              <div v-show="conferenceItem.type == 3">
                {{ conferenceItem.equipment }}
              </div>

              <template v-if="conferenceItem.type == 4">
                <div>
                  数量：
                  <el-input-number v-model.number="conferenceItem.count" :controls="false" :precision="0" placeholder="请输入数量" :readonly="readonly" style="width: 50%">
                  </el-input-number>
                </div>
              </template>
            </td>
            <td>
              <template v-if="conferenceItem.type == 2">
                {{ conferenceItem.describe }}
              </template>
              <template v-if="conferenceItem.type == 3">
                {{ conferenceItem.microphonedescribe }}
              </template>
              <template v-if="conferenceItem.type == 4">
                <div>
                  单价： ￥
                  <el-input v-model="conferenceItem.price" @input="
                      conferenceItem.price = formatNum(conferenceItem.price, 2)
                    " style="width: 60%" />
                </div>
              </template>
            </td>
            <td>
              <template v-if="conferenceItem.type == 4">
                ￥
                {{
                  positiveFloat(
                    conferenceItem.price * conferenceItem.count,
                    true
                  )
                }}
              </template>
              <template v-else>
                <el-input v-model="conferenceItem.price" @input="
                    conferenceItem.price = formatNum(conferenceItem.price, 2)
                  " />
              </template>
            </td>
            <td>
              <div style="display: flex">
                <el-input v-model="conferenceItem.comments" />
                <span v-if="conferenceItem.type == 1" @click="
                    addConferenceOther(
                      conferenceDate,
                      conferenceItem,
                      conferenceIndex
                    )
                  " style="margin-left: 10px; color: #409eff; cursor: pointer">添加其他费用</span>
                <span v-if="conferenceItem.type == 4" @click="
                    delConferenceOther(
                      conferenceDate,
                      conferenceItem,
                      conferenceIndex
                    )
                  " style="
                    margin-left: 10px;
                    color: #409eff;
                    cursor: pointer;
                    line-height: 40px;
                    width: 50px;
                  ">删除</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total flex_row justify_between">
        <div>
          会场报价总备注：
          <input type="text" v-model="allQuoteInfo.conference_remarks" placeholder="您可以填写详细的报价备注" />
        </div>
        <div class="total_small">
          <div class="total_quotation">会场报价小计：</div>
          <div class="float-right">
            净价：<span class="color_red">￥{{ positiveFloat(meetingAllMoney, true) }}</span>
          </div>
          <div class="float-right">
            税费：<span class="color_red">￥{{ positiveFloat(meetingTaxMoney, true) }}</span>
          </div>
          <div class="float-right">
            税后：<span class="color_red">￥{{
                positiveFloat(meetingTaxMoney + meetingAllMoney, true)
              }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 酒店内餐饮需求 -->
    <div v-if="offline_quoted_price_hotel_food.length > 0" class="title_item">
      <div class="flex_set">酒店内餐饮需求 Hotel Food & Beverage</div>
      <div>餐标：{{ event_info.food_limit }}</div>
      <div class="flex_row justify_between">
        <div class="flex_set">
          <el-radio-group disabled v-model="event_info_configure.hotel_food_inquiry_type" @change="hotelFoodTypeChange">
            <el-radio :label="0" :class="
                event_info_configure.hotel_food_inquiry_type == 0
                  ? 'isChecked'
                  : ''
              ">线上询价</el-radio>
            <el-radio :label="1" :class="
                event_info_configure.hotel_food_inquiry_type == 1
                  ? 'isChecked'
                  : ''
              ">手工填报</el-radio>
          </el-radio-group>
          <!-- <el-radio v-model="event_info_configure.hotel_food_inquiry_type" :label="0" :class="event_info_configure.hotel_food_inquiry_type==0?'isChecked':''">线上询价</el-radio>
					<el-radio v-model="event_info_configure.hotel_food_inquiry_type" :label="1" :class="event_info_configure.hotel_food_inquiry_type==1?'isChecked':''">手工填报</el-radio> -->
        </div>
        <!-- <div class="vat">
					<div>
						<span>*</span>
						VAT
						<el-input 
							v-model="event_info_configure.hotel_food_inquiry_taxrate"
							@input="event_info_configure.hotel_food_inquiry_taxrate = formatNum(event_info_configure.hotel_food_inquiry_taxrate)" 
						  size="mini">
						</el-input>
						%
					</div>
				</div> -->
        <div class="flex_set2">
          <el-checkbox disabled v-model="event_info_configure.hotel_food_inquiry_isnotservice" :class="
              event_info_configure.hotel_food_inquiry_isnotservice
                ? 'isChecked'
                : ''
            " @change="hotelFoodIsnotservice">计入服务费</el-checkbox>
        </div>
        <div class="vat">
          <div v-if="event_info_configure.service_fee_calculation_method == 0">
            <span>*</span>
            服务费
            <el-input :disabled="!event_info_configure.hotel_food_inquiry_isnotservice" v-model="event_info_configure.hotel_food_inquiry_service_taxrate" size="mini">
            </el-input>%
          </div>
        </div>
      </div>
    </div>
    <div v-show="
        offline_quoted_price_hotel_food.length > 0 &&
        event_info_configure.hotel_food_inquiry_type == 1
      ">
      <table v-for="(
          hotelFoodDate, hotelFoodDateIndex
        ) in offline_quoted_price_hotel_food" :key="hotelFoodDateIndex">
        <thead>
          <tr class="color_1">
            <th class="topleft datecolor" colspan="3">
              日期: {{ hotelFoodDate.date.slice(0, 10) }}
            </th>
            <th class="topleft" colspan="2">
              一天总金额 ￥{{
                positiveFloat(repastDayMoney(hotelFoodDate.food_list), true)
              }}
            </th>
          </tr>
          <tr class="color_2">
            <th>项目</th>
            <th>人数/人次</th>
            <th>需求备注</th>
            <th><span class="color_red">*</span>单价（RMB/人）</th>
            <th>报价备注</th>
            <!-- <th>总价（¥）</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hotelFoodItem, hotelFoodIndex) in hotelFoodDate.food_list" :key="hotelFoodIndex">
            <td>
              {{ hotelFoodItem.foodtypename }}
            </td>
            <td>{{ hotelFoodItem.personcount }}</td>
            <td>{{ hotelFoodItem.comments }}</td>
            <td>
              <el-input type="text" v-model="hotelFoodItem.price" @input="hotelFoodItem.price = formatNum(hotelFoodItem.price, 2)" />
            </td>
            <td>
              <el-input v-model="hotelFoodItem.offer_remarks" placeholder="请注明餐厅名称或其他备注" />
              <!-- <el-input  placeholder="请填写针对这个项目的特殊备注" :readonly="readonly" /> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total flex_row justify_between">
        <div>
          酒店内餐饮总备注:
          <input type="text" v-model="allQuoteInfo.food_remarks" placeholder="您可以填写详细的报价备注" />
        </div>

        <div class="total_small">
          <div class="total_quotation">酒店内餐饮小计：</div>
          <div class="float-right">
            净价：<span class="color_red">￥{{ positiveFloat(repastAllMoney, true) }}</span>
          </div>
          <div class="float-right">
            税费：<span class="color_red">￥{{ positiveFloat(repastTaxMoney, true) }}</span>
          </div>
          <div class="float-right">
            税后：<span class="color_red">￥{{
                positiveFloat(repastTaxMoney + repastAllMoney, true)
              }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 酒店外餐饮需求 -->
    <div v-if="offline_quoted_price_others_food.length > 0" class="title_item">
      <div class="flex_set">酒店外餐饮需求 Others Food & Beverage</div>
      <div>餐标：{{ event_info.food_limit }}</div>
      <div class="flex_row justify_between">
        <div class="flex_set">
          <el-radio-group disabled v-model="event_info_configure.others_food_inquiry_type" @change="othersFoodTypeChange">
            <el-radio :label="0" :class="
                event_info_configure.others_food_inquiry_type == 0
                  ? 'isChecked'
                  : ''
              ">线上询价</el-radio>
            <el-radio :label="1" :class="
                event_info_configure.others_food_inquiry_type == 1
                  ? 'isChecked'
                  : ''
              ">手工填报</el-radio>
          </el-radio-group>
          <!-- <el-radio v-model="event_info_configure.others_food_inquiry_type" :label="0" :class="event_info_configure.others_food_inquiry_type==0?'isChecked':''">线上询价</el-radio>
					<el-radio v-model="event_info_configure.others_food_inquiry_type" :label="1" :class="event_info_configure.others_food_inquiry_type==1?'isChecked':''">手工填报</el-radio> -->
        </div>
        <!-- <div class="vat">
					<div>
						<span>*</span>
						VAT
						<el-input 
							v-model="event_info_configure.others_food_inquiry_taxrate" 
							@input="event_info_configure.others_food_inquiry_taxrate = formatNum(event_info_configure.others_food_inquiry_taxrate)" 
							size="mini"></el-input>
						%
					</div>
				</div> -->
        <div class="flex_set2">
          <el-checkbox disabled v-model="event_info_configure.others_food_inquiry_isnotservice" :class="
              event_info_configure.others_food_inquiry_isnotservice
                ? 'isChecked'
                : ''
            " @change="othersFoodIsnotservice">计入服务费</el-checkbox>
        </div>
        <div class="vat">
          <div v-if="event_info_configure.service_fee_calculation_method == 0">
            <span>*</span>
            服务费
            <el-input :disabled="!event_info_configure.others_food_inquiry_isnotservice" v-model="event_info_configure.others_food_inquiry_service_taxrate" size="mini">
            </el-input>%
          </div>
        </div>
      </div>
    </div>
    <div v-show="
        offline_quoted_price_others_food.length > 0 &&
        event_info_configure.others_food_inquiry_type == 1
      ">
      <table v-for="(
          othersFoodDate, othersFoodIndex
        ) in offline_quoted_price_others_food" :key="othersFoodIndex">
        <thead>
          <tr class="color_1">
            <th class="topleft datecolor" colspan="3">
              日期: {{ othersFoodDate.date.slice(0, 10) }}
            </th>
            <th class="topleft" colspan="2">
              一天总金额 ￥{{
                positiveFloat(otherFoodDayMoney(othersFoodDate.food_list), true)
              }}
            </th>
          </tr>
          <tr class="color_2">
            <th>项目</th>
            <th>用餐类型</th>
            <th>人数/人次</th>
            <th>需求备注</th>
            <th><span class="color_red">*</span>单价（RMB/人）</th>
            <th>报价备注</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(
              othersFoodItem, othersFoodIndex
            ) in othersFoodDate.food_list" :key="othersFoodIndex">
            <td>{{ othersFoodItem.foodtypename }}</td>
            <td>{{ othersFoodItem.usetypename }}</td>
            <td>{{ othersFoodItem.personcount }}</td>
            <td>{{ othersFoodItem.comments }}</td>
            <td>
              <el-input type="text" v-model="othersFoodItem.price" @input="
                  othersFoodItem.price = formatNum(othersFoodItem.price, 2)
                " />
            </td>
            <td>
              <el-input v-model="othersFoodItem.offer_remarks" placeholder="请注明餐厅名称或其他备注" />
              <!-- <el-input  placeholder="请填写针对这个项目的特殊备注" :readonly="readonly" /> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total flex_row justify_between">
        <div>
          酒店外餐饮总备注:
          <input type="text" v-model="allQuoteInfo.food_qutside_remarks" placeholder="您可以填写详细的报价备注" />
        </div>
        <div class="total_small">
          <div class="total_quotation">酒店外餐饮小计：</div>
          <div class="float-right">
            净价：<span class="color_red">￥{{ positiveFloat(otherFoodAllMoney, true) }}</span>
          </div>
          <div class="float-right">
            税费：<span class="color_red">￥{{ positiveFloat(otherFoodTaxMoney, true) }}</span>
          </div>
          <div class="float-right">
            税后：<span class="color_red">￥{{
                positiveFloat(otherFoodAllMoney + otherFoodTaxMoney, true)
              }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 大交通 -->
    <div v-if="offline_quoted_price_transportation.length > 0" class="title_item">
      <div class="flex_set">大交通 Tntegrated Traffic</div>
      <div class="flex_row justify_between">
        <div class="flex_set">
          <el-radio-group disabled v-model="event_info_configure.transportation_inquiry_type" @change="transportationTypeChange">
            <el-radio :label="0" :class="
                event_info_configure.transportation_inquiry_type == 0
                  ? 'isChecked'
                  : ''
              ">线上询价</el-radio>
            <el-radio :label="1" :class="
                event_info_configure.transportation_inquiry_type == 1
                  ? 'isChecked'
                  : ''
              ">手工填报</el-radio>
          </el-radio-group>
          <!-- <el-radio v-model="event_info_configure.transportation_inquiry_type" :label="0" :class="event_info_configure.transportation_inquiry_type==0?'isChecked':''">线上询价</el-radio>
					<el-radio v-model="event_info_configure.transportation_inquiry_type" :label="1" :class="event_info_configure.transportation_inquiry_type==1?'isChecked':''">手工填报</el-radio> -->
        </div>
        <!-- <div class="vat">
					<div>
						<span>*</span>
						VAT
						<el-input 
							v-model="event_info_configure.transportation_inquiry_taxrate"
							@input="event_info_configure.transportation_inquiry_taxrate = formatNum(event_info_configure.transportation_inquiry_taxrate)" 
							size="mini"></el-input>
						%
					</div>
				</div> -->
        <div class="flex_set2">
          <el-checkbox disabled v-model="event_info_configure.transportation_inquiry_isnotservice" :class="
              event_info_configure.transportation_inquiry_isnotservice
                ? 'isChecked'
                : ''
            " @change="transportationIsnotservice">计入服务费</el-checkbox>
        </div>
        <div class="vat">
          <div v-if="event_info_configure.service_fee_calculation_method == 0">
            <span>*</span>
            服务费
            <el-input :disabled="
                !event_info_configure.transportation_inquiry_isnotservice
              " v-model="
                event_info_configure.transportation_inquiry_service_taxrate
              " size="mini">
            </el-input>%
          </div>
        </div>
      </div>
    </div>
    <div v-show="
        offline_quoted_price_transportation.length > 0 &&
        event_info_configure.transportation_inquiry_type == 1
      ">
      <table v-for="(
          transportationDate, transportationDateindex
        ) in offline_quoted_price_transportation" :key="transportationDateindex">
        <thead>
          <tr class="color_1">
            <th class="topleft datecolor" colspan="4">
              日期: {{ transportationDate.date }}
            </th>
            <th class="topleft" colspan="2">
              一天总金额 ￥{{
                positiveFloat(
                  IntercityTransportationDayMoney(
                    transportationDate.transportation_list
                  ),
                  true
                )
              }}
            </th>
          </tr>
          <tr class="color_2">
            <th>项目</th>
            <th>需求</th>
            <th>需求备注</th>
            <th>人数</th>
            <th><span class="color_red">*</span>单价</th>
            <th>报价备注</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(
              transportationItem, transportationIndex
            ) in transportationDate.transportation_list" :key="transportationIndex">
            <td>
              <p>{{ transportationItem.transtypename }}</p>
              <p>
                {{ transportationItem.origincity }} -
                {{ transportationItem.destinationcity }}
              </p>
            </td>
            <td>
              <p>抵达时间：{{ transportationItem.arrivetime }}</p>
              <p>
                {{ transportationItem.seatclassesname }},
                {{ transportationItem.specialpricename }}
              </p>
            </td>
            <td>{{ transportationItem.requirement }}</td>
            <td>{{ transportationItem.passengercount }}</td>
            <td>
              <el-input v-model="transportationItem.unitprice" @input="
                  transportationItem.unitprice = formatNum(
                    transportationItem.unitprice,
                    2
                  )
                " />
            </td>
            <td>
              <el-input v-model="transportationItem.offerremarks" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total flex_row justify_between">
        <div>
          大交通总备注:
          <input type="text" v-model="allQuoteInfo.transportation_remarks" placeholder="您可以填写详细的报价备注" />
        </div>

        <div class="total_small">
          <div class="total_quotation">大交通小计：</div>
          <div class="float-right">
            净价：<span class="color_red">￥{{
                positiveFloat(IntercityTransportationAllMoney, true)
              }}</span>
          </div>
          <div class="float-right">
            税费：<span class="color_red">￥{{
                positiveFloat(IntercityTransportationTaxMoney, true)
              }}</span>
          </div>
          <div class="float-right">
            税后：<span class="color_red">￥{{
                positiveFloat(
                  IntercityTransportationTaxMoney +
                    IntercityTransportationAllMoney,
                  true
                )
              }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 地面交通 -->
    <div v-if="offline_quoted_price_car.length > 0" class="title_item">
      <div class="flex_set">地面交通 Ground Transportation</div>
      <div class="flex_row justify_between">
        <div class="flex_set">
          <el-radio-group disabled v-model="event_info_configure.car_inquiry_type" @change="carTypeChange">
            <el-radio :label="0" :class="
                event_info_configure.car_inquiry_type == 0 ? 'isChecked' : ''
              ">线上询价</el-radio>
            <el-radio :label="1" :class="
                event_info_configure.car_inquiry_type == 1 ? 'isChecked' : ''
              ">手工填报</el-radio>
          </el-radio-group>
          <!-- <el-radio v-model="event_info_configure.car_inquiry_type" :label="0" :class="event_info_configure.car_inquiry_type==0?'isChecked':''">线上询价</el-radio>
					<el-radio v-model="event_info_configure.car_inquiry_type" :label="1" :class="event_info_configure.car_inquiry_type==1?'isChecked':''">手工填报</el-radio> -->
        </div>
        <!-- <div class="vat">
					<div>
						<span>*</span>
						VAT
						<el-input
						  v-model="event_info_configure.car_inquiry_taxrate"
							@input="event_info_configure.car_inquiry_taxrate = formatNum(event_info_configure.car_inquiry_taxrate)" 
						 size="mini"></el-input>%
					</div>
				</div> -->
        <div class="flex_set2">
          <el-checkbox disabled v-model="event_info_configure.car_inquiry_isnotservice" :class="
              event_info_configure.car_inquiry_isnotservice ? 'isChecked' : ''
            " @change="carIsnotservice">计入服务费</el-checkbox>
        </div>
        <div class="vat">
          <div v-if="event_info_configure.service_fee_calculation_method == 0">
            <span>*</span>
            服务费
            <el-input :disabled="!event_info_configure.car_inquiry_isnotservice" v-model="event_info_configure.car_inquiry_service_taxrate" size="mini">
            </el-input>%
          </div>
        </div>
      </div>
    </div>
    <div v-show="
        offline_quoted_price_car.length > 0 &&
        event_info_configure.car_inquiry_type == 1
      ">
      <table v-for="(carDate, carDateIndex) in offline_quoted_price_car" :key="carDateIndex">
        <thead>
          <tr class="color_1">
            <th class="topleft datecolor" colspan="4">
              日期: {{ carDate.date.slice(0, 10) }}
            </th>
            <th class="topleft" colspan="2">
              一天总金额 ￥{{
                positiveFloat(CityDayMoney(carDate.car_list), true)
              }}
            </th>
          </tr>
          <tr class="color_2">
            <th>项目</th>
            <th>需求</th>
            <th>需求备注</th>
            <th>数量</th>
            <th><span class="color_red">*</span>单价</th>
            <th>报价备注</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(carItem, carIndex) in carDate.car_list" :key="carIndex">
            <td>{{ carItem.purposename }}</td>
            <td>
              <p v-if="carItem.vehicletypename">
                用车类型： {{ carItem.vehicletypename }}
              </p>
              <p v-if="carItem.vehiclecount > 0">
                搭乘人数： {{ carItem.vehiclecount }} 人
              </p>
              <p v-if="carItem.city">用车城市： {{ carItem.city }}</p>
            </td>
            <td>{{ carItem.explain }}</td>
            <td>{{ carItem.carcount }}</td>
            <td>
              <el-input v-model="carItem.price" @input="carItem.price = formatNum(carItem.price, 2)" />
            </td>
            <td>
              <el-input v-model="carItem.offer_remarks" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total flex_row justify_between">
        <div>
          地面交通总备注:
          <input type="text" v-model="allQuoteInfo.car_remarks" placeholder="您可以填写详细的报价备注" />
        </div>
        <div class="total_small">
          <div class="total_quotation">地面交通小计：</div>
          <div class="float-right">
            净价：<span class="color_red">￥{{ positiveFloat(CityAllMoney) }}</span>
          </div>
          <div class="float-right">
            税费：<span class="color_red">￥{{ positiveFloat(CityTaxMoney) }}</span>
          </div>
          <div class="float-right">
            税后：<span class="color_red">￥{{ positiveFloat(CityAllMoney + CityTaxMoney) }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 其他服务 -->
    <div v-if="offline_quoted_price_others.length > 0" class="title_item">
      <div class="flex_set">其他服务 Other</div>
      <div class="flex_row justify_between">
        <div class="flex_set">
          <el-radio-group disabled v-model="event_info_configure.other_inquiry_type" @change="otherTypeChange">
            <el-radio :label="0" :class="
                event_info_configure.other_inquiry_type == 0 ? 'isChecked' : ''
              ">线上询价</el-radio>
            <el-radio :label="1" :class="
                event_info_configure.other_inquiry_type == 1 ? 'isChecked' : ''
              ">手工填报</el-radio>
          </el-radio-group>
          <!-- <el-radio v-model="event_info_configure.other_inquiry_type" :label="0" :class="event_info_configure.other_inquiry_type==0?'isChecked':''">线上询价</el-radio>
					<el-radio v-model="event_info_configure.other_inquiry_type" :label="1" :class="event_info_configure.other_inquiry_type==1?'isChecked':''">手工填报</el-radio> -->
        </div>
        <!-- <div class="vat">
					<div>
						<span>*</span>
						VAT
						<el-input v-model="event_info_configure.other_inquiry_taxrate" size="mini"></el-input>
						%
					</div>
				</div> -->
      </div>
    </div>
    <div v-show="
        offline_quoted_price_others.length > 0 &&
        event_info_configure.other_inquiry_type == 1
      ">
      <table>
        <thead>
          <tr class="color_2">
            <th>项目</th>
            <th>需求备注</th>
            <th>数量</th>
            <th><span class="color_red">*</span>单价</th>
            <th>报价备注</th>
            <th>服务费</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(otherItem, otherIndex) in offline_quoted_price_others" :key="otherIndex">
            <td>
              <template v-if="!otherItem.inquiry_sheet_other_id">
                <el-select v-model="otherItem.other_code" clearable size="small" style="width: 200px" @change="addOtherChange(otherItem)">
                  <el-option v-for="option in addOtherSelects" :key="option.code" :label="option.name" :value="option.code"></el-option>
                </el-select>
              </template>
              <span v-else>{{ otherItem.servicetypename }}</span>
            </td>

            <td>
              <template v-if="!otherItem.inquiry_sheet_other_id">
                <el-select v-show="
                    ['009-5', '009-6', '009-7', '009-11', '009-12'].includes(
                      otherItem.other_code
                    )
                  " v-model="otherItem.two_level_code" clearable size="small" style="width: 200px">
                  <el-option v-for="two_level_option in otherItem.detail" :key="two_level_option.code" :label="two_level_option.name" :value="two_level_option.code"></el-option>
                </el-select>
              </template>
              <span v-else>{{ otherItem.describe }}</span>
            </td>

            <td>
              <template v-if="!otherItem.inquiry_sheet_other_id">
                <el-input v-model="otherItem.offerparticipatecount" class="line" @input="
                    otherItem.offerparticipatecount = formatNum(
                      otherItem.offerparticipatecount,
                      1
                    )
                  " :disabled="otherItem.inquiry_sheet_other_id != null" />
              </template>
              <span v-else>
                {{ otherItem.offerparticipatecount }}
              </span>
            </td>

            <td>
              <el-input type="text" v-model="otherItem.price" @input="otherItem.price = formatNum(otherItem.price, 2)" />
            </td>
            <td>
              <el-input v-model="otherItem.offer_remarks" />
            </td>
            <td>
              <div class="td_flex">
                <div class="flex_set2">
                  <el-checkbox :disabled="otherItem.other_code != '009-12'" :true-label="1" :false-label="0" v-model="otherItem.isnotservice" @change="otherIsnotservice(otherItem, otherIndex)">计入服务费</el-checkbox>
                  <span v-if="!otherItem.inquiry_sheet_other_id" @click="delOther(otherItem, otherIndex)" style="margin-left: 10px; color: #409eff; cursor: pointer">删除</span>
                </div>
                <div class="vat">
                  <div v-if="
                      event_info_configure.service_fee_calculation_method == 0
                    ">
                    <span class="color_red">*</span>
                    <el-input :disabled="!otherItem.isnotservice" v-model="otherItem.service_taxrate" size="mini"></el-input>
                    %
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td :colspan="4">其他需求备注：</td>
            <td :colspan="2">
              <span @click="addOther()" style="margin-left: 10px; color: #409eff; cursor: pointer">
                添加其他服务
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total flex_row justify_between">
        <div>
          其他服务总备注:
          <input v-model="allQuoteInfo.other_remarks" placeholder="您可以填写详细的报价备注" />
        </div>
        <div class="total_small">
          <div class="total_quotation">其他服务小计：</div>
          <div class="float-right">
            净价：<span class="color_red">￥{{ positiveFloat(otherAllMoney) }}</span>
          </div>
          <div class="float-right">
            税费：<span class="color_red">￥{{ positiveFloat(otherTaxMoney) }}</span>
          </div>
          <div class="float-right">
            税后：<span class="color_red">￥ {{ positiveFloat(otherAllMoney + otherTaxMoney) }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 服务费 -->
    <div class="title_item">
      <div class="flex_set">服务费 Conference Rooms</div>
      <div class="flex_set"></div>
      <!-- <div class="vat">
				<div>
					<span>*</span>
					VAT
					<el-input v-model="event_info_configure.service_taxrate" size="mini"></el-input>
					%
				</div>
			</div> -->
    </div>
    <div>
      <table>
        <thead>
          <tr class="color_2">
            <th colspan="2">服务费</th>
            <th>金额</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="event_info_configure.service_fee_calculation_method == 0">
            <tr>
              <td colspan="2">
                <p>分项服务费计算：</p>
                <p>
                  <!-- 客房服务费 -->
                  <span v-show="event_info_configure.room_inquiry_isnotservice">
                    {{ positiveFloat(allMoney) }}*{{
                      event_info_configure.room_inquiry_service_taxrate
                    }}%
                  </span>
                  <!-- 会场服务费 -->
                  <span v-show="
                      event_info_configure.conference_inquiry_isnotservice
                    ">
                    + {{ positiveFloat(meetingAllMoney) }}*{{
                      event_info_configure.conference_inquiry_service_taxrate
                    }}%
                  </span>
                  <!-- 酒店内餐饮服务费 -->
                  <span v-show="
                      event_info_configure.hotel_food_inquiry_isnotservice
                    ">
                    + {{ positiveFloat(repastAllMoney) }}*{{
                      event_info_configure.hotel_food_inquiry_service_taxrate
                    }}%
                  </span>
                  <!-- 酒店外餐饮服务费 -->
                  <span v-show="
                      event_info_configure.others_food_inquiry_isnotservice
                    ">
                    + {{ positiveFloat(otherFoodAllMoney) }}*{{
                      event_info_configure.others_food_inquiry_service_taxrate
                    }}%
                  </span>
                  <!-- 大交通服务费 -->
                  <span v-show="
                      event_info_configure.transportation_inquiry_isnotservice
                    ">
                    + {{ positiveFloat(IntercityTransportationAllMoney) }}*{{
                      event_info_configure.transportation_inquiry_service_taxrate
                    }}%
                  </span>
                  <!-- 地面交通服务费 -->
                  <span v-show="event_info_configure.car_inquiry_isnotservice">
                    + {{ positiveFloat(CityAllMoney) }}*{{
                      event_info_configure.car_inquiry_service_taxrate
                    }}%
                  </span>
                  <!-- 其他服务费 -->
                  <span v-for="(otherItem, index) in offline_quoted_price_others" :key="index">
                    <span v-show="otherItem.isnotservice">
                      +
                      {{ otherItem.offerparticipatecount * otherItem.price }} *
                      {{ otherItem.service_taxrate }}%
                    </span>
                  </span>
                </p>
              </td>
              <td>
                ￥{{
                  positiveFloat(
                    serveAllMoney -
                      (allQuoteInfo.advance_amount *
                        allQuoteInfo.advance_proportion) /
                        100
                  )
                }}
              </td>
            </tr>
          </template>
          <template v-if="event_info_configure.service_fee_calculation_method == 1">
            <tr v-for="(item, index) in event_info_ladder_taxrates" :key="index">
              <td colspan="2">
                <span>阶梯{{ index + 1 }}：</span>
                <el-input :readonly="index == 0" :disabled="event_info_configure.servicecanedit === 0" type="text" class="line" style="width: 100px" v-model="item.ladder_min" @input="item.ladder_min = formatNum(item.ladder_min)" placeholder="" />
                ~
                <el-input :disabled="event_info_configure.servicecanedit === 0" type="text" class="line" style="width: 100px" placeholder="" v-model="item.ladder_max" @input="item.ladder_max = formatNum(item.ladder_max)" />
                *
                <el-input class="line" v-model="item.ladder_taxrate" @input="item.ladder_taxrate = formatNum(item.ladder_taxrate)" :disabled="event_info_configure.servicecanedit === 0" />
                % (请输入阶梯金额范围和服务费比例)
                <!-- <el-button type="text" @click="addLadder()">添加阶梯</el-button>
								<el-button type="text" v-if="index!=0" @click="delLadder(index)">删除</el-button> -->
              </td>
              <td>￥{{ positiveFloat(severEveryMoneyList[index]) }}</td>
            </tr>
          </template>
          <template v-if="event_info_configure.service_fee_calculation_method == 2">
            <td colspan="2">
              {{ serviceTotalMoney }} * {{ grade_taxrate }}%
              <span v-if="event_info_configure.service_fee_ratio">
                *
                <el-input class="line" size="mini" v-model="allQuoteInfo.fzc_service" />
                %
              </span>
            </td>
            <td>
              <span v-if="
                  event_info_configure.minimum_service_fee == 1 &&
                  allQuoteInfo.feizhicai_service <=
                    event_info_configure.minimum_service_fee_money
                ">
                ￥
                {{
                  positiveFloat(event_info_configure.minimum_service_fee_money)
                }}
              </span>
              <span v-else>￥{{
                  positiveFloat(
                    (((grade_taxrate * serviceTotalMoney) / 100) *
                      allQuoteInfo.fzc_service) /
                      100
                  )
                }}</span>
            </td>
          </template>

          <tr v-if="allQuoteInfo.zhicai_service == 1">
            <td colspan="2">
              <div style="display: flex">
                <p style="width: 30%">直采服务费</p>
                <div>
                  <p v-for="(
                      item, index
                    ) in allQuoteInfo.event_quoted_price_zhicai_service" :key="index" style="
                      display: flex;
                      justify-content: space-between;
                      margin: 10px 0;
                      line-height: 32px;
                    ">
                    <span> {{ item.grade_name }} </span>
                    <span style="margin: 0 30px">￥ {{ item.grade_price }}
                    </span>
                    <span>
                      *
                      <el-input type="number" size="small" style="width: 100px" v-model.number="item.grade_count" @input="
                          item.grade_count = positiveFloatOne(item.grade_count)
                        " placeholder="请输入数量">
                      </el-input>
                      <!-- <el-input-number v-model.number="item.grade_count" :controls="false" :precision="1" placeholder="请输入数量" style="width: 50%;"></el-input-number> -->
                    </span>
                  </p>
                </div>
              </div>
            </td>
            <td>￥{{ positiveFloat(baierSeversMoney) }}</td>
          </tr>
          <tr v-else>
            <td colspan="2">
              <span>直采服务费</span>
              <el-input type="text" class="line" style="width: 170px" v-model="allQuoteInfo.advance_amount" @input="
                  allQuoteInfo.advance_amount = formatNum(
                    allQuoteInfo.advance_amount
                  )
                " />
              *
              <el-input class="line" v-model="allQuoteInfo.advance_proportion" @input="
                  allQuoteInfo.advance_proportion = formatNum(
                    allQuoteInfo.advance_proportion
                  )
                " />%
            </td>
            <td>
              ￥{{
                (
                  (allQuoteInfo.advance_amount *
                    allQuoteInfo.advance_proportion) /
                  100
                ).toFixed(2)
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total flex_row justify_between">
        <div class="total_small">
          <div class="total_quotation">服务费小计：</div>
          <div class="float-right">
            净价：<span class="color_red">￥{{ positiveFloat(serveAllMoney) }}</span>
          </div>
          <div class="float-right">
            税费：<span class="color_red">￥{{ positiveFloat(serveTaxMoney) }}</span>
          </div>
          <div class="float-right">
            税后：<span class="color_red">￥{{ positiveFloat(serveAllMoney + serveTaxMoney) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="title_item">税费</div>
    <div class="section">
      <table>
        <thead>
          <tr class="color_2">
            <th>税费</th>
            <th>金额</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              汇总税费：（
              <!-- {{positiveFloat(taxMoney)}} + {{positiveFloat(meetingTaxMoney)}} + {{positiveFloat(repastTaxMoney)}} + {{positiveFloat(otherFoodTaxMoney)}}
							+ {{positiveFloat(IntercityTransportationTaxMoney)}} + {{positiveFloat(CityTaxMoney)}} + {{positiveFloat(otherTaxMoney)}} + {{positiveFloat(serveTaxMoney)}} -->
              {{ positiveFloat(netPriceAllMoney) }} +
              {{
                positiveFloat(
                  serveAllMoney -
                    (event_info_configure.fzc_service_fee_money == 0
                      ? allQuoteInfo.feizhicai_service
                      : 0)
                )
              }}) ）*
              <el-input class="line" size="mini" v-model="allQuoteInfo.taxrate" @input="allQuoteInfo.taxrate = formatNum(allQuoteInfo.taxrate)" @change="taxrateChange" :disabled="event_info_configure.vatcanedit == 0" />
              %
            </td>
            <td>
              税费小计：<span style="color: #f00; font-weight: bold">￥{{ positiveFloat(taxesAllMoney) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <div class="total_price">
        <div class="total_quotation">报价合计：</div>
        <div class="float-right">
          净价总计：
          <span class="color_red">
            ￥{{ positiveFloat(netPriceAllMoney) }}
          </span>
        </div>
        <div class="float-right">
          服务费总计：<span class="color_red">￥{{ positiveFloat(serveAllMoney) }}</span>
        </div>
        <div class="float-right">
          税费总计：
          <span class="color_red"> ￥{{ positiveFloat(taxesAllMoney) }} </span>
        </div>
        <div class="float-right">
          总报价：
          <span class="color_red" style="font-weight: 700; font-size: 22px">
            ￥{{
              positiveFloat(netPriceAllMoney) +
              positiveFloat(serveAllMoney) +
              positiveFloat(taxesAllMoney)
            }}
          </span>
        </div>
      </div>

      <div class="section btn_sec">
        <!-- <el-button type="primary" v-show="event_info.event_type != '0010-10'" class="btn" @click="submit(1)">更新报价</el-button> -->
        <el-button type="primary" v-show="event_info.event_type != '0010-10'" class="btn" @click="submit(2)">提交报价</el-button>
        <el-button class="btn" @click="cancel">取消</el-button>
        <!-- <el-button v-show="event_info.event_type != '0010-10'" class="btn" @click="clearOnlineOffer" >清空线下报价</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { guid, positiveInteger, positiveFloatSix, positiveFloat, positiveFloatOne, formatDate, formatNum } from '@/utils/common'
export default {
  data() {
    return {
      isopen: true,
      readonly: true,
      restore: '1',
      online: '1',
      checked: true,
      vat: 6,
      fee: 0,
      event_quoted_price_id: '', // 报价单ID
      addConferenceSelects: [], // 会场新增下拉选项
      demandList: [], // 其他新增下拉选项
      errormsg: [], //异常信息, 保存时使用
      foodlimitwarningmsg: [], //超出餐标警告信息
      foodOutsidelimitwarningmsg: [], // 酒店外
      warningmsg: '', //警告信息
      addOtherSelects: [],
      addRoomList: [], // 添加新房型数组
      severEveryMoneyList: [], // 服务费、各阶梯计费总价
      grade_taxrate: 0, // 跳档服务费收取比例
      serviceTotalMoney: 0, // 计入服务费总净价
      //会议基本信息
      event_info: {
        event_name: '', // 会议名称
        AbbreviationName: '', // 会议城市
        attendee_no: '', // 参会人数
        event_startdate: '', // 会议开始日期
        event_enddate: '', // 会议结束日期
        company_name: '', // 客户名称
        department_name: '', //业务部门
        activity_type_name: '', // 活动类型
        event_type: '', // 会议状态
        food_limit: '' // 餐标
      },
      // 各项需求配置
      event_info_configure: {
        TableName: '',
        id: '',
        event_info_id: '',
        vat_reduction_pre_tax: 1, // 专票还原税前：还原、不还原
        service_fee_calculation_method: 0, // 服务费计算方式：分项计费、阶梯计费

        room_inquiry_type: 0, // 客房需求：线上询价0、手工填报1
        room_inquiry_taxrate: 6, // 客房需求：VAT
        room_inquiry_isnotservice: true, // 客房需求：计入服务费
        room_inquiry_service_taxrate: 0, // 客房需求：服务费

        conference_inquiry_type: 0, // 会场需求：线上询价0、手工填报1
        conference_inquiry_taxrate: 6, // 会场需求：VAT
        conference_inquiry_isnotservice: true, // 会场需求：计入服务费
        conference_inquiry_service_taxrate: 0, // 会场需求：服务费

        hotel_food_inquiry_type: 0, // 酒店内餐饮需求：线上询价0、手工填报1
        hotel_food_inquiry_taxrate: 6, // 酒店内餐饮需求：VAT
        hotel_food_inquiry_isnotservice: true, // 酒店内餐饮需求：计入服务费
        hotel_food_inquiry_service_taxrate: 0, // 酒店内餐饮需求：服务费

        others_food_inquiry_type: 0, // 酒店外餐饮需求：线上询价0、手工填报1
        others_food_inquiry_taxrate: 6, // 酒店外餐饮需求：VAT
        others_food_inquiry_isnotservice: true, // 酒店外餐饮需求：计入服务费
        others_food_inquiry_service_taxrate: 0, // 酒店外餐饮需求：服务费

        transportation_inquiry_type: 0, // 大交通：线上询价0、手工填报1
        transportation_inquiry_taxrate: 6, // 大交通：VAT
        transportation_inquiry_isnotservice: true, // 大交通：计入服务费
        transportation_inquiry_service_taxrate: 0, // 大交通：服务费

        car_inquiry_type: 0, // 地面交通：线上询价0、手工填报1
        car_inquiry_taxrate: 6, // 地面交通：VAT
        car_inquiry_isnotservice: true, // 地面交通：计入服务费
        car_inquiry_service_taxrate: 0, // 地面交通：服务费

        other_inquiry_type: 0, // 其他服务：线上询价0、手工填报1
        other_inquiry_taxrate: 6, // 其他服务：VAT

        service_taxrate: 6 // 服务费: VAT
      },
      offline_quoted_price_room: [], // 客房需求
      offline_quoted_price_conference: [], // 会场需求
      offline_quoted_price_hotel_food: [], // 酒店内餐饮需求
      offline_quoted_price_others_food: [], // 酒店外餐饮需求
      offline_quoted_price_transportation: [], // 大交通需求
      offline_quoted_price_car: [], // 地面交通
      offline_quoted_price_others: [], // 其他服务
      event_info_ladder_taxrates: [], // 阶梯费率
      allQuoteInfo: {
        TableName: '',
        event_info: {},
        event_info_configure: {},
        event_info_ladder_taxrates: [], // 阶梯费率
        offline_quoted_price_room: [], // 客房需求
        offline_quoted_price_conference: [], // 会场需求
        offline_quoted_price_hotel_food: [], // 酒店内餐饮需求
        offline_quoted_price_others_food: [], // 酒店外餐饮需求
        offline_quoted_price_transportation: [], // 大交通需求
        offline_quoted_price_car: [], // 地面交通
        offline_quoted_price_others: [], // 其他服务
        id: '',
        onlineoroffline: '',
        event_info_id: '',
        inquiry_sheet_object_id: '',
        hotel_id: '',
        bidder: '',
        room_remarks: '',
        conference_remarks: '',
        food_remarks: '',
        transportation_remarks: '',
        car_remarks: '',
        other_remarks: '',
        travelagency_payment_money: '',
        travelagency_payment_proportion: '',
        advance_amount: '',
        advance_proportion: '',
        off_hotel_expenses: '',
        off_hotel_proportion: '',
        taxtype: '',
        taxrate: '',
        total_price: '',
        offer_data: '',
        offer_remarks: '',
        status: '',
        total_amount: '',
        quotationfile_url: '',
        roomtaxid: '',
        transportationtaxid: '',
        othertaxid: '',
        conferencetaxid: '',
        foodtaxid: '',
        cartaxid: '',
        quotationenddate: '',
        receptionistid: '',
        feizhicai_service: 0,
        taxation: 0
      },
      roomcostProjects: []
    }
  },
  components: {},
  mounted() {
    this.requestApi({
      url: '/orderform/GetdictionaryList',
      method: 'post',
      data: { code: '0034' }
    }).then(res => {
      this.roomcostProjects = res
    })
    this.OfflineQuotedPriceInfo()
    this.getDemandList()
  },
  computed: {
    formateDate: () => {
      return function(value) {
        return formatDate('YYYY年mm月dd日', new Date(value))
      }
    },
    //未填写单价、报价提示内容
    adddifferenceerrormsg: () => {
      return function(type, date, rowIndex) {
        let message = ''
        if (type == 1) message = this.formateDate(date) + '客房,第' + rowIndex + '行,单价未填写,请填写单价'
        else if (type == 2) message = this.formateDate(date) + '会场,第' + rowIndex + '行,报价未填写,请填写报价'
        else if (type == 3) message = this.formateDate(date) + '酒店内餐饮,第' + rowIndex + '行,单价未填写,请填写单价'
        else if (type == 4) message = this.formateDate(date) + '酒店外餐饮,第' + rowIndex + '行,单价未填写,请填写单价'
        else if (type == 5) message = this.formateDate(date) + '大交通,第' + rowIndex + '单价未填写,请填写单价'
        else if (type == 6) message = this.formateDate(date) + '地面交通,第' + rowIndex + '行,单价未填写,请填写单价'
        else if (type == 7) message = '其他服务,第' + rowIndex + '行,单价未填写,请填写单价'
        this.errormsg.push(message)
      }
    },
    addnewitemerrormsg: () => {
      return function(type, date, rowIndex) {
        let message = ''
        if (type == 1) message = this.formateDate(date) + '新增客房,第' + rowIndex + '行,消费项目名称为必填项,请填写房型'
        else if (type == 2) message = this.formateDate(date) + '新增会场,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称'
        else if (type == 3) message = this.formateDate(date) + '新增餐饮,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称'
        else if (type == 4) message = this.formateDate(date) + '新增大交通,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称'
        else if (type == 5) message = this.formateDate(date) + '新增地面交通,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称'
        this.errormsg.push(message)
      }
    },
    //酒店内超过餐标警告提示
    addfoodlimiterrormsg: () => {
      return function(type, date, rowIndex) {
        let message = ''
        if (type == 3) message = this.formateDate(date) + '酒店内餐饮,第' + rowIndex + '行,超过餐标'
        this.foodlimitwarningmsg.push(message)
      }
    },
    //酒店外超过餐标警告提示
    addfoodOutsidelimiterrormsg: () => {
      return function(type, date, rowIndex) {
        let message = ''
        if (type == 3) message = this.formateDate(date) + '酒店外餐饮,第' + rowIndex + '行,超过餐标'
        this.foodOutsidelimitwarningmsg.push(message)
      }
    },
    // 客房一天总金额
    dayMoney: () => {
      return function(list) {
        let money = 0
        list.forEach(item => {
          let pc = 0
          if (item.provide_count < 0) {
            pc = Number(item.provide_count)
          } else {
            pc = this.positiveInteger(item.provide_count)
          }
          money += pc * positiveFloatSix(item.unitprice)
        })
        return positiveFloatSix(money)
      }
    },
    // 客房所有总价
    allMoney: function() {
      let money = 0
      if (this.offline_quoted_price_room && this.offline_quoted_price_room.length > 0) {
        this.offline_quoted_price_room.forEach(item => {
          money += this.positiveFloatSix(this.dayMoney(item.room_list))
        })
      }

      return this.positiveFloatSix(money)
    },
    // 客房税费
    taxMoney: function() {
      let money = 0
      money = this.allMoney * (this.event_info_configure.room_inquiry_taxrate / 100)
      return this.positiveFloatSix(money)
    },
    //客房差异标记
    roomProvideCountDifference: () => {
      return function(item) {
        return positiveInteger(item.provide_count) < positiveInteger(item.roomcount)
      }
    },
    //客房价格验证标记
    roomDifference: () => {
      return function(item) {
        return item.unitprice === ''
      }
    },
    //保存时验证客房数据
    checkRoomDifference: function() {
      let difference = false
      if (this.offline_quoted_price_room && this.offline_quoted_price_room.length > 0) {
        this.offline_quoted_price_room.forEach(item => {
          if (item.room_list && item.room_list.length > 0) {
            item.room_list.forEach((room, row_index) => {
              difference = this.roomDifference(room)
              if (difference) this.adddifferenceerrormsg(1, item.date, row_index + 1)
            })
            let newitem = item.room_list.filter(w => w.inquiry_sheet_room_id == null && w.roomtypename == '')
            if (newitem.length > 0) {
              newitem.forEach((room, row_index) => {
                this.addnewitemerrormsg(1, item.date, row_index + 1)
              })
            }
          }
        })
      }
    },
    // 会场一天总价
    meetingDayMoney: () => {
      return function(list) {
        let money = 0
        list.forEach(item => {
          money += this.positiveFloatSix(item.price * (item.count ? item.count : 0))
        })
        return this.positiveFloatSix(money)
      }
    },
    // 会场所有总价
    meetingAllMoney: function() {
      let money = 0
      if (this.offline_quoted_price_conference && this.offline_quoted_price_conference.length > 0) {
        this.offline_quoted_price_conference.forEach(item => {
          money += this.meetingDayMoney(item.conference_list)
        })
      }
      return this.positiveFloatSix(money)
    },
    // 会场税费
    meetingTaxMoney: function() {
      let money = 0
      money = this.meetingAllMoney * (this.event_info_configure.conference_inquiry_taxrate / 100)
      return this.positiveFloatSix(money)
    },
    //会议需求价格验证标记
    conferenceDifference: () => {
      return function(item) {
        return item.price === ''
      }
    },
    //保存时验证会场数据
    checkConferenceDifference: function() {
      let difference = false
      if (this.offline_quoted_price_conference && this.offline_quoted_price_conference.length > 0) {
        this.offline_quoted_price_conference.forEach(item => {
          if (item.conference_list && item.conference_list.length > 0) {
            item.conference_list.forEach((conference, row_index) => {
              difference = this.conferenceDifference(conference)
              if (difference) this.adddifferenceerrormsg(2, item.date, row_index + 1)
            })
          }
        })
      }
    },
    // 酒店内餐饮一天总金额
    repastDayMoney: () => {
      return function(list) {
        let money = 0
        list.forEach(item => {
          money += this.positiveInteger(item.personcount) * this.positiveFloatSix(item.price)
        })
        return this.positiveFloatSix(money)
      }
    },
    // 酒店内餐饮所有总价
    repastAllMoney: function() {
      let money = 0
      if (this.offline_quoted_price_hotel_food && this.offline_quoted_price_hotel_food.length > 0) {
        this.offline_quoted_price_hotel_food.forEach(item => {
          money += this.repastDayMoney(item.food_list)
        })
      }
      return this.positiveFloatSix(money)
    },
    // 酒店内餐饮税费
    repastTaxMoney: function() {
      let money = 0
      money = this.repastAllMoney * (this.event_info_configure.hotel_food_inquiry_taxrate / 100)
      return this.positiveFloatSix(money)
    },
    //酒店内餐饮需求价格验证标记
    foodDifference: () => {
      return function(item) {
        return item.price === ''
      }
    },
    //会议餐标验证
    foodLimit: () => {
      return function(item, food_limit) {
        console.log(item.price, food_limit, parseFloat(item.price) > parseFloat(food_limit))
        return parseFloat(item.price) > parseFloat(food_limit)
      }
    },
    //保存时验证酒店内餐饮数据
    checkFoodDifference: function() {
      let difference = false
      let food_limit = false
      if (this.offline_quoted_price_hotel_food && this.offline_quoted_price_hotel_food.length > 0) {
        this.offline_quoted_price_hotel_food.forEach(item => {
          if (item.food_list && item.food_list.length > 0) {
            item.food_list.forEach((food, row_index) => {
              difference = this.foodDifference(food)
              if (difference) this.adddifferenceerrormsg(3, item.date, row_index + 1)
              food_limit = this.foodLimit(food, this.event_info.food_limit)
              if (food_limit) this.addfoodlimiterrormsg(3, item.date, row_index + 1)
            })
          }
        })
      }
    },
    // 酒店外餐饮一天总金额
    otherFoodDayMoney: () => {
      return function(list) {
        let money = 0
        list.forEach(item => {
          money += this.positiveInteger(item.personcount) * this.positiveFloatSix(item.price)
        })
        return this.positiveFloatSix(money)
      }
    },
    // 酒店外餐饮所有总价
    otherFoodAllMoney: function() {
      let money = 0
      if (this.offline_quoted_price_others_food && this.offline_quoted_price_others_food.length > 0) {
        this.offline_quoted_price_others_food.forEach(item => {
          money += this.repastDayMoney(item.food_list)
        })
      }
      return this.positiveFloatSix(money)
    },
    // 酒店外餐饮税费
    otherFoodTaxMoney: function() {
      let money = 0
      money = this.otherFoodAllMoney * (this.event_info_configure.others_food_inquiry_taxrate / 100)
      return this.positiveFloatSix(money)
    },
    //酒店外餐饮需求价格验证标记
    othersFoodDifference: () => {
      return function(item) {
        return item.price === ''
      }
    },
    //保存时验证酒店外餐饮数据
    checkOthersFoodDifference: function() {
      let difference = false
      let food_limit = false
      if (this.offline_quoted_price_others_food && this.offline_quoted_price_others_food.length > 0) {
        this.offline_quoted_price_others_food.forEach(item => {
          if (item.food_list && item.food_list.length > 0) {
            item.food_list.forEach((food, row_index) => {
              difference = this.othersFoodDifference(food)
              if (difference) this.adddifferenceerrormsg(4, item.date, row_index + 1)
              food_limit = this.foodLimit(food, this.event_info.food_limit)
              if (food_limit) this.addfoodOutsidelimiterrormsg(3, item.date, row_index + 1)
            })
          }
        })
      }
    },
    // 大交通一天总金额
    IntercityTransportationDayMoney: () => {
      return function(list) {
        let money = 0
        if (list) {
          list.forEach(item => {
            money += this.positiveInteger(item.passengercount) * this.positiveFloatSix(item.unitprice)
          })
        }

        return this.positiveFloatSix(money)
      }
    },
    // 大交通所有总价
    IntercityTransportationAllMoney: function() {
      let money = 0
      if (this.offline_quoted_price_transportation && this.offline_quoted_price_transportation.length > 0) {
        this.offline_quoted_price_transportation.forEach(item => {
          money += this.IntercityTransportationDayMoney(item.transportation_list)
        })
      }
      return this.positiveFloatSix(money)
    },
    // 大交通税费
    IntercityTransportationTaxMoney: function() {
      let money = 0
      money = this.IntercityTransportationAllMoney * (this.event_info_configure.transportation_inquiry_taxrate / 100)
      return this.positiveFloatSix(money)
    },
    //大交通需求价格验证标记
    transportationDifference: () => {
      return function(item) {
        return item.unitprice === ''
      }
    },
    //保存时验证大交通数据
    checkTransportationDifference: function() {
      let difference = false
      if (this.offline_quoted_price_transportation && this.offline_quoted_price_transportation.length > 0) {
        this.offline_quoted_price_transportation.forEach(item => {
          if (item.transportation_list && item.transportation_list.length > 0) {
            item.transportation_list.forEach((transportation, row_index) => {
              difference = this.transportationDifference(transportation)
              if (difference) this.adddifferenceerrormsg(5, item.date, row_index + 1)
            })
          }
        })
      }
    },
    // 地面交通一天总金额
    CityDayMoney: () => {
      return function(list) {
        let money = 0
        list.forEach(item => {
          money += this.positiveInteger(item.carcount) * this.positiveFloatSix(item.price)
        })
        return this.positiveFloatSix(money)
      }
    },
    // 地面交通所有总价
    CityAllMoney: function() {
      let money = 0
      if (this.offline_quoted_price_car && this.offline_quoted_price_car.length > 0) {
        this.offline_quoted_price_car.forEach(item => {
          money += this.CityDayMoney(item.car_list)
        })
      }
      return this.positiveFloatSix(money)
    },
    // 地面交通税费
    CityTaxMoney: function() {
      let money = 0
      money = this.CityAllMoney * (this.event_info_configure.car_inquiry_taxrate / 100)
      return this.positiveFloatSix(money)
    },
    //室内用车价格验证标记
    carDifference: () => {
      return function(item) {
        return item.price === ''
      }
    },
    //保存时验证市内交通数据
    checkCarDifference: function() {
      let difference = false
      if (this.offline_quoted_price_car && this.offline_quoted_price_car.length > 0) {
        this.offline_quoted_price_car.forEach(item => {
          if (item.car_list && item.car_list.length > 0) {
            item.car_list.forEach((car, row_index) => {
              difference = this.carDifference(car)
              if (difference) this.adddifferenceerrormsg(6, item.date, row_index + 1)
            })
          }
        })
      }
    },
    // 其他所有总价
    otherAllMoney: function() {
      let money = 0
      if (this.offline_quoted_price_others && this.offline_quoted_price_others.length > 0) {
        this.offline_quoted_price_others.forEach(item => {
          money += this.positiveInteger(item.offerparticipatecount) * this.positiveFloatSix(item.price)
        })
      }
      return this.positiveFloatSix(money)
    },
    // 其他税费
    otherTaxMoney: function() {
      let money = 0
      money = this.otherAllMoney * (this.event_info_configure.other_inquiry_taxrate / 100)
      return this.positiveFloatSix(money)
    },
    // 服务费总价

    //其他服务需求价格验证标记
    otherDifference: () => {
      return function(item) {
        return item.price === ''
      }
    },
    //保存时验证其他服务数据
    checkOtherDifference: function() {
      let difference = false
      if (this.offline_quoted_price_others && this.offline_quoted_price_others.length > 0) {
        this.offline_quoted_price_others.forEach((item, row_index) => {
          difference = this.otherDifference(item)
          if (difference) this.adddifferenceerrormsg(7, null, row_index + 1)
        })
      }
    },
    // 服务费总价
    serveAllMoney: function() {
      let money = 0
      if (this.event_info_configure.service_fee_calculation_method == 0) {
        // 分项计费服务费算法
        money =
          this.allMoney.toFixed(2) * (this.event_info_configure.room_inquiry_service_taxrate / 100) +
          this.meetingAllMoney.toFixed(2) * (this.event_info_configure.conference_inquiry_service_taxrate / 100) +
          this.repastAllMoney.toFixed(2) * (this.event_info_configure.hotel_food_inquiry_service_taxrate / 100) +
          this.otherFoodAllMoney.toFixed(2) * (this.event_info_configure.others_food_inquiry_service_taxrate / 100) +
          this.IntercityTransportationAllMoney.toFixed(2) * (this.event_info_configure.transportation_inquiry_service_taxrate / 100) +
          this.CityAllMoney.toFixed(2) * (this.event_info_configure.car_inquiry_service_taxrate / 100)
        this.offline_quoted_price_others.forEach(otherItem => {
          money += (otherItem.offerparticipatecount * otherItem.price * otherItem.service_taxrate) / 100
        })
      } else if (this.event_info_configure.service_fee_calculation_method == 1) {
        // 阶梯计费服务费算法
        let totalMoney = 0
        totalMoney += this.event_info_configure.room_inquiry_isnotservice ? this.allMoney : 0
        totalMoney += this.event_info_configure.conference_inquiry_isnotservice ? this.meetingAllMoney : 0
        totalMoney += this.event_info_configure.hotel_food_inquiry_isnotservice ? this.repastAllMoney : 0
        totalMoney += this.event_info_configure.others_food_inquiry_isnotservice ? this.otherFoodAllMoney : 0
        totalMoney += this.event_info_configure.transportation_inquiry_isnotservice ? this.IntercityTransportationAllMoney : 0
        totalMoney += this.event_info_configure.car_inquiry_isnotservice ? this.CityAllMoney : 0
        this.offline_quoted_price_others.forEach(otherItem => {
          totalMoney += otherItem.isnotservice ? otherItem.offerparticipatecount * otherItem.price : 0
        })

        this.severEveryMoneyList = []
        this.event_info_ladder_taxrates.forEach((item, index) => {
          if (totalMoney <= item.ladder_min) {
          } else if (totalMoney >= item.ladder_min && totalMoney <= item.ladder_max) {
            // 总价在阶梯最大值、最小值之间
            money += ((totalMoney - item.ladder_min + (index == 0 ? 0 : 1)) * item.ladder_taxrate) / 100
            this.severEveryMoneyList.push(((totalMoney - item.ladder_min + (index == 0 ? 0 : 1)) * item.ladder_taxrate) / 100)
          } else if (totalMoney > item.ladder_max && this.event_info_ladder_taxrates[index + 1]) {
            // 总价大于阶梯最大值 且还有下一阶梯
            this.severEveryMoneyList.push(((item.ladder_max - item.ladder_min + (index == 0 ? 0 : 1)) * item.ladder_taxrate) / 100)

            money += ((item.ladder_max - item.ladder_min + (index == 0 ? 0 : 1)) * item.ladder_taxrate) / 100
            // totalMoney -= item.ladder_max;
          } else if (totalMoney >= item.ladder_max && !this.event_info_ladder_taxrates[index + 1]) {
            // 总价大于阶梯最大值 且没有还有下一阶梯
            this.severEveryMoneyList.push(((totalMoney - item.ladder_min + (index == 0 ? 0 : 1)) * item.ladder_taxrate) / 100)
            money += ((totalMoney - item.ladder_min + (index == 0 ? 0 : 1)) * item.ladder_taxrate) / 100
          }
        })
      } else if (this.event_info_configure.service_fee_calculation_method == 2) {
        // 跳档服务费算法
        let totalMoney = 0
        totalMoney += this.event_info_configure.room_inquiry_isnotservice ? this.allMoney : 0
        totalMoney += this.event_info_configure.conference_inquiry_isnotservice ? this.meetingAllMoney : 0
        totalMoney += this.event_info_configure.hotel_food_inquiry_isnotservice ? this.repastAllMoney : 0
        totalMoney += this.event_info_configure.others_food_inquiry_isnotservice ? this.otherFoodAllMoney : 0
        totalMoney += this.event_info_configure.transportation_inquiry_isnotservice ? this.IntercityTransportationAllMoney : 0
        totalMoney += this.event_info_configure.car_inquiry_isnotservice ? this.CityAllMoney : 0
        this.allQuoteInfo.offline_quoted_price_others.forEach(otherItem => {
          totalMoney += otherItem.isnotservice ? otherItem.offerparticipatecount * otherItem.price : 0
        })
        this.serviceTotalMoney = totalMoney
        for (var i = 0; i < this.allQuoteInfo.event_info_grade_taxrates.length; i++) {
          if (i == this.allQuoteInfo.event_info_grade_taxrates.length - 1 || (totalMoney >= this.allQuoteInfo.event_info_grade_taxrates[i].grade_money && totalMoney < this.allQuoteInfo.event_info_grade_taxrates[i + 1].grade_money)) {
            money = (totalMoney * this.allQuoteInfo.event_info_grade_taxrates[i].grade_taxrate) / 100 // 服务费金额 = 计入服务费总价 * 对应档次 服务费比例
            this.grade_taxrate = this.allQuoteInfo.event_info_grade_taxrates[i].grade_taxrate // 设置跳档服务费收取比例
            break
          }
        }
      }

      money *= this.allQuoteInfo.fzc_service / 100 // 非直采服务费折扣

      // 有非直采最低服务费 并且 非直采服务费 小于 最低服务费，取值最低服务费
      if (this.allQuoteInfo.event_info_configure.minimum_service_fee == 1 && money < this.allQuoteInfo.event_info_configure.minimum_service_fee_money) {
        money = this.allQuoteInfo.event_info_configure.minimum_service_fee_money
      }

      this.allQuoteInfo.feizhicai_service = money
      // debugger
      // 是否是拜耳直采服务费规则  服务费总额添加直采服务费
      if (this.allQuoteInfo.zhicai_service == 1) {
        money += this.baierSeversMoney
      } else {
        money += (this.allQuoteInfo.advance_amount * this.allQuoteInfo.advance_proportion) / 100
      }

      return this.positiveFloatSix(money)
    },
    // 拜耳直采服务费计算
    baierSeversMoney() {
      let money = 0
      this.allQuoteInfo.event_quoted_price_zhicai_service.forEach(item => {
        money += item.grade_price * (item.grade_count ? item.grade_count : 0)
      })
      return this.positiveFloatSix(money)
    },
    // 服务费税费
    serveTaxMoney: function() {
      let money = 0
      if (this.event_info_configure.fzc_service_fee_money == 0) {
        // 非直采服务费不计税
        money = ((this.serveAllMoney - this.allQuoteInfo.feizhicai_service) * this.positiveFloatSix(this.allQuoteInfo.taxrate)) / 100
      } else {
        // 非直采服务费计税
        money = this.serveAllMoney * (this.event_info_configure.service_taxrate / 100)
      }
      // money = this.serveAllMoney *(this.event_info_configure.service_taxrate/100);
      return this.positiveFloatSix(money)
    },
    // 净价总计：
    netPriceAllMoney: function() {
      let money = 0
      money = this.allMoney + this.meetingAllMoney + this.repastAllMoney + this.otherFoodAllMoney + this.IntercityTransportationAllMoney + this.CityAllMoney + this.otherAllMoney
      return this.positiveFloatSix(money)
    },
    // 税费总计：
    taxesAllMoney: function() {
      let taxes = 0
      // taxes = this.taxMoney + this.meetingTaxMoney + this.repastTaxMoney + this.otherFoodTaxMoney +
      // 			  this.IntercityTransportationTaxMoney + this.CityTaxMoney + this.otherTaxMoney + this.serveTaxMoney
      // taxes = (this.netPriceAllMoney + this.serveAllMoney) * this.allQuoteInfo.taxrate/100

      if (this.event_info_configure.fzc_service_fee_money == 0) {
        // 非直采服务费不计税
        taxes = ((this.netPriceAllMoney + this.serveAllMoney - this.allQuoteInfo.feizhicai_service) * this.positiveFloatSix(this.allQuoteInfo.taxrate)) / 100
      } else {
        // 非直采服务费计税
        taxes = ((this.netPriceAllMoney + this.serveAllMoney) * this.positiveFloatSix(this.allQuoteInfo.taxrate)) / 100
      }
      // this.allQuoteInfo.feizhicai_service=this.serveAllMoney || 0
      this.allQuoteInfo.taxation = this.positiveFloatSix(taxes) || 0
      return this.positiveFloatSix(taxes)
    }
  },
  methods: {
    guid,
    positiveInteger,
    positiveFloat,
    positiveFloatOne,
    positiveFloatSix,
    formatNum,
    taxrateChange() {
      this.event_info_configure.room_inquiry_taxrate = this.allQuoteInfo.taxrate
      this.event_info_configure.conference_inquiry_taxrate = this.allQuoteInfo.taxrate
      this.event_info_configure.hotel_food_inquiry_taxrate = this.allQuoteInfo.taxrate
      this.event_info_configure.others_food_inquiry_taxrate = this.allQuoteInfo.taxrate
      this.event_info_configure.transportation_inquiry_taxrate = this.allQuoteInfo.taxrate
      this.event_info_configure.car_inquiry_taxrate = this.allQuoteInfo.taxrate
      this.event_info_configure.other_inquiry_taxrate = this.allQuoteInfo.taxrate
      this.event_info_configure.service_taxrate = this.allQuoteInfo.taxrate
    },
    addConferenceOther(conferences, conference, index) {
      let type4_cotnt = 0
      conferences.conference_list.forEach(item => {
        if (item.type == 4) {
          type4_cotnt += 1
        }
      })

      let addItem = {
        quoted_firstid: conference.inquiry_sheet_conference_id,
        order_name: conference.order_name,
        date: conference.date,
        indexs: type4_cotnt + 1,
        type: 4,
        quoted_code: '',
        quoted_name: '',
        count: '',
        price: '',
        comments: ''
      }
      conferences.conference_list.splice(index + type4_cotnt + 1, 0, addItem)
    },
    changeCostProject(e, item) {
      item.roomtypename = item.custom_roomtype = this.roomcostProjects.filter(element => {
        return element.code == e
      })[0].name
      item.custom_roomtypeid = e
      item.roomtypid = e
    },
    // 删除其他费用
    delConferenceOther(conferences, conference, index) {
      let type4_cotnt = 0
      conferences.conference_list.splice(index, 1)
      // 删除子项后，排序字段重新赋值
      conferences.conference_list.forEach(item => {
        if (item.type == 4) {
          type4_cotnt += 1
          item.indexs = type4_cotnt
        }
      })
    },
    conferenceChange(conferenceItem) {
      this.addConferenceSelects.forEach(element => {
        if (conferenceItem.quoted_code == element.code) {
          conferenceItem.quoted_name = element.name
        }
      })
    },
    // 添加其他
    addOther() {
      let addData = {
        type: 4,
        other_code: '',
        servicetypename: '',
        two_level_code: '',
        offerparticipatecount: '',
        price: '',
        offer_remarks: '',
        isnotservice: 1,
        detail: [],
        indexs: this.offline_quoted_price_others.length + 1
      }

      this.offline_quoted_price_others.push(addData)
    },
    delOther(other, index) {
      let type4_cotnt = 0
      this.offline_quoted_price_others.splice(index, 1)
      // 删除子项后，排序字段重新赋值
      this.offline_quoted_price_others.forEach((item, index) => {
        item.indexs = index + 1
      })
    },
    addOtherChange(otherItem) {
      this.addOtherSelects.forEach(element => {
        if (element.code == otherItem.other_code) {
          otherItem.detail = element.detail.filter(item => {
            return item.detail_type !== '0'
          })
          otherItem.isnotservice = element.isnotservice
          otherItem.two_level_code = '' // 清空二级分类
        }
      })
      console.log(this.demandList.OtherService)
    },
    searchSelectOption(code) {
      // debugger
      this.requestApi({
        url: '/orderform/GetdictionaryList',
        method: 'post',
        data: {
          code: code,
          meetingid: this.$route.query.id
        }
      }).then(res => {
        if (code == '0049') {
          this.addConferenceSelects = res
        } else {
          this.addOtherSelects = res
          this.offline_quoted_price_others.forEach(item => {
            // item.isnotservice = Boolean(item.isnotservice)
            this.addOtherSelects.forEach(element => {
              if (element.code == item.other_code && !item.inquiry_sheet_other_id) {
                // item_c.detail = element.detail
                item.detail = element.detail.filter(item => {
                  return item.detail_type !== '0'
                })

                console.log(item.detail)
                // item.two_level_code = '' // 清空二级分类
                // debugger
                item.isnotservice = element.isnotservice
              }
            })
          })
        }
      })
    },
    // 采购下拉数据处理与渲染
    getDemandList() {
      return new Promise((resolve, reject) => {
        this.requestApi({
          url: '/MeetingMa/Purchase',
          method: 'post',
          data: { MeetingID: this.eventId }
        }).then(res => {
          this.demandList = res
          resolve(res)
        })
      })
    },
    // 线下报价查询
    OfflineQuotedPriceInfo() {
      this.requestApi({
        url: '/OfflineQuotedPrice/Info',
        method: 'post',
        data: { id: this.$route.query.id }
      }).then(res => {
        // debugger
        this.allQuoteInfo = res
        this.event_info = res.event_info
        if (this.allQuoteInfo.event_info_configure.service_fee_ratio == 0 || this.allQuoteInfo.fzc_service == null) this.allQuoteInfo.fzc_service = 100 // 不支持服务费比例修改，服务费比例设置为100%

        for (let item in res.event_info_configure) {
          if (item == 'room_inquiry_isnotservice' || item == 'conference_inquiry_isnotservice' || item == 'hotel_food_inquiry_isnotservice' || item == 'others_food_inquiry_isnotservice' || item == 'transportation_inquiry_isnotservice' || item == 'car_inquiry_isnotservice') {
            res.event_info_configure[item] = Boolean(res.event_info_configure[item])
          }
        }
        this.event_info_configure = res.event_info_configure
        this.offline_quoted_price_room = res.offline_quoted_price_room // 客房需求
        this.offline_quoted_price_conference = res.offline_quoted_price_conference // 会场需求
        this.offline_quoted_price_hotel_food = res.offline_quoted_price_hotel_food // 酒店内餐饮需求
        this.offline_quoted_price_others_food = res.offline_quoted_price_others_food // 酒店外餐饮需求
        this.offline_quoted_price_transportation = res.offline_quoted_price_transportation // 大交通需求
        this.offline_quoted_price_car = res.offline_quoted_price_car // 地面交通需求
        res.offline_quoted_price_others.forEach(item => {
          item.isnotservice = Boolean(item.isnotservice)
        })
        this.offline_quoted_price_others = res.offline_quoted_price_others // 其他服务
        this.event_info_ladder_taxrates = res.event_info_ladder_taxrates // 阶梯费率
        if (res.event_info_ladder_taxrates.length == 0) {
          this.event_info_ladder_taxrates = [{ ladder_min: 0, ladder_max: 100000, ladder_taxrate: 8 }]
        }
        this.searchSelectOption('0049') // 查询会场下拉选项
        this.searchSelectOption('009') // 查询其他下拉选项
      })
    },
    submit(requestType) {
      //表单验证
      if (!this.validate()) {
        return
      }
      this.addroomProvidecountwarningmsg()
      if (this.warningmsg == '') this.OfflineQuotedPriceSubmit(requestType)
      else {
        this.$confirm(this.warningmsg, '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定提交',
          cancelButtonText: '返回修改',
          type: 'warning'
        })
          .then(() => {
            this.OfflineQuotedPriceSubmit(requestType)
          })
          .catch(() => {})
      }
    },
    // 线下报价保存
    OfflineQuotedPriceSubmit(requestType) {
      for (let item in this.event_info_configure) {
        if (item == 'room_inquiry_isnotservice' || item == 'conference_inquiry_isnotservice' || item == 'hotel_food_inquiry_isnotservice' || item == 'others_food_inquiry_isnotservice' || item == 'transportation_inquiry_isnotservice' || item == 'car_inquiry_isnotservice') {
          this.event_info_configure[item] = Number(this.event_info_configure[item])
        }
      }
      this.offline_quoted_price_others.forEach(item => {
        item.isnotservice = Number(item.isnotservice)
      })
      this.allQuoteInfo.event_info_configure = this.event_info_configure
      this.allQuoteInfo.offline_quoted_price_room = this.offline_quoted_price_room
      this.allQuoteInfo.offline_quoted_price_conference = this.offline_quoted_price_conference
      this.allQuoteInfo.offline_quoted_price_hotel_food = this.offline_quoted_price_hotel_food
      this.allQuoteInfo.offline_quoted_price_others_food = this.offline_quoted_price_others_food
      this.allQuoteInfo.offline_quoted_price_transportation = this.offline_quoted_price_transportation
      this.allQuoteInfo.offline_quoted_price_car = this.offline_quoted_price_car
      this.allQuoteInfo.offline_quoted_price_others = this.offline_quoted_price_others
      this.allQuoteInfo.event_info_ladder_taxrates = this.event_info_ladder_taxrates
      this.allQuoteInfo.total_amount = this.positiveFloat(this.netPriceAllMoney) + this.positiveFloat(this.serveAllMoney) + this.positiveFloat(this.taxesAllMoney)
      this.allQuoteInfo.total_price = this.netPriceAllMoney

      // 直采服务费为拜耳规则，直采服务费总额赋值
      if (this.allQuoteInfo.zhicai_service == 1) {
        this.allQuoteInfo.advance_amount = this.baierSeversMoney
        this.allQuoteInfo.advance_proportion = 100
      }

      let rooms = this.allQuoteInfo.offline_quoted_price_room
      for (let i = 0; i < rooms.length; i++) {
        let roomlist = rooms[i].room_list
        for (let j = 0; j < roomlist.length; j++) {
          if (!roomlist[j].TableName) {
            roomlist[j].indexs = j + 1

            roomlist[j].outside_roomcount = roomlist[j].provide_count
            roomlist[j].inside_roomcount = 0
          } else {
            if (this.allQuoteInfo.is_Inside_outside == 0) {
              roomlist[j].inside_roomcount = 0
              roomlist[j].outside_roomcount = roomlist[j].provide_count
            }
            if (this.allQuoteInfo.is_Inside_outside == 1) {
              if (roomlist[j].provide_count <= roomlist[j].outside_roomcount) {
                roomlist[j].outside_roomcount = roomlist[j].provide_count
                roomlist[j].inside_roomcount = 0
              } else if (roomlist[j].provide_count > roomlist[j].outside_roomcount) {
                roomlist[j].inside_roomcount = roomlist[j].provide_count - roomlist[j].outside_roomcount
              }
            }
          }
        }
      }
      //       hkz
      debugger
      if (this.allQuoteInfo.total_amount) {
        this.allQuoteInfo.total_amount = this.positiveFloat(this.allQuoteInfo.total_amount)
        console.log(this.allQuoteInfo)
      }
      this.requestApi({
        url: '/OfflineQuotedPrice/Submit',
        method: 'post',
        data: this.allQuoteInfo
      }).then(resID => {
        if (resID) {
          this.event_quoted_price_id = resID
          if (requestType == 1) {
            // 点击更新报价
            this.$message.success('更新报价成功')
            this.cancel()
          } else if (requestType == 2) {
            // 点击确认中标
            this.requestApi({
              url: '/MeetingMa/OfflineQuotedPriceStatus',
              method: 'post',
              data: { id: resID }
            }).then(res => {
              this.$message.success(res.msg)
              this.cancel()
            })
          }
        }
      })
    },
    // 提交中标
    async submitBidding() {
      if (this.warningmsg == '') {
        let id = await this.OfflineQuotedPriceSubmit(2)
      }
    },
    // 清空线下报价
    clearOnlineOffer() {
      this.requestApi({
        url: '/OfflineQuotedPrice/Clear',
        method: 'post',
        data: { event_info_id: this.$route.query.id }
      }).then(res => {
        if (res) {
          this.$message.success('删除成功')
        }
      })
    },
    // 客房是否计入服务费
    roomIsnotservice(checked) {
      if (!checked) {
        this.event_info_configure.room_inquiry_service_taxrate = 0
      }
    },
    // 会场是否计入服务费
    conferenceIsnotservice(checked) {
      if (!checked) {
        this.event_info_configure.conference_inquiry_service_taxrate = 0
      }
    },
    // 酒店内餐饮是否计入服务费
    hotelFoodIsnotservice(checked) {
      if (!checked) {
        this.event_info_configure.hotel_food_inquiry_service_taxrate = 0
      }
    },
    // 酒店外餐饮是否计入服务费
    othersFoodIsnotservice(checked) {
      if (!checked) {
        this.event_info_configure.others_food_inquiry_service_taxrate = 0
      }
    },
    // 大交通是否计入服务费
    transportationIsnotservice(checked) {
      if (!checked) {
        this.event_info_configure.transportation_inquiry_service_taxrate = 0
      }
    },
    // 地面交通是否计入服务费
    carIsnotservice(checked) {
      if (!checked) {
        this.event_info_configure.car_inquiry_service_taxrate = 0
      }
    },
    // 其他是否计入服务费
    otherIsnotservice(otherItem, index) {
      if (!otherItem.isnotservice) {
        otherItem.service_taxrate = 0
      }
    },
    // 客房线上/线下询价
    roomTypeChange(checked) {
      if (checked == 0) {
        this.offline_quoted_price_room.forEach(item => {
          item.room_list.forEach(roomListItem => {
            roomListItem.provide_count = 0
            roomListItem.remarks = ''
            roomListItem.unitprice = 0
          })
        })
      }
    },
    // 会场线上/线下询价
    conferenceTypeChange(checked) {
      if (checked == 0) {
        this.offline_quoted_price_conference.forEach(item => {
          item.conference_list.forEach(conferenceListItem => {
            conferenceListItem.price = 0
            conferenceListItem.comments = ''
          })
        })
      }
    },
    // 酒店内餐饮线上/线下询价
    hotelFoodTypeChange(checked) {
      if (checked == 0) {
        this.offline_quoted_price_hotel_food.forEach(item => {
          item.food_list.forEach(foodListItem => {
            foodListItem.price = 0
            foodListItem.offer_remarks = ''
          })
        })
      }
    },
    // 酒店外餐饮线上/线下询价
    othersFoodTypeChange(checked) {
      if (checked == 0) {
        this.offline_quoted_price_others_food.forEach(item => {
          item.food_list.forEach(foodListItem => {
            foodListItem.price = 0
            foodListItem.offer_remarks = ''
          })
        })
      }
    },
    // 大交通线上/线下询价
    transportationTypeChange(checked) {
      if (checked == 0) {
        this.offline_quoted_price_transportation.forEach(item => {
          item.transportation_list.forEach(transportationListItem => {
            transportationListItem.unitprice = 0
            transportationListItem.offerremarks = ''
          })
        })
      }
    },
    // 地面交通线上/线下询价
    carTypeChange(checked) {
      if (checked == 0) {
        this.offline_quoted_price_car.forEach(item => {
          item.car_list.forEach(carListItem => {
            carListItem.price = 0
            carListItem.offer_remarks = ''
          })
        })
      }
    },
    // 其他服务线上/线下询价
    otherTypeChange(checked) {
      if (checked == 0) {
        this.offline_quoted_price_others.forEach(item => {
          item.price = 0
          item.offer_remarks = ''
          item.isnotservice = 1
          item.service_taxrate = ''
        })
      }
    },
    //添加新房型
    addNewRoomType(obj) {
      // console.log(obj);
      obj.push({
        roomtypename: '免房',
        provide_count: 0,
        remarks: '',
        unitprice: 0,
        roomtype: '0034-4',
        custom_roomtype: '免房',
        custom_roomtypeid: '0034-4'
      })
    },
    // 删除客房
    delNewRoomType(node, key) {
      node.room_list.splice(key, 1)
    },
    // 复制上一天
    copyRoomDay(key) {
      this.offline_quoted_price_room[key - 1].room_list.forEach((item, key_c) => {
        // let romS = this.offline_quoted_price_room[key].room_list[key_c];
        this.offline_quoted_price_room[key].room_list.forEach((roomItem, roomIndex) => {
          if (roomItem.roomtype == item.roomtype) {
            // romS.roomtypename = item.roomtypename;
            roomItem.provide_count = item.provide_count
            roomItem.remarks = item.remarks
            roomItem.unitprice = item.unitprice
          }
        })
      })
    },
    // 新增阶梯
    addLadder() {
      if (this.event_info_ladder_taxrates[this.event_info_ladder_taxrates.length - 1].ladder_max) {
        this.event_info_ladder_taxrates.push({
          event_info_id: this.$route.query.id,
          id: this.guid(),
          ladder_min: this.event_info_ladder_taxrates[this.event_info_ladder_taxrates.length - 1].ladder_max * 1 + 1,
          ladder_max: 0,
          ladder_taxrate: 8
        })
      } else {
        this.$message.error('请将上一阶梯信息填写完整')
      }
    },
    // 删除阶梯
    delLadder(index) {
      this.event_info_ladder_taxrates.splice(index, 1)
    },
    // 取消
    cancel() {
      this.$router.push({
        name: 'eventDetail',
        // path: "/EventDetail",
        query: this.$route.query
      })
    },
    differenceShowErrorMessage: function() {
      let html = ''
      this.errormsg.forEach(msg => {
        html += "<p style='padding:5px;'>" + msg + '</p>'
      })
      this.$message({
        message: html,
        dangerouslyUseHTMLString: true,
        type: 'error',
        lockScroll: false
      })
    },
    //客房需求可提供数量小于需求数量时写入
    addroomProvidecountwarningmsg: function() {
      this.warningmsg = ''
      let flag = false
      let merge = []
      let roomtype = []
      let newroomtype = []
      let list = []
      let newlist = []
      if (this.offline_quoted_price_room && this.offline_quoted_price_room.length > 0 && this.event_info_configure.room_inquiry_type == 1) {
        this.offline_quoted_price_room.forEach(item => {
          if (item.room_list && item.room_list.length > 0) {
            item.room_list.forEach((room, row_index) => {
              merge.push(room)
              if (room.inquiry_sheet_room_id && !roomtype.includes(room.roomtypename)) roomtype.push(room.roomtypename)
              if (!room.inquiry_sheet_room_id && !newroomtype.includes(room.roomtypename)) newroomtype.push(room.roomtypename)
            })
          }
        })
        if (roomtype.length > 0) {
          roomtype.forEach(item => {
            let roomcount = 0
            let provide_count = 0
            let temp = merge.filter(w => w.roomtypename == item)
            if (temp.length > 0) {
              temp.forEach(t => {
                roomcount += positiveInteger(t.roomcount)
                provide_count += positiveInteger(t.provide_count)
              })
            }
            if (provide_count < roomcount) flag = true
            list.push({
              name: item,
              roomcount: roomcount,
              provide_count: provide_count
            })
          })
        }
        if (newroomtype.length > 0) {
          newroomtype.forEach(item => {
            let provide_count = 0
            let temp = merge.filter(w => w.roomtypename == item)
            if (temp.length > 0) {
              temp.forEach(t => {
                provide_count += positiveInteger(t.provide_count)
              })
            }
            newlist.push({
              name: item,
              provide_count: provide_count
            })
          })
        }
        //客户所需客房数量<双床房10  大床房10  行政/套房10>，
        //与您填写的数量<双床房2  大床房10  行政/套房10  总统/套房8>不一致，
        //确认提交当前报价吗？
        if (flag) {
          let temp = ''
          let temp1 = ''
          list.forEach((item, index) => {
            temp += item.name + item.roomcount.toString()
            temp1 += item.name + item.provide_count.toString()
            if (index < list.length - 1) {
              temp += ' '
              temp1 += ' '
            }
            console.log(temp)
          })
          if (newlist.length > 0) {
            if (temp1 != '') temp1 += ' '
            newlist.forEach((item, index) => {
              temp1 += item.name + item.provide_count.toString()
              if (index < newlist.length - 1) temp1 += ' '
            })
          }
          let message1 = '客户所需客房数量<' + temp + '>'
          let message2 = '与您填写的数量<' + temp1 + '>'
          let message3 = '确认提交当前报价吗？'
          this.warningmsg = message1 + message2 + message3
        }
      }
      if (this.foodlimitwarningmsg.length > 0) {
        this.foodlimitwarningmsg.forEach(msg => {
          this.warningmsg += '<p>' + msg + '</p>'
        })
      }
      if (this.foodOutsidelimitwarningmsg.length > 0) {
        this.foodOutsidelimitwarningmsg.forEach(msg => {
          this.warningmsg += '<p>' + msg + '</p>'
        })
      }
      if (this.warningmsg != '') this.warningmsg += '<p>确认提交当前报价吗？</p>'
    },
    validate: function() {
      let validateResult = true
      this.errormsg = []
      this.checkRoomDifference
      this.checkConferenceDifference
      this.checkFoodDifference
      this.checkOthersFoodDifference
      this.checkTransportationDifference
      this.checkCarDifference
      this.checkOtherDifference
      if (this.errormsg.length > 0) this.differenceShowErrorMessage()

      if (this.event_info_configure.service_fee_calculation_method == 1) {
        // 阶梯计费
        for (var i = 0; i < this.event_info_ladder_taxrates.length; i++) {
          if (this.event_info_ladder_taxrates[i].ladder_taxrate == '' || this.event_info_ladder_taxrates[i].ladder_taxrate == null || this.event_info_ladder_taxrates[i].ladder_min === '' || this.event_info_ladder_taxrates[i].ladder_max === '') {
            validateResult = false
            this.$message.error(`阶梯计费${i + 1} 有未填写数据`)
            return
          } else if (this.event_info_ladder_taxrates[i].ladder_max <= this.event_info_ladder_taxrates[i].ladder_min) {
            validateResult = false
            this.$message.error(`阶梯计费${i + 1} 最大值必须大于最小值`)
            return
          } else if (i > 0 && this.event_info_ladder_taxrates[i].ladder_min <= this.event_info_ladder_taxrates[i - 1].ladder_max) {
            validateResult = false
            this.$message.error(`阶梯计费${i + 1} 最小值必须大于上一阶梯最大值`)
            return
          }
        }
      }
      return validateResult && this.errormsg.length == 0
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  font-style: normal;
}

.main {
  height: 55px;
  margin-top: 15px;
}

.main ul {
  display: flex;
  line-height: 55px;
}

.main ul li {
  margin-left: 4px;
}

.contentPrice {
  height: 55px;
  background: #626e95;
}

.contentPrice img {
  width: 30px;
  height: 30px;
  float: left;
  margin-top: 11px;
  margin-left: 15px;
}

.contentPrice span {
  line-height: 55px;
  font-size: 18px;
  color: #ffffff;
}

.nformation {
  height: 50px;
  background: #fafafa;
  border-bottom: 1px solid #eaeaea;
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
  background: #ffffff;
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

.excel {
  float: right;
  font-size: 14px;
  color: #ffffff;
  line-height: 55px;
  margin-right: 10px;
  cursor: pointer;
}

.content {
  flex: 1;
  width: 100%;
  overflow: auto;
  padding: 15px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .title_item {
    background-color: #626e95;
    color: #fff;
    padding: 5px 10px;
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 2px;
    display: flex;
    line-height: 27px;
    justify-content: space-between;
    .flex_set {
      // flex: 2;
      margin: 0 5px;
      .el-radio {
        color: #ffffff;
        /* .el-radio__input.is-checked+.el-radio__label{  //不起作用
					color: #FFFFFF;
				} */
      }
    }
    .flex_set2 {
      // flex: 1;
      .el-checkbox {
        color: #ffffff;
      }
    }
    .vat {
      // flex: 1;
      min-width: 150px;
      margin: 0 5px;
      div {
        display: flex;
        span {
          color: red;
        }
        .el-input {
          width: 70px;
        }
      }
    }
    .isChecked {
      ::deep .el-radio__label {
        color: #fff !important;
      }
      ::deep .el-checkbox__label {
        color: #fff !important;
      }
    }
  }

  .section {
    padding: 20px 0;
  }

  .header-select {
    padding-bottom: 10px;
    .note {
      color: red;
      margin-left: 20%;
    }
    div:nth-of-type(2) {
      display: flex;
      justify-content: space-between;
      div:nth-of-type(1) {
        // flex: 0.7;
        color: #169bd5;
        font-weight: bold;
        font-size: 14px;
      }
      div:nth-of-type(2) {
        // flex: 2;
      }
      div:nth-of-type(3) {
        // flex: 1.5;
        .el-radio {
          margin-right: 15px;
        }
      }
      div:nth-of-type(4) {
        // flex: 1.5;
        .el-radio {
          margin-right: 15px;
        }
      }
    }
  }
}
table {
  box-sizing: border-box;
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;

  tr,
  td,
  th {
    border: 1px solid #dddddd;
    padding: 5px;
    box-sizing: border-box;

    input {
      border: 1px solid #ccc;
      width: 100%;
      line-height: 30px;
      border-radius: 5px;
      color: #0066cc;
      padding: 0 10px;
      box-sizing: border-box;
    }

    .radio {
      display: inline-block;
      width: 20px;
    }

    .line {
      display: inline-block;
      width: 60px;
      margin: 0 5px;
    }

    .room_line {
      display: inline-block;
      width: 85%;
      margin: 0px 5px 0px 0px;
    }

    .difference {
      border: 1px solid red;
      border-radius: 4px;
    }
  }

  .topleft {
    text-align: left;
  }

  .color_1 {
    background-color: #dff0d8;
    font-size: 16px;
    .datecolor {
      background-color: #d9edf7;
    }
  }

  .color_2 {
    background-color: #f5f5f5;
  }
}

.total {
  text-align: right;

  > div {
    margin-top: 15px;

    span {
      font-weight: bold;
    }
  }

  input {
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0 10px;
    width: 20%;
    min-width: 200px;
  }

  .total_small {
    margin-left: auto;
    width: 300px;
    .total_quotation {
      font-size: 18px;
      text-align: left;
    }
    .float-right {
      text-align: right;
      font-size: 18px;
    }
  }
}

.copy {
  margin-left: 100px;
}
.color_red {
  color: red;
}
.td_flex {
  display: flex;
  line-height: 27px;
  .flex_set2 {
    // flex: 1;
  }
  .vat {
    // flex: 1;
    div {
      display: flex;
      span {
        color: red;
      }
      .el-input {
        width: 70px;
      }
    }
  }
}
.btn_sec {
  text-align: center;
}
.btn {
  width: 200px;
  height: 50px;
}
.total_price {
  margin-left: auto;
  width: 300px;
  border: 1px dashed #57638a;
  padding: 15px 20px;
  .total_quotation {
    font-size: 20px;
    font-weight: 700;
  }
  .float-right {
    text-align: right;
    font-size: 20px;
    margin-top: 10px;
  }
}
</style>
