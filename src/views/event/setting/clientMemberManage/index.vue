<template>
  <div class="root">
    <div class="all">
      <div>
        <div></div>
        <div class="index-page-div">
          <span>首页</span>
          <span>-></span>
          <span>客户成员管理</span>
        </div>
      </div>
      <div>
        <div class="left-div-client">
          <div>
            <span>客户</span>
            <el-select size="mini" @change="client" v-model="value" placeholder="请选择">
              <el-option v-for="item in companyData" :key="item.id" :label="item.shortname" :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="client-div-span">客户组织架构</span>
          </div>
          <div>
            <div>
              <span class="client-company-span" @click="searchID = value,searchType = 1,curPage = 1;customerContact(value,1),select_customer='公司全员'">公司全员 ({{companyCount}}人)</span>
            </div>
            <div class="client-div" v-for="(item,index) in clientData" @click="departmentChange(item)" :key="index">
              <span>{{item.shortname}} </span>
              <span>({{item.count}}人)</span>
            </div>
          </div>
        </div>
        <div class="right-div">
          <div>
            <div class="select-customer-div">
              <span>{{select_customer}}</span>
            </div>
            <el-button class="btn-right" size="mini" @click="addMember=true,shade=true,is_addOrUpdate=true,company(),initialize()">新增成员</el-button>
            <el-button class="btn-right" size="mini" @click="import_member=true,shade=true">批量导入成员</el-button>
            <el-button class="btn-right" size="mini" @click="exportExcel()">导出成员</el-button>
            <el-button class="btn-right" size="mini" @click="updateSection=true">更改用户所属部门</el-button>
          </div>
          <div>
            <el-form class="form-find-class" :inline="true">
              <el-form-item label="成员">
                <el-input class="input-find-class" v-model="name" placeholder="输入姓名/邮箱/手机号查询"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="btn-find-class" type="primary" @click="searchID = value,searchType = 1,curPage = 1,customerContact(value,1)">查 询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-table id="out-table" ref="multipleTable" :data="tableData" tooltip-effect="dark" :header-row-style="{height:'40px'}" :header-cell-style="{padding:'0px'}" :row-style="{height:'41px'}" :cell-style="{padding:'0px'}" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column align="center" label="姓名">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column align="center" prop="" label="邮箱">
                <template slot-scope="scope">{{ scope.row.mailbox }}</template>
              </el-table-column>
              <el-table-column align="center" prop="" label="手机号">
                <template slot-scope="scope">{{ scope.row.phone }}</template>
              </el-table-column>
              <el-table-column align="center" prop="" label="操作/Action" :render-header="renderheader">
                <template slot-scope="scope">
                  <el-button type="text" @click="is_addOrUpdate=false,addMember=true,shade=true,ruleForm.id=scope.row.id,getData()">编辑</el-button>
                  <el-button type="text" @click="deleteData(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page="curPage" :page-size="pagesize" :hide-on-single-page="false" layout="prev, pager, next" background :total="totalNum" align="right"></el-pagination>
          </div>
        </div>
        <!-- <div class="shade" v-if="shade"></div> -->

        <el-dialog :visible.sync="addMember" width="500px" :title="is_addOrUpdate?'新增成员':'编辑成员信息'" align="center">
          <el-form ref="memberForm" class="form-rule" :inline="true" label-position="right" :model="ruleForm" :rules="rules">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mailbox">
              <el-input v-model="ruleForm.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item v-if="is_addOrUpdate" label="公司" prop="company_id">
              <el-select v-model="ruleForm.company_id" placeholder="请选择公司">
                <el-option v-for="(item,index) in companyData" :label="item.shortname" :value="item.id" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="is_addOrUpdate" label="部门" prop="customer_id">
              <el-select v-model="ruleForm.customer_id" placeholder="请选择部门">
                <el-option v-for="(item, index) in clientData" :label="item.shortname" :value="item.id" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="submit-div">
            <el-button type="primary" @click="submit()">提交</el-button>
            <el-button type="info" @click="shade=false,addMember=false">取消</el-button>
          </div>
        </el-dialog>

        <div v-if="import_member" class="import-div">
          <div>
            <span>批量导入成员</span>
          </div>
          <el-upload action="none" :file-list="fileList" :before-upload="beforeUploadFile" :on-exceed="exceedFile" :limit="1" accept=".xlsx,.xls" :on-change="fileChange">
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">支持格式：xls、xlsx，最大4M</div>
          </el-upload>
          <div>
            <a href="http://b.ctgbs.com/%E5%A4%A7%E4%BA%A4%E9%80%9A%E6%A8%A1%E6%9D%BF.xlsx">点击下载模板</a>
          </div>
          <div>
            <el-button type="info" @click="import_member=false,shade=false">取消</el-button>
            <el-button type="primary" @click="uploadFile()">确认</el-button>
          </div>
        </div>
        <!-- <el-dialog title="编辑部门" :visible.sync="updateSection" width="50%">
					<el-form class="form-section" :inline="true" label-position="right" label-width="80px" :model="ruleForm" :rules="rules">
						<el-form-item label="父部门" prop="customer_id">
							<el-select v-model="ruleForm.customer_id" placeholder="请选择部门">
								<el-option v-for="item in clientData" :label="item.shortname" :value="item.id" :key="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div class="transfer-div">
						<el-button type="primary" @click="transfer(),shade=false,updateSection=false">迁移</el-button>
						<el-button type="info" @click="shade=false,updateSection=false">取消</el-button>
					</div>
				</el-dialog> -->
        <div v-show="updateSection" class="section-div">
          <div>
            <span>编辑部门</span>
          </div>
          <el-form class="form-section" :inline="true" label-position="right" label-width="80px" :model="ruleForm" :rules="rules">
            <el-form-item label="父部门" prop="customer_id">
              <el-select v-model="ruleForm.customer_id" placeholder="请选择部门">
                <el-option v-for="item in clientData" :label="item.shortname" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="transfer-div">
            <el-button type="primary" @click="transfer(),shade=false,updateSection=false">迁移</el-button>
            <el-button type="info" @click="shade=false,updateSection=false">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
