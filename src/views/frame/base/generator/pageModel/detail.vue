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

      <div class='dialog-content' :style="{maxHeight: clientHeight - 80 + 'px', overflowY: 'auto'}">
        <!-- 基本设置 -->
        <header key='base' :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto', 'border-bottom-width': menuInfoVisible ? '1px' : '0'}">
          <div class='form-title'>代码信息
            <i :class="['el-icon-arrow-down', {'el-icon-arrow-up' : !menuInfoVisible}]" @click='menuInfoVisible = !menuInfoVisible'></i>
          </div>
          <el-form v-if='menuInfoVisible' class="header-form-inline" :model="page" label-position="left" :rules='rules' ref="refForm" :show-message="false">
            <el-row :gutter="20">

              <el-col :span="6">
                <el-form-item label="应用" prop='appCode'>
                  <el-select v-model="page.appCode" :disabled="true">
                    <el-option v-for="item in appCodeOption" :key="item.code" :label="item.name" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="页面名称" prop='name'>
                  <input-validate v-model='page.name' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="页面代码" prop='code'>
                  <input-validate v-model='page.code' :disabled='true' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="页面模板" prop='pageTemp'>
                  <el-select v-model="page.pageTemp" :disabled="true">
                    <el-option v-for="item in $t('datadict.codePageTemp')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数据模型" prop='modelCode' v-show="page.pageTemp!=='treeTable'">
                  <base-select size="mini" v-model="page.modelCode" :attrs="{ disabled :true, data: 'CODE_DATA_MODEL'}"></base-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="表数据模型" prop='tableModelCode' v-show="page.pageTemp==='treeTable'">
                  <base-select size="mini" v-model="page.tableModelCode" :attrs="{disabled :true,data: 'CODE_DATA_MODEL'}"></base-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="树数据模型" prop='treeModelCode' v-show="page.pageTemp==='treeTable'">
                  <base-select size="mini" v-model="page.treeModelCode" :attrs="{disabled :true,data: 'CODE_DATA_MODEL'}"></base-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="编辑框类型" prop='editType'>
                  <el-select v-model="page.editType">
                    <el-option v-for="item in $t('datadict.codeEditType')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注" prop='remark'>
                  <input-validate v-model='page.remark' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </header>

        <!-- 内容设置 -->
        <main key='list' :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto'}">
          <el-tabs v-model="activeName" type="border-card">
            <!-- 业务属性设置 -->
            <template v-for="(dtlList, key) in dtlMap">
              <el-tab-pane :label='key' :name='key' :key="key">
                <div class='tabs-operate' style='margin-top: 5px;'>

                  <el-button v-db-click size="mini" @click='addRow(dtlList)'>
                    <svg-icon icon-class="addLine"></svg-icon>{{ $t('biz.btn.addRow') }}
                  </el-button>
                  <el-button v-db-click size="mini" @click='deleteRow(dtlList)'>
                    <svg-icon icon-class="delete"></svg-icon>{{ $t('biz.btn.deleteRow') }}
                  </el-button>
                </div>
                <el-table stripe border class='table-content tb-edit' ref="singleTable" highlight-current-row v-loading="loadingForm" element-loading-spinner="el-icon-loading" :element-loading-text="$t('route.load')" :height='320' :data="dtlList" @current-change="handleSelectRowForm">
                  <el-table-column align='center' type="index" fixed="left" width="50" :label='$t("table.id")'></el-table-column>
                  <el-table-column width='140'>
                    <template slot="header" slot-scope="scope">
                      字段pro
                      <span style='color:#f56c6c;' :data-header='scope'>*</span>
                    </template>
                    <template slot-scope='scope'>
                      <input-validate v-model="scope.row.code" size='mini'></input-validate>
                    </template>
                  </el-table-column>
                  <el-table-column width='140'>
                    <template slot="header" slot-scope="scope">
                      字段label
                      <span style='color:#f56c6c;' :data-header='scope'>*</span>
                    </template>
                    <template slot-scope='scope'>
                      <input-validate v-model="scope.row.name" size='mini'></input-validate>
                    </template>
                  </el-table-column>

                  <el-table-column width='140'>
                    <template slot="header" slot-scope="scope">
                      控件类型
                      <span style='color:#f56c6c;' :data-header='scope'>*</span>
                    </template>
                    <template slot-scope='scope'>
                      <el-select v-model="scope.row.componentType" size='mini' :placeholder="$t('biz.placeholder.choose')">
                        <el-option v-for="item in $t('datadict.codeFormType')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>

                  <el-table-column label='字典' width='140'>
                    <template slot-scope='scope'>
                      <el-select :remote-method="remoteDictData" @change='changeDictData' v-model="scope.row.dictInfo" size='mini' remote filterable clearable :placeholder="$t('biz.placeholder.choose')">
                        <el-option v-for="item in dictDataOption" :key="item.code" :label="item.name" :value="item.code">{{item.name}}</el-option>
                      </el-select>
                    </template>
                  </el-table-column>

                  <el-table-column label='表单显示' width='80' align='center'>
                    <template slot-scope='scope'>
                      <el-checkbox v-model='scope.row.formShow' size='mini' true-label='1' false-label='0'></el-checkbox>
                    </template>
                  </el-table-column>

                  <el-table-column label='校验必填' width='80' align='center'>
                    <template slot-scope='scope'>
                      <el-checkbox v-model='scope.row.requiredType' size='mini' true-label='1' false-label='0'></el-checkbox>
                    </template>
                  </el-table-column>

                  <el-table-column label='是否只读' width='80' align='center'>
                    <template slot-scope='scope'>
                      <el-checkbox v-model='scope.row.readonlyFlag' size='mini' true-label='1' false-label='0'></el-checkbox>
                    </template>
                  </el-table-column>

                  <el-table-column label='列表显示' width='80' align='center'>
                    <template slot-scope='scope'>
                      <el-checkbox v-model='scope.row.tableShow' size='mini' true-label='1' false-label='0'></el-checkbox>
                    </template>
                  </el-table-column>

                  <el-table-column label='是否排序' width='80' align='center'>
                    <template slot-scope='scope'>
                      <el-checkbox v-model='scope.row.sortFlag' size='mini' true-label='1' false-label='0'></el-checkbox>
                    </template>
                  </el-table-column>

                  <el-table-column label='控件长度' width='90' align='center'>
                    <template slot-scope='scope'>
                      <input-validate v-model="scope.row.componentLength" size='mini'></input-validate>
                    </template>
                  </el-table-column>

                  <el-table-column label='控件默认值' width='90'>
                    <template slot-scope='scope'>
                      <input-validate v-model="scope.row.componentDefault" size='mini'></input-validate>
                    </template>
                  </el-table-column>

                  <el-table-column label='是否查询' width='80' align='center'>
                    <template slot-scope='scope'>
                      <el-checkbox v-model='scope.row.queryFlag' size='mini' true-label='1' false-label='0'></el-checkbox>
                    </template>
                  </el-table-column>

                  <el-table-column label='查询类型' width='120' align='center'>
                    <template slot-scope='scope'>
                      <el-select v-model="scope.row.queryType" size='mini' :placeholder="$t('biz.placeholder.choose')">
                        <el-option v-for="item in $t('datadict.codeQueryType')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>

                  <el-table-column label='扩展参数' width='300'>
                    <template slot-scope='scope'>
                      <input-validate v-model="scope.row.attrsExtend" size='mini'></input-validate>
                    </template>
                  </el-table-column>

                </el-table>
              </el-tab-pane>
            </template>
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
      activeName: '',
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
      dtlMap: {},
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
        modelCode: '',
        tableModelCode: '',
        treeModelCode: '',
        editType: '',
        remark: '',
        codePageModelDtlDtoList: []
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
    if (this.opType !== 'add') this.getPageData()
    //初始化
    this.init()
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
    getPageData() {
      // 调取接口
      request({
        url: '/api/code/pageModel/get',
        method: 'post',
        data: {
          data: this.param,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.view')
        }
      })
        .then(response => {
          this.page = Object.assign(this.page, response.data)
        })
        .catch(() => {})
      // 调取接口
      request({
        url: '/api/code/pageModelDtl/mapByPageCode',
        method: 'post',
        data: {
          data: this.param,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.view')
        }
      })
        .then(response => {
          this.dtlMap = response.data
          if (this.dtlMap) {
            for (var key in this.dtlMap) {
              this.activeName = key
              break
            }
          }
        })
        .catch(() => {})
    },

    // 增行
    addRow(rows) {
      rows.push({})
    },
    // 删行
    deleteRow(rows) {
      const index = rows.indexOf(this.currentRowForm)
      if (index < 0) return
      rows.splice(index, 1)
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
            for (var key in this.dtlMap) {
              this.page.codePageModelDtlDtoList = this.page.codePageModelDtlDtoList.concat(this.dtlMap[key])
            }

            request({
              url: '/api/code/pageModel/update',
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
