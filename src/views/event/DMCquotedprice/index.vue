<template>
  <div class="quotedprice">
    <div class="path">
      <ul>
        <li style="color: #409eff; cursor: pointer" @click="$router.replace({ name: 'DMCinquiryList' })">
          活动询价订单列表
        </li>
        <li style="color: #7c7f82">></li>
        <li style="color: #409eff; cursor: pointer" @click="
            $router.replace({
              name: `DMCinquiryInfo`,
              params:{id:info.inquiry_sheet_object_id}
            })
          ">
          活动询价订单详情
        </li>
        <li style="color: #7c7f82">></li>
        <li style="color: #7c7f82">活动询价订单报价</li>
      </ul>
    </div>
    <!-- <div class="title">报价</div> -->
    <div class="content" v-if="info">
      <!-- <el-form :model="info" :rules="rules" ref="info" class="form"> -->
      <p style="color: #169bd5; font-weight: bold; margin-top: 20px">RFP信息</p>
      <div class="info">
        <div class="line">
          <div class="item">
            <div class="label">询价单号</div>
            <div class="context">{{ info.inquiry_sheet_code }}</div>
          </div>
          <div class="item">
            <div class="label">报名截至日期</div>
            <div class="context">{{ info.offerenddate | date_ex }}</div>
          </div>
          <!-- <div class="item">
						<div class="label">提交时间</div>
						<div class="context">{{ info.submit_time | date_ex }}</div>
					</div> -->
        </div>
        <div class="line">
          <div class="item">
            <div class="label">活动名称</div>
            <div class="context">{{ info.activity_name }}</div>
          </div>
          <div class="item">
            <div class="label">城市</div>
            <div class="context">{{ info.event_city }}</div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">最多活动人数</div>
            <div class="context">{{ info.activity_count }}</div>
          </div>
          <div class="item">
            <div class="label">活动日期</div>
            <div class="context">
              {{ info.activity_startdate | date_day }} 至
              {{ info.activity_enddate | date_day }}
              {{
                info.isadjustdate == 1
                  ? "[会议日期可以调整]"
                  : "[会议日期不可调整]"
              }}
            </div>
          </div>
        </div>
        <!-- <div class="line">
					
					<div class="item">
						<div class="label">酒店</div>
						<div class="context hotel">
							<span v-for="item in info.intentionhotel" :key="item.hotelid">{{ item.name }}</span>
						</div>
					</div>
				</div> -->
        <div class="line">
          <div class="item">
            <div class="label">公司名称</div>
            <div class="context">{{ info.company_name }}</div>
          </div>
          <div class="item">
            <div class="label">联系人</div>
            <div class="context">{{ info.contacts }}</div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">联系邮箱</div>
            <div class="context">{{ info.mailbox }}</div>
          </div>
          <div class="item">
            <div class="label">联系电话</div>
            <div class="context">
              {{ info.customer_service_telephone_numbers }}
            </div>
          </div>
        </div>
        <!-- <div class="line">
					<div class="item">
						<div class="label">业务部门</div>
						<div class="context">{{ info.department }}</div>
					</div>
					<div class="item">
						<div class="label">活动类型</div>
						<div class="context">{{ info.activity_type }}</div>
					</div>
				</div> -->
        <!-- <div class="line">
			    <div class="item">
			      <div class="label">审批单号</div>
			      <div class="context">{{ info.approval_no }}</div>
			    </div>
			    <div class="item">
			      <div class="label">付款方式</div>
			      <div class="context">{{ info.payment_method }}</div>
			    </div>
			  </div>
			  <div class="line">
			    <div class="item">
			      <div class="label">报价单打印</div>
			      <div class="context">{{ info.print }}</div>
			    </div>
			    <div class="item">
			      <div class="label">重量成度</div>
			      <div class="context"></div>
			    </div>
			  </div> -->
        <!-- <div class="line">
					<div class="item">
						<div class="label">附件</div>
						<div class="context" v-for="item in info.inquiry_sheet_attach" :key="item.id">
							<a target="_blank" :href="info.domain + item.filepath" download>{{ item.filename }}</a>
						</div>
					</div>
					<div class="item">
						<div class="label">其他需求及注意事项</div>
						<div class="context">{{ info.other }}</div>
					</div>
				</div> -->
      </div>

      <p style="color: #169bd5; font-weight: bold; margin-top: 20px">
        您的信息
      </p>
      <div class="info">
        <div class="line">
          <div class="item">
            <div class="label">供应商</div>
            <div class="context">{{ info.hotelname }}</div>
          </div>
          <div class="item">
            <div class="label">
              <span>*</span>
              报价人
            </div>
            <div class="context contextSel">
              <el-select :disabled="readonly" @change="changeSel" v-model="contractsId" placeholder="请选择">
                <el-option v-for="item in info.contactslist" :key="item.id" :label="item.contacts" :value="item.id"></el-option>
              </el-select>
              <el-input v-model="info.biddername" :disabled="disabled || readonly" placeholder="请输入您的姓名"></el-input>
              <!-- v-model="info.biddername" -->
            </div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">
              <span>*</span>
              联系电话
            </div>
            <div class="context">
              <el-input v-model="info.biddertel" :disabled="disabled || readonly" placeholder="请输入您的联系电话"></el-input>
              <!-- v-model="info.biddertel" -->
            </div>
          </div>
          <div class="item">
            <div class="label">
              <span>*</span>
              联系邮箱
            </div>
            <div class="context">
              <el-input v-model="info.bidderemail" :disabled="disabled || readonly" placeholder="请输入您的联系邮箱"></el-input>
              <!--v-model="info.bidderemail" -->
            </div>
          </div>
        </div>
      </div>

      <div class="excel">
        <span style="color: #169bd5; font-weight: bold">采购需求报价
          <span style="
              color: #999;
              font-size: 14px;
              font-weight: 400;
              padding-left: 30px;
            ">所有标红星内容都需要填写，如果这个内容是免费的，请填写“0”</span>
        </span>
        <a @click="excelexport" v-if="this.$route.params.isSubmit == 0" style="cursor: pointer" download>下载excel</a>
      </div>
      <div class="title_item" v-if="hotelVisible">采购酒店</div>
      <div class="section" v-if="hotelVisible" style="display: flex; justify-content: space-between">
        <div style="width: 50%">
          <el-input v-model="info.hotel_name" placeholder="请输入采购酒店" size="small" style="width: 50%" :readonly="readonly"></el-input>
          <el-checkbox v-model="info.isuser_preferred_hotel" :true-label="1" :false-label="0" style="line-height: 30px; margin-left: 20px">是否使用首选酒店</el-checkbox>
        </div>

        <span v-if="
            info.event_info_configure.bjqrisdisplay == 1 &&
            this.$route.params.isSubmit == 0
          " @click="downloadOfferConfirm" style="color: rgb(22, 155, 213); line-height: 30px; cursor: pointer">
          下载报价确认单
        </span>
        <!-- <el-select v-model="info.hotel_name" remote filterable reserve-keyword placeholder="请选择采购酒店" :remote-method="remoteMethod" :loading="loading">
					<el-option v-for="item in hotelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select> -->
      </div>

      <div class="title_item title_item_sel" v-if="roomVisible">
        <div>客房需求 Guest Rooms</div>
        <div>房标 Room Standard：{{ info.night_budget }} /夜/间</div>
        <div>
          <span> {{ info.is_breakfast ? "需要含早餐" : "不需要含早餐" }} </span>
          <span> {{ info.is_networks ? "需要宽带" : "不需要宽带" }} </span>
        </div>
        <div></div>
        <div class="">
          <el-checkbox disabled v-model="info.event_info_configure.room_inquiry_isnotservice" :true-label="1" :false-label="0">计入服务费</el-checkbox>
        </div>
      </div>
      <div class="section" v-if="roomVisible">
        <table v-for="(item, key) in info.quoted_price_room" :key="`kefang${key}`">
          <thead v-if="item.room_list && item.room_list.length > 0">
            <tr class="color_1">
              <th class="topleft datecolor" colspan="4">
                日期: {{ item.date | date_day_ex }}
                <el-button type="primary" size="small" class="copy" v-if="key != 0 && $route.params.isSubmit == 1" @click="copyRoomDay(key)">复制上一天</el-button>
              </th>
              <th class="topleft">
                一天总金额 ￥{{ dayMoney(item.room_list).toFixed(2) }}
              </th>
            </tr>
            <tr class="color_2">
              <th>房型</th>
              <th>所需数量</th>
              <th>酒店可提供数量</th>
              <th>单价</th>
              <th>报价备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item_c, key) in item.room_list" :key="`c_${key}`">
              <td>
                <template v-if="item_c.inquiry_sheet_room_id != null">
                  {{ item_c.roomtypename }}
                </template>
                <!-- <input v-else type="text" v-model="item_c.roomtypename" placeholder="请输入房型" :readonly="readonly" /> -->
                <el-select @change="changeCostProject($event, item_c)" v-else v-model="item_c.roomtype" size="small" filterable>
                  <el-option v-for="rc in roomcostProjects" v-show="rc.detail_type !== '0'" :label="rc.name" :value="rc.code" :key="rc.code"></el-option>
                </el-select>
              </td>
              <td>{{ item_c.roomcount }}</td>
              <td>
                <el-input v-model="item_c.provide_count" @input="
                    item_c.provide_count = formatNum(item_c.provide_count, 3)
                  " :class="{ difference: roomProvideCountDifference(item_c) }" :readonly="readonly" />
              </td>
              <td>
                <el-input v-model="item_c.unitprice" @input="item_c.unitprice = formatNum(item_c.unitprice, 2)" :class="{ difference: roomDifference(item_c) }" :readonly="readonly" />
              </td>
              <td>
                <el-input v-model="item_c.remarks" :readonly="readonly" :class="{ room_line: !item_c.inquiry_sheet_room_id }" />
                <el-button icon="el-icon-delete" type="danger" circle size="mini" @click="delNewRoomType(item, key)" v-if="
                    !item_c.inquiry_sheet_room_id && $route.params.isSubmit == 1
                  "></el-button>
              </td>
            </tr>
            <tr v-if="$route.params.isSubmit == 1">
              <td>其他要求</td>
              <td colspan="3">
                <template v-if="item.room_list.length > 0">
                  {{ item.room_list[0].otherrequirements }}
                </template>
              </td>
              <td style="text-align: center">
                <el-button type="text" size="mini" @click="addNewRoomType(item.room_list)">添加新房型</el-button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="total">
          <div>
            客房报价总价:
            <span>￥{{ positiveFloat(allMoney) }}</span>
          </div>
          <div>
            客房报价总备注：
            <input type="text" v-model="info.room_remarks" placeholder="请备注您的客房优势" :readonly="readonly" />
          </div>
        </div>
      </div>
      <!--2021-10-20 复杂表单验证代码-->
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
                <tr v-for="(item_c, key_c) in item.room_list" :key="`c_${key_c}`">
                  <td>
                    <template v-if="item_c.inquiry_sheet_room_id != null">
                      {{ item_c.roomtypename }}
                    </template>
                    <input
                      v-else
                      type="text"
                      v-model="item_c.roomtypename"
                      placeholder="请输入房型"
                    />
                  </td>
                  <td>{{ item_c.roomcount }}</td>
                  <td>
                    <el-form-item :prop="`quoted_price_room.${key}.room_list.${key_c}.provide_count`" :rules="rules.IntegerNotMust">
                      <el-input type="number" v-model="item_c.provide_count"  v-number-input placeholder="酒店可提供数量"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                     <el-form-item>
                      <el-input v-model="item_c.remarks" placeholder="报价备注"></el-input>
                    </el-form-item>
                  </td>
                  <td>
                    <el-form-item :prop="`quoted_price_room.${key}.room_list.${key_c}.unitprice`" :rules="rules.IntegerNotMust">
                      <el-input type="number" v-model="item_c.unitprice" placeholder="单价"></el-input>
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

      <div class="title_item title_item_sel" v-if="conferenceVisible">
        <div>会场需求 Conference Rooms</div>
        <div class="">
          <el-checkbox disabled v-model="info.event_info_configure.conference_inquiry_isnotservice" :true-label="1" :false-label="0">计入服务费</el-checkbox>
        </div>
      </div>
      <div class="section" v-if="conferenceVisible">
        <table v-for="(item, key) in info.quoted_price_conference" :key="key">
          <thead>
            <tr class="color_1">
              <th class="topleft datecolor" colspan="3">
                日期: {{ item.date | date_day_ex }}
              </th>
              <th class="topleft" colspan="2">
                一天总金额 ￥{{
                  meetingDayMoney(item.conference_list).toFixed(2)
                }}
              </th>
            </tr>
            <tr class="color_2">
              <th>项目</th>
              <th>需求</th>
              <th>需求备注</th>
              <th>报价</th>
              <th>报价备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item_c, key) in item.conference_list" :key="`c_${key}`">
              <td>
                <template v-if="item_c.type == 1">
                  <!-- {{ item_c.is_important == 0 ? '主会场' : '子会场' }}-场租 -->
                  {{
                    "场租-会场" +
                    item_c.order_name +
                    " (" +
                    item_c.roomsetuptypename +
                    ")"
                  }}
                </template>
                <template v-if="item_c.type == 2">
                  <!-- {{ item_c.is_important == 0 ? '主会场' : '子会场' }}-搭建 -->
                  {{
                    "会场搭建费-" +
                    item_c.related_information +
                    " (" +
                    item_c.roomsetuptypename +
                    ")"
                  }}
                </template>
                <template v-if="item_c.type == 3">
                  <!-- {{ item_c.is_important == 0 ? '主会场' : '子会场' }}-设备 -->
                  {{
                    `设备-会场${item_c.order_name}` +
                    " (" +
                    item_c.roomsetuptypename +
                    ")"
                  }}
                </template>
                <template v-if="item_c.type == 4">
                  <el-select v-model="item_c.quoted_code" @change="conferenceTypeChange(item_c)" placeholder="请选择">
                    <el-option v-for="option in addConferenceSelects" v-show="option.detail_type !== '0'" :key="option.code" :label="option.name" :value="option.code"></el-option>
                  </el-select>
                </template>
              </td>
              <td>
                <template v-if="item_c.type == 1">
                  <p>会议时间:{{ item_c.starttime }}~{{ item_c.endtime }}</p>
                  <p>出席人数: {{ item_c.attendees }}人</p>
                  <p>会场台型: {{ item_c.roomsetuptypename }}</p>
                  <p>
                    会场面积范围:{{ item_c.min_area }}~{{ item_c.max_area }} sqm
                  </p>
                </template>
                <template v-if="item_c.type == 2">
                  <p>
                    {{ item.date | date_day }} {{ item_c.starttime }}~{{
                      item_c.advance_date | date_day
                    }}
                    {{ item_c.endtime }} <br />
                    {{ item_c.related_information }}
                  </p>
                </template>
                <template v-if="item_c.type == 3">
                  <p>{{ item_c.equipment }}</p>
                  <!-- <p>有线麦克风{{ item_c.wiremicrophonecount }} 个</p>
									<p>无线麦克风{{ item_c.wirelessmicrophonecount }} 个</p> -->
                </template>
                <template v-if="item_c.type == 4">
                  <div>
                    数量：
                    <el-input-number v-model.number="item_c.count" :controls="false" :precision="0" placeholder="请输入数量" :readonly="readonly" style="width: 50%">
                    </el-input-number>
                  </div>
                </template>
              </td>
              <td>
                <template v-if="item_c.type == 1">
                  {{ item_c.describe }}
                </template>
                <template v-if="item_c.type == 2">
                  {{ item_c.describe }}
                </template>
                <template v-if="item_c.type == 3">
                  {{ item_c.microphonedescribe }}
                </template>
                <template v-if="item_c.type == 4">
                  <div>
                    单价： ￥
                    <el-input v-model="item_c.price" @input="item_c.price = formatNum(item_c.price, 2)" :readonly="readonly" style="width: 60%" />
                  </div>
                </template>
              </td>
              <td style="width: 150px">
                <template v-if="item_c.type == 4">
                  ￥ {{ positiveFloat(item_c.price * item_c.count) }}
                </template>
                <template v-else>
                  <el-input v-model="item_c.price" @input="item_c.price = formatNum(item_c.price, 2)" :class="{ difference: conferenceDifference(item_c) }" :readonly="readonly" />
                </template>
              </td>
              <td>
                <el-input style="width: auto" v-model="item_c.comments" :readonly="readonly" />
                <span v-if="item_c.type == 1" @click="addConferenceOther(item, item_c, key)" style="margin-left: 10px; color: #409eff; cursor: pointer">添加其他费用</span>
                <span v-if="item_c.type == 4" @click="delConferenceOther(item, item_c, key)" style="margin-left: 10px; color: #409eff; cursor: pointer">删除</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="total">
          <div>
            会场报价总计:
            <span>￥{{ positiveFloat(meetingAllMoney) }}</span>
          </div>
          <div>
            会议报价总备注：
            <input type="text" v-model="info.conference_remarks" placeholder="您可以填写详细的报价备注" :readonly="readonly" />
          </div>
        </div>
      </div>
      <!-- 酒店内餐饮需求 -->
      <div class="title_item title_item_sel" v-if="foodVisible">
        <div>酒店内餐饮需求 Hotel Food & Beverage</div>
        <div>餐标Dining Standard:￥{{ positiveFloat(info.food_limit) }}</div>
        <div class="">
          <el-checkbox disabled v-model="info.event_info_configure.hotel_food_inquiry_isnotservice" :true-label="1" :false-label="0">计入服务费</el-checkbox>
        </div>
      </div>
      <div class="section" v-if="foodVisible">
        <table v-for="(item, key) in info.quoted_price_food" :key="key">
          <thead>
            <tr class="color_1">
              <th class="topleft datecolor" colspan="4">
                <div class="flex_row justify_between">
                  <div>日期: {{ item.date | date_day_ex }}</div>
                  <div>
                    一天总金额 ￥{{ repastDayMoney(item.food_list).toFixed(2) }}
                  </div>
                </div>
              </th>
              <!-- <th class="topleft"></th> -->
            </tr>
            <tr class="color_2">
              <th>项目</th>
              <th>人数/人次</th>
              <!-- <th>需求备注</th> -->
              <th>单价（RMB/人）</th>
              <th>报价备注</th>
              <!-- <th>总价（¥）</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item_c, key) in item.food_list" :key="`c_${key}`">
              <td>
                {{ item_c.foodtypename }}
                <span v-if="item_c.usetypename">[{{ item_c.usetypename }}]</span>
                <!-- <span v-if="item_c.addresstype == 1" style="color: #f00">酒店外</span> -->
              </td>
              <td>{{ item_c.personcount }}</td>
              <!-- <td>{{ item_c.comments }}</td> -->
              <td>
                <el-input type="text" v-model="item_c.price" @input="item_c.price = formatNum(item_c.price, 2)" :class="{ difference: foodDifference(item_c) }" :readonly="readonly" />
              </td>
              <td>
                <el-input v-if="item_c.addresstype == 1" v-model="item_c.offer_remarks" :readonly="readonly" placeholder="请注明餐厅名称或其他备注" />
                <el-input v-else v-model="item_c.offer_remarks" placeholder="请填写针对这个项目的特殊备注" :readonly="readonly" />
              </td>
              <!-- <td>{{ positiveFloatSix(positiveInteger(item_c.personcount) * positiveFloatSix(item_c.price)).toFixed(2) }}</td> -->
            </tr>
            <tr>
              <td colspan="4">
                客户特殊要求: {{ item.food_list[0].comments }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="total">
          <div>
            酒店内餐饮报价总计:
            <span>￥{{ positiveFloat(repastAllMoney) }}</span>
          </div>
          <div>
            酒店内餐饮报价总备注:
            <input type="text" v-model="info.food_remarks" placeholder="您可以填写详细的报价备注" :readonly="readonly" />
          </div>
        </div>
      </div>
      <!-- 酒店外餐饮需求 -->
      <div class="title_item title_item_sel" v-if="foodOutsideVisible">
        <div>酒店外餐饮需求 Others Food & Beverage</div>
        <div>餐标Dining Standard:￥{{ positiveFloat(info.food_limit) }}</div>
        <div class="">
          <el-checkbox disabled v-model="info.event_info_configure.others_food_inquiry_isnotservice" :true-label="1" :false-label="0">计入服务费</el-checkbox>
        </div>
      </div>
      <div class="section" v-if="foodOutsideVisible">
        <table v-for="(item, key) in info.quoted_price_outside_food" :key="key">
          <thead>
            <tr class="color_1">
              <th class="topleft datecolor" colspan="5">
                <div class="flex_row justify_between">
                  <div>日期: {{ item.date | date_day_ex }}</div>
                  <div>
                    一天总金额 ￥{{
                      otherFoodDayMoney(item.food_list).toFixed(2)
                    }}
                  </div>
                </div>
              </th>
            </tr>
            <tr class="color_2">
              <th>项目</th>
              <th>人数/人次</th>
              <th>需求备注</th>
              <th>单价（RMB/人）</th>
              <th>报价备注</th>
              <!-- <th>总价（¥）</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item_c, key) in item.food_list" :key="`c_${key}`">
              <td>
                {{ item_c.foodtypename }}
                <span v-if="item_c.usetypename">[{{ item_c.usetypename }}]</span>
                <!-- <span v-if="item_c.addresstype == 1" style="color: #f00">酒店外</span> -->
              </td>
              <td>{{ item_c.personcount }}</td>
              <td>{{ item_c.comments }}</td>
              <td>
                <el-input type="text" v-model="item_c.price" @input="item_c.price = formatNum(item_c.price, 2)" :class="{ difference: othersFoodDifference(item_c) }" :readonly="readonly" />
              </td>
              <td>
                <el-input v-if="item_c.addresstype == 1" v-model="item_c.offer_remarks" :readonly="readonly" placeholder="请注明餐厅名称或其他备注" />
                <el-input v-else v-model="item_c.offer_remarks" placeholder="请填写针对这个项目的特殊备注" :readonly="readonly" />
              </td>
              <!-- <td>{{ positiveFloatSix(positiveInteger(item_c.personcount) * positiveFloatSix(item_c.price)).toFixed(2) }}</td> -->
            </tr>
          </tbody>
        </table>
        <div class="total">
          <div>
            酒店外餐饮报价总计:
            <span>￥{{ positiveFloat(otherFoodAllMoney) }}</span>
          </div>
          <div>
            酒店外餐饮报价总备注:
            <input type="text" v-model="info.food_qutside_remarks" placeholder="您可以填写详细的报价备注" :readonly="readonly" />
          </div>
        </div>
      </div>
      <!-- 大交通需求 -->
      <div class="title_item title_item_sel" v-if="transportationVisible">
        <div>大交通需求</div>
        <div>
          <el-checkbox disabled v-model="
              info.event_info_configure.transportation_inquiry_isnotservice
            " :true-label="1" :false-label="0">计入服务费</el-checkbox>
        </div>
      </div>
      <div class="section" v-if="transportationVisible">
        <table v-for="(item, key) in info.quoted_price_transportation" :key="key">
          <thead>
            <tr class="color_1">
              <th class="topleft datecolor" colspan="9">
                日期: {{ item.date | date_day_ex }}
              </th>
              <th class="topleft" colspan="2">
                一天总金额 ￥{{
                  IntercityTransportationDayMoney(
                    item.transportation_list
                  ).toFixed(2)
                }}
              </th>
            </tr>
            <tr class="color_2">
              <th>目的地</th>
              <th>交通工具</th>
              <th>座位等级</th>
              <th>票价/折扣</th>
              <th>搭乘人数</th>
              <th>抵达时间</th>
              <th>单价（RMB/人）</th>
              <th>小计</th>
              <th>备注</th>
              <th>报价备注</th>
              <th>总价（¥）</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item_c, key) in item.transportation_list" :key="`c_${key}`">
              <td>{{ item_c.origincity }} - {{ item_c.destinationcity }}</td>
              <td>{{ item_c.transtypename }}</td>
              <td>{{ item_c.seatclassesname }}</td>
              <td>{{ item_c.specialpricename }}</td>
              <td>{{ item_c.passengercount }}</td>
              <td>{{ item_c.arrivetime }}</td>
              <td>
                <el-input v-model="item_c.unitprice" @input="item_c.unitprice = formatNum(item_c.unitprice, 2)" :class="{ difference: transportationDifference(item_c) }" :readonly="readonly" />
              </td>
              <td>
                ￥{{
                  positiveFloat(
                    positiveInteger(item_c.passengercount) *
                      positiveFloatSix(item_c.unitprice)
                  )
                }}
              </td>
              <td>{{ item_c.requirement }}</td>
              <td>
                <el-input v-model="item_c.offerremarks" :readonly="readonly" />
              </td>
              <td>
                {{
                  positiveFloat(
                    positiveInteger(item_c.passengercount) *
                      positiveFloatSix(item_c.unitprice)
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="total">
          <div>
            大交通报价总计:
            <span>￥{{ positiveFloat(IntercityTransportationAllMoney) }}</span>
          </div>
          <div>
            大交通报价总备注:
            <input type="text" v-model="info.transportation_remarks" placeholder="您可以填写详细的报价备注" :readonly="readonly" />
          </div>
        </div>
      </div>
      <!-- 地面交通 -->
      <div class="title_item title_item_sel" v-if="carVisible">
        <div>地面交通 Ground Transportation</div>
        <div>
          <el-checkbox disabled v-model="info.event_info_configure.car_inquiry_isnotservice" :true-label="1" :false-label="0">计入服务费</el-checkbox>
        </div>
      </div>
      <div class="section" v-if="carVisible">
        <table v-for="(item, key) in info.quoted_price_car" :key="key">
          <thead>
            <tr class="color_1">
              <th class="topleft datecolor" colspan="6">
                <div class="flex_row justify_between">
                  <div>日期: {{ item.date | date_day_ex }}</div>
                  <div>
                    一天总金额 ￥{{ CityDayMoney(item.carlist).toFixed(2) }}
                  </div>
                </div>
              </th>
            </tr>
            <tr class="color_2">
              <th>项目</th>
              <th>需求</th>
              <th>需求备注</th>
              <th>数量</th>
              <th>单价（RMB/车次）</th>
              <th>报价备注</th>
              <!-- <th>总价（¥）</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item_c, key) in item.carlist" :key="`c_${key}`">
              <td>{{ item_c.purposename }}</td>
              <td>
                <p>{{ item_c.vehicletypename }}</p>
                <p v-if="item_c.vehiclecount">
                  搭乘人数：{{ item_c.vehiclecount }}
                </p>
                <p v-if="item_c.city">用车城市： {{ item_c.city }}</p>
              </td>
              <td>{{ item_c.explain }}</td>
              <td>{{ item_c.carcount }}</td>
              <td>
                <el-input type="text" v-model="item_c.price" @input="item_c.price = formatNum(item_c.price, 2)" :class="{ difference: carDifference(item_c) }" :readonly="readonly" />
              </td>
              <td>
                <el-input v-model="item_c.offer_remarks" :readonly="readonly" />
              </td>
              <!-- <td>{{ positiveFloatSix(positiveInteger(item_c.carcount) * positiveFloatSix(item_c.price)).toFixed(2) }}</td> -->
            </tr>
          </tbody>
        </table>
        <div class="total">
          <div>
            地面交通报价总计:
            <span>￥{{ positiveFloat(CityAllMoney) }}</span>
          </div>
          <div>
            地面交通报价总备注:
            <input type="text" v-model="info.car_remarks" placeholder="您可以填写详细的报价备注" :readonly="readonly" />
          </div>
        </div>
      </div>
      <!-- 其他服务需求 -->
      <div class="title_item title_item_sel" v-if="otherVisible">
        <div>其他服务 Other</div>
      </div>
      <div class="section" v-if="otherVisible">
        <table>
          <thead>
            <tr class="color_2">
              <th>项目</th>
              <th>需求备注</th>
              <th>数量</th>

              <th>单价</th>
              <th>报价备注</th>
              <th>服务费</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item_c, key) in info.quoted_price_other" :key="`c_${key}`">
              <td>
                <!-- <span v-if="item_c.demandparticipatecount">{{ item_c.demandparticipatecount }}人 * {{ item_c.demandservicedaycount }}天</span> -->
                <template v-if="!item_c.inquiry_sheet_other_id">
                  <el-select v-model="item_c.other_code" clearable size="small" style="width: 200px" @change="addOtherChange(item_c)">
                    <el-option v-for="option in addOtherSelects" :key="option.code" :label="option.name" :value="option.code"></el-option>
                  </el-select>
                </template>
                <span v-else>{{ item_c.servicetypename }}</span>
              </td>

              <td>
                <template v-if="!item_c.inquiry_sheet_other_id">
                  <el-select v-show="
                      ['009-5', '009-6', '009-7', '009-11', '009-12'].includes(
                        item_c.other_code
                      )
                    " v-model="item_c.two_level_code" clearable size="small" style="width: 200px">
                    <el-option v-for="two_level_option in item_c.detail" :key="two_level_option.code" :label="two_level_option.name" :value="two_level_option.code"></el-option>
                  </el-select>
                </template>
                <span v-else>{{ item_c.describe }}</span>
              </td>
              <td>
                <el-input v-model="item_c.offerparticipatecount" class="line" @input="
                    item_c.offerparticipatecount = formatNum(
                      item_c.offerparticipatecount,
                      1
                    )
                  " :disabled="item_c.inquiry_sheet_other_id != null" :class="{ difference: otherNumDifference(item_c) }" />
              </td>

              <td>
                ￥
                <el-input type="text" v-model="item_c.price" @input="item_c.price = formatNum(item_c.price, 2)" style="width: 90%" :class="{ difference: otherDifference(item_c) }" :readonly="readonly" />
              </td>
              <td>
                <el-input v-model="item_c.offer_remarks" :readonly="readonly" />
              </td>
              <td>
                <el-checkbox v-model="item_c.isnotservice" :disabled="item_c.other_code != '009-12'" :true-label="1" :false-label="0">计入服务费</el-checkbox>
                <span v-if="!item_c.inquiry_sheet_other_id" @click="delOther(item_c, key)" style="margin-left: 10px; color: #409eff; cursor: pointer">删除</span>
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
        <div class="total">
          <div>
            其他服务报价总计:
            <span>￥{{ otherAllMoney.toFixed(2) }}</span>
          </div>
          <div>
            其他服务报价总备注:
            <input type="text" v-model="info.other_remarks" placeholder="您可以填写详细的报价备注" :readonly="readonly" />
          </div>
        </div>
      </div>

      <div class="title_item" v-if="hotelVisible">服务费</div>
      <div class="section" v-if="hotelVisible">
        <table>
          <thead>
            <tr class="color_2">
              <th colspan="2">服务费</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody>
            <!-- 非直采服务费：分项计费、阶梯计费、跳档计费 -->
            <template v-if="
                info.event_info_configure.service_fee_calculation_method == 1
              ">
              <tr v-for="(item, index) in info.event_info_ladder_taxrates" :key="index">
                <td colspan="2">
                  <span>阶梯{{ index + 1 }}：</span>
                  <el-input :readonly="index == 0" :disabled="!info.event_info_configure.servicecanedit" type="text" class="line" size="mini" style="width: 100px" v-model="item.ladder_min" @input="item.ladder_min = formatNum(item.ladder_min)" placeholder="" />
                  ~
                  <el-input :disabled="!info.event_info_configure.servicecanedit" type="text" class="line" size="mini" style="width: 100px" placeholder="" v-model="item.ladder_max" @input="item.ladder_max = formatNum(item.ladder_max)" />
                  *
                  <el-input class="line" size="mini" v-model="item.ladder_taxrate" :disabled="!info.event_info_configure.servicecanedit" @input="
                      item.ladder_taxrate = formatNum(item.ladder_taxrate)
                    " />
                  % (请输入阶梯金额范围和服务费比例)
                  <span v-if="
                      info.event_info_configure.service_fee_ratio &&
                      index == info.event_info_ladder_taxrates.length - 1
                    ">
                    *
                    <el-input class="line" size="mini" :readonly="readonly" v-model="info.fzc_service" @input="info.fzc_service = formatNum(info.fzc_service)" />
                    %
                  </span>
                  <!-- <el-button type="text" @click="addLadder()">添加阶梯</el-button> -->
                  <!-- <el-button type="text" v-if="index!=0" @click="delLadder(index)">删除</el-button> -->
                </td>
                <td>￥{{ positiveFloat(severEveryMoneyList[index] || 0).toFixed(2) }}</td>
              </tr>
            </template>
            <template v-if="
                info.event_info_configure.service_fee_calculation_method == 2
              ">
              <td colspan="2">
                {{ serviceTotalMoney }} * {{ grade_taxrate }}%
                <span v-if="info.event_info_configure.service_fee_ratio">
                  *
                  <el-input class="line" size="mini" :readonly="readonly" v-model="info.fzc_service" />
                  %
                </span>
              </td>
              <td>
                <span v-if="
                    info.event_info_configure.minimum_service_fee == 1 &&
                    info.feizhicai_service <=
                      info.event_info_configure.minimum_service_fee_money
                  ">
                  ￥
                  {{
                    positiveFloat(
                      info.event_info_configure.minimum_service_fee_money
                    )
                  }}
                </span>
                <span v-else>{{
                  positiveFloat(
                    (((grade_taxrate * serviceTotalMoney) / 100) *
                      info.fzc_service) /
                      100
                  )
                }}</span>
              </td>
            </template>
            <!-- <tr>
							<td colspan="2">非直采服务费 
								{{ this.InTheHotelMoney }}*
								<el-input
									v-model="info.travelagency_payment_proportion"
									@input="info.travelagency_payment_proportion = formatNum(info.travelagency_payment_proportion, 1)"
									class="line"
									size="mini"
									:readonly="readonly"
								/>
								%
							</td>
							<td>￥{{ TravelAgencyMoney.toFixed(2) }}</td>
						</tr> -->

            <!-- 直采服务费 -->
            <tr v-if="info.zhicai_service == 1">
              <td colspan="2">
                <div style="display: flex">
                  <p style="width: 30%">直采服务费</p>
                  <div>
                    <p v-for="(
                        item, index
                      ) in info.event_quoted_price_zhicai_service" :key="index" style="
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
                            item.grade_count = positiveFloatOne(
                              item.grade_count
                            )
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
                直采服务费
                <el-input v-model="info.advance_amount" @input="info.advance_amount = formatNum(info.advance_amount)" class="line" size="mini" :readonly="readonly" />*
                <el-input v-model="info.advance_proportion" @input="
                    info.advance_proportion = formatNum(info.advance_proportion)
                  " class="line" size="mini" :readonly="readonly" />
                %
              </td>
              <td>￥{{ positiveFloat(OutsideHotelMoney) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="title_item">VAT</div>
      <div class="section">
        <table>
          <thead>
            <tr class="color_2">
              <th colspan="2">VAT</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <template v-if="info.taxtype == 'VAT'">
                  (￥{{ positiveFloat(money) }} + ￥{{
                    positiveFloat(
                      serveAllMoney -
                        (info.event_info_configure.fzc_service_fee_money == 0
                          ? info.feizhicai_service
                          : 0)
                    )
                  }})
                </template>
              </td>
              <td>
                <!-- <el-radio v-model="info.taxtype" label="VAT" :disabled="readonly">VAT</el-radio> -->
                *
                <el-input v-model="info.taxrate" @input="info.taxrate = formatNum(info.taxrate)" class="line" :readonly="readonly" size="mini" :disabled="info.event_info_configure.vatcanedit == 0" />
                %
              </td>
              <td rowspan="2">￥{{ positiveFloat(Taxes).toFixed(2) }}</td>
            </tr>
            <!-- <tr>
							<td>
								<el-radio v-model="info.taxtype" label="非VAT" :disabled="readonly">非VAT</el-radio>
								0%
							</td>
							<td>
								<template v-if="info.taxtype == '非VAT'">
									(￥{{ money.toFixed(2) }} + ￥{{ serviceAllMoney.toFixed(2) }}) * 0%
								</template>
							</td>
						</tr> -->
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="total">
          <div>
            <a @click="excelexport" v-if="this.$route.params.isSubmit == 0" style="
                cursor: pointer;
                color: #428bca;
                font-size: 17px;
                margin-right: 30px;
              " download>下载excel</a>
            <span style="font-size: 32px">RFP总报价: ￥{{
                (
                  positiveFloat(money) +
                  positiveFloat(serveAllMoney) +
                  positiveFloat(Taxes)
                ).toFixed(2)
              }}</span>
          </div>
        </div>
      </div>

      <a v-show="false" :href="downloadUrl" target="_blank" ref="a_click" download></a>

      <div class="title_item">报价书、报价说明（付款条件及其他备注）</div>
      <div class="section">
        <div class="uploadFile">
          <span>上传报价书：</span>
          <el-upload :on-change="
              (file, fileList) => {
                handleChangeAttach(file, fileList);
              }
            " :on-remove="
              (file, fileList) => {
                handleRemoveAttach(file, fileList);
              }
            " :on-preview="handlePreview" :auto-upload="false" :file-list="this.fileList" :multiple="false" class="upload-demo" action="" :disabled="readonly" ref="upload">
            <el-button size="small" type="primary">选择文件</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <div class="remark">
          您可以上传您的官方报价书给终端客户。这份报价书将为保存保证此次交易的合规性。
        </div>
        <div class="selDate">
          <span>*</span>
          报价有效期：
          <div class="block">
            <!-- <span class="demonstration">默认</span> -->
            <el-date-picker :readonly="readonly" @change="dataChange" v-model="info.quotationenddate" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </div>
        </div>
        <div class="explain">报价说明（付款条件及其他备注）</div>
        <textarea class="bz" v-model="info.offer_remarks" placeholder="请填写会场可使用面积、订金比例、订金支付和尾款结算方式等。"></textarea>
      </div>
      <div class="section btn_sec" v-if="this.$route.params.isSubmit == 1">
        <el-button type="cancel" class="btn" @click="saveAndDownload">保存草稿，下载报价单</el-button>
        <el-button type="primary" class="btn" @click="submit">提交报价</el-button>
      </div>
      <!-- </el-form> -->
    </div>
  </div>
</template>

<script>
/**
 * @page 活动询价订单报价
 */
import { isIntegerNotMust, checkMaxVal_ex } from '@/assets/js/validator'
import '@/assets/js/directive'
import upload from '@/utils/upload'
import { guid, positiveInteger, positiveFloat, positiveFloatOne, positiveFloatSix, formatDate, formatNum, getNextDateFormat, getFormatDate, CompareDate } from '@/utils/common'
import excelExport from '@/utils/exportexcel'
import { limitsEffect } from '@/utils/uploadRestrictions'
export default {
  data() {
    return {
      info: {
        event_info_configure: {
          vatcanedit: 0
        },
        fzc_service: 100 // 服务费比例折扣
      },
      severEveryMoneyList: [], // 服务费、各阶梯计费总价
      grade_taxrate: 0, // 跳档服务费收取比例
      serviceTotalMoney: 0, // 计入服务费总净价
      hotelList: [],
      rules: {
        IntegerNotMust: [
          {
            validator: isIntegerNotMust,
            trigger: 'change'
          }
        ]
      },
      readonly: false,
      loading: false,
      addConferenceSelects: [], // 会场新增下拉选项
      addOtherSelects: [], // 其他新增下拉选项
      errormsg: [], //异常信息, 保存时使用
      demandList: {}, // 所有下拉选项
      warningmsg: '', //警告信息
      foodlimitwarningmsg: [], //警告信息
      selVat: '',
      //dateSel: this.getNextDateFormat(new Date(), 10), //初始化当前时间推后十天
      info: {},
      contractsId: '', //酒店联系人id
      fileList: [],
      roomOut: 1,
      conferenceOut: 1,
      foodOut: 1,
      transportationOut: 1,
      carOut: 1,
      otherOut: 1,
      disabled: true,
      downloadUrl: '', //下载地址
      roomcostProjects: []
    }
  },
  methods: {
    guid,
    positiveInteger,
    positiveFloatSix,
    positiveFloatOne,
    positiveFloat,
    formatNum,
    formatDate,
    getNextDateFormat,
    excelExport,
    getFormatDate,
    CompareDate,
    limitsEffect,
    excelExport,
    // 下载报价确认单
    downloadOfferConfirm() {
      var name = '报价确认单'
      this.excelExport('/Template/GetTemplate', { eventid: this.info.activity_id, type: 5, param: this.info.id }, name)
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
    // 删除会场其他费用
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
    //
    addOther() {
      let addData = {
        type: 4,
        other_code: '',
        servicetypename: '',
        two_level_code: '',
        offerparticipatecount: '',
        price: '',
        offer_remarks: '',
        isnotservice: 0,
        detail: [],
        indexs: this.info.quoted_price_other.length + 1
      }
      this.info.quoted_price_other.push(addData)
    },
    delOther(other, index) {
      let type4_cotnt = 0
      this.info.quoted_price_other.splice(index, 1)
      // 删除子项后，排序字段重新赋值
      this.info.quoted_price_other.forEach((item, index) => {
        item.indexs = index + 1
      })
    },
    addOtherChange(item_c) {
      this.addOtherSelects.forEach(element => {
        if (element.code == item_c.other_code) {
          // item_c.detail = element.detail
          item_c.detail = element.detail.filter(item => {
            return item.detail_type !== '0'
          })

          console.log(item_c.detail)
          item_c.two_level_code = '' // 清空二级分类
          //
          item_c.isnotservice = element.isnotservice
        }
      })
    },
    searchSelectOption(code) {
      //
      this.requestApi({
        url: '/orderform/GetdictionaryList',
        method: 'post',
        data: {
          code: code,
          meetingid: this.info.meeting_id
        }
      }).then(res => {
        if (code == '0049') {
          this.addConferenceSelects = res
        } else {
          this.addOtherSelects = res
          this.info.quoted_price_other.forEach(item => {
            // item.isnotservice = Boolean(item.isnotservice)
            this.addOtherSelects.forEach(element => {
              if (element.code == item.other_code && !item.inquiry_sheet_other_id) {
                // item_c.detail = element.detail
                item.detail = element.detail.filter(item => {
                  return item.detail_type !== '0'
                })

                console.log(item.detail)
                // item.two_level_code = '' // 清空二级分类
                //
                item.isnotservice = element.isnotservice
              }
            })
          })
        }
      })
    },
    conferenceTypeChange(item_c) {
      this.addConferenceSelects.forEach(element => {
        if (item_c.quoted_code == element.code) {
          item_c.quoted_name = element.name
        }
      })
    },
    // // 采购下拉数据处理与渲染
    // getDemandList() {
    // 	return new Promise((resolve, reject) => {
    // 		this.$api.servicePurchase({MeetingID: this.eventId}, "POST").then((res) => {
    // 			this.demandList = res;
    // 			resolve(res)
    // 		});
    // 	})
    // },
    excelexport() {
      //导出excel
      var name = 'DMC报价单' + this.info.id
      this.excelExport('/Template/GetTemplate', { eventid: this.info.activity_id, type: 3, param: this.info.id }, name)
    },
    saveAndDownload() {
      this.info.status = '0014-5' // 保存草稿
      this.save()
    },
    //报价有效期修改后日期格式化
    dataChange(e) {
      this.info.quotationenddate = this.formatDate('YYYY-mm-dd HH:MM:SS', e)
    },
    changeCostProject(e, item) {
      item.roomtypename = item.custom_roomtype = this.roomcostProjects.filter(element => {
        return element.code == e
      })[0].name
      item.custom_roomtypeid = e
      item.roomtypid = e
    },
    //报价人修改后
    changeSel(e) {
      this.info.contactslist.forEach((item, i) => {
        if (e == item.id) {
          this.info.bidder = item.id
          this.info.biddername = item.contacts
          this.info.biddertel = item.telephone
          this.info.bidderemail = item.email
          this.disabled = true
        }
        if (e == item.id && item.contacts == '其他') {
          this.disabled = false
          this.info.bidder = null
          this.info.biddername = ''
        }
      })
    },
    //税费-设置默认值
    initVat() {
      if (this.info.roomtaxid == null) this.info.roomtaxid = this.info.taxlist[0].id
      if (this.info.conferencetaxid == null) this.info.conferencetaxid = this.info.taxlist[0].id
      if (this.info.foodtaxid == null) {
        this.info.taxlist.forEach((e, index) => {
          if (e.outtaxrate == 1 && e.invoicetype == 1) {
            this.info.foodtaxid = e.id
          }
        })
      }
      /* if(this.info.transportationtaxid==null)
				this.info.transportationtaxid=this.info.taxlist[0].id
			if(this.info.cartaxid==null)
				this.info.cartaxid=this.info.taxlist[0].id
			if(this.info.othertaxid==null)
				this.info.othertaxid=this.info.taxlist[0].id */

      this.info.taxlist.forEach((item, i) => {
        if (item.id == this.info.roomtaxid) {
          this.roomOut = item.outtaxrate
        }
        if (item.id == this.info.conferencetaxid) {
          this.conferenceOut = item.outtaxrate
        }
        if (item.id == this.info.foodtaxid) {
          this.foodOut = item.outtaxrate
        }
        if (item.id == this.info.transportationtaxid) {
          this.transportationOut = item.outtaxrate
        }
        if (item.id == this.info.cartaxid) {
          this.carOut = item.outtaxrate
        }
        if (item.id == this.info.othertaxid) {
          this.otherOut = item.outtaxrate
        }
      })
    },
    //客房税费
    roomVat(e) {
      this.info.taxlist.forEach((item, i) => {
        if (item.id == e) {
          this.roomOut = item.outtaxrate
        }
      })
      this.info.roomtaxid = e
    },
    //会场税费
    conferenceVat(e) {
      this.info.taxlist.forEach((item, i) => {
        if (item.id == e) {
          this.conferenceOut = item.outtaxrate
        }
      })
      this.info.conferencetaxid = e
    },
    //酒店内餐饮税费
    foodVat(e) {
      this.info.taxlist.forEach((item, i) => {
        if (item.id == e) {
          this.foodOut = item.outtaxrate
        }
      })
      this.info.foodtaxid = e
    },
    //大交通税费
    transportationVat(e) {
      this.info.taxlist.forEach((item, i) => {
        if (item.id == e) {
          this.transportationOut = item.outtaxrate
        }
      })
      this.info.transportationtaxid = e
    },
    //地面交通税费
    carVat(e) {
      this.info.taxlist.forEach((item, i) => {
        if (item.id == e) {
          this.carOut = item.outtaxrate
        }
      })
      this.info.cartaxid = e
    },
    //其他服务税费
    otherVat(e) {
      this.info.taxlist.forEach((item, i) => {
        if (item.id == e) {
          this.otherOut = item.outtaxrate
        }
      })
      this.info.othertaxid = e
    },
    // 上传文件
    handleChangeAttach(file, fileList) {
      const isLt30M = file.size / 1024 / 1024 < 30

      if (!this.limitsEffect(file)) {
        //后缀名不符合的在文件列表中删除该文件
        this.$refs.upload.handleRemove(file, fileList)
        return
      }

      if (!isLt30M) {
        this.$message.error('上传附件大小不能超过 30MB!')
        // 取消时在文件列表中删除该文件
        this.$refs.upload.handleRemove(file, fileList)
        return
      }
      this.fileList = fileList
    },
    handleRemoveAttach(file, fileList) {
      this.fileList = fileList
    },
    // 预览文件
    handlePreview(file) {
      debugger
      if (!file.url) return
      // 获取文件后缀名
      let suffix = file.url.substring(file.url.lastIndexOf('.') + 1)
      // doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
      let types1 = ['pdf', 'jpeg', 'jpg', 'png', 'txt']
      let types2 = ['docx', 'doc', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx']
      file.url = file.url.replace(/http:/, 'https:')
      this.downloadUrl = file.url
      if (types2.includes(suffix)) {
        this.downloadUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(file.url)
      } else if (types1.includes(suffix)) {
        this.downloadUrl = file.url
      } else {
        this.$message.info('文件格式不支持预览，下载后查看')
      }
      // this.downloadUrl= 'https://view.xdocin.com/view?src=' + encodeURIComponent(file.url)
      setTimeout(() => {
        this.$refs.a_click.click()
      }, 100)
    },
    // 下载文件
    // handlePreview(file) {
    // 	file.url = file.url.replace(/http:/, 'https:');
    // 	this.downloadUrl=file.url
    // 	setTimeout(() => {
    // 		this.$refs.a_click.click();
    // 	}, 100);
    // },
    remoteMethod(query) {
      this.loading = true
      this.requestApi({
        url: '/hotel/list',
        method: 'post',
        data: {
          Page: 1,
          Rows: 99,
          keyword: query
        }
      }).then(res => {
        this.loading = false
        this.hotelList = res.List
      })
    },
    // 添加房型
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
      this.info.quoted_price_room[key - 1].room_list.forEach((item, key_c) => {
        this.info.quoted_price_room[key].room_list.forEach((roomItem, roomIndex) => {
          if (item.roomtype == roomItem.roomtype) {
            roomItem.provide_count = item.provide_count
            roomItem.unitprice = item.unitprice
            roomItem.remarks = item.remarks
          }
        })
        // let romS = this.info.quoted_price_room[key].room_list[key_c];
        // if (romS) {
        // 	romS.roomtypename = item.roomtypename;
        // 	romS.provide_count = item.provide_count;
        // 	romS.remarks = item.remarks;
        // 	romS.unitprice = item.unitprice;
        // }
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
      if (this.info.quoted_price_room && this.info.quoted_price_room.length > 0) {
        this.info.quoted_price_room.forEach(item => {
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
          let message1 = '<p>客户所需客房数量<' + temp + '></p>'
          let message2 = '<p>与您填写的数量<' + temp1 + '></p>'
          this.warningmsg = message1 + message2
        }
      }
      if (this.foodlimitwarningmsg.length > 0) {
        this.foodlimitwarningmsg.forEach(msg => {
          this.warningmsg += '<p>' + msg + '</p>'
        })
      }
      if (this.warningmsg != '') this.warningmsg += '<p>确认提交当前报价吗？</p>'
    },
    validate: function() {
      this.errormsg = []
      this.checkRoomDifference
      this.checkConferenceDifference
      this.checkFoodDifference
      this.checkTransportationDifference
      this.checkCarDifference
      this.checkOtherDifference

      if (this.errormsg.length > 0) this.differenceShowErrorMessage()
      return this.errormsg.length == 0
    },
    // 添加/修改
    submit() {
      if (!this.disabled) {
        var telStr = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
        var emailStr = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ ///^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!this.info.biddername || !this.info.biddertel || !this.info.bidderemail) {
          this.$message.error('姓名、手机、邮箱缺一不可！')
          return
        } else if (!emailStr.test(this.info.bidderemail)) {
          this.$message.error('邮箱格式不正确！')
          return
        }
      }
      if (this.info.roomtaxid == null || this.info.conferencetaxid == null || this.info.foodtaxid == null) {
        this.$message.error('税率未选择！')
        return
      }
      if (!this.info.quotationenddate) {
        this.$message.error('报价有效期未填写!')
        return
      }
      if (!this.CompareDate(this.info.quotationenddate, this.formatDate('YYYY-mm-dd HH:MM:SS', new Date()))) {
        this.$message.error('有效期不允许在当前日期之前!')
        return
      }
      //表单验证
      if (!this.validate()) {
        return
      }
      this.addroomProvidecountwarningmsg()

      this.info.status = '0014-6' // 提交报价状态赋值

      if (this.warningmsg == '') this.save()
      else {
        this.$confirm(this.warningmsg, '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定提交',
          cancelButtonText: '返回修改',
          type: 'warning'
        })
          .then(() => {
            this.save()
          })
          .catch(() => {})
      }

      // if(!this.info.hotel_name){
      //  this.$message.error('请选择采购酒店');
      //   return;
      // }
    },
    save() {
      let urls = []
      //组装本次上传数据
      let thisfileList = this.fileList.filter(w => w.uid != '')
      if (this.fileList.length > 0)
        thisfileList.forEach(item => {
          urls.push({
            key: item.uid,
            file: item.raw
          })
        })
      console.log(urls)
      upload(urls).then(rest => {
        //验证已上传文件是否被删除
        if (this.info.attachlist && this.info.attachlist.length > 0) {
          this.info.attachlist.forEach(item => {
            if (
              this.fileList.filter(w => {
                return w.id == item.id
              }).length == 0
            ) {
              this.fileList.filter(w => {
                console.log(
                  w.id,
                  item.id,
                  this.fileList.filter(w => {
                    return w.id == item.id
                  }).length
                )
                return w.id == item.id
              })
              item.delete = true
            }
          })
        }

        rest.forEach(item => {
          if (item) {
            this.info.attachlist.push({
              filepath: item.FilePath,
              filename: item.OriginalFileName,
              filetype: 1
            })
          }
        })

        let fixtwo = this.positiveFloat(this.quotedPrice)
        this.$confirm('您报价￥' + fixtwo + '元,确认提交?', '提示', {
          confirmButtonText: '确定提交报价',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            if (this.info.taxtype == '非VAT') this.info.taxrate = 0
            // 直采服务费为拜耳规则，直采服务费总额赋值
            if (this.info.zhicai_service == 1) {
              this.info.advance_amount = this.baierSeversMoney
              this.info.advance_proportion = 100
            }

            let rooms = this.info.quoted_price_room
            for (let i = 0; i < rooms.length; i++) {
              let roomlist = rooms[i].room_list
              for (let j = 0; j < roomlist.length; j++) {
                if (!roomlist[j].TableName) {
                  roomlist[j].indexs = j + 1

                  roomlist[j].inside_roomcount = 0
                  roomlist[j].outside_roomcount = roomlist[j].provide_count
                } else {
                  if (this.info.is_Inside_outside == 0) {
                    roomlist[j].inside_roomcount = 0
                    roomlist[j].outside_roomcount = roomlist[j].provide_count
                  }
                  if (this.info.is_Inside_outside == 1) {
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
            debugger
            if (this.info.total_amount) {
              this.info.total_amount = this.positiveFloat(this.info.total_amount)
              console.log(this.info)
            }
            this.requestApi({
              url: '/quotation/submit',
              method: 'post',
              data: this.info
            }).then(async res => {
              if (res) {
                debugger
                if (this.info.status == '0014-5') {
                  // 报价保存草稿
                  // await this.excelexport();
                  let name = 'DMC报价单' + res.event_quoted_price_id
                  this.excelExport(
                    '/Template/GetTemplate',
                    {
                      eventid: this.info.activity_id,
                      type: 3,
                      param: res.event_quoted_price_id
                    },
                    name
                  )
                }
                this.$router.push({
                  name: 'DMCinquiryInfo',
                  params: {
                    id: this.info.inquiry_sheet_object_id
                    //id: this.$route.params.id
                  }
                })
              } else {
                this.$message({
                  message: '提交失败',
                  type: 'fail'
                })
              }
            })
          })
          .catch(() => {})
      })
    },
    // 新增阶梯
    addLadder() {
      if (this.info.event_info_ladder_taxrates[this.info.event_info_ladder_taxrates.length - 1].ladder_max) {
        this.info.event_info_ladder_taxrates.push({
          event_info_id: this.info.activity_id,
          id: this.guid(),
          ladder_min: this.info.event_info_ladder_taxrates[this.info.event_info_ladder_taxrates.length - 1].ladder_max * 1 + 1,
          ladder_max: 0,
          ladder_taxrate: 8
        })
      } else {
        this.$message.error('请将上一阶梯信息填写完整')
      }
    },
    // 删除阶梯
    delLadder(index) {
      this.info.event_info_ladder_taxrates.splice(index, 1)
    }
    /* taxesSumPrice(taxId){//税后总价小计
			this.info.taxlist.filter(e=>{
				if(e.id==taxId){
					return e.outtaxrate
				}
				
			})
		},
		 */
  },

  computed: {
    formateDate: () => {
      return function(value) {
        return formatDate('YYYY年mm月dd日', new Date(value))
      }
    },
    //酒店元素可见性
    //0为酒店1为服务商
    hotelVisible: function() {
      return this.info.inquirysheetType == 1
    },
    //客房需求
    roomVisible: function() {
      return this.info.quoted_price_room && this.info.quoted_price_room.length > 0
    },
    //会场需求
    conferenceVisible: function() {
      return this.info.quoted_price_conference && this.info.quoted_price_conference.length > 0
    },
    //餐饮需求
    foodVisible: function() {
      return this.info.quoted_price_food && this.info.quoted_price_food.length > 0
    },
    foodOutsideVisible: function() {
      return this.info.quoted_price_outside_food && this.info.quoted_price_outside_food.length > 0
    },
    //大交通需求
    transportationVisible: function() {
      return this.info.quoted_price_transportation && this.info.quoted_price_transportation.length > 0
    },
    //地面交通
    carVisible: function() {
      return this.info.quoted_price_car && this.info.quoted_price_car.length > 0
    },
    //其他服务需求
    otherVisible: function() {
      return this.info.quoted_price_other && this.info.quoted_price_other.length > 0
    },
    //未填写单价、报价提示内容
    adddifferenceerrormsg: () => {
      return function(type, date, rowIndex) {
        let message = ''
        if (type == 1) message = this.formateDate(date) + '客房,第' + rowIndex + '行,单价未填写,请填写单价'
        else if (type == 2) message = this.formateDate(date) + '会场,第' + rowIndex + '行,报价未填写,请填写报价'
        else if (type == 3) message = this.formateDate(date) + '餐饮,第' + rowIndex + '行,单价未填写,请填写单价'
        else if (type == 4) message = this.formateDate(date) + '大交通,第' + rowIndex + '单价未填写,请填写单价'
        else if (type == 5) message = this.formateDate(date) + '地面交通,第' + rowIndex + '行,单价未填写,请填写单价'
        else if (type == 6) message = '其他服务,第' + rowIndex + '行,单价未填写,请填写单价'
        else if (type == 7) message = '其他服务,第' + rowIndex + '行,数量未填写,请填写数量'
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
    //超过餐标警告提示
    addfoodlimiterrormsg: () => {
      return function(type, date, rowIndex) {
        let message = ''
        if (type == 3) message = this.formateDate(date) + '酒店内餐饮,第' + rowIndex + '行,超过餐标'
        this.foodlimitwarningmsg.push(message)
      }
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
      if (this.info.quoted_price_room && this.info.quoted_price_room.length > 0) {
        this.info.quoted_price_room.forEach(item => {
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
    /* // 一天总金额
		dayMoney: () => {
			return function(list) {
				let money = 0;
				list.forEach(item => {
					money += this.positiveInteger(item.provide_count) * this.positiveFloatSix(item.unitprice);
				});
				return this.positiveFloatSix(money);
			};
		},
		// 所有总价
		allMoney: function() {
			let money = 0;
			if (this.info.quoted_price_room && this.info.quoted_price_room.length > 0) {
				this.info.quoted_price_room.forEach(item => {
					money += this.positiveFloatSix(this.dayMoney(item.room_list));
				});
			}
			return this.positiveFloatSix(money*parseFloat(this.roomOut));
		}, */
    // 一天总金额
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
          money += pc * this.positiveFloatSix(item.unitprice)
        })
        return this.positiveFloatSix(money * parseFloat(this.roomOut))
      }
    },
    // 所有总价
    allMoney: function() {
      let money = 0
      if (this.info.quoted_price_room && this.info.quoted_price_room.length > 0) {
        this.info.quoted_price_room.forEach(item => {
          money += this.positiveFloatSix(this.dayMoney(item.room_list))
        })
      }
      return this.positiveFloatSix(money)
    },
    /* // 会议需求
		// 一天总金额
		meetingDayMoney: () => {
			return function(list) {
				let money = 0;
				list.forEach(item => {
					money += this.positiveFloatSix(item.price);
				});
				return this.positiveFloatSix(money);
			};
		},
		// 所有总价
		meetingAllMoney: function() {
			let money = 0;
			if (this.info.quoted_price_conference && this.info.quoted_price_conference.length > 0) {
				this.info.quoted_price_conference.forEach(item => {
					money += this.meetingDayMoney(item.conference_list);
				});
			}
			return this.positiveFloatSix(money*parseFloat(this.conferenceOut));
		}, */
    // 会议需求
    // 一天总金额
    meetingDayMoney: () => {
      return function(list) {
        let money = 0
        list.forEach(item => {
          money += this.positiveFloatSix(item.price * (item.count ? item.count : 0))
        })
        return this.positiveFloatSix(money * parseFloat(this.conferenceOut))
      }
    },
    // 所有总价
    meetingAllMoney: function() {
      let money = 0
      if (this.info.quoted_price_conference && this.info.quoted_price_conference.length > 0) {
        this.info.quoted_price_conference.forEach(item => {
          money += this.meetingDayMoney(item.conference_list)
        })
      }
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
      if (this.info.quoted_price_conference && this.info.quoted_price_conference.length > 0) {
        this.info.quoted_price_conference.forEach(item => {
          if (item.conference_list && item.conference_list.length > 0) {
            item.conference_list.forEach((conference, row_index) => {
              difference = this.conferenceDifference(conference)
              if (difference) this.adddifferenceerrormsg(2, item.date, row_index + 1)
            })
          }
        })
      }
    },
    /* // 餐饮需求
		// 一天总金额
		repastDayMoney: () => {
			return function(list) {
				let money = 0;
				list.forEach(item => {
					money += this.positiveInteger(item.personcount) * this.positiveFloatSix(item.price);
				});
				return this.positiveFloatSix(money);
			};
		},
		// 所有总价
		repastAllMoney: function() {
			let money = 0;
			if (this.info.quoted_price_food && this.info.quoted_price_food.length > 0) {
				this.info.quoted_price_food.forEach(item => {
					money += this.repastDayMoney(item.food_list);
				});
			}
			return this.positiveFloatSix(money*parseFloat(this.foodOut));
		}, */
    // 餐饮需求
    // 一天总金额
    repastDayMoney: () => {
      return function(list) {
        let money = 0
        list.forEach(item => {
          money += this.positiveInteger(item.personcount) * this.positiveFloatSix(item.price)
        })
        return this.positiveFloatSix(money * parseFloat(this.foodOut))
      }
    },
    // 所有总价
    repastAllMoney: function() {
      let money = 0
      if (this.info.quoted_price_food && this.info.quoted_price_food.length > 0) {
        this.info.quoted_price_food.forEach(item => {
          money += this.repastDayMoney(item.food_list)
        })
      }
      return this.positiveFloatSix(money)
    },
    //餐饮需求价格验证标记
    foodDifference: () => {
      return function(item) {
        return item.price === ''
      }
    },
    //会议餐标验证
    foodLimit: () => {
      return function(item, food_limit) {
        return parseFloat(item.price) > parseFloat(food_limit)
      }
    },
    //保存时验证餐饮数据
    checkFoodDifference: function() {
      let difference = false
      let food_limit = false
      this.foodlimitwarningmsg = []
      if (this.info.quoted_price_food && this.info.quoted_price_food.length > 0) {
        this.info.quoted_price_food.forEach(item => {
          if (item.food_list && item.food_list.length > 0) {
            item.food_list.forEach((food, row_index) => {
              difference = this.foodDifference(food)
              if (difference) this.adddifferenceerrormsg(3, item.date, row_index + 1)
              food_limit = this.foodLimit(food, this.info.food_limit)
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
      if (this.info.quoted_price_outside_food && this.info.quoted_price_outside_food.length > 0) {
        this.info.quoted_price_outside_food.forEach(item => {
          money += this.otherFoodDayMoney(item.food_list)
        })
      }
      return this.positiveFloatSix(money)
    },
    // 酒店外餐饮税费
    otherFoodTaxMoney: function() {
      let money = 0
      money = this.otherFoodAllMoney * (this.info.event_info_configure.others_food_inquiry_taxrate / 100)
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
      if (this.info.quoted_price_outside_food && this.info.quoted_price_outside_food.length > 0) {
        this.info.quoted_price_outside_food.forEach(item => {
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
    // 大交通需求
    // 一天总金额
    IntercityTransportationDayMoney: () => {
      return function(list) {
        let money = 0
        list.forEach(item => {
          money += this.positiveInteger(item.passengercount) * this.positiveFloatSix(item.unitprice)
        })
        return this.positiveFloatSix(money)
      }
    },
    // 所有总价
    IntercityTransportationAllMoney: function() {
      let money = 0
      if (this.info.quoted_price_transportation && this.info.quoted_price_transportation.length > 0) {
        this.info.quoted_price_transportation.forEach(item => {
          money += this.IntercityTransportationDayMoney(item.transportation_list)
        })
      }
      return this.positiveFloatSix(money * parseFloat(this.transportationOut))
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
      if (this.info.quoted_price_transportation && this.info.quoted_price_transportation.length > 0) {
        this.info.quoted_price_transportation.forEach(item => {
          if (item.transportation_list && item.transportation_list.length > 0) {
            item.transportation_list.forEach((transportation, row_index) => {
              difference = this.transportationDifference(transportation)
              if (difference) this.adddifferenceerrormsg(4, item.date, row_index + 1)
            })
          }
        })
      }
    },
    // 室内用车
    // 一天总金额
    CityDayMoney: () => {
      return function(item) {
        let money = 0
        item.forEach(item => {
          money += this.positiveInteger(item.carcount) * this.positiveFloatSix(item.price)
        })
        return this.positiveFloatSix(money)
      }
    },
    // 所有总价
    CityAllMoney: function() {
      let money = 0
      if (this.info.quoted_price_car && this.info.quoted_price_car.length > 0) {
        this.info.quoted_price_car.forEach(item => {
          money += this.CityDayMoney(item.carlist)
        })
      }
      return this.positiveFloatSix(money * parseFloat(this.carOut))
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
      if (this.info.quoted_price_car && this.info.quoted_price_car.length > 0) {
        this.info.quoted_price_car.forEach(item => {
          if (item.car_list && item.car_list.length > 0) {
            item.car_list.forEach((car, row_index) => {
              difference = this.carDifference(car)
              if (difference) this.adddifferenceerrormsg(5, item.date, row_index + 1)
            })
          }
        })
      }
    },
    // 其他服务需求
    // 所有总价
    otherAllMoney: function() {
      let money = 0
      if (this.info.quoted_price_other && this.info.quoted_price_other.length > 0) {
        this.info.quoted_price_other.forEach(item => {
          //
          // money += this.positiveInteger(item.offerparticipatecount) * this.positiveInteger(item.offerservicedaycount) * this.positiveFloatSix(item.price);
          money += this.positiveInteger(item.offerparticipatecount) * this.positiveFloatSix(item.price)
        })
      }
      return this.positiveFloatSix(money * parseFloat(this.otherOut))
    },
    //其他服务需求价格验证标记
    otherDifference: () => {
      return function(item) {
        return item.price === ''
      }
    },
    //其他服务需求价数量验证标记
    otherNumDifference: () => {
      return function(item) {
        return item.offerparticipatecount == ''
      }
    },
    //保存时验证其他服务数据
    checkOtherDifference: function() {
      let difference = false
      if (this.info.quoted_price_other && this.info.quoted_price_other.length > 0) {
        this.info.quoted_price_other.forEach((item, row_index) => {
          difference = this.otherDifference(item)
          if (difference) this.adddifferenceerrormsg(6, null, row_index + 1)
          if (item.offerparticipatecount == '') this.adddifferenceerrormsg(7, null, row_index + 1)
        })
      }
    },
    // 消费总金额
    money: function() {
      // return (
      //   this.allMoney +
      //   this.meetingAllMoney +
      //   this.repastAllMoney +
      //   this.IntercityTransportationAllMoney +
      //   this.CityAllMoney +
      //   this.otherAllMoney
      // );
      this.info.total_price = positiveFloatSix(this.allMoney) + positiveFloatSix(this.meetingAllMoney) + positiveFloatSix(this.repastAllMoney) + positiveFloatSix(this.otherFoodAllMoney) + positiveFloatSix(this.IntercityTransportationAllMoney) + positiveFloatSix(this.CityAllMoney) + positiveFloatSix(this.otherAllMoney)
      return positiveFloatSix(this.info.total_price)
    },
    // 酒店内费用 客房费用+会场费用+酒店内餐饮费用
    InTheHotelMoney: function() {
      let InhotelMoney = 0
      if (this.info.quoted_price_food && this.info.quoted_price_food.length > 0) {
        this.info.quoted_price_food.forEach(item => {
          item.food_list.forEach(item => {
            if (item.addresstype == 0) {
              InhotelMoney += this.positiveInteger(item.personcount) * this.positiveFloatSix(item.price)
            }
          })
        })
      }
      // return this.allMoney + this.meetingAllMoney + InhotelMoney;
      this.info.travelagency_payment_money = positiveFloatSix(this.allMoney) + positiveFloatSix(this.meetingAllMoney) + positiveFloatSix(InhotelMoney)
      return this.positiveFloatSix(this.info.travelagency_payment_money)
    },
    // 酒店外费用 交通费用+用车费用+酒店外餐饮费用+其他服务费用（不包括全陪，地接）
    OutsideTheHotelMoney: function() {
      let OutsidehotelMoney = 0
      let otherAllMoney = 0
      if (this.info.quoted_price_food && this.info.quoted_price_food.length > 0) {
        this.info.quoted_price_food.forEach(item => {
          item.food_list.forEach(item => {
            if (item.addresstype == 1) {
              OutsidehotelMoney += this.positiveInteger(item.personcount) * this.positiveFloatSix(item.price)
            }
          })
        })
      }
      if (this.info.quoted_price_other && this.info.quoted_price_other.length > 0) {
        this.info.quoted_price_other.forEach(item => {
          if (item.islocalguide != 1) {
            otherAllMoney += this.positiveInteger(item.offerparticipatecount) * this.positiveInteger(item.offerservicedaycount) * this.positiveFloatSix(item.price)
          }
        })
      }
      // return (
      //   this.IntercityTransportationAllMoney +
      //   this.CityAllMoney +
      //   OutsidehotelMoney + otherAllMoney
      // );
      this.info.off_hotel_expenses = positiveFloatSix(this.IntercityTransportationAllMoney) + positiveFloatSix(this.CityAllMoney) + OutsidehotelMoney + otherAllMoney
      return this.positiveFloatSix(this.info.off_hotel_expenses)
    },
    // 服务费
    // 旅行社代付金额
    TravelAgencyMoney: function() {
      return this.positiveFloatSix(positiveFloatSix(this.InTheHotelMoney) * (this.positiveFloatSix(this.info.travelagency_payment_proportion) / 100))
    },
    // 旅行社代付金额
    AdvancesMoney: function() {
      return positiveFloatSix(this.positiveFloatSix(this.info.advance_amount) * (this.positiveFloatSix(this.info.advance_proportion) / 100))
    },
    // 旅行社代付金额
    OutsideHotelMoney: function() {
      return positiveFloatSix(this.info.advance_amount * (this.positiveFloatSix(this.info.advance_proportion) / 100))
    },
    // 总额
    serviceAllMoney: function() {
      return positiveFloatSix(this.TravelAgencyMoney + this.AdvancesMoney + this.OutsideHotelMoney)
    },
    // 拜耳直采服务费计算
    baierSeversMoney() {
      let money = 0
      this.info.event_quoted_price_zhicai_service.forEach(item => {
        money += item.grade_price * item.grade_count ? item.grade_count : 0
      })
      return money
    },
    // 服务费总价
    serveAllMoney: function() {
      let money = 0
      //
      if (this.info.event_info_configure.service_fee_calculation_method == 0) {
        // 分项计费服务费算法
        money =
          this.allMoney.toFixed(2) * (this.info.event_info_configure.room_inquiry_service_taxrate / 100) +
          this.meetingAllMoney.toFixed(2) * (this.info.event_info_configure.conference_inquiry_service_taxrate / 100) +
          this.repastAllMoney.toFixed(2) * (this.info.event_info_configure.hotel_food_inquiry_service_taxrate / 100) +
          this.otherFoodAllMoney.toFixed(2) * (this.info.event_info_configure.others_food_inquiry_service_taxrate / 100) +
          this.IntercityTransportationAllMoney.toFixed(2) * (this.info.event_info_configure.transportation_inquiry_service_taxrate / 100) +
          this.CityAllMoney.toFixed(2) * (this.info.event_info_configure.car_inquiry_service_taxrate / 100)
        this.offline_quoted_price_others.forEach(otherItem => {
          money += (otherItem.offerparticipatecount * otherItem.price * otherItem.service_taxrate) / 100
        })
      } else if (this.info.event_info_configure.service_fee_calculation_method == 1) {
        // 阶梯计费服务费算法
        let totalMoney = 0
        totalMoney += this.info.event_info_configure.room_inquiry_isnotservice ? this.allMoney : 0
        totalMoney += this.info.event_info_configure.conference_inquiry_isnotservice ? this.meetingAllMoney : 0
        totalMoney += this.info.event_info_configure.hotel_food_inquiry_isnotservice ? this.repastAllMoney : 0
        totalMoney += this.info.event_info_configure.others_food_inquiry_isnotservice ? this.otherFoodAllMoney : 0
        totalMoney += this.info.event_info_configure.transportation_inquiry_isnotservice ? this.IntercityTransportationAllMoney : 0
        totalMoney += this.info.event_info_configure.car_inquiry_isnotservice ? this.CityAllMoney : 0
        this.info.quoted_price_other.forEach(otherItem => {
          totalMoney += otherItem.isnotservice ? otherItem.offerparticipatecount * otherItem.price : 0
        })

        this.severEveryMoneyList = []
        this.info.event_info_ladder_taxrates.forEach((item, index) => {
          if (totalMoney <= item.ladder_min) {
          } else if (totalMoney >= item.ladder_min && totalMoney <= item.ladder_max) {
            // 总价在阶梯最大值、最小值之间
            //
            money += ((totalMoney - item.ladder_min + (index == 0 ? 0 : 1)) * item.ladder_taxrate) / 100
            this.severEveryMoneyList.push(positiveFloatSix(((((totalMoney - item.ladder_min + (index == 0 ? 0 : 1)) * item.ladder_taxrate) / 100) * this.info.fzc_service) / 100))
          } else if (totalMoney > item.ladder_max && this.info.event_info_ladder_taxrates[index + 1]) {
            // 总价大于阶梯最大值 且还有下一阶梯
            this.severEveryMoneyList.push(positiveFloatSix(((((item.ladder_max - item.ladder_min + (index == 0 ? 0 : 1)) * item.ladder_taxrate) / 100) * this.info.fzc_service) / 100))

            money += ((item.ladder_max - item.ladder_min + (index == 0 ? 0 : 1)) * item.ladder_taxrate) / 100
            // totalMoney -= item.ladder_max;
          } else if (totalMoney >= item.ladder_max && !this.info.event_info_ladder_taxrates[index + 1]) {
            // 总价大于阶梯最大值 且没有下一阶梯
            this.severEveryMoneyList.push(positiveFloatSix(((((totalMoney - item.ladder_min + (index == 0 ? 0 : 1)) * item.ladder_taxrate) / 100) * this.info.fzc_service) / 100))
            money += ((totalMoney - item.ladder_min + (index == 0 ? 0 : 1)) * item.ladder_taxrate) / 100
          }
        })
      } else if (this.info.event_info_configure.service_fee_calculation_method == 2) {
        // 跳档计费服务费算法
        let totalMoney = 0
        totalMoney += this.info.event_info_configure.room_inquiry_isnotservice ? this.allMoney : 0
        totalMoney += this.info.event_info_configure.conference_inquiry_isnotservice ? this.meetingAllMoney : 0
        totalMoney += this.info.event_info_configure.hotel_food_inquiry_isnotservice ? this.repastAllMoney : 0
        totalMoney += this.info.event_info_configure.others_food_inquiry_isnotservice ? this.otherFoodAllMoney : 0
        totalMoney += this.info.event_info_configure.transportation_inquiry_isnotservice ? this.IntercityTransportationAllMoney : 0
        totalMoney += this.info.event_info_configure.car_inquiry_isnotservice ? this.CityAllMoney : 0
        this.info.quoted_price_other.forEach(otherItem => {
          totalMoney += otherItem.isnotservice ? otherItem.offerparticipatecount * otherItem.price : 0
        })
        this.serviceTotalMoney = totalMoney
        for (var i = 0; i < this.info.event_info_grade_taxrates.length; i++) {
          if (i == this.info.event_info_grade_taxrates.length - 1 || (totalMoney >= this.info.event_info_grade_taxrates[i].grade_money && totalMoney < this.info.event_info_grade_taxrates[i + 1].grade_money)) {
            money = (totalMoney * this.info.event_info_grade_taxrates[i].grade_taxrate) / 100 // 服务费金额 = 计入服务费总价 * 对应档次 服务费比例
            this.grade_taxrate = this.info.event_info_grade_taxrates[i].grade_taxrate // 设置跳档服务费收取比例
            break
          }
        }
      }
      money *= this.info.fzc_service / 100 // 非直采服务费折扣

      // 有非直采最低服务费 并且 非直采服务费 小于 最低服务费，取值最低服务费
      if (this.info.event_info_configure.minimum_service_fee == 1 && money < this.info.event_info_configure.minimum_service_fee_money) {
        money = this.info.event_info_configure.minimum_service_fee_money
      }

      this.info.feizhicai_service = money

      // 是否是拜耳直采服务费规则  服务费总额添加直采服务费
      if (this.info.zhicai_service == 1) {
        money += this.baierSeversMoney
      } else {
        money += (this.info.advance_amount * this.info.advance_proportion) / 100
      }

      return money
    },
    // 税费
    Taxes: function() {
      let taxes = 0
      if (this.info.taxtype == 'VAT') {
        //
        if (this.info.event_info_configure.fzc_service_fee_money == 0) {
          // 非直采服务费不计税
          taxes = ((this.money + this.serveAllMoney - this.info.feizhicai_service) * this.positiveFloatSix(this.info.taxrate)) / 100
        } else {
          // 非直采服务费计税
          taxes = ((this.money + this.serveAllMoney) * this.positiveFloatSix(this.info.taxrate)) / 100
        }
        return taxes
      } else {
        return (this.money + this.serveAllMoney) * 0
      }
    },
    // hkz
    // 报价总额
    quotedPrice: function() {
      debugger
      this.info.taxation = this.Taxes || 0
      let total_amount = this.positiveFloat(this.money) + this.positiveFloat(this.serveAllMoney) + this.positiveFloat(this.Taxes)
      this.info.total_amount = total_amount /* this.info.total_amount = positiveFloatSix(this.money + this.serviceAllMoney); */
      return this.info.total_amount
    }
  },
  mounted() {
    this.requestApi({
      url: '/orderform/GetdictionaryList',
      method: 'post',
      data: {
        code: '0034'
      }
    }).then(res => {
      this.roomcostProjects = res
    })

    if (this.$route.params.isSubmit == 0) {
      this.readonly = true
    }

    // this.getDemandList();
    this.requestApi({
      url: '/hotel/list',
      method: 'post',
      data: {
        Page: 1,
        Rows: 99
      }
    }).then(res => {
      this.hotelList = res.List
    })
    this.requestApi({
      url: '/quotation/info',
      method: 'post',
      data: {
        id: this.$route.params.id,
        type: this.$route.params.type || ''
      }
    }).then(res => {
      if (res.quotationenddate != null) res.quotationenddate = this.getFormatDate(res.quotationenddate)
      // if(res.quotationenddate==null) res.quotationenddate=new Date();
      if (this.$route.params.isSubmit == 1) res.quotationenddate = this.getNextDateFormat(new Date(), 10) //填写时，当前日期+10天
      res.quoted_price_other.forEach(item => {
        item.isnotservice = Boolean(item.isnotservice)
      })
      this.info = res
      if (this.info.event_info_configure.service_fee_ratio == 0 || this.info.fzc_service == null) this.info.fzc_service = 100 // 不支持服务费比例修改，服务费比例设置为100%
      if (this.info.bidder != undefined) this.contractsId = this.info.bidder
      if (this.info.event_info_ladder_taxrates.length == 0) {
        this.info.event_info_ladder_taxrates = [{ ladder_min: 0, ladder_max: 100000, ladder_taxrate: 8 }] // 阶梯费率
      } else {
        this.info.event_info_ladder_taxrates[0].ladder_min = 0
      }
      // 如果ID 为 null，说明是初次填写报价，将需求客房数量赋值到酒店可提供数量
      if (this.info.id == null) {
        this.info.quoted_price_room.forEach(date => {
          date.room_list.forEach(roomItem => {
            roomItem.provide_count = roomItem.roomcount
          })
        })
      }

      this.initVat()
      if (this.info.attachlist) {
        this.info.attachlist.forEach(item => {
          this.fileList.push({
            name: item.filename,
            url: this.info.quotationfile_domin + item.filepath,
            id: item.id
          })
        })
      }
      this.searchSelectOption('0049') // 查询会场下拉选项
      this.searchSelectOption('009') // 查询其他下拉选项
    })
  }
}
</script>

<style lang="scss" scoped>
/* 不显示验证错误提示内容*/
.el-form-item {
  margin-bottom: 0px !important;
}

.el-form-item__error {
  display: none !important;
}

.quotedprice {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 16px;
  padding: 15px 20px;
  border-bottom: 1px solid #f6f6f6;
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
    background-color: #3272a8;
    color: #fff;
    padding: 20px 10px;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .title_item_sel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sel_el {
      width: 340px;
    }
  }

  .section {
    padding: 20px 0;
    .uploadFile {
      display: flex;
      padding: 15px 0px;
      align-items: center;
      .upload-demo {
        margin-left: 100px;
      }
    }
    .remark {
      padding: 0px 0px;
    }
    .selDate {
      display: flex;
      align-items: center;
      padding: 15px 0px;
      span {
        color: red;
      }
    }
    .explain {
      padding: 15px 0px;
    }
  }
  .info {
    // margin-top: 15px;
    border: 1px solid #dddddd;
    .line {
      display: flex;
      border-bottom: 1px solid #dddddd;
      &:last-child {
        border: 0;
      }
      .item {
        flex: 1;
        display: flex;
        align-items: center;
        .label {
          background-color: #eeeeee;
          font-weight: bold;
          width: 160px;
          font-size: 14px;
          padding: 0 10px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 10px;
          box-sizing: border-box;
          span {
            color: red;
          }
        }
        .context {
          flex: 1;
          padding: 10px;
          box-sizing: border-box;
        }
        .contextSel {
          display: flex;
          .el-input {
            margin-left: 20px;
          }
        }
        .hotel {
          span {
            margin-right: 10px;
            cursor: pointer;
            color: #3a87ad;
          }
        }
      }
    }
    .box-card {
      .header {
        color: #3a87ad;
        background-color: #d9edf7;
        border-color: #d6e9c6;
        border-radius: 5px;
        padding: 10px;
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
    padding: 10px;
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
      color: #f00;
      font-weight: bold;
      font-size: 24px;
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
}

.bz {
  width: 100%;
  height: 100px;
  padding: 15px;
  box-sizing: border-box;
}

.btn_sec {
  text-align: center;
}

.btn {
  width: 200px;
  height: 50px;
}

.copy {
  margin-left: 100px;
}
.excel {
  padding: 5px 8px;
  // background-color: #fcf8e3;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
}
.excel > span {
  color: #666;
}
.excel > a {
  color: #428bca;
}
.path {
  // width: 1100px;
  height: 55px;
  // background: red;
  margin: 0;
  padding: 15px 20px;
}

.path ul {
  display: flex;
  line-height: 55px;
}

.path ul li {
  padding-left: 10px;
}
</style>
