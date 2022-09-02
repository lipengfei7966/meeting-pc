import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/frame/layout/Layout'

/**
 *
 * 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
hidden: true (默认 false)

当设置 noredirect 的时候该路由在面包屑导航中不可被点击
redirect: noredirect

当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
若你想不管路由下面的 children 声明的个数都显示你的根路由
你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
alwaysShow: true

name:'router-name'            设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
meta : {
  title: 'title'              设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name'            设置该路由的图标
  noAuth: true                如果设置为true ,则不会进行权限check(默认 false，也就是要进行权限检测)
  noCache: true               如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
}
 */
export const routeExample = [{
  path: '/example',
  name: 'example',
  component: Layout,
  meta: {
    title: 'example'
  },
  children: [
    {
      name: 'indexDemo',
      path: 'indexDemo',
      component: () => import('@/views/example/indexDemo/index'),
      meta: {
        title: 'indexDemo',
        noCache: true
      }
    },
    {
      name: 'tableTabsDemo',
      path: 'tableTabsDemo',
      component: () => import('@/views/example/tableTabsDemo/index'),
      meta: {
        title: 'tableTabsDemo',
        noCache: true
      }
    },
    {
      name: 'editTagDemo',
      path: 'editTagDemo',
      component: () => import('@/views/example/indexDemo/editForm'),
      meta: {
        title: 'editTagDemo',
        noCache: true,
        multiple: false
      },
      hidden: true
    },
    {
      name: 'dialogDemo',
      path: 'dialogDemo',
      component: () => import('@/views/example/dialogDemo/index'),
      meta: {
        title: 'dialogDemo'
      }
    },
    {
      name: 'treeSearchDemo',
      path: 'treeSearchDemo',
      component: () => import('@/views/example/treeSearchDemo/index'),
      meta: {
        title: 'treeSearchDemo'
      }
    },
    {
      name: 'spanTableDemo',
      path: 'spanTableDemo',
      component: () => import('@/views/example/spanTableDemo/index'),
      meta: {
        title: 'spanTableDemo'
      }
    },
    {
      name: 'spanTableThDemo',
      path: 'spanTableThDemo',
      component: () => import('@/views/example/spanTableThDemo/index'),
      meta: {
        title: 'spanTableThDemo'
      }
    },
    {
      name: 'editSpanTableDemo',
      path: 'editSpanTableDemo',
      component: () => import('@/views/example/editSpanTableDemo'),
      meta: {
        title: 'editSpanTableDemo'
      }
    },
    {
      name: 'timeLineDemo',
      path: 'timeLineDemo',
      component: () => import('@/views/example/timeLineDemo'),
      meta: {
        title: 'timeLineDemo'
      }
    }
    // {
    //   name: 'generateEchart',
    //   path: 'generate/echart',
    //   component: () =>
    // import('@/views/frame/sys/generate/echart/index'),
    //   meta: {
    //     title: '图表生成',
    //     icon: 'svg-name'
    //   }
    // }, {
    //   name: 'generateReport',
    //   path: 'generate/report',
    //   component: () =>
    // import('@/views/frame/sys/generate/report/index'),
    //   meta: {
    //     title: '报表生成',
    //     icon: 'svg-name'
    //   }
    // },
    // {
    //   name: 'generateEchartReport',
    //   path: 'generate/echartReport',
    //   component: () =>
    // import('@/views/frame/sys/generate/echartReport/index'),
    //   meta: {
    //     title: '图报表生成',
    //     icon: 'svg-name'
    //   }
    // },

  ]
}]

