<template>
  <div class="activityOrderInfo">
    <div class="title">活动询价订单 - {{ info.activity_name }}</div>
    <div class="content">
      <div class="tips" v-if="info.status === '0012-1' && Date.parse(info.offerenddate) > new Date()">
        <p>请尽快给客户报价吧</p>
        <p>请查看以下订单详情，如果客户需要使用会议室等场地，请为客户预留档期</p>
        <a @click="goquotedprice">立即报价</a>
      </div>
      <div class="tips" v-else-if="info.status === '0012-2'">
        <p>等待客户决定</p>
        <p>请查看以下订单详情，如果客户需要使用会议室等场地，请为客户预留档期</p>
        <a @click="anewquotation">更新报价</a>
        <a @click="checkquotation" style="margin-left: 20px">查看报价</a>
      </div>
      <div v-else-if="info.status === '0012-3'">
        <div class="tips3">
          <p>
            恭喜您，已经中标！请尽快与客户联系确定相关事宜。
            <el-button type="warning" @click="Orderform">查看关联订单</el-button>
          </p>
        </div>
        <!--已中标后,呈现操作按钮-->
        <div class="tips_bttton_info">
          <el-button type="primary" @click="project">{{ info.project_id ? '查看行程' : '添加行程' }}</el-button>
        </div>
      </div>

      <div class="tips" v-else-if="info.status === '0012-4'">
        <p>您已谢绝了此询价单，无法再进行报价。</p>
      </div>

      <div class="tips2" v-else-if="info.status === '0012-5'">
        <p>很遗憾，未中标</p>
        <p>客户谢绝了报价(谢绝报价)</p>
      </div>
      <div class="tips" v-if="info.status === '0012-6' && Date.parse(info.offerenddate) > new Date()">
        <p>
          客户请您重新报价，再优惠一些吧！
          <el-button type="primary" @click="goquotedprice(1)">重新报价</el-button>
        </p>
        <p>原因：{{ info.message.message }}</p>
      </div>
      <div class="tips2" v-else-if="(info.status === '0012-1' || info.status === '0012-6'  || info.status === '0012-8') && Date.parse(info.offerenddate) <= new Date()">
        <p>很遗憾，已经超过报价截止日期，无法再报价了。</p>
        <a v-if="info.status === '0012-8'" style="cursor: pointer;text-decoration: underline;" @click="checkquotation">查看报价（草稿）</a>
      </div>
      <div class="tips" v-if="info.status === '0012-8' && Date.parse(info.offerenddate) > new Date()">
        <p>请尽快给客户报价吧</p>
        <p>请查看以下订单详情，如果客户需要使用会议室等场地，请为客户预留档期</p>
        <a @click="goquotedprice">立即报价（草稿）</a>
      </div>

      <p style="color:#169BD5;font-weight:bold;margin-top:20px">RFP信息</p>
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
            <div class="context">
              {{ info.submit_time | date_ex }}
            </div>
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
            <div class="context">{{ info.activity_startdate | date_day }} 至 {{ info.activity_enddate | date_day }}{{ info.isadjustdate }}</div>
          </div>
        </div>
        <!-- <div class="line">
          
         <div class="item">
            <div class="label">酒店</div>
            <div class="context hotel">
              <span v-for="item in info.intentionhotel" :key="item.hotelid">
                {{ item.name }}
              </span>
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
            <div class="context">{{ info.customer_service_telephone_numbers }}</div>
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
              <a target="_blank" :href="info.domain+item.filepath" download>{{item.filename}}</a>
            </div>
          </div>
          <div class="item">
            <div class="label">其他需求及注意事项</div>
            <div class="context">{{ info.other }}</div>
          </div>
        </div> -->
      </div>
      <!-- 供应商信息 -->
      <p style="color:#169BD5;font-weight:bold;margin-top:20px">您的信息</p>
      <div class="info">
        <div class="line">
          <div class="item">
            <div class="label">供应商</div>
            <div class="context">{{ info.hotel_name }}</div>
          </div>
          <div class="item">
            <div class="label">联系人</div>
            <div class="context">{{ info.myinfo.contacts }}</div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">联系电话</div>
            <div class="context">{{ info.myinfo.telephone }}</div>
          </div>
          <div class="item">
            <div class="label">联系邮箱</div>
            <div class="context">{{ info.myinfo.email }}</div>
          </div>
        </div>
      </div>

      <!-- 客户需求 -->
      <p style="color:#169BD5;font-weight:bold;margin-top:20px">采购需求</p>
      <div class="info">
        <div class="line">
          <div class="item">
            <div class="label" style="width: 100%; justify-content: left;">客户需求</div>
          </div>
        </div>
        <div class="line">
          <div class="item">
            <div class="label">客房需求</div>
            <div class="context">
              <div class="hyxq_item" v-for="item in info.inquiry_sheet_room" :key="item.id">
                <div class="date">{{ item.date | date_day }}</div>
                <div class="c_item" v-for="item in item.roomlist" :key="item.id">{{ item.roomtypename }}:{{ item.roomcount }} 间</div>
                <div class="otherrequirements" v-if="item.roomlist.length > 0 && item.roomlist[0].otherrequirements">
                  其他需求：{{ item.roomlist[0].otherrequirements }}
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="label">会议需求</div>
            <div class="context">
              <div class="hyxq_item" v-for="item in info.inquiry_sheet_conference" :key="item.id">
                <div class="date">{{ item.conferencedate | date_day }}</div>
                <div class="c_item" v-for="conference in item.conferencelist" :key="conference.id">
                  <div v-if="conference.type == 1">
                    {{ conference.item + conference.order_name}} {{ conference.starttime }}-{{ conference.endtime }} {{ conference.roomsetuptype }}
                    {{ conference.attendees }} 人，会场面积范围：{{ conference.min_area }}~{{ conference.max_area }} sqm
                  </div>
                  <div v-else-if="conference.type == 2">
                    {{ conference.related_information }}
                    <!-- {{ conference.item + conference.typename }} -->
                    {{ item.conferencedate | date_day }} {{ conference.starttime }}~
                    {{ 	item.conferencedate | date_day }} {{ conference.endtime }}
                  </div>
                  <div class="otherrequirements" v-if="conference.type == 2">需求备注：{{ conference.describe }}</div>

                  <div v-if="conference.type == 3">
                    <div class="date">{{ item.conferencedate | date_day }} {{ conference.item }}</div>
                    <!-- {{ conference.equipment }} 有线麦克风 {{conference.wiremicrophonecount}}个 无线麦克风 {{conference.wirelessmicrophonecount}}个 -->
                    {{ conference.equipment }}
                    <div class="otherrequirements">需求备注：{{ conference.microphonedescribe }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="line">
          <!--<div class="item">
            <div class="label">会场配置需求</div>
            <div class="context">
              <div
                class="hyxq_item"
                v-for="item in info.inquiry_sheet_conference"
                :key="item.id"
                style="margin: 0"
              >
                <div
                  class="c_item"
                  v-for="conference in item.conferencelist"
                  :key="conference.id"
                  
                  style="line-height: 25px"
                >
                  <div v-if="conference.type ==3">
                      <div class="date">
                        {{ item.conferencedate | date_day }} {{conference.item}}
                      </div>
                       {{ conference.equipment }} 有线麦克风 {{conference.wiremicrophonecount}}个 无线麦克风 {{conference.wirelessmicrophonecount}}个 
                    {{ conference.equipment }} 
					  <div class="otherrequirements">需求备注：{{ conference.microphonedescribe}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->
          <div class="item">
            <div class="label">酒店内用餐需求</div>
            <div class="context">
              <div class="hyxq_item" v-for="item in info.inquiry_sheet_food" :key="item.id">
                <div class="date">{{ item.date | date_day }}</div>
                <div class="c_item" v-for="(itemc, index) in item.foodlist" :key="itemc.id">
                  <span>{{ itemc.foodtypename }}</span>
                  {{ itemc.usetype ? `[${itemc.usetype}]` : '' }} {{ itemc.personcount }} 人
                  <span class="outsidethehotel" v-if="itemc.addresstype == 1">酒店外</span>
                  <div class="otherrequirements" v-if="index == item.foodlist.length - 1">需求备注：{{ itemc.comments }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="label">酒店外用餐需求</div>
            <div class="context">
              <div class="hyxq_item" v-for="item in info.inquiry_sheet_outside_food" :key="item.id">
                <div class="date">{{ item.date | date_day }}</div>
                <div class="c_item" v-for="(itemc, index) in item.foodlist" :key="itemc.id">
                  <span>{{ itemc.foodtypename }}</span>
                  {{ itemc.usetype ? `[${itemc.usetype}]` : '' }} {{ itemc.personcount }} 人
                  <!-- <span class="outsidethehotel" v-if="itemc.addresstype == 1">酒店外</span> -->
                  <div class="otherrequirements" v-if="index == item.foodlist.length - 1">需求备注：{{ itemc.comments }}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="line">

          <div class="item">
            <div class="label">交通需求</div>
            <div class="context">
              <div class="hyxq_item" v-for="item in info.inquiry_sheet_transportation" :key="item.id">
                <div class="date">{{ item.date | date_day }} 大交通</div>
                <div class="c_item" v-for="item in item.transportationlist" :key="item.id">
                  <span>{{ item.origincity }} - {{ item.destinationcity }}</span>

                  {{ item.transtype }} {{ item.seatclasses }} {{ item.specialprice }} {{ item.passengercount }} 人
                </div>
              </div>
              <div class="hyxq_item" v-for="item in info.inquiry_sheet_car" :key="item.id">
                <div class="date">{{ item.date | date_day }} 地面交通</div>
                <div class="c_item" v-for="item in item.carlist" :key="item.id">
                  <p>
                    <span>{{ item.purposename }}</span>
                    {{ item.vehicletypename }} {{ item.carcount }} 辆
                  </p>
                  <p v-if="item.city">
                    <span>用车城市</span> {{item.city}}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="label">其它需求</div>
            <div class="context">
              <div class="hyxq_item" v-for="(item,index) in info.inquiry_sheet_other" :key="index">
                <p>
                  <span>{{item.custom_servicetypename}} </span>

                </p>
                <p>数量：{{item.participatecount}}</p>
                <p v-if="item.describe">需求备注：{{ item.describe }}</p>
              </div>
              <!-- <span>{{ info.other }}</span> -->
            </div>
          </div>

        </div>
        <div class="line">
          <div class="item">
            <div class="label">附件</div>
            <div class="context" v-for="item in info.inquiry_sheet_attach" :key="item.id">
              <a target="_blank" :href="info.domain + item.filepath" download>{{ item.filename }}</a>
            </div>
            <!--<div class="context">
              <div
                class="hyxq_item"
                v-for="item in info.inquiry_sheet_other"
                :key="item.id"
                style="margin: 0"
              >
                <div class="c_item" style="line-height: 25px">
                  <span>{{ item.custom_servicetypename }}</span>
                  <span v-if="item.servicedaycount && item.servicedaycount > 0">{{ item.servicedaycount }} 天 {{ item.participatecount }} 人</span>
                </div>
              </div>
            </div>-->
          </div>
          <div class="item">
            <div class="label">其它需求信息或者注意事项</div>
            <div class="context">
              <span>{{ info.other }}</span>
            </div>
          </div>

        </div>
      </div>
      <div class="btn-group" v-if="(info.status === '0012-1' || info.status === '0012-6') && Date.parse(info.offerenddate) > new Date()">
        <el-button type="primary" v-if="info.status === '0012-1'" @click="goquotedprice">开始报价</el-button>
        <el-button type="primary" v-else @click="goquotedprice(1)">重新报价</el-button>
        <el-button type="danger" @click="refusequoted">谢绝报价</el-button>
      </div>
      <div class="info" v-if="info.history_quotationprice && info.history_quotationprice.length > 0">
        <el-card class="box-card">
          <div slot="header" class="header clearfix">
            <span>您提交过{{ info.history_quotationprice.length }}次报价，以下为报价记录：</span>
          </div>
          <div v-for="(item, index) in info.history_quotationprice" :key="item.id" class="text item">
            第{{ index + 1 }}次报价
            <!-- ({{item.statusname}}) -->
            ,总金额￥{{ positiveFloat(item.total_amount).toFixed(2) }}元，[ {{ item.offer_data | date_ex }} ]
            <el-link name="quotedprice" class="quotedprice" @click="Quotedprice(item.id, 0)">
              查看报价单
              <i class="el-icon-view el-icon--right"></i>
            </el-link>
          </div>
        </el-card>
      </div>

      <!-- 添加新项目 -->
      <el-dialog title="添加项目" :visible.sync="addProjectStatus" :before-close="
					done => {
						this.itemData = null;
						done();
					}
				" width="700px">
        <projectAdded v-if="addProjectStatus" @onColse="projectSave" :item-data="itemData" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
/**
 * @page 活动询价单详情
 */
import projectAdded from '@/components/event/project-added.vue';
import { guid,positiveInteger, positiveFloat, positiveFloatSix, formatDate, formatNum, getNextDateFormat,getFormatDate,CompareDate } from '@/utils/common';
export default {
	name: 'ItineraryInfo',
	components: { projectAdded },
	data() {
		return {
			info: {},
			addProjectStatus: false, // 编辑/添加开关
			itemData: null // 单条数据
		};
	},
	methods: {
		positiveFloat,
		anewquotation(){
			let _this =this;
			_this.$confirm('是否确定更新报价?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					_this.$api.AnewQuotation(
						{
							id: _this.info.object_id
						},
						"POST"
					).then((res) => {
						if(!res){
							this.$message({
								message: "不能修改报价单!",
								type: 'error'
							});
							return;
						}
						_this.goquotedprice();
						
					});
        })
		},
		// 查看报价
		checkquotation(){
			let id = this.info.history_quotationprice.at(-1).id // 获取最新报价ID
			let routeData = this.$router.resolve({ name: 'DMCquotedprice', params: { id: id, isSubmit: 0 } });
			window.open(routeData.href, '_blank'); //跳转新页面
		},
		// 添加/修改
		projectSave(params) {
      this.requestApi({
        url: '/scheduling/projectsave',
        method: 'POST',
        data: params,
      }).then(res => {
				this.$message({
					message: params.id ? '修改成功！' : '添加成功！',
					type: 'success'
				});
				this.$router.push({ name: 'ItineraryManagement', params: { id: this.info.project_id } });
			});
		},
		Quotedprice(id, isSubmit) {
			//let routeData = this.$router.resolve({ path: "quotedprice/" + id + "/" + isSubmit});
			let routeData = this.$router.resolve({ name: 'DMCquotedprice', params: { id: id, isSubmit: isSubmit } });
			window.open(routeData.href, '_blank'); //跳转新页面
		},
		Orderform() {
			// let routeData = this.$router.resolve({ name: "orderInfo", params: { id:this.info.orderform_id }});
			// window.open(routeData.href, "_blank");//跳转新页面

			this.$router.push({ name: 'orderInfo', params: { id: this.info.orderform_id } });
		},
		project() {
			if (this.info.project_id) {
				this.$router.push({ name: 'ItineraryManagement', params: { id: this.info.project_id } });
			} else {
				this.addProjectStatus = true;
				//this.$router.push({name: "addStroke",params: { id: this.info.orderform_id },});
			}
		},
		refusequoted() {
			this.$prompt('请输入您谢绝报价的理由', '谢绝报价', {
				confirmButtonText: '确定谢绝报价',
				showCancelButton: false,
				inputPattern: /\S/,
				inputErrorMessage: '请填写谢绝报价的理由',
				inputType: 'textarea'
			})
				.then(({ value }) => {
          this.requestApi({
            url: '/inquirysheet/Refusequoted',
            method: 'POST',
            data: {
              id: this.info.object_id,
              reason: value
            },
          }).then(res => {
            this.$message({
              message: '已拒绝报价',
              type: 'success'
            });
            location.reload();
          });
				})
				.catch(() => {});
		},
		goquotedprice(type) {
			this.$router.push({
				name: 'DMCquotedprice',
				params: {
					id: this.info.object_id,
					isSubmit: 1,
					type: type // 重新报价传值1,
				}
			});
		}
	},
	mounted() {
    this.requestApi({
      url: '/inquirysheet/info',
      method: 'POST',
      data: {
        id: this.$route.params.id
      },
    }).then(res => {
      this.info = res;
    });
	}
};
</script>

<style lang="scss" scoped>
.quotedprice {
  margin-left: 10px;
  cursor: pointer;
}

.activityOrderList {
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
  a {
    font-weight: 600;
    color: #3a87ad;
    text-decoration: underline;
    cursor: pointer;
  }
}

.tips2 {
  background-color: #f2dede;
  border: 1px solid #eed3d7;
  border-radius: 5px;
  color: #b94a48;
  font-size: 16px;
  line-height: 25px;
  padding: 20px 0;
  text-align: center;
  p:last-child {
    font-size: 14px;
  }
}

.tips3 {
  background-color: #dff0d8;
  border: 1px solid #d6e9c6;
  border-radius: 5px;
  color: #468847;
  font-size: 16px;
  line-height: 25px;
  padding: 20px 0;
  text-align: center;
  p:last-child {
    font-size: 14px;
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
  span.outsidethehotel {
    color: rgb(255, 0, 0);
    margin-left: 5px;
  }
}
</style>
