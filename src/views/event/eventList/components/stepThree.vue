<template>
  <div class="step_three">
    <a v-show="false" :href="url" target="_blank" ref="a_click"></a>
    <div>
      <div class="flex_row align_center">
        <div class="stepName mar_b10">
          <strong>Step 5</strong>
          <span>
            会后结算
            <em>Bill Settlement&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em>
          </span>
        </div>
        <div class="showBase_tap flex_row align_center" @click="showTimeLineFive = !showTimeLineFive">
          <img :src="
              showTimeLineFive
                ? require('@/assets/images/close.png')
                : require('@/assets/images/open.png')
            " alt="" />
          <span>{{ showTimeLineFive ? "收起" : "展开" }}</span>
        </div>
      </div>
    </div>
    <div v-if="showTimeLineFive" class="demand_main_three">
      <div class="purchase_demand bor_e2" v-if="provider.length > 0">
        <div class="purchase_demand_title bor_b_e4 bg_fa">
          <p>会议服务商费用Travel Agency Bill</p>
          <!-- <span style="float: right; margin-top: -33px; margin-right:50px ;">总金额 {{ item.settlement_total_price }}</span> -->
        </div>
        <div class="purchase_demand_main_body">
          <div class="create_public">
            <table class="create_table hotel_bill_list">
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
                    <span class="international-order-span">PO Spending</span>
                  </th>
                  <th width="10%">
                    总结算价
                    <span class="international-order-span">Actual Spending</span>
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
                <tr v-for="(item, index) in provider" :key="index">
                  <td>
                    <span class="black">{{ item.num }}</span>
                  </td>
                  <td>
                    <div class="bargain_name">
                      <i class="ico non"><img :src="require('@/assets/images/badge.png')" alt="" style="width: 15px; height: 15px" /></i>
                      <a href="/cmms/hotel/detail?id=295" target="_blank">{{
                        item.name
                      }}</a>
                    </div>
                  </td>
                  <td>
                    <dfn>￥</dfn>
                    {{ positiveFloat(item.total_price, true).toFixed(2) }}
                  </td>
                  <td>
                    <strong class="price">
                      <dfn>￥</dfn>
                      <span>{{
                        positiveFloat(item.settlement_total_price, true).toFixed(2)
                      }}</span>
                    </strong>
                  </td>
                  <td>{{ item.statusname }}</td>
                  <td>
                    <div class="create_link">
                      <el-badge v-if="item.settlementid" is-dot :hidden="item.remind == '0'" style="margin-left: 10px">
                        <el-button size="small" type="text" @click="goPage('msd', item)">查看结算单</el-button>
                      </el-badge>
                      <el-button size="small" type="text" @click="goPage('provider', item)" style="margin-left: 10px">查看订单</el-button>
                      <el-button size="small" type="text" @click="goPage('servicedetails', item)">原询价单</el-button>
                      <el-button size="small" type="text" @click="copyUrl(item, 1)">复制结算链接</el-button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="purchase_demand bor_e2 mar_t10" v-if="hotelExpenses.length > 0">
        <div class="purchase_demand_title bor_b_e4 bg_fa">
          <p>酒店费用 Hotel Bill</p>
          <!-- <span style="float: right; margin-top: -33px; margin-right:50px ;">总金额 {{ item.settlement_total_price }}</span> -->
        </div>
        <div class="purchase_demand_main_body">
          <div class="create_public">
            <table class="create_table hotel_bill_list">
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
                    <span class="international-order-span">PO Spending</span>
                  </th>
                  <th width="10%">
                    总结算价
                    <span class="international-order-span">Actual Spending</span>
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
                <tr v-for="(item, index) in hotelExpenses" :key="index">
                  <td>
                    <span class="black">{{ item.num }}</span>
                  </td>
                  <td>
                    <div class="bargain_name">
                      <i class="ico non"><img :src="require('@/assets/images/badge.png')" alt="" style="width: 15px; height: 15px" /></i>
                      <!-- <a href="/cmms/hotel/detail?id=295" target="_blank">{{ item.name }}</a> -->
                      <el-button type="text" @click="jumpInfo(item.hotel_id)">{{
                        item.name
                      }}</el-button>
                    </div>
                  </td>
                  <td>
                    <dfn>￥</dfn>
                    {{ positiveFloat(item.total_price, true) }}
                  </td>
                  <td>
                    <strong class="price">
                      <dfn>￥</dfn>
                      <span>{{
                        positiveFloat(item.settlement_total_price, true)
                      }}</span>
                    </strong>
                  </td>
                  <td>{{ item.statusname }}</td>
                  <td>
                    <div class="create_link">
                      <el-badge v-if="item.settlementid" is-dot :hidden="item.remind == '0'" style="margin-left: 10px">
                        <el-button size="small" type="text" @click="goPage('msd', item)">查看结算单</el-button>
                      </el-badge>
                      <el-button size="small" type="text" @click="goPage('provider', item)" style="margin-left: 10px">查看订单</el-button>
                      <el-button size="small" type="text" @click="goPage('servicedetails', item)">原询价单</el-button>
                      <!-- <el-button size="small" type="text" @click="copyUrl(item, 0)">复制结算链接</el-button> -->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="flex_row justify_between" style="border: 1px solid #e4e4e4">
        <div class="flex_row justify_between" style="padding: 20px; border: 1px dashed; margin: 15px 20px">
          <p style="font-size: 18px">结算汇总：</p>
          <div>
            <p>
              线下报价净价：￥{{
                positiveFloat(
                  collectSettlementData.offline_quotedPrice_net_price,
                  true
                )
              }}
            </p>
            <p>
              线下结算净价：￥{{
                collectSettlementData.offline_settlementSheet_net_price
              }}
            </p>
            <p>汇总结算净价：￥{{ collectSettlementData.net_price }}</p>
            <p>汇总结算税前：￥{{ collectSettlementData.pre_tax }}</p>
            <p style="font-weight: 900">
              汇总结算税后：
              <span style="color: #f91">￥{{ collectSettlementData.after_tax }}</span>
            </p>
          </div>
        </div>
        <div style="
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          ">
          <div class="mar_r30">
            <el-button size="mini" type="text" v-if="eventStatu >= 4 && isnotquote" @click="goToOfflineSet(1)">填写线下报价项结算</el-button>
            <el-button size="mini" type="text" v-if="eventStatu >= 4" @click="excelDownLoad()">下载汇总结算单</el-button>
            <el-button size="mini" type="text" v-if="eventStatu >= 4" @click="goToOfflineSet(0)">查看汇总结算单</el-button>
            <el-button size="mini" type="text" v-if="dt != ''" @click="settle = true">结算填报</el-button>
            <el-button v-if="num > 0 && dt != ''" size="mini" type="text" @click="gotoB2B('HZ00000501')">查看B2B团结算</el-button>
            <el-button v-if="num <= 0 && dt != ''" size="mini" type="text" @click="gotoB2B('HZ00000503')">查看B2B团结算</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算填报 第一步 -->
    <el-dialog :visible.sync="settle" @open="budget()" title="结算填报" :before-close="beforeClose" width="500px" :close-on-click-modal="false">
      <div>
        <div v-if="num > 0" class="warnning">
          注:若非首次提交结算，提交后B2B系统会自动与历史结算金额取差值，作为补充结算。
        </div>
        <div><span>本次需要提交的结算单:</span></div>
        <el-checkbox class="checkbox" @change="change($event, item)" v-model="item.Checked" v-for="item in settlementList" :key="item.SettlementID">
          <!-- 国旅国际会议展览有限公司 -->
          {{ item.ServiceproviderName }}
          <em class="t_orange">¥{{ positiveFloat(item.Price) }}</em>
        </el-checkbox>
        <!-- <div class="amountReceivable">
					<span class="should">应收金额</span>
					<span class="t_orange">¥</span>
					<el-input v-model="this.priceSum()" :readonly="true" class="shouldInput" size="mini"></el-input>
				</div> -->
        <div v-if="num > 0" class="amountReceivable">
          <span class="should">调整原因</span>
          <el-input class="causeInput" v-model="memo" size="mini"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer flex_row justify_center mar_t20">
        <el-button size="small" @click="beforeClose()">取 消</el-button>
        <el-button type="primary" size="small" @click="nextStep()">下一步</el-button>
      </span>
    </el-dialog>

    <!-- 结算填报 第二步 -->
    <el-dialog class="budget" :close-on-click-modal="false" :before-close="beforeClose" :visible.sync="budgetDialogDetails" title="结算填报" width="70%">
      <div>
        <p class="mar_tb10">请确认您的结算成本项</p>
      </div>
      <el-table :data="budgetInfo.costlist" header-align="center" border style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="costItemName" label="成本项" width="180" header-align="center">
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
        <el-table-column prop="cost" label="新增" width="180" align="center">
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
      <!-- <div class="line" style="flex-wrap: wrap;" v-for="(item, ind) in budgetInfo.costlist" :key="item.costItem + ind + ''">
				<div style="flex: 0.5;">{{ item.costItemName }}</div>
				<div style="flex: 1.5;">
					<el-select
						v-if="item.splitFeeList.length <= 1"
						size="mini"
						filterable
						v-model="item.supplyId"
						placeholder=""
						@visible-change="visibleChange($event,ind)"
					>
						<el-option v-for="(ite, i) in ind==indexSel?budgetInfo.servicelist:[]" :key="ite.id" :label="ite.name" :value="ite.id"></el-option>
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
							placeholder=""
							@visible-change="visibleChangeSplit($event,index,ind)"
						>
							<el-option v-for="(it, i) in index==indexSelSplit && ind==indexSel?budgetInfo.servicelist:[]" :key="it.id" :label="it.name" :value="it.id"></el-option>
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
        <div>应收金额</div>
        <div></div>
        <div class="input_p">
          <p class="t_orange">￥</p>
          <el-input v-if="budgetInfo.balancelist" size="mini" @input="
              budgetInfo.balancelist[0].acceptMoney = formatNum(
                budgetInfo.balancelist[0].acceptMoney,
                2
              )
            " v-model="budgetInfo.balancelist[0].acceptMoney"></el-input>
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
  </div>
