import Vue from 'vue'
import VueI18n from 'vue-i18n'

import enElement from 'element-ui/lib/locale/lang/en' // element-ui lang
import zhElement from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang

import storage from '@/utils/frame/base/localStorage'
// frame
import langFrame from '@/lang/frame/index'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enElement,
    ...langFrame.en
  },
  zh: {
    ...zhElement,
    ...langFrame.zh
  }
}
const i18n = new VueI18n({
  locale: storage.get('language') || 'zh', // set locale
  messages // set locale messages
})

window.i18n = i18n
export default i18n
