const getters = {
  // app
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  clientWidth: state => state.app.clientSize.width,
  clientHeight: state => state.app.clientSize.height,
  btnControllMap: state => state.app.btnControllMap,
  moduleNames: state => state.app.moduleNames,
  // tagsView
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  dataDictList: state => state.app.dataDictList,
  isNewTag: state => state.tagsView.isNewTag,
  // user
  token: state => state.user.token,
  tenantCodeHash: state => state.user.tenantCodeHash,
  md5: state => state.user.md5,
  avatar: state => state.user.avatar,
  id: state => state.user.id,
  identity: state => state.user.identity,
  activeFlag: state => state.user.activeFlag,
  name: state => state.user.name,
  account: state => state.user.account,
  userOrganCode: state => state.user.userOrganCode,
  userDeptCode: state => state.user.userDeptCode,
  userEmployeeCode: state => state.user.userEmployeeCode,
  organ: state => state.user.organ,

  baseSelectList: state => state.user.baseSelectList,
  // permission
  permissionRouters: state => state.permission.routers,
  permissionMenus: state => state.permission.menus,
  showMenus: state => state.permission.showMenus,
  addRouters: state => state.permission.addRouters,
  iframeRouters: state => state.permission.iframeRouters,
  // dashboard
  dashboardRefresh: state => state.dashboard.refresh,
  dashboardMap: state => state.dashboard.dashboardMap,
  // sys
  remoteSelectData: state => state.sys.remoteSelectData,
  // haiqin
  dashboardRpt: state => state.dashboard.dashboardRpt,
  authorizationList: state => state.authorization.authorizationList,
  precision: state => state.projSys.precision,
  revertFlag: state => state.projSys.revertFlag,
  clauseReadFlag: state => state.projSys.clauseReadFlag
}

export default getters
