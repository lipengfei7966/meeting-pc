<template>
  <div class="app-container edit-page-style">
    <!-- 顶部按钮 -->
    <el-row class="top-operate">
      <el-button size="mini" v-db-click :loading="showLoading1" style="margin-right: 6px" @click="downloadTemplate">
        <svg-icon icon-class="down" />{{ $t('biz.btn.downloadTemplate') }}</el-button>

      <el-upload :show-file-list="false" :action="uploadUrl" :headers="uploadHeaders" accept=".xlsx" :on-progress="handleProgress" :on-success="handleSuccess" :multiple="false" :disabled="showLoading2" :on-error="handleError" style="display: inline-block; margin-right: 10px">
        <el-button :disabled="showLoading2" size="mini" :loading="uploadLoading">
          <svg-icon icon-class="upload"></svg-icon>{{ $t('biz.btn.upload') }}
        </el-button>
      </el-upload>

      <el-button size="mini" v-db-click :loading="showLoading2" style="margin-right: 6px" @click="doSave">
        <svg-icon icon-class="save" />{{ $t('biz.btn.save') }}</el-button>
      <span>{{ impFileName }}</span>
    </el-row>
    <main :style="{ width: clientWidth < 1366 ? (sidebar.opened ? '1163px' : '1323px') : 'auto' }">
      <div style="padding-top: 32px">
        <el-tabs type="border-card">
          <el-tab-pane :label="sheet.paramName" v-for="(sheet, idx) in tabs" :key="idx">
            <ux-grid ref="dataTableRef" :bsImpTabName="sheet.paramName" stripe border size="mini" highlight-current-row :height="tableHeight">
              <ux-table-column type="index" show-overflow="tooltip" :resizable="true" align="center" fixed="left" width="60" />
              <ux-table-column v-for="(col, colIdx) in sheet.colList" :key="colIdx" :title="col.label" :field="col.propertiesCode" header-align="center" :align="getAlign(col)" :width="getColWidth(col)" show-overflow="tooltip" :resizable="true" />
            </ux-grid>
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>
  </div>
