import { notifyInfo } from '@/utils/frame/base/notifyParams'
import request from '@/utils/frame/base/request'
/**
 * 审批流工具类
 */
const bpmUtil = {
  /**
   * obj转换成键值对对象集合
   *
   * @param {Object} obj 对象
   */
  obj2VarParamList(obj) {
    if (!obj) {
      return []
    }

    const varParamList = []
    let typeofStr
    for (const [key, value] of Object.entries(obj)) {
      typeofStr = typeof value
      if (typeof value === 'function' || typeof value === 'symbol') {
        continue
      }
      if (value === null || typeofStr === 'string' || typeofStr === 'boolean' || typeofStr === 'number') {
        varParamList.push({ name: key, value: value })
        continue
      }
      varParamList.push({ name: key, value: JSON.stringify(value) })
    }
    return varParamList
  },
  /**
   * 添加参数对象
   *
   * @param {Array} varParamList 参数对象集
   * @param {Object} varParam 参数对象
   */
  addVarParam(varParamList, varParam) {
    if (varParamList === undefined || varParamList === null) {
      varParamList = []
    }
    varParamList.push(varParam)
  },
  /**
   * 创建审批参数
   *
   * @param {String} moduleCode 模块CODE
   * @param {String} billNo 单据号
   * @param {Array} varParamList 参数对象集
   * @param {Object} inputFormInfo 手输表单信息
   */
  createAduitParam(moduleCode, billNo, varParamList, inputFormInfo) {
    return {
      moduleCode: moduleCode,
      billNo: billNo,
      bpmVariableParamList: varParamList || [],
      inputFormInfo: inputFormInfo || {}
    }
  },
  /**
   * 创建获取钉钉[手输]表单查询参数
   *
   * @param {String} moduleCode 模块CODE
   * @param {String} billNo 单据号
   */
  createDingInputFormQryParam(moduleCode, billNo) {
    return {
      // 模块CODE
      moduleCode: moduleCode || '',
      // 单据号
      billNo: billNo || ''
    }
  },

  /**
   * 是否支持撤回审核
   * @param {Object} data 对象

   * @param {Object} self this对象
   * @param {String} errorMsg 错误信息
   */
  async supportWithdrawAudit(data, self) {
    // 钉钉不支持在CT系统内撤回

    const response = await request({
      url: '/api/bpm/businessDefine/withdrawTaskValid',
      method: 'POST',
      data: {
        data: data,
        funcModule: self.$t('route.' + self.$route.meta.title),
        funcOperation: self.$t('biz.btn.submitAudit')
      }
    })

    if (response.data) {
      return true
    } else {
      const msg = self.$t('biz.msg.DingTalkNotSupportWithdrawAudit')
      self.$notify(notifyInfo({ msg: msg }))
      return false
    }
  }

}

export default bpmUtil
