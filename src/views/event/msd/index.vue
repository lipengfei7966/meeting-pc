<template>
  <div class="msd">
    <a v-show="false" :href="downloadUrl" target="_blank" ref="a_click" download></a>
    <div class="path">
      <!-- <ul v-if="pageFrom && pageFrom === 'approve'">
        <el-button type="text" @click="$router.go(-1)">审批列表</el-button>
        <li style="color: #7c7f82">></li>
        <li style="color: #7c7f82">结算单详情</li>
      </ul> -->
      <ul>
        <el-button type="text" @click="$router.replace({ name: 'eventList' })">我的会议</el-button>
        <li style="color: #7c7f82">></li>
        <el-button type="text" @click="$router.go(-1)">{{
          $route.query.event_name
        }}</el-button>
        <li v-if="prev" style="color: #7c7f82">></li>
        <el-button type="text" v-if="prev" @click="$router.go(-1)">{{
          prev
        }}</el-button>
        <li style="color: #7c7f82">></li>
        <li style="color: #7c7f82">结算单详情</li>
      </ul>
    </div>
    <div class="blue_title">
      <img :src="require('@/assets/images/锁定.png')" alt class="bill_icon" />
      <span>会议服务商结算单</span>
      <!--      <span>（2019-09-12 15:38:39）</span>-->
      <div class="rights">
        <img :src="require('@/assets/images/文章.png')" alt />
        <p @click="downloadSettlement" style="cursor: pointer">下载结算单</p>
      </div>
    </div>
    <!-- 会议基本信息组件 -->
    <base-part :source="'approve'"></base-part>

    <div class="Sketch">
      <p>结算简述</p>
    </div>
    <div class="conferee" v-if="detail">
      <p>
        <span style="color: rgb(119, 119, 119)">订单状态：</span>
        <span style="color: rgb(119, 119, 119)">
          {{ this.detail.status_name }}</span>
        <el-button @click="InvoiceMsdSettlementReject" v-if="this.detail.role == 1" slot="trigger" size="small" type="primary" style="margin-left: 50px">驳回结算单</el-button>
      </p>
      <p>
        <span style="color: rgb(119, 119, 119)">PO单号：</span>
        <span style="color: rgb(119, 119, 119)">{{ this.detail.pocode }}</span>
      </p>
      <p v-if="detail.type == 1">
        <span style="font-size: 14px; color: #777">实际参会人数：</span>
        <span style="font-size: 14px; color: #777; margin-left: 10px">外部人数：{{ this.detail.external_number }} 人</span>
        <span style="font-size: 14px; color: #777; margin-left: 10px">内部人数：{{ this.detail.internal_number }} 人</span>
        <span style="font-size: 14px; color: #777; margin-left: 10px">总人数：{{
            this.detail.internal_number + this.detail.external_number
          }}</span>
      </p>

      <p style="font-size: 14px; color: #777">
        供应商：
        <span style="margin-left:10px font-size:14px; color:#777;">{{
          this.detail.company_name
        }}</span>
      </p>

      <!-- detail.type == 0 是酒店不展示 -->
      <div v-if="detail.type == 1">
        <p style="font-size: 14px; color: #777">
          采购酒店：
          <span style="margin-left:10px font-size:14px; color:#777;">{{
            this.detail.settlement_hotelname
              ? this.detail.settlement_hotelname
              : "未选择采购酒店"
          }}</span>
          <el-checkbox v-model="this.detail.isuser_preferred_hotel" :true-label="1" :false-label="0" style="line-height: 30px; margin-left: 20px">是否使用首选酒店</el-checkbox>
        </p>
        <p>
          <span style="font-size: 14px; color: #777">供应商说明：</span>
          <span style="margin-left:10px font-size:14px; color:#777; margin-left:10px">
            {{ this.detail.settlement_offer_remarks }}
          </span>
        </p>
        <div style="display: flex; margin-top: 20px; margin-left: 10px">
          <span style="font-size: 14px; color: #777">开票通知文件：</span>
          <div class="context" style="margin-left:10px font-size:14px; color:#777; margin-left:10px">
            <ul>
              <li v-for="(file, index) in fileList.kpFile" :key="index" style="margin-bottom: 20px">
                <span @click="handlePreview(file)" style="color: #409eff; cursor: pointer">
                  {{ file.filename }}
                </span>
                <span> 上传时间： {{ file.create_time }} </span>
              </li>
            </ul>
          </div>
        </div>
        <div style="display: flex; margin-top: 20px; margin-left: 10px">
          <span style="font-size: 14px; color: #777">发票文件：</span>
          <div class="context" style="display: flex">
            <ul style="margin: 0 50px">
              <li v-for="(file, index) in fileList.fpFile" :key="index" style="margin: 10px 0">
                <span @click="handlePreview(file)" style="color: #409eff; cursor: pointer">
                  {{ file.filename }}
                </span>
                <span> 上传时间： {{ file.create_time }} </span>
              </li>
            </ul>
            <el-upload ref="upload" :action="UploadFilesUrl" :on-success="uploadFile" :on-preview="handlePreview" :file-list="fileList.fpFile" :show-file-list="false" :multiple="true">
              <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
            </el-upload>
          </div>
        </div>
        <p>
          <span style="font-size: 14px; color: #777">Cevent 上传完成日期：</span>
          <span style="margin-left:10px font-size:14px; color:#777; margin-left:10px">
            {{ this.fileList.cventDate }}
          </span>
        </p>
      </div>

      <p>
        <img :src="require('@/assets/images/view_off.png')" alt class="text" />
        <span style="font-size: 14px; color: #2896eb; margin-left: 6px" class="one margin-top:-10px;">
          {{
            Array.isArray(this.detail.file) ? this.detail.file[0].filename : ""
          }}
        </span>
        <span style="font-size: 14px; color: #2896eb" class="two margin-left:6px;">
          {{
            Array.isArray(this.detail.file) ? this.detail.file[0].filepath : ""
          }}
        </span>
        <!-- <span style=" font-size:14px; color:#2896eb" class="three margin-left:6px;">（2）</span> -->
      </p>
    </div>
    <div class="sign">
      <p>
        <input type="checkbox" name v-model="isAddColorRed" />
        <span style="margin-left:10px font-size:14px; color:#daa873; margin-left:13px;">标记结算价与中标价不同之处</span>
        <span style="font-size: 14px; color: #f00">（红色）</span>
      </p>

      <p>
        <input type="checkbox" name id />
        <span style="margin-left: 10px; font-size: 14px; color: #daa873">标记本次结算与上次结算不同之处</span>
        <span style="font-size: 14px; color: #777">
          <u style="margin-left: 10px">(斜体加粗)</u>
        </span>
      </p>
    </div>
    <div class="voucher">
      <p>结算金额</p>
    </div>
    <div class="below">
      <compare ref="compare" @objectionMsg="objectionMsgFn" :isAddColorRed="isAddColorRed" @voucher="voucherFn" @otherDescription="otherDescriptionFn"></compare>
    </div>

    <div class="close">
      <p>结算凭证</p>
    </div>
    <div class="barch">
      <el-table :data="voucherTableData" header-cell-class-name="white" :row-class-name="rowClssName" style="width: 100%">
        <el-table-column prop="name" label="项目名称" width="150"></el-table-column>
        <el-table-column label="文件" width="380">
          <template slot-scope="scope">
            <div v-for="(file, index) in scope.row.files" :key="index">
              <p v-show="file.file_name != ''">
                <span @click="handlePreview(file)" style="cursor: pointer; color: #0486fe">{{ file.file_name }}</span>
                <span v-show="file.update_time">{{ " 上传时间： " + file.update_time }}
                </span>
              </p>
            </div>

            <!-- <a v-for="(file,index) in scope.row.files" :key="index" :href="file.file_path"> {{file.file_name}} </a> -->
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="供应商说明" :formatter="
            (row, column, cellValue, index) => {
              return cellValue ? cellValue : '-';
            }
          ">
        </el-table-column>
        <el-table-column prop="message" label="异议">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.message" @input="messageInput" placeholder="请输入内容"></el-input>
            <!-- <el-input v-if="selectQuery.statu == '待审核'" @input="messageInput" type="text" v-model="scope.row.message" placeholder="请输入内容"></el-input> -->
            <!-- <span v-else>-</span> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="mone">
        <p>
          <input type="checkbox" name id style="margin-top:25px; margin-left:10px; width:13px; height:13px;" />
          <span style="margin-left:10px;">同时下载申请人上传的会议现场照片</span>
          <span style="margin-left:10px;">（如有）</span>
        </p>
        <el-button type="primary" style="margin-left:10px; margin-top:15px;">批量下载附件</el-button>
      </div> -->
    </div>
    <div class="serve">
      <p>会议服务商其他说明</p>
      <div class="albedo">
        <p>{{ otherDescription }}</p>
      </div>
    </div>

    <div class="accraditation">
      <p>审批意见汇总</p>
    </div>
    <div>
      <div v-if="selectQuery.statu == '待审核'" class="explain">
        <p>
          <!-- <span style="margin-left:10px; font-size:14px; color:#333; font-weight: 500;">其他异议</span> -->
          <!-- <span style="margin-left:10px; font-size:14px; color:#777; font-weight: 500;">(将发送给供应商）</span> -->
        </p>
        <div>
          <!-- <ele-tiptap ref="tiptap1"></ele-tiptap> -->
        </div>
        <!-- <textarea v-model="objection" cols="30" rows="10" style="width:1000px; height:100px; margin-left:18px; margin-top:20px; resize:none; " placeholder="如有异议请输入说明,无异议请留空" ></textarea> -->

        <!-- <p>
          <span style="margin-left:6px; font-size:14px; color:#333; font-weight: 500;">内部审批意见</span>
          <span style="margin-left:10px; font-size:14px; color:#777; font-weight: 500;">（仅内部可见）</span>
        </p>
        <textarea v-model="approveRemarks" cols="30" rows="10" style="width:1000px; height:100px; margin-left:18px; margin-top:20px; resize:none;" placeholder="填写审核意见" ></textarea> -->
      </div>
      <!-- <div v-else style="width: 1100px;background: #ffffff;margin: auto;padding: 20px 0">
        <p>
          <span style="margin-left:10px; font-size:14px; color:#333; font-weight: 500;">其他异议</span>
          <span style="margin-left:10px; font-size:14px; color:#777; font-weight: 500;">(将发送给供应商）</span>
        </p>
        <p style="padding-left:10px;">测试</p>
      </div> -->
    </div>

    <div class="mound">
      <el-button type="primary" plain class="first" @click="saveDissentTao">保存异议</el-button>
      <!--      <el-button type="primary" class="second">邀请其他人审批</el-button>-->
      <el-button v-if="selectQuery.statu == '待审核'" type="primary" class="second" @click="addFileDialog = true">请供应商补充材料</el-button>
      <el-button v-if="selectQuery.statu == '待审核'" type="danger" class="thirdly" @click="approvedTap('不通过')">审批不通过</el-button>
      <el-button v-if="selectQuery.statu == '待审核'" type="success" class="fourthly" @click="approvedTap('通过')">审批通过</el-button>
    </div>

    <div class="record">
      <p>审核记录</p>
    </div>

    <div class="diameter">
      <el-collapse accordion>
        <el-collapse-item v-for="(item, index) in select" :key="index">
          <template slot="title">
            第{{ index + 1 }}次结算
            <i class="header-icon el-icon-info"></i>
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
                <span v-for="(file, fileIndex) in files.value" :key="fileIndex" class="filename" @click="ApproveRecordDownloadFile(file)">
                  {{ file.name }}
                </span>
              </p>
            </div>
            <!-- 异议明细 -->
            <div v-for="(msg, msgIndex) in item1.dissent" :key="msgIndex" class="flex_row">
              <p>{{ msg.name }}:</p>
              <p v-html="msg.value">
                <!-- {{ msg.value }}  -->
              </p>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="record">
      <p>审批记录</p>
    </div>
    <div class="Steps">
      <el-table ref="multipleTable" :data="arr">
        <el-table-column label="审批步骤" prop="approve_name" align="center"></el-table-column>
        <el-table-column prop="fullname" label="审批人" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column label="审批状态" align="center">
          <template slot-scope="scope">
            <button :class="[
                'approveStatusBtn',
                scope.row.type == '待审核'
                  ? ''
                  : scope.row.type == '审核通过'
                  ? 'approvePassBtn'
                  : 'approveNotPassBtn',
              ]">
              {{ scope.row.type }}
            </button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="remarks" label="内部备注" show-overflow-tooltip align="center"> </el-table-column> -->
        <el-table-column prop="objection" label="其他异议" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.objection" type="text" @click="checkObjection(scope.row)">
              查看异议
            </el-button>
            <span v-else> - </span>
          </template>
        </el-table-column>
        <el-table-column prop="approve_data" label="操作时间" show-overflow-tooltip align="center">
        </el-table-column>
      </el-table>
    </div>
    <!-- 审批确认弹窗 -->
    <el-dialog title="确认审批结果" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%%" align="center">
      <span style="display: inline-block; margin-bottom: 10px">
        审批意见一旦提交则无法修改，是否确认当前审批<span class="disapprove" :class="[passMessage === '通过' ? 'pass' : '']">{{ passMessage }}</span>
      </span>
      <!-- <el-input v-show="passMessage === '不通过'" type="textarea" :rows="5" placeholder="请填写审批不通过原因" v-model="objection"></el-input> -->
      <div v-show="passMessage === '不通过'">
        <!-- <ele-tiptap ref="tiptap3"></ele-tiptap> -->
      </div>
      <div v-show="passMessage === '通过'">
        <!-- <ele-tiptap ref="tiptap4"></ele-tiptap> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" style="margin-left: 10px" type="primary" @click="sendApprove">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="请填写说明" :visible.sync="addFileDialog" :close-on-click-modal="false" width="50%" align="center">
      <div style="padding: 0 20px">
        <p class="text_left mar_b10">
          我们将通知供应商补充结算材料，补充后将继续由您进行确认。
        </p>
        <!-- <el-input type="textarea" :rows="5" placeholder="请填写补充材料说明" v-model="objection"></el-input> -->
        <!-- <ele-tiptap ref="tiptap2"></ele-tiptap> -->
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="addFileDialog = false">取 消</el-button>
          <el-button size="small" style="margin-left: 10px" type="primary" @click="addFileTap">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 查看异议弹窗 -->
    <el-dialog title="异议详情" :visible.sync="objectionVisible" :close-on-click-modal="false" width="70%" center>
      <div class="objectionDetailStyle" v-html="objectionDetail" @click="getImg($event)"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="objectionVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import compare from './components/compare'
import basePart from '@/components/event/basePart_2.vue'
// import eleTiptap from '@/components/event/element-tiptap.vue'

import excelExport from '@/utils/exportexcel'
import { MAINHOST } from '@/config'
export default {
  data() {
    return {
      objectionVisible: false, // 查看异议弹窗
      downloadUrl: '',
      fileList: {
        kpFile: [],
        fpFile: [],
        cventDate: ''
      },
      UploadFilesUrl: MAINHOST + '/MeetingMa/UploadFiles',
      prev: '',
      activeName: '1',
      selectQuery: '',
      info: [],
      fileList: [],
      UploadFilesUrl: MAINHOST + '/MeetingMa/UploadFiles',
      voucherTableData: [],
      objectionDetail: '',
      detail: {},
      select: {},
      dialogVisible: false,
      addFileDialog: false,
      isAddColorRed: false,
      passMessage: '',
      otherDescription: '', // 会议服务商其他说明
      ApprovalOpinion: '', // 补充材料备注
      approveRemarks: '', // 审批备注（内部审批意见）
      objection: '', // 其他异议
      pageFrom: '', // 上一级来源
      objectionMsg: [],
      arr: []
    }
  },
  components: {
    compare,
    basePart
    //  eleTiptap
  },
  mounted() {
    this.selectQuery = this.$route.query
    if (this.selectQuery.from && this.selectQuery.from === 'approve') {
      this.pageFrom = 'approve'
    }
    // this.getInfo();
    this.getEle()
    this.getSelect()
    this.getEvent()
    this.WhetherShow()
    this.GetFile()
    this.prev = this.$route.query.prev
  },
  methods: {
    excelExport,
    WhetherShow() {
      this.requestApi({
        url: '/InvoiceMsd/WhetherShow',
        method: 'post',
        data: { SheetID: this.$route.query.settlementId }
      }).then(res => {
        this.whetherShow = res
      })
    },
    GetFile() {
      this.requestApi({
        url: '/InvoiceMsd/GetFile',
        method: 'post',
        data: {
          OrderID: '', // orderid 、sheet_id 传一个就可以
          SheetID: this.$route.query.settlementId
        }
      }).then(res => {
        this.fileList = res
      })
    },
    // 查看异议
    checkObjection(row) {
      this.objectionVisible = true
      this.objectionDetail = row.objection
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
    // 上传文件
    uploadFile(e) {
      this.uploadList = e
      let sendData = {
        orderid: '', // orderid 、sheet_id 传一个就可以
        sheet_id: this.$route.query.settlementId,
        type: 2, // 1开票，2发票
        file_name: e.title,
        file_path: e.weburl
      }
      this.requestApi({
        url: '/InvoiceMsd/FileAdd',
        method: 'post',
        data: sendData
      }).then(res => {
        if (res) {
          this.$message.success('上传成功')
          this.GetFile()
        }
      })
    },
    // 下载文件
    // downloadFile(file){
    //   let downloadUrl = file.response?file.response.weburl:file.url;
    //   window.open(downloadUrl, "_blank");
    // },
    InvoiceMsdSettlementReject() {
      this.requestApi({
        url: '/InvoiceMsd/SettlementReject',
        method: 'post',
        data: {
          SheetID: this.$route.query.settlementId
        }
      }).then(res => {
        if (res) {
          this.$message.success('已驳回结算单')
          this.GetFile()
          this.getEle()
        }
      })
    },
    // 结算凭证未上传附件 添加隐藏class
    rowClssName(data) {
      if (data.row.files.length == 0) {
        return 'hidden-row'
      }
      return ''
    },
    approvedTap(val) {
      this.dialogVisible = true
      this.passMessage = val
    },
    // 结算凭证
    voucherFn(data) {
      this.voucherTableData = data
    },
    // 结算凭证输入异议
    messageInput() {
      let tempArr = []
      this.voucherTableData.forEach(item => {
        // if(item.message){
        // item.files.forEach(file => {
        tempArr.push({
          datatable: item.datatable,
          id: item.id,
          message: item.message,
          type: item.type
        })
        // })
        // }
      })
      // this.objectionMsg = this.objectionMsg.concat(tempArr)
      return tempArr
      console.log(this.objectionMsg)
    },
    // 预览附件
    handlePreview(file) {
      let file_path = file.file_path || file.filepath
      if (!file_path) return
      // 获取文件后缀名
      let suffix = file_path.substring(file_path.lastIndexOf('.') + 1)
      // doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
      let types1 = ['pdf', 'jpeg', 'jpg', 'png', 'txt']
      let types2 = ['docx', 'doc', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx']
      file_path = file_path.replace(/http:/, 'https:')
      this.downloadUrl = file_path
      if (types2.includes(suffix)) {
        this.downloadUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(file_path)
      } else if (types1.includes(suffix)) {
        this.downloadUrl = file_path
      } else {
        this.$message.info('文件格式不支持预览，下载后查看')
      }
      setTimeout(() => {
        this.$refs.a_click.click()
      }, 100)
    },
    // 下载附件
    downloadFile(file) {
      file.file_path = file.file_path.replace(/http:/, 'https:')
      this.downloadUrl = file.file_path
      setTimeout(() => {
        this.$refs.a_click.click()
      }, 100)
      // window.open(file.file_path, "_blank");
      // let url = file.file_path??file.filepath;
      // let name = file.file_name??file.filename;
      // let a_link = document.createElement('a')
      // // 这里是将url转成blob地址，
      // fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
      //   a_link.href = URL.createObjectURL(blob)
      //   console.log(a_link.href)
      //   a_link.download = name //下载的文件的名字
      //   document.body.appendChild(a_link)
      //   a_link.click()
      // })
    },
    // 留言预览文件
    ApproveRecordDownloadFile(file) {
      debugger
      if (!file.value) return
      // 获取文件后缀名
      let suffix = file.value.substring(file.value.lastIndexOf('.') + 1)
      // doc、docx、xls、xlsx、xlsm、pdf、ppt、pptx、jpeg、jpg、png、txt
      let types1 = ['pdf', 'jpeg', 'jpg', 'png', 'txt']
      let types2 = ['docx', 'doc', 'xls', 'xlsx', 'xlsm', 'ppt', 'pptx']
      file.value = file.value.replace(/http:/, 'https:')
      this.downloadUrl = file.value
      if (types2.includes(suffix)) {
        this.downloadUrl = 'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(file.value)
      } else if (types1.includes(suffix)) {
        this.downloadUrl = file.value
      } else {
        this.$message.info('文件格式不支持预览，下载后查看')
      }
      setTimeout(() => {
        this.$refs.a_click.click()
      }, 100)
    },
    // 添加补充材料
    addFileTap() {
      this.objection = this.$refs.tiptap2.content
      debugger
      this.requestApi({
        url: '/MeetingMa/SettlementApproveSava',
        method: 'post',
        data: {
          Parameter: JSON.stringify({
            status: 3,
            id: this.selectQuery.approveId,
            remarks: this.approveRemarks,
            objection: this.objection
          })
        }
      }).then(res => {
        this.dialogVisible = false
        if (res) {
          this.addFileDialog = false
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.$router.replace({ name: 'approve' })
        }
      })
    },
    objectionMsgFn(data) {
      // debugger
      let tempArr = []
      data.forEach(element => {
        if (element.data) {
          element.data.forEach(item => {
            if (item.message || item.message === '') {
              tempArr.push({
                datatable: item.datatable,
                id: item.id,
                message: item.message
              })
            }
          })
        } else {
          // 其他服务异议
          if (element.message || element.message === '') {
            tempArr.push({
              datatable: element.datatable,
              id: element.id,
              message: element.message
            })
          }
        }
      })
      // this.objectionMsg = this.objectionMsg.concat(tempArr)
      this.objectionMsg = tempArr
    },
    otherDescriptionFn(data) {
      this.otherDescription = data ? data : '暂无'
    },
    // 保存异议
    saveDissentTao() {
      // this.messageInput();
      this.objectionMsg = this.objectionMsg.concat(this.messageInput())

      let Parameter = this.objectionMsg
      this.requestApi({
        url: '/MeetingMa/SettlementReject',
        method: 'post',
        data: {
          Parameter: JSON.stringify(Parameter),
          sheetID: this.selectQuery.settlementId
        }
      }).then(res => {
        this.$message.success('保存成功')
        this.objectionMsg = [] // 保存成功后，异议列表清空避免向后端传多余数据
      })
    },
    // 结算会议基本信息
    // getInfo() {
    //   this.$api.getData({MeetingID: this.selectQuery.id,}, "POST").then((res) => {
    //     this.info = res;
    //   });
    // },
    // 结算简述
    getEle() {
      this.requestApi({
        url: '/MeetingMa/SettlementDescribe',
        method: 'post',
        data: { SettlementSheetID: this.selectQuery.settlementId }
      }).then(res => {
        this.detail = res
      })
    },
    // 下载结算单
    downloadSettlement() {
      var name = 'DMC结算单'
      this.excelExport(
        '/Template/GetTemplate',
        {
          eventid: this.$route.query.id,
          type: 4,
          param: this.$route.query.orderId
        },
        name
      )
    },
    //审批记录
    getSelect() {
      this.requestApi({
        url: '/MeetingMa/ApproveRecord',
        method: 'post',
        data: { SettlementID: this.selectQuery.settlementId }
      }).then(res => {
        this.select = res
      })
    },
    // 审批记录
    getEvent() {
      this.requestApi({
        url: '/MeetingMa/SettlementRecord',
        method: 'post',
        data: { SettlementID: this.selectQuery.settlementId }
      }).then(res => {
        this.arr = Array.isArray(res) ? res : []
      })
    },
    // 结算审批保存
    sendApprove() {
      const status = this.passMessage === '不通过' ? '1' : '0'
      // 不通过
      if (status == '1') {
        this.objection = this.$refs.tiptap3.content
      } else if (status == '0') {
        this.objection = this.$refs.tiptap4.content
      }
      if (status == 1 && this.objection == '') {
        this.$message.error('请填写审批不通过原因')
      } else {
        this.requestApi({
          url: '/MeetingMa/SettlementApproveSava',
          method: 'post',
          data: {
            Parameter: JSON.stringify({
              status: status,
              id: this.selectQuery.approveId,
              remarks: this.approveRemarks,
              objection: this.objection
            })
          }
        }).then(res => {
          this.dialogVisible = false
          if (res) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$router.replace({ name: 'approve' })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.msd {
  body {
    background: #f2f4f8;
  }

  .path {
    width: 1100px;
    height: 55px;
    // background: red;
    margin: auto;
    margin-top: 15px;
  }

  .path ul {
    display: flex;
    line-height: 55px;
  }

  .path ul li {
    padding-left: 10px;
  }

  .blue_title {
    width: 1100px;
    height: 55px;
    background: #626e95;
    border-radius: 2px;
    margin: auto;
  }

  .bill_icon {
    width: 30px;
    height: 30px;
    line-height: 55px;
    padding-top: 11px;
    margin-left: 30px;
    float: left;
  }

  .blue_title span:nth-of-type(1) {
    margin-left: 27px;
    color: #ffffff;
    font-size: 14px;
    line-height: 55px;
    float: left;
  }

  .blue_title span:nth-of-type(2) {
    margin-left: 30px;
    color: #ffffff;
    font-size: 14px;
    line-height: 55px;
    float: left;
  }

  .rights {
    position: relative;
  }

  .rights img {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 100px;
    top: 13px;
  }

  .rights p {
    position: absolute;
    right: 21px;
    top: 18px;
    color: #ffffff;
  }

  .rfp_item {
    width: 1100px;
    height: 300px;
    margin: 20px 0 0 0;
    background: red;
    margin: auto;
  }

  .rfp_title {
    background: #fafafa;
    border-bottom: 1px solid #eaeaea;
    padding: 10px 20px;
  }

  .basic {
    width: 1100px;
    height: 55px;
    background: #fafafa;
    border-bottom: 1px solid #eaeaea;
    margin: auto;
    margin-top: 15px;
    display: flex;
  }

  .basic p {
    font-weight: 600;
    font-size: 14px;
    color: #282828;
    line-height: 55px;
    margin-left: 10px;
  }

  .basic span {
    font-size: 12px;
    color: #999999;
    font-weight: normal;
    margin-left: 5px;
    line-height: 55px;
    margin-left: 10px;
  }

  .buttom {
    width: 1100px;
    // height: 700px;
    background: #ffffff;
    margin: auto;
  }

  .buttom ul {
    margin-left: 10px;
  }

  .buttom ul li {
    font-size: 12px;
    margin-top: 2px;
    color: #777;
  }

  .Sketch {
    width: 1100px;
    height: 55px;
    background: #fafafa;
    border-bottom: 1px solid #eaeaea;
    margin: auto;
    margin-top: 15px;
  }

  .Sketch p {
    line-height: 55px;
    font-weight: 600;
    font-size: 14px;
    color: #282828;
    margin-left: 10px;
  }

  .conferee {
    width: 1100px;
    // height: 214px;
    background: #ffffff;
    margin: auto;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .conferee p {
    margin-top: 20px;
    margin-left: 10px;
  }

  .text {
    width: 15px;
    height: 15px;
    margin-top: 1px;
  }

  .sign {
    width: 1100px;
    height: 100px;
    background: #ede7b8;
    border: 1px solid #ede7b8;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.06);
    margin: auto;
    margin-bottom: 10px;
    // display: flex;
  }

  .sign p {
    margin-top: 15px;
    margin-left: 10px;
  }

  .kuang {
    display: flex;
  }

  .voucher {
    width: 1100px;
    height: 55px;
    background: #fafafa;
    border-bottom: 1px solid #eaeaea;
    margin: auto;
    margin-bottom: 10px;
  }

  .voucher p {
    font-weight: 600;
    font-size: 14px;
    color: #282828;
    line-height: 55px;
    margin-left: 10px;
  }

  .below {
    width: 1100px;
    // height: 1000px;
    background: #ffffff;
    margin: auto;
    margin-top: -10px;
    margin-bottom: 10px;
  }

  .close {
    width: 1100px;
    height: 55px;
    background: #fafafa;
    border-bottom: 1px solid #eaeaea;
    margin: auto;
    margin-bottom: 10px;
  }

  .close p {
    font-weight: 600;
    font-size: 14px;
    color: #282828;
    line-height: 55px;
    margin-left: 10px;
  }

  .barch {
    width: 1100px;
    // height: 322px;
    background: #ffffff;
    margin: auto;
    margin-top: -10px;
    overflow: hidden;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 20px;
    .white {
      width: 1080px;
      height: 55px;
      background: #fafafa !important;
      margin-left: 8px;
      margin-top: 15px;
    }
  }

  .white ul {
    display: flex;
    line-height: 55px;
  }

  .white ul li {
    color: #777;
    font-weight: bold;
  }

  .line {
    width: 1080px;
    height: 100px;
    border-bottom: 1px solid #ebeef5;
    margin-left: 5px;
    margin-top: 30px;
  }

  .line p {
    margin-left: 10px;
    display: flex;
  }

  .center {
    width: 300px;
    height: 80px;

    margin-left: 300px;
    margin-top: -60px;
  }

  .center p {
    font-size: 14px;
    color: rgb(40, 150, 235);
  }

  .xu {
    width: 200px;
    height: 20px;
    border-bottom: 2px dashed #eaeaae;
    margin-left: 8px;
  }

  .rook {
    margin-top: 10px;
  }

  .check input {
    position: absolute;
    margin-left: 800px;
    margin-top: -64px;
  }

  .mone {
    width: 1100px;
    // height: 400px;
    background: #ffffff;
  }

  .serve {
    width: 1100px;
    // height: 55px;
    background: #fafafa;
    border-bottom: 1px solid #eaeaea;
    margin: auto;
    margin-bottom: 10px;
  }

  .serve p {
    line-height: 55px;
    margin-left: 10px;
    font-weight: 600;
    font-size: 14px;
    color: #282828;
  }

  .albedo {
    width: 1100px;
    height: 80px;
    background: #ffffff;
    margin: auto;
    margin-top: -15px;
    margin-bottom: 10px;
  }

  .albedo p {
    color: #787878;
    font-size: 14px;
    line-height: 80px;
    margin-left: 10px;
  }

  .accraditation {
    width: 1100px;
    height: 55px;
    background: #fafafa;
    border-bottom: 1px solid #eaeaea;
    margin: auto;
    // margin-bottom: 10px;
  }

  .accraditation p {
    line-height: 55px;
    margin-left: 10px;
    font-weight: 600;
    font-size: 14px;
    color: #282828;
  }

  .explain {
    width: 1100px;
    // height: 370px;
    background: #ffffff;
    margin: auto;
    margin-top: -10px;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .explain p {
    margin-left: 10px;
    margin-top: 20px;
  }

  .characters textarea {
    width: 1000px;
    height: 100px;

    margin-top: 80px;
    margin-left: -185px;
  }

  .mound {
    width: 1100px;
    height: 150px;
    margin-top: 50px;
    margin: auto;
    margin-bottom: 10px;
  }

  .first {
    width: 150px;
    height: 50px;
    margin-left: 30px;
    margin-top: 50px;
  }

  .second {
    width: 150px;
    height: 50px;
    margin-left: 30px;
  }

  .thirdly {
    width: 150px;
    height: 50px;
  }

  .fourthly {
    width: 150px;
    height: 50px;
    margin-left: 120px;
  }

  .record {
    width: 1100px;
    height: 55px;
    background: #fafafa;
    border-bottom: 1px solid #eaeaea;
    margin: auto;
    margin-bottom: 10px;
  }

  .record p {
    float: left;
    font-weight: 600;
    font-size: 14px;
    color: #282828;
    line-height: 55px;
    margin-left: 10px;
  }

  .bat {
    width: 1100px;
    height: 400px;
    background: #ffffff;
    margin: auto;
    margin-bottom: 50px;
    margin-top: -10px;
  }

  .bat p img {
    width: 20px;
    height: 20px;
  }

  .icon {
    font-family: 'biz';
    color: black;
  }

  .placeholder {
    margin-left: 10px;
  }

  .last {
    width: 1100px;
    height: 500px;
    background: #ffffff;
    margin: auto;
    margin-bottom: 10px;
    margin-top: -10px;
  }

  li {
    list-style-type: none;
  }

  .collapse-title {
    flex: 1 0 90%;
    order: 1;
  }

  .as {
    background: blue;
    height: 10px;
  }

  .el-collapse-item__header {
    flex: 1 0 auto;
    order: -1;
    padding-left: 25px;
  }

  .diameter {
    width: 1100px;
    background: #ffffff;
    margin: auto;
    margin-top: -10px;
    margin-bottom: 15px;
  }

  .el-icon-arrow-right:before {
    content: '\e6e0';
    position: absolute;
    margin-top: -5px;
    margin-left: -20px;
  }

  .el-collapse-item__header {
    flex: 1 0 auto;
    order: -1;
  }

  .rules {
    margin-left: 32px;
    color: #b2b2b2;
    margin-top: 10px;
  }

  .dotted {
    width: 1000px;
    border: 1px dashed #eaeaea;
    margin-left: 21px;
    margin-top: 15px;
  }

  .convention {
    margin-top: 15px;
    // height: 200px;
    border-bottom: 1px dashed #eaeaea;
  }

  .twog {
    width: 1000px;
    border: 1px dashed #eaeaea;
    margin-left: 21px;
    margin-top: 15px;
  }

  .underneath {
    margin-top: 10px;
  }

  .two {
    margin-left: 10px;
  }

  .void {
    width: 1000px;
    border: 1px dashed #eaeaea;
    margin-left: 21px;
    margin-top: 15px;
  }

  .dump {
    margin-top: 10px;
  }

  .el-collapse-item__header.is-active {
    border-bottom-color: transparent;
  }

  .buttom {
    width: 1100px;
    background: #ffffff;
    margin: auto;
  }

  .buttom ul {
    margin-left: 20px;
    overflow: hidden;
  }

  .buttom ul li {
    line-height: 32px;
    font-size: 14px;
    margin-top: 10px;
    color: #777;
  }

  .buttom ul li:nth-of-type(1) {
    margin-top: 18px;
  }

  .buttom ul li:last-of-type {
    margin-bottom: 18px;
  }

  .element.style {
    color: rgb(136, 136, 136);
    margin-left: 10px;
  }

  .space {
    margin-left: 10px;
  }

  .el-button + .el-button {
    margin-left: 115px;
  }

  .disapprove {
    color: red;
  }

  .disapprove.pass {
    color: green;
  }
  .objectionInput {
    width: 88%;
    padding: 5px 12px;
    font-size: 14px;
    color: #333;
    border: 1px solid #ddd;
    line-height: 20px;
    outline: none;
  }
}
.el-table .hidden-row {
  display: none;
}
.Steps {
  width: 1100px;
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  margin: auto;
  margin-bottom: 10px;
  margin-top: -8px;
  display: flex;
  .cell {
    padding: 0;
  }
}
.approveStatusBtn {
  font-size: 12px;
  line-height: 20px;
  border: none;
  text-align: center;
  width: 70px;
  color: #ffffff;
  border-radius: 2px;
  background-color: #2896eb;
}
.approvePassBtn {
  background-color: #2dc62c;
}
.approveNotPassBtn {
  background-color: #f00;
}
.filename {
  color: #2896eb;
  padding-left: 15px;
  cursor: pointer;
}
.el-collapse-item__header {
  // border-bottom: 1px solid #ccc;
}
.msd .el-collapse-item__header.is-active {
  border-bottom: 1px solid #ccc;
}
::deep .objectionDetailStyle img {
  // img{
  max-width: 100%;
  // }
}
@media only screen and (max-width: 1400px) {
  .path {
    width: 100% !important;
  }
  .blue_title {
    width: 100% !important;
  }
  .rfp_item {
    width: 100% !important;
  }
  .basic {
    width: 100% !important;
  }
  .buttom {
    width: 100% !important;
  }
  .Sketch {
    width: 100% !important;
  }
  .conferee {
    width: 100% !important;
  }
  .sign {
    width: 100% !important;
  }
  .voucher {
    width: 100% !important;
  }
  .below {
    width: 100% !important;
  }
  .close {
    width: 100% !important;
  }
  .barch {
    width: 100% !important;
  }
  .mone {
    width: 100% !important;
  }
  .serve {
    width: 100% !important;
  }
  .albedo {
    width: 100% !important;
  }
  .accraditation {
    width: 100% !important;
  }
  .explain {
    width: 100% !important;
  }
  .mound {
    width: 100% !important;
  }
  .record {
    width: 100% !important;
  }
  .bat {
    width: 100% !important;
  }
  .last {
    width: 100% !important;
  }
  .diameter {
    width: 100% !important;
  }
  .buttom {
    width: 100% !important;
  }
  .Steps {
    width: 100% !important;
  }
  .nformation {
    width: 100% !important;
  }
}
</style>
