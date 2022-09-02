<template>
  <div class="content" v-cloak>
    <div class="approval-box">
      <div class="path">
        <ul>
          <el-button type="text" @click="$router.replace({path:'/'})">首页</el-button>
          <li style="color: #7c7f82">></li>
          <li style="color: #409EFF;cursor:pointer" @click="$router.replace({name:'approveSetting'})">审批流配置</li>
          <li style="color: #7c7f82">></li>
          <li style="color: #7c7f82">{{ this.$route.query.typeM == 1 ? '编辑' : '添加' }}审批步骤</li>
        </ul>
      </div>
      <div class="approval-title">
        {{ this.$route.query.typeM == 1 ? '编辑' : '添加' }}审批步骤
      </div>
      <div class="approval-body">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="122px" class="demo-ruleForm">
          <el-form-item label="审批步骤名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="备注/描述">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="审批条件">

            <div v-if="isDefalt != '1'" style="display:flex; margin-bottom: 20px;">
              <div style="width:180px; margin-right:10px;">会议类型</div>
              <div>
                <div v-for="mt in meetingTypes" :key="mt.company_id" style="display:flex">
                  <p style="min-width: 180px;">{{mt.company_name}}: </p>
                  <el-checkbox-group v-model="mt.meetingTypeSelect">
                    <el-checkbox v-for="m in mt.meeting_type" :key="m.meeting_type_id" :label="m.meeting_type_name"></el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>

            <div style="display:flex;">
              <div style="width:180px; margin-right:10px;">服务类型</div>
              <div>
                <el-checkbox-group v-model="serviceTypeSelect">
                  <el-checkbox v-for="st in serviceTypes" :key="st.id" :label="st.name"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>

            <div style="display:flex;">
              <div style="width:180px; margin-right:10px;">会议城市</div>
              <div>
                <el-select v-model="citySelect" multiple placeholder="请选择">
                  <el-option v-for="c in citys" :key="c.value" :label="c.label" :value="c.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="审批人">
            <div style="margin-left: 100px">
              <el-radio v-model="radio" label="1">内部审批</el-radio>
            </div>
            <div>
              <el-radio v-model="radio1" name="person" label="0" style="margin-left: 120px">相关人员</el-radio>
            </div>
            <div style="margin-left: 140px">
              <el-checkbox label="会议创建人" v-model="meetingCreator" true-label="0032-1"></el-checkbox>
              <el-checkbox label="会议负责人" v-model="meetingOower" true-label="0032-2"></el-checkbox>
              <el-checkbox label="会议指定采购" v-model="meetingUp" true-label="0032-3"></el-checkbox>
              <el-checkbox label="会议指定合规人员" v-model="meetingPurchase" true-label="0032-4"></el-checkbox>
              <el-checkbox label="会议助理" v-model="meetingPersonnel" true-label="0032-5"></el-checkbox>
            </div>
            <div style="margin-left: 120px">
              <el-radio v-model="radio1" label="1" name="person">指定人员</el-radio>
            </div>
            <div style="display: flex">
              <span class="mail_designated_user_list" style="margin-left: 20px" v-show="this.namesta">
                <span data-uid="9511" style="margin-left: 100px">
                  {{ this.namesta }}<i class="ico del"></i>
                </span>
              </span>
              <el-row>
                <el-button type="primary" style="padding: 7px 6px; font-size: 7px; margin-left: 50px" @click="addList">添加</el-button>
              </el-row>
            </div>
            <div style="margin-left: 100px">
              <el-radio v-model="radio" disabled>
                第三方审批 <span>该审批暂不支持第三方审批</span>
              </el-radio>
            </div>
          </el-form-item>
          <el-form-item label="审批通知">
            <div style="margin-left: 100px">
              <el-checkbox label="给审批人发送短信" v-model="message"></el-checkbox>
            </div>
            <div style="margin-left: 100px">
              <el-checkbox label="给审批人发送邮件" v-model="mail"></el-checkbox>
            </div>
            <div style="margin-left: 100px">
              <el-checkbox label="给指定人员发送邮件" v-model="appointMailBit"></el-checkbox>
            </div>
            <div style="display: flex">
              <span class="mail_designated_user_list" style="margin-left: 20px" v-show="this.getUserValueTwo">
                <span data-uid="9511" style="margin-left: 100px">
                  {{this.namestae.join(',')}}<i class="ico del"></i>
                </span>
              </span>
              <el-row>
                <el-button type="primary" style="padding: 7px 6px; font-size: 7px; margin-left: 50px" @click="addListTwo">添加</el-button>
              </el-row>
            </div>
          </el-form-item>
          <el-form-item label="供应商催审">
            <div style="margin-left: 100px">
              <el-checkbox label="允许供应商催审" name="type" v-model="allowExpediting"></el-checkbox>
            </div>
          </el-form-item>
          <el-form-item label="审批超时处理" prop="type">
            <div style="margin-left: 100px">
              <span>超过</span>
              <el-input v-model="overtime" placeholder="超过多少小时不审核" style="width: 61%; margin-left: -100px"></el-input>
              <span class="input-right-span">小时不审核，则</span>
            </div>
            <div style="margin-left: 120px">
              <el-checkbox label="自动审批通过" v-model="automaticApproval"></el-checkbox>
            </div>
            <div style="margin-left: 120px">
              <el-checkbox label="再次通知审批人（仅一次）" v-model="onceAgain"></el-checkbox>
            </div>
            <div style="margin-left: 120px">
              <el-checkbox label="通知相关人员" v-model="noticePersonnel"></el-checkbox>
            </div>
            <div style="margin-left: 140px">
              <el-checkbox label="会议创建人" v-model="meetingCreatored" true-label="0033-1"></el-checkbox>
              <el-checkbox label="会议负责人" v-model="meetingOowered" true-label="0033-2"></el-checkbox>
              <el-checkbox label="会议指定采购" v-model="meetingUped" true-label="0033-3"></el-checkbox>
              <el-checkbox label="会议指定合规人员" v-model="meetingPurchaseed" true-label="0033-4"></el-checkbox>
              <el-checkbox label="会议助理" v-model="meetingPersonneled" true-label="0033-5"></el-checkbox>
            </div>
            <div style="margin-left: 120px">
              <el-checkbox label="指定人员" v-model="designee"></el-checkbox>
            </div>
            <div style="display: flex">
              <span class="mail_designated_user_list" style="margin-left: 20px" v-show="this.getUserValueThree">
                <span data-uid="9511" style="margin-left: 100px">
                  {{ this.namestaed.join(',')}}<i class="ico del"></i>
                </span>
              </span>
              <el-row>
                <el-button type="primary" style="padding: 7px 6px; font-size: 7px; margin-left: 50px" @click="addListThree">添加</el-button>
              </el-row>
            </div>
          </el-form-item>
          <el-dialog title="查找指定人员" :visible.sync="dialogVisible" width="30%">
            <el-select v-model="getUserValue" filterable placeholder="请选择">
              <el-option v-for="item in getUserList" :key="item.value" :label="item.fullname" :value="item.username"></el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addcitys">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog title="查找指定人员" :visible.sync="dialogVisibleThree" width="30%">
            <el-select v-model="getUserValueThree" filterable placeholder="请选择">
              <el-option v-for="item in getUserList" :key="item.value" :label="item.fullname" :value="item.username"></el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleThree = false">取 消</el-button>
              <el-button type="primary" @click="pushlisted">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog title="查找指定人员" :visible.sync="dialogVisibleTwo" width="30%">
            <el-select v-model="getUserValueTwo" filterable placeholder="请选择">
              <el-option v-for="item in getUserList" :key="item.value" :label="item.fullname" :value="item.username"></el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleTwo = false">取 消</el-button>
              <el-button type="primary" @click="dislist">确 定</el-button>
            </span>
          </el-dialog>
          <el-form-item>
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-button type="text" @click="complianceMeal = true"></el-button>
      <el-dialog title="添加/编辑条件" :visible.sync="complianceMeal" width="50%" center>
        <div v-for="(item, index) in emptyArr" :key="index">
          <span>{{ index === 0 ? 'if' : 'and' }}</span>
          <select class="approval-select condition-var" style="width: 150px" v-model="department" @change="change">
            <option value="会议部门">会议部门</option>
            <option value="会议类型">会议类型</option>
            <option value="旅行社陪同人员">旅行社陪同人员</option>
            <option value="会议总预算">会议总预算</option>
            <option value="会议开始日期">会议开始日期</option>
            <option value="结算金额">结算金额</option>
          </select>
          <select class="approval-select condition-operator" v-model="Right" @change="change">
            <option value="是">是</option>
            <option value="不是">不是</option>
          </select>
          <select class="approval-select condition-operator" v-show="size" v-model="sizeindex">
            <option value="min">小于</option>
            <option value="max">大于等于</option>
          </select>
          <input type="text" name="" id="" style="height: 33px; border: 1px solid #dedfe6" placeholder="请输入内容" v-show="operator" />
          <a class="approval-a multi" @click="elect">选择</a>
          <a class="approval-empty del" @click="del(index)">删除</a>
        </div>

        <span class="addevent" @click="addCondition">添加条件</span>
        <div class="thread"></div>

        <div class="text">
          <p style="margin-top: 10px">条件预览</p>
          <textarea name id cols="30" rows="10" class="frame" v-model="condition"></textarea>
        </div>
        <span> </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="complianceMeal = false">取 消</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </span>
      </el-dialog>
      <el-dialog title="查找指定人员" :visible.sync="mataddialogVisible" width="40%">
        <div class="comlist">
          <el-checkbox v-model="check" true-label="HZ_外部会-多项服务">HZ_外部会-多项服务</el-checkbox>
          <el-checkbox v-model="checked" true-label="LY_外部会-单项服务">LY_外部会-单项服务</el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="(mataddialogVisible = false), (complianceMeal = true)">取 消</el-button>
          <el-button type="primary" @click="visible">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      type: '',
      meetingTypes: [],
      serviceTypeSelect: [],
      serviceTypes: [],
      citys: [],
      citySelect: [],
      mataddialogVisible: false,
      dialogVisible: false,
      size: false,
      sizeindex: 'min',
      operator: false,
      complianceMeal: false,
      overtime: '',
      radio: '1',
      radio1: '0',
      radio3: 1,
      notice_relevant_personnel_bit: 0,
      ruleForm: {
        name: '' || '',
        type: [],
        desc: '',
        checkType: [] //审批通知
      },
      rules: {
        name: [{ required: true, message: '请输入审批步骤名称', trigger: 'blur' }]
      },
      value: '',
      approval: {},
      isDefalt: '',
      personArr: [],
      message: 1,
      mail: 1,
      allowExpediting: 1, //允许供应商催审
      appointMailBit: 1,
      automaticApproval: 1, //自动审批通过
      onceAgain: 1, //再一次通知
      noticePersonnel: 1, //通知相关人员
      designee: 1, //指定
      department: '会议部门',
      condition: '',
      Right: '是',
      emptyArr: [{ name: 0, value: 1 }],
      imei: '',
      imeiMaskShow: false,
      cameraShow: false,
      brand: null,
      type: null,
      name: null,
      ram: null,
      color: null,
      error: null,
      submitFlag: true,
      approvalAreaConditions: '',
      area: false,
      check: '',
      checked: '',
      getUserList: [],
      getUserValue: '',
      meetingCreator: '', //会议创建人
      meetingOower: '',
      meetingUp: '',
      meetingPurchase: '',
      meetingPersonnel: '',
      meetingSettlement: '',
      meetingCreatored: '', //会议创建人
      meetingOowered: '',
      meetingUped: '',
      meetingPurchaseed: '',
      meetingPersonneled: '',
      dialogVisibleTwo: false,
      dialogVisibleThree: false,
      getUserValueTwo: '',
      getUserValueThree: '',
      namestaed: [],
      namestae: [],
      namesta: ''
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    this.isDefalt = this.$route.query.isDefalt

    this.getUser()

    if (this.$route.query.approval) {
      this.approval = JSON.parse(this.$route.query.approval)

      this.citySelect = this.approval.city_code ? this.approval.city_code.split(',') : []

      const relevant_personnel = this.approval.relevant_personnel.split(',')
      const notice_relevant = this.approval.notice_relevant_personnel.split(',')
      this.ruleForm.name = this.approval.approve_name //审批步骤名称
      this.ruleForm.desc = this.approval.remarks //备注
      this.radio1 = this.approval.relevant_personnel_bit + ''
      this.message = !this.approval.short_message //是否发送短信
      this.mail = !this.approval.mail //是否发送邮件
      this.overtime = this.approval.overtime //超时时间
      this.allowExpediting = !this.approval.service_urge //是否允许供应商催审(只有结算审批使用)(0是1否)
      this.appointMailBit = !this.approval.appoint_mail_bit //是否启用指定人员邮件
      this.automaticApproval = !this.approval.adopt //超时是否自动通过
      this.onceAgain = !this.approval.notify_approver_again //超时是否再次通知审批人
      this.noticePersonnel = !this.approval.notice_relevant_personnel_bit //通知相关人员
      this.designee = !this.approval.notice_designated_personnel_bit //超时是否通知指定人员
      debugger
      this.namesta = this.approval.designated_personnel

      relevant_personnel.forEach(item => {
        if (item == '0032-1') {
          this.meetingCreator = item
        } else if (item == '0032-2') {
          this.meetingOower = item
        } else if (item == '0032-3') {
          this.meetingUp = item
        } else if (item == '0032-4') {
          this.meetingPurchase = item
        } else if (item == '0032-5') {
          this.meetingPersonnel = item
        }
      })

      notice_relevant.forEach(item => {
        if (item == '0033-1') {
          this.meetingCreatored = item
        } else if (item == '0033-2') {
          this.meetingOowered = item
        } else if (item == '0033-3') {
          this.meetingUped = item
        } else if (item == '0033-4') {
          this.meetingPurchaseed = item
        } else if (item == '0033-5') {
          this.meetingPersonneled = item
        }
      })
    }

    this.getProvinceCity()
    this.approvaMeetingType()
    this.getServiceType()
  },
  methods: {
    getProvinceCity() {
      this.requestApi({
        url: '/MeetingMa/ProvinceCity',
        method: 'POST',
        data: {}
      }).then(res => {
        this.citys = res.map(item => {
          item.label = item.name
          item.value = item.code
          return item
        })
      })
    },
    approvaMeetingType() {
      this.requestApi({
        url: '/Approval/ApprovaMeetingType',
        method: 'POST',
        data: { id: this.id }
      }).then(res => {
        this.meetingTypes = res.map(item => {
          item.meetingTypeSelect = []

          if (this.approval.meeting_type) {
            for (let i = 0; i < this.approval.meeting_type.length; i++) {
              let company = this.approval.meeting_type[i]
              if (company.company_id == item.company_id) {
                item.meetingTypeSelect = []
                item.meeting_type.forEach(element => {
                  company.meeting_type_list.forEach(ele => {
                    if (element.meeting_type_id == ele.meeting_type_id) {
                      item.meetingTypeSelect.push(element.meeting_type_name)
                    }
                  })
                })
              }
            }
          }

          return item
        })
      })
    },
    getServiceType() {
      this.requestApi({
        url: '/MeetingMa/GetServiceType',
        method: 'POST',
        data: {}
      }).then(res => {
        this.serviceTypes = res
        let service_type = []
        if (this.approval.service_type) {
          for (let i = 0; i < this.approval.service_type.length; i++) {
            let ast = this.approval.service_type[i]
            for (let j = 0; j < this.serviceTypes.length; j++) {
              if (this.serviceTypes[j].id == ast.service_type_id) {
                service_type.push(this.serviceTypes[j].name)
              }
            }
          }
        }

        this.serviceTypeSelect = service_type
      })
    },
    addListThree() {
      this.dialogVisibleThree = true
    },
    addListTwo() {
      this.dialogVisibleTwo = true
    },
    visible() {
      this.mataddialogVisible = false
      this.complianceMeal = true
      this.change()
    },
    getUser() {
      this.requestApi({
        url: '/MeetingMa/GetUser',
        method: 'POST',
        data: {}
      }).then(res => {
        this.getUserList = res
      })
    },
    cancel() {
      if (this.type == '1') {
        this.$router.push({
          name: 'settlementSheet',
          query: {
            id: this.id,
            type: this.type
          }
        })
      }
      if (this.type == '2') {
        this.$router.push({
          name: 'outbid',
          query: {
            id: this.id,
            type: this.type
          }
        })
      }
    },
    dislist() {
      this.dialogVisibleTwo = false
      this.namestae.push(this.getUserValueTwo)
    },
    change() {
      this.condition = `${'if'}  ${this.department}  ${this.Right} ${this.check} ${this.checked}`
    },
    addcitys() {
      this.dialogVisible = false
      if (this.namesta) {
        this.namesta += ',' + this.getUserValue
      } else {
        this.namesta = this.getUserValue
      }
      // this.namesta.push(this.getUserValue)
    },
    findMeetingId(list, name) {
      for (let i = 0; i < list.length; i++) {
        if (name == list[i].meeting_type_name) {
          return list[i].meeting_type_id
        }
      }
    },
    submitForm() {
      let service_type = []
      for (let i = 0; i < this.serviceTypeSelect.length; i++) {
        for (let j = 0; j < this.serviceTypes.length; j++) {
          if (this.serviceTypes[j].name == this.serviceTypeSelect[i]) {
            service_type.push({
              id: '',
              service_type_id: this.serviceTypes[j].id
            })
          }
        }
      }

      let meeting_type = []
      for (let m = 0; m < this.meetingTypes.length; m++) {
        let mitem = this.meetingTypes[m] // company_id company_name meetingTypeSelect meeting_type
        let msitem = this.meetingTypes[m].meetingTypeSelect // 自办学术会、办学术会
        let meeting_types = mitem.meeting_type // meeting_type_id: "7ac67205-e40c-4c9d-a58d-33287f9ebc75" meeting_type_name: "自办学术会"
        let mts = []
        if (msitem && msitem.length) {
          for (let n = 0; n < msitem.length; n++) {
            // 自办学术会
            let meetid = this.findMeetingId(meeting_types, msitem[n])
            if (meetid) {
              mts.push({
                id: '',
                meeting_type_id: meetid
              })
            }
          }
        }
        meeting_type.push({
          company_id: mitem.company_id,
          meeting_type_list: mts
        })
      }

      if (this.ruleForm.name === '') {
        this.$message('请输入审批步骤名称')
        return
      }

      let personnelList = [this.meetingCreator, this.meetingOower, this.meetingUp, this.meetingPurchase, this.meetingPersonnel, this.meetingSettlement]
      let personnelLists = [this.meetingCreatored, this.meetingOowered, this.meetingUped, this.meetingPurchaseed, this.meetingPersonneled]
      personnelList = personnelList.filter(item => (item ? item : ''))
      personnelLists = personnelLists.filter(item => (item ? item : ''))
      if (personnelList.every(item => item == '') && this.getUserValue == '') {
        this.$message('请选择相关人员或者请填写指定人员')
        return
      }
      this.requestApi({
        url: '/Approval/ApprovalProcessSava',
        method: 'POST',
        data: {
          Parameter: JSON.stringify({
            id: this.approval.id || '', //	ID为空是新增 有值则为修改  id:
            approval_id: this.id,
            city_code: this.citySelect.join(','),
            service_type: service_type,
            meeting_type: meeting_type,
            approve_name: this.ruleForm.name, //审批步骤名称
            remarks: this.ruleForm.desc, //	说明备注
            relevant_personnel_bit: this.radio1 == 0 ? 0 : 1, //	是否启用相关人员(0是1否)
            relevant_personnel: personnelList.join(','), // 	相关人员（以英文逗号分割)
            designated_personnel_bit: this.radio1 == 1 ? 0 : 1, // 	是否启用指定人员(0是1否)
            designated_personnel: this.namesta, //指定人员(用户编码，以英文逗号分割)
            multi_level_approval_bit: '1', //	是否启用多层审批(0是1否)
            multi_level_approval: '1', // 	多层审批()
            short_message: this.message === true ? 0 : 1, // 	是否发送短信(0是1否)
            mail: this.mail === true ? 0 : 1, //	是否发送邮件(0是1否)
            appoint_mail_bit: this.appointMailBit === true ? 0 : 1, //	是否启用指定人员邮件(0是1否)
            appoint_mail: this.namestae.join(','), //	指定人员邮件(用户编码，以英文逗号分割)
            overtime: this.overtime, // 	超时市场
            service_urge: this.allowExpediting === true ? 0 : 1,
            adopt: this.automaticApproval === true ? 0 : 1, //	超时是否自动通过(0是1否)
            notify_approver_again: this.onceAgain === true ? 0 : 1, //	超时是否再次通知审批人(0是1否)
            notice_relevant_personnel_bit: this.noticePersonnel === true ? 0 : 1, //超时是否通知相关人员(0是1否)
            notice_relevant_personnel: personnelLists.join(','), //	超时通知相关人员（以英文逗号分割)
            notice_designated_personnel_bit: this.designee === true ? 0 : 1, //超时是否通知指定人员(0是1否)
            notice_designated_personnel: this.namestaed.join(','), //超时通知指定人员（用户编码，以英文逗号分割)
            type: this.$route.query.type //0会议，1结算，2中标
          })
        }
      }).then(res => {
        if (res === true && this.$route.query.type == 1) {
          this.$router.push({
            name: 'settlementSheet',
            query: {
              id: this.id,
              type: this.type
            }
          })
        }
        if (this.$route.query.type == 2) {
          this.$router.push({
            name: 'outbid',
            query: {
              id: this.id,
              type: this.type
            }
          })
        }
      })
    },
    pushlisted() {
      this.dialogVisibleThree = false
      this.namestaed.push(this.getUserValueThree)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addList() {
      this.dialogVisible = true
    },
    elect() {
      this.complianceMeal = false
      this.mataddialogVisible = true
    },
    addCondition() {
      this.emptyArr.push({ name: 2, value: 1 })
    },
    del(i) {
      this.emptyArr.splice(i, 1)
    },
    submit() {
      this.complianceMeal = false
      this.approvalAreaConditions = this.condition
      if (this.approvalAreaConditions) {
        this.area = true
      }
    }
  }
}
</script>

