<template>
	<div>
		<div style="padding-top: 40px;" class="approve-page-body">
			<div class="centerBox">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }" class="el-breadcrumb-item">
						首页
					</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/otherSettings' }" class="el-bread-item">
						其他配置
					</el-breadcrumb-item>
					<el-breadcrumb-item class="el-bread-item">
						报表权限
					</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>	

		<div class="search_area">
			<div style="display:flex; align-items:center;">
				<div style="width:130px;">会议台账名称</div>
				<el-input v-model="reportname" placeholder="输入报表名称模糊查询" size="mini" type="text"></el-input>
			</div>
			<el-button @click="query" type="primary" size="mini" style="margin-left:20px;">查询</el-button>
			<el-button @click="reset" size="mini" style="margin-left:20px;">重置</el-button>
			<el-button @click="addUser" type="primary" size="mini" style="margin-left:80px;">添加报表权限</el-button>
			<el-button @click="batchDel" type="primary" size="mini" style="margin-left:20px;">批量移除报表权限</el-button>
    	</div>

		<el-table
			ref="multipleTable"
			:data="tableInfo.EvetModels"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="userSelection">
				<el-table-column
				type="selection"
				width="55">
				</el-table-column>

				<el-table-column
				prop="name"
				label="报表名称"
				width="180">
				</el-table-column>

				<el-table-column
				prop="group_user_name"
				label="所属用户组"
				width="160">
				</el-table-column>

				<el-table-column label="操作" width="260">
					<template slot-scope="scope">
						<el-button size="mini" @click="delUser(scope.$index, scope.row)">移除报表权限</el-button>
					</template>
				</el-table-column>

		</el-table>

		<el-pagination
			v-if="tableInfo.EvetModels.length"
			:hide-on-single-page="true"
			@current-change="currentChange"
			style="margin-top:30px; width: 100%; text-align: center;"
			:current-page="pageIndex"
			:page-size="pageSize"
			background layout="total, prev, pager, next"
			:total="tableInfo.pageInfo.totalCount">
		</el-pagination>


		<el-dialog
			title="请选择"
			:visible.sync="dialogVisible"
			width="70%"
			:before-close="handleClose">
			
			<div class="grid_content">
				<div class="search_condition">
					<div style="display:flex; align-items:center;">
						<div style="width:130px;">会议台账名称</div>
						<el-input v-model="grid.reportname" size="mini" type="text"></el-input>
					</div>
					<el-button style="margin-left: 20px;" type="primary" size="mini" @click="queryGrid">查询</el-button>
				</div>
				<div class="search_result">
					<el-table
						ref="gridMultipleTable"
						:data="gridResult.EvetModels"
						tooltip-effect="dark"
						height="250"
						style="width: 100%;"
						@selection-change="handleSelectionChange">
							<el-table-column
							type="selection"
							width="55">
							</el-table-column>

							<el-table-column
							prop="name"
							label="报表名称"
							width="180">
							</el-table-column>
							
					</el-table>
				</div>

			</div>

			<span slot="footer" style="display: flex; justify-content: center;" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="saveGrid">确 定</el-button>
			</span>
		</el-dialog>
		
	</div>
</template>

<script>


export default {
    data: function(){
        return {
			id: '',
			reportname: '',
			pageIndex: 1,
			pageSize: 10,
			tableInfo: {
				EvetModels: [],
				pageInfo: {
					totalCount: 0
				}
			},
			batchList: [],

			dialogVisible: false,
			grid: {
				reportname: ''
			},
			gridResult: { 
				EvetModels: []
			},
			chooseList: []
			
        }
    },
	mounted() {
		this.id = this.$route.query.id;
		this.getReportGroupList();
	},
    methods: {
		// 获取列表数据
		getReportGroupList() {
			this.$api.GetReportGroupList({
				usergroup_id: this.id,
				reportname: this.reportname,
				pageIndex: this.pageIndex,
				pageSize: this.pageSize
			},'POST').then(res => {
				this.tableInfo = res;
			});
		},
		// 全选按钮
		userSelection(row) {
			this.batchList = row;
		},
		query() {
			this.getReportGroupList();
		},
		// 重置查询
		reset() {
			this.reportname = '';
			this.pageIndex = 1;
			this.pageSize = 10;
			this.getReportGroupList();
		},
		// 批量删除
		batchDel() {
			if(!this.batchList.length) {
				this.$message.success('未选中需要操作的记录！');
				return false;
			}
			this.$confirm('是否将选中报表权限移除？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
        	}).then(() => {
				let users = [];
				this.batchList.forEach(element => {
					users.push(element.reportid);
				});
				this.$api.DeleteReportDate({
					usergroup_id: this.id,
					reportid: users.join(',')
				},'POST').then(res => {
					if(res) {
						this.$message.success('删除成功');
					}
					this.batchList = [];
					this.reset();
				});

			});		

			
		},
		delUser(index, row) {
			this.$confirm('是否将当前报表权限移除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
        	}).then(() => {
				this.$api.DeleteReportDate({
					usergroup_id: this.id,
					reportid: row.reportid
				},'POST').then(res => {
					if(res) {
						this.$message.success('删除成功');
					}
					this.reset();
				});
			});	


			
		},
		currentChange(page) {
			this.pageIndex = page;
			this.getReportGroupList();
		},
		
		getUserlist(isShow) {
			this.$api.GetReportList(this.grid, 'POST').then(res => {
				res.EvetModels = res.EvetModels.map(item => {
					item.chooseSave = 0;
					return item;
				});
				this.gridResult = res;

				
				if(isShow) {
					this.dialogVisible = true;
				}
			});


		},
		addUser() {
			this.getUserlist(true);
		},
		handleSelectionChange(list) {
			this.chooseList = list;
		},
		queryGrid() {
			this.getUserlist();
		},
		handleClose() {
			this.resetSearch();
			this.dialogVisible = false;
		},
		resetSearch() {
			this.grid = {
				reportname: ''
			};
			this.chooseList = [];
		},
		saveGrid() {
			if(!this.chooseList.length) {
				this.$message.success('请先选择报表');
				return false;
			}

			let users = [];
			this.chooseList.forEach(element => {
				users.push(element.id);
			});
			this.$api.PostReportList({
				usergroup_id: this.id,
				reportid: users.join(',')
			},'POST').then(res => {
				this.$message.success(res.info);

				this.handleClose();
				this.reset();

			});
		}
		
    }
}
</script>


<style lang="scss">
.search_area {
	display: flex;
	padding: 40px 80px;
}


.grid_content {
	height: 330px;
}
.search_condition {
	display: flex;
	padding-bottom: 20px;
}
.search_result {
	padding-bottom: 20px;
}
</style>
