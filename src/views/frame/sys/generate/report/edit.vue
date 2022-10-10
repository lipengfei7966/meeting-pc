<template>
  <div v-el-drag-dialog class='bs-new-container dialog-wrapper'>
    <div class='dialog-container' style="width:1183px;">
      <title-contain :titleName='titleName' @TitleFun="$emit('closeHandler')"></title-contain>
      <el-row class='top-operate'>
        <el-button size="mini" v-db-click @click="$emit('closeHandler')">
          <svg-icon icon-class="cancel"></svg-icon>取消
        </el-button>
        <el-button size="mini" type='primary' v-db-click @click='onSave'>
          <svg-icon icon-class="save"></svg-icon>保存
        </el-button>
        <el-button size="mini" type='success' v-db-click @click='onExplain'>
          <svg-icon icon-class="explain"></svg-icon>解析SQL
        </el-button>

      </el-row>

      <div class='dialog-content' :style="{maxHeight: clientHeight - 80 + 'px', overflowY: 'auto'}">
        <header :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto', 'border-bottom-width': menuInfoVisible ? '1px' : '0'}">
          <div class='form-title'>
            报表信息
            <i :class="['el-icon-arrow-down', {'el-icon-arrow-up' : !menuInfoVisible}]" @click='menuInfoVisible = !menuInfoVisible'></i>
          </div>
          <el-form v-if='menuInfoVisible' class="header-form-inline" :model="page" label-position="left" :rules='rules' ref="refForm" :show-message="false">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="应用" prop='codeApp'>
                  <base-select size="mini" v-model="page.codeApp" :attrs="{data: 'CODE_APP', params: { usingFlag: '1' }  }"></base-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="系统" prop='reservedStr1'>
                  <input-validate v-model='page.reservedStr1' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="功能名称" prop='codeName'>
                  <input-validate v-model='page.codeName' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="报表说明" prop='remark'>
                  <el-input v-model="page.remark" :clearable='true'>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span='24'>
                <el-form-item label='查询sql' prop='sqlStatement'>
                  <el-input v-model='page.sqlStatement' :clearable='true' type='textarea'>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span='24'>
                <el-form-item label='sql注意说明1'>
                  <el-input :disabled='true' value='1、作为查询条件和展示的列，都查在SQL里查询出来,select 里的列必须都是as 成驼峰格式'>
                  </el-input>
                </el-form-item>

                <el-form-item label='sql注意说2'>
                  <el-input :disabled='true' value='2、内置查询条件时，例子select xx from table where 1=1  #INNER_SQL#'>
                  </el-input>
                </el-form-item>

                <el-form-item label='sql注意说3'>
                  <el-input :disabled='true' value='3、控制数据权限时，例子select xx from table where 1=1  #AUTH_SQL#'>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </header>

        <!-- <header :style=" {'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px' ) : 'auto' , 'border-bottom-width' : explainAuthVisible ? '1px' : '0' }">
          <div class='form-title'>
            规则说明
            <i :class="['el-icon-arrow-down', {'el-icon-arrow-up' : !explainAuthVisible}]" @click='explainAuthVisible = !explainAuthVisible'></i>
          </div>
          <el-form v-if='explainAuthVisible' ref='refForm2' :model='page.codeDataJson.explainData' :rules='rules' :show-message='false' class='header-form-inline' label-position='left'>
            <el-row :gutter='20'>
              <el-col :span='6'>
                <el-form-item label='是否显示规则' prop='isExplainAuth'>
                  <el-checkbox v-model='page.codeDataJson.explainData.isExplainAuth'></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter='20'>
              <el-col :span='24'>
                <el-form-item label='规则说明' prop='explainInfo'>
                  <el-input v-model='page.codeDataJson.explainData.explainInfo' :clearable='true' type='textarea'>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </header> -->
        <header :style=" {'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px' ) : 'auto' , 'border-bottom-width' : pageInfoVisible ? '1px' : '0' }">
          <div class='form-title'>
            页面信息
            <i :class="['el-icon-arrow-down', {'el-icon-arrow-up' : !pageInfoVisible}]" @click='pageInfoVisible = !pageInfoVisible'></i>
          </div>
          <el-form v-if='pageInfoVisible' class='header-form-inline' :model='page' label-position='left' :rules='rules' ref='refForm2' :show-message='false'>
            <el-row :gutter='20'>

              <el-col :span='6'>
                <el-form-item label='显示更多查询' prop='moreShowFlg'>
                  <el-checkbox v-model='page.codeDataJson.form.moreShowFlg'></el-checkbox>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item label="显示顶部按钮" prop='isTopBar'>
                  <el-checkbox v-model='page.codeDataJson.mainData.isTopBar'></el-checkbox>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item label="初始化请求" prop='initSearch'>
                  <el-checkbox v-model='page.codeDataJson.mainData.initSearch'></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="列设置" prop='isColset'>
                  <el-checkbox v-model='page.codeDataJson.mainData.isColset'></el-checkbox>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item label="列表ID" prop='id'>
                  <input-validate v-model='page.codeDataJson.mainData.table.id' :clearable='true' placeholder="可以同菜单标识(全局唯一)"></input-validate>
                </el-form-item>
              </el-col> -->
              <el-col :span="6">
                <el-form-item label="默认排序" prop='defaultSortString'>
                  <el-input v-model='page.codeDataJson.form.listQuery.defaultSortString'>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="默认列宽" prop='colWidth'>
                  <el-input v-model='page.codeDataJson.mainData.table.colWidth'>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="列表排序" prop='sortable'>
                  <input-validate v-model='page.codeDataJson.mainData.table.sortable' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="是否分页" prop='show'>
                  <el-checkbox v-model='page.codeDataJson.mainData.bottomBar.pagination.show'></el-checkbox>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="是否合计" prop='showSummary'>
                  <el-checkbox v-model='page.codeDataJson.mainData.table.showSummary'></el-checkbox>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item label="是否驼峰转成大写下划线" prop='camelToUnderlineFlg'>
                  <el-checkbox v-model='page.codeDataJson.form.listQuery.camelToUnderlineFlg'></el-checkbox>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
        </header>

        <main :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto'}">
          <el-tabs v-model='activeName' type='border-card' value='form'>
            <el-tab-pane label='查询条件设置' name='form'>
              <div class='tabs-operate' style='margin-top: 5px;'>

                <el-button v-db-click size='mini' @click='addConditionRow'>
                  <svg-icon icon-class='addLine'></svg-icon>
                  增行
                </el-button>
                <el-button v-db-click size='mini' @click='batchDeleteConditionRow'>
                  <svg-icon icon-class='delete'></svg-icon>
                  删行
                </el-button>
              </div>
              <el-table stripe border class='table-content tb-edit' ref="singleTable" highlight-current-row v-loading="loadingForm" element-loading-spinner="el-icon-loading" element-loading-text="" :height='300' :data="page.codeDataJson.form.formData" @current-change="handleSelectRowForm" @selection-change="handleFormSelectionChange">
                <el-table-column align='center' type="index" fixed="left" width="50" 序号></el-table-column>
                <el-table-column align='center' type="selection" width="55"> </el-table-column>
                <el-table-column show-overflow-tooltip width="140">
                  <template slot="header" slot-scope="scope">
                    名称(label)
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.label" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="140">
                  <template slot="header" slot-scope="scope">
                    属性(prop)
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.prop" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="140">
                  <template slot="header" slot-scope="scope">
                    查询属性
                    <span style='color:#f56c6c;' :data-header='scope'></span>
                  </template>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.queryProp" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="80">
                  <template slot="header" slot-scope="scope">
                    排序
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.sortNo" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop='dbDataType' width="120">
                  <template slot="header" slot-scope="scope">
                    数据类型
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <el-select v-model="scope.row.dbDataType" size='mini' clearable placeholder="">
                      <el-option v-for="item in dbDataType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120">
                  <template slot="header" slot-scope="scope">
                    条件匹配
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <el-select v-model="scope.row.condition" size='mini' placeholder="">
                      <el-option label="=" value="="></el-option>
                      <el-option label="like" value="like"></el-option>
                      <el-option label=">" value=">"></el-option>
                      <el-option label=">=" value=">="></el-option>
                      <el-option label="<" value="<"></el-option>
                      <el-option label="<=" value="<="></el-option>
                      <el-option label="in" value="in"></el-option>
                      <el-option label="between" value="between"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="120">
                  <template slot="header" slot-scope="scope">
                    表单类型
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <el-select v-model="scope.row.type" size='mini' placeholder="">
                      <el-option v-for="item in formType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='字典(datadict)' prop='datadict' width="120">
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.datadict" size='mini' placeholder="例:yesNo"></input-validate>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='复合属性(props)' align='center' width="200">
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.propArry" size='mini' placeholder=' 小写逗号(,)间隔'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='属性组(attrs)' align='center' width="100">
                  <template slot-scope='scope'>
                    <span style='color: #409EFF;cursor: pointer;' @click="onRowAttrSet(scope.row,'form')">属性设置</span>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='是否显示' prop='isShow' width="90">
                  <template slot-scope='scope'>
                    <div style='text-align: center;'>
                      <el-checkbox v-model='scope.row.isShow'></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='是否必输' width="90">
                  <template slot-scope='scope'>
                    <div style='text-align: center;'>
                      <el-checkbox v-model='scope.row.required'></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='默认值' width="120">
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.default" size='mini'></input-validate>
                  </template>
                </el-table-column>

                <el-table-column show-overflow-tooltip label='toolUtil函数' width="150">
                  <template slot-scope='scope'>

                    <el-select v-model="scope.row.defaultFunc" size='mini' clearable placeholder="">
                      <el-option label="最近一周" value="getLatestWeek"></el-option>
                      <el-option label="最近一个月" value="getLatestMonth"></el-option>
                      <el-option label="最近三个月" value="getLatestThreeMonth"></el-option>
                    </el-select>

                  </template>
                </el-table-column>

              </el-table>
            </el-tab-pane>
            <el-tab-pane label='按钮设置' name="button">
              <div class='tabs-operate' style='margin-top: 5px;'>
                <el-button v-db-click size="mini" @click='addBtnRow()'>
                  <svg-icon icon-class="addLine"></svg-icon>增行
                </el-button>
                <el-button v-db-click size="mini" @click='deleteBtnRow()'>
                  <svg-icon icon-class="delete"></svg-icon>删行
                </el-button>
              </div>
              <el-table stripe border class='table-content tb-edit' ref="singleTable" highlight-current-row v-loading="loadingBtn" element-loading-spinner="el-icon-loading" element-loading-text="加载中" :data="page.codeDataJson.mainData.topBar" @current-change="handleSelectRowBtnTables">
                <el-table-column align='center' type="index" fixed="left" width="50" label='id'></el-table-column>
                <el-table-column label="按钮标识(name)" width='180'>
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.name" allow-create filterable size='mini' clearable>
                      <el-option label="view" value="view"></el-option>
                      <el-option label="refresh" value="refresh"></el-option>
                      <el-option label="export" value="export"></el-option>
                      <el-option label="update" value="update"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label='按钮图标(iconName)' width='180'>
                  <template slot-scope='scope'>
                    <el-select v-model="scope.row.iconName" size='mini' clearable filterable>
                      <el-option v-for="item in $store.state.app.icons" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="按钮名称" width='180'>
                  <template slot-scope="scope">
                    <input-validate v-model="scope.row.i18n" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column label="组件" width='180'>
                  <template slot-scope="scope">
                    <input-validate v-model="scope.row.componentVue" size='mini' placeholder='views/**,无后缀(.vue)'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column label='按钮类型' width='120'>
                  <template slot-scope='scope'>
                    <el-select v-model="scope.row.type" size='mini' clearable>
                      <el-option label="路由" value="route"></el-option>
                      <el-option label="api" value="api"></el-option>
                      <el-option label="弹窗" value="dialog"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='按钮属性' align='center' width="100">
                  <template slot-scope='scope'>
                    <span style='color: #409EFF;cursor: pointer;' @click="onRowAttrSet(scope.row,'button')">属性设置</span>
                  </template>
                </el-table-column>

                <el-table-column label='按钮事件名(event)' width='120' align="center">
                  <template slot-scope='scope'>
                    <span style='color: #409EFF;cursor: pointer;' @click="onRowEventSet(scope.row)">事件设置</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label='列表设置' name="table">
              <div class='tabs-operate' style='margin-top: 5px;'>
                <el-button v-db-click size="mini" @click='batchdeleteRow'>
                  <svg-icon icon-class="delete"></svg-icon>删行
                </el-button>
              </div>
              <el-table stripe border class='table-content tb-edit' ref="singleTable" highlight-current-row v-loading="loadingTable" element-loading-spinner="el-icon-loading" element-loading-text="加载中" :height='300' :data="page.codeDataJson.mainData.table.cols" @current-change="handleSelectRowTable" @selection-change="handleTableSelectionChange">
                <el-table-column align='center' type="index" fixed="left" width="50" 序号></el-table-column>
                <el-table-column align='center' type="selection" width="55"> </el-table-column>
                <el-table-column show-overflow-tooltip width="140">
                  <template slot="header" slot-scope="scope">
                    名称(label)
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.label" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip width="140">
                  <template slot="header" slot-scope="scope">
                    属性(prop)
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.prop" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <!-- <el-table-column show-overflow-tooltip width="140">
                  <template slot="header" slot-scope="scope">
                    查询属性
                    <span style='color:#f56c6c;' :data-header='scope'></span>
                  </template>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.queryProp" size='mini'></input-validate>
                  </template>
                </el-table-column> -->
                <el-table-column show-overflow-tooltip>
                  <template slot="header" slot-scope="scope" width="80">
                    排序
                    <span style='color:#f56c6c;' :data-header='scope'>*</span>
                  </template>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.sortNo" size='mini'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='文本处理' prop='type'>
                  <template slot-scope='scope'>
                    <el-select v-model="scope.row.type" size='mini' clearable placeholder="" @clear='colTypeClear(scope.row)' @change='val => { colTypeChange(val, scope.row) }'>
                      <el-option v-for="item in colType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='格式化方法(func)' prop='func'>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.func" size='mini' :disabled='!scope.row.type || scope.row.type === "dict"'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='格式化参数(dictType)' prop='dictType'>
                  <template slot-scope='scope'>
                    <input-validate v-model="scope.row.dict" size='mini' placeholder="例:yesNo" :disabled='!scope.row.type'></input-validate>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='是否合计' prop='summary'>
                  <template slot-scope='scope'>
                    <div style='text-align: center;'>
                      <el-checkbox v-model='scope.row.summary'></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='是否排序' prop='sortable'>
                  <template slot-scope='scope'>
                    <div style='text-align: center;'>
                      <el-checkbox v-model='scope.row.sortable'></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='是否显示' prop='isShow'>
                  <template slot-scope='scope'>
                    <div style='text-align: center;'>
                      <el-checkbox v-model='scope.row.isShow'></el-checkbox>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label='扩展属性' prop='extendProps' width="80" align="center">
                  <template slot-scope='scope'>
                    <span style='color: #409EFF;cursor: pointer;' @click="onRowExtendPropsSet(scope.row)">属性设置</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </main>

      </div>
    </div>
    <div class="mask"></div>
    <el-dialog title="属性设置" :visible.sync="dialogTableVisible" width='60%'>
      <main style='padding: 5px;'>
        <el-row class='top-operate'>
          <el-button size="mini" v-db-click @click='onAddAttr' style='padding: 6px 10px;'>
            <svg-icon icon-class="addLine"></svg-icon>增行
          </el-button>
          <el-button size="mini" v-db-click @click='onDeleteAttr' style='padding: 6px 10px;'>
            <svg-icon icon-class="delete"></svg-icon>删行
          </el-button>
        </el-row>
        <el-table stripe border class='table-content tb-edit' highlight-current-row v-loading="loadingChild" element-loading-spinner="el-icon-loading" element-loading-text="" :height='220' :data="attrData" @current-change="handleSelectRowAttr">
          <el-table-column align='center' type="index" fixed="left" width="50" 序号></el-table-column>
          <el-table-column label="属性名" width="150">
            <template slot-scope='scope'>
              <input-validate v-model="scope.row.key" size='mini'></input-validate>
            </template>
          </el-table-column>
          <el-table-column label="属性值类型" width="200">
            <template slot-scope='scope'>
              <el-select v-model="scope.row.type" size='mini' placeholder="">
                <el-option label="字符串" value="string"></el-option>
                <el-option label="布尔值" value="boolean"></el-option>
                <el-option label="数值" value="number"></el-option>
                <el-option label="数组" value="array"></el-option>
                <el-option label="对象" value="object"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="属性值">
            <template slot-scope='scope'>
              <input-validate v-model="scope.row.value" size='mini' placeholder='若为对象则严格输入JSON格式的值，若数组则小写逗号间隔即可'></input-validate>
            </template>
          </el-table-column>
        </el-table>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button size='mini' @click="dialogTableVisible = false">取 消</el-button>
        <el-button size='mini' type="primary" @click="onConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 查询条件回调方法设置 -->
    <el-dialog title="方法设置" :visible.sync="dialogTableVisible2" width='60%'>
      <main style='padding: 5px;' id="funcTable">
        <el-row class='top-operate'>
          <el-button size="mini" v-db-click @click='onAddFunc' style='padding: 6px 10px;'>
            <svg-icon icon-class="addLine"></svg-icon>增行
          </el-button>
          <el-button size="mini" v-db-click @click='onDeleteFunc' style='padding: 6px 10px;'>
            <svg-icon icon-class="delete"></svg-icon>删行
          </el-button>
        </el-row>
        <el-table stripe border class='table-content tb-edit-event' :height="300" highlight-current-row element-loading-spinner="el-icon-loading" :data="funcData" @current-change="handleSelectRowFunc">
          <el-table-column align='center' type="index" fixed="left" width="50" label='id'></el-table-column>
          <el-table-column label="方法名" width="150">
            <template slot-scope='scope'>
              <input-validate v-model="scope.row.key" size='mini'></input-validate>
            </template>
          </el-table-column>
          <el-table-column label="方法休">
            <template slot-scope='scope'>
              <el-input v-model="scope.row.value" size='mini' :clearable='true' type="textarea" rows="5"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button size='mini' @click="dialogTableVisible2 = false">取 消</el-button>
        <el-button size='mini' type="primary" @click="onEventsConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 扩展属性窗口-->
    <el-dialog title="方法设置" :visible.sync="extendPropsVisible" width='60%' :height="300">
      <main style='padding: 5px;'>
        <el-row class='top-operate'>
          <el-button size="mini" v-db-click @click='onAddAttr' style='padding: 6px 10px;'>
            <svg-icon icon-class="addLine"></svg-icon>增行
          </el-button>
          <el-button size="mini" v-db-click @click='onDeleteAttr' style='padding: 6px 10px;'>
            <svg-icon icon-class="delete"></svg-icon>删行
          </el-button>
        </el-row>
        <el-table stripe border class='table-content tb-edit' highlight-current-row v-loading="loadingChild" element-loading-spinner="el-icon-loading" element-loading-text="" :height='220' :data="attrData" @current-change="handleSelectRowAttr">
          <el-table-column align='center' type="index" fixed="left" width="50" 序号></el-table-column>
          <el-table-column label="属性名" width="150">
            <template slot-scope='scope'>
              <input-validate v-model="scope.row.key" size='mini'></input-validate>
            </template>
          </el-table-column>
          <el-table-column label="属性值类型" width="200">
            <template slot-scope='scope'>
              <el-select v-model="scope.row.type" size='mini' placeholder="">
                <el-option label="字符串" value="string"></el-option>
                <el-option label="布尔值" value="boolean"></el-option>
                <el-option label="数值" value="number"></el-option>
                <el-option label="数组" value="array"></el-option>
                <el-option label="对象" value="object"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="属性值">
            <template slot-scope='scope'>
              <el-input v-model="scope.row.value" size='mini' placeholder='若为对象则严格输入JSON格式的值，若数组则小写逗号间隔即可'></el-input>
            </template>
          </el-table-column>
        </el-table>
      </main>
      <div slot="footer" class="dialog-footer">
        <el-button size='mini' @click="extendPropsVisible = false">取 消</el-button>
        <el-button size='mini' type="primary" @click="extendPropsConfirm">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import request from '@/utils/frame/base/request'