//import FileSaver from "file-saver";
//import XLSX from "xlsx";
import { validatePhone, validateEMail } from '@/assets/js/validator'

export default {
  data() {
    return {
      select_customer: '公司全员',
      curPage: 1,
      pagesize: 10,
      totalNum: 0, // 客户成员列表总数
      searchType: 0, //0: id为客户(部门)id , 1:id为公司id
      searchID: '',
      is_addOrUpdate: false,
      shade: false,
      import_member: false,
      updateSection: false,
      value: '',
      name: '',
      tableData: [],
      multipleSelection: [],
      companyData: [],
      clientData: [],
      companyCount: '',
      addMember: false,
      ruleForm: {
        name: '',
        phone: '',
        mailbox: '',
        customer_id: '',
        company_id: '',
        id: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '长度为11个字符',
            trigger: 'blur'
          }
        ],
        mailbox: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEMail, trigger: 'blur' }
        ],
        // customer_id: [{
        // 	required: true,
        // 	message: '请选择部门',
        // 	trigger: 'change'
        // }],
        company_id: [
          {
            required: true,
            message: '请选择公司',
            trigger: 'change'
          }
        ]
      },
      currentFile: null,
      fileList: [],
      outTableSelection: [] // 公司成员选择数据
    }
  },

  watch: {
    tableList: {
      handler(a) {
        this.tableList = a
        this.tableData = this.tableList.slice((this.curPage - 1) * this.pagesize, this.curPage * this.pagesize)
        this.timeStamp = new Date()
        console.log('监听监听======', a)
      },
      deep: true
    }
  },
  components: {},
  mounted() {
    this.$nextTick(() => {
      this.company()
    })
  },
  methods: {
    exportExcel() {
      /* 从表生成工作簿对象 */
      //var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* 获取二进制字符串作为输出 */
      /*var wbout = XLSX.write(wb, {
					bookType: "xlsx",
					bookSST: true,
					type: "array"
				});
				try {
					FileSaver.saveAs(
						//Blob 对象表示一个不可变、原始数据的类文件对象。
						//Blob 表示的不一定是JavaScript原生格式的数据。
						//File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
						//返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
						new Blob([wbout], {
							type: "application/octet-stream"
						}),
						//设置导出文件名称
						"idea.xlsx"
					);
				} catch (e) {
					if (typeof console !== "undefined") console.log(e, wbout);
				}
				return wbout;*/
    },
    // 查询对应部门成员
    departmentChange(item) {
      this.select_customer = item.shortname
      this.curPage = 1
      this.searchID = item.id
      this.searchType = 0
      this.customerContact(item.id, 0)
    },
    fileChange(file, fileList) {
      console.log(file.raw)
      this.fileList.push(file.raw)
      console.log(this.fileList)
    },
    exceedFile(files, fileList) {
      this.$message.warning(`只能选择1个文件，当前共选择了 ${files.length + fileList.length} 个`)
    },
    beforeUploadFile(file) {
      console.log('before upload')
      console.log(file)
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      let size = file.size / 1024 / 1024
      if (extension !== 'xls' && extension !== 'xlsx') {
        this.$message.warning('只能上传后缀是.xlsx,.xls的文件')
      }
      if (size > 10) {
        this.$message.warning('文件大小不得超过10M')
      }
    },
    uploadFile() {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件')
      } else {
        this.import_member = false
        this.shade = false
        let form = new FormData()
        console.log(this.fileList[0])
        form.append('file', this.fileList[0])
        form.append('DepartmentyID', '5000')
        form.append('CompanyID', 'CeShi')
        this.requestApi({
          url: '/MeetingMa/CustomerImportExcel',
          method: 'POST',
          data: {
            form
          }
        }).then(res => {
          // console.log(res);
          console.log(res)
        })
      }
    },
    renderheader(h, { column, $index }) {
      return h('span', {}, [h('span', {}, column.label.split('/')[0]), h('br'), h('span', {}, column.label.split('/')[1])])
    },
    handleCurrentChange(val) {
      this.curPage = val
      this.customerContact(this.searchID, this.searchType)
    },
    // 公司查询
    company() {
      this.requestApi({
        url: '/MeetingMa/GetCompany',
        method: 'POST',
        data: {}
      }).then(res => {
        this.companyData = res
      })
    },
    // 客户(部门)查询
    client() {
      this.requestApi({
        url: '/MeetingMa/GetDepartmenty',
        method: 'POST',
        data: { CompanyID: this.value }
      }).then(res => {
        // console.log(res);
        let _this = this
        this.clientData = res
        this.companyData.forEach(function(item) {
          if (item.id == _this.value) {
            _this.companyCount = item.count
          }
        })
        this.searchID = this.value
        this.searchType = 1
        this.customerContact(this.value, 1)
      })
    },
    // 客户联系人查询
    customerContact(id, type) {
      this.requestApi({
        url: '/MeetingMa/GetCustomerContact',
        method: 'POST',
        data: {
          id: id,
          type: type,
          where: this.name,
          pageIndex: this.curPage,
          pageSize: this.pagesize
        }
      }).then(res => {
        // console.log(res);
        if (res) {
          this.tableData = res.EvetModels
          this.totalNum = res.pageInfo.totalCount
        }
      })
    },
    // 客户联系人保存/编辑
    submit() {
      this.$refs.memberForm.validate(valid => {
        //  debugger
        if (valid) {
          this.requestApi({
            url: '/MeetingMa/CustomerContactSava',
            method: 'POST',
            data: {
              Parameter: JSON.stringify({
                name: this.ruleForm.name,
                phone: this.ruleForm.phone,
                mailbox: this.ruleForm.mailbox,
                customer_id: this.ruleForm.customer_id,
                company_id: this.ruleForm.company_id,
                id: this.ruleForm.id
              })
            }
          }).then(res => {
            // console.log(res);
            console.log(res)
            this.company()
            this.client()
            this.shade = false
            this.addMember = false
          })
        }
      })
    },
    initialize() {
      this.ruleForm = {
        name: '',
        phone: '',
        mailbox: '',
        customer_id: '',
        company_id: '',
        id: ''
      }
    },
    // 客户联系人编辑查询
    getData() {
      this.requestApi({
        url: '/MeetingMa/GetCustomerContactEdit',
        method: 'POST',
        data: {
          ContactID: this.ruleForm.id
        }
      }).then(res => {
        // console.log(res);
        console.log(res)
        this.ruleForm.company_id = ''
        this.ruleForm.customer_id = ''
        this.ruleForm.name = res.name
        this.ruleForm.phone = res.phone
        this.ruleForm.mailbox = res.mailbox
      })
    },
    // 客户联系人删除
    deleteData(id) {
      this.$confirm('此操作将删除该客户联系人, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.requestApi({
          url: '/MeetingMa/CustomerDelete',
          method: 'POST',
          data: {
            ContactID: id
          }
        })
          .then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.company()
              this.client()
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      })
    },
    transfer() {
      let ContactID = ''
      this.outTableSelection.forEach((item, index) => {
        if (index == this.outTableSelection.length - 1) {
          ContactID += item.id
        } else {
          ContactID += item.id + ','
        }
      })
      // 更改部门
      this.requestApi({
        url: '/MeetingMa/DepartmentyEdit',
        method: 'POST',
        data: {
          ContactID,
          DepartmentyID: this.ruleForm.customer_id
        }
      }).then(res => {
        // console.log(res);
        console.log(res)
        this.company()
        this.client()
      })
    },
    handleSelectionChange(selection) {
      this.outTableSelection = selection
    }
  }
}
</script>

