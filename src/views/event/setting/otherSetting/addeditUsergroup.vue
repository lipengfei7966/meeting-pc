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
            {{
							id ? '编辑用户组' : '新增用户组'
						}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="addedit_header">{{id ? '编辑用户组' : '新增用户组'}}</div>

    <div class="user_group">
      <div class="user_group_title">用户组名称</div>
      <div class="user_group_list">
        <el-input style="width:280px;" type="text" v-model="editInfo.name"></el-input>
      </div>
    </div>

    <div class="user_group">
      <div class="user_group_title">用户组类型</div>
      <div class="user_group_list">

        <el-select :disabled="id ? true : false" size="mini" v-model="editInfo.type" placeholder="请选择">
          <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>

      </div>
    </div>

    <div class="remark_area">
      <div style="width: 60px;">备注</div>
      <el-input rows="6" type="textarea" v-model="editInfo.remarks"></el-input>
    </div>

    <div class="btns">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>

  </div>
</template>

<script>


export default {
    components: { },
    data: function(){
        return {
			id: '',
			typeList: [
				{
					id: 1,
					name: '管理员组'
				},
				{
					id: 0,
					name: '普通用户组'
				}
			],
			editInfo: {
				name: '',
				type: '',
				remarks: '',
			}
        }
    },
	mounted() {
		this.id = this.$route.query.id;
		if(this.id) {
			this.getEditInfo();
		}
	},
    methods: {
		getEditInfo() {
			this.$api.GetGroupEditData({
				usergroup_id: this.id,
			},'POST').then(res => {
				this.editInfo = res;
			})
		},
		save() {
			if(!this.editInfo.name) {
				this.$message.warning('请填写用户组名称');
				return false;
			}

			if(this.editInfo.type === '') {
				this.$message.warning('请选择用户组类型');
				return false;
			}

			if(this.id) {
				this.editInfo.usergroup_id = this.editInfo.id;
				this.$api.PutUserGroupDate(this.editInfo, 'POST').then((res) => {
					if(res) {
						this.$message.success('保存成功');
						this.$router.push({
							name: "otherSeetings"
						});
					}
				});
			}else {
				this.$api.PostUserGroupDate(this.editInfo, 'POST').then((res) => {
					if(res) {
						this.$message.success('保存成功');
						this.$router.push({
							name: "otherSeetings"
						});
					}
					
				});
			}
			
		},
		cancel() {
      this.$router.push({name:'otherSetting',params:{activeName:'sixth'}})
		}
		
		
  }
}
</script>


<style lang="scss">
.addedit_header {
  text-align: left;
  padding: 40px 0;
  font-size: 20px;
  font-weight: bold;
}
.user_group {
  display: flex;
  align-items: center;
  padding: 0 0 30px 160px;

  .user_group_title {
    width: 100px;
  }
  .user_group_title:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
  .user_group_list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 1000px;
    max-height: 300px;
    overflow: auto;
    .user_group_checkbox {
      margin-bottom: 10px;
    }
  }
}
.remark_area {
  display: flex;
  padding: 30px 160px;
}
.btns {
  display: flex;
  justify-content: center;
  padding: 30px 60px;
}
</style>
