export const eventRoute = [

  {
    name: 'createEvent',
    path: '/event/createEvent',
    component: () => import('@/views/event/createEvent/index'),
    meta: {
      title: 'createEvent',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'eventList',
    path: '/event/eventList',
    component: () => import('@/views/event/eventList/index'),
    meta: {
      title: 'eventList',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'eventDetail',
    path: '/event/eventDetail',
    component: () => import('@/views/event/eventList/eventDetail'),
    meta: {
      title: 'eventDetail',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'advancedsetting',
    path: '/event/advancedsetting',
    component: () => import('@/views/event/eventList/components/AdvancedSetting'),
    meta: {
      title: 'advancedsetting',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'EventDemand',
    path: '/event/EventDemand',
    component: () => import('@/views/event/EventDemand/index'),
    meta: {
      title: 'EventDemand',
      noCache: true,
      cmms: true
    }
  },
  // 线下报价
  {
    name: 'belowQuotation',
    path: '/event/belowQuotation',
    component: () => import('@/views/event/belowQuotation/index'),
    meta: {
      title: 'belowQuotation',
      noCache: true,
      cmms: true
    }
  },

  // 询价单详情
  {
    name: 'servicedetails',
    path: '/event/servicedetails',
    component: () => import('@/views/event/servicedetails/index'),
    meta: {
      title: 'servicedetails',
      noCache: true,
      cmms: true
    }
  },
  // 比价页详情
  {
    name: 'comparisonPrice',
    path: '/event/comparisonPrice',
    component: () => import('@/views/event/comparisonPrice/index'),
    meta: {
      title: 'comparisonPrice',
      noCache: true,
      cmms: true
    }
  },
  // 查看报价
  {
    name: 'offer',
    path: '/event/offer',
    component: () => import('@/views/event/offer/index'),
    meta: {
      title: 'offer',
      noCache: true,
      cmms: true
    }
  },
  // 查看汇总报价
  {
    name: 'collectOffer',
    path: '/event/collectOffer',
    component: () => import('@/views/event/offer/collectOffer'),
    meta: {
      title: 'collectOffer',
      noCache: true,
      cmms: true
    }
  },
  // 查看订单
  {
    name: 'provider',
    path: '/event/provider',
    component: () => import('@/views/event/provider/index'),
    meta: {
      title: 'provider',
      noCache: true,
      cmms: true
    }
  },
  // 查看结算单
  {
    name: 'msd',
    path: '/event/msd',
    component: () => import('@/views/event/msd/index'),
    meta: {
      title: 'msd',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'approveOrderManage',
    path: '/event/approveOrderManage',
    component: () => import('@/views/event/approveOrderManage/index'),
    meta: {
      title: 'approveOrderManage',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'parameter',
    path: '/event/parameter',
    component: () => import('@/views/event/parameter/index'),
    meta: {
      title: 'parameter',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'approve',
    path: '/event/approve',
    component: () => import('@/views/event/approve/index'),
    meta: {
      title: 'approve',
      noCache: true,
      cmms: true
    }
  },
  // 中标审批详情
  {
    name: 'biddingDetail',
    path: '/event/biddingDetail',
    component: () => import('@/views/event/approve/biddingDetail'),
    meta: {
      title: 'biddingDetail',
      noCache: true,
      cmms: true
    }
  },
  // 中标审批完成详情
  {
    name: 'biddedDetail',
    path: '/event/biddedDetail',
    component: () => import('@/views/event/approve/biddedDetail'),
    meta: {
      title: 'biddedDetail',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'reporting',
    path: '/event/reporting',
    component: () => import('@/views/event/reporting/index'),
    meta: {
      title: 'reporting',
      noCache: true,
      cmms: true
    }

  },

  {
    name: 'DMCcreateEvent',
    path: '/DMCevent/DMCcreateEvent',
    component: () => import('@/views/event/DMCcreateEvent/index'),
    meta: {
      title: 'DMCcreateEvent',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'DMCEventList',
    path: '/DMCevent/DMCEventList',
    component: () => import('@/views/event/DMCEventList/index'),
    meta: {
      title: 'DMCEventList',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'DMCEventDetail',
    path: '/DMCevent/DMCEventDetail',
    component: () => import('@/views/event/DMCEventList/DMCEventDetail'),
    meta: {
      title: 'DMCEventDetail',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'DMCEventDemand',
    path: '/DMCevent/DMCEventDemand',
    component: () => import('@/views/event/DMCEventDemand/index'),
    meta: {
      title: 'DMCEventDemand',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'DMCinquiryList',
    path: '/DMCevent/DMCinquiryList',
    component: () => import('@/views/event/DMCinquiry/inquiryList/index'),
    meta: {
      title: 'DMCinquiryList',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'DMCinquiryInfo',
    path: '/DMCevent/DMCinquiryInfo/:id',
    component: () => import('@/views/event/DMCinquiry/inquiryList/inquiryInfo'),
    meta: {
      title: 'DMCinquiryInfo',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'DMCquotedprice',
    path: '/DMCevent/DMCquotedprice/:id/:isSubmit',
    component: () => import('@/views/event/DMCquotedprice/index'),
    meta: {
      title: 'DMCquotedprice',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'DMCbasicInfoManage',
    path: '/DMCevent/DMCbasicInfoManage',
    component: () => import('@/views/event/DMCbasicInfoManage/index'),
    meta: {
      title: 'DMCbasicInfoManage',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'DMCorderList',
    path: '/DMCevent/DMCorderList',
    component: () => import('@/views/event/DMCorder/orderList/index'),
    meta: {
      title: 'DMCorderList',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'orderInfo',
    path: '/DMCevent/orderInfo/:id',
    component: () => import('@/views/event/DMCorder/orderList/orderInfo'),
    meta: {
      title: 'orderInfo',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'settleAccounts',
    path: '/DMCevent/settleAccounts/:id/:issubmit',
    component: () => import('@/views/event/settleAccounts/index'),
    meta: {
      title: 'settleAccounts',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'settleAccounts_Hotel',
    path: '/DMCevent/settleAccounts_Hotel/:id/:issubmit',
    component: () => import('@/views/event/settleAccounts/settleAccounts_Hotel'),
    meta: {
      title: 'settleAccounts_Hotel',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'offlineSettlement',
    path: '/DMCevent/offlineSettlement/:id/:issubmit',
    component: () => import('@/views/event/settleAccounts/offlineSettlement'),
    meta: {
      title: 'offlineSettlement',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'DMCmemberManage',
    path: '/DMCevent/DMCmemberManage',
    component: () => import('@/views/event/DMCorder/orderList/index'),
    meta: {
      title: 'DMCmemberManage',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'DMCitineraryList',
    path: '/DMCevent/DMCitineraryList',
    component: () => import('@/views/event/DMCItineraryList/itineraryList/index'),
    meta: {
      title: 'DMCitineraryList',
      noCache: true,
      cmms: true
    }

  },

  {
    name: 'clientMemberManage',
    path: '/systemSetting/clientMemberManage',
    component: () => import('@/views/event/setting/clientMemberManage/index'),
    meta: {
      title: 'clientMemberManage',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'approveSetting',
    path: '/systemSetting/approveSetting',
    component: () => import('@/views/event/setting/approveSetting/index'),
    meta: {
      title: 'approveSetting',
      noCache: true,
      cmms: true
    }
  },
  // 中标审批流配置
  {
    name: 'outbid',
    path: '/systemSetting/outbid',
    component: () => import('@/views/event/setting/approveSetting/outbid'),
    meta: {
      title: 'outbid',
      noCache: true,
      cmms: true
    }
  },
  // 结算审批流配置
  {
    name: 'settlementSheet',
    path: '/systemSetting/settlementSheet',
    component: () => import('@/views/event/setting/approveSetting/settlementSheet'),
    meta: {
      title: 'settlementSheet',
      noCache: true,
      cmms: true
    }
  },
  // 新增编辑结算审批规则
  {
    name: 'addeditApprovalrule',
    path: '/systemSetting/addeditApprovalrule',
    component: () => import('@/views/event/setting/approveSetting/addeditApprovalrule'),
    meta: {
      title: 'addeditApprovalrule',
      noCache: true,
      cmms: true
    }
  },
  // 添加审批步骤
  {
    name: 'approvalsteps',
    path: '/systemSetting/approvalsteps',
    component: () => import('@/views/event/setting/approveSetting/approvalsteps'),
    meta: {
      title: 'approvalsteps',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'otherSetting',
    path: '/systemSetting/otherSetting/:activeName',
    component: () => import('@/views/event/setting/otherSetting/index'),
    meta: {
      title: 'otherSetting',
      noCache: true,
      cmms: true
    }
  },
  // 报价结算规则配置
  {
    name: 'quotationSettlementEditor',
    path: '/systemSetting/quotationSettlementEditor/:company_name/:id/:type/:addOrEdit',
    component: () => import('@/views/event/setting/otherSetting/quotationSettlementEditor'),
    meta: {
      title: 'quotationSettlementEditor',
      noCache: true,
      cmms: true
    }
  },
  // 附加信息配置
  {
    name: 'otherMessageSeetingEditor',
    path: '/systemSetting/otherMessageSeetingEditor',
    component: () => import('@/views/event/setting/otherSetting/otherMessageSeetingEditor'),
    meta: {
      title: 'otherMessageSeetingEditor',
      noCache: true,
      cmms: true
    }
  },
  // 数据权限配置--新增组
  {
    name: 'addeditUsergroup',
    path: '/systemSetting/addeditUsergroup',
    component: () => import('@/views/event/setting/otherSetting/addeditUsergroup'),
    meta: {
      title: 'addeditUsergroup',
      noCache: true,
      cmms: true
    }
  },
  // 数据权限配置--组员管理
  {
    name: 'membermanage',
    path: '/systemSetting/membermanage',
    component: () => import('@/views/event/setting/otherSetting/membermanage'),
    meta: {
      title: 'membermanage',
      noCache: true,
      cmms: true
    }
  },
  // 数据权限配置--客户权限管理
  {
    name: 'customermanage',
    path: '/systemSetting/customermanage',
    component: () => import('@/views/event/setting/otherSetting/customermanage'),
    meta: {
      title: 'customermanage',
      noCache: true,
      cmms: true
    }
  },
  // 数据权限配置--客户权限管理
  {
    name: 'reportmanage',
    path: '/systemSetting/reportmanage',
    component: () => import('@/views/event/setting/otherSetting/reportmanage'),
    meta: {
      title: 'reportmanage',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'relatedPersonSetting',
    path: '/systemSetting/relatedPersonSetting',
    component: () => import('@/views/event/setting/relatedPersonSetting/index'),
    meta: {
      title: 'relatedPersonSetting',
      noCache: true,
      cmms: true
    }
  },
  // 会议助理-新增、编辑
  {
    name: 'assistantAdd',
    path: '/systemSetting/assistantAdd',
    component: () => import('@/views/event/setting/relatedPersonSetting/assistant/assistantAdd'),
    meta: {
      title: 'assistantAdd',
      noCache: true,
      cmms: true
    }
  },
  // 会议合规人-新增、编辑
  {
    name: 'complianceAdd',
    path: '/systemSetting/complianceAdd',
    component: () => import('@/views/event/setting/relatedPersonSetting/compliance/complianceAdd'),
    meta: {
      title: 'complianceAdd',
      noCache: true,
      cmms: true
    }
  },
  // 会议负责人-新增、编辑
  {
    name: 'addPrincipal',
    path: '/systemSetting/addPrincipal',
    component: () => import('@/views/event/setting/relatedPersonSetting/header/addPrincipal'),
    meta: {
      title: 'addPrincipal',
      noCache: true,
      cmms: true
    }
  },
  // 会议采购人-新增、编辑
  {
    name: 'procurementAdd',
    path: '/systemSetting/procurementAdd',
    component: () => import('@/views/event/setting/relatedPersonSetting/procurement/procurementAdd'),
    meta: {
      title: 'procurementAdd',
      noCache: true,
      cmms: true
    }

  },

  {
    name: 'siteResource',
    path: '/siteResource/:id?/:city?/:type?',
    component: () => import('@/views/event/resourceCenter/siteResource/index'),
    meta: {
      title: 'siteResource',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'HotelProcurement',
    path: '/siteResource/HotelProcurement/:id?/:type?',
    component: () => import('@/views/event/resourceCenter/siteResource/HotelProcurement'),
    meta: {
      title: 'HotelProcurement',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'hotelSendSuccess',
    path: '/siteResource/hotelSendSuccess/:id?',
    component: () => import('@/views/event/resourceCenter/siteResource/SendSuccess'),
    meta: {
      title: 'hotelSendSuccess',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'ServiceProvider',
    path: '/siteResource/ServiceProvider/:id?/:city?/:type?',
    component: () => import('@/views/event/ServiceProvider/index'),
    meta: {
      title: 'ServiceProvider',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'hotelInfo',
    path: '/siteResource/hotelInfo/:id',
    component: () => import('@/views/event/resourceCenter/siteResource/info.vue'),
    meta: {
      title: 'hotelInfo',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'ServiceProviderProcurement',
    path: '/siteResource/ServiceProviderProcurement/:id/:type',
    component: () => import('@/views/event/ServiceProvider/ServiceProviderProcurement.vue'),
    meta: {
      title: 'ServiceProviderProcurement',
      noCache: true,
      cmms: true
    }
  },
  {
    name: 'SendSuccess',
    path: '/siteResource/SendSuccess/:id?',
    component: () => import('@/views/event/ServiceProvider/SendSuccess.vue'),
    meta: {
      title: 'SendSuccess',
      noCache: true,
      cmms: true
    }
  }

]

