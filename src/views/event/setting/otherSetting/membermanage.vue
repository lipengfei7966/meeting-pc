<template>
  <div>
    <div style="padding-top: 40px;" class="approve-page-body">
      <div class="centerBox">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }" class="el-breadcrumb-item">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: '/otherSetting' }" class="el-bread-item">
            其他配置
          </el-breadcrumb-item>
          <el-breadcrumb-item class="el-bread-item">
            组员管理
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="search_area">
      <div style="display:flex; align-items:center;">
        <div style="width:70px;">用户名</div>
        <el-input v-model="username" placeholder="输入用户登录名模糊查询" size="mini" type="text"></el-input>
      </div>
      <div style="display:flex; align-items:center; margin-left: 20px;">
        <div style="width:56px;">姓名</div>
        <el-input v-model="name" placeholder="输入用户姓名模糊查询" size="mini" type="text"></el-input>
      </div>
      <el-button @click="query" type="primary" size="mini" style="margin-left:20px;">查询</el-button>
      <el-button @click="reset" size="mini" style="margin-left:20px;">重置</el-button>
      <el-button @click="addUser" type="primary" size="mini" style="margin-left:80px;">添加组内用户</el-button>
      <el-button @click="batchDel" type="primary" size="mini" style="margin-left:20px;">批量移出用户</el-button>
    </div>

    <el-table ref="multipleTable" :data="tableInfo.EvetModels" tooltip-effect="dark" style="width: 100%" @selection-change="userSelection">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="username" label="用户名" width="120">
      </el-table-column>

      <el-table-column prop="fullname" label="姓名" width="120">
      </el-table-column>

      <el-table-column prop="group_user_name" label="所属用户组" width="120">
      </el-table-column>

      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button size="mini" @click="delUser(scope.$index, scope.row)">移出用户组</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination v-if="tableInfo.EvetModels.length" :hide-on-single-page="true" @current-change="currentChange" style="margin-top:30px; width: 100%; text-align: center;" :current-page="pageIndex" :page-size="pageSize" background layout="total, prev, pager, next" :total="tableInfo.pageInfo.totalCount">
    </el-pagination>

    <el-dialog title="请选择" :visible.sync="dialogVisible" width="70%" :before-close="handleClose">

      <div class="grid_content">
        <div class="choose_area">
          <div class="search_condition">
            <div style="display:flex; align-items:center;">
              <div style="width:80px;">用户名</div>
              <el-input v-model="grid.username" size="mini" type="text"></el-input>
            </div>
            <div style="display:flex; align-items:center; margin-left: 20px;">
              <div style="width:56px;">姓名</div>
              <el-input v-model="grid.name" size="mini" type="text"></el-input>
            </div>
            <el-button style="margin-left: 20px;" type="primary" size="mini" @click="queryGrid">查询</el-button>
          </div>
          <div class="search_result">
            <el-table ref="gridMultipleTable" :data="gridResult.EvetModels" tooltip-effect="dark" height="250" style="width: 100%;" :header-cell-class-name="cellClass" @select="onTableSelect">
              <el-table-column type="selection" width="55">
              </el-table-column>

              <el-table-column prop="fullname" label="姓名" width="120">
              </el-table-column>

              <el-table-column prop="username" label="用户名" width="120">
              </el-table-column>

              <el-table-column prop="userstatus" label="用户状态" width="120">
              </el-table-column>
            </el-table>

            <el-pagination :small="true" :hide-on-single-page="true" v-if="gridResult.EvetModels.length" style="margin-top:30px; width: 100%; text-align: center;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="grid.pageIndex" :page-sizes="[5, 10, 20, 30]" :page-size="grid.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="gridResult.pageInfo.totalCount">
            </el-pagination>
          </div>
        </div>

        <div class="result_area">
          <div class="result_area_btn">
            <div>已选择列表</div>
            <el-button @click="delChoose" type="primary" size="mini" icon="el-icon-delete">删除选中</el-button>
          </div>
          <ul class="result_area_list">
            <li :style="item.chooseSave ? '' : 'background:#99ccff'" @click="chooseData(item)" v-for="item in chooseList" :key="item.id">{{item.fullname}}</li>
          </ul>
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
  data: function() {
    return {
      id: '',
      username: '',
      name: '',
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
        name: '',
        username: '',
        pageIndex: 1,
        pageSize: 10
      },
      gridResult: {
        EvetModels: [],
        pageInfo: {
          totalCount: 0
        }
      },
      chooseList: []
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getUsergroupingList()
  },
  methods: {
    // 获取列表数据
    getUsergroupingList() {
      this.requestApi({
        url: '/UserGroupmanagement/GetUsergroupingList',
        method: 'POST',
        data: {
          usergroup_id: this.id,
          username: this.username,
          name: this.name,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        this.tableInfo = res
      })
    },
    // 全选按钮
    userSelection(row) {
      this.batchList = row
    },
    query() {
      this.getUsergroupingList()
    },
    // 重置查询
    reset() {
      this.name = ''
      this.username = ''
      this.pageIndex = 1
      this.pageSize = 10
      this.getUsergroupingList()
    },
    // 批量删除
    batchDel() {
      if (!this.batchList.length) {
        this.$message.success('未选中需要操作的记录！')
        return false
      }
      this.$confirm('是否将选中用户移出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let users = []
        this.batchList.forEach(element => {
          users.push(element.account_id)
        })
        this.requestApi({
          url: '/UserGroupmanagement/RemoveUserGroup',
          method: 'POST',
          data: {
            usergroup_id: this.id,
            userid: users.join(',')
          }
        }).then(res => {
          if (res) {
            this.$message.success('删除成功')
          }
          this.batchList = []
          this.reset()
        })
      })
    },
    delUser(index, row) {
      this.$confirm('是否将当前用户移出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.requestApi({
          url: '/UserGroupmanagement/RemoveUserGroup',
          method: 'POST',
          data: {
            usergroup_id: this.id,
            userid: row.account_id
          }
        }).then(res => {
          if (res) {
            this.$message.success('删除成功')
          }

          this.reset()
        })
      })
    },
    currentChange(page) {
      this.pageIndex = page
      this.getUsergroupingList()
    },

    getUserlist(isShow) {
      this.requestApi({
        url: '/UserGroupmanagement/GetUserList',
        method: 'POST',
        data: this.grid
      }).then(res => {
        res.EvetModels = res.EvetModels.map(item => {
          item.chooseSave = 0
          return item
        })
        this.gridResult = res

        if (isShow) {
          this.dialogVisible = true
        }
        this.$nextTick(() => {
          this.gridResult.EvetModels.forEach(row => {
            let filter = this.chooseList.filter(ele => {
              return ele.id == row.id
            })
            if (filter && filter.length) {
              this.$refs.gridMultipleTable.toggleRowSelection(row, true)
            } else {
              this.$refs.gridMultipleTable.toggleRowSelection(row, false)
            }
          })
        })
      })
    },
    // 隐藏弹出框的列表的全选按钮
    cellClass(row) {
      if (row.columnIndex === 0) {
        return 'disableheadselection'
      }
    },
    addUser() {
      this.getUserlist(true)
    },
    // 判断是勾选还是取消勾选
    judgeUserData(user, isAdd) {
      let isExcist = this.chooseList.findIndex(item => {
        return user.id == item.id
      })

      if (isExcist == -1 && isAdd) {
        user.chooseSave = 1
        this.chooseList.push(user)
      }
      if (isExcist != -1 && !isAdd) {
        this.chooseList.splice(isExcist, 1)
      }
    },
    queryGrid() {
      this.grid.pageIndex = 1
      this.grid.pageSize = 10
      this.getUserlist()
    },
    handleClose() {
      this.resetSearch()
      this.dialogVisible = false
    },
    handleSizeChange(pageSize) {
      this.grid.pageSize = pageSize
      this.getUserlist()
    },
    // 单独勾选或取消勾选
    onTableSelect(rows, row) {
      let filter = rows.findIndex(item => {
        return item.id == row.id
      })

      if (filter != -1) {
        this.judgeUserData(row, true)
      } else {
        this.judgeUserData(row, false)
      }
    },
    delChoose() {
      this.chooseList.forEach((element, index) => {
        if (element.chooseSave == 0) {
          this.chooseList.splice(index, 1)
        }
      })

      this.$nextTick(() => {
        this.gridResult.EvetModels.forEach(row => {
          let filter = this.chooseList.filter(ele => {
            return ele.id == row.id
          })
          if (filter && filter.length) {
            this.$refs.gridMultipleTable.toggleRowSelection(row, true)
          } else {
            this.$refs.gridMultipleTable.toggleRowSelection(row, false)
          }
        })
      })
    },
    chooseData(item) {
      item.chooseSave = item.chooseSave ? 0 : 1
    },
    handleCurrentChange(page) {
      this.grid.pageIndex = page
      this.getUserlist()
    },
    // 清空数据
    resetSearch() {
      this.grid = {
        name: '',
        username: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.chooseList = []
    },
    saveGrid() {
      if (!this.chooseList.length) {
        this.$message.success('请先选择用户')
        return false
      }

      let users = []
      this.chooseList.forEach(element => {
        users.push(element.id)
      })
      this.requestApi({
        url: '/UserGroupmanagement/PostUser_UserGroup',
        method: 'POST',
        data: {
          usergroup_id: this.id
        }
      }).then(res => {
        this.$message.success(res.info)

        this.handleClose()
        this.reset()
      })
    }
  }
}
</script>


<style lang="scss" scoped>
::v-deep .search_result .el-table .disableheadselection .cell .el-checkbox__inner {
  display: none;
}
.search_area {
  display: flex;
  padding: 40px 80px;
}

.grid_content {
  display: flex;
  height: 330px;
}
.choose_area {
  width: 70%;
}
.result_area {
  width: 30%;
}
.search_condition {
  display: flex;
}
.search_result {
  padding-bottom: 20px;
}
.result_area_btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.result_area_list {
  border: 1px solid #666;
  padding: 10px;
  min-height: 280px;
  overflow: auto;
}
</style>
