<template>
  <div>
    <!-- :default-expand-all="true" -->
    <!-- @node-expan="expanClick_" -->
    <el-tree :default-expanded-keys="treeData.length > 0 ? [treeData[0].id] : ['0001']" :data="treeData" node-key="id" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false">
      <!-- data -->
      <span class="custom-tree-node" slot-scope="{ node }">
        <span>{{ node.label }}</span>
        <!-- <span>
          <el-dropdown>
            <span class="el-dropdown-link"><i class="el-icon-s-operation el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="addWork(node, data)"><span @click=";(dialogVisible = true), addWork(node, data)">新建文件夹</span></el-dropdown-item>
              <el-dropdown-item @click="editWork(node, data)"><span @click=";(dialogVisible = true), editWork(node, data)">编辑文件夹</span></el-dropdown-item>
              <el-dropdown-item @click="delWork(node, data)"><span @click="delWork(node, data)">删除文件夹</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span> -->
      </span>
    </el-tree>
    <!-- 弹窗 -->
    <el-dialog :title="title_" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
      <span style="font-size: 14px; color: black">文件夹名称：</span>
      <el-input style="width: 80%" v-model="workName" placeholder="请输入文件夹名称："></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="present_">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
export default {
  data() {
    return {
      // 树的数据
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogVisible: false,
      title_: '新建文件夹',
      workName: null,
      // 选中的数据
      getData: null
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
      this.$emit('matter', data)
    },
    addWork(node, data) {
      this.title_ = '新建文件夹'
      // 清空名称
      this.workName = null
      this.getData = data
      console.log(node, data, 'hkz')
    },
    editWork(node, data) {
      this.title_ = '编辑文件夹'
      this.getData = data
      this.workName = data.name
      console.log(node, data, 'hkz')
    },
    delWork(node, data) {
      this.getData = data
      this.del()
      console.log(node, data, 'hkz')
    },
    handleClose(done) {
      done()
    },
    // 提交
    present_() {
      console.log('提交', this.workName)
      if (this.workName == null || this.workName == '') {
        this.dialogVisible = true
        this.$message('请输入文件夹名称')
      } else {
        if (this.title_ == '新建文件夹') {
          this.add()
        } else if (this.title_ == '编辑文件夹') {
          this.getData.name = this.workName
          this.edit()
        }
        this.dialogVisible = false
      }
    },
    loadData() {
      request({
        url: '/api/cms/materialLibrary/tree',
        method: 'POST',
        data: { data: {}, funcModule: '获取树列表', funcOperation: '获取树列表' }
      })
        .then((res) => {
          if (res.data) {
            this.treeData = res.data
            console.log(res.data)
          } else {
          }
        })
        .catch(() => {})
    },
    add() {
      request({
        url: '/api/cms/materialLibrary/save',
        method: 'POST',
        data: { data: { name: this.workName, parent_code: this.getData.code }, funcModule: '新增文件夹', funcOperation: '新增文件夹' }
      })
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.loadData()
          } else {
          }
        })
        .catch(() => {})
    },
    edit() {
      request({
        url: '/api/cms/materialLibrary/update',
        method: 'POST',
        data: { data: this.getData, funcModule: '编辑文件夹', funcOperation: '编辑文件夹' }
      })
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.loadData()
          } else {
          }
        })
        .catch(() => {})
    },
    del() {
      request({
        url: '/api/cms/materialLibrary/remove',
        method: 'POST',
        data: { data: this.getData.id, funcModule: '删除文件夹', funcOperation: '删除文件夹' }
      })
        .then((res) => {
          if (res.data) {
            console.log(res.data)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.loadData()
          } else {
          }
        })
        .catch(() => {})
    }
    // expanClick_(data) {
    //   debugger
    //   console.log(data, '展开')
    // }
  },
  created() {
    this.loadData()
  }
}
</script>

<style lang="scss">
.el-dropdown-link {
  cursor: pointer;
  color: #99a9bf;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.el-tree {
  height: 95vh;
  overflow-x: auto;
}

.el-tree > .el-tree-node {
  display: inline-block;
  min-width: 100%;
}
.el-dialog__body {
  padding: 10px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.el-dialog__header {
  padding: 10px 20px 0px;
}
</style>