export default {
  func: {
    org: {
      organ: 'Organ',
      organInfo: 'Organ Info', // 机构信息
      parentOrganName: 'Parent Name',
      organName: 'Organ Name', // 机构名称
      description: 'Description',
      organCodeNotBlank: 'Please enter organ code',
      organNameNotBlank: 'Please enter organ name',
      chooseOrgan: 'Please choose organ',
      organNameSizeTip: 'Length should be no more than 128',
      organCodeSizeTip: 'Length should be no more than 128',
      descriptionSizeTip: 'Length should be no more than 500',
      treeName: 'Organization', // 组织机构
      organCode: 'Institution Code', // 机构代码
      parentId: 'Parent Body', // 上级机构
      organNature: 'Character of structure', // 机构性质
      organAbbr: 'Mechanism Abbreviation', // 机构性质
      organFullName: 'Full name of organization', // 机构全称
      parentName: 'Parent Body', // 上级机构
      title: 'Rise', // 抬头
      address: 'Address', // 地址
      phone: 'Phone', // 电话
      fax: 'Fax', // 传真
      legalRepresentative: 'Legal Person', // 法人代表
      principal: 'Principal', // 负责人
      taxNumber: 'Taxpayer ID', // 纳税人识别号
      usingFlag: 'Status', // 状态
      zipCode: 'Zip Code', // 邮编
      isUsing: 'The enabled organization cannot be deleted' // 启用机构无法删除
    },
    api: {
      title: 'Interface Selection', // 接口选择
      apiUrl: 'URL', // URL
      apiCode: 'Permission Code', // 权限代码
      apiMemo: 'Interface Specifier'// 接口说明

    },
    dept: {
      banner: 'Department Management', // 部门管理
      deptInfo: 'Department Information', // 部门信息
      addDept: 'Create a department', // 创建部门
      updateDept: 'Update Department', // 更新部门
      viewDept: 'View Department', // 查看部门
      deptCode: 'View Department', // 部门代码
      deptName: 'Department Name', // 部门名称
      organId: 'Affiliated Institution', // 所属机构
      parentId: 'Parent business', // 上级部门
      businessNature: 'Business Nature', // 业务性质
      usingFlag: 'Status', // 状态
      organName: 'Affiliated Institution', // 所属机构
      parentName: 'Parent business', // 上级部门
      principal: 'Principal', // 负责人
      phone: 'Phone', // 电话
      fax: 'Fax', // 传真
      leader: 'The head of each division', // 分管领导
      department: 'Department'// 部门
    },
    employee: {
      warnTitle: 'Employee Data Setting', // 员工数据设置
      staff: 'Staff', // 员工
      banner: 'Personnel Management', // 员工管理
      staffCode: 'Employee Coding', // 员工编码
      staffName: 'Name', // 姓名
      organId: 'Affiliated Institution', // 所属机构
      deptId: 'Affiliated Institution', // 所属机构
      gender: 'Gender', // 性别
      type: 'Category', // 类别
      post: 'Position', // 职务
      title: 'Job Title', // 职称
      usingFlag: 'Status', // 状态
      birthday: 'Birthday', // 生日
      organName: 'Affiliated Institution', // 所属机构
      deptName: 'Department', // 所属部门
      entryDate: 'Commencement Date', // 入职日期
      education: 'Education', // 学历
      politicalStatus: 'Politics Status', // 政治面貌
      maritalStat: 'Marriage', // 婚姻
      profession: 'Major', // 专业
      birthplace: 'Birthplace', // 籍贯
      nationality: 'Nation', // 民族
      address: 'Address', // 住址
      mail: 'E-mail', // 邮箱
      phone: 'Phone', // 电话
      noAccount: 'If no account information is entered in the selected data, the password cannot be reset', // 选中数据没有填写账号信息，无法进行密码重置操作
      belongFunction: 'Subordinate Function', // 所属职能
      functionName: 'Functional Name', // 职能名称
      isUsing: 'Enable employees cannot be deleted', // 启用员工无法删除
      pattern: {
        account: 'The account consists of letters and numbers and must start with an English letter'// 账号只能由英文字母及数字组成，且首字母必须为英文字母
      }
    },
    role: {
      roleInfo: 'Role Info', // 角色信息
      roleName: 'Role Name', // 角色名称
      roleCode: 'Role Code', // 角色代码
      organId: 'Affiliated Institution', // 所属机构
      deptId: 'Department', // 所属部门
      dataperItem: 'Customer Code', // 客户代码
      usingFlag: 'Status', // 状态
      organName: 'Affiliated Institution', // 所属机构
      deptName: 'Department', // 所属部门
      remark: 'Department', // 所属部门
      staffSetting: 'Staffing', // 所属部门
      funcSetting: 'Function Permission Configuration', // 功能权限配置
      dataSetting: 'Data Permission Configuration', // 数据权限配置
      firstCategoryName: 'Primary Classification', // 一级分类
      secondCategoryName: 'Secondary Classification', // 二级分类
      moduleName: 'Function Module', // 功能模块
      operateNames: 'Operation', // 操作
      treeTitle: 'Treestat', // 树状结构
      listTitle: 'List Information', // 列表信息
      module: 'Function', // 功能
      operateName: 'Operation', // 操作
      allSelect: 'All', // 全选
      setting: 'Setting', // 设置
      businessData: 'Business Data', // 业务数据
      colNames: 'Item', // 数据项
      condNames: 'Constraint Satisfaction', // 条件约束
      moduleId: 'Business Data', // 业务数据
      colCode: 'Item', // 数据项
      condTypeId: 'Condition', // 条件
      condValue: 'Value', // 数据值
      copy: 'Copy', // 复制
      copySuccess: 'Copy Success', // 复制成功
      businessSetting: 'Owning service configuration', // 所属业务配置
      noVersion: 'Unpublished', // 未发布
      processVersion: 'Version', // 版本
      businessName: 'Business Name', // 业务名称
      enableFlg: 'Status', // 状态
      businessDesp: 'Service Description', // 业务说明
      authDirection: 'Directional Control', // 控制方向
      authLimit: 'Limit Setting', // 限制设置
      authExtend: 'Extended Setting', // 扩展设置
      custName: 'Customer Name', // 客户名称
      tab: {
        treeName: 'Organization', // 组织机构
        user: 'Operator', // 操作员
        func: 'Function Permission', // 功能权限
        org: 'Institutional authority', // 机构权限
        dept: 'Department authority', // 部门权限
        cust: 'Customer authority', // 客户权限
        employee: 'Employee authority', // 员工权限
        menuData: 'Menu Data Permission', // 菜单数据权限
        apiData: 'Interface Permission'// 接口权限
      },
      notBlank: {
        functionName: 'The function name cannot be empty', // 职能名称不能为空
        organId: 'The owning organization cannot be empty', // 所属机构不能为空
        usingFlag: 'The state cannot be empty'// 状态不能为空
      },
      maxLength: {
        functionName: 'The function name contains a maximum of 128 characters', // 职能名称最大长度不能超过128
        remark: 'Function Description The maximum length cannot exceed 500'// 职能说明最大长度不能超过500
      }
    },
    user: {
      userInfo: 'Role Info', // 角色信息
      name: 'Nickname', // 昵称
      account: 'System Account', // 系统账号
      password: 'System Password', // 系统密码
      failnum: 'Number of password errors', // 密码错误次数
      loginTime: 'Last Landing Time', // 上次登陆时间
      orgName: 'Organ Name', // 机构名称
      orgUsingFlag: 'Organ Status', // 机构状态
      deptUsingFlag: 'Department Status', // 部门状态
      employeeUsingFlag: 'Employee Status', // 员工状态
      deptName: 'Department Name', // 部门名称
      employeeName: 'Employee Name', // 员工名称
      roles: 'Role Info', // 角色信息
      identity: 'Operator Identity', // 操作员身份
      resetPassword: 'Reset Password', // 操作员身份
      resetSuccess: 'Password Reset Success', // 密码重置成功
      resetInfoP1: 'Confirm Reset', // 确认重置
      resetInfoP2: 'Is the default system password 123456', // 的系统密码为默认密码123456吗
      userValidPeriodFlag: 'User always valid', // 用户始终有效
      userValidPeriodDate: 'User validity period', // 用户有效期
      passwdValidPeriodFlag: 'Password is always valid', // 密码始终有效
      passwdValidPeriodDay: 'Password validity period'// 密码有效期
    },
    orgFunc: {
      funcTab: 'Function Permission'// 功能权限
    },
    approvalGroup: {
      groupSet: 'Set up the approval group', // 审批组设置
      form: {
        code: 'Approval Group Code', // 审批组代码
        name: 'Name of the approval group', // 审批组名称
        remark: 'Note', // 备注信息
        usingFlag: 'Status', // 状态
        groupCode: 'Approval Group Code'// 审批组代码
      },
      tab: {
        tabEmployee: 'Approval Team'// 审批组员
      },
      popup: {
        editEmployee: 'Editorial Team', // 编辑组员
        edit: 'Editing', // 编辑
        tabEmployee: 'Editing', // 编辑
        index: 'Summary'// 一览
      },
      group: {
        editEmployeePart1: '主信息'// 主信息
      },
      list: {
        code: 'Approval Group Code', // 审批组代码
        name: 'Name of the approval group', // 审批组名称
        remark: 'Note', // 备注信息
        usingFlag: 'Status', // 状态
        employeeCode: 'Staff', // 员工
        employeeName: 'Staff'// 员工
      }
    },
    delegate: {
      form: {
        groupCode: 'Approval Group', // 审批组
        takeBackFlag: 'Whether it has been recovered', // 是否已收回
        delegationEmployeeCode: 'Subgrantee'// 转授人
      },
      list: {
        groupName: 'Approver Group', // 审批组
        employeeName: 'Subgrantee', // 转授人
        delegateDate: 'Date of transfer', // 转授日期
        takeBackFlag: 'Whether it has been recovered', // 是否已收回
        takeBackDate: 'Recall Date'// 收回日期
      }
    }
  }
}
