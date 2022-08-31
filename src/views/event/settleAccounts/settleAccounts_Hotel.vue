<template>
  <div class="orderInfo" v-if="info">
    <div class="title">
      我的订单 - 结算单 -
      <template v-if="info">
        {{ info.num }}
      </template>
    </div>
    <a v-show="false" :href="downloadUrl" target="_blank" ref="a_click" download></a>
    <div class="content" v-if="info">
      <div class="tips" v-if="info.settlement_status === status_draft">
        <p>该草稿保存于{{ info.settlement_submit_time }}</p>
      </div>
      <div class="step">
        Step1 确认订单基本信息
        <p style="color: #428bca;font-size: 17px;float: right;">
          <!-- <a v-if="info.event_info_configure.jsqrisdisplay == 1" @click="downloadSettlementConfirm" style="cursor: pointer;margin:0 10px" download>下载结算确认单</a> -->
          <a @click="excelDownload" v-if="this.$route.params.issubmit == 0" style="cursor: pointer;margin:0 10px" download>下载结算Excel</a>
        </p>
      </div>
      <div class="info">
        <div class="line">
          <div class="item">
            <div class="label">订单号</div>
            <div class="context">{{ info.num }}</div>
          </div>
          <div class="item">
            <div class="label">联系人</div>
            <div class="context">{{ info.contacts }}</div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">下单时间</div>
            <div class="context">{{ info.submit_time | date_ex }}</div>
          </div>
          <div class="item">
            <div class="label">联系方式</div>
            <div class="context">{{ info.customer_service_telephone_numbers }}</div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">活动名称</div>
            <div class="context">{{ info.activity_name }}</div>
          </div>
          <div class="item">
            <div class="label">客户名称</div>
            <div class="context">{{ info.company_name }}</div>
          </div>

        </div>
        <div class="line">
          <div class="item">
            <div class="label">活动日期</div>
            <div class="context">{{ info.activity_date }}</div>
          </div>
          <div class="item">
            <div class="label">报价日期</div>
            <div class="context">{{ info.offer_data | date_ex }}</div>
          </div>
        </div>
      </div>
      <div class="step">Step2 上传结算相关凭证（必填）</div>
      <table v-if="true">
        <thead>
          <tr class="color_2">
            <th>凭证名称</th>
            <th>文件</th>
            <th>客户异议</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in arrayList">
          <tr v-if="index!=4">
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
								" :on-preview="handlePreview" :auto-upload="false" :file-list="item.fileList" :show-file-list="false" :multiple="false" :disabled="isconfirm">
                <el-button slot="trigger" size="small" type="primary" v-if="!isconfirm || issupplement">从电脑选择文件</el-button>
                <ul style="margin-top: 5px;">
                  <li v-for="(file, file_index) in item.fileList" @click="handlePreview(file)" class="pitchOn" :key="file_index">
                    <span>{{ file.name }}</span>
                    <span @click.stop="fileRename(file, index, file_index)" style="color:#199ED8;cursor: pointer;margin-left:30px">重命名</span>
                    <span @click.stop="deleteFile(file, index, file_index)" style="color:#199ED8;cursor: pointer;margin-left:10px">删除</span>
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
              <el-input v-model="item.remark" :readonly="isconfirm" />
            </td>
          </tr>
          <tr v-if="isconfirm && index==4">
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
								" :on-preview="handlePreview" :auto-upload="false" :file-list="item.fileList" :show-file-list="false" :multiple="false" :disabled="!isconfirm">
                <el-button slot="trigger" size="small" type="primary" v-if="isconfirm">从电脑选择文件</el-button>
                <ul style="margin-top: 5px;">
                  <li v-for="(file, file_index) in item.fileList" @click="handlePreview(file)" class="pitchOn" :key="file_index">
                    <span>{{ file.name }}</span>
                    <span @click.stop="fileRename(file, index, file_index)" style="color:#199ED8;cursor: pointer;margin-left:30px">重命名</span>
                    <span @click.stop="deleteFile(file, index, file_index)" style="color:#199ED8;cursor: pointer;margin-left:10px">删除</span>
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
              <el-input v-model="item.remark" :readonly="readonly" />
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <table>
				<thead>
					<tr class="color_2">
						<th>酒店住宿发票+小联</th>
						<th>文件</th>
						<th>客户异议</th>
						<th>说明</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>您可以在附件中上传酒店住宿发票+小联，每个文件不得超过10M</td>
						<td>
							<el-upload
								ref="upload"
								action=""
								:on-change="
									(file, fileList) => {
										handleChangeAttach(file, fileList, (type = 1));
									}
								"
								:on-remove="
									(file, fileList) => {
										handleRemoveAttach(file, fileList, (type = 1));
									}
								"
								:disabled="this.isconfirm"
								:on-preview="handlePreview"
								:auto-upload="false"
								:file-list="this.fileList"
								:multiple="false"
							>
								<el-button slot="trigger" size="small" type="primary" v-if="!this.isconfirm || this.issupplement">从电脑选择文件</el-button>
							</el-upload>
						</td>
						<td></td>
						<td>
							<el-input v-model="info.settlement_voucher" :readonly="isconfirm" />
						</td>
					</tr>
				</tbody>
			</table>
			<table>
				<thead>
					<tr class="color_2">
						<th>酒店餐饮发票+小联</th>
						<th>文件</th>
						<th>客户异议</th>
						<th>说明</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>您可以在附件中上传酒店餐饮发票+小联，每个文件不得超过10M</td>
						<td>
							<el-upload
								ref="upload"
								action=""
								:on-change="
									(file, fileList) => {
										handleChangeAttach(file, fileList, (type = 2));
									}
								"
								:on-remove="
									(file, fileList) => {
										handleRemoveAttach(file, fileList, (type = 2));
									}
								"
								:disabled="this.isconfirm"
								:on-preview="handlePreview"
								:auto-upload="false"
								:file-list="this.fileList2"
								:multiple="false"
							>
								<el-button slot="trigger" size="small" type="primary" v-if="!this.isconfirm || this.issupplement">从电脑选择文件</el-button>
							</el-upload>
						</td>
						<td></td>
						<td>
							<el-input v-model="info.settlement_contract" :readonly="isconfirm" />
						</td>
					</tr>
				</tbody>
			</table>
			<table>
				<thead>
					<tr class="color_2">
						<th>酒店会场发票+小联</th>
						<th>文件</th>
						<th>客户异议</th>
						<th>说明</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>您可以在附件中上传酒店会场发票+小联，每个文件不得超过10M</td>
						<td>
							<el-upload
								ref="upload"
								action=""
								:on-change="
									(file, fileList) => {
										handleChangeAttach(file, fileList, (type = 3));
									}
								"
								:on-remove="
									(file, fileList) => {
										handleRemoveAttach(file, fileList, (type = 3));
									}
								"
								:disabled="this.isconfirm"
								:on-preview="handlePreview"
								:auto-upload="false"
								:file-list="this.fileList3"
								:multiple="false"
							>
								<el-button slot="trigger" size="small" type="primary" v-if="!this.isconfirm || this.issupplement">从电脑选择文件</el-button>
							</el-upload>
						</td>
						<td></td>
						<td>
							<el-input v-model="info.settlement_waterbill" :readonly="isconfirm" />
						</td>
					</tr>
				</tbody>
			</table>
			<table>
				<thead>
					<tr class="color_2">
						<th>其他</th>
						<th>文件</th>
						<th>客户异议</th>
						<th>说明</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>您可以在附件中上传其他，每个文件不得超过10M</td>
						<td>
							<el-upload
								ref="upload"
								action=""
								:on-change="
									(file, fileList) => {
										handleChangeAttach(file, fileList, (type = 4));
									}
								"
								:on-remove="
									(file, fileList) => {
										handleRemoveAttach(file, fileList, (type = 4));
									}
								"
								:disabled="this.isconfirm"
								:on-preview="handlePreview"
								:auto-upload="false"
								:file-list="this.fileList4"
								:multiple="false"
							>
								<el-button slot="trigger" size="small" type="primary" v-if="!this.isconfirm || this.issupplement">从电脑选择文件</el-button>
							</el-upload>
						</td>
						<td></td>
						<td>
							<el-input v-model="info.settlement_other" :readonly="isconfirm" />
						</td>
					</tr>
				</tbody>
			</table>
			<table v-if="this.isconfirm">
				<thead>
					<tr class="color_2">
						<th>供应商发票及账单</th>
						<th>文件</th>
						<th>客户异议</th>
						<th>说明</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>您可以在附件中上传供应商发票及账单，每个文件不得超过10M</td>
						<td>
							<el-upload
								ref="upload"
								action=""
								:on-change="
									(file, fileList) => {
										handleChangeAttach(file, fileList, (type = 5));
									}
								"
								:on-remove="
									(file, fileList) => {
										handleRemoveAttach(file, fileList, (type = 5));
									}
								"
								:disabled="!this.isconfirm"
								:on-preview="handlePreview"
								:auto-upload="false"
								:file-list="this.fileList5"
								:multiple="false"
							>
								<el-button slot="trigger" size="small" type="primary" v-if="this.isconfirm">从电脑选择文件</el-button>
							</el-upload>
						</td>
						<td></td>
						<td><el-input v-model="info.settlement_invoice" :readonly="readonly" /></td>
					</tr>
				</tbody>
			</table> -->
      <div class="step">Step3 填写结算明细（必填）</div>
      <table>
        <thead>
          <tr class="color_2">
            <th colspan="4" class="color_3">原订单总报价：¥{{ positiveFloat(price_no[0]) }}</th>
            <th style="position: relative;" colspan="5">订单总结算价：¥{{ positiveFloat(price_no[1]) }}
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
              报价金额：¥{{ positiveFloat(roomPrice[0].all*roomOut) }}
              <p style="color:#999">{{ roomOutMsg }}</p>
            </th>
            <th colspan="4" style="text-align: right">
              结算金额：¥{{ positiveFloat(roomPrice[1].all*roomSettlementOut) }}
              <el-select :disabled="readonly" @change="roomVat($event)" size="mini" v-model="info.settlement_roomtaxid" placeholder="请选择">
                <el-option v-for="item in info.taxlist" :key="item.id" :label="item.taxname" :value="item.id"></el-option>
              </el-select>
            </th>
            <th></th>
          </tr>
        </tbody>
        <tbody v-for="(item, key) in info.settlement_sheet_room" :key="`kefang${key}`">
          <tr class="color_2">
            <th class="color_3">
              <i>{{ item.date | date_day_ex }}</i>
            </th>
            <th class="color_3" colspan="3" style="text-align: right">小计：¥{{ positiveFloat(roomPrice[0].subtotal[`sub_${key}`]*roomOut) }}</th>
            <th colspan="4" style="text-align: right">小计：¥{{ positiveFloat(roomPrice[1].subtotal[`sub_${key}`]*roomSettlementOut) }}</th>
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
          <tr v-for="(room, key) in item.room_list" :key="`room${key}`" :class="{ difference: room.difference }">
            <td class="color_2">
              <template v-if="room.quoted_price_room_id ">
                {{ room.roomtypename }}
              </template>
              <template v-else>
                <!-- <el-input v-model="room.settlement_itemname" placeholder="消费项目名称" :readonly="readonly" /> -->
                <el-select @change="changekefang($event, room)" :loading="cost_project_load" v-model="room.settlement_itemid" size="small" filterable>
                  <el-option v-for="cp in roomcostProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
                </el-select>
              </template>
              <el-tooltip v-if="room.quoted_price_room_id && (room.otherrequirements || room.remarks)" class="describe-tooltip" effect="dark" placement="top-end">
                <div slot="content" style="width: 150px;">
                  <div v-if="room.otherrequirements">需求说明：{{ room.otherrequirements }}</div>
                  <div v-if="room.remarks">报价备注：{{ room.remarks }}</div>
                </div>
                <el-button type="text">备注</el-button>
              </el-tooltip>
            </td>
            <td class="color_2">{{ positiveFloat(room.unitprice) }}</td>
            <td class="color_2">
              <p v-if="info.is_Inside_outside == '0'">{{ room.provide_count }}</p>
              <div v-if="info.is_Inside_outside == '1'">
                <p>内部人员：{{room.inside_roomcount}}</p>
                <p>外部人员：{{room.outside_roomcount}}</p>
              </div>
            </td>
            <td class="color_2">{{ positiveFloat(room.totalprice) }}</td>
            <td>
              <el-input type="text" v-model="room.settlement_unitprice" @input="room.settlement_unitprice = formatNum(room.settlement_unitprice, 2)" :readonly="readonly" />
            </td>
            <td>
              <el-input v-if="info.is_Inside_outside == '0'" v-model="room.settlement_count" @input="room.settlement_count = formatNum(room.settlement_count, 3)" placeholder="请输入数量" :readonly="readonly || !!room.lineoroffline" :class="{ lineBack: !!room.lineoroffline }" style="width: 50%;" />
              <div v-if="info.is_Inside_outside == '1'" style="display:flex">
                <el-input @input="room.settlement_inside_roomcount = formatNum(room.settlement_inside_roomcount, 3); 
								room.settlement_count = positiveFloat(room.settlement_inside_roomcount) + positiveFloat(room.settlement_outside_roomcount);" v-model="room.settlement_inside_roomcount" placeholder="请输入数量" :readonly="readonly || !!room.lineoroffline" :class="{ lineBack: !!room.lineoroffline }" style="width: 55%;" />
                <el-input @input="room.settlement_outside_roomcount = formatNum(room.settlement_outside_roomcount, 3); 
								room.settlement_count = positiveFloat(room.settlement_inside_roomcount) + positiveFloat(room.settlement_outside_roomcount)" v-model="room.settlement_outside_roomcount" placeholder="请输入数量" :readonly="readonly || !!room.lineoroffline" :class="{ lineBack: !!room.lineoroffline }" style="width: 55%; margin-left: 10px;" />

              </div>
            </td>
            <!-- <template v-if="info.is_Inside_outside == '1'">
							<td>{{ positiveFloatSix(positiveFloatSix(room.settlement_unitprice) * positiveFloat(room.roomcount)).toFixed(2) }}</td>
						</template>
						<template v-else>
							<td>{{ positiveFloatSix(positiveFloatSix(room.settlement_unitprice) * positiveFloat(room.settlement_count)).toFixed(2) }}</td>
						</template> -->
            <td>{{ positiveFloat(positiveFloatSix(room.settlement_unitprice) * positiveFloat(room.settlement_count)) }}</td>

            <td>{{ room.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="room.settlement_comments" :readonly="readonly" :class="{ difference: roomDifference(room), line: !room.quoted_price_room_id }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" @click="delroom(item, key)" v-if="!room.quoted_price_room_id && issubmit"></el-button>
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
            <th style="text-align: right">¥{{ positiveFloat(roomPrice[2]*roomSettlementOut) }}</th>
            <th></th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addOther(1)">添加杂费</el-button>
            </th>
          </tr>
          <tr v-for="roomzf in roomincidental" :key="roomzf.id">
            <td class="color_2">
              <el-input v-model="roomzf.content" :readonly="readonly" placeholder="杂费项名称" />
            </td>
            <td class="color_2"></td>
            <td class="color_2"></td>
            <td class="color_2"></td>
            <td>
              <el-input v-model="roomzf.price" @input="roomzf.price = formatNum(roomzf.price, 2)" :readonly="readonly" />
            </td>
            <td>
              <el-input v-model="roomzf.count" @input="roomzf.count = positiveFloatOne(roomzf.count)" :readonly="readonly" />
              <!-- <el-input-number 
								v-model.number="roomzf.count" 
								:readonly="readonly"
								:controls="false" 
								:precision="1" 
								placeholder="请输入数量" 
								style="width: 50%;">
							</el-input-number> -->
            </td>
            <td>{{ positiveFloat(positiveFloatSix(roomzf.price) * positiveFloat(roomzf.count)) }}</td>
            <td class="color_2"></td>
            <td>
              <el-input v-model="roomzf.comments" :readonly="readonly" class="line" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" v-if="issubmit" @click="delOther(roomzf.id)"></el-button>
            </td>
          </tr>
        </tbody>

        <!-- 会场结算 -->
        <tbody v-if="conferenceVisible">
          <tr class="color_2">
            <th class="color_3"><i style="color: #428bca">会场</i></th>
            <th class="color_3" colspan="3" style="text-align: right">
              报价金额：¥{{ positiveFloat(conferencePrice[0].all*conferenceOut) }}
              <p style="color:#999">{{ conferenceOutMsg }}</p>
            </th>
            <th colspan="4" style="text-align: right">
              结算金额：¥{{ positiveFloat(conferencePrice[1].all*conferenceSettlementOut) }}
              <el-select :disabled="readonly" @change="conferenceVat($event)" size="mini" v-model="info.settlement_conferencetaxid" placeholder="请选择">
                <el-option v-for="item in info.taxlist" :key="item.id" :label="item.taxname" :value="item.id"></el-option>
              </el-select>
            </th>
            <th></th>
          </tr>
        </tbody>
        <tbody v-for="(item, key) in info.settlement_sheet_conference" :key="`huiyi${key}`">
          <tr class="color_2">
            <th class="color_3">
              <i>{{ item.date | date_day_ex }}</i>
            </th>
            <th class="color_3" colspan="3" style="text-align: right">小计：¥{{ positiveFloat(conferencePrice[0].subtotal[`sub_${key}`]) }}</th>
            <th colspan="4" style="text-align: right">小计：¥{{ positiveFloat(conferencePrice[1].subtotal[`sub_${key}`]) }}</th>
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
            <!-- 以前注释以下两行 -->
            <th>数量</th>
            <th>金额(元)</th>
            <th>客户异议</th>
            <th>结算说明</th>
          </tr>
          <tr v-for="(conference, key) in item.conference_list" :key="`conference${key}`">
            <td class="color_2">
              <template v-if="conference.quoted_price_conference_id ">
                <template v-if="conference.type == 1">
                  {{ '场租-会场'+conference.order_name + `(${conference.roomsetuptypename};会议时间:${conference.starttime}~${conference.endtime};出席人数:${conference.attendees}人)`}}
                </template>
                <template v-if="conference.type == 2">
                  {{ '会场搭建费-' + conference.related_information + ' (' + conference.roomsetuptypename + ')'}}
                </template>
                <template v-if="conference.type == 3">
                  {{ `设备-会场${conference.order_name}` +`(${conference.roomsetuptypename};${conference.equipment})`}}
                </template>
                <template v-if="conference.type == 4">
                  <!-- <el-select :loading="cost_project_load" v-model="conference.settlement_itemid" size="small" filterable>
										<el-option v-for="cp in meetingcostProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
									</el-select> -->
                  {{ conference.settlement_itemname}}
                </template>
              </template>
              <template v-else>
                <!-- <el-input v-model="conference.settlement_itemname" :readonly="readonly" placeholder="消费项目名称" /> -->
                <el-select @change="changehuichang($event, conference)" :loading="cost_project_load" v-model="conference.settlement_itemid" size="small" filterable>
                  <el-option v-for="cp in meetingcostProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
                </el-select>
              </template>
              <el-tooltip v-if="conference.quoted_price_conference_id && (conference.describe || conference.comments)" class="describe-tooltip" effect="dark" placement="top-end">
                <div slot="content" style="width: 150px;">
                  <div v-if="conference.describe">需求说明：{{ conference.describe }}</div>
                  <div v-if="conference.comments">报价备注：{{ conference.comments }}</div>
                </div>
                <el-button type="text">备注</el-button>
              </el-tooltip>
            </td>
            <td class="color_2">{{ positiveFloat(conference.price) }}</td>
            <td class="color_2">{{ conference.count }}</td>
            <td class="color_2">{{ positiveFloat(positiveFloat(conference.count) * positiveFloatSix(conference.price)) }}</td>
            <td>
              <el-input type="text" v-model="conference.settlement_price" @input="conference.settlement_price = formatNum(conference.settlement_price, 2)" :readonly="readonly" />
            </td>

            <!-- 以前注释以下两行 -->
            <td>
              <el-input v-model="conference.settlement_count" @input="conference.settlement_count = formatNum(conference.settlement_count, 2)" placeholder="请输入数量" :readonly="readonly || !!conference.lineoroffline" :class="{ lineBack: !!conference.lineoroffline }" style="width: 50%;" />
            </td>
            <td>{{ positiveFloat(positiveFloatSix(conference.settlement_price) * positiveFloat(conference.settlement_count)) }}</td>

            <td>{{ conference.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="conference.settlement_comments" :readonly="readonly" :class="{ difference: conferenceDifference(conference), line: !conference.quoted_price_conference_id }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" @click="delconference(item, key)" v-if="!conference.quoted_price_conference_id && issubmit"></el-button>
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
            <th>单价（元）</th>
            <th>数量</th>
            <th style="text-align: right">¥{{ positiveFloat(conferencePrice[2]*conferenceSettlementOut) }}</th>
            <th></th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addOther(2)">添加杂费</el-button>
            </th>
          </tr>
          <tr v-for="conferencezf in meetingcidental" :key="conferencezf.id">
            <td class="color_2">
              <el-input v-model="conferencezf.content" :readonly="readonly" placeholder="杂费项名称" />
            </td>
            <td class="color_2"></td>
            <td class="color_2"></td>
            <td class="color_2"></td>
            <td>
              <el-input type="text" v-model="conferencezf.price" @input="conferencezf.price = formatNum(conferencezf.price, 2)" :readonly="readonly" />
            </td>
            <td>
              <el-input v-model="conferencezf.count" @input="conferencezf.count = positiveFloatOne(conferencezf.count)" :readonly="readonly" />
              <!-- <el-input-number 
								v-model.number="conferencezf.count" 
								:readonly="readonly"
								:controls="false" 
								:precision="1" 
								placeholder="请输入数量" 
								style="width: 50%;">
							</el-input-number> -->
            </td>
            <td>{{ positiveFloat(positiveFloatSix(conferencezf.price) * positiveFloat(conferencezf.count)) }}</td>
            <td class="color_2"></td>
            <td>
              <el-input v-model="conferencezf.comments" class="line" :readonly="readonly" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" v-if="issubmit" @click="delOther(conferencezf.id)"></el-button>
            </td>
          </tr>
        </tbody>

        <!-- 餐饮结算 -->
        <tbody v-if="foodVisible">
          <tr class="color_2">
            <th class="color_3"><i style="color: #428bca">餐饮</i></th>
            <th class="color_3" colspan="3" style="text-align: right">
              报价金额：¥{{ positiveFloat(foodPrice[0].all*foodOut) }}
              <p style="color:#999">{{ foodOutMsg }}</p>
            </th>
            <th colspan="4" style="text-align: right">
              结算金额：¥{{ positiveFloat(foodPrice[1].all*foodSettlementOut) }}
              <el-select :disabled="readonly" @change="foodVat($event)" size="mini" v-model="info.settlement_foodtaxid" placeholder="请选择">
                <el-option v-for="item in info.taxlist" :key="item.id" :label="item.taxname" :value="item.id"></el-option>
              </el-select>
            </th>
            <th></th>
          </tr>
        </tbody>
        <tbody v-for="(item, key) in info.settlement_sheet_food" :key="`canyin${key}`">
          <tr class="color_2">
            <th class="color_3">
              <i>{{ item.date | date_day_ex }}</i>
            </th>
            <th class="color_3" colspan="3" style="text-align: right">小计：¥{{ positiveFloat(foodPrice[0].subtotal[`sub_${key}`]*foodOut) }}</th>
            <th colspan="4" style="text-align: right">小计：¥{{ positiveFloat(foodPrice[1].subtotal[`sub_${key}`]*foodSettlementOut) }}</th>
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
          <tr v-for="(food, key) in item.food_list" :key="`food${key}`">
            <td class="color_2">
              <template v-if="food.quoted_price_food_id  ">
                {{ food.foodtypename }}
                <span v-if="food.usetypename">[{{ food.usetypename }}]</span>
                <!-- <sapn v-if="food.addresstype == 1" style="color: #f00">酒店外</sapn> -->
              </template>
              <template v-else>
                <!-- <el-input v-model="food.settlement_itemname" :readonly="readonly" placeholder="消费项目名称" /> -->
                <el-select @change="changehotelnei($event, food)" :loading="cost_project_load" v-model="food.settlement_itemid" size="small" filterable>
                  <el-option v-for="cp in foodcostProjects" :label="cp.label" :value="cp.value" :key="cp.value"></el-option>
                </el-select>
              </template>
              <el-tooltip v-if="food.quoted_price_food_id && (food.comments || food.offer_remarks)" class="describe-tooltip" effect="dark" placement="top-end">
                <div slot="content" style="width: 150px;">
                  <div v-if="food.comments">需求说明：{{ food.comments }}</div>
                  <div v-if="food.offer_remarks">报价备注：{{ food.offer_remarks }}</div>
                </div>
                <el-button type="text">备注</el-button>
              </el-tooltip>
            </td>
            <td class="color_2">
              <template v-if="food.quoted_price_food_id || (!food.quoted_price_food_id && food.settlement_itemid)">
                {{ positiveFloat(food.price) }}
              </template>
              <!-- <el-select v-else v-model="food.addresstype" placeholder="请选择">
								<el-option v-for="item in quoted_price_food_option" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select> -->
            </td>
            <td class="color_2">{{ food.personcount }}</td>
            <td class="color_2">{{ positiveFloat(positiveFloat(food.personcount) * positiveFloatSix(food.price)) }}</td>
            <td>
              <el-input v-model="food.settlement_unitprice" @input="food.settlement_unitprice = formatNum(food.settlement_unitprice)" :readonly="readonly" />
            </td>
            <td>
              <!-- <el-input 
								v-model="food.settlement_count" 
								@input="food.settlement_count = formatNum(food.settlement_count, 1)" 
								:readonly="readonly"
							/> -->
              <el-input v-model="food.settlement_count" @input="food.settlement_count = formatNum(food.settlement_count, 2)" placeholder="请输入数量" :readonly="readonly" style="width: 50%;" />
            </td>
            <td>{{ positiveFloat(positiveFloatSix(food.settlement_unitprice) * positiveFloat(food.settlement_count)) }}</td>
            <td>{{ food.settlement_customer_objection }}</td>
            <td>
              <el-input v-model="food.settlement_comments" :readonly="readonly" :class="{ difference: foodDifference(food), line: !food.quoted_price_food_id }" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" @click="delfood(item, key)" v-if="!food.quoted_price_food_id && issubmit"></el-button>
            </td>
          </tr>
        </tbody>
        <!-- 餐饮杂费 -->
        <tbody v-if="foodVisible">
          <tr class="color_2">
            <th class="color_3">杂费小计</th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th class="color_3"></th>
            <th></th>
            <th></th>
            <th style="text-align: right">¥{{ positiveFloat(foodPrice[2]*foodSettlementOut) }}</th>
            <th></th>
            <th>
              <el-button type="primary" size="mini" v-if="issubmit" @click="addOther(3)">添加杂费</el-button>
            </th>
          </tr>
          <tr v-for="foodzf in foodincidental" :key="foodzf.id">
            <td class="color_2">
              <el-input v-model="foodzf.content" :readonly="readonly" placeholder="杂费项名称" />
            </td>
            <td class="color_2">
              <!-- <el-checkbox v-model="foodzf.isnotservice" :true-label="1" :false-label="0">酒店外</el-checkbox> -->
            </td>
            <td class="color_2"></td>
            <td class="color_2"></td>
            <td>
              <el-input type="text" v-model="foodzf.price" :readonly="readonly" @input="foodzf.price = formatNum(foodzf.price, 2)" />
            </td>
            <td>
              <el-input v-model="foodzf.count" @input="foodzf.count = positiveFloatOne(foodzf.count)" :readonly="readonly" />
              <!-- <el-input-number 
								v-model.number="foodzf.count" 
								:readonly="readonly"
								:controls="false" 
								:precision="1" 
								placeholder="请输入数量" 
								style="width: 50%;">
							</el-input-number> -->
            </td>
            <td>{{ positiveFloat(positiveFloatSix(foodzf.price) * positiveFloat(foodzf.count)) }}</td>
            <td class="color_2"></td>
            <td>
              <el-input v-model="foodzf.comments" :readonly="readonly" class="line" />
              <el-button icon="el-icon-delete" type="danger" circle size="mini" v-if="issubmit" @click="delOther(foodzf.id)"></el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="qita">
        <div class="left">
          <div class="stitle">客户异议</div>
          <div class="context">{{ info.settlement_customer_objection }}</div>
        </div>
        <div class="right">
          <div class="stitle">其他说明</div>
          <div class="context"><textarea v-model="info.settlement_offer_remarks"></textarea></div>
        </div>
      </div>
    </div>

    <div class="excel"><a @click="excelDownload" download>导出结算单</a></div>

    <div class="submit">
      <el-button v-if="['0020-1','0020-4','0020-7','0020-8'].includes(this.info.orderstatus)" @click="draft">保存到草稿箱</el-button>
      <el-button v-if="['0020-4','0020-7','0020-8'].includes(this.info.orderstatus)" type="primary" @click="submit">提交结算单</el-button>
    </div>

    <div class="info" v-if="info.historylist && info.historylist.length > 0">
      <el-card class="box-card">
        <div slot="header" class="header clearfix"><span>历史结算单：</span></div>
        <div v-for="(item, index) in info.historylist" :key="item.id" class="text item">
          第{{ index + 1 }}次结算, 总价￥{{ positiveFloat(item.settlement_total_price) }}元，[ {{ item.submit_time | date_ex }} ]
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
import { guid, getBetweenDate, positiveInteger, positiveFloat,positiveFloatOne, positiveFloatSix, formatDate, formatNum } from '@/utils/common';
import upload from '@/utils/upload';
import moment from 'moment';
import {limitsEffect} from '@/utils/uploadRestrictions';
import excelExport from '@/utils/exportexcel';
import '@/assets/js/directive';
/**
 * @page 订单详情
 */
export default {
	data() {
		return {
			info: null,
			fileList: [], //1.酒店住宿发票+小联
			fileList2: [], //2.酒店餐饮发票+小联
			fileList3: [], //3.酒店会场发票+小联
			fileList4: [], //4.其他
			fileList5: [], //5.供应商发票及账单
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
			roomOut:1,
			roomSettlementOut:1,
			roomOutMsg: '',
			conferenceOut:1,
			conferenceSettlementOut: 1,
			conferenceOutMsg: '',
			foodOut:1,
			foodSettlementOut: 1,
			foodOutMsg: '',
			transportationOut:1,
			transportationOutMsg: '',
			carOut:1,
			carOutMsg: '',
			otherOut:1,
			otherOutMsg: '',
			arrayList: [
				{ type: 1, fileList: [], name: '酒店住宿发票+小联', remark: '', dissent: '' },
				{ type: 2, fileList: [], name: '酒店餐饮发票+小联', remark: '', dissent: '' },
				{ type: 3, fileList: [], name: '酒店会场发票+小联', remark: '', dissent: '' },
				{ type: 4, fileList: [], name: '其他', remark: '', dissent: '' },
				{ type: 5, fileList: [], name: '供应商发票及账单', remark: '', dissent: '' },
			], //结算相关凭证
			updateIndex: 0, // 修改文件类目下标
			updateFileIndex: 0, // 修改文件类目列表 文件下标
			rename: false, //重命名按钮弹框
			fileName: '', //文件名称
			suffix: '', //文件后缀
			downloadUrl:'',//下载地址
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
				
			],
			costDates: [],
			roomcostProjects: [],
			meetingcostProjects: [],
			costProjefoodcostProjectscts: [],
			cost_project_load: false,
			costProjects: [],
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
		};
	},
	computed: {
		//控制el-button
		issubmit() {
			return this.$route.params.issubmit == 1;
		},
		//控制el-input
		readonly() {
			return this.$route.params.issubmit == 0;
		},
		//已确认状态判断
		//已确认结算单状态只能操作,供应商发票及账单
		//反之可以操作酒店住宿发票+小联、酒店餐饮发票+小联、酒店会场发票+小联、其他
		isconfirm() {
			return this.info.settlement_status == this.status_confirm;
		},
		//要求补充材料状态判断
		//可以操作酒店住宿发票+小联、酒店餐饮发票+小联、酒店会场发票+小联、其他
		issupplement() {
			return this.info.settlement_status == this.status_supplement;
		},

		formateDate: () => {
			return function(value) {
				return formatDate('YYYY年mm月dd日', new Date(value));
			};
		},
		//客房需求
		roomVisible: function() {
			return this.info.settlement_sheet_room && this.info.settlement_sheet_room.length > 0;
		},
		//会场需求
		conferenceVisible: function() {
			return this.info.settlement_sheet_conference && this.info.settlement_sheet_conference.length > 0;
		},
		//餐饮需求
		foodVisible: function() {
			return this.info.settlement_sheet_food && this.info.settlement_sheet_food.length > 0;
		},
		//大交通需求
		transportationVisible: function() {
			return this.info.settlement_sheet_transportation && this.info.settlement_sheet_transportation.length > 0;
		},
		//地面交通
		carVisible: function() {
			return this.info.settlement_sheet_car && this.info.settlement_sheet_car.length > 0;
		},
		// 房间杂费
		roomincidental() {
			return this.info.settlement_sheet_sundries.filter(i => i.type == 1);
		},
		// 会议杂费
		meetingcidental() {
			return this.info.settlement_sheet_sundries.filter(i => i.type == 2);
		},
		// 用餐杂费
		foodincidental() {
			return this.info.settlement_sheet_sundries.filter(i => i.type == 3);
		},
		// 大交通杂费
		intercitytrafficincidental() {
			return this.info.settlement_sheet_sundries.filter(i => i.type == 4);
		},
		// 地面交通杂费
		carincidental() {
			return this.info.settlement_sheet_sundries.filter(i => i.type == 5);
		},
		// 其他杂费
		otherincidental() {
			return this.info.settlement_sheet_sundries.filter(i => i.type == 6);
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
				0 // 杂项小计
			];
			let subtotal_1 = price[0].subtotal;
			let subtotal_2 = price[1].subtotal;
			this.info.settlement_sheet_room.forEach((item, index) => {
				if (!subtotal_1[`sub_${index}`]) subtotal_1[`sub_${index}`] = 0;
				if (!subtotal_2[`sub_${index}`]) subtotal_2[`sub_${index}`] = 0;
				item.room_list.forEach(itemc => {
					subtotal_1[`sub_${index}`] += positiveFloatSix(itemc.totalprice);
					price[0].all += positiveFloatSix(itemc.totalprice);
					
					let totalRoom = 0;
					if(this.info.is_Inside_outside == 0) {
						totalRoom = itemc.settlement_count;
					}else {
						totalRoom = positiveFloat(itemc.settlement_inside_roomcount) + positiveFloat(itemc.settlement_outside_roomcount);
					}

					subtotal_2[`sub_${index}`] += positiveFloatSix(itemc.settlement_unitprice) * positiveFloat(totalRoom);
					price[1].all += positiveFloatSix(itemc.settlement_unitprice) * positiveFloat(totalRoom);
				});
			});
			this.roomincidental.forEach(item => {
				price[1].all += +positiveFloatSix(item.price) * positiveFloat(item.count);
				price[2] += positiveFloatSix(item.price) * positiveFloat(item.count);
			});
			return price;
		},
		adddifferenceerrormsg: () => {
			return function(type, date, rowIndex) {
				let message = '';
				if (type == 1) message = this.formateDate(date) + '客房,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明';
				else if (type == 2) message = this.formateDate(date) + '会场,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明';
				else if (type == 3) message = this.formateDate(date) + '餐饮,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明';
				else if (type == 4) message = this.formateDate(date) + '大交通,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明';
				else if (type == 5) message = this.formateDate(date) + '地面交通,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明';
				else if (type == 6) message = '其他服务,第' + rowIndex + '行,单价(元)或数量存在差异,请填写结算说明';
				this.errormsg.push(message);
			};
		},
		addnewitemerrormsg: () => {
			return function(type, date, rowIndex) {
				let message = '';
				if (type == 1) message = this.formateDate(date) + '新增客房,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称';
				else if (type == 2) message = this.formateDate(date) + '新增会场,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称';
				else if (type == 3) message = this.formateDate(date) + '新增餐饮,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称';
				else if (type == 4) message = this.formateDate(date) + '新增大交通,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称';
				else if (type == 5) message = this.formateDate(date) + '新增地面交通,第' + rowIndex + '行,消费项目名称为必填项,请填写消费项目名称';
				this.errormsg.push(message);
			};
		},
		addnewitemhasnocommments: () => {
			return function(type, date, rowIndex) {
				let message = '';
				if (type == 1) message = this.formateDate(date) + '新增客房,第' + rowIndex + '行,结算说明为必填项,请填写结算说明';
				else if (type == 2) message = this.formateDate(date) + '新增会场,第' + rowIndex + '行,结算说明为必填项,请填写结算说明';
				else if (type == 3) message = this.formateDate(date) + '新增餐饮,第' + rowIndex + '行,结算说明为必填项,请填写结算说明';
				else if (type == 4) message = this.formateDate(date) + '新增大交通,第' + rowIndex + '行,结算说明为必填项,请填写结算说明';
				else if (type == 5) message = this.formateDate(date) + '新增地面交通,第' + rowIndex + '行,结算说明为必填项,请填写结算说明';
				this.errormsg.push(message);
			};
		},
		//客房差异标记
		roomDifference: () => {
			return function(item) {
				return positiveFloatSix(item.unitprice) !== positiveFloatSix(item.settlement_unitprice) 
							|| positiveFloat(item.provide_count) !== positiveFloat(item.settlement_count)
							|| (!item.quoted_price_room_id && item.settlement_comments == '');
			};
		},
		//保存时验证客房数据
		checkRoomDifference: function() {
			let difference = false;
			let newitem = false;
			if (this.info.settlement_sheet_room && this.info.settlement_sheet_room.length > 0) {
				this.info.settlement_sheet_room.forEach(item => {
					if (item.room_list && item.room_list.length > 0) {
						item.room_list.forEach((room, row_index) => {
							difference = this.roomDifference(room);
							if (difference && room.quoted_price_room_id != null && (room.settlement_comments == null || room.settlement_comments == '')) this.adddifferenceerrormsg(1, item.date, row_index + 1);
							if (difference && room.quoted_price_room_id == null && (room.settlement_comments == null || room.settlement_comments == '')) this.addnewitemhasnocommments(1, item.date, row_index + 1);
						});
						let newitem = item.room_list.filter(w => w.quoted_price_room_id == null && w.settlement_itemname == '');
						if (newitem.length > 0) {
							newitem.forEach((room, row_index) => {
								this.addnewitemerrormsg(1, item.date, row_index + 1);
							});
						}
					}
				});
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
				0 // 杂项小计
			];
			let subtotal_1 = price[0].subtotal;
			let subtotal_2 = price[1].subtotal;
			this.info.settlement_sheet_conference.forEach((item, index) => {
				if (!subtotal_1[`sub_${index}`]) subtotal_1[`sub_${index}`] = 0;
				if (!subtotal_2[`sub_${index}`]) subtotal_2[`sub_${index}`] = 0;
				item.conference_list.forEach(itemc => {
					let itemcp = positiveFloatSix(itemc.price) * positiveFloat(itemc.count);
					let itemcpset = positiveFloatSix(itemc.settlement_price) * positiveFloat(itemc.settlement_count) ;
					// let itemcpset = positiveFloatSix(itemc.settlement_price) * positiveFloat(itemc.settlement_count);
					subtotal_1[`sub_${index}`] += itemcp;
					price[0].all += itemcp;
					subtotal_2[`sub_${index}`] += itemcpset;
					price[1].all += itemcpset;
				});
			});
			this.meetingcidental.forEach(item => {
				
				let itemcp = positiveFloatSix(item.price) * positiveFloat(item.count);
				price[1].all += itemcp;
				price[2] += itemcp;
			});
			return price;
		},
		//会场差异标记
		conferenceDifference: () => {
			return function(item) {
				return positiveFloatSix(item.price) !== positiveFloatSix(item.settlement_price) 
								|| positiveFloat(item.count) !== positiveFloat(item.settlement_count)
								|| (!item.quoted_price_conference_id && item.settlement_comments == '');
			};
		},
		//保存时验证会场数据
		checkConferenceDifference: function() {
			let difference = false;
			if (this.info.settlement_sheet_conference && this.info.settlement_sheet_conference.length > 0) {
				this.info.settlement_sheet_conference.forEach(item => {
					if (item.conference_list && item.conference_list.length > 0) {
						item.conference_list.forEach((conference, row_index) => {
							difference = this.conferenceDifference(conference);
							if (difference && conference.quoted_price_conference_id != null && (conference.settlement_comments == null || conference.settlement_comments == '')){
								this.adddifferenceerrormsg(2, item.date, row_index + 1);
							}
							if (difference && conference.quoted_price_conference_id == null && (conference.settlement_comments == null || conference.settlement_comments == '')){
								this.addnewitemhasnocommments(2, item.date, row_index + 1);
							}
						});
						let newitem = item.conference_list.filter(w => w.quoted_price_conference_id == null && w.settlement_itemname == '');
						if (newitem.length > 0) {
							newitem.forEach((conference, row_index) => {
								this.addnewitemerrormsg(2, item.date, row_index + 1);
							});
						}
					}
				});
			}
		},
		// 餐饮价格计算
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
				0 // 杂项小计
			];
			let subtotal_1 = price[0].subtotal;
			let subtotal_2 = price[1].subtotal;
			this.info.settlement_sheet_food.forEach((item, index) => {
				if (!subtotal_1[`sub_${index}`]) subtotal_1[`sub_${index}`] = 0;
				if (!subtotal_2[`sub_${index}`]) subtotal_2[`sub_${index}`] = 0;
				item.food_list.forEach(itemc => {
					let itemcp = positiveFloatSix(itemc.price) * positiveFloat(itemc.personcount);
					let itemcpset = positiveFloatSix(itemc.settlement_unitprice) * positiveFloat(itemc.settlement_count);
					subtotal_1[`sub_${index}`] += itemcp;
					price[0].all += itemcp;
					subtotal_2[`sub_${index}`] += itemcpset;
					price[1].all += itemcpset;
				});
			});
			this.foodincidental.forEach(item => {
				let itemcp = positiveFloatSix(item.price) * positiveFloat(item.count);
				price[1].all += itemcp;
				price[2] += itemcp;
			});
			return price;
		},
		//餐饮差异标记
		foodDifference() {
			return function(item) {
				return positiveFloatSix(item.price) !== positiveFloatSix(item.settlement_unitprice) 
								|| positiveFloat(item.personcount) !== positiveFloat(item.settlement_count)
								|| (!item.quoted_price_food_id && item.settlement_comments == '')

			};
		},
		//保存时验证餐饮数据
		checkFoodDifference: function() {
			let difference = false;
			if (this.info.settlement_sheet_food && this.info.settlement_sheet_food.length > 0) {
				this.info.settlement_sheet_food.forEach(item => {
					if (item.food_list && item.food_list.length > 0) {
						item.food_list.forEach((food, row_index) => {
							difference = this.foodDifference(food);
							if (difference && food.quoted_price_food_id != null && (food.settlement_comments == null || food.settlement_comments == '')) this.adddifferenceerrormsg(3, item.date, row_index + 1);
							if (difference && food.quoted_price_food_id == null && (food.settlement_comments == null || food.settlement_comments == '')) this.addnewitemhasnocommments(3, item.date, row_index + 1);
						});
						let newitem = item.food_list.filter(w => w.quoted_price_food_id == null && w.settlement_itemname == '');
						if (newitem.length > 0) {
							newitem.forEach((food, row_index) => {
								this.addnewitemerrormsg(3, item.date, row_index + 1);
							});
						}
					}
				});
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
				0 // 杂项小计
			];
			let subtotal_1 = price[0].subtotal;
			let subtotal_2 = price[1].subtotal;
			this.info.settlement_sheet_transportation.forEach((item, index) => {
				if (!subtotal_1[`sub_${index}`]) subtotal_1[`sub_${index}`] = 0;
				if (!subtotal_2[`sub_${index}`]) subtotal_2[`sub_${index}`] = 0;
				item.transportation_list.forEach(itemc => {
					let itemcp = positiveFloatSix(itemc.unitprice) * positiveFloat(itemc.passengercount);
					let itemcpset = positiveFloatSix(itemc.settlement_unitprice) * positiveFloat(itemc.settlement_count);
					subtotal_1[`sub_${index}`] += itemcp;
					price[0].all += itemcp;
					subtotal_2[`sub_${index}`] += itemcpset;
					price[1].all += itemcpset;
				});
			});
			this.intercitytrafficincidental.forEach(item => {
				let itemcp = positiveFloatSix(item.price) * positiveFloat(item.count);
				price[1].all += itemcp;
				price[2] += itemcp;
			});
			return price;
		},
		//大交通差异标记
		transportationDifference() {
			return function(item) {
				return (
					positiveFloatSix(item.unitprice) !== positiveFloatSix(item.settlement_unitprice) 
					|| positiveFloat(item.passengercount) !== positiveFloat(item.settlement_count)
					|| (!item.quoted_price_transportation_id && item.settlement_comments == '')

				);
			};
		},
		//保存时验证大交通数据
		checkTransportationDifference: function() {
			let difference = false;
			if (this.info.settlement_sheet_transportation && this.info.settlement_sheet_transportation.length > 0) {
				this.info.settlement_sheet_transportation.forEach(item => {
					if (item.transportation_list && item.transportation_list.length > 0) {
						item.transportation_list.forEach((transportation, row_index) => {
							difference = this.transportationDifference(transportation);
							if (difference && transportation.quoted_price_transportation_id != null && (transportation.settlement_comments == null || transportation.settlement_comments == '')){
								this.adddifferenceerrormsg(4, item.date, row_index + 1);
							}
							if (difference && transportation.quoted_price_transportation_id == null && (transportation.settlement_comments == null || transportation.settlement_comments == '')){
								this.addnewitemhasnocommments(4, item.date, row_index + 1);
							}
						});
						let newitem = item.transportation_list.filter(w => w.quoted_price_transportation_id == null && w.settlement_itemname == '');
						if (newitem.length > 0) {
							newitem.forEach((transportation, row_index) => {
								this.addnewitemerrormsg(5, item.date, row_index + 1);
							});
						}
					}
				});
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
				0 // 杂项小计
			];
			let subtotal_1 = price[0].subtotal;
			let subtotal_2 = price[1].subtotal;
			this.info.settlement_sheet_car.forEach((item, index) => {
				if (!subtotal_1[`sub_${index}`]) subtotal_1[`sub_${index}`] = 0;
				if (!subtotal_2[`sub_${index}`]) subtotal_2[`sub_${index}`] = 0;
				item.car_list.forEach(itemc => {
					let itemcp = positiveFloatSix(itemc.price) * positiveFloat(itemc.carcount);
					let itemcpset = positiveFloatSix(itemc.settlement_unitprice) * positiveFloat(itemc.settlement_count);
					subtotal_1[`sub_${index}`] += itemcp;
					price[0].all += itemcp;
					subtotal_2[`sub_${index}`] += itemcpset;
					price[1].all += itemcpset;
				});
			});
			this.carincidental.forEach(item => {
				let itemcp = positiveFloatSix(item.price) * positiveFloat(item.count);
				price[1].all += itemcp;
				price[2] += itemcp;
			});
			return price;
		},
		//市内交通差异标记
		carDifference() {
			return function(item) {
				return positiveFloatSix(item.price) !== positiveFloatSix(item.settlement_unitprice) 
								|| positiveFloat(item.carcount) !== positiveFloat(item.settlement_count)
								|| (!item.quoted_price_car_id && item.settlement_comments == '')

			};
		},
		//保存时验证市内交通数据
		checkCarDifference: function() {
			let difference = false;
			if (this.info.settlement_sheet_car && this.info.settlement_sheet_car.length > 0) {
				this.info.settlement_sheet_car.forEach(item => {
					if (item.car_list && item.car_list.length > 0) {
						item.car_list.forEach((car, row_index) => {
							difference = this.carDifference(car);
							if (difference && car.quoted_price_car_id != null && (car.settlement_comments == null || car.settlement_comments == '')) this.adddifferenceerrormsg(5, item.date, row_index + 1);
							if (difference && car.quoted_price_car_id == null && (car.settlement_comments == null || car.settlement_comments == '')) this.addnewitemhasnocommments(5, item.date, row_index + 1);
						});
						let newitem = item.car_list.filter(w => w.quoted_price_car_id == null && w.settlement_itemname == '');
						if (newitem.length > 0) {
							newitem.forEach((car, row_index) => {
								this.addnewitemerrormsg(4, item.date, row_index + 1);
							});
						}
					}
				});
			}
		},
		// 其他价格计算
		otherPrice() {
			let price = [
				0, //原总价格
				0, //结算价格
				0 // 杂项小计
			];
			this.info.settlement_sheet_other.forEach((item, index) => {
				let itemcp = positiveFloatSix(item.price) * positiveFloat(item.offerservicedaycount) * positiveFloat(item.offerparticipatecount);
				let itemcpset = positiveFloatSix(item.settlement_unitprice) * positiveFloat(item.settlement_count);
				price[0] = price[0] + itemcp;
				price[1] = price[1] + itemcpset;
			});
			this.otherincidental.forEach(item => {
				let itemcp = positiveFloatSix(item.price) * positiveFloat(item.count);
				price[1] = price[1] + itemcp;
				price[2] = price[2] + itemcp;
			});
			return price;
		},
		//其他差异标记
		otherDifference() {
			return function(item) {
				return (
					positiveFloatSix(item.price) !== positiveFloatSix(item.settlement_unitprice) ||
					positiveFloat(item.offerservicedaycount) * positiveFloat(item.offerparticipatecount) !== positiveFloat(item.settlement_count)
					|| (!item.quoted_price_other_id && item.settlement_comments == '')

				);
			};
		},
		//保存时验证其他服务数据
		checkOtherDifference: function() {
			let difference = false;
			if (this.info.settlement_sheet_other && this.info.settlement_sheet_other.length > 0) {
				this.info.settlement_sheet_other.forEach((item, row_index) => {
					difference = this.otherDifference(item);
					if (difference && (item.settlement_comments == null || item.settlement_comments == '')) this.adddifferenceerrormsg(6, null, row_index + 1);
				});
			}
		},
		// 服务费
		servicePrice() {
			let price = [
				0, //原总价格
				0 //结算价格
			];
			price[0] =
				positiveFloatSix(this.info.advance_amount) * positiveFloatSix(this.info.advance_proportion / 100) +
				positiveFloatSix(this.info.travelagency_payment_money) * positiveFloatSix(this.info.travelagency_payment_proportion / 100) +
				positiveFloatSix(this.info.off_hotel_expenses) * positiveFloatSix(this.info.off_hotel_proportion / 100);
			price[1] =
				positiveFloatSix((positiveFloatSix(this.info.settlement_advance_amount) * this.info.settlement_advance_proportion) / 100) +
				this.InTheHotelMoney * positiveFloatSix(this.info.settlement_travelagency_payment_proportion / 100) +
				this.OutsideTheHotelMoney * positiveFloatSix(this.info.settlement_off_hotel_proportion / 100);
				
			this.info.feizhicai_service=price[1]
			this.info.taxation=0
			return price;
		},
		// 总价格除vat 服务费总价格
		price_no() {
			let price = [
				0, //原总价格
				0 //结算价格
			];
			price[0] = this.roomPrice[0].all*this.roomOut + this.conferencePrice[0].all*this.conferenceOut + this.foodPrice[0].all*this.foodOut;
			price[1] = this.roomPrice[1].all*this.roomSettlementOut + this.conferencePrice[1].all*this.conferenceSettlementOut + this.foodPrice[1].all*this.foodSettlementOut
			this.info.settlement_total_amount = price[1] || 0
			return price;
		},
		// 总价格
		price() {
			let price = [
				0, //原总价格
				0 //结算价格
			];
			price[0] =
				// this.roomPrice[0].all +
				// this.conferencePrice[0].all +
				// this.foodPrice[0].all +
				// this.intercitytrafficPrice[0].all +
				// this.carPrice[0].all +
				// this.otherPrice[0] +
				this.price_no[0] + this.servicePrice[0] + positiveFloatSix(((this.price_no[0] + this.servicePrice[0]) * positiveFloat(this.info.taxrate)) / 100);

			this.info.settlement_total_amount =
				// this.roomPrice[1].all +
				// this.conferencePrice[1].all +
				// this.foodPrice[1].all +
				// this.intercitytrafficPrice[1].all +
				// this.carPrice[1].all +
				// this.otherPrice[1] +
				this.price_no[1] + this.servicePrice[1] + positiveFloatSix(((this.price_no[1] + this.servicePrice[1]) * positiveFloat(this.info.settlement_taxrate)) / 100);
			price[1] = this.info.settlement_total_amount;
			return price;
		},
		// 酒店内费用 客房费用+会场费用+酒店内餐饮费用
		InTheHotelMoney() {
			let InhotelMoney = 0;
			this.info.settlement_sheet_food.forEach(item => {
				item.food_list.forEach(item => {
					if (item.addresstype == 0) {
						InhotelMoney += positiveFloatSix(item.settlement_unitprice) * positiveFloat(item.settlement_count);
					}
				});
			});
			//餐饮酒店内杂费
			let incidental = 0;
			this.foodincidental.forEach(item => {
				let itemcp = positiveFloatSix(item.price) * positiveFloat(item.count);
				if (!item.isnotservice) {
					//酒店内
					incidental += itemcp;
				}
			});
			return (
				this.roomPrice[1].all + this.conferencePrice[1].all + InhotelMoney + incidental //this.foodPrice[2]
			);
		},
		// 酒店外费用 交通费用+用车费用+酒店外餐饮费用+其他服务费用（不包括全陪，地接）
		OutsideTheHotelMoney() {
			let OutsidehotelMoney = 0;
			this.info.settlement_sheet_food.forEach(item => {
				item.food_list.forEach(item => {
					if (item.addresstype == 1) {
						OutsidehotelMoney += positiveFloatSix(item.settlement_unitprice) * positiveFloat(item.settlement_count);
					}
				});
			});
			let otherAllMoney = 0;
			this.info.settlement_sheet_other.forEach(item => {
				if (item.islocalguide != 1) {
					otherAllMoney += positiveFloatSix(item.settlement_unitprice) * positiveFloat(item.settlement_count);
				}
			});
			// 其他服务杂费
			let otherPrice = 0;
			this.otherincidental.forEach(item => {
				let itemcp = positiveFloatSix(item.price) * positiveFloat(item.count);
				if (!item.isnotservice) {
					//计入服务费
					otherPrice += itemcp;
				}
			});
			//大交通杂费
			this.intercitytrafficincidental.forEach(item => {
				let itemcp = positiveFloatSix(item.price) * positiveFloat(item.count);
				if (!item.isnotservice) {
					//计入服务费
					otherPrice += itemcp;
				}
			});
			//餐饮酒店外杂费
			this.foodincidental.forEach(item => {
				let itemcp = positiveFloatSix(item.price) * positiveFloat(item.count);
				if (item.isnotservice) {
					//酒店外
					otherPrice += itemcp;
				}
			});
			return (
				this.intercitytrafficPrice[1].all -
				this.intercitytrafficPrice[2] + //大交通合计-城际杂项小计
				this.carPrice[1].all +
				OutsidehotelMoney +
				//this.foodPrice[2] +
				otherAllMoney +
				otherPrice
			);
		}
	},
	methods: {
		guid,
		positiveInteger,
		positiveFloat,
		positiveFloatOne,
		positiveFloatSix,
		formatNum,
		excelExport,
		limitsEffect,
		changekefang(id, room) {
			let filter = this.roomcostProjects.filter(ele => {
				return ele.code == id;
			})
			room.settlement_itemname = filter[0].name;
		},
		changehuichang(id, conference) {
			let filter = this.meetingcostProjects.filter(ele => {
				return ele.code == id;
			})
			conference.settlement_itemname = filter[0].name;
		},
		changehotelnei(id, food) {
			let filter = this.foodcostProjects.filter(ele => {
				return ele.code == id;
			})
			food.settlement_itemname = filter[0].name;
		},
		openAddSettle() {
			this.cost_project_load = true;

			let startDate = moment(this.info.event_startdate).subtract(3, 'days').format('YYYY-MM-DD');
			let endDate = moment(this.info.event_enddate).add(1, 'days').format('YYYY-MM-DD');
			let timeRange = getBetweenDate(startDate, endDate);
			this.costDates = [];
			timeRange.forEach((item, index) => {
				this.costDates.push({
					value: item,
					label: item
				});
			});

			this.changeProjectClass();
			
			this.addSettleShow = true;
		},
		changecostProject() {
			if(this.addSettleInfo.costProject == 'zafei') {
				this.needCostDate = false;
				this.addSettleRules.costDate[0].required = false;
			}else {
				this.needCostDate = true;
				this.addSettleRules.costDate[0].required = true;
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
				}
			};
			
			if(this.addSettleInfo.projectClass == '009') {
				this.needCostDate = false;
			}else {
				this.needCostDate = true;
			}
			this.cost_project_load = true;

			let cpRep = await this.$api
				.getCostProjects(
					{
						code: this.addSettleInfo.projectClass
					},
					'POST'
				);
			
			this.cost_project_load = false;

			
			this[SettleEnum[this.addSettleInfo.projectClass].selects] = cpRep.map(item => {
				item.value = item.code;
				item.label = item.name;
				return item;
			});
		
			this.costProjects = cpRep.map(item => {
				item.value = item.code;
				item.label = item.name;
				return item;
			});
			

			this.costProjects.push({label: '杂费', value: 'zafei'});

			this.addSettleInfo.costProject = this.costProjects[0].value;
				
		},
		initCostProject() {
			this.$api.getCostProjects(
				{
					code: ''
				},
				'POST'
			).then(res => {
				let roomcostProjects = res.filter(item => { return item.event_dictionary_code == '0034'});
				let meetingcostProjects = res.filter(item => { return item.event_dictionary_code == '0049'});
				let foodcostProjects = res.filter(item => { return item.event_dictionary_code == '0050'});
				let otherfoodcostProjects = res.filter(item => { return item.event_dictionary_code == '0051'});
				let transportationcostProjects = res.filter(item => { return item.event_dictionary_code == '003'});
				let carcostProjects = res.filter(item => { return item.event_dictionary_code == '006'});
				let othercostProjects = res.filter(item => { return item.event_dictionary_code == '009'});

				this.roomcostProjects = roomcostProjects.map(item => {item.label = item.name; item.value = item.code; return item});
				this.meetingcostProjects = meetingcostProjects.map(item => {item.label = item.name; item.value = item.code; return item});
				this.foodcostProjects = foodcostProjects.map(item => {item.label = item.name; item.value = item.code; return item});
				this.otherfoodcostProjects = otherfoodcostProjects.map(item => {item.label = item.name; item.value = item.code; return item});
				this.transportationcostProjects = transportationcostProjects.map(item => {item.label = item.name; item.value = item.code; return item});
				this.carcostProjects = carcostProjects.map(item => {item.label = item.name; item.value = item.code; return item});
				this.othercostProjects = othercostProjects.map(item => {item.label = item.name; item.value = item.code; return item});

			});
			
		},
		addSettle() {
			let self = this;

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
				
				
			};

			const costProjectEnem = {
				'0034' : 1,
				'0049': 2,
				'0050': 3,
				'0051': 7,
				'003': 4,
				'006': 5,
				'009': 6
			};

			this.$refs.addSettleInfo.validate((valid) => {
				if (valid) {
					let enumObj = SettleEnum[this.addSettleInfo.projectClass];
					if(enumObj) {
						this[enumObj.selects] = [...this.costProjects];

						if(this.addSettleInfo.costProject == 'zafei') {
							this.addOther(costProjectEnem[this.addSettleInfo.projectClass]);
						}else {
							if(this.info[enumObj.dataList] && this.info[enumObj.dataList].length) {
								// 有分类
								if(this.addSettleInfo.projectClass == '009') {
									// 如果是“其他服务”
									this[enumObj.addDataBlock](filterDate[0], true);
								}else {
									// 常规类型
									let filterDate = this.info[enumObj.dataList].filter(item => {
										return this.addSettleInfo.costDate == moment(item.date).format('YYYY-MM-DD')
									});
									if(filterDate && filterDate.length) {
										// 日期相同
										this[enumObj.addDataBlock](filterDate[0], true);
									}else {
										this[enumObj.addBusinessBlock](true);
									}
								}
							}else {
								this[enumObj.addBusinessBlock](true);
							}
						}
						
						
					}
					this.addSettleShow = false;
				}
			})
		},
		excelDownload() {
			//导出excel
			this.orderIDList.push(this.info.orderform_id);
			var name="结算单"+this.info.num
			this.excelExport('/SettlementSheet/ExportExcel1',{orderIDList:this.orderIDList},name)
		},
		// 上传文件
		handleChangeAttach(file, fileList, type) {
			const isLt30M = file.size / 1024 / 1024 < 30;
			
			if (!this.limitsEffect(file)) {
				//后缀名不符合的在文件列表中删除该文件
				this.arrayList.forEach((item, index) => {
					if (type == item.type) this.$refs.upload[index].handleRemove(file, fileList, type);
				});
				return;
			}
			if (!isLt30M) {
				this.$message.error('上传附件大小不能超过 30MB!');
				// 取消时在文件列表中删除该文件
				this.arrayList.forEach((item, index) => {
					if (type == item.type) this.$refs.upload[index].handleRemove(file, fileList, type);
				});
				return;
			}
			this.arrayList.forEach((e, index) => {
				if (type == e.type) {
					e.fileList = fileList;
				}
			});
			this.initFileRename();
		},
		handleRemoveAttach(file, fileList, type) {
			this.arrayList.forEach((e, index) => {
				if (type == e.type) {
					e.fileList = fileList;
				}
			});
			this.initFileRename();
			//console.log(this.fileList);
		},
		handlePreview(file) {
			debugger
			if(!file.url) return;
			// 获取文件后缀名
			let suffix = file.url.substring(file.url.lastIndexOf(".")+1)
			// doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
			let types1 = ['pdf','jpeg','jpg','png','txt'];
			let types2 = ['docx','doc','xls','xlsx','xlsm','ppt','pptx'];
			file.url = file.url.replace(/http:/, 'https:');
			this.downloadUrl= file.url
			if(types2.includes(suffix)){
				this.downloadUrl= 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(file.url)
			}else if(types1.includes(suffix)){
				this.downloadUrl= file.url
			}else{
				this.$message.info('文件格式不支持预览，下载后查看')
			}
			// this.downloadUrl= 'https://view.xdocin.com/view?src=' + encodeURIComponent(file.url)
			setTimeout(() => {
				this.$refs.a_click.click();
			}, 100);
		},
		// handlePreview(file) {
		// 	file.url = file.url.replace(/http:/, 'https:');
		// 	this.downloadUrl=file.url
		// 	setTimeout(() => {
		// 		this.$refs.a_click.click();
		// 	}, 100);
		// },
		//给每个文件添加重命名按钮
		initFileRename() {
			var _this = this;
			//在dom元素加载完毕后调用
			this.$nextTick(() => {
				var list = document.getElementsByClassName('el-upload-list__item-name') || null;
				Array.from(list).forEach((element, index, array) => {
					var text = element.innerText;
					if (!element.getElementsByTagName('span')[0]) {
						//创建重命名按钮
						element.innerHTML += "<span style='color:#199ED8;cursor: pointer;'>重命名</span>";
					}
					//添加点击事件
					element.getElementsByTagName('span')[0].addEventListener('click', function(ev) {
						ev.stopPropagation(); //阻止事件冒泡，父级元素，a标签就不会触发事件
						_this.rename = true;
						_this.fileName = text.slice(0, text.lastIndexOf('.'));
						_this.suffix = text.slice(text.lastIndexOf('.'));
						/* var node=document.getElementsByClassName('el-upload-list__item');
							node.forEach(e=>{
								console.log(e)
							}) */
		
						console.log(element.getElementsByTagName('span')[0].parentNode.parentNode.parentNode);
					});
				});
			});
		},
		fileRename(file, index, file_index) {
			this.rename = true;
			this.updateIndex = index;
			this.updateFileIndex = file_index;
			this.fileName = file.name.slice(0, file.name.lastIndexOf('.'));
			this.suffix = file.name.slice(file.name.lastIndexOf('.'));
		},
		//文件重命名保存
		saveFileName() {
			this.arrayList[this.updateIndex].fileList[this.updateFileIndex].name = this.fileName + this.suffix; //页面文件显示名
			this.info.settlement_sheet_attach.forEach((e, i) => {
				//给已上传的文件重命名
				if (e.id == this.arrayList[this.updateIndex].fileList[this.updateFileIndex].id) {
					this.info.settlement_sheet_attach[i].filename = this.fileName + this.suffix;
				}
			});
			if (this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw) {
				//给未上传文件重命名
				const copyFile = new File([this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw], this.fileName + this.suffix, {
					// uid:this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw.uid,
					lastModified: this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw.lastModified,
					lastModifiedDate: this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw.lastModifiedDate,
					type: this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw.type
				});
				this.arrayList[this.updateIndex].fileList[this.updateFileIndex].raw = copyFile;
			}
			this.rename = false;
		},
		//删除附件
		deleteFile(file, index, file_index) {
			this.arrayList[index].fileList.splice(file_index, 1);
		},
		// 添加杂费
		addOther(type) {
			this.info.settlement_sheet_sundries.push({
				id: this.guid(),
				type,
				price: 0, //单价
				count: 0, //数量
				comments: '', //结算说明
				content: '', //杂费项名称
				isnotservice: false //是否不计入服务费
			});
		},
		// 删除杂费
		delOther(key) {
			//this.info.settlement_sheet_sundries.splice(key, 1);
			this.info.settlement_sheet_sundries = this.info.settlement_sheet_sundries.filter(w => w.id != key);
		},
		// 添加客房
		async addroom(node, addBlock) {
			if(!addBlock) {
				this.addSettleInfo.projectClass = '0034';
				await this.changeProjectClass();
			}
			node.room_list.push({
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
				settlement_comments: ''
			});
		},
		findCostProjectByKey(value) {
			let filter = this.costProjects.filter(item => {
				return value == item.value;
			});
			return filter && filter.length ? filter[0] : null;
		},
		addroomBusiness(addBlock) {
			// if(!addBlock) {
			// 	this.addSettleInfo.projectClass = '0034';
			// 	this.changeProjectClass();
			// }

			this.info.settlement_sheet_room.push({
				"date": moment(this.addSettleInfo.costDate).format('YYYY/MM/DD'),
				"room_list":[
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
						settlement_comments: ''
					}
				]
			});
			this.info.settlement_sheet_room = this.info.settlement_sheet_room.sort((a, b) => {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			});
		},
		// 删除客房
		delroom(node, key) {
			node.room_list.splice(key, 1);
		},
		// 添加会场
		async addconference(node, addBlock) {
			if(!addBlock) {
				this.addSettleInfo.projectClass = '0049';
				await this.changeProjectClass();
			}
			node.conference_list.push({
				settlement_itemid: this.addSettleInfo.costProject,
				is_important: '',
				price: 0,
				count: 0,
				settlement_price: '0',
				settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
				settlement_count: '1',
				settlement_comments: ''
			});
		},
		addconferenceBusiness(addBlock) {
			// if(!addBlock) {
			// 	this.addSettleInfo.projectClass = '0049';
			// 	this.changeProjectClass();
			// }
			this.info.settlement_sheet_conference.push({
				"date": moment(this.addSettleInfo.costDate).format('YYYY/MM/DD'),
				"conference_list":[
					{
						settlement_itemid: this.addSettleInfo.costProject,
						is_important: '',
						price: 0,
						count: 0,
						settlement_price: '0',
						settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
						settlement_count: '1',
						settlement_comments: ''
					}
				]
			});

			this.info.settlement_sheet_conference = this.info.settlement_sheet_conference.sort((a, b) => {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			});
			
		},
		// 删除会场
		delconference(node, key) {
			node.conference_list.splice(key, 1);
		},
		// 添加餐饮
		async addfood(node, addBlock) {
			if(!addBlock) {
				this.addSettleInfo.projectClass = '0050';
				await this.changeProjectClass();
			}
			node.food_list.push({
				settlement_itemid: this.addSettleInfo.costProject,
				foodtypename: '',
				addresstype: '0',
				personcount: 0,
				price: 0,
				settlement_unitprice: '0',
				settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
				settlement_count: '0',
				settlement_comments: ''
			});
		},
		addfoodBusiness(addBlock) {
			// if(!addBlock) {
			// 	this.addSettleInfo.projectClass = '0050';
			// 	this.changeProjectClass();
			// }
			this.info.settlement_sheet_food.push({
				"date": moment(this.addSettleInfo.costDate).format('YYYY/MM/DD'),
				"food_list":[
					{
						settlement_itemid: this.addSettleInfo.costProject,
						foodtypename: '',
						addresstype: '0',
						personcount: 0,
						price: 0,
						settlement_unitprice: '0',
						settlement_itemname: this.findCostProjectByKey(this.addSettleInfo.costProject).label,
						settlement_count: '0',
						settlement_comments: ''
					}
				]
			});

			this.info.settlement_sheet_food = this.info.settlement_sheet_food.sort((a, b) => {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			});
		},
		// 删除餐饮
		delfood(node, key) {
			node.food_list.splice(key, 1);
		},
		// 添加大交通
		addstransportation(node) {
			node.transportation_list.push({
				joinname: '',
				passengercount: 0,
				unitprice: 0,
				settlement_unitprice: '0',
				settlement_itemname: '',
				settlement_count: '0',
				settlement_comments: ''
			});
		},
		// 删除大交通
		delstransportation(node, key) {
			node.transportation_list.splice(key, 1);
		},
		// 添加市内交通
		addcar(node) {
			node.car_list.push({
				purposename: '',
				carcount: 0,
				price: 0,
				settlement_unitprice: '0',
				settlement_itemname: '',
				settlement_count: '0',
				settlement_comments: ''
			});
		},
		// 删除市内交通
		delcar(node, key) {
			node.car_list.splice(key, 1);
		},
		submit() {
			//表单验证
			if (!this.validate()) {
				return;
			}
			if (!this.arrayList[0].fileList.length && !this.arrayList[1].fileList.length && !this.arrayList[2].fileList.length && !this.arrayList[3].fileList.length) {
				this.$message.error('请上传酒店住宿发票+小联、酒店餐饮发票+小联、酒店会场发票+小联、其他');
				return;
			}
			//确认结算单后，上传供应商发票及账单，结算单状态不变
			if (this.info.settlement_status != this.status_confirm) this.info.settlement_status = this.status_tobeconfirmed;

			this.save();
		},
		draft() {
			//表单验证
			if (!this.validate()) {
				return;
			}
			if (!this.arrayList[0].fileList.length && !this.arrayList[1].fileList.length && !this.arrayList[2].fileList.length && !this.arrayList[3].fileList.length) {
				this.$message.error('请上传酒店住宿发票+小联、酒店餐饮发票+小联、酒店会场发票+小联、其他');
				return;
			}
			//确认结算单后，上传供应商发票及账单，结算单状态不变
			this.info.settlement_status = this.status_draft;
			this.save();
		},
		differenceShowErrorMessage: function() {
			let html = '';
			this.errormsg.forEach(msg => {
				html += "<p style='padding:5px;'>" + msg + '</p>';
			});
			this.$message({ message: html, dangerouslyUseHTMLString: true, type: 'error', lockScroll: false });
		},
		validate: function() {
			this.errormsg = [];
			this.checkRoomDifference;
			this.checkConferenceDifference;
			this.checkFoodDifference;
			this.checkTransportationDifference;
			this.checkCarDifference;
			this.checkOtherDifference;

			if (this.errormsg.length > 0) this.differenceShowErrorMessage();
			return this.errormsg.length == 0;
		},
		// 保存
		save() {
			//客户驳回结算单,清空结算单id
			if (this.info.pre_settlement_status === this.status_reject) this.info.settlement_sheet_id = null;
			
			
			
			this.info.settlement_voucher = this.arrayList[0].remark; //住宿发票说明
			this.info.settlement_contract = this.arrayList[1].remark; //餐饮发票说明
			this.info.settlement_waterbill = this.arrayList[2].remark; //会场发票说明
			this.info.settlement_other = this.arrayList[3].remark; //其他说明
			this.info.settlement_invoice = this.arrayList[4].remark; //供应商发票说明
			let urlsList = [
				{ urLs: [] },
				{ urLs: [] },
				{ urLs: [] },
				{ urLs: [] },
				{ urLs: [] }
			];
			//组装本次上传数据
			urlsList.forEach((itemc, indexc) => {
				if (this.arrayList[indexc]) {
					let thisfileList = this.arrayList[indexc].fileList.filter(w => w.uid != '');
					if (this.arrayList[indexc].fileList.length > 0)
						this.arrayList[indexc].fileList.forEach(item => {
							itemc.urLs.push({
								key: item.uid,
								file: item.raw
							});
						});
				}
			});
			upload(urlsList[0].urLs)
				.then(res => {
					//验证已上传文件是否被删除
					if (this.info.settlement_sheet_attach && this.info.settlement_sheet_attach.length > 0) {
						this.info.settlement_sheet_attach.forEach(item => {
							if (this.arrayList[0].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[0].type) item.delete = true;
						});
					}
					res.forEach(item => {
						if (item) {
							this.info.settlement_sheet_attach.push({
								filetype: this.arrayList[0].type,
								filepath: item.FilePath,
								filename: item.OriginalFileName
							});
						}
					});
			
					return upload(urlsList[1].urLs);
				})
				.then(res => {
					//验证已上传文件是否被删除
					if (this.info.settlement_sheet_attach && this.info.settlement_sheet_attach.length > 0) {
						this.info.settlement_sheet_attach.forEach(item => {
							if (this.arrayList[1].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[1].type) item.delete = true;
						});
					}
					res.forEach(item => {
						if (item) {
							this.info.settlement_sheet_attach.push({
								filetype: this.arrayList[1].type,
								filepath: item.FilePath,
								filename: item.OriginalFileName
							});
						}
					});
					return upload(urlsList[2].urLs);
				})
				.then(res => {
					//验证已上传文件是否被删除
					if (this.info.settlement_sheet_attach && this.info.settlement_sheet_attach.length > 0) {
						this.info.settlement_sheet_attach.forEach(item => {
							if (this.arrayList[2].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[2].type) item.delete = true;
						});
					}
					res.forEach(item => {
						if (item) {
							this.info.settlement_sheet_attach.push({
								filetype: this.arrayList[2].type,
								filepath: item.FilePath,
								filename: item.OriginalFileName
							});
						}
					});
					return upload(urlsList[3].urLs);
				})
				.then(res => {
					//验证已上传文件是否被删除
					if (this.info.settlement_sheet_attach && this.info.settlement_sheet_attach.length > 0) {
						this.info.settlement_sheet_attach.forEach(item => {
							if (this.arrayList[3].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[3].type) item.delete = true;
						});
					}
					res.forEach(item => {
						if (item) {
							this.info.settlement_sheet_attach.push({
								filetype: this.arrayList[3].type,
								filepath: item.FilePath,
								filename: item.OriginalFileName
							});
						}
					});
					return upload(urlsList[4].urLs);
				})
				.then(res => {
					//验证已上传文件是否被删除
					if (this.info.settlement_sheet_attach && this.info.settlement_sheet_attach.length > 0) {
						this.info.settlement_sheet_attach.forEach(item => {
							if (this.arrayList[4].fileList.filter(w => w.id == item.id).length == 0 && item.filetype == this.arrayList[4].type) item.delete = true;
						});
					}
					res.forEach(item => {
						if (item) {
							this.info.settlement_sheet_attach.push({
								filetype: this.arrayList[4].type,
								filepath: item.FilePath,
								filename: item.OriginalFileName
							});
						}
					});

					// 排序
					if(this.info.settlement_sheet_room) {
						this.info.settlement_sheet_room.forEach(item => {
							for(let i=0; i<item.room_list.length; i++) {
								item.room_list[i].indexs = i + 1;
							}
						})
					}
					if(this.info.settlement_sheet_conference) {
						this.info.settlement_sheet_conference.forEach(item => {
							for(let i=0; i<item.conference_list.length; i++) {
								item.conference_list[i].indexs = i + 1;
							}
						})
					}
					if(this.info.settlement_sheet_food) {
						this.info.settlement_sheet_food.forEach(item => {
							for(let i=0; i<item.food_list.length; i++) {
								item.food_list[i].indexs = i + 1;
							}
						})
					}

					
					

					return this.$api.settlementsheetSave(this.info, 'POST');
				}).then(res => {
					if (res) {
						this.$message({
							message: '保存成功！',
							type: 'success'
						});
						this.$router.push({
							name: 'orderInfo_Hotel',
							params: {
								id: this.info.orderform_id
							}
						});
					} else {
						this.$message({
							message: '保存失败！',
							type: 'error'
						});
					}
				});
			
		
		},
		initVat(){
			this.info.taxlist.forEach((item, i) => {
				if(item.id==this.info.roomtaxid){
					this.roomOut=item.outtaxrate;
					this.roomOutMsg = item.taxname;
				}
				if(item.id==this.info.conferencetaxid){
					this.conferenceOut=item.outtaxrate
					this.conferenceOutMsg = item.taxname;
				}
				if(item.id==this.info.foodtaxid){
					this.foodOut=item.outtaxrate;
					this.foodOutMsg = item.taxname;
				}

				if(item.id==this.info.settlement_roomtaxid){
					this.roomSettlementOut=item.outtaxrate;
				}
				if(item.id==this.info.settlement_conferencetaxid){
					this.conferenceSettlementOut=item.outtaxrate;
				}
				
				if(item.id==this.info.settlement_foodtaxid){
					this.foodSettlementOut=item.outtaxrate;
				}
			});
			
		},
		roomVat(e) {
			this.info.taxlist.forEach((item, i) => {
				if(item.id==e){
					this.roomSettlementOut=item.outtaxrate
				}
			});
			this.info.roomtaxid=e
		},
		conferenceVat(e) {
			this.info.taxlist.forEach((item, i) => {
				if(item.id==e){
					this.conferenceSettlementOut=item.outtaxrate
				}
			});
			this.info.conferencetaxid=e
		},
		foodVat(e) {
			this.info.taxlist.forEach((item, i) => {
				if(item.id==e){
					this.foodSettlementOut=item.outtaxrate
				}
			});
			this.info.foodtaxid=e
		},
		initInfo() {
			this.info.settlement_sheet_room.forEach((item, index) => {
				item.room_list.forEach(itemc => {
					if (!itemc.settlement_sheet_room_id) {
						//设置默认值，结算金额，数量默认为报价金额，数量
						itemc.settlement_unitprice = positiveFloatSix(itemc.unitprice);
						if(this.info.is_Inside_outside == '0') {
							itemc.settlement_count = itemc.provide_count;
							itemc.settlement_inside_roomcount = 0;
							itemc.settlement_outside_roomcount = itemc.provide_count;
						}
						if(this.info.is_Inside_outside == '1') {
							itemc.settlement_count = itemc.provide_count;
							itemc.settlement_inside_roomcount = itemc.inside_roomcount;
							itemc.settlement_outside_roomcount = itemc.outside_roomcount;
						}

					}
				});
			});
			this.info.settlement_sheet_conference.forEach((item, index) => {
				item.conference_list.forEach(itemc => {
					if (!itemc.settlement_sheet_conference_id) {
						//设置默认值，结算金额，数量默认为报价金额，数量
						itemc.settlement_price = positiveFloatSix(itemc.price);
						itemc.settlement_count = positiveFloat(itemc.count);
					}
				});
			});
			this.info.settlement_sheet_food.forEach((item, index) => {
				item.food_list.forEach(itemc => {
					if (!itemc.settlement_sheet_food_id) {
						//设置默认值，结算金额，数量默认为报价金额，数量
						itemc.settlement_unitprice = positiveFloatSix(itemc.price);
						itemc.settlement_count = positiveFloat(itemc.personcount);
					}
				});
			});
			
			// if (this.info.id == null) {
			// 	//设置默认值，结算金额，比例默认为报价金额，比例
			// 	this.info.settlement_advance_amount = this.info.quoted_travelagency_payment_money;
			// 	this.info.settlement_advance_proportion = this.info.quoted_travelagency_payment_proportion;
			// 	if (!this.info.settlement_advance_amount) {
			// 		//结算直采金额
			// 		this.info.settlement_advance_amount = 0;
			// 	}
			// 	if (!this.info.settlement_advance_proportion) {
			// 		//结算直采比例
			// 		this.info.settlement_advance_proportion = 0;
			// 	}
			// }
			// if (this.info.orderstatus == '0020-1') {
			// 	this.showPriceInfo = false;
			// }
		}
	},
	mounted() {
		this.initCostProject();
		this.$api
			.settlementsheetInfo(
				{
					id: this.$route.params.id
				},
				'POST'
			)
			.then(res => {
				this.info = res;
				this.initVat();
				this.initInfo();
				if (this.info.settlement_sheet_attach && this.info.settlement_sheet_attach.length > 0) {
					this.info.settlement_sheet_attach.forEach(item => {
						this.arrayList.forEach((e, i) => {
							if (item.filetype == e.type) {
								this.arrayList[i].fileList.push({
									id: item.id,
									uid: '',
									name: item.filename,
									url: this.info.domain + item.filepath
								});
							}
						});
					});
				}
				
				this.arrayList[0].remark = this.info.settlement_voucher; //住宿发票说明
				this.arrayList[1].remark = this.info.settlement_contract; //餐饮发票说明
				this.arrayList[2].remark = this.info.settlement_waterbill; //会场发票说明
				this.arrayList[3].remark = this.info.settlement_other; //其他说明
				this.arrayList[4].remark = this.info.settlement_invoice; //供应商发票说明
				
				if(this.info.dissent_invoice){
					this.arrayList[0].dissent = this.info.dissent_voucher; //住宿发票说明
					this.arrayList[1].dissent = this.info.dissent_contract; //餐饮发票说明
					this.arrayList[2].dissent = this.info.dissent_waterbill; //会场发票说明
					this.arrayList[3].dissent = this.info.dissent_other; //其他说明
					this.arrayList[4].dissent = this.info.dissent_invoice; //供应商发票说明
				}
				
				this.initFileRename();
			});
	}
};
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
  text-align: right;
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

.add_settle {
  position: absolute;
  top: 5px;
  right: 10px;
}

//后期需要启用
// .el-message{
//   overflow-y: scroll;
// }
</style>