<style lang="scss">
.root {
  background: #f8f8ff;
}

.all {
  width: 1200px;
  margin: 0 auto;
}

.left-div-client {
  width: fit-content;
  height: 675px;
  float: left;
  background-color: #ffffff;
}

.left-div-client > div:nth-of-type(1),
.left-div-client > div:nth-of-type(2),
.left-div-client > div:nth-of-type(3) > div {
  border-bottom: 1px solid #d3d3d3;
  padding: 10px 15px;
}
.left-div-client > div:nth-of-type(1) > span {
  margin-right: 10px;
}
.left-div-client > div:nth-of-type(1) > div > div > input {
  width: 150px;
}
.left-div-client > div:nth-of-type(3) {
  height: 480px;
  overflow: auto;
}
.right-div {
  float: left;
  height: 675px;
  margin-left: 20px;
  width: 880px;
  background-color: #ffffff;
}

.right-div > div {
  border-bottom: 1px solid #d3d3d3;
  padding: 10px 5px;
}

.right-div > div:nth-of-type(3) {
  border-bottom: none;
  text-align: center;
}

.el-input__inner {
  border-color: #2c2c2c;
}

.el-select__caret {
  color: #2c2c2c !important;
}

.client-div {
  text-indent: 15px;
  cursor: pointer;
}