</template>
<script>
import { notifyInfo, notifySuccess, notifyError } from '@/utils/frame/base/notifyParams'
import request from '@/utils/frame/base/request'
import fileExportUtil from '@/utils/frame/base/fileExportUtil.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      uploadLoading: false,
      uploadUrl: process.env.BASE_API + '/api/sys/file/upload',
      uploadHeaders: { Authorization: 'Bearer ' + this.$store.getters.token },
      expImpCode: null,
      impFilePath: null,
      impFileName: null,
      showLoading1: false,
      showLoading2: false,
      tableHeight: this.getDefaultTableHeight(),
      tabs: []
    }
  },
  mounted() {
    this.tabs.splice(0)
    const moduleCode = this.$route.meta.bpmModule
    request({
      url: '/api/sys/fle/imp/getImpCfgByModule',
      method: 'post',
      data: {
        funcModule: '导出共通',
        funcOperation: '按模块导出excel',
        data: moduleCode
      }
    }).then(response => {
      if (response.status) {
        this.expImpCode = response.data.expImpCode
        if (Array.isArray(response.data.paramList)) {
          for (const param of response.data.paramList) {
            param.dataList = []
            this.tabs.push(param)
          }
        }
      }
    })
  },
  computed: {
    ...mapGetters(['sidebar', 'clientWidth', 'clientHeight'])
  },
  watch: {
    clientHeight(val) {
      const newHeight = Math.max(val - 180, 300)
      if (this.tableHeight != newHeight) {
        this.tableHeight = newHeight
      }
    }
  },
  methods: {
    handleProgress() {
      for (const tableRef of this.$refs.dataTableRef) {
        tableRef.reloadData([])
      }
      this.uploadLoading = true
    },
    handleSuccess(response, file, fileList) {
      this.uploadLoading = false
      if (response && response.status === false) {
        if (response.msgText) {
          this.$notify(notifyError({ msg: response.msgText }))
        } else {
          this.$notify(notifyError({ msg: this.$t('biz.msg.fileUploadFail') }))
        }
      } else {
        if (response.msgText) {
          this.$notify(notifyInfo({ msg: response.msgText }))
        } else {
          this.$notify(notifySuccess({ msg: this.$t('biz.msg.fileUploadOk') }))
        }
        this.addFile(file)
      }
    },
    handleError(errInfo, file, fileList) {
      this.uploadLoading = false
      this.$notify(notifyError({ msg: this.$t('biz.msg.fileUploadFail') }))
    },
    getDefaultTableHeight() {
      return Math.max(window.innerHeight - 180, 300)
    },
    getAlign(col) {
      if (col.propertiesType === 'NUM' || col.propertiesType === 'WEIGHT' || col.propertiesType === 'PRICE' || col.propertiesType === 'MONEY' || col.propertiesType === 'EXPRICE' || col.propertiesType === 'TAXRATE' || col.propertiesType === 'PERCENT' || col.propertiesType === 'INTEGER' || col.propertiesType === 'EXCHANGE_RATE') {
        return 'right'
      } else {
        return 'left'
      }
    },
    getColWidth(col) {
      if (col.colWidth) {
        return col.colWidth / 25
      } else if (col.propertiesType === 'DATE') {
        return 90
      } else if (col.propertiesType === 'DATETIME') {
        return 150
      } else {
        return 120
      }
    },
    downloadTemplate() {
      const moduleCode = this.$route.meta.bpmModule
      this.showLoading1 = true
      request({
        url: '/api/sys/fle/imp/getImpTempByModule',
        method: 'post',
        data: {
          funcModule: '导出共通',
          funcOperation: '按模块导出excel',
          data: moduleCode
        }
      })
        .then(response => {
          if (response.status) {
            fileExportUtil.downloadTempfile(response.data.filePath, response.data.fileName)
          }
        })
        .finally(() => {
          this.showLoading1 = false
        })
    },
    addFile(param) {
      for (const tab of this.tabs) {
        tab.dataList.splice(0)
      }
      this.impFileName = null
      this.impFilePath = null
      if (!param.response.status) {
        return
      }
      if (!param.response.data.fileName.toLowerCase().endsWith('.xlsx')) {
        this.$notify(notifyInfo({ msg: this.$t('file.impexp.msg.uploadExcelFileOnly') }))
        return
      }
      this.impFileName = param.response.data.fileName
      this.impFilePath = param.response.data.filePath
      this.uploadLoading = true
      request({
        url: '/api/sys/fle/imp/previewImpData',
        method: 'post',
        data: {
          funcModule: '导出共通',
          funcOperation: '按模块导出excel',
          data: {
            expImpCode: this.expImpCode,
            moduleCode: this.$route.meta.bpmModule,
            impFilePath: this.impFilePath,
            impFileName: this.impFileName
          }
        }
      })
        .then(response => {
          for (const tableRef of this.$refs.dataTableRef) {
            const tabName = tableRef.$attrs.bsImpTabName
            const dataList = response.data.sheetDataMap[tabName]
            if (Array.isArray(dataList)) {
              tableRef.reloadData(dataList)
            } else {
              tableRef.reloadData([])
            }
          }
        })
        .finally(() => {
          this.uploadLoading = false
        })
    },
    doSave() {
      if (this.impFilePath === null || this.impFilePath === undefined || this.impFilePath === '') {
        this.$notify(notifyInfo({ msg: this.$t('file.impexp.msg.uploadExcelFileOnly') }))
        return
      }
      this.showLoading2 = true
      request({
        url: '/api/sys/fle/imp/impData',
        method: 'post',
        timeout: 600000,
        data: {
          funcModule: '导出共通',
          funcOperation: '按模块导出excel',
          data: {
            expImpCode: this.expImpCode,
            moduleCode: this.$route.meta.bpmModule,
            impFilePath: this.impFilePath,
            impFileName: this.impFileName
          }
        }
      })
        .then(response => {
          if (response.status) {
            this.impFileName = null
            this.impFilePath = null
            for (const tableRef of this.$refs.dataTableRef) {
              tableRef.reloadData([])
            }
            this.$notify(notifySuccess({ msg: this.$t('biz.msg.saveSuccess') }))
          }
        })
        .finally(() => {
          this.showLoading2 = false
        })
    }
  }
}
</script>

