export default {
  platform: {
    process: {
      code: 'Code',
      name: 'Name',
      value: 'Value',
      defaultValue: 'Default',
      optionalValue: 'Option Values'
    },
    // component: {
    //   form: {
    //     submitter: '提交人',
    //     assistMsg: '协助信息',
    //     assistant: '选择协助人',
    //     businessName: '业务名称',
    //     transfer: '选择转交人',
    //     transferMsg: '转交信息',
    //     bill: '审核单据',
    //     opinion: '审核意见',
    //     time: '提交时间'
    //   },
    //   tab: {
    //     tabAssistantTrackHistory: '协助历史',
    //     tabBillHistory: '单据历史',
    //     bpmImg: '流程图',
    //     tabApproveTrackHistory: '审核轨迹'
    //   },
    //   popup: {
    //     tabAssistantTrackHistory: '协助审核',
    //     approveConformDialog: '审批',
    //     approveHistoryDialog: '审批历史',
    //     approveDialog: '审批',
    //     assistConformDialog: '协助',
    //     tabApproveTrackHistory: '审批轨迹'
    //   },
    //   group: {
    //     approveDialogPart1: '主信息'
    //   },
    //   list: {
    //     updateDate: '时间',
    //     accountName: '操作人',
    //     assistantName: '协助人',
    //     substituteAccountName: '代审人',
    //     assistStatusFlg: '协助状态',
    //     assistMsg: '协助信息',
    //     assistResult: '协助意见',
    //     approveResult: '审批意见',
    //     approveUser: '下一步审批人',
    //     auditStatus: '审批状态',
    //     agreeFlg: '审批结果',
    //     trackType: '审批动作'
    //   }
    // },
    // api: {
    //   api: 'API',
    //   apiCode: '权限',
    //   permissionsFlg: '包含权限标识',
    //   swaggerFlg: 'swagger标识',
    //   logFlg: '收集日志',
    //   logDetailFlg: '收集详细日志',
    //   apiMemo: 'Api说明',
    //   className: '类名',
    //   classNameMemo: '类描述',
    //   methodName: '方法名',
    //   apiModel: '模块'
    // },

    menu: {
      updaateTips: 'Because the menu information has a 5-minute cache, the salesman can log in after 5 minutes and see the new menu directory', // 因菜单信息有5分钟的缓存，业务员在5分钟后登陆可以看到新的菜单目录
      deleteTips: 'Only its own directory or menu can be deleted. If the directory is a directory, there is no directory or menu in the current directory', // 只能删除自有目录或者菜单,如为目录，则当前目录下没有目录/菜单
      synchronizationSuccess: 'Synchronization Success', // 同步成功
      noProblem: 'No Problem', // 没有问题
      notifyErrorTips: 'Solution: Please readjust the problem menu directory hierarchy (to a different directory, and then readjust back). Question menu:', // 解决办法：请重新调整问题菜单目录层级(调到别的目录，再调整回来)。问题菜单：
      confirmTips: 'During synchronization, the current data is not affected, but the menu and directory structure information newly added by the platform is added', // 同步时，不会影响当前数据，只是添加平台新增加的菜单和目录结构信息
      moduleCode: 'Module Code', // 模块名称
      name: 'Name', // 名称
      catalog: 'catalog', // 目录
      menuName: 'Name', // 名称
      menuCode: 'Identify', // 标识
      code: 'Code', // 代码
      menu: 'Menu', // 菜单
      icon: 'Icon', // 图标
      menuFlag: 'Type', // 类型
      sortNo: 'Sort', // 排序
      routeName: 'route-name(Unique)', // route-name(唯一)
      metaTitle: 'meta-title', // meta-title
      noCache: 'No cache', // 无缓存
      hiden: 'Hide', // 隐藏
      path: 'URL', // 路径
      iframeUrl: 'iframe URL', // 是否为iframe
      componentName: 'Component Name', // 组件名称
      reuseFlag: 'Component Reusing Technology', // 组件复用
      selfFlag: 'Own or not', // 是否自有
      component: 'Component', // 组件
      moduleType: 'Module Type', // 模块类型
      authFlag: 'Impower', // 授权方式
      leafFlag: 'Type', // 类型
      parentName: '上级目录', // 上级目录
      menuEname: 'English Name', // 英语名称
      iframeFlag: 'Is iframe', // 是否为iframe
      menuUrl: 'Menu URL', // 菜单URL
      hiddenFlag: 'Is Hidden', // 是否隐藏
      noCacheFlag: 'Is no cache', // 是否无缓存
      operateCode: 'Operation Code', // 操作代码
      operateName: 'Operation Name', // 操作名称
      operateEname: 'English name of operation', // 操作英文名称
      msg: {
        bpmData: 'Only menus have process data', // 只有菜单才有流程数据
        authData: 'Only menus have permission data', // 只有菜单才有权限数据
        manageBtn: 'Only menus have buttons', // 只有菜单才有按钮
        editRoute: 'Only child routes can be modified', // 只有子路由可以修改
        addRoute: 'Only menus can add subroutes', // 只有菜单可以添加子路由
        update: 'Only directories and menus can be modified', // 只有目录和菜单可以修改
        add: 'Only directories can be added'// 只有目录可以添加

      },
      btn: {
        addRoot: 'Add Root Directory', // 添加根目录
        sortMenu: 'Directory Adjustment', // 目录调整
        menuCheck: 'Menu Check', // 菜单检查
        manageBtn: 'Button management', // 按钮管理
        addRoute: 'Add a child route', // 添加子路由
        editRoute: 'Modify the subroute', // 修改子路由
        authData: 'Permission Data', // 权限数据
        bpmData: 'Process Data', // 流程数据
        removeMenu: 'Cascading Delete'// 级联删除
      }
    },
    // manager: {
    //   name: '名称',
    //   account: '账号',
    //   code: '代码',
    //   usingFlag: '状态',
    //   password: '密码',
    //   failnum: '密码错误次数',
    //   loginTime: '上次登陆时间',
    //   remark: '备注'
    // },
    // tenant: {
    //   tenantInfo: '租户信息',
    //   name: '租户名称',
    //   address: '联系人地址',
    //   code: '代码',
    //   codeHash: '标识代码',
    //   usingFlag: '状态',
    //   tel: '联系人电话',
    //   contactor: '联系人',
    //   funcAuth: '功能权限',
    //   dataAuth: '数据权限',
    //   account: '登陆账号',
    //   failnum: '密码错误次数',
    //   loginTime: '上次登陆时间',
    //   password: '密码',
    //   onlineNum: '在线用户数',
    //   remark: '备注',
    //   funcTab: '功能权限',
    //   dataperTab: '数据权限类别',
    //   componentTab: '组件权限'
    // },
    dataper: {
      name: 'Categoryname', // 类别名称
      code: 'Class Code', // 类别代码
      usingFlag: 'Status'// 状态
    }
    // cfgComponent: {
    //   code: '组件编码',
    //   name: '组件名称',
    //   systemFlag: '系统',
    //   blockType: '区块类型',
    //   routerName: '菜单',
    //   bizCode: '业务编码',
    //   list: '平台组件列表'
    // },
    // tenantComponent: {
    //   compCode: '组件编码',
    //   name: '组件名称',
    //   systemFlag: '系统',
    //   blockType: '区块类型',
    //   routerName: '菜单',
    //   bizCode: '业务编码',
    //   tenantCode: '租户',
    //   showFlag: '是否显示'
    // }
  }
}
