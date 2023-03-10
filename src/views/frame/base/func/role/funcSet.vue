<template>
  <div v-el-drag-dialog class='bs-new-container dialog-wrapper'>
    <div ref='treeTableDialog' class='dialog-container' type='treeTableDialog'>
      <!-- 头部 -->
      <title-contain :titleName='titleName' @screenChange="setTableHeight" @TitleFun="$emit('closeHandler')" />
      <div class="dialog-container__content">

        <!-- 内容 -->
        <main>
          <div class='left-content'>
            <!-- 标题 -->
            <div class='title' title='菜单信息'>菜单信息</div>
            <!-- 树状列表 -->
            <div class='tree-wrapper' :style="{ height: treeHeight + 'px' }">
              <el-form>
                <el-form-item>
                  <input-validate v-model="filterText" clearable size="mini" placeholder="输入关键字进行过滤" style="padding:5px;"></input-validate>
                </el-form-item>
              </el-form>
              <el-tree ref="tree" :style="{ height: treeHeight - 42 + 'px' }" :data="treeData" node-key="id" :expand-on-click-node="false" :default-expand-all="true" :props="defaultProps" :check-on-click-node="true" @node-click="handleNodeClick" :filter-node-method="filterNode">
              </el-tree>
            </div>
          </div>
          <el-table stripe border class='table-content right-content' ref="singleTable" highlight-current-row style="border:1px solid;" v-loading="loading" element-loading-spinner="el-icon-loading" :element-loading-text="$t('route.load')" :data="tableData" :height='tableHeight' @current-change="handleSelectRow">
            <el-table-column align='center' type="index" fixed="left" width="50" :label='$t("table.id")'></el-table-column>
            <el-table-column width="200" :label="$t('func.role.module')" prop="moduleName">
              <template slot-scope="scope">
                <span>{{scope.row.cname}}</span>
              </template>
            </el-table-column>
            <el-table-column :width='maxWidth' :label="$t('func.role.operateName')" prop="operateName">
              <template slot-scope="scope">
                <div id="checkboxs">
                  <el-checkbox-group v-model="scope.row.checkedList">
                    <el-checkbox v-for="items in scope.row.btnChildren" :key="items.code" :label="items.code"><span>{{items.cname}}</span></el-checkbox>
                  </el-checkbox-group>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </main>
      </div>

      <!-- 底部 -->
      <div class="dialog-footer">
        <el-button v-for='(button, index) in bottomButtons' :key='index' v-db-click size="mini" v-bind='button.attrs' @click='triggerEvent(button.event)'>
          {{$t(button.name)}}
        </el-button>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import request from '@/utils/frame/base/request'
