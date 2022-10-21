<template>
  <div>
    <el-tree :default-expanded-keys="treeData.length > 0 ? [treeData[0].id] : ['0001']" :data="treeData" node-key="id" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node }">
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
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
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
      this.$emit('matter', data)
    },
    handleClose(done) {
      done()
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
    }
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