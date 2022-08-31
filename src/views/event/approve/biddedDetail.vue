<template>
  <div>
    <div class="boss">
      <ul>
        <el-button type="text" @click="$router.replace('approve')">中标审批</el-button>
        <li style="color: #7c7f82">></li>
        <li style="color: #7c7f82">中标审批详情</li>
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
        <el-table-column prop="company_name" label="旅行社名称 Travel Agency Name" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <span> {{scope.row.company_name}}</span>
          </template>
        </el-table-column>
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
			menus:[],
			arr:[],
			num:[],
			selectQuery:{},
		};
	},
	components:{
		basePart
	},
	mounted() {
		this.selectQuery = this.$route.query;
	  this.store()
	},
	methods: {
		checkOffer(foreign_key_id) {
			this.$router.push({
        name: 'offer',
				// path: '/offer',
				query: {
					foreign_key_id: foreign_key_id,
					id: this.$route.query.id,
					type: this.$route.query.type,
				}
			})
		},

	   //中标审批会议详情
	   store(){
      this.requestApi({
        url: '/MeetingMa/TouristAgencyQuotedPrice',
        method: 'POST',
        data: { ApproveID: this.selectQuery.ApproveID, },
      }).then((res)=>{
			   console.log(res);
			   this.arr=res.approve;
			   this.num=res.inquirySheet;
		   })
	   }



	}
};
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
.one {
  width: 1060px;
  height: 70px;
  border-bottom: 1px solid #e4e4e4;
  margin-left: 13px;
}
.one p {
  float: left;
  line-height: 70px;
}

.two {
  width: 1060px;
  height: 70px;

  margin-left: 13px;
}
.two p {
  float: left;
  line-height: 70px;
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
  width: 80px;
  height: 20px;
  margin-left: 20px;
  margin-left: 181px;
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
  margin-left: 126px;
  line-height: 55px;
}
.eventual span:nth-of-type(4) {
  margin-left: 82px;
  line-height: 55px;
  margin-left: 381px;
}
.eventual span:nth-of-type(3) {
  margin-left: 20px;
  line-height: 55px;
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
.checkOffer {
  color: #2896eb;
  font-size: 14px;
  // margin-left: 221px;
  cursor: pointer;
}
.checkOffer:hover {
  color: #f91;
}
</style>
