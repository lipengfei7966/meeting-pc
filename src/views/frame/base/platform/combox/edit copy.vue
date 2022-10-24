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

      <div class='dialog-content dialog-container__content' :style="{maxHeight: clientHeight - 80 + 'px', overflowY: 'auto'}">
        <header :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto', 'border-bottom-width': baseInfoVisible ? '1px' : '0'}">
          <div class='form-title'>
            基础信息
            <i :class="['el-icon-arrow-down', {'el-icon-arrow-up' : !baseInfoVisible}]" @click='baseInfoVisible = !baseInfoVisible'></i>
          </div>
          <el-form v-if='baseInfoVisible' class="header-form-inline" :model="page" label-position="left" :rules='rules' ref="refForm" :show-message="false">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="功能代码" prop='funcCode'>
                  <input-validate v-model='page.funcCode' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="功能名称" prop='funcName'>
                  <input-validate v-model='page.funcName' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="查询sql" prop='sqlStatement'>
                  <el-input v-model="page.sqlStatement" :clearable='true' type="textarea">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="代码字段" prop='valueColumn'>
                  <el-select v-model="page.valueColumn" size='mini' clearable placeholder="请选择对应字段">
                    <el-option v-for="item in page.codeDataJson.sqlCols" :key="item.prop" :label="item.label" :value="item.prop"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="名称字段" prop='nameColumn'>
                  <el-select v-model="page.nameColumn" size='mini' clearable placeholder="请选择对应字段">
                    <el-option v-for="item in page.codeDataJson.sqlCols" :key="item.prop" :label="item.label" :value="item.prop"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="下拉条数" prop='pageSize'>
                  <el-input v-model="page.extendDataJson.pageSize" :clearable='true'>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否展示更多查询" prop='showMoreQuery'>
                  <!-- 字典码表 -->
                  <el-checkbox v-model='page.extendDataJson.showMoreQuery'></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="下拉框说明" prop='remark'>
                  <el-input v-model="page.remark" :clearable='true'>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="sql注意说明1">
                  <el-input :disabled="true" value='1、作为查询条件和展示的列，都查在SQL里查询出来'>
                  </el-input>
                </el-form-item>

                <el-form-item label="sql注意说明2">
                  <el-input :disabled="true" value='2、内置查询条件时，例子select xx from table where 1=1 #AUTH_SQL# #INNER_SQL#  and TENANT_CODE = #TENANT_CODE#'>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </header>

        <header :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto', 'border-bottom-width': authInfoVisible ? '1px' : '0'}">
          <div class='form-title'>
            权限信息(用于做数据权限控制，所有参数和DataAuth注解一致)
            <i :class="['el-icon-arrow-down', {'el-icon-arrow-up' : !authInfoVisible}]" @click='authInfoVisible = !authInfoVisible'></i>
          </div>
          <el-form v-if='authInfoVisible' class="header-form-inline" :model="page.extendDataJson.dataAuthDto" label-position="left" ref="dataAuthDto" :show-message="false">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="是否权限控制" prop='authFlag'>
                  <el-checkbox v-model='page.extendDataJson.authFlag'></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构权限字段" prop='orgCol'>
                  <input-validate v-model='page.extendDataJson.dataAuthDto.orgCol' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门权限字段" prop='deptCol'>
                  <input-validate v-model='page.extendDataJson.dataAuthDto.deptCol' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="员工权限字段" prop='employeeCol'>
                  <input-validate v-model='page.extendDataJson.dataAuthDto.employeeCol' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="自已添加控制字段" prop='selfCol'>
                  <input-validate v-model='page.extendDataJson.dataAuthDto.selfCol' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="查询系统执行数据" prop='includeSysCode'>
                  <el-checkbox v-model='page.extendDataJson.dataAuthDto.includeSysCode'></el-checkbox>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </header>
        <header :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto', 'border-bottom-width': tableInfoVisible ? '1px' : '0'}">
          <div class='form-title'>
            单表信息查询(用于删除数据查询,所有信息格式DB定义样式,大写加下划线)
            <i :class="['el-icon-arrow-down', {'el-icon-arrow-up' : !tableInfoVisible}]" @click='tableInfoVisible = !tableInfoVisible'></i>
          </div>
          <el-form v-if='tableInfoVisible' class="header-form-inline" :model="page" label-position="left" :rules='rules' ref="refForm" :show-message="false">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="数据表" prop='tableName'>
                  <input-validate v-model='page.tableName' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="表名称字段" prop='tableColumnName'>
                  <input-validate v-model='page.tableColumnName' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="表码值字段" prop='tableColumnValue'>
                  <input-validate v-model='page.tableColumnValue' :clearable='true'></input-validate>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否有租户标志" prop='tenantFlag'>
                  <!-- 字典码表 -->
                  <el-select v-model="page.tenantFlag" :clearable=true :placeholder="$t('biz.placeholder.choose')">
                    <el-option v-for="item in $t('datadict.yesNo')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </header>
        <header :style=" {'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px' ) : 'auto' , 'border-bottom-width' : comboxInfoVisible ? '1px' : '0' }">
          <div class='form-title'>
            查询框过滤设置
            <i :class="['el-icon-arrow-down', {'el-icon-arrow-up' : !comboxInfoVisible}]" @click='comboxInfoVisible = !comboxInfoVisible'></i>
          </div>
          <div class='tabs-operate' v-if="comboxInfoVisible" style='margin-top: 5px;'>

            <el-button v-db-click size="mini" @click='addComboxRow'>
              <svg-icon icon-class="addLine"></svg-icon>增行
            </el-button>
            <el-button v-db-click size="mini" @click='batchDeleteComboxRow'>
              <svg-icon icon-class="delete"></svg-icon>删行
            </el-button>
          </div>
          <el-table v-if="comboxInfoVisible" stripe border class='table-content tb-edit' ref="singleTable" highlight-current-row element-loading-spinner="el-icon-loading" element-loading-text="" :height='150' :data="page.pageDataJson" @current-change="handleSelectRowCombox" @selection-change="handleComboxSelectionChange">
            <el-table-column align='center' type="index" fixed="left" width="50" 序号></el-table-column>
            <el-table-column align='center' type="selection" width="55"> </el-table-column>

            <el-table-column show-overflow-tooltip width="140">
              <template slot="header" slot-scope="scope">
                数据
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
            <el-table-column show-overflow-tooltip prop='filterFlag' width="200">
              <template slot="header" slot-scope="scope">
                是否支持过滤
                <span style='color:#f56c6c;' :data-header='scope'>*</span>
              </template>
              <template slot-scope='scope'>
                <el-select v-model="scope.row.filterFlag" size='mini' clearable placeholder="">
                  <el-option v-for="item in $t('datadict.yesNo')" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column show-overflow-tooltip width="200" prop='lableFlag'>
              <template slot="header" slot-scope="scope">
                label展示分组
                <span style='color:#f56c6c;' :data-header='scope'>*</span>
              </template>
              <template slot-scope='scope'>
                <el-select v-model="scope.row.lableFlag" size='mini' placeholder="">
                  <el-option v-for="item in labelShowType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>

          </el-table>
        </header>

        <header :style=" {'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px' ) : 'auto' , 'border-bottom-width' : pageInfoVisible ? '1px' : '0' }">
          <div class='form-title'>
            更多查询页面-基础信息
            <i :class="['el-icon-arrow-down', {'el-icon-arrow-up' : !pageInfoVisible}]" @click='pageInfoVisible = !pageInfoVisible'></i>
          </div>
          <el-form v-if='pageInfoVisible' class="header-form-inline" :model="page" label-position="left" :rules='rules' ref="refForm2" :show-message="false">
            <el-row :gutter="20">

              <el-col :span="8">
                <el-form-item label="初始化请求" prop='initSearch'>
                  <el-checkbox v-model='page.codeDataJson.mainData.initSearch'></el-checkbox>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="默认排序" prop='defaultSortString'>
                  <el-input v-model='page.codeDataJson.form.listQuery.defaultSortString'>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否驼峰转成大写下划线" prop='camelToUnderlineFlg'>
                  <el-checkbox v-model='page.codeDataJson.form.listQuery.camelToUnderlineFlg'></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否分页" prop='show'>
                  <el-checkbox v-model='page.codeDataJson.form.listQuery.isPage'></el-checkbox>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </header>
        <main :style="{'width': clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto'}">
          <el-tabs type="border-card" v-model="activeName" value="form">
            <el-tab-pane label='更多查询页面-查询条件' name="form">
              <div class='tabs-operate' style='margin-top: 5px;'>

                <el-button v-db-click size="mini" @click='addConditionRow'>
                  <svg-icon icon-class="addLine"></svg-icon>增行
                </el-button>
                <el-button v-db-click size="mini" @click='batchDeleteConditionRow'>
                  <svg-icon icon-class="delete"></svg-icon>删行
                </el-button>
              </div>
              <el-table stripe border class='table-content tb-edit' ref="singleTable" highlight-current-row element-loading-spinner="el-icon-loading" element-loading-text="" :height='300' :data="page.codeDataJson.form.formData" @current-change="handleSelectRowForm" @selection-change="handleFormSelectionChange">
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
            <el-tab-pane label='更多查询页面-列表设置' name="table">
              <div class='tabs-operate' style='margin-top: 5px;'>
                <el-button v-db-click size="mini" @click='batchdeleteRow'>
                  <svg-icon icon-class="delete"></svg-icon>删行
                </el-button>
              </div>
              <el-table stripe border class='table-content tb-edit' ref="singleTable" highlight-current-row element-loading-spinner="el-icon-loading" element-loading-text="加载中" :height='300' :data="page.codeDataJson.mainData.table.cols" @current-change="handleSelectRowTable" @selection-change="handleTableSelectionChange">
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
import { notifySuccess, notifyError, notifyInfo } from '@/utils/frame/base/notifyParams'
export default {
  data() {
    return {
      activeName: 'form',
      titleName: '',
      baseInfoVisible: true,
      tableInfoVisible: true,
      authInfoVisible: true,
      pageInfoVisible: true,
      comboxInfoVisible: true,
      currentRowForm: {},
      currentRowCombox: {},
      multipleSelectionRowForm: [],
      multipleSelectionRowCombox: [],
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
      loadingChild: false,
      // 表单项
      formRules: {},
      labelShowType: [
        {
          label: 'name',
          value: 'name'
        },
        {
          label: 'code',
          value: 'code'
        },
        {
          label: 'none',
          value: 'none'
        }
      ],
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
          label: '接口下拉框',
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
      rules: {
        funcName: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        funcCode: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        nameColumn: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        valueColumn: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        tableColumnValue: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        tableColumnName: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        tableName: [
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
        funcName: '',
        funcCode: '',
        sqlStatement: '',
        remark: '',
        sortNo: '',
        valueColumn: '',
        nameColumn: '',
        tableName: '',
        tableColumnName: '',
        tableColumnValue: '',
        tenantFlag: '',
        pageDataJson: [],
        extendDataJson: {
          pageSize: 30,
          showMoreQuery: false,
          camelToUnderlineFlg: true,
          authFlag: false,
          dataAuthDto: {
            orgCol: '',
            deptCol: '',
            selfCol: '',
            employeeCol: '',
            includeSysCode: false
          }
        },
        codeDataJson: {
          slotInfo: '',
          form: {
            moreShowFlg: false,
            listQuery: {
              camelToUnderlineFlg: true,
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

          sqlCols: [],
          mainData: {
            initSearch: true,
            api: [],
            table: {
              id: '',
              colWidth: '140',
              sortable: 'custom',
              showSummary: false,
              cols: []
            },

            bottomButtons: [
              {
                name: 'biz.btn.cancel',
                event: 'cancel',
                isShow: ['view']
              },
              {
                name: '加入常用',
                event: 'cancel',
                isShow: ['view']
              },
              {
                name: 'biz.btn.choose',
                event: 'choose',
                isShow: ['add', 'update'],
                attrs: {
                  type: 'primary'
                }
              }
            ]
          }
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
    this.titleName = '接口下拉框设置'
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
        url: '/api/platform/cfgCombox/get',
        method: 'post',
        data: {
          data: this.param,
          funcModule: this.$t('route.' + this.$route.meta.title),
          funcOperation: this.$t('biz.btn.view')
        }
      })
        .then(response => {
          const res = response.data
          this.page = res
        })
        .catch(() => {})
    },
    onExplain() {
      if (this.page.sqlStatement) {
        request({
          url: '/api/platform/cfgCombox/explain',
          method: 'post',
          data: {
            data: this.page.sqlStatement,
            funcModule: this.$t('route.' + this.$route.meta.title),
            funcOperation: this.$t('biz.btn.explain')
          }
        })
          .then(response => {
            if (response.data) {
              // 有则跳过，无则添加
              response.data.forEach(col => {
                if (this.page.codeDataJson.sqlCols) {
                  let formFlag = true
                  this.page.codeDataJson.sqlCols.forEach(form => {
                    if (col.colCode === form.prop) {
                      formFlag = false
                    }
                  })
                  if (formFlag) {
                    this.page.codeDataJson.sqlCols.push({
                      prop: col.colCode
                    })
                  }
                }

                if (this.page.pageDataJson) {
                  let formFlag = true
                  this.page.pageDataJson.forEach(form => {
                    if (col.colCode === form.prop) {
                      formFlag = false
                    }
                  })
                  if (formFlag) {
                    this.page.pageDataJson.push({
                      prop: col.colCode
                    })
                  }
                }

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
            msg: 'sql不可以为空'
          })
        )
      }
    },
    init() {},

    // 单元格文本类型修改
    colTypeChange(val, row) {
      if (val === 'dict') {
        this.$set(row, 'func', '')
      } else if (val === 'date') {
        this.$set(row, 'func', 'dateFormat')
      }
    },
    // 单元格文本类型清除
    colTypeClear(row) {
      this.$set(row, 'dict', '')
      this.$set(row, 'func', '')
    },

    // 增行
    addComboxRow() {
      this.page.pageDataJson.push({
        prop: '',
        filterFlag: false,
        labelFlag: false,
        sortNo: 1
      })
    },
    // 删行

    batchDeleteComboxRow() {
      if (this.multipleSelectionRowCombox.length > 0) {
        this.multipleSelectionRowCombox.forEach(row => {
          const index = this.page.pageDataJson.indexOf(row)
          if (index < 0) return
          this.page.pageDataJson.splice(index, 1)
        })
      }
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

    batchDeleteConditionRow() {
      if (this.multipleSelectionRowForm.length > 0) {
        this.multipleSelectionRowForm.forEach(row => {
          const index = this.page.codeDataJson.form.formData.indexOf(row)
          if (index < 0) return
          this.page.codeDataJson.form.formData.splice(index, 1)
        })
      }
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
    onDeleteFunc() {
      const index = this.funcData.indexOf(this.currentRowFunc)
      this.funcData.splice(index, 1)
    },
    // 选中当前行
    handleSelectRowForm(val) {
      this.currentRowForm = val
    },

    // 选中当前行
    handleSelectRowCombox(val) {
      this.currentRowCombox = val
    },

    handleSelectRowTable(val) {
      this.currentRowTable = val
    },
    handleSelectRowAttr(val) {
      this.currentRowAttr = val
    },
    handleFormSelectionChange(val) {
      this.multipleSelectionRowForm = val
    },

    handleComboxSelectionChange(val) {
      this.multipleSelectionRowCombox = val
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
        this.currentRowBtn = Object.assign(this.currentRowBtn, result)
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
            let params = JSON.parse(JSON.stringify(this.page))
            //判断是否选择对应code,name属性
            if (this.page.codeDataJson.mainData.table.cols.length <= 0) {
              this.$notify(notifyInfo({ msg: '请先解析SQL' }))
              return
            }
            if (params.nameColumn === '') {
              this.$notify(notifyInfo({ msg: '请选择下拉框展示代码对应字段' }))
              return
            }
            if (params.valueColumn === '') {
              this.$notify(notifyInfo({ msg: '请选择下拉框展示名称对应字段' }))
              return
            }

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
            //不分页
            if (params.codeDataJson.form.listQuery.camelToUnderlineFlg) {
              params.extendDataJson.camelToUnderlineFlg = true
            } else {
              params.extendDataJson.camelToUnderlineFlg = false
            }

            //排序
            params.codeDataJson.form.formData = this.sortByKey(params.codeDataJson.form.formData, 'sortNo')
            params.pageDataJson = this.sortByKey(params.pageDataJson, 'sortNo')
            params.codeDataJson.form.listQuery.bsQueryExtrasForCode = []
            // 表格按钮
            params.codeDataJson.mainData.topBar = []
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
                col.extendProps = Object.assign(widthPro, col.extendProps)
              }
            })

            //排序
            params.codeDataJson.mainData.table.cols = this.sortByKey(params.codeDataJson.mainData.table.cols, 'sortNo')
            request({
              url: this.opType === 'add' || this.opType === 'copy' ? '/api/platform/cfgCombox/save' : '/api/platform/cfgCombox/update',
              method: 'POST',
              data: {
                data: params,
                funcModule: this.$t('route.' + this.$route.meta.title),
                funcOperation: this.$t('biz.btn.save')
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
