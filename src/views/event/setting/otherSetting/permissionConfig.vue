<template>
	<div>
		<div class="permission_header">
			<el-button class="add_button" type="primary" @click="addPermission">新增用户组</el-button>
		</div>

		<el-table :data="tableInfo.EvetModels" style="width: 100%">
			<el-table-column align="left" prop="group_user_name" label="用户组名称" width="160"></el-table-column>
			<el-table-column align="center" label="组内用户" width="180">
				<template slot-scope="scope">
					<div @click="member(scope.$index, scope.row)" style="color:blue; cursor:pointer">{{scope.row.counts}}</div>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="group_user_type" label="类型" width="180"></el-table-column>
			<el-table-column align="center" prop="group_user_remarks" label="备注" width="180"></el-table-column>
			<el-table-column align="right" label="操作" width="420">
				<template slot-scope="scope">
					<el-button @click="edit(scope.$index, scope.row)" size="mini" type="primary">编辑</el-button>
					<el-button @click="member(scope.$index, scope.row)" size="mini" type="primary">组员管理</el-button>
					<el-button v-if="scope.row.grouptype != 1" @click="customer(scope.$index, scope.row)" size="mini" type="primary">客户权限</el-button>
					<el-button v-if="scope.row.grouptype != 1"  @click="report(scope.$index, scope.row)" size="mini" type="primary">报表权限</el-button>
					<el-button @click="del(scope.$index, scope.row)" size="mini" >删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			v-if="tableInfo.EvetModels.length"
			@current-change="currentChange"
			style="margin-top:30px; width: 100%; text-align: center;"
			:current-page="pageIndex"
			:page-size="pageSize"
			background layout="total, prev, pager, next"
			:total="tableInfo.pageInfo.totalCount">
		</el-pagination>
	</div>
</template>

<script>


export default {
    components: { },
    data: function(){
        return {
			pageIndex: 1,
			pageSize: 10,
			tableInfo: {
				EvetModels: [],
				pageInfo: {
					totalCount: 0
				}
			},
		}
			
    },
	mounted(){
		this.getList();
	},
    methods: {
		getList() {
			this.requestApi({
				url: '/UserGroupmanagement/GetUserGroupList',
				method: 'POST',
				data: {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				},
			}).then(res => {
				this.tableInfo = res || this.tableInfo;
			})
		},
		// 添加组
		addPermission() {
			this.$router.push({
				name:'addeditUsergroup',
				query: {
					// id: data.id,
					// back: 'approveSetting'
				}
			});
		},
		// 编辑组
		edit(index, row) {
			this.$router.push({
				name:'addeditUsergroup',
				query: {
					id: row.id
				}
			});
		},
		// 组员管理
		member(index, row) {
			this.$router.push({
				name:'membermanage',
				query: {
					id: row.id
				}
			});
		},
		// 客户管理
		customer(index, row) {
			this.$router.push({
				name:'customermanage',
				query: {
					id: row.id
				}
			});
		},
		// 报表管理
		report(index, row) {
			this.$router.push({
				name:'reportmanage',
				query: {
					id: row.id
				}
			});
		},
		// 删除组
		del(index, row) {
			this.$confirm('请确认是否执行删除操作?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.requestApi({
					url: '/UserGroupManagement/DeleteUserGroupDate',
					method: 'POST',
					data: {
						usergroup_id: row.id
					},
				}).then(res => {
					this.$message.success('删除成功');
					this.pageIndex = 1;
					this.pageSize = 10;
					this.getList() 
	
				}).catch(() => {
					
				});
			});
			
		},
		currentChange(page) {
			this.pageIndex = page;
			this.getList();
		},
		
    }
}
</script>


<style lang="scss">
.permission_header {
	text-align: right;
	.add_button {
		margin-right: 100px;
	}
}


</style>
