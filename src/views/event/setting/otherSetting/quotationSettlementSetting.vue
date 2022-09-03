<template>
  <div class="content">
    <el-button class="btn" type="primary" @click="toPage()">新增报价结算规则</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="company_name" label="客户" width="180"></el-table-column>
      <el-table-column prop="eventtype" label="会议类型" width="180"></el-table-column>
      <el-table-column prop="province_code" label="会议城市"></el-table-column>
      <el-table-column prop="servicerule" label="服务费计算方式"></el-table-column>
      <el-table-column prop="isrestore" label="专票还原税前"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="toPage(scope.row)">编辑</el-button>
          <el-button size="small" v-if="scope.row.is_default" @click="deleteRule(scope.row.id)">删除</el-button>
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
import { guid } from '@/utils/common'
export default {
  data() {
    return {
      tableData: [],
      pager: 1,
      total: 0,
      dialogVisible: false, //删除规则弹框
      id: ''
    }
  },
  mounted() {
    this.getRuleList()
  },
  watch: {
    pager(newVal, oldVal) {
      this.getRuleList()
    }
  },
  methods: {
    guid,
    //查询规则
    getRuleList() {
      this.requestApi({
        url: '/MeetingMa/GetRule',
        method: 'POST',
        data: {
          pageIndex: this.pager, //第几页
          pageSize: 10 //每页多少行
        }
      }).then(res => {
        // console.log(res)
        this.tableData = res.EvetModels //规则配置列表
        this.pager = res.pageInfo.pageIndex //当前第几页
        this.total = res.pageInfo.totalCount //总条数
      })
    },
    //跳转其他页面
    toPage(e) {
      //e.type规则类型    e.id规则配置id
      if (e) {
        //编辑
        this.$router.push({ name: 'quotationSettlementEditor', params: { type: e.is_default, id: e.id, company_name: e.company_name, addOrEdit: 0 } })
      } else {
        //新增
        this.$router.push({ name: 'quotationSettlementEditor', params: { type: 1, id: this.guid(), company_name: 'increase', addOrEdit: 1 } })
      }
    },
    //删除规则
    submitDeleteRule() {
      this.requestApi({
        url: '/MeetingMa/RuleDelete',
        method: 'POST',
        data: {
          RuleID: this.id //规则配置id
        }
      }).then(res => {
        if (res) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
        this.dialogVisible = false
        this.getRuleList()
      })
    },
    deleteRule(id) {
      this.id = id
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.content {
  .btn {
    float: right;
    margin-bottom: 20px;
  }
}
</style>
