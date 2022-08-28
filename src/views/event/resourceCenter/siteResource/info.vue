<template>
	<div class="hotleInfo" v-if="info != null">
		<div class="section">
			<div class="header">
				<div class="left">
					<div class="name">{{ info.name }}</div>
					<!-- <div class="number">({{ info.number }})</div> -->
					<div class="address">{{ info.address }}</div>
					<div class="line">
						<p>
							<span>场地类型:</span> {{info.sitetype_name}}
						</p>
						<p>
							<span>客房数量：</span>
							{{ info.room_number }}间
						</p>
						<p>
							<span>双床房数量：</span>
							{{ info.double_bed_room_number }}间
						</p>
					</div>
					<div class="line">
						<p>
							<span>会议厅数量：</span>
							{{ info.venue_number }}个
						</p>
						<p>
							<span>最大厅面积：</span>
							{{ info.venue_max_area }}平方米
						</p>
						<p>
							<span>最大厅容纳：</span>
							{{ info.venue_max_people_number }}人
						</p>
					</div>
					<div class="line">
						<p>
							<span>开业时间：</span>
							{{ info.opening_time }}
						</p>
						<p>
							<span>最近装修：</span>
							{{ info.recent_decoration }}
						</p>
						<p>
							<span>最低餐标：</span>
							{{ info.minimum_meal_standard }}
						</p>
					</div>
					<div class="other">
						<i class="el-icon-phone"></i>
						{{ info.telephone }} {{ info.contacts }}

						<div class="hotel_operating">
							<span class="iconfont" @click="onCollection">
								<i v-if="info.iscollection == 0" class="el-icon-star-off" :key="0"></i>
								<i v-else class="el-icon-star-on" :key="1"></i>
								{{info.iscollection==1?"收藏":"未收藏"}}
							</span>
						</div>
					</div>
				</div>
				<div class="right">
					<img :src="info.coverpicture" alt />
				</div>
			</div>
			<div class="bottom">
				<div class="main">
					<!-- <div ref="tabs">
						<div ref="tabs_child"> -->
					<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
						<el-tab-pane :label="`会议厅信息(${info.conferencelist.length}个)`" name="anchorlink_conference"></el-tab-pane>
						<el-tab-pane label="客房信息" name="anchorlink_room"></el-tab-pane>
						<el-tab-pane label="酒店信息" name="anchorlink_hotel"></el-tab-pane>
					</el-tabs>
					<!-- 	</div>
					</div> -->

					<div id="anchorlink_conference" class="title">会议厅信息</div>
					<table>
						<thead>
							<tr class="color_2">
								<th rowspan="2" width="170">图片效果</th>
								<th rowspan="2" width="130">会议室名称</th>
								<th rowspan="2">
									面积
									<br />(㎡)
								</th>
								<th rowspan="2">
									层高
									<br />(㎡)
								</th>
								<th rowspan="2">
									是否
									<br />有柱
								</th>
								<th rowspan="2" class="th-width">
									最多可
									<br />容纳人数
								</th>
								<th colspan="6">会议厅布局及容纳人数</th>
								<th rowspan="2" width="130">
									市场参考价
									<br />
									<span>酒店挂牌价格</span>
								</th>
								<th rowspan="2" class="price-th">
									企业
									<br />协议价
								</th>
								<th rowspan="2">折扣</th>
							</tr>
							<tr class="color_2">
								<th>
									<img src="@/assets/images/1.gif" alt />
								</th>
								<th>
									<img src="@/assets/images/2.gif" alt />
								</th>
								<th>
									<img src="@/assets/images/3.gif" alt />
								</th>
								<th>
									<img src="@/assets/images/4.gif" alt />
								</th>
								<th>
									<img src="@/assets/images/5.gif" alt />
								</th>
								<th>
									<img src="@/assets/images/6.gif" alt />
								</th>
							</tr>
						</thead>
						<tbody v-for="(item) in info.conferencelist" :key="item.id">
							<tr>
								<td rowspan="2">
									<!-- <img src="../../assets/images/huanxi_icon.png" style="width: 90px; height: 90px" /> -->
									<img :src="item.piclist.length?item.piclist[0].pic:require('../../assets/images/meeting.jpg')" style="width: 165px; height: 120px" />
								</td>
								<td rowspan="2">
									{{ item.name }}
								</td>
								<td>{{ item.area }}</td>
								<td>{{ item.floor_height }}</td>
								<td>{{ item.iscolumn }}</td>
								<td>{{ item.capacity }}</td>
								<td>{{ item.swing_table_theater?item.swing_table_theater:'-' }}</td>
								<td>{{ item.swing_table_desk?item.swing_table_desk:'-' }}</td>
								<td>{{ item.swing_table_group?item.swing_table_group:'-' }}</td>
								<td>{{ item.swing_table_u_shaped?item.swing_table_u_shaped:'-' }}</td>
								<td>{{ item.swing_table_zigzag?item.swing_table_zigzag:'-' }}</td>
								<td>{{ item.swing_table_banquet?item.swing_table_banquet:'-' }}</td>
								<td rowspan="2">
									<p>
										<span>¥{{ item.reference_price }}</span>/全天
									</p>
									<!-- <p>
                    <span>¥30000</span>/全天
                  </p>-->
								</td>
								<td rowspan="2">暂无</td>
								<td rowspan="2">暂无</td>
							</tr>
							<tr>
								<td colspan="10" style="text-align: left;">{{ item.iswindowed }} 楼层：{{ item.floor }}楼 形状：{{ item.shape }} 长*宽：{{ item.length_and_width }}</td>
							</tr>
							<!-- <tr v-if="item.piclist.length != 0">
								<td colspan="14" class="color_4">
									<el-image style="width: 150px; height: 150px" v-if="itemc in item.piclist" :src="itemc.pic" :preview-src-list="item.piclist"></el-image>
									
								</td>
							</tr> -->
						</tbody>
					</table>
					<div id="anchorlink_room" class="title">客房信息</div>
					<table>
						<thead>
							<tr class="color_2">
								<th>房型</th>
								<th>床型</th>
								<th>面积（㎡）</th>
								<th>数量（间）</th>
								<th>早餐</th>
								<th>宽带</th>
								<th>团队参考价</th>
								<th>企业协议价</th>
								<th>折扣</th>
							</tr>
						</thead>
						<tbody v-for="item in info.roomlist" :key="item.id">
							<tr>
								<td>{{ item.roomtype }}</td>
								<td>{{ item.bedtype }}</td>
								<td>{{ item.area }}</td>
								<td>{{ item.quantity }}</td>
								<td>{{ item.isbreakfast?item.isbreakfast:'-' }}</td>
								<td>{{ item.isbroadband?item.isbroadband:'-' }}</td>
								<td class="price-color">{{ item.reference_price }}</td>
								<td>暂无</td>
								<td>暂无</td>
							</tr>
						</tbody>
					</table>
					<div id="anchorlink_hotel" class="title">酒店信息</div>
					<div class="stitle">酒店简介</div>
					<table class="table-hotel" border="1">
						<tr>
							<th>开业时间</th>
							<td>{{info.opening_time}}</td>
						</tr>
						<tr>
							<th>最近装修时间</th>
							<td>{{info.recent_decoration}}</td>
						</tr>
						<tr>
							<th>酒店简介</th>
							<td>{{info.hotel_profile}}</td>
						</tr>
					</table>
					<div class="stitle">酒店及会议设施</div>
					<table class="table-hotel" border="1">
						<tr>
							<th>酒店设施和服务</th>
							<td>{{info.facilities}}</td>
						</tr>
						<tr>
							<th>酒店餐饮设施</th>
							<td>{{info.restaurant}}</td>
						</tr>
						<tr>
							<th>客房设施和服务</th>
							<td>{{info.room_facilities}}</td>
						</tr>
					</table>
					<!-- <div class="item_s">
						<span>酒店设施和服务</span>
						<p class="info-hotel">{{ info.facilities }}</p>
					</div>
					<div class="item_s">
						<span>酒店餐饮设施</span>
						<p class="info-hotel">{{ info.restaurant }}</p>
					</div>
					<div class="item_s">
						<span>客房设施和服务</span>
						<p class="info-hotel">{{ info.room_facilities }}</p>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/**
	 * @page 酒店详情
	 */
	export default {
		data() {
			return {
				info: null,
				activeName: "0",
				isOpen: false,
			};
		},
		computed: {

		},
		methods: {
			onCollection() {
				console.log(this.info.iscollection)
				if (this.info.iscollection) {
					this.$api.cancelcollection({
						id: this.info.id,
					}, "POST").then((res) => {
						//  this.$notify({
						//     title: "成功",
						//     message: "取消收藏",
						//     type: "success",
						//     offset: 100
						// });
						this.info.iscollection = 0;
					});
				} else {
					this.$api.collection({
						id: this.info.id,
					}, "POST").then((res) => {
						// this.$notify({
						//     title: "成功",
						//     message: "收藏成功",
						//     type: "success",
						//     offset: 100
						// });
						this.info.iscollection = 1;
					});
				}
			},
			handleClick(tab, event) {
				// console.log(tab, event);
				document.getElementById(tab.name).scrollIntoView({
					block: 'start',
					behavior: 'smooth'
				})
			},
			open() {
				this.info.conferencelist.forEach((val, index) => {
					val["openClose"] = 'name'
					console.log(this.info)
				})
			},
			close(val) {
				console.log(val)
			}
		},
		mounted() {
			let _this = this

			/* document.addEventListener('scroll', function() {
				if (window.pageYOffset > _this.$refs.tabs.offsetTop) {
					_this.$refs.tabs_child.style.position = 'fixed'
					_this.$refs.tabs_child.style.top = '0px'

				} else {
					_this.$refs.tabs_child.style.position = 'static'
				}
			}); */
			this.$api.hotelInfo({
				id: this.$route.params.id
			}, "POST").then((res) => {
				this.info = res
				this.info.facilities=this.info.facilities.replace(/,/g," ")
				this.info.restaurant=this.info.restaurant.replace(/,/g," ")
				this.info.room_facilities=this.info.room_facilities.replace(/,/g," ")
				this.open()
			});
		},
	};
