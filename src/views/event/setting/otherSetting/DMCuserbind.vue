<template>
  <div>
    <el-form :model="searchFormData" label-width="120px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="DMC供应商名称">
            <el-input size="small" class="demand_170" v-model="searchFormData.name" clearable placeholder="请输入名称模糊查询"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="绑定用户">
            <div style="display:flex">
              <el-select size="small" v-model="searchFormData.isnull" @change="isnullChange" style="width:100px">
                <el-option label="全部" :value="-1"></el-option>
                <el-option label="不为空" :value="0"></el-option>
                <el-option label="为空" :value="1"></el-option>
              </el-select>

              <el-input v-show="searchFormData.isnull==-1 || searchFormData.isnull==0" size="small" class="demand_170" v-model="searchFormData.username" clearable placeholder="请输入账号模糊查询"></el-input>
            </div>

          </el-form-item>
        </el-col>
        <el-col :span="6" align="right">
          <el-button size="small" type="primary" @click="getDataList(1)">搜 索</el-button>
          <el-button size="small" type="primary" @click="getDataList(2)">重 置</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table style="height: 380px" border :data="userbidData">
      <!-- <el-table-column label="会议ID" prop="id" align="center" width="180" show-overflow-tooltip></el-table-column> -->
      <el-table-column label="DMC供应商名称 " prop="company_name" align="center" width="350px" show-overflow-tooltip></el-table-column>
      <el-table-column label="地址" prop="company_address" align="center" width="330" show-overflow-tooltip></el-table-column>
      <el-table-column label="绑定用户账号" prop="username" align="center" :formatter="userFormatter" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" prop="" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateBind(scope.row)">更新绑定用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="pageInfo.totalCount"></el-pagination>
    </div>

    <!-- 更绑定用户弹窗 -->
    <el-dialog title="更新绑定用户" :visible.sync="dialogVisible" top='30vh' width="30%">
      <div style="line-height:40px">
        <p class="flex_row">
          <span style="width:150px">DMC供应商名称：</span>
          <span> {{updateInfo.company_name}} </span>
        </p>
        <p class="flex_row">
          <span style="width:150px">地址：</span>
          <span> {{updateInfo.company_address}}</span>
        </p>
        <p class="flex_row">
          <span style="width:150px">绑定用户账号：</span>
          <el-select size="mini" filterable multiple v-model="updateInfo.username" placeholder="请选择">
            <el-option v-for="item in userOptionsList" :key="item.username" :label="item.fullname" :value="item.username">
            </el-option>
          </el-select>
        </p>
        <p style="color: #999;line-height:20px;margin:20px 0">注释：更新绑定用户后，当前供应商的历史询、报价、订单、结算单信息只有新绑定用户可见</p>
      </div>

      <div style="text-align:center">
        <el-button type="primary" size="small" @click="saveUpdateInfo">保 存</el-button>
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      searchFormData: {
        pageIndex: 1,
        pageSize: 10,
        name: '',
        isnull: -1,
        username: ''
      },
      isEmpty: 1,
      userbidData: [
        {
          id: '',
          name: '昆明中国国际旅行社有限公司',
          address: '云南省昆明市环城南路1118号',
          username: 'service001'
        },
        {
          id: '',
          name: '中国国旅（武汉）国际旅行社有限公司',
          address: '湖北省武汉市硚口区古田四路江城壹号文化创意园10号楼',
          username: 'service002'
        },
        {
          id: '',
          name: '中国国旅（辽宁）国际旅行社有限公司',
          address: '沈阳市和平区南京北街65号华银大厦13层',
          username: 'service003'
        },
        {
          id: '',
          name: '中国国旅（宁波）国际旅行社有限公司',
          address: '宁波市海曙区开明街396号平安大厦12楼',
          username: 'service004'
        },
        {
          id: '',
          name: '中国国旅（青岛）国际旅行社有限公司',
          address: '青岛市市北区连云港路33号B座5层517-520室',
          username: 'service005'
        }
      ],
      userOptionsList: [], // 更改用户option列表
      // 更改用户信息
      updateInfo: {
        id: '',
        name: '',
        address: '',
        username: ''
      },
      pageInfo: {
        totalCount: 0
      },
      dialogVisible: false
    }
  },
  mounted() {
    this.getDataList()
    this.GetUser()
  },
  methods: {
    handleCurrentChange(val) {
      this.searchFormData.pageIndex = val
      console.log(`当前页: ${val}`)
      this.getDataList()
    },
    getDataList(searchType) {
      if (searchType == 2) {
        // 重置
        this.searchFormData.name = ''
        this.searchFormData.isnull = -1
        this.searchFormData.username = ''
      }
      this.requestApi({
        url: '/MeetingMa/GetServiceProviderUser',
        method: 'POST',
        data: this.searchFormData
      }).then(res => {
        debugger
        this.userbidData = res.EvetModels || []
        this.pageInfo = res.pageInfo || this.pageInfo
      })
    },
    GetUser() {
      this.requestApi({
        url: '/MeetingMa/GetUser',
        method: 'POST',
        data: {}
      }).then(res => {
        this.userOptionsList = res || []
      })
    },
    isnullChange(value) {
      if (value == 1) {
        this.searchFormData.username = ''
      }
    },

    updateBind(row) {
      this.dialogVisible = true
      this.updateInfo = { ...row }
      this.updateInfo.username = this.updateInfo.username.split(',')
    },

    // 保存更改绑定信息
    saveUpdateInfo() {
      // UserName =
      let sendData = {
        ID: this.updateInfo.id,
        UserName: this.updateInfo.username.join()
      }
      debugger
      this.requestApi({
        url: '/MeetingMa/ServiceProviderEditUser',
        method: 'POST',
        data: sendData
      }).then(res => {
        debugger
        if (res) {
          this.$message.success('修改成功')
          this.dialogVisible = false
          this.getDataList()
        } else {
          this.$message.error('已经有其他服务商使用该用户')
        }
      })
    },
    // 绑定用户账号 转换 用户名
    userFormatter(row) {
      let value = ''
      let username = row.username.split(',')
      this.userOptionsList.forEach(item => {
        username.forEach(Element => {
          if (Element == item.username) {
            if (value.length > 0) {
              value += '，' + item.fullname
            } else {
              value = item.fullname
            }
          }
        })
      })
      return value
    }
  }
}
</script>

<style>
.el-table__body-wrapper {
  overflow-y: auto;
}
</style>