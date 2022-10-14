<template>
  <div v-el-drag-dialog class='bs-new-container dialog-wrapper'>
    <div ref='formTabDialog' class='dialog-container' type='formTabDialog'>
      <!-- 头部 -->
      <title-contain :titleName='dialog.titleName' @TitleFun="$emit('closeDialog')" />
      <main v-if='dialog.tabs && dialog.tabs.filter(v => { return v.isShow }).length > 0' class='dialog-content'>
        <el-tabs v-model="activeName" type="border-card" @tab-click="tabClick">
          <template v-for='tab in dialog.tabs'>
            <el-tab-pane :key='tab.name' :index='tab.name' :name="tab.name" v-if='tab.isShow'>
              <span slot="label">{{$t(tab.label)}}<span v-if='tab.required' style='color:#f56c6c;'>*</span></span>
              <component :opType='dialog.type' :is='tab.name' @selectRow="handleSelectRow" v-bind='tab.attrs' :extraParam='tab.extraParam' :queryParamArr='tab.queryParamArr' :type='dialog.type' :funcCode='dialog.funcCode' :param='dialog.param' :ref='tab.name' :editForm='editForm' :content='tab.content'></component>
            </el-tab-pane>
          </template>
        </el-tabs>
        <!-- 二级弹窗 -->
        <view-form-edit ref='viewFormEdit' v-if='dialogLv2Visible' @closeHandler='dialogHandler' :param='dialog.param' :extraParam='extraParam' :queryParamArr='queryParamArr' :opType="dialog.opType" :opMode='dialog.opMode' :initChooseParam='initChooseParam'></view-form-edit>
      </main>
      <main v-else>
        <!-- 二级弹窗 -->
        <view-form-edit ref='viewFormEdit' v-if='dialogLv2Visible' @closeHandler='dialogHandler' :param='dialog.param' :extraParam='extraParam' :queryParamArr='queryParamArr' :opType="dialog.opType" :opMode='dialog.opMode' :initChooseParam='initChooseParam'></view-form-edit>
      </main>
      <!-- 底部 -->
      <div class="dialog-footer">
        <el-button v-for='(button, index) in dialog.bottomButtons' :key='index' v-db-click size="mini" v-bind='button.attrs' @click='triggerEvent(button.event)'>
          {{$t(button.name)}}
        </el-button>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import request from '@/utils/frame/base/request'
import { dateFormate } from '@/utils/frame/base/index'
import { notifyInfo, confirmTip } from '@/utils/frame/base/notifyParams'
const registerComponent = data => {
  data.forEach(item => {
    if (item.component && item.element !== 'base-dialog-select' && item.element !== 'base-select') {
      Vue.component(item.name, item.component)
    }
  })
}
export default {
  data() {
    return {
      currentRow: null,
      loading: false,
      activeName: this.dialog.tabs && this.dialog.tabs[0] && this.dialog.tabs[0].name,
      editForm: {},
      dialogLv2Visible: false,
      dialogSelectProp: {}, // 打开弹窗的标识,
      initChooseParam: {}, // 打开弹窗额外参数传入
      extraParam: {}, // 打开弹窗额外参数传入
      queryParamArr: []
    }
  },
  provide() {
    return {
      BsDialogTab: this
    }
  },
  props: {
    dialog: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  componentName: {
    type: String,
    default() {
      return 'BsDialogTab'
    }
  },
  beforeMount() {
    if (Array.isArray(this.dialog.tabs)) registerComponent(this.dialog.tabs)
    if (this.dialog.tabs && this.dialog.tabs.length > 0) {
      this.dialog.tabs.forEach(v => {
        // 根据isShow字段判断是否显示
        if (v.isShow === undefined) {
          v.isShow = true
        } else {
          if (Array.isArray(v.isShow)) {
            v.isShow = v.isShow.includes(this.dialog.type)
          }
        }
      })
      this.activeName =
        this.dialog.tabs.filter(v => {
          return v.isShow
        }).length > 0
          ? this.dialog.tabs.filter(v => {
              return v.isShow
            })[0].name
          : ''
    }
  },

  methods: {
    // 返回指定过滤条件结果
    dataFormat(func = 'dataDictFormat', value, list, dictType) {
      if (dictType) {
        list = this.$t(dictType)
      }
      return Vue.filter(func)(value, list)
    },

    // 关闭通用事件
    close(buttonInfo) {
      if (typeof buttonInfo.callback === 'function') {
        buttonInfo.callback()
      } else {
        this.$emit('closeDialog')
      }
    },
    // 按钮事件自定义
    triggerEvent(event) {
      if (typeof event === 'function') {
        event()
      } else if (typeof event === 'string' && this[event]) {
        this[event]()
      }
    },

    // 开始时间变化
    changeStartTime(date) {
      this.dateEndBefore = {
        disabledDate(time) {
          return time < new Date(dateFormate(date, 'YYYY/MM/DD'))
        }
      }
    },

    // 结束时间变化
    changeEndTime(date) {
      this.dateStartBefore = {
        disabledDate(time) {
          return date ? time > new Date(dateFormate(date, 'YYYY/MM/DD')) : false
        }
      }
    },
    // 关闭通用事件
    close() {
      this.$emit('closeDialog')
    },

    // 取消通用事件
    cancel() {
      this.$emit('closeDialog')
    },
    handleSelectRow(item) {
      this.currentRow = item
    },
    //切换tab
    tabClick() {
      this.currentRow = null
    },
    // 选择数据带出通用事件
    choose() {
      if (this.dialog.tabs) {
        if (!this.currentRow || this.currentRow.length === 0) {
          this.$notify(
            notifyInfo({
              msg: this.$t('biz.msg.noRowSelected')
            })
          )
          return
        }
        this.$emit('closeDialog', this.currentRow)
      }
    },

    // 二级弹窗关闭回调
    dialogHandler(param) {
      if (param && this.dialogSelectProp && !this.$toolUtil.isEmptyObject(this.dialogSelectProp)) {
        this.$nextTick(() => {
          if (this.dialogSelectProp.beforeCallback) {
            if (this.dialogSelectProp.beforeCallback(param)) {
              this.dialogLv2Visible = false
            } else {
              return false
            }
          } else {
            this.dialogLv2Visible = false
          }
          if (typeof this.dialogSelectProp.callback === 'function') {
            this.dialogSelectProp.callback(param)
          } else {
            this.$emit('closeLv2Dialog', param)
          }
        })
      } else {
        this.dialogLv2Visible = false
      }
    }
  }
}
</script>
