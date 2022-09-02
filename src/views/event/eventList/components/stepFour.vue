<template>
  <div class="step_four">
    <div class="flex_row align_center">
      <div class="stepName mar_b10">
        <strong>Step 6</strong>
        <span>会议报告 <em>Event Report&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</em></span>
      </div>
      <div class="showBase_tap flex_row align_center" @click="showTimeLineSix = !showTimeLineSix">
        <img :src="showTimeLineSix ? require('@/assets/images/close.png') : require('@/assets/images/open.png')" alt="" />
        <span>{{ showTimeLineSix ? '收起' : '展开' }}</span>
      </div>
    </div>
    <div v-show="showTimeLineSix" class="demand_part">
      <div class="purchase_demand bor_e2 mar_t10">
        <div class="purchase_demand_title flex_row justify_between align_center bor_b_e4 bg_fa">
          <p>费用概览</p>
          <el-button @click="savingDialog = true" class="mar_r20" size="small" type="text">下载实际 saving</el-button>
        </div>
        <div class="purchase_demand_main_body">
          <div class="report-box report-head clx">
            <div class="unit">
              <p class="term">初步预算</p>
              <p class="price">¥{{ this.Budget.TotalPrice }}</p>
            </div>
            <div class="unit">
              <p class="term">签约价格</p>
              <p class="price">¥{{ this.Budget.TotalPrice }}</p>
            </div>
            <div class="unit">
              <p class="term">实际总费用</p>
              <p class="price">{{ this.ActualOutlay.TotalPrice }}</p>
            </div>
            <div class="unit">
              <p class="term">合同价Saving</p>
              <p class="price">¥{{ this.ContractSaving.TotalPrice }}</p>
            </div>
            <div class="unit">
              <p class="term">实际费用Saving</p>
              <p class="price">{{ this.TotalPrice.TotalPrice }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="purchase_demand bor_e2 mar_t10">
        <div class="purchase_demand_title flex_row justify_between align_center bor_b_e4 bg_fa">
          <p>费用分布</p>
          <el-button @click="savingDialog = true" class="mar_r20" size="small" type="text">下载实际 saving</el-button>
        </div>
        <div class="purchase_demand_main_body">
          <Cost :Report="Report" />
        </div>
      </div>
      <div class="purchase_demand bor_e2 mar_t10">
        <div class="purchase_demand_title flex_row justify_between align_center bor_b_e4 bg_fa">
          <p>费用百分比</p>
          <el-button @click="savingDialog = true" class="mar_r20" size="small" type="text">下载实际 saving</el-button>
        </div>
        <div class="purchase_demand_main_body">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="初步预算" name="first">
              <div style="width: 100%;">
                <CostPercentagest :Report="Report" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="签约价格" name="second">
              <CostOne :Report="Report" />
            </el-tab-pane>
            <el-tab-pane label="实际总费用" name="third">
              <CostTwo :Report="Report" />
            </el-tab-pane>
            <el-tab-pane label="合同价Saving" name="fourth">
              <CostThree :Report="Report" />
            </el-tab-pane>
            <el-tab-pane label="实际费用Saving" name="six">
              <CostFour :Report="Report" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="savingDialog" width="30%" title="选择结算单" align="center">
      <span slot="footer" class="dialog-footer flex_row justify_center">
        <el-button size="small" @click="savingDialog = false">取 消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cost from '@/components/event/CostDistribution.vue';
import CostPercentagest from '@/components/event/costpercentage.vue';
import CostOne from '@/components/event/costcopyone.vue';
import CostTwo from '@/components/event/costcopytwo.vue';
import CostThree from '@/components/event/costcopyThree.vue';
import CostFour from '@/components/event/costcopyfour.vue';
export default {
	name: 'step_four',
	components: {
		Cost,
		CostPercentagest,
		CostOne,
		CostTwo,
		CostThree,
		CostFour
	},
	data() {
		return {
			activeName: 'second',
			savingDialog: false,
			showTimeLineSix: true,
			Report: [],
			SessionReport: [],
			TotalPrice: '',
			Budget: '',
			SignContract: '',
			ActualOutlay: '',
			ContractSaving: ''
		};
	},
	mounted() {
		// this.postSessionReport();
	},
	methods: {
		postSessionReport() {
      this.requestApi({
        url: '/MeetingMa/Report',
        method: 'post',
        data: { MeetingID: this.$route.query.id },
      }).then(res => {
        if (res) {
          this.Report = res;
          this.SessionReport = res;
          this.TotalPrice = this.SessionReport.ActualOutlaySaving.Price;
          this.Budget = this.SessionReport.Budget.Price;
          this.SignContract = this.SessionReport.SignContract.Price;
          this.ActualOutlay = this.SessionReport.ActualOutlay.Price;
          this.ContractSaving = this.SessionReport.ContractSaving.Price;
        }
      });
		},
		handleClick(tab, event) {}
	}
};
</script>
<style scoped lang="scss">
.step_four {
  height: 100px;
  margin-top: 20px;
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

.report-box {
  display: flex;
  padding: 24px 16px;
  justify-content: center;
}
.report-head .unit {
  // position: relative;
  // float: left;
  width: 186px;
  margin-left: 10px;
  padding: 10px 20px;
  box-sizing: border-box;
}
.report-head .term {
  font-size: 14px;
  color: #fff;
  line-height: 24px;
}
.report-head .price {
  font-size: 24px;
  color: #fff;
  line-height: 32px;
}
.report-head .unit:nth-child(2) {
  background: #a08bcd;
}
.report-head .unit:nth-child(3) {
  background: #5dbcb4;
}
.report-head .unit:nth-child(4) {
  margin-left: 46px;
  background: #637092;
}
.report-head .unit:nth-child(5) {
  background: #f8c644;
}
.report-head .unit:first-child {
  background: #68abe6;
  margin-left: 0;
}
</style>
