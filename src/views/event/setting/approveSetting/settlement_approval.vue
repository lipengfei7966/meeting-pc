<template>
	<div>
		<div class="settle_header">
			<el-button class="add_button" type="primary" @click="addSettle">{{type == 1 ? '新增结算审批规则' : '新增中标审批规则'}}</el-button>
		</div>

		<el-table :data="tableData" style="width: 100%">
			<el-table-column align="left" prop="company_name" label="客户" width="260"></el-table-column>
			<el-table-column align="center" prop="count" label="启用审批步骤" width="180"></el-table-column>
			<el-table-column align="center" prop="remarks" label="备注" width="180"></el-table-column>
			<el-table-column align="right" label="操作" width="260">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="configApproval(scope.$index, scope.row)">配置审批流</el-button>
					<el-button v-if="scope.row.company_name != 'ALL'" size="mini" type="primary" @click="editApproval(scope.$index, scope.row)">编辑</el-button>
					<el-button v-if="scope.row.company_name != 'ALL'" size="mini" @click="delApproval(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>

import requestApi from '@/utils/requestData'
export default {
    components: { },
    data: function(){
        return {
			type: '',
			tableData: []
		}
			
    },
	mounted(){
		
	},
    methods: {
		searchTableData(type){
			this.type = type;
			requestApi({
        url: '/Approval/GetApporval',
        method: 'POST',
        data: {
          type: type
        },
      }).then(res => {
				this.tableData = res;
			})
		},
		addSettle() {
			this.$router.push({
				name:'addeditApprovalrule',
				query: {
					type: this.type,
					back: 'approveSetting'
				}
			});
		},
		configApproval(index, data) {
			if(this.type == 1) {
				this.$router.push({
					name:'settlementSheet',
					query: {
						id: data.id,
						type: this.type
					}
				});
			}
			if(this.type == 2) {
				this.$router.push({ path: '/outbid', query: {
					id: data.id,
					type: this.type
				}});
			}
			
		},
		editApproval(index, data) {
			this.$router.push({
				name:'addeditApprovalrule',
				query: {
					id: data.id,
					type: this.type,
					back: 'approveSetting'
				}
			});
		},
		delApproval(index, data) {
			this.$confirm('您正在删除审批规则，请确认是否执行删除操作?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				requestApi({
					url: '/Approval/ApporvalDelete',
					method: 'POST',
					data: {
						id: data.id
					},
				}).then(res => {
					this.$message.success('删除成功');
					this.tableData.splice(index, 1);
				});
			}).catch(() => {
				      
			});
		}
    }
}
</script>


<style lang="scss">
.settle_header {
	text-align: right;
	.add_button {
		margin-right: 100px;
	}
}

</style>
