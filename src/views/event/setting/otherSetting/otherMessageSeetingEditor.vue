<template>
  <div class="content">
    <div class="index">
      <span>首页-></span>
      <span @click="$router.push('/otherSettings')">其他配置 -></span>
      <span>{{'新增会议附加信息配置规则'}}</span>
    </div>
    <div class="title"><span>{{'新增/编辑会议附加信息配置规则'}}</span></div>

    <el-form class="form" :model="ruleInfo" ref="ruleInfo" label-position="left" :rules="rules" label-width="250px">
      <el-form-item label="客户" v-if="isdefault==0" prop="selectedcuslist">
        <el-select v-model="selectedcuslist" multiple filterable @change="custchange" placeholder="请选择客户">
          <el-option v-for="item in ruleInfo.cuslist" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户" prop="" v-else>
        <span>ALL</span>
      </el-form-item>
      <el-form-item label="备注说明" prop="remark">
        <el-input v-model="ruleInfo.remark" type="textarea" :autosize="{ minRows: 4 }"></el-input>
      </el-form-item>

      <el-form-item label="会议附加信息表单" prop="addFormMsg">
        <el-button type="primary" size="small" @click="addDialogVisible = true;rowIndex = null">添加表单字段</el-button>
        <div class="approval-body">
          <el-table :data="ruleInfo.selfform" border style="width: 100%">
            <el-table-column label="序号" type="index" width="50"> </el-table-column>
            <el-table-column label="字段名称" prop="fieldname"> </el-table-column>
            <el-table-column label="字段类型" width="180" prop="fieldtype" :formatter="fieldTypeFormatter"></el-table-column>
            <el-table-column label="选项" width="180" prop="defaultvalue">
              <template slot-scope="scope">
                <pre style="margin-left: 10px">{{ scope.row.defaultvalue }}</pre>
              </template>
            </el-table-column>

            <el-table-column label="是否必填" width="100" prop="required">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.required ? '是' : '否' }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <span class="step-operation-edit edit" @click="fieldEdit(scope.row, scope.$index)">编辑</span>
                <span class="step-operation-del del" @click="fieldDel(scope.$index)">删除</span>
                <span>
                  <span style="margin-left:10px;cursor:pointer" @click="upL(scope.row,scope.$index)">
                    <img src="../../assets/images/on.png" alt="" style="width: 17px" />
                  </span>
                  <span style="margin-left:10px;cursor:pointer" @click="downL(scope.row,scope.$index)">
                    <img src="../../assets/images/up.png" alt="" style="width: 17px" />
                  </span>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-form-item>

      <el-form-item>
        <el-button class="form-btn" type="primary" @click="submitForm('ruleInfo')">保存</el-button>
        <el-button class="form-btn" @click="$router.push('/otherSettings')">取消</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="添加/编辑表单字段" :visible.sync="addDialogVisible" width="30%">
      <el-form class="form" :model="addfieldInfo" ref="addfieldInfo" label-position="left" :rules="addRules" label-width="100px">
        <el-form-item label="字段名称" prop="fieldname">
          <el-input v-model="addfieldInfo.fieldname" type="input" :autosize="{ minRows: 4 }"></el-input>
        </el-form-item>
        <el-form-item label="字段类型" prop="fieldtype">
          <el-select v-model="addfieldInfo.fieldtype" filterable placeholder="请选择字段类型" @change="fieldTypeChange" :autosize="{ minRows: 4 }">
            <el-option v-for="item in ruleInfo.formitem" :key="item.code" :label="item.fieldtypename" :value="item.code">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="选项" prop="defaultvalue" v-show="addfieldInfo.fieldtype == '099-4'">
          <el-input v-model="addfieldInfo.defaultvalue" type="textarea" :autosize="{ minRows: 4 }"></el-input>
          备注：每行一个选项
        </el-form-item>
        <el-form-item label="是否必填" prop="required">
          <el-radio-group v-model="addfieldInfo.required">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDeleteRule()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  data() {
    return {
      isdefault: 0, //规则配置  1默认 0自定义
		  id: '', //规则配置id
      addOrEdit:0,//新增规则或编辑规则 1新增 0编辑
			ruleInfo:{
				selectedcuslist: '',
				remark: '',
			},
			selectedcuslist:[], // 选择客户
			addfieldInfo:{
				fieldname: '',
				fieldtype:'099-1', // 默认是短文本
				defaultvalue: '',
				required: 0,
			},
			rules: {
				selectedcuslist:[{ required: true, message: '请选择客户', trigger: 'blur' }],
				addFormMsg: [{ required: true, message: '请录入会议附加信息', trigger: 'change' }],
				
			},//规则校验
			addRules:{
        fieldname:[{ required: true, message: '请输入字段名称', trigger: 'blur' }],
        fieldtype:[{ required: true, message: '请选择字段类型', trigger: 'blur' }],
        defaultvalue:[{ required: false, message: '请输入下拉列表选项', trigger: 'blur' }],
        required:[{ required: true, message: '请选择是否必填', trigger: 'blur' }]
      },
			customers: [], //客户列表
			fieldTypes: [],
			addDialogVisible: false,
			addFormMsgList:[],
			rowIndex: null, // 附加信息列表操作行 下标
    }
  },
  mounted() {
    this.isdefault = this.$route.query.isdefault; //默认或自定义规则 1默认 0自定义
		this.id = this.$route.query.id; //配置id
    this.addOrEdit=this.$route.query.addOrEdit;//新增规则或编辑规则 1新增 0编辑
		this.getCompany();
		this.getRuleEdit();
  },
	methods:{
		//公司查询
		getCompany(){
			this.requestApi({
        url: '/MeetingMa/GetCompany',
        method: 'POST',
        data: {
					
				},
      }).then(res => {
				if(res==null || res==undefined || res==true){
					this.customers = []
				}else{
					this.customers = res;
				}
			});
		},
		fieldTypeChange(value){
			if(value == 4){
				this.addRules.defaultvalue[0].required = true;
			}else{
				this.addRules.defaultvalue[0].required = false;
			}
		},
		// 客户修改
		custchange(value){
			// debugger
		},
		// 字段类型格式化
		fieldTypeFormatter(row, col, val){
			// debugger
			if(val == '099-1'){
				return '短文本'
			}else if(val == '099-2'){
				return '长文本'
			}else if(val == '099-3'){
				return '日期'
			}else if(val == '099-4'){
				return '下拉列表'
			}else if(val == '099-5'){
				return '附件'
			}
		},
		// 编辑
		fieldEdit(row,index){
			this.rowIndex = index;
			this.addDialogVisible = true;
			this.addfieldInfo = {
									fieldname: row.fieldname,
									fieldtype: row.fieldtype,
									defaultvalue: row.defaultvalue,
									required: row.required,
								}
		},
		// 删除
		fieldDel(index){
			this.ruleInfo.selfform.splice(index, 1);
		},
		upL(row,index){
			if (index === 0) return;
			let item = this.ruleInfo.selfform.splice(index, 1);
      this.ruleInfo.selfform.splice(index - 1, 0, item[0]);
      // let tempArr = [];
      // this.ruleInfo.selfform.forEach((item,index) => {
      //   tempArr.push({
      //     id: item.id,
      //     sort: index+1
      //   })
      // })
		},
		// 向下
    downL(row,index) {
      if (index === this.ruleInfo.selfform.length - 1) return;
      let item = this.ruleInfo.selfform.splice(index, 1);
      this.ruleInfo.selfform.splice(index + 1, 0, item[0]);

      // let tempArr = [];
      // this.ruleInfo.selfform.forEach((item,index) => {
      //   tempArr.push({
      //     id: item.id,
      //     sort: index+1
      //   })
      // })
      // this.$api.approvaProcessSort({
      //    Parameter: JSON.stringify(tempArr)
      // },"POST").then(res => {
        
      // })
    },
		// 新增表单字段确认
		submitDeleteRule(){ // index: 有值是编辑，无值为新增
			this.$refs.addfieldInfo.validate((valid) => {
        if (valid) {
					if(this.rowIndex == null){ // 新增
						this.ruleInfo.selfform.push(this.addfieldInfo)
					}else{
						this.ruleInfo.selfform[this.rowIndex].fieldname = this.addfieldInfo.fieldname
						this.ruleInfo.selfform[this.rowIndex].fieldtype = this.addfieldInfo.fieldtype
						this.ruleInfo.selfform[this.rowIndex].defaultvalue = this.addfieldInfo.defaultvalue
						this.ruleInfo.selfform[this.rowIndex].required = this.addfieldInfo.required
					}
					this.addDialogVisible = false;
				}
					this.addfieldInfo = {
									fieldname: '',
									fieldtype:'099-1',
									defaultvalue: '',
									required: 0,
								}
				
				console.log(this.ruleInfo.selfform)
			})
		},

		// 规则查询
		getRuleEdit(){
			this.requestApi({
        url: '/selfform/info',
        method: 'POST',
        data: {
					id: this.id
				},
      }).then(res =>{
				// debugger
				this.ruleInfo = res;
				this.ruleInfo.selectedcuslist.forEach(item => {
					this.selectedcuslist.push(item.id)
				})
				// this.ruleInfo.selfform = this.ruleInfo.selfform
			})
		},
		// 规则保存
		submitForm(){
			if(this.ruleInfo.selfform.length > 0 || this.isdefault == 1){ // 默认规则 “会议附加信息表单”非必填，即可以不添加表单字段
				this.rules.addFormMsg[0].required = false
			}
			this.ruleInfo.selectedcuslist = [];
			this.selectedcuslist.forEach(item => {
				this.ruleInfo.cuslist.forEach(element => {
					if(item == element.id){
						this.ruleInfo.selectedcuslist.push(element)
					}
				})
			})
			this.ruleInfo.isdefault = this.isdefault;
			this.$refs.ruleInfo.validate((valid) => {
        if (valid) {
					this.ruleInfo.selfform.forEach((element,index) => {
						element.orderid = (index+1)
					});
					this.requestApi({
						url: '/selfform/saveselfform',
						method: 'POST',
						data: this.ruleInfo,
					}).then(res =>{
						debugger
						if(res === '' ){
							this.$message.success('保存成功')
							this.$router.push('/otherSettings')
						}
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
  width: 98%;
  margin: 0 auto;
  .index {
    color: #3272a8;
  }
  .title {
    font-size: 20px;
  }
  .form {
    width: 80%;
    margin-left: 10%;
  }
}
.step-operation-edit,
.step-operation-del {
  color: #5bc0de;
  margin-right: 20px;
  cursor: pointer;
}
</style>