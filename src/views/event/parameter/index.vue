<template>
  <div class="box">
    <div style="margin: 20px 0">
      <el-row>
        <el-col :span="5">
          <span style="margin-left: 10px">报表：</span>
          <el-select v-model="searchType" filterable clearable placeholder="请选择查询类型">
            <!-- <el-option label="01-拜耳小会月度台账" value="1"></el-option>
            <el-option label="02-拜耳小会台账明细" value="2"></el-option>
            <el-option label="03-MSD区域台账" value="3"></el-option>
            <el-option label="04-欧佳隆区域台账" value="4"></el-option> -->
            <el-option v-for="item in reportEnum" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="9">
          <span style="margin-left: 10px">会议时间范围：</span>
          <el-date-picker v-model="search_date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="datePickerOptions">
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <span style="margin-left: 10px">会议状态：</span>
          <el-select v-model="focusVal" multiple collapse-tags style="margin-left: 10px" @change="choice" placeholder="请选择会议状态">
            <el-option v-for="item in fokus" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="search" style="margin: 0 30px">
            查询
          </el-button>
          <el-button type="primary" @click="downlodExcel"> 导出Excel </el-button>
        </el-col>
      </el-row>

      <!-- <el-date-picker
        v-show="searchType == 1"
        v-model="search_month"
        type="month"
        placeholder="选择月">
      </el-date-picker> -->

      <!-- st -->

      <!-- end -->

    </div>

    <div v-show="excelType == 1">
      <span style="font-size: 20px; font-weight: blod">
        01-拜耳小会月度台账
      </span>
      <el-table :data="tableData" style="width: 100%; height: 500px">
        <el-table-column prop="month_time" label="月份" align="center" width="180">
          <template slot-scope="scope">
            <span :class="{ total: scope.row.month_time.indexOf('汇总') >= 0 }">{{ scope.row.month_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="省份" align="center" width="180">
        </el-table-column>
        <el-table-column prop="quoted_price_qty" label="已报价团数量" align="center" width="180">
        </el-table-column>
        <el-table-column prop="attendee_no" label="预计参会人数" align="center" width="180">
        </el-table-column>
        <el-table-column prop="total_quoted_price" label="报价总金额" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="settlement_sheet_qty" label="已结算团数量" align="center" width="180">
        </el-table-column>
        <el-table-column prop="settlement_rate" label="结算比例" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.settlement_rate + "%" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="quoted_price" label="已结算报价总金额" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="settlement_sheet" label="结算总金额" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="actual_count" label="实际参会人数" align="center" width="180">
        </el-table-column>
      </el-table>
    </div>

    <div v-show="excelType == 2">
      <div>
        <span style="font-size: 20px; font-weight: blod">
          02-拜耳小会台账明细
        </span>
      </div>
      <el-table ref="BayerExcel" :data="tableData" :row-class-name="tableRowClassName" style="width: 100%; height: 500px">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="event_num" label="会议ID" align="center" width="180">
        </el-table-column>
        <el-table-column prop="state" label="系统状态" align="center" width="180">
        </el-table-column>
        <el-table-column prop="event_name" label="会议名称" align="center" width="180">
        </el-table-column>
        <el-table-column prop="attendee_no" label="参会人数" align="center">
        </el-table-column>
        <el-table-column prop="event_startdate" label="会议开始日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="event_enddate" label="会议结束日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column label="会议发生城市" align="center" width="350">
          <el-table-column prop="province" label="省/直辖市/自治区" align="center" width="180">
          </el-table-column>
          <el-table-column prop="city" label="城市" align="center" width="180">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="activity_type" label="会议性质" align="center" width="180">
        </el-table-column>
        <el-table-column prop="dept_name" label="部门" align="center" width="180">
        </el-table-column>
        <el-table-column prop="name" label="拜耳联系人" align="center" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="拜耳联系人电话" align="center" width="180">
        </el-table-column>
        <el-table-column prop="mailbox" label="拜耳联系人邮箱" align="center" width="180">
        </el-table-column>
        <el-table-column prop="company_name" label="供应商名称" align="center" width="180">
        </el-table-column>
        <el-table-column prop="real_name" label="报价人" align="center" width="180">
        </el-table-column>
        <el-table-column prop="total_amount" label="报价金额" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="offer_data" label="报价日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="date" label="报价盖章回传日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="po_date" label="PO确认日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="po_order_no" label="PO" align="center" width="180">
        </el-table-column>
        <el-table-column prop="po_price" label="PO金额" align="center" width="180">
        </el-table-column>
        <el-table-column prop="opera" label="Opera号" align="center" width="180">
        </el-table-column>
        <el-table-column prop="tourist_group_no" label="团号" align="center" width="180">
        </el-table-column>
        <el-table-column prop="begin_time" label="团开始日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="end_time" label="团结束日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="sheet_total" label="结算金额" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="isuser_preferred_hotel" label="是否使用首选酒店" align="center">
        </el-table-column>
        <el-table-column prop="is_hotel" label="是否在酒店内召开" align="center">
        </el-table-column>
        <el-table-column prop="meeting_place" label="开会地点" align="center" width="180">
        </el-table-column>
        <el-table-column prop="hotel_price" label="酒店总金额" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="room_price" label="客房总计" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="con_price" label="会场总计" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="food_money" label="用餐总计" :formatter="moneyFormatter" align="center">
        </el-table-column>
        <el-table-column prop="food_price" label="用餐总计(不含茶歇)" :formatter="moneyFormatter" align="center">
        </el-table-column>
        <el-table-column prop="chaxie" label="酒店茶歇总计" :formatter="moneyFormatter" align="center">
        </el-table-column>
        <el-table-column prop="food_outside_price" label="外出用餐总计" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="car_price" label="用车总计" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="zhuce_price" label="注册费总计" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="zhizuo_price" label="制作费总计" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="dijie_price" label="人员总计" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="service_price" label="直采服务费" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="fzc_price" label="非直采服务费" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="service_sheet_total" label="供应商结算金额" :formatter="moneyFormatter" align="center">
        </el-table-column>
        <el-table-column prop="sheet_kuaidi" label="供应商结算单快递号" align="center" width="180">
        </el-table-column>
        <el-table-column prop="tuan_state" label="团结算状态" align="center" width="180">
        </el-table-column>
        <el-table-column prop="fapiao_date" label="中旅发票日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="fapiao_no" label="发票号" align="center" width="180">
        </el-table-column>
        <el-table-column prop="jichu_date" label="结算材料寄出日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="kuaidi_no" label="快递号" align="center" width="180">
        </el-table-column>
        <el-table-column prop="qianshou_date" label="签收日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="sk_date" label="承诺收款日期（账期）" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="act_money_date" label="实际收款 日期（APC付款）" align="center" width="180">
        </el-table-column>
        <el-table-column label="评估得分" prop="" align="center" width="180">
          <template slot-scope="scope" style="margin-right: 50px">
            <el-button type="text" size="small" v-if="scope.row.star_level == 1" @click="GetFeedback(scope.row)">1分，非常不满意</el-button>
            <el-button type="text" size="small" v-if="scope.row.star_level == 2" @click="GetFeedback(scope.row)">2分，不满意</el-button>
            <el-button type="text" size="small" v-if="scope.row.star_level == 3" @click="GetFeedback(scope.row)">3分，一般满意</el-button>
            <el-button type="text" size="small" v-if="scope.row.star_level == 4" @click="GetFeedback(scope.row)">4分，满意</el-button>
            <el-button type="text" size="small" v-if="scope.row.star_level == 5" @click="GetFeedback(scope.row)">5分，非常满意</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-show="excelType == 3">
      <div>
        <span style="font-size: 20px; font-weight: blod"> 03-MSD区域台账 </span>
      </div>
      <el-table :data="tableData" :row-class-name="tableRowClassName" style="width: 100%; height: 500px">
        <el-table-column prop="tuangroup_month" label="团组月份" align="center" width="180">
        </el-table-column>
        <el-table-column prop="customer" label="客户" align="center" width="180">
        </el-table-column>
        <el-table-column prop="region" label="区域" align="center" width="180">
        </el-table-column>
        <el-table-column prop="salesman" label="业务员" align="center" width="180">
        </el-table-column>
        <el-table-column prop="tl" label="TL" align="center" width="180">
        </el-table-column>
        <el-table-column prop="conference_name" label="会议名字" align="center" width="180">
        </el-table-column>
        <el-table-column prop="metting_nature" label="会议性质" align="center" width="180">
        </el-table-column>
        <el-table-column prop="bu" label="BU" align="center" width="180">
        </el-table-column>
        <el-table-column prop="tuan_starttime" label="团开始日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="tuan_enddate" label="团结束日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="jiesuan_post" label="结算进度" align="center" width="180">
        </el-table-column>
        <el-table-column prop="city" label="城市（会议目的地）" align="center" width="180">
        </el-table-column>
        <el-table-column prop="metting_hotel" label="会议酒店" align="center" width="180">
        </el-table-column>
        <el-table-column prop="is_pmp" label="是否为PMVP" align="center" width="180">
        </el-table-column>
        <el-table-column prop="cventcode" label="Cventcode" align="center" width="180">
        </el-table-column>
        <el-table-column prop="cvent_postdate" label="Cvent上传完成日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="expire_day" label="70天到期日提醒" align="center" width="180">
        </el-table-column>
        <el-table-column prop="pr" label="PR" align="center" width="180">
        </el-table-column>
        <el-table-column prop="po" label="PO" align="center" width="180">
        </el-table-column>
        <el-table-column prop="ppno" label="PP NO" align="center" width="180">
        </el-table-column>
        <el-table-column prop="po_price" label="PO金额" align="center" width="180">
        </el-table-column>
        <el-table-column prop="and_msd_price" label="与MSD结算金额" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="submit_internal_auditdate" label="酒店费用金额" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="mo_date" label="MO收货日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="mo_queren_date" label="MO结算确认日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="kuaidi_date" label="材料快递日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="bsc" label="BSC通知开票日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="post_neitime" label="递交内审时间" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="tuibu_internal_auditdate" label="内审首次退补单时间" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="nei_passtime" label="内审通过间" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="cits" label="CITS开票日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="tuan_computernum" label="团电脑号" align="center" width="180">
        </el-table-column>
        <el-table-column prop="mo" label="MO" align="center" width="180">
        </el-table-column>
        <el-table-column prop="mo_phone_email" label="MO联系方式" align="center" width="180">
        </el-table-column>
        <el-table-column prop="msa" label="MSA" align="center" width="180">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="180">
        </el-table-column>
      </el-table>
    </div>

    <div v-show="excelType == 4">
      <div>
        <span style="font-size: 20px; font-weight: blod">
          04-欧佳隆区域台账
        </span>
      </div>
      <el-table :data="tableData" :row-class-name="tableRowClassName" style="width: 100%; height: 500px">
        <el-table-column prop="tuangroup_month" label="团组月份" align="center" width="180">
        </el-table-column>
        <el-table-column prop="customer" label="客户" align="center" width="180">
        </el-table-column>
        <el-table-column prop="region" label="区域" align="center" width="180">
        </el-table-column>
        <el-table-column prop="salesman" label="业务员" align="center" width="180">
        </el-table-column>
        <el-table-column prop="tl" label="TL" align="center" width="180">
        </el-table-column>
        <el-table-column prop="conference_name" label="会议名字" align="center" width="180">
        </el-table-column>
        <el-table-column prop="metting_nature" label="会议性质" align="center" width="180">
        </el-table-column>
        <el-table-column prop="bu" label="BU" align="center" width="180">
        </el-table-column>
        <el-table-column prop="tuan_starttime" label="团开始日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="tuan_enddate" label="团结束日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="jiesuan_post" label="结算进度" align="center" width="180">
        </el-table-column>
        <el-table-column prop="city" label="城市（会议目的地）" align="center" width="180">
        </el-table-column>
        <el-table-column prop="metting_hotel" label="会议酒店" align="center" width="180">
        </el-table-column>
        <el-table-column prop="is_pmp" label="是否为PMVP" align="center" width="180">
        </el-table-column>
        <el-table-column prop="cventcode" label="Cventcode" align="center" width="180">
        </el-table-column>
        <el-table-column prop="cvent_postdate" label="Cvent上传完成日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="expire_day" label="70天到期日提醒" align="center" width="180">
        </el-table-column>
        <el-table-column prop="pr" label="PR" align="center" width="180">
        </el-table-column>
        <el-table-column prop="po" label="PO" align="center" width="180">
        </el-table-column>
        <el-table-column prop="ppno" label="PP NO" align="center" width="180">
        </el-table-column>
        <el-table-column prop="po_price" label="PO金额" align="center" :formatter="moneyFormatter" width="180">
        </el-table-column>
        <el-table-column prop="and_msd_price" label="与MSD结算金额" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="submit_internal_auditdate" label="酒店费用金额" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="mo_date" label="MO收货日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="mo_queren_date" label="MO结算确认日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="kuaidi_date" label="材料快递日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="bsc" label="BSC通知开票日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="post_neitime" label="递交内审时间" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="tuibu_internal_auditdate" label="内审首次退补单时间" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="nei_passtime" label="内审通过间" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="cits" label="CITS开票日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="tuan_computernum" label="团电脑号" align="center" width="180">
        </el-table-column>
        <el-table-column prop="mo" label="MO" align="center" width="180">
        </el-table-column>
        <el-table-column prop="mo_phone_email" label="MO联系方式" align="center" width="180">
        </el-table-column>
        <el-table-column prop="msa" label="MSA" align="center" width="180">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="180">
        </el-table-column>
      </el-table>
    </div>

    <div v-show="excelType == 5">
      <div>
        <span style="font-size: 20px; font-weight: blod">
          05-礼来区域台账
        </span>
      </div>
      <el-table :data="tableData" style="width: 100%; height: 500px">
        <el-table-column prop="登记日期" label="登记日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="会议日期" label="会议日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="会议操作人" label="会议操作人" align="center" width="180">
        </el-table-column>
        <el-table-column prop="会议名称" label="会议名称" align="center" width="180">
        </el-table-column>
        <el-table-column prop="团电脑号" label="团电脑号" align="center" width="180">
        </el-table-column>
        <el-table-column prop="目的地" label="目的地" align="center" width="180">
        </el-table-column>
        <el-table-column prop="地接社" label="地接社" align="center" width="180">
        </el-table-column>
        <el-table-column prop="公司抬头开发票抬头" label="公司抬头（开发票抬头）" align="center" width="180">
        </el-table-column>
        <el-table-column prop="会议编码" label="会议编码" align="center" width="180">
        </el-table-column>
        <el-table-column prop="开票日期" label="开票日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="开票金额" label="开票金额" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="发票号" label="发票号" align="center" width="180">
        </el-table-column>
        <el-table-column prop="地接账单金额" label="地接账单金额" :formatter="moneyFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="收到地接账单日期" label="收到地接账单日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="目前状态" label="目前状态" align="center" width="180">
        </el-table-column>
        <el-table-column prop="上传礼来系统日期" label="上传礼来系统日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="结算寄出日期" label="结算寄出日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="寄出结算的快递单号" label="寄出结算的快递单号" align="center" width="180">
        </el-table-column>
        <el-table-column prop="收款日期" label="收款日期" :formatter="dateFormatter" align="center" width="180">
        </el-table-column>
        <el-table-column prop="备注退单问题" label="备注/退单问题" align="center" width="180">
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :visible.sync="severBackShow" :close-on-click-modal="false" width="70%" class="severBack" title="服务反馈">
      <div>
        <p v-if="severBackInfo.status" class="flex_row justify_between">
          <span>客户服务反馈问题：
            <span v-if="severBackInfo.star_level == 1"> 1分，非常不满意</span>
            <span v-else-if="severBackInfo.star_level == 2"> 2分，不满意</span>
            <span v-else-if="severBackInfo.star_level == 3">
              3分，一般满意</span>
            <span v-else-if="severBackInfo.star_level == 4"> 4分，满意</span>
            <span v-else-if="severBackInfo.star_level == 5">
              5分，非常满意</span>
          </span>
          <span>反馈人手机号：{{ severBackInfo.phone }} </span>
          <span>提交时间：{{ severBackInfo.create_date }}</span>
          <span>操作IP：{{ severBackInfo.ip }}</span>
          <span>操作系统：{{ severBackInfo.system }}</span>
        </p>
        <p v-else>
          客户服务反馈问题：<span style="color: red"> 待客户评价 </span>
        </p>
        <div class="flex_row justify_between">
          <div class="eventInfo">
            <div class="flex_row justify_between">
              <h2>拜耳C类会议-旅行社供应商反馈调查表</h2>
              <div>
                <el-tooltip class="item" effect="dark" :content="imgUrl" placement="top-start">
                  <p style="
                      display: inline-block;
                      margin: 0 20px;
                      max-width: 300px;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      overflow: hidden;
                    ">
                    {{ imgUrl }}
                  </p>
                </el-tooltip>

                <el-button type="text" size="small" @click="copyUrl">复制链接</el-button>
              </div>
            </div>
            <p>会议名称：{{ severBackInfo.event_name }}</p>
            <p>会议时间：{{ severBackInfo.event_date }}</p>
            <p>会议地点：{{ severBackInfo.city }}</p>
            <p>合同号：{{ severBackInfo.po }}</p>
            <p>会议负责人：{{ severBackInfo.contacts }}</p>
          </div>
          <!-- 仅在当前会议已录入PO后显示 -->
          <div v-if="UnDelPoData">
            <p style="display: inline-block">问卷二维码：</p>
            <!-- <vue-qr class="severBackQr" :text="imgUrl" :size="200" :logoSrc="require('@/assets/images/logo.png')" :logoScale="0.01"></vue-qr> -->
          </div>
        </div>
      </div>

      <div class="severBackInfo">
        <div>
          <p>1、总体而言，您对此次会议供应商服务质量总体评价如何！</p>
          <el-radio-group v-model="severBackInfo.star_level" disabled>
            <el-radio :label="5">5分，非常满意</el-radio>
            <el-radio :label="4">4分，满意</el-radio>
            <el-radio :label="3">3分，一般满意</el-radio>
            <el-radio :label="2">2分，不满意</el-radio>
            <el-radio :label="1">1分，非常不满意</el-radio>
          </el-radio-group>
        </div>
        <div class="backItem" v-if="severBackInfo.star_level < 3">
          <p>2、如果低于3分，请简要描述供应商问题-供应商专业能力和服务质量</p>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" disabled v-model="severBackInfo.service_text"></el-input>
        </div>
        <div class="backItem" v-if="severBackInfo.star_level < 3">
          <p>3、如果低于3分，请简要描述供应商问题-合规相关问题</p>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" disabled v-model="severBackInfo.compliance_text"></el-input>
        </div>
        <div class="backItem" v-if="severBackInfo.star_level < 3">
          <p>4、如果低于3分，请简要描述供应商问题-采购相关问题</p>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" disabled v-model="severBackInfo.purchase_text"></el-input>
        </div>
        <div class="backItem" v-if="severBackInfo.star_level < 3">
          <p>5、如果低于3分，请简要描述供应商问题-其他问题</p>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" disabled v-model="severBackInfo.other_text"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button type="primary" @click="severBackShow = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import VueQr from "vue-qr";
import { positiveFloat, formatDate } from "@/utils/common";
import { MAINHOST, meetingH5 } from "@/config";
import requestApi from '@/utils/requestData'
export default {
  data() {
    return {
      imgUrl: "", //扫码后手机显示的页面
      reportEnum: [],
      search_month: "",
      search_date: ["", ""],
      searchType: "",
      excelType: "",
      tableData: [],
      severBackShow: false, // 服务反馈弹窗是否显示
      UnDelPoData: false, // 是否录入po
      severBackInfo: {},
      datePickerOptions: {
        shortcuts: [
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      focusVal: [],
      focusStrVal: "",
      fokus: [
        { code: "0010-11", name: "结算完成" },
        { code: "0010-5", name: "会议已创建" },
        { code: "0010-8", name: "会议进行中" },
        { code: "0010-6", name: "询价中" },
        { code: "0010-1", name: "已取消" },
        { code: "0010-7", name: "已确定供应商" },
        { code: "0010-9", name: "待结算（尚无结算单）" },
        { code: "0010-12", name: "会议过期" },
        { code: "0010-10", name: "结算中（待审核）" },
      ],
    };
  },
  components: {
    // VueQr,
  },
  created() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    this.search_date = [start, end];

    this.reportList();
  },
  methods: {
    positiveFloat,
    formatDate,
    reportList() {
      requestApi({
        url: '/UserGroupmanagement/ReportList',
        method: 'post',
        data: {},
      }).then((res) => {
        this.reportEnum = [
          {
            id: "513a8ae5-bc8f-11ec-afdf-fa163ed463f8",
            name: "01-拜耳小会月度台账",
            value: "01",
          },
          {
            id: "99382546-bc8f-11ec-afdf-fa163ed463f8",
            name: "02-拜耳小会台账明细",
            value: "02",
          },
          {
            id: "9b1eedfb-bc8f-11ec-afdf-fa163ed463f8",
            name: "03-MSD区域台账",
            value: "03",
          },
          {
            id: "9d169f9a-bc8f-11ec-afdf-fa163ed463f8",
            name: "04-欧佳隆区域台账",
            value: "04",
          },
          {
            id: "da84f84d-cdb7-11ec-bad7-fa163ed463f8",
            name: "05-礼来区域台账",
            value: "05",
          },
        ];
      });
    },
    // 查看评估得分
    GetFeedback(row) {
      (this.imgUrl =
        meetingH5 + "/#/?id=" + row.id + "&name=" + row.event_name), //扫码后手机显示的页面
        (this.UnDelPoData = row.po_order_no.length > 0 ? true : false);
      this.severBackShow = true;
      requestApi({
        url: '/MeetingFeedback/GetFeedback',
        method: 'post',
        data: { meetingID: row.id},
      }).then((res) => {
          this.severBackInfo = res;
        });
    },
    // 复制问卷链接
    copyUrl(item, type) {
      var copyTest = this.imgUrl;
      var inputTest = document.createElement("input");
      inputTest.value = copyTest;
      document.body.appendChild(inputTest);
      inputTest.select();
      document.execCommand("Copy");
      inputTest.className = "oInput";
      inputTest.style.display = "none";
      this.$message.success("复制成功");
    },
    tableRowClassName({ row, rowIndex }) {
      // debugger
      if (row.twenty_one === 1) {
        return "warning-row";
      }
      return "";
    },
    // 点击查询
    search() {
      this.excelType = this.searchType;
      if (this.searchType == 1) {
        this.GetBayerMonthExcel();
      } else if (this.searchType == 2) {
        this.GetBayerExcel();
      } else if (this.searchType == 3) {
        this.GetMSDExcel();
      } else if (this.searchType == 4) {
        this.GetOrganonExcel();
      } else if (this.searchType == 5) {
        this.GetLillyAccount();
      } else {
        this.$message.info("请选择要查询的报表");
      }
    },
    // 点击导出报表
    downlodExcel() {
      if (this.excelType == 1) {
        this.BayerMonthExcel();
      } else if (this.excelType == 2) {
        this.BayerExcel();
      } else if (this.excelType == 3) {
        this.MSDExcel();
      } else if (this.excelType == 4) {
        this.OrganonExcel();
      } else if (this.excelType == 5) {
        this.GetLillyAccountExcel();
      } else {
        this.$message.info("请查询要导出的报表");
      }
    },
    // 获取 01-拜尔小会月度台账 数据
    GetBayerMonthExcel() {
      let beginmonth = this.search_date[0].getMonth() + 1;
      let endmonth = this.search_date[1].getMonth() + 1;
      let begindate = this.search_date[0].getDate();
      let enddate = this.search_date[1].getDate();
      let beginTime =
        this.search_date[0].getFullYear() +
        "-" +
        (beginmonth > 9 ? beginmonth : "0" + beginmonth) +
        "-" +
        (begindate > 9 ? begindate : "0" + begindate);
      let endTime =
        this.search_date[1].getFullYear() +
        "-" +
        (endmonth > 9 ? endmonth : "0" + endmonth) +
        "-" +
        (enddate > 9 ? enddate : "0" + enddate);

      requestApi({
        url: '/BayerReportForm/GetBayerMonthExcel',
        method: 'post',
        data: {
          beginTime,
          endTime,
          status: this.focusStrVal,
        }
      }).then((res) => {
        this.tableData = res;
      });
    },
    // 获取 02-拜尔小会台账明细 数据
    GetBayerExcel() {
      let beginmonth = this.search_date[0].getMonth() + 1;
      let endmonth = this.search_date[1].getMonth() + 1;
      let begindate = this.search_date[0].getDate();
      let enddate = this.search_date[1].getDate();
      let beginTime =
        this.search_date[0].getFullYear() +
        "-" +
        (beginmonth > 9 ? beginmonth : "0" + beginmonth) +
        "-" +
        (begindate > 9 ? begindate : "0" + begindate);
      let endTime =
        this.search_date[1].getFullYear() +
        "-" +
        (endmonth > 9 ? endmonth : "0" + endmonth) +
        "-" +
        (enddate > 9 ? enddate : "0" + enddate);

      requestApi({
        url: '/BayerReportForm/GetBayerExcel',
        method: 'post',
        data: {
          beginTime,
          endTime,
          status: this.focusStrVal,
        }
      }).then((res) => {
          this.tableData = res;
        });
    },
    // 获取 03-MSD区域台账 数据
    GetMSDExcel() {
      let beginmonth = this.search_date[0].getMonth() + 1;
      let endmonth = this.search_date[1].getMonth() + 1;
      let begindate = this.search_date[0].getDate();
      let enddate = this.search_date[1].getDate();
      let beginTime =
        this.search_date[0].getFullYear() +
        "-" +
        (beginmonth > 9 ? beginmonth : "0" + beginmonth) +
        "-" +
        (begindate > 9 ? begindate : "0" + begindate);
      let endTime =
        this.search_date[1].getFullYear() +
        "-" +
        (endmonth > 9 ? endmonth : "0" + endmonth) +
        "-" +
        (enddate > 9 ? enddate : "0" + enddate);

      requestApi({
        url: '/MSDReport/GetMSDReportList',
        method: 'post',
        data: {
          beginTime,
          endTime,
          status: this.focusStrVal,
        }
      }).then((res) => {
        this.tableData = res.EvetModels;
      });
    },
    // 获取 04-欧佳隆区域台账 数据
    GetOrganonExcel() {
      let beginmonth = this.search_date[0].getMonth() + 1;
      let endmonth = this.search_date[1].getMonth() + 1;
      let begindate = this.search_date[0].getDate();
      let enddate = this.search_date[1].getDate();
      let beginTime =
        this.search_date[0].getFullYear() +
        "-" +
        (beginmonth > 9 ? beginmonth : "0" + beginmonth) +
        "-" +
        (begindate > 9 ? begindate : "0" + begindate);
      let endTime =
        this.search_date[1].getFullYear() +
        "-" +
        (endmonth > 9 ? endmonth : "0" + endmonth) +
        "-" +
        (enddate > 9 ? enddate : "0" + enddate);


      requestApi({
        url: '/MSDReport/GetOjialReportList',
        method: 'post',
        data: {
          beginTime,
          endTime,
          status: this.focusStrVal,
        }
      }).then((res) => {
        this.tableData = res.EvetModels;
      });
    },
    // 获取 05-礼来区域台账 数据
    GetLillyAccount() {
      let beginmonth = this.search_date[0].getMonth() + 1;
      let endmonth = this.search_date[1].getMonth() + 1;
      let begindate = this.search_date[0].getDate();
      let enddate = this.search_date[1].getDate();
      let beginTime =
        this.search_date[0].getFullYear() +
        "-" +
        (beginmonth > 9 ? beginmonth : "0" + beginmonth) +
        "-" +
        (begindate > 9 ? begindate : "0" + begindate);
      let endTime =
        this.search_date[1].getFullYear() +
        "-" +
        (endmonth > 9 ? endmonth : "0" + endmonth) +
        "-" +
        (enddate > 9 ? enddate : "0" + enddate);

      requestApi({
        url: '/Reporting/GetLillyAccount',
        method: 'post',
        data: {
          beginTime,
          endTime,
          status: this.focusStrVal,
        }
      }).then((res) => {
        this.tableData = res;
      });
    },
    // 获取报表明细文件信息
    BayerExcel() {
      let beginmonth = this.search_date[0].getMonth() + 1;
      let endmonth = this.search_date[1].getMonth() + 1;
      let begindate = this.search_date[0].getDate();
      let enddate = this.search_date[1].getDate();
      let beginTime =
        this.search_date[0].getFullYear() +
        "-" +
        (beginmonth > 9 ? beginmonth : "0" + beginmonth) +
        "-" +
        (begindate > 9 ? begindate : "0" + begindate);
      let endTime =
        this.search_date[1].getFullYear() +
        "-" +
        (endmonth > 9 ? endmonth : "0" + endmonth) +
        "-" +
        (enddate > 9 ? enddate : "0" + enddate);
      
      requestApi({
        url: '/BayerReportForm/BayerExcel',
        method: 'post',
        data: {
          beginTime,
          endTime,
          status: this.focusStrVal,
        }
      }).then((res) => {
        this.downloadFile(res);
      });
    },
    // 获取月度报表文件信息
    BayerMonthExcel() {
      let beginmonth = this.search_date[0].getMonth() + 1;
      let endmonth = this.search_date[1].getMonth() + 1;
      let begindate = this.search_date[0].getDate();
      let enddate = this.search_date[1].getDate();
      let beginTime =
        this.search_date[0].getFullYear() +
        "-" +
        (beginmonth > 9 ? beginmonth : "0" + beginmonth) +
        "-" +
        (begindate > 9 ? begindate : "0" + begindate);
      let endTime =
        this.search_date[1].getFullYear() +
        "-" +
        (endmonth > 9 ? endmonth : "0" + endmonth) +
        "-" +
        (enddate > 9 ? enddate : "0" + enddate);
      
      requestApi({
        url: '/BayerReportForm/BayerMonthExcel',
        method: 'post',
        data: {
          beginTime,
          endTime,
          status: this.focusStrVal,
        }
      }).then((res) => {
        this.downloadFile(res);
      });
    },
    // 03-MSD区域台账
    MSDExcel() {
      let beginmonth = this.search_date[0].getMonth() + 1;
      let endmonth = this.search_date[1].getMonth() + 1;
      let begindate = this.search_date[0].getDate();
      let enddate = this.search_date[1].getDate();
      let beginTime =
        this.search_date[0].getFullYear() +
        "-" +
        (beginmonth > 9 ? beginmonth : "0" + beginmonth) +
        "-" +
        (begindate > 9 ? begindate : "0" + begindate);
      let endTime =
        this.search_date[1].getFullYear() +
        "-" +
        (endmonth > 9 ? endmonth : "0" + endmonth) +
        "-" +
        (enddate > 9 ? enddate : "0" + enddate);
      
      requestApi({
        url: '/MSDReport/MSDExcel',
        method: 'post',
        data: {
          beginTime,
          endTime,
          status: this.focusStrVal,
        }
      }).then((res) => {
        this.downloadFile(res);
      });
    },
    // 04-欧佳隆区域台账
    OrganonExcel() {
      let beginmonth = this.search_date[0].getMonth() + 1;
      let endmonth = this.search_date[1].getMonth() + 1;
      let begindate = this.search_date[0].getDate();
      let enddate = this.search_date[1].getDate();
      let beginTime =
        this.search_date[0].getFullYear() +
        "-" +
        (beginmonth > 9 ? beginmonth : "0" + beginmonth) +
        "-" +
        (begindate > 9 ? begindate : "0" + begindate);
      let endTime =
        this.search_date[1].getFullYear() +
        "-" +
        (endmonth > 9 ? endmonth : "0" + endmonth) +
        "-" +
        (enddate > 9 ? enddate : "0" + enddate);
      
      requestApi({
        url: '/MSDReport/OjialExcel',
        method: 'post',
        data: {
          beginTime,
          endTime,
          status: this.focusStrVal,
        }
      }).then((res) => {
        this.downloadFile(res);
      });
    },
    // 04-欧佳隆区域台账
    GetLillyAccountExcel() {
      let beginmonth = this.search_date[0].getMonth() + 1;
      let endmonth = this.search_date[1].getMonth() + 1;
      let begindate = this.search_date[0].getDate();
      let enddate = this.search_date[1].getDate();
      let beginTime =
        this.search_date[0].getFullYear() +
        "-" +
        (beginmonth > 9 ? beginmonth : "0" + beginmonth) +
        "-" +
        (begindate > 9 ? begindate : "0" + begindate);
      let endTime =
        this.search_date[1].getFullYear() +
        "-" +
        (endmonth > 9 ? endmonth : "0" + endmonth) +
        "-" +
        (enddate > 9 ? enddate : "0" + enddate);
      
      requestApi({
        url: '/Reporting/GetLillyAccountExcel',
        method: 'post',
        data: {
          beginTime,
          endTime,
          status: this.focusStrVal,
        }
      }).then((res) => {
        this.downloadFile(res);
      });
    },
    // 导出报表
    downloadFile(file) {
      // window.open(file.file_path, "_blank");
      let a_link = document.createElement("a");
      // 这里是将url转成blob地址，
      fetch(file.msg)
        .then((res) => res.blob())
        .then((blob) => {
          // 将链接地址字符内容转变成blob地址
          a_link.href = URL.createObjectURL(blob);
          console.log(a_link.href);
          a_link.download = file.title; //下载的文件的名字
          document.body.appendChild(a_link);
          a_link.click();
        });
    },
    moneyFormatter(row, col, value) {
      // let money = Number(row.开票金额)
      // debugger
      if (value || value === 0) {
        return this.positiveFloat(value);
      } else {
        return "";
      }
    },
    dateFormatter(row, col, value) {
      if (value) {
        return this.formatDate("YYYY-mm-dd", new Date(value));
      } else {
        return "";
      }
    },
    choice(val) {
      this.focusStrVal = val.join(",");
      console.log(this.focusStrVal);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-table__body-wrapper {
  overflow-y: auto;
  // overflow-x: hidden
}
/deep/ .el-table th.gutter {
  width: 0 !important;
  display: table-cell !important;
}
.total {
  font-weight: bold;
}
/deep/ .el-table tr.warning-row {
  color: red;
}
.backItem {
  margin: 10px 0;
  p {
    margin: 10px 0;
  }
}
.severBack {
  p {
    margin: 15px 0;
  }
  .severBackInfo {
    border-top: 1px solid #ccc;
  }
}
/deep/ .severBackQr {
  vertical-align: text-top;
}
</style>