.client-div > span:nth-of-type(2) {
  color: #55aaff;
}

.client-div:hover {
  background-color: #2896eb;
  color: #ffffff !important;
}

.client-company-span {
  color: #55aaff;
  cursor: pointer;
}

.client-div-span {
  font-size: 16px;
}

.member-div {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: #fff;
  border-radius: 6px;
  margin: 0 auto;
}

.member-div > div:nth-of-type(1) {
  border-bottom: 0;
  text-align: center;
  position: relative;
  line-height: 58px;
  font-size: 20px;
  color: #50505a;
  font-weight: normal;
  background-color: #f2f2f3;
  border-radius: 6px;
}

.shade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.3;
  z-index: 2;
}

.form-rule {
  padding-top: 20px;
  overflow-y: scroll;
  height: 300px;
}

.submit-div {
  text-align: center;
  margin-top: 20px;
}
.submit-div > button {
  width: 120px;
}
.import-div {
  width: 400px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: #fff;
  margin: 0 auto;
  text-align: center;
}

.import-div > div:nth-of-type(1) {
  text-align: center;
  font-size: 20px;
  color: #50505a;
  font-weight: normal;
  margin-top: 20px;
}

.import-div > div {
  margin-top: 30px;
}

.section-div {
  width: 500px;
  height: 240px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: #fff;
  border-radius: 6px;
  margin: 0 auto;
  text-align: center;
}

.section-div > div:nth-of-type(1) {
  border-bottom: 0;
  text-align: center;
  position: relative;
  line-height: 58px;
  font-size: 20px;
  color: #50505a;
  font-weight: normal;
  background-color: #f2f2f3;
  border-radius: 6px;
}

.form-section {
  padding-top: 20px;
  overflow-y: scroll;
  padding-bottom: 20px;
}

.index-page-div {
  margin-bottom: 30px;
}

.index-page-div > span:nth-of-type(1) {
  color: #2896eb;
  font-size: 14px;
  cursor: pointer;
  margin-right: 5px;
}

.index-page-div > span:nth-of-type(2) {
  margin-right: 5px;
}

.btn-right {
  color: #2896eb;
}

.btn-right:hover {
  background-color: #ffffff !important;
  border: solid 1px #e5e5e5;
}

.select-customer-div {
  font-size: 16px;
  font-weight: 500;
  color: #4f4f4f;
  padding: 18px 15px 0px;
  margin-bottom: 10px;
}

.right-div > div > button:nth-of-type(1) {
  margin-left: 15px;
}

.form-find-class {
  margin-left: 15px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-input__inner {
  border-color: #dcdfe6;
}
.el-form-item__content {
  width: 220px;
}
.el-select {
}
.input-find-class > input {
  height: 30px;
}
.btn-find-class {
  height: 30px;
  line-height: 0;
}
#out-table > el-table-column {
  height: 40px;
}
.transfer-div > button {
  width: 120px;
}

@media only screen and (max-width: 1450px) {
  .all {
    width: 100%;
  }
  .left-div-client {
    width: 20%;
  }
  .right-div {
    width: 75%;
  }
  .left-div-client > div:nth-of-type(1) > div > div > input {
    width: 100%;
  }
}
</style>
