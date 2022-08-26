<template>
  <div v-el-drag-dialog='"max"' class='dialog-wrapper'>
    <div class='dialog-container' :style="{width: this.sidebar.opened ? '1166px' : '1326px'}">
      <title-contain titleName="弹窗代码定义" @TitleFun="$emit('closeHandler')"></title-contain>

      <el-row class='top-operate'>
        <el-button size="mini" v-db-click @click="$emit('closeHandler')">
          <svg-icon icon-class="cancel"></svg-icon>{{$t('biz.btn.cancel')}}
        </el-button>
        <el-button size="mini" type='primary' v-db-click @click='onSave'>
          <svg-icon icon-class="save"></svg-icon>{{$t('biz.btn.save')}}
        </el-button>

      </el-row>

      <div class='dialog-content' v-if="showInfo" :style="{maxHeight: clientHeight - 80 + 'px', overflowY: 'auto'}">
        <!-- 基本设置 -->
        <header key='base' :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto', 'border-bottom-width': menuInfoVisible ? '1px' : '0'}">
          <div class='form-title'>代码信息
            <i :class="['el-icon-arrow-down', {'el-icon-arrow-up' : !menuInfoVisible}]" @click='menuInfoVisible = !menuInfoVisible'></i>
          </div>
          <el-form v-if='menuInfoVisible' class="header-form-inline" :model="page" label-position="left" :rules='rules' ref="refForm" :show-message="false">
            <el-row :gutter="20">

              <el-col :span="6">
                <el-form-item label="应用" prop='appCode'>
                  <el-select v-model="page.appCode">
                    <el-option v-for="item in appCodeOption" :key="item.code" :label="item.name" :value="item.code"></el-option>
                  </el-select>

                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="功能名称" prop='name'>
                  <input-validate v-model='page.name' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="功能代码" prop='code'>
                  <input-validate v-model='page.code' :disabled='true' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="表类型" prop='tableType'>
                  <el-select v-model="page.tableType">
                    <el-option v-for="item in $t('datadict.codeTableType')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="上级" prop='parentCode'>
                  <base-select size="mini" v-model="page.parentCode" :attrs="{data: 'CODE_DATA_MODEL'}"></base-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="模型分类" prop='modelClass'>
                  <el-select v-model="page.modelClass" @change='modelClassChange'>
                    <el-option v-for="item in $t('datadict.codeModelClass')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="表名称" prop='tableName'>
                  <base-select size="mini" v-model="page.tableName" @changeAll='tableNameChange' :attrs="{labelShowCode: true, clearable: true, filterable: true, data: 'CODE_TABLE',  params: {  queryPro: 'tableName',  codeApp: page.appCode }   }"></base-select>
                </el-form-item>
              </el-col>
              <el-col :span=" 6">
                <el-form-item label="表描述" prop='tableComment'>
                  <input-validate v-model='page.tableComment' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发号方式" prop='seqType'>

                  <el-select v-model="page.seqType" @change='seqTypeChange'>
                    <el-option v-for="item in $t('datadict.codeSeqType')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>

                </el-form-item>
              </el-col>
              <el-col :span=" 6">
                <el-form-item label="发号前缀" prop='seqPrefix'>
                  <input-validate v-model='page.seqPrefix' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span=" 6">
                <el-form-item label="发号长度" prop='seqLength'>
                  <input-validate v-model='page.seqLength' :clearable='true'></input-validate>
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

            </el-row>
          </el-form>
        </header>

        <!-- 接口数据json -->
        <header key='json' v-if='pageSqlVisible' :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto', 'border-bottom-width': pageSqlVisible ? '1px' : '0'}">
          <div class='form-title'>SQL/Json数据 </div>
          <el-form class="header-form-inline" :model="page" label-position="left" :rules='rules' ref="refForm3" :show-message="false">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-input v-model='page.sqlJson' :clearable='true' type="textarea" rows="3"></el-input>
              </el-col>
            </el-row>
          </el-form>
        </header>

        <!-- 内容设置 -->
        <main key='list' :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto'}">
          <el-tabs v-model="activeName" type="border-card">

            <!-- 业务属性设置 -->
            <el-tab-pane label='业务属性' name="biz">

              <div class='tabs-operate' style='margin-top: 5px;'>
                <el-button v-db-click size="mini" @click='initRow'>
                  <svg-icon icon-class="addLine"></svg-icon>导入属性
                </el-button>
                <el-button v-db-click size="mini" @click='addRow'>
                  <svg-icon icon-class="addLine"></svg-icon>{{ $t('biz.btn.addRow') }}
                </el-button>
                <el-button v-db-click size="mini" @click='deleteRow'>
                  <svg-icon icon-class="delete"></svg-icon>{{ $t('biz.btn.deleteRow') }}
                </el-button>
              </div>
              <el-table stripe border class='table-content tb-edit' ref="singleTable" highlight-current-row v-loading="loadingForm" element-loading-spinner="el-icon-loading" :element-loading-text="$t('route.load')" :height='320' :data="page.bizDtlData" @current-change="handleSelectRowForm">
                <el-table-column align='center' type="index" fixed="left" width="50" :label='$t("table.id")'></el-table-column>
                <el-table-column width='140'>
                  <template slot="header" slot-scope="scope">
                    编码
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.code" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column width='140'>
                  <template slot="header" slot-scope="scope">
                    名称
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.name" size='mini'></input-validate>
                  </template>
                </el-table-column>

                <el-table-column width='140'>
                  <template slot="header" slot-scope="scope">
                    表单类型
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <el-select v-model="scope.row.componentType" size='mini' :placeholder="$t('biz.placeholder.choose')">
                      <el-option v-for="item in $t('datadict.codeFormType')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label='引用' width='140'>
                  <template slot-scope='scope'>
                    <el-select :remote-method="remoteJoinData" @change='changeJoinData' v-model="scope.row.joinInfo" size='mini' remote filterable clearable :placeholder="$t('biz.placeholder.choose')">
                      <el-option v-for="item in joinDataOption" :key="item.code" :label="item.name" :value="item.code">{{item.name}}({{item.code}})</el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label='字典' width='140'>
                  <template slot-scope='scope'>
                    <!-- <el-select :remote-method="remoteDictData" @change='changeDictData' v-model="scope.row.dictInfo" size='mini' remote filterable clearable :placeholder="$t('biz.placeholder.choose')">
                      <el-option v-for="item in dictDataOption" :key="item.code" :label="item.name" :value="item.code">{{item.name}}</el-option>
                    </el-select> -->
                  </template>
                </el-table-column>
                <el-table-column label='备注' width='180'>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.remark" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <!-- <el-table-column label="代码属性"> -->

                <el-table-column label='数据库类型' width='100'>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.dbDataType" size='mini' :disabled='true'></input-validate>
                  </template>
                </el-table-column>

                <el-table-column label='属性类型' width='100'>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.dataType" size='mini' :disabled='true'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column label='字段长度' width='140'>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.dataLength" size='mini' :disabled='true'></input-validate>
                  </template>
                </el-table-column>

                <el-table-column label='允许空值' width='80' align='center'>
                  <template slot-scope='scope'>
                    <el-checkbox v-model='scope.row.nullEnable' size='mini' true-label='YES' false-label='NO'></el-checkbox>
                  </template>
                </el-table-column>

                <el-table-column label='默认值' width='100'>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.defaultValue" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <!-- </el-table-column> -->

              </el-table>
            </el-tab-pane>

            <!-- 业务属性设置 -->
            <el-tab-pane label='系统属性' name="sys">
              <div class='tabs-operate' style='margin-top: 5px;'>
                <!-- <el-button v-db-click size="mini" @click='initRow'>
                <svg-icon icon-class="addLine"></svg-icon>导入属性
              </el-button> -->
                <el-button v-db-click size="mini" @click='addRow'>
                  <svg-icon icon-class="addLine"></svg-icon>{{ $t('biz.btn.addRow') }}
                </el-button>
                <el-button v-db-click size="mini" @click='deleteRow'>
                  <svg-icon icon-class="delete"></svg-icon>{{ $t('biz.btn.deleteRow') }}
                </el-button>
              </div>
              <el-table stripe border class='table-content tb-edit' ref="singleTable" highlight-current-row v-loading="loadingForm" element-loading-spinner="el-icon-loading" :element-loading-text="$t('route.load')" :height='320' :data="page.sysDtlData" @current-change="handleSelectRowForm">
                <el-table-column align='center' type="index" fixed="left" width="50" :label='$t("table.id")'></el-table-column>
                <el-table-column width='140'>
                  <template slot="header" slot-scope="scope">
                    编码
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.code" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column width='140'>
                  <template slot="header" slot-scope="scope">
                    名称
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.name" size='mini'></input-validate>
                  </template>
                </el-table-column>

                <el-table-column width='140'>
                  <template slot="header" slot-scope="scope">
                    表单类型
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <el-select v-model="scope.row.componentType" size='mini' :placeholder="$t('biz.placeholder.choose')">
                      <el-option v-for="item in $t('datadict.codeFormType')" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label='引用' width='140'>
                  <template slot-scope='scope'>
                    <el-select :remote-method="remoteJoinData" @change='changeJoinData' v-model="scope.row.joinInfo" size='mini' remote filterable clearable :placeholder="$t('biz.placeholder.choose')">
                      <el-option v-for="item in joinDataOption" :key="item.code" :label="item.name" :value="item.code">{{item.name}}({{item.code}})</el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label='字典' width='140'>
                  <template slot-scope='scope'>
                    <!-- <el-select :remote-method="remoteDictData" @change='changeDictData' v-model="scope.row.dictInfo" size='mini' remote filterable clearable :placeholder="$t('biz.placeholder.choose')">
                      <el-option v-for="item in dictDataOption" :key="item.code" :label="item.name" :value="item.code">{{item.name}}({{item.code}})</el-option>
                    </el-select> -->
                  </template>
                </el-table-column>

                <!-- <el-table-column label="代码属性"> -->

                <el-table-column label='数据库类型' width='100'>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.dbDataType" size='mini' :disabled='true'></input-validate>
                  </template>
                </el-table-column>

                <el-table-column label='属性类型' width='100'>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.dataType" size='mini' :disabled='true'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column label='字段长度' width='100'>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.dataLength" size='mini' :disabled='true'></input-validate>
                  </template>
                </el-table-column>

                <el-table-column label='允许空值' width='80' align='center'>
                  <template slot-scope='scope'>
                    <el-checkbox v-model='scope.row.nullEnable' size='mini' true-label='YES' false-label='NO'></el-checkbox>
                  </template>
                </el-table-column>

                <el-table-column label='默认值' width='100'>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.defaultValue" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <!-- </el-table-column> -->

              </el-table>

            </el-tab-pane>
          </el-tabs>
        </main>

      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/frame/base/request'
