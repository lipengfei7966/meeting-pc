<template>
  <div class="step_one">
    <a v-show="false" :href="downloadUrl" target="_blank" ref="d_click" download></a>
    <div class="stepName mar_b10">
      <strong>Step 1</strong>
      <span>创建会议
        <em>Create Event &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em></span>
    </div>
    <div>
      <a v-show="false" :href="url" target="_blank" ref="a_click"></a>
      <el-tabs v-model="stepOne" type="card" @tab-click="handleStepOne">
        <el-tab-pane label="会议基本信息" name="1">
          <!-- <div class="flex_row justify_between">
            <div class="flex_row align_center">
              <span class="base_title">会议基本信息<em>Event Basic Info. </em></span>
              <span class="base_time">(2021-09-09 10:49:28)</span>
              <div class="showBase_tap flex_row align_center" @click="showBaseInfo = !showBaseInfo">
                <img :src="showBaseInfo ? require('@/assets/images/close.png'):require('@/assets/images/open.png')" alt="">
                <span> {{showBaseInfo?'收起':'展开'}}</span>
              </div>
            </div>
            <div class="edit_base_tap" @click="editBaseTap">
              <span class="base_title">编辑基本信息 <em>Edit Basic Info.</em></span>
            </div>
          </div> -->
          <div class="step_card">
            <base-part :source="'stepOne'" :isDMC="isDMC" :isShowCancelBtn="isShowCancelBtn" :eventStatu="eventStatu" style="margin: 10px 20px"></base-part>

            <!-- <el-button v-if="poList.length === 0" class="add_po" type="primary" @click="poShow = true">添加PO</el-button> -->
          </div>
          <div v-if="!isDMC">
            <div v-if="!b2baudstatus && b2baudstatus != '0'" class="audit">
              <el-button type="primary" @click="b2bShow = true">提交B2B建团</el-button>
              <el-button type="primary" @click="Conference">审批超时定时</el-button>
            </div>
            <div v-if="b2baudstatus == '0'" class="audit">
              <div class="audited">已提交B2B，待审核</div>
              <el-button @click="gotoB2B('HZ00000103')">查看审批详情</el-button>
            </div>
            <div v-if="b2baudstatus == '-1'" class="audit">
              <div class="audit-fail">B2B审核不通过，请更新信息后更新提交</div>
              <div>原因：{{ b2bnote }}</div>
              <el-button type="primary" @click="b2bShow = true">重新提交B2B审核</el-button>
              <el-button @click="gotoB2B('HZ00000103')">查看审批详情</el-button>
            </div>
            <div v-if="b2baudstatus == '1'" class="audit">
              <div class="audit-success">B2B已审核通过</div>
              <div>原因：{{ b2bnote }}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="会议文件" name="2">
          <meeting-files v-if="eventInfo.id" :eventInfo="eventInfo"></meeting-files>

          <!-- <el-form :model="fileSearch" label-width="100px">
						<el-row>
							<el-col :span="6">
								<el-form-item label="文件名称">
									<el-input size="small" v-model="fileSearch.fileName" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="所属节点">
									<el-select filterable size="small" @change="jiedianChange" v-model="fileSearch.jiedian" clearable>
										<el-option v-for="item in jiedianOptions" :label="item.name" :value="item.value" :key="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="文件分类">
									<el-select filterable size="small" v-model="fileSearch.fenlei" clearable>
										<el-option v-for="item in fenleiOptions" :label="item.name" :value="item.value" :key="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6" align="right">
								<el-button size="small" type="primary" @click="searchFile">搜 索</el-button>
								<el-button size="small" type="primary" @click="resetSearch">重 置</el-button>
							</el-col>
						</el-row>
					</el-form> -->

          <!-- <el-table :data="meetingFileList" style="width: 100%">
						<el-table-column type="selection" width="60" align="center"></el-table-column>
						<el-table-column prop="jiedian" label="所属节点" ></el-table-column>
						<el-table-column prop="fenlei" label="文件分类" ></el-table-column>
						<el-table-column prop="fileName" label="文件名" ></el-table-column>
						<el-table-column prop="uploader" label="上传人" ></el-table-column>
						<el-table-column prop="uploadTime" label="上传时间"></el-table-column>
						<el-table-column prop="remarks" label="备注" ></el-table-column>
						<el-table-column label="操作" >
							<template slot-scope="scope">
								<el-button type="text" size="small" @click="deleteFile(scope.row)">删除</el-button>
							</template>
						</el-table-column>
					</el-table> -->

          <!-- <div class="pagination flex_row justify_between">
						<div>	
							<el-button type="primary" size="small" @click="downloadAll">上传文件</el-button>
							<el-button type="primary" size="small" @click="downloadAll">打包下载</el-button>
							<el-button type="primary" size="small" @click="downloadAll">上传B2B</el-button>
						</div>
					
						<el-pagination
							@current-change="handleCurrentChange"
							:current-page.sync="fileSearch.pageIndex"
							class="pagination_part" 
							background layout="total, prev, pager, next" 
							:total="fileTotalCount">
						</el-pagination>
					</div> -->

          <!-- <el-table :data="uploadList" style="width: 100%">
						<el-table-column type="selection" width="60" align="center"></el-table-column>
						<el-table-column prop="name" label="文件" width="180"></el-table-column>
						<el-table-column>
							<template slot-scope="scope">
								<div v-if="scope.row.fileList.length > 0">
									<div class="file_item flex_row align_center mar_l10" v-for="item in scope.row.fileList">
										<span class="file_name" @click="handlePreview(item)">{{ item.file_name }}</span>
										<span v-if="item.create_date">{{ item.create_date.substring(0, 10) }}上传</span>
										<img
											@click="getUploadData(scope.$index, item, 1)"
											style="height: 20px;margin-left: 20px"
											:src="require(@/assets/images/deleteFile.png)"
											alt=""
										/>
									</div>
								</div>
								<span class="t999" v-else>暂无文件</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="150" align="center">
							<template slot-scope="scope">
								<el-upload
									v-if="scope.$index !== 0"
									ref="upload"
									:before-upload="fileLimit"
									:action="UploadFilesUrl"
									:on-success="e => uploadFile(e, scope.$index, 0)"
									size="small"
									:limit="5"
									:show-file-list="false"
									:multiple="true"
								>
									<el-button slot="trigger" size="small" type="primary">选择文件</el-button>
								</el-upload>
							</template>
						</el-table-column>
					</el-table> -->
        </el-tab-pane>
        <el-tab-pane label="会议附加信息" name="3" v-if="selfformlist.length > 0">
          <div style="display: flex; justify-content: space-between">
            <span style="font-size: 20px; color: #409eff">
              会议附加信息
              <span style="font-size: 15px; color: #ccc">（更新时间：{{
                  dateFromat(additionalInfoData.updatetime)
                }}）</span>
            </span>

            <span @click="additionalInfoShow = true" style="
                color: #409eff;
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
              ">编辑</span>
          </div>
          <ul>
            <li v-for="(item, index) in selfformlist" :key="index" style="margin-top: 10px">
              <p v-if="item.fieldtype == '099-5'" style="display: flex">
                <span> {{ item.fieldname }} ： </span>
                <span style="display: flex; flex-direction: column">
                  <span v-for="(file, index) in item.fileInfos" :key="index" style="
                      cursor: pointer;
                      color: rgb(64, 158, 255);
                      margin-bottom: 10px;
                    ">
                    {{ file.file_name }}
                  </span>
                </span>
              </p>
              <p v-else-if="item.fieldtype == '099-3'">
                {{ item.fieldname }} ：
                {{ item.datavalue ? item.datavalue.slice(0, 10) : "" }}
              </p>
              <p v-else>
                {{ item.fieldname }} ：
                {{ item.datavalue ? item.datavalue : "" }}
              </p>
            </li>
          </ul>
        </el-tab-pane>

        <el-tab-pane label="会议服务反馈" name="4" class="severBack" v-if="severBackInfo.baier">
          <div>
            <p v-if="severBackInfo.status" class="flex_row justify_between">
              <span>客户服务反馈问题：
                <span v-if="severBackInfo.star_level == 1">
                  1分，非常不满意</span>
                <span v-else-if="severBackInfo.star_level == 2">
                  2分，不满意</span>
                <span v-else-if="severBackInfo.star_level == 3">
                  3分，一般满意</span>
                <span v-else-if="severBackInfo.star_level == 4">
                  4分，满意</span>
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
                  <el-button type="text" size="small" @click="getPO">刷新</el-button>
                  <div v-if="UnDelPoData">
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
                <vue-qr class="severBackQr" :text="imgUrl" :size="200" :logoSrc="require('@/assets/images/logo.png')" :logoScale="0.01">
                </vue-qr>
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
              <p>
                2、如果低于3分，请简要描述供应商问题-供应商专业能力和服务质量
              </p>
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
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--    添加PO-->
    <el-dialog :visible.sync="poShow" width="500px" title="PO" align="center">
      <div>
        <el-form :model="poData" label-width="120px">
          <el-form-item label="PO单">
            <el-input placeholder="请输入PO单号" size="small" class="demand_300" v-model="poData.po_order_no" clearable></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="poData" label-width="120px">
          <el-form-item label="PO金额">
            <el-input placeholder="请输入PO金额" size="small" class="demand_300" v-model="poData.po_price" clearable></el-input>
          </el-form-item>
        </el-form>
        <el-form :model="poData" label-width="120px">
          <el-form-item label="PO创建时间">
            <el-date-picker value-format="yyyy-MM-dd HH:mm" placeholder="请选择PO创建时间" size="small" class="demand_300" v-model="poData.po_create_date" clearable></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button type="info" @click="poShow = false">取 消</el-button>
        <el-button type="primary" @click="addPoTap">确 认</el-button>
      </span>
    </el-dialog>
    <!--  编辑会议附加信息 -->
    <el-dialog :visible.sync="additionalInfoShow" width="500px" title="编辑会议附加信息" align="center">
      <div>
        <el-form ref="additionalInfoForm" :model="additionalInfoData" label-width="auto" :rules="additionalInfoRule">
          <div v-for="(item, index) in additionalInfoData.selfformlist" :key="index">
            <el-form-item :label="item.fieldname" :prop="'selfformlist.' + index + '.datavalue'" :rules="{
                required: item.required == 1,
                message: '该项是必填项',
                trigger: 'change',
              }">
              <el-input v-if="item.fieldtype == '099-1'" :placeholder="`请输入${item.fieldname}`" size="small" v-model="item.datavalue" clearable></el-input>
              <el-input v-if="item.fieldtype == '099-2'" v-model="item.datavalue" type="textarea" :placeholder="`请输入${item.fieldname}`" :autosize="{ minRows: 4 }"></el-input>
              <el-date-picker v-if="item.fieldtype == '099-3'" value-format="yyyy-MM-dd HH:mm" :placeholder="`请选择${item.fieldname}`" size="small" style="width: 100%" v-model="item.datavalue" clearable></el-date-picker>
              <el-select v-if="item.fieldtype == '099-4'" v-model="item.datavalue" filterable size="small" :placeholder="`请选择${item.fieldname}`" style="width: 100%">
                <el-option v-for="optionitem in item.defaultvalue.split(`\n`)" :key="optionitem" :label="optionitem" :value="optionitem">
                </el-option>
              </el-select>
              <el-upload v-if="item.fieldtype == '099-5'" ref="upload" :action="UploadFilesUrl" :on-success="(e) => uploadFileSuccess(e, item, index)" :on-preview="downloadFile" :file-list="item.fileInfos" :on-remove="(e) => deleteFile(e, item, index)" :show-file-list="true" :multiple="true">
                <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
              </el-upload>
              <el-input v-if="item.fieldtype == '099-6'" :placeholder="`请输入${item.fieldname}`" type="number" size="small" v-model="item.datavalue" clearable>
              </el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button type="info" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="additionalInfoSave">确 认</el-button>
      </span>
    </el-dialog>

    <!-- 提交B2B建团 -->
    <el-dialog :visible.sync="b2bShow" @open="getB2BDetail" :close-on-click-modal="false" width="60%" title="提交B2B建团">
      <div>
        <el-form :model="B2BData" label-width="120px">
          <el-form-item label="团名称" prop="event_name">
            <el-input placeholder="请输入团名称" size="small" class="demand_300" v-model="B2BData.event_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="团开始日期" prop="b2b_begin">
            <el-date-picker value-format="yyyy-MM-dd" placeholder="请选择团开始日期" size="small" class="demand_300" v-model="B2BData.b2b_begin" clearable></el-date-picker>
          </el-form-item>
          <el-form-item label="团结束日期" prop="b2b_end">
            <el-date-picker value-format="yyyy-MM-dd" placeholder="请选择团结束日期" size="small" class="demand_300" v-model="B2BData.b2b_end" clearable></el-date-picker>
          </el-form-item>
          <el-form-item label="团附件">
            <div class="flex_row">
              <el-button @click="checkMeetingFilesShow = true" type="primary" style="margin-right: 100px">选择会议文件</el-button>
              <el-upload ref="upload" :action="UploadFilesUrl" :before-upload="fileLimit" :on-success="b2buploadFile" :on-preview="downloadFile" :file-list="B2BData.fileList" :show-file-list="false" :multiple="true">
                <el-button type="primary">选择本地文件</el-button>
              </el-upload>
              <br />
              <!-- <span class="ps">注意: 只允许上传以下文件类型：doc、docx、xls、xlsx、pdf、ppt、pptx、jpeg、jpg、png、zip、eml、rtf、msg、gif、bmp、tif、tiff、rar、iso、7z、tar、bz2、gzip、txt、mp4、xps，最大30M</span> -->
            </div>
          </el-form-item>
        </el-form>
        <el-table :data="B2BData.file" header-align="center" style="width: 100%">
          <el-table-column prop="file_name" label="文件名称" width="180" show-overflow-tooltip header-align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handlePreview(scope.row)">{{ scope.row.file_name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="180" header-align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.type">
                <el-option label="客户" :value="0"></el-option>
                <el-option label="供应商" :value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="file_type" label="附件类型" width="180" header-align="center">
            <template slot-scope="scope">
              <el-select v-model="scope.row.file_type">
                <el-option v-for="(item, index) in filesTypes" :label="item.name" :value="item.code" :key="index"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="备注" header-align="center">
            <template slot-scope="scope">
              <el-input type="textarea" :rows="2" clearable v-model="scope.row.remarks"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60" header-align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="b2bDeleteFile(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button type="primary" @click="submit">确认，提交B2B建团</el-button>
        <el-button type="info" @click="cancelSubmit">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 选择会议文件弹框 -->
    <el-dialog :visible.sync="checkMeetingFilesShow" width="80%" title="选择会议文件" align="center">
      <meeting-files @checkedFiles="getCheckedFiles" v-if="eventInfo.id" :eventInfo="eventInfo" :showOperation="false"></meeting-files>
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button type="info" @click="checkMeetingFilesShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmCheckdFiles">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
import BasePart from '@/components/event/basePart_2'
import meetingFiles from '@/components/event/meetingFiles'
import { limitsEffect } from '@/utils/uploadRestrictions.js'
import { MAINHOST, meetingH5 } from '@/config'
import { file } from 'jszip'
export default {
  name: 'stepOne',
  props: ['eventId', 'eventName', 'isDMC', 'isShowCancelBtn', 'eventStatu'],
  data() {
    return {
      imgUrl: meetingH5 + '/#/?id=' + this.$route.query.id + '&name=' + encodeURI(this.$route.query.name), //扫码后手机显示的页面
      // logo: require('@/assets/logo.png'),//二维码中间的图片
      downloadUrl: '',
      stepOne: '1',
      eventInfo: {}, // 会议基本信息
      showBaseInfo: false,
      poShow: false,
      additionalInfoShow: false,
      checkMeetingFilesShow: false, //选择会议文件 弹窗
      b2bShow: false,
      baseInfo: {},
      fileSearch: {
        fileName: '',
        jiedian: '',
        fenlei: '',
        pageSize: 10,
        pageIndex: 1
      }, // 文件查询条件
      fileTotalCount: 0, // 查询文件数量
      // 所属节点下拉选项
      jiedianOptions: [
        {
          name: '会议信息',
          value: '001',
          otherOptions: [
            {
              name: '会议附件',
              value: '001-1'
            },
            {
              name: 'PO/授标文件',
              value: '001-2'
            },
            {
              name: '其他附件',
              value: '001-3'
            }
          ]
        },
        {
          name: '会议询价',
          value: '002',
          otherOptions: [
            {
              name: '询价单补充附件',
              value: '002-1'
            }
          ]
        },
        {
          name: '报价单',
          value: '003',
          otherOptions: [
            {
              name: '报价书附件',
              value: '003-1'
            }
          ]
        },
        {
          name: '留言',
          value: '004',
          otherOptions: [
            {
              name: '留言附件',
              value: '004-1'
            }
          ]
        },
        {
          name: '结算单',
          value: '005',
          otherOptions: [
            {
              name: '客户结算单',
              value: '005-1'
            },
            {
              name: '客户结算确认邮件',
              value: '005-2'
            },
            {
              name: 'PO单',
              value: '005-3'
            },
            {
              name: '供应商发票及账单',
              value: '005-4'
            },
            {
              name: '酒店住宿发票+小联',
              value: '005-5'
            },
            {
              name: '酒店餐饮发票+小联',
              value: '005-6'
            },
            {
              name: '酒店会场发票+小联',
              value: '005-7'
            },
            {
              name: '外出用餐发票+小联',
              value: '005-8'
            },
            {
              name: '注册费发票+小联',
              value: '005-9'
            },
            {
              name: '用车发票+小联',
              value: '005-10'
            },
            {
              name: '制作物发票+小联',
              value: '005-11'
            },
            {
              name: '保险发票+小联',
              value: '005-12'
            },
            {
              name: '签到表',
              value: '005-13'
            },
            {
              name: '会议照片-全景',
              value: '005-14'
            },
            {
              name: '其他结算附件',
              value: '005-15'
            }
          ]
        },
        {
          name: '会议订单',
          value: '006',
          otherOptions: [
            {
              name: '开票通知文件',
              value: '006-1'
            },
            {
              name: '发票文件',
              value: '006-2'
            }
          ]
        },
        {
          name: '附加信息',
          value: '007',
          otherOptions: [
            {
              name: '自定义信息附件',
              value: '007-1'
            }
          ]
        }
      ],
      // 文件分类下拉选项
      fenleiOptions: [],
      meetingFileList: [],
      // 提交B2B所选会议文件列表
      checkedFiles: [],
      biddingStatus: [
        { code: '0010-11', name: '结算完成' },
        { code: '0010-5', name: '会议已创建' },
        { code: '0010-8', name: '会议进行中' },
        { code: '0010-6', name: '询价中' },
        { code: '0010-1', name: '已取消' },
        { code: '0010-7', name: '已确定供应商' },
        { code: '0010-9', name: '待结算（尚无结算单）' },
        { code: '0010-12', name: '会议过期' },
        { code: '0010-10', name: '结算中（待审核）' }
      ],
      // PO
      poData: {
        event_info_id: '',
        po_order_no: '',
        po_price: '',
        po_create_date: '',
        cmd: 'add',
        create_user: 'test'
      },
      B2BData: {
        event_name: '',
        b2b_begin: '',
        b2b_end: '',
        file: []
      },
      severBackInfo: {}, // 服务反馈信息
      b2bFilesList: [], // b2b 附件列表
      filesTypes: [
        { name: 'PO单', code: '001' },
        { name: '合同', code: '002' },
        { name: '协议', code: '003' },
        { name: '报价单', code: '004' },
        { name: '变更单', code: '005' },
        { name: '变更通知', code: '006' },
        { name: '邮件确认', code: '007' },
        { name: '账单', code: '008' },
        { name: '其他', code: '009' },
        { name: '待客户确认资料', code: '010' },
        { name: '酒店比价文件', code: '011' },
        { name: '租车比价文件', code: '012' }
      ],
      additionalInfoData: {
        eventinfoid: '',
        selfformlist: [],
        updatetime: ''
      },
      poList: [],
      uploadList: [
        { name: '系统报价单', fileList: [] },
        { name: '授标文件', fileList: [] },
        { name: '酒店比价文件', fileList: [] },
        { name: '租车比价文件', fileList: [] },
        { name: 'CVENT文件', fileList: [] },
        { name: '其他附件', fileList: [] }
      ],
      UploadFilesUrl: MAINHOST + '/MeetingMa/UploadFiles',
      UnDelPoData: {}, // 未删除PO单信息
      b2baudstatus: null, //b2b状态
      b2bnote: '', //b2b状态原因
      url: '', //b2b跳转地址
      selfformlist: [],
      additionalInfoRule: {
        datavalue: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }]
      }
    }
  },
  components: {
    BasePart,
    meetingFiles,
    VueQr
  },
  mounted() {
    this.getUploadList()
    this.getDetail()
    this.eventviewselfform()
    this.GetFeedback()
  },
  watch: {
    baseInfo(newVal, oldVal) {
      this.getPO()
    }
  },
  methods: {
    // 文件搜索
    searchFile() {},
    // 重置搜索条件
    resetSearch() {},
    jiedianChange(value) {
      this.fenleiOptions = this.jiedianOptions.find(e => e.value == this.fileSearch.jiedian).otherOptions
      debugger
      console.log(this.fenleiOptions)
    },
    handleCurrentChange(val) {
      this.fileSearch.page = val
      this.searchFile()
    },

    // 获取子组件勾选附件
    getCheckedFiles(data) {
      this.checkedFiles = data
    },
    // 确认选择会议文件
    confirmCheckdFiles() {
      this.checkedFiles.forEach(element => {
        let b2bFile = {
          id: '',
          file_name: element.file_name,
          file_path: element.file_path,
          type: 0,
          file_type: '001',
          remarks: element.remarks
        }
        this.B2BData.file.push(b2bFile)
      })
      this.checkMeetingFilesShow = false
    },
    // 获取问卷反馈详情
    GetFeedback() {
      this.requestApi({
        url: '/MeetingFeedback/GetFeedback',
        method: 'post',
        data: { meetingID: this.$route.query.id }
      }).then(res => {
        this.severBackInfo = res
      })
    },
    // 复制问卷链接
    copyUrl(item, type) {
      var copyTest = this.imgUrl
      var inputTest = document.createElement('input')
      inputTest.value = copyTest
      document.body.appendChild(inputTest)
      inputTest.select()
      document.execCommand('Copy')
      inputTest.className = 'oInput'
      inputTest.style.display = 'none'
      this.$message.success('复制成功')
    },
    // 附加信息查询
    eventviewselfform() {
      this.requestApi({
        url: '/selfform/eventviewselfform',
        method: 'post',
        data: { eventinfoid: this.$route.query.id }
      }).then(res => {
        this.selfformlist = res.selfformlist
        this.selfformlist.forEach(item => {
          if (item.fieldtype == '099-5') {
            item.fileInfos.forEach(file => {
              file.name = file.file_name
              file.url = file.file_path
            })
          }
        })
        this.additionalInfoData = JSON.parse(JSON.stringify(res))
      })
    },
    b2bDeleteFile(scope) {
      debugger
      let index = scope.$index
      this.B2BData.file.splice(index, 1)
      console.log(this.B2BData.file)
    },
    getB2BDetail() {
      this.requestApi({
        url: '/B2B/GetInfo',
        method: 'post',
        data: { event_info_id: this.$route.query.id }
      }).then(res => {
        if (res) this.B2BData = res
      })
    },
    //获取b2b跳转地址
    gotoB2B(funcCode) {
      this.requestApi({
        url: '/b2b/autologin',
        method: 'post',
        data: { funcCode: funcCode }
      }).then(res => {
        // console.log(res)
        this.url = res
        setTimeout(() => {
          this.$refs.a_click.click()
        }, 100)
      })
    },
    fileLimit(file) {
      const isLt30M = file.size / 1024 / 1024 < 30
      if (!isLt30M) {
        this.$message.error('上传附件大小不能超过 30MB!')
        return false
      }
      return limitsEffect(file)
    },
    cancel() {
      this.additionalInfoShow = false
      this.eventviewselfform()
    },

    // 后端返回时间格式处理(/Date(1634659200000)/ => yyyy-MM-dd)
    dateFromat(timeStr) {
      if (typeof timeStr == 'string') {
        var time = timeStr.replace('/Date(', '').replace(')/', '')
        time = new Date(time * 1)
        var year = time.getFullYear()
        var month = time.getMonth() * 1 + 1
        var date = time.getDate()
        var hour = time.getHours()
        var minutes = time.getMinutes()
        var second = time.getMinutes()
        var formatDate = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + second
        return formatDate
      }
    },
    // 保存会议附加信息
    additionalInfoSave() {
      this.$refs.additionalInfoForm.validate(valid => {
        // debugger
        if (valid) {
          this.requestApi({
            url: '/selfform/saveeventselfform',
            method: 'post',
            data: this.additionalInfoData
          }).then(res => {
            if (res === true) {
              // debugger
              this.$message.success('保存成功')
              this.additionalInfoShow = false
              this.eventviewselfform()
            }
          })
        }
      })
    },
    getDetail() {
      // 获取会议基本信息
      this.requestApi({
        url: '/MeetingMa/GetMeetingList',
        method: 'post',
        data: { MeetingID: this.$route.query.id }
      }).then(res => {
        this.eventInfo = res
        this.b2baudstatus = res.b2baudstatus
        this.b2bnote = res.b2bnote
        this.$forceUpdate()
      })
    },
    cancelSubmit() {
      let postData = {
        event_info_id: this.$route.query.id,
        file: this.B2BData.file
      }
      this.requestApi({
        url: '/B2B/B2BFileSava',
        method: 'post',
        data: postData
      }).then(res => {
        debugger
        this.b2bShow = false
      })
    },
    async submit() {
      await this.getPO()
      console.log(this.UnDelPoData, this.uploadList)
      console.log(this.B2BData.file)
      // if (this.UnDelPoData == undefined && this.uploadList[1].fileList.length == 0) {
      let hasPoFile = this.B2BData.file.find(item => {
        return item.file_type == '001'
      }) // 是否上传PO/授标文件
      if (this.UnDelPoData == undefined && hasPoFile == undefined) {
        this.$message.error('录入PO或上传授标文件，必填其一！')
        return
      } /* else if(this.uploadList[0].fileList.length==0 || this.uploadList[2].fileList.length==0 || this.uploadList[3].fileList.length==0){
				this.$message.error('相关报价单、比价单等附件未上传！');
				return
			} */
      let postData = this.B2BData
      postData.event_info_id = this.eventId
      this.requestApi({
        url: '/B2B/creatMiceTeam',
        method: 'post',
        data: postData
      }).then(res => {
        console.log(res)
        if (res.status != 1) {
          this.$message.error(res.msg)
          return
        } else {
          if (!res.msg) {
            this.$message({
              message: '提交审核成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'success'
            })
          }
          this.b2bShow = false
        }
        this.getDetail()
      })
    },
    uploadFile(e, id, type) {
      if (type === 0) {
        this.uploadList[id].fileList.push(e)
        this.getUploadData(id, e, type)
      }
    },
    b2buploadFile(file) {
      let b2bFile = {
        id: '',
        file_name: file.title,
        file_path: file.weburl,
        type: 0, // 默认“客户”
        file_type: '001', // 默认 “PO单”
        remarks: ''
      }
      this.B2BData.file.push(b2bFile)
    },
    // 上传文件
    uploadFileSuccess(file, selfformlistItem, selfformlistIndex) {
      debugger
      this.additionalInfoData.selfformlist[selfformlistIndex].fileInfos.push({
        id: '',
        file_name: file.title,
        name: file.title,
        file_path: file.weburl
      })
    },
    // 附加信息文件删除
    deleteFile(file, selfformlistItem, selfformlistIndex) {
      debugger
      selfformlistItem.fileInfos = selfformlistItem.fileInfos.filter(item => {
        return item.uid != file.uid
      })
    },
    // 下载附件
    downloadFile(file) {
      debugger
      // window.open(file.file_path, "_blank");
      let url = file.file_path ? file.file_path : file.filepath
      let name = file.file_name ? file.file_name : file.filename
      let a_link = document.createElement('a')
      // 这里是将url转成blob地址，
      fetch(url)
        .then(res => res.blob())
        .then(blob => {
          // 将链接地址字符内容转变成blob地址
          debugger
          a_link.href = URL.createObjectURL(blob)
          console.log(a_link.href)
          a_link.download = name //下载的文件的名字
          document.body.appendChild(a_link)
          a_link.click()
        })
    },
    // 上传文件入参
    getUploadData(id, data, type) {
      let postData = {
        id: type === 0 ? '' : data.id, //新增时为空，删除时需要ID
        operation: type, //操作，新增0 删除1
        event_info_id: this.eventId, //会议id
        type: id, //文件类型(0：系统报价单 1：供应商PO 2：酒店比价文件 3：租车比价文件 4：CVENT文件 5：其他附件)
        file_path: type === 0 ? data.weburl : data.file_path, //附件路径
        file_name: type === 0 ? data.title : data.file_name //附件名称
        // create_user: 'mazhenheng',//创建人
      }
      this.requestApi({
        url: '/MeetingMa/FilesSave',
        method: 'post',
        data: { parameter: JSON.stringify(postData) }
      }).then(res => {
        if (type === 0) {
          this.$message.success('上传成功')
        } else {
          this.$message.success('删除成功')
        }
        this.getUploadList()
      })
    },
    // 附件查询
    getUploadList() {
      this.requestApi({
        url: '/MeetingMa/GetFile',
        method: 'post',
        data: { MeetingID: this.$route.query.id }
      }).then(res => {
        if (res && res.length) {
          this.uploadList = [
            { name: '系统报价单', fileList: [] },
            { name: '授标文件', fileList: [] },
            { name: '酒店比价文件', fileList: [] },
            { name: '租车比价文件', fileList: [] },
            { name: 'CVENT文件', fileList: [] },
            { name: '其他附件', fileList: [] }
          ]
          res.forEach(item => {
            this.uploadList[item.type].fileList.push(item)
          })
        } else {
          this.uploadList = [
            { name: '系统报价单', fileList: [] },
            { name: '授标文件', fileList: [] },
            { name: '酒店比价文件', fileList: [] },
            { name: '租车比价文件', fileList: [] },
            { name: 'CVENT文件', fileList: [] },
            { name: '其他附件', fileList: [] }
          ]
        }
      })
    },
    handleStepOne() {},
    // 获取PO
    async getPO() {
      await this.requestApi({
        url: '/CustomerConfiguration/Get_event_po',
        method: 'GET',
        data: { eventInfoId: this.$route.query.id }
      }).then(res => {
        this.poList = res
        this.UnDelPoData = this.poList.find((val, index, arr) => {
          return val.is_delete == 0
        })
        this.$forceUpdate()
      })
    },
    editBaseTap() {
      this.$router.push({
        name: 'createEvent',
        query: { id: this.eventId, type: 'edit' }
      })
    },
    // 下载全部文件
    downloadAll() {},
    // 添加PO
    addPoTap() {
      if (this.poData.po_order_no && this.poData.po_price && this.poData.po_create_date) {
        this.poData.event_info_id = this.baseInfo.id
        this.requestApi({
          url: '/CustomerConfiguration/Set_event_po',
          method: 'POST',
          data: this.poData
        }).then(res => {
          if (res) {
            this.$message.success('添加成功')
            this.getPO()
            this.poShow = false
          }
          this.$forceUpdate()
        })
      } else {
        this.$message.warning('请完善PO信息！')
      }
    },
    // 预览附件
    handlePreview(file) {
      debugger
      if (!file.file_path) return
      // 获取文件后缀名
      let suffix = file.file_path.substring(file.file_path.lastIndexOf('.') + 1)
      // doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
      let types1 = ['pdf', 'jpeg', 'jpg', 'png', 'txt']
      let types2 = ['docx', 'doc', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx']
      file.file_path = file.file_path.replace(/http:/, 'https:')
      this.downloadUrl = file.file_path
      if (types2.includes(suffix)) {
        this.downloadUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(file.file_path)
      } else if (types1.includes(suffix)) {
        this.downloadUrl = file.file_path
      } else {
        this.$message.info('文件格式不支持预览，下载后查看')
      }
      setTimeout(() => {
        this.$refs.d_click.click()
      }, 100)
    },
    openFileTap(file) {
      // window.open(url)
      let a_link = document.createElement('a')
      // 这里是将url转成blob地址，
      fetch(file.file_path)
        .then(res => res.blob())
        .then(blob => {
          // 将链接地址字符内容转变成blob地址
          a_link.href = URL.createObjectURL(blob)
          a_link.download = file.file_name //下载的文件的名字
          document.body.appendChild(a_link)
          a_link.click()
        })
    },
    Conference() {
      this.requestApi({
        url: '/TiMing/ApproveTimeout',
        method: 'POST',
        data: this.poData
      }).then(res => {
        this.$message.success('设置成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.step_one {
  .step_card {
    border: 1px solid #e8e8e8;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .file_item {
    cursor: pointer;
    margin-bottom: 5px;
    .file_name {
      color: #66b1ff;
      margin-right: 10px;
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
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
  ::deep .severBackQr {
    vertical-align: text-top;
  }
}
.pagination {
  margin-top: 20px;
  .pagination_part {
    text-align: right;
  }
}
.audit {
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-left: 40px;
  .audited {
    color: #f90;
    margin-right: 10px;
  }
  .audit-fail {
    color: red;
    margin-right: 10px;
  }
  .audit-success {
    color: green;
    margin-right: 10px;
  }
}
</style>
