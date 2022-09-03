<template>
  <div class="orderList">
    <div class="tips">
      只有已签约的订单可以被关联，行程关联订单后，将不能重新关联其他订单，请谨慎选择
    </div>
    <div class="content">
      <el-table :data="tableData.List" stripe style="width: 100%">
        <el-table-column prop="num" label="订单号"> </el-table-column>
        <el-table-column prop="event_name" label="活动名称"> </el-table-column>
        <el-table-column prop="company_name" label="客户公司名">
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button class="tools_btn" size="mini" type="text" @click="select(scope.$index, scope.row)">查看</el-button>
            <el-button class="tools_btn" size="mini" type="text" @click="onselected(scope.$index, scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="pages" background layout="prev, pager, next" :total="tableData.Counts" :current-page="tableData.CurrentPage" @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
/**
 * @page 我的订单
 */
export default {
  name: "orderList",
  data() {
    return {
      addProjectStatus: false, // 编辑/添加开关
      itemData: null, // 单条数据
      tableData: {
        CurrentPage: 1,
        List: [],
      },
    };
  },
  methods: {
    // 编辑
    select(index, row) {
      this.$router.push({
        name: "orderInfo_Hotel",
        params: {
          id: row.id,
        },
      });
    },
    // 冻结
    offShelf(index, row) {
      this.requestApi({
        url: '/serviceprovider/casefrozen',
        method: 'POST',
        data: { id: row.id }
      }).then((res) => {
        this.$message({
          message: "冻结成功！",
          type: "success",
        });
        this.GetList();
      });
    },
    // 删除
    onDelete(index, row) {
      this.requestApi({
        url: '/serviceprovider/casedelete',
        method: 'POST',
        data: { id: row.id }
      }).then((res) => {
        this.$message({
          message: "删除成功！",
          type: "success",
        });
        this.GetList();
      });
    },
    // 获取列表
    GetList() {
      this.requestApi({
        url: '/orderform/list',
        method: 'POST',
        data: {
          Page: this.tableData.CurrentPage,
          Rows: 5,
        }
      }).then((res) => {
        this.tableData = res;
      });
    },
    // 触发页码
    currentChange(page) {
      this.tableData.CurrentPage = page;
      this.GetList();
    },
    // 添加/修改
    save(params) {
      this.requestApi({
        url: '/serviceprovider/casesave',
        method: 'POST',
        data: params
      }).then((res) => {
        this.$message({
          message: params.id ? "修改成功！" : "添加成功！",
          type: "success",
        });
        this.addProjectStatus = false;
        if (!params.id) this.tableData.CurrentPage = 1;
        this.GetList();
      });
    },
    // 选择
    onselected(index, item) {
      this.$emit("selected", item);
    },
  },
  mounted() {
    this.GetList();
  },
};
</script>

<style lang="scss" scoped>
.orderList {
  display: flex;
  flex-direction: column;
  height: 50vh;
}
.title {
  font-size: 16px;
  padding: 15px 20px;
  border-bottom: 1px solid #f6f6f6;
}
.tips {
  background-color: #f2dede;
  text-align: center;
  border-radius: 5px;
  padding: 20px 0;
  color: #b94c49;
}
.content {
  .tools {
    margin-bottom: 15px;
  }
  flex: 1;
  width: 100%;
  overflow: auto;
  padding: 15px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .tools_btn {
    margin-right: 20px;
  }
  .pages {
    margin-top: 20px;
  }
}
</style>
