<template>
  <div>
    <div class="boss">
      <ul>
        <li style="color: #0084e9;cursor: pointer" @click="$router.go(-1)">我的审批</li>
        <li style="color: #7c7f82">></li>
        <li style="color: #7c7f82">中标审批（{{$route.query.event_name}}）</li>
      </ul>
    </div>
    <div class="blue_tit">
      <img :src="require('@/assets/images/锁定.png')" alt />
      <p>中标报价审批</p>
    </div>
    <!-- 会议基本信息 -->
    <base-part :source="'approve'"></base-part>

    <div class="tour">
      <p>旅行社报价</p>
    </div>
    <div class="numbers">
      <el-table ref="multipleTable" :data="num">
        <el-table-column label="询价单号" prop="inquiry_sheet_code" align="center">
          <!-- <template slot-scope="scope">{{ scope.row.inquiry_sheet_code }}</template> -->
        </el-table-column>
        <el-table-column prop="company_name" label="旅行社名称 Travel Agency Name" show-overflow-tooltip align="center"> </el-table-column>
        <el-table-column prop="total_price" label="报价 Quotation" class-name="offerPrice" style="color:#f91" align="center">
          <template slot-scope="scope">
            <span style="color: #f91; font-weight:bold"> ￥ {{scope.row.total_price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作 Actions" align="center">
          <template slot-scope="scope">
            <el-button class="checkOffer" @click="checkOffer(scope.row.quoted_price_id)" type="text" size="small"> 查看报价 </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <!-- <div class="merge">
			<el-button type="primary">合并下载报价单</el-button>
		</div> -->
    <div class="interior">
      <p>内保审批</p>
    </div>
    <div class="opinion">
      <p>审批意见:</p>
      <div class="right">
        <textarea name id cols="30" rows="10" v-model="ApprovalOpinion"></textarea>
      </div>
      <div class="underside">
        <el-button type="primary" plain style="margin-left: 20px; width: 160px; margin-top: 30px">邀请其他人审批</el-button>
        <el-button type="danger" style="margin-left: 70px; width: 160px; margin-top: 30px" @click="max('不通过')">审批不通过</el-button>
        <el-dialog title="确认审批结果" :visible.sync="dialogVisible" width="30%">
          <span>
            审批意见一旦提交则无法修改，是否确认当前审批
            <span class="disapprove" :class="[passMessage==='通过'?'pass':'']">{{passMessage}}</span>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendApprove">确 定</el-button>
          </span>
        </el-dialog>
        <el-button type="success" style="margin-left: 70px; width: 160px; margin-top: 30px" @click="max('通过')">审批通过</el-button>
      </div>
    </div>

    <div class="record">
      <p>审批记录</p>
    </div>
    <div class="Steps">
      <el-table ref="multipleTable" :data="arr">
        <el-table-column label="审批步骤" prop="approve_name" align="center"></el-table-column>
        <el-table-column prop="fullname" label="审批人" show-overflow-tooltip align="center"> </el-table-column>
        <el-table-column label="审批状态" align="center">
          <template slot-scope="scope">
            <button :class="['approveStatusBtn', scope.row.type=='待审核'?'':(scope.row.type=='审核通过'?'approvePassBtn':'approveNotPassBtn')]">{{scope.row.type}}</button>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="说明" show-overflow-tooltip align="center"> </el-table-column>
        <el-table-column prop="approve_data" label="操作时间" show-overflow-tooltip align="center"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import basePart from '@/components/event/basePart_2.vue'
export default {
  data() {
    return {
      menus: [],
      arr: [],
      num: [],
      dialogVisible: false,
      // dialogVisible1: false,
      dialogVisibles: false,
      passMessage: '',
      selectQuery: {},
      ApprovalOpinion: ''
    }
  },
  components: {
    basePart
  },
  mounted() {
    this.selectQuery = this.$route.query
    this.getDetail()
  },
  methods: {
    getDetail() {
      this.requestApi({
        url: '/MeetingMa/TouristAgencyQuotedPrice',
        method: 'POST',
        data: { ApproveID: this.selectQuery.ApproveID }
      }).then(res => {
        this.arr = res.approve
        this.num = res.inquirySheet
        console.log(res)
      })
    },
    max(val) {
      this.dialogVisible = true
      this.passMessage = val
    },
    checkOffer(foreign_key_id) {
      this.$router.push({
        name: 'offer',
        // path: '/offer',
        query: {
          foreign_key_id: foreign_key_id, // 报价单ID
          id: this.$route.query.id, // 会议ID
          type: this.$route.query.type
        }
      })
    },

    sendApprove() {
      const status = this.passMessage === '不通过' ? '1' : '0'
      this.requestApi({
        url: '/MeetingMa/WinthebiddingApproveSava',
        method: 'POST',
        data: {
          Parameter: JSON.stringify({
            status: status,
            id: this.selectQuery.ApproveID,
            remarks: this.ApprovalOpinion,
            message: '', // 字段需传空值，否则接口无响应
            objection: '' // 字段需传空值，否则接口无响应
          })
        }
      }).then(res => {
        if (res) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }

        this.dialogVisible = false
        console.log(res)
        // this.$route.replace('')
        this.$router.replace({
          name: 'approve'
        })
        this.getDetail()
      })
    }
  }
}
</script>

<style lang="scss">
body {
  background: #f2f4f8;
}
.boss {
  width: 1100px;
  height: 55px;
  // background: red;
  margin: auto;
  margin-top: 15px;
}
.boss ul {
  display: flex;
  line-height: 55px;
}
.boss ul li {
  margin-left: 5px;
  font-size: 14px;
  color: #0084e9;
}

.blue_tit {
  width: 1100px;
  height: 55px;
  background: #626e95;
  margin: auto;
}
.blue_tit img {
  width: 30px;
  height: 30px;
  margin-top: 12px;
  margin-left: 20px;
  float: left;
}
.blue_tit p {
  font-size: 18px;
  color: #fff;
  line-height: 55px;
}
.essential {
  width: 1100px;
  height: 55px;
  background: #fafafa;
  margin: auto;
  margin-top: 10px;
  display: flex;
  border-bottom: 1px solid #eaeaea;
}
.essential p {
  font-weight: 600;
  font-size: 14px;
  color: #282828;
  line-height: 55px;
  margin-left: 21px;
}
.essential p:nth-of-type(2) {
  font-size: 12px;
  color: #999999;
  font-weight: normal;
  margin-left: 5px;
  line-height: 55px;
}
.message {
  width: 1100px;
  background: #ffffff;
  margin: auto;
  margin-top: -10px;
}
.message ul {
  margin-left: 20px;
  overflow: hidden;
}
.message ul li {
  line-height: 32px;
  font-size: 14px;
  margin-top: 10px;
  color: #777;
}
.message ul li:nth-of-type(1) {
  margin-top: 18px;
}
.message ul li:last-of-type {
  margin-bottom: 18px;
}
.tour {
  width: 1100px;
  height: 55px;
  background: #fafafa;
  margin: auto;
  margin-top: 10px;
  border-bottom: 1px solid #eaeaea;
}
.tour p {
  line-height: 55px;
  font-size: 14px;
  color: #787878;
  margin-left: 15px;
}
.numbers {
  width: 1100px;
  // height: 153px;
  background: #fff;
  margin: auto;
  margin-bottom: 10px;
  overflow: hidden;
}

.merge {
  width: 1100px;
  height: 80px;
  margin: auto;
  margin-bottom: 10px;
}
.merge .el-button {
  width: 170px;
  margin-top: 20px;
  margin-left: 15px;
}
.interior {
  width: 1100px;
  height: 55px;
  background: #fafafa;
  margin: auto;
  margin-top: 10px;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 10px;
}
.interior p {
  line-height: 55px;
  font-size: 14px;
  color: #333333;
  margin-left: 10px;
}
.opinion {
  width: 1100px;
  height: 305px;
  background: #fff;
  margin-bottom: 10px;
  margin: auto;
  margin-top: -10px;
  overflow: hidden;
  margin-bottom: 10px;
}
.opinion p {
  margin-top: 60px;
  margin-left: 35px;
  font-size: 14px;
  float: left;
}
.right textarea {
  width: 981px;
  height: 130px;
  margin-top: 40px;
  margin-left: 15px;
  border: solid 1px #dedfe6;
}
.underside {
  width: 700px;
  height: 200px;
  margin-left: 198px;
}
.record {
  width: 1100px;
  height: 55px;
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  margin: auto;
  margin-bottom: 10px;
}
.record p {
  color: #333333;
  font-size: 14px;
  line-height: 55px;
  margin-left: 10px;
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

.eventual {
  width: 1100px;
  height: 55px;
  background: #fafafa;
  border-bottom: 1px dashed #e0e0e0;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  margin-top: -10px;
}
.eventual button {
  width: 70px;
  height: 20px;
  margin-left: 20px;
  margin-left: 92px;
  margin-top: 15px;
  background: #0486fe;
  border: none;
  color: #fff;
}
.eventual span:nth-of-type(1) {
  margin-left: 10px;
  line-height: 55px;
}
.eventual span:nth-of-type(2) {
  margin-left: 89px;
  line-height: 55px;
}
.tl {
  margin-left: 10px;
  color: #999999;
}

.disapprove {
  color: red;
}
.disapprove.pass {
  color: green;
}
.checkOffer {
  color: #2896eb;
  font-size: 14px;
  // margin-left: 258px;
  cursor: pointer;
}
.checkOffer:hover {
  color: #f91;
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
</style>