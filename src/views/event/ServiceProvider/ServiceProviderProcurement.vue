<template>
  <div class="ServiceProviderProcurement" v-if="info">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>联系方式</span>
        Contact Information
      </div>
      <el-row align="middle">
        <el-col :span="8">
          <div class="grid-content bg-purple">公司：{{ compositeName }}</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content grid-content-border bg-purple">
            联系人：{{ purchase_contracts }}
          </div>
        </el-col>
        <el-col :offset="1" :span="4">
          <div class="grid-content bg-purple">手机：{{ purchase_phone }}</div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">邮箱：{{ purchase_email }}</div>
        </el-col>
        <el-col :span="1" :push="2">
          <el-button type="text" @click="editContent()">编辑</el-button>
          <el-dialog title="修改当前询价单联系方式(不更新用户信息)" :visible.sync="isOpen" width="30%">
            <el-form :model="ruleForm" :rules="rules" label-width="120px" label-position="left" class="demo-ruleForm">
              <el-form-item label="对外显示公司名" prop="companyName">
                <el-checkbox-group v-model="ruleForm.companyName" @change="change">
                  <el-checkbox :label="purchase_department"></el-checkbox>
                  <el-checkbox :label="company_name"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="联系人" prop="purchase_contracts">
                <el-input v-model="ruleForm.purchase_contracts"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="purchase_phone">
                <el-input v-model="ruleForm.purchase_phone"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="purchase_email">
                <el-input v-model="ruleForm.purchase_email"></el-input>
              </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button @click="isOpen = false">取 消</el-button>
              <el-button type="primary" @click="editSubmit()">修 改</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>发送酒店/供应商报价、结算邮件是否抄送询价人：</span>
          <el-radio-group v-model="info.isCC">
            <el-radio :label="true">抄送询价人</el-radio>
            <el-radio :label="false">不抄送询价人</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" v-if="this.type == 2 || this.type == 3">
      <div slot="header" class="clearfix">
        <span>系统将会发询价单给以下会议服务商</span>
        The RFP will be sent to following properties
      </div>
      <div class="context hotelSelected">
        <div class="list">
          <div class="item" v-for="item in info.selectserviceprovider" :key="item.id">
            <!-- <div class="name">{{ item.company_name }}</div>
                        <i class="el-icon-remove-outline" @click="removeserviceprovider(item)"></i> -->
            <el-tag :closable="selectserviceproviderclosable" @close="removeserviceprovider(item)">{{ item.company_name }}</el-tag>
          </div>
        </div>
        <el-button type="primary" size="medium" @click="addaddService">添加服务商</el-button>
      </div>
    </el-card>
    <!-- <el-card class="box-card" v-if="this.type == 2 || this.type == 3">
			<div slot="header" class="clearfix">
				<span>意向酒店</span>
				Intention Hotel
			</div>
			<div class="context hotelSelected">
				<div class="list">
					<div class="item" v-for="item in info.intentionhotel" :key="item.id">
						<el-tag :closable="intentionhotelclosable" class="el-tag-hotel" @click="hotel(item)" @close="removeintentionhotel(item)">{{ item.hotelname }}</el-tag>
					</div>
				</div>
				<el-button type="primary" size="medium" @click="addIntentionHotel">添加意向酒店</el-button>
			</div>
		</el-card> -->
    <el-card class="box-card" v-if="this.type == 1">
      <div slot="header" class="clearfix">
        <span>系统将会发询价单给以下酒店（场地）销售主管</span>
        The RFP will be sent to following properties
      </div>
      <div class="context hotelSelected">
        <!-- --s-t-a-r- -->
        <div class="list">
          <div class="item item-hotel" v-for="(item, index) in info.selecthotel" :key="item.id">
            <div class="name">{{ item.hotelname }}</div>
            <div class="role role-update" v-if="item.receptionist.id != null">
              <!-- one -->
              <span class="block-span">
                酒店默认接单人: {{ item.receptionist.contacts }}
                <span class="update-span" @click="
                    (update_market = true),
                      (update_GSO = false),
                      (shade_market_order = true),
                      openRadioData(item.receptionistList, item.hotelid, index)
                  ">
                  修改>
                </span>
              </span>
            </div>
            <!--  -->
            <!-- item.receptionist.id != null -->
            <div class="role role-update" v-if="item.receptionist.id != null">
              <!-- GsoName -->
              <span class="block-span">酒店抄送（GSO）: {{ item.contactsGSO }}
                <!-- <span v-for="(item, index) in selectGsoData"
            :key="index">item.name</span> -->
                <span class="update-span" @click="
                    (update_market = true),
                      (shade_market_order = true),
                      (update_GSO = true);
                    openRadioData(item.receptionistList_, item.hotelid, index);
                  ">
                  修改>
                </span>
              </span>
            </div>
            <!--  -->
            <div class="role role-update" v-else>
              <span class="update-span" @click="
                  (update_market = true),
                    (shade_market_order = true),
                    (update_GSO = false);
                  openRadioData(item.receptionistList, item.hotelid, index);
                ">
                添加酒店接单人
              </span>
            </div>
            <!-- <div class="role role-update">
							指定酒店接单人: {{item.hotelecontacts?item.sendemail?item.hotelecontacts:'':'无联系人' }}
							<span v-if="item.hotelecontacts" class="update-span" @click="openOrderData(item, index)">{{item.sendemail?'取消选择':'选择'}}</span>
						</div> -->
            <!-- <div class="role role-update" v-else>
							<span class="update-span" @click="(update_order = true), (shade_market_order = true), openOrderData(item, index)">添加酒店接单人</span>
						</div> -->
            <!-- el-tag-hotel-del -->
            <el-tag v-if="info.selecthotel.length - 1" closable :class="
                item.receptionist.id != null ? 'gso-del' : 'el-tag-hotel-del'
              " @close="removehotel(item)"></el-tag>
          </div>
        </div>
        <!-- end -->
        <div class="hoteBtn">
          <el-button type="primary" size="medium" @click="addHotel">添加采购酒店</el-button>
        </div>
      </div>
      <div class="shade" v-if="shade_market_order"></div>
      <div class="shade-top" v-if="shade_hint"></div>
      <div class="market" v-if="update_market || update_order">
        <!-- <div></div> -->
        <div class="market-child">
          <div class="market-child-div">
            <span v-if="update_GSO"> 酒店抄送（GSO） </span>
            <span v-else>
              <!-- {{ update_market ? "酒店集团销售" : "酒店接单人" }} -->
              酒店接单人
            </span>
          </div>
          <div class="market-child-second">
            <span v-if="update_GSO">
              选择酒店抄送（GSO）后，此人将会来处理该订单
            </span>
            <span v-else>
              选择酒店接单人后，此人将会来处理该订单
              <!-- {{
                update_market
                  ? "添加酒店集团销售后，此订单生成后也将发送短信和邮件给此人"
                  : "选择酒店接单人后，此人将会来处理该订单"
              }} -->
            </span>
          </div>
        </div>
        <div class="market-table">
          <!--  -->
          <div v-if="update_GSO">
            <div class="header">
              <div class="header-f" v-if="update_market">
                共
                <span class="header-f-span">{{ tableGsoData.length }}</span>
                位酒店抄送（GSO）
              </div>
              <div class="header-f" v-else>
                共
                <span class="header-f-span">{{ orderData.length }}</span>
                位酒店抄送（GSO）可供选择
              </div>
              <div v-if="update_market" class="header-s" @click="(insert_contact = true), (update_market = false)">
                新增联系人
              </div>
            </div>
            <!-- 2222 -->
            <el-table :data="update_market ? tableGsoData : orderData" height="170" style="width: 100%" :show-header="false" @selection-change="handleSelectionChange">
              <el-table-column label="" width="50" type="selection"></el-table-column>
              <el-table-column prop="name" width="120"></el-table-column>
              <el-table-column prop="phone" width="130"></el-table-column>
              <el-table-column prop="email" width="180"></el-table-column>
              <el-table-column prop="modifier" width="180"></el-table-column>
              <el-table-column v-if="update_market" width="250">
              </el-table-column>
            </el-table>
            <!-- 2222 -->
          </div>
          <div v-else>
            <div class="header">
              <div class="header-f" v-if="update_market">
                共
                <span class="header-f-span">{{ tableData.length }}</span>
                位酒店接单人
              </div>
              <div class="header-f" v-else>
                共
                <span class="header-f-span">{{ orderData.length }}</span>
                位酒店接单人可供选择
              </div>
              <div v-if="update_market" class="header-s" @click="(insert_contact = true), (update_market = false)">
                新增联系人
              </div>
            </div>
            <!--  -->
            <el-table :data="update_market ? tableData : orderData" height="170" style="width: 100%" :show-header="false">
              <el-table-column label="" width="50">
                <template slot-scope="scope">
                  <el-radio v-if="update_market" :label="info.selecthotel[hotelindex].receptionist.id" v-model="scope.row.id" @click.native.prevent="
                      onRadioChange(scope.$index + 1, scope.row)
                    ">
                    {{ hidden }}
                  </el-radio>
                  <!-- <el-radio
									v-else
									:label="true"
									v-model="info.selecthotel[hotelindex].sendemail"
									@click.native.prevent="onRadioOrderChange(scope.$index + 1, scope.row)"
								>
									{{ hidden }}
								</el-radio> -->
                </template>
              </el-table-column>
              <el-table-column prop="contacts" width="120"></el-table-column>
              <el-table-column prop="telephone" width="130"></el-table-column>
              <el-table-column prop="email" width="180"></el-table-column>
              <el-table-column prop="remarks" width="180"></el-table-column>
              <el-table-column v-if="update_market" width="250">
                <template slot-scope="scope" v-if="update_GSO == false">
                  <div>
                    <span class="table-update" @click="
                        (update_contact = true),
                          (update_market = false),
                          update(scope.$index, scope.row)
                      ">修改</span>
                    <span class="table-cen">|</span>
                    <span class="table-delete" @click="
                        (delete_contact = true),
                          (shade_hint = true),
                          delete_table(scope.$index, scope.row.id)
                      ">删除</span>
                    <span class="table-default" v-if="scope.row.isdefault">默认联系人</span>
                    <span class="table-default set-default" v-else @click="
                        (set_default = true),
                          (shade_hint = true),
                          setDefault(scope.$index + 1, scope.row)
                      ">
                      设为默认联系人
                    </span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!--  -->
          </div>
          <!--  -->
          <div class="foot">
            <el-button type="primary" @click="
                (update_market = false),
                  (shade_market_order = false),
                  (update_order = false)
              ">确定</el-button>
          </div>
        </div>
      </div>
      <div class="contact" v-if="update_contact || insert_contact">
        <div class="contact-header">
          <span v-if="update_GSO">
            {{ insert_contact ? "新增酒店抄送（GSO）" : "编辑酒店抄送（GSO）" }}
          </span>
          <span v-else>
            {{ insert_contact ? "新增酒店接单人" : "编辑酒店接单人" }}
          </span>
        </div>
        <div class="contact-form">
          <el-form :model="form" label-position="right" label-width="90px">
            <el-form-item label="GSO姓名:" prop="name" v-if="update_GSO">
              <el-input v-model="form.contactsGSO"></el-input>
            </el-form-item>
            <!--  -->
            <el-form-item label="RSO姓名:" prop="name" v-else>
              <el-input v-model="form.contacts"></el-input>
            </el-form-item>
            <!--  -->
            <el-form-item label="手机号:" prop="phone">
              <el-input v-model="form.telephone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="备注:" prop="remarks">
              <el-input v-model="form.remarks"></el-input>
            </el-form-item>
            <el-form-item label-width="0px">
              <el-button class="form-btn" type="info" @click="
                  (update_contact = false),
                    (insert_contact = false),
                    (update_market = true),
                    (form = { name: '', phone: '', email: '', remarks: '' })
                ">
                取消
              </el-button>
              <el-button class="form-btn" type="primary" @click="submit()">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="hint-div" v-if="hint || delete_contact || set_default">
        <div class="hint-header">提示</div>
        <div class="hint-msg">
          <div class="msg">{{ msg }}</div>
          <el-button type="primary" v-if="delete_contact || set_default" @click="
              (shade_hint = false),
                (hint = false),
                (delete_contact = false),
                (set_default = false)
            ">
            取消
          </el-button>
          <el-button type="primary" v-if="delete_contact" @click="
              (shade_hint = false),
                (hint = false),
                (delete_contact = false),
                delete_contact_hint()
            ">确定</el-button>
          <el-button type="primary" v-if="set_default" @click="
              (shade_hint = false),
                (hint = false),
                (delete_contact = false),
                (set_default = false),
                setDefaultSure()
            ">
            确定
          </el-button>
          <el-button type="primary" v-if="!set_default && !delete_contact" @click="
              (shade_hint = false), (hint = false), (delete_contact = false)
            ">确定</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix clearfix-unfold">
        <span>会议基本信息</span>
        Event Profiles
        <img @click="isUnfold = !isUnfold" v-if="!isUnfold" :src="require('@/assets/images/open.png')" width="20px" height="20px" alt="" />
        <img @click="isUnfold = !isUnfold" v-else :src="require('@/assets/images/close.png')" width="20px" height="20px" alt="" />
        <span @click="isUnfold = !isUnfold" class="unfold-span">{{
          !isUnfold ? "展开" : "收起"
        }}</span>
      </div>
      <div class="context info" v-if="isUnfold">
        <div class="item">
          <label>会议名称Event Name：</label>
          {{ info.event_name }}
        </div>
        <div class="item">
          <label>建团类型：</label>
          {{ info.tourist_group_type }}
        </div>
        <div class="item">
          <label>活动类型Event Type：</label>
          {{ info.activity_type_name }}
        </div>
        <div class="item">
          <label>Cvent号：</label>
          {{ info.cvent_no }}
        </div>
        <div class="item">
          <label>客户Consumer：</label>
          {{ info.company_name }}
        </div>
        <div class="item">
          <label>团电脑号Team No.：</label>
          {{ info.tourist_group_no }}
        </div>
        <div class="item">
          <label>服务类型Service Type：</label>
          {{ info.service_type_name }}
        </div>
        <div class="item">
          <label>会议城市City：</label>
          {{ info.event_cityname }}
        </div>
        <div class="item">
          <label>餐标限制Food Limit：</label>
          {{ info.food_limit }}
        </div>
        <div class="item">
          <label>参会人数Attendee NO.：</label>
          {{ info.attendee_no }}
        </div>
        <div class="item">
          <label>会议开始日期Start Date：</label>
          {{ info.event_startdate | date_day }}
        </div>
        <div class="item">
          <label>会议结束日期End Date：</label>
          {{ info.event_enddate | date_day }}
        </div>
        <div class="item">
          <label>PR ：</label>
          {{ info.pr }}
        </div>
        <div class="item">
          <label>会议总预算Total Budget：</label>
          {{ info.total_budget }}
        </div>
        <div class="item">
          <label>会议IDEvent ID：</label>
          {{ info.event_info_id }}
        </div>
        <div class="item">
          <label>会议创建人Submitor：</label>
          {{ info.createuser_contracts }}
        </div>
        <div class="item">
          <label>客户联系人Event Owner：</label>
          {{ info.customer_contacts }}
        </div>
        <div class="item">
          <label>客户所属部门Owner's Department：</label>
          {{ info.customer_department }}
        </div>
        <div class="item">
          <label>客户联系电话Owner's Phone NO.：</label>
          {{ info.customer_phone }}
        </div>
        <div class="item">
          <label>客户邮箱Owner's E-mail：</label>
          {{ info.customer_email }}
        </div>
        <div class="item">
          <label>发票类型Invoice Type：</label>
          {{ info.invoice_type }}
        </div>
        <div class="item">
          <label>是否办理免税：</label>
          {{ info.is_duty_free }}
        </div>
        <div class="item">
          <label>创建时间Create Date：</label>
          {{ info.create_date }}
        </div>
        <div class="item" style="display: flex">
          <label>附件：</label>
          <div>
            <p v-for="(item, index) in info.document_attachments_file_name_list" :key="index">
              <span @click="downloadFile(index)" style="cursor: pointer; color: #4ea9f0; margin: 0 10px">
                {{ item }}
              </span>
              <!-- <span> 上传于 {{item.create_date}}</span> -->
            </p>
          </div>
          {{ info.customer_data }}
        </div>
      </div>
    </el-card>
    <el-card class="box-card" v-if="documentVisible(info.requirements_room, 1)">
      <div slot="header" class="clearfix">
        <span>客房需求</span>
        Guest Rooms
      </div>
      <div class="context rooms">
        <div class="category_tools">
          入住起始日期 Check-in Date：{{
            info.requirements_room.startdate | date_day
          }}
          {{
            info.requirements_room.broadband_required == 1
              ? "需要有宽带"
              : "不需要宽带"
          }}
          {{
            info.requirements_room.breakfast_required == 1
              ? "需要含早餐"
              : "不需要早餐"
          }}
          <div class="category_tools_buttons">
            <el-button type="text" @click="room_selectallordeselectall(true)">全选采购</el-button>
            <el-button type="text" @click="room_selectallordeselectall(false)">全选不采购</el-button>
          </div>
        </div>
        <table>
          <thead>
            <tr class="color_2">
              <th width="110">日期</th>
              <th>双床房</th>
              <th>大床房</th>
              <th>行政房/套房</th>
              <th>总计</th>
              <th>其它要求</th>
              <th width="150">是否采购</th>
            </tr>
          </thead>
          <tbody v-for="item in info.requirements_room.list" :key="item.id">
            <tr>
              <td>{{ item.check_in_date | date_day }}</td>
              <td>{{ item.twin_bed_count }}</td>
              <td>{{ item.king_bed_count }}</td>
              <td>{{ item.superior_room_count }}</td>
              <td>{{ item.total }}</td>
              <td>{{ item.other_requirements }}</td>
              <td>
                <!-- <el-checkbox v-model="item._checked">{{ item._checked ? '采购' : '不采购' }}</el-checkbox> -->
                <el-radio-group class="radiogroup" v-model="item._checked">
                  <el-radio :label="true">采购</el-radio>
                  <el-radio :label="false">不采购</el-radio>
                </el-radio-group>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>
    <el-card class="box-card" v-if="documentVisible(info.requirements_conference, 2)">
      <div slot="header" class="clearfix category_tools">
        <span>会场需求</span>
        Conference Rooms
        <div class="category_tools_buttons">
          <el-button type="text" @click="conference_selectallordeselectall(true)">全选采购</el-button>
          <el-button type="text" @click="conference_selectallordeselectall(false)">全选不采购</el-button>
        </div>
      </div>
      <div class="context Conference">
        <table v-for="conference_item in info.requirements_conference" :key="conference_item.id">
          <thead>
            <tr class="color_2">
              <th style="text-align: left" width="230">
                {{ conference_item.date | date_day }}
              </th>
              <th></th>
              <th width="150">是否采购</th>
            </tr>
          </thead>
          <tbody v-for="item in conference_item.list" :key="item.id">
            <tr>
              <td>
                {{ item.item }}
                <br />
                {{ item.related_information }}
              </td>
              <td style="text-align: left; line-height: 40px">
                <p>
                  Setting Times: {{ item.conference_date | date_day }}
                  {{ item.starttime }} - {{ item.conference_date | date_day }}
                  {{ item.endtime }}
                  <span style="color: #000000; font-size: 14px" v-if="item.type == 1">{{ item.attendees }}人，{{
                      item.roomsetuptypename
                    }}，会场面积范围:{{ item.min_area }}~{{
                      item.max_area
                    }}
                    sqm</span>
                </p>
                <p v-if="item.describe">Setting Note : {{ item.describe }}</p>
                <p v-if="item.type == 1">Setting Note : {{ item.equipment }}</p>
              </td>
              <td>
                <!-- <el-checkbox v-model="item._checked">{{ item._checked ? '采购' : '不采购' }}</el-checkbox> -->
                <el-radio-group class="radiogroup" v-model="item._checked">
                  <el-radio :label="true">采购</el-radio>
                  <el-radio :label="false">不采购</el-radio>
                </el-radio-group>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>
    <el-card class="box-card" v-if="documentVisible(info.requirements_food, 3)">
      <div slot="header" class="clearfix category_tools">
        <span>餐饮需求</span>
        Food & Beverage
        <div class="category_tools_buttons">
          <el-button type="text" @click="hotel_food_selectallordeselectall(true)">全选采购</el-button>
          <el-button type="text" @click="hotel_food_selectallordeselectall(false)">全选不采购</el-button>
        </div>
      </div>
      <div class="context foods">
        <table>
          <thead>
            <tr class="color_2">
              <th width="110">日期</th>
              <th>Moring Break</th>
              <th>Lunch</th>
              <th>Afternoon Break</th>
              <th>Dinner</th>
              <th>Comments</th>
              <th width="150">是否采购</th>
            </tr>
          </thead>
          <tbody v-for="item in info.requirements_food" :key="item.id">
            <tr>
              <td>{{ item.food_date | date_day }}</td>
              <td>
                {{ item.moring_break_count }}人
                <el-checkbox name="moring_break" v-model="item.moring_break_checked"></el-checkbox>
              </td>
              <!-- <td>{{ item.lunch_count }},{{ item.lunch_use_type }},{{ item.lunch_address_type == 0 ? '酒店内用餐' : '酒店外用餐' }}</td> -->
              <td>
                <div v-if="item.lunch_use_type">
                  {{ item.lunch_use_type }}，
                </div>
                {{ item.lunch_count }}人
                <el-checkbox name="lunch" v-model="item.lunch_checked"></el-checkbox>
                <span class="outsidethehotel" v-if="item.lunch_address_type == 1">酒店外</span>
              </td>
              <td>
                {{ item.afternoon_break_count }}人
                <el-checkbox name="afternoon_break" v-model="item.afternoon_break_checked"></el-checkbox>
              </td>
              <!-- <td>{{ item.dinner_count }},{{ item.dinner_use_type }},{{ item.dinner_address_type == 0 ? '酒店内用餐' : '酒店外用餐' }}</td> -->
              <td>
                <div v-if="item.dinner_use_type">
                  {{ item.dinner_use_type }}，
                </div>
                {{ item.dinner_count }}人
                <el-checkbox name="dinner" v-model="item.dinner_checked"></el-checkbox>
                <span class="outsidethehotel" v-if="item.dinner_address_type == 1">酒店外</span>
              </td>
              <td>
                <span>{{ item.comments }}</span>
              </td>
              <td>
                <!-- <el-checkbox v-model="item._checked" @change="food_checked_Change(item)">
									{{ item._checked ? '采购' : '不采购' }}</el-checkbox> -->
                <el-radio-group class="radiogroup" v-model="item._checked" @change="food_checked_Change(item)">
                  <el-radio :label="true">采购</el-radio>
                  <el-radio :label="false">不采购</el-radio>
                </el-radio-group>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>
    <!--  -->
    <el-card class="box-card" v-if="documentVisible(info.requirements_outside_food, 8)">
      <div slot="header" class="clearfix category_tools">
        <span>酒店外餐饮需求</span>
        Food & Beverage
        <div class="category_tools_buttons">
          <el-button type="text" @click="hotel_food_selectallordeselectall(true)">全选采购</el-button>
          <el-button type="text" @click="hotel_food_selectallordeselectall(false)">全选不采购</el-button>
        </div>
      </div>
      <div class="context foods">
        <table>
          <thead>
            <tr class="color_2">
              <th width="110">日期</th>
              <th>用餐时间</th>
              <th>用餐类型</th>
              <th>用餐人数</th>
              <th>需求备注</th>
              <th width="150">是否采购</th>
            </tr>
          </thead>
          <tbody v-for="item in info.requirements_outside_food" :key="item.id">
            <tr>
              <td>{{ item.food_date | date_day }}</td>
              <td>
                <span v-if="item.moring_break_count"> 早餐 </span>
                <span v-if="item.lunch_count"> 午餐 </span>
                <span v-if="item.afternoon_break_count"> 下午茶 </span>
                <span v-if="item.dinner_count"> 晚餐 </span>
              </td>
              <!-- <td>{{ item.lunch_count }},{{ item.lunch_use_type }},{{ item.lunch_address_type == 0 ? '酒店内用餐' : '酒店外用餐' }}</td> -->
              <td>
                <div v-if="item.moring_break_count">
                  {{ item.lunch_use_type }}
                </div>
                <div v-if="item.lunch_count">{{ item.lunch_use_type }}</div>
                <div v-if="item.afternoon_break_count">
                  {{ item.dinner_use_type }}
                </div>
                <div v-if="item.dinner_count">{{ item.dinner_use_type }}</div>
              </td>
              <td>
                <div v-if="item.moring_break_count">
                  {{ item.moring_break_count }} 人
                </div>
                <div v-if="item.lunch_count">{{ item.lunch_count }} 人</div>
                <div v-if="item.afternoon_break_count">
                  {{ item.afternoon_break_count }} 人
                </div>
                <div v-if="item.dinner_count">{{ item.dinner_count }} 人</div>
              </td>
              <td>
                <span>{{ item.comments }}</span>
              </td>
              <td>
                <!-- <el-checkbox v-model="item._checked" @change="food_checked_Change(item)">
									{{ item._checked ? '采购' : '不采购' }}</el-checkbox> -->
                <el-radio-group class="radiogroup" v-model="item._checked" @change="food_checked_Change(item)">
                  <el-radio :label="true">采购</el-radio>
                  <el-radio :label="false">不采购</el-radio>
                </el-radio-group>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>
    <el-card class="box-card" v-if="documentVisible(info.requirements_transportation, 4)">
      <div slot="header" class="clearfix category_tools">
        <span>大交通</span>
        Intercity Transportation
        <div class="category_tools_buttons">
          <el-button type="text" @click="transportation_selectallordeselectall(true)">全选采购</el-button>
          <el-button type="text" @click="transportation_selectallordeselectall(false)">全选不采购</el-button>
        </div>
      </div>
      <div class="context chengjijiaotong">
        <table>
          <thead>
            <tr class="color_2">
              <th width="110">日期</th>
              <th>始发地</th>
              <th>目的地</th>
              <th>交通工具</th>
              <th>搭乘人数</th>
              <th>抵达时间</th>
              <th>座位等级</th>
              <th>票价/折扣</th>
              <th>备注</th>
              <th width="150">是否采购</th>
            </tr>
          </thead>
          <tbody v-for="item in info.requirements_transportation" :key="item.id">
            <tr>
              <td>{{ item.transportation_date | date_day }}</td>
              <td>{{ item.origin_city }}</td>
              <td>{{ item.destination_city }}</td>
              <td>{{ item.trans_type }}</td>
              <td>{{ item.passenger_count }}</td>
              <td>{{ item.arrive_time }}</td>
              <td>{{ item.seat_classes }}</td>
              <td>{{ item.special_price }}</td>
              <td>{{ item.requirement }}</td>
              <td>
                <!-- <el-checkbox v-model="item._checked">{{ item._checked ? '采购' : '不采购' }}</el-checkbox> -->
                <el-radio-group class="radiogroup" v-model="item._checked">
                  <el-radio :label="true">采购</el-radio>
                  <el-radio :label="false">不采购</el-radio>
                </el-radio-group>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>
    <el-card class="box-card" v-if="documentVisible(info.requirements_car, 5)">
      <div slot="header" class="clearfix category_tools">
        <span>地面交通</span>
        City Car
        <div class="category_tools_buttons">
          <el-button type="text" @click="car_selectallordeselectall(true)">全选采购</el-button>
          <el-button type="text" @click="car_selectallordeselectall(false)">全选不采购</el-button>
        </div>
      </div>
      <div class="context chengjijiaotong">
        <table>
          <thead>
            <tr class="color_2">
              <th width="110">日期</th>
              <th>用车目的</th>
              <th>用车类型</th>
              <th>用车数量</th>
              <th>搭乘人数</th>
              <th>用车说明</th>
              <th width="150">是否采购</th>
            </tr>
          </thead>
          <tbody v-for="item in info.requirements_car" :key="item.id">
            <tr>
              <td>{{ item.car_date | date_day }}</td>
              <td>{{ item.purposename }}</td>
              <td>{{ item.vehicle_typename }}</td>
              <td>{{ item.car_count }}</td>
              <td>{{ item.vehicle_count }}</td>
              <td>{{ item.explain }}</td>
              <td>
                <!-- <el-checkbox v-model="item._checked">{{ item._checked ? '采购' : '不采购' }}</el-checkbox> -->
                <el-radio-group class="radiogroup" v-model="item._checked">
                  <el-radio :label="true">采购</el-radio>
                  <el-radio :label="false">不采购</el-radio>
                </el-radio-group>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>
    <el-card class="box-card" v-if="documentVisible(info.requirements_other, 6)">
      <div slot="header" class="clearfix category_tools">
        <span>其它服务</span>
        Other service
        <div class="category_tools_buttons">
          <el-button type="text" @click="other_selectallordeselectall(true)">全选采购</el-button>
          <el-button type="text" @click="other_selectallordeselectall(false)">全选不采购</el-button>
        </div>
      </div>
      <div class="context chengjijiaotong">
        <table>
          <thead>
            <tr class="color_2">
              <th>类型名称</th>
              <th>参与人数</th>
              <th>服务天数</th>
              <th>描述</th>
              <th width="150">是否采购</th>
            </tr>
          </thead>
          <tbody v-for="item in info.requirements_other" :key="item.id">
            <tr>
              <td>{{ item.order_name }}</td>
              <td>{{ item.participate_count }}</td>
              <td>{{ item.service_day_count }}</td>
              <td>{{ item.describe }}</td>
              <td>
                <!-- <el-checkbox v-model="item._checked">{{ item._checked ? '采购' : '不采购' }}</el-checkbox> -->
                <el-radio-group class="radiogroup" v-model="item._checked">
                  <el-radio :label="true">采购</el-radio>
                  <el-radio :label="false">不采购</el-radio>
                </el-radio-group>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>
    <el-card class="box-card" v-if="documentVisible(null, 7)">
      <div slot="header" class="clearfix">
        <span>旅行社代付</span>
        Paying Agent
      </div>
      <div class="context chengjijiaotong">
        <table>
          <thead>
            <tr class="color_2">
              <th>旅行社代付</th>
              <th width="150">是否采购</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>本会中酒店部分订单需要旅行社代付</td>
              <td>
                <!-- <el-checkbox v-model="info.travelagency_payment">{{ '采购' }}</el-checkbox> -->
                <el-radio-group class="radiogroup" v-model="info.travelagency_payment">
                  <el-radio :label="true">采购</el-radio>
                  <el-radio :label="false">不采购</el-radio>
                </el-radio-group>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>询价单补充信息</span>
        RFP Additional Information
      </div>
      <div class="context form">
        <div class="item">
          <label>附件Attachments</label>
          <div class="block">
            <el-upload ref="upload" action="" :on-change="handleChangeAttach" :on-remove="handleRemoveAttach" :auto-upload="false" :file-list="this.fileList" :multiple="false">
              <el-button slot="trigger" size="small" type="primary">从电脑选择文件</el-button>
            </el-upload>
          </div>
        </div>
        <div class="item">
          <label>会议日期是否接受调整</label>
          <div class="block">
            <el-checkbox v-model="info.isadjustdate">日期可以调整My Event Dates Are Flexible</el-checkbox>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>报价方式及截止时间</span>
        Quotation Mode and Deadline
      </div>
      <div class="context form">
        <!-- <div class="item">
                    <label>竞价式询价Reverse Auction</label>
                    <div class="block">
                        <el-checkbox>使用</el-checkbox>
                    </div>
                </div> -->
        <div class="item">
          <label>报价截止日期Deadline</label>
          <div class="block">
            <el-date-picker v-model="info.end_time" type="datetime" placeholder="选择报价截止日期" :picker-options="pickerOptions"></el-date-picker>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>其它需求信息或者注意事项</span>
        Additional Comments
      </div>
      <div class="context form">
        <el-input type="textarea" v-model="info.other"></el-input>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="context btn">
        <el-button type="primary" @click="save">提交询价单</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import upload from "@/utils/upload";
