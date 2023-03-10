<template>
  <!-- expand-on-click-node: 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点 -->
  <!-- check-on-click-node: 默认值为 false，即只有在点击复选框时才会选中节点 -->
  <!-- check-strictly 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false -->
  <el-popover ref="popover" placement="bottom" trigger="click" :disabled='disabled'>
    <el-tree :data="treeData" :props="defaultProps" :node-key="nodeKey" :show-checkbox="multiple" :expand-on-click-node="!clickParent" :check-on-click-node='multiple' :check-strictly='strictly' :default-expand-all="defaultExpandAll" :default-expanded-keys="defaultExpandedKeys" :default-checked-keys="defaultCheckedKeys" :filter-node-method="filterNode" @node-click="handleNodeClick" @check="handleCheckClick" highlight-current :style="{'min-width': treeWidth}" class="select-tree" ref='tree' v-if='treeData && treeData.length > 0 && !isClear'>
      <span class="custom-tree-node" slot-scope="{ node,data }">
        <i style="color:#999" :class="data.children && data.children.length > 0 ? 'el-icon-folder':'el-icon-document'"></i> {{node.label}}
      </span>
    </el-tree>
    <div v-else :style="{'min-width': treeWidth, 'height': '100px', 'line-height': '100px', 'text-align': 'center'}">{{$t('table.emptyText')}}</div>
    <el-input v-model="treeValue" slot="reference" ref="input" :placeholder="$t('biz.placeholder.choose')" :readonly='multiple' :disabled='disabled' :size='size' :clearable='clearable' @clear='clearFun' @input='inputFun' @focus='focusFun' @blur='blurFun'></el-input>
  </el-popover>
</template>