import { notifySuccess, notifyError } from '@/utils/frame/base/notifyParams'
export default {
  data() {
    return {
      showInfo: false,
      activeName: 'biz',
      pageSqlVisible: false,
      menuInfoVisible: true,
      formDialogVisible: true,
      seqTypeDisabled: false,
      loadingForm: false,
      currentRowForm: {},
      joinData: [],
      dictData: [],
      dictDataOption: [],
      joinDataOption: [],
      appCodeOption: [],

      // 数据库数据类型
      dbDataType: [
        {
          label: '字符串',
          value: 'STR'
        },
        {
          label: '数字',
          value: 'NUM'
        },
        {
          label: '日期',
          value: 'DATE'
        }
      ],
      // 表单规则
      rules: {
        appCode: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        tableType: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        modelClass: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        seqType: [
          {
            required: true,
            trigger: 'blur'
          }
        ]
      },
      // 数据结构
      page: {
        appCode: '',
        code: '',
        name: '',
        parentCode: '',
        tableName: '',
        tableComment: '',
        seqType: 'id',
        seqPrefix: '',
        seqLength: '',
        sqlJson: '',
        treeCodePro: '',
        treeNamePro: '',
        remark: '',
        tableType: '',
        modelClass: 'table',
        modelInterfaceArray: [],
        codeDataModelDtlDtoList: [],
        bizDtlData: [],
        sysDtlData: []
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
    if (this.opType !== 'add') {
      this.getPageData()
    }

    //初始化
    this.init()
    this.showInfo = true
  },
  methods: {
    changeJoinData() {
      this.joinDataOption = []
    },
    changeDictData() {
      this.dictDataOption = []
    },
    remoteDictData(query) {
      if (query !== '') {
        setTimeout(() => {
          this.dictDataOption = this.dictData.filter(item => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.code.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    remoteJoinData(query) {
      if (query !== '') {
        setTimeout(() => {
          this.joinDataOption = this.joinData.filter(item => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.code.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    // 初始化下拉数据
    init() {
      request({
        url: '/api/dd/selectData/type',
        method: 'post',
        data: {
          data: '',
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search')
        }
      })
        .then(response => {
          this.joinData = response.data
        })
        .catch(() => {})

      request({
        url: '/api/dd/selectData/list',
        method: 'POST',
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {
            type: 'DICT_INFO'
          }
        }
      })
        .then(response => {
          this.dictData = response.data
        })
        .catch(() => {})

      request({
        url: '/api/dd/selectData/list',
        method: 'POST',
        data: {
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.search'),
          data: {
            type: 'CODE_APP'
          }
        }
      })
        .then(response => {
          this.appCodeOption = response.data
        })
        .catch(() => {})
    },
    tableNameChange(item) {
      if (item) {
        this.page.tableComment = item.name
      }
    },
    modelClassChange(val) {
      if (val && val !== 'table') {
        this.pageSqlVisible = true
      } else {
        this.pageSqlVisible = false
      }
    },
    seqTypeChange(val) {
      //code发号才要定义前缀和长度
      if (val && val === 'code') {
        this.seqTypeDisabled = false
      } else {
        this.seqTypeDisabled = true
      }
    },
    // 修改请求数据
    async getPageData() {
      // 调取接口
      let response = await request({
        url: '/api/code/dataModel/get',
        method: 'post',
        data: {
          data: this.param,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.view')
        }
      })
      if (response.data) {
        this.page = Object.assign(this.page, response.data)
      }
      // 调取接口
      response = await request({
        url: '/api/code/dataModelDtl/list',
        method: 'post',
        data: {
          data: { dataCode: this.param },
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.view')
        }
      })
      if (response.data) {
        response.data.forEach(e => {
          if (e.dataDtlClass === 'sys') {
            this.page.sysDtlData.push(e)
          } else {
            this.page.bizDtlData.push(e)
          }
        })
      }
    },
    //初始化数据
    initRow() {
      if (this.page.modelClass === 'table') {
        if (this.page.appCode && this.page.tableName) {
          this.page.sysDtlData = []
          this.page.bizDtlData = []

          this.loadingForm = true
          request({
            url: '/api/code/generator/queryColumns',
            method: 'POST',
            data: {
              data: { codeApp: this.page.appCode, tableName: this.page.tableName },
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: this.$t('biz.btn.search')
            }
          })
            .then(response => {
              if (response.data && response.data.length > 0) {
                response.data.forEach(e => {
                  if (e.dataDtlClass === 'sys') {
                    this.page.sysDtlData.push(e)
                  } else {
                    this.page.bizDtlData.push(e)
                  }
                })
              }
              this.loadingForm = false
            })
            .catch(() => {
              this.loadingForm = false
            })
        } else {
          this.$notify(
            notifyError({
              msg: '请选择应用和表名称'
            })
          )
          return
        }
      }
    },
    // 增行
    addRow() {
      if (this.activeName === 'biz') {
        this.page.bizDtlData.push({
          code: '',
          name: '',
          dataDtlClass: 'biz',
          remark: '',
          joinInfo: '',
          dbDataType: '',
          dataType: '',
          dataLength: '',
          nullEnable: 'NO',
          defaultValue: '',
          componentType: 'inputValidate'
        })
      } else if (this.activeName === 'sys') {
        this.page.sysDtlData.push({
          code: '',
          name: '',
          dataDtlClass: 'sys',
          remark: '',
          joinInfo: '',
          dbDataType: '',
          dataType: '',
          dataLength: '',
          nullEnable: 'NO',
          defaultValue: '',
          componentType: 'inputValidate'
        })
      }
    },
    // 删行
    deleteRow() {
      if (this.activeName === 'biz') {
        const index = this.page.bizDtlData.indexOf(this.currentRowForm)
        if (index < 0) return
        this.page.bizDtlData.splice(index, 1)
      } else if (this.activeName === 'sys') {
        const index = this.page.sysDtlData.indexOf(this.currentRowForm)
        if (index < 0) return
        this.page.sysDtlData.splice(index, 1)
      }
    },

    // 选中表单项设置行
    handleSelectRowForm(val) {
      this.currentRowForm = val
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
            this.page.codeDataModelDtlDtoList = this.page.bizDtlData.concat(this.page.sysDtlData)
            request({
              url: this.opType !== 'add' ? '/api/code/dataModel/update' : '/api/code/dataModel/save',
              method: 'POST',
              data: {
                data: this.page,
                funcModule: this.$t('route.' + this.$route.meta.title),
                funcOperation: this.$t('biz.btn.save')
              }
            })
              .then(response => {
                this.$emit('closeHandler', true)
                this.$notify(notifySuccess({ msg: this.$t('biz.msg.saveSuccess') }))
              })
              .catch(() => {
                this.$notify(notifyError({ msg: this.$t('biz.msg.saveFailed') }))
              })
          })
        }
      })
    }
  }
}
</script>
