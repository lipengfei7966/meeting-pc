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
.el-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 !important;
  transform: translate(-50%, -50%);
  max-height: calc(100%);
  max-width: calc(100%);
  display: flex;
  flex-direction: column;
}

.el-dialog__body {
  overflow: auto;
}
.el-dialog__header {
  padding: 15px;
  background: #265588;
}
.el-dialog__title {
  line-height: 24px;
  font-size: 17px;
  color: white;
}
.el-dialog__footer {
  box-shadow: 4px 0 10px #cccccc;
  padding: 10px 20px 10px;
}
</style>