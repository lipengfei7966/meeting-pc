<template>
  <div class="content">

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
            配置结算审批流
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="header">
      <div style="text-align:left;">
        <p>客户：{{companyinfo.company_name}}</p>
        <p>备注说明：{{companyinfo.remarks}}</p>
      </div>
      <div>
        <el-button size="mini" type="primary" @click="edit">编辑</el-button>
      </div>
    </div>
    <!-- <div class="approval-box">
      <div class="approval-title">
        <span>结算单审批管理</span>
        <span>
          <el-row>
            <el-button type="primary" @click="QueryApproval">添加审批步骤</el-button>
          </el-row>
        </span>
      </div>
    </div> -->
    <div class="add_approval_btn">
      <el-button type="primary" @click="QueryApproval">添加审批步骤</el-button>
    </div>
    <div class="approval-body">
      <el-table :data="approvalList" border style="width: 100%">
        <el-table-column label="审批步骤名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.approve_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注说明" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.remarks }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审批人" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.apprevername }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px" @click="stateData(scope.$index, 0)" v-show="scope.row.state == '启用'">
              <div class="disable step-status-on">
                {{ scope.row.state }}
              </div>
            </span>
            <span style="margin-left: 10px" @click="stateData(scope.$index, 1)" v-show="scope.row.state == '停用'">
              <div class="disable step-status-on" style="background-color: #ef4409">
                {{ scope.row.state }}
              </div>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="step-operation-edit edit" @click="QueryApprovalEdit(scope.$index, 0)">编辑</div>
            <div class="step-operation-copy copy" @click="QueryApprovalEdit(scope.$index, 1)">复制</div>
            <div class="step-operation-del del" @click="approveDeletion(scope.$index)">删除</div>
          </template>
        </el-table-column>
        <el-table-column label="排序" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              <span @click="upL(scope.$index)">
                <img :src="require('@/assets/images/on.png')" alt="" style="width: 17px" />
              </span>
              <span @click="downL(scope.$index)">
                <img :src="require('@/assets/images/up.png')" alt="" style="width: 17px" />
              </span>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      companyinfo: {
        company_name: '',
        remarks: ''
      },
      type: '',
      approvalList: [],
      approval: {},
      stype: 0,
      tableCellads: false
    }
  },
  mounted() {
    this.type = this.$route.query.type
    this.id = this.$route.query.id
    this.GetApporval()
    this.approvalProcessQuery()
  },
  created() {
    this.requestApi({
      url: '/Approval/SettlementOvertimel',
      method: 'POST',
      data: {}
    }).then(res => {
      if (res) {
      }
    })
  },
  activated() {
    this.type = this.$route.query.type
    this.id = this.$route.query.id
  },
  methods: {
    GetApporval() {
      this.requestApi({
        url: '/Approval/GetApporval',
        method: 'POST',
        data: {
          type: this.type,
          id: this.id
        }
      }).then(res => {
        if (res && res.length) {
          this.companyinfo = res[0]
        }
      })
    },
    stateData(index, type) {
      this.requestApi({
        url: '/Approval/ApprovaProcessState',
        method: 'POST',
        data: {
          id: this.approvalList[index].id,
          Type: type
        }
      }).then(res => {
        if (res) {
          location.reload()
        }
      })
    },
    approveDeletion(index) {
      if (this.approvalList.length <= 1) {
        this.openVn()
        return
      }
      this.$confirm('是否删除改审批步骤?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.approveDeletiond(index)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    openVn() {
      const h = this.$createElement
      this.$message({
        message: h('p', null, [
          h('span', null, '请至少保留一个审批步骤')
          // h('i', { style: 'color: teal' }, 'VNode')
        ])
      })
    },
    upL(index) {
      if (index === 0) return
      let item = this.approvalList.splice(index, 1)
      this.approvalList.splice(index - 1, 0, item[0])
      let tempArr = []
      this.approvalList.forEach((item, index) => {
        tempArr.push({
          id: item.id,
          sort: index + 1
        })
      })
      this.requestApi({
        url: '/Approval/ApprovaProcessSort',
        method: 'POST',
        data: {
          Parameter: JSON.stringify(tempArr)
        }
      }).then(res => {})
    },
    // 向下
    downL(index) {
      if (index === this.approvalList.length - 1) return
      let item = this.approvalList.splice(index, 1)
      this.approvalList.splice(index + 1, 0, item[0])

      let tempArr = []
      this.approvalList.forEach((item, index) => {
        tempArr.push({
          id: item.id,
          sort: index + 1
        })
      })
      this.requestApi({
        url: '/Approval/ApprovaProcessSort',
        method: 'POST',
        data: {
          Parameter: JSON.stringify(tempArr)
        }
      }).then(res => {})
    },
    //查询
    approvalProcessQuery() {
      this.requestApi({
        url: '/Approval/GetApprovaProcess',
        method: 'POST',
        data: {
          type: 1,
          approval_id: this.id
        }
      }).then(res => {
        this.approvalList = res.length ? res : []
      })
    },
    //添加审批步骤跳转
    QueryApproval() {
      let isDefalt = this.companyinfo.company_name == 'ALL' ? 1 : 0
      this.$router.push({
        name: 'approvalsteps',
        // query: { id: this.eventId, type: this.type },
        query: { id: this.id, type: this.type, isDefalt }
      })
    },
    //点击编辑请求接口并且跳转
    QueryApprovalEdit(index, typeM) {
      let isDefalt = this.companyinfo.company_name == 'ALL' ? 1 : 0
      this.requestApi({
        url: '/Approval/GetApprovaProcessEdit',
        method: 'POST',
        data: {
          ID: this.approvalList[index].id,
          type: typeM
        }
      }).then(res => {
        this.approval = res
        this.$router.push({
          name: 'approvalsteps',
          query: { id: this.id, approval: JSON.stringify(this.approval), type: 1, typeM, isDefalt }
        })
      })
    },
    //删除
    approveDeletiond(index) {
      this.requestApi({
        url: '/Approval/ApprovaProcessDelete',
        method: 'POST',
        data: { id: this.approvalList[index].id }
      })
        .then(res => {
          if (res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            location.reload()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '删除失败'
          })
        })
    },
    edit() {
      this.$router.push({
        name: 'addeditApprovalrule',
        query: {
          id: this.id,
          type: this.type,
          back: 'settlementSheet'
        }
      })
    }
  }
  // settlementPersonnel(index,type){
  //    this.$api.settlementPersonnel({}, 'POST').then((res) => {
  //         if(res){
  //         }
  //     });
  // }
}
</script>

