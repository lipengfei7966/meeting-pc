export default {
  website: {
    version: 'Version', // 版本
    unpublished: 'Unpublished', // 未发布
    eventInfo: {
      title: 'Conference Management', // 会议管理
      query: {
        eventName: 'Meeting Name', // 会议名称
        startDate: 'Meeting Start Date', // 会议开始日期
        endDate: 'Meeting End Date'// 会议结束时间
      },
      list: {
        eventCode: 'Conference Code', // 会议代码
        eventName: 'Meeting Name', // 会议名称
        customerName: 'Customer Name', // 客户名称
        startDate: 'Start Time', // 开始时间
        endDate: 'End Time', // 结束时间
        eventPlace: 'Activity Place', // 活动地点
        eventHashCode: 'Conference Hashing'// 会议哈希
      },
      edit: {
        eventName: 'Meeting Name', // 会议名称
        customerName: 'Customer Name', // 客户名称
        contactCode: 'Contact Person', // 联系人
        startDate: 'Start Time', // 开始时间
        endDate: 'End Time', // 结束时间
        eventPlace: 'Activity Place', // 活动地点
        eventDate: 'Meeting Time', // 会议时间
        eventHashCode: 'Conference Hashing'// 会议哈希
      },
      btn: {
        design: 'Micro Station Design', // 微站设计
        set: 'Participants Coding Settings'// 参会人编码设置
      }
    },
    article: {
      title: 'Conference Management', // 会议管理
      query: {
        articleName: 'Title of Article', // 文章名称
        articleTitle: 'Article Title', // 文章标题
        eventCode: 'Meeting Name'// 会议名称
      },
      list: {
        articleName: 'Title of Article', // 文章名称
        articleTitle: 'Article Title'// 文章标题
      },
      edit: {
        articleName: 'Title of Article', // 文章名称
        articleTitle: 'Article Title', // 文章标题
        articlePic: 'First Image', // 文章首图
        articleContent: 'Contents of Article'// 文章内容
      }
    },
    activityManagement: {
      title: 'Sub-activity Management', // 分活动管理
      // query: {
      //   articleName: '文章名称',
      //   articleTitle: '文章标题',
      //   eventCode: '会议名称'
      // },
      list: {
        aaa: 'Sub-activity Name', // 分活动名称
        bbb: 'Activity Time', // 活动时间
        ccc: 'Activity Status', // 活动状态
        ddd: 'Enabled', // 启用
        eee: 'Number of Participants/Upper Limit'// 报名人数/上限
      },
      edit: {
        articleName: 'Title of Article', // 文章名称
        articleTitle: 'Article Title', // 文章标题
        articlePic: 'First Image', // 文章首图
        articleContent: 'Contents of Article'// 文章内容
      }
    },
    customer: {
      title: 'Customer Management', // 客户管理
      code: 'Client code', // 客户编码
      hashCode: 'Customer Hashing', // 客户哈希
      name: 'Customer Name', // 客户名称
      shortName: 'ALTEK'// 客户简称
    },
    signupContact: {
      title: 'Participant Management', // 参会人管理
      query: {
        name: 'Name', // 姓名
        eventCode: 'Meeting Name', // 会议名称
        mobile: 'Mobile Phones', // 手机
        email: 'E-Mail', // 邮箱
        department: 'Units', // 单位
        code: 'Participants are coded', // 参会人编码
        personnelCode: 'Person Code', // 人员编码
        contactType: 'Type of participants', // 参会人类型
        certificateFlag: 'Status of application', // 办证状态
        signFlag: 'Registration Status', // 签到状态
        signNum: 'Number of check-ins', // 签到次数
        checkFlag: 'Status', // 状态
        createDate: 'Registration Time'// 报名时间
      },
      list: {
        name: 'Name', // 姓名
        surname: 'Surname', // 姓
        ming: 'Name', // 名
        sex: 'Gender', // 性别
        certificateType: 'ID Type', // 证件类型
        certificate: 'Certificate', // 证件
        photo: 'Photo', // 照片
        nations: 'Nation', // 国家
        province: 'Province', // 省份
        city: 'City', // 城市
        county: 'District/County', // 区/县
        fullAddress: 'Detailed address', // 详细地址
        postcode: 'Postcode', // 邮编
        mobileIntCode: 'International area code of mobile phone', // 手机国际区号
        mobile: 'Mobile Phone', // 手机
        spareMobileIntXode: 'Standby phone international code', // 备用手机国际区号
        spareMobile: 'Spare Phone', // 备用手机
        phoneIntCode: 'The international area code', // 电话国际区号
        phoneAreaCode: 'Area Code', // 电话区号
        phone: 'Telephone', // 电话
        phoneRunNumber: 'The telephone extension number', // 电话分机号
        faxIntCode: 'Fax international area code', // 传真国际区号
        faxAreaCode: 'Fax Area Code', // 传真区号
        fax: 'Fax', // 传真
        faxRunNumber: 'Fax extension number', // 传真分机号
        email: 'E-Mail', // 邮箱
        spareEmail: 'Secondary email', // 备用邮箱
        wechat: 'Wechat ID', // 微信号
        qq: 'QQ Number', // QQ号
        company: 'Company', // 公司
        department: 'Department', // 部门
        position: 'Position', // 职位
        code: 'Participants are coded', // 参会人编码
        personnelCode: 'Person Code', // 人员编码
        contactType: 'Type of participants', // 参会人类型
        certificateFlag: 'Status of application', // 办证状态
        signFlag: 'Registration Status', // 签到状态
        signNum: 'Number of check-ins', // 签到次数
        checkFlag: 'Status', // 状态
        createDate: 'Registration Time'// 报名时间
      },
      edit: {
        eventCode: 'Meeting Name', // 会议名称
        name: 'Name', // 姓名
        mobile: 'Mobile Phone', // 手机
        email: 'E-Mail', // 邮箱
        department: 'Units', // 单位
        code: 'Participants are coded', // 参会人编码
        contactType: 'Type of participants', // 参会人类型
        certificateFlag: 'Status of application'// 办证状态
      }
    },
    signupCertificate: {
      title: 'Certificate Management', // 办证管理
      query: {
        eventCode: 'Meeting Name', // 会议名称
        name: 'Name', // 姓名
        mobile: 'Mobile Phone', // 手机
        email: 'E-Mail', // 邮箱
        department: 'Units', // 单位
        code: 'Participants are coded', // 参会人编码
        contactType: 'Type of participants', // 参会人类型
        certificateFlag: 'Status of application', // 办证状态
        signFlag: 'Registration Status', // 签到状态
        signNum: 'Number of check-ins', // 签到次数
        checkFlag: 'Status', // 状态
        contactCode: 'Participants are coded', // 参会人编码
        personnelCode: 'Person Code', // 人员编码
        createDate: 'Registration Time'// 报名时间
      },
      list: {
        name: 'Name', // 姓名
        mobile: 'Mobile Phone', // 手机
        email: 'E-Mail', // 邮箱
        department: 'Units', // 单位
        code: 'Participants are coded', // 参会人编码
        personnelCode: 'Person Code', // 人员编码
        contactType: 'Type of participants', // 参会人类型
        certificateFlag: 'Status of application', // 办证状态
        certificateNum: 'Certificate Time', // 办证次数
        signFlag: 'Registration Status', // 签到状态
        signNum: 'Number of check-ins', // 签到次数
        checkFlag: 'Status', // 状态
        createDate: 'Registration Time'// 报名时间
      },
      edit: {
        eventCode: 'Meeting Name', // 会议名称
        name: 'Name', // 姓名
        mobile: 'Mobile Phone', // 手机
        email: 'E-Mail', // 邮箱
        department: 'Units', // 单位
        code: 'Participants are coded', // 参会人编码
        contactType: 'Type of participants', // 参会人类型
        certificateFlag: 'Status of application'// 办证状态
      }
    },
    signupCertificatePrint: {
      title: 'Management of certificate handling records', // 办证记录管理
      query: {
        certificateType: 'ID Type', // 证件类型
        eventCode: 'Meeting Name', // 会议名称
        name: 'Name', // 姓名
        mobile: 'Mobile Phone', // 手机
        email: 'E-Mail', // 邮箱
        department: 'Units', // 单位
        code: 'Participants are coded', // 参会人编码
        contactType: 'Type of participants', // 参会人类型
        signFlag: 'Registration Status', // 签到状态
        signNum: 'Number of check-ins', // 签到次数
        checkFlag: 'Status', // 状态
        contactCode: 'Participants are coded', // 参会人编码
        personnelCode: 'Person Code', // 人员编码
        createDate: 'Processing Time', // 办证时间
        certificateTime: 'Processing Time'// 办证时间
      },
      list: {
        name: 'Name', // 姓名
        mobile: 'Mobile Phone', // 手机
        email: 'E-Mail', // 邮箱
        department: 'Units', // 单位
        code: 'Participants are coded', // 参会人编码
        personnelCode: 'Person Code', // 人员编码
        contactType: 'Type of participants', // 参会人类型
        certificateFlag: 'Status of application', // 办证状态
        signFlag: 'Registration Status', // 签到状态
        signNum: 'Number of check-ins', // 签到次数
        checkFlag: 'Status', // 状态
        createDate: 'Processing Time', // 办证时间
        certificateTime: 'Processing Time'// 办证时间
      },
      edit: {
        eventCode: 'Meeting Name', // 会议名称
        name: 'Name', // 姓名
        mobile: 'Mobile Phone', // 手机
        email: 'E-Mail', // 邮箱
        department: 'Units', // 单位
        code: 'Participants are coded', // 参会人编码
        contactType: 'Type of participants', // 参会人类型
        certificateFlag: 'Status of application', // 办证状态
        certificateTime: 'Processing Time'// 办证时间
      }
    },
    signin: {
      query: {
        eventCode: 'Meeting Name', // 会议名称
        name: 'Name', // 姓名
        mobile: 'Mobile Phone', // 手机
        email: 'E-Mail', // 邮箱
        department: 'Units', // 单位
        contactCode: 'Participants are coded', // 参会人编码
        personnelCode: 'Person Code', // 人员编码
        contactType: 'Type of participants', // 参会人类型
        certificateFlag: 'Status of application', // 办证状态
        signFlag: 'Registration Status', // 签到状态
        signupData: 'Registration Time', // 报名时间
        signinDate: 'Sign In Time', // 签到时间
        signinWay: 'Sign In Method'// 签到方式
      }
    },
    signupSignin: {
      list: {
        name: 'Name', // 姓名
        mobile: 'Mobile Phone', // 手机
        email: 'E-Mail', // 邮箱
        department: 'Units', // 单位
        contactCode: 'Participants are coded', // 参会人编码
        personnelCode: 'Person Code', // 人员编码
        contactType: 'Type of participants', // 参会人类型
        signinStatus: 'Registration Status', // 签到状态
        signinDate: 'Sign In Time', // 签到时间
        signinWay: 'Sign In Method', // 签到方式
        sceneName: 'Scene Name', // 场景名称
        signupData: 'Registration Time', // 报名时间
        title: 'Add Attendees', // 添加参会人
        eventCode: 'Meeting Name', // 会议名称
        code: 'Participants are coded', // 参会人编码
        createDate: 'Registration Time'// 报名时间
      }
    },
    signupContactCol: {
      title: 'Form Management', // 表单管理
      query: {
        name: 'Name', // 姓名
        eventCode: 'Meeting Name'// 会议名称
      },
      list: {
        mapCode: 'Name', // 名称
        mapName: 'Display Name', // 显示名称
        mapComp: 'Component Type', // 组件类型
        mapBase: 'Component Attribution', // 组件归属
        mapCompAttr: 'Component Properties', // 组件属性
        enumLable: 'Dictionary Table Code', // 字典表code
        mapRequired: 'Required', // 必填
        mapType: 'Enabled', // 启用
        mapSort: 'Order'// 顺序
      },
      edit: {
        mapBase: 'Component Attribution', // 组件归属
        mapCompAttr: 'Component Properties', // 组件属性
        enumLable: 'Dictionary Table Code', // 字典表code
        eventCode: 'Meeting Name', // 会议名称
        mapCode: 'Name', // 名称
        mapName: 'Display Name', // 显示名称
        mapComp: 'Component Type', // 组件类型
        mapType: 'Enabled', // 启用
        mapRequired: 'Required', // 必填
        mapSort: 'Order'// 顺序
      }
    },
    department: {
      code: 'Customer organization Code', // 客户组织编码
      name: 'Client Organization Name', // 客户组织名称
      parentCode: 'The parent client organizes the code', // 父级客户组织编码
      parentName: 'Parent customer organization name', // 父级客户组织名称
      customerName: 'Customer Name', // 客户名称
      treeName: 'Customer', // 客户
      filterTips: 'Enter keywords to filter', // 输入关键字进行过滤
      reset: 'Reset', // 重置
      expand: 'Expand', // 展开
      fewer: 'Fewer', // 收起
      appList: 'AppList', // 应用列表
      customerOrganizationInformation: 'Customer Organization Information' // 客户组织信息
    },
    customerContact: {
      title: 'Customer Contact Management', // 客户联系人管理
      query: {},
      list: {
        code: 'Customer contact code', // 客户联系人编码
        name: 'Name', // 姓名
        mobile: 'Mobile Phone', // 手机
        phone: 'Telephone', // 电话
        mailbox: 'E-Mail', // 邮箱
        customer: 'Customer', // 客户
        company: 'Company', // 公司
        email: 'E-Mail', // 邮箱
        department: 'Department', // 部门
        createDate: 'Creation Time', // 创建时间
        updateDate: 'Update Time'// 更新时间
      },
      edit: {
        code: 'Customer contact code', // 客户联系人编码
        name: 'Name', // 姓名
        mobile: 'Mobile Phone', // 手机
        email: 'E-Mail', // 邮箱
        departmentCode: 'Department', // 部门
        customerCode: 'Customer'// 客户
      }
    },
    signupContactCodeRule: {
      edit: {
        eventName: 'Meeting Name', // 会议名称
        prefix: 'Prefix', // 前缀
        length: 'Length', // 长度
        type: 'Build Type', // 生成类型
        startCode: 'Start Code'// 起始码
      }
    },
    role: {
      roleInfo: 'Role Information', // 角色信息
      roleName: 'Role Name', // 角色名称
      roleCode: 'Role Code', // 角色代码
      customerName: 'Affiliated Customer', // 所属客户
      deptId: 'Affiliated Department', // 所属部门
      usingFlag: 'Status', // 状态
      organName: '所属机构', // 所属机构
      deptName: 'Affiliated Department', // 所属部门
      remark: 'Function Description', // 职能说明
      staffSetting: 'Staffing', // 人员配置
      funcSetting: 'Function permission configuration', // 功能权限配置
      dataSetting: 'Data permission configuration', // 数据权限配置
      firstCategoryName: 'One-level Classification', // 一级分类
      secondCategoryName: 'Secondary Classification', // 二级分类
      moduleName: 'Function Module', // 功能模块
      operateNames: 'Operation', // 操作
      treeTitle: 'Tree', // 树状结构
      listTitle: 'List Information', // 列表信息
      module: 'Function', // 功能
      operateName: 'Operation', // 操作
      allSelect: 'All', // 全选
      setting: 'Setting', // 设置
      businessData: 'Business Data', // 业务数据
      colNames: 'Data Item', // 数据项
      condNames: 'Constraint Satisfaction', // 条件约束
      moduleId: 'Business Data', // 业务数据
      colCode: 'Data Item', // 数据项
      condTypeId: 'Condition', // 条件
      condValue: 'Data Value', // 数据值
      copy: 'Copy', // 复制
      copySuccess: 'Copy Success', // 复制成功
      businessSetting: 'Business Configuration', // 所属业务配置
      noVersion: 'Unpublished', // 未发布
      processVersion: 'Version', // 版本
      businessName: 'Business Name', // 业务名称
      enableFlg: 'Status', // 状态
      businessDesp: 'Description of business', // 业务说明
      authDirection: 'Directional Control', // 控制方向
      authLimit: 'Limiting Setting', // 限制设置
      authExtend: 'Extended Setting', // 扩展设置
      tab: {
        treeName: 'Organizational Chart', // 组织机构
        user: 'Operator', // 操作员
        func: 'Function Permissions', // 功能权限
        customer: 'Customer Rights', // 客户权限
        customerDept: 'Client Organization permissions', // 客户组织权限
        employee: 'Employee Rights', // 员工权限
        menuData: 'Menu Data Permissions', // 菜单数据权限
        apiData: 'Interface Permissions'// 接口权限
      },
      notBlank: {
        functionName: 'The function name cannot be empty', // 职能名称不能为空
        organId: 'The affiliation cannot be empty', // 所属机构不能为空
        usingFlag: 'The state cannot be empty'// 状态不能为空
      },
      maxLength: {
        functionName: 'The maximum length of function names cannot exceed 128', // 职能名称最大长度不能超过128
        remark: 'The maximum length of the function description cannot exceed 500'// 职能说明最大长度不能超过500
      }
    },
    user: {
      userInfo: 'Role Information', // 角色信息
      name: 'Nickname', // 昵称
      account: 'System account number', // 系统账号
      password: 'System Password', // 系统密码
      failnum: 'Number of password errors', // 密码错误次数
      loginTime: 'Last login time', // 上次登陆时间
      customerName: 'Customer Name', // 客户名称
      employeeUsingFlag: 'Employee Status', // 员工状态
      customerDeptName: 'Client Organization Name', // 客户组织名称
      customerContactName: 'Customer Contact Person', // 客户联系人
      roles: 'Role Information', // 角色信息
      identity: 'Operator Identity', // 操作员身份
      resetPassword: 'Reset Password', // 重置密码
      resetSuccess: 'Reset Password Success', // 密码重置成功
      unlockSuccess: 'Unlock Success', // 解锁成功
      resetInfoP1: 'Confirm Reset', // 确认重置
      resetInfoP2: 'Is the default system password 123456', // 的系统密码为默认密码123456吗
      userValidPeriodFlag: 'The user is always valid', // 用户始终有效
      userValidPeriodDate: 'User Expiration Date', // 用户有效期
      passwdValidPeriodFlag: 'Password Always Valid', // 密码始终有效
      passwdValidPeriodDay: 'Password Expiration Date'// 密码有效期
    }
  }
}