/**
 * @page 酒店采购
 */
export default {
  data() {
    return {
      type: null, //酒店采购1,服务商采购(含酒店)2,服务商采购（不含酒店）3；
      info: null,
      pickerOptions: {
        disabledDate: this.disabledDate,
      },
      fileList: [],
      update_market: false, //酒店集团销售弹窗显示、隐藏
      shade_market_order: false, //遮罩层显示、隐藏
      update_contact: false, //编辑酒店集团销售弹框显示、隐藏
      delete_contact: false, //删除酒店集团销售弹框显示、隐藏
      insert_contact: false, //新增酒店集团销售弹框显示、隐藏
      update_order: false, //酒店接单人弹框显示、隐藏，此字段已废弃
      set_default: false,
      hint: false, //消息提示弹窗显示、隐藏
      shade_hint: false, //遮罩层显示、隐藏
      tableData: [],
      orderData: [],
      form: {
        contacts: "",
        contactsGSO: "张三",
        telephone: "",
        email: "",
        remarks: "",
      },
      msg: "", //提示消息
      index: null,
      radio: "",
      radioOrder: "",
      hidden: "",
      val: "",
      row: null,
      radioName: null,
      orderName: null,
      hotelid: "",
      radioIndex: 0,
      id: 0,
      score: 1,

      hotelindex: 0,
      isOpen: false, //修改联系方式弹框显示、隐藏
      rules: {
        //校验
        purchase_contracts: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        purchase_phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
        purchase_email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
        ],
        companyName: [
          {
            type: "array",
            required: true,
            message: "请选择一个公司名称",
            trigger: "change",
          },
        ],
      },
      ruleForm: {
        purchase_contracts: "",
        purchase_phone: "",
        purchase_email: "",
        companyName: [], //默认勾选
      },
      compositeName: "", //展示公司名，合并后
      compositeName2: "", //修改公司名时，中间参数
      purchase_department: "", //公司名，合并前
      company_name: "", //公司名，合并前
      purchase_contracts: "", //联系人
      purchase_phone: "", //联系人电话
      purchase_email: "", //联系人邮箱
      isUnfold: false, //会议基本信息，默认收起
      update_GSO: false,
      gainGso: [],
      tableGsoData: [],
      selectGsoData:[],
      GsoName:''
    };
  },
  computed: {
    room_selectallordeselectall: () => {
      return function (selectordeselect) {
        this.info.requirements_room.list.forEach((item) => {
          item._checked = selectordeselect;
        });
      };
    },
    conference_selectallordeselectall: () => {
      return function (selectordeselect) {
        this.info.requirements_conference.forEach((conference_item) => {
          conference_item.list.forEach((item) => {
            item._checked = selectordeselect;
          });
        });
      };
    },
    hotel_food_selectallordeselectall: () => {
      return function (selectordeselect) {
        this.info.requirements_food.forEach((item) => {
          item._checked = selectordeselect;
        });
      };
    },
    // others_food_selectallordeselectall:()=>{
    // 	return function(selectordeselect){
    // 		this.info.requirements_food.forEach(item => {
    // 					item._checked =selectordeselect;
    // 			});
    // 	}
    // },
    transportation_selectallordeselectall: () => {
      return function (selectordeselect) {
        this.info.requirements_transportation.forEach((item) => {
          item._checked = selectordeselect;
        });
      };
    },
    car_selectallordeselectall: () => {
      return function (selectordeselect) {
        this.info.requirements_car.forEach((item) => {
          item._checked = selectordeselect;
        });
      };
    },
    other_selectallordeselectall: () => {
      return function (selectordeselect) {
        this.info.requirements_other.forEach((item) => {
          item._checked = selectordeselect;
        });
      };
    },
    selectserviceproviderclosable: function () {
      return this.info.selectserviceprovider.length > 1;
    },
    intentionhotelclosable: function () {
      return true; //this.info.intentionhotel.length > 1
    },
    selecthotelclosable: function () {
      return this.info.selecthotel.length > 1;
    },
    //客房需求是否显示
    documentVisible: () => {
      //type:住房需求1、会场需求2、餐饮需求3、大交通4、地面交通5、其他服务需求6、旅行社代付7
      return function (data, visibleType) {
        let visible = false;
        //酒店采购不显示(大交通4、地面交通5、其他服务需求6、旅行社代付7) ;
        if (this.type == 1 && visibleType > 3) return visible;
        if (visibleType != 1 && data && data.length > 0) visible = true;
        else {
          if (data && data.list && data.list.length > 0) visible = true;
        }

        return visible;
      };
    },
    IsCheck: function () {
      for (let i = 0; i < this.info.requirements_room.list.length; i++) {
        if (this.info.requirements_room.list[i]._checked) return true;
      }
      for (let i = 0; i < this.info.requirements_conference.length; i++) {
        for (
          let j = 0;
          j < this.info.requirements_conference[i].list.length;
          j++
        ) {
          if (this.info.requirements_conference[i].list[j]._checked)
            return true;
        }
      }
      for (let i = 0; i < this.info.requirements_food.length; i++) {
        if (this.info.requirements_food[i].lunch_checked) return true;
        if (this.info.requirements_food[i].afternoon_break_checked) return true;
        if (this.info.requirements_food[i].dinner_checked) return true;
      }
      for (let i = 0; i < this.info.requirements_transportation.length; i++) {
        if (this.info.requirements_transportation[i]._checked) return true;
      }
      for (let i = 0; i < this.info.requirements_car.length; i++) {
        if (this.info.requirements_car[i]._checked) return true;
      }
      for (let i = 0; i < this.info.requirements_other.length; i++) {
        if (this.info.requirements_other[i]._checked) return true;
      }
      return false;
    },
  },
  methods: {
    sortByOrderName(arrays) {
      return arrays.sort((item) => {
        return item.order_name;
      });
    },
    //修改选中酒店集团销售
    openRadioData(list, hotel_id, index) {
      // debugger
      console.log(list, hotel_id, index);
      this.radioIndex = index;
      if (this.update_GSO == true) {
        // debugger
        // GSO的人员列表
        if (list) {
          this.tableGsoData = list;
        }
      } else if (this.update_GSO == false) {
        // RSO（酒店默认接待人的列表）
        this.tableData = list;
      }
      // 可以用hotel_id
      this.hotelid = hotel_id;

      this.hotelindex = index;
    },
    openOrderData(item, index) {
      console.log(item.sendemail);
      this.orderData = [
        {
          contacts: item.hotelecontacts,
          email: item.hotelemail,
          telephone: item.hoteletelephone,
          sendemail: item.sendemail,
        },
      ];
      this.hotelindex = index;
      this.info.selecthotel[this.hotelindex].sendemail =
        !this.info.selecthotel[this.hotelindex].sendemail;
    },
    onRadioChange(e, row) {
      // 处理总数据
      console.log(this.update_GSO, row);
      this.info.selecthotel.forEach((value, index) => {
        // debugger;
        if (this.radioIndex == index) {
          // debugger;
          if (
            value.receptionist.id != null &&
            value.receptionist.id == row.id
          ) {
            value.receptionist.id = null;
            if (this.update_GSO) {
              value.receptionist.contactsGSO = null;
            } else {
              value.receptionist.contacts = null;
            }
            value.receptionist.email = null;
            value.receptionist.telephone = null;
            value.receptionist.hotel_id = null;
            value.receptionist.isdefault = null;
          } else {
            value.receptionist.id = row.id;
            if (this.update_GSO) {
              value.receptionist.contactsGSO = row.contactsGSO;
            } else {
              value.receptionist.contacts = row.contacts;
            }
            value.receptionist.email = row.email;
            value.receptionist.telephone = row.telephone;
            value.receptionist.hotel_id = row.hotel_id;
            value.receptionist.isdefault = row.isdefault;
          }
        }
      });
    },
    /* onRadioOrderChange(e, row) {
			this.info.selecthotel[this.hotelindex].sendemail = !this.info.selecthotel[this.hotelindex].sendemail;
		}, */
    setDefault(e, row) {
      this.val = e;
      this.row = row;
      this.msg = "确定要将该RSO设为默认联系人？";
    },
    //酒店集团销售设置默认联系人
    setDefaultSure() {
      this.requestApi({
        url: '/hotel/receptionistSave',
        method: 'POST',
        data: {
          id: this.row.id,
          hotel_id: this.row.hotel_id,
          isdefault: 1,
        },
      }).then((res) => {
        if (res) {
          this.$message({
            message: "修改默认联系人成功",
            type: "success",
          });
          this.onRadioChange(this.val, this.row);
          this.init();
        } else {
          this.$message.error("修改默认联系人失败，请重新修改默认联系人");
        }
      });
    },
    update(index, val) {
      this.form = JSON.parse(JSON.stringify(val));
      this.index = JSON.parse(JSON.stringify(index));
    },
    delete_table(index, id) {
      this.index = JSON.parse(JSON.stringify(index));
      this.msg = "确定要删除该RSO?";
      this.id = JSON.parse(JSON.stringify(id));
    },
    //删除酒店集团销售
    delete_contact_hint() {
      this.shade_hint = false;
      this.requestApi({
        url: '/hotel/receptionistDelete',
        method: 'POST',
        data: {
          id: this.id,
        },
      }).then((res) => {
        if (res) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.tableData.splice(this.index, 1);
        } else {
          this.$message.error("删除失败，请重新删除");
        }
      });
    },
    submit() {
      // 此处根据update_GSO判断是GSO还是RSO
      console.log(this.update_GSO);
      var form = this.form;
      var telStr = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      var emailStr = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/; ///^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var emailStrSecond =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!form.contacts || !form.telephone || !form.email) {
        if (this.update_GSO) {
          if (!form.contactsGSO) {
            //校验
            this.msg = "姓名、手机、邮箱缺一不可！";
            this.hint = true;
            this.shade_hint = true;
            return;
          }
        } else {
          //校验
          this.msg = "姓名、手机、邮箱缺一不可！";
          this.hint = true;
          this.shade_hint = true;
          return;
        }
      } else if (!telStr.test(form.telephone)) {
        this.msg = "请输入正确的手机号";
        this.hint = true;
        this.shade_hint = true;
        return;
      } else if (
        !emailStr.test(form.email) /*|| !emailStrSecond.test(form.email)*/
      ) {
        this.msg = "邮箱格式不正确";
        this.hint = true;
        this.shade_hint = true;
        return;
      }
      if (this.update_contact) {
        //修改
        this.requestApi({
          url: '/hotel/receptionistSave',
          method: 'POST',
          data: {
            id: form.id,
            contacts: form.contacts,
            telephone: form.telephone,
            email: form.email,
            remarks: form.remarks,
          },
        }).then((res) => {
          if (res) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.init();
          } else {
            this.$message.error("修改失败，请重新修改");
          }
        });
      } else {
        //添加
        this.requestApi({
          url: '/hotel/receptionistSave',
          method: 'POST',
          data: {
            contacts: form.contacts,
            telephone: form.telephone,
            email: form.email,
            remarks: form.remarks,
            hotel_id: this.hotelid,
            isdefault: 0,
          },
        }).then((res) => {
          if (res) {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.init();
          } else {
            this.$message.error("添加失败，请重新添加");
          }
        });
      }
      this.update_contact = false;
      this.insert_contact = false;
      this.update_market = true;

      this.form = {
        contacts: "",
        telephone: "",
        email: "",
        remarks: "",
      };
    },
    // 上传文件
    handleChangeAttach(file, fileList) {
      this.fileList = fileList;
      //console.log(this.fileList)
    },
    handleRemoveAttach(file, fileList) {
      this.fileList = fileList;
      //console.log(this.fileList);
    },
    removeserviceprovider(item) {
      let index = this.info.selectserviceprovider.findIndex(
        (i) => i.id == item.id
      );
      if (index > -1) {
        this.info.selectserviceprovider.splice(index, 1);
        this.requestApi({
          url: '/procurementprocess/selectserviceprovider',
          method: 'POST',
          data: {
            serviceprovider: this.info.selectserviceprovider,
          },
        }).then((res) => {});
      }
    },
    removeintentionhotel(item) {
      console.log(item);
      let index = this.info.intentionhotel.findIndex(
        (i) => i.hotelid == item.hotelid
      );
      if (index > -1) {
        this.info.intentionhotel.splice(index, 1);
        this.requestApi({
          url: '/procurementprocess/Selectintentionhotel',
          method: 'POST',
          data: {
            hotel: this.info.intentionhotel,
          },
        }).then((res) => {});
      }
    },
    removehotel(item) {
      console.log(item);
      let index = this.info.selecthotel.findIndex(
        (i) => i.hotelid == item.hotelid
      );
      if (index > -1) {
        this.info.selecthotel.splice(index, 1);
        this.requestApi({
          url: '/procurementprocess/selecthotel',
          method: 'POST',
          data: {
            hotel: this.info.selecthotel,
          },
        }).then((res) => {});
      }
    },
    hotel(item) {
      console.log(item);
      let routeData = this.$router.resolve({
        name: "hotelInfo",
        params: {
          id: item.hotelid,
        },
      });
      window.open(routeData.href, "_blank"); //跳转新页面
    },
    food_checked_Change(item) {
      console.log(item);
      item.moring_break_checked = item._checked;
      item.lunch_checked = item._checked;
      item.afternoon_break_checked = item._checked;
      item.dinner_checked = item._checked;
    },
    //报名截止日期不能早已当前日期 不能晚于会议开始日期
    disabledDate(time) {
      let _now = Date.now();
      return (
        time.getTime() < _now ||
        time.getTime() > new Date(this.info.event_startdate)
      );
    },
    addIntentionHotel() {
      this.$router.push({
        name: "addintentionhotel",
        params: {
          id: this.$route.params.id,
          city: this.info.event_city,
          type: "addintentionhotel",
        },
      });
    },
    // 下载附件
    downloadFile(index) {
      // window.open(file.file_path, "_blank");
      let a_link = document.createElement("a");
      // 这里是将url转成blob地址，
      fetch(this.info.document_attachments_file_path_list[index])
        .then((res) => res.blob())
        .then((blob) => {
          // 将链接地址字符内容转变成blob地址
          a_link.href = URL.createObjectURL(blob);
          console.log(a_link.href);
          a_link.download =
            this.info.document_attachments_file_name_list[index]; //下载的文件的名字
          document.body.appendChild(a_link);
          a_link.click();
        });
    },
    addHotel() {
      this.$router.push({
        name: "addhotelbycity",
        params: {
          id: this.$route.params.id,
          city: this.info.event_city,
          type: "addhotel",
        },
      });
    },
    addaddService() {
      this.$router.push({
        name: "addServiceProviderbycity",
        params: {
          id: this.$route.params.id,
          city: this.info.event_city,
          type: this.$route.params.type,
        },
      });
    },
    save() {
      console.log(this.info);
      if (
        (this.info.selectserviceprovider == null ||
          this.info.selectserviceprovider.length == 0) &&
        (this.info.selecthotel == null || this.info.selecthotel.length == 0)
      ) {
        this.$message({
          message: "请选择服务商或酒店",
          type: "error",
        });
        return;
      }
      if (!this.IsCheck) {
        this.$message({
          message: "请至少选择一个需求项目",
          type: "warning",
        });
        return;
      }

      if (this.info.end_time == null) {
        this.$message({
          message: "请选择截止时间",
          type: "warning",
        });
        return;
      }
      var telStr = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      var emailStr = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/; ///^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var emailStrSecond =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (
        !this.compositeName ||
        !this.purchase_contracts ||
        !this.purchase_phone ||
        !this.purchase_email
      ) {
        //校验
        this.$message.error("公司名、姓名、手机、邮箱缺一不可！");
        return;
      } else if (!telStr.test(this.purchase_phone)) {
        this.$message.error("请输入正确的手机号！");
        return;
      } else if (
        !emailStr.test(
          this.purchase_email
        ) /*|| !emailStrSecond.test(form.email)*/
      ) {
        this.$message.error("邮箱格式不正确！");
        return;
      }
      this.info.purchase_company = this.compositeName; //公司名
      this.info.purchase_contracts = this.purchase_contracts; //联系人
      this.info.purchase_phone = this.purchase_phone; //电话
      this.info.purchase_email = this.purchase_email; //邮箱
      let urls = [];
      //组装本次上传数据
      let thisfileList = this.fileList.filter((w) => w.uid != "");
      if (this.fileList.length > 0)
        thisfileList.forEach((item) => {
          urls.push({
            key: item.uid,
            file: item.raw,
          });
        });
      upload(urls)
        .then((res) => {
          //验证已上传文件是否被删除
          if (
            this.info.inquiry_sheet_attach &&
            this.info.inquiry_sheet_attach.length > 0
          ) {
            this.info.inquiry_sheet_attach.forEach((item) => {
              if (this.fileList.filter((w) => w.id == item.id).length == 0)
                item.delete = true;
            });
          }
          res.forEach((item) => {
            this.info.inquiry_sheet_attach.push({
              filetype: 1,
              filepath: item.FilePath,
              filename: item.OriginalFileName,
            });
          });
          // -------
          // debugger;
          // this.info.selecthotel[0].hotelid = "202206120001089";
          // this.info.selecthotel[0].hotel_contact = [
          //   {
          //     name: "姓名1",
          //     email: "110@yeah.net",
          //     phone: "15383923350",
          //     type: "2",
          //     is_add: "1",
          //   },
          //   {
          //     name: "姓名2",
          //     email: "120@yeah.net",
          //     phone: "15383923350",
          //     type: "2",
          //     is_add: "1",
          //   },
          // ];
          // ------
          debugger
          return this.requestApi({
            url: '/inquirysheet/send',
            method: 'POST',
            data: this.info,
          })
        })
        .then((res) => {
          if (res) {
            this.$router.push({
              name: "SendSuccess",
              params: {
                id: this.$route.params.id,
              },
            });
            // ----
          } else {
            this.requestApi({
              url: '/ResourcesApi/SynchronismInquirysheet',
              method: 'POST',
              data: res.inquirID,
            }).then((res) => {
              if (res) {
                this.$message({
                  message: "推送场地资源成功！",
                  type: "success",
                });
              } else {
                // this.$message({ message: "发送失败", type: "fail" });
                this.$message({
                  message: "推送场地资源失败！",
                  type: "fail",
                });
              }
            });
            // ----
            // this.$message({
            //   message: "推送场地资源失败！",
            //   type: "fail",
            // });
          }
        });

      // this.$api.inquirySend(this.info, "POST").then(res => {
      //     if(res)
      //         this.$router.push({ name: 'SendSuccess', params: { id: this.$route.params.id } });
      //     else
      //         this.$message({message: "发送失败",type: "fail",});
      // })
    },
    init() {
      this.info.selecthotel.forEach((value,index) => {
        this.requestApi({
          url: '/hotel/receptionistList',
          method: 'POST',
          data: {
            id: value.hotelid,
          },
        }).then((res) => {
          value["receptionistList"] = res;

          /* value.receptionistList.forEach((v)=>{
            if(v.isdefault==1){
              this.$set(value,'receptionistDefault',v.contacts)
            }
          }) */

          if (this.update_market) {
            debugger;
            if ((this.update_GSO = false)) {
              //默认接单人列表回显
              this.openRadioData(
                this.info.selecthotel[this.radioIndex].receptionistList,
                this.info.selecthotel[this.radioIndex].hotelid,
                this.radioIndex
              );
            } else if ((this.update_GSO = true)) {
              //默认接单人列表回显
              this.openRadioData(
                this.info.selecthotel[this.radioIndex].receptionistList_,
                this.info.selecthotel[this.radioIndex].hotelid,
                this.radioIndex
              );
            }
          }
          if (this.score == 1) {
            this.setDft();
          }
          this.score = 2;
        });
        //
        // debugger;
        // gso人员信息列表
        this.requestApi({
          url: '/ResourcesApi/Contacts',
          method: 'POST',
          data: {
            resourcesId: "202206120001089"
          },
        }).then((res) => {
          value["receptionistList_"] = res.gsos;
          value["contactsGSO"] = ""
        });
      });
      // gso判断是否需要gso抄送
      // this.$api
      //   .GetGSO(
      //     {
      //       id: value.hotelid,
      //     },
      //     "POST"
      //   )
      //   .then((res) => {
      //     value["isGSO"] = res;
      //     // this.gainGso.push(res);
      //     console.log(res, "何凯泽- = -");
      //   });
    },
    setDft() {
      this.info.selecthotel.forEach((value, index) => {
        value.receptionistList.forEach((v, i) => {
          if (v.isdefault == 1) {
            this.radio = i + 1;
          }
        });
        if (value.sendemail) {
          this.radioOrder = 1;
        }
      });
    },
    change(e) {
      console.log(e);
      var name1 = "";
      var name2 = "";
      var symbol = "";
      name1 = e[0] ? e[0] + "" : "";
      name2 = e[1] ? e[1] + "" : "";
      symbol = name1 && name2 ? "," : "";
      this.compositeName2 = name1 + symbol + name2;
    },
    editSubmit() {
      var telStr = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      var emailStr = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/; ///^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var emailStrSecond =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (
        !this.compositeName2 ||
        !this.ruleForm.purchase_contracts ||
        !this.ruleForm.purchase_phone ||
        !this.ruleForm.purchase_email
      ) {
        //校验
        this.$message.error("公司名、姓名、手机、邮箱缺一不可！");
        return;
      } else if (!telStr.test(this.ruleForm.purchase_phone)) {
        this.$message.error("请输入正确的手机号！");
        return;
      } else if (
        !emailStr.test(
          this.ruleForm.purchase_email
        ) /*|| !emailStrSecond.test(form.email)*/
      ) {
        this.$message.error("邮箱格式不正确！");
        return;
      }
      this.compositeName = this.compositeName2; //公司名
      this.purchase_contracts = this.ruleForm.purchase_contracts; //联系人
      this.purchase_phone = this.ruleForm.purchase_phone; //电话
      this.purchase_email = this.ruleForm.purchase_email; //邮箱
      this.isOpen = false;
    },
    editContent() {
      this.isOpen = true;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      console.log(selection,this.radioIndex,this.info.selecthotel);
      let selectData = [];
      this.info.selecthotel[this.radioIndex].contactsGSO = ""
      selection.forEach((value, index) => {
        let dataObj = {
          name: "",
          email: "",
          phone: "",
          type: "2",
          is_add:"0"
        };
        this.GsoName += value.name
        dataObj.name = value.name;
        dataObj.email = value.email;
        dataObj.phone = value.phone;
        dataObj.type = "2";
        dataObj.is_add = "0"
        selectData.push(dataObj);
        this.info.selecthotel[this.radioIndex].contactsGSO += value.name + " "
        // 先写死type 第一个为1
        selectData[0].type = '1'
        this.selectGsoData = selectData
      });
      console.log(selectData);
      debugger
      // ----------------------------
      this.info.selecthotel[this.radioIndex].hote_contact = this.selectGsoData
      console.log(this.info.selecthotel);
    },
    //
    init_() {
      // debugger;
      // this.info.selecthotel.forEach((value) => {
      //   this.$api
      //     .GetGSO(
      //       {
      //         id: value.hotelid,
      //       },
      //       "POST"
      //     )
      //     .then((res) => {
      //       this.gainGso.push(res);
      //       console.log(res, "何凯泽- = -");
      //     });
      // });
    },
  },
  mounted() {
    this.type = this.$route.params.type; //酒店采购1,服务商采购(含酒店)2,服务商采购（不含酒店）3;
    if (!this.type) this.type = 2; //默认值2
    this.requestApi({
      url: '/procurementprocess/requirementsinfo',
      method: 'POST',
      data: {
        id: this.$route.params.id,
        includinghotel: this.type,
      },
    }).then((res) => {
      // debugger
      this.info = res;
      console.log(res);
      this.compositeName = this.info.purchase_department;
      this.company_name = this.info.company_name;
      this.purchase_department = this.info.purchase_department;
      this.compositeName2 = this.info.purchase_department;
      this.ruleForm = {
        purchase_contracts: this.info.purchase_contracts,
        purchase_phone: this.info.purchase_phone,
        purchase_email: this.info.purchase_email,
        companyName: [
          //默认勾选
          this.purchase_department,
        ],
      };
      this.purchase_contracts = this.info.purchase_contracts;
      this.purchase_phone = this.info.purchase_phone;
      this.purchase_email = this.info.purchase_email;
      this.init();
      this.init_();
    });
    //
  },
};
</script>