<style lang="scss">
.approval-box {
  padding: 20px;
  background: #fff;
}
.content {
  width: 1100px;
  margin: 0 auto;
}
.approval-title {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  color: #57638a;
  font-size: 14px;
  line-height: 20px;
  position: relative;
  margin-left: 800px;
}
.approval-step-header,
.approval-step-item {
  display: flex;
  justify-content: space-around;
}
.approval-step-header {
  background-color: #e6e9f2;
  border: solid 1px #e0e0e0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding: 15px 20px;
  color: #333333;
}
.el-table thead {
  text-align: center;
  color: #6a6d72;
  font-weight: 500;
}
.approval-step-item {
  border: solid 1px #e0e0e0;
  border-top: none;
  font-size: 14px;
  line-height: 20px;
  padding: 15px 20px;
  color: #333333;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.step-title {
  float: left;
  width: 190px;
  margin-right: 10px;
}
.step-title {
  float: left;
  width: 190px;
  margin-right: 10px;
}
.step-user {
  float: left;
  width: 170px;
  margin-right: 10px;
}
.step-status {
  float: left;
  width: 100px;
  margin-right: 10px;
}
.step-status-on {
  width: 50px;
  line-height: 20px;
  border-radius: 2px;
  background-color: #2dc62c;
  color: #ffffff;
  text-align: center;
  cursor: pointer;
}
.step-operation {
  display: flex;
  width: 180px;
  text-align: center;
  margin-right: 10px;
}
.step-operation-edit:link {
  color: #5bc0de;
  text-decoration: none;
}
.step-operation-edit {
  color: #5bc0de;
  margin-right: 20px;
}
.step-operation-copy:link {
  color: #5bc0de;
  text-decoration: none;
}
.step-operation-copy {
  color: #5bc0de;
  margin-right: 20px;
}
.step-operation-del:link {
  color: #f05e5f;
  text-decoration: none;
}
.drag-btn {
  cursor: move;
}
.step-drag {
  float: left;
  width: 40px;
}
.el-table td.el-table__cell div {
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-around;
}
.header {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
}
.add_approval_btn {
  margin: 20px 0;
  text-align: right;
}
</style>