import { notifyError, notifySuccess } from '@/utils/frame/base/notifyParams'

export default {
  data() {
    return {
      activeName: 'form',
      titleName: '',
      buttonOptions: [],
      menuInfoVisible: true,
      pageInfoVisible: true,
      dataAuthVisible: true,
      explainAuthVisible: true,
      mailTimingVisible: true,
      apiTableVisible: true,
      btnTableVisible: true,
      loadingApi: false,
      loadingBtn: false,
      loadingForm: false,
      loadingTable: false,
      currentRowForm: {},
      multipleSelectionRowForm: [],
      currentRowTable: {},
      multipleSelectionRowTable: [],
      currentRowAttr: {},
      currentRowApi: {},
      currentRowBtn: {},
      currentRowFunc: {},
      dialogTableVisible: false,
      dialogTableVisible2: false,
      extendPropsVisible: false,
      funcData: [],
      extendPropsData: '',

      onRowAttrSetType: '',
      attrData: [],

      propData: [],
      apiAuthOptions: [],
      apiOptions: ['search', 'doDelete', 'set', 'cancelAudit', 'export', 'submit'],
      loadingChild: false,
      // 表单项
      formRules: {},
      formType: [
        {
          label: '输入框',
          value: 'input'
        },
        {
          label: '数值区间',
          value: 'numberInterval'
        },
        {
          label: '字典码表下拉框',
          value: 'datadict'
        },
        {
          label: '基础接口下拉框',
          value: 'baseSelect'
        },
        {
          label: '单选框',
          value: 'radio'
        },
        {
          label: '多选框',
          value: 'checkbox'
        },
        {
          label: '日期框(年月日)',
          value: 'date'
        },
        {
          label: '日期框(周)',
          value: 'week'
        },
        {
          label: '日期框(年)',
          value: 'year'
        },
        {
          label: '日期框(月)',
          value: 'month'
        },
        {
          label: '日期区间',
          value: 'daterange'
        }
      ],
      // 列表项
      colType: [
        {
          label: '码表回显',
          value: 'dict'
        },
        {
          label: '时间格式化',
          value: 'date'
        },
        {
          label: '数值格式化',
          value: 'number'
        }
      ],
      // 列表项
      funcType: [
        {
          label: 'money',
          value: 'money'
        },
        {
          label: 'dateFormat',
          value: 'dateFormat'
        },
        {
          label: 'num',
          value: 'num'
        },
        {
          label: 'percent',
          value: 'percent'
        }
      ],
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
      timingUnits: [
        {
          label: '日',
          value: 'DAY'
        },
        {
          label: '周',
          value: 'WEEK'
        },
        {
          label: '月',
          value: 'MONTH'
        }
      ],

      weekDays: [
        {
          label: '周日',
          value: 1
        },
        {
          label: '周一',
          value: 2
        },
        {
          label: '周二',
          value: 3
        },
        {
          label: '周三',
          value: 4
        },
        {
          label: '周四',
          value: 5
        },
        {
          label: '周五',
          value: 6
        },
        {
          label: '周六',
          value: 7
        }
      ],
      rules: {
        codeApp: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        codeName: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        sqlStatement: [
          {
            required: true,
            trigger: 'blur'
          }
        ]
      },
      // 数据结构
      page: {
        codeApp: '',
        reservedStr1: '',
        codeName: '',
        sqlStatement: '',
        remark: '',
        moduleCode: '',
        codeType: 'report',
        pageType: 'index',
        parentCode: '',
        code: '',
        sortNo: '',
        codeDataJson: {
          slotInfo: '',
          form: {
            moreShowFlg: false,
            listQuery: {
              camelToUnderlineFlg: false,
              isPage: true,
              current: 1,
              size: 20,
              funcModule: this.$t('route.' + this.$route.meta.title),
              funcOperation: '',
              defaultSortString: '',
              data: {},
              bsQueryExtrasForCode: [],
              bsQueryExtras: []
            },
            formData: []
          },
          mainData: {
            isTopBar: true,
            initSearch: true,
            isColset: false,
            api: [],
            topBar: [
              {
                name: 'refresh'
              },
              {
                name: 'export',
                type: 'api'
              }
            ],
            table: {
              id: '',
              colWidth: '140',
              sortable: 'custom',
              showSummary: false,
              cols: []
            },
            bottomBar: {
              pagination: {
                show: true,
                layout: 'total, sizes, prev, pager, next, jumper',
                pageSizes: [20, 40, 60, 80, 100]
              }
            }
          },
          explainData: {
            isExplainAuth: false,
            explainInfo: ''
          }
        },
        authDataJson: {
          isDataAuth: false,
          companyField: '',
          departmentField: '',
          agentField: '',
          deptField: '',
          operatorField: ''
        },
        sendMail: '',
        isSendMail: false,
        mailDataJson: {
          timingConfig: {
            unit: '',
            day: 1
          },
          mailConfig: {
            receiveMails: '',
            ccMails: '',
            title: '',
            content: ''
          },
          condition: ''
        }
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
  created() {
    this.titleName = '报表页面'
  },
  mounted() {
    this.init()

    // 是否初始化
    if (this.opType !== 'add') this.getPageData()
  },

  methods: {
    // 修改请求数据
    getPageData() {
      // 调取接口
      request({
        url: '/api/code/report/get',
        method: 'post',
        data: {
          data: this.param,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: '查看'
        }
      })
        .then(response => {
          const res = response.data

          if (res.authDataJson == null) {
            res.authDataJson = this.page.authDataJson
          }
          if (res.codeDataJson.explainData == null) {
            res.codeDataJson.explainData = this.page.codeDataJson.explainData
          }

          if (res.mailDataJson == null) {
            res.mailDataJson = this.page.mailDataJson
          }
          if (res.sendMail && res.sendMail == '1') {
            res.isSendMail = true
          } else {
            res.isSendMail = false
          }
          this.page = res
        })
        .catch(() => {})
    },
    onExplain() {
      if (this.page.sqlStatement && this.page.codeApp) {
        request({
          url: '/api/code/report/explain',
          method: 'post',
          data: {
            data: {
              sqlStatement: this.page.sqlStatement,
              codeApp: this.page.codeApp
            },
            funcModule: this.$t('route.' + this.$route.meta.title),
            funcOperation: '查询'
          }
        })
          .then(response => {
            if (response.data) {
              // 有则跳过，无则添加
              response.data.forEach((col, index) => {
                if (this.page.codeDataJson.form.formData) {
                  let formFlag = true
                  this.page.codeDataJson.form.formData.forEach(form => {
                    if (col.colCode === form.prop) {
                      formFlag = false
                    }
                  })
                  if (formFlag) {
                    this.page.codeDataJson.form.formData.push({
                      label: '',
                      dbDataType: 'STR',
                      prop: col.colCode,
                      sortNo: index + 1,
                      queryProp: this.$toolUtil.toLine(col.colCode),
                      propArry: '',
                      attrs: { clearable: true },
                      type: 'input',
                      isShow: true,
                      required: false,
                      default: null,
                      defaultFunc: ''
                    })
                  }
                }

                if (this.page.codeDataJson.mainData.table.cols) {
                  let formFlag = true
                  this.page.codeDataJson.mainData.table.cols.forEach(form => {
                    if (col.colCode === form.prop) {
                      formFlag = false
                    }
                  })
                  if (formFlag) {
                    this.page.codeDataJson.mainData.table.cols.push({
                      label: '',
                      sortNo: index + 1,
                      prop: col.colCode,
                      queryProp: this.$toolUtil.toLine(col.colCode),
                      isShow: true
                    })
                  }
                }
              })
            }
          })
          .catch(() => {})
      } else {
        this.$notify(
          notifyError({
            msg: '应用和sql不可以为空'
          })
        )
      }
    },
    init() {},

    buttonChange(row) {
      if (row.name) {
        this.buttonOptions.forEach(button => {
          if (row.name === button.dictItemVal) {
            row.operateName = button.dictItemName
            row.operateCode = button.dictItemVal
            row.operateEname = button.dictItemNameEn
          }
        })
      }
    },
    // 单元格文本类型修改
    colTypeChange(val, row) {
      let attrPro = {}
      attrPro.align = 'left'
      if (val === 'dict') {
        this.$set(row, 'func', '')
        attrPro.align = 'center'
      } else if (val === 'date') {
        this.$set(row, 'func', 'dateFormat')
        attrPro.align = 'center'
      } else {
        attrPro.align = 'right'
        row.func = 'money'
        row.extendProps = Object.assign({}, attrPro, row.extendProps)
      }
    },
    // 单元格文本类型清除
    colTypeClear(row) {
      let attrPro = {}
      attrPro.align = 'left'
      this.$set(row, 'dict', '')
      this.$set(row, 'func', '')
      row.extendProps = Object.assign({}, attrPro, row.extendProps)
    },

    // 增加按钮（公用传参）
    addBtnRow(obj) {
      this.page.codeDataJson.mainData.topBar.push({
        name: '',
        iconName: '',
        i18n: ''
      })
    },
    // 删除按钮（公用传参）
    deleteBtnRow() {
      const index = this.page.codeDataJson.mainData.topBar.indexOf(this.currentRowBtn)
      if (index < 0) return
      this.page.codeDataJson.mainData.topBar.splice(index, 1)
    },
    // 增行
    addConditionRow() {
      this.page.codeDataJson.form.formData.push({
        label: '',
        prop: '',
        isShow: false,
        required: false,
        default: null,
        attrs: { clearable: true }
      })
    },
    // 删行
    deleteConditionRow() {
      const index = this.page.codeDataJson.form.formData.indexOf(this.currentRowForm)
      if (index < 0) return
      this.page.codeDataJson.form.formData.splice(index, 1)
    },
    batchDeleteConditionRow() {
      if (this.multipleSelectionRowForm.length > 0) {
        this.multipleSelectionRowForm.forEach(row => {
          const index = this.page.codeDataJson.form.formData.indexOf(row)
          if (index < 0) return
          this.page.codeDataJson.form.formData.splice(index, 1)
        })
      }
    },

    // 增行
    addRow() {
      this.page.codeDataJson.mainData.table.cols.push({
        label: '',
        prop: '',
        isShow: false,
        sortable: true
      })
    },
    // 删行
    deleteRow() {
      const index = this.page.codeDataJson.mainData.table.cols.indexOf(this.currentRowTable)
      if (index < 0) return
      this.page.codeDataJson.mainData.table.cols.splice(index, 1)
    },

    batchdeleteRow() {
      if (this.multipleSelectionRowTable.length > 0) {
        this.multipleSelectionRowTable.forEach(row => {
          const index = this.page.codeDataJson.mainData.table.cols.indexOf(row)
          if (index < 0) return
          this.page.codeDataJson.mainData.table.cols.splice(index, 1)
        })
      }
    },
    // 增加属性
    onAddAttr() {
      this.attrData.push({
        key: '',
        type: '',
        value: ''
      })
    },
    // 删除属性
    onDeleteAttr() {
      const index = this.attrData.indexOf(this.currentRowAttr)
      this.attrData.splice(index, 1)
    },

    // 增加方法
    onAddFunc() {
      this.funcData.push({
        key: '',
        value: ''
      })
    },
    // 删除方法
    onDeleteFunc() {
      const index = this.funcData.indexOf(this.currentRowFunc)
      this.funcData.splice(index, 1)
    },
    onRowEventSet(row) {
      this.funcData = []
      this.dialogTableVisible2 = true
      if (row.event && Object.keys(row.event).length) {
        Object.keys(row.event).forEach(item => {
          this.funcData.push({
            key: item,
            value: row.event[item]
          })
        })
      }
    },
    // 保存当前行自定义方法
    onEventsConfirm() {
      const result = {}
      this.funcData.forEach(attr => {
        result[attr.key] = attr.value
      })
      this.currentRowBtn.event = result
      this.dialogTableVisible2 = false
    },

    extendPropsConfirm() {
      const result = {}
      this.attrData.forEach(attr => {
        result[attr.key] = this.getAttrVal(attr.value, attr.type)
      })
      this.currentRowTable.extendProps = result
      this.extendPropsVisible = false
    },
    handleSelectRowFunc(val) {
      this.currentRowFunc = val
    },

    // 删除方法
    // onDeleteFunc() {
    //   const index = this.funcData.indexOf(this.currentRowFunc)
    //   this.funcData.splice(index, 1)
    // },
    // 选中当前行
    handleSelectRowForm(val) {
      this.currentRowForm = val
    },
    handleSelectRowTable(val) {
      this.currentRowTable = val
    },
    handleSelectRowAttr(val) {
      this.currentRowAttr = val
    },
    handleSelectRowApi(val) {
      this.currentRowApi = val
    },

    handleFormSelectionChange(val) {
      this.multipleSelectionRowForm = val
    },
    handleTableSelectionChange(val) {
      this.multipleSelectionRowTable = val
    },
    handleSelectRowBtnTables(val) {
      this.currentRowBtn = val
    },
    onRowAttrSet(row, type) {
      this.onRowAttrSetType = type
      this.attrData = []
      this.dialogTableVisible = true
      if (row.attrs && Object.keys(row.attrs).length) {
        Object.keys(row.attrs).forEach(item => {
          this.attrData.push({
            key: item,
            type: this.getAttrType(row.attrs[item]),
            value: typeof row.attrs[item] === 'string' ? row.attrs[item] : JSON.stringify(row.attrs[item])
          })
        })
      }
    },

    onRowExtendPropsSet(row) {
      this.attrData = []
      this.extendPropsVisible = true
      if (row.extendProps) {
        if (typeof row.extendProps === 'string') {
          row.extendProps = eval('(' + row.extendProps + ')')
        }
        if (row.extendProps instanceof Object && Object.keys(row.extendProps).length) {
          Object.keys(row.extendProps).forEach(item => {
            this.attrData.push({
              key: item,
              type: this.getAttrType(row.extendProps[item]),
              value: typeof row.extendProps[item] === 'string' ? row.extendProps[item] : JSON.stringify(row.extendProps[item])
            })
          })
        }
      }
    },
    getAttrVal(value, type) {
      switch (type) {
        case 'boolean':
          return !!value
        case 'array':
          return value.replace(/\s/g, '').split(',')
        case 'number':
          return +value
        case 'object':
          return JSON.parse(value)
        default:
          return value
      }
    },
    getAttrType(value) {
      switch (Object.prototype.toString.call(value)) {
        case '[object Boolean]':
          return 'boolean'
        case '[object Array]':
          return 'array'
        case '[object Number]':
          return 'number'
        case '[object Object]':
          return 'object'
        default:
          return 'string'
      }
    },
    // 保存当前行自定义属性
    onConfirm() {
      const result = {}
      this.attrData.forEach(attr => {
        result[attr.key] = this.getAttrVal(attr.value, attr.type)
      })

      if (this.onRowAttrSetType === 'button') {
        this.currentRowBtn.attrs = result
        this.currentRowBtn = Object.assign({}, this.currentRowBtn, result)
      } else {
        this.currentRowForm.attrs = result
      }

      this.dialogTableVisible = false
    },

    sortByKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key]
        var y = b[key]
        return x - y
      })
    },
    // 保存菜单
    onSave() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          this.$confirm('确认是否保存', '提示', {
            type: 'warning',
            closeOnClickModal: false,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            // 查询信息
            const formData = []

            if (this.page.isSendMail) {
              this.page.sendMail = '1'
            } else {
              this.page.sendMail = '0'
            }

            let params = JSON.parse(JSON.stringify(this.page))
            // 表单时间区间字段修改
            params.codeDataJson.form.formData.forEach(form => {
              if (!form.sortNo) {
                form.sortNo = 99
              }
              if (form.type === 'input') {
                form.element = 'input-validate'
                if (form.required) {
                  form.validate = [
                    {
                      required: true,
                      trigger: 'blur'
                    }
                  ]
                } else {
                  delete form.validate
                }
              } else if (form.type === 'datadict' || form.type === 'baseSelect') {
                form.element = 'base-select'
                if (form.required) {
                  form.validate = [
                    {
                      required: true,
                      trigger: 'change'
                    }
                  ]
                } else {
                  delete form.validate
                }
              } else {
                form.element = form.type
                if (form.required) {
                  form.validate = [
                    {
                      required: true,
                      trigger: 'blur'
                    }
                  ]
                } else {
                  delete form.validate
                }
              }
              if (form.datadict) {
                form.list = form.datadict
              }
              if (form.propArry) {
                form.props = form.propArry.replace(/\s/g, '').split(',')
              } else {
                delete form.props
              }

              formData.push({
                prop: form.prop,
                props: form.props,
                dbDataType: form.dbDataType
              })
            })
            //排序
            params.codeDataJson.form.formData = this.sortByKey(params.codeDataJson.form.formData, 'sortNo')
            // 查询信息
            params.pageDataJson = formData
            //不分页
            if (params.codeDataJson.mainData.bottomBar.pagination.show) {
              params.codeDataJson.form.listQuery.isPage = true
            } else {
              params.codeDataJson.form.listQuery.isPage = false
            }

            params.codeDataJson.form.listQuery.bsQueryExtrasForCode = []
            // 表格按钮
            //params.codeDataJson.mainData.topBar = [{ name: 'refresh' }, { name: 'export', type: 'api' }]
            let widthPro = {}
            if (params.codeDataJson.mainData.table.colWidth) {
              widthPro.width = params.codeDataJson.mainData.table.colWidth
            }
            // 列表数据格式化
            params.codeDataJson.mainData.table.cols.forEach(col => {
              if (!col.sortNo) {
                col.sortNo = 99
              }

              // 文本处理
              if (col.type) {
                if (col.func) {
                  col.format = {
                    func: col.func,
                    dict: col.dict
                  }
                } else {
                  col.format = {
                    dictType: col.dict
                  }
                }
              } else {
                if (col.format) delete col.format
              }
              if (col.extendProps && col.extendProps instanceof Object) {
                col.extendProps = Object.assign({}, widthPro, col.extendProps)
              }
            })

            //排序
            params.codeDataJson.mainData.table.cols = this.sortByKey(params.codeDataJson.mainData.table.cols, 'sortNo')

            request({
              url: this.opType === 'add' || this.opType === 'copy' ? '/api/code/report/save' : '/api/code/report/update',
              method: 'POST',
              data: {
                data: params,
                funcModule: this.$t('route.' + this.$route.meta.title),
                funcOperation: '保存'
              }
            })
              .then(response => {
                // 接口调用保存数据...
                this.$emit('closeHandler', true)
                this.$notify(notifySuccess({ msg: '保存成功' }))
              })
              .catch(() => {
                this.$notify(notifyError({ msg: '保存失败' }))
              })
          })
        }
      })
    }
  }
}
</script>
<style   lang="scss">
#funcTable {
  .el-table td {
    padding: 0 !important;
    cursor: pointer;

    .cell {
      line-height: 100px !important;
      height: 100px;
      > div {
        vertical-align: middle;
      }
    }
  }
}
</style>