import { notifySuccess, confirmTip } from '@/utils/frame/base/notifyParams'
export default {
  data() {
    return {
      filterText: '',
      tableHeight: null,
      treeHeight: null,
      maxWidth: 200,
      titleName: this.$t('func.role.funcSetting'),
      loading: false,
      currentRow: null,
      tableCols: [],
      tableData: [],
      treeData: [],
      roleCode: this.param,
      moduleCode: '',
      defaultProps: {
        children: 'children',
        label: 'cname'
      },
      bottomButtons: [
        {
          name: 'biz.btn.cancel',
          event: 'cancel'
        },
        {
          name: 'biz.btn.cancelSelect',
          event: this.cancelSelect
        },
        {
          name: 'biz.btn.allViewSelect',
          event: this.allViewSelect
        },
        {
          name: 'biz.btn.allSelect',
          event: this.allSelect
        },
        {
          name: 'biz.btn.save',
          event: this.save,
          showLoading: true,
          attrs: {
            type: 'primary'
          }
        }
      ]
    }
  },
  props: {
    param: String
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getTree()
    //this.initTable()
    this.setTableHeight()
    window.addEventListener('resize', this.setTableHeight, false)
  },
  destroyed() {
    window.removeEventListener('resize', this.setTableHeight)
  },
  methods: {
    // 过滤节点
    filterNode(value, data) {
      return data.cname.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    // 设置列表动态高度
    setTableHeight() {
      $(document).ready(() => {
        this.tableHeight = this.$refs.treeTableDialog.offsetHeight - 77
        this.treeHeight = this.$refs.treeTableDialog.offsetHeight - 109
      })
    },
    getTree() {
      request({
        url: '/api/sys/menu/catalog',
        method: 'POST',
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: ''
        }
      })
        .then(response => {
          this.treeData = response.data
        })
        .catch(() => {})
    },
    // 按钮事件自定义
    triggerEvent(event) {
      if (typeof event === 'function') {
        event()
      } else if (typeof event === 'string') {
        this[event]()
      }
    },
    // 单选
    handleSelectRow(val) {
      this.currentRow = val
    },
    initTable() {
      this.loading = true
      request({
        url: '/api/func/roleFunc/listModulesWithOperatesByModuleCodeAndRole',
        method: 'POST',
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {
            roleCode: this.roleCode,
            moduleCode: this.moduleCode
          }
        }
      })
        .then(response => {
          this.loading = false
          if (response.data) {
            this.tableData = response.data
            this.tableData.forEach(v => {
              const reducer = v.btnChildren.map(v => (v.cname.length + 1) * 14 + 40)
              v.columnLen = reducer.reduce((total, num) => {
                return total + num
              })
              this.maxWidth = Math.max(this.maxWidth, v.columnLen)
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 树点击
    handleNodeClick(node) {
      if (node) {
        this.moduleCode = node.code
        this.loading = true
        request({
          url: '/api/func/roleFunc/listModulesWithOperatesByModuleCodeAndRole',
          method: 'POST',
          data: {
            funcModule: this.$t('route.' + this.$route.meta.title),
            funcOperation: this.$t('biz.btn.search'),
            data: {
              roleCode: this.roleCode,
              moduleCode: this.moduleCode
            }
          }
        })
          .then(response => {
            this.loading = false
            if (response.data) {
              this.tableData = response.data
              this.tableData.forEach(v => {
                const reducer = v.btnChildren.map(v => (v.cname.length + 1) * 14 + 40)
                v.columnLen = reducer.reduce((total, num) => {
                  return total + num
                })
                this.maxWidth = Math.max(this.maxWidth, v.columnLen)
              })
            }
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    // 保存通用事件
    save() {
      this.$confirm(this.$t('biz.msg.confirmSave'), this.$t('biz.msg.tip'), {
        type: 'warning',
        closeOnClickModal: false,
        confirmButtonText: this.$t('biz.btn.confirm'),
        cancelButtonText: this.$t('biz.btn.cancel')
      })
        .then(() => {
          this.loading = true

          var moduleList = []
          for (var i in this.tableData) {
            var obj = {}
            obj.moduleCode = this.tableData[i].code
            obj.checkedList = this.tableData[i].checkedList
            moduleList.push(obj)
          }
          request({
            url: '/api/func/roleFunc/save',
            method: 'POST',
            data: {
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: this.$t('biz.btn.save'),
              data: {
                roleCode: this.roleCode,
                parentModuleCode: this.moduleCode,
                moduleList: moduleList
              }
            }
          }).then(response => {
            this.$notify(notifySuccess({ msg: this.$t('biz.msg.updateSuccess') }))
            this.loading = false

            this.$emit('closeHandler', 'refresh')
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    cancelSelect() {
      for (var i in this.tableData) {
        this.tableData[i].checkedList = []
      }
    },
    allViewSelect() {
      const viewlist = this.$t('datadict.viewButton')
      if (viewlist) {
        let codes = []
        viewlist.forEach(e => {
          codes.push(e.key)
        })
        for (var i in this.tableData) {
          var list = []
          for (var j in this.tableData[i].btnChildren) {
            if (codes.indexOf(this.tableData[i].btnChildren[j].code) > -1) {
              list.push(this.tableData[i].btnChildren[j].code)
            }
          }
          if (!this.tableData[i].checkedList) {
            this.$set(this.tableData[i], 'checkedList', [])
          }
          this.tableData[i].checkedList = list
        }
      }
    },
    allSelect() {
      for (var i in this.tableData) {
        var list = []
        for (var j in this.tableData[i].btnChildren) {
          list.push(this.tableData[i].btnChildren[j].code)
        }
        if (!this.tableData[i].checkedList) {
          this.$set(this.tableData[i], 'checkedList', [])
        }
        this.tableData[i].checkedList = list
      }
    },
    // 取消通用事件
    cancel() {
      // 若界面发生修改则关闭时提示
      if (this.dataIsChange) {
        confirmTip(this, 'confirmCancel')
          .then(() => {
            this.$emit('closeHandler')
          })
          .catch(() => {})
      } else {
        this.$emit('closeHandler')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-checkbox__label {
  font-size: 12px !important;
}
</style>
