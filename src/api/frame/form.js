/*
 * @Author: Sanmao
 * @Date: 2023-01-17 09:55:50
 * @LastEditTime: 2023-01-17 10:38:21
 * @LastEditors: SanMao
 * @Description: form  Api
 * @FilePath: \meeting-pc\src\api\frame\form.js
 */
import request from '@/utils/frame/base/request'

const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}
Object.freeze(METHOD)
/**
 * 注册会议多语言会议配置
 */
export function getLanguage(data) {
  return request({
    url: `/api/register/cmsEventInfoLang/getLanguage`,
    method: METHOD.POST,
    data
  })
}

