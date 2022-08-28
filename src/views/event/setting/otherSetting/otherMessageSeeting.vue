<template>
	<div class="content">
		<el-button class="btn" type="primary" @click="toPage()">新增附加信息规则配置</el-button>
		<el-table :data="tableData" border style="width: 100%;" :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
			<el-table-column prop="cusname" label="客户" width="380">
				<template slot-scope="scope">
					{{ scope.row.isdefault? "ALL":scope.row.cusname }}
				</template>
			</el-table-column>
			<el-table-column prop="fieldcount" label="自定义字段" width="180"></el-table-column>
			<el-table-column prop="remark" label="备注"></el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="toPage(scope.row)">编辑</el-button>
					<div style="display:inline-block;margin-left:10px;width:56px">

					<el-button  size="small" v-show="!scope.row.isdefault" @click="deleteRule(scope.row.id)">删除</el-button>
					</div>
					<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
						<span>删除规则后不可恢复，请确认是否删除</span>
						<span slot="footer" class="dialog-footer">
							<el-button @click="dialogVisible = false">取 消</el-button>
							<el-button type="primary" @click="submitDeleteRule()">确 定</el-button>
						</span>
					</el-dialog>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination hide-on-single-page background :current-page.sync="pager" layout="prev, pager, next" :total="total"></el-pagination>
	</div>
</template>

<script>
	import {guid } from '@/utils/common';	
	import requestApi from '@/utils/requestData'
export default {
	data() {
		return {
			tableData: [],
			pager: 1,
			total: 0,
			dialogVisible:false,//删除规则弹框
			id:'',
		};
	},
	mounted() {
		this.getSelfformList()
	},
	watch:{
		pager(newVal ,oldVal){
			this.getSelfformList()
		}
	},
	methods: {
		guid,
		//查询规则
		getSelfformList() {
			requestApi({
        url: '/selfform/list',
        method: 'POST',
        data: {
					// pageIndex: this.pager, //第几页
					// pageSize: 10, //每页多少行
				},
      }).then(res => {
					// debugger
					// console.log(res)
					this.tableData = res.list	//规则配置列表
					// this.pager = res.pageInfo.pageIndex; //当前第几页
					// this.total = res.pageInfo.totalCount; //总条数
				});
		},
		//跳转其他页面
		toPage(e) {//e.type规则类型    e.id规则配置id
			if(e){//编辑
      this.$router.push({
        path:'/otherMessageSeetingEditor',
        query:{
          isdefault:e.isdefault,
          id: e.id, 
          addOrEdit: 0,
        }
      })
				// this.$router.push({ name: 'otherMessageSeetingEditor',params:{type:e.is_default,id:e.id,company_name:e.company_name,addOrEdit:0} });
			}else{//新增
      // this.$router.push({path:'/otherMessageSeetingEditor',query:{id: val.id, name: val.event_name, eventSearchType:this.eventSearch.eventSearchType}})
      this.$router.push({
        path:'/otherMessageSeetingEditor',
        query:{
          isdefault: 0,
          id: this.guid(), 
          addOrEdit: 1,
        }
      })
				// this.$router.push({ name: 'otherMessageSeetingEditor',params:{type:1,id:this.guid(),company_name:'increase',addOrEdit:1} });
			}
			
		},
		//删除规则
		submitDeleteRule() {
			requestApi({
        url: '/selfform/DeleteSelfForm',
        method: 'POST',
        data: {
					id: this.id, //规则配置id
				},
      }).then(res => {
				debugger
				if(res){
					this.$message({
						message: '删除成功',
							type: 'success'
					});
				}else{
					this.$message.error('删除失败');
				}
				this.dialogVisible=false
				this.getSelfformList()
			});
			
		},
		deleteRule(id){
			this.id=id
			this.dialogVisible = true
		}
	}
};
</script>

<style lang="scss" scoped="scoped">
.content {
	.btn {
		float: right;
		margin-bottom: 20px;
	}
}
</style>
