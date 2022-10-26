<template>
  <div v-el-drag-dialog class='bs-new-container dialog-wrapper'>
    <div class='dialog-container' :style="{width: this.sidebar.opened ? '1166px' : '1326px'}">
      <title-contain titleName="代码生成定义" @TitleFun="$emit('closeHandler')"></title-contain>

      <el-row class='top-operate'>
        <el-button size="mini" v-db-click @click="$emit('closeHandler')">
          <svg-icon icon-class="cancel"></svg-icon>{{$t('biz.btn.cancel')}}
        </el-button>
        <el-button size="mini" type='primary' :loading="generateLoading" v-db-click @click='onSave'>
          <svg-icon icon-class="save"></svg-icon>{{$t('biz.btn.generate')}}
        </el-button>

      </el-row>

      <div class='dialog-content' :style="{maxHeight: clientHeight - 80 + 'px', overflowY: 'auto'}">
        <!-- 基本设置 -->
        <header key='base' :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto', 'border-bottom-width': menuInfoVisible ? '1px' : '0'}">
          <div class='form-title'>代码信息
            <i :class="['el-icon-arrow-down', {'el-icon-arrow-up' : !menuInfoVisible}]" @click='menuInfoVisible = !menuInfoVisible'></i>
          </div>
          <el-form v-if='menuInfoVisible' class="header-form-inline" :model="page" label-position="left" :rules='rules' ref="refForm" :show-message="false">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="页面布局" prop='pageTemp'>
                  <el-select v-model="page.pageTemp">
                    <el-option v-for="item in $t('datadict.codePageTemp')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="表名称" prop='table'>
                  <input-validate v-model='page.table' :clearable='false'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="package目录(不含模块)" prop='javaPackage'>
                  <input-validate v-model='page.javaPackage' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>

              <el-col :span=" 6">
                <el-form-item label="包模块" prop='packageModule'>
                  <input-validate v-model='page.packageModule' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>

              <el-col :span=" 6">
                <el-form-item label="日志模块" prop='logModel'>
                  <input-validate v-model='page.logModel' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="模型接口" prop='modelInterfaceArray'>
                  <el-checkbox-group align="left" v-model="page.modelInterfaceArray">
                    <el-checkbox v-for="item in $t('datadict.codeModelInterface')" :key="item.value" :label="item.label" :value="item.value">
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="代码模板" prop='codeTemp'>
                  <el-select v-model="page.codeTemp" @change='codeTempChange'>
                    <el-option v-for="item in $t('datadict.codeTempType')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发号前缀" prop='seqPrefix'>
                  <input-validate v-model='page.seqPrefix' :clearable='false' :disabled='seqTypeDisabled'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="发号长度" prop='seqLength'>
                  <input-validate v-model='page.seqLength' :clearable='false' :disabled='seqTypeDisabled'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="管理页打开方式" prop='vueEditMode'>
                  <el-select v-model="page.vueEditMode">
                    <el-option v-for="item in $t('datadict.vueEditMode')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span=" 6">
                <el-form-item label="树代码属性" prop='treeCodePro'>
                  <el-select v-model="page.treeCodePro" filterable clearable>
                    <el-option v-for="item in columnsData" :key="item.code" :label="item.code" :value="item.code" />
                  </el-select>

                </el-form-item>
              </el-col>
              <el-col :span=" 6">
                <el-form-item label="树名称属性" prop='treeCodeName'>
                  <el-select v-model="page.treeCodeName" filterable clearable>
                    <el-option v-for="item in columnsData" :key="item.code" :label="item.code" :value="item.code" />
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </header>

        <!-- 内容设置 -->
        <main key='list' :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto'}">
          <el-tabs v-model="activeName" type="border-card">
            <!-- 业务属性设置 -->
            <el-tab-pane label='子表信息' name="biz">
              <div class="trans_sub">
                <el-transfer style="text-align: left; display: inline-block;" :titles="['列表', '选中']" filterable filter-placeholder="请输入表信息" v-model="page.subTableArray" :data="tableArray">
                  <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
                </el-transfer>
              </div>
            </el-tab-pane>

          </el-tabs>
        </main>

      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import request from '@/utils/frame/base/request'