</template>

<script>
import { formatNum, positiveFloat, positiveFloatSix } from '@/utils/common'
import excelExport from '@/utils/exportexcel'
import { MAINHOST } from '@/config'
import { number } from 'echarts'
export default {
  name: 'stepThree',
  props: ['eventStatu'],
  data() {
    return {
      radio: '',
      inquiryList: [],
      hotelExpenses: [],
      provider: [],
      eventId: '',
      settle: false,
      showTimeLineFive: true,
      settlementList: [], //结算填报第一步列表信息
      num: 0, //结算填报提交次数
      memo: '', //结算填报调整原因
      orderIdList: [],
      budgetDialogDetails: false, //结算填报第二步弹框显示、隐藏
      supplyDiolog: false, // 供应商选择弹窗
      chonseCost: 0, // 预算填报 第一步选择 预算报价金额总和
      budgetInfo: {}, //结算填报第二步信息
      collectSettlementData: {
        offline_quotedPrice_net_price: '',
        offline_settlementSheet_net_price: '',
        net_price: '',
        pre_tax: '',
        after_tax: ''
      }, //结算汇总数据
      dt: '', //B2B审核状态,''为未提交
      url: '', //B2B团结算跳转链接
      isnotquote: false, //判断是否有线下报价单,false无，true有
      loading: false,
      selIdName: '',
      isSelShow: false, //结算填报下拉框列表dom节点是否显示
      indexSel: null, //结算填报外部select下标
      indexSelSplit: null, //结算填报拆分项select下标
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
      supplyTableData: [] // 供应商列表数据
    }
  },
  mounted() {
    this.eventId = this.$route.query.id
    this.meetingSettlement()
    this.SummarySettlementSheet()
    this.getDetail()
    this.getSettlementSheetState()
    this.GetCostItem()
    this.GetSupplierdataDropDown()
  },
  methods: {
    positiveFloat,
    formatNum,
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
        this.budgetInfo.costlist[this.costIndex].supplyId = row.id
        this.budgetInfo.costlist[this.costIndex].supplyName = row.supplierName
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
    //下载汇总结算单
    excelDownLoad() {
      var name = '汇总结算单'
      this.excelExport('/Template/GetTemplate', { eventid: this.eventId, type: 2, param: this.eventId }, name)
    },
    //跳转填写线下报价项结算
    goToOfflineSet(issubmit) {
      this.$router.push({
        name: 'offlineSettlement',
        params: {
          id: this.eventId, // 会议ID
          issubmit: issubmit
        }
      })
    },
    // 新页面打开酒店详情页
    jumpInfo(id) {
      // this.$router.push({ name: "hotelInfo", params: { id } });
      let routeData = this.$router.resolve({
        name: 'hotelInfo',
        params: { id }
      })
      window.open(routeData.href, '_blank') //跳转新页面
    },
    //获取是否有线下报价单
    getSettlementSheetState() {
      this.requestApi({
        url: '/MeetingMa/SettlementSheetState',
        method: 'POST',
        data: { MeetingID: this.$route.query.id }
      }).then(res => {
        this.isnotquote = res
      })
    },
    SummarySettlementSheet() {
      this.requestApi({
        url: '/MeetingMa/SummarySettlementSheet',
        method: 'POST',
        data: { MeetingID: this.$route.query.id }
      }).then(res => {
        this.collectSettlementData = res
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
        this.$forceUpdate()
      })
    },
    //获取b2b团结算跳转地址
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
    goPage(name, data = '') {
      debugger
      this.$router.push({
        // path: url,
        name: name,
        query: {
          id: this.eventId, // 会议ID
          event_name: this.$route.query.name,
          orderId: data.id || '', //订单ID
          settlementId: data.settlementid, // 结算单ID
          sheetId: data.event_inquiry_sheet_id || '', // 询价单ID
          approveId: data.approveid || '' // 审批ID
        }
      })
    },
    meetingSettlement() {
      this.requestApi({
        url: '/MeetingMa/GetSettlementSheet',
        method: 'POST',
        data: { MeetingID: this.$route.query.id }
      }).then(res => {
        if (res) {
          this.hotelExpenses = res.hotel ? res.hotel : []
          this.provider = res.service ? res.service : []
        }
        console.log(this.hotelExpenses)
      })
    },
    // 下载结算单
    downloadSettlement() {
      let QuotedPriceID = ''
      let tempArr = [...this.hotelExpenses, ...this.provider]
      let orderIDList = []
      tempArr.forEach((item, index) => {
        orderIDList.push(item.id)
      })
      this.$http({
        method: 'post',
        url: MAINHOST + '/SettlementSheet/ExportExcel',
        data: { orderIDList },
        responseType: 'blob', //二进制流
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      }).then(res => {
        // 组装a标签
        let elink = document.createElement('a')
        // 设置下载文件名
        // elink.download = "结算单";
        elink.style.display = 'none'
        let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        document.body.removeChild(elink)
      })
    },
    // 复制结算链接
    copyUrl(item, type) {
      let url = ''
      if (type == 0) {
        // 酒店
        url = MAINHOST + '/html/meeting/#/order/list_Hotel/' + item.id
      } else {
        // 服务商
        url = MAINHOST + '/html/meeting/#/order/list/' + item.id
      }
      var copyTest = url
      var inputTest = document.createElement('input')
      inputTest.value = copyTest
      document.body.appendChild(inputTest)
      inputTest.select()
      document.execCommand('Copy')
      inputTest.className = 'oInput'
      inputTest.style.display = 'none'
      this.$message.success('复制成功')
    },
    //结算填报第二步，费用拆分，单项拆成多项，多项相加不得超出单项
    changeInput(e) {
      this.$forceUpdate()
      this.budgetInfo.costlist.forEach(item => {
        var sum = 0
        item.splitFeeList.forEach(val => {
          sum += parseFloat(val.cost)
        })
        if (item.cost < sum) {
          this.$message.error('不得超出总额')
        }
      })
    },
    //结算填报第二步，费用拆分，单项拆成多项，多项之间供应商不能相同
    serviceList(e, index_, indexc) {
      this.$forceUpdate()
      this.budgetInfo.costlist[indexc].splitFeeList.forEach((val, i) => {
        if (val.supplyId == e && i != index_) {
          this.$message.error('供应商不能相同！')
          return 0
        }
      })
    },
    //结算填报第二步，费用拆分
    splitFee(i, list) {
      this.budgetInfo.costlist[i].splitFeeList.push(
        {
          costItem: this.budgetInfo.costlist[i].costItem,
          costItemName: this.budgetInfo.costlist[i].costItemName,
          supplyId: '',
          cost: '0'
        },
        {
          costItem: this.budgetInfo.costlist[i].costItem,
          costItemName: this.budgetInfo.costlist[i].costItemName,
          supplyId: '',
          cost: '0'
        }
      )
      this.$forceUpdate()
    },
    // 新增成本项
    addCost() {
      let addData = {
        costItemName: '',
        supplyId: '',
        cost: ''
      }
      this.budgetInfo.costlist.push(addData)
    },
    // 删除成本项
    delCost(scoped) {
      let index = scoped.$index
      this.budgetInfo.costlist.splice(index, 1)
    },
    //结算填报第二步，费用拆分，添加分项
    splitFeeAdd(i, index) {
      this.budgetInfo.costlist[i].splitFeeList.push({
        costItem: this.budgetInfo.costlist[i].costItem,
        costItemName: this.budgetInfo.costlist[i].costItemName,
        supplyId: '',
        cost: '0'
      })
      this.$forceUpdate()
    },
    //结算填报第二步，费用拆分，删除分项
    splitFeeDel(i, index) {
      this.budgetInfo.costlist[i].splitFeeList.splice(index, 1)
      if (this.budgetInfo.costlist[i].splitFeeList.length == 1) {
        this.budgetInfo.costlist[i].splitFeeList.splice(0, 1)
      }
      this.$forceUpdate()
    },
    beforeClose() {
      this.settle = false
      this.budgetDialogDetails = false
      this.chonseCost = 0
      if (this.num > 0) {
        this.cancelSuccess = true
      }
    },
    change(e, item) {
      if (e) {
        this.orderIdList.push(item.SettlementID)
        this.chonseCost += this.formatNum(item.Price, 2) * 1
      } else {
        this.orderIdList = this.orderIdList.filter(i => {
          return i != item.SettlementID
        })
        this.chonseCost -= this.formatNum(item.Price, 2) * 1
      }
    },
    nextStep() {
      if (this.orderIdList.length == 0) {
        this.$message({
          type: 'warning',
          message: '请勾选结算单!'
        })
        return
      }
      if (!this.memo && this.num > 0) {
        this.$message.error('调整原因必填！')
        return
      }
      this.settle = false
      this.budgetDialogDetails = true
      this.budgetDetails() //结算单填报(明细)
    },
    //结算填报提交
    budgetSubmit() {
      var isSuspend = null
      isSuspend = this.budgetInfo.costlist.some((item, index) => {
        //校验
        for (var i = index + 1; i < this.budgetInfo.costlist.length; i++) {
          if (item.costItem == this.budgetInfo.costlist[i].costItem && item.supplyId == this.budgetInfo.costlist[i].supplyId) {
            this.$message.error('相同费用项的供应商不能相同！')
            return true
            break
          }
        }
        // var sum = 0;
        // var list = [];
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
      for (var i = 0; i < this.budgetInfo.costlist.length; i++) {
        if (this.budgetInfo.costlist[i].costItem == '' || this.budgetInfo.costlist[i].costItem == null) {
          this.$message.error(`第${i + 1}行 成本项 不能为空`)
          isSuspend = true
          break
        }
        if (this.budgetInfo.costlist[i].supplyId == '' || this.budgetInfo.costlist[i].supplyId == null) {
          this.$message.error(`第${i + 1}行 供应商 不能为空`)
          isSuspend = true
          break
        }
        if (this.budgetInfo.costlist[i].cost == '' || this.budgetInfo.costlist[i].cost == null) {
          this.$message.error(`第${i + 1}行 金额 不能为空`)
          isSuspend = true
          break
        }
      }

      if (isSuspend) return

      if (this.budgetInfo.balancelist) {
        this.budgetInfo.balancelist[0].memo = this.memo
      }
      var submit = {}
      var teamBalance = {}
      var teamList = []
      teamBalance = JSON.parse(JSON.stringify(this.budgetInfo))
      teamBalance.costlist.forEach((e, i) => {
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
      teamBalance.costlist = teamList
      // console.log(teamBalance);
      submit = {
        event_info_id: this.eventId, //"320ac3f5-dbdf-4c33-aa17-d197747f2b9a"
        teamBalance: teamBalance
      }
      this.requestApi({
        url: '/B2B/TeamBalanceAccept',
        method: 'POST',
        data: submit
      }).then(res => {
        // console.log(res)
        this.settle = false
        if (res.status == 1) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.budgetDialogDetails = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //结算单填报价格总和
    /* priceSum(){
			var priSum=0
			if(this.budgetInfo.costlist!=undefined && this.budgetInfo.costlist!=null){
				this.budgetInfo.costlist.forEach(e=>{
					priSum+=parseFloat(e.cost?e.cost:0)
				})
			}
			if(this.budgetInfo.balancelist){
				this.budgetInfo.balancelist[0].acceptMoney=parseFloat(priSum).toFixed(2);
				this.budgetInfo.balancelist[0].memo=this.memo
			}
			return parseFloat(priSum).toFixed(2);
		}, */
    //结算单填报
    budget() {
      this.requestApi({
        url: '/SettlementSheet/GetSettlementSum',
        method: 'POST',
        data: { eventinfoid: this.eventId }
      }).then(res => {
        // console.log(res)
        this.settlementList = res
        if (this.settlementList[0] && this.settlementList[0].settlement_count) this.num = this.settlementList[0].settlement_count
        this.orderIdList = []
      })
    },
    //结算单填报(明细)
    budgetDetails() {
      this.requestApi({
        url: '/SettlementSheet/GetSettlementDetail',
        method: 'POST',
        data: { OrderIDS: this.orderIdList }
      }).then(res => {
        // console.log(res);
        this.budgetInfo = res
        this.budgetInfo.costlist = this.budgetInfo.costlist.filter(e => {
          if (Number(e.cost) > 0) {
            e['splitFeeList'] = []
            return true
          }
        })
        this.budgetInfo.costlist.forEach(item => {
          item.cost = this.formatNum(item.cost, 2)
        })
        this.budgetInfo.balancelist[0].acceptMoney = Number(this.formatNum(this.chonseCost, 2)).toFixed(6)
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
    }
  }
}
</script>

<style scoped lang="scss">
.step_three {
  margin-top: 20px;

  .demand_main_three {
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
}

.create_title {
  margin: 0 0 50px 0;
}

.create_title .title_link {
  float: right;
  color: #bfbfbf;
  font-size: 14px;
  line-height: 24px;
}

.create_title .title_link a {
  color: #2896eb;
  font-size: 14px;
  text-decoration: none;
  margin: 0 10px;
  line-height: 24px;
}

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

.international-order-span {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #999999;
  font-weight: normal;
}
.el-button--text {
  font-size: 15px;
}
.create_public td {
  border-top: 1px solid #e4e4e4;
  border-bottom: none;
}
.create_table th {
  font-size: 14px;
  font-weight: 600;
  color: #787878;
  text-align: left;
  padding: 12px 20px;
  border-bottom: 1px solid #e4e4e4;
}
// .create_table td {
// 	padding: 30px 33px;
// 	font-size: 14px;
// 	color: #787878;
// 	border-bottom: 1px solid #e4e4e4;
// 	word-break: break-all;
// 	word-wrap: break-word;
// }

.create_table .bargain_name {
  line-height: 20px;
}

.create_table .price {
  font-weight: 600;
  color: #f91;
  font-family: 'Microsoft Yahei';
}
.create_table .create_link {
  // display: flex;
  // justify-content: space-between;
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
.warnning {
  color: red;
  margin-bottom: 5px;
}
.checkbox {
  margin-top: 5px;
}
.amountReceivable {
  display: flex;
  align-items: center;
  margin-top: 10px;
  .should {
    margin-right: 10px;
  }
  .t_orange {
  }
  .shouldInput {
    margin-left: 5px;
    width: 120px;
  }
  .causeInput {
    margin-left: 5px;
    flex: 1;
  }
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
</style>
