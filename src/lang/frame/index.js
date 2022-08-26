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

// todo
import enSource from '@/lang/frame/base/modules/dataSource_en'
import zhSource from '@/lang/frame/base/modules/dataSource_zh'
// sys
import enSys from '@/lang/frame/base/modules/sys_en'
import zhSys from '@/lang/frame/base/modules/sys_zh'

// 业务流程
import enBusinessBpm from '@/lang/frame/bpm/businessBpm_en.js'
import zhBusinessBpm from '@/lang/frame/bpm/businessBpm_zh.js'
// 个人办公
import enOffice from '@/lang/frame/bpm/office_en.js'
import zhOffice from '@/lang/frame/bpm/office_zh.js'
// 平台
import enPlatform from '@/lang/frame/base/modules/platform_en.js'
import zhPlatform from '@/lang/frame/base/modules/platform_zh.js'
// 功能中心
import enFunc from '@/lang/frame/base/modules/func_en'
import zhFunc from '@/lang/frame/base/modules/func_zh'

// 会议系统
import enEvent from '@/lang/frame/base/modules/event_en'
import zhEvent from '@/lang/frame/base/modules/event_zh'

const messages = {
  en: {
    ...enBase,
    ...enSource,
    ...enMsg,
    ...enFile,
    ...enSys,
    ...enData,
    ...enDashboard,
    ...enPlatform,
    ...enFunc,
    ...enBusinessBpm,
    ...enOffice,
    ...enEvent
  },
  zh: {
    ...zhBase,
    ...zhSource,
    ...zhMsg,
    ...zhFile,
    ...zhSys,
    ...zhData,
    ...zhDashboard,
    ...zhPlatform,
    ...zhFunc,
    ...zhBusinessBpm,
    ...zhOffice,
    ...enEvent
  }
}

export default messages