<style lang="scss" >
[v-cloak] {
  display: none;
}
.approval-select {
  height: 39px;
  margin-left: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  border: solid 1px #dedfe6;
  margin-right: 10px;
}
.el-input__suffix {
  // right: -50px;
}
.el-select > .el-input {
  // margin-left: -78px;
  // width: 215px;
}
.content {
  width: 1100px;
  margin: 0 auto;
}
.approval-box {
  padding: 20px;
  background: #fff;
}
.approval-title {
  font-weight: 500;
  color: #57638a;
  font-size: 14px;
  line-height: 20px;
  /* padding: 10px 0; */
  border-bottom: 1px solid #e4e4e4;
  position: relative;
}
.approval-body {
  padding: 20px 0;
}
.el-form-item__content {
  margin-left: 121px;
}
.el-input__inner {
  // margin-left: 100px;
  width: 80%;
}
.el-textarea {
  width: 80%;
  margin-left: 100px;
}
.el-form-item__label {
  color: #787878;
}
.el-row {
  margin-left: 100px;
}

.approval-a {
  color: #5bc0de;
  line-height: 30px;
  text-decoration: none;
  margin: 0 10px;
}
.approval-empty {
  color: #f05e5f;
}
.el-dialog__header {
  background-color: #f2f2f3;
}
.el-dialog--center {
  text-align: left;
}
.addevent {
  margin-top: 10px;
  position: absolute;
  color: #5bc0de;
}
.thread {
  width: 600px;

  margin-top: 40px;
  border-bottom: 1px solid #e5e5e5;
  margin-left: -25px;
}
.frame {
  width: 100%;
  height: 100px;
  margin-top: 10px;
}
.approval-select {
  margin-bottom: 17px;
}
.approval-area {
  margin-left: 100px;
  width: 729px;
  border-radius: 4px;
  background-color: #f9f9f9;
  border: solid 1px #dedfe6;
  font-size: 14px;
  color: #333333;
  padding: 10px;
  line-height: 24px;
  margin-bottom: 10px;
}
.approval-area-span {
  display: inline-block;
  width: 33px;
}
.el-select .el-input__inner {
  cursor: pointer;
  padding-right: 35px;
  width: 300px;
}
.el-input__suffix {
  // right: -173px;
}
.path {
  // width: 1100px;
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
@media only screen and (max-width: 1400px) {
  .content {
    width: 85%;
  }
  .input-right-span {
    margin-left: 30px;
  }
}
</style>