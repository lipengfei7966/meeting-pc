<template>
  <div class="approve-page">
    <div class="approve-page-body">
      <div class="centerBox">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }" class="el-breadcrumb-item">
            首页
            <!-- <span class="rights">></span> ···· -->
          </el-breadcrumb-item>
          <el-breadcrumb-item class="el-bread-item">其他配置</el-breadcrumb-item>
        </el-breadcrumb>

        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane name="first" label="部门-会议类型设置">
            <approval></approval>
          </el-tab-pane>

          <el-tab-pane name="second" label="报价结算规则配置">
            <quotationSettlement></quotationSettlement>
          </el-tab-pane>

          <el-tab-pane name="third" label="DMC-用户绑定配置">
            <DMCuserbind></DMCuserbind>
          </el-tab-pane>

          <el-tab-pane name="fourth" label="消息通知配置">
            <message></message>
          </el-tab-pane>

          <el-tab-pane name="fifth" label="会议附加信息配置">
            <otherMessage></otherMessage>
          </el-tab-pane>
          <el-tab-pane name="sixth" label="数据权限配置">
            <permissionConfig></permissionConfig>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import approval from './approval'
import quotationSettlement from './quotationSettlementSetting'
import DMCuserbind from './DMCuserbind'
import message from './messageSetting'
import permissionConfig from './permissionConfig'
import otherMessage from './otherMessageSeeting'

export default {
  components: { approval, DMCuserbind, message, quotationSettlement, otherMessage, permissionConfig },
  data: function() {
    return {
      activeName: 'first'
    }
  },
  methods: {},
  mounted() {
    if (this.$route.params.activeName) {
      this.activeName = this.$route.params.activeName //选项卡的页数、第几页
    }
  }
}
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
          height: 39px;
          padding: 16px 20px 0;
          background-color: #626e95;
          box-sizing: content-box;
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
}

.el-tabs--border-card {
  margin-top: 10px;
}

@media only screen and (max-width: 1500px) {
  .approve-page {
    width: 100%;
  }
  .content {
    width: 95% !important;
  }
  .el-col-6 {
    width: 40%;
  }
  .el-col-8 {
    width: 60.33333%;
  }
}
</style>
