<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="cancel"
      width="60%">
       <span slot="title" class="dialog-footer">
           <span style="font-size: 16px;color: #FFFFFF">{{$t('material.dialog.title')}}</span>
           <span style="font-size: 14px;color: rgba(255,255,255,0.6);margin-left: 5px">{{$t('material.dialog.prompt')}}</span>
        </span>
      <el-input
        style="margin-bottom: 10px"
        :placeholder="$t('material.dialog.placeholder')"
        v-model="filterText">
      </el-input>
      <div style="margin-bottom: 10px">
        {{$t('material.dialog.nowCheck')}}： {{ selectInfo.name ? selectInfo.name : $t('material.dialog.none') }}
      </div>
      <div style="height:60vh;overflow:hidden;">
        <el-tree :default-expanded-keys="treeData.length > 0 ? [treeData[0].id] : ['0001']"
                 v-if="dialogVisible"
                 :data="treeData" node-key="id"
                 :props="defaultProps"
                 :filter-node-method="filterNode"
                 :expand-on-click-node="false"
                 :check-strictly="true"
                 :check-on-click-node="true"
                 :show-checkbox="true"
                 @check="treeCheck"
                 ref="moveTree"
                 style="height:100%;overflow-y:scroll;">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
        </span>
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size='mini' @click="cancel">{{ $t('table.cancel') }}</el-button>
        <el-button size='mini' type="primary" @click="handleOk">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'

export default {
  data() {
    return {
      selectInfo: {},
      filterText: '',
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
      getData: null,
      disabledKey: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.moveTree.filter(val)
    },
    dialogVisible(val) {
      if (val == true) {
        this.loadData()
      } else {
        this.treeData = []
        this.disabledKey = []
      }
    }
  },
  methods: {
    setDisabled() {
      let treeData = this.treeData
      this.disabledKey.forEach(k => {
        const loop = (data) => {
          for (const item of data) {
            if (item.id === k) {
              item.disabled = true
              break
            }
            if (item.children && item.children.length) {
              loop(item.children)
            }
          }
        }
        loop(treeData)
      })
    },
    //关闭弹窗
    cancel() {
      this.filterText = ''
      this.selectInfo = {}
      this.dialogVisible = false
      this.$refs.moveTree.setCheckedKeys([])
    },
    handleOk() {
      this.$nextTick(() => {
        if (this.$refs.moveTree.getCheckedNodes()) {
          let id = this.$refs.moveTree.getCheckedNodes()[0].code
          this.$emit('checkFile', id)
        } else {
          this.$message(this.$t('material.dialog.checkTarget'))
        }
      })

    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    //选中
    treeCheck(data, list) {
      //单选实现
      if (list.checkedKeys.length > 0) {
        //单选实现
        this.$refs.moveTree.setCheckedKeys([data.id])
      } else {
        //取消当前选中节点
        this.$refs.moveTree.setCheckedKeys([])
      }
      this.selectInfo = data
    },
    loadData() {
      request({
        url: '/api/cms/materialLibrary/tree',
        method: 'POST',
        data: { data: {}, funcModule: '获取树列表', funcOperation: '获取树列表' }
      })
        .then(res => {
          if (res.data) {
            this.treeData = res.data
            if (this.disabledKey.length > 0) {
              this.setDisabled()
            }
          } else {
          }
        })
        .catch(() => {
        })
    }
  },
  created() {
    //this.loadData()
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


.el-tree > .el-tree-node {
  display: inline-block;
  min-width: 100%;
}

</style>
<style lang="css" scoped>
>>> .el-checkbox__inner {
  border-radius: 50% !important;
}

>>> .el-checkbox__input.is-checked .el-checkbox__inner::after {
  transform: translate(-50%, -50%) scale(1);
}

>>> .el-checkbox__inner::after {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #fff;
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transition: transform .15s ease-in;
}

transform {
  transition-duration: 0.15s;
  transition-timing-function: ease-in;
  transition-delay: 0s;
  transition-property: transform;
}
</style>
