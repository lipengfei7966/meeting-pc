<template>
	<div class="approve-page">
		<div class="approve-page-body">
			<div class="centerBox">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }" class="el-breadcrumb-item">
						首页
						<!-- <span class="rights">></span> ···· -->
					</el-breadcrumb-item>
					<el-breadcrumb-item class="el-bread-item">审批流配置</el-breadcrumb-item>
				</el-breadcrumb>
				<el-tabs v-model="tabIndex" @tab-click="handleClick" type="border-card">
					<el-tab-pane label="中标审批流配置" >
						<outbid ref="outbid" ></outbid>
					</el-tab-pane>

					<el-tab-pane label="结算审批流配置" >
						<settlementSheet ref="settlementSheet"></settlementSheet>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
// import outbid from "../outbid/outbid";
// import settlementSheet from "./settlementSheet";
import settlementSheet from "./settlement_approval";
import outbid from "./settlement_approval";
import requestApi from '@/utils/requestData'

export default {
    components: { outbid, settlementSheet },
    data: function(){
        return {
			tabIndex: ''
        }
    },
    methods: {
		handleClick() {
			if(this.tabIndex == 0) {
				this.$refs.outbid.searchTableData(2);
			}
			if(this.tabIndex == 1) {
				this.$refs.settlementSheet.searchTableData(1);
			}
			
		}
    },
	mounted() {
		this.$refs.outbid.searchTableData(2);
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
	.content{
		width: 85%;
	}
}
</style>
