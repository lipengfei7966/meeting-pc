// 基础信息
import enBase from '@/lang/frame/base/modules/base_en'
import zhBase from '@/lang/frame/base/modules/base_zh'
// 消息中心
import enMsg from '@/lang/frame/service/informManage/msg_en'
import zhMsg from '@/lang/frame/service/informManage/msg_zh'
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
import zhOrder from '@/lang/frame/service/orderManage/order_zh'
import enOrder from '@/lang/frame/service/orderManage/order_en'

// 报名设置
import zhApply from '@/lang/frame/service/applySetting/apply_zh'
import enApply from '@/lang/frame/service/applySetting/apply_en'

// 分活动管理
import zhSub from '@/lang/frame/service/subActivities/sub_zh'
import enSub from '@/lang/frame/service/subActivities/sub_en'

// 微站管理
import zhMaterial from '@/lang/frame/service/CMS/material_zh'
import enMaterial from '@/lang/frame/service/CMS/material_en'

// 参会人管理
import zhAttendee from '@/lang/frame/service/Attendee/Attendee_zh'
import enAttendee from '@/lang/frame/service/Attendee/Attendee_en'

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
    ...enOrder,
    ...enApply,
    ...enSub,
    ...enMaterial,
    ...enAttendee
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
    ...zhOrder,
    ...zhApply,
    ...zhSub,
    ...zhMaterial,
    ...zhAttendee
  }
}

export default messages