<style lang="scss" scoped>
.ServiceProviderProcurement {
  padding: 15px;
  box-sizing: border-box;

  .box-card {
    margin-top: 15px;

    &:first-child {
      margin: 0;
    }

    .clearfix {
      color: #999999;

      span {
        font-weight: bold;
        color: #000;
      }
    }
    .clearfix-unfold {
      display: flex;
      align-items: center;
      .unfold-span {
        padding-left: 5px;
        color: #fd864b;
        cursor: pointer;
      }
    }
    .el-row {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .el-col {
      border-radius: 4px;
    }

    .grid-content {
      border-radius: 4px;
      min-height: 36px;
      line-height: 36px;
    }

    .grid-content-border {
      border-right: 1px solid #ddd;
    }

    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }

    .hotelSelected {
      .list {
        margin-bottom: 20px;

        .item-hotel {
          min-height: 118px;
        }

        .item {
          display: block;
          background: #f7fbff;
          border: 1px solid #88c6f5;
          border-radius: 4px;
          margin-right: 10px;
          min-width: 350px;
          width: 300px;
          float: left;
          padding: 5px 30px 5px 10px;
          margin-top: 10px;

          .name {
            color: #0084e9;
            font-size: 18px;
            cursor: pointer;
            max-width: 280px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .el-tag-hotel {
            cursor: pointer;
          }

          .el-tag-hotel-del {
            background-color: #f7fbff;
            border-color: #f7fbff;
            position: relative;
            top: -27px;
            right: -330px;
          }
          .gso-del {
            background-color: #f7fbff;
            border-color: #f7fbff;
            position: relative;
            top: -60px;
            right: -330px;
          }
          .role {
            .update-span {
              color: #0084e9;
              cursor: pointer;
            }

            .update-span:hover {
              color: #f91;
            }
          }

          .role-update {
            margin-top: 5px;
          }
        }
      }
    }

    .shade {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-color: rgb(119, 119, 119);
      opacity: 0.7;
      z-index: 9999;
      height: 400vh;
    }

    .shade-top {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #000;
      opacity: 0.7;
      z-index: 17000;
      height: 400vh;
    }

    .market {
      position: absolute;
      width: 910px;
      height: auto;
      top: 50%;
      left: 50%;
      z-index: 10236;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
      text-align: center;
      padding: 30px 20px;

      .market-child {
        .market-child-div {
          font-size: 20px;
          color: #000000;
        }

        .market-child-second {
          font-size: 14px;
          color: #a7a6a6;
        }
      }

      .market-table {
        .header {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #ebeef5;
          margin-top: 10px;
          padding: 10px 0 15px 0;

          .header-f {
            font-size: 14px;
            color: #282828;
            font-weight: bold;

            .header-f-span {
              color: #ff8d12;
            }
          }

          .header-s {
            color: #2896eb;
            font-size: 14px;
            cursor: pointer;
          }

          .header-s:hover {
            color: #ff8d12;
          }
        }

        .foot {
          margin-top: 20px;

          button {
            width: 120px;
          }
        }
      }
    }

    .contact {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 500px;
      transform: translate(-50%, -50%);
      z-index: 15500;
      background-color: #ffffff;
      text-align: center;
      padding: 30px 20px;

      .contact-header {
        font-size: 20px;
        color: #282828;
        border-bottom: 1px solid #ece5e5;
        margin-bottom: 20px;
        padding-bottom: 15px;
      }
    }

    .hint-div {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 400px;
      transform: translate(-50%, -50%);
      z-index: 18800;
      background-color: #ffffff;
      text-align: center;
      border-radius: 6px;

      .hint-header {
        font-size: 20px;
        color: #50505a;
        font-weight: normal;
        background: #f2f2f3;
        height: 58px;
        line-height: 58px;
        border-radius: 6px 6px 0 0;
      }

      .hint-msg {
        padding: 30px;

        .msg {
          margin-bottom: 40px;
        }

        button {
          width: 120px;
        }
      }
    }

    .info {
      .item {
        line-height: 35px;

        label {
          display: inline-block;
          width: 230px;
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
  margin-top: 15px;
  border: 1px solid #dddddd;

  tr,
  td,
  th {
    text-align: center;
    border-bottom: 1px solid #dddddd;
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
      width: 60%;
      margin: 0 10px;
    }

    span {
      color: #999999;
      font-size: 14px;
    }

    span.outsidethehotel {
      color: rgb(255, 0, 0);
      margin-left: 5px;
    }

    p {
      span {
        color: #ff9900;
        font-size: 16px;
      }
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
  }

  .color_3 {
    background-color: #e6e6e6;
  }

  .color_4 {
    background-color: #f2f2f2;
  }
}

.form {
  .item {
    display: flex;
    align-items: center;
    margin-top: 15px;

    &:first-child {
      margin: 0;
    }

    label {
      width: 200px;
    }
  }
}

.btn {
  text-align: center;
}

.table-update,
.table-delete {
  color: #2896eb;
  cursor: pointer;
}

.table-update:hover,
.table-delete:hover {
  color: #ff8d12;
}

.table-cen {
  color: #eee;
  margin-left: 10px;
  margin-right: 10px;
}

.table-default {
  margin-left: 15px;
  border: 1px solid #ffab82;
  background: #ffeae0;
  color: #ff742f;
  border-radius: 2px;
  cursor: pointer;
}

.set-default {
  opacity: 0;
}

.set-default:hover {
  opacity: 1;
}

.form-btn {
  width: 120px;
}
.radiogroup {
  display: flex;
  .el-radio {
    margin-right: 5px;
  }
}

.category_tools {
  line-height: 40px;
}
.category_tools_buttons {
  float: right;
}
.block-span {
  display: block;
  margin-top: 10px;
}
.hoteBtn {
  clear: both;
}
.el-button--medium {
  margin-top: 20px;
}
</style>
