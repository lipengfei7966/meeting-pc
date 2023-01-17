/*
 * @Author: Sanmao
 * @Date: 2023-01-17 13:50:01
 * @LastEditTime: 2023-01-17 13:51:54
 * @LastEditors: Sanmao
 * @Description:  国际化配置
 * @FilePath: \meeting-pc\src\views\frame\cmms\services\attendee\manage\locale\index.js
 */
// 后端反的国际化
import enRegistration from './en'
import zhRegistration from './zh'

const messages = {
  en: {
    ...enRegistration
  },
  zh: {
    ...zhRegistration
  }
}

export default messages
