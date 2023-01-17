import Vue from 'vue'
import VueI18n from 'vue-i18n'

import enElement from 'element-ui/lib/locale/lang/en' // element-ui lang
import zhElement from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang

// 参会人管理--详情
import zhAttendeeDetail from '@/lang/frame/service/Attendee/attendeeDetail_en'
import enAttendeeDetail from '@/lang/frame/service/Attendee/attendeeDetail_zh'

import storage from '@/utils/frame/base/localStorage'
// frame
import langFrame from '@/lang/frame/index'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enElement,
    ...enAttendeeDetail,
    ...langFrame.en
  },
  zh: {
    ...zhElement,
    ...zhAttendeeDetail,
    ...langFrame.zh
  }
}
const i18n = new VueI18n({
  locale: storage.get('language') || 'zh', // set locale
  messages // set locale messages
})

window.i18n = i18n
export default i18n