</script>

<style lang="scss" scoped>
	.title {
		font-size: 18px;
	}
	.table-hotel{
		margin-top: 5px;
	}
	.table-hotel>tr>th {
		width: 150px;
		background-color: #fafafa;
		color: gray;
		vertical-align: top;
		text-align: left;
		padding: 15px 0 0 24px;
	}

	.table-hotel>tr>td {
		color: #0d0d0d;
		padding: 16px 120px 15px 31px;
		text-align: left;
	}

	.price-color {
		color: #f90;
	}

	.info-hotel {
		color: #666;
	}

	.openOrClose {
		cursor: pointer;
		display: flex;
	}

	.price-th {
		width: 62px;
	}

	.th-width {
		width: 76px;
	}

	.hotleInfo {
		.section {
			width: 1200px;
			margin: 20px auto;
			padding: 5px 15px;
			box-sizing: border-box;
		}

		.header {
			display: flex;

			.left {
				flex: 1;

				.name {
					font-size: 28px;
					font-weight: bold;
					margin-bottom: 10px;
				}

				.number {
					font-size: 14px;
					color: #cdc1c1;
					margin-bottom: 5px;
				}

				.address {
					padding-bottom: 15px;
					margin-bottom: 15px;
					border-bottom: 1px dotted #cdc1c1;
				}

				.line {
					display: flex;
					margin-bottom: 10px;

					p {
						flex: 1;

						span {
							display: inline-block;
							width: 90px;
							color: #a69999;
						}
					}
				}

				.other {
					margin-top: 24px;
					font-size: 20px;
					color: #ff9900;

					.hotel_operating {
						float: right;

						.iconColor {
							color: #fa7a7a;
						}

						.iconfont {
							cursor: pointer;
						}
					}
				}
			}

			.right {
				width: 300px;
				margin-left: 15px;

				img {
					width: 100%;
					height: 250px;
					object-fit: cover;
				}
			}
		}
	}

	.bottom {
		display: flex;
		margin-top: 40px;
		margin-bottom: 40px;
		.main {
			flex: 1;

			.title {
				border-left: 5px solid #0066cc;
				padding-left: 15px;
				line-height: 30px;
				margin-top: 30px;
				background-color: #eee;
			}
		}
	}

	table {
		box-sizing: border-box;
		border-collapse: collapse;
		table-layout: fixed;
		width: 100%;
		margin-top: 15px;
		border: 1px solid #dddddd;

		tr,
		td,
		th {
			text-align: center;
			border-bottom: 1px solid #dddddd;
			padding: 10px;
			box-sizing: border-box;

			input {
				border: 1px solid #ccc;
				width: 100%;
				line-height: 30px;
				border-radius: 5px;
				color: #0066cc;
				padding: 0 10px;
				box-sizing: border-box;
			}

			.radio {
				display: inline-block;
				width: 20px;
			}

			.line {
				display: inline-block;
				width: 60%;
				margin: 0 10px;
			}

			span {
				color: #999999;
				font-size: 14px;
			}

			p {
				span {
					color: #ff9900;
					font-size: 16px;
				}
			}
		}

		.topleft {
			text-align: left;
		}

		.color_1 {
			background-color: #dff0d8;
			font-size: 16px;
		}

		.color_2 {
			background-color: #f5f5f5;
		}

		.color_3 {
			background-color: #e6e6e6;
		}

		.color_4 {
			background-color: #f2f2f2;
		}
	}

	.stitle {
		font-size: 16px;
		margin-top: 15px;
	}

	.item_s {
		line-height: 30px;
		display: flex;
		width: 100%;
		border-bottom: 1px solid #e4e4e4;

		span {
			display: inline-block;
			width: 150px;
			font-weight: bold;
		}
	}
</style>
