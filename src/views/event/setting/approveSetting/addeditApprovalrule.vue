<template>
  <div>
    <div style="padding-top: 40px;" class="approve-page-body">
      <div class="centerBox">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }" class="el-breadcrumb-item">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'approveSetting' }" class="el-bread-item">
            审批流配置
          </el-breadcrumb-item>
          <el-breadcrumb-item class="el-bread-item">
            编辑结算审批规则
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="addedit_header">{{title}}</div>

    <div class="custom">
      <div class="custom_title">客户</div>
      <div class="custom_list">
        <el-checkbox-group v-model="customChoose">
          <el-checkbox class="custom_checkbox" v-for="c in customList" :key="c.id" :label="c.shortname" border></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>

    <div class="remark_area">
      <div style="width: 60px;">备注</div>
      <el-input rows="6" type="textarea" v-model="remark"></el-input>
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
			back: '',
			type: '',
			id: '',
			title: '',
			customList: [],
			customChoose: [],
			editList: [],
			remark: ''
        }
    },
	mounted() {
		this.back = this.$route.query.back;
		this.type = this.$route.query.type;
		this.id = this.$route.query.id;
		if(this.type == '1') {
			this.title = this.$route.query.id ? '编辑结算审批规则' : '新建结算审批规则';
		}
		if(this.type == '2') {
			this.title = this.$route.query.id ? '编辑中标审批规则' : '新建中标审批规则';
		}

		this.GetAllCompany();
	},
    methods: {
		GetAllCompany() {
      this.requestApi({
        url: '/MeetingMa/GetAllCompany',
        method: 'POST',
        data: {},
      }).then((res) => {
				this.customList = res;

				if(this.id) {
          this.requestApi({
            url: '/Approval/EditGetApporval',
            method: 'POST',
            data: {
              id: this.id,
            },
          }).then((res) => {
						this.editList = res.approval_company;
						this.remark = res.remarks;
						for(let i=0; i<res.approval_company.length; i++) {
							let item = res.approval_company[i];
							let filter = this.customList.filter(element => {return element.id == item.company_id});
							if(filter && filter.length) {
								this.customChoose.push(filter[0].shortname);
							}
						}

					});

				}
			});

		},
		save() {
			if(!this.customChoose.length) {
				this.$message.warning('请选择客户');
				return false;
			}

			let approvalCompany = [];

			for(let i=0; i<this.customChoose.length; i++) {
				for(let j=0; j<this.customList.length; j++) {
					if(this.customChoose[i] == this.customList[j].shortname) {
						approvalCompany.push({
							id: '',
							company_id: this.customList[j].id
						});
					}
				}
			}
      this.requestApi({
        url: '/Approval/ApporvalSava',
        method: 'POST',
        data: {
          id: this.id,
          remarks: this.remark,
          type: this.type,
          approval_company: approvalCompany
        },
      }).then((res) => {
				if(res) {
					this.$message.success('保存成功');
					this.$router.push({
						name: "approveSetting"
					});

				}

			});
		},
		cancel() {
			// this.$router.back();
			this.$router.push({
				name: this.back,
				query: {
					id: this.id,
					type: this.type
				}
			});

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
.custom {
  display: flex;
  padding-left: 60px;
  .custom_title {
    margin-right: 40px;
  }
  .custom_title:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
  .custom_list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 1000px;
    max-height: 300px;
    overflow: auto;
    .custom_checkbox {
      margin-bottom: 10px;
    }
  }
}
.remark_area {
  display: flex;
  padding: 30px 60px;
}
.btns {
  display: flex;
  justify-content: center;
  padding: 30px 60px;
}
</style>