import { notifySuccess, notifyError } from '@/utils/frame/base/notifyParams'
import { getToken } from '@/utils/frame/base/auth'

export default {
  data() {
    return {
      generateLoading: false,
      activeName: 'biz',
      menuInfoVisible: true,
      loadingForm: false,
      tableArray: [],
      columnsData: [],
      seqTypeDisabled: true,
      // 表单规则
      rules: {
        appCode: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        table: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        pageTemp: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        javaPackage: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        packageModule: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        codeTemp: [
          {
            required: true,
            trigger: 'blur'
          }
        ]
      },
      // 数据结构
      page: {
        appCode: this.param.appCode,
        table: this.param.table,
        javaPackage: 'com.ctgbs.framework.biz',
        packageModule: 'sys',
        logModel: 'FrameModelConstant.SYS',
        seqPrefix: '',
        seqLength: '',

        treeCodePro: '',
        treeNamePro: '',
        pageTemp: 'single',

        modelInterfaceArray: [],

        subTableArray: []
      }
    }
  },
  props: {
    opType: {
      type: String
    },
    param: {
      type: [Object, String],
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'clientWidth', 'clientHeight'])
  },
  mounted() {
    //初始化
    this.init()
  },
  methods: {
    filterMethod(query, item) {
      return item.pinyin.indexOf(query) > -1
    },

    codeTempChange(val) {
      //code发号才要定义前缀和长度
      if (val && val === 'code') {
        this.seqTypeDisabled = false
      } else {
        this.seqTypeDisabled = true
      }
    },
    // 初始化下拉数据
    init() {
      //表信息
      request({
        url: '/api/code/generator/list',
        method: 'post',
        data: {
          isPage: false,
          data: { codeApp: this.param.appCode },
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search')
        }
      })
        .then(response => {
          response.data.forEach(data => {
            this.tableArray.push({
              key: data.tableName,
              label: data.tableComment
            })
          })
        })
        .catch(() => {})
      //字段信息

      request({
        url: '/api/code/generator/queryColumns',
        method: 'POST',
        data: {
          data: { codeApp: this.param.appCode, tableName: this.param.table },
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search')
        }
      })
        .then(response => {
          if (response.data && response.data.length > 0) {
            response.data.forEach(e => {
              this.columnsData.push(e)
            })
          }
          this.loadingForm = false
        })
        .catch(() => {
          this.loadingForm = false
        })
    },

    handleCloseDialog(params) {
      this.$emit('closeHandler', params)
    },
    // 保存菜单
    onSave() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          this.$confirm(this.$t('biz.msg.confirmSave'), this.$t('biz.msg.tip'), {
            type: 'warning',
            closeOnClickModal: false,
            confirmButtonText: this.$t('biz.btn.confirm'),
            cancelButtonText: this.$t('biz.btn.cancel')
          }).then(async () => {
            this.generateLoading = true
            axios({
              method: 'post',
              url: process.env.BASE_API + '/api/code/generator/code',
              data: {
                funcModule: this.$t('route.' + this.$route.meta.title),
                funcOperation: '生成',
                data: this.page
              },
              headers: {
                Authorization: 'bearer ' + (getToken() ? getToken() : this.$store.getters.token)
              },
              responseType: 'blob'
            })
              .then(response => {
                this.generateLoading = false
                if (response.data) {
                  const url = window.URL.createObjectURL(new Blob([response.data]))
                  const link = document.createElement('a')
                  link.style.display = 'none'
                  link.href = url
                  link.setAttribute('download', 'src.zip')
                  document.body.appendChild(link)
                  link.click()
                  link.remove()
                  this.$notify(
                    notifySuccess({
                      msg: '生成成功'
                    })
                  )
                }
                this.handleCloseDialog(true)
              })
              .catch(error => {
                this.generateLoading = false
                this.$notify(
                  notifyError({
                    msg: '生成失败'
                  })
                )
              })
          })
        }
      })
    }
  }
}
</script>

<style scoped >
.trans_sub >>> .el-transfer-panel {
  width: 480px;
}
</style>