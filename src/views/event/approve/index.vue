<template>
  <div class="approve-page">
    <div class="approve-page-body">
      <div class="centerBox">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }" class="el-breadcrumb-item">
            首页
            <!-- <span class="rights">></span> ···· -->
          </el-breadcrumb-item>
          <el-breadcrumb-item class="el-bread-item">我的审批</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs type="border-card">
          <el-tab-pane label="旅行社/酒店结算审批">
            <span slot="label">
              <el-badge :value="travelAwaitCount" :hidden="travelAwaitCount == 0" class="item">
                旅行社/酒店结算审批
              </el-badge>
            </span>
            <travel @travelAwaitCount="travelAwaitCountFn"></travel>
          </el-tab-pane>
          <el-tab-pane label="中标审批">
            <span slot="label">
              <el-badge :value="biddingAwaitCount" :hidden="biddingAwaitCount == 0" class="item">
                中标审批
              </el-badge>
            </span>
            <bidding @biddingAwaitCount='biddingAwaitCountFn'></bidding>
          </el-tab-pane>

        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import bidding from "../approve/bidding";
import travel from "../approve/travel";

export default {
	components: { bidding, travel },
	data() {
		return {
			biddingAwaitCount: 0,
			travelAwaitCount: 0
		};
	},
	methods: {
		// 中标待审批数量
		biddingAwaitCountFn(data){
			this.biddingAwaitCount = data
		},
		// 结算待审批数量
		travelAwaitCountFn(data){
			this.travelAwaitCount = data
		}
	},
	mounted() {},
};
</script>

<style lang="scss">
.approve-page {
  margin: 0 auto;
  width: 1260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .approve-page-body {
    width: 100%;
    height: 44px;
    display: flex;
    .centerBox {
      width: 100%;
      padding-top: 60px;
      .el-tabs.el-tabs--top.el-tabs--border-card > .el-tabs__header.is-top {
        .el-tabs__nav-scroll {
          // height: 55px;
          padding: 16px 20px 0;
          background-color: #626e95;
          .el-tabs__nav {
            background-color: #7b85a6;
            color: #fff;
            border-radius: 4px 4px 0 0;
            .el-tabs__item.is-top {
              color: #fff;
            }
            .el-tabs__item.is-top.is-active {
              color: #999;
            }
          }
        }
      }

      .el-breadcrumb-item {
        color: #0084e9;
        font-size: 14px;
        margin-top: 18px;
      }
      .rights {
        color: #7c7f82;
        font-size: 14px;
        margin-left: 10px;
        margin-top: -10px;
      }
      .el-bread-item {
        font-size: 14px;
        color: #7c7f82;
        margin-left: 6px;
        margin-top: 18px;
      }
      .el-tab-pane {
        margin-top: 5px;
      }
    }
  }
  .el-badge__content.is-fixed {
    position: relative;
    transform: translateY(10%) translateX(100%);
  }
}
.el-tabs--border-card {
  margin-top: 10px;
}
@media only screen and (max-width: 1500px) {
  .approve-page {
    width: 100%;
  }
}
</style>
