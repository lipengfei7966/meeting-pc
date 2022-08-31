<template>
  <div class="orderInfo">
    <a v-show="false" :href="downloadUrl" target="_blank" ref="d_click" download></a>
    <div class="title">
      我的订单 -
      <template v-if="info">
        {{ info.num }}
      </template>
    </div>
    <div class="content" v-if="info">
      <div class="tips" v-if="this.info.status === '0020-1'">
        <p>订单状态：订单执行中</p>
        <p>会议进行中，请实时上传结算凭证文件！</p>
        <p>
          <el-button type="primary" @click="settlement">
            {{
              info.settlement_sheet_status === settlement_sheet_status_draft
                ? "提交结算单(草稿)"
                : "提交结算单"
            }}
          </el-button>
        </p>
      </div>
      <div class="tips" v-if="this.info.status === '0020-3'">
        <p>订单状态：已创建待执行</p>
        <p>
          请查看以下订单详情，如果客户需要使用会议室等场地，请为客户预留档期。
        </p>
        <p class="special">
          <span>如果您遇到特殊情况需要取消订单，可以点击</span>
          <el-link class="special_link" name="cancel" type="primary" @click="cancelorderform">取消订单</el-link>
          <span>并说明原委，我们将同时为您发送短信和邮件向客户致歉。</span>
        </p>
      </div>
      <div class="tips" v-else-if="this.info.status === '0020-2'">
        <p>订单状态：已取消</p>
        <p>
          {{ info.contacts }} - {{ info.company_name }} - 取消了订单 ({{
            info.activity_name
          }})
        </p>
      </div>
      <div class="tips" v-if="this.info.status === '0020-4'">
        <p>订单状态：已执行待结算</p>
        <p>
          会议服务商服务已经结束，请向客户提交结算单。结算单被确认后，您可以快递发票和结算单，以便客户付款。
        </p>
        <p>
          <el-button type="primary" @click="settlement">
            {{
              info.settlement_sheet_status === settlement_sheet_status_draft
                ? "提交结算单(草稿)"
                : "提交结算单"
            }}
          </el-button>
        </p>
      </div>
      <div class="tips" v-else-if="this.info.status === '0020-5'">
        <p>订单状态：待确认结算单</p>
        <p class="special">
          <span>已提交结算单，正在等待客户确认。 </span>

          <span>审批环节：{{ info.approval_phase }}， </span>
          <span>审批人：{{ info.approval_people }} </span>
          <!-- <span>
						如果客户长时间未确认，您可以
						<el-link class="special_link" name="remind" type="primary" @click="againform">再次提醒客户</el-link>
					</span> -->
        </p>
        <p>
          <el-button type="primary" @click="settlement">查看结算单</el-button>
        </p>
      </div>
      <div class="tips" v-else-if="this.info.status === '0020-6'">
        <p>订单状态：已确认结算单</p>
        <p>客户确认了您的结算单，您可以与客户沟通发票、付款的事宜。</p>
        <!-- <p>
          <el-button type="primary" @click="settlement">提交结算单</el-button>
        </p> -->
      </div>
      <div class="tips" v-else-if="this.info.status === '0020-7'">
        <p>订单状态：客户驳回结算单</p>
        <p>客户对结算单有异议，请查看、修改后重新移交结算单。</p>
        <p v-if="this.info.orderform_settlement_customer_objection">
          客户异议：
          <el-button type="text" @click="objectionVisible = true" style="font-size: 16px">
            查看异议
          </el-button>
          <!-- {{this.info.orderform_settlement_customer_objection}} -->
        </p>
        <p>
          <el-button type="primary" @click="settlement">提交结算单</el-button>
        </p>
      </div>
      <div class="tips" v-else-if="this.info.status === '0020-8'">
        <p>订单状态：要求补充结算单材料</p>
        <p>客户对结算单有异议，请查看、修改后重新移交结算单。</p>
        <div v-if="this.info.orderform_settlement_customer_objection">
          客户异议：
          <el-button type="text" @click="objectionVisible = true" style="font-size: 16px">
            查看异议
          </el-button>
        </div>
        <p>
          <el-button type="primary" @click="settlement">提交结算单</el-button>
        </p>
      </div>
      <!-- <div class="tips_bttton_info">
				<el-button type="primary" @click="project">{{info.project_id?"查看行程":"添加行程"}}</el-button>
			</div> -->

      <div class="diameter">
        <el-collapse accordion>
          <el-collapse-item v-for="(item, index) in select" :key="index">
            <template slot="title">
              第{{ index + 1 }}次结算记录：
              <span v-if="!item.showDetail" @click="item.showDetail = !item.showDetail">
                <i class="header-icon el-icon-caret-top"></i>

                展开
              </span>
              <span v-if="item.showDetail" @click="item.showDetail = !item.showDetail">
                <i class="header-icon el-icon-caret-bottom"></i>
                收起
              </span>
            </template>
            <div v-for="(item1, index1) in item.data" :key="index1" style="margin: 10px 0; border-bottom: 1px solid #ccc">
              <p>{{ item1.date }}</p>
              <p>{{ item1.username }} ( {{ item1.company_name }} )</p>
              <p>{{ item1.state }}</p>
              <div class="objectionDetailStyle" v-html="item1.message" @click="getImg($event)"></div>
              <!-- 附件明细 -->
              <div v-for="(files, filesIndex) in item1.array" :key="filesIndex" class="flex_row">
                <p>{{ files.name }}:</p>
                <p>
                  <span v-for="(file, fileIndex) in files.value" :key="fileIndex" class="filename" @click="handlePreview(file)">
                    {{ file.name }}
                  </span>
                </p>
              </div>
              <!-- 异议明细 -->
              <div v-for="(msg, msgIndex) in item1.dissent" :key="msgIndex" class="flex_row">
                <p>{{ msg.name }}:</p>
                <p>
                  {{ msg.value }}
                </p>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
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
            <div class="context">
              {{ info.customer_service_telephone_numbers }}
            </div>
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
        <div class="line">
          <div class="item">
            <div class="label">采购酒店</div>
            <div class="context">{{ info.hotel_name }}</div>
          </div>
        </div>
      </div>
      <div class="info" v-if="
          whetherShow.kp_notice_file == 1 ||
          whetherShow.invoice_file == 1 ||
          whetherShow.cvent_date == 1
        ">
        <div class="line">
          <div class="item" v-if="whetherShow.kp_notice_file == 1">
            <div class="label">开票通知文件</div>
            <div class="context" style="display: flex">
              <ul style="margin-right: 50px">
                <li v-for="(file, index) in fileList.kpFile" :key="index" style="margin: 10px 0">
                  <span @click="downloadFile(file)" style="color: #409eff; cursor: pointer">
                    {{ file.filename }}
                  </span>
                  <span> 上传时间： {{ file.create_time }} </span>
                </li>
              </ul>
              <el-upload ref="upload" :action="UploadFilesUrl" :on-success="uploadFile" :on-preview="downloadFile" :file-list="fileList.kpFile" :show-file-list="false" :multiple="true">
                <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
              </el-upload>
            </div>
          </div>
        </div>
        <div class="line">
          <div class="item" v-if="whetherShow.invoice_file == 1">
            <div class="label">发票附件</div>
            <div class="context">
              <ul>
                <li v-for="(file, index) in fileList.fpFile" :key="index">
                  <span @click="downloadFile(file)" style="color: #409eff; cursor: pointer">
                    {{ file.filename }}
                  </span>
                  <span> 上传时间： {{ file.create_time }} </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="item" v-if="whetherShow.cvent_date == 1">
            <div class="label">Cevent 上传完成日期</div>
            <div class="context" style="display: flex; justify-content: space-between">
              <span style="line-height: 30px"> {{ fileList.cventDate }} </span>

              <el-button slot="trigger" size="small" type="primary" @click="CeventDateDialog = true">编辑</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="line">
          <div class="item">
            <div class="label">报价人</div>
            <div class="context">{{ info.bidder }}</div>
          </div>
          <div class="item">
            <div class="label">报价时间</div>
            <div class="context">
              {{ info.offer_data | date_ex }}
            </div>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="line">
          <div class="item">
            <div class="label">历史附件</div>
            <div class="context">
              <p>客户已通过邮件发送该订单的 “询价单” 至以下人员：</p>
              <p>{{ info.mailbox }}</p>
              <p>
                <el-button type="primary" @click="quotedprice">最终报价单</el-button>
                <el-button type="primary" v-if="this.info.status === '0020-6'" @click="settlement">结算单
                </el-button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 客户需求 -->
      <div class="info">
        <div class="line">
          <div class="item">
            <div class="label need" style="width: 100%">
              客户需求
              <div class="excel">
                <a @click="excelexport" style="cursor: pointer">下载excel</a>
              </div>
            </div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">客房需求</div>
            <div class="context">
              <div class="hyxq_item" v-for="item in info.quoted_price_room" :key="item.id">
                <div class="date">
                  日期：{{ item.date | date_day }} 客房价格
                </div>
                <div class="c_item" v-for="item in item.room_list" :key="item.id">
                  {{ item.roomtypename }} {{ item.roomcount }}间
                  <span class="quotedprice">报价：￥{{ item.unitprice.toFixed(2) }}*{{
                      item.provide_count
                    }}间 ￥{{ item.totalprice.toFixed(2) }}</span>
                  <p>报价备注：{{ item.remarks }}</p>
                </div>
              </div>
              <br /><br />
              客房报价总备注：{{ info.room_remarks }}
              <br />
              客房报价小计：<span class="quotedprice">￥{{ this.allMoney.toFixed(2) }}</span>
            </div>
          </div>
          <div class="item">
            <div class="label">会议需求</div>
            <div class="context">
              <div class="hyxq_item" v-for="item in info.quoted_price_conference" :key="item.id">
                <div class="date">日期：{{ item.date | date_day }}</div>
                <div class="c_item" v-for="conference in item.conference_list" :key="conference.id">
                  <div v-if="conference.type == 1">
                    {{
                      conference.item +
                      conference.order_name +
                      conference.typename
                    }}
                    {{ conference.starttime }}-{{ conference.endtime }}
                    {{ conference.roomsetuptypename }}
                    {{ conference.attendees }} 人，会场面积范围：{{
                      conference.min_area
                    }}~{{ conference.max_area }} sqm
                    <div class="quotedprice">
                      报价：￥{{ conference.price.toFixed(2) }}
                    </div>
                    <div>报价备注:{{ conference.comments }}</div>
                  </div>
                  <div v-else-if="conference.type == 2">
                    <!-- {{conference.item+conference.order_name+conference.typename}}  -->
                    {{ conference.related_information }}
                    {{ item.date | date_day }} {{ conference.starttime }}~
                    {{ item.date | date_day }} {{ conference.endtime }}
                    <div class="quotedprice">
                      报价：￥{{ conference.price.toFixed(2) }}
                    </div>
                  </div>
                  <div v-else-if="conference.type == 3">
                    <p>
                      {{
                        conference.item +
                        conference.order_name +
                        conference.typename
                      }}: {{ conference.equipment }}
                    </p>
                    <p>
                      <span class="quotedprice">报价：￥{{ conference.price.toFixed(2) }}
                      </span>
                    </p>
                    <p>报价备注：{{ conference.comments }}</p>

                    <!-- <P>{{ conference.equipment }} 有线麦克风 {{conference.wiremicrophonecount}}个 无线麦克风
											{{conference.wirelessmicrophonecount}}个
										</P> -->
                  </div>
                  <div v-else-if="conference.type == 4">
                    <p>
                      {{
                        conference.item +
                        conference.order_name +
                        conference.quoted_name
                      }}: {{ conference.equipment }}
                    </p>
                    <p>
                      <span class="quotedprice">报价：￥{{ conference.price.toFixed(2) }}
                      </span>
                    </p>
                    <p>报价备注：{{ conference.comments }}</p>
                  </div>
                </div>
              </div>
              <br /><br />
              会场报价总备注：{{ info.conference_remarks }}
              <div class="quotedpricesum">
                会场报价小计<span class="quotedprice">￥{{
                    (this.EquipmentMoney + this.meetingMoney).toFixed(2)
                  }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">酒店内用餐需求</div>
            <div class="context">
              <div class="hyxq_item" v-for="item in info.quoted_price_food" :key="item.id">
                <div class="date">日期：{{ item.date | date_day }}</div>
                <div class="c_item" v-for="item in item.food_list" :key="item.id">
                  <span>{{ item.foodtypename }}</span>
                  {{ item.usetype ? `[${item.usetype}]` : "" }}
                  {{ item.personcount }} 人
                  <p class="quotedprice">
                    报价：￥{{ item.price.toFixed(2) }}*{{
                      item.personcount
                    }}
                    人 ￥{{
                      (item.price * item.personcount).toFixed(2)
                    }}
                    备注：{{ item.offer_remarks }}
                  </p>
                </div>
              </div>
              <br /><br />
              <div class="quotedpricesum">
                餐饮报价小计：<span class="quotedprice">￥{{ this.repastAllMoney.toFixed(2) }}</span>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="label">酒店外用餐需求</div>
            <div class="context">
              <div class="hyxq_item" v-for="item in info.quoted_price_outside_food" :key="item.id">
                <div class="date">日期：{{ item.date | date_day }}</div>
                <div class="c_item" v-for="item in item.food_list" :key="item.id">
                  <span>{{ item.foodtypename }}</span>
                  {{ item.usetype ? `[${item.usetype}]` : "" }}
                  {{ item.personcount }} 人
                  <p class="quotedprice">
                    报价：￥{{ item.price.toFixed(2) }}*{{
                      item.personcount
                    }}
                    人 ￥{{
                      (item.price * item.personcount).toFixed(2)
                    }}
                    备注：{{ item.offer_remarks }}
                  </p>
                </div>
              </div>
              <br /><br />
              <div class="quotedpricesum">
                餐饮报价小计：<span class="quotedprice">￥{{ this.otherFoodAllMoney.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">交通需求</div>
            <div class="context">
              <p class="date">大交通</p>
              <div class="hyxq_item" v-for="item in info.quoted_price_transportation" :key="item.id">
                <p class="date">日期： {{ item.date | date_day }}</p>
                <div class="c_item" v-for="item in item.transportation_list" :key="item.id">
                  {{ item.origincity }} - {{ item.destinationcity }}
                  {{ item.transtypename }}
                  {{ item.seatclassesname }}
                  {{ item.passengercount }}人
                  <p class="quotedprice">
                    报价：￥{{ item.unitprice.toFixed(2) }}*{{
                      item.passengercount
                    }}
                    人 ￥{{
                      (item.unitprice * item.passengercount).toFixed(2)
                    }}
                    备注：{{ item.offerremarks }}
                  </p>
                  <p>报价备注：{{ item.requirement }}</p>
                </div>
              </div>
              <br />
              大交通报价总备注：{{ info.transportation_remarks }} <br /><br />
              <div class="date">地面交通</div>
              <div class="hyxq_item" v-for="item in info.quoted_price_car" :key="item.id">
                <div class="date">日期：{{ item.date | date_day }}</div>
                <div class="c_item" v-for="item in item.car_list" :key="item.id">
                  <p>
                    <span>{{ item.purposename }} </span>
                    {{ item.vehicletypename }}
                    {{ item.carcount }}辆 {{ item.vehiclecount }}人
                  </p>
                  <p v-if="item.city"><span>用车城市</span> {{ item.city }}</p>

                  <p class="quotedprice">
                    报价：￥{{ item.price.toFixed(2) }}*{{ item.carcount }}辆
                    ￥{{ (item.price * item.carcount).toFixed(2) }} 备注：{{
                      item.offer_remarks
                    }}
                  </p>
                </div>
              </div>
              <br />
              地面交通报价总备注：{{ info.car_remarks }} <br /><br />
              <div class="quotedpricesum">
                交通报价小计<span class="quotedprice">￥{{
                    (
                      this.IntercityTransportationAllMoney + this.CityAllMoney
                    ).toFixed(2)
                  }}</span>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="label">其他服务</div>
            <div class="context">
              <div class="hyxq_item" v-for="item in info.quoted_price_other" :key="item.id" style="margin: 0">
                <div class="c_item" style="line-height: 25px">
                  <span>{{ item.servicetypename }}</span>
                  数量{{ item.demandparticipatecount }}
                  <p class="quotedprice">
                    报价：￥{{ item.price.toFixed(2) }} *
                    {{ item.offerparticipatecount }}
                    ￥{{
                      (
                        item.price *
                        item.offerparticipatecount *
                        item.offerservicedaycount
                      ).toFixed(2)
                    }}
                    备注：{{ item.offerremarks }}
                  </p>
                  <p>需求备注：{{ item.describe }}</p>
                  <p>报价备注：{{ item.offer_remarks }}</p>
                  <br />
                </div>
              </div>
              <br />
              其他需求报价总备注：{{ info.other_remarks }} <br /><br />
              <div class="quotedpricesum">
                其他需求报价小计<span class="quotedprice">￥{{ this.otherAllMoney.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">服务费和增值税</div>
            <div class="context">
              <p class="bold">服务费</p>
              <p>
                非直采服务费
                <span class="quotedprice">￥{{ this.serveAllMoney.toFixed(2) }}</span>
              </p>
              <p>
                直采服务费
                <span class="quotedprice">￥{{ this.AdvancesMoney.toFixed(2) }}</span>
              </p>

              <br />
              <p class="bold">税费</p>
              <p>
                <span class="quotedprice">￥{{ this.Taxes.toFixed(2) }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">总报价</div>
            <div class="context">
              <span class="quotedprice">￥{{ totalPrices.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 添加新项目 -->
      <el-dialog title="添加项目" :visible.sync="addProjectStatus" :before-close="
          (done) => {
            this.itemData = null;
            done();
          }
        " width="700px">
        <projectAdded v-if="addProjectStatus" @onColse="projectSave" :item-data="itemData" />
      </el-dialog>
      <!-- 编辑Cevent 上传完成日期 -->
      <el-dialog title="编辑 Cevent 上传完成日期" :visible.sync="CeventDateDialog" width="700px">
        <el-date-picker v-model="fileList.cventDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期时间">
        </el-date-picker>
        <div style="margin-top: 50px; text-align: center">
          <el-button @click="CeventDateDialog = false">取消</el-button>
          <el-button type="primary" @click="saveCeventDate">保存</el-button>
        </div>
      </el-dialog>

      <!-- 查看异议弹窗 -->
      <el-dialog title="审批意见" :visible.sync="objectionVisible" @open="GetSettlementObjection" :close-on-click-modal="false" width="70%" center>
        <div>
          <p>{{ objectionDetail.date }}</p>
          <p>
            {{ objectionDetail.username }} （{{
              objectionDetail.company_name
            }}）
          </p>
          <p :style="
              'color:' + (objectionDetail.state == '审核不通过' ? 'red' : '')
            ">
            {{ objectionDetail.state }}
          </p>
          <p style="margin-top: 20px">其他异议：</p>
          <div class="objectionDetailStyle" v-html="this.info.orderform_settlement_customer_objection" @click="getImg($event)"></div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="objectionVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/**
 * @page 订单详情
 */
import projectAdded from "@/components/event/project-added.vue";
import {
  positiveInteger,
  positiveFloat,
  positiveFloatSix,
  formatDate,
} from "@/utils/common";
import { limitsEffect } from "@/utils/uploadRestrictions.js";
import { MAINHOST } from "@/config";
import excelExport from "@/utils/exportexcel";
export default {
  name: "OrderInfo",
  components: {
    projectAdded,
  },
  data() {
    return {
      downloadUrl: "",
      fileList: {
        kpFile: [],
        fpFile: [],
        cventDate: "",
      },
      // 异议弹窗详情
      objectionDetail: {
        username: "", //用户名
        company_name: "", //公司名称
        date: "", //日期时间
        message: "", //异议内容
        state: "", // 状态
      },
      objectionVisible: false, // 查看异议弹窗
      select: [],
      UploadFilesUrl: MAINHOST + "/MeetingMa/UploadFiles",
      uploadList: {}, // 附件信息
      whetherShow: {
        cvent_date: 0,
        invoice_file: 0,
        kp_notice_file: 0,
      },
      info: null,
      addProjectStatus: false, // 编辑/添加开关
      CeventDateDialog: false, // 编辑Cevent上传完成日期
      itemData: null, // 单条数据
      settlement_sheet_status_draft: "0029-1",
      excelAddress:
        "" /* 'http://manger.ctgbs.com/zentao/file-download-363.html?zentaosid=e0001a6d90e967a37fa116b28170acea' */,
      totalPrices: "",
    };
  },
  computed: {
    // 一天总金额
    dayMoney: () => {
      return function (list) {
        let money = 0;
        list.forEach((item) => {
          money +=
            Number(item.provide_count) * this.positiveFloatSix(item.unitprice);
        });
        return this.positiveFloatSix(money);
      };
    },
    // 所有总价
    allMoney: function () {
      let money = 0;
      if (
        this.info.quoted_price_room &&
        this.info.quoted_price_room.length > 0
      ) {
        this.info.quoted_price_room.forEach((item) => {
          money += this.positiveFloatSix(this.dayMoney(item.room_list));
        });
      }

      return this.positiveFloatSix(money);
    },
    // 会议需求
    // 一天总金额
    meetingDayMoney: () => {
      return function (list, all) {
        let money = 0;
        list.forEach((item) => {
          money += this.positiveFloatSix(item.price);
        });
        return this.positiveFloatSix(money);
      };
    },
    // 会场报价不包含会场设备
    meetingMoney: function () {
      let money = 0;
      if (
        this.info.quoted_price_conference &&
        this.info.quoted_price_conference.length > 0
      ) {
        this.info.quoted_price_conference.forEach((item) => {
          let temp = item.conference_list.filter((w) => w.type != 3);
          money += this.meetingDayMoney(temp);
        });
      }
      return this.positiveFloatSix(money);
    },
    //会场设备报价
    EquipmentMoney: function () {
      let money = 0;
      if (
        this.info.quoted_price_conference &&
        this.info.quoted_price_conference.length > 0
      ) {
        this.info.quoted_price_conference.forEach((item) => {
          let temp = item.conference_list.filter((w) => w.type == 3);
          money += this.meetingDayMoney(temp);
        });
      }
      return this.positiveFloatSix(money);
    },
    //会场总价
    meetingAllMoney: function () {
      let money = 0;
      if (
        this.info.quoted_price_conference &&
        this.info.quoted_price_conference.length > 0
      ) {
        this.info.quoted_price_conference.forEach((item) => {
          money += this.meetingDayMoney(item.conference_list);
        });
      }
      return this.positiveFloatSix(money);
    },
    // 餐饮需求
    // 一天总金额
    repastDayMoney: () => {
      return function (list) {
        let money = 0;
        list.forEach((item) => {
          money +=
            this.positiveInteger(item.personcount) *
            this.positiveFloatSix(item.price);
        });
        return this.positiveFloatSix(money);
      };
    },
    // 所有总价
    repastAllMoney: function () {
      let money = 0;
      if (
        this.info.quoted_price_food &&
        this.info.quoted_price_food.length > 0
      ) {
        this.info.quoted_price_food.forEach((item) => {
          money += this.repastDayMoney(item.food_list);
        });
      }
      return this.positiveFloatSix(money);
    },
    // 酒店外餐饮一天总金额
    otherFoodDayMoney: () => {
      return function (list) {
        let money = 0;
        list.forEach((item) => {
          money +=
            this.positiveInteger(item.personcount) *
            this.positiveFloatSix(item.price);
        });
        return this.positiveFloatSix(money);
      };
    },
    // 酒店外餐饮所有总价
    otherFoodAllMoney: function () {
      let money = 0;
      if (
        this.info.quoted_price_outside_food &&
        this.info.quoted_price_outside_food.length > 0
      ) {
        this.info.quoted_price_outside_food.forEach((item) => {
          money += this.otherFoodDayMoney(item.food_list);
        });
      }
      return this.positiveFloatSix(money);
    },
    // 大交通需求
    // 一天总金额
    IntercityTransportationDayMoney: () => {
      return function (list) {
        let money = 0;
        list.forEach((item) => {
          money +=
            this.positiveInteger(item.passengercount) *
            this.positiveFloatSix(item.unitprice);
        });
        return this.positiveFloatSix(money);
      };
    },
    // 所有总价
    IntercityTransportationAllMoney: function () {
      let money = 0;
      if (
        this.info.quoted_price_transportation &&
        this.info.quoted_price_transportation.length > 0
      ) {
        this.info.quoted_price_transportation.forEach((item) => {
          money += this.IntercityTransportationDayMoney(
            item.transportation_list
          );
        });
      }
      return this.positiveFloatSix(money);
    },
    // 室内用车
    // 一天总金额
    CityDayMoney: () => {
      return function (item) {
        let money = 0;
        item.forEach((item) => {
          money +=
            this.positiveInteger(item.carcount) *
            this.positiveFloatSix(item.price);
        });
        return this.positiveFloatSix(money);
      };
    },
    // 所有总价
    CityAllMoney: function () {
      let money = 0;
      if (this.info.quoted_price_car && this.info.quoted_price_car.length > 0) {
        this.info.quoted_price_car.forEach((item) => {
          money += this.CityDayMoney(item.car_list);
        });
      }

      return this.positiveFloatSix(money);
    },
    // 其他服务需求
    // 所有总价
    otherAllMoney: function () {
      let money = 0;
      if (
        this.info.quoted_price_other &&
        this.info.quoted_price_other.length > 0
      ) {
        this.info.quoted_price_other.forEach((item) => {
          money +=
            this.positiveInteger(item.offerparticipatecount) *
            this.positiveInteger(item.offerservicedaycount) *
            this.positiveFloatSix(item.price);
        });
      }

      return this.positiveFloatSix(money);
    },
    // 消费总金额
    money: function () {
      this.info.total_price =
        positiveFloatSix(this.allMoney) +
        positiveFloatSix(this.meetingAllMoney) +
        positiveFloatSix(this.repastAllMoney) +
        positiveFloatSix(this.otherFoodAllMoney) +
        positiveFloatSix(this.IntercityTransportationAllMoney) +
        positiveFloatSix(this.CityAllMoney) +
        positiveFloatSix(this.otherAllMoney);
      return positiveFloatSix(this.info.total_price);
    },
    // 服务费
    // 旅行社代付金额
    TravelAgencyMoney: function () {
      return this.positiveFloatSix(
        (this.info.travelagency_payment_money *
          this.info.travelagency_payment_proportion) /
          100
      );
    },
    // 直采服务费
    AdvancesMoney: function () {
      return positiveFloatSix(
        this.positiveFloatSix(this.info.advance_amount) *
          (this.positiveFloatSix(this.info.advance_proportion) / 100)
      );
    },
    // 旅行社代付金额
    OutsideHotelMoney: function () {
      return this.positiveFloatSix(
        (this.info.off_hotel_expenses * this.info.off_hotel_proportion) / 100
      );
    },
    // 总额
    serviceAllMoney: function () {
      return positiveFloatSix(
        this.TravelAgencyMoney + this.AdvancesMoney + this.OutsideHotelMoney
      );
    },
    // 服务费总价
    serveAllMoney: function () {
      let money = 0;
      if (this.info.event_info_configure.service_fee_calculation_method == 0) {
        // 分项计费服务费算法
        money =
          this.allMoney.toFixed(2) *
            (this.info.event_info_configure.room_inquiry_service_taxrate /
              100) +
          this.meetingAllMoney.toFixed(2) *
            (this.info.event_info_configure.conference_inquiry_service_taxrate /
              100) +
          this.repastAllMoney.toFixed(2) *
            (this.info.event_info_configure.hotel_food_inquiry_service_taxrate /
              100) +
          this.otherFoodAllMoney.toFixed(2) *
            (this.info.event_info_configure
              .others_food_inquiry_service_taxrate /
              100) +
          this.IntercityTransportationAllMoney.toFixed(2) *
            (this.info.event_info_configure
              .transportation_inquiry_service_taxrate /
              100) +
          this.CityAllMoney.toFixed(2) *
            (this.info.event_info_configure.car_inquiry_service_taxrate / 100);
        this.offline_quoted_price_others.forEach((otherItem) => {
          money +=
            (otherItem.offerparticipatecount *
              otherItem.price *
              otherItem.service_taxrate) /
            100;
        });
      } else if (
        this.info.event_info_configure.service_fee_calculation_method == 1
      ) {
        // 阶梯计费服务费算法
        let totalMoney = 0;
        totalMoney += this.info.event_info_configure.room_inquiry_isnotservice
          ? this.allMoney
          : 0;
        totalMoney += this.info.event_info_configure
          .conference_inquiry_isnotservice
          ? this.meetingAllMoney
          : 0;
        totalMoney += this.info.event_info_configure
          .hotel_food_inquiry_isnotservice
          ? this.repastAllMoney
          : 0;
        totalMoney += this.info.event_info_configure
          .others_food_inquiry_isnotservice
          ? this.otherFoodAllMoney
          : 0;
        totalMoney += this.info.event_info_configure
          .transportation_inquiry_isnotservice
          ? this.IntercityTransportationAllMoney
          : 0;
        totalMoney += this.info.event_info_configure.car_inquiry_isnotservice
          ? this.CityAllMoney
          : 0;
        this.info.quoted_price_other.forEach((otherItem) => {
          totalMoney += otherItem.isnotservice
            ? otherItem.offerparticipatecount * otherItem.price
            : 0;
        });

        this.severEveryMoneyList = [];
        this.info.event_info_ladder_taxrates.forEach((item, index) => {
          if (totalMoney <= item.ladder_min) {
          } else if (
            totalMoney >= item.ladder_min &&
            totalMoney <= item.ladder_max
          ) {
            // 总价在阶梯最大值、最小值之间
            // debugger
            money +=
              ((totalMoney - item.ladder_min + (index == 0 ? 0 : 1)) *
                item.ladder_taxrate) /
              100;
            this.severEveryMoneyList.push(
              positiveFloatSix(
                ((((totalMoney - item.ladder_min + (index == 0 ? 0 : 1)) *
                  item.ladder_taxrate) /
                  100) *
                  this.info.fzc_service) /
                  100
              )
            );
          } else if (
            totalMoney > item.ladder_max &&
            this.info.event_info_ladder_taxrates[index + 1]
          ) {
            // 总价大于阶梯最大值 且还有下一阶梯
            this.severEveryMoneyList.push(
              positiveFloatSix(
                ((((item.ladder_max - item.ladder_min + (index == 0 ? 0 : 1)) *
                  item.ladder_taxrate) /
                  100) *
                  this.info.fzc_service) /
                  100
              )
            );

            money +=
              ((item.ladder_max - item.ladder_min + (index == 0 ? 0 : 1)) *
                item.ladder_taxrate) /
              100;
            // totalMoney -= item.ladder_max;
          } else if (
            totalMoney >= item.ladder_max &&
            !this.info.event_info_ladder_taxrates[index + 1]
          ) {
            // 总价大于阶梯最大值 且没有下一阶梯
            this.severEveryMoneyList.push(
              positiveFloatSix(
                ((((totalMoney - item.ladder_min + (index == 0 ? 0 : 1)) *
                  item.ladder_taxrate) /
                  100) *
                  this.info.fzc_service) /
                  100
              )
            );
            money +=
              ((totalMoney - item.ladder_min + (index == 0 ? 0 : 1)) *
                item.ladder_taxrate) /
              100;
          }
        });
      } else if (
        this.info.event_info_configure.service_fee_calculation_method == 2
      ) {
        // 跳档计费服务费算法
        let totalMoney = 0;
        totalMoney += this.info.event_info_configure.room_inquiry_isnotservice
          ? this.allMoney
          : 0;
        totalMoney += this.info.event_info_configure
          .conference_inquiry_isnotservice
          ? this.meetingAllMoney
          : 0;
        totalMoney += this.info.event_info_configure
          .hotel_food_inquiry_isnotservice
          ? this.repastAllMoney
          : 0;
        totalMoney += this.info.event_info_configure
          .others_food_inquiry_isnotservice
          ? this.otherFoodAllMoney
          : 0;
        totalMoney += this.info.event_info_configure
          .transportation_inquiry_isnotservice
          ? this.IntercityTransportationAllMoney
          : 0;
        totalMoney += this.info.event_info_configure.car_inquiry_isnotservice
          ? this.CityAllMoney
          : 0;
        this.info.quoted_price_other.forEach((otherItem) => {
          totalMoney += otherItem.isnotservice
            ? otherItem.offerparticipatecount * otherItem.price
            : 0;
        });
        this.serviceTotalMoney = totalMoney;
        for (var i = 0; i < this.info.event_info_grade_taxrates.length; i++) {
          if (
            i == this.info.event_info_grade_taxrates.length - 1 ||
            (totalMoney >= this.info.event_info_grade_taxrates[i].grade_money &&
              totalMoney <
                this.info.event_info_grade_taxrates[i + 1].grade_money)
          ) {
            money =
              (totalMoney *
                this.info.event_info_grade_taxrates[i].grade_taxrate) /
              100; // 服务费金额 = 计入服务费总价 * 对应档次 服务费比例
            this.grade_taxrate =
              this.info.event_info_grade_taxrates[i].grade_taxrate; // 设置跳档服务费收取比例
            break;
          }
        }
      }
      money *= this.info.fzc_service / 100; // 非直采服务费折扣

      // 有非直采最低服务费 并且 非直采服务费 小于 最低服务费，取值最低服务费
      if (
        this.info.event_info_configure.minimum_service_fee == 1 &&
        money < this.info.event_info_configure.minimum_service_fee_money
      ) {
        money = this.info.event_info_configure.minimum_service_fee_money;
      }

      this.info.feizhicai_service = money;

      return money;
    },
    // 税费
    Taxes: function () {
      let taxes = 0;
      if (this.info.taxtype == "VAT") {
        // debugger
        if (this.info.event_info_configure.fzc_service_fee_money) {
          // 非直采服务费计税
          taxes =
            ((this.money + this.serveAllMoney) *
              this.positiveFloatSix(this.info.taxrate)) /
            100;
        } else {
          // 非直采服务费不计税
          taxes =
            ((this.money + this.serveAllMoney - this.info.feizhicai_service) *
              this.positiveFloatSix(this.info.taxrate)) /
            100;
        }
        return taxes;
      } else {
        return (this.money + this.serveAllMoney) * 0;
      }
    },
    // 报价总额
    OrderPrice: function () {
      return this.money + this.serveAllMoney + this.AdvancesMoney + this.Taxes;
    },
  },
  methods: {
    positiveInteger,
    positiveFloat,
    positiveFloatSix,
    excelExport,
    formatDate,
    WhetherShow() {
      this.requestApi({
        url: '/InvoiceMsd/WhetherShow',
        method: 'POST',
        data: {
          OrderID: this.$route.params.id
        },
      }).then((res) => {
        this.whetherShow = res;
      });
    },
    GetSettlementObjection() {
      this.requestApi({
        url: '/SettlementData/GetSettlementObjection',
        method: 'POST',
        data: {
          OrderFromID: this.$route.params.id
        },
      }).then((res) => {
        debugger;
        this.objectionDetail = res;
      });
    },
    // 点击图片预览
    getImg($event) {
      debugger;
      console.log($event);
      console.log($event.target.currentSrc); //拿到图片的src
      let currentSrc = $event.target.currentSrc;
      let file = {
        value: currentSrc,
      };
      if (currentSrc) {
        //添加预览图片的事件
        this.$hevueImgPreview(currentSrc);
      }
    },
    // 预览附件
    handlePreview(file) {
      debugger;
      if (!file.value) return;
      // 获取文件后缀名
      let suffix = file.value.substring(file.value.lastIndexOf(".") + 1);
      // doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
      let types1 = ["pdf", "jpeg", "jpg", "png", "txt"];
      let types2 = ["docx", "doc", "xls", "xlsx", "xlsm", "ppt", "pptx"];
      file.value = file.value.replace(/http:/, "https:");
      this.downloadUrl = file.value;
      if (types2.includes(suffix)) {
        this.downloadUrl =
          "https://view.officeapps.live.com/op/view.aspx?src=" +
          encodeURIComponent(file.value);
      } else if (types1.includes(suffix)) {
        this.downloadUrl = file.value;
      } else {
        this.$message.info("文件格式不支持预览，下载后查看");
      }
      setTimeout(() => {
        this.$refs.d_click.click();
      }, 100);
    },
    ApproveRecordDownloadFile(file) {
      let a_link = document.createElement("a");
      // // 这里是将url转成blob地址，
      // fetch(downloadUrl).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
      // a_link.href = URL.createObjectURL(blob)
      a_link.href = file.value;
      // 	console.log(a_link.href)
      a_link.download = file.name; //下载的文件的名字/
      a_link.target = "_blank";
      document.body.appendChild(a_link);
      a_link.click();
      // })
    },
    //审批记录
    getSelect() {
      this.requestApi({
        url: '/MeetingMa/ApproveRecord',
        method: 'POST',
        data: {
          OrderID: this.$route.params.id
        },
      }).then((res) => {
        this.select = res;
        this.select.forEach((item) => {
          this.$set(item, "showDetail", false);
        });
      });
    },
    GetFile() {
      this.requestApi({
        url: '/InvoiceMsd/GetFile',
        method: 'POST',
        data: {
          OrderID: this.$route.params.id, // orderid 、sheet_id 传一个就可以
            SheetID: "",
        },
      }).then((res) => {
        this.fileList = res;
      });
    },
    saveCeventDate() {
      this.requestApi({
        url: '/InvoiceMsd/CventDateAdd',
        method: 'POST',
        data: {
          OrderID: this.$route.params.id,
          Datetime: this.fileList.cventDate,
        },
      }).then((res) => {
        if (res) {
          this.CeventDateDialog = false;
        }
      });
    },
    excelexport() {
      //导出excel
      var name = "DMC报价单" + this.info.event_info_id;
      // let priceSheetId = this.$route.params.id
      this.excelExport(
        "/Template/GetTemplate",
        {
          eventid: this.info.event_info_id,
          type: 3,
          param: this.info.quoted_price_id,
        },
        name
      );
    },
    // 上传文件
    uploadFile(e) {
      this.uploadList = e;
      let sendData = {
        orderid: this.$route.params.id, // orderid 、sheet_id 传一个就可以
        sheet_id: "",
        type: 1, // 1开票，2发票
        file_name: e.title,
        file_path: e.weburl,
      };
      this.requestApi({
        url: '/InvoiceMsd/FileAdd',
        method: 'POST',
        data: sendData,
      }).then((res) => {
        if (res) {
          this.$message.success("上传成功");
          this.GetFile();
        }
      });
    },
    // 下载附件
    downloadFile(file) {
      // window.open(file.file_path, "_blank");
      let url = file.file_path ? file.file_path : file.filepath;
      let name = file.file_name ? file.file_name : file.filename;
      if (!url) return;

      // 获取文件后缀名
      let suffix = url.substring(url.lastIndexOf(".") + 1);
      // doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
      let types1 = ["pdf", "jpeg", "jpg", "png", "txt"];
      let types2 = ["docx", "doc", "xls", "xlsx", "xlsm", "ppt", "pptx"];
      url = url.replace(/http:/, "https:");
      this.downloadUrl = url;
      if (types2.includes(suffix)) {
        this.downloadUrl =
          "https://view.officeapps.live.com/op/view.aspx?src=" +
          encodeURIComponent(url);
      } else if (types1.includes(suffix)) {
        this.downloadUrl = url;
      } else {
        this.$message.info("文件格式不支持预览，下载后查看");
      }
      setTimeout(() => {
        this.$refs.d_click.click();
      }, 100);
    },
    project() {
      if (this.info.project_id) {
        this.$router.push({
          name: "ItineraryManagement",
          params: {
            id: this.info.project_id,
          },
        });
      } else {
        this.addProjectStatus = true;
        //this.$router.push({name: "addStroke",params: { id: this.info.orderform_id },});
      }
    },
    // 添加/修改
    projectSave(params) {
      this.requestApi({
        url: '/scheduling/projectsave',
        method: 'POST',
        data: params,
      }).then((res) => {
        this.$message({
          message: params.id ? "修改成功！" : "添加成功！",
          type: "success",
        });
        this.$router.push({
          name: "ItineraryManagement",
          params: {
            id: this.info.project_id,
          },
        });
      });
    },
    quotedprice() {
      //let routeData = this.$router.resolve({ path: "quotedprice/" + id + "/" + isSubmit});
      let routeData = this.$router.resolve({
        name: "DMCquotedprice",
        params: {
          id: this.info.quoted_price_id,
          isSubmit: 0,
        },
      });
      window.open(routeData.href, "_blank"); //跳转新页面
    },
    settlement() {
      let settlement_id = this.$route.params.id; //订单id
      let issubmit = 1;
      if ( this.info.settlement_sheet_status === this.settlement_sheet_status_draft ) {
        // settlement_id = this.info.settlement_sheet_id;
      }
      //待确认结算单、已确认结算单、、要求补充材料取结算单id
      if (
        this.info.status === "0020-5" ||
        this.info.status === "0020-6" ||
        this.info.status === "0020-8"
      ) {
        // settlement_id = this.info.settlement_sheet_id;
        issubmit = 0;
      }

      if (this.info.serviceprovider_or_hotel == 0) {
        this.$router.push({
          name: "settleAccounts_Hotel",
          params: {
            id: settlement_id,
            issubmit: issubmit,
          },
        });
      } else {
        this.$router.push({
          name: "settleAccounts",
          params: {
            id: settlement_id,
            issubmit: issubmit,
          },
        });
      }
    },
    //取消订单
    cancelorderform() {
      this.$prompt("请简要说明取消订单的原因", "拒绝接单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "textarea",
      })
        .then(({ value }) => {
          this.requestApi({
            url: '/orderform/cancel',
            method: 'POST',
            data: {
              id: this.info.orderform_id,
              object_id: this.info.object_id,
              reason: value,
            },
          }).then((res) => {
            if (res) {
              this.$message({
                message: "订单已取消",
                type: "success",
              });
              this.$router.go(0);
            } else {
              this.$message({
                message: "订单取消失败",
                type: "fail",
              });
            }
          });
        })
        .catch(() => {});
    },
    //再次提醒客户
    againform() {
      this.requestApi({
        url: '/orderform/again',
        method: 'POST',
        data: {
          id: this.info.orderform_id,
            object_id: this.info.object_id,
        },
      }).then((res) => {
        if (res) {
          this.$message({
            message: "提醒成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "提醒失败",
            type: "fail",
          });
        }
      });
    },
  },
  mounted() {
    this.WhetherShow();
    this.getSelect();
    // this.select.forEach(item=>{
    // 	this.$set(item, 'showDetail', false)
    // })
    this.requestApi({
      url: '/orderform/info',
      method: 'POST',
      data: {
        id: this.$route.params.id,
      },
    }).then((res) => {
      this.info = res;
      this.totalPrices = res.total_price;
      if (
        this.info.event_info_configure.service_fee_ratio == 0 ||
        this.info.fzc_service == null
      )
        this.info.fzc_service = 100; // 不支持服务费比例修改，服务费比例设置为100%

      // 已确认结算单 状态调用
      if (this.info.status === "0020-6") {
        this.GetFile();
      }
    });
  },
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

  .special {
    color: #aaa;
    font-size: 14px;
    margin: 0px 5px 0px 5px;

    .special_link {
      color: #3a87ad;
    }
  }
}

.tips_bttton_info {
  margin-top: 15px;
}

.content {
  flex: 1;
  width: 100%;
  overflow: auto;
  padding: 15px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

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
.diameter {
  width: 1100px;
  background: #ffffff;
  // margin: auto;
  // margin-top: -10px;
  margin-bottom: 15px;
}
.filename {
  color: #2896eb;
  padding-left: 15px;
  cursor: pointer;
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

.quotedpricesum {
  font-size: 16px;
}

.quotedprice {
  font-weight: bold;
  font-size: 14px;
  color: rgb(255, 0, 0);
}

.need {
  justify-content: space-between !important;
}

.excel {
  float: right;
}

.excel > a {
  color: #428bca;
}
/deep/ .objectionDetailStyle {
  img {
    max-width: 100%;
  }
}
</style>
