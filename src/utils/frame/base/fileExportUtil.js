import request from '@/utils/frame/base/request'
import { getToken } from '@/utils/frame/base/auth'
import { Loading } from 'element-ui'
const fileExportUtilPrivate = {
  downloadTempfile(filePath, fileName) {
    const fileUrl = process.env.BASE_API + '/api/sys/file/downtempfile/' + filePath + '/' + encodeURIComponent(fileName) + '?Authorization=' + encodeURIComponent(getToken())
    const link = document.createElement('a')
    link.setAttribute('href', fileUrl)
    link.setAttribute('target', '_blank')
    link.click()
    link.remove()
  },
  exportExcelByModule(moduleCode, queryData, options) {
    const loading = Loading.service({
      lock: true,
      text: 'loading...',
      background: 'rgba(0, 0, 0, 0.2)'
    })
    request({
      url: '/api/sys/fle/exp/expByModule',
      method: 'post',
      timeout: 600000,
      data: {
        funcModule: '导出共通',
        funcOperation: '按模块导出excel',
        data: {
          moduleCode: moduleCode,
          param: queryData,
          options: options
        }
      }
    })
      .then(response => {
        if (response.status) {
          this.downloadTempfile(response.data.filePath, response.data.fileName)
        }
      })
      .finally(() => {
        loading.close()
      })
  }
}

const fileExportUtil = {
  downloadTempfile(filePath, fileName) {
    fileExportUtilPrivate.downloadTempfile(filePath, fileName)
  },
  exportExcelByModule(moduleCode, queryData, options) {
    if (typeof options === 'function') {
      options = options()
    }
    if (options instanceof Promise) {
      options.then(optAsync => {
        fileExportUtilPrivate.exportExcelByModule(moduleCode, queryData, optAsync)
      })
    } else {
      fileExportUtilPrivate.exportExcelByModule(moduleCode, queryData, options)
    }
  }
}
export default fileExportUtil
