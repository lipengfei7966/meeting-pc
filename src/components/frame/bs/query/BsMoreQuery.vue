<template>
  <div v-el-drag-dialog class='bs-container dialog-wrapper'>
    <div class='dialog-container' type='treeTableDialog' ref='treeTableDialog' style='width:900px;'>
      <!-- 头部 -->
      <title-contain titleName='高级查询' @screenChange="setTableHeight" @TitleFun="$emit('closeHandler')"></title-contain>
      <!-- 内容 -->
      <main>
        <div class='left-content' style='border:none !important;'>
          <el-tabs v-model="activeName" type="border-card" style='height:100%;'>
            <el-tab-pane label="候选条件" name="todo" :style="{ height: treeHeight + 'px',overflow: 'auto' }">
              <input-validate class="search-input" size='mini' placeholder="" v-model="filterText" :attrs='{ prefixIcon: "el-icon-search" }' style='margin-top:5px;'></input-validate>
              <el-tree :style="{ height: treeHeight - 40 + 'px' }" ref='selectTree' node-key="prop" default-expand-all :data="selectTreeData" :props="defaultSelectProps" :filter-node-method="filterNode" @node-click="handleOptionNodeClick" @node-contextmenu="handleOptionContextmenu" style='padding:10px;'>
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }} </span>
                  <span v-if="data.prop!=='all'">
                    <el-button type="text" size="mini" @click="() => addOption(data)">
                      添加
                    </el-button>
                  </span>
                </span>
              </el-tree>
              <!-- 右键添加 -->
              <!-- <div class="menu options" v-if="optionMenuVisible" :style="{ left: menuL + 'px', top: menuT + 'px' }">
                <div class="delete" @click="addOption">添加</div>
              </div> -->
            </el-tab-pane>
            <el-tab-pane label="查询方案" name='haveTodo' :style="{ height: treeHeight + 'px' }">
              <el-tree :style="{ height: treeHeight + 'px',overflow: 'auto' }" ref='planTree' node-key="id" default-expand-all :data="planTreeData" :props="defaultPlanProps" @node-click="handlePlanNodeClick" @node-contextmenu="handlePlanContextmenu" style='padding:10px;'>
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }} </span>
                  <span v-if="data.id!=='all'">
                    <el-button type="text" size="mini" v-if="data.id !== defaultPlan" @click="() => deletePlan(data)">
                      删除
                    </el-button>
                    <el-button type="text" size="mini" v-if="data.id !== defaultPlan" @click="() => handleDefaultPlan(data)">
                      设为默认
                    </el-button>
                    <el-button type="text" size="mini" @click="renameVisible = true, renameVal=node.label">
                      重命名
                    </el-button>

                  </span>
                </span>

              </el-tree>
              <!-- 右键方案 -->
              <!-- <div class="menu plan" v-if="planMenuVisible" :style="{ left: menuL + 'px', top: menuT + 'px' }">
                <div class="delete" @click="deletePlan" v-if="activePlanId !== defaultPlan">删除方案</div>
                <div class="rename" @click="renameVisible = true">重命名</div>
                <div class="default" @click="handleDefaultPlan" v-if="activePlanId !== defaultPlan">设为默认查询方案</div>
              </div> -->
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class='right-content'>
          <el-button v-db-click v-if="activeName === 'todo'" size="mini" class="clear-btn" @click='onClear'>
            <svg-icon icon-class="clear" style="margin-right:0px;"></svg-icon>清除
          </el-button>
          <el-tabs type="border-card" style='height:100%;'>
            <el-tab-pane label="查询条件" :style="{ height: treeHeight + 'px',overflow: 'auto' }">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item :label="f.label" v-for="(f, index) in options[activePlanId]" :key="f.prop" label-width='120px'>
                  <el-col :span="4" style="margin-right:5px">
                    <el-select v-model="bsQueryExtras[index] && bsQueryExtras[index].condition" placeholder="">
                      <template v-if='f.type === "date" || f.type === "daterange"'>
                        <el-option label="区间" value="between"></el-option>
                      </template>
                      <template v-else-if=' f.type === "year" || f.type === "month" || f.type === "week"'>
                        <el-option label="等于" value="="></el-option>
                      </template>
                      <template v-else>
                        <el-option label="等于" value="="></el-option>
                        <el-option label="包含" value="like"></el-option>
                        <el-option label="大于" value=">="></el-option>
                        <el-option label="小于" value="<="></el-option>
                        <el-option label="存在" value="in"></el-option>
                      </template>

                    </el-select>
                  </el-col>
                  <el-col :span="16">
                    <!-- 日期 -->
                    <el-form-item v-if='f.type === "daterange"' :prop='f.prop'>
                      <!-- :picker-options="f['picker-options']"  -->
                      <el-date-picker v-model="bsQueryExtras[index].value" type="daterange" range-separator="~" start-placeholder="" end-placeholder="" value-format='yyyy-MM-dd' v-bind='f.attrs' @change='changeDaterangeTime(f)'>
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item v-else-if='f.type === "date" || f.type === "year" || f.type === "month" || f.type === "week"'>
                      <template v-if='f.props && f.props instanceof Array && f.props.length>1'>
                        <el-row :gutter="0">
                          <el-col :span="11">
                            <el-date-picker v-model="bsQueryExtras[index].value && bsQueryExtras[index].value[0]" v-bind='f.attrs' v-on='f.event' value-format='yyyy-MM-dd' :type="f.type" placeholder="">
                            </el-date-picker>
                          </el-col>
                          <el-col :span="2" align='center'>~</el-col>
                          <el-col :span="11">
                            <el-date-picker v-model="bsQueryExtras[index].value && bsQueryExtras[index].value[1]" v-bind='f.attrs' v-on='f.event' value-format='yyyy-MM-dd' :type="f.type" placeholder="">
                            </el-date-picker>
                          </el-col>
                        </el-row>
                      </template>
                      <template v-else>
                        <el-date-picker v-model="bsQueryExtras[index] && bsQueryExtras[index].value" value-format='yyyy-MM-dd' v-bind='f.attrs' v-on='f.event' :type="f.type" placeholder="">
                        </el-date-picker>
                      </template>

                    </el-form-item>
                    <!-- 单选框 -->
                    <el-form-item v-else-if='f.type === "radio"' style="padding:5px;">
                      <el-radio-group v-model="bsQueryExtras[index] && bsQueryExtras[index].value">
                        <el-radio v-for='item in f.list' :key="item.value" :label="item.value" v-bind='f.attrs'>{{item.label}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <!-- 多选框 -->
                    <el-form-item v-else-if='f.type === "checkbox"' style="padding:5px;">
                      <el-checkbox-group v-model="bsQueryExtras[index] && bsQueryExtras[index].value">
                        <el-checkbox v-for='item in f.list' :key="item.value" :label="item.value" v-bind='f.attrs'>{{item.label}}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                    <!-- 下拉输入 -->
                    <el-form-item v-else :prop='f.prop'>
                      <!-- 字典码表 -->
                      <el-select v-if='f.list' v-model="bsQueryExtras[index] && bsQueryExtras[index].value" v-bind='f.attrs' placeholder="" @change='f.event && f.event.change()'>
                        <el-option v-for="item in dataDictList[f.list]" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      <!-- 字典码表list -->
                      <el-select v-else-if='f.list && (!f.attrs || !f.attrs.data)' v-model="bsQueryExtras[index] && bsQueryExtras[index].value" v-bind='f.attrs' placeholder="" @change='f.event && f.event.change()'>
                        <el-option v-for="item in f.list" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      <!-- 公用组件 -->
                      <component v-else :is='f.element' v-model='bsQueryExtras[index] && bsQueryExtras[index].value' v-bind='f.attrs' v-on='f.event' :attrs='f.attrs' :newList='f.list' @changeAll='f.event && f.event.changeAll' @handleSelect='dialogSelect(f)'></component>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="2" style="margin-right:5px">
                    <el-button class='right-button' icon="el-icon-search"></el-button>
                  </el-col> -->
                  <el-col :span="2">
                    <i class="el-icon-delete" v-if="!f.validate && activeName === 'todo'" @click="deleteOption(f)"></i>
                  </el-col>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </main>
      <!-- 底部 -->
      <div class="dialog-footer">
        <el-popover placement="top" width="220" v-model="visible">
          <div style="padding:10px;font-size:12">
            方案名<input-validate v-model.trim="newPlanName" size="mini" class="new-plan-name"></input-validate>
          </div>
          <div style="text-align:right;margin:10px;">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="savePlan">确定</el-button>
          </div>
          <el-button :disabled="activeName === 'haveTodo'" class="save-btn" type="primary" v-db-click size="mini" slot="reference">保存方案</el-button>
        </el-popover>
        <el-button class="del-btn" :disabled="activeName === 'todo' || activePlanId === defaultPlan" v-db-click size="mini" @click="deletePlan">删除方案</el-button>
        <el-button type="primary" v-db-click size="mini" @click="onSave">查询</el-button>
        <el-button v-db-click size="mini" @click="$emit('closeHandler')">关闭</el-button>
      </div>
    </div>

    <el-dialog title="方案重命名" append-to-body :close-on-click-modal='false' width='30%' :visible.sync="renameVisible">
      <el-form>
        <el-form-item label="方案名称">
          <el-input v-model="renameVal" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size='mini' @click="renameVisible = false">取 消</el-button>
        <el-button size='mini' type="primary" @click="confirmRename">确 定</el-button>
      </div>
    </el-dialog>

    <div class="mask"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/frame/base/request'
import { dateFormate } from '@/utils/frame/base/index'
import { confirmTip, notifyInfo, notifySuccess, notifyError } from '@/utils/frame/base/notifyParams'

export default {
  data() {
    return {
      treeHeight: null,
      defaultPlan: '',
      activePlanId: '',
      activeName: 'todo',
      newPlanName: '',
      visible: false,
      judge: '',
      filterText: '',
      optionMenuVisible: false,
      planMenuVisible: false,
      menuL: 0,
      menuT: 0,
      currentAddOption: {},
      renameVisible: false,
      renameVal: '',
      bsQueryExtras: [],
      selectTreeData: [
        {
          prop: 'all',
          label: '所有条件',
          children: []
        }
      ],
      planTreeData: [
        {
          id: 'all',
          name: '方案',
          children: []
        }
      ],
      defaultSelectProps: {
        children: 'children',
        label: 'label'
      },
      defaultPlanProps: {
        children: 'children',
        label: 'name'
      },
      options: {}
    }
  },
  computed: {
    ...mapGetters(['dataDictList'])
  },
  watch: {
    filterText(val) {
      this.$refs.selectTree.filter(val)
    }
  },
  mounted() {
    this.selectTreeData[0].children = this.$parent.$parent.mainData.table.cols

    this.getPlanTree()

    $(document).on('click', () => {
      this.optionMenuVisible = false
      this.planMenuVisible = false
    })

    this.setTableHeight()
    window.addEventListener('resize', this.setTableHeight, false)
  },
  destroyed() {
    window.removeEventListener('resize', this.setTableHeight)
  },
  methods: {
    // 时间变化
    changeDaterangeTime(form) {
      //console.log(form)
      //this.form.listQuery.data[form.props[0]] = this.form.listQuery.data[form.bind] ? this.form.listQuery.data[form.bind][0] : ''
      //this.form.listQuery.data[form.props[1]] = this.form.listQuery.data[form.bind] ? this.form.listQuery.data[form.bind][1] : ''
    },
    // 设置列表动态高度
    setTableHeight() {
      $(document).ready(() => {
        this.treeHeight = this.$refs.treeTableDialog.offsetHeight - 112
      })
    },
    // 请求方案列表 设置默认方案选中状态
    getPlanTree() {
      request({
        url: '/api/sys/queryConfig/page',
        method: 'POST',
        data: {
          page: true,
          data: {
            account: 'admin',
            tableId: this.$route.name
          }
        }
      }).then(response => {
        if (response.data.length) {
          this.planTreeData[0].children = response.data
          this.defaultPlan = response.data.filter(v => v.isDefault === '1')[0].id
          this.activePlanId = this.activePlanId ? this.activePlanId : this.defaultPlan
          this.getPlanData()
          this.$nextTick(() => {
            this.$refs.planTree.setCurrentKey(this.activePlanId)
          })
        } else {
          request({
            url: '/api/sys/queryConfig/save',
            method: 'POST',
            data: {
              data: {
                account: 'admin',
                tableId: this.$route.name,
                isDefault: '1',
                name: '默认',
                queryData: this.$parent.form.formData
              }
            }
          }).then(response => {
            this.$notify(notifySuccess({ msg: '初始化成功' }))
            // 当前选中值为返回id值
            this.activePlanId = response.data
            this.getPlanTree()
          })
        }
      })
    },
    // 请求指定方案对应查询条件
    getPlanData() {
      request({
        url: '/api/sys/queryConfig/get',
        method: 'POST',
        data: {
          page: true,
          data: this.activePlanId
        }
      }).then(response => {
        const { data } = response
        this.$set(this.options, data.id, data.queryData)
        // 清空查询参数
        this.bsQueryExtras = []
        data.queryData.forEach(item => {
          this.bsQueryExtras.push({
            id: item.id,
            condition: item.condition,
            type: item.type,
            prop: item.queryProp ? item.queryProp : item.prop,
            dbType: item.dbDataType,
            value: item.type === 'date' ? [] : '',
            ...(item.type === 'date' && {
              type: 'date'
            })
          })
        })
      })
    },
    // 候选条件 点击节点
    handleOptionNodeClick(data) {
      this.optionMenuVisible = false
    },
    // 查询方案 点击节点
    handlePlanNodeClick(data) {
      this.planMenuVisible = false
      this.activePlanId = data.id
      if (data.id !== 'all') {
        this.getPlanData()
      }
    },
    // 右键 候选条件
    handleOptionContextmenu(event, data, node, self) {
      if (data.label === '所有条件') {
        this.optionMenuVisible = false
        return
      }
      this.$refs.selectTree.setCurrentKey(data.prop)
      this.currentAddOption = data
      this.menuL = event.clientX - this.$refs.treeTableDialog.style.left.split('px')[0]
      this.menuT = event.clientY - this.$refs.treeTableDialog.style.top.split('px')[0] - 64
      this.optionMenuVisible = true
    },
    // 右键 查询方案
    handlePlanContextmenu(event, data, node, self) {
      if (data.name === '方案') {
        this.planMenuVisible = false
        return
      }
      this.$refs.planTree.setCurrentKey(data.id)
      this.activePlanId = data.id
      this.getPlanData()
      this.menuL = event.clientX - this.$refs.treeTableDialog.style.left.split('px')[0]
      this.menuT = event.clientY - this.$refs.treeTableDialog.style.top.split('px')[0] - 64
      this.planMenuVisible = true
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 清空已选查询条件
    onClear() {
      this.options[this.activePlanId] = []
      this.bsQueryExtras = []
    },
    // 添加查询条件
    addOption(currentAddOption) {
      if (!this.options[this.activePlanId].some(v => v.prop === (currentAddOption.queryProp ? currentAddOption.queryProp : currentAddOption.prop))) {
        this.options[this.activePlanId].push({
          label: currentAddOption.label,
          prop: currentAddOption.queryProp ? currentAddOption.queryProp : currentAddOption.prop,
          element: 'input-validate',
          attrs: {
            disabled: false,
            clearable: true
          },
          ...(this.currentAddOption.type === 'date' && {
            type: 'date'
          })
        })
        this.bsQueryExtras.push({
          id: currentAddOption.id,
          condition: '',
          type: currentAddOption.type,
          prop: currentAddOption.queryProp ? currentAddOption.queryProp : currentAddOption.prop,
          value: currentAddOption.type === 'date' ? [] : '',
          ...(currentAddOption.type === 'date' && {
            type: 'date'
          })
        })
      } else {
        this.$notify(notifyInfo({ msg: '查询条件不能重复添加' }))
      }
    },
    // 删除查询条件
    deleteOption(option) {
      this.options[this.activePlanId].splice(this.options[this.activePlanId].indexOf(option), 1)
    },
    // 保存方案
    savePlan() {
      if (!this.newPlanName) {
        this.$notify(notifyInfo({ msg: '方案名不能为空' }))
        return
      }
      request({
        url: '/api/sys/queryConfig/save',
        method: 'POST',
        data: {
          data: {
            account: 'admin',
            tableId: this.$route.name,
            isDefault: this.defaultPlan === this.activePlanId ? '1' : '0',
            name: this.newPlanName,
            queryData: this.options[this.activePlanId]
          }
        }
      }).then(response => {
        this.newPlanName = ''
        this.visible = false
        this.$notify(notifySuccess({ msg: '保存成功' }))
        // 当前选中值为返回id值
        this.activePlanId = response.data
        this.getPlanTree()
      })
    },
    // 删除方案
    deletePlan(data) {
      this.$confirm('提示', {
        message: '是否确认删除',
        type: 'warning',
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        request({
          url: '/api/sys/queryConfig/remove',
          method: 'POST',
          data: {
            data: data.id
          }
        }).then(response => {
          this.$notify(notifySuccess({ msg: '删除成功' }))
          // 清除当前选中id值
          this.activePlanId = ''
          this.getPlanTree()
        })
      })
    },
    // 重命名
    confirmRename() {
      request({
        url: '/api/sys/queryConfig/rename',
        method: 'POST',
        data: {
          data: {
            account: 'admin',
            tableId: this.$route.name,
            id: this.activePlanId,
            isDefault: this.defaultPlan === this.activePlanId ? '1' : '0',
            name: this.renameVal,
            queryData: this.options[this.activePlanId]
          }
        }
      }).then(response => {
        this.$notify(notifySuccess({ msg: '设置成功' }))
        this.renameVal = ''
        this.renameVisible = false
        this.getPlanTree()
      })
    },
    // 设为默认方案
    handleDefaultPlan(data) {
      this.$confirm('提示', {
        message: '是否确认设置为默认方案',
        type: 'warning',
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        request({
          url: '/api/sys/queryConfig/setDefault',
          method: 'POST',
          data: {
            account: 'admin',
            tableId: this.$route.name,
            data: data.id
          }
        }).then(response => {
          this.$notify(notifySuccess({ msg: '设置成功' }))
          this.getPlanTree()
        })
      })
    },
    onSave() {
      this.$emit('searchHandler', this.bsQueryExtras)
    }
  }
}
</script>

<style lang='scss' scoped>
::deep .el-tabs__header {
  .el-tabs__item {
    height: 32px;
    line-height: 32px;
  }
}

::deep .el-tabs__content {
  height: calc(100% - 32px);
}

::deep .el-input--mini .el-input__inner {
  height: 24px;
  line-height: 24px;
}

.left-content {
  .menu {
    position: absolute;
    line-height: 18px;
    padding: 5px;
    border: 1px solid #409eff;
    border-radius: 3px;
    background: #b0cdeb;
    color: #409eff;
    div {
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      &:hover {
        color: #055cb5;
        font-weight: 700;
      }
    }
    &.plan {
      padding: 10px;
      line-height: 24px;
    }
  }
}

.right-content {
  height: 100%;
  position: relative;
  .clear-btn {
    position: absolute;
    right: 10px;
    top: 0;
    padding: 6px 8px;
    z-index: 999;
  }
  .demo-form-inline {
    padding: 10px;
    .el-col-2 {
      .right-button {
        width: 100%;
        height: 24px;
        padding: 0;
        vertical-align: top;
        margin-top: 1px;
      }
      .el-icon-delete {
        margin-left: 5px;
        color: red;
        cursor: pointer;
      }
    }
  }
}
.dialog-footer {
  .save-btn {
    position: absolute;
    top: 6px;
    left: 10px;
  }
  .del-btn {
    position: absolute;
    top: 6px;
    left: 100px;
  }
}

::deep .el-input__inner {
  padding: 6px !important;
}

::deep .search-input .el-input__inner {
  padding-left: 30px !important;
}

.new-plan-name {
  display: inline-block;
  width: 60%;
  margin-left: 10px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 5px;
}
</style>