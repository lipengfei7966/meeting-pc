<template>
	<div class="all">
		<div class="head">
			<div>
				<svg t="1634969360927" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2424"
				 width="20" height="20">
					<path d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667 85.333333 747.637333 85.333333 512 276.362667 85.333333 512 85.333333z m182.613333 297.354667a32 32 0 0 0-45.258666 0.032L458.922667 573.44l-84.341334-83.989333a32 32 0 0 0-45.162666 45.344l106.986666 106.549333a32 32 0 0 0 45.226667-0.064l213.013333-213.333333a32 32 0 0 0-0.032-45.258667z"
					 p-id="2425" fill="#6DCA3A"></path>
				</svg>
				<span>询价单发送成功！</span>
			</div>
			<div>
				<span>服务商已收到短信和邮件提醒，会第一时间给您回复报价。</span>
			</div>
			<div>
				<el-button @click="gotoinfo">回到会议详情页</el-button>
			</div>
		</div>
		<div class="foot" v-if='false'>
			<div>已发送给下列服务商</div>
			<div>
				<div>
					<img src="https://cdn.hotelgg.com/dev/dmc/admin/common/7a53b49b1fab2d6ffc67ef6882248d16.png" alt="">
				</div>
				<div>
					<div>
						<span>国旅国际会议展览有限公司</span>
					</div>
					<div>
						<span>服务范围:</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {


			};
		},
		components: {},
		mounted() {

		},
		methods: {
			//返回会议详情
			gotoinfo() {
				this.$router.push({path:'/EventDetail',query:{id: this.$route.params.id}})
    		}
		},
	};
</script>

<style lang="scss" scoped>
	.all {
		text-align: center;
		background-color: #f2f4f8;
		overflow: hidden;
	}

	.head {
		background: #e2f3fe;
		border: 1px solid #aedcfa;
		padding: 20px 0;
		border-radius: 2px;
		width: 1100px;
		margin: 20px auto;
	}

	.head>div:nth-of-type(1) {
		font-size: 18px;
		color: #282828;
		margin: 0 0 10px 0;
	}
	.head>div:nth-of-type(1) >svg{
		margin: auto 5px auto 0;
		vertical-align:middle ;
	}
	.head>div:nth-of-type(2) {
		font-size: 12px;
		color: #777;
		line-height: 20px;
		margin: 0 0 10px 0;
	}

	.head>div:nth-of-type(3)>button {
		display: inline-block;
		border-radius: 2px;
		background: #2896eb;
		color: #fff;
		font-size: 14px;
	}

	.head>div:nth-of-type(3)>button:hover {
		background: #299df5;
	}

	.foot {
		width: 1100px;
		background: #fff;
		margin: 0 auto 40px auto;
		text-align: left;
	}

	.foot>div:nth-of-type(1) {
		color: #282828;
		font-size: 14px;
		font-weight: 600;
		background: #fafafa;
		padding: 15px 20px;
		border-bottom: 1px solid #eaeaea;
	}

	.foot>div:nth-of-type(2) {
		max-height: 400px;
		overflow: auto;
		padding: 0 0 20px 0;
	}

	.foot>div:nth-of-type(2)>div {
		float: left;
	}

	.foot>div:nth-of-type(2)>div:nth-of-type(1) {
		margin: 20px 20px 0 30px;
	}

	.foot>div:nth-of-type(2)>div:nth-of-type(2) {
		margin: 20px 0 0 0;
		padding: 5px;
	}

	.foot>div:nth-of-type(2)>div>img {
		width: 60px;
		height: 60px;
	}

	.foot>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(1) {
		font-size: 14px;
		line-height: 20px;
		color: #282828;
	}

	.foot>div:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(2) {
		font-size: 14px;
		line-height: 20px;
		color: #787878;
	}
</style>
