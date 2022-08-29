<template>
  <div>
    <div class="approval-box">
      <div style="text-align: right;margin-bottom: 20px;">
        <el-button type="primary" @click="adduser">新增会议负责人配置</el-button>
      </div>

      <!-- v-show="tableData.length<=0" -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="负责人用户" prop="username" width="100"></el-table-column>
        <el-table-column label="客户" prop="company_name" width="240"></el-table-column>
        <el-table-column label="会议类型" prop="meeting_type"></el-table-column>
        <el-table-column label="会议城市" prop="city_code"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click.native.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div>
        <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="pageInfo.totalCount" algin="right"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [],
			ProvinceCity:[], //省级直辖市列表
			pageInfo:{
				totalCount: 0
			},
			searchData:{
				pageIndex: 1,
				pageSize: 10,
				type: 1, //1、负责人，2、采购人，3、会议助理，4、合规人员
			}
    }
	
	},
	mounted() {
		this.searchTableData();
		
	},
	methods: {
		// 查询
		searchTableData(){
			this.requestApi({
				url: '/InfoConfig/GetOwnerRule',
				method: 'POST',
				data: this.searchData,
			}).then(res => {
				this.tableData = res.EvetModels;
				this.pageInfo = res.pageInfo;
			})
		},
		handleCurrentChange(val) {
      this.searchData.pageIndex = val;
      console.log(`当前页: ${val}`);
      this.searchTableData();
    },
		// 新增
		adduser() {
			this.$router.push("/addPrincipal");
		},
		// 编辑
		handleEdit(index, row) {
			 console.log(index, row);
			 this.$router.push({
				 path: "/addPrincipal",
				 query:{
					 id: row.id
				 }
			 })
        
    },
		// 删除
		deleteRow(index, row) {
			this.$confirm('删除规则后不可恢复, 请确认是否删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.requestApi({
            url: '/InfoConfig/OwnerRuleDelete',
            method: 'POST',
            data: {ID: row.id},
          }).then(res => {
					if(res){
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.searchTableData();
					}
					
				})
				
			})
		},
	},
  
};
</script>

<style scoped>
element.style {
  height: 60px;
}
body {
  background: #f2f4f8;
}
.approval-box {
  width: 1100px;
  height: 100%;
  margin: auto;
  background: #ffffff;
  margin-top: 30px;
  position: relative;
  overflow: hidden;
}
.configuration {
  position: absolute;
  left: 940px;
  margin-top: 30px;
}
.el-alert--success.is-light {
  background-color: #fdf6ec;
  color: #e6a23c;
}
/* .user {
	width: 1000px;
	height: 80px;
	background-color: #fdf6ec;
	color: #e6a23c;
	margin-top: 110px;
	margin-left: 40px;
} */

.rules {
  color: #e6a23c;
  font-weight: bold;
}
.Description {
  color: #e6a23c;
  margin-top: 6px;
  font-weight: bold;
}
.pagination {
  text-align: center;
  margin-top: 30px;
}
</style>