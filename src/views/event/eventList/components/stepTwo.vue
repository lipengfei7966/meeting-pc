<template>
  <div class="step_two">
    <!-- <div class="stepName mar_b10" >
      <strong style="float: left;width: 80px;background: #626E95">Step 2</strong>
      <span>资源采购 <em>Sourcing&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em></span>
    </div> -->
    <a v-show="false" :href="url" target="_blank" ref="a_click"></a>
    <a v-show="false" :href="downloadUrl" target="_blank" ref="b_click" download></a>
    <el-tabs v-model="stepTwo" type="card" @tab-click="handleStepTwo">
      <el-tab-pane label="酒店/会议服务商" name="1">
        <div>
          <!-- <el-timeline> -->
          <div style="margin: 10px 0">
            <div class="flex_row align_center">
              <div class="stepName mar_b10">
                <strong>Step 2</strong>
                <span>
                  确定会议采购需求
                  <em>Event Requirements&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em>
                </span>
              </div>
              <!-- <span class="base_title">确定会议采购需求 <em>Event Requirements </em></span> -->
              <!-- <div class="showBase_tap flex_row align_center" @click="showTimeLineOne = !showTimeLineOne">
                  <img :src="showTimeLineOne ? require('@/assets/images/close.png'):require('@/assets/images/open.png')" alt="">
                  <span> {{showTimeLineOne?'收起':'展开'}}</span>
                </div> -->
            </div>
            <el-card v-if="showTimeLineOne">
              <div class="purchase_demand">
                <div class="purchase_demand_title flex_row align_center justify_between">
                  <span>
                    <i class="el-icon-warning-outline"></i>
                    您可以根据您填写的采购需求选择相应的供应商
                  </span>
                  <span v-if="isShowCancelBtn || isDMC" @click="editDemand" class="base_title">
                    编辑采购需求
                    <em>Edit Requirements</em>
                  </span>
                  <span v-else @click="editDemandConfirm('check')" class="base_title">
                    查看采购需求
                    <em>Review Requirements</em>
                  </span>
                </div>
                <div class="demand_list flex_row" style="
                    flex-flow: row wrap;
                    justify-content: flex-start;
                    line-height: 30px;
                  ">
                  <span style="width: 25%">客房需求：{{ demandInfo.room }}</span>
                  <span style="width: 25%">会场需求：{{ demandInfo.conference }}</span>
                  <span style="width: 25%">酒店内餐饮需求：{{ demandInfo.food }}</span>
                  <span style="width: 25%">酒店外餐饮需求：{{ demandInfo.foodOutside }}</span>
                  <span style="width: 25%">大交通：{{ demandInfo.transportation }}</span>
                  <span style="width: 25%">市内交通：{{ demandInfo.car }}</span>
                  <span style="width: 80%">其他需求：{{ demandInfo.other }}</span>
                  <el-button v-if="isDMC && hasRequirements" type="primary" size="small" @click="checkOrUpdateOffer" class="submit">
                    查看/填写报价
                  </el-button>
                </div>
              </div>
            </el-card>
          </div>
          <div style="margin: 10px 0" v-if="!isDMC">
            <div class="flex_row align_center justify_between">
              <div class="flex_row align_center">
                <div class="stepName mar_b10">
                  <strong>Step 3</strong>
                  <span>
                    找供应商询价、议价
                    <em>Sourcing and
                      Negotiation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em>
                  </span>
                </div>
                <div class="showBase_tap flex_row align_center" @click="showTimeLineTwo = !showTimeLineTwo">
                  <img :src="
                      showTimeLineTwo
                        ? require('@/assets/images/close.png')
                        : require('@/assets/images/open.png')
                    " alt="" />
                  <span>{{ showTimeLineTwo ? "收起" : "展开" }}</span>
                </div>
              </div>
            </div>
            <div v-if="showTimeLineTwo" class="flex_row" style="margin-bottom: 20px">
              <span :class="[isShowCancelBtn ? 'demand_btn' : 'disabled']" v-if="demandInfo.type == 0 && hasRequirements" @click="isShowCancelBtn ? goDemand(1) : ''">
                找酒店采购
                <br />
                Sourcing Hotel
              </span>
              <!-- <span :class="[isShowCancelBtn?'demand_btn':'disabled']" v-if="hasRequirements" @click="isShowCancelBtn?goDemand(2):''">找会议服务商采购<br>Sourcing Travel Agency</span> -->
              <span class="demand_btn" v-if="!hasRequirements" @click="editDemandConfirm">填写采购需求</span>
              <span class="demand_btn" v-if="hasRequirements && isShowCancelBtn" @click="goPage('belowQuotation', $route.query)">
                线下报价填写
                <br />
                Offline Quotation Filling
              </span>
            </div>
            <el-card v-if="showTimeLineTwo && provideName.length > 0">
              <div class="purchase_demand bor_e2">
                <div class="purchase_demand_title bor_b_e4 bg_fa flex_row justify_between">
                  <p>
                    会议服务商询价单Travel Agency RFP（{{
                      provideName.length
                    }}）
                  </p>
                </div>
                <div class="purchase_demand_main bg_fff" v-for="(inquiryList, index) in provideName" :key="index">
                  <!--  v-for="(item, index) in provideName" -->
                  <div class="purchase_demand_main_title flex_row justify_between align_center pos_relative">
                    <div>
                      <el-badge is-dot :hidden="inquiryList.remind == '0'">
                        <div>
                          <span>询价单号：{{
                              inquiryList.inquiry_sheet_code
                            }}</span>
                          <span class="text_red">{{ inquiryList.status }}</span>
                          <span class="t78">报价（{{ inquiryList.offercount }}）</span>
                          <span class="t78">中标（{{ inquiryList.count }}）</span>
                        </div>
                      </el-badge>
                      <p class="t_ccc">
                        询价时间：{{ inquiryList.submit_time }} 报价截止日期：{{
                          inquiryList.end_time
                        }}
                      </p>
                      <!--                        item.isShowInquiry_hotel = !item.isShowInquiry_hotel-->
                      <div class="pos_absolute pos_demand" @click="isShowTap(1, index)">
                        <img style="width: 12px" v-show="inquiryList.isShowInquiry_hotel" :src="require('@/assets/images/tri-open.png')" alt="" />
                        <img style="height: 12px" v-show="!inquiryList.isShowInquiry_hotel" :src="require('@/assets/images/tri-close.png')" alt="" />
                      </div>
                    </div>
                    <div>
                      <el-button size="small" type="text" @click="viewRfq(inquiryList, 'service')">查看询价单</el-button>

                      <!--<el-button v-if="isOffer(inquiryList.service_hotel)" size="small" type="text" @click="goCompare(inquiryList)">查看比价页</el-button>-->
                      <el-dropdown class="mar_l20" v-if="isOffer(inquiryList.service_hotel)" size="small" @command="
                          (val) => handleCommand(inquiryList, val, 'service')
                        ">
                        <span class="el-dropdown-link">
                          查看比价页
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="1">仅询价部分比价</el-dropdown-item>
                          <el-dropdown-item command="2">含线下报价部分比价</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <div class="purchase_demand_main_body">
                    <table class="select_hotel" v-show="inquiryList.isShowInquiry_hotel">
                      <thead>
                        <tr>
                          <th width="180">
                            服务商名称
                            <span class="international-order-span">Travel Agency</span>
                          </th>
                          <th width="135">
                            联系人
                            <span class="international-order-span">Contact Person</span>
                          </th>
                          <th width="135">
                            报价人
                            <span class="international-order-span">Quotation Person</span>
                          </th>
                          <th width="130">
                            初次报价
                            <span class="international-order-span">Initial Price</span>
                          </th>
                          <th width="130">
                            末次报价
                            <span class="international-order-span">Final Price</span>
                          </th>
                          <th width="120">
                            操作
                            <span class="international-order-span">Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in inquiryList.service_hotel" :key="index">
                          <td align="left">
                            <div class="name">
                              <i class="ico"><img :src="require('@/assets/images/badge.png')" alt="" style="width: 15px; height: 15px" /></i>
                              <span>{{ item.company_name }}</span>
                            </div>
                          </td>
                          <td>
                            <p class="dark">{{ item.customer_service_name }}</p>
                            <p class="gray">{{ item.company_phone }}</p>
                            <p class="gray">{{ item.company_email }}</p>
                          </td>
                          <td>
                            <p class="dark">{{ item.bidder_name }}</p>
                            <p class="gray">{{ item.bidder_phone }}</p>
                            <p class="gray">{{ item.bidder_email }}</p>
                          </td>
                          <td>
                            <div class="gray" v-if="item.minprice || item.minprice === 0">
                              <dfn>￥</dfn>
                              {{ positiveFloat(item.minprice, true).toFixed(2) }}
                            </div>
                            <span class="bid" v-show="item.state === 0 && !item.maxprice">已报价</span>
                            <span class="bid" v-show="item.state === 1 && !item.maxprice">已中标</span>
                            <span class="refuse" v-show="item.state === 2">服务商拒绝</span>
                            <span class="refuse" v-show="item.state === 3">已拒绝</span>
                            <span class="refuse" v-show="item.state === 5">{{ item.end_time }}前重新报价</span>
                            <span class="refuse" v-show="item.state === 6">{{ item.end_time }}前报价</span>
                            <span class="refuse" v-show="item.state === 7 && !item.maxprice">草稿</span>
                          </td>
                          <td>
                            <div class="gray" v-if="item.maxprice || item.maxprice === 0">
                              <dfn>￥</dfn>
                              {{ positiveFloat(item.maxprice, true) }}
                            </div>
                            <span class="bid" v-show="item.state === 0 && item.maxprice">已报价</span>
                            <span class="bid" v-show="item.state === 1 && item.maxprice">已中标</span>
                            <span class="refuse" v-show="item.state === 7 && item.maxprice">草稿</span>
                          </td>
                          <td align="left">
                            <div class="hotel_link">
                              <el-badge is-dot :hidden="item.unread_count == '0'">
                                <el-button size="mini" type="text" @click="
                                    getMessage(item.id), (megDialog = true)
                                  ">留言</el-button>
                              </el-badge>
                              <el-button size="mini" v-show="
                                  isShowCancelBtn &&
                                  (item.state === 5 || item.state === 6) &&
                                  inquiryList.status != '已取消'
                                " type="text" @click="urgeOffer(item)">
                                催报价
                              </el-button>
                              <el-badge v-if="item.minprice || item.minprice === 0" is-dot :hidden="item.remind == '0'">
                                <el-button size="mini" type="text" @click="
                                    goPage('offer', {
                                      id: $route.query.id,
                                      foreign_key_id: item.quoted_priceid,
                                      type: 1,
                                      serviceId: item.id,
                                      inquiryListId: inquiryList.id,
                                    })
                                  ">查看报价</el-button>
                              </el-badge>
                              <el-button size="mini" type="text" @click="copyUrl(item, 1)">复制报价链接</el-button>
                            </div>
                            <div v-if="
                                isShowCancelBtn &&
                                inquiryList.status != '已取消'
                              ">
                              <el-button size="mini" type="text" v-if="item.state === 2" @click="againDialogTap(item, 1)">邀请重新报价</el-button>
                              <el-button size="mini" type="text" v-if="
                                  item.state === 4 ||
                                  item.state === 5 ||
                                  item.state === 6 ||
                                  item.state === 7
                                " @click="againDialogTap(item, 2)">
                                延长截止日期
                              </el-button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </el-card>
            <el-card v-if="showTimeLineTwo && providehotle.length > 0">
              <div class="purchase_demand bor_e2">
                <div class="purchase_demand_title bor_b_e4 bg_fa flex_row justify_between">
                  <p>酒店询价单 Hotel RFP（{{ providehotle.length }}）</p>
                </div>
                <div class="purchase_demand_main bg_fff" v-for="(inquiryList, index) in providehotle" :key="index">
                  <div class="purchase_demand_main_title flex_row justify_between align_center pos_relative">
                    <div>
                      <div>
                        <span>询价单号：{{ inquiryList.inquiry_sheet_code }}</span>
                        <span class="text_red">{{ inquiryList.status }}</span>
                        <span class="t78">报价（{{ inquiryList.offercount }}）</span>
                        <span class="t78">中标（{{ inquiryList.count }}）</span>
                      </div>
                      <p class="t_ccc">
                        询价时间：{{ inquiryList.submit_time }} 报价截止日期：{{
                          inquiryList.end_time
                        }}
                      </p>
                      <div class="pos_absolute pos_demand" @click="isShowTap(2, index)">
                        <img style="width: 12px" v-show="inquiryList.isShowInquiry" :src="require('@/assets/images/tri-open.png')" alt="" />
                        <img style="height: 12px" v-show="!inquiryList.isShowInquiry" :src="require('@/assets/images/tri-close.png')" alt="" />
                      </div>
                    </div>
                    <div>
                      <el-badge is-dot :hidden="inquiryList.remind == '0'">
                        <el-button size="small" type="text" @click="viewRfq(inquiryList, 'hotel')">查看询价单</el-button>
                      </el-badge>
                      <el-dropdown class="mar_l20" v-if="isOffer(inquiryList.service_hotel)" size="small" @command="
                          (val) => handleCommand(inquiryList, val, 'hotel')
                        ">
                        <span class="el-dropdown-link">
                          查看比价页
                          <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="1">仅询价部分比价</el-dropdown-item>
                          <el-dropdown-item command="2">含线下报价部分比价</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <div class="purchase_demand_main_body">
                    <table class="select_hotel" v-show="inquiryList.isShowInquiry">
                      <thead>
                        <tr>
                          <th width="180">
                            酒店名称
                            <span class="international-order-span">Travel Agency</span>
                          </th>
                          <th width="135">
                            联系人
                            <span class="international-order-span">Contact Person</span>
                          </th>
                          <th width="135">
                            报价人
                            <span class="international-order-span">Quotation Person</span>
                          </th>
                          <th width="130">
                            初次报价
                            <span class="international-order-span">Initial Price</span>
                          </th>
                          <th width="130">
                            末次报价
                            <span class="international-order-span">Final Price</span>
                          </th>
                          <th width="200">
                            工商信息
                            <span class="international-order-span">Final Price</span>
                          </th>
                          <th width="120">
                            操作
                            <span class="international-order-span">Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in inquiryList.service_hotel" :key="index">
                          <td align="left">
                            <div class="name">
                              <i class="ico"><img :src="require('@/assets/images/badge.png')" alt="" style="width: 15px; height: 15px" /></i>
                              <span style="color: #409eff; cursor: pointer" @click="jumpInfo(item.hotel_id)">{{ item.company_name }}</span>
                            </div>
                          </td>
                          <td>
                            <p class="dark">{{ item.customer_service_name }}</p>
                            <p class="gray">{{ item.company_phone }}</p>
                            <p class="gray">{{ item.company_email }}</p>
                          </td>
                          <td>
                            <p class="dark">{{ item.bidder_name }}</p>
                            <p class="gray">{{ item.bidder_phone }}</p>
                            <p class="gray">{{ item.bidder_email }}</p>
                          </td>
                          <td>
                            <div class="gray" v-if="item.minprice || item.minprice === 0">
                              <dfn>￥</dfn>
                              {{ positiveFloat(item.minprice, true) }}
                            </div>
                            <span class="bid" v-show="item.state === 0 && !item.maxprice">已报价</span>
                            <span class="bid" v-show="item.state === 1 && !item.maxprice">已中标</span>
                            <span class="refuse" v-show="item.state === 2">服务商拒绝</span>
                            <span class="refuse" v-show="item.state === 3">已拒绝</span>
                            <span class="refuse" v-show="item.state === 5">{{ item.end_time }}前重新报价</span>
                            <span class="refuse" v-show="item.state === 6">{{ item.end_time }}前报价</span>
                          </td>
                          <td>
                            <div class="gray" v-if="item.maxprice || item.maxprice === 0">
                              <dfn>￥</dfn>
                              {{ positiveFloat(item.maxprice, true) }}
                            </div>
                            <span class="bid" v-show="item.state === 0 && item.maxprice">已报价</span>
                            <span class="bid" v-show="item.state === 1 && item.maxprice">已中标</span>
                          </td>
                          <td>
                            <p class="dark">
                              主数据ID：<span class="gray">{{
                                item.master_data ? item.master_data : "无"
                              }}</span>
                            </p>
                            <p class="dark">
                              营业执照名称：<span class="gray">{{
                                item.business_license_no
                                  ? item.business_license_no
                                  : "无"
                              }}</span>
                            </p>
                            <p class="dark">
                              信用代码：<span class="gray">{{
                                item.social_credit_no
                                  ? item.social_credit_no
                                  : "无"
                              }}</span>
                            </p>
                          </td>
                          <td align="left">
                            <div class="hotel_link">
                              <el-badge is-dot :hidden="item.unread_count == '0'">
                                <el-button size="mini" type="text" @click="
                                    getMessage(item.id), (megDialog = true)
                                  ">留言</el-button>
                              </el-badge>
                              <el-button size="mini" v-show="
                                  isShowCancelBtn &&
                                  (item.state === 5 || item.state === 6) &&
                                  inquiryList.status != '已取消'
                                " type="text" @click="urgeOffer(item)">
                                催报价
                              </el-button>
                              <el-badge v-if="item.minprice || item.minprice === 0" is-dot :hidden="item.remind == '0'">
                                <el-button size="mini" type="text" @click="
                                    goPage('offer', {
                                      id: $route.query.id,
                                      foreign_key_id: item.quoted_priceid,
                                      type: 2,
                                      serviceId: item.id,
                                      inquiryListId: inquiryList.id,
                                    })
                                  ">查看报价</el-button>
                              </el-badge>
                              <el-button size="mini" type="text" @click="copyUrl(item, 0)">复制报价链接</el-button>
                              <el-button v-if="
                                  !item.master_data || !item.social_credit_no
                                " size="mini" type="text" @click="complete(item)">完善工商信息</el-button>
                            </div>
                            <div v-if="
                                isShowCancelBtn &&
                                inquiryList.status != '已取消'
                              ">
                              <el-button size="mini" type="text" v-if="item.state === 2" @click="againDialogTap(item, 1)">邀请重新报价</el-button>
                              <el-button size="mini" type="text" v-if="
                                  item.state === 4 ||
                                  item.state === 5 ||
                                  item.state === 6 ||
                                  item.state === 7
                                " @click="againDialogTap(item, 2)">
                                延长截止日期
                              </el-button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
          <div timestamp="" placement="top" v-if="!isDMC">
            <div class="time_line_title flex_row justify_between align_center">
              <div class="flex_row align_center">
                <div class="stepName mar_b10">
                  <strong>Step 4</strong>
                  <span>
                    确认中标，生成订单
                    <em>Supplier Award&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em>
                  </span>
                </div>
                <div class="showBase_tap flex_row align_center" @click="showTimeLineThree = !showTimeLineThree">
                  <img :src="
                      showTimeLineThree
                        ? require('@/assets/images/close.png')
                        : require('@/assets/images/open.png')
                    " alt="" />
                  <span>{{ showTimeLineThree ? "收起" : "展开" }}</span>
                </div>
              </div>
            </div>
            <template v-if="showTimeLineThree">
              <el-card v-if="orderList.length > 0">
                <div class="purchase_demand bor_e2">
                  <div class="purchase_demand_title bor_b_e4 bg_fa">
                    <p>会议服务商订单Travel Agency Order</p>
                  </div>
                  <div class="purchase_demand_main_body">
                    <div class="create_public">
                      <table class="create_table">
                        <thead>
                          <tr>
                            <th width="11%">
                              订单号
                              <span class="international-order-span">Order ID</span>
                            </th>
                            <th width="20%">
                              服务商名称
                              <span class="international-order-span">Travel Agency Name</span>
                            </th>
                            <th width="10%">
                              中标价
                              <span class="international-order-span">PO Speeding</span>
                            </th>
                            <th width="10%">
                              状态
                              <span class="international-order-span">Status</span>
                            </th>
                            <th width="15%">
                              操作
                              <span class="international-order-span">Action</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, idx) in orderList" :key="idx">
                            <td>
                              <span class="black">{{ item.num }}</span>
                            </td>
                            <td>
                              <div class="bargain_name">
                                <i class="ico"></i>
                                {{ item.company_name }}
                              </div>
                            </td>
                            <td>
                              <strong class="price">
                                <dfn>￥</dfn>
                                {{ positiveFloat(item.price, true) }}
                              </strong>
                            </td>
                            <td>{{ item.name }}</td>
                            <td>
                              <div class="create_link">
                                <el-badge is-dot :hidden="item.remind == '0'">
                                  <el-button size="mini" type="text" @click="
                                      goPage('provider', {
                                        id: $route.query.id,
                                        orderId: item.id,
                                        sheetId: item.event_inquiry_sheet_id,
                                        type: 1,
                                      })
                                    ">查看订单
                                  </el-button>
                                </el-badge>

                                <el-button size="mini" type="text" @click="
                                    goPage('servicedetails', {
                                      id: $route.query.id,
                                      sheetId: item.event_inquiry_sheet_id,
                                    })
                                  ">
                                  原询价单
                                </el-button>
                                <el-button v-show="isTestEnv" size="mini" type="text" @click="changeStatus(item.id)">订单状态改变</el-button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </el-card>
              <el-card v-if="orderhotle.length > 0">
                <div class="purchase_demand bor_e2">
                  <div class="purchase_demand_title bor_b_e4 bg_fa">
                    <p>酒店订单 Hotel Order</p>
                  </div>
                  <div class="purchase_demand_main_body">
                    <div class="create_public">
                      <table class="create_table">
                        <thead>
                          <tr>
                            <th width="11%">
                              订单号
                              <span class="international-order-span">Order ID</span>
                            </th>
                            <th width="20%">
                              酒店名称
                              <span class="international-order-span">Hotel Name</span>
                            </th>
                            <th width="10%">
                              中标价
                              <span class="international-order-span">PO Speeding</span>
                            </th>
                            <th width="10%">
                              状态
                              <span class="international-order-span">Status</span>
                            </th>
                            <th width="15%">
                              操作
                              <span class="international-order-span">Action</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, idx) in orderhotle" :key="idx">
                            <td>
                              <span class="black">{{ item.num }}</span>
                            </td>
                            <td>
                              <div class="bargain_name">
                                <i class="ico">
                                  <img :src="require('@/assets/images/badge.png')" alt="" style="width: 15px; height: 15px" />
                                </i>
                                <!-- {{ item.company_name }} -->
                                <span style="color: #409eff; cursor: pointer" @click="jumpInfo(item.hotel_id)">{{ item.company_name }}</span>
                              </div>
                            </td>
                            <td>
                              <strong class="price">
                                <dfn>￥</dfn>
                                {{ positiveFloat(item.price, true) }}
                              </strong>
                            </td>
                            <td>{{ item.name }}</td>
                            <td>
                              <div class="create_link">
                                <el-badge is-dot :hidden="item.remind == '0'">
                                  <el-button size="mini" type="text" @click="
                                      goPage('provider', {
                                        id: $route.query.id,
                                        orderId: item.id,
                                        sheetId: item.event_inquiry_sheet_id,
                                        type: 0,
                                      })
                                    ">查看订单
                                  </el-button>
                                </el-badge>
                                <el-button size="mini" type="text" @click="
                                    goPage('servicedetails', {
                                      id: $route.query.id,
                                      sheetId: item.event_inquiry_sheet_id,
                                    })
                                  ">
                                  原询价单
                                </el-button>
                                <el-button v-show="isTestEnv" size="mini" type="text" @click="changeStatus(item.id)">订单状态改变</el-button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </el-card>
              <!-- 报价汇总 -->
              <el-card>
                <div class="flex_row justify_between">
                  <div class="flex_row justify_between" style="padding: 20px; border: 1px dashed; margin: 15px 20px">
                    <p style="font-size: 18px">订单汇总：</p>
                    <div>
                      <p>
                        线下报价净价：￥{{
                          positiveFloat(
                            collectOfferData.offline_quotedPrice_net_price,
                            true
                          )
                        }}
                      </p>
                      <p>汇总中标净价：￥{{ collectOfferData.net_price }}</p>
                      <p>汇总中标税前：￥{{ collectOfferData.pre_tax }}</p>
                      <p style="font-weight: 900">
                        汇总报价税后：
                        <span style="color: #f91">￥{{ collectOfferData.after_tax }}</span>
                      </p>
                    </div>
                  </div>
                  <div style="
                      display: flex;
                      flex-direction: column;
                      justify-content: flex-end;
                    ">
                    <div class="mar_r30">
                      <el-button size="small" type="text" @click="excelDownLoad()">下载汇总报价单</el-button>

                      <el-button size="small" type="text" @click="
                          goPage('collectOffer', {
                            id: $route.query.id,
                            name: $route.query.name,
                          })
                        ">
                        查看汇总报价单
                      </el-button>
                      <el-button v-if="dt == '1'" @click="budgetDialog = !budgetDialog" size="small" type="text">预算填报</el-button>
                      <el-button v-if="dt == '1'" size="mini" type="text" @click="gotoB2B('HZ00000202')">查看B2B团预算</el-button>
                    </div>
                  </div>
                </div>
              </el-card>
            </template>
          </div>
          <!-- </el-timeline> -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="大交通(机票)" name="2" v-if="false">
        <div class="traffic flex_row justify_center align_center">
          <img :src="require('@/assets/images/demand.png')" alt="" />
          <el-button type="primary" size="small" @click="goTrafficTap">查看出票需求</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="isDemandHotel" width="30%" align="center">
      <span>请选择会议服务商进行采购的方式</span>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button type="primary" plain @click="goDemand(3)">立即采购(不含酒店)</el-button>
        <el-button type="primary" plain @click="goDemand(4)">立即采购(含酒店)</el-button>
      </span>
    </el-dialog>
    <!-- 编辑需求确认弹窗 -->
    <el-dialog :visible.sync="editDemandDialog" title="修改会议需求" :close-on-click-modal="false" width="500px" align="center">
      <div>
        <p class="text_left">会议中存在的询价单和订单如下：</p>
        <div class="demand_info_part flex_column align_left mar_tb10">
          <span>
            询价单：
            <em>{{ providehotle.length + provideName.length }}个</em>
          </span>
          <span>
            订单：
            <em>{{ orderhotle.length + orderList.length }}个</em>
          </span>
        </div>
        <p class="text_center text_red">
          * 修改需求后请检查已经发出的询价单和最新调整的需求是否吻合
        </p>
      </div>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button type="primary" size="small" @click="editDemandDialog = false">我再想想</el-button>
        <el-button type="info" size="small" @click="editDemandConfirm">修改需求</el-button>
      </span>
    </el-dialog>
    <!-- 预算填报 第一步 -->
    <el-dialog :visible.sync="budgetDialog" :before-close="beforeClose" @open="budget()" title="预算填报" width="500px" :close-on-click-modal="false">
      <div>
        <div v-if="num > 0" class="warnning">
          注:当前会议已提交过预算，如果再次提交，会替换原来的预算。
        </div>
        <!-- <div>
					<span>PR</span>
					<el-input size="small" v-model="pr" type="text" class="demand_200"></el-input>
				</div> -->
        <p class="mar_tb10">请选择您需要填报预算的报价：</p>
        <el-checkbox v-model="item.checked" v-for="item in budgetList" :key="item.OrderID" @change="change($event, item)">
          <!-- 国旅国际会议展览有限公司 -->
          {{ item.ServiceproviderName }}
          <em class="t_orange">¥{{ positiveFloat(item.Price) }}</em>
        </el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer flex_row justify_center mar_t20">
        <el-button size="small" @click="beforeClose()">取 消</el-button>
        <el-button type="primary" size="small" @click="nextStep()">下一步</el-button>
      </span>
    </el-dialog>
    <!-- 预算填报 第二步 -->
    <el-dialog class="budget" :visible.sync="budgetDialogDetails" :before-close="beforeClose" title="预算填报" width="70%" :close-on-click-modal="false">
      <div>
        <p class="mar_tb10">请确认您的预算</p>
      </div>
      <el-table :data="budgetInfo.costDetail" header-align="center" border style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="costItem" label="成本项" width="180" header-align="center">
          <template slot="header">
            <span style="color: red; margin-right: 3px"> * </span>
            <span> 成本项 </span>
          </template>
          <template slot-scope="scope">
            <el-select clearable v-model="scope.row.costItem">
              <el-option v-for="(item, index) in costsNames" :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="supplyId" label="供应商" header-align="center">
          <template slot="header">
            <span style="color: red; margin-right: 3px"> * </span>
            <span> 供应商 </span>
          </template>
          <template slot-scope="scope">
            <div @click="
                supplyDiolog = true;
                costIndex = scope.$index;
              ">
              <el-input placeholder="点击查询供应商" v-model="scope.row.supplyName" class="input-with-select" readonly>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="金额" width="180" header-align="center">
          <template slot="header">
            <span style="color: red; margin-right: 3px"> * </span>
            <span> 金额 </span>
          </template>
          <template slot-scope="scope">
            <el-input clearable v-model="scope.row.cost" @change="scope.row.cost = formatNum(scope.row.cost, 2)"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="新增" width="180" align="center">
          <template slot="header" slot-scope="scope">
            <el-button type="text" size="small" @click="addCost(scope)">新增</el-button>
          </template>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delCost(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- <div class="line">
				<div>成本项</div>
				<div>供应商</div>
				<div>金额</div>
			</div> -->

      <!-- <div class="line" style="flex-wrap: wrap;" v-for="(item, ind) in budgetInfo.costDetail" :key="item.costItem + ind + ''">
				<div style="flex: 0.5;">{{ item.costItemName }}</div>
				<div style="flex: 1.5;">
					<el-select
						v-if="item.splitFeeList.length <= 1"
						size="mini"
						v-model="item.supplyId"
						filterable
						placeholder="请选择供应商"
						@visible-change="visibleChange($event,ind)"
					>
						<el-option v-for="(ite, i) in ind==indexSel?budgetInfo.servicelist:[]" :key="ite.code" :label="ite.name" :value="ite.code"></el-option>
					</el-select>
				</div>
				<div style="flex: 1;display: flex;align-items: center;" class="t_orange">
					￥{{ parseFloat(item.cost ? item.cost : 0).toFixed(2) }}
					<el-button type="text" v-if="item.splitFeeList.length <= 1" @click="splitFee(ind, item.splitFeeList),item.supplyId=null">费用拆项</el-button>
				</div>
				<div
					v-if="item.splitFeeList.length > 1"
					style="width: 460px;display: flex;margin-left:20px ;align-items: center;margin-top: 10px;"
					v-for="(val, index) in item.splitFeeList"
					:key="index"
				>
					<div style="width: 50px;margin-right: 10px;">{{ item.costItemName }}{{ index + 1 }}</div>
					<div>
						<el-select
							size="mini"
							v-model="val.supplyId"
							@change="serviceList($event, index, ind)"
							filterable
							placeholder="请选择供应商"
							@visible-change="visibleChangeSplit($event,index,ind)"
						>
							<el-option v-for="(it, i) in index==indexSelSplit && ind==indexSel?budgetInfo.servicelist:[]" :key="it.code" :label="it.name" :value="it.code"></el-option>
						</el-select>
					</div>
					<div style="flex: 1;display: flex;align-items: center;" class="t_orange">
						￥
						<el-input size="mini" @input="changeInput($event, (val.cost = formatNum(val.cost)))" v-model="val.cost"></el-input>
						<el-button type="text" @click="splitFeeAdd(ind, index)">添加</el-button>
						<el-button type="text" @click="splitFeeDel(ind, index)">删除</el-button>
					</div>
				</div>
			</div> -->
      <div class="line">
        <div>总收入</div>
        <div></div>
        <div class="input_p">
          <p class="t_orange">￥</p>
          <el-input size="mini" @input="budgetInfo.cost = formatNum(budgetInfo.cost, 2)" v-model="budgetInfo.cost"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer flex_row justify_center mar_t20">
        <el-button size="small" @click="beforeClose()">取 消</el-button>
        <el-button type="primary" size="small" @click="budgetSubmit()">提 交</el-button>
      </span>
    </el-dialog>

    <!-- 供应商选择弹窗 -->
    <el-dialog :visible.sync="supplyDiolog" @open="GetSupplyList" title="选择供应商" width="80%" :close-on-click-modal="false">
      <el-form :inline="true" label-width="130px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="供应商ID">
              <el-input placeholder="订单号" v-model="search.id" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商一级类型">
              <el-select filterable v-model="search.supplierOneName" clearable>
                <el-option v-for="item in supplierOneNameList" :label="item" :value="item" :key="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商二级类型">
              <el-select filterable v-model="search.supplierTwoName" clearable>
                <el-option v-for="item in supplierTwoNameList" :label="item" :value="item" :key="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="供应商名称">
              <el-input placeholder="请输入供应商名称查询" v-model="search.supplierName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="统一社会信用代码">
              <el-input placeholder="请输入社会信用代码查询" v-model="search.socialCreditNo" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button type="primary" @click="GetSupplyList()">查询</el-button>
              <el-button type="primary" @click="searchReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="supplyTableData.List" @row-click="checkSupply" stripe height="100%" style="width: 100%">
        <el-table-column type="radio" label="选择" width="50">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.id"><i></i> </el-radio>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="id" label="供应商ID"> </el-table-column>
        <el-table-column prop="supplierName" label="供应商名称">
        </el-table-column>
        <el-table-column prop="supplierOneName" label="供应商一级类型">
        </el-table-column>
        <el-table-column prop="supplierTwoName" label="供应商二级类型">
        </el-table-column>
        <el-table-column prop="socialCreditNo" label="统一社会信用代码">
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination class="pages" background layout="total,prev, pager, next" :total="supplyTableData.Counts" :current-page="supplyTableData.CurrentPage" @current-change="currentChange">
        </el-pagination>
      </div>
    </el-dialog>

    <el-dialog class="submitSuccess" :show-close="false" :visible.sync="submitSuccess" title="" width="500px" :close-on-click-modal="false">
      <div class="budgetSubmit">预算提交成功!</div>
      <span slot="footer" class="dialog-footer flex_row justify_center mar_t20">
        <el-button type="primary" size="small" @click="gotoB2B('HZ00000202'), (submitSuccess = false)">立即查看</el-button>
      </span>
    </el-dialog>

    <!-- 留言弹窗 -->
    <el-dialog :visible.sync="megDialog" title="回复会议服务商" width="45%" align="center" :close-on-click-modal="false">
      <div class="messageList">
        <div class="msgc" v-for="(msg, index) in messageList" :key="index">
          <div :class="msg.type == 0 ? 'right' : 'left'">
            <div class="user_name">
              {{ msg.username + "@" + msg.createtime }}
            </div>
            <div class="message_line">
              <div v-if="msg.message_type == 0" class="message_txt">
                {{ msg.message }}
              </div>
              <div v-if="msg.message_type == 1" class="message_txt">
                <span class="fileMseeage" @click="handlePreview(msg.message)">
                  {{ msg.message.slice(0, msg.message.indexOf(",")) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-input :rows="6" type="textarea" size="small" v-model="message" placeholder="在此给会议服务商留言，您的每条留言系统都会邮件通知到会议服务商..."></el-input>
      </div>
      <span slot="footer" class="dialog-footer flex_row justify_center mar_t20">
        <el-button type="primary" size="small" @click="conversation">发送给销售</el-button>
      </span>
    </el-dialog>
    <!-- 邀请重新报价、修改报价截止时间 弹窗 -->
    <el-dialog :visible.sync="againDialog" :title="dialogType === 1 ? '邀请重新报价' : '修改报价截止时间'" width="500px">
      <div class="black mar_b10">
        <span class="contentd mar_r10">{{
          dialogType === 1 ? "重新报价截止时间" : "报价截止时间"
        }}</span>
        <el-date-picker v-model="reOfferendDate" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" size="small" default-time="12:00:00" :picker-options="pickerOptions0"></el-date-picker>
      </div>
      <el-input type="textarea" :rows="5" size="small" placeholder="请留言告知不满意的原因,方便会议服务商调整价格。如:客房部分价格降低10%,会场设备建议免费" v-model="textValue"></el-input>
      <span v-if="invalid" style="color: red; display: block">{{
        dialogType === 1 ? "请输入要求重新报价的理由" : "请输入原因"
      }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="dialogType === 1" @click="reQuote" class="submit">提 交</el-button>
        <el-button type="primary" v-if="dialogType === 2" @click="DelayEndTime" class="submit">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 催报价弹窗 -->
    <el-dialog :visible.sync="urgeOfferDialog" title="催报价" width="500px">
      <div class="black mar_b10">
        <p>{{ offerCompanyInfo.company_name }}</p>
        <p>销售人员：{{ offerCompanyInfo.contanct }}</p>
        <p>联系邮箱：{{ offerCompanyInfo.email }}</p>
        <p>
          我们会议短信、邮件等多种方式通知
          {{ offerCompanyInfo.company_name }} 尽快报价
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="cancel" @click="urgeOfferDialog = false" class="submit">取消</el-button>
        <el-button type="primary" @click="urgeOfferConfirm" class="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 完善工商信息弹窗 -->
    <el-dialog title="完善酒店工商信息" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" @close="closeDiv" :before-close="handleClose">
      <div class="hotelName">
        <p>酒店名称：{{ hotelName }}</p>
      </div>
      <!--  -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="营业执照名称：" prop="licenseName">
          <el-input v-model="ruleForm.licenseName" placeholder="请输入营业执照名称"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码：" prop="societyCode">
          <el-input v-model="ruleForm.societyCode" maxlength="18" placeholder="请输入统一社会信用代码"></el-input>
        </el-form-item>
      </el-form>
      <!--  -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="perfect(), (dialogVisible = true)">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatNum, positiveFloat, positiveFloatSix } from '@/utils/common'
import { MAINHOST } from '@/config'
import excelExport from '@/utils/exportexcel'
export default {
  name: 'stepTwo',
  props: ['eventId', 'eventName', 'isShowCancelBtn', 'isDMC'],
  data() {
    // 完善工商信息-信用代码校验规则
    const chackSocietyCode = (rule, value, callback) => {
      let reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的信用代码'))
      } else {
        callback()
      }
    }
    return {
      // 完善工商信息校验规则
      rules: {
        licenseName: [
          { required: true, message: '请输入营业执照名称', trigger: 'blur' }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        societyCode: [
          {
            required: true,
            message: '请输入统一社会信用代码',
            trigger: 'blur'
          },
          { validator: chackSocietyCode, trigger: 'blur' }
        ]
      },
      ruleForm: {
        licenseName: '',
        societyCode: ''
      },
      radio: true,
      downloadUrl: '',
      dialogType: 1,
      isTestEnv: true,
      stepTwo: '1',
      megDialog: false,
      againDialog: false, // 邀请重新报价
      againData: {}, // 重新报价信息
      reOfferendDate: '', // 重新报价截止时间
      urgeOfferDialog: false, // 催报价弹窗
      collectOfferData: {}, // 汇总报价
      textValue: '',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      showTimeLineOne: true,
      showTimeLineTwo: true,
      showTimeLineThree: true,
      isDemandHotel: false,
      isShowInquiry: false,
      isShowInquiry_hotel: false,
      editDemandDialog: false,
      budgetDialog: false, //预算填报第一步弹框显示、隐藏
      supplyDiolog: false, // 供应商选择弹窗
      invalid: false,
      hasRequirements: false,
      inquiryList: [],
      budgetList: [], //预算填报第一步列表信息
      demandInfo: {},
      provideName: [],
      providehotle: [],
      orderhotle: [],
      orderList: [],
      InquirySheetObjectID: '', //询价服务商ID
      message: '', // 留言信息
      messageList: [], // 留言信息列表
      offerCompanyInfo: {},
      budgetDialogDetails: false, //预算填报第二步弹框显示、隐藏
      submitSuccess: false, //预算填报提交成功弹框显示、隐藏
      orderIdList: [],
      chonseCost: 0, // 预算填报 第一步选择 预算报价金额总和
      budgetInfo: {}, //预算填报第二步信息
      pr: '',
      num: 0, //预算填报提交次数
      url: '', //b2b团预算跳转地址
      loading: false,
      dt: '', //B2B审核状态,''为未提交
      isSelShow: false, //预算填报下拉框列表dom节点是否显示
      indexSel: null, //预算填报外部select下标
      indexSelSplit: null, //预算填报拆分项select下标
      costIndex: '', // 要选择供应商的成本项下标
      costsNames: [], // b2b成本项下拉
      supplierOneNameList: [],
      supplierTwoNameList: [],
      search: {
        // 供应商查询条件
        id: '',
        supplierOneName: '',
        supplierTwoName: '',
        supplierName: '',
        socialCreditNo: ''
      },
      supplyTableData: [
        {
          supplyID: '123',
          type1: 'qwe',
          type2: 'asd',
          supplyName: 'zxc',
          supplyNum: 'fhgh'
        },
        {
          supplyID: '456',
          type1: 'qwe',
          type2: 'asd',
          supplyName: 'zxc',
          supplyNum: 'fhgh'
        }
      ], // 供应商列表数据
      commerce: {},
      dialogVisible: false,
      hotelName: '酒店名称',

      completeInformation: {}
    }
  },
  mounted() {
    if (window.location.host == 'tmc.ctgbs.com' || window.location.host == 'tmc.ctgbs.cn') {
      this.isTestEnv = false
    }
    this.getServiceProvider()
    this.orderQuery()
    this.isEdit()
    this.SummaryQuotedPrice()
    this.getDetail()
    this.budget()
    this.GetCostItem()
    this.GetSupplierdataDropDown()
    console.log(this.eventId)
  },
  methods: {
    formatNum,
    positiveFloat,
    excelExport,
    // 供应商列表重置
    searchReset() {
      for (const key in this.search) {
        if (Object.hasOwnProperty.call(this.search, key)) {
          this.search[key] = ''
        }
      }
      this.GetSupplyList()
    },
    // 供应商列表查询
    GetSupplyList(index) {
      let searchData = {
        dto: this.search,
        pageIndex: index || 1,
        pageSize: 10
      }
      this.requestApi({
        url: '/B2B/GetSupplierdata',
        method: 'POST',
        data: searchData
      }).then(res => {
        this.supplyTableData = res
      })
    },
    // 点击行 选取供应商
    checkSupply(row) {
      // 判断是单击操作还是 选择文本复制
      if (window.getSelection().toString() === '') {
        this.radio = row.id
        this.supplyDiolog = false
        this.radio = '' // 供应商选择弹窗关闭后上次取消选择
        this.budgetInfo.costDetail[this.costIndex].supplyId = row.id
        this.budgetInfo.costDetail[this.costIndex].supplyName = row.supplierName
      }
    },
    // 触发页码
    currentChange(page) {
      this.supplyTableData.CurrentPage = page
      this.GetSupplyList(page)
    },
    // 结算项下拉列表查询
    GetCostItem() {
      this.requestApi({
        url: '/B2B/GetCostItem',
        method: 'POST',
        data: {}
      }).then(res => {
        this.costsNames = res
      })
    },
    // 供应商类型查询
    GetSupplierdataDropDown() {
      this.requestApi({
        url: '/B2B/GetSupplierdataDropDown',
        method: 'POST',
        data: {}
      }).then(res => {
        this.supplierOneNameList = res.supplierOneNameList
        this.supplierTwoNameList = res.supplierTwoNameList
      })
    },
    //获取b2b团预算跳转地址
    gotoB2B(funcCode) {
      this.requestApi({
        url: '/b2b/autologin',
        method: 'POST',
        data: { funcCode: funcCode }
      }).then(res => {
        this.url = res
        setTimeout(() => {
          this.$refs.a_click.click()
        }, 100)
      })
    },
    getDetail() {
      // 获取会议基本信息
      this.requestApi({
        url: '/MeetingMa/GetMeetingList',
        method: 'POST',
        data: { MeetingID: this.$route.query.id }
      }).then(res => {
        this.dt = res.b2baudstatus + ''
        if (this.dt == '1') {
          this.budgetDialog = sessionStorage.getItem('budgetKey')
          sessionStorage.removeItem('budgetKey')
        }
        this.$forceUpdate()
      })
    },
    SummaryQuotedPrice() {
      this.requestApi({
        url: '/MeetingMa/SummaryQuotedPrice',
        method: 'POST',
        data: { MeetingID: this.$route.query.id }
      }).then(res => {
        this.collectOfferData = res
      })
    },
    // 查看比价也
    handleCommand(data, command, type) {
      // if(command == 1) {// 高级设置
      //   this.$router.push({path:'/advancedsetting', query:{id: this.eventId,eventName:this.eventName}})
      // } else if(command == 2) {// 取消会议
      //   this.cancelEventDialog = true;
      // }
      this.goCompare(data, command, type)
    },
    isOffer(data) {
      return data.some(item => {
        return item.state >= 0 && item.state != 6
      })
    },
    getMessage(InquirySheetObjectID) {
      this.InquirySheetObjectID = InquirySheetObjectID
      this.requestApi({
        url: '/MeetingMa/GetMessage',
        method: 'POST',
        data: { InquirySheetObjectID }
      }).then(res => {
        this.messageList = res || []
        // 留言标记已读
        this.requestApi({
          url: '/MeetingMa/UnreadMessage',
          method: 'POST',
          data: { InquirySheetObjectID }
        }).then(() => {
          this.getServiceProvider()
        })
      })
    },
    // 新页面打开酒店详情页
    jumpInfo(id) {
      this.$router.push({ name: 'hotelInfo', params: { id } })
      // let routeData = this.$router.resolve({
      //   name: "hotelInfo",
      //   params: { id },
      // });
      // window.open(routeData.href, "_blank"); //跳转新页面
    },
    excelDownLoad() {
      var name = '汇总报价单'
      this.excelExport('/Template/GetTemplate', { eventid: this.eventId, type: 1, param: this.eventId }, name)
    },
    // 预览留言文件
    handlePreview(filepath) {
      debugger
      filepath = filepath.slice(filepath.lastIndexOf(',') + 1)
      if (!filepath) return
      // 获取文件后缀名
      let suffix = filepath.substring(filepath.lastIndexOf('.') + 1)
      // doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
      let types1 = ['pdf', 'jpeg', 'jpg', 'png', 'txt']
      let types2 = ['docx', 'doc', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx']
      filepath = filepath.replace(/http:/, 'https:')
      this.downloadUrl = filepath
      if (types2.includes(suffix)) {
        this.downloadUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(filepath)
      } else if (types1.includes(suffix)) {
        this.downloadUrl = filepath
      } else {
        this.$message.info('文件格式不支持预览，下载后查看')
      }
      // this.downloadUrl= 'https://view.xdocin.com/view?src=' + encodeURIComponent(file.url)
      setTimeout(() => {
        this.$refs.b_click.click()
      }, 100)
    },
    // 留言下载文件
    downloadFile(fileStr) {
      let downloadUrl = fileStr.slice(fileStr.lastIndexOf(',') + 1)
      let filename = fileStr.slice(0, fileStr.lastIndexOf(','))
      let a_link = document.createElement('a')
      // // 这里是将url转成blob地址，
      // fetch(downloadUrl).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
      // a_link.href = URL.createObjectURL(blob)
      a_link.href = downloadUrl
      // 	console.log(a_link.href)
      a_link.download = filename //下载的文件的名字/
      document.body.appendChild(a_link)
      a_link.click()
      // })
    },
    againDialogTap(data, type) {
      this.againDialog = true
      if (type == 2) {
        // 延长报价时间 默认24小时后
        let defaultDate = new Date().getTime()
        defaultDate += 24 * 60 * 60 * 1000

        this.reOfferendDate = new Date(defaultDate)
      }
      this.againData = data
      this.dialogType = type
    },
    isEdit() {
      this.requestApi({
        url: '/MeetingMa/WhetherInquiry',
        method: 'POST',
        data: { MeetingID: this.$route.query.id }
      }).then(res => {
        // false不可以去询价，true可以去询价
        this.hasRequirements = res
      })
    },
    // 邀请重新报价
    reQuote() {
      let Parameter = {
        status: 3,
        id: this.againData.quoted_priceid, // 报价单ID
        inquiry_sheet_object_id: this.againData.id, //服务商ID
        message: this.textValue,
        offerenddate: this.reOfferendDate
      }
      if (this.textValue.trim() === '') {
        this.invalid = true
        return false
      } else {
        Parameter.message = this.textValue
      }
      this.invalid = false
      this.requestApi({
        url: '/MeetingMa/QuotedPriceStatus',
        method: 'POST',
        data: { Parameter: JSON.stringify(Parameter) }
      }).then(res => {
        if (res) {
          this.$message.success(res.msg)
          this.againDialog = false
          this.getServiceProvider()
        }
      })
    },
    urgeOffer(item) {
      this.offerCompanyInfo.id = item.id
      this.offerCompanyInfo.company_name = item.company_name
      this.offerCompanyInfo.contanct = item.customer_service_name
      this.offerCompanyInfo.email = item.company_email
      this.urgeOfferDialog = true
    },
    //
    urgeOfferConfirm() {
      this.requestApi({
        url: '/MeetingMa/UrgingQuotedPrice',
        method: 'POST',
        data: { InquirySheetObjectID: this.offerCompanyInfo.id }
      }).then(res => {
        this.$message.success('发送成功')
        this.urgeOfferDialog = false
      })
    },

    // 延长报价时间
    DelayEndTime() {
      let Parameter = {
        id: this.againData.id, //服务商ID
        message: this.textValue,
        offerenddate: this.reOfferendDate
      }
      this.requestApi({
        url: '/MeetingMa/DelayEndTime',
        method: 'POST',
        data: { Parameter: JSON.stringify(Parameter) }
      }).then(res => {
        if (res) {
          this.$message.success('保存成功')
          this.againDialog = false
          this.getServiceProvider()
        }
      })
    },
    // 跳转页面
    goPage(name, query) {
      this.$router.push({ name, query })
    },
    // 跳转详情页
    checkOrUpdateOffer() {
      this.requestApi({
        url: '/MeetingMa/CreateInquirySheet',
        method: 'POST',
        data: { MeetingID: this.eventId }
      }).then(res => {
        if (res) {
          this.$router.push({
            name: 'DMCinquiryInfo',
            params: {
              id: res
            }
          })
        }
      })
    },
    goquotedprice() {
      this.$router.push({
        name: 'quotedprice',
        params: {
          id: this.info.object_id,
          isSubmit: 1
        }
      })
    },

    // 复制报价链接
    copyUrl(item, type) {
      let url = ''
      // debugger;
      if (type == 0) {
        // 酒店
        // interlinkage
        this.requestApi({
          url: '/ResourcesApi/HotelLike',
          method: 'POST',
          data: { inquiryObjectID: item.id }
        }).then(res => {
          if (res) {
            debugger
            url = res
            var copyTest = url
            var inputTest = document.createElement('input')
            inputTest.value = copyTest
            document.body.appendChild(inputTest)
            inputTest.select()
            document.execCommand('Copy')
            inputTest.className = 'oInput'
            inputTest.style.display = 'none'
            this.$message.success('复制成功')
          }
        })
      } else {
        // 服务商
        url = MAINHOST + '/html/meeting/#/activityInquiry/DMCorderList/' + item.id
        var copyTest = url
        var inputTest = document.createElement('input')
        inputTest.value = copyTest
        document.body.appendChild(inputTest)
        inputTest.select()
        document.execCommand('Copy')
        inputTest.className = 'oInput'
        inputTest.style.display = 'none'
        this.$message.success('复制成功')
      }
    },
    // 临时改变订单状态
    changeStatus(orderId) {
      this.requestApi({
        url: '/MeetingMa/TemporaryOrderfrom',
        method: 'POST',
        data: { OrderFromID: orderId }
      }).then(res => {
        this.orderQuery()
      })
    },
    // 前往比价页
    goCompare(item, command, type) {
      // command  1仅线上 2含线下  type：hotel/service
      this.$router.push({
        name: 'comparisonPrice',
        query: {
          InquirySheetID: item.id,
          eventId: this.$route.query.id,
          command,
          type
        }
        // path: "/activityInquiry/comparisonPrice/" + item.id,
        // query: {
        //   id: this.$route.query.id,
        //   command,
        //   type,
        // },
      })
    },
    //editDemand
    editDemand() {
      this.editDemandDialog = true
    },
    editDemandConfirm(ischeck) {
      if (this.isDMC) {
        this.$router.push({
          name: 'DMCEventDemand',
          query: {
            id: this.eventId,
            name: this.$route.query.name,
            eventSearchType: this.$route.query.eventSearchType,
            type: ischeck === 'check' ? 'check' : 'edit'
          }
        })
      } else {
        this.$router.push({
          name: 'EventDemand',
          query: {
            id: this.eventId,
            name: this.$route.query.name,
            eventSearchType: this.$route.query.eventSearchType,
            type: ischeck === 'check' ? 'check' : 'edit'
          }
        })
      }
    },
    handleStepTwo() {},
    goDemand(type) {
      let city_code = localStorage.getItem('event_city_code') ? '/' + localStorage.getItem('event_city_code') : ''
      if (type === 1) {
        // 酒店
        this.$router.replace({
          name: 'siteResource',
          params: {
            id: this.eventId,
            city: city_code,
            type: 'addhotel'
          }
        })
      } else if (type === 2) {
        // 是否含酒店
        this.isDemandHotel = true
      } else if (type === 3) {
        //立即采购(不含酒店)
        // this.$router.push({
        //   path: "/ServiceProvidercg/" + this.eventId + city_code + "/3",
        // });
        this.$router.push({
          name: 'ServiceProvider',
          params: {
            id: this.eventId,
            city: city_code,
            type: '3'
          }
          // path: '/ServiceProvidercg/' + this.eventId + city_code + '/3',
        })
      } else if (type === 4) {
        // 立即采购(含酒店)
        // this.$router.push({
        //   path: "/ServiceProvidercg/" + this.eventId + city_code + "/2",
        // });
        this.$router.push({
          name: 'ServiceProvider',
          params: {
            id: this.eventId,
            city: city_code,
            type: '2'
          }
          // path: '/ServiceProvidercg/' + this.eventId + city_code + '/3',
        })
      }
    },
    // 前往大交通
    goTrafficTap() {
      this.$router.push({ path: '/large', query: { id: this.eventId } })
    },
    //查看询价单
    viewRfq(data, type) {
      this.$router.push({
        name: 'servicedetails',
        // path: "/servicedetails",
        query: { id: this.eventId, sheetId: data.id, type }
      })
    },
    // 留言
    conversation() {
      if (!this.message.trim()) {
        this.$message.error('请输入留言信息')
        return
      }
      const Parameter = {
        inquiry_sheet_object_id: this.InquirySheetObjectID,
        message: this.message,
        message_type: 0 // 留言是0，文件是1
      }
      this.requestApi({
        url: '/MeetingMa/MessageSava',
        method: 'POST',
        data: { Parameter: JSON.stringify(Parameter) }
      }).then(res => {
        if (res && res === true) {
          // this.megDialog = false;
          this.message = ''
          this.getMessage(this.InquirySheetObjectID)
        }
      })
    },
    //会议服务商询价单
    getServiceProvider() {
      this.requestApi({
        url: '/MeetingMa/GetServiceProvider',
        method: 'POST',
        data: { MeetingID: this.$route.query.id }
      }).then(res => {
        this.provideName = res.service ? res.service : []
        this.provideName.forEach(item => {
          item.isShowInquiry_hotel = true
        })
        this.providehotle = res.hotel ? res.hotel : []
        this.providehotle.forEach(item => {
          item.isShowInquiry = true
        })
        this.$forceUpdate()
      })
    },
    // 询价单展开收缩  type: 1服务商  2 酒店
    isShowTap(type, id) {
      if (type === 1) {
        this.provideName[id].isShowInquiry_hotel = !this.provideName[id].isShowInquiry_hotel
      } else {
        this.providehotle[id].isShowInquiry = !this.providehotle[id].isShowInquiry
      }
      this.$forceUpdate()
    },
    //订单查询
    orderQuery() {
      this.requestApi({
        url: '/MeetingMa/GetOrderform',
        method: 'POST',
        data: { MeetingID: this.$route.query.id }
      }).then(res => {
        this.orderList = res.service ? res.service : []
        this.orderhotle = res.hotel ? res.hotel : []
      })
    },
    // 新增成本项
    addCost() {
      let addData = {
        costItemName: '',
        supplyId: '',
        cost: ''
      }
      this.budgetInfo.costDetail.push(addData)
    },
    // 删除成本项
    delCost(scoped) {
      let index = scoped.$index
      this.budgetInfo.costDetail.splice(index, 1)
    },
    //预算填报第二步，费用拆分，单项拆成多项，多项相加不得超出单项
    changeInput(e) {
      this.$forceUpdate()
      this.budgetInfo.costDetail.forEach(item => {
        var sum = 0
        item.splitFeeList.forEach(val => {
          sum += parseFloat(val.cost)
        })
        if (item.cost < sum) {
          this.$message.error('不得超出总额')
        }
      })
    },
    //预算填报第二步，费用拆分，单项拆成多项，多项之间供应商不能相同
    serviceList(e, index_, indexc) {
      this.$forceUpdate()
      this.budgetInfo.costDetail[indexc].splitFeeList.forEach((val, i) => {
        if (val.supplyId == e && i != index_) {
          this.$message.error('供应商不能相同！')
          return 0
        }
      })
    },
    //预算填报第二步，费用拆分
    splitFee(i, list) {
      this.budgetInfo.costDetail[i].splitFeeList.push(
        {
          costItem: this.budgetInfo.costDetail[i].costItem,
          costItemName: this.budgetInfo.costDetail[i].costItemName,
          supplyId: '',
          cost: '0'
        },
        {
          costItem: this.budgetInfo.costDetail[i].costItem,
          costItemName: this.budgetInfo.costDetail[i].costItemName,
          supplyId: '',
          cost: '0'
        }
      )
      this.$forceUpdate()
    },
    //预算填报第二步，费用拆分，添加分项
    splitFeeAdd(i, index) {
      this.budgetInfo.costDetail[i].splitFeeList.push({
        costItem: this.budgetInfo.costDetail[i].costItem,
        costItemName: this.budgetInfo.costDetail[i].costItemName,
        supplyId: '',
        cost: '0'
      })
      this.$forceUpdate()
    },
    //预算填报第二步，费用拆分，删除分项
    splitFeeDel(i, index) {
      this.budgetInfo.costDetail[i].splitFeeList.splice(index, 1)
      if (this.budgetInfo.costDetail[i].splitFeeList.length == 1) {
        this.budgetInfo.costDetail[i].splitFeeList.splice(0, 1)
      }
      this.$forceUpdate()
    },
    beforeClose() {
      this.budgetDialog = false
      this.budgetDialogDetails = false
      this.chonseCost = 0
      if (this.num > 0) {
        this.cancelSuccess = true
      }
    },
    change(e, item) {
      if (e) {
        this.orderIdList.push(item.OrderID)
        this.chonseCost += this.formatNum(item.Price, 2) * 1
      } else {
        this.orderIdList = this.orderIdList.filter(i => {
          return i != item.OrderID
        })
        this.chonseCost -= this.formatNum(item.Price, 2) * 1
      }
    },
    nextStep() {
      if (this.orderIdList.length == 0) {
        this.$message({
          type: 'warning',
          message: '请勾选服务商!'
        })
        return
      }
      this.budgetDialog = false
      this.budgetDialogDetails = true
      this.budgetDetails() //填报预算(明细)
    },
    //填报预算(合计)
    budget() {
      this.requestApi({
        url: '/Quotation/FillinBuget',
        method: 'POST',
        data: { eventinfoid: this.eventId }
      }).then(res => {
        //console.log(res)
        res = res.filter(e => {
          e['checked'] = false
          return true
        })
        if (res[0] && res[0].budget_count) this.num = res[0].budget_count
        this.budgetList = res
        this.orderIdList = []
        sessionStorage.setItem('budgetNumKey', this.num) //存入键值,预算填报次数，在取消询价单、订单时使用
      })
    },
    //填报预算(明细)
    budgetDetails() {
      this.requestApi({
        url: '/Quotation/FillinBugetDetail',
        method: 'POST',
        data: { OrderIDS: this.orderIdList }
      }).then(res => {
        // console.log(res);
        this.budgetInfo = res
        this.budgetInfo.pr = this.pr
        this.budgetInfo.costDetail = this.budgetInfo.costDetail.filter(e => {
          if (Number(e.cost) > 0) {
            e['splitFeeList'] = []
            return true
          }
        })
        this.budgetInfo.costDetail.forEach(item => {
          item.cost = this.formatNum(item.cost, 2)
        })
        this.budgetInfo.cost = Number(this.formatNum(this.chonseCost, 2)).toFixed(6)
        console.log(this.budgetInfo.cost)
      })
    },
    //填报预算明细总和
    /* priceSum() {
			var priSum = 0;
			if (this.budgetInfo.costDetail != undefined && this.budgetInfo.costDetail != null) {
				this.budgetInfo.costDetail.forEach(e => {
					priSum += parseFloat(e.cost ? e.cost : 0);
				});
			}
			return this.budgetInfo.cost=parseFloat(priSum).toFixed(2);
		}, */
    //预算填报提交
    budgetSubmit() {
      var isSuspend = null
      isSuspend = this.budgetInfo.costDetail.some((item, index) => {
        //校验
        for (var i = index + 1; i < this.budgetInfo.costDetail.length; i++) {
          if (item.costItem == this.budgetInfo.costDetail[i].costItem && item.supplyId == this.budgetInfo.costDetail[i].supplyId) {
            this.$message.error('相同费用项的供应商不能相同！')
            return true
            break
          }
        }
        // var sum = 0;
        // var list = [];
        // 费用拆分 子项白遍历
        // item.splitFeeList.some((val, i) => {
        // 	sum += parseFloat(val.cost);
        // 	list.push(val.supplyId);
        // });
        // if (new Set(list).size !== list.length) {
        // 	this.$message.error('供应商不能相同！');
        // 	return true;
        // }
        // if (item.splitFeeList.length != 0 && item.cost != sum) {
        // 	this.$message.error('需要将应付信息根据成本项、供应商进行汇总');
        // 	return true;
        // }
        return false
      })
      // 提交必填项校验
      for (var i = 0; i < this.budgetInfo.costDetail.length; i++) {
        if (this.budgetInfo.costDetail[i].costItem == '' || this.budgetInfo.costDetail[i].costItem == null) {
          this.$message.error(`第${i + 1}行 成本项 不能为空`)
          isSuspend = true
          break
        }
        if (this.budgetInfo.costDetail[i].supplyId == '' || this.budgetInfo.costDetail[i].supplyId == null) {
          this.$message.error(`第${i + 1}行 供应商 不能为空`)
          isSuspend = true
          break
        }
        if (this.budgetInfo.costDetail[i].cost == '' || this.budgetInfo.costDetail[i].cost == null) {
          this.$message.error(`第${i + 1}行 金额 不能为空`)
          isSuspend = true
          break
        }
      }

      if (isSuspend) return

      var submit = {}
      var teambudget = {}
      var teamList = []
      teambudget = JSON.parse(JSON.stringify(this.budgetInfo))
      teambudget.costDetail.forEach((e, i) => {
        //"费用拆分"整理到列表中
        if (e.splitFeeList != undefined && e.splitFeeList.length != 0) {
          var list = []
          list = JSON.parse(JSON.stringify(e.splitFeeList))
          list.forEach(v => {
            teamList.push(v)
          })
        } else {
          teamList.push(e)
        }
      })
      teambudget.costDetail = teamList
      submit = {
        event_info_id: this.eventId, //"320ac3f5-dbdf-4c33-aa17-d197747f2b9a"
        teambudget: teambudget
      }
      this.requestApi({
        url: '/B2B/TeamBudget',
        method: 'POST',
        data: submit
      }).then(res => {
        // console.log(res);
        // this.budgetDialogDetails = false;
        if (res.status == 1) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.submitSuccess = true
          this.budgetDialogDetails = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    //控制下拉框里的dom节点
    visibleChange(e, index) {
      this.isSelShow = e
      if (this.isSelShow) {
        this.indexSel = index
      } else {
        this.indexSel = -1
      }

      this.$forceUpdate()
    },
    //控制下拉框里的dom节点
    visibleChangeSplit(e, indexSplit, index) {
      this.isSelShowSplit = e
      if (this.isSelShowSplit) {
        this.indexSelSplit = indexSplit
        this.indexSel = index
      } else {
        this.indexSelSplit = -1
        this.indexSel = -1
      }

      this.$forceUpdate()
    },
    // 完善工商信息
    perfect() {
      // 表单提交前预验证
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //
          console.log('123hkz')
          console.log(this.completeInformation)
          let params = {
            resourcesId: this.completeInformation.id,
            licenseName: this.ruleForm.licenseName,
            creditCode: this.ruleForm.societyCode
          }
          this.requestApi({
            url: '/ResourcesApi/BusinessPerfectInfo',
            method: 'POST',
            data: params
          }).then(res => {
            console.log(res)
            if (res) {
              this.getServiceProvider()
              this.$message({
                message: '提交成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '提交失败',
                type: 'error'
              })
            }
            this.dialogVisible = false
          })
        } else {
          // 表单验证错误
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDiv() {
      this.$refs['ruleForm'].resetFields()
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then((_) => {
      done()
      //   })
      //   .catch((_) => {});
    },
    complete(item) {
      this.completeInformation = item
      this.hotelName = this.completeInformation.company_name
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.step_two {
  margin-top: 35px;
  background: white;
  .step_card {
    border: 1px solid #e8e8e8;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .time_line_title {
    margin-top: -10px;
    margin-bottom: 15px;
  }
  .purchase_demand {
    .purchase_demand_title {
      span:nth-child(1) {
        font-size: 14px;
        color: #daa873;
      }
      p {
        padding: 15px 20px;
      }
    }
    .purchase_demand_main {
      padding: 15px 40px;
      .purchase_demand_main_title {
        .pos_demand {
          top: 3px;
          left: -15px;
          cursor: pointer;
        }
      }
      .purchase_demand_main_body {
        margin-top: 15px;
      }
    }
  }
  .traffic {
    width: 60%;
    img {
      width: 40px;
      margin-right: 10px;
    }
  }
  .demand_info_part {
    font-size: 14px;
    border-radius: 4px;
    background-color: #f2f2f3;
    padding: 14px 35px;
    em {
      color: #0091ef;
    }
  }
  .demand_list {
    span {
      padding-right: 20px;
    }
  }
  .budget {
    .line {
      display: flex;
      align-items: center;
      margin-top: 5px;
      .input_p {
        display: flex;
        align-items: center;
      }
    }
  }
  .submitSuccess {
    .budgetSubmit {
      text-align: center;
      color: #00b100;
      font-size: 20px;
    }
  }

  .cancelSuccess {
    .budgetCancel {
      text-align: center;
    }
  }
}
.select_hotel {
  background: #fffdf3;
}
.select_hotel {
  width: 100%;
  border-collapse: collapse;
}
.select_hotel th,
.select_hotel td {
  border-left: none;
  border-right: none;
}

.select_hotel th {
  border-width: 1px 1px 2px 1px;
  border-color: #e4e4e4;
  border-style: solid;
  color: #787878;
  font-size: 14px;
  line-height: 20px;
  font-weight: normal;
  padding: 12px 10px;
  text-align: left;
  word-break: break-all;
  word-wrap: break-word;
}
.international-order-span {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #999999;
  font-weight: normal;
}
.select_hotel th,
.select_hotel td {
  border-left: none;
  border-right: none;
}
.select_hotel td {
  border: 1px solid #e4e4e4;
  padding: 10px;
  font-size: 14px;
  color: #787878;
  line-height: 20px;
  text-align: left;
  word-break: break-all;
  word-wrap: break-word;
}
.select_hotel .name {
  padding: 0 0 0 20px;
}
.select_hotel .name .ico {
  font-size: 14px;
  color: #f91;
  float: left;
  margin: 0 0 0 -20px;
}

.ico {
  font-family: 'biz';
}
.demand_btn {
  text-align: center;
  border: 1px solid #4ea9f0;
  margin-right: 20px;
  padding: 8px 15px;
  line-height: 20px;
  color: #2896eb;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  user-select: none;
}
.demand_btn:hover {
  color: #fff;
  background: #4ea9f0;
}
.disabled {
  text-align: center;
  margin-right: 20px;
  padding: 8px 15px;
  line-height: 20px;
  cursor: pointer;
  color: #ccc;
  border: 1px solid #ccc;
  background: none;
  border-radius: 5px;
  margin-top: 20px;
  user-select: none;
}
.select_hotel .dark {
  color: #282828;
  line-height: 20px;
  font-size: 14px;
}
.select_hotel .gray {
  color: #787878;
  line-height: 20px;
  font-size: 14px;
}
.select_hotel .refuse {
  display: inline-block;
  text-align: center;
  line-height: 16px;
  font-size: 12px;
  color: #fff;
  padding: 0 5px;
  border-radius: 8px;
  background: #a2a4a9;
}
.select_hotel th,
.select_hotel td {
  border-left: none;
  border-right: none;
}
.select_hotel .hotel_link {
  display: flex;
  justify-content: space-between;
}
.select_hotel .hotel_link a {
  margin: 0 5px 0 0;
  display: inline-block;
  white-space: nowrap;
  position: relative;
}

.select_hotel a {
  font-size: 14px;
  color: #2896eb;
  text-decoration: none;
}
///
.create_public {
  padding: 10px 20px;
}
.create_table {
  width: 100%;
  border: 1px solid #e4e4e4;
}

table {
  border-collapse: collapse;
}
.create_public th {
  border: none;
}

.create_table th {
  font-size: 14px;
  font-weight: 600;
  color: #787878;
  text-align: left;
  padding: 12px 20px;
  border-bottom: 1px solid #e4e4e4;
}
.create_public th {
  border: none;
}

.create_table .bargain_name .ico {
  color: #f91;
  font-size: 14px;
}
.ico {
  font-family: 'biz';
}
.create_table .price {
  font-weight: 600;
  color: #f91;
  font-family: 'Microsoft Yahei';
}
.create_table .create_link {
  display: flex;
  justify-content: space-around;
}
.create_table .create_link a {
  margin: 0 5px 0 0;
  display: inline-block;
  position: relative;
}

.create_table a {
  font-size: 14px;
  color: #2896eb;
  text-decoration: none;
}
.create_table tr {
  padding: 8px 0;
  border-bottom: 1px solid #e4e4e4;
}
.create_table tr td {
  padding: 0px 20px;
  border-bottom: 1px solid #e4e4e4;
}
.el-button--text {
  font-size: 15px;
}
.view-deny-reason {
  display: inline-block;
  height: 16px;
  line-height: 16px;
  padding: 0 5px;
  font-size: 12px;
  background: #06c;
  color: #fff;
  cursor: pointer;
  border-radius: 8px;
}
.messageList {
  height: 210px;
  padding: 10px 0;
  overflow: auto;
  .msgc {
    padding: 10px 0 0 0;
    .user_name {
      width: 450px;
      margin: 0 0 5px 0;
      line-height: 20px;
      font-size: 12px;
      color: #787878;
    }
    .message_txt {
      position: relative;
      max-width: 400px;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 14px;
      line-height: 20px;
      font-family: Arial, 'Microsoft YaHei', SimSun, sans-serif;
      word-break: break-all;
      white-space: normal;
    }
    .message_line {
      width: 100%;
      clear: both;
    }
    .message_line:after {
      content: '.';
      display: block;
      visibility: hidden;
      clear: both;
      height: 0;
    }
    .left {
      .user_name {
        float: left;
        text-align: left;
      }
      .message_txt {
        float: left;
        background: #f1f1f1;
        color: #282828;
      }
    }
    .right {
      .user_name {
        float: right;
        text-align: right;
      }
      .message_txt {
        float: right;
        background: #47b0ed;
        color: #fff;
      }
    }
  }
}
.bid {
  background: #f91;
  color: #fff;
  border-radius: 10px;
  padding: 3px 7px;
}
.line > div:nth-of-type(1) {
  flex: 1;
}

.line > div:nth-of-type(2) {
  flex: 3;
}

.line > div:nth-of-type(3) {
  flex: 1;
}
.warnning {
  color: red;
  margin-bottom: 10px;
}
.fileMseeage {
  color: #fff;
  cursor: pointer;
}
.fileMseeage:hover {
  color: cornflowerblue;
}
.hotelName {
  font-size: 14px;
  color: #606266;
  margin-left: 68px;
  margin-bottom: 20px;
}
</style>
