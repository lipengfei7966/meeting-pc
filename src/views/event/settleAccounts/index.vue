<template>
  <div class="orderInfo" v-if="info">
    <div class="title">
      我的订单 - 结算单 -
      <template v-if="info">
        {{ info.ordernum }}
      </template>
    </div>
    <a v-show="false" :href="downloadUrl" target="_blank" ref="a_click" download></a>
    <div class="content" v-if="info">
      <div class="tips" v-if="info.settlement_status === status_draft">
        <p>
          该草稿保存于{{
            info.submit_time ? getFormatDate(info.submit_time) : ""
          }}
        </p>
      </div>
      <div class="step">
        Step1 确认订单基本信息
        <p style="color: #428bca; font-size: 17px; float: right">
          <a v-if="info.event_info_configure.jsqrisdisplay == 1" @click="downloadSettlementConfirm" style="cursor: pointer; margin: 0 10px" download>下载结算确认单</a>
          <a @click="excelDownload" v-if="this.$route.params.issubmit == 0" style="cursor: pointer; margin: 0 10px" download>下载结算Excel</a>
        </p>
      </div>
      <div class="info">
        <div class="line">
          <div class="item">
            <div class="label">订单号</div>
            <div class="context">{{ info.ordernum }}</div>
          </div>
          <div class="item">
            <div class="label">联系人</div>
            <div class="context">{{ info.event_info.fullname }}</div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">下单时间</div>
            <div class="context">
              {{ info.orderdate ? getFormatDate(info.orderdate) : "" }}
            </div>
          </div>
          <div class="item">
            <div class="label">联系方式</div>
            <div class="context">{{ info.event_info.mobile }}</div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">活动日期</div>
            <div class="context">
              {{
                info.event_info.event_startdate
                  ? getFormatDate(info.event_info.event_startdate).slice(0, 10)
                  : ""
              }}
              至
              {{
                info.event_info.event_enddate
                  ? getFormatDate(info.event_info.event_enddate).slice(0, 10)
                  : ""
              }}
            </div>
          </div>
          <div class="item">
            <div class="label">实际参会人数</div>
            <div class="context">
              外部人数
              <el-input class="input_line" v-model="info.external_number" @input="
                  info.external_number = formatNum(info.external_number, 1)
                " :readonly="readonly" />
              人 内部人数
              <el-input class="input_line" v-model="info.internal_number" @input="
                  info.internal_number = formatNum(info.internal_number, 1)
                " :readonly="readonly" />
              人 总人数
              {{
                positiveInteger(info.external_number) +
                positiveInteger(info.internal_number)
              }}
              人
            </div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">客户名称</div>
            <div class="context">{{ info.event_info.company_name }}</div>
          </div>
          <div class="item">
            <div class="label">旅行社陪同人员</div>
            <div class="context hotel">
              <el-input class="input_line" style="width: 200px" v-model="info.travel_agency_escort" @input="
                  info.travel_agency_escort = formatNum(
                    info.travel_agency_escort,
                    1
                  )
                " :readonly="readonly" />
              人
            </div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">活动名称</div>
            <div class="context">{{ info.event_info.event_name }}</div>
          </div>
          <div class="item">
            <div class="label">PO单号</div>
            <div class="context">
              <el-input class="input_line" style="width: 200px" v-model="info.event_info.pocode" :disabled="true" />
            </div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">报价日期</div>
            <div class="context">
              {{
                info.quotedpricedate ? getFormatDate(info.quotedpricedate) : ""
              }}
            </div>
          </div>
          <div class="item">
            <div class="label">采购酒店</div>
            <div class="context">
              <el-input class="input_line" style="width: 200px" v-model="info.hotelname" :readonly="readonly" />
              <el-checkbox v-model="info.isuser_preferred_hotel" :true-label="1" :false-label="0" style="line-height: 30px; margin-left: 20px">是否使用首选酒店</el-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="step step_upflod">
        Step2 上传结算相关凭证（必填）
        <div class="showBase_tap" @click="showInfo = !showInfo">
          <img :src="
              showInfo
                ? require('@/assets/images/close.png')
                : require('@/assets/images/open.png')
            " alt="" />
          <span>{{ showInfo ? "收起" : "展开" }}</span>
        </div>
      </div>
      <table v-show="showInfo">
        <thead>
          <tr class="color_2">
            <th>凭证名称</th>
            <th>文件</th>
            <th>客户异议</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in arrayList" :key="index">
          <tr>
            <td>{{ item.name }}</td>
            <td>
              <el-upload ref="upload" action="" :on-change="
                  (file, fileList) => {
                    handleChangeAttach(file, fileList, (type = item.type));
                  }
                " :on-remove="
                  (file, fileList) => {
                    handleRemoveAttach(file, fileList, (type = item.type));
                  }
                " :on-preview="handlePreview" :auto-upload="false" :file-list="item.fileList" :show-file-list="false" :multiple="false">
                <el-button slot="trigger" size="small" type="primary">从电脑选择文件</el-button>
                <ul style="margin-top: 5px">
                  <li v-for="(file, file_index) in item.fileList" @click="handlePreview(file)" class="pitchOn" :key="file_index">
                    <span>{{ file.name }}</span>
                    <span @click.stop="fileRename(file, index, file_index)" style="color: #199ed8; cursor: pointer; margin-left: 30px">重命名</span>
                    <span @click.stop="
                        deleteFile(file, index, file_index, item.arrayLength)
                      " style="color: #199ed8; cursor: pointer; margin-left: 10px">删除</span>
                    <span v-if="file.create_date" style="margin-left: 10px">于{{ getFormatDate(file.create_date) }}上传</span>
                    <span style="color: red; margin-left: 30px" v-if="item.arrayLength == file_index && isFail">上传失败</span>
                  </li>
                </ul>
              </el-upload>
              <el-dialog :close-on-click-modal="false" :visible.sync="rename" title="请输入附件名称" width="500px">
                <el-input placeholder="请输入名称" v-model="fileName">
                  <template slot="append">
                    {{ suffix }}
                  </template>
                </el-input>
                <span slot="footer" class="dialog-footer flex_row justify_center mar_t20">
                  <el-button type="primary" size="small" @click="saveFileName()">保存</el-button>
                </span>
              </el-dialog>
            </td>
            <td>{{ item.dissent }}</td>
            <td>
              <el-input v-model="item.remark" />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="step step_upflod">
        Step3 填写结算明细（必填）
        <div class="showBase_tap" @click="showPriceInfo = !showPriceInfo">
          <img :src="
              showPriceInfo
                ? require('@/assets/images/close.png')
                : require('@/assets/images/open.png')
            " alt="" />
          <span>{{ showPriceInfo ? "收起" : "展开" }}</span>
        </div>
      </div>
      <table v-show="showPriceInfo">
        <thead>
          <tr class="color_2">
            <th colspan="4" class="color_3">
              原订单总报价：¥{{ positiveFloat(price[0]).toFixed(2) }}
              <br />
              原订单总报价(税前)：¥{{
                positiveFloat(
                  positiveFloat(servicePrice[0]) +
                    (info.zhicai_service === 0
                      ? positiveFloat(servicePrice[4])
                      : positiveFloat(servicePrice[8])) +
                    positiveFloat(price_no[0])
                ).toFixed(2)
              }}
              <br />
              原订单总报价(净价)：¥{{ positiveFloat(price_no[0]) }}
            </th>
            <th style="position: relative" colspan="5">
              订单总结算价：¥{{ positiveFloat(price[1]).toFixed(2) }}
              <br />
              订单总结算价(税前)：¥{{
                positiveFloat(
                  positiveFloat(servicePrice[1]) +
                    (info.zhicai_service === 0
                      ? positiveFloat(servicePrice[5])
                      : positiveFloat(servicePrice[9])) +
                    positiveFloat(price_no[1])
                ).toFixed(2)
              }}
              <br />
              订单总结算价(净价)：¥{{ positiveFloat(price_no[1]) }}

              <div v-if="!readonly" class="add_settle">
                <el-button @click="openAddSettle" type="primary" class="el-icon-folder-add" size="mini">添加结算项目</el-button>
              </div>
            </th>
          </tr>
        </thead>

        <tbody v-if="roomVisible">
          <tr class="color_2">
            <th class="color_3"><i style="color: #428bca">客房</i></th>
            <th class="color_3" colspan="3" style="text-align: right">
              报价金额：¥{{ positiveFloat(roomPrice[0].all) }}
            </th>
            <th colspan="4" style="text-align: right">
              结算金额：¥{{ positiveFloat(roomPrice[1].all) }}
            </th>
            <th></th>
          </tr>
        </tbody>
        <tbody v-for="(item, key) in info.roomlist" :key="`kefang${key}`">
          <tr class="color_2">
            <th class="color_3">
              <i>{{ item.date | date_day_ex }}</i>
            </th>
            <th class="color_3" colspan="3" style="text-align: right">
              小计：¥{{ positiveFloat(roomPrice[0].subtotal[`sub_${key}`]) }}
            </th>
            <th colspan="4" style="text-align: right">
              小计：¥{{ positiveFloat(roomPrice[1].subtotal[`sub_${key}`]) }}
            </th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addroom(item)">添加客房</el-button>
            </th>
          </tr>
          <tr class="color_2">
            <th class="color_3">消费项目</th>
            <th class="color_3">单价(元)</th>
            <th class="color_3">数量</th>
            <th class="color_3">金额(元)</th>
            <th>单价(元)</th>
            <th v-if="info.is_Inside_outside == '0'">数量</th>
            <th v-if="info.is_Inside_outside == '1'">内部间数 外部间数</th>
            <th>金额(元)</th>
            <th>客户异议</th>
            <th>结算说明</th>
          </tr>
          <tr v-for="(room, key) in item.roomlists" :key="`room${key}`" :class="{ difference: room.difference }">
            <td class="color_2">
              <template v-if="room.quoted_price_room_id">
                {{ room.roomtypename }}
              </template>
              <template v-else>
                <!-- <el-input v-model="room.settlement_itemname" placeholder="消费项目名称" :readonly="readonly || !!room.lineoroffline" /> -->
                <el-select @change="changekefang($event, room)" :loading="cost_project_load" v-model="room.settlement_itemid" size="small" filterable>
                  <el-option v-for="cp in roomcostProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
                </el-select>
              </template>
              <el-tooltip v-if="
                  room.quoted_price_room_id &&
                  (room.otherrequirements || room.remarks)
                " class="describe-tooltip" effect="dark" placement="top-end">
                <div slot="content" style="width: 150px">
                  <div v-if="room.otherrequirements">
                    需求说明：{{ room.otherrequirements }}
                  </div>
                  <div v-if="room.remarks">报价备注：{{ room.remarks }}</div>
                </div>
                <el-button type="text">备注</el-button>
              </el-tooltip>
            </td>
            <td class="color_2">¥{{ positiveFloat(room.unitprice) }}</td>
            <td class="color_2">
              <p v-if="info.is_Inside_outside == '0'">
                {{ room.provide_count }}
              </p>
              <div v-if="info.is_Inside_outside == '1'">
                <p>内部人员：{{ room.inside_roomcount }}</p>
                <p>外部人员：{{ room.outside_roomcount }}</p>
              </div>
            </td>
            <td class="color_2">
              ¥{{ positiveFloat(room.quotationsumprice) }}
            </td>
            <td>
              <el-input type="text" v-model="room.settlement_unitprice" @input="
                  room.settlement_unitprice = formatNum(
                    room.settlement_unitprice,
                    2
                  )
                " :readonly="readonly || !!room.lineoroffline" :class="{ lineBack: !!room.lineoroffline }" />
            </td>
            <td>
              <el-input v-if="info.is_Inside_outside == '0'" v-model="room.settlement_count" @input="
                  room.settlement_count = formatNum(room.settlement_count, 3)
                " placeholder="请输入数量" :readonly="readonly || !!room.lineoroffline" :class="{ lineBack: !!room.lineoroffline }" style="width: 50%" />
              <div v-if="info.is_Inside_outside == '1'" style="display: flex">
                <el-input @input="
                    room.settlement_inside_roomcount = formatNum(
                      room.settlement_inside_roomcount,
                      3
                    );
                    room.settlement_count =
                      positiveFloat(room.settlement_inside_roomcount) +
                      positiveFloat(room.settlement_outside_roomcount);
                  " v-model="room.settlement_inside_roomcount" placeholder="请输入数量" :readonly="readonly || !!room.lineoroffline" :class="{ lineBack: !!room.lineoroffline }" style="width: 55%" />
                <el-input @input="
                    room.settlement_outside_roomcount = formatNum(
                      room.settlement_outside_roomcount,
                      3
                    );
                    room.settlement_count =
                      positiveFloat(room.settlement_inside_roomcount) +
                      positiveFloat(room.settlement_outside_roomcount);
                  " v-model="room.settlement_outside_roomcount" placeholder="请输入数量" :readonly="readonly || !!room.lineoroffline" :class="{ lineBack: !!room.lineoroffline }" style="width: 55%; margin-left: 10px" />
              </div>
            </td>
            <!-- <template v-if="info.is_Inside_outside == '1'">
							<td v-if="!room.lineoroffline">¥{{ positiveFloatSix(positiveFloatSix(room.settlement_unitprice) * positiveFloat(room.roomcount)).toFixed(2) }}</td>
						</template>
						<template v-else>
							<td v-if="!room.lineoroffline">¥{{ positiveFloatSix(positiveFloatSix(room.settlement_unitprice) * positiveFloat(room.settlement_count)).toFixed(2) }}</td>
						</template> -->
            <td v-if="!room.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(room.settlement_unitprice) *
                    positiveFloat(room.settlement_count)
                )
              }}
            </td>

            <!-- <td v-else>¥{{ room.settlementsumprice.toFixed(2) }}</td> -->
            <td>{{ room.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="room.settlement_comments" :readonly="readonly || !!room.lineoroffline" :class="{
                  difference: roomDifference(room),
                  line: !room.quoted_price_room_id,
                  lineBack: !!room.lineoroffline,
                }" />
              <el-button icon="el-icon-delete" type="danger" :disabled="readonly || !!room.lineoroffline" circle size="mini" @click="delroom(item, key)" v-if="!room.quoted_price_room_id && issubmit"></el-button>
            </td>
          </tr>
        </tbody>
        <!-- 客房杂费 -->
        <tbody v-if="roomVisible">
          <tr class="color_2">
            <th class="color_3">杂费小计</th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th></th>
            <th></th>
            <th style="text-align: right">
              小计：¥{{ positiveFloat(roomPrice[2]) }}
            </th>
            <th>客户异议</th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addOther(1)">添加杂费</el-button>
            </th>
          </tr>
          <tr v-for="roomzf in roomincidental" :key="roomzf.id">
            <td class="color_2">
              <el-input v-model="roomzf.content" :readonly="readonly || !!roomzf.lineoroffline" placeholder="杂费项名称" />
            </td>
            <td class="color_2">
              <el-checkbox :disabled="readonly || !!roomzf.lineoroffline" v-model="roomzf.isnotservice" :true-label="1" :false-label="0">计入服务费</el-checkbox>
            </td>
            <td class="color_2"></td>
            <td class="color_2"></td>
            <td>
              <el-input v-model="roomzf.price" :class="{ lineBack: !!roomzf.lineoroffline }" @input="roomzf.price = formatNum(roomzf.price, 2)" :readonly="readonly || !!roomzf.lineoroffline" />
            </td>
            <td>
              <el-input v-model="roomzf.count" :class="{ lineBack: !!roomzf.lineoroffline }" @input="roomzf.count = positiveFloatOne(roomzf.count)" :readonly="readonly || !!roomzf.lineoroffline" />
              <!-- <el-input-number 
								v-model.number="roomzf.count" 
								:controls="false" 
								:precision="1" 
								placeholder="请输入数量" 
								:readonly="readonly || !!roomzf.lineoroffline"
								:class="{ lineBack: !!roomzf.lineoroffline }"
								style="width: 50%;">
							</el-input-number> -->
            </td>
            <td v-if="!roomzf.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(roomzf.price) * positiveFloat(roomzf.count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ roomzf.sumprice.toFixed(2) }}</td> -->
            <td>{{ roomzf.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="roomzf.comments" :readonly="readonly || !!roomzf.lineoroffline" class="line" :class="{ lineBack: !!roomzf.lineoroffline }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" :disabled="readonly || !!roomzf.lineoroffline" v-if="issubmit" @click="delOther(roomzf.id)"></el-button>
            </td>
          </tr>
        </tbody>

        <tbody v-if="conferenceVisible">
          <tr class="color_2">
            <th class="color_3"><i style="color: #428bca">会场</i></th>
            <th class="color_3" colspan="3" style="text-align: right">
              报价金额：¥{{ positiveFloat(conferencePrice[0].all) }}
            </th>
            <th colspan="4" style="text-align: right">
              结算金额：¥{{ positiveFloat(conferencePrice[1].all) }}
            </th>
            <th></th>
          </tr>
        </tbody>
        <tbody v-for="(item, key) in info.conferencelist" :key="`huiyi${key}`">
          <tr class="color_2">
            <th class="color_3">
              <i>{{ item.date | date_day_ex }}</i>
            </th>
            <th class="color_3" colspan="3" style="text-align: right">
              小计：¥{{
                positiveFloat(conferencePrice[0].subtotal[`sub_${key}`])
              }}
            </th>
            <th colspan="4" style="text-align: right">
              小计：¥{{
                positiveFloat(conferencePrice[1].subtotal[`sub_${key}`])
              }}
            </th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addconference(item)">添加会场</el-button>
            </th>
          </tr>
          <tr class="color_2">
            <th class="color_3">消费项目</th>
            <th class="color_3">单价(元)</th>
            <th class="color_3">数量</th>
            <th class="color_3">金额(元)</th>
            <th>单价(元)</th>
            <th>数量</th>
            <th>金额(元)</th>
            <th>客户异议</th>
            <th>结算说明</th>
          </tr>
          <tr v-for="(conference, key) in item.conferencelists" :key="`conference${key}`">
            <td class="color_2">
              <template v-if="conference.quoted_price_conference_id">
                <template v-if="conference.type == 1">
                  {{
                    "场租-会场" +
                    conference.order_name +
                    `(${conference.roomsetuptypename};会议时间:${conference.starttime}~${conference.endtime};出席人数:${conference.attendees}人)`
                  }}
                </template>
                <template v-if="conference.type == 2">
                  {{
                    "会场搭建费-" +
                    conference.related_information +
                    " (" +
                    conference.roomsetuptypename +
                    ")"
                  }}
                </template>
                <template v-if="conference.type == 3">
                  {{
                    `设备-会场${conference.order_name}` +
                    `(${conference.roomsetuptypename};${conference.equipment})`
                  }}
                </template>
                <template v-if="conference.type == 4">
                  <!-- <el-select :loading="cost_project_load" v-model="conference.settlement_itemid" size="small" filterable>
										<el-option v-for="cp in meetingcostProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
									</el-select> -->

                  {{ conference.settlement_itemname }}
                </template>
              </template>
              <template v-else>
                <el-select @change="changehuichang($event, conference)" :loading="cost_project_load" v-model="conference.settlement_itemid" size="small" filterable>
                  <el-option v-for="cp in meetingcostProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
                </el-select>
                <!-- <el-input v-model="conference.settlement_itemname" :readonly="readonly || !!conference.lineoroffline" placeholder="消费项目名称" /> -->
              </template>
              <el-tooltip v-if="
                  conference.quoted_price_conference_id &&
                  (conference.describe || conference.comments)
                " class="describe-tooltip" effect="dark" placement="top-end">
                <div slot="content" style="width: 150px">
                  <div v-if="conference.describe">
                    需求说明：{{ conference.describe }}
                  </div>
                  <div v-if="conference.comments">
                    报价备注：{{ conference.comments }}
                  </div>
                </div>
                <el-button type="text">备注</el-button>
              </el-tooltip>
            </td>
            <td class="color_2">¥{{ positiveFloat(conference.price) }}</td>
            <td class="color_2">{{ conference.count }}</td>
            <td class="color_2">
              ¥{{
                positiveFloat(
                  conference.quotationsumprice
                    ? conference.quotationsumprice
                    : 0
                )
              }}
            </td>
            <td>
              <el-input type="text" v-model="conference.settlement_price" @input="
                  conference.settlement_price = formatNum(
                    conference.settlement_price,
                    2
                  )
                " :readonly="readonly || !!conference.lineoroffline" :class="{ lineBack: !!conference.lineoroffline }" />
            </td>
            <td>
              <!-- <el-input
								v-model="conference.settlement_count"
								@input="conference.settlement_count = formatNum(conference.settlement_count, 1)"
								:readonly="readonly || !!conference.lineoroffline"
								:class="{ lineBack: !!conference.lineoroffline }"
							/> -->
              <el-input v-model="conference.settlement_count" @input="
                  conference.settlement_count = formatNum(
                    conference.settlement_count,
                    2
                  )
                " placeholder="请输入数量" :readonly="readonly || !!conference.lineoroffline" :class="{ lineBack: !!conference.lineoroffline }" style="width: 50%" />
            </td>
            <td v-if="!conference.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(conference.settlement_price) *
                    positiveFloat(conference.settlement_count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ conference.settlementsumprice.toFixed(2) }}</td> -->
            <td>{{ conference.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="conference.settlement_comments" :readonly="readonly || !!conference.lineoroffline" :class="{
                  difference: conferenceDifference(conference),
                  line: !conference.quoted_price_conference_id,
                  lineBack: !!conference.lineoroffline,
                }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" @click="delconference(item, key)" v-if="!conference.quoted_price_conference_id && issubmit" :disabled="readonly || !!conference.lineoroffline"></el-button>
            </td>
          </tr>
        </tbody>
        <!-- 会场杂费 -->
        <tbody v-if="conferenceVisible">
          <tr class="color_2">
            <th class="color_3">杂费小计</th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th></th>
            <th></th>
            <th style="text-align: right">
              小计：¥{{ positiveFloat(conferencePrice[2]) }}
            </th>
            <th>客户异议</th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addOther(2)">添加杂费</el-button>
            </th>
          </tr>
          <tr v-for="conferencezf in meetingcidental" :key="conferencezf.id">
            <td class="color_2">
              <el-input v-model="conferencezf.content" :readonly="readonly || !!conferencezf.lineoroffline" placeholder="杂费项名称" />
            </td>
            <td class="color_2">
              <el-checkbox :disabled="readonly || !!conferencezf.lineoroffline" v-model="conferencezf.isnotservice" :true-label="1" :false-label="0">
                计入服务费
              </el-checkbox>
            </td>
            <td class="color_2"></td>
            <td class="color_2"></td>
            <td>
              <el-input type="text" v-model="conferencezf.price" @input="conferencezf.price = formatNum(conferencezf.price, 2)" :readonly="readonly || !!conferencezf.lineoroffline" :class="{ lineBack: !!conferencezf.lineoroffline }" />
            </td>
            <td>
              <el-input v-model="conferencezf.count" @input="
                  conferencezf.count = positiveFloatOne(conferencezf.count)
                " :readonly="readonly || !!conferencezf.lineoroffline" :class="{ lineBack: !!conferencezf.lineoroffline }" />
              <!-- <el-input-number 
								v-model.number="conferencezf.count" 
								:controls="false" 
								:precision="1" 
								placeholder="请输入数量" 
								:readonly="readonly || !!conferencezf.lineoroffline"
								:class="{ lineBack: !!conferencezf.lineoroffline }"
								style="width: 50%;">
							</el-input-number> -->
            </td>
            <td v-if="!conferencezf.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(conferencezf.price) *
                    positiveFloat(conferencezf.count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ conferencezf.sumprice.toFixed(2) }}</td> -->
            <td>{{ conferencezf.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="conferencezf.comments" class="line" :class="{ lineBack: !!conferencezf.lineoroffline }" :readonly="readonly || !!conferencezf.lineoroffline" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" :disabled="readonly || !!conferencezf.lineoroffline" v-if="issubmit" @click="delOther(conferencezf.id)"></el-button>
            </td>
          </tr>
        </tbody>
        <tbody v-if="foodVisible">
          <tr class="color_2">
            <th class="color_3"><i style="color: #428bca">酒店内餐饮</i></th>
            <th class="color_3" colspan="3" style="text-align: right">
              报价金额：¥{{ positiveFloat(foodPrice[0].all) }}
            </th>
            <th colspan="4" style="text-align: right">
              结算金额：¥{{ positiveFloat(foodPrice[1].all) }}
            </th>
            <th></th>
          </tr>
        </tbody>
        <tbody v-for="(item, key) in info.foodlist" :key="`hotelcanyininside${key}`">
          <tr class="color_2">
            <th class="color_3">
              <i>{{ item.date | date_day_ex }}</i>
            </th>
            <th class="color_3" colspan="3" style="text-align: right">
              小计：¥{{ positiveFloat(foodPrice[0].subtotal[`sub_${key}`]) }}
            </th>
            <th colspan="4" style="text-align: right">
              小计：¥{{ positiveFloat(foodPrice[1].subtotal[`sub_${key}`]) }}
            </th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addfood(item)">添加餐饮</el-button>
            </th>
          </tr>
          <tr class="color_2">
            <th class="color_3">消费项目</th>
            <th class="color_3">单价(元)</th>
            <th class="color_3">数量</th>
            <th class="color_3">金额(元)</th>
            <th>单价(元)</th>
            <th>数量</th>
            <th>金额(元)</th>
            <th>客户异议</th>
            <th>结算说明</th>
          </tr>
          <tr v-for="(food, key) in item.foodlists" :key="`food${key}`">
            <td class="color_2">
              <template v-if="food.quoted_price_food_id">
                {{ food.foodtypename }}
                <span v-if="food.usetypename">[{{ food.usetypename }}]</span>
              </template>
              <template v-else>
                <!-- <el-input v-model="food.settlement_itemname" :readonly="readonly || !!food.lineoroffline" placeholder="消费项目名称" /> -->
                <el-select @change="changehotelnei($event, food)" :loading="cost_project_load" v-model="food.settlement_itemid" size="small" filterable>
                  <el-option v-for="cp in foodcostProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
                </el-select>
              </template>
              <el-tooltip v-if="
                  food.quoted_price_food_id &&
                  (food.comments || food.offer_remarks)
                " class="describe-tooltip" effect="dark" placement="top-end">
                <div slot="content" style="width: 150px">
                  <div v-if="food.comments">需求说明：{{ food.comments }}</div>
                  <div v-if="food.offer_remarks">
                    报价备注：{{ food.offer_remarks }}
                  </div>
                </div>
                <el-button type="text">备注</el-button>
              </el-tooltip>
            </td>
            <td class="color_2">¥{{ positiveFloat(food.price) }}</td>
            <td class="color_2">{{ food.personcount }}</td>
            <td class="color_2">
              ¥{{ positiveFloat(food.quotationsumprice) }}
            </td>
            <td>
              <el-input v-model="food.settlement_unitprice" @input="
                  food.settlement_unitprice = formatNum(
                    food.settlement_unitprice,
                    2
                  )
                " :readonly="readonly || !!food.lineoroffline" :class="{ lineBack: !!food.lineoroffline }" />
            </td>
            <td>
              <!-- <el-input
								v-model="food.settlement_count"
								@input="food.settlement_count = formatNum(food.settlement_count, 1)"
								:readonly="readonly || !!food.lineoroffline"
								:class="{ lineBack: !!food.lineoroffline }"
							/> -->
              <el-input v-model="food.settlement_count" @input="
                  food.settlement_count = formatNum(food.settlement_count, 2)
                " placeholder="请输入数量" :readonly="readonly || !!food.lineoroffline" :class="{ lineBack: !!food.lineoroffline }" style="width: 50%" />
            </td>
            <td v-if="!food.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(food.settlement_unitprice) *
                    positiveFloat(food.settlement_count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ food.settlementsumprice.toFixed(2) }}</td> -->
            <td>{{ food.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="food.settlement_comments" :readonly="readonly || !!food.lineoroffline" :class="{
                  difference: foodDifference(food),
                  line: !food.quoted_price_food_id,
                  lineBack: !!food.lineoroffline,
                }" />
              <el-button icon="el-icon-delete" type="danger" :disabled="readonly || !!food.lineoroffline" circle size="mini" @click="delfood(item, key)" v-if="!food.quoted_price_food_id && issubmit"></el-button>
            </td>
          </tr>
        </tbody>
        <!-- 酒店内餐饮杂费 -->
        <tbody v-if="foodVisible">
          <tr class="color_2">
            <th class="color_3">杂费小计</th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th></th>
            <th></th>
            <th style="text-align: right">
              小计：¥{{ positiveFloat(foodPrice[2]) }}
            </th>
            <th>客户异议</th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addOther(3)">添加杂费</el-button>
            </th>
          </tr>
          <tr v-for="foodzf in foodincidental" :key="foodzf.id">
            <td class="color_2">
              <el-input v-model="foodzf.content" :readonly="readonly || !!foodzf.lineoroffline" placeholder="杂费项名称" />
            </td>
            <td class="color_2">
              <el-checkbox :disabled="readonly || !!foodzf.lineoroffline" v-model="foodzf.isnotservice" :true-label="1" :false-label="0">计入服务费</el-checkbox>
            </td>
            <td class="color_2"></td>
            <td class="color_2"></td>
            <td>
              <el-input type="text" :class="{ lineBack: !!foodzf.lineoroffline }" v-model="foodzf.price" :readonly="readonly || !!foodzf.lineoroffline" @input="foodzf.price = formatNum(foodzf.price, 2)" />
            </td>
            <td>
              <el-input :class="{ lineBack: !!foodzf.lineoroffline }" v-model="foodzf.count" @input="foodzf.count = positiveFloatOne(foodzf.count)" :readonly="readonly || !!foodzf.lineoroffline" />
              <!-- <el-input-number 
								v-model.number="foodzf.count" 
								:controls="false" 
								:precision="1" 
								placeholder="请输入数量" 
								:readonly="readonly || !!foodzf.lineoroffline"
								:class="{ lineBack: !!foodzf.lineoroffline }"
								style="width: 50%;">
							</el-input-number> -->
            </td>
            <td v-if="!foodzf.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(foodzf.price) * positiveFloat(foodzf.count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ foodzf.sumprice.toFixed(2) }}</td> -->
            <td>{{ foodzf.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="foodzf.comments" :readonly="readonly || !!foodzf.lineoroffline" class="line" :class="{ lineBack: !!foodzf.lineoroffline }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" :disabled="readonly || !!foodzf.lineoroffline" v-if="issubmit" @click="delOther(foodzf.id)"></el-button>
            </td>
          </tr>
        </tbody>
        <!-- 酒店外餐饮 -->
        <tbody v-if="otherfoodVisible">
          <tr class="color_2">
            <th class="color_3"><i style="color: #428bca">酒店外餐饮</i></th>
            <th class="color_3" colspan="3" style="text-align: right">
              报价金额：¥{{ positiveFloat(otherfoodPrice[0].all) }}
            </th>
            <th colspan="4" style="text-align: right">
              结算金额：¥{{ positiveFloat(otherfoodPrice[1].all) }}
            </th>
            <th></th>
          </tr>
        </tbody>
        <tbody v-for="(item, key) in info.otherfoodlist" :key="`otherhotelcanyininside${key}`">
          <tr class="color_2">
            <th class="color_3">
              <i>{{ item.date | date_day_ex }}</i>
            </th>
            <th class="color_3" colspan="3" style="text-align: right">
              小计：¥{{
                positiveFloat(otherfoodPrice[0].subtotal[`sub_${key}`])
              }}
            </th>
            <th colspan="4" style="text-align: right">
              小计：¥{{
                positiveFloat(otherfoodPrice[1].subtotal[`sub_${key}`])
              }}
            </th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addotherfood(item)">添加餐饮</el-button>
            </th>
          </tr>
          <tr class="color_2">
            <th class="color_3">消费项目</th>
            <th class="color_3">单价(元)</th>
            <th class="color_3">数量</th>
            <th class="color_3">金额(元)</th>
            <th>单价(元)</th>
            <th>数量</th>
            <th>金额(元)</th>
            <th>客户异议</th>
            <th>结算说明</th>
          </tr>
          <tr v-for="(food, key) in item.foodlists" :key="`food${key}`">
            <td class="color_2">
              <template v-if="food.quoted_price_food_id">
                {{ food.foodtypename }}
                <span v-if="food.usetypename">[{{ food.usetypename }}]</span>
              </template>
              <template v-else>
                <!-- <el-input v-model="food.settlement_itemname" :readonly="readonly || !!food.lineoroffline" placeholder="消费项目名称" /> -->
                <el-select @change="changehotelwai($event, food)" :loading="cost_project_load" v-model="food.settlement_itemid" size="small" filterable>
                  <el-option v-for="cp in otherfoodcostProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
                </el-select>
              </template>
              <el-tooltip v-if="
                  food.quoted_price_food_id &&
                  (food.comments || food.offer_remarks)
                " class="describe-tooltip" effect="dark" placement="top-end">
                <div slot="content" style="width: 150px">
                  <div v-if="food.comments">需求说明：{{ food.comments }}</div>
                  <div v-if="food.offer_remarks">
                    报价备注：{{ food.offer_remarks }}
                  </div>
                </div>
                <el-button type="text">备注</el-button>
              </el-tooltip>
            </td>
            <td class="color_2">¥{{ positiveFloat(food.price) }}</td>
            <td class="color_2">{{ food.personcount }}</td>
            <td class="color_2">
              ¥{{ positiveFloat(food.quotationsumprice) }}
            </td>
            <td>
              <el-input v-model="food.settlement_unitprice" @input="
                  food.settlement_unitprice = formatNum(
                    food.settlement_unitprice,
                    2
                  )
                " :readonly="readonly || !!food.lineoroffline" :class="{ lineBack: !!food.lineoroffline }" />
            </td>
            <td>
              <!-- <el-input
								v-model="food.settlement_count"
								@input="food.settlement_count = formatNum(food.settlement_count, 1)"
								:readonly="readonly || !!food.lineoroffline"
								:class="{ lineBack: !!food.lineoroffline }"
							/> -->
              <el-input v-model="food.settlement_count" @input="
                  food.settlement_count = formatNum(food.settlement_count, 2)
                " placeholder="请输入数量" :readonly="readonly || !!food.lineoroffline" :class="{ lineBack: !!food.lineoroffline }" style="width: 50%" />
            </td>
            <td v-if="!food.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(food.settlement_unitprice) *
                    positiveFloat(food.settlement_count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ food.settlementsumprice.toFixed(2) }}</td> -->
            <td>{{ food.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="food.settlement_comments" :readonly="readonly || !!food.lineoroffline" :class="{
                  difference: otherFoodDifference(food),
                  line: !food.quoted_price_food_id,
                  lineBack: !!food.lineoroffline,
                }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" @click="delotherfood(item, key)" v-if="!food.quoted_price_food_id && issubmit" :disabled="readonly || !!food.lineoroffline"></el-button>
            </td>
          </tr>
        </tbody>
        <!-- 酒店外餐饮杂费 -->
        <tbody v-if="otherfoodVisible">
          <tr class="color_2">
            <th class="color_3">杂费小计</th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th></th>
            <th></th>
            <th style="text-align: right">
              小计：¥{{ positiveFloat(otherfoodPrice[2]) }}
            </th>
            <th>客户异议</th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addOther(7)">添加杂费</el-button>
            </th>
          </tr>
          <tr v-for="foodzf in otherfoodincidental" :key="foodzf.id">
            <td class="color_2">
              <el-input v-model="foodzf.content" :readonly="readonly || !!foodzf.lineoroffline" placeholder="杂费项名称" />
            </td>
            <td class="color_2">
              <el-checkbox :disabled="readonly || !!foodzf.lineoroffline" v-model="foodzf.isnotservice" :true-label="1" :false-label="0">计入服务费</el-checkbox>
            </td>
            <td class="color_2"></td>
            <td class="color_2"></td>
            <td>
              <el-input type="text" :class="{ lineBack: !!foodzf.lineoroffline }" v-model="foodzf.price" :readonly="readonly || !!foodzf.lineoroffline" @input="foodzf.price = formatNum(foodzf.price, 2)" />
            </td>
            <td>
              <el-input :class="{ lineBack: !!foodzf.lineoroffline }" v-model="foodzf.count" @input="foodzf.count = positiveFloatOne(foodzf.count)" :readonly="readonly || !!foodzf.lineoroffline" />
              <!-- <el-input-number 
								v-model.number="foodzf.count" 
								:controls="false" 
								:precision="1" 
								placeholder="请输入数量" 
								:readonly="readonly || !!foodzf.lineoroffline"
								:class="{ lineBack: !!foodzf.lineoroffline }"
								style="width: 50%;">
							</el-input-number> -->
            </td>
            <td v-if="!foodzf.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(foodzf.price) * positiveFloat(foodzf.count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ foodzf.sumprice.toFixed(2) }}</td> -->
            <td>{{ foodzf.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="foodzf.comments" :readonly="readonly || !!foodzf.lineoroffline" class="line" :class="{ lineBack: !!foodzf.lineoroffline }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" :disabled="readonly || !!foodzf.lineoroffline" v-if="issubmit" @click="delOther(foodzf.id)"></el-button>
            </td>
          </tr>
        </tbody>
        <tbody v-if="transportationVisible">
          <tr class="color_2">
            <th class="color_3"><i style="color: #428bca">大交通</i></th>
            <th class="color_3" colspan="3" style="text-align: right">
              报价金额：¥{{ positiveFloat(intercitytrafficPrice[0].all) }}
            </th>
            <th colspan="4" style="text-align: right">
              结算金额：¥{{ positiveFloat(intercitytrafficPrice[1].all) }}
            </th>
            <th></th>
          </tr>
        </tbody>
        <tbody v-for="(item, key) in info.transportationlist" :key="`chengji${key}`">
          <tr class="color_2">
            <th class="color_3">
              <i>{{ item.date | date_day_ex }}</i>
            </th>
            <th class="color_3" colspan="3" style="text-align: right">
              小计：¥{{
                positiveFloat(intercitytrafficPrice[0].subtotal[`sub_${key}`])
              }}
            </th>
            <th colspan="4" style="text-align: right">
              小计：¥{{
                positiveFloat(intercitytrafficPrice[1].subtotal[`sub_${key}`])
              }}
            </th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addstransportation(item)">添加交通</el-button>
            </th>
          </tr>
          <tr class="color_2">
            <th class="color_3">消费项目</th>
            <th class="color_3">单价(元)</th>
            <th class="color_3">数量</th>
            <th class="color_3">金额(元)</th>
            <th>单价(元)</th>
            <th>数量</th>
            <th>金额(元)</th>
            <th>客户异议</th>
            <th>结算说明</th>
          </tr>
          <tr v-for="(transportation, key) in item.tranlists" :key="`transportation${key}`">
            <td class="color_2">
              <template v-if="transportation.quoted_price_transportation_id">
                {{ transportation.joinname }}
              </template>
              <template v-else>
                <!-- <el-input
									v-model="transportation.settlement_itemname"
									:readonly="readonly || !!transportation.lineoroffline"
									placeholder="出发地，目的地，乘坐工具"
								/> -->
                <!-- <el-select :disabled="readonly || !!transportation.lineoroffline" v-model="transportation.settlement_itemid" placeholder="请选择乘坐工具">
									<el-option v-for="itemc in info.trantypelist" :key="itemc.trancode" :value="itemc.trancode" :label="itemc.tranname"></el-option>
								</el-select> -->
                <el-select @change="changebigcar($event, transportation)" :loading="cost_project_load" v-model="transportation.settlement_itemid" size="small" filterable>
                  <el-option v-for="cp in transportationcostProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
                </el-select>
              </template>
              <el-tooltip v-if="
                  transportation.quoted_price_transportation_id &&
                  (transportation.requirement || transportation.offerremarks)
                " class="describe-tooltip" effect="dark" placement="top-end">
                <div slot="content" style="width: 150px">
                  <div v-if="transportation.requirement">
                    需求说明：{{ transportation.requirement }}
                  </div>
                  <div v-if="transportation.offerremarks">
                    报价备注：{{ transportation.offerremarks }}
                  </div>
                </div>
                <el-button type="text">备注</el-button>
              </el-tooltip>
            </td>
            <td class="color_2">
              ¥{{ positiveFloat(transportation.unitprice) }}
            </td>
            <td class="color_2">{{ transportation.passengercount }}</td>
            <td class="color_2">
              ¥{{ positiveFloat(transportation.quotationsumprice) }}
            </td>
            <td>
              <el-input v-model="transportation.settlement_unitprice" @input="
                  transportation.settlement_unitprice = formatNum(
                    transportation.settlement_unitprice,
                    2
                  )
                " :readonly="readonly || !!transportation.lineoroffline" :class="{ lineBack: !!transportation.lineoroffline }" />
            </td>
            <td>
              <!-- <el-input
								v-model="transportation.settlement_count"
								@input="transportation.settlement_count = formatNum(transportation.settlement_count, 1)"
								:readonly="readonly || !!transportation.lineoroffline"
								:class="{ lineBack: !!transportation.lineoroffline }"
							/> -->
              <el-input v-model="transportation.settlement_count" @input="
                  transportation.settlement_count = formatNum(
                    transportation.settlement_count,
                    2
                  )
                " placeholder="请输入数量" :readonly="readonly || !!transportation.lineoroffline" :class="{ lineBack: !!transportation.lineoroffline }" style="width: 50%" />
            </td>
            <td v-if="!transportation.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(transportation.settlement_unitprice) *
                    positiveFloat(transportation.settlement_count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ transportation.settlementsumprice.toFixed(2) }}</td> -->
            <td>{{ transportation.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="transportation.settlement_comments" :readonly="readonly || !!transportation.lineoroffline" :class="{
                  difference: transportationDifference(transportation),
                  line: !transportation.quoted_price_transportation_id,
                  lineBack: !!transportation.lineoroffline,
                }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" @click="delstransportation(item, key)" v-if="
                  !transportation.quoted_price_transportation_id && issubmit
                " :disabled="readonly || !!transportation.lineoroffline"></el-button>
            </td>
          </tr>
        </tbody>
        <!-- 大交通杂费 -->
        <tbody v-if="transportationVisible">
          <tr class="color_2">
            <th class="color_3">杂费小计</th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th></th>
            <th></th>
            <th style="text-align: right">
              小计：¥{{ positiveFloat(intercitytrafficPrice[2]) }}
            </th>
            <th>客户异议</th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addOther(4)">添加杂费</el-button>
            </th>
          </tr>
          <tr v-for="transportationzf in intercitytrafficincidental" :key="transportationzf.id">
            <td class="color_2">
              <el-select :disabled="readonly || !!transportationzf.lineoroffline" v-model="transportationzf.itemcode" placeholder="请选择乘坐工具">
                <el-option v-for="itemc in info.trantypelist" :key="itemc.trancode" :value="itemc.trancode" :label="itemc.tranname"></el-option>
              </el-select>
              <!-- <input type="text" :readonly="readonly || !!transportationzf.lineoroffline" v-model="transportationzf.content" placeholder="杂费项名称" /> -->
            </td>
            <td class="color_2">
              <el-checkbox :disabled="readonly || !!transportationzf.lineoroffline" v-model="transportationzf.isnotservice" :true-label="1" :false-label="0">
                计入服务费
              </el-checkbox>
            </td>
            <td class="color_2"></td>
            <td class="color_2"></td>
            <td>
              <el-input type="text" v-model="transportationzf.price" @input="
                  transportationzf.price = formatNum(transportationzf.price, 2)
                " :readonly="readonly || !!transportationzf.lineoroffline" :class="{ lineBack: !!transportationzf.lineoroffline }" />
            </td>
            <td>
              <el-input v-model="transportationzf.count" @input="
                  transportationzf.count = positiveFloatOne(
                    transportationzf.count
                  )
                " :readonly="readonly || !!transportationzf.lineoroffline" :class="{ lineBack: !!transportationzf.lineoroffline }" />
              <!-- <el-input-number 
								v-model.number="transportationzf.count" 
								:controls="false" 
								:precision="1" 
								placeholder="请输入数量" 
								:readonly="readonly || !!transportationzf.lineoroffline"
								:class="{ lineBack: !!transportationzf.lineoroffline }"
								style="width: 50%;">
							</el-input-number> -->
            </td>
            <td v-if="!transportationzf.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(transportationzf.price) *
                    positiveFloat(transportationzf.count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ transportationzf.sumprice.toFixed(2) }}</td> -->
            <td>{{ transportationzf.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="transportationzf.comments" :readonly="readonly || !!transportationzf.lineoroffline" class="line" :class="{ lineBack: !!transportationzf.lineoroffline }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" :disabled="readonly || !!transportationzf.lineoroffline" v-if="issubmit" @click="delOther(transportationzf.id)"></el-button>
            </td>
          </tr>
        </tbody>
        <tbody v-if="carVisible">
          <tr class="color_2">
            <th class="color_3"><i style="color: #428bca">市内交通</i></th>
            <th class="color_3" colspan="3" style="text-align: right">
              报价金额：¥{{ positiveFloat(carPrice[0].all) }}
            </th>
            <th colspan="4" style="text-align: right">
              结算金额：¥{{ positiveFloat(carPrice[1].all) }}
            </th>
            <th></th>
          </tr>
        </tbody>
        <tbody v-for="(item, key) in info.carlist" :key="`shinei${key}`">
          <tr class="color_2">
            <th class="color_3">
              <i>{{ item.date | date_day_ex }}</i>
            </th>
            <th class="color_3" colspan="3" style="text-align: right">
              小计：¥{{ positiveFloat(carPrice[0].subtotal[`sub_${key}`]) }}
            </th>
            <th colspan="4" style="text-align: right">
              小计：¥{{ positiveFloat(carPrice[1].subtotal[`sub_${key}`]) }}
            </th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addcar(item)">添加交通</el-button>
            </th>
          </tr>
          <tr class="color_2">
            <th class="color_3">消费项目</th>
            <th class="color_3">单价(元)</th>
            <th class="color_3">数量</th>
            <th class="color_3">金额(元)</th>
            <th>单价(元)</th>
            <th>数量</th>
            <th>金额(元)</th>
            <th>客户异议</th>
            <th>结算说明</th>
          </tr>
          <tr v-for="(car, key) in item.carlists" :key="`car${key}`">
            <td class="color_2">
              <template v-if="car.quoted_price_car_id">
                {{
                  `${car.purposename}(${car.vehicletypename};搭乘人数:${car.vehiclecount}人;用车城市:${car.city})`
                }}
              </template>
              <template v-else>
                <!-- <el-input v-model="car.settlement_itemname" :readonly="readonly || !!car.lineoroffline" placeholder="消费项目" /> -->
                <el-select @change="changecar($event, car)" :loading="cost_project_load" v-model="car.settlement_itemid" size="small" filterable>
                  <el-option v-for="cp in carcostProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
                </el-select>
              </template>
              <el-tooltip v-if="
                  car.quoted_price_car_id && (car.explain || car.offer_remarks)
                " class="describe-tooltip" effect="dark" placement="top-end">
                <div slot="content" style="width: 150px">
                  <div v-if="car.explain">需求说明：{{ car.explain }}</div>
                  <div v-if="car.offer_remarks">
                    报价备注：{{ car.offer_remarks }}
                  </div>
                </div>
                <el-button type="text">备注</el-button>
              </el-tooltip>
            </td>
            <td class="color_2">¥{{ positiveFloat(car.price) }}</td>
            <td class="color_2">{{ car.carcount }}</td>
            <td class="color_2">¥{{ positiveFloat(car.quotationsumprice) }}</td>
            <td>
              <el-input type="text" v-model="car.settlement_unitprice" @input="
                  car.settlement_unitprice = formatNum(
                    car.settlement_unitprice,
                    2
                  )
                " :readonly="readonly || !!car.lineoroffline" :class="{ lineBack: !!car.lineoroffline }" />
            </td>
            <td>
              <!-- <el-input
								v-model="car.settlement_count"
								@input="car.settlement_count = formatNum(car.settlement_count, 1)"
								:readonly="readonly || !!car.lineoroffline"
								:class="{ lineBack: !!car.lineoroffline }"
							/> -->
              <el-input v-model="car.settlement_count" placeholder="请输入数量" :readonly="readonly || !!car.lineoroffline" :class="{ lineBack: !!car.lineoroffline }" style="width: 50%" @input="
                  car.settlement_count = formatNum(car.settlement_count, 2)
                " />
            </td>
            <td v-if="!car.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(car.settlement_unitprice) *
                    positiveFloat(car.settlement_count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ car.settlementsumprice.toFixed(2) }}</td> -->
            <td>{{ car.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="car.settlement_comments" :readonly="readonly || !!car.lineoroffline" :class="{
                  difference: carDifference(car),
                  line: !car.quoted_price_car_id,
                  lineBack: !!car.lineoroffline,
                }" />
              <el-button icon="el-icon-delete" type="danger" :disabled="readonly || !!car.lineoroffline" circle size="mini" @click="delcar(item, key)" v-if="!car.quoted_price_car_id && issubmit"></el-button>
            </td>
          </tr>
        </tbody>
        <!-- 市内交通杂费 -->
        <tbody v-if="carVisible">
          <tr class="color_2">
            <th class="color_3">杂费小计</th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th></th>
            <th></th>
            <th style="text-align: right">
              小计：¥{{ positiveFloat(carPrice[2]) }}
            </th>
            <th>客户异议</th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addOther(5)">添加杂费</el-button>
            </th>
          </tr>
          <tr v-for="carzf in carincidental" :key="carzf.id">
            <td class="color_2">
              <el-input v-model="carzf.content" :readonly="readonly || !!carzf.lineoroffline" placeholder="杂费项名称" />
            </td>
            <td class="color_2">
              <el-checkbox :disabled="readonly || !!carzf.lineoroffline" v-model="carzf.isnotservice" :true-label="1" :false-label="0">计入服务费</el-checkbox>
            </td>
            <td class="color_2"></td>
            <td class="color_2"></td>
            <td>
              <el-input v-model="carzf.price" :class="{ lineBack: !!carzf.lineoroffline }" @input="carzf.price = formatNum(carzf.price, 2)" :readonly="readonly || !!carzf.lineoroffline" />
            </td>
            <td>
              <el-input v-model="carzf.count" :class="{ lineBack: !!carzf.lineoroffline }" @input="carzf.count = positiveFloatOne(carzf.count)" :readonly="readonly || !!carzf.lineoroffline" />
              <!-- <el-input-number 
								v-model.number="carzf.count" 
								:controls="false" 
								:precision="1" 
								placeholder="请输入数量" 
								:readonly="readonly || !!carzf.lineoroffline"
								:class="{ lineBack: !!carzf.lineoroffline }"
								style="width: 50%;">
							</el-input-number> -->
            </td>
            <td v-if="!carzf.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(carzf.price) * positiveFloat(carzf.count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ carzf.sumprice.toFixed(2) }}</td> -->
            <td>{{ carzf.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="carzf.comments" :readonly="readonly || !!carzf.lineoroffline" class="line" :class="{ lineBack: !!carzf.lineoroffline }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" :disabled="readonly || !!carzf.lineoroffline" v-if="issubmit" @click="delOther(carzf.id)"></el-button>
            </td>
          </tr>
        </tbody>
        <!-- 其他 -->
        <tbody>
          <tr class="color_2">
            <th class="color_3"><i style="color: #428bca">其他</i></th>
            <th class="color_3" colspan="3" style="text-align: right">
              报价金额：¥{{ positiveFloat(otherPrice[0]) }}
            </th>
            <th colspan="4" style="text-align: right">
              结算金额：¥{{ positiveFloat(otherPrice[1]) }}
            </th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addsundry()">添加其他</el-button>
            </th>
          </tr>
        </tbody>
        <tbody>
          <tr class="color_2">
            <th class="color_3">消费项目</th>
            <th class="color_3">单价(元)</th>
            <th class="color_3">数量</th>
            <th class="color_3">金额(元)</th>
            <th>单价(元)</th>
            <th>数量</th>
            <th>金额(元)</th>
            <th>客户异议</th>
            <th>结算说明</th>
          </tr>
          <tr v-for="(other, key) in info.otherlist" :key="`other${key}`">
            <td class="color_2">
              <div v-if="other.quoted_price_other_id">
                {{ other.servicetypename }}
              </div>
              <div v-else>
                <!-- <el-select :disabled="readonly || !!other.lineoroffline" @change="changeOtherSel($event, key)" v-model="other.servicetype" placeholder="请选择">
									<el-option v-for="item in info.otherselect" :value="item.code" :key="item.code" :label="item.name"></el-option>
								</el-select> -->
                <el-select @change="changeOtherSel(other, key, $event)" :loading="cost_project_load" v-model="other.settlement_itemid" size="small" filterable>
                  <el-option v-for="cp in othercostProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
                </el-select>
              </div>
              <el-tooltip v-if="
                  other.quoted_price_other_id &&
                  (other.describe || other.offer_remarks)
                " class="describe-tooltip" effect="dark" placement="top-end">
                <div slot="content" style="width: 150px">
                  <div v-if="other.describe">
                    需求说明：{{ other.describe }}
                  </div>
                  <div v-if="other.offer_remarks">
                    报价备注：{{ other.offer_remarks }}
                  </div>
                </div>
                <el-button type="text">备注</el-button>
              </el-tooltip>
            </td>
            <td class="color_2" v-if="other.quoted_price_other_id">
              {{ positiveFloat(other.price) }}
            </td>
            <!-- <td class="color_2" v-if="other.quoted_price_other_id">{{ other.offerparticipatecount }}人*{{ other.offerservicedaycount }}天</td> -->
            <td class="color_2" v-if="other.quoted_price_other_id">
              {{ other.offerparticipatecount }}
            </td>
            <td class="color_2" v-if="other.quoted_price_other_id">
              ¥{{ positiveFloat(other.quotationsumprice) }}
            </td>
            <td class="color_2 otherFee" colspan="3" v-if="!other.quoted_price_other_id">
              <div>
                <template>
                  <el-select v-show="
                      ['009-5', '009-6', '009-7', '009-11', '009-12'].includes(
                        other.settlement_itemid
                      )
                    " v-model="other.two_level_code" clearable size="small" style="width: 200px">
                    <el-option v-for="two_level_option in other.detail" :key="two_level_option.code" :label="two_level_option.name" :value="two_level_option.code"></el-option>
                    <!-- <el-option v-for="two_level_option in dijielist" :key="two_level_option.code" :label="two_level_option.name" :value="two_level_option.code"></el-option> -->
                    <!-- <el-option v-for="two_level_option in dijielist" :key="two_level_option.code" :label="two_level_option.name" :value="two_level_option.code"></el-option> -->
                  </el-select>
                </template>
                <el-checkbox :disabled="readonly || !!other.lineoroffline || true" v-model="other.isnotservice" :true-label="1" :false-label="0">
                  计入服务费
                </el-checkbox>
                <div v-if="
                    !info.event_info_configure.service_fee_calculation_method
                  ">
                  <span>*</span>
                  <el-input style="width: 30%" @input="
                      other.settlementservice_taxrate = formatNum(
                        other.settlementservice_taxrate
                      )
                    " :disabled="
                      !other.isnotservice ||
                      !!info.event_info_configure.service_fee_calculation_method
                    " :readonly="readonly || !!other.lineoroffline || true" v-model="other.settlementservice_taxrate"></el-input>
                  %
                </div>
              </div>
            </td>
            <td>
              <el-input type="text" v-model="other.settlement_unitprice" @input="
                  other.settlement_unitprice = formatNum(
                    other.settlement_unitprice,
                    2
                  )
                " :readonly="readonly || !!other.lineoroffline" :class="{ lineBack: !!other.lineoroffline }" />
            </td>
            <td>
              <el-input v-model="other.settlement_count" @input="
                  other.settlement_count = positiveFloatOne(
                    other.settlement_count
                  )
                " :readonly="readonly || !!other.lineoroffline" :class="{ lineBack: !!other.lineoroffline }" />
              <!-- <el-input 
								v-model="other.settlement_count" 
								@input="other.settlement_count = formatNum(other.settlement_count, 2)"
								:controls="false" 
								:precision="1" 
								placeholder="请输入数量" 
								:readonly="readonly || !!other.lineoroffline"
								:class="{ lineBack: !!other.lineoroffline }"
								style="width: 50%;"
							/> -->
            </td>
            <td v-if="!other.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(other.settlement_unitprice) *
                    positiveFloat(other.settlement_count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ other.settlementsumprice.toFixed(2) }}</td> -->
            <td>{{ other.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="other.settlement_comments" :readonly="readonly || !!other.lineoroffline" :class="{
                  difference: otherDifference(other),
                  line: !other.quoted_price_other_id,
                  lineBack: !!other.lineoroffline,
                }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" @click="delsother(item, key)" v-if="!other.quoted_price_other_id && issubmit" :disabled="readonly || !!other.lineoroffline"></el-button>
            </td>
          </tr>
        </tbody>
        <!-- 其他杂费 -->
        <tbody>
          <tr class="color_2">
            <th class="color_3">杂费小计</th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th></th>
            <th></th>
            <th style="text-align: right">
              小计：¥{{ positiveFloat(otherPrice[2]) }}
            </th>
            <th>客户异议</th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addOther(6)">添加杂费</el-button>
            </th>
          </tr>
          <tr v-for="otherzf in otherincidental" :key="otherzf.id">
            <td class="color_2">
              <input type="text" :readonly="readonly || !!otherzf.lineoroffline" v-model="otherzf.content" placeholder="杂费项名称" />
            </td>
            <td class="color_2 otherFee" colspan="3">
              <div>
                <el-checkbox :disabled="readonly || !!otherzf.lineoroffline" v-model="otherzf.isnotservice" :true-label="1" :false-label="0">
                  计入服务费
                </el-checkbox>
                <div v-if="
                    !info.event_info_configure.service_fee_calculation_method
                  ">
                  <span>*</span>
                  <el-input style="width: 30%" @input="
                      otherzf.settlementservice_taxrate = formatNum(
                        otherzf.settlementservice_taxrate
                      )
                    " :readonly="readonly" :disabled="
                      !otherzf.isnotservice ||
                      !!info.event_info_configure.service_fee_calculation_method
                    " v-model="otherzf.settlementservice_taxrate"></el-input>
                  %
                </div>
              </div>
            </td>
            <td>
              <el-input type="text" v-model="otherzf.price" :class="{ lineBack: !!otherzf.lineoroffline }" @input="otherzf.price = formatNum(otherzf.price, 2)" :readonly="readonly || !!otherzf.lineoroffline" />
            </td>
            <td>
              <el-input v-model="otherzf.count" :class="{ lineBack: !!otherzf.lineoroffline }" @input="otherzf.count = positiveFloatOne(otherzf.count)" :readonly="readonly || !!otherzf.lineoroffline" />
              <!-- <el-input-number 
								v-model.number="otherzf.count" 
								:controls="false" 
								:precision="1" 
								placeholder="请输入数量" 
								:readonly="readonly || !!otherzf.lineoroffline"
								:class="{ lineBack: !!otherzf.lineoroffline }"
								style="width: 50%;">
							</el-input-number> -->
            </td>
            <td v-if="!otherzf.lineoroffline">
              ¥{{
                positiveFloat(
                  positiveFloatSix(otherzf.price) * positiveFloat(otherzf.count)
                )
              }}
            </td>
            <!-- <td v-else>¥{{ otherzf.sumprice.toFixed(2) }}</td> -->
            <td>{{ otherzf.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="otherzf.comments" :readonly="readonly || !!otherzf.lineoroffline" class="line" :class="{ lineBack: !!otherzf.lineoroffline }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" :disabled="readonly || !!otherzf.lineoroffline" v-if="issubmit" @click="delOther(otherzf.id)"></el-button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr class="color_2">
            <th class="color_3"><i style="color: #428bca">服务费</i></th>
            <th class="color_3" colspan="3" style="text-align: right">
              报价金额：¥{{
                positiveFloat(
                  positiveFloatSix(servicePrice[0]) +
                    (info.zhicai_service == 0
                      ? positiveFloatSix(servicePrice[4])
                      : positiveFloatSix(servicePrice[8]))
                ).toFixed(2)
              }}
            </th>
            <th colspan="4" style="text-align: right">
              结算金额：¥{{
                positiveFloat(
                  positiveFloatSix(servicePrice[1]) +
                    (info.zhicai_service == 0
                      ? positiveFloatSix(servicePrice[5])
                      : positiveFloatSix(servicePrice[9]))
                ).toFixed(2)
              }}
            </th>
            <th></th>
          </tr>
        </tbody>
        <tbody>
          <tr class="color_2">
            <th class="color_3">消费项目</th>
            <th class="color_3" colspan="2">服务费计算</th>
            <th class="color_3">金额(元)</th>
            <th colspan="2">服务费计算</th>
            <th>金额(元)</th>
            <th></th>
            <th>结算说明</th>
          </tr>
          <tr>
            <td class="color_2">非直采服务费</td>
            <td class="color_2 wordBreak" colspan="2">{{ servicePrice[2] }}</td>
            <td class="color_2">¥{{ this.positiveFloat(servicePrice[0]) }}</td>
            <td class="wordBreak" colspan="2">
              {{ servicePrice[3] }}
              <span v-if="info.event_info_configure.service_fee_ratio">
                *
                <el-input class="line" size="mini" :readonly="readonly" v-model="info.sheet_fzc_service" style="width: 20%" />
                %
              </span>
            </td>
            <td>¥{{ this.positiveFloat(servicePrice[1]) }}</td>
            <td></td>
            <td>
              <el-input v-model="info.settlement_service_remark" :readonly="readonly"></el-input>
            </td>
          </tr>
          <tr v-if="info.zhicai_service == 1">
            <td class="color_2">直采服务费</td>
            <td class="color_2" colspan="2">
              <p v-for="(item, index) in info.event_quoted_price_zhicai_service" :key="index">
                <span> {{ item.grade_name }} </span>
                <span> ￥{{ item.grade_price }} </span>
                <span> * {{ item.grade_count }} </span>
              </p>
            </td>
            <td class="color_2">¥ {{ this.positiveFloat(servicePrice[8]) }}</td>
            <td class="chaifen" colspan="2">
              <p v-for="(
                  item, index
                ) in info.event_settlement_sheet_zhicai_service" :key="index" style="margin: 10px 0">
                <span> {{ item.grade_name }} </span>
                <span> ￥{{ item.grade_price }} </span>
                <span>
                  *
                  <el-input size="small" v-model="item.grade_count" @input="
                      item.grade_count = positiveFloatOne(item.grade_count)
                    " :readonly="readonly" style="width: 20%"></el-input>
                  <!-- <el-input-number
										size="small"
									 	v-model.number="item.grade_count"
									  :controls="false" 
										:precision="1" 
										:readonly="readonly"
										placeholder="请输入数量" 
										style="width: 20%;">
									</el-input-number> -->
                </span>
              </p>
            </td>
            <td>¥{{ positiveFloat(servicePrice[9]) }}</td>
            <td></td>
            <td>
              <el-input v-model="info.settlement_advance_remark" :readonly="readonly"></el-input>
            </td>
          </tr>
          <tr v-else>
            <td class="color_2">直采服务费</td>
            <td class="color_2" colspan="2">{{ servicePrice[6] }}</td>
            <td class="color_2">¥{{ positiveFloat(servicePrice[4]) }}</td>
            <td class="chaifen" colspan="2">
              <el-input v-model="info.settlement_advance_amount" @input="
                  info.settlement_advance_amount = formatNum(
                    info.settlement_advance_amount
                  )
                " :readonly="readonly" style="width: 20%"></el-input>
              *
              <el-input v-model="info.settlement_advance_proportion" @input="
                  info.settlement_advance_proportion = formatNum(
                    info.settlement_advance_proportion
                  )
                " :readonly="readonly" style="width: 20%"></el-input>
              %
            </td>
            <td>¥{{ positiveFloat(servicePrice[5]) }}</td>
            <td></td>
            <td>
              <el-input v-model="info.settlement_advance_remark" :readonly="readonly"></el-input>
            </td>
          </tr>
        </tbody>
        <!-- 税费 -->
        <tbody>
          <tr class="color_2">
            <th class="color_3"><i style="color: #428bca">税费</i></th>
            <th class="color_3" colspan="3" style="text-align: right">
              报价金额：¥{{ positiveFloat(vatPrice[0]).toFixed(2) }}
            </th>
            <th colspan="4" style="text-align: right">
              结算金额：¥{{ positiveFloat(vatPrice[1]).toFixed(2) }}
            </th>
            <th></th>
          </tr>
        </tbody>
        <tbody>
          <tr class="color_2">
            <th class="color_3">消费项目</th>
            <th class="color_3" colspan="2">税费计算</th>
            <th class="color_3">金额(元)</th>
            <th colspan="2">税费计算</th>
            <th>金额(元)</th>
            <th></th>
            <th>结算说明</th>
          </tr>
          <tr>
            <td class="color_2">VAT</td>
            <td class="color_2 wordBreak" colspan="2">{{ vatPrice[2] }}</td>
            <td class="color_2">¥{{ positiveFloat(vatPrice[0]) }}</td>
            <td class="wordBreak" colspan="2">
              {{ vatPrice[3] }}
              <span>
                *
                <el-input class="line" size="mini" v-model="info.settlement_taxrate" :readonly="readonly" :disabled="info.event_info_configure.vatcanedit == 0" @input="
                    info.settlement_taxrate = formatNum(info.settlement_taxrate)
                  " style="width: 20%" />
                %
              </span>
            </td>
            <td>¥{{ positiveFloat(vatPrice[1]) }}</td>
            <td></td>
            <td>
              <el-input v-model="info.settlement_taxrate_comments" :readonly="readonly" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="qita">
        <div class="left">
          <div class="stitle">客户异议</div>
          <div class="context">
            <div class="objectionDetailStyle" v-html="info.settlement_customer_objection" @click="getImg($event)"></div>
          </div>
        </div>
        <div class="right">
          <div class="stitle">其他说明</div>
          <div class="context">
            <textarea :readonly="readonly" v-model="info.settlement_offer_remarks"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="submit">
      <el-button @click="draft" v-if="
          ['0020-1', '0020-4', '0020-7', '0020-8'].includes(
            this.info.orderstatus
          )
        ">保存到草稿箱</el-button>
      <el-button type="primary" v-if="['0020-4', '0020-7', '0020-8'].includes(this.info.orderstatus)" @click="submit">提交结算单</el-button>
      <p style="color: #428bca; font-size: 17px; float: right" v-if="
          ['0020-1', '0020-4', '0020-5', '0020-6', '0020-7', '0020-8'].includes(
            this.info.orderstatus
          )
        ">
        <a v-if="info.event_info_configure.jsqrisdisplay == 1" @click="downloadSettlementConfirm" style="cursor: pointer; margin: 0 10px" download>下载结算确认单</a>
        <a @click="excelDownload" style="cursor: pointer; margin: 0 10px" download>下载结算Excel</a>
      </p>
    </div>

    <div class="info" v-if="info.historylist && info.historylist.length > 0">
      <el-card class="box-card">
        <div slot="header" class="header clearfix">
          <span>历史结算单：</span>
        </div>
        <div v-for="(item, index) in info.historylist" :key="item.id" class="text item">
          第{{ index + 1 }}次结算, 总价￥{{
            item.settlement_total_price
              ? positiveFloat(item.settlement_total_price)
              : ""
          }}元，[ {{ item.submit_time | date_ex }} ]
        </div>
      </el-card>
    </div>

    <el-dialog :visible.sync="addSettleShow" @close="addSettleShow = false" title="添加结算项目" center width="600px">
      <el-form :model="addSettleInfo" :rules="addSettleRules" ref="addSettleInfo" label-width="200px">
        <el-form-item label="选择项目分类" prop="projectClass">
          <el-select v-model="addSettleInfo.projectClass" @change="changeProjectClass" class="demand_300" size="small" clearable filterable>
            <el-option v-for="pc in projectClass" :label="pc.label" :value="pc.value" :key="pc.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-show="needCostDate" label="选择费用发生日期" prop="costDate">
          <el-select v-model="addSettleInfo.costDate" class="demand_300" size="small" clearable filterable>
            <el-option v-for="cd in costDates" :label="cd.label" :value="cd.value" :key="cd.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选择费用项目" prop="costProject">
          <el-select @change="changecostProject" :loading="cost_project_load" v-model="addSettleInfo.costProject" class="demand_300" size="small" clearable filterable>
            <el-option v-for="cp in costProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button @click="addSettleShow = false" size="small">取 消</el-button>
        <el-button @click="addSettle" size="small" type="primary">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { guid, getBetweenDate, positiveInteger, positiveFloat, positiveFloatOne, positiveFloatSix, formatDate, formatNum, getFormatDate, positiveFloatZero } from '@/utils/common'
import upload from '@/utils/upload'
import moment from 'moment'
import { limitsEffect } from '@/utils/uploadRestrictions'
import excelExport from '@/utils/exportexcel'
import '@/assets/js/directive'
/**
 * @page 订单详情
 */
export default {
  data() {
    return {
      info: null,
      status_draft: '0029-1', //草稿状态
      status_tobeconfirmed: '0029-2', //待确认结算单状态
      status_confirm: '0029-3', //已确认结算单状态
      status_supplement: '0029-5', //要求补充材料
      status_reject: '0029-4', //客户驳回结算单
      settlement_status: '0029-3',
      errormsg: [], //异常信息, 保存时使用
      quoted_price_food_option: [
        {
          value: 0,
          label: '酒店内用餐'
        },
        {
          value: 1,
          label: '酒店外用餐'
        }
      ],
      orderIDList: [],
      isopen: false, //会议基本信息展开、收起
      arrayList: [
        {
          type: 6,
          fileList: [],
          name: '客户结算单',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 7,
          fileList: [],
          name: '客户结算确认邮件',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 8,
          fileList: [],
          name: 'PO单',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 5,
          fileList: [],
          name: '供应商发票及账单',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 1,
          fileList: [],
          name: '酒店住宿发票+小联',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 2,
          fileList: [],
          name: '酒店餐饮发票+小联',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 3,
          fileList: [],
          name: '酒店会场发票+小联',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 9,
          fileList: [],
          name: '外出用餐发票+小联',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 10,
          fileList: [],
          name: '注册费发票+小联',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 11,
          fileList: [],
          name: '用车发票+小联',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 12,
          fileList: [],
          name: '制作物发票+小联',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 13,
          fileList: [],
          name: '保险发票+小联',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 14,
          fileList: [],
          name: '签到表',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 15,
          fileList: [],
          name: '会议照片-全景',
          remark: '',
          dissent: '',
          arrayLength: null
        },
        {
          type: 4,
          fileList: [],
          name: '其他',
          remark: '',
          dissent: '',
          arrayLength: null
        }
      ], //结算相关凭证
      updateIndex: 0, // 修改文件类目下标
      updateFileIndex: 0, // 修改文件类目列表 文件下标
      rename: false, //重命名按钮弹框
      fileName: '', //文件名称
      suffix: '', //文件后缀
      showInfo: true, //附件信息展开/收起
      showPriceInfo: true, //结算明细信息展开/收起
      isFail: 1,
      downloadUrl: '', //下载地址
      addSettleShow: false, // 添加结算项目弹窗
      projectClass: [
        {
          value: '0034',
          label: '客房'
        },
        {
          value: '0049',
          label: '会场'
        },
        {
          value: '0050',
          label: '酒店内餐饮'
        },
        {
          value: '0051',
          label: '酒店外餐饮'
        },
        {
          value: '003',
          label: '大交通'
        },
        {
          value: '006',
          label: '地面交通'
        },
        {
          value: '009',
          label: '其他服务'
        }
      ],
      costDates: [],
      cost_project_load: false,
      costProjects: [],
      roomcostProjects: [],
      meetingcostProjects: [],
      costProjefoodcostProjectscts: [],
      otherfoodcostProjects: [],
      transportationcostProjects: [],
      carcostProjects: [],
      othercostProjects: [],
      dijielist: [],
      addSettleRules: {
        projectClass: [
          {
            required: true,
            message: '请选择项目分类',
            trigger: 'change'
          }
        ],
        costDate: [
          {
            required: true,
            message: '请选择费用发生日期',
            trigger: 'change'
          }
        ],
        costProject: [
          {
            required: true,
            message: '请选择费用项目',
            trigger: 'change'
          }
        ]
      },
      addSettleInfo: {
        projectClass: '0034',
        costDate: '',
        costProject: ''
      },
      needCostDate: true
    }
  },
  computed: {
    //控制el-button  //要求补充材料状态判断this.info.settlement_status != this.status_supplement
    issubmit() {
      return this.info.settlement_status != this.status_supplement
    },
    //控制el-input   //要求补充材料状态判断this.info.settlement_status == this.status_supplement
    readonly() {
      return ['0020-2', '0020-3', '0020-5', '0020-6', '0020-8'].includes(this.info.orderstatus)
    },
    //要求补充材料状态判断
    issupplement() {
      return this.info.settlement_status == this.status_supplement
    },
    //结算明细信息展开/收起
    isshowPriceInfo() {
      this.showPriceInfo = this.info.orderstatus != '0020-1' //初次进入，按钮默认和状态的判断值一致
      return this.info.orderstatus != '0020-1'
    },

    formateDate: () => {
      return function(value) {
        return formatDate('YYYY年mm月dd日', new Date(value))
      }
    },
    //客房需求
    roomVisible: function() {
      return this.info.roomlist && this.info.roomlist.length > 0
    },
    //会场需求
    conferenceVisible: function() {
      return this.info.conferencelist && this.info.conferencelist.length > 0
    },
    //餐饮需求
    foodVisible: function() {
      return this.info.foodlist && this.info.foodlist.length > 0
    },
    //酒店外餐饮需求
    otherfoodVisible: function() {
      return this.info.otherfoodlist && this.info.otherfoodlist.length > 0
    },
    //大交通需求
    transportationVisible: function() {
      return this.info.transportationlist && this.info.transportationlist.length > 0
    },
    //地面交通
    carVisible: function() {
      return this.info.carlist && this.info.carlist.length > 0
    },
    // 房间杂费
    roomincidental() {
      return this.info.sundrieslist.filter(i => i.type == 1 && !i.isdelete)
    },
    // 会议杂费
    meetingcidental() {
      return this.info.sundrieslist.filter(i => i.type == 2 && !i.isdelete)
    },
    // 用餐杂费
    foodincidental() {
      return this.info.sundrieslist.filter(i => i.type == 3 && !i.isdelete)
    },
    // 酒店外用餐杂费
    otherfoodincidental() {
      return this.info.sundrieslist.filter(i => i.type == 7 && !i.isdelete)
    },
    // 大交通杂费
    intercitytrafficincidental() {
      return this.info.sundrieslist.filter(i => i.type == 4 && !i.isdelete)
    },
    // 地面交通杂费
    carincidental() {
      return this.info.sundrieslist.filter(i => i.type == 5 && !i.isdelete)
    },
    // 其他杂费
    otherincidental() {
      return this.info.sundrieslist.filter(i => i.type == 6 && !i.isdelete)
    },
    // 客房价格计算
    roomPrice() {
      let price = [
        {
          all: 0, // 原总价格
          subtotal: {} // 各项小计
        },
        {
          all: 0, // 结算价格
          subtotal: {} // 各项小计
        },
        0, // 杂项小计
        0, //结算服务费-分项
        0, //原服务费-分项
        0, //原服价格-阶梯
        0, //结算价格-阶梯
        '', //原服务费-分项公式
        '' //结算服务费-分项公式
      ]
      let subtotal_1 = price[0].subtotal
      let subtotal_2 = price[1].subtotal
      if (this.info.event_info_configure.room_inquiry_service_taxrate == undefined) this.info.event_info_configure['room_inquiry_service_taxrate'] = 0
      var taxrate = this.info.event_info_configure.room_inquiry_service_taxrate != null ? this.info.event_info_configure.room_inquiry_service_taxrate : 0 //设置默认值，服务费率
      this.info.roomlist.forEach((item, index) => {
        if (!subtotal_1[`sub_${index}`]) subtotal_1[`sub_${index}`] = 0
        if (!subtotal_2[`sub_${index}`]) subtotal_2[`sub_${index}`] = 0
        item.roomlists.forEach((itemc, indexc) => {
          /* if(itemc.quoted_price_room_id && itemc.lineoroffline == 1 && this.info.id==null){//设置默认值，结算金额，数量默认为报价金额，数量
						itemc.settlement_unitprice=positiveFloatSix(itemc.unitprice)
						itemc.settlement_count=positiveInteger(itemc.provide_count)
					} */

          let totalRoom = 0
          if (this.info.is_Inside_outside == 0) {
            totalRoom = itemc.settlement_count
          } else {
            totalRoom = positiveFloat(itemc.settlement_inside_roomcount) + positiveFloat(itemc.settlement_outside_roomcount)
          }

          var amount = itemc.lineoroffline == 1 ? positiveFloatSix(itemc.settlementsumprice) : positiveFloatSix(itemc.settlement_unitprice) * positiveFloat(totalRoom)
          subtotal_1[`sub_${index}`] += positiveFloatSix(itemc.quotationsumprice)
          price[0].all += positiveFloatSix(itemc.quotationsumprice)
          subtotal_2[`sub_${index}`] += positiveFloatSix(amount)
          price[1].all += positiveFloatSix(amount)
          if (this.info.event_info_configure.hotel_food_inquiry_isnotservice == 1) {
            //0不计入服务费,1计入服务费
            price[3] += positiveFloatSix(amount)
            price[4] += positiveFloatSix(itemc.quotationsumprice)

            price[5] += positiveFloatSix(itemc.quotationsumprice)
            price[6] += positiveFloatSix(amount)
          }
        })
      })
      let price_service = 0
      price[3] = positiveFloatSix(price[3]) * positiveFloatSix(taxrate / 100)
      price[4] = positiveFloatSix(price[4]) * positiveFloatSix(taxrate / 100)
      this.roomincidental.forEach(item => {
        var sumPrice = item.lineoroffline == 1 ? positiveFloatSix(item.sumprice) : positiveFloatSix(item.price) * positiveFloat(item.count)

        price[1].all += positiveFloatSix(sumPrice)
        price[2] += positiveFloatSix(sumPrice)
        if (item.isnotservice == 1) {
          //0不计入服务费,1计入服务费
          price_service += positiveFloatSix(sumPrice)

          price[6] += positiveFloatSix(sumPrice)
        }
      })
      price[3] = positiveFloatSix(price[3]) + positiveFloatSix(price_service) * positiveFloatSix(taxrate / 100)
      price[7] += '+' + positiveFloatSix(price[5]) + '*' + positiveFloatSix(taxrate) + '%'
      price[8] += '+' + positiveFloatSix(price[6]) + '*' + positiveFloatSix(taxrate) + '%'
      return price
    },
    adddifferenceerrormsg: () => {
      return function(type, date, rowIndex) {
        let message = ''
        if (type == 1) message = this.formateDate(date) + '客房,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明'
        else if (type == 2) message = this.formateDate(date) + '会场,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明'
        else if (type == 3) message = this.formateDate(date) + '酒店内餐饮,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明'
        else if (type == 4) message = this.formateDate(date) + '大交通,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明'
        else if (type == 5) message = this.formateDate(date) + '地面交通,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明'
        else if (type == 6) message = '其他服务,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明'
        else if (type == 7) message = this.formateDate(date) + '酒店外餐饮,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明'
        this.errormsg.push(message)
      }
    },
    addnewitemhasnocommments: () => {
      return function(type, date, rowIndex) {
        let message = ''
        if (type == 1) message = this.formateDate(date) + '新增客房,第' + rowIndex + '行,结算说明为必填项,请填写结算说明'
        else if (type == 2) message = this.formateDate(date) + '新增会场,第' + rowIndex + '行,结算说明为必填项,请填写结算说明'
        else if (type == 3) message = this.formateDate(date) + '新增酒店内餐饮,第' + rowIndex + '行,结算说明为必填项,请填写结算说明'
        else if (type == 4) message = this.formateDate(date) + '新增大交通,第' + rowIndex + '行,结算说明为必填项,请填写结算说明'
        else if (type == 5) message = this.formateDate(date) + '新增地面交通,第' + rowIndex + '行,结算说明为必填项,请填写结算说明'
        else if (type == 6) message = '新增其他服务,第' + rowIndex + '行,结算说明为必填项,请选择消费项目名称'
        else if (type == 7) message = this.formateDate(date) + '新增酒店外餐饮,第' + rowIndex + '行,结算说明为必填项,请填写结算说明'
        this.errormsg.push(message)
      }
    },
    addnewitemerrormsg: () => {
      return function(type, date, rowIndex) {
        let message = ''
        if (type == 1) message = this.formateDate(date) + '新增客房,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称'
        else if (type == 2) message = this.formateDate(date) + '新增会场,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称'
        else if (type == 3) message = this.formateDate(date) + '新增酒店内餐饮,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称'
        else if (type == 4) message = this.formateDate(date) + '新增大交通,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称'
        else if (type == 5) message = this.formateDate(date) + '新增地面交通,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称'
        else if (type == 6) message = '新增其他服务,第' + rowIndex + '行,消费项目名称为必填项,请选择消费项目名称'
        else if (type == 7) message = this.formateDate(date) + '新增酒店外餐饮,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称'
        this.errormsg.push(message)
      }
    },
    //客房差异标记
    roomDifference: () => {
      return function(item) {
        return ((positiveFloatSix(item.unitprice) !== positiveFloatSix(item.settlement_unitprice) || positiveFloat(item.provide_count) !== positiveFloat(item.settlement_count)) && item.quoted_price_room_id != null) || (!item.quoted_price_room_id && item.settlement_comments == '')
      }
    },
    //保存时验证客房数据
    checkRoomDifference: function() {
      let difference = false
      let newitem = false
      if (this.info.roomlist && this.info.roomlist.length > 0) {
        this.info.roomlist.forEach(item => {
          if (item.roomlists && item.roomlists.length > 0) {
            item.roomlists.forEach((room, row_index) => {
              difference = this.roomDifference(room)
              if (difference && room.quoted_price_room_id != null && (room.settlement_comments == null || room.settlement_comments == '')) this.adddifferenceerrormsg(1, item.date, row_index + 1)
              if (difference && room.quoted_price_room_id == null && (room.settlement_comments == null || room.settlement_comments == '')) this.addnewitemhasnocommments(1, item.date, row_index + 1)
            })
            let newitem = item.roomlists.filter(w => w.quoted_price_room_id == null && w.settlement_itemname == '')
            if (newitem.length > 0) {
              newitem.forEach((room, row_index) => {
                this.addnewitemerrormsg(1, item.date, row_index + 1)
              })
            }
          }
        })
      }
    },
    // 会议价格计算
    conferencePrice() {
      let price = [
        {
          all: 0, // 原总价格
          subtotal: {} // 各项小计
        },
        {
          all: 0, // 结算价格
          subtotal: {} // 各项小计
        },
        0, // 杂项小计
        0, //结算服务费-分项
        0, //原服务费-分项
        0, //原服价格-阶梯
        0, //结算价格-阶梯
        '', //原服务费-分项公式
        '' //结算服务费-分项公式
      ]
      let subtotal_1 = price[0].subtotal
      let subtotal_2 = price[1].subtotal
      if (this.info.event_info_configure.conference_inquiry_service_taxrate == undefined) this.info.event_info_configure['conference_inquiry_service_taxrate'] = 0
      var taxrate = this.info.event_info_configure.conference_inquiry_service_taxrate != null ? this.info.event_info_configure.conference_inquiry_service_taxrate : 0 //设置默认值，服务费率
      this.info.conferencelist.forEach((item, index) => {
        if (!subtotal_1[`sub_${index}`]) subtotal_1[`sub_${index}`] = 0
        if (!subtotal_2[`sub_${index}`]) subtotal_2[`sub_${index}`] = 0
        item.conferencelists.forEach(itemc => {
          /* if(itemc.quoted_price_conference_id && itemc.lineoroffline == 1 && this.info.id==null){//设置默认值，结算金额，数量默认为报价金额，数量
						itemc.settlement_price=positiveFloatSix(itemc.price)
						itemc.settlement_count=positiveInteger(itemc.count)
					} */

          let itemcp = positiveFloatSix(itemc.quotationsumprice)
          let itemcpset = itemc.lineoroffline == 1 ? positiveFloatSix(itemc.settlementsumprice) : positiveFloatSix(itemc.settlement_price) * positiveFloat(itemc.settlement_count)
          /*subtotal_1[`sub_${index}`] += itemcp;
					price[0].all += itemcp;
					subtotal_2[`sub_${index}`] += itemcpset;
					price[1].all += itemcpset; */
          subtotal_1[`sub_${index}`] += itemcp
          price[0].all += itemcp
          subtotal_2[`sub_${index}`] += itemcpset
          price[1].all += itemcpset
          if (this.info.event_info_configure.conference_inquiry_isnotservice == 1) {
            //0不计入服务费,1计入服务费
            price[3] += itemcpset
            price[4] += itemcp

            price[5] += itemcp
            price[6] += itemcpset
          }
        })
      })
      let price_service = 0
      price[3] = positiveFloatSix(price[3]) * positiveFloatSix(taxrate / 100)
      price[4] = positiveFloatSix(price[4]) * positiveFloatSix(taxrate / 100)
      this.meetingcidental.forEach(item => {
        let itemcp = item.lineoroffline == 1 ? positiveFloatSix(item.sumprice) : positiveFloatSix(item.price) * positiveFloat(item.count)
        price[1].all += itemcp
        price[2] += itemcp
        if (item.isnotservice == 1) {
          //0不计入服务费,1计入服务费
          price_service += itemcp

          price[6] += itemcp
        }
      })
      price[3] = positiveFloatSix(price[3]) + positiveFloatSix(price_service) * positiveFloatSix(taxrate / 100)
      price[7] = '+' + positiveFloatSix(price[5]) + '*' + positiveFloatSix(taxrate) + '%'
      price[8] = '+' + positiveFloatSix(price[6]) + '*' + positiveFloatSix(taxrate) + '%'
      return price
    },
    //会场差异标记
    conferenceDifference: () => {
      return function(item) {
        return ((positiveFloatSix(item.price) !== positiveFloatSix(item.settlement_price) || positiveFloat(item.count) !== positiveFloat(item.settlement_count)) && item.quoted_price_conference_id != null) || (!item.quoted_price_conference_id && item.settlement_comments == '')
      }
    },
    //保存时验证会场数据
    checkConferenceDifference: function() {
      let difference = false
      if (this.info.conferencelist && this.info.conferencelist.length > 0) {
        this.info.conferencelist.forEach(item => {
          if (item.conferencelists && item.conferencelists.length > 0) {
            item.conferencelists.forEach((conference, row_index) => {
              difference = this.conferenceDifference(conference)
              if (difference && conference.quoted_price_conference_id != null && (conference.settlement_comments == null || conference.settlement_comments == '')) this.adddifferenceerrormsg(2, item.date, row_index + 1)
              if (difference && conference.quoted_price_conference_id == null && (conference.settlement_comments == null || conference.settlement_comments == '')) this.addnewitemhasnocommments(2, item.date, row_index + 1)
            })
            let newitem = item.conferencelists.filter(w => w.quoted_price_conference_id == null && w.settlement_itemname == '')
            if (newitem.length > 0) {
              newitem.forEach((conference, row_index) => {
                this.addnewitemerrormsg(2, item.date, row_index + 1)
              })
            }
          }
        })
      }
    },
    // 酒店内餐饮价格计算
    foodPrice() {
      let price = [
        {
          all: 0, // 原总价格
          subtotal: {} // 各项小计
        },
        {
          all: 0, // 结算价格
          subtotal: {} // 各项小计
        },
        0, // 杂项小计
        0, //结算服务费-分项
        0, //原服务费-分项
        0, //原服价格-阶梯
        0, //结算价格-阶梯
        '', //原服务费-分项公式
        '' //结算服务费-分项公式
      ]
      let subtotal_1 = price[0].subtotal
      let subtotal_2 = price[1].subtotal
      if (this.info.event_info_configure.hotel_food_inquiry_service_taxrate == undefined) this.info.event_info_configure['hotel_food_inquiry_service_taxrate'] = 0
      var taxrate = this.info.event_info_configure.hotel_food_inquiry_service_taxrate != null ? this.info.event_info_configure.hotel_food_inquiry_service_taxrate : 0 //设置默认值，服务费率
      this.info.foodlist.forEach((item, index) => {
        if (!subtotal_1[`sub_${index}`]) subtotal_1[`sub_${index}`] = 0
        if (!subtotal_2[`sub_${index}`]) subtotal_2[`sub_${index}`] = 0
        item.foodlists.forEach(itemc => {
          /* if(itemc.quoted_price_food_id && itemc.lineoroffline == 1 && this.info.id==null){//设置默认值，结算金额，数量默认为报价金额，数量
						itemc.settlement_unitprice=positiveFloatSix(itemc.price)
						itemc.settlement_count=positiveInteger(itemc.personcount)
					} */

          let itemcp = positiveFloatSix(itemc.quotationsumprice)
          let itemcpset = itemc.lineoroffline == 1 ? positiveFloatSix(itemc.settlementsumprice) : positiveFloatSix(itemc.settlement_unitprice) * positiveFloat(itemc.settlement_count)

          subtotal_1[`sub_${index}`] += itemcp
          price[0].all += itemcp
          subtotal_2[`sub_${index}`] += itemcpset
          price[1].all += itemcpset
          if (this.info.event_info_configure.hotel_food_inquiry_isnotservice == 1) {
            //0不计入服务费,1计入服务费
            price[3] += itemcpset
            price[4] += itemcp

            price[5] += itemcp
            price[6] += itemcpset
          }
        })
      })
      let price_service = 0
      price[3] = positiveFloatSix(price[3]) * positiveFloatSix(taxrate / 100)
      price[4] = positiveFloatSix(price[4]) * positiveFloatSix(taxrate / 100)
      this.foodincidental.forEach(item => {
        let itemcp = item.lineoroffline == 1 ? positiveFloatSix(item.sumprice) : positiveFloatSix(item.price) * positiveFloat(item.count)
        price[1].all += itemcp
        price[2] += itemcp
        if (item.isnotservice == 1) {
          //0不计入服务费,1计入服务费
          price_service += itemcp

          price[6] += itemcp
        }
      })
      price[3] = positiveFloatSix(price[3]) + positiveFloatSix(price_service) * positiveFloatSix(taxrate / 100)
      price[7] += '+' + positiveFloatSix(price[5]) + '*' + positiveFloatSix(taxrate) + '%'
      price[8] += '+' + positiveFloatSix(price[6]) + '*' + positiveFloatSix(taxrate) + '%'
      return price
    },
    //酒店内餐饮差异标记
    foodDifference() {
      return function(item) {
        return ((positiveFloatSix(item.price) !== positiveFloatSix(item.settlement_unitprice) || positiveFloat(item.personcount) !== positiveFloat(item.settlement_count)) && item.quoted_price_food_id != null) || (!item.quoted_price_food_id && item.settlement_comments == '')
      }
    },
    //保存时验证酒店内餐饮数据
    checkFoodDifference: function() {
      let difference = false
      if (this.info.foodlist && this.info.foodlist.length > 0) {
        this.info.foodlist.forEach(item => {
          if (item.foodlists && item.foodlists.length > 0) {
            item.foodlists.forEach((food, row_index) => {
              difference = this.foodDifference(food)
              if (difference && food.quoted_price_food_id != null && (food.settlement_comments == null || food.settlement_comments == '')) this.adddifferenceerrormsg(3, item.date, row_index + 1)
              if (difference && food.quoted_price_food_id == null && (food.settlement_comments == null || food.settlement_comments == '')) this.addnewitemhasnocommments(3, item.date, row_index + 1)
            })
            let newitem = item.foodlists.filter(w => w.quoted_price_food_id == null && w.settlement_itemname == '')
            if (newitem.length > 0) {
              newitem.forEach((food, row_index) => {
                this.addnewitemerrormsg(3, item.date, row_index + 1)
              })
            }
          }
        })
      }
    },
    // 酒店外餐饮价格计算
    otherfoodPrice() {
      let price = [
        {
          all: 0, // 原总价格
          subtotal: {} // 各项小计
        },
        {
          all: 0, // 结算价格
          subtotal: {} // 各项小计
        },
        0, // 杂项小计
        0, //结算服务费-分项
        0, //原服务费-分项
        0, //原服价格-阶梯
        0, //结算价格-阶梯
        '', //原服务费-分项公式
        '' //结算服务费-分项公式
      ]
      let subtotal_1 = price[0].subtotal
      let subtotal_2 = price[1].subtotal
      if (this.info.event_info_configure.others_food_inquiry_service_taxrate == undefined) this.info.event_info_configure['others_food_inquiry_service_taxrate'] = 0
      var taxrate = this.info.event_info_configure.others_food_inquiry_service_taxrate != null ? this.info.event_info_configure.others_food_inquiry_service_taxrate : 0 //设置默认值，服务费率
      this.info.otherfoodlist.forEach((item, index) => {
        if (!subtotal_1[`sub_${index}`]) subtotal_1[`sub_${index}`] = 0
        if (!subtotal_2[`sub_${index}`]) subtotal_2[`sub_${index}`] = 0
        item.foodlists.forEach(itemc => {
          /* if(itemc.quoted_price_food_id && itemc.lineoroffline == 1 && this.info.id==null){//设置默认值，结算金额，数量默认为报价金额，数量
						itemc.settlement_unitprice=positiveFloatSix(itemc.price)
						itemc.settlement_count=positiveInteger(itemc.personcount)
					} */

          let itemcp = positiveFloatSix(itemc.quotationsumprice)
          let itemcpset = itemc.lineoroffline == 1 ? positiveFloatSix(itemc.settlementsumprice) : positiveFloatSix(itemc.settlement_unitprice) * positiveFloat(itemc.settlement_count)

          subtotal_1[`sub_${index}`] += itemcp
          price[0].all += itemcp
          subtotal_2[`sub_${index}`] += itemcpset
          price[1].all += itemcpset
          if (this.info.event_info_configure.others_food_inquiry_isnotservice == 1) {
            //0不计入服务费,1计入服务费
            price[3] += itemcpset
            price[4] += itemcp

            price[5] += itemcp
            price[6] += itemcpset
          }
        })
      })
      let price_service = 0
      price[3] = positiveFloatSix(price[3]) * positiveFloatSix(taxrate / 100)
      price[4] = positiveFloatSix(price[4]) * positiveFloatSix(taxrate / 100)
      this.otherfoodincidental.forEach(item => {
        let itemcp = item.lineoroffline == 1 ? positiveFloatSix(item.sumprice) : positiveFloatSix(item.price) * positiveFloat(item.count)
        price[1].all += itemcp
        price[2] += itemcp
        if (item.isnotservice == 1) {
          //0不计入服务费,1计入服务费
          price_service += itemcp

          price[6] += itemcp
        }
      })
      price[3] = positiveFloatSix(price[3]) + positiveFloatSix(price_service) * positiveFloatSix(taxrate / 100)
      price[7] += '+' + positiveFloatSix(price[5]) + '*' + positiveFloatSix(taxrate) + '%'
      price[8] += '+' + positiveFloatSix(price[6]) + '*' + positiveFloatSix(taxrate) + '%'
      return price
    },
    //酒店外餐饮差异标记
    otherFoodDifference() {
      return function(item) {
        return ((positiveFloatSix(item.price) !== positiveFloatSix(item.settlement_unitprice) || positiveFloat(item.personcount) !== positiveFloat(item.settlement_count)) && item.quoted_price_food_id != null) || (!item.quoted_price_food_id && item.settlement_comments == '')
      }
    },
    //保存时验证酒店外餐饮数据
    checkOtherFoodDifference: function() {
      let difference = false
      if (this.info.otherfoodlist && this.info.otherfoodlist.length > 0) {
        this.info.otherfoodlist.forEach(item => {
          if (item.foodlists && item.foodlists.length > 0) {
            item.foodlists.forEach((food, row_index) => {
              difference = this.otherFoodDifference(food)
              if (difference && food.quoted_price_food_id != null && (food.settlement_comments == null || food.settlement_comments == '')) this.adddifferenceerrormsg(7, item.date, row_index + 1)
              if (difference && food.quoted_price_food_id == null && (food.settlement_comments == null || food.settlement_comments == '')) this.addnewitemhasnocommments(7, item.date, row_index + 1)
            })
            let newitem = item.foodlists.filter(w => w.quoted_price_food_id == null && w.settlement_itemname == '')
            if (newitem.length > 0) {
              newitem.forEach((food, row_index) => {
                this.addnewitemerrormsg(7, item.date, row_index + 1)
              })
            }
          }
        })
      }
    },
    // 大交通价格计算
    intercitytrafficPrice() {
      let price = [
        {
          all: 0, // 原总价格
          subtotal: {} // 各项小计
        },
        {
          all: 0, // 结算价格
          subtotal: {} // 各项小计
        },
        0, // 杂项小计
        0, //结算服务费-分项
        0, //原服务费-分项
        0, //原服价格-阶梯
        0, //结算价格-阶梯
        '', //原服务费-分项公式
        '' //结算服务费-分项公式
      ]
      let subtotal_1 = price[0].subtotal
      let subtotal_2 = price[1].subtotal
      if (this.info.event_info_configure.transportation_inquiry_service_taxrate == undefined) this.info.event_info_configure['transportation_inquiry_service_taxrate'] = 0
      var taxrate = this.info.event_info_configure.transportation_inquiry_service_taxrate != null ? this.info.event_info_configure.transportation_inquiry_service_taxrate : 0 //设置默认值，服务费率
      this.info.transportationlist.forEach((item, index) => {
        if (!subtotal_1[`sub_${index}`]) subtotal_1[`sub_${index}`] = 0
        if (!subtotal_2[`sub_${index}`]) subtotal_2[`sub_${index}`] = 0
        item.tranlists.forEach(itemc => {
          /* if(itemc.quoted_price_transportation_id && itemc.lineoroffline == 1 && this.info.id==null){//设置默认值，结算金额，数量默认为报价金额，数量
						itemc.settlement_unitprice=positiveFloatSix(itemc.unitprice)
						itemc.settlement_count=positiveInteger(itemc.passengercount)
					} */

          let itemcp = positiveFloatSix(itemc.quotationsumprice)
          let itemcpset = itemc.lineoroffline == 1 ? positiveFloatSix(itemc.settlementsumprice) : positiveFloatSix(itemc.settlement_unitprice) * positiveFloat(itemc.settlement_count)

          subtotal_1[`sub_${index}`] += itemcp
          price[0].all += itemcp
          subtotal_2[`sub_${index}`] += itemcpset
          price[1].all += itemcpset
          if (this.info.event_info_configure.transportation_inquiry_isnotservice == 1) {
            //0不计入服务费,1计入服务费
            price[3] += itemcpset
            price[4] += itemcp

            price[5] += itemcp
            price[6] += itemcpset
          }
        })
      })
      let price_service = 0
      price[3] = positiveFloatSix(price[3]) * positiveFloatSix(taxrate / 100)
      price[4] = positiveFloatSix(price[4]) * positiveFloatSix(taxrate / 100)
      this.intercitytrafficincidental.forEach(item => {
        let itemcp = item.lineoroffline == 1 ? positiveFloatSix(item.sumprice) : positiveFloatSix(item.price) * positiveFloat(item.count)
        price[1].all += itemcp
        price[2] += itemcp
        if (item.isnotservice == 1) {
          //0不计入服务费,1计入服务费
          price_service += itemcp

          price[6] += itemcp
        }
      })
      price[3] = positiveFloatSix(price[3]) + positiveFloatSix(price_service) * positiveFloatSix(taxrate / 100)
      price[7] = '+' + positiveFloatSix(price[5]) + '*' + positiveFloatSix(taxrate) + '%'
      price[8] = '+' + positiveFloatSix(price[6]) + '*' + positiveFloatSix(taxrate) + '%'
      return price
    },
    //大交通差异标记
    transportationDifference() {
      return function(item) {
        return ((positiveFloatSix(item.unitprice) !== positiveFloatSix(item.settlement_unitprice) || positiveFloat(item.passengercount) !== positiveFloat(item.settlement_count)) && item.quoted_price_transportation_id != null) || (!item.quoted_price_transportation_id && item.settlement_comments == '')
      }
    },
    //保存时验证大交通数据
    checkTransportationDifference: function() {
      let difference = false
      if (this.info.transportationlist && this.info.transportationlist.length > 0) {
        this.info.transportationlist.forEach(item => {
          if (item.tranlists && item.tranlists.length > 0) {
            item.tranlists.forEach((transportation, row_index) => {
              difference = this.transportationDifference(transportation)
              if (difference && transportation.quoted_price_transportation_id != null && (transportation.settlement_comments == null || transportation.settlement_comments == '')) this.adddifferenceerrormsg(4, item.date, row_index + 1)
              if (difference && transportation.quoted_price_transportation_id == null && (transportation.settlement_comments == null || transportation.settlement_comments == '')) this.addnewitemhasnocommments(4, item.date, row_index + 1)
            })
            let newitem = item.tranlists.filter(w => w.quoted_price_transportation_id == null && w.settlement_itemid == null)
            if (newitem.length > 0) {
              newitem.forEach((transportation, row_index) => {
                this.addnewitemerrormsg(4, item.date, row_index + 1)
              })
            }
          }
        })
      }
    },
    // 市内交通价格计算
    carPrice() {
      let price = [
        {
          all: 0, // 原总价格
          subtotal: {} // 各项小计
        },
        {
          all: 0, // 结算价格
          subtotal: {} // 各项小计
        },
        0, // 杂项小计
        0, //结算服务费-分项
        0, //原服务费-分项
        0, //原服价格-阶梯
        0, //结算价格-阶梯
        '', //原服务费-分项公式
        '' //结算服务费-分项公式
      ]
      let subtotal_1 = price[0].subtotal
      let subtotal_2 = price[1].subtotal
      if (this.info.event_info_configure.car_inquiry_service_taxrate == undefined) this.info.event_info_configure['car_inquiry_service_taxrate'] = 0
      var taxrate = this.info.event_info_configure.car_inquiry_service_taxrate != null ? this.info.event_info_configure.car_inquiry_service_taxrate : 0 //设置默认值，服务费率
      this.info.carlist.forEach((item, index) => {
        if (!subtotal_1[`sub_${index}`]) subtotal_1[`sub_${index}`] = 0
        if (!subtotal_2[`sub_${index}`]) subtotal_2[`sub_${index}`] = 0
        item.carlists.forEach(itemc => {
          /* if(itemc.quoted_price_car_id && itemc.lineoroffline == 1 && this.info.id==null){//设置默认值，结算金额，数量默认为报价金额，数量
						itemc.settlement_unitprice=itemc.settlement_unitprice==0?positiveFloatSix(itemc.price):itemc.settlement_unitprice
						itemc.settlement_count=itemc.settlement_count==0?positiveInteger(itemc.carcount):itemc.settlement_count
					} */

          let itemcp = positiveFloatSix(itemc.quotationsumprice)
          let itemcpset = itemc.lineoroffline == 1 ? positiveFloatSix(itemc.settlementsumprice) : positiveFloatSix(itemc.settlement_unitprice) * positiveFloat(itemc.settlement_count)

          subtotal_1[`sub_${index}`] += itemcp
          price[0].all += itemcp
          subtotal_2[`sub_${index}`] += itemcpset
          price[1].all += itemcpset
          if (this.info.event_info_configure.car_inquiry_isnotservice == 1) {
            //0不计入服务费,1计入服务费
            price[3] += itemcpset
            price[4] += itemcp

            price[5] += itemcp
            price[6] += itemcpset
          }
        })
      })
      let price_service = 0
      price[3] = positiveFloatSix(price[3]) * positiveFloatSix(taxrate / 100)
      price[4] = positiveFloatSix(price[4]) * positiveFloatSix(taxrate / 100)
      this.carincidental.forEach(item => {
        let itemcp = item.lineoroffline == 1 ? positiveFloatSix(item.sumprice) : positiveFloatSix(item.price) * positiveFloat(item.count)
        price[1].all += itemcp
        price[2] += itemcp
        if (item.isnotservice == 1) {
          //0不计入服务费,1计入服务费
          price_service += itemcp

          price[6] += itemcp
        }
      })
      price[3] = positiveFloatSix(price[3]) + positiveFloatSix(price_service) * positiveFloatSix(taxrate / 100)
      price[7] += '+' + positiveFloatSix(price[5]) + '*' + positiveFloatSix(taxrate) + '%'
      price[8] += '+' + positiveFloatSix(price[6]) + '*' + positiveFloatSix(taxrate) + '%'
      return price
    },
    //市内交通差异标记
    carDifference() {
      return function(item) {
        return ((positiveFloatSix(item.price) !== positiveFloatSix(item.settlement_unitprice) || positiveFloat(item.carcount) !== positiveFloat(item.settlement_count)) && item.quoted_price_car_id != null) || (!item.quoted_price_car_id && item.settlement_comments == '')
      }
    },
    //保存时验证市内交通数据
    checkCarDifference: function() {
      let difference = false
      if (this.info.carlist && this.info.carlist.length > 0) {
        this.info.carlist.forEach(item => {
          if (item.carlists && item.carlists.length > 0) {
            item.carlists.forEach((car, row_index) => {
              difference = this.carDifference(car)
              if (difference && car.quoted_price_car_id != null && (car.settlement_comments == null || car.settlement_comments == '')) this.adddifferenceerrormsg(5, item.date, row_index + 1)
              if (difference && car.quoted_price_car_id == null && (car.settlement_comments == null || car.settlement_comments == '')) this.addnewitemhasnocommments(5, item.date, row_index + 1)
            })
            let newitem = item.carlists.filter(w => w.quoted_price_car_id == null && w.settlement_itemname == '')
            if (newitem.length > 0) {
              newitem.forEach((car, row_index) => {
                this.addnewitemerrormsg(5, item.date, row_index + 1)
              })
            }
          }
        })
      }
    },
    // 其他价格计算
    otherPrice() {
      let price = [
        0, //原总价格
        0, //结算价格
        0, // 杂项小计
        0, //结算服务费-分项
        0, //原服务费-分项
        0, //原服价格-阶梯
        0, //结算价格-阶梯
        '', //原服务费-分项公式
        '' //结算服务费-分项公式
      ]
      let service_price = 0
      let otherPrice = 0
      let oldserviceprice = 0
      this.info.otherlist.forEach((item, index) => {
        /* if(item.quoted_price_other_id && item.lineoroffline == 1 && this.info.id==null){//设置默认值，结算金额，数量默认为报价金额，数量
					item.settlement_unitprice=item.settlement_unitprice==0?positiveFloatSix(item.price):item.settlement_unitprice
					item.settlement_count=item.settlement_count==0?positiveInteger(item.offerservicedaycount) * positiveInteger(item.offerparticipatecount):item.settlement_count
				} */

        if (item.settlementservice_taxrate == undefined) item['settlementservice_taxrate'] = 0
        item.settlementservice_taxrate = item.settlementservice_taxrate != null ? item.settlementservice_taxrate : 0 //设置默认值，结算服务费率

        if (item.service_taxrate == undefined) item['service_taxrate'] = 0
        item.service_taxrate = item.service_taxrate != null ? item.service_taxrate : 0 //设置默认值，报价服务费率

        let taxrate = item.quoted_price_other_id != null ? item.service_taxrate : item.settlementservice_taxrate //服务费率,为空是结算，不为空则为报价
        let itemcp = positiveFloatSix(item.quotationsumprice)
        let itemcpset = item.lineoroffline == 1 ? positiveFloatSix(item.settlementsumprice) : positiveFloatSix(item.settlement_unitprice) * positiveFloat(item.settlement_count)

        /* let itemcp = positiveFloatSix(item.price) * positiveInteger(item.offerservicedaycount) * positiveInteger(item.offerparticipatecount);
				let itemcpset = positiveFloatSix(item.settlement_unitprice) * positiveInteger(item.settlement_count); */
        price[0] = price[0] + itemcp
        price[1] = price[1] + itemcpset

        //给其他项税率、是否计入服务费赋值
        this.info.eventinfoother.forEach((itemc, indexc) => {
          if (item.servicetype == itemc.othercode) {
            this.info.otherlist[index].settlementservice_taxrate = itemc.servicerate
            // this.info.otherlist[index].isnotservice = itemc.iscalservice;
          }
        })

        if (item.isnotservice == 1) {
          //0不计入服务费,1计入服务费
          service_price += positiveFloatSix(itemcpset) * positiveFloatSix(taxrate / 100)
          oldserviceprice += positiveFloatSix(itemcp) * positiveFloatSix(taxrate / 100)

          price[5] += itemcp
          price[6] += itemcpset
          // debugger
          price[7] += '+' + positiveFloatSix(itemcp) + '*' + positiveFloatSix(taxrate) + '%'
          price[8] += '+' + positiveFloatSix(itemcpset) + '*' + positiveFloatSix(taxrate) + '%'
        }
      })
      this.otherincidental.forEach(item => {
        if (item.settlementservice_taxrate == undefined) item['settlementservice_taxrate'] = 0
        item.settlementservice_taxrate = item.settlementservice_taxrate != null ? item.settlementservice_taxrate : 0 //设置默认值，服务费率
        let itemcp = item.lineoroffline == 1 ? positiveFloatSix(item.sumprice) : positiveFloatSix(item.price) * positiveFloat(item.count)
        price[1] = price[1] + itemcp
        price[2] = price[2] + itemcp
        if (item.isnotservice == 1) {
          //0不计入服务费,1计入服务费
          otherPrice += positiveFloatSix(itemcp) * positiveFloatSix(item.settlementservice_taxrate / 100)
          console.log(item.settlementservice_taxrate)
          price[6] += itemcp
          price[8] += '+' + positiveFloatSix(itemcp) + '*' + positiveFloatSix(item.settlementservice_taxrate) + '%'
        }
      })
      price[3] = positiveFloatSix(service_price) + positiveFloatSix(otherPrice)
      price[4] = positiveFloatSix(oldserviceprice)
      return price
    },
    //其他差异标记
    otherDifference() {
      return function(item) {
        return positiveFloatSix(item.price) !== positiveFloatSix(item.settlement_unitprice) || positiveFloat(item.offerservicedaycount) * positiveFloat(item.offerparticipatecount) !== positiveFloat(item.settlement_count) || (!item.quoted_price_other_id && item.settlement_comments == '')
      }
    },
    //保存时验证其他服务数据
    checkOtherDifference: function() {
      let difference = false
      if (this.info.otherlist && this.info.otherlist.length > 0) {
        this.info.otherlist.forEach((item, row_index) => {
          difference = this.otherDifference(item)
          if (difference && item.quoted_price_other_id != null && (item.settlement_comments == null || item.settlement_comments == '')) this.adddifferenceerrormsg(6, null, row_index + 1)
          if (difference && item.quoted_price_other_id == null && (item.settlement_comments == null || item.settlement_comments == '')) this.addnewitemhasnocommments(6, null, row_index + 1)
        })
        let newitem = this.info.otherlist.filter(w => w.quoted_price_other_id == null && !w.servicetype)
        if (newitem.length > 0) {
          newitem.forEach((other, row_index) => {
            this.addnewitemerrormsg(6, null, row_index + 1)
          })
        }
      }
    },
    // 服务费
    servicePrice() {
      let price = [
        0, //原总价格-分项/阶梯/跳档
        0, //结算价格-分项/阶梯/跳档
        '', //原服务费-分项/阶梯/跳档公式
        '', //结算服务费-分项/阶梯/跳档公式
        0, //原总价格-直采
        0, //结算价格-直采
        '', //原服务费-直采公式
        '', //结算服务费-直采公式
        0, // 拜耳直采服务费 报价总金额
        0 // 拜耳直采服务费 结算总金额
      ]
      if (this.info.event_info_configure.service_fee_calculation_method == 0) {
        //分项
        price[0] = positiveFloatSix(this.roomPrice[4]) + positiveFloatSix(this.conferencePrice[4]) + positiveFloatSix(this.foodPrice[4]) + positiveFloatSix(this.otherfoodPrice[4]) + positiveFloatSix(this.intercitytrafficPrice[4]) + positiveFloatSix(this.carPrice[4]) + positiveFloatSix(this.otherPrice[4])

        price[1] = positiveFloatSix(this.roomPrice[3]) + positiveFloatSix(this.conferencePrice[3]) + positiveFloatSix(this.foodPrice[3]) + positiveFloatSix(this.otherfoodPrice[3]) + positiveFloatSix(this.intercitytrafficPrice[3]) + positiveFloatSix(this.carPrice[3]) + positiveFloatSix(this.otherPrice[3])

        price[2] = this.roomPrice[7] + this.conferencePrice[7] + this.foodPrice[7] + this.otherfoodPrice[7] + this.intercitytrafficPrice[7] + this.carPrice[7] + this.otherPrice[7]
        price[3] = this.roomPrice[8] + this.conferencePrice[8] + this.foodPrice[8] + this.otherfoodPrice[8] + this.intercitytrafficPrice[8] + this.carPrice[8] + this.otherPrice[8]
      } else if (this.info.event_info_configure.service_fee_calculation_method == 1) {
        //阶梯
        if (this.info.event_info_ladder_taxrates) {
          this.info.event_info_ladder_taxrates.sort(function(obj1, obj2) {
            //从小到大排序
            var value1 = obj1['ladder_min']
            var value2 = obj2['ladder_min']
            return value1 - value2
          })
        }
        var oldTotalPrice = this.price_no[2]
        var newTotalPrice = this.price_no[3]
        this.info.event_info_ladder_taxrates.forEach((item, index) => {
          var oldMoney = 0
          var newMoney = 0
          if (this.info.event_info_ladder_taxrates[index - 1]) {
            oldMoney = positiveFloatZero(item.ladder_max) - positiveFloatZero(this.info.event_info_ladder_taxrates[index - 1].ladder_max ? this.info.event_info_ladder_taxrates[index - 1].ladder_max : 0)
            newMoney = positiveFloatZero(item.ladder_max) - positiveFloatZero(this.info.event_info_ladder_taxrates[index - 1].ladder_max ? this.info.event_info_ladder_taxrates[index - 1].ladder_max : 0)
          } else {
            oldMoney = positiveFloatZero(item.ladder_max) - 0
            newMoney = positiveFloatZero(item.ladder_max) - 0
          }
          if (positiveFloatZero(oldTotalPrice) >= positiveFloatZero(oldMoney)) {
            //剩余金额大于等于当前阶梯区间的金额
            if (this.info.event_info_ladder_taxrates.length - 1 == index) {
              //最终的阶梯
              price[0] += positiveFloatZero(oldTotalPrice) * positiveFloatZero(item.ladder_taxrate / 100)
              price[2] += '+' + positiveFloatSix(oldTotalPrice) + '*' + positiveFloatSix(item.ladder_taxrate) + '%'
            } else {
              oldTotalPrice = positiveFloatZero(oldTotalPrice) - positiveFloatZero(oldMoney)
              price[0] += positiveFloatZero(oldMoney) * positiveFloatZero(item.ladder_taxrate / 100)
              price[2] += '+' + positiveFloatSix(oldMoney) + '*' + positiveFloatSix(item.ladder_taxrate) + '%'
            }
          } else {
            price[0] += positiveFloatZero(oldTotalPrice) * positiveFloatZero(item.ladder_taxrate / 100)
            price[2] += '+' + positiveFloatSix(oldTotalPrice) + '*' + positiveFloatSix(item.ladder_taxrate) + '%'
            oldTotalPrice = 0
          }
          if (positiveFloatZero(newTotalPrice) >= positiveFloatZero(newMoney)) {
            if (this.info.event_info_ladder_taxrates.length - 1 == index) {
              price[1] += positiveFloatZero(newTotalPrice) * positiveFloatZero(item.ladder_taxrate / 100)
              price[3] += '+' + positiveFloatSix(newTotalPrice) + '*' + positiveFloatSix(item.ladder_taxrate) + '%'
            } else {
              newTotalPrice = positiveFloatZero(newTotalPrice) - positiveFloatZero(newMoney)
              price[1] += positiveFloatZero(newMoney) * positiveFloatZero(item.ladder_taxrate / 100)
              price[3] += '+' + positiveFloatSix(newMoney) + '*' + positiveFloatSix(item.ladder_taxrate) + '%'
            }
          } else {
            price[1] += positiveFloatZero(newTotalPrice) * positiveFloatZero(item.ladder_taxrate / 100)
            price[3] += '+' + positiveFloatSix(newTotalPrice) + '*' + positiveFloatSix(item.ladder_taxrate) + '%'
            newTotalPrice = 0
          }
        })
      } else if (this.info.event_info_configure.service_fee_calculation_method == 2) {
        var oldTotalPrice = this.price_no[2]
        var newTotalPrice = this.price_no[3]

        // 原报价 服务费
        for (var i = 0; i < this.info.event_info_grade_taxrates.length; i++) {
          if (i == this.info.event_info_grade_taxrates.length - 1 || (positiveFloatSix(oldTotalPrice) >= this.info.event_info_grade_taxrates[i].grade_money && positiveFloatSix(oldTotalPrice) < this.info.event_info_grade_taxrates[i + 1].grade_money)) {
            price[0] = (((positiveFloatSix(oldTotalPrice) * this.info.event_info_grade_taxrates[i].grade_taxrate) / 100) * this.info.fzc_service) / 100 // 服务费金额 = 计入服务费总价 * 对应档次 服务费比例
            price[2] = positiveFloat(oldTotalPrice) + '*' + this.info.event_info_grade_taxrates[i].grade_taxrate + '%'

            if (this.info.event_info_configure.service_fee_ratio == 1) {
              price[2] += '*' + this.info.fzc_service + '%'
            }
            // 有非直采最低服务费 并且 非直采服务费 小于 最低服务费，取值最低服务费
            if (this.info.event_info_configure.minimum_service_fee == 1 && price[0] < this.info.event_info_configure.minimum_service_fee_money) {
              price[0] = this.info.event_info_configure.minimum_service_fee_money
            }
            break
          }
        }
        // 结算服务费
        for (var i = 0; i < this.info.event_info_grade_taxrates.length; i++) {
          if (i == this.info.event_info_grade_taxrates.length - 1 || (positiveFloatSix(newTotalPrice) >= this.info.event_info_grade_taxrates[i].grade_money && positiveFloatSix(newTotalPrice) < this.info.event_info_grade_taxrates[i + 1].grade_money)) {
            // 服务费金额 = 计入服务费总价 * 对应档次 服务费比例 * 服务费折扣
            price[1] = (((positiveFloatSix(newTotalPrice) * this.info.event_info_grade_taxrates[i].grade_taxrate) / 100) * this.info.sheet_fzc_service) / 100
            price[3] = positiveFloat(newTotalPrice) + '*' + this.info.event_info_grade_taxrates[i].grade_taxrate + '%'
            // 有非直采最低服务费 并且 非直采服务费 小于 最低服务费，取值最低服务费
            if (this.info.event_info_configure.minimum_service_fee == 1 && price[1] < this.info.event_info_configure.minimum_service_fee_money) {
              price[1] = this.info.event_info_configure.minimum_service_fee_money
            }
            break
          }
        }
      }

      // 直采服务费为拜耳规则
      if (this.info.zhicai_service == 1) {
        // 报价展示计算
        this.info.event_quoted_price_zhicai_service.forEach(item => {
          price[8] += item.grade_price * item.grade_count ? item.grade_count : 0
        })
        // 填写结算计算
        this.info.event_settlement_sheet_zhicai_service.forEach(item => {
          price[9] += item.grade_price * item.grade_count ? item.grade_count : 0
        })
      }

      price[2] = price[2].replace('+', '')
      price[3] = price[3].replace('+', '')
      if (!this.info.quoted_travelagency_payment_money) {
        //报价直采金额
        this.info.quoted_travelagency_payment_money = 0
      }
      if (!this.info.quoted_travelagency_payment_proportion) {
        //报价直采比例
        this.info.quoted_travelagency_payment_proportion = 0
      }

      price[4] = positiveFloatZero(this.info.quoted_travelagency_payment_money) * positiveFloatZero(this.info.quoted_travelagency_payment_proportion / 100)
      price[5] = positiveFloatZero(this.info.settlement_advance_amount) * positiveFloatZero(this.info.settlement_advance_proportion / 100)
      price[6] = positiveFloatSix(this.info.quoted_travelagency_payment_money) + '*' + positiveFloatSix(this.info.quoted_travelagency_payment_proportion) + '%'
      price[7] = positiveFloatSix(this.info.settlement_advance_amount) + '*' + positiveFloatSix(this.info.settlement_advance_proportion) + '%'

      this.info.feizhicai_service = price[1]
      return price
    },
    //税费
    vatPrice() {
      let price = [
        0, //原总价格税费
        0, //结算价格税费
        '', //原服务费-分项/阶梯公式
        '' //结算服务费-分项/阶梯公式
      ]
      // debugger
      price[0] =
        ((positiveFloatZero(this.roomPrice[0].all) +
          positiveFloatZero(this.conferencePrice[0].all) +
          positiveFloatZero(this.foodPrice[0].all) +
          positiveFloatZero(this.otherfoodPrice[0].all) +
          positiveFloatZero(this.intercitytrafficPrice[0].all) +
          positiveFloatZero(this.carPrice[0].all) +
          positiveFloatZero(this.otherPrice[0]) +
          // positiveFloatZero(this.servicePrice[0]) * positiveFloatZero(this.info.event_info_configure.service_taxrate / 100) +
          (this.info.zhicai_service == 0 ? positiveFloatZero(this.servicePrice[4]) : positiveFloatZero(this.servicePrice[8]))) *
          this.info.taxrate) /
        100
      // positiveFloatZero(this.servicePrice[4]) * positiveFloatZero(this.info.event_info_configure.service_taxrate / 100);

      if (this.info.event_info_configure.fzc_service_fee_money == 1 || this.info.event_info_configure.fzc_service_fee_money == null) {
        // 非直采服务费计税
        price[0] += positiveFloatZero(this.servicePrice[0]) * positiveFloatZero(this.info.taxrate / 100)
      }

      price[1] =
        ((positiveFloatZero(this.roomPrice[1].all) +
          positiveFloatZero(this.conferencePrice[1].all) +
          positiveFloatZero(this.foodPrice[1].all) +
          positiveFloatZero(this.otherfoodPrice[1].all) +
          positiveFloatZero(this.intercitytrafficPrice[1].all) +
          positiveFloatZero(this.carPrice[1].all) +
          positiveFloatZero(this.otherPrice[1]) +
          // positiveFloatZero(this.servicePrice[1]) * positiveFloatZero(this.info.event_info_configure.service_taxrate / 100) +
          (this.info.zhicai_service == 0 ? positiveFloatZero(this.servicePrice[5]) : positiveFloatZero(this.servicePrice[9]))) *
          this.info.settlement_taxrate) /
        100
      // positiveFloatZero(this.servicePrice[5]) * positiveFloatZero(this.info.event_info_configure.service_taxrate / 100);

      if (this.info.event_info_configure.fzc_service_fee_money || this.info.event_info_configure.fzc_service_fee_money == null) {
        // 非直采服务费计税
        price[1] += positiveFloatZero(this.servicePrice[1]) * positiveFloatZero(this.info.settlement_taxrate / 100)
      }
      //当前为统一规则vat
      price[2] =
        '(' +
        positiveFloat(this.price_no[0]) +
        '+' +
        positiveFloat(
          (this.info.event_info_configure.fzc_service_fee_money == 0 ? 0 : positiveFloatSix(this.servicePrice[0])) + positiveFloatSix(this.info.zhicai_service == 0 ? this.servicePrice[4] : this.servicePrice[8]) // 直采服务费
        ) +
        ') *' +
        positiveFloatSix(this.info.taxrate) +
        '%'

      price[3] =
        '(' +
        positiveFloat(this.price_no[1]) +
        '+' +
        positiveFloat(
          (this.info.event_info_configure.fzc_service_fee_money == 0 ? 0 : positiveFloatSix(this.servicePrice[1])) + positiveFloatSix(this.info.zhicai_service == 0 ? this.servicePrice[5] : this.servicePrice[9]) // 直采服务费
        ) +
        ') '
      // + positiveFloatSix(this.info.event_info_configure.room_inquiry_taxrate) +'%';

      this.info.taxation = price[1]
      /* price[2] =
				positiveFloatSix(this.roomPrice[0].all) +'*' +positiveFloatSix(this.info.event_info_configure.room_inquiry_taxrate ) +
				'%+' +
				positiveFloatSix(this.conferencePrice[0].all) +'*'+ positiveFloatSix(this.info.event_info_configure.conference_inquiry_taxrate ) +
				'%+' +
				positiveFloatSix(this.foodPrice[0].all) +'*'+ positiveFloatSix(this.info.event_info_configure.hotel_food_inquiry_taxrate ) +
				'%+' +
				positiveFloatSix(this.otherfoodPrice[0].all) +'*'+ positiveFloatSix(this.info.event_info_configure.others_food_inquiry_taxrate ) +
				'%+' +
				positiveFloatSix(this.intercitytrafficPrice[0].all) +'*'+ positiveFloatSix(this.info.event_info_configure.transportation_inquiry_taxrate ) +
				'%+' +
				positiveFloatSix(this.carPrice[0].all) +'*'+ positiveFloatSix(this.info.event_info_configure.car_inquiry_taxrate ) +
				'%+' +
				positiveFloatSix(this.otherPrice[0]) +'*'+ positiveFloatSix(this.info.event_info_configure.other_inquiry_taxrate ) +
				'%+' +

					positiveFloatSix(this.servicePrice[0]) +'*'+ positiveFloatSix(this.info.event_info_configure.service_taxrate ) +'%+'+
					positiveFloatSix(this.servicePrice[4]) +'*'+ positiveFloatSix(this.info.event_info_configure.service_taxrate )+'%'
				;

			price[3] =
				positiveFloatSix(this.roomPrice[1].all) +'*'+ positiveFloatSix(this.info.event_info_configure.room_inquiry_taxrate ) +
				'%+' +
				positiveFloatSix(this.conferencePrice[1].all) +'*'+ positiveFloatSix(this.info.event_info_configure.conference_inquiry_taxrate ) +
				'%+' +
				positiveFloatSix(this.foodPrice[1].all) +'*'+ positiveFloatSix(this.info.event_info_configure.hotel_food_inquiry_taxrate ) +
				'%+' +
				positiveFloatSix(this.otherfoodPrice[1].all) +'*'+ positiveFloatSix(this.info.event_info_configure.others_food_inquiry_taxrate ) +
				'%+' +
				positiveFloatSix(this.intercitytrafficPrice[1].all)+ '*' +positiveFloatSix(this.info.event_info_configure.transportation_inquiry_taxrate ) +
				'%+' +
				positiveFloatSix(this.carPrice[1].all) +'*'+ positiveFloatSix(this.info.event_info_configure.car_inquiry_taxrate ) +
				'%+' +
				positiveFloatSix(this.otherPrice[1]) +'*'+ positiveFloatSix(this.info.event_info_configure.other_inquiry_taxrate ) +
				'%+' +

					positiveFloatSix(this.servicePrice[1])+ '*'+ positiveFloatSix(this.info.event_info_configure.service_taxrate ) +'%+'+
					positiveFloatSix(this.servicePrice[5]) +'*'+ positiveFloatSix(this.info.event_info_configure.service_taxrate )+'%'
				; */
      return price
    },
    // 总价格除vat 服务费总价格（净价）
    price_no() {
      let price = [
        0, //原总价格
        0, //结算价格
        0, //原总价格-阶梯
        0 //结算价格-阶梯
      ]
      price[0] = this.roomPrice[0].all + this.conferencePrice[0].all + this.foodPrice[0].all + this.otherfoodPrice[0].all + this.intercitytrafficPrice[0].all + this.carPrice[0].all + this.otherPrice[0]
      price[1] = this.roomPrice[1].all + this.conferencePrice[1].all + this.foodPrice[1].all + this.otherfoodPrice[1].all + this.intercitytrafficPrice[1].all + this.carPrice[1].all + this.otherPrice[1]
      console.log(price[1], this.roomPrice[1].all, this.conferencePrice[1].all, this.foodPrice[1].all, this.otherfoodPrice[1].all, this.intercitytrafficPrice[1].all, this.carPrice[1].all, this.otherPrice[1])
      this.info.settlement_total_price = price[1]
      price[2] = this.roomPrice[5] + this.conferencePrice[5] + this.foodPrice[5] + this.otherfoodPrice[5] + this.intercitytrafficPrice[5] + this.carPrice[5] + this.otherPrice[5]

      price[3] = this.roomPrice[6] + this.conferencePrice[6] + this.foodPrice[6] + this.otherfoodPrice[6] + this.intercitytrafficPrice[6] + this.carPrice[6] + this.otherPrice[6]
      return price
    },
    // 总价格(净价 + 服务费 + 税费)
    price() {
      let price = [
        0, //原总价格
        0 //结算价格
      ]
      price[0] = positiveFloatSix(this.price_no[0]) + positiveFloat(this.servicePrice[0]) + (this.info.zhicai_service === 0 ? positiveFloat(this.servicePrice[4]) : positiveFloat(this.servicePrice[8])) + positiveFloat(this.vatPrice[0])
      price[1] = positiveFloatSix(this.price_no[1]) + positiveFloat(this.servicePrice[1]) + (this.info.zhicai_service === 0 ? positiveFloat(this.servicePrice[5]) : positiveFloat(this.servicePrice[9])) + positiveFloat(this.vatPrice[1])
      this.info.total_amount = price[1]
      return price
    }
  },
  methods: {
    guid,
    positiveInteger,
    positiveFloatOne,
    positiveFloatSix,
    positiveFloat,
    formatNum,
    positiveFloatZero,
    excelExport,
    getFormatDate,
    limitsEffect,
    changekefang(id, room) {
      let filter = this.roomcostProjects.filter(ele => {
        return ele.code == id
      })
      room.settlement_itemname = filter[0].name
    },
    changehuichang(id, conference) {
      let filter = this.meetingcostProjects.filter(ele => {
        return ele.code == id
      })
      conference.settlement_itemname = filter[0].name
    },
    changehotelnei(id, food) {
      let filter = this.foodcostProjects.filter(ele => {
        return ele.code == id
      })
      food.settlement_itemname = filter[0].name
    },
    changehotelwai(id, food) {
      let filter = this.otherfoodcostProjects.filter(ele => {
        return ele.code == id
      })
      food.settlement_itemname = filter[0].name
    },
    changebigcar(id, transportation) {
      let filter = this.transportationcostProjects.filter(ele => {
        return ele.code == id
      })
      food.settlement_itemname = filter[0].name
    },
    changecar(id, car) {
      let filter = this.carcostProjects.filter(ele => {
        return ele.code == id
      })
      food.settlement_itemname = filter[0].name
    },
    openAddSettle() {
      this.cost_project_load = true

      let sdate = getFormatDate(this.info.event_info.event_startdate).slice(0, 10)
      let edate = getFormatDate(this.info.event_info.event_enddate).slice(0, 10)
      let startDate = moment(sdate)
        .subtract(3, 'days')
        .format('YYYY-MM-DD')
      let endDate = moment(edate)
        .add(1, 'days')
        .format('YYYY-MM-DD')
      let timeRange = getBetweenDate(startDate, endDate)
      this.costDates = []
      timeRange.forEach((item, index) => {
        this.costDates.push({
          value: item,
          label: item
        })
      })

      this.changeProjectClass()

      this.addSettleShow = true
    },
    changecostProject() {
      if (this.addSettleInfo.costProject == 'zafei' || this.addSettleInfo.projectClass == '009') {
        this.needCostDate = false
        this.addSettleRules.costDate[0].required = false
      } else {
        this.needCostDate = true
        this.addSettleRules.costDate[0].required = true
      }
    },
    async changeProjectClass() {
      const SettleEnum = {
        // 客房
        '0034': {
          selects: 'roomcostProjects'
        },
        // 会场
        '0049': {
          selects: 'meetingcostProjects'
        },
        // 酒店内餐饮
        '0050': {
          selects: 'foodcostProjects'
        },
        // 酒店外餐饮
        '0051': {
          selects: 'otherfoodcostProjects'
        },
        // 大交通
        '003': {
          selects: 'transportationcostProjects'
        },
        // 地面交通
        '006': {
          selects: 'carcostProjects'
        },
        // 其他服务
        '009': {
          selects: 'othercostProjects'
        }
      }

      if (this.addSettleInfo.projectClass == '009') {
        this.needCostDate = false
        this.addSettleRules.costDate[0].required = false
      } else {
        this.needCostDate = true
        this.addSettleRules.costDate[0].required = true
      }

      this.cost_project_load = true
      let sendData = {
        code: this.addSettleInfo.projectClass
      }
      if (this.addSettleInfo.projectClass == '009') {
      }
      let cpRep = await this.requestApi({
        url: '/orderform/GetdictionaryList',
        method: 'POST',
        data: {
          code: this.addSettleInfo.projectClass,
          meetingid: this.addSettleInfo.projectClass == '009' ? this.info.meeting_id : ''
        }
      })

      this.cost_project_load = false

      this.costProjects = cpRep.map(item => {
        item.value = item.code
        item.label = item.name
        return item
      })

      this[SettleEnum[this.addSettleInfo.projectClass].selects] = cpRep.map(item => {
        item.value = item.code
        item.label = item.name
        return item
      })

      this.costProjects.push({ label: '杂费', value: 'zafei' })

      this.addSettleInfo.costProject = this.costProjects[0].value
    },
    initCostProject() {
      this.requestApi({
        url: '/orderform/GetdictionaryList',
        method: 'POST',
        data: {
          code: ''
        }
      }).then(res => {
        let roomcostProjects = res.filter(item => {
          return item.event_dictionary_code == '0034'
        })
        let meetingcostProjects = res.filter(item => {
          return item.event_dictionary_code == '0049'
        })
        let foodcostProjects = res.filter(item => {
          return item.event_dictionary_code == '0050'
        })
        let otherfoodcostProjects = res.filter(item => {
          return item.event_dictionary_code == '0051'
        })
        let transportationcostProjects = res.filter(item => {
          return item.event_dictionary_code == '003'
        })
        let carcostProjects = res.filter(item => {
          return item.event_dictionary_code == '006'
        })
        let othercostProjects = res.filter(item => {
          return item.event_dictionary_code == '009'
        })

        this.roomcostProjects = roomcostProjects.map(item => {
          item.label = item.name
          item.value = item.code
          return item
        })
        this.meetingcostProjects = meetingcostProjects.map(item => {
          item.label = item.name
          item.value = item.code
          return item
        })
        this.foodcostProjects = foodcostProjects.map(item => {
          item.label = item.name
          item.value = item.code
          return item
        })
        this.otherfoodcostProjects = otherfoodcostProjects.map(item => {
          item.label = item.name
          item.value = item.code
          return item
        })
        this.transportationcostProjects = transportationcostProjects.map(item => {
          item.label = item.name
          item.value = item.code
          return item
        })
        this.carcostProjects = carcostProjects.map(item => {
          item.label = item.name
          item.value = item.code
          return item
        })
        this.othercostProjects = othercostProjects.map(item => {
          item.label = item.name
          item.value = item.code
          return item
        })
      })
    },
    addSettle() {
      let self = this

      const SettleEnum = {
        // 客房
        '0034': {
          dataList: 'roomlist',
          addBusinessBlock: 'addroomBusiness',
          addDataBlock: 'addroom',
          selects: 'roomcostProjects'
        },
        // 会场
        '0049': {
          dataList: 'conferencelist',
          addBusinessBlock: 'addconferenceBusiness',
          addDataBlock: 'addconference',
          selects: 'meetingcostProjects'
        },
        // 酒店内餐饮
        '0050': {
          dataList: 'foodlist',
          addBusinessBlock: 'addfoodBusiness',
          addDataBlock: 'addfood',
          selects: 'foodcostProjects'
        },
        // 酒店外餐饮
        '0051': {
          dataList: 'otherfoodlist',
          addBusinessBlock: 'addotherfoodBusiness',
          addDataBlock: 'addotherfood',
          selects: 'otherfoodcostProjects'
        },
        // 大交通
        '003': {
          dataList: 'transportationlist',
          addBusinessBlock: 'addstransportationBusiness',
          addDataBlock: 'addstransportation',
          selects: 'transportationcostProjects'
        },
        // 地面交通
        '006': {
          dataList: 'carlist',
          addBusinessBlock: 'addcarBusiness',
          addDataBlock: 'addcar',
          selects: 'carcostProjects'
        },
        // 其他服务
        '009': {
          dataList: 'otherlist',
          addBusinessBlock: 'addsundryBusiness',
          addDataBlock: 'addsundry',
          selects: 'othercostProjects'
        }
      }

      const costProjectEnem = {
        '0034': 1,
        '0049': 2,
        '0050': 3,
        '0051': 7,
        '003': 4,
        '006': 5,
        '009': 6
      }

      this.$refs.addSettleInfo.validate(valid => {
        if (valid) {
          let enumObj = SettleEnum[this.addSettleInfo.projectClass]
          if (enumObj) {
            this[enumObj.selects] = [...this.costProjects]

            if (this.addSettleInfo.costProject == 'zafei') {
              this.addOther(costProjectEnem[this.addSettleInfo.projectClass])
            } else {
              if (this.info[enumObj.dataList] && this.info[enumObj.dataList].length) {
                // 有分类
                if (this.addSettleInfo.projectClass == '009') {
                  // 如果是“其他服务”
                  this[enumObj.addDataBlock](true)
                } else {
                  // 常规类型
                  let filterDate = this.info[enumObj.dataList].filter(item => {
                    return this.addSettleInfo.costDate == moment(item.date).format('YYYY-MM-DD')
                  })
                  if (filterDate && filterDate.length) {
                    // 日期相同
                    this[enumObj.addDataBlock](filterDate[0], true)
                  } else {
                    this[enumObj.addBusinessBlock](true)
                  }
                }
              } else {
                this[enumObj.addBusinessBlock](true)
              }
            }
          }
          this.addSettleShow = false
        }
      })
    },
    async excelDownload() {
      if (this.$route.params.issubmit == 1) {
        // await this.draft() // 先保存草稿
        this.info.settlement_status = this.status_draft
        await this.save(2)
      } else {
        //导出excel
        var name = 'DMC结算单'
        this.excelExport(
          '/Template/GetTemplate',
          {
            eventid: this.info.event_info.id,
            type: 4,
            param: this.$route.params.id
          },
          name
        )
      }
    },
    // 下载结算确认单
    async downloadSettlementConfirm() {
      if (this.$route.params.issubmit == 1) {
        // await this.draft() // 先保存草稿
        this.info.settlement_status = this.status_draft
        await this.save(1)
      } else {
        var name = '结算确认单'
        this.excelExport(
          '/Template/GetTemplate',
          {
            eventid: this.info.event_info.id,
            type: 6,
            param: this.$route.params.id
          },
          name
        )
      }
    },
    // 上传文件
    handleChangeAttach(file, fileList, type) {
      const isLt30M = file.size / 1024 / 1024 < 30

      if (!this.limitsEffect(file)) {
        //后缀名不符合的在文件列表中删除该文件
        this.arrayList.forEach((item, index) => {
          if (type == item.type) this.$refs.upload[index].handleRemove(file, fileList, type)
        })
        return
      }
      if (!isLt30M) {
        this.$message.error('上传附件大小不能超过 30MB!')
        // 取消时在文件列表中删除该文件
        this.arrayList.forEach((item, index) => {
          if (type == item.type) this.$refs.upload[index].handleRemove(file, fileList, type)
        })
        return
      }
      this.arrayList.forEach((e, index) => {
        if (type == e.type) {
          e.fileList = fileList
        }
      })
      this.initFileRename()
    },
    handleRemoveAttach(file, fileList, type) {
      this.arrayList.forEach((e, index) => {
        if (type == e.type) {
          e.fileList = fileList
        }
      })
      this.initFileRename()
      //console.log(this.fileList);
    },
    // 点击图片预览
    getImg($event) {
      debugger
      console.log($event)
      console.log($event.target.currentSrc) //拿到图片的src
      let currentSrc = $event.target.currentSrc
      let file = {
        value: currentSrc
      }
      if (currentSrc) {
        //添加预览图片的事件
        this.$hevueImgPreview(currentSrc)
      }
    },
    handlePreview(file) {
      // debugger
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
    //给每个文件添加重命名按钮
    initFileRename() {
      var _this = this
      //在dom元素加载完毕后调用
      this.$nextTick(() => {
        var list = document.getElementsByClassName('el-upload-list__item-name') || null
        Array.from(list).forEach((element, index, array) => {
          var text = element.innerText
          if (!element.getElementsByTagName('span')[0]) {
            //创建重命名按钮
            element.innerHTML += "<span style='color:#199ED8;cursor: pointer;'>重命名</span>"
          }
          //添加点击事件
          element.getElementsByTagName('span')[0].addEventListener('click', function(ev) {
            ev.stopPropagation() //阻止事件冒泡，父级元素，a标签就不会触发事件
            _this.rename = true
            _this.fileName = text.slice(0, text.lastIndexOf('.'))
            _this.suffix = text.slice(text.lastIndexOf('.'))
            /* var node=document.getElementsByClassName('el-upload-list__item');
							node.forEach(e=>{
								console.log(e)
							}) */

            console.log(element.getElementsByTagName('span')[0].parentNode.parentNode.parentNode)
          })
        })
      })
    },
    fileRename(file, index, file_index) {
      this.rename = true
      this.updateIndex = index
      this.updateFileIndex = file_index
      this.fileName = file.name.slice(0, file.name.lastIndexOf('.'))
      this.suffix = file.name.slice(file.name.lastIndexOf('.'))
    },
    //文件重命名保存
    saveFileName() {
      this.arrayList[this.updateIndex].fileList[this.updateFileIndex].name = this.fileName + this.suffix //页面文件显示名
      this.info.attachlist.forEach((e, i) => {
        //给已上传的文件重命名
        if (e.id == this.arrayList[this.updateIndex].fileList[this.updateFileIndex].id) {
          this.info.attachlist[i].filename = this.fileName + this.suffix
        }
      })
      if (this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw) {
        //给未上传文件重命名
        const copyFile = new File([this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw], this.fileName + this.suffix, {
          // uid:this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw.uid,
          lastModified: this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw.lastModified,
          lastModifiedDate: this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw.lastModifiedDate,
          type: this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw.type
        })
        this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw = copyFile
      }
      this.rename = false
    },
    //删除附件
    deleteFile(file, index, file_index, arrayLength) {
      if (file_index == arrayLength) {
        this.isFail = 0
      }
      this.arrayList[index].fileList.splice(file_index, 1)
    },
    // 添加杂费
    addOther(type) {
      this.info.sundrieslist.push({
        id: this.guid(),
        type,
        price: 0, //单价
        count: 0, //数量
        comments: '', //结算说明
        content: '', //杂费项名称
        isnotservice: 0, //0不计入服务费 1计入服务费
        settlementservice_taxrate: 0, //杂费项服务费率
        lineoroffline: 0, //线下
        sumprice: 0
      })
    },
    // 删除杂费
    delOther(key) {
      //this.info.sundrieslist.splice(key, 1);
      if (this.info.sundrieslist.length == 1) {
        this.info.sundrieslist[0].isdelete = 1
      } else {
        this.info.sundrieslist = this.info.sundrieslist.filter(w => w.id != key)
      }
    },
    // 添加客房
    async addroom(node, addBlock) {
      if (!addBlock) {
        this.addSettleInfo.projectClass = '0034'
        await this.changeProjectClass()
      }
      node.roomlists.push({
        settlement_itemid: this.addSettleInfo.costProject,
        roomtypename: '',
        totalprice: 0,
        unitprice: 0,
        roomcount: 0,
        inside_roomcount: 0,
        settlement_inside_roomcount: 0,
        outside_roomcount: 0,
        settlement_outside_roomcount: 0,
        settlement_unitprice: '0',
        settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
        settlement_count: '0',
        settlement_comments: '',
        lineoroffline: 0,
        quotationsumprice: 0,
        settlementsumprice: 0
      })
    },
    findCostProjectByKey(value) {
      let filter = this.costProjects.filter(item => {
        return value == item.value
      })
      return filter && filter.length ? filter[0] : null
    },
    addroomBusiness(addBlock) {
      // if(!addBlock) {
      // 	this.addSettleInfo.projectClass = '0034';
      // 	this.changeProjectClass();
      // }

      this.info.roomlist.push({
        date: moment(this.addSettleInfo.costDate).format('YYYY/MM/DD'),
        roomlists: [
          {
            settlement_itemid: this.addSettleInfo.costProject,
            roomtypename: '',
            totalprice: 0,
            unitprice: 0,
            roomcount: 0,
            inside_roomcount: 0,
            settlement_inside_roomcount: 0,
            outside_roomcount: 0,
            settlement_outside_roomcount: 0,
            settlement_unitprice: '0',
            settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
            settlement_count: '0',
            settlement_comments: '',
            lineoroffline: 0,
            quotationsumprice: 0,
            settlementsumprice: 0
          }
        ]
      })
      this.info.roomlist = this.info.roomlist.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
    },
    // 删除客房
    delroom(node, key) {
      node.roomlists.splice(key, 1)
    },
    // 添加会场
    async addconference(node, addBlock) {
      if (!addBlock) {
        this.addSettleInfo.projectClass = '0049'
        await this.changeProjectClass()
      }
      node.conferencelists.push({
        settlement_itemid: this.addSettleInfo.costProject,
        is_important: '',
        price: 0,
        count: 0,
        settlement_price: '0',
        settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
        settlement_count: '0',
        settlement_comments: '',
        lineoroffline: 0,
        quotationsumprice: 0,
        settlementsumprice: 0
      })
    },
    addconferenceBusiness(addBlock) {
      // if(!addBlock) {
      // 	this.addSettleInfo.projectClass = '0049';
      // 	this.changeProjectClass();
      // }
      this.info.conferencelist.push({
        date: moment(this.addSettleInfo.costDate).format('YYYY/MM/DD'),
        conferencelists: [
          {
            settlement_itemid: this.addSettleInfo.costProject,
            is_important: '',
            price: 0,
            count: 0,
            settlement_price: '0',
            settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
            settlement_count: '0',
            settlement_comments: '',
            lineoroffline: 0,
            quotationsumprice: 0,
            settlementsumprice: 0
          }
        ]
      })
      this.info.conferencelist = this.info.conferencelist.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
    },
    // 删除会场
    delconference(node, key) {
      node.conferencelists.splice(key, 1)
    },
    // 添加餐饮
    async addfood(node, addBlock) {
      if (!addBlock) {
        this.addSettleInfo.projectClass = '0050'
        await this.changeProjectClass()
      }
      node.foodlists.push({
        settlement_itemid: this.addSettleInfo.costProject,
        foodtypename: '',
        addresstype: '0',
        personcount: 0,
        price: 0,
        settlement_unitprice: '0',
        settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
        settlement_count: '0',
        settlement_comments: '',
        lineoroffline: 0,
        quotationsumprice: 0,
        settlementsumprice: 0
      })
    },
    addfoodBusiness(addBlock) {
      // if(!addBlock) {
      // 	this.addSettleInfo.projectClass = '0050';
      // 	this.changeProjectClass();
      // }
      this.info.foodlist.push({
        date: moment(this.addSettleInfo.costDate).format('YYYY/MM/DD'),
        foodlists: [
          {
            settlement_itemid: this.addSettleInfo.costProject,
            foodtypename: '',
            addresstype: '0',
            personcount: 0,
            price: 0,
            settlement_unitprice: '0',
            settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
            settlement_count: '0',
            settlement_comments: '',
            lineoroffline: 0,
            quotationsumprice: 0,
            settlementsumprice: 0
          }
        ]
      })

      this.info.foodlist = this.info.foodlist.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
    },
    // 删除餐饮
    delfood(node, key) {
      node.foodlists.splice(key, 1)
    },
    // 添加酒店外餐饮
    async addotherfood(node, addBlock) {
      if (!addBlock) {
        this.addSettleInfo.projectClass = '0051'
        await this.changeProjectClass()
      }
      node.foodlists.push({
        settlement_itemid: this.addSettleInfo.costProject,
        foodtypename: '',
        addresstype: '0',
        personcount: 0,
        price: 0,
        settlement_unitprice: '0',
        settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
        settlement_count: '0',
        settlement_comments: '',
        lineoroffline: 0,
        quotationsumprice: 0,
        settlementsumprice: 0
      })
    },
    addotherfoodBusiness(addBlock) {
      // if(!addBlock) {
      // 	this.addSettleInfo.projectClass = '0051';
      // 	this.changeProjectClass();
      // }
      this.info.otherfoodlist.push({
        date: moment(this.addSettleInfo.costDate).format('YYYY/MM/DD'),
        foodlists: [
          {
            settlement_itemid: this.addSettleInfo.costProject,
            foodtypename: '',
            addresstype: '0',
            personcount: 0,
            price: 0,
            settlement_unitprice: '0',
            settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
            settlement_count: '0',
            settlement_comments: '',
            lineoroffline: 0,
            quotationsumprice: 0,
            settlementsumprice: 0
          }
        ]
      })

      this.info.otherfoodlist = this.info.otherfoodlist.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
    },
    // 删除酒店外餐饮
    delotherfood(node, key) {
      node.foodlists.splice(key, 1)
    },
    // 添加大交通
    async addstransportation(node, addBlock) {
      if (!addBlock) {
        this.addSettleInfo.projectClass = '003'
        await this.changeProjectClass()
      }
      node.tranlists.push({
        settlement_itemid: this.addSettleInfo.costProject,
        joinname: '',
        passengercount: 0,
        unitprice: 0,
        settlement_unitprice: '0',
        settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
        settlement_count: '0',
        settlement_comments: '',
        lineoroffline: 0,
        quotationsumprice: 0,
        settlementsumprice: 0
      })
    },
    addstransportationBusiness(addBlock) {
      // if(!addBlock) {
      // 	this.addSettleInfo.projectClass = '003';
      // 	this.changeProjectClass();
      // }
      this.info.transportationlist.push({
        date: moment(this.addSettleInfo.costDate).format('YYYY/MM/DD'),
        tranlists: [
          {
            settlement_itemid: this.addSettleInfo.costProject,
            joinname: '',
            passengercount: 0,
            unitprice: 0,
            settlement_unitprice: '0',
            settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
            settlement_count: '0',
            settlement_comments: '',
            lineoroffline: 0,
            quotationsumprice: 0,
            settlementsumprice: 0
          }
        ]
      })

      this.info.transportationlist = this.info.transportationlist.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
    },
    // 删除大交通
    delstransportation(node, key) {
      node.tranlists.splice(key, 1)
    },
    // 添加市内交通
    async addcar(node, addBlock) {
      if (!addBlock) {
        this.addSettleInfo.projectClass = '006'
        await this.changeProjectClass()
      }
      node.carlists.push({
        settlement_itemid: this.addSettleInfo.costProject,
        purposename: '',
        carcount: 0,
        price: 0,
        settlement_unitprice: '0',
        settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
        settlement_count: '0',
        settlement_comments: '',
        lineoroffline: 0,
        quotationsumprice: 0,
        settlementsumprice: 0
      })
    },
    addcarBusiness(addBlock) {
      // if(!addBlock) {
      // 	this.addSettleInfo.projectClass = '006';
      // 	this.changeProjectClass();
      // }
      this.info.carlist.push({
        date: moment(this.addSettleInfo.costDate).format('YYYY/MM/DD'),
        carlists: [
          {
            settlement_itemid: this.addSettleInfo.costProject,
            purposename: '',
            carcount: 0,
            price: 0,
            settlement_unitprice: '0',
            settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
            settlement_count: '0',
            settlement_comments: '',
            lineoroffline: 0,
            quotationsumprice: 0,
            settlementsumprice: 0
          }
        ]
      })

      this.info.carlist = this.info.carlist.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })
    },
    // 删除市内交通
    delcar(node, key) {
      node.carlists.splice(key, 1)
    },
    //添加其他
    async addsundry(addBlock) {
      if (!addBlock) {
        this.addSettleInfo.projectClass = '009'
        await this.changeProjectClass()
      }
      let finfItem = this.findCostProjectByKey(this.addSettleInfo.costProject)
      let addData = {
        settlement_itemid: this.addSettleInfo.costProject,
        settlement_itemname: finfItem.label,
        servicetype: this.addSettleInfo.costProject,
        servicetypename: finfItem.label,
        offerparticipatecount: 0,
        offerservicedaycount: 0,
        price: 0,
        settlement_unitprice: '0',
        settlement_count: '0',
        settlement_comments: '',
        isnotservice: finfItem.isnotservice,
        service_taxrate: 0,
        lineoroffline: 0,
        settlementservice_taxrate: 0,
        quotationsumprice: 0,
        settlementsumprice: 0,
        two_level_code: ''
      }

      //给其他项名称赋值
      this.othercostProjects.forEach((item, index) => {
        // debugger
        console.log(this.addSettleInfo.costProject)
        if (this.addSettleInfo.costProject == item.code) {
          // debugger
          addData.servicetypename = item.name

          addData.detail = item.detail
          addData.two_level_code = '' // 清空二级分类
          // debugger
          addData.isnotservice = item.isnotservice
        }
      })

      this.info.otherlist.push(addData)
    },
    addsundryBusiness(addBlock) {
      // if(!addBlock) {
      // 	this.addSettleInfo.projectClass = '009';
      // 	this.changeProjectClass();
      // }
      this.info.otherlist.push({
        settlement_itemid: this.addSettleInfo.costProject,
        settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
        servicetype: this.addSettleInfo.costProject,
        servicetypename: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
        offerparticipatecount: 0,
        offerservicedaycount: 0,
        price: 0,
        settlement_unitprice: '0',
        settlement_count: '0',
        settlement_comments: '',
        isnotservice: 0,
        service_taxrate: 0,
        lineoroffline: 0,
        settlementservice_taxrate: 0,
        quotationsumprice: 0,
        settlementsumprice: 0
      })
    },
    //删除其他
    delsother(node, key) {
      this.info.otherlist.splice(key, 1)
    },
    submit() {
      //提交结算单
      //表单验证
      if (!this.validate()) {
        return
      }
      /* if (!this.fileList1.length && !this.fileList2.length && !this.fileList3.length && !this.fileList4.length) {
				this.$message.error('请上传结算凭证、合同扫描件、水单、其他');
				return;
			} */
      //确认结算单后，上传发票，结算单状态不变
      if (this.info.settlement_status != this.status_confirm) this.info.settlement_status = this.status_tobeconfirmed
      if (this.info.event_info.pocode) {
        this.save()
      } else {
        this.$confirm('当前会议活动未录入PO，不能提交结算单，请您先在“我的会议”-》查看详情-》录入PO 后，再返回当前页面提交结算单！', '提示', {
          confirmButtonText: '确定',
          // cancelButtonText: '取消',
          center: true,
          showCancelButton: false
        })
          .then(() => {
            this.draft()
            this.$router.go(-1)
          })
          .catch(() => {})
      }
      // this.save();
    },
    async draft() {
      //保存草稿箱
      //确认结算单后，上传发票，结算单状态不变
      this.info.settlement_status = this.status_draft
      await this.save()
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
    validate: function() {
      this.errormsg = []
      this.checkRoomDifference
      this.checkConferenceDifference
      this.checkFoodDifference
      this.checkOtherFoodDifference
      this.checkTransportationDifference
      this.checkCarDifference
      this.checkOtherDifference

      if (this.errormsg.length > 0) this.differenceShowErrorMessage()
      return this.errormsg.length == 0
    },
    // 保存
    save(downloadType) {
      //客户驳回结算单,清空结算单id
      if (this.info.pre_settlement_status === this.status_reject) this.info.settlement_sheet_id = null

      //大交通项的名称赋值
      this.info.transportationlist.forEach((e, i) => {
        e.tranlists.forEach((item, index) => {
          this.info.trantypelist.forEach((itemc, indexc) => {
            if (item.settlement_itemid == itemc.trancode) {
              if (!this.info.transportationlist[i].tranlists[index].settlement_itemname) {
                this.info.transportationlist[i].tranlists[index].settlement_itemname = itemc.tranname
              }
            }
          })
        })
      })

      //大交通杂费的名称赋值
      this.intercitytrafficincidental.forEach((e, i) => {
        this.info.trantypelist.forEach((item, index) => {
          if (e.itemcode == item.trancode) {
            this.intercitytrafficincidental[i].content = item.tranname
          }
        })
      })

      this.info.settlement_settlementsheetexplain = this.arrayList[0].remark //结算单说明
      this.info.settlement_confirmmail = this.arrayList[1].remark //确认邮件说明
      this.info.settlement_po = this.arrayList[2].remark //po单说明
      this.info.settlement_invoice = this.arrayList[3].remark //供应商发票说明
      this.info.settlement_voucher = this.arrayList[4].remark //住宿发票说明
      this.info.settlement_contract = this.arrayList[5].remark //餐饮发票说明
      this.info.settlement_waterbill = this.arrayList[6].remark //会场发票说明
      this.info.settlement_outsidefoodinvoiceexplain = this.arrayList[7].remark //酒店外餐饮发票说明
      this.info.settlement_registinvoiceexplain = this.arrayList[8].remark //注册费发票说明
      this.info.settlement_carinvoiceexplain = this.arrayList[9].remark //用车发票说明
      this.info.settlement_productsvoiceexplain = this.arrayList[10].remark //制作物发票说明
      this.info.settlement_insureinvoiceexplain = this.arrayList[11].remark //保险发票说明
      this.info.settlement_signexplain = this.arrayList[12].remark //签到发票说明
      this.info.settlement_photoexplain = this.arrayList[13].remark //照片说明
      this.info.settlement_other = this.arrayList[14].remark //其他说明

      // 直采服务费为 拜耳规则，直采服务费总额赋值
      if (this.info.zhicai_service == 1) {
        this.info.settlement_advance_amount = this.servicePrice[9]
        this.info.settlement_advance_proportion = 100
      }

      let urlsList = [{ urLs: [] }, { urLs: [] }, { urLs: [] }, { urLs: [] }, { urLs: [] }, { urLs: [] }, { urLs: [] }, { urLs: [] }, { urLs: [] }, { urLs: [] }, { urLs: [] }, { urLs: [] }, { urLs: [] }, { urLs: [] }, { urLs: [] }]
      //组装本次上传数据
      urlsList.forEach((itemc, indexc) => {
        if (this.arrayList[indexc]) {
          let thisfileList = this.arrayList[indexc].fileList.filter(w => w.uid != '')
          if (
            this.arrayList.filter(e => {
              return e.arrayLength != null
            }).length == 1
          ) {
            var tag = null
            var sign = null
            this.arrayList.forEach((e, i) => {
              if (e.arrayLength != null) {
                tag = i
              }
            })

            if (this.arrayList[indexc].fileList.length > 0 && (indexc > tag || indexc == tag)) {
              this.arrayList[indexc].fileList.forEach((item, index) => {
                // if(index>sign || index==sign){
                itemc.urLs.push({
                  key: item.uid,
                  file: item.raw
                })
                // }
              })
            }
          } else {
            if (this.arrayList[indexc].fileList.length > 0) {
              this.arrayList[indexc].fileList.forEach(item => {
                itemc.urLs.push({
                  key: item.uid,
                  file: item.raw
                })
              })
            }
          }
        }
      })
      this.isFail = 1
      this.arrayList.forEach((e, i) => {
        this.arrayList[i].arrayLength = null
      })

      upload(urlsList[0].urLs)
        .then(res => {
          console.log(res)
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[0].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[0].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[0].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[0].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[0].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })

          return upload(urlsList[1].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[1].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[1].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })
            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[1].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[1].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[1].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[2].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[2].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[2].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[2].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[2].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[2].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[3].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[3].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[3].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[3].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[3].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[3].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[4].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[4].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[4].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[4].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[4].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[4].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[5].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[5].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[5].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[5].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[5].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[5].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[6].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[6].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[6].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[6].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[6].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[6].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[7].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[7].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[7].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[7].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[7].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[7].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[8].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[8].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[8].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[8].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[8].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[8].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[9].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[9].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[9].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[9].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[9].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[9].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[10].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[10].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[10].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[10].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[10].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[10].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[11].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[11].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[11].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[11].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[11].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[11].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[12].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[12].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[12].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[12].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[12].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[12].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[13].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[13].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[13].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[13].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[13].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[13].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          return upload(urlsList[14].urLs)
        })
        .then(res => {
          //上传网络中断
          if (res && res.tag != undefined) {
            //失败文件下标标记
            this.arrayList[14].arrayLength = res.tag
            //防止重复上传
            res.uploadImageList.forEach(item => {
              if (item) {
                this.info.attachlist.push({
                  filetype: this.arrayList[14].type,
                  filepath: item.FilePath,
                  filename: item.OriginalFileName,
                  create_date: item.create_date ? getFormatDate(item.create_date) : ''
                })
              }
            })

            return
          }
          //验证已上传文件是否被删除
          if (this.info.attachlist && this.info.attachlist.length > 0) {
            this.info.attachlist.forEach(item => {
              if (this.arrayList[14].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[14].type) item.delete = true
            })
          }
          res.forEach(item => {
            if (item) {
              this.info.attachlist.push({
                filetype: this.arrayList[14].type,
                filepath: item.FilePath,
                filename: item.OriginalFileName,
                create_date: item.create_date ? getFormatDate(item.create_date) : ''
              })
            }
          })
          this.info.attachlist.forEach(item => {
            item.create_date = item.create_date ? getFormatDate(item.create_date) : ''
          })
          // 排序
          if (this.info.roomlist) {
            this.info.roomlist.forEach(item => {
              for (let i = 0; i < item.roomlists.length; i++) {
                item.roomlists[i].indexs = i + 1
              }
            })
          }
          if (this.info.conferencelist) {
            this.info.conferencelist.forEach(item => {
              for (let i = 0; i < item.conferencelists.length; i++) {
                item.conferencelists[i].indexs = i + 1
              }
            })
          }
          if (this.info.foodlist) {
            this.info.foodlist.forEach(item => {
              for (let i = 0; i < item.foodlists.length; i++) {
                item.foodlists[i].indexs = i + 1
              }
            })
          }
          if (this.info.otherfoodlist) {
            this.info.otherfoodlist.forEach(item => {
              for (let i = 0; i < item.foodlists.length; i++) {
                item.foodlists[i].indexs = i + 1
              }
            })
          }
          if (this.info.transportationlist) {
            this.info.transportationlist.forEach(item => {
              for (let i = 0; i < item.tranlists.length; i++) {
                item.tranlists[i].indexs = i + 1
              }
            })
          }
          if (this.info.carlist) {
            this.info.carlist.forEach(item => {
              for (let i = 0; i < item.carlists.length; i++) {
                item.carlists[i].indexs = i + 1
              }
            })
          }
          if (this.info.otherlist) {
            for (let i = 0; i < this.info.otherlist.length; i++) {
              this.info.otherlist[i].indexs = i + 1
            }
          }
          return this.requestApi({
            url: '/OfflineSettlement/DMCOnlineSubmit',
            method: 'POST',
            data: this.info
          })
        })
        .then(res => {
          if (res) {
            if (downloadType == 1) {
              // 下载结算确认单
              var name = '结算确认单'
              this.excelExport(
                '/Template/GetTemplate',
                {
                  eventid: this.info.event_info.id,
                  type: 6,
                  param: this.$route.params.id
                },
                name
              )
            } else if (downloadType == 2) {
              // 下载结算 excel
              //导出excel
              var name = 'DMC结算单'
              this.excelExport(
                '/Template/GetTemplate',
                {
                  eventid: this.info.event_info.id,
                  type: 4,
                  param: this.$route.params.id
                },
                name
              )
            }
            this.$message({
              message: '保存成功！',
              type: 'success'
            })
            this.$router.push({
              name: 'orderInfo',
              params: {
                id: this.info.orderform_id
              }
            })
          } else {
            this.$message({
              message: '保存失败！',
              type: 'error'
            })
          }
        })
    },
    changeOtherSel(other, key, id) {
      let filter = this.othercostProjects.filter(ele => {
        return ele.code == id
      })
      other.settlement_itemname = filter[0].name

      other.isnotservice = filter[0].isnotservice

      // console.log('--????-');
      // console.log(this.info.otherlist[key]);
      // console.log('isnotservice = ' + filter[0].isnotservice);
      // console.log(this.info.otherlist[key].isnotservice)
      // console.log(this.info.otherlist[key])
      // this.info.otherlist[key].isnotservice = filter[0].isnotservice;
      // console.log(this.info.otherlist[key].settlement_itemname);
      // console.log(this.info.otherlist[key].isnotservice);
      //

      //给其他项名称赋值
      this.othercostProjects.forEach((item, index) => {
        if (other.settlement_itemid == item.code) {
          other.servicetypename = item.name

          other.detail = item.detail.filter(element => {
            return element.detail_type !== '0'
          })
          other.two_level_code = '' // 清空二级分类
          // debugger
          other.isnotservice = item.isnotservice
        }
      })
      //给其他项税率、是否计入服务费赋值
      this.info.eventinfoother.forEach((item, index) => {
        if (other.settlement_itemid == item.othercode) {
          this.info.otherlist[key].settlementservice_taxrate = item.servicerate
          this.info.otherlist[key].isnotservice = item.iscalservice
          console.log(this.info.otherlist[key].isnotservice, item.iscalservice)
        }
      })
    },
    initInfo() {
      this.info.roomlist.forEach((item, index) => {
        item.roomlists.forEach(itemc => {
          // debugger
          if (itemc.quoted_price_room_id && this.info.id == null) {
            //设置默认值，结算金额，数量默认为报价金额，数量
            itemc.settlement_unitprice = positiveFloatSix(itemc.unitprice)

            if (this.info.is_Inside_outside == '0') {
              itemc.settlement_count = itemc.provide_count
              itemc.settlement_inside_roomcount = 0
              itemc.settlement_outside_roomcount = itemc.provide_count
            }
            if (this.info.is_Inside_outside == '1') {
              itemc.settlement_count = itemc.provide_count
              itemc.settlement_inside_roomcount = itemc.inside_roomcount
              itemc.settlement_outside_roomcount = itemc.outside_roomcount
            }
          }
        })
      })
      this.info.conferencelist.forEach((item, index) => {
        item.conferencelists.forEach(itemc => {
          if (itemc.quoted_price_conference_id && this.info.id == null) {
            //设置默认值，结算金额，数量默认为报价金额，数量
            itemc.settlement_price = positiveFloatSix(itemc.price)
            itemc.settlement_count = positiveFloat(itemc.count)
          }
        })
      })
      this.info.foodlist.forEach((item, index) => {
        item.foodlists.forEach(itemc => {
          if (itemc.quoted_price_food_id && this.info.id == null) {
            //设置默认值，结算金额，数量默认为报价金额，数量
            itemc.settlement_unitprice = positiveFloatSix(itemc.price)
            itemc.settlement_count = positiveFloat(itemc.personcount)
          }
        })
      })
      this.info.otherfoodlist.forEach((item, index) => {
        item.foodlists.forEach(itemc => {
          if (itemc.quoted_price_food_id && this.info.id == null) {
            //设置默认值，结算金额，数量默认为报价金额，数量
            itemc.settlement_unitprice = positiveFloatSix(itemc.price)
            itemc.settlement_count = positiveFloat(itemc.personcount)
          }
        })
      })
      this.info.transportationlist.forEach((item, index) => {
        item.tranlists.forEach(itemc => {
          if (itemc.quoted_price_transportation_id && this.info.id == null) {
            //设置默认值，结算金额，数量默认为报价金额，数量
            itemc.settlement_unitprice = positiveFloatSix(itemc.unitprice)
            itemc.settlement_count = positiveFloat(itemc.passengercount)
          }
        })
      })
      this.info.carlist.forEach((item, index) => {
        item.carlists.forEach(itemc => {
          if (itemc.quoted_price_car_id && this.info.id == null) {
            //设置默认值，结算金额，数量默认为报价金额，数量
            itemc.settlement_unitprice = positiveFloatSix(itemc.price)
            itemc.settlement_count = positiveFloat(itemc.carcount)
          }
        })
      })
      this.info.otherlist.forEach((item, index) => {
        if (item.quoted_price_other_id && this.info.id == null) {
          //设置默认值，结算金额，数量默认为报价金额，数量
          item.settlement_unitprice = positiveFloatSix(item.price)
          item.settlement_count = positiveFloat(item.offerservicedaycount) * positiveFloat(item.offerparticipatecount)
        }
      })
      if (this.info.id == null) {
        //设置默认值，结算金额，比例默认为报价金额，比例
        this.info.settlement_advance_amount = this.info.quoted_travelagency_payment_money
        this.info.settlement_advance_proportion = this.info.quoted_travelagency_payment_proportion
        this.info.settlement_taxrate = this.info.taxrate // 报价税费比例 赋值给 结算税费比例
        if (!this.info.settlement_advance_amount) {
          //结算直采金额
          this.info.settlement_advance_amount = 0
        }
        if (!this.info.settlement_advance_proportion) {
          //结算直采比例
          this.info.settlement_advance_proportion = 0
        }
      }
      if (this.info.orderstatus == '0020-1') {
        this.showPriceInfo = false
      }
    }
  },
  mounted() {
    this.initCostProject()
    this.requestApi({
      url: '/OfflineSettlement/DMCOnlineInfo',
      method: 'POST',
      data: {
        orderformid: this.$route.params.id
      }
    }).then(res => {
      this.info = res
      console.log(res)
      if (this.info.event_info_configure.service_fee_ratio == 0 || this.info.sheet_fzc_service == null) {
        this.info.sheet_fzc_service = this.info.fzc_service // 不支持服务费比例修改，服务费比例设置为 报价的服务费比例
      }
      this.initInfo()
      if (this.info.attachlist && this.info.attachlist.length > 0) {
        this.info.attachlist.forEach(item => {
          this.arrayList.forEach((e, i) => {
            if (item.filetype == e.type) {
              this.arrayList[i].fileList.push({
                id: item.id,
                uid: '',
                name: item.filename,
                url: this.info.fileuploaddomin + item.filepath,
                update_time: item.update_time,
                create_date: item.create_date
              })
            }
          })
        })
      }
      this.arrayList[0].remark = this.info.settlement_settlementsheetexplain //结算单说明
      this.arrayList[1].remark = this.info.settlement_confirmmail //确认邮件说明
      this.arrayList[2].remark = this.info.settlement_po //po单说明
      this.arrayList[3].remark = this.info.settlement_invoice //供应商发票说明
      this.arrayList[4].remark = this.info.settlement_voucher //住宿发票说明
      this.arrayList[5].remark = this.info.settlement_contract //餐饮发票说明
      this.arrayList[6].remark = this.info.settlement_waterbill //会场发票说明
      this.arrayList[7].remark = this.info.settlement_outsidefoodinvoiceexplain //酒店外餐饮发票说明
      this.arrayList[8].remark = this.info.settlement_registinvoiceexplain //注册费发票说明
      this.arrayList[9].remark = this.info.settlement_carinvoiceexplain //用车发票说明
      this.arrayList[10].remark = this.info.settlement_productsvoiceexplain //制作物发票说明
      this.arrayList[11].remark = this.info.settlement_insureinvoiceexplain //保险发票说明
      this.arrayList[12].remark = this.info.settlement_signexplain //签到发票说明
      this.arrayList[13].remark = this.info.settlement_photoexplain //照片说明
      this.arrayList[14].remark = this.info.settlement_other //其他说明

      this.arrayList[0].dissent = this.info.dissent_settlementsheetexplain //结算单说明
      this.arrayList[1].dissent = this.info.dissent_confirmmail //确认邮件说明
      this.arrayList[2].dissent = this.info.dissent_po //po单说明
      this.arrayList[3].dissent = this.info.dissent_invoice //供应商发票说明
      this.arrayList[4].dissent = this.info.dissent_voucher //住宿发票说明
      this.arrayList[5].dissent = this.info.dissent_contract //餐饮发票说明
      this.arrayList[6].dissent = this.info.dissent_waterbill //会场发票说明
      this.arrayList[7].dissent = this.info.dissent_outsidefoodinvoiceexplain //酒店外餐饮发票说明
      this.arrayList[8].dissent = this.info.dissent_registinvoiceexplain //注册费发票说明
      this.arrayList[9].dissent = this.info.dissent_carinvoiceexplain //用车发票说明
      this.arrayList[10].dissent = this.info.dissent_productsvoiceexplain //制作物发票说明
      this.arrayList[11].dissent = this.info.dissent_insureinvoiceexplain //保险发票说明
      this.arrayList[12].dissent = this.info.dissent_signexplain //签到发票说明
      this.arrayList[13].dissent = this.info.dissent_photoexplain //照片说明
      this.arrayList[14].dissent = this.info.dissent_other //其他说明
      this.initFileRename()
    })
  }
}
</script>

<style lang="scss" scoped>
.orderInfo {
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 16px;
  padding: 15px 20px;
  border-bottom: 1px solid #f6f6f6;
}

.tips {
  background-color: #d9edf7;
  border: 1px solid #bce8f1;
  border-radius: 5px;
  color: #3a87ad;
  font-size: 16px;
  line-height: 25px;
  padding: 20px 0;
  text-align: center;
  p:last-child {
    font-size: 14px;
  }
}

.content {
  flex: 1;
  width: 100%;
  // overflow: auto;
  padding: 15px 20px;
  box-sizing: border-box;
  .info {
    margin-top: 15px;
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
        }
        .context {
          flex: 1;
          padding: 10px;
          box-sizing: border-box;
          .input_line {
            display: inline-block;
            width: 60px;
            margin: 0 10px;
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
  }
  .btn-group {
    margin-top: 20px;
  }
  .nformation {
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
}
.hyxq_item {
  margin-bottom: 10px;
  &:last-child {
    margin: 0;
  }
  .date,
  span {
    font-weight: bold;
  }
}
.bold {
  font-weight: bold;
}

.step {
  margin-top: 15px;
  font-size: 20px;
}
.step_upflod {
  display: flex;
  .showBase_tap {
    img {
      width: 30px;
      height: 30px;
    }
    font-size: 14px;
    color: #fd864b;
    display: flex;
    align-items: center;
  }
}
table {
  box-sizing: border-box;
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin-top: 15px;
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
      width: 70%;
      margin: 0px 5px 0px 0px;
    }
    .difference {
      border: 1px solid red;
      border-radius: 4px;
    }
  }

  tr.difference {
    td {
      color: red;
    }
  }
  .topleft {
    text-align: left;
  }
  .color_1 {
    background-color: #dff0d8;
    font-size: 16px;
  }
  .color_2 {
    background-color: #f5f5f5;
    .describe-tooltip {
      float: right;
    }
  }
  .color_3 {
    background-color: #e6e6e6;
  }
  .wordBreak {
    word-break: break-all;
  }
  .otherFee {
    div {
      margin-left: 20%;
      display: flex;
      align-items: center;
      .el-checkbox {
        margin-right: 20px;
      }
      div {
        display: flex;
        margin-left: initial;
        span {
          color: red;
        }
      }
    }
  }
  .chaifen {
  }
}
.qita {
  display: flex;
  background-color: #f4f4f4;
  padding: 20px;
  box-sizing: border-box;
  margin-top: 15px;
  .left,
  .right {
    flex: 1;
    .context {
      margin-top: 10px;
      textarea {
        width: 100%;
        height: 100px;
        padding: 10px;
        border: 1px solid #cccccc;
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
.submit {
  text-align: center;
  padding: 15px 30px;
}
.excel {
  margin-bottom: 10px;
  margin-top: 10px;
  cursor: pointer;
}
.excel > a {
  float: right;
  margin-right: 100px;
  background-color: #ffffff;
  border: 1px solid #e2e2e2;
  padding: 10px 30px;
  border-radius: 5px;
  color: #242424;
}
.pitchOn {
  cursor: pointer;
}
.pitchOn:hover {
  background-color: #dfdfdf;
}
.add_settle {
  position: absolute;
  top: 20px;
  right: 10px;
}
::deep .objectionDetailStyle {
  img {
    max-width: 100%;
  }
}
//后期需要启用
// .el-message{
//   overflow-y: scroll;
// }
</style>
