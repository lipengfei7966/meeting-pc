<template>
  <div class="content">
    <div class="index">
      <span>首页-></span>
      <span @click="$router.push('/otherSettings')">其他配置 -></span>
      <span>{{addOrEdit?'新增/编辑报价结算规则':'编辑报价结算规则'}}</span>
    </div>
    <div class="title"><span>{{addOrEdit?'新增/编辑报价结算规则':'编辑报价结算规则'}}</span></div>
    <el-form class="form" :model="ruleInfo" ref="ruleInfo" label-position="left" :rules="rules" label-width="250px">
      <el-form-item v-if="type==1" label="客户" prop="customerid">
        <el-select placeholder="请选择客户" filterable @change="customerChange" v-model="ruleInfo.customerid">
          <el-option v-for="item in customers" :label="item.shortname" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户" prop="" v-else>
        <span>{{ company_name }}</span>
      </el-form-item>
      <el-form-item v-if="type==1" label="会议类型" prop="meeting">
        <el-checkbox-group v-model="ruleInfo.meeting">
          <el-checkbox v-for="item in meetingType" :key="item.id" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="type==1" label="服务类型" prop="service_type">
        <el-checkbox-group v-model="ruleInfo.service_type">
          <el-checkbox v-for="item in serviceList" :key="item.id" :label="item.name"></el-checkbox>
          <!-- <el-checkbox v-for="item in serviceList" :key="item.id" :label="item.name"></el-checkbox> -->
          <!-- <el-checkbox v-for="item in serviceList" :key="item.id" :label="item.name"></el-checkbox> -->
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="type==1" label="会议城市" prop="provinceList">
        <el-select placeholder="请选择城市" multiple v-model="ruleInfo.provinceList">
          <el-option v-for="item in city" :label="item.name" :value="item.code" :key="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务下载报价单模板" prop="ruleTemplate_BusinessOffer_id">
        <el-select placeholder="请选择模板" v-model="ruleInfo.ruleTemplate_BusinessOffer_id">
          <el-option v-for="item in ruleTemplate_BusinessOffer" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务下载结算单模板" prop="ruleTemplate_BusinessSettlement_id">
        <el-select placeholder="请选择模板" @change="eventData" v-model="ruleInfo.ruleTemplate_BusinessSettlement_id">
          <el-option v-for="item in ruleTemplate_BusinessSettlement" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商下载报价单模板" prop="ruleTemplate_VendorQuotation_id">
        <el-select placeholder="请选择模板" v-model="ruleInfo.ruleTemplate_VendorQuotation_id">
          <el-option v-for="item in ruleTemplate_VendorQuotation" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="供应商下载结算单模板" prop="ruleTemplate_SupplierSettlement_id">
        <el-select placeholder="请选择模板" v-model="ruleInfo.ruleTemplate_SupplierSettlement_id">
          <el-option v-for="item in ruleTemplate_SupplierSettlement" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="供应商下载报价确认单" prop="bjqrisdisplay">
        <el-radio-group v-model="ruleInfo.bjqrisdisplay" @change="bjqrisdisplayChange">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">不显示</el-radio>
        </el-radio-group>

        <div v-show="ruleInfo.bjqrisdisplay">
          <el-form-item label="报价单确认模板" prop="ruleTemplate_SupplierOfferConfirm_id">
            <el-select placeholder="请选择模板" v-model="ruleInfo.ruleTemplate_SupplierOfferConfirm_id">
              <el-option v-for="item in ruleTemplate_SupplierOfferConfirm" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="供应商下载结算确认单" prop="jsqrisdisplay">
        <el-radio-group v-model="ruleInfo.jsqrisdisplay" @change="jsqrisdisplayChange">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">不显示</el-radio>
        </el-radio-group>

        <div v-show="ruleInfo.jsqrisdisplay">
          <el-form-item label="结算单确认模板" prop="ruleTemplate_SupplierSettlementConfirm_id">
            <el-select placeholder="请选择模板" v-model="ruleInfo.ruleTemplate_SupplierSettlementConfirm_id">
              <el-option v-for="item in ruleTemplate_SupplierSettlementConfirm" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form-item>

      <el-form-item label="专票还原税前" prop="vat_reduction_pre_tax">
        <el-radio-group v-model="ruleInfo.vat_reduction_pre_tax">
          <el-radio :label="1">还原</el-radio>
          <el-radio :label="0">不还原</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="VAT规则" prop="vatrule" v-if="ruleInfo.vatrule==0">
        <template>
          <el-radio-group :disabled="true" v-model="ruleInfo.vatrule">
            <el-radio :label="0">分项VAT</el-radio>
            <el-radio :label="1">统一VAT</el-radio>
          </el-radio-group>
          <!-- <template v-if="ruleInfo.vatrule">
						<el-input style="width: 10%;margin-left: 20px;" @input="ruleInfo.flat_tax_rate=formatNum(ruleInfo.flat_tax_rate,1)" v-model="ruleInfo.flat_tax_rate"></el-input>
						%
					</template> -->
        </template>
      </el-form-item>
      <el-form-item label="VAT规则" prop="flat_tax_rate" v-else>
        <template>
          <el-radio-group :disabled="true" v-model="ruleInfo.vatrule">
            <el-radio :label="0">分项VAT</el-radio>
            <el-radio :label="1">统一VAT</el-radio>
          </el-radio-group>
          <template>
            <el-input style="width: 10%;margin-left: 20px;" @input="ruleInfo.flat_tax_rate=formatNum(ruleInfo.flat_tax_rate)" v-model="ruleInfo.flat_tax_rate"></el-input>
            %
          </template>
        </template>
      </el-form-item>
      <el-form-item label="VAT比例是否可修改" prop="vatcanedit">
        <el-radio-group v-model="ruleInfo.vatcanedit">
          <el-radio :label="1">可修改</el-radio>
          <el-radio :label="0">不可修改</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="服务费计算方式" prop="service_fee_calculation_method">
        <el-radio-group :disabled="false" v-model="ruleInfo.service_fee_calculation_method">
          <el-radio :label="0">分项计费</el-radio>
          <el-radio :label="1">阶梯计费</el-radio>
          <el-radio :label="2">跳档计费</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label-width="0">
        <!-- 阶梯计费 -->
        <div v-if="ruleInfo.service_fee_calculation_method == 1">
          <div class="ladderList" v-for="(item, index) in ruleInfo.ladder" :key="index">
            阶梯{{ index + 1 }}
            <el-input style="width: 100px;" @input="item.ladder_min=formatNum(item.ladder_min)" v-model="item.ladder_min" :disabled="index==0"></el-input>
            ~
            <el-input style="width: 100px;" @input="item.ladder_max=formatNum(item.ladder_max)" v-model="item.ladder_max"></el-input>
            *
            <el-input style="width: 80px;" @input="item.ladder_taxrate=formatNum(item.ladder_taxrate)" v-model="item.ladder_taxrate"></el-input>
            %
            <el-button type="text" style="margin-left: 20px;text-decoration:underline;" @click="addLadder()">添加阶梯</el-button>
            <el-button v-if="index!=0" type="text" style="margin-left: 20px;text-decoration:underline;" @click="delLadder(index)">删除阶梯</el-button>
          </div>
        </div>

        <!-- 跳档计费 -->
        <div v-if="ruleInfo.service_fee_calculation_method == 2">
          <div class="ladderList" v-for="(item, index) in ruleInfo.grade" :key="index">
            金额 >=
            <!-- <el-input style="width: 100px;" @input="item.ladder_min=formatNum(item.ladder_min)" v-model="item.ladder_min" :disabled="index==0"></el-input>
						~ -->
            <el-input style="width: 100px;" @input="item.grade_money=formatNum(item.grade_money)" v-model="item.grade_money"></el-input>
            *
            <el-input style="width: 80px;" @input="item.grade_taxrate=formatNum(item.grade_taxrate)" v-model="item.grade_taxrate"></el-input>
            %
            <el-button type="text" style="margin-left: 20px;text-decoration:underline;" @click="addTiaodang()">添加档次</el-button>
            <el-button v-if="index!=0" type="text" style="margin-left: 20px;text-decoration:underline;" @click="delTiaodang(index)">删除档次</el-button>
          </div>
        </div>
        <el-table :data="tableData" border class="table" :span-method="arraySpanMethod">
          <el-table-column align="center" prop="project" label="采购项目"></el-table-column>
          <el-table-column align="center" prop="type" label="询价方式" width="300">
            <template slot-scope="scope">
              <el-radio-group @change="change" v-model="scope.row.type">
                <el-radio :label="0">线上询价</el-radio>
                <el-radio :label="1">手工填报</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="taxRate" label="VAT">
            <template slot-scope="scope" v-if="!ruleInfo.vatrule">
              <el-input style="width: 30%;" @input="scope.row.taxRate=formatNum(scope.row.taxRate)" v-model="scope.row.taxRate"></el-input>
              %
            </template>
          </el-table-column>
          <el-table-column align="center" prop="isnotservice" label="是否计入服务费">
            <template slot-scope="scope" v-if="scope.$index != 6">
              <el-checkbox v-model="scope.row.isnotservice" :true-label="1" :false-label="0">计入服务费</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="serviceFee" label="服务费比例">
            <template slot-scope="scope" v-if="scope.$index != 6 && ruleInfo.service_fee_calculation_method == 0">
              <el-input style="width: 30%;" @input="scope.row.serviceFee=formatNum(scope.row.serviceFee)" v-model="scope.row.serviceFee"></el-input>
              %
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item label="服务费比例是否可修改" prop="servicecanedit">
        <el-radio-group :disabled="true" v-model="ruleInfo.servicecanedit">
          <el-radio :label="1">可修改</el-radio>
          <el-radio :label="0">不可修改</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否支持填写服务费总价比例" prop="service_fee_ratio">
        <el-radio-group v-model="ruleInfo.service_fee_ratio">
          <el-radio :label="1">支持</el-radio>
          <el-radio :label="0">不支持</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有最低服务费费用" prop="minimum_service_fee">
        <el-radio-group v-model="ruleInfo.minimum_service_fee">
          <el-radio :label="0">无最低费用</el-radio>
          <el-radio :label="1">有最低费用</el-radio>
        </el-radio-group>
        <template v-if="ruleInfo.minimum_service_fee" style="margin-left: 20px;">
          ￥ <el-input style="width: 10%;margin-left: 20px;" @input="ruleInfo.minimum_service_fee_money=positiveFloat(ruleInfo.minimum_service_fee_money)" v-model="ruleInfo.minimum_service_fee_money">
          </el-input>
        </template>
      </el-form-item>
      <el-form-item label="非直采服务费是否计税" prop="fzc_service_fee_money">
        <el-radio-group v-model="ruleInfo.fzc_service_fee_money">
          <el-radio :label="1">计VAT税</el-radio>
          <el-radio :label="0">不计VAT税</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="直采服务费规则" prop="zhicai_service">
        <el-radio-group v-model="ruleInfo.zhicai_service">
          <el-radio :label="0">默认规则</el-radio>
          <el-radio :label="1">拜耳规则</el-radio>
        </el-radio-group>
        <div>
          <el-table :data="ruleInfo.service_list" border class="table" v-show="ruleInfo.zhicai_service">
            <el-table-column align="center" prop="grade_name" label="等级名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.grade_name"></el-input>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="grade_price" label="固定单价" width="300">
              <template slot-scope="scope">
                <!-- <el-input type="number" style="width: 50%;" v-model.number="scope.row.grade_price"></el-input> -->
                <el-input-number v-model.number="scope.row.grade_price" :controls="false" :precision="2" style="width: 50%;"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="addGrade(scope.$index)"> 添加 </el-button>
                <el-button type="text" @click="delGrade(scope.$index)" v-show="scope.$index != 0"> 删除 </el-button>

              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-form-item>
      <el-form-item label="“开票通知文件” 字段" prop="kp_notice_file">
        <el-radio-group v-model="ruleInfo.kp_notice_file" @change="kpNoticeChange">
          <el-radio :label="0">不显示</el-radio>
          <el-radio :label="1">订单中显示</el-radio>
        </el-radio-group>
        <span style="margin-left: 20px">注：选择“订单中显示”，结算单审核通过后系统邮件/短信通知供应商上传“开票通知文件”</span>

        <div v-show="ruleInfo.kp_notice_file" style="margin-left:30px">
          <el-radio v-model="ruleInfo.kp_relevant" :label="0" name="person" @change="personTypeChange">相关人员</el-radio>
          <div style="margin-left: 40px">
            <el-checkbox-group v-model="ruleInfo.kp_relevant_user">
              <el-checkbox v-for="item in relatedPersonList" :key="item.id" :label="item.name" :disabled="ruleInfo.kp_relevant == 1"></el-checkbox>
            </el-checkbox-group>
          </div>
          <el-radio v-model="ruleInfo.kp_relevant" :label="1" name="person" @change="personTypeChange">指定人员</el-radio>
          <el-button type="primary" :disabled="ruleInfo.kp_relevant == 0" style="padding: 7px 6px; font-size: 7px; margin-left: 50px" @click="addList(1)">添加</el-button>
          <p>
            {{this.kp_appoint_fullname}}<i class="ico del"></i>
          </p>
        </div>
      </el-form-item>

      <el-form-item label=" “发票附件” 字段" prop="invoice_file">
        <el-radio-group v-model="ruleInfo.invoice_file">
          <el-radio :label="0">不显示</el-radio>
          <el-radio :label="1">订单中显示</el-radio>
        </el-radio-group>
        <span style="margin-left: 20px"> 注：选择“订单中显示”，我方在结算单上传“发票附件”后系统邮件/短信通知供应商</span>
      </el-form-item>

      <el-form-item label=" “Cevent 上传完成日期” 字段" prop="cvent_date">
        <el-radio-group v-model="ruleInfo.cvent_date" @change="cventDateChange">
          <el-radio :label="0">不显示</el-radio>
          <el-radio :label="1">订单中显示</el-radio>
        </el-radio-group>
        <span style="margin-left: 20px"> 注：选择“订单中显示”，结算单审核通过后系统邮件/短信通知供应商上传“开票通知文件”</span>

        <div v-show="ruleInfo.cvent_date" style="margin-left:30px">
          <el-radio v-model="ruleInfo.cvent_relevant" :label="0" name="person" @change="updatedDate_personTypeChange">相关人员</el-radio>
          <div style="margin-left: 40px">
            <el-checkbox-group v-model="ruleInfo.cvent_relevant_user">
              <el-checkbox v-for="item in relatedPersonList" :key="item.id" :label="item.name" :disabled="ruleInfo.cvent_relevant == 1"></el-checkbox>
            </el-checkbox-group>
          </div>
          <el-radio v-model="ruleInfo.cvent_relevant" :label="1" name="person" @change="updatedDate_personTypeChange">指定人员</el-radio>
          <el-button type="primary" :disabled="ruleInfo.cvent_relevant == 0" style="padding: 7px 6px; font-size: 7px; margin-left: 50px" @click="addList(2)">添加</el-button>
          <p>
            {{this.cvent_appoint_fullname}}<i class="ico del"></i>
          </p>

        </div>
      </el-form-item>

      <el-form-item label="备注说明" prop="remark">
        <el-input v-model="ruleInfo.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="form-btn" type="primary" @click="submitForm('ruleInfo')">保存</el-button>
        <el-button class="form-btn" @click="toPage()">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="查找指定人员" :visible.sync="dialogVisible" width="30%">
      <el-select v-model="getUserValue" filterable placeholder="请选择">
        <el-option v-for="item in getUserList" :key="item.username" :label="item.fullname" :value="item.username"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPerson">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { formatNum, positiveFloat } from '@/utils/common'
