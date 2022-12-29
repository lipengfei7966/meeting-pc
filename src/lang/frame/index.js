// 基础信息
import enBase from '@/lang/frame/base/modules/base_en'
import zhBase from '@/lang/frame/base/modules/base_zh'
// 消息中心
import enMsg from '@/lang/frame/base/modules/msg_en'
import zhMsg from '@/lang/frame/base/modules/msg_zh'
// 消息中心
import enFile from '@/lang/frame/base/modules/file_en'
import zhFile from '@/lang/frame/base/modules/file_zh'
// 基础档案
import enData from '@/lang/frame/base/modules/data_en'
import zhData from '@/lang/frame/base/modules/data_zh'
// 首页
import enDashboard from '@/lang/frame/base/modules/dashboard_en'
import zhDashboard from '@/lang/frame/base/modules/dashboard_zh'

// sys
import enSys from '@/lang/frame/base/modules/sys_en'
import zhSys from '@/lang/frame/base/modules/sys_zh'

// 平台
import enPlatform from '@/lang/frame/base/modules/platform_en.js'
import zhPlatform from '@/lang/frame/base/modules/platform_zh.js'
// 功能中心
import enFunc from '@/lang/frame/base/modules/func_en'
import zhFunc from '@/lang/frame/base/modules/func_zh'

// 微站
import zhWebsite from '@/lang/frame/website/website_zh'
import enWebsite from '@/lang/frame/website/website_en'

// 订单
import zhOrder from '@/lang/frame/base/modules/order_zh'
import enOrder from '@/lang/frame/base/modules/order_en'

const messages = {
  en: {
    ...enBase,
    ...enMsg,
    ...enFile,
    ...enSys,
    ...enData,
    ...enDashboard,
    ...enPlatform,
    ...enFunc,
    ...enWebsite,
    ...enOrder
  },
  zh: {
    ...zhBase,
    ...zhMsg,
    ...zhFile,
    ...zhSys,
    ...zhData,
    ...zhDashboard,
    ...zhPlatform,
    ...zhFunc,
    ...zhWebsite,
    ...zhOrder
  }
}

export default messages