export const eventRoute = [
  {
    path: '/event',
    name: 'event',
    component: Layout,
    meta: {
      title: 'event'
    },
    children: [
      {
        name: 'createEvent',
        path: 'createEvent',
        component: () => import('@/views/event/createEvent/index'),
        meta: {
          title: 'createEvent',
          noCache: true
        }
      },
      {
        name: 'eventList',
        path: 'eventList',
        component: () => import('@/views/event/eventList/index'),
        meta: {
          title: 'eventList',
          noCache: true
        }
      },
      {
        name: 'eventDetail',
        path: 'eventDetail',
        component: () => import('@/views/event/eventList/eventDetail'),
        meta: {
          title: 'eventDetail',
          noCache: true
        }
      },
      {
        name: 'advancedsetting',
        path: 'advancedsetting',
        component: () => import('@/views/event/eventList/components/AdvancedSetting'),
        meta: {
          title: 'advancedsetting',
          noCache: true
        }
      },
      {
        name: 'EventDemand',
        path: 'EventDemand',
        component: () => import('@/views/event/EventDemand/index'),
        meta: {
          title: 'EventDemand',
          noCache: true
        }
      },
      // 线下报价
      {
        name: 'belowQuotation',
        path: 'belowQuotation',
        component: () => import('@/views/event/belowQuotation/index'),
        meta: {
          title: 'belowQuotation',
          noCache: true
        }
      },

      // 询价单详情
      {
        name: 'servicedetails',
        path: 'servicedetails',
        component: () => import('@/views/event/servicedetails/index'),
        meta: {
          title: 'servicedetails',
          noCache: true
        }
      },
      // 比价页详情
      {
        name: 'comparisonPrice',
        path: 'comparisonPrice',
        component: () => import('@/views/event/comparisonPrice/index'),
        meta: {
          title: 'comparisonPrice',
          noCache: true
        }
      },
      // 查看报价
      {
        name: 'offer',
        path: 'offer',
        component: () => import('@/views/event/offer/index'),
        meta: {
          title: 'offer',
          noCache: true
        }
      },
      // 查看汇总报价
      {
        name: 'collectOffer',
        path: 'collectOffer',
        component: () => import('@/views/event/offer/collectOffer'),
        meta: {
          title: 'collectOffer',
          noCache: true
        }
      },
      // 查看订单
      {
        name: 'provider',
        path: 'provider',
        component: () => import('@/views/event/provider/index'),
        meta: {
          title: 'provider',
          noCache: true
        }
      },
      // 查看结算单
      {
        name: 'msd',
        path: 'msd',
        component: () => import('@/views/event/msd/index'),
        meta: {
          title: 'msd',
          noCache: true
        }
      },
      {
        name: 'approveOrderManage',
        path: 'approveOrderManage',
        component: () => import('@/views/event/approveOrderManage/index'),
        meta: {
          title: 'approveOrderManage',
          noCache: true
        }
      },
      {
        name: 'parameter',
        path: 'parameter',
        component: () => import('@/views/event/parameter/index'),
        meta: {
          title: 'parameter',
          noCache: true
        }
      },
      {
        name: 'approve',
        path: 'approve',
        component: () => import('@/views/event/approve/index'),
        meta: {
          title: 'approve',
          noCache: true
        }
      },
      // 中标审批详情
      {
        name: 'biddingDetail',
        path: 'biddingDetail',
        component: () => import('@/views/event/approve/biddingDetail'),
        meta: {
          title: 'biddingDetail',
          noCache: true
        }
      },
      // 中标审批完成详情
      {
        name: 'biddedDetail',
        path: 'biddedDetail',
        component: () => import('@/views/event/approve/biddedDetail'),
        meta: {
          title: 'biddedDetail',
          noCache: true
        }
      },
      {
        name: 'reporting',
        path: 'reporting',
        component: () => import('@/views/event/reporting/index'),
        meta: {
          title: 'reporting',
          noCache: true
        }
      },
      
    ]
  },

  {
    path: '/DMCevent',
    name: 'DMCevent',
    component: Layout,
    meta: {
      title: 'DMCevent'
    },
    children:[
      {
        name: 'DMCcreateEvent',
        path: 'DMCcreateEvent',
        component: () => import('@/views/event/DMCcreateEvent/index'),
        meta: {
          title: 'DMCcreateEvent',
          noCache: true
        }
      },
      {
        name: 'DMCEventList',
        path: 'DMCEventList',
        component: () => import('@/views/event/DMCEventList/index'),
        meta: {
          title: 'DMCEventList',
          noCache: true
        }
      },
      {
        name: 'DMCEventDetail',
        path: 'DMCEventDetail',
        component: () => import('@/views/event/DMCEventList/DMCEventDetail'),
        meta: {
          title: 'DMCEventDetail',
          noCache: true
        }
      },
      {
        name: 'DMCEventDemand',
        path: 'DMCEventDemand',
        component: () => import('@/views/event/DMCEventDemand/index'),
        meta: {
          title: 'DMCEventDemand',
          noCache: true
        }
      },
      {
        name: 'DMCinquiryList',
        path: 'DMCinquiryList',
        component: () => import('@/views/event/DMCinquiry/inquiryList/index'),
        meta: {
          title: 'DMCinquiryList',
          noCache: true
        }
      },
      {
        name: 'DMCinquiryInfo',
        path: 'DMCinquiryInfo/:id',
        component: () => import('@/views/event/DMCinquiry/inquiryList/inquiryInfo'),
        meta: {
          title: 'DMCinquiryInfo',
          noCache: true
        }
      },
      {
        name: 'DMCquotedprice',
        path: 'DMCquotedprice/:id/:isSubmit',
        component: () => import('@/views/event/DMCquotedprice/index'),
        meta: {
          title: 'DMCquotedprice',
          noCache: true
        }
      },
      {
        name: 'DMCbasicInfoManage',
        path: 'DMCbasicInfoManage',
        component: () => import('@/views/event/DMCbasicInfoManage/index'),
        meta: {
          title: 'DMCbasicInfoManage',
          noCache: true
        }
      },
      {
        name: 'DMCorderList',
        path: 'DMCorderList',
        component: () => import('@/views/event/DMCorder/orderList/index'),
        meta: {
          title: 'DMCorderList',
          noCache: true
        }
      },
      {
        name: 'orderInfo',
        path: 'orderInfo/:id',
        component: () => import('@/views/event/DMCorder/orderList/orderInfo'),
        meta: {
          title: 'orderInfo',
          noCache: true
        }
      },
      {
        name: 'settleAccounts',
        path: 'settleAccounts/:id/:issubmit',
        component: () => import('@/views/event/settleAccounts/index'),
        meta: {
          title: 'settleAccounts',
          noCache: true
        }
      },
      {
        name: 'settleAccounts_Hotel',
        path: 'settleAccounts_Hotel/:id/:issubmit',
        component: () => import('@/views/event/settleAccounts/settleAccounts_Hotel'),
        meta: {
          title: 'settleAccounts_Hotel',
          noCache: true
        }
      },
      {
        name: 'offlineSettlement',
        path: 'offlineSettlement/:id/:issubmit',
        component: () => import('@/views/event/settleAccounts/offlineSettlement'),
        meta: {
          title: 'offlineSettlement',
          noCache: true
        }
      },
      {
        name: 'DMCmemberManage',
        path: 'DMCmemberManage',
        component: () => import('@/views/event/DMCorder/orderList/index'),
        meta: {
          title: 'DMCmemberManage',
          noCache: true
        }
      },
      {
        name: 'DMCitineraryList',
        path: 'DMCitineraryList',
        component: () => import('@/views/event/DMCitineraryList/itineraryList/index'),
        meta: {
          title: 'DMCitineraryList',
          noCache: true
        }
      },
    ]
  },

  {
    path: '/setting',
    name: 'setting',
    component: Layout,
    meta: {
      title: 'setting'
    },
    children: [
      {
        name: 'clientMemberManage',
        path: 'clientMemberManage',
        component: () => import('@/views/event/setting/clientMemberManage/index'),
        meta: {
          title: 'clientMemberManage',
          noCache: true
        }
      },
      {
        name: 'approveSetting',
        path: 'approveSetting',
        component: () => import('@/views/event/setting/approveSetting/index'),
        meta: {
          title: 'approveSetting',
          noCache: true
        }
      },
      // 中标审批流配置
      {
        name: 'outbid',
        path: 'outbid',
        component: () => import('@/views/event/setting/approveSetting/outbid'),
        meta: {
          title: 'outbid',
          noCache: true
        }
      },
      // 结算审批流配置
      {
        name: 'settlementSheet',
        path: 'settlementSheet',
        component: () => import('@/views/event/setting/approveSetting/settlementSheet'),
        meta: {
          title: 'settlementSheet',
          noCache: true
        }
      },
      // 新增编辑结算审批规则
      {
        name: 'addeditApprovalrule',
        path: 'addeditApprovalrule',
        component: () => import('@/views/event/setting/approveSetting/addeditApprovalrule'),
        meta: {
          title: 'addeditApprovalrule',
          noCache: true
        }
      },
      // 添加审批步骤
      {
        name: 'approvalsteps',
        path: 'approvalsteps',
        component: () => import('@/views/event/setting/approveSetting/approvalsteps'),
        meta: {
          title: 'approvalsteps',
          noCache: true
        }
      },
      {
        name: 'otherSetting',
        path: 'otherSetting/:activeName',
        component: () => import('@/views/event/setting/otherSetting/index'),
        meta: {
          title: 'otherSetting',
          noCache: true
        }
      },
      // 报价结算规则配置
      {
        name: 'quotationSettlementEditor',
        path: 'quotationSettlementEditor/:company_name/:id/:type/:addOrEdit',
        component: () => import('@/views/event/setting/otherSetting/quotationSettlementEditor'),
        meta: {
          title: 'quotationSettlementEditor',
          noCache: true
        }
      },
      // 附加信息配置
      {
        name: 'otherMessageSeetingEditor',
        path: 'otherMessageSeetingEditor',
        component: () => import('@/views/event/setting/otherSetting/otherMessageSeetingEditor'),
        meta: {
          title: 'otherMessageSeetingEditor',
          noCache: true
        }
      },
      // 数据权限配置--新增组
      {
        name: 'addeditUsergroup',
        path: 'addeditUsergroup',
        component: () => import('@/views/event/setting/otherSetting/addeditUsergroup'),
        meta: {
          title: 'addeditUsergroup',
          noCache: true
        }
      },
      // 数据权限配置--组员管理
      {
        name: 'membermanage',
        path: 'membermanage',
        component: () => import('@/views/event/setting/otherSetting/membermanage'),
        meta: {
          title: 'membermanage',
          noCache: true
        }
      },
      // 数据权限配置--客户权限管理
      {
        name: 'customermanage',
        path: 'customermanage',
        component: () => import('@/views/event/setting/otherSetting/customermanage'),
        meta: {
          title: 'customermanage',
          noCache: true
        }
      },
      // 数据权限配置--客户权限管理
      {
        name: 'reportmanage',
        path: 'reportmanage',
        component: () => import('@/views/event/setting/otherSetting/reportmanage'),
        meta: {
          title: 'reportmanage',
          noCache: true
        }
      },
      {
        name: 'relatedPersonSetting',
        path: 'relatedPersonSetting',
        component: () => import('@/views/event/setting/relatedPersonSetting/index'),
        meta: {
          title: 'relatedPersonSetting',
          noCache: true
        }
      },
      // 会议助理-新增、编辑
      {
        name: 'assistantAdd',
        path: 'assistantAdd',
        component: () => import('@/views/event/setting/relatedPersonSetting/assistant/assistantAdd'),
        meta: {
          title: 'assistantAdd',
          noCache: true
        }
      },
      // 会议合规人-新增、编辑
      {
        name: 'complianceAdd',
        path: 'complianceAdd',
        component: () => import('@/views/event/setting/relatedPersonSetting/compliance/complianceAdd'),
        meta: {
          title: 'complianceAdd',
          noCache: true
        }
      },
      // 会议负责人-新增、编辑
      {
        name: 'addPrincipal',
        path: 'addPrincipal',
        component: () => import('@/views/event/setting/relatedPersonSetting/header/addPrincipal'),
        meta: {
          title: 'addPrincipal',
          noCache: true
        }
      },
      // 会议采购人-新增、编辑
      {
        name: 'procurementAdd',
        path: 'procurementAdd',
        component: () => import('@/views/event/setting/relatedPersonSetting/procurement/procurementAdd'),
        meta: {
          title: 'procurementAdd',
          noCache: true
        }
      },
    ]
  },

  {
    path: '/resourceCenter',
    name: 'resourceCenter',
    component: Layout,
    meta: {
      title: 'resourceCenter'
    },
    children: [
      {
        name: 'siteResource',
        path: '/siteResource/:id?/:city?/:type?',
        component: () => import('@/views/event/resourceCenter/siteResource/index'),
        meta: {
          title: 'siteResource',
          noCache: true
        }
      },
      {
        name: 'HotelProcurement',
        path: '/HotelProcurement/:id?/:type?',
        component: () => import('@/views/event/resourceCenter/siteResource/HotelProcurement'),
        meta: {
          title: 'HotelProcurement',
          noCache: true
        }
      },
      {
        name: 'hotelSendSuccess',
        path: '/hotelSendSuccess/:id?',
        component: () => import('@/views/event/resourceCenter/siteResource/SendSuccess'),
        meta: {
          title: 'hotelSendSuccess',
          noCache: true
        }
      },
      {
        name: 'ServiceProvider',
        path: '/ServiceProvider/:id?/:city?/:type?',
        component: () => import('@/views/event/ServiceProvider/index'),
        meta: {
          title: 'ServiceProvider',
          noCache: true
        }
      },
      {
        name: 'hotelInfo',
        path: 'hotelInfo/:id',
        component: () => import('@/views/event/resourceCenter/siteResource/info.vue'),
        meta: {
          title: 'hotelInfo',
          noCache: true
        }
      },
      {
        name: 'ServiceProviderProcurement',
        path: '/ServiceProviderProcurement/:id/:type',
        component: () => import('@/views/event/ServiceProvider/ServiceProviderProcurement.vue'),
        meta: {
          title: 'ServiceProviderProcurement',
          noCache: true
        }
      },
      {
        name: 'SendSuccess',
        path: '/SendSuccess/:id?',
        component: () => import('@/views/event/ServiceProvider/SendSuccess.vue'),
        meta: {
          title: 'SendSuccess',
          noCache: true
        }
      },
    ]
  }
]

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/frame/login/index'),
    hidden: true
  },
  {
    path: '/group/login',
    name: 'grouplogin',
    component: () => import('@/views/frame/login/group/index'),
    hidden: true
  },
  {
    path: '/user/login',
    name: 'templogin',
    component: () => import('@/views/frame/login/user/index'),
    hidden: true
  },
  {
    path: '/platform/login',
    name: 'platformlogin',
    component: () => import('@/views/frame/login/platform/index'),
    hidden: true
  },
  {
    path: '/:tenantCode/login',
    component: () => import('@/views/frame/login/user/index'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/frame/base/error/404'),
    hidden: true
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/frame/base/error/401'),
    hidden: true
  },
  {
    name: 'reportFormwork',
    path: '/preview/report/:id',
    component: () =>
      import('@/views/frame/sys/generate/formwork/report'),
    meta: {
      title: '报表一览',
      includeFlag: true,
      icon: 'svg-name'
    },
    hidden: true
  }, {
    name: 'echartFormwork',
    path: '/preview/echart/:id',
    component: () =>
      import('@/views/frame/sys/generate/formwork/echart'),
    meta: {
      title: '图表一览',
      includeFlag: true,
      icon: 'svg-name'
    },
    hidden: true
  },
  // {
  //   name: 'echartReportFormwork',
  //   path: '/preview/echartReport/:id',
  //   component: () =>
  //     import('@/views/frame/sys/generate/formwork/echartReport'),
  //   meta: {
  //     title: '图报表一览',
  //     includeFlag: true,
  //     icon: 'svg-name'
  //   },
  //   hidden: true
  // },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    hidden: true,
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('@/views/frame/dashboard/index'),
        meta: {
          title: 'dashboard',
          icon: 'table',
          noCache: true
        }
      },
      {
        name: 'noticeRoute',
        path: '/sys/notice/route',
        component: () => import('@/views/frame/base/sys/notice/noticeRoute'),
        meta: {
          title: 'noticeRoute'
        }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/generatorMenu',
        name: 'generatorMenu',
        component: () => import('@/views/frame/base/generator/form/preview/menu.vue'),
        meta: {
          title: '查询页生成一览'
        }
      },
      {
        path: '/generatorSubmenu',
        name: 'generatorSubmenu',
        component: () => import('@/views/frame/base/generator/form/preview/submenu.vue'),
        meta: {
          title: '编辑页生成一览'
        }
      }
    ]
  }
]
export const routeIframe = {
  path: '/iframe',
  component: Layout,
  name: 'iframeTemp',
  meta: {
    title: 'iframeTemp'
  },
  children: [
    {
      path: 'bpm/pic/:hash',
      name: 'iframeDiagram',
      meta: {
        title: 'iframeBpmDiagram',
        icon: '',
        src: ''
      }
    },
    {
      path: 'bpm/view/:hash',
      name: 'iframeViewModel',
      meta: {
        title: 'iframeBpmPreview',
        icon: '',
        src: ''
      }
    },
    {
      path: 'bpm/edit/:hash',
      name: 'iframeEditModel',
      meta: {
        title: 'iframeBpmEdit',
        icon: '',
        src: ''
      }
    }
  ]
}

const createRouter = () => new Router({
  // mode: 'history', // require service support
  routes: constantRouterMap,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 100,
      y: 100
    }
  }
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
  // router.options.routes = []
}

export default router
