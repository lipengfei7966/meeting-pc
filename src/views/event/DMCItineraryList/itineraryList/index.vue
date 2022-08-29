<template>
  <div class="ItineraryList">
    <div class="title">行程管理</div>
    <div class="content">
      <div class="tools">
        <el-button type="primary" @click="addProjectStatus = true;">添加新项目</el-button>
      </div>
      <el-table :data="tableData.List" stripe height="100%" style="width: 100%">
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.start_date | date_day }}
          </template>
        </el-table-column>
        <el-table-column label="行程日期">
          <template slot-scope="scope">
            {{ scope.row.start_date | date_day }} -
            {{ scope.row.end_date | date_day }}
          </template>
        </el-table-column>
        <el-table-column prop="event_name" label="项目名称"> </el-table-column>
        <el-table-column prop="project_manager_name" label="项目经理">
        </el-table-column>
        <el-table-column prop="customer_company_name" label="客户公司名称">
        </el-table-column>
        <el-table-column prop="customer_name" label="客户姓名">
        </el-table-column>
        <el-table-column prop="contact_number" label="联系方式">
        </el-table-column>
        <el-table-column prop="number_of_participants" label="参与人数">
        </el-table-column>
        <el-table-column prop="statusname" label="项目状态"> </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button class="tools_btn" size="mini" type="text" @click="goInfo(scope.$index, scope.row)">查看项目</el-button>
            <el-button class="tools_btn" size="mini" type="text" @click="addStroke(scope.$index, scope.row)">添加行程</el-button>
            <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="确定要取消此项目吗？" v-if="scope.row.status != cancelprojectstatus" @confirm="onDelete(scope.$index, scope.row)">
              <el-button class="tools_btn" size="mini" type="text" slot="reference">取消项目</el-button>
            </el-popconfirm>
            <el-button class="tools_btn" size="mini" type="text" @click="update(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="pages" background layout="prev, pager, next" :total="tableData.Counts" :current-page="tableData.CurrentPage" @current-change="currentChange">
      </el-pagination>
    </div>
    <!-- 添加新项目 -->
    <el-dialog :title="projectTitle" :visible.sync="addProjectStatus" :before-close="
        (done) => {
          this.projectTitle = '添加项目';
          this.itemData = null;
          done();
        }
      " width="700px">
      <projectAdded v-if="addProjectStatus" @onColse="save" :item-data="itemData" />
    </el-dialog>
  </div>
</template>

<script>
/**
 * @page 成员管理
 */
import projectAdded from "@/components/event/project-added.vue";

export default {
  name: "ItineraryList",
  components: { projectAdded },
  data() {
    return {
      projectTitle:"添加项目",
      addProjectStatus: false, // 编辑/添加开关
      cancelprojectstatus:"0022-4",
      itemData: null, // 单条数据
      tableData: {
        CurrentPage: 1,
        List: [],
      },
    };
  },
  methods: {
    // 编辑
    update(index, row) {
      this.itemData = row;
      this.projectTitle="编辑项目";
      this.addProjectStatus = true;
    },
    // 冻结
    offShelf(index, row) {
      this.requestApi({
        url: '/serviceprovider/casefrozen',
        method: 'POST',
        data: {
          id: row.id,
        },
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
        url: '/scheduling/cancelproject',
        method: 'POST',
        data: {
          id: row.id,
        },
      }).then((res) => {
        this.$message({
          message: "项目取消成功！",
          type: "success",
        });
        this.GetList();
      });
    },
    // 获取列表
    GetList() {
      this.requestApi({
        url: '/scheduling/projectlist',
        method: 'POST',
        data: {
          Page: this.tableData.CurrentPage,
          Rows: 10,
        },
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
        url: '/scheduling/projectsave',
        method: 'POST',
        data: params,
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
    // 查看项目
    goInfo(index, item) {
      this.$router.push({
        name: "ItineraryManagementInfo",
        params: {
          id: item.id,
        },
      });
    },
    // 添加行程
    addStroke(index,item) {
      this.$router.push({
        name: "addStroke",
        params: {
          id: item.id,
        },
      });
    },
  },
  mounted() {
    this.GetList();
  },
};
</script>

<style lang="scss" scoped>
.ItineraryList {
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 16px;
  padding: 15px 20px;
  border-bottom: 1px solid #f6f6f6;
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
