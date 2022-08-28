<template>
  <div class="MemberList">
    <div class="title">成员管理</div>
    <div class="content">
      <div class="tools">
        <el-button type="primary" @click="addMemberStatus = true"
          >添加成员</el-button
        >
      </div>
      <el-table :data="tableData.List" stripe height="100%" style="width: 100%">
        <!-- <el-table-column prop="login_name" label="登录名"> </el-table-column> -->
        <!-- <el-table-column prop="roles_name" label="角色"> </el-table-column> -->
        <el-table-column prop="real_name" label="真实姓名"> </el-table-column>
        <el-table-column prop="phone_number" label="手机号码">
        </el-table-column>
        <el-table-column prop="contact_email" label="邮箱地址">
        </el-table-column>
        <!-- <el-table-column prop="statusname" label="状态"> </el-table-column> -->
        <el-table-column prop="isdefault" label="是否默认">
          <template slot-scope="scope">
              <el-tag v-if="scope.row.isdefault == 1">默认接待员</el-tag>
              <el-tag v-else type="info">接待员</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              class="tools_btn"
              size="mini"
              type="text"
              @click="update(scope.$index, scope.row)"
              >重设</el-button
            >
            <!-- <el-popconfirm
              v-if="scope.row.status === '0019-1'" 
              confirm-button-text="冻结"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定要冻结此用户吗？"
              @confirm="offShelf(scope.$index, scope.row)"
            >
              <el-button
                class="tools_btn"
                size="mini"
                type="text"
                slot="reference"
                >冻结</el-button
              >
            </el-popconfirm>
            <el-popconfirm
              v-else
              confirm-button-text="激活"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定要激活此用户吗？"
              @confirm="onShelf(scope.$index, scope.row)"
            >
              <el-button
                class="tools_btn"
                size="mini"
                type="text"
                slot="reference"
                >激活</el-button
              >
            </el-popconfirm> -->
            <el-popconfirm
              confirm-button-text="删除"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              title="确定要删除此用户吗？"
              @confirm="onDelete(scope.$index, scope.row)"
            >
              <el-button
                class="tools_btn"
                size="mini"
                type="text"
                slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="pages"
        background
        layout="prev, pager, next"
        :total="tableData.Counts"
        :current-page="tableData.CurrentPage"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <!-- 添加新案例 -->
    <el-dialog
      title="添加成员"
      :visible.sync="addMemberStatus"
      :before-close="
        (done) => {
          this.itemData = null;
          done();
        }
      "
      width="500px"
    >
      <memberAdded
        v-if="addMemberStatus"
        @onColse="save"
        :item-data="itemData"
      />
    </el-dialog>
  </div>
</template>

<script>
/**
 * @page 成员管理
 */
import requestApi from '@/utils/requestData'
import memberAdded from "@/components/member-added.vue";
export default {
  name: "MemberList",
  components: { memberAdded },
  data() {
    return {
      addMemberStatus: false, // 编辑/添加开关
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
      this.addMemberStatus = true;
    },
    // 激活
    onShelf(index, row) {
      requestApi({
        url: '/member/activation',
        method: 'POST',
        data: {
          id: row.id,
        },
      }).then((res) => {
          this.$message({
            message: "激活成功！",
            type: "success",
          });
          this.GetList();
        });
    },
    // 冻结
    offShelf(index, row) { 
      requestApi({
        url: '/member/frozen',
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
      requestApi({
        url: '/member/delete',
        method: 'POST',
        data: {
          id: row.id,
        },
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
      requestApi({
        url: '/member/list',
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
      requestApi({
        url: '/member/save',
        method: 'POST',
        data: { member: params, roleIds: params.roleIds },
      }).then((res) => {
          this.$message({
            message: params.id ? "修改成功！" : "添加成功！",
            type: "success",
          });
          this.addMemberStatus = false;
          if (!params.id) this.tableData.CurrentPage = 1;
          this.GetList();
        });
    },
  },
  mounted() {
    this.GetList();
  },
};
</script>

<style lang="scss" scoped>
.MemberList {
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
