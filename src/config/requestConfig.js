export default {
  // 上传
  upload: '/file/upload',
  // 服务项目管理
  serviceitemslist: '/serviceprovider/serviceitemslist', // 列表
  serviceitemssave: '/serviceprovider/serviceitemssave', // 新增/修改
  serviceitemsdelete: '/serviceprovider/serviceitemsdelete', // 删除
  serviceitemsonline: '/serviceprovider/serviceitemsonline', // 上架
  serviceitemsoffline: '/serviceprovider/serviceitemsoffline', // 下架
  serviceproviderInfo: '/serviceprovider/info', // 数据加载
  serviceproviderSave: '/serviceprovider/save', // 保存提交
  caselist: '/serviceprovider/caselist', // 案例列表
  casesave: '/serviceprovider/casesave', // 案例保存
  caseactivation: '/serviceprovider/caseactivation', // 案例激活
  casefrozen: '/serviceprovider/casefrozen', // 案例冻结
  casedelete: '/serviceprovider/casedelete', // 案例删除
  qualificationlist: '/serviceprovider/qualificationlist', // 资质列表
  qualificationsave: '/serviceprovider/qualificationsave', // 保存资质
  qualificationactivation: '/serviceprovider/qualificationactivation', // 资质激活
  qualificationfrozen: '/serviceprovider/qualificationfrozen', // 资质冻结
  qualificationdelete: '/serviceprovider/qualificationdelete', // 资质删除
  qualificationnamelist: '/serviceprovider/qualificationnamelist', // 资质名称列表
  // 活动询价单
  inquirysheetList: '/inquirysheet/list', // 列表
  inquirysheetInfo: '/inquirysheet/info', // 详情
  AnewQuotation: '/inquirysheet/AnewQuotation', // 更新报价（类似重新报价）
  inquirysheetRefusequoted: '/inquirysheet/Refusequoted', // 拒绝报价
  Leavingmessagelist: '/inquirysheet/Leavingmessagelist', // 留言列表
  addLeavingmessage: '/inquirysheet/addLeavingmessage', // 添加留言
  quotationInfo: '/quotation/info', // 报价单详情
  quotationsubmit: '/quotation/submit', // 报价单提交
  quotedexportexcel: '/quotation/exportexcel', // 报价单导出excel
  OfflineQuotedPriceInfo: '/OfflineQuotedPrice/Info', // 线下报价查询接口
  OfflineQuotedPriceSubmit: 'OfflineQuotedPrice/Submit', // 线下报价保存接口
  LadderTaxrateList: 'OfflineQuotedPrice/LadderTaxrateList', // 线下报价单-阶梯税率集合接口
  LadderTaxrate_Submit: 'OfflineQuotedPrice/LadderTaxrate_Submit', // 新增阶梯税率
  LadderTaxrate_Delete: 'OfflineQuotedPrice/LadderTaxrate_Delete', // 删除阶梯税率
  Clear: '/OfflineQuotedPrice/Clear', // 清空线下报价
  // 比价页和客户管理
  getThanPrice: '/MeetingMa/ThanPrice', // 比价页详情
  OfflineThanPrice: '/MeetingMa/OfflineThanPrice', // 线下比价
  // getCompany:'/MeetingMa/GetCompany',//公司查询
  getClient: '/MeetingMa/GetDepartmenty', // 客户查询
  // getCustomerContact:'/MeetingMa/GetCustomerContact',//客户联系人查询
  customerContactSava: '/MeetingMa/CustomerContactSava', // 客户联系人保存
  getCustomerContactEdit: '/MeetingMa/GetCustomerContactEdit', // 客户联系人编辑查询
  customerDelete: '/MeetingMa/CustomerDelete', // 客户联系人删除
  customerImportExcel: '/MeetingMa/CustomerImportExcel', // 客户联系人导入
  departmentyEdit: '/MeetingMa/DepartmentyEdit', // 更改部门
  excelExport: '/ExcelExport/ThanPriceExcelExport', // 导出excel
  SummaryThanPriceExcelExport: '/ExcelExport/SummaryThanPriceExcelExport', // 线下比价导出excel
  // 成员管理
  memberList: '/member/list', // 列表
  memberInfo: '/member/info', // 角色列表
  memberSave: '/member/save', // 角色保存
  memberFrozen: '/member/frozen', // 成员冻结
  memberActivation: '/member/activation', // 成员激活
  memberDelete: '/member/delete', // 成员删除
  // 行程管理
  projectlist: '/scheduling/projectlist', // 项目列表
  projectinfo: '/scheduling/projectinfo', // 查看项目
  projectsave: '/scheduling/projectsave', // 项目保存修改
  cancelproject: '/scheduling/cancelproject', // 取消项目
  schedulingsave: '/scheduling/schedulingsave', // 行程保存
  schedulinglist: '/scheduling/schedulinglist', // 行程列表
  evaluatecustomers: '/scheduling/evaluatecustomers', // 发表评论
  completescheduling: '/scheduling/completescheduling', // 完成行程
  cancelscheduling: '/scheduling/cancelscheduling', // 完成行程
  schedulinginfo: '/scheduling/schedulinginfo', // 行程详情
  // 订单
  orderformList: '/orderform/list', // 列表
  orderInfo: '/orderform/info', // 订单详情
  settlementsheetInfo: '/settlementsheet/info', // 结算单详情
  settlementsheetSave: '/settlementsheet/save', // 结算单保存
  cancelorderform: '/orderform/cancel', // 取消订单
  againform: '/orderform/again', // 再次提醒客户
  offlineSettlement: '/OfflineSettlement/Info', // 线下结算
  OfflineSettlementSubmit: '/OfflineSettlement/Submit', // 线下结算保存
  DMCOnlineInfo: '/OfflineSettlement/DMCOnlineInfo', // DMC线上结算
  DMCOnlineSubmit: '/OfflineSettlement/DMCOnlineSubmit', // DMC线上结算保存
  // 酒店列表
  hotelList: '/hotel/list',
  // 服务商列表
  serviceList: 'quotation/b2b_servicelist',
  city: '/hotel/city', // 城市
  // sitetype: '/hotel/sitetype', //场地类型
  sitetype: '/ResourcesApi/GetDictionaries', // 场地类型
  // brand: '/hotel/brand', //酒店品牌
  brand: '/ResourcesApi/GetBrand', // 酒店品牌
  venuearea: '/hotel/venuearea', // 会场面积
  venuepeoplenumber: '/hotel/venuepeoplenumber', // 会场人数
  roomprice: '/hotel/roomprice', // 团房均价
  hotelInfo: '/hotel/info', // 酒店详情
  getselecthotel: '/procurementprocess/getselecthotel', // 返回已选择酒店
  getselectintentionhotel: '/procurementprocess/getselectintentionhotel', // 返回已选择意向酒店
  selecthotel: '/procurementprocess/selecthotel', // 选择酒店采购
  selectintentionhotel: '/procurementprocess/Selectintentionhotel', // 选择意向酒店
  collection: '/hotel/Collection', // 收藏酒店
  cancelcollection: '/hotel/CancelCollection', // 取消收藏酒店
  getserviceprovider: '/procurementprocess/getselectserviceprovider', // 返回已选择服务商
  selectserviceprovider: '/procurementprocess/selectserviceprovider', // 选择服务商

  requirementsinfo: '/procurementprocess/requirementsinfo', // 会议需求详细信息数据加载
  receptionistList: '/hotel/receptionistList', // 查询酒店销售列表
  receptionistSave: '/hotel/receptionistSave', // 新增销售信息
  receptionistEdit: '/hotel/receptionistEdit', // 修改销售信息
  receptionistDelete: '/hotel/receptionistDelete', // 删除销售信息

  // 服务商
  serviceprovidercity: '/serviceprovider/city', // 城市检索条件
  serviceproviderlist: '/serviceprovider/serviceproviderlist', // 服务商列表
  inquirySend: '/inquirysheet/send', // 确认询价单发送

  // MeetingMaController-Purchase
  // servicePurchase: '/Purchase', // 保存提交
  // getCityList: '/CustomerConfiguration/GetCitys', // 获取城市
  // MeetingMaController-Purchase
  servicePurchase: '/MeetingMa/Purchase', // 保存提交
  serviceDictionary: '/CustomerConfiguration/Set_event_dictionary_detial', // 字典
  getCityList: '/CustomerConfiguration/GetCitys', // 获取城市
  addPurchase: '/MeetingMa/MeetingPurchaseSave', // 保存采购需求
  getDemandDetail: '/MeetingMa/GetMeetingID', // 查询采购需求
  getCustomer: '/CustomerConfiguration/Get_tcams_ci2_customer', // 获取客户
  getCustomerConfig: '/CustomerConfiguration/Get_event_customer_setting', // 获取客户配置
  getCustomerContacts: '/CustomerConfiguration/Get_tmc_account_user_account', // 获取客户联系人
  getEventList: '/CustomerConfiguration/Get_event_info', // 获取会议列表
  copyEvent: '/CustomerConfiguration/CopyEventInfo', // 复制会议
  addPoTap: '/CustomerConfiguration/Set_event_po', // 添加PO
  getPoTap: '/CustomerConfiguration/Get_event_po', // 获取PO
  cancelEvent: '/MeetingMa/CancelMeeting', // 取消会议
  CancelShow: 'MeetingMa/CancelShow', // 取消会议、取消订单、取消询价单  按钮是否展示

  getCompany: '/MeetingMa/GetCompany', // 公司查询
  getDepartment: '/MeetingMa/GetDepartmenty', // 部门查询
  getCustomerContact: '/MeetingMa/GetCustomerContact', // 客户联系人
  getContactInfo: '/MeetingMa/GetCustomerContactEdit', // 客户联系人 所属信息
  getMeetingTypeShow: '/MeetingMa/GetMeetingTypeShow', // 活动类型调用
  getServiceType: '/MeetingMa/GetServiceType', // 服务类型调用

  // Hotelinquiry-statistics
  getEventType: 'CustomerConfiguration/GetEventType', // 通过客户查询会议类型
  getDataOverview: 'CustomerConfiguration/HotelInquiryDataOverview', // 十四、 酒店询价单统计,数据概览
  MeetingLeader: 'CustomerConfiguration/CityAnalysis', // 十五、 会议负责人统计 - 城市
  dictionaryTable: 'CustomerConfiguration/Get_event_dictionary_detail', // 获取字典表
  rfqQty: 'CustomerConfiguration/RFPSatatistics', // 十六、 询价单数量统计
  meetingType: 'CustomerConfiguration/EventType', // 会议类型及部门
  detailedData: 'CustomerConfiguration/DetailInformation', // 酒店详细数据
  analysisHistory: 'CustomerConfiguration/SpendAnalysisAccumulateInfo', // 酒店费用分析历史
  DepartmentId: 'CustomerConfiguration/GetDepartment', // 部门Id
  serviceProvider: 'CustomerConfiguration/GetServiceprovider', //
  holaleAnalysis: 'CustomerConfiguration/CooperateRate', // 酒店分析
  hotelExpenses: 'CustomerConfiguration/SpendAnalysisAccumulateInfo', // 累计支出
  costStatistics: 'CustomerConfiguration/SpendAnalysisInfo', // 费用统计
  spendTypeAnalysis: 'CustomerConfiguration/SpendTypeAnalysis', // 支出类型分布
  costofOperation: 'CustomerConfiguration/BusinessExpenseStatistics', // 二十五、 业务费用统计(数据概览)
  seetingtypes: 'CustomerConfiguration/CostStatisticsByEventType', // 二十七、 费用统计（会议类型）
  suppliers: 'CustomerConfiguration/CostStatisticsByEventServiceprovider', // 供应商
  GetCitys: 'CustomerConfiguration/GetCitys', // 城市
  getAirport: '/MeetingMa/GetAirport', // 城市
  getFile: '/MeetingMa/GetFile', // 会议详情 附件
  saveFile: '/MeetingMa/FilesSave', // 会议详情 上传附件
  getPurchase: '/MeetingMa/GetPurchase', // 会议采购详情
  conferenceInformation: '/MeetingMa/GetMeetingList', // 会议详情
  delayEndTime: '/MeetingMa/DelayEndTime', // 修改报价截止时间
  getServiceProvider: '/MeetingMa/GetServiceProvider', // 会议服务商询价单
  largeTrafficQuery: '/MeetingMa/GetPassengerInformation', // 大交通查询
  informationSava: '/MeetingMa/PassengerInformationSava', // 大交通保存
  editQuery: '/MeetingMa/GetPassengerinformationEdit', // 大交通编辑查询
  deleteQuery: '/MeetingMa/PassengerinformationDelete', // 大交通删除
  addNotesQuery: '/MeetingMa/GetInternalDemand', // 添加内部备注查询
  addNotespreservation: '/MeetingMa/InternalDemandSava', // 添加内部备注保存
  getInquirySheet: '/MeetingMa/GetInquirySheet', // 询价单查询
  approvalProcessQuery: 'Approval/GetApprovaProcess', // 审批流查询
  approvalCopy: '/Approval/GetApprovaProcessEdit', // 审批流编辑查询、复制
  approveDeletion: 'Approval/ApprovaProcessDelete', // 审批流删除
  ServiceHotelList: '/MeetingMa/ServiceHotelList', // 询价服务商、酒店列表
  CancelInquirySheet: '/MeetingMa/CancelInquirySheet', // 取消询价单
  CancelOrder: '/MeetingMa/CancelOrderform', // 取消订单
  // Hotel RFP Statistics
  spendTypeAnalysisReport: 'EventReport/SpendTypeAnalysis', // 会议服务商用分析（部门费用）
  spendByProjectType: 'CustomerConfiguration/SpendByProjectType', // 会议类型费用
  spendCyCostElements: 'CustomerConfiguration/SpendCyCostElements', // 项目成本构成
  // 结算单
  getSettlementDetail: '/MeetingMa/GetSettlementSheetDetali', // 结算单明细
  // 会后结算
  meetingSettlement: 'MeetingMa/GetSettlementSheet',
  postSessionReport: '/MeetingMa/Report', // 会后报告
  GetDepartmentyMeeting: '/MeetingMa/GetDepartmentyMeeting', // 部门、会议类型查询
  MeetingTypeSava: '/MeetingMa/MeetingTypeSava', // 部门、会议类型保存
  MeetingTypeDelete: '/MeetingMa/MeetingTypeDelete', // 部门、会议类型删除
  DepartmentMeetingTypeShow: '/MeetingMa/DepartmentMeetingTypeShow', // 部门、会议类型显示不显示
  GetMeetingTypeEdit: '/MeetingMa/GetMeetingTypeEdit', // 部门、会议类型编辑查询
  getAll: '/MeetingMa/GetAllCompany', // 部门、会议类型公司查询
  DepartmentMeetingTypeSava: '/MeetingMa/DepartmentMeetingTypeSava', // 餐饮、合规人员设置
  MeetingSetUp: '/MeetingMa/MeetingSetUp', // 高级设置
  InfoReplaceRecord: '/MeetingMa/InfoReplaceRecord', // 高级设置记录
  GetUser: '/MeetingMa/GetUser', // 高级人员 更改
  GetMeetingPersonnels: '/MeetingMa/GetMeetingPersonnels', // 高级设置人员查询
  settlementPersonnel: '/Approval/SettlementOvertimel', // 结算审批流相关人员查询
  importExcel: '/MeetingMa/ImportExcel', // 文件导入
  approvaProcessState: '/Approval/ApprovaProcessState', // 审批流启用停用
  approvaProcessSort: '/Approval/ApprovaProcessSort', // 审批流排序
  fillinBuget: '/Quotation/FillinBuget', // 填报预算(合计)
  fillinBugetDetail: '/Quotation/FillinBugetDetail', // 填报预算(明细)
  fillinSettlement: '/SettlementSheet/GetSettlementSum', // 结算单填报
  fillinSettlementDetail: '/SettlementSheet/GetSettlementDetail', // 结算单填报(明细)
  B2BTeamBudget: '/B2B/TeamBudget', // 填报预算提交
  B2BTeamBalanceAccept: '/B2B/TeamBalanceAccept', // 结算单填报提交
  creatMiceTeam: '/B2B/creatMiceTeam', // 会议建团
  cancelMiceTeam: '/B2B/cancelMiceTeam', // 取消团
  autologin: '/b2b/autologin', // b2b地址
  GetB2BInfo: '/B2B/GetInfo', // 获取B2B 信息
  GetCostItem: '/B2B/GetCostItem', // 获取B2B成本项
  GetSupplierdataDropDown: '/B2B/GetSupplierdataDropDown', // 供应商下拉项查询
  GetSupplierdata: '/B2B/GetSupplierdata', // 供应商列表查询
  B2BFileSava: '/B2B/B2BFileSava', // B2B 上传文件保存
  // 中标审批
  getMsd: '/MeetingMa/GetWinthebiddingApprove',
  getEvent: 'MeetingMa/TouristAgencyQuotedPrice',
  createEvent: '/CustomerConfiguration/Create_event_info', // 创建会议
  updateEvent: '/CustomerConfiguration/Update_event_info', // 修改会议
  getEventDetail: '/CustomerConfiguration/Get_event_info', // 获取会议基本信息
  upLoadFile: '/MeetingMa/UploadFiles', // 文件上传
  getData: '/MeetingMa/GetMeetingList',
  getsave: '/MeetingMa/WinthebiddingApproveSava', // 中标审批保存
  getman: '/MeetingMa/GetSettlementApprove', // 结算审批查询
  getdpp: '/MeetingMa/SettlementDescribe', // 结算简述
  getkeep: '/MeetingMa/SettlementApproveSava',
  gethave: '/MeetingMa/SettlementApproveSava', // 结算审批保存
  getrecord: '/MeetingMa/ApproveRecord', // 结算审批记录
  Declined: '/MeetingMa/QuotedPriceStatus', // 确认报价、谢绝报价、重新报价
  OfflineQuotedPriceStatus: '/MeetingMa/OfflineQuotedPriceStatus', // 线下报价确认中标
  DelayEndTime: '/MeetingMa/DelayEndTime', // 延长报价时间
  Usage: '/MeetingMa/GetQuotedPrice', // 报价单查询
  Shopping: '/MeetingMa/GetOrderformByID', // 订单概要
  orderQuery: '/MeetingMa/GetOrderform', // 订单查询
  translators: '/MeetingMa/GetServiceEvaluates',
  provider: '/MeetingMa/ServiceEvaluatesSava ',
  process: '/Approval/GetApprovaProcess',
  save: '/Approval/ApprovalProcessSava',
  detail: '/Approval/GetApprovaProcessEdit',
  orderformexportexcel: '/orderform/exportexcel', // 订单导出

  // Hotelinquiry-statistics

  uploadHzTeamAttach: '/B2B/uploadHzTeamAttach', // B2B 上传团附件
  UploadFile: '/B2B/UploadFile', // B2B 上传团附件

  addContact: '/MeetingMa/CustomerContactSava', // 添加客户联系人
  sendMsg: '/MeetingMa/MessageSava', // 留言
  SettlementReject: '/MeetingMa/SettlementReject', // 保存异议
  WinTheBiddingQuotedPrice: '/MeetingMa/WinTheBiddingQuotedPrice', // 报价询价单查询
  WinningTheBidApprove: '/MeetingMa/WinningTheBidApprove', // 确认中标生成审批
  Temporary: '/MeetingMa/Temporary', // 确认中标生成审批-临时接口
  TemporaryOrderfrom: '/MeetingMa/TemporaryOrderfrom', // 临时改变订单状态接口
  WhetherInquiry: '/MeetingMa/WhetherInquiry', // 是否可去询价
  GetCancel: '/MeetingMa/GetCancel', // 取消原因
  MeetingTypeOrder: '/MeetingMa/MeetingTypeOrder', // 设置会议类型排序
  UrgingQuotedPrice: '/MeetingMa/UrgingQuotedPrice', // 催报价
  QuotedPriceSettlementExcel: '/ExcelExport/QuotedPriceSettlementExcel', // 报价结算单导出
  ExportExcel: '/SettlementSheet/ExportExcel', // 导出结算单
  SettlementRecord: '/MeetingMa/SettlementRecord', // // 报价结算审批记录
  GetMessage: '/MeetingMa/GetMessage', // 留言查询
  GetCustomerContactList: '/MeetingMa/GetCustomerContactList', // 客户联系人
  MeetingStatus: '/MeetingMa/MeetingStatus', // 会议进度状态
  SummaryThanPrice: '/MeetingMa/SummaryThanPrice', // 线下比价页 详情
  SummaryQuotedPrice: '/MeetingMa/SummaryQuotedPrice', // 报价汇总查询
  SummaryAllQuotedPrice: '/MeetingMa/SummaryAllQuotedPrice', // 汇总报价单
  SummarySettlementSheet: '/MeetingMa/SummarySettlementSheet', // 结算汇总查询
  SettlementSheetState: '/MeetingMa/SettlementSheetState', // 判断是否有线下报价单
  GetOwnerRule: '/InfoConfig/GetOwnerRule', // 查询负责人规则列表
  ProvinceCity: '/MeetingMa/ProvinceCity', // 省级直辖市查询
  GetMeetingType: '/MeetingMa/GetMeetingType', // 会议类型查询
  OwnerRuleSava: '/InfoConfig/OwnerRuleSava', // 负责人规则保存
  OwnerRuleEdit: '/InfoConfig/OwnerRuleEdit', // 负责人编辑查询
  OwnerRuleDelete: '/InfoConfig/OwnerRuleDelete', // 负责人删除
  GetService: '/InfoConfig/GetService', // 服务商查询
  GetPurchaseRule: '/MeetingMa/GetPurchaseRule', // 采购人规则列表查询
  PurchaseRuleSava: '/MeetingMa/PurchaseRuleSava', // 采购人规则保存
  PurchaseRuleEdit: '/MeetingMa/PurchaseRuleEdit', // 采购人规则编辑查询
  PurchaseRuleDelete: '/InfoConfig/PurchaseRuleDelete', // 采购人规则删除
  ServiceProviderUser: '/MeetingMa/ServiceProviderUser', // 获取当前用户绑定服务商
  getRuleList: '/MeetingMa/GetRule', // 获取报价结算规则配置列表
  ruleDelete: '/MeetingMa/RuleDelete', // 规则配置删除
  RuleEdit: '/MeetingMa/RuleEdit', // 规则配置详情查询
  getRuleTemplate: '/MeetingMa/GetRuleTemplate', // 规则配置模板查询
  getRuleOther: '/MeetingMa/GetRuleOther', // 规则配置，其他服务项查询
  RuleSava: '/MeetingMa/RuleSava', // 保存规则配置
  GetServiceProviderUser: '/MeetingMa/GetServiceProviderUser', // 用户绑定服饰列表
  ServiceProviderEditUser: '/MeetingMa/ServiceProviderEditUser', // 服务商更改用户
  CreateInquirySheet: '/MeetingMa/CreateInquirySheet', // DMC 填写报价 获取objectID
  SendQuotation: '/MeetingMa/SendQuotation', // 酒店、供应商提交报价后，发送短信、邮件通知给会议负责人
  UnreadMessage: '/MeetingMa/UnreadMessage', // 留言读取消息
  GetBayerExcel: '/BayerReportForm/GetBayerExcel', // 拜尔台账报表
  BayerExcel: '/BayerReportForm/BayerExcel', // 拜尔台账报表下载
  GetBayerMonthExcel: '/BayerReportForm/GetBayerMonthExcel', // 拜尔月份台账报表
  BayerMonthExcel: '/BayerReportForm/BayerMonthExcel', // 拜尔月份台账报表下载
  getCostProjects: '/orderform/GetdictionaryList', // 获取费用项目列表
  GetMSDExcel: '/MSDReport/GetMSDReportList', // 03-MSD区域台账
  MSDExcel: '/MSDReport/MSDExcel', // 03-MSD区域台账
  GetOrganonExcel: '/MSDReport/GetOjialReportList', // 04-欧佳隆区域台账
  OrganonExcel: '/MSDReport/OjialExcel', // 04-欧佳隆区域台账
  GetLillyAccount: '/Reporting/GetLillyAccount', // 05-礼来区域台账
  GetLillyAccountExcel: '/Reporting/GetLillyAccountExcel', // 05-礼来区域台账 报表导出
  GetApporval: '/Approval/GetApporval', // 审批流查询
  ApporvalDelete: '/Approval/ApporvalDelete', // 审批流删除
  GetAllCompany: '/MeetingMa/GetAllCompany', // 部门、会议类型公司查询
  ApporvalSava: '/Approval/ApporvalSava', // 审批流新增
  ApprovaMeetingType: 'Approval/ApprovaMeetingType', // 审批步骤会议类型查询
  EditGetApporval: 'Approval/EditGetApporval', // 审批流编辑查询
  WhetherShow: '/InvoiceMsd/WhetherShow', // 是否显示配置按钮
  FileAdd: '/InvoiceMsd/FileAdd', // 上传附件保存
  GetFile: '/InvoiceMsd/GetFile', // 上传文件查询

  CventDateAdd: '/InvoiceMsd/CventDateAdd', // 保存Cevent 日期
  InvoiceMsdSettlementReject: '/InvoiceMsd/SettlementReject', // 管理员驳回结算单
  GetUserGroupList: '/UserGroupmanagement/GetUserGroupList', // 用于展示用户组列表数据
  DeleteUserGroupDate: '/UserGroupManagement/DeleteUserGroupDate', // 删除用户组列表数据
  GetGroupEditData: '/UserGroupManagement/GetEditData', // 获取用户组配置信息
  PostUserGroupDate: '/UserGroupmanagement/PostUserGroupDate', // 新增用户组
  PutUserGroupDate: '/UserGroupmanagement/PutUserGroupDate', // 编辑用户组
  GetUsergroupingList: '/UserGroupmanagement/GetUsergroupingList', // 获取组员管理列表
  GetUserList: '/UserGroupmanagement/GetUserList', // 用于展示当前登录用户下所属组织下用户数据列表
  PostUser_UserGroup: '/UserGroupmanagement/PostUser_UserGroup', // 保存组内用户
  RemoveUserGroup: '/UserGroupmanagement/RemoveUserGroup', // 移出组内用户
  GetCustomerGroupList: '/UserGroupmanagement/GetCustomerGroupList', // 用于展示用户组内已加入该用户组的客户列表数据
  DeleteCustomerDate: '/UserGroupmanagement/DeleteCustomerDate', // 将用户组内客户移出该用户组
  GetCustomerList: '/UserGroupmanagement/GetCustomerList', // 用于展示当前登录用户下所属组织下客户数据列表
  PostCustomerDate: '/UserGroupmanagement/PostCustomerDate', // 用于添加该用户组内新客户
  GetReportGroupList: '/UserGroupmanagement/GetReportGroupList', // 用于添加该用户组内新客户
  DeleteReportDate: '/UserGroupmanagement/DeleteReportDate', // 将用户组内报表移出该用户组
  GetReportList: '/UserGroupmanagement/GetReportList', // 用于展示已存在的报表数据列表
  PostReportList: '/UserGroupmanagement/PostReportList', // 用于添加该用户组内新报表
  ReportList: '/UserGroupmanagement/ReportList', // 用于当前登陆人查询报表时控制报表查询下拉
  GetCustomerEventInfoPost: '/UserGroupmanagement/GetCustomerEventInfoPost', // 用于当前登陆人添加会议基本信息时，所能选择的客户下拉数据

  getSelfformList: '/selfform/list', // 其他配置=》附加信息列表查询
  getSelfformInfo: '/selfform/info', // 其他配置=》附加信息详情查询
  eventviewselfform: '/selfform/eventviewselfform', // 会议呈现自定义表单
  saveselfform: '/selfform/saveselfform', // 其他配置=》附加信息编辑保存
  saveeventselfform: '/selfform/saveeventselfform', // 会议填写自定义表单
  DeleteSelfForm: '/selfform/DeleteSelfForm', // 删除会议配置信息

  GetEditInquirySheet: 'EditInquirySheet/GetEditInquirySheet', // 采购需求保存询价单列表查询
  UpdateInquirySheet: '/EditInquirySheet/UpdateInquirySheet', // 更新询价单
  GetAllFile: '/MeetingFile/GetAllFile', // 会议文件获取全部文件

  FileDetailedlist: '/MeetingFile/FileDetailedlist', // 下载文件清单

  GetApproveSheetList: '/ApproveSheet/GetApproveSheetList', // 审批单管理列表查询
  EditApproveUser: '/ApproveSheet/EditApproveUser', // 审批单分配
  GetSettlementObjection: '/SettlementData/GetSettlementObjection', // 结算异议查询接口
  GetCode: '/MeetingFeedback/GetCaptcha', // 调查问卷获取验证码
  LoginUser: '/MeetingFeedback/Login', // 验证码登录验证
  FeedbackAdd: '/MeetingFeedback/FeedbackAdd', // 调查问卷保存
  GetFeedback: 'MeetingFeedback/GetFeedback', // 反馈结果查询
  GetCommerce: '/outapi/resources/completeCreditCode', // 完善工商信息
  BusinessPerfectInfo: 'ResourcesApi/BusinessPerfectInfo', // 完善工商信息
  synchronization: '/ResourcesApi/SynchronismInquirysheet', // 询价单同步酒店资源接口
  GetGSO: '/SitePersonnelInformation/SitePersonnel',
  GetGSOUser: '/ResourcesApi/Contacts',

  SupplierList: 'DataSynchro/SupplierList', // 供应商库列表查询
  Taxpayers: 'ResourcesApi/Taxpayers', // 新增场地接口
  CollectHotel: '/hotel/QueryCollection' // 收藏酒店查询
}
