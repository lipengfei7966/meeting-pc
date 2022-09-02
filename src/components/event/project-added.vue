<template>
  <div class="project-added">
    <el-form label-width="110px" :model="FormData" ref="ruleForm" :rules="rules" style="overflow: hidden">
      <el-col :span="12" v-if="userList.length != 0">
        <el-form-item label="项目经理" prop="project_manager">
          <el-select v-model="FormData.project_manager" placeholder="选择项目经理">
            <el-option v-for="item in userList" :key="item.id" :label="item.real_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12" v-if="userList.length != 0">
        <el-form-item label="项目专员" prop="project_specialist">
          <el-select v-model="FormData.project_specialist" placeholder="选择项目专员">
            <el-option v-for="item in userList" :key="item.id" :label="item.real_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="订单号" prop="event_orderform_num">
          <p class="orderid" v-if="FormData.event_orderform_num">
            已选择订单编号: {{ FormData.event_orderform_num }}
          </p>
          <el-button @click="selectOrderStatus = true" v-if="!FormData.id">选择订单</el-button>
          <p class="ordertj" v-if="!FormData.id">
            <span>推荐 添加订单号可以将项目关联到订单上，方便查阅</span>
          </p>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="会议名称" prop="event_name">
          <el-input v-model="FormData.event_name" placeholder="会议名称" :disabled="FormData.id"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="开始日期" prop="start_date">
          <el-date-picker v-model="FormData.start_date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="结束日期" prop="end_date">
          <el-date-picker v-model="FormData.end_date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="客户公司名" prop="customer_company_name">
          <el-input v-model="FormData.customer_company_name" placeholder="客户公司名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="客户姓名" prop="customer_name">
          <el-input v-model="FormData.customer_name" placeholder="客户姓名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系电话" prop="contact_number">
          <el-input v-model="FormData.contact_number" placeholder="联系电话"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="联系邮箱" prop="contact_email">
          <el-input v-model="FormData.contact_email" placeholder="联系邮箱"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="参与人数" prop="number_of_participants">
          <el-input v-model="FormData.number_of_participants" placeholder="参与人数"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <div class="btnGroup">
          <el-button type="primary" @click="add">{{
            itemData == null ? "立即添加" : "确认修改"
          }}</el-button>
        </div>
      </el-col>
    </el-form>

    <!-- 选择订单 -->
    <el-dialog title="选择订单" :visible.sync="selectOrderStatus" :modal="false" width="60%">
      <selectOrder @selected="selectedorder" />
    </el-dialog>
  </div>
</template>

<script>
import upload from '@/utils/upload'
import { validatePhone, validateEMail, isInteger } from '@/assets/js/validator'
import selectOrder from '@/components/event/selectOrder.vue'
export default {
  components: { selectOrder },
  props: {
    itemData: JSON | null
  },
  data() {
    return {
      selectOrderStatus: false,
      FormData: {
        project_manager: '',
        project_specialist: '',
        event_orderform_id: '',
        event_orderform_num: '',
        event_name: '',
        start_date: '',
        end_date: '',
        customer_company_name: '',
        customer_name: '',
        contact_number: '',
        contact_email: '',
        number_of_participants: ''
      },
      // 等待上传
      waitUpload: [],
      rules: {
        project_manager: [{ required: true, message: '项目经理不能为空', trigger: 'change' }],
        project_specialist: [{ required: true, message: '项目专员不能为空', trigger: 'change' }],
        event_orderform_id: [{ required: true, message: '订单不能为空', trigger: 'change' }],
        event_name: [{ required: true, message: '会议名称不能为空', trigger: 'change' }],
        start_date: [{ required: true, message: '请填写开始时间', trigger: 'change' }],
        end_date: [{ required: true, message: '请填写结束时间', trigger: 'change' }],
        customer_company_name: [{ required: true, message: '请填写客户公司名称', trigger: 'change' }],
        customer_name: [{ required: true, message: '请填写客户姓名', trigger: 'change' }],
        contact_number: [
          { required: true, message: '请填写联系电话', trigger: 'change' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        contact_email: [
          { required: true, message: '请填写联系邮箱', trigger: 'change' },
          { validator: validateEMail, trigger: 'blur' }
        ],
        number_of_participants: [
          { required: true, message: '请填写参与人数', trigger: 'change' },
          { validator: isInteger, trigger: 'change' }
        ]
      },
      // 人员列表
      userList: []
      // 订单列表
    }
  },
  mounted() {
    if (this.itemData != null) {
      this.FormData = JSON.parse(JSON.stringify(this.itemData))
    }
    this.requestApi({
      url: '/member/list',
      method: 'POST',
      data: {
        Page: 1,
        Rows: 999
      }
    }).then(res => {
      this.userList = res.List
    })
  },
  methods: {
    add() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          // 验证成功
          this.$emit('onColse', this.FormData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 图片
    handlePreviewImage(e) {
      this.waitUpload.push(e)
    },
    // 选择订单
    selectedorder(e) {
      this.FormData.event_orderform_id = e.id
      this.FormData.event_orderform_num = e.num
      this.FormData.event_name = e.event_name
      this.FormData.start_date = e.event_startdate
      this.FormData.end_date = e.event_enddate
      this.FormData.customer_company_name = e.company_name
      this.FormData.customer_name = e.fullname
      this.FormData.contact_number = e.mobile
      this.FormData.contact_email = e.email
      this.FormData.number_of_participants = e.attendee_no
      this.selectOrderStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
.btnGroup {
  text-align: right;
}
.waitUploadList .item {
  display: flex;
  align-items: center;
  padding: 2px 5px;
  border-radius: 3px;
  transition: 0.3s;
  cursor: pointer;
  p {
    flex: 1;
  }
  &:hover {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
}

.yl {
  margin-top: 5px;
  img {
    width: 100px;
    margin-bottom: 5px;
    margin-right: 5px;
  }
}

.orderid {
  color: #237bd2;
}

.ordertj {
  span {
    background-color: #9dc3eb;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
  }
}
</style>