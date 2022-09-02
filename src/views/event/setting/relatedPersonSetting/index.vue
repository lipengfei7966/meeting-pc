<template>
	<div class="approve-page">
		<div class="approve-page-body">
			<div class="centerBox">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }" class="el-breadcrumb-item">
						首页
						<!-- <span class="rights">></span> ···· -->
					</el-breadcrumb-item>
					<el-breadcrumb-item class="el-bread-item">会议相关人员配置</el-breadcrumb-item>
				</el-breadcrumb>
				<el-tabs type="border-card" v-model="activeName">
					<el-tab-pane label="采购人员配置" name="first">
						<distribution></distribution>
					</el-tab-pane>

					<el-tab-pane label="会议负责人配置" name="second">
						<principal></principal>
					</el-tab-pane>

					<el-tab-pane label="会议助理配置" name="third">
						<assistant></assistant>
					</el-tab-pane>

					<el-tab-pane label="会议合规人员配置" name="fourth">
						<compliance></compliance>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
import distribution from "./procurement/distributionList";
import principal from "./header/meetingPrincipalList";
import assistant from "./assistant/assistantList";
import compliance from "./compliance/complianceList";

export default {
    components: { distribution, principal,assistant, compliance},
    data: function(){
        return {
					activeName: this.$route.query.activeName || 'first'
        }
    },
		mounted(){
		},
    methods: {

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

.el-tabs--border-card{
	margin-top: 10px;
}

@media only screen and (max-width: 1500px) {
	.approve-page{
		width: 100%;
	}
	.approval-box{
		width: 95% !important;
	}
}
</style>
