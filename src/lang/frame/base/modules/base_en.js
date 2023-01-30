export default {
  navbar: {
    settings: 'userSettings', // 用户设置
    logOut: 'logOut', // 退出登录
    dashboard: 'homePage', // 首页
    screenfull: 'fullScreen', // 全屏
    cancelScreenFull: 'cancelFullScreen', // 取消全屏
    mail: 'mail', // 邮件
    notice: 'notice', // 通知
    theme: 'theme', // 换肤
    lang: 'English',
    changePwd: 'changePassword', // 修改密码
    switchBack: 'switchBackAccount', // 切回原账户
    dashboardSetting: 'homePageSettings', // 首页设置
    displayContent: 'displayContent', // 显示内容
    contentOrder: 'contentOrder', // 顺序
    locked: 'locked', // 锁屏中
    lock: 'lock', // 锁屏
    delegate: 'delegate', // 转授
    cancelDelegate: 'cancelDelegate', // 取消转授
    auditGroup: 'userGroup', // 用户组
    delegateUser: 'delegateUser' // 转授人
  },
  login: {
    title: 'user Login', // 用户登录
    guestTitle: 'attendeeTitle', // 参会人登录
    groupTitle: 'administratorsTitle', // 管理员登录
    platformTitle: 'platformTitle', // 平台登录
    userTitle: 'userTitle', // 登录
    login: 'Login', // 登录
    enterpriseName: 'corporate name', // 公司名称
    username: 'username', // 账号
    eventHashCode: 'meeting hash', // 会议哈希
    captcha: 'verification code', // 验证码
    password: 'password', // 密码
    updatePwd: 'change password', // 修改密码
    userValidateMsg: 'Please enter the correct user name', // 请输入正确的用户名
    pwdValidateMsg: 'Password length 6-20 bits', // 密码长度6-20位
    organValidateMsg: 'Please select an organization' // 请选择机构
  },
  notify: {
    title: {
      success: 'success', // 成功
      warning: 'warning', // 警告
      info: 'info', // 消息
      error: 'error' // 错误
    }
  },
  permission: {
    roles: 'Your permission', // 你的权限
    switchRoles: 'Switch permissions' // 切换权限
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order', // 固定表头, 按照表头顺序排序
    dynamicTips2: 'Unfixed header, sort by clicking order', // 不固定表头, 按照点击顺序排序
    dragTips1: 'Default Order', // 默认顺序
    dragTips2: 'Order after dragging', // 拖拽后顺序
    title: 'title', // 标题
    importance: 'importance', // 重要性
    type: 'type', // 类型
    remark: 'remark', // 点评
    search: 'search', // 搜索
    add: 'add', // 添加
    export: 'export', // 导出
    reviewer: 'reviewer', // 审核人
    id: 'id', // 序号
    date: 'date', // 时间
    author: 'author', // 作者
    account: 'account', // 账户
    lang: 'languages', // 语种
    createUser: 'addUser', // 添加人
    createDate: 'addDate', // 添加时间
    updateUser: 'modifyUser', // 修改人
    updateDate: 'modifyTime', // 修改时间
    readings: 'readings', // 阅读数
    status: 'status', // 状态
    actions: 'operation', // 操作
    edit: 'edit', // 编辑
    publish: 'publish', // 发布
    draft: 'draft', // 草稿
    delete: 'delete', // 删除
    cancel: 'cancel', // 取 消
    confirm: 'confirm', // 确 定
    return: 'return', // 返回
    emptyText: 'emptyText' // 暂无数据
  },
  tagsView: {
    refresh: 'refresh', // 刷新
    close: 'close', // 关闭
    closeOthers: 'closeOthers', // 关闭其它
    closeAll: 'closeAll' // 关闭所有
  },
  tableColSet: {
    title: 'Table Column Settings', // 表格
    noCheckTip: 'Please check at least one item', // 请至少勾选一项
    props: 'attribute', // 属性
    drag: 'drag', // 拖动
    columnSetting: 'Column setting' // 列设置
  },
  biz: {
    route: {
      load: 'Loading hard...' // 努力加载中..
    },
    lbl: {
      moduleCode: 'Business functions', // 业务功能
      search: 'search', // 查询
      enable: 'enable', // 启用
      disable: 'disable', // 停用
      mainInfo: 'Master Information', // 主信息
      optName: 'Voucher preparation User', // 制单人
      optDate: 'Voucher preparation Date', // 制单日期
      bizApplyName: 'applicant', // 申请人
      bizEmployeeName: 'Business Manager', // 业务员
      bizDeptName: 'Business Department', // 业务部门
      bizOrganName: 'Business organization', // 业务机构
      remark: 'remark', // 备注
      auditStatus: 'Approval status', // 审批状态
      hour: 'hour', // 小时
      minute: 'minute', // 分钟
      second: 'second', // 秒
      usingFlag: 'status', // 状态
      auditLogInfo: 'Audit information' // 审核信息
    },
    placeholder: {
      choose: 'choose', // 选择
      input: 'input', // 输入
      dateInput: 'dateInput', // 日期输入
      startDate: 'startDate', // 开始日期
      endDate: 'endDate', // 结束日期
      userNameNotBlank: 'Please enter the user name', // 请输入用户名称
      accountNotBlank: 'Please enter the account number', // 请输入账号
      passwordNotBlank: 'Please input a password', // 请输入密码
      passwordSet: '6-20 digits, combination of English, numbers and underline is recommended', // 6-20位,建议英文、数字、下划线组合
      remarkNotBlank: 'Please enter comments', // 请输入备注
      search: 'search', // 搜索
      require: 'This item is required' // 此项为必填项
    },
    title: {
      info: 'information', // 信息
      search: 'query', // 查询
      attrInfo: 'Attribute information', // 属性信息
      detailInfo: 'Detailed information', // 详细信息
      baseInfo: 'Benchmark information', // 基准信息
      mainInfo: 'Master Information', // 主信息
      subInfo: 'Sub information', // 副信息
      dataInfo: 'Data information', // 数据信息
      basicInfo: 'Basic information', // 基础信息
      menuInfo: 'Menu information' // 菜单信息
    },
    btn: {
      unlock: 'unlock', // 解除锁定
      quickConfirm: 'Confirm', // 确认
      quickConfirmList: 'Batch confirm', // 批量确认
      unlock: 'Unlock', // 解锁
      start: 'start', // 启动
      submitAudit: 'submitAudit', // 提交审核
      end: 'end', // 停止
      confirm: 'confirm', // 确定
      confirmCheck: 'confirmCheck', // 确认
      save: 'save', // 保存
      cancel: 'cancel', // 取消
      search: 'search', // 查询
      examine: 'examine', // 检查
      add: 'add', // 新增
      set: 'set', // 设置
      get: 'get', // 取得
      blank: '', // 空白(空)
      register: 'register', // 注册
      update: 'revise', // 修改
      change: 'change', // 变更
      step: 'Process guidance', // 流程引导
      copy: 'copy', // 复制
      hidden: 'hidden', // 隐藏
      show: 'show', // 显示
      delete: 'delete', // 删除
      view: 'view', // 查看
      submit: 'submit', // 提交
      generate: 'generate', // 生成
      claim: 'claim', // 认领
      init: 'initialization', // 初始化
      sync: 'synchronization', // 同步
      check: 'inspect', // 检查
      acceptance: 'acceptance check', // 验收
      saveAndSubmit: 'save and submit', // 提交
      saveDraft: 'save draft', // 保存草稿
      download: 'download', // 下载
      downloadTemplate: 'download template', // 下载模板
      menuSet: 'Menu permission setting', // 菜单权限设置
      preview: 'preview', // 预览
      enable: 'enable', // 启用
      disable: 'disable', // 停用
      revert: 'revert', // 复原
      refresh: 'refresh', // 刷新
      choose: 'choose', // 选择
      close: 'close', // 关闭
      reset: 'reset', // 重置
      extend: 'extend', // 查询扩展
      open: 'Expand', // 展开
      stow: 'Fewer', // 收起
      expand: 'Expand', // 展开
      contract: 'Fewer', // 收起
      clear: 'clear', // 清空
      print: 'print', // 打印
      retry: 'retry', // 重发
      repeal: 'repeal', // 撤销
      resetPwd: 'reset password', // 重置密码
      next: 'next', // 下一步
      editproc: 'editproc', // 编排
      adjust: 'adjustment', // 调整
      import: 'import', // 导入
      chartSet: 'Chart Settings', // 图表设置
      bpm: 'flow chart', // 流程图
      export: 'export', // 导出
      exportData: 'exportData', // 导数据
      chooseFile: 'chooseFile', // 选择文件
      priceEstimation: 'price estimation', // 价格估算
      priceRef: 'Price Relationship Management', // 价格关系管理
      upload: 'upload', // 上传
      setting: 'set', // 设置
      addRow: 'addRow', // 增行
      edit: 'edit', // 编辑
      deleteRow: 'deleteRow', // 删行
      more: 'more', // 更多
      audit: 'audit', // 审核
      cancelAudit: 'cancel audit', // 弃审
      viewInfo: 'view details', // 查看明细
      settleConfirm: 'confirm settlement', // 结算确认
      settlementCancel: 'cancel settlement', // 反结算
      confirmPay: 'confirm pay', // 付款确认
      detail: 'view detail', // 查看明细
      detailSet: 'detail information', // 明细设置
      allocation: 'allocation', // 分配
      conditionSet: 'condition set', // 条件设置
      formItemSet: 'form item set', // 表单项设置
      relationMsg: 'relationMsg', // 关联消息功能
      login: 'login', // 登录
      logout: 'logout', // 断开
      viewFunc: 'viewFunctions', // 所属职能
      auditDefine: 'audit process', // 审核流程
      primitive: 'original agreement', // 原始协议
      uploadAttachment: 'enclosure', // 附件
      auditHelp: 'help audit', // 协助审核
      assist: 'assist audit', // 协助审核
      transferAudit: 'transfer audit', // 转交审核
      auditHistory: 'audit history', // 审核历史
      resend: 'resend', // 重发消息
      agree: 'agree', // 同意
      refuse: 'refuse', // 拒绝
      sendOut: 'send out', // 发送
      adopt: 'adopt', // 通过
      handle: 'handle', // 处理
      publish: 'publish', // 发布
      layout: 'layout' // 编排
    },
    msg: {
      tip: 'tip', // 提示
      warnMenuMsg: 'The menu of the current alert chart has been set', // 当前预警图表已经设置菜单
      voidSuccess: 'Void successfully', // 作废成功
      stepWarn: 'No process guidance for current business operation', // 当前业务操作无流程引导
      cancelAuditSuccess: 'Withdrawal succeeded', // 退审成功
      insertSuccess: 'Successfully added', // 新增成功
      updateSuccess: 'Modification succeeded', // 修改成功
      copySuccess: 'Copy succeeded', // 复制成功
      saveSuccess: 'Saving succeeded', // 保存成功
      saveHashCheck: 'Data not modified or repeatedly submitted', // 数据没有修改或数据重复提交
      saveFailed: 'Save failed', // 保存失败
      updateFailed: 'update failed', // 修改失败
      deleteSuccess: 'Deletion succeeded', // 删除成功
      deleteFailed: 'Delete failed', // 删除失败
      deleteTip: 'The data cannot be deleted in the current state', // 当前状态不可删除该条数据
      getDataFailed: 'Failed to get data', // 获取数据失败
      noRowSelected: 'Please select a piece of data', // 请选择一条数据
      noViewPage: 'No query page is set', // 没有设置查询页面
      noFirstRowSelected: 'Only the first data can be selected', // 只能选择第一条数据
      selectOneRow: 'Only one data can be selected', // 只能选择一条数据
      confirmResetPwd: 'Are you sure you want to reset your password?', // 确认重置密码？
      confirmDelete: 'Are you sure to delete?', // 确认删除？
      confirmSet: 'Confirm operation?', // 确认操作？
      confirmClose: 'Are you sure to close?', // 确认关闭？
      confirmCancel: 'Are you sure to cancel?', // 确认取消？
      confirmGenerate: 'Confirm to generate?', // 确认生成？
      confirmLock: 'Confirm lock screen?', // 确认锁屏？
      saveCheck: 'Please check the required items prompted in the red box, which cannot be blank', // 请检查红框提示的必输项内容，不能为空
      confirmSave: 'Please confirm that the current data is correct. Are you sure to save it?', // 请确认当前数据已经准确无误，是否确定保存？
      confirmSaveAttachment: 'Are you sure you want to upload the attachment?', // 请确认是否要上传附件？
      confirmSaveAndSubmit: 'Please confirm that the current data is accurate. Are you sure to submit?', // 请确认当前数据已经准确无误，是否确定提交？
      exportFailed: 'Export failed', // 导出失败
      operationSuccess: 'Operation succeeded', // 操作成功
      confirmSubmit: 'Please confirm that the current data is accurate. Are you sure to submit?', // 请确认当前数据已经准确无误，是否确定提交？
      submitSuccess: 'Submitted successfully', // 提交成功
      abortEdit: 'The current information has not been saved. Do you want to discard editing?', // 当前信息尚未保存，是否放弃编辑？
      confirmSubmitAudit: 'Are you sure to submit for approval?', // 确认提交审批？
      confirmProfitLoss: 'Confirm to generate inventory gain and inventory loss?', // 确认生成盘盈盘亏？
      submitAuditSuccess: 'Successfully submitted for approval', // 提交审批成功
      profitLossSuccess: 'Generate inventory gain and inventory loss successfully', // 生成盘盈盘亏成功
      closeSuccess: 'Close successfully', // 关闭成功
      confirmRetrial: 'Are you sure to withdrawal?', // 确认退审？
      retrialSuccess: 'Withdrawal succeeded', // 退审成功
      cancelSuccess: 'Unapprove successfully', // 弃审成功
      confirmGoodsSatuts: 'Are you sure to transfer the cargo right?', // 确认进行货权转移？
      transferSuccess: 'Transfer succeeded', // 转移成功
      confirmEnable: 'Confirm to enable?', // 确认启用？
      confirmStop: 'Confirm deactivation?', // 确认停用？
      confirmOrder: 'Are you sure to place an order?', // 确认下单？
      enableSuccess: 'Enable success', // 启用成功
      stopSuccess: 'Stop success', // 停用成功
      confirmPublish: 'Confirm the release process?', // 确认发布流程吗？
      publishSuccess: 'Publish successfully', // 发布成功
      confirmMark: 'Confirm mark?', // 确认标记？
      missingWithdrawAuditParams: 'The document information for revoking approval is missing. Please contact the system administrator', // 缺少撤回审核单据信息，请联系系统管理员
      DingTalkNotSupportWithdrawAudit: 'The current approval type of the document is nail, which must be withdrawn at the nail client', // 单据当前审批类型为钉钉，须在钉钉客户端进行撤回
      sendAssistAuditSuccess: 'Successfully sent assistance for review', // 发送协助审核成功
      sendTransferAuditSuccess: 'Succeeded in sending for review', // 发送转交审核成功
      completeAssistAuditSuccess: 'Successfully completed the assistance audit', // 完成协助审核成功
      completeGeneralAuditSuccess: 'General audit completed successfully', // 完成一般审核成功
      confirmSettlement: 'Confirm that the current contract settlement is completed?', // 确认当前合同结算完结？
      confirmSettleCounter: 'Confirm that the current contract has been de settled?', // 确认当前合同反结算完结？
      disableDelete: 'Current status cannot be deleted', // 当前状态不可删除
      disableClose: 'Current status cannot be closed', // 当前状态不可关闭
      disableComplete: 'The current status is unavailable', // 当前状态不可货齐
      disableUpdate: 'Current status cannot be modified', // 当前状态不可修改
      disableSelectCatalog: 'Only the menu can be selected', // 只可以选择菜单
      missingBpmProcessDefinitionId: 'Missing process definition', // 缺少流程定义
      disableSubmit: 'Current status cannot be submitted', // 当前状态不可提交
      disableWithdrawAudit: 'The current status cannot be withdrawn', // 当前状态不可撤回审核
      disableCancelAudit: 'The current status cannot be unapproved. You can only unapprove after approval', // 当前状态不可弃审,审批通过才可以弃审
      disableChange: 'Current status cannot be changed', // 当前状态不可变更
      claimTaskSuccess: 'Successfully claimed the task', // 认领任务成功
      startBpmProcessSuccess: 'Successfully started the process', // 启动流程成功
      replaceData: 'Do you want to overwrite the existing data?', // 是否对已有的数据进行覆盖？
      unableToCopyConfirm: 'Do you want to overwrite the existing data? The new process startup code is not equal to the original value. The I/O interface definition cannot be copied. Are you sure?', // 新的流程启动代码与原值不相等，无法复制输入输出界面定义，是否确认？
      noStartupProcess: 'No startup process', // 暂无启动流程
      contractNoMust: 'Long order contract, batch number is required', // 长单合同，批次编号为必选
      productCategoryMust: 'Commodity classification is required', // 商品分类为必选
      noListAttachment: 'Please upload the attachment information before submitting', // 请上传附件信息再提交
      confirmLogout: 'Disconnecting the account will affect the automatic acquisition of data. Do you want to disconnect?', // 账号断开将影响数据的自动获取，是否进行断开？
      confirmExercise: 'Are you sure to exercise?', // 确认行权吗？
      confirmPerformance: 'Confirm performance?', // 确认履约吗？
      confirmToGiveUp: 'Are you sure to give up?', // 确认放弃吗？
      chooseCurrency: 'Please select a currency', // 请选择币种
      confirmCancelAudit: 'Are you sure to return?', // 确认退审吗？
      confirmGenerateTransactionInfo: 'Confirm to generate transaction information?', // 确认生成往来信息？
      confirmRemoveTransactionInfo: 'Are you sure to delete the transaction information?', // 确认删除往来信息？
      confirmStockBeginOpen: 'Are you sure to generate inventory information?', // 确认生成库存信息？
      confirmFinish: 'Confirm termination?', // 确认终止？
      confirmCancelClose: 'Are you sure you want to cancel closing?', // 确认取消关闭？
      finishSuccess: 'Terminated successfully', // 终止成功
      cancelCloseSuccess: 'Cancel closing successfully', // 取消关闭成功
      dataFormatError: 'Incorrect data format', // 数据格式不正确
      pleaseSelect: 'Please select', // 请选择
      loadTradeSuccess: 'Successfully read the transaction', // 读取成交成功
      confirmTakeBack: 'Confirm withdrawal?', // 确认收回？
      takeBackSuccess: 'Withdrawal succeeded' // 收回成功
    },
    monInfo: {
      attribute: 'attribute', // 属性
      initialSize: 'Initial size', // 初始大小
      maxMemory: 'Maximum memory', // 最大内存
      usedMemory: 'Memory used', // 已用内存
      availableMemory: 'Available memory', // 可用内存
      monInfo: 'Home page' // 首页
    },
    monNode: {
      nodeName: 'Server name', // 服务器名称
      nodeIP: 'Server IP', // 服务器IP
      nodeEndpointURL: 'Monitoring URL', // 监控URL
      monNode: 'node', // 节点
      monInterval: 'Monitoring interval' // 监控间隔
    },
    monAlertSet: {
      nodeId: 'Node Id', // 节点Id
      alertName: 'entry name', // 项目名称
      key: 'Monitoring items', // 监控项目
      altValue: 'Alert Trigger Value', // 预警触发值
      altType: 'Trigger condition mode', // 触发条件模式
      minTriTime: 'Minimum trigger time', // 最短触发时间
      noticeUsers: 'Notify users', // 通知用户
      monAlertSet: 'Alert Settings' // 预警设置
    },
    mqLog: {
      messageId: 'Message ID', // 消息ID
      message: 'Message content', // 消息内容
      sendStatus: 'Posting status', // 投递状态
      sendTryCount: 'Number of deliveries', // 投递次数
      consumeStatus: 'Processing status', // 处理状态
      consumeTryCount: 'Processing times' // 处理次数
    },
    monApi: {
      userName: 'userName', // 用户名
      nowNum: 'Current Visits', // 当前访问次数
      userCode: 'User account', // 用户账号
      history: 'history' // 历史
    },
    validateMsg: {
      notBlank: 'Must be entered', // 必须输入
      requireSelect: 'Must be selected', // 必须选择
      ruleName: 'Name length is not greater than 128 bits', // 名称长度不大于128位
      ruleCode: 'Name length is not greater than 32 bits', // 名称长度不大于32位
      ruleRemark: 'Name length is not more than 500 characters', // 名称长度不大于500位
      update: 'Documents in approved and passed approval status cannot be modified', // 审批状态为审核中和已通过的单据不可以修改
      remove: 'Only documents in draft approval status can be deleted' // 只有审批状态为草拟的单据可以删除
    },
    attach: {
      title: 'enclosure', // 附件
      fileName: 'file name', // 文件名
      createDate: 'Upload date', // 上传日期
      createUser: 'Uploader', // 上传人
      attachmentType: 'Attachment type', // 附件类型
      remark: 'remarks' // 备注
    }
  }
}
