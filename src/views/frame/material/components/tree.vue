<template>
  <div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-dropdown>
            <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="addWork(node, data)"><span @click=";(dialogVisible = true), addWork(node, data)">新建文件夹</span></el-dropdown-item>
              <el-dropdown-item @click="editWork(node, data)"><span @click=";(dialogVisible = true), editWork(node, data)">编辑文件夹</span></el-dropdown-item>
              <el-dropdown-item @click="delWork(node, data)"><span @click="delWork(node, data)">删除文件夹</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
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
export default {
  data() {
    return {
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogVisible: false,
      title_: '新建文件夹',
      workName: ''
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    addWork(node, data) {
      this.title_ = '新建文件夹'
      console.log(node, data, 'hkz')
    },
    editWork(node, data) {
      this.title_ = '编辑文件夹'
      console.log(node, data, 'hkz')
    },
    delWork(node, data) {
      console.log(node, data, 'hkz')
    },
    handleClose(done) {
      done()
    },
    // 提交
    present_() {
      console.log('提交', this.workName)
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss">
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>