export default {
  data() {
    return {
      tableData: [
        { project: '客房需求', type: 0, taxRate: 0, isnotservice: 1, serviceFee: 0 },
        { project: '会场需求', type: 0, taxRate: 0, isnotservice: 1, serviceFee: 0 },
        { project: '酒店内餐饮需求', type: 0, taxRate: 0, isnotservice: 1, serviceFee: 0 },
        { project: '酒店外餐饮需求', type: 0, taxRate: 0, isnotservice: 1, serviceFee: 0 },
        { project: '大交通', type: 0, taxRate: 0, isnotservice: 1, serviceFee: 0 },
        { project: '地面交通', type: 0, taxRate: 0, isnotservice: 1, serviceFee: 0 },
        { project: '其他服务', type: 0, taxRate: 0 }
      ], //项目列表
      relatedPersonList: [
        { id: '0032-1', name: '会议创建人' },
        { id: '0032-2', name: '会议负责人' },
        { id: '0032-3', name: '会议指定采购' },
        { id: '0032-4', name: '会议指定合规人员' },
        { id: '0032-5', name: '会议助理' }
      ],
      rules: {
        customerid: [{ required: true, message: '请选择客户', trigger: 'change' }],
        ruleTemplate_BusinessOffer_id: [{ required: true, message: '请选择模板', trigger: 'change' }],
        ruleTemplate_BusinessSettlement_id: [{ required: true, message: '请选择模板', trigger: 'change' }],
        ruleTemplate_VendorQuotation_id: [{ required: true, message: '请选择模板', trigger: 'change' }],
        ruleTemplate_SupplierSettlement_id: [{ required: true, message: '请选择模板', trigger: 'change' }],
        flat_tax_rate: [{ required: true, message: '请输入税率', trigger: 'blur' }],
        vat_reduction_pre_tax: [{ required: true, message: '请选择', trigger: 'change' }],
        vatcanedit: [{ required: true, message: '请选择', trigger: 'change' }],
        service_fee_calculation_method: [{ required: true, message: '请选择', trigger: 'change' }],
        servicecanedit: [{ required: true, message: '请选择', trigger: 'change' }],
        vatrule: [{ required: true, message: '请选择', trigger: 'change' }]
      }, //规则校验
      ruleInfo: {
        car_inquiry_isnotservice: 1, //地面交通是否计入服务费(0不计入服务费,1计入服务费)
        car_inquiry_service_taxrate: 0, //地面交通服务费比率
        car_inquiry_taxrate: 0, //地面交通税率
        car_inquiry_type: 0, //地面交通询价类型(0线上询价，1手工填报)
        conference_inquiry_isnotservice: 1, //会场是否计入服务费(0不计入服务费,1计入服务费)
        conference_inquiry_service_taxrate: 0, //会场服务费比率
        conference_inquiry_taxrate: 0, //会场税率
        conference_inquiry_type: 0, //会场询价类型(0线上询价，1手工填报)
        customerid: null, //公司ID
        eventtype: '', //会议类型ID
        service_type: [], // 服务类型
        zhicai_service: 0, // 直采服务费规则

        kp_notice_file: 0, // 开票通知是否显示
        kp_relevant: 0, // 通知人员类型
        kp_relevant_user: [], //相关人员
        kp_appoint_user: '', // 指定人员

        invoice_file: 0, // 发票附件是否显示字段
        bjqrisdisplay: 0, // 供应商下载报价确认单是否显示
        jsqrisdisplay: 0, // 供应商下载结算确认单是否显示

        cvent_date: 0, // Cevent 上传完成
        cvent_relevant: 0, // 通知人员类型
        cvent_relevant_user: [], //相关人员
        cvent_appoint_user: '', // 指定人员

        hotel_food_inquiry_isnotservice: 1, //酒店内餐饮是否计入服务费(0不计入服务费,1计入服务费)
        hotel_food_inquiry_service_taxrate: 0, //酒店内餐饮服务费比率
        hotel_food_inquiry_taxrate: 0, //酒店内餐饮税率
        hotel_food_inquiry_type: 0, //酒店餐饮内询价类型(0线上询价，1手工填报)
        id: '', //主ID
        configid: '',
        //阶梯计费
        ladder: [
          {
            id: '',
            ladder_min: 0, //阶梯税率低价
            ladder_max: '', //阶梯税率高价
            ladder_taxrate: 0 //阶梯税率
          }
        ],
        //跳档计费
        grade: [
          {
            id: '',
            grade_money: '', //阶梯税率高价
            grade_taxrate: 0 //阶梯税率
          }
        ],
        other: [
          {
            id: '',
            othercode: '', //服务code
            servicerate: 0, //服务费比例
            iscalservice: 1 //是否计入服务费(0不计入1计入)
          }
        ], //其他服务服务费
        service_list: [
          {
            id: '',
            grade_name: '',
            grade_price: 0
          }
        ],
        other_inquiry_taxrate: '', //其他服务税率
        other_inquiry_type: 0, //其他服务询价类型(0线上询价，1手工填报)
        others_food_inquiry_isnotservice: 1, //酒店外餐饮是否计入服务费(0不计入服务费,1计入服务费)
        others_food_inquiry_service_taxrate: 0, //酒店外餐饮服务费比率
        others_food_inquiry_taxrate: 0, //酒店外餐饮税率
        others_food_inquiry_type: 0, //酒店外餐饮询价类型(0线上询价，1手工填报)
        province_code: '', //城市Code
        remark: '', //说明
        room_inquiry_isnotservice: 1, //客房需求是否计入服务费(0不计入服务费,1计入服务费)
        room_inquiry_service_taxrate: 0, //客房需求服务费比率
        room_inquiry_taxrate: 0, //客房需求税率
        room_inquiry_type: 0, //客房需求询价类型(0线上询价，1手工填报)
        service_fee_calculation_method: 1, //服务费计算方式(0分项计算,1阶梯计算,2跳档计费)
        service_taxrate: 0, //服务费税率
        servicecanedit: 0, //服务费是否能修改(0不能1能)
        service_fee_ratio: 0, //是否支持填写服务费总价比例(0不支持1支持)
        minimum_service_fee: 0, //是否有最低服务费（0没有1有）
        minimum_service_fee_money: 0, // 最低服务费金额
        fzc_service_fee_money: 0, // 非直采服务费是否计税(1是0否)
        template: [
          {
            id: '',
            templateid: '', //模板ID
            type: 1 //1业务下载报价,2业务下载结算,3供应商下载报价,4供应商下载结算
          }
        ],
        transportation_inquiry_isnotservice: 1, //大交通是否计入服务费(0不计入服务费,1计入服务费)
        transportation_inquiry_service_taxrate: 0, //大交通服务费比率
        transportation_inquiry_taxrate: 0, //大交通税率
        transportation_inquiry_type: 0, //大交通询价类型(0线上询价，1手工填报)
        vat_reduction_pre_tax: 0, //专票还原税前(0不还原,1还原)
        vatcanedit: 0, //税率是否能修改(0不能1能)
        vatrule: 1, //0分项vat 1统一vat

        ruleTemplate_BusinessOffer_id: '', //选中的业务报价模板templateid
        ruleTemplate_BusinessSettlement_id: '', //选中的业务结算模板templateid
        ruleTemplate_VendorQuotation_id: '', //选中的供应商报价模板templateid
        ruleTemplate_SupplierSettlement_id: '', //选中的供应商结算模板templateid
        ruleTemplate_SupplierOfferConfirm_id: '', //选中的供应商报价确认单模板templateid
        ruleTemplate_SupplierSettlementConfirm_id: '', //选中的供应商结算确认单模板templateid
        flat_tax_rate: 0, //统一税率
        provinceList: [], //省份选择集合
        meeting: [] //选中的会议类型，存入会议名称
      }, //规则配置
      dialogVisible: false,
      getUserValue: '', // 选取指定人员值
      getUserList: [],
      kp_appoint_fullname: '',
      cvent_appoint_fullname: '',

      type: 0, //规则配置  0默认 1自定义
      addtype: '', //1 开票通知文件 添加指定人员 2 Cevent 上传完成日期 添加指定人员
      id: '', //规则配置id
      addOrEdit: 0, //新增规则或编辑规则 1新增 0编辑
      company_name: '', //默认规则客户名称
      meetingType: [], //会议列表
      customers: [], //客户列表
      city: [], //省市列表
      serviceList: [], // 服务类型列表
      ruleTemplate: [], //模板列表-总列表
      ruleTemplate_BusinessOffer: [], //模板列表-业务下载报价模板
      ruleTemplate_BusinessSettlement: [], //模板列表-业务下载结算模板
      ruleTemplate_VendorQuotation: [], //模板列表-供应商下载报价模板
      ruleTemplate_SupplierSettlement: [], //模板列表-供应商下载结算模板
      ruleTemplate_SupplierOfferConfirm: [], // 模板列表-供应商下载报价确认单模板
      ruleTemplate_SupplierSettlementConfirm: [], // 模板列表-供应商下载结算确认单模板

      BusinessOffer_id: '', //选中的业务报价模板id
      BusinessSettlement_id: '', //选中的业务结算模板id
      VendorQuotation_id: '', //选中的供应商报价模板id
      SupplierSettlement_id: '', //选中的供应商结算模板id
      SupplierOfferConfirm_id: '', //选中的供应商报价确认单模板id
      SupplierSettlementConfirm_id: '' //选中的供应商结算确认的模板id
    }
  },
  mounted() {
    this.type = this.$route.params.type //默认或自定义规则 0默认 1自定义
    this.id = this.$route.params.id //配置id
    this.company_name = this.$route.params.company_name //默认规则客户名称
    this.addOrEdit = this.$route.params.addOrEdit //新增规则或编辑规则 1新增 0编辑
    this.getRuleTemplate()
    this.$nextTick(() => {
      // this.getCompany()
      // this.getRuleOther()
      // this.getProvinceCity()
      this.getRuleEdit()
      if (this.addOrEdit == 1) {
        this.getServiceType()
      }
    })
  },
  computed: {},
  watch: {},
  methods: {
    formatNum,
    positiveFloat,
    //行、列合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex >= 7 && columnIndex == 0) {
        return [1, 3]
      }
      if (rowIndex >= 7 && (columnIndex == 1 || columnIndex == 2)) {
        return [1, 0]
      }
    },
    //增加阶梯
    addLadder() {
      if (this.ruleInfo.ladder[this.ruleInfo.ladder.length - 1].ladder_max) {
        this.ruleInfo.ladder.push({ id: '', ladder_min: '', ladder_max: '', ladder_taxrate: '' })
      } else {
        this.$message.error('请将上一阶梯信息填写完整')
      }
    },
    //删除阶梯
    delLadder(index) {
      this.ruleInfo.ladder.splice(index, 1)
    },
    // 添加档次
    addTiaodang() {
      if (this.ruleInfo.grade[this.ruleInfo.grade.length - 1].grade_money != '') {
        this.ruleInfo.grade.push({ id: '', grade_money: '', grade_taxrate: '' })
      } else {
        this.$message.error('请将上一档次信息填写完整')
      }
    },
    //删除档次
    delTiaodang(index) {
      this.ruleInfo.grade.splice(index, 1)
    },
    // 添加等级
    addGrade(index) {
      let addgrade = {
        id: '',
        grade_name: '',
        grade_price: 0
      }
      this.ruleInfo.service_list.splice(index + 1, 0, addgrade)
    },
    // 删除等级
    delGrade(index) {
      this.ruleInfo.service_list.splice(index, 1)
    },
    // 下载报价确认单 显示/不显示 切换
    bjqrisdisplayChange(value) {
      if (value == 0) {
        this.ruleInfo.ruleTemplate_SupplierOfferConfirm_id = ''
      }
    },
    // 下载结算确认单 显示/不显示 切换
    jsqrisdisplayChange(value) {
      if (value == 0) {
        this.ruleInfo.ruleTemplate_SupplierSettlementConfirm_id = ''
      }
    },
    // 开票显示/不显示 切换
    kpNoticeChange(value) {
      if (value == 0) {
        this.ruleInfo.kp_relevant_user = []
        this.kp_appoint_fullname = ''
      }
    },
    // Cevent 显示/不显示 切换
    cventDateChange(value) {
      if (value == 0) {
        this.ruleInfo.cvent_relevant_user = []
        this.cvent_appoint_fullname = ''
      }
    },
    // 相关人员/指定人员切换
    personTypeChange(value) {
      if (value == 1) {
        this.ruleInfo.kp_relevant_user = []
      } else {
        this.kp_appoint_fullname = ''
      }
    },
    // 相关人员/指定人员切换
    updatedDate_personTypeChange(value) {
      if (value == 1) {
        this.ruleInfo.cvent_relevant_user = []
      } else {
        this.cvent_appoint_fullname = ''
      }
    },
    addList(addtype) {
      // addtype: 1 开票通知文件 添加指定人员
      //					2 Cevent 上传完成日期 添加指定人员
      this.dialogVisible = true
      this.addtype = addtype
      this.getUserValue = '' // 清除上次选择
    },
    // 添加指定人员
    addPerson() {
      this.dialogVisible = false
      this.getUserList.forEach(item => {
        if (item.username == this.getUserValue) {
          if (this.addtype == 1) {
            // this.ruleInfo.kp_appoint_user.push(item.fullname);
            if (this.ruleInfo.kp_appoint_user.length > 0) {
              this.ruleInfo.kp_appoint_user += ',' + this.getUserValue
              this.kp_appoint_fullname += ',' + item.fullname
            } else {
              this.ruleInfo.kp_appoint_user = this.getUserValue
              this.kp_appoint_fullname = item.fullname
            }
          } else if (this.addtype == 2) {
            // this.ruleInfo.cvent_appoint_user.push(item.fullname);
            if (this.ruleInfo.cvent_appoint_user.length > 0) {
              this.ruleInfo.cvent_appoint_user += ',' + this.getUserValue
              this.cvent_appoint_fullname += ',' + item.fullname
            } else {
              this.ruleInfo.cvent_appoint_user = this.getUserValue
              this.cvent_appoint_fullname = item.fullname
            }
          }
          return false
        }
      })
    },
    toPage() {
      this.$router.push({ name: 'otherSetting', params: { activeName: 'second' } })
    },
    // 服务类型查询
    getServiceType() {
      this.requestApi({
        url: '/MeetingMa/GetServiceType',
        method: 'POST',
        data: {}
      }).then(res => {
        this.serviceList = res
        //service_type"id"换成 serviceList 的name
        this.serviceList.forEach((e, i) => {
          this.ruleInfo.service_type.forEach((item, index) => {
            if (e.id == item) {
              this.ruleInfo.service_type[index] = e.name
              console.log(this.ruleInfo.service_type)
            }
          })
        })
        // this.ruleInfo.service_type = this.serviceList[0].id
      })
    },
    //会议类型查询
    getMeetingTypeShow() {
      this.requestApi({
        url: '/MeetingMa/GetMeetingTypeShow',
        method: 'POST',
        data: { CompanyID: this.ruleInfo.customerid }
      }).then(res => {
        if (res == null || res == undefined || res == true) {
          this.meetingType = []
        } else {
          this.meetingType = res
        }
        //把meeting的"id"换成meetingType的name
        this.meetingType.forEach((e, i) => {
          this.ruleInfo.meeting.forEach((item, index) => {
            if (e.id == item) {
              this.ruleInfo.meeting[index] = e.name
            }
          })
        })
      })
    },
    //省市查询
    getProvinceCity() {},
    //模板查询
    getRuleTemplate() {
      this.requestApi({
        url: '/MeetingMa/GetRuleTemplate',
        method: 'POST',
        data: {}
      }).then(res => {
        if (res == null || res == undefined || res == true) {
          this.ruleTemplate = []
        } else {
          this.ruleTemplate = res
        }
        this.ruleTemplate_BusinessOffer = this.ruleTemplate.filter(e => {
          return e.type == 1
        })
        this.ruleTemplate_BusinessSettlement = this.ruleTemplate.filter(e => {
          return e.type == 2
        })
        this.ruleTemplate_VendorQuotation = this.ruleTemplate.filter(e => {
          return e.type == 3
        })
        this.ruleTemplate_SupplierSettlement = this.ruleTemplate.filter(e => {
          return e.type == 4
        })
        this.ruleTemplate_SupplierOfferConfirm = this.ruleTemplate.filter(e => {
          return e.type == 5
        })
        this.ruleTemplate_SupplierSettlementConfirm = this.ruleTemplate.filter(e => {
          return e.type == 6
        })
      })
    },
    //查询其他项
    getRuleOther() {},
    //规则配置详情查询
    async getRuleEdit() {
      //公司查询
      await this.requestApi({
        url: '/MeetingMa/GetCompany',
        method: 'POST',
        data: {}
      }).then(res => {
        if (res == null || res == undefined || res == true) {
          this.customers = []
        } else {
          this.customers = res
        }
      })
      //查询其他项
      await this.requestApi({
        url: '/MeetingMa/GetRuleOther',
        method: 'POST',
        data: {}
      }).then(res => {
        if (res == null || res == undefined || res == true) {
          res = []
        }
        res.forEach((item, index) => {
          this.tableData.push({ project: item.name, isnotservice: 1, code: item.code, serviceFee: 0, id: '' })
        })
      })
      //省市查询
      await this.requestApi({
        url: '/MeetingMa/ProvinceCity',
        method: 'POST',
        data: {}
      }).then(res => {
        if (res == null || res == undefined || res == true) {
          this.city = []
        } else {
          this.city = res
        }
      })
      await this.requestApi({
        url: '/MeetingMa/GetUser',
        method: 'POST',
        data: {}
      }).then(res => {
        this.getUserList = res
      })
      await this.requestApi({
        url: '/MeetingMa/RuleEdit',
        method: 'POST',
        data: { RuleID: this.id }
      }).then(res => {
        if (this.addOrEdit == 1) {
          //新增配置
        } else {
          //编辑配置
          this.ruleInfo = res
          this.ruleInfo.zhicai_service = this.ruleInfo.zhicai_service === '' ? 0 : this.ruleInfo.zhicai_service
          // debugger

          if (this.ruleInfo.service_list.length == 0) {
            let intGrade = {
              id: '',
              grade_name: '',
              grade_price: 0
            }
            this.ruleInfo.service_list.push(intGrade)
          }
        }
        this.$nextTick(() => {
          //赋默认值
          this.$set(this.ruleInfo, 'provinceList', this.ruleInfo.province_code ? this.ruleInfo.province_code.split(',') : []) //字符转数组
          this.$set(this.ruleInfo, 'meeting', this.ruleInfo.eventtype ? this.ruleInfo.eventtype.split(',') : []) //字符转数组
          this.$set(this.ruleInfo, 'service_type', typeof this.ruleInfo.service_type == 'string' ? this.ruleInfo.service_type.split(',') : []) //字符转数组
          this.$set(this.ruleInfo, 'customerid', parseInt(this.ruleInfo.customerid) ? parseInt(this.ruleInfo.customerid) : null)
          // this.ruleInfo.customerid=parseInt(this.ruleInfo.customerid)?parseInt(this.ruleInfo.customerid):null	//转为int，与查询的客户列表中的id类型保持相同
          // this.ruleInfo.service_type = this.ruleInfo.service_type?this.ruleInfo.service_type.split( ',' ):[]

          // 开票通知相关人员
          let kp_relevant_user = this.ruleInfo.kp_relevant_user.split(',')
          // 开票通知文件 指定人员
          let kp_appoint_fullname = this.ruleInfo.kp_appoint_user.split(',')

          // Cevent 相关人员
          let cvent_relevant_user = this.ruleInfo.cvent_relevant_user.split(',')
          // Cevent 指定人员
          let cvent_appoint_fullname = this.ruleInfo.cvent_appoint_user.split(',')

          this.getUserList.forEach(item => {
            kp_appoint_fullname.forEach(cventItem => {
              if (item.username == cventItem) {
                if (this.kp_appoint_fullname.length > 0) {
                  // this.ruleInfo.cvent_appoint_user += ',' + this.getUserValue;
                  this.kp_appoint_fullname += ',' + item.fullname
                } else {
                  // this.ruleInfo.cvent_appoint_user = this.getUserValue;
                  this.kp_appoint_fullname = item.fullname
                }
              }
            })

            cvent_appoint_fullname.forEach(cventItem => {
              if (item.username == cventItem) {
                if (this.cvent_appoint_fullname.length > 0) {
                  // this.ruleInfo.cvent_appoint_user += ',' + this.getUserValue;
                  this.cvent_appoint_fullname += ',' + item.fullname
                } else {
                  // this.ruleInfo.cvent_appoint_user = this.getUserValue;
                  this.cvent_appoint_fullname = item.fullname
                }
              }
            })
          })
          // 后端返回为字符串，在这里需要初始化成数组
          this.ruleInfo.kp_relevant_user = []
          this.ruleInfo.cvent_relevant_user = []

          this.relatedPersonList.forEach((e, i) => {
            kp_relevant_user.forEach((item, index) => {
              if (e.id == item) {
                this.ruleInfo.kp_relevant_user.push(e.name)
              }
            })
            cvent_relevant_user.forEach((item, index) => {
              if (e.id == item) {
                this.ruleInfo.cvent_relevant_user.push(e.name)
              }
            })
          })

          var ruleTemplate_BusinessOffer = this.ruleInfo.template.filter(e => {
            return e.type == 1
          }) //选中的业务报价模板
          var ruleTemplate_BusinessSettlement = this.ruleInfo.template.filter(e => {
            return e.type == 2
          }) //选中的业务结算模板
          var ruleTemplate_VendorQuotation = this.ruleInfo.template.filter(e => {
            return e.type == 3
          }) //选中的供应商报价模板
          var ruleTemplate_SupplierSettlement = this.ruleInfo.template.filter(e => {
            return e.type == 4
          }) //选中的供应商结算模板
          var ruleTemplate_SupplierOfferConfirm = this.ruleInfo.template.filter(e => {
            return e.type == 5
          }) //供应商下载报价确认单下拉选项
          var ruleTemplate_SupplierSettlementConfirm = this.ruleInfo.template.filter(e => {
            return e.type == 6
          }) //供应商下载结算确认单下拉选项

          this.$set(this.ruleInfo, 'ruleTemplate_BusinessOffer_id', ruleTemplate_BusinessOffer[0] ? ruleTemplate_BusinessOffer[0].templateid : null)
          this.$set(this.ruleInfo, 'ruleTemplate_BusinessSettlement_id', ruleTemplate_BusinessSettlement[0] ? ruleTemplate_BusinessSettlement[0].templateid : null)
          this.$set(this.ruleInfo, 'ruleTemplate_VendorQuotation_id', ruleTemplate_VendorQuotation[0] ? ruleTemplate_VendorQuotation[0].templateid : null)
          this.$set(this.ruleInfo, 'ruleTemplate_SupplierSettlement_id', ruleTemplate_SupplierSettlement[0] ? ruleTemplate_SupplierSettlement[0].templateid : null)
          this.$set(this.ruleInfo, 'ruleTemplate_SupplierOfferConfirm_id', ruleTemplate_SupplierOfferConfirm[0] ? ruleTemplate_SupplierOfferConfirm[0].templateid : null)
          this.$set(this.ruleInfo, 'ruleTemplate_SupplierSettlementConfirm_id', ruleTemplate_SupplierSettlementConfirm[0] ? ruleTemplate_SupplierSettlementConfirm[0].templateid : null)

          this.$set(this, 'BusinessOffer_id', ruleTemplate_BusinessOffer[0] ? ruleTemplate_BusinessOffer[0].id : null)
          this.$set(this, 'BusinessSettlement_id', ruleTemplate_BusinessSettlement[0] ? ruleTemplate_BusinessSettlement[0].id : null)
          this.$set(this, 'VendorQuotation_id', ruleTemplate_VendorQuotation[0] ? ruleTemplate_VendorQuotation[0].id : null)
          this.$set(this, 'SupplierSettlement_id', ruleTemplate_SupplierSettlement[0] ? ruleTemplate_SupplierSettlement[0].id : null)
          this.$set(this, 'SupplierOfferConfirm_id', ruleTemplate_SupplierOfferConfirm[0] ? ruleTemplate_SupplierOfferConfirm[0].id : null)
          this.$set(this, 'SupplierSettlementConfirm_id', ruleTemplate_SupplierSettlementConfirm[0] ? ruleTemplate_SupplierSettlementConfirm[0].id : null)

          this.$set(this.ruleInfo, 'flat_tax_rate', this.ruleInfo.room_inquiry_taxrate)
          if (this.ruleInfo.ladder.length == 0 || !this.ruleInfo.ladder) {
            this.$set(this.ruleInfo, 'ladder', [
              {
                id: '',
                ladder_min: 0, //阶梯税率低价
                ladder_max: '', //阶梯税率高价
                ladder_taxrate: 0 //阶梯税率
              }
            ])
          }
          if (this.ruleInfo.grade.length == 0 || !this.ruleInfo.grade) {
            this.$set(this.ruleInfo, 'grade', [
              {
                id: '',
                grade_money: '', //阶梯税率高价
                grade_taxrate: 0 //阶梯税率
              }
            ])
          }

          if (this.addOrEdit != 1) {
            this.tableData.forEach((item, index) => {
              if (index == 0) {
                item.type = this.ruleInfo.room_inquiry_type
                item.taxRate = this.ruleInfo.room_inquiry_taxrate
                item.isnotservice = this.ruleInfo.room_inquiry_isnotservice
                item.serviceFee = this.ruleInfo.room_inquiry_service_taxrate
              }
              if (index == 1) {
                item.type = this.ruleInfo.conference_inquiry_type
                item.taxRate = this.ruleInfo.conference_inquiry_taxrate
                item.isnotservice = this.ruleInfo.conference_inquiry_isnotservice
                item.serviceFee = this.ruleInfo.conference_inquiry_service_taxrate
              }
              if (index == 2) {
                item.type = this.ruleInfo.hotel_food_inquiry_type
                item.taxRate = this.ruleInfo.hotel_food_inquiry_taxrate
                item.isnotservice = this.ruleInfo.hotel_food_inquiry_isnotservice
                item.serviceFee = this.ruleInfo.hotel_food_inquiry_service_taxrate
              }
              if (index == 3) {
                item.type = this.ruleInfo.others_food_inquiry_type
                item.taxRate = this.ruleInfo.others_food_inquiry_taxrate
                item.isnotservice = this.ruleInfo.others_food_inquiry_isnotservice
                item.serviceFee = this.ruleInfo.others_food_inquiry_service_taxrate
              }
              if (index == 4) {
                item.type = this.ruleInfo.transportation_inquiry_type
                item.taxRate = this.ruleInfo.transportation_inquiry_taxrate
                item.isnotservice = this.ruleInfo.transportation_inquiry_isnotservice
                item.serviceFee = this.ruleInfo.transportation_inquiry_service_taxrate
              }
              if (index == 5) {
                item.type = this.ruleInfo.car_inquiry_type
                item.taxRate = this.ruleInfo.car_inquiry_taxrate
                item.isnotservice = this.ruleInfo.car_inquiry_isnotservice
                item.serviceFee = this.ruleInfo.car_inquiry_service_taxrate
              }
              if (index == 6) {
                item.type = this.ruleInfo.other_inquiry_type
                item.taxRate = this.ruleInfo.other_inquiry_taxrate
              }
              if (index > 6) {
                var list = this.ruleInfo.other.filter(e => {
                  return item.code == e.othercode
                })
                item.isnotservice = list[0] ? list[0].iscalservice : 1
                item.serviceFee = list[0] ? list[0].servicerate : 0
                item.id = list[0] ? list[0].id : ''
              }
            })
          }
          this.getMeetingTypeShow()
          this.getServiceType()
          this.getRuleTemplate()
          this.$forceUpdate()
        })
      })
    },
    //保存前规则校验
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let listvalidate = true

        if (this.ruleInfo.zhicai_service == 1) {
          this.ruleInfo.service_list.forEach(item => {
            if (item.grade_name === '' || item.grade_price === '') {
              listvalidate = false
              return false
            }
          })
        }

        if (!listvalidate) {
          this.$message.error('等级列表请填写完整')
          return false
        }
        if (!valid) {
          this.$message.error('请填写表单必填项！')
          return false
        }
        this.RuleSava() //保存
      })
    },
    //规则配置保存
    RuleSava() {
      //客户必填校验
      if (!this.ruleInfo.customerid && this.type == 1) {
        this.$message.error('请填写表单必填项！')
        return false
      }

      // 阶梯计费--校验
      if (this.ruleInfo.service_fee_calculation_method == 1) {
        for (var i = 0; i < this.ruleInfo.ladder.length; i++) {
          if (this.ruleInfo.ladder[i].ladder_taxrate == '' || this.ruleInfo.ladder[i].ladder_taxrate == null || this.ruleInfo.ladder[i].ladder_min === '' || this.ruleInfo.ladder[i].ladder_max === '') {
            this.$message.error(`阶梯${i + 1} 有未填写数据`)
            return
          } else if (parseFloat(this.ruleInfo.ladder[i].ladder_max) <= parseFloat(this.ruleInfo.ladder[i].ladder_min)) {
            this.$message.error(`阶梯${i + 1} 最大值必须大于最小值`)
            return
          } else if (i > 0 && parseFloat(this.ruleInfo.ladder[i].ladder_min) <= parseFloat(this.ruleInfo.ladder[i - 1].ladder_max)) {
            this.$message.error(`阶梯${i + 1} 最小值必须大于上一阶梯最大值`)
            return
          }
        }
      }

      // 跳档计费--校验
      if (this.ruleInfo.service_fee_calculation_method == 2) {
        for (var i = 0; i < this.ruleInfo.grade.length; i++) {
          if (this.ruleInfo.grade[i].grade_taxrate == '' || this.ruleInfo.grade[i].grade_taxrate == null || this.ruleInfo.grade[i].grade_money === '') {
            this.$message.error(`档次${i + 1} 有未填写数据`)
            return
          } else if (i > 0 && parseFloat(this.ruleInfo.grade[i].grade_money) <= parseFloat(this.ruleInfo.grade[i - 1].grade_money)) {
            this.$message.error(`档次${i + 1} 金额必须大于上一档次金额`)
            return
          }
        }
      }
      this.ruleInfo.province_code = this.ruleInfo.provinceList.join(',') //数组转字符

      this.ruleInfo.template = []
      this.ruleInfo.template.push({ id: this.BusinessOffer_id, templateid: this.ruleInfo.ruleTemplate_BusinessOffer_id, type: 1 })
      this.ruleInfo.template.push({ id: this.BusinessSettlement_id, templateid: this.ruleInfo.ruleTemplate_BusinessSettlement_id, type: 2 })
      this.ruleInfo.template.push({ id: this.VendorQuotation_id, templateid: this.ruleInfo.ruleTemplate_VendorQuotation_id, type: 3 })
      this.ruleInfo.template.push({ id: this.SupplierSettlement_id, templateid: this.ruleInfo.ruleTemplate_SupplierSettlement_id, type: 4 })
      this.ruleInfo.template.push({ id: this.SupplierOfferConfirm_id, templateid: this.ruleInfo.ruleTemplate_SupplierOfferConfirm_id, type: 5 })
      this.ruleInfo.template.push({ id: this.SupplierSettlementConfirm_id, templateid: this.ruleInfo.ruleTemplate_SupplierSettlementConfirm_id, type: 6 })

      this.tableData.forEach((item, index) => {
        if (index == 0) {
          this.ruleInfo.room_inquiry_type = item.type
          this.ruleInfo.room_inquiry_taxrate = item.taxRate
          this.ruleInfo.room_inquiry_isnotservice = item.isnotservice
          this.ruleInfo.room_inquiry_service_taxrate = item.serviceFee
        }
        if (index == 1) {
          this.ruleInfo.conference_inquiry_type = item.type
          this.ruleInfo.conference_inquiry_taxrate = item.taxRate
          this.ruleInfo.conference_inquiry_isnotservice = item.isnotservice
          this.ruleInfo.conference_inquiry_service_taxrate = item.serviceFee
        }
        if (index == 2) {
          this.ruleInfo.hotel_food_inquiry_type = item.type
          this.ruleInfo.hotel_food_inquiry_taxrate = item.taxRate
          this.ruleInfo.hotel_food_inquiry_isnotservice = item.isnotservice
          this.ruleInfo.hotel_food_inquiry_service_taxrate = item.serviceFee
        }
        if (index == 3) {
          this.ruleInfo.others_food_inquiry_type = item.type
          this.ruleInfo.others_food_inquiry_taxrate = item.taxRate
          this.ruleInfo.others_food_inquiry_isnotservice = item.isnotservice
          this.ruleInfo.others_food_inquiry_service_taxrate = item.serviceFee
        }
        if (index == 4) {
          this.ruleInfo.transportation_inquiry_type = item.type
          this.ruleInfo.transportation_inquiry_taxrate = item.taxRate
          this.ruleInfo.transportation_inquiry_isnotservice = item.isnotservice
          this.ruleInfo.transportation_inquiry_service_taxrate = item.serviceFee
        }
        if (index == 5) {
          this.ruleInfo.car_inquiry_type = item.type
          this.ruleInfo.car_inquiry_taxrate = item.taxRate
          this.ruleInfo.car_inquiry_isnotservice = item.isnotservice
          this.ruleInfo.car_inquiry_service_taxrate = item.serviceFee
        }
        if (index == 6) {
          this.ruleInfo.other_inquiry_type = item.type
          this.ruleInfo.other_inquiry_taxrate = item.taxRate
        }
        if (index > 6) {
          this.ruleInfo.other = []
          this.tableData.forEach((e, i) => {
            if (i > 6) {
              this.ruleInfo.other.push({ othercode: e.code, servicerate: e.serviceFee, iscalservice: e.isnotservice, id: e.id })
            }
          })
        }
      })
      if (this.ruleInfo.vatrule == 1) {
        //统一税率
        this.ruleInfo.room_inquiry_taxrate = this.ruleInfo.flat_tax_rate
        this.ruleInfo.conference_inquiry_taxrate = this.ruleInfo.flat_tax_rate
        this.ruleInfo.hotel_food_inquiry_taxrate = this.ruleInfo.flat_tax_rate
        this.ruleInfo.others_food_inquiry_taxrate = this.ruleInfo.flat_tax_rate
        this.ruleInfo.transportation_inquiry_taxrate = this.ruleInfo.flat_tax_rate
        this.ruleInfo.car_inquiry_taxrate = this.ruleInfo.flat_tax_rate
        this.ruleInfo.other_inquiry_taxrate = this.ruleInfo.flat_tax_rate
        this.ruleInfo.service_taxrate = this.ruleInfo.flat_tax_rate
      }

      var info = JSON.parse(JSON.stringify(this.ruleInfo))

      //meeting特殊，只可在这里转换
      this.meetingType.forEach((e, i) => {
        info.meeting.forEach((item, index) => {
          if (e.name == item) {
            info.meeting[index] = e.id
          }
        })
      })
      this.serviceList.forEach((e, i) => {
        info.service_type.forEach((item, index) => {
          if (e.name == item) {
            info.service_type[index] = e.id
          }
        })
      })
      this.relatedPersonList.forEach((e, i) => {
        info.kp_relevant_user.forEach((item, index) => {
          if (e.name == item) {
            info.kp_relevant_user[index] = e.id
          }
        })
        info.cvent_relevant_user.forEach((item, index) => {
          if (e.name == item) {
            info.cvent_relevant_user[index] = e.id
          }
        })
      })

      debugger
      info.kp_relevant_user = info.kp_relevant_user.join(',')
      info.cvent_relevant_user = info.cvent_relevant_user.join(',')
      info.eventtype = info.meeting.join(',') //数组转字符
      info.service_type = info.service_type.join(',') //数组转字符
      delete info.provinceList
      delete info.meeting
      delete info.flat_tax_rate
      delete info.ruleTemplate_BusinessOffer_id
      delete info.ruleTemplate_BusinessSettlement_id
      delete info.ruleTemplate_VendorQuotation_id
      delete info.ruleTemplate_SupplierSettlement_id
      delete info.ruleTemplate_SupplierOfferConfirm_id
      delete info.ruleTemplate_SupplierSettlementConfirm_id
      debugger
      //调用保存接口
      this.requestApi({
        url: '/MeetingMa/RuleSava',
        method: 'POST',
        data: { Parameter: JSON.stringify(info) }
      }).then(res => {
        console.log(res)
        this.$router.push({ name: 'otherSeetings', params: { activeName: 'second' } })
      })
    },
    change(e) {
      console.log(e)
    },
    eventData(e) {
      console.log(e)
    },
    customerChange(e) {
      this.getMeetingTypeShow()
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.content {
  width: 98%;
  margin: 0 auto;
  .index {
    color: #3272a8;
  }
  .title {
    font-size: 20px;
  }
  .form {
    width: 80%;
    margin-left: 10%;
  }
}

.ladderList {
  display: flex;
  align-items: center;
  margin-left: 40px;
  margin-bottom: 10px;
}
.table {
  width: 100%;
  margin-top: 10px;
}
.form-btn {
  padding: 15px 50px;
}
</style>