<script>
export default {
  data() {
    return {
      treeValue: '',
      treeWidth: 'auto',
      treeValueMap: {},
      isClear: false,
      defaultExpandedKeys: [], // 默认展开节点 key 的数组
      defaultCheckedKeys: [] // 默认勾选的节点的 key 的数组
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    defaultProps: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    // 绑定值
    value: {
      type: [String, Array],
      default: null
    },
    // 是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 唯一标识对应字段
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 父节点是否可点击
    clickParent: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'mini'
    },
    treeData: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否关联父子节点
    strictly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    selectCheck: {
      type: Function,
      default: null
    }
  },
  watch: {
    value(newValue) {
      if (this.$refs.tree) this.$refs.tree.setCheckedKeys([])
      if (!newValue || newValue.length === 0) {
        this.treeValue = ''
      } else {
        this.getTreeLabel(this.treeData, newValue)
      }
    },
    treeData(newList) {
      if (!this.value || this.value.length === 0) {
        this.treeValue = ''
      } else if (newList.length > 0) {
        this.getTreeLabel(newList, this.value)
      }
    }
  },
  created() {
    // 获取输入框宽度同步至树状菜单宽度
    this.$nextTick(() => {
      this.treeWidth = `${this.$refs.input.$el.clientWidth}px`
    })
  },
  mounted() {
    $(window).resize(() => {
      this.treeWidth = `${this.$refs.input.$el.clientWidth}px`
    })
  },
  methods: {
    // 点击节点
    handleNodeClick(data) {
      if (!this.multiple) {
        if (this.clickParent || !data.children) {
          if (this.selectCheck) {
            if (!this.selectCheck(data)) {
              return
            }
          }
          this.treeValue = data[this.defaultProps.label]
          this.$emit('change', data[this.nodeKey])
          this.$emit('changAll', data)
          this.$refs.popover.showPopper = false
        }
      }
    },
    // 点击多选框
    handleCheckClick(data, checked) {
      if (this.multiple) {
        if (this.selectCheck) {
          if (!this.selectCheck(data)) {
            return
          }
        }
        if (this.strictly) {
          const checks = []
          checked.checkedNodes.map(v => {
            checks.push(v[this.nodeKey])
          })
          this.$emit('change', checks)
          this.$emit('changAll', checked.checkedNodes)
        } else {
          const checks = []
          checked.checkedNodes.map(v => {
            if (!v.children) checks.push(v[this.nodeKey])
          })
          this.$emit('change', checks)
          this.$emit('changAll', checked.checkedNodes)
        }
      }
    },
    // 处理选中显示
    getTreeLabel(data, value) {
      if (value === '') {
        this.treeValue = ''
        this.clearFun()
        return
      }
      if (!this.multiple) {
        data.forEach(i => {
          if (i[this.nodeKey] === value) {
            this.treeValue = i[this.defaultProps.label]
          } else if (i.children && i.children.length > 0) {
            this.getTreeLabel(i.children, value)
          }
        })
      } else {
        // 判断是否是数组
        if (value instanceof Array) {
          // 展开
          this.defaultExpandedKeys = value
          // 勾选
          this.defaultCheckedKeys = value
          // 显示在输入框
          this.recursionShowValue()
          const tmpArr = []
          value.forEach(i => {
            tmpArr.push(this.treeValueMap[i])
          })
          this.treeValue = tmpArr.join(',')
        }
      }
    },
    // 递归查询树形节点注入map
    recursionShowValue(data = this.treeData) {
      data.forEach(v => {
        this.treeValueMap[v[this.nodeKey]] = v[this.defaultProps.label]
        if (v.children && v.children.length > 0) {
          this.recursionShowValue(v.children)
        }
      })
    },
    // 树节点过滤方法
    filterNode(query, data) {
      if (!query) return true
      return data[this.defaultProps.label].indexOf(query) !== -1
    },
    // 模糊查询
    inputFun(newValue) {
      this.$nextTick(() => {
        // 防止非法字符输入
        this.treeValue = newValue.replace(/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]|[·！#￥（——）：；“”‘、，|《。》？、【】[\]]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gim, '')
        if (!this.$refs.tree) return
        if (this.treeValue) {
          this.$refs.tree.filter(newValue)
          this.$refs.popover.showPopper = true
        } else {
          this.$refs.tree.filter('')
        }
      })
    },
    // 获取焦点
    focusFun() {
      if (!this.$refs.tree) return
      this.$nextTick(() => {
        if (!this.value) {
          this.$refs.tree.filter('')
        } else {
          this.$refs.tree.filter(this.treeValue)
        }
      })
    },
    // 失去焦点
    blurFun() {
      if (this.treeValue === '' || !this.value) {
        this.treeValue = ''
        this.$emit('change', '')
        this.$emit('changAll', null)
      } else if (this.value) {
        // 能匹配则自动补全
        this.getTreeLabel(this.treeData, this.value)
      }
    },
    // 清除
    clearFun(event) {
      if (!this.multiple) {
        this.$emit('change', '')
        this.$emit('changAll', null)

        // 暂时移除 防止清除后再次点开有选中样式BUG
        this.isClear = true
      } else {
        this.$refs.tree.setCheckedKeys([])
        this.$emit('change', [])
        this.$emit('changAll', null)
      }
      this.$nextTick(() => {
        this.$refs.popover.showPopper = false
        this.isClear = false
      })
    }
  }
}
</script>

<style scoped>
.select-tree {
  max-height: 200px;
  overflow-y: scroll;
}
.select-tree::-webkit-scrollbar {
  z-index: 11;
  width: 6px;
}
.select-tree::-webkit-scrollbar-track,
.select-tree::-webkit-scrollbar-corner {
  background: #fff;
}
.select-tree::-webkit-scrollbar-thumb {
  border-radius: 5px;
  width: 6px;
  background: #b4bccc;
}
.select-tree::-webkit-scrollbar-track-piece {
  background: #fff;
  width: 6px;
}
</style>

<style lang='scss'>
.el-popover {
  min-width: unset !important;
  padding: 0 !important;
  .el-tree-node {
    .el-tree-node__content {
      box-sizing: content-box;
      padding: 4px 8px 4px 0;
    }
  }
}
</style>
