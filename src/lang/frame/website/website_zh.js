export default {
  website: {
    version: '版本',
    unpublished: '未发布',
    eventInfo: {
      title: '会议管理',
      query: {
        eventName: '会议名称',
        startDate: '会议开始日期',
        endDate: '会议结束时间'
      },
      list: {
        eventCode: '会议代码',
        eventName: '会议名称',
        customerName: '客户名称',
        startDate: '开始时间',
        endDate: '结束时间',
        eventPlace: '活动地点',
        eventHashCode: '会议哈希'
      },
      edit: {
        eventName: '会议名称',
        customerName: '客户名称',
        contactCode: '联系人',
        startDate: '开始时间',
        endDate: '结束时间',
        eventPlace: '活动地点',
        eventDate: '会议时间',
        eventHashCode: '会议哈希'
      },
      btn: {
        design: '微站设计',
        set: '参会人编码设置'
      }
    },
    customlanguage:{
      title:'自定义数据多语言设置',
      query:{
        dictionariesId:'字典ID',
        dataFunction:'功能',
        superiorSettingId:'上级设置ID',
        settingItem:'设置项',
        dictionaryContent:'字典内容'
      },
      list:{
        
      }
    },
    article: {
      title: '会议管理',
      query: {
        articleName: '文章名称',
        articleTitle: '文章标题',
        eventCode: '会议名称'
      },
      list: {
        articleName: '文章名称',
        articleTitle: '文章标题'
      },
      edit: {
        articleName: '文章名称',
        articleTitle: '文章标题',
        articlePic: '文章首图',
        articleContent: '文章内容'
      }
    },
    activityManagement: {
      title: '分活动管理',
      // query: {
      //   articleName: '文章名称',
      //   articleTitle: '文章标题',
      //   eventCode: '会议名称'
      // },
      list: {
        aaa: '分活动名称',
        bbb: '活动时间',
        ccc: '活动状态',
        ddd: '启用',
        eee: '报名人数/上限'
      },
      edit: {
        articleName: '文章名称',
        articleTitle: '文章标题',
        articlePic: '文章首图',
        articleContent: '文章内容'
      }
    },
    customer: {
      title: '客户管理',
      code: '客户编码',
      hashCode: '客户哈希',
      name: '客户名称',
      shortName: '客户简称'
    },
    signupContact: {
      title: '参会人管理',
      query: {
        name: '姓名',
        eventCode: '会议名称',
        mobile: '手机',
        email: '邮箱',
        department: '单位',
        code: '参会人编码',
        personnelCode: '人员编码',
        contactType: '参会人类型',
        certificateFlag: '办证状态',
        signFlag: '签到状态',
        signNum: '签到次数',
        checkFlag: '状态',
        createDate: '报名时间'
      },
      list: {
        name: '姓名',
        surname: '姓',
        ming: '名',
        sex: '性别',
        certificateType: '证件类型',
        certificate: '证件',
        photo: '照片',
        nations: '国家',
        province: '省份',
        city: '城市',
        county: '区/县',
        fullAddress: '详细地址',
        postcode: '邮编',
        mobileIntCode: '手机国际区号',
        mobile: '手机',
        spareMobileIntXode: '备用手机国际区号',
        spareMobile: '备用手机',
        phoneIntCode: '电话国际区号',
        phoneAreaCode: '电话区号',
        phone: '电话',
        phoneRunNumber: '电话分机号',
        faxIntCode: '传真国际区号',
        faxAreaCode: '传真区号',
        fax: '传真',
        faxRunNumber: '传真分机号',
        email: '邮箱',
        spareEmail: '备用邮箱',
        wechat: '微信号',
        qq: 'QQ号',
        company: '公司',
        department: '部门',
        position: '职位',
        code: '参会人编码',
        personnelCode: '人员编码',
        contactType: '参会人类型',
        certificateFlag: '办证状态',
        signFlag: '签到状态',
        signNum: '签到次数',
        checkFlag: '状态',
        createDate: '报名时间'
      },
      edit: {
        eventCode: '会议名称',
        name: '姓名',
        mobile: '手机',
        email: '邮箱',
        department: '单位',
        code: '参会人编码',
        contactType: '参会人类型',
        certificateFlag: '办证状态'
      }
    },
    signupCertificate: {
      title: '办证管理',
      query: {
        eventCode: '会议名称',
        name: '姓名',
        mobile: '手机',
        email: '邮箱',
        department: '单位',
        code: '参会人编码',
        contactType: '参会人类型',
        certificateFlag: '办证状态',
        signFlag: '签到状态',
        signNum: '签到次数',
        checkFlag: '状态',
        contactCode: '参会人编码',
        personnelCode: '人员编码',
        createDate: '报名时间'
      },
      list: {
        name: '姓名',
        mobile: '手机',
        email: '邮箱',
        department: '单位',
        code: '参会人编码',
        personnelCode: '人员编码',
        contactType: '参会人类型',
        certificateFlag: '办证状态',
        certificateNum: '办证次数',
        signFlag: '签到状态',
        signNum: '签到次数',
        checkFlag: '状态',
        createDate: '报名时间'
      },
      edit: {
        eventCode: '会议名称',
        name: '姓名',
        mobile: '手机',
        email: '邮箱',
        department: '单位',
        code: '参会人编码',
        contactType: '参会人类型',
        certificateFlag: '办证状态'
      }
    },
    signupCertificatePrint: {
      title: '办证记录管理',
      query: {
        certificateType: '证件类型',
        eventCode: '会议名称',
        name: '姓名',
        mobile: '手机',
        email: '邮箱',
        department: '单位',
        code: '参会人编码',
        contactType: '参会人类型',
        signFlag: '签到状态',
        signNum: '签到次数',
        checkFlag: '状态',
        contactCode: '参会人编码',
        personnelCode: '人员编码',
        createDate: '办证时间',
        certificateTime: '办证时间'
      },
      list: {
        name: '姓名',
        mobile: '手机',
        email: '邮箱',
        department: '单位',
        code: '参会人编码',
        personnelCode: '人员编码',
        contactType: '参会人类型',
        certificateFlag: '办证状态',
        signFlag: '签到状态',
        signNum: '签到次数',
        checkFlag: '状态',
        createDate: '办证时间',
        certificateTime: '办证时间'
      },
      edit: {
        eventCode: '会议名称',
        name: '姓名',
        mobile: '手机',
        email: '邮箱',
        department: '单位',
        code: '参会人编码',
        contactType: '参会人类型',
        certificateFlag: '办证状态',
        certificateTime: '办证时间'
      }
    },
    signin: {
      query: {
        eventCode: '会议名称',
        name: '姓名',
        mobile: '手机',
        email: '邮箱',
        department: '单位',
        contactCode: '参会人编码',
        personnelCode: '人员编码',
        contactType: '参会人类型',
        certificateFlag: '办证状态',
        signFlag: '签到状态',
        signupData: '报名时间',
        signinDate: '签到时间',
        signinWay: '签到方式'
      }
    },
    signupSignin: {
      list: {
        name: '姓名',
        mobile: '手机',
        email: '邮箱',
        department: '单位',
        contactCode: '参会人编码',
        personnelCode: '人员编码',
        contactType: '参会人类型',
        signinStatus: '签到状态',
        signinDate: '签到时间',
        signinWay: '签到方式',
        sceneName: '场景名称',
        signupData: '报名时间',
        title: '添加参会人',
        eventCode: '会议名称',
        code: '参会人编码',
        createDate: '报名时间'
      }
    },
    signupContactCol: {
      title: '表单管理',
      query: {
        name: '姓名',
        eventCode: '会议名称'
      },
      list: {
        mapCode: '名称',
        mapName: '显示名称',
        mapComp: '组件类型',
        mapBase: '组件归属',
        mapCompAttr: '组件属性',
        enumLable: '字典表code',
        mapRequired: '必填',
        mapType: '启用',
        mapSort: '顺序'
      },
      edit: {
        mapBase: '组件归属',
        mapCompAttr: '组件属性',
        enumLable: '字典表code',
        eventCode: '会议名称',
        mapCode: '名称',
        mapName: '显示名称',
        mapComp: '组件类型',
        mapType: '启用',
        mapRequired: '必填',
        mapSort: '顺序'
      }
    },
    department: {
      code: '客户组织编码',
      name: '客户组织名称',
      parentCode: '父级客户组织编码',
      parentName: '父级客户组织名称',
      customerName: '客户名称',
      treeName: '客户',
      filterTips: '输入关键字进行过滤', // 输入关键字进行过滤
      reset: '重置', // 重置
      expand: '展开', // 展开
      fewer: '收起', // 收起
      appList: '应用列表', // 应用列表
      customerOrganizationInformation: '客户组织信息' // 客户组织信息
    },
    customerContact: {
      title: '客户联系人管理',
      query: {},
      list: {
        code: '客户联系人编码',
        name: '姓名',
        mobile: '手机',
        phone: '手机',
        mailbox: '邮箱',
        customer: '客户',
        company: '客户',
        email: '邮箱',
        department: '部门',
        createDate: '创建时间',
        updateDate: '更新时间'
      },
      edit: {
        code: '客户联系人编码',
        name: '姓名',
        mobile: '手机',
        email: '邮箱',
        departmentCode: '部门',
        customerCode: '客户'
      }
    },
    signupContactCodeRule: {
      edit: {
        eventName: '会议名称',
        prefix: '前缀',
        length: '长度',
        type: '生成类型',
        startCode: '起始码'
      }
    },
    role: {
      roleInfo: '角色信息',
      roleName: '角色名称',
      roleCode: '角色代码',
      customerName: '所属客户',
      deptId: '所属部门',
      usingFlag: '状态',
      organName: '所属机构',
      deptName: '所属部门',
      remark: '职能说明',
      staffSetting: '人员配置',
      funcSetting: '功能权限配置',
      dataSetting: '数据权限配置',
      firstCategoryName: '一级分类',
      secondCategoryName: '二级分类',
      moduleName: '功能模块',
      operateNames: '操作',
      treeTitle: '树状结构',
      listTitle: '列表信息',
      module: '功能',
      operateName: '操作',
      allSelect: '全选',
      setting: '设置',
      businessData: '业务数据',
      colNames: '数据项',
      condNames: '条件约束',
      moduleId: '业务数据',
      colCode: '数据项',
      condTypeId: '条件',
      condValue: '数据值',
      copy: '复制',
      copySuccess: '复制成功',
      businessSetting: '所属业务配置',
      noVersion: '未发布',
      processVersion: '版本',
      businessName: '业务名称',
      enableFlg: '状态',
      businessDesp: '业务说明',
      authDirection: '控制方向',
      authLimit: '限制设置',
      authExtend: '扩展设置',
      tab: {
        treeName: '组织机构',
        user: '操作员',
        func: '功能权限',
        customer: '客户权限',
        customerDept: '客户组织权限',
        employee: '员工权限',
        menuData: '菜单数据权限',
        apiData: '接口权限'
      },
      notBlank: {
        functionName: '职能名称不能为空',
        organId: '所属机构不能为空',
        usingFlag: '状态不能为空'
      },
      maxLength: {
        functionName: '职能名称最大长度不能超过128',
        remark: '职能说明最大长度不能超过500'
      }
    },
    user: {
      userInfo: '角色信息',
      name: '昵称',
      account: '系统账号',
      password: '系统密码',
      failnum: '密码错误次数',
      loginTime: '上次登陆时间',
      customerName: '客户名称',
      employeeUsingFlag: '员工状态',
      customerDeptName: '客户组织名称',
      customerContactName: '客户联系人',
      roles: '角色信息',
      identity: '操作员身份',
      resetPassword: '重置密码',
      resetSuccess: '密码重置成功',
      unlockSuccess: '解锁成功',
      resetInfoP1: '确认重置',
      resetInfoP2: '的系统密码为默认密码123456吗',
      userValidPeriodFlag: '用户始终有效',
      userValidPeriodDate: '用户有效期',
      passwdValidPeriodFlag: '密码始终有效',
      passwdValidPeriodDay: '密码有效期'
    },
    microStationDesign: {
      carouselGraphManagement: '轮播图管理', // 轮播图管理
      baseMapManagement: '底图管理', // 底图管理
      TitleManagement: '标题管理', // 标题管理
      moduleSetup: '模块设置', // 模块设置
      addModules: '新增模块', // 新增模块
      moduleAdd: '请选择模块进行新增/编辑', // 请选择模块进行新增/编辑
      sharingSetting: '分享设置', // 分享设置
      microStationName: '微站名称', // 微站名称
      enterMicroStationName: '请输入微站名称', // 请输入微站名称
      micrositeLinks: '微站链接', // 微站链接
      copyLink: '复制链接', // 复制链接
      return: '返回', // 返回
      save: '保存', // 保存
      accessPermission: '访问权限', // 访问权限
      siteAccessSettings: '网站访问权限设置', // 网站访问权限设置
      public: '公开', // 公开
      usersOnly: '仅注册用户', // 仅注册用户
      onlyApprovedusers: '仅审核通过用户', // 仅审核通过用户
      someUsers: '部分用户', // 部分用户
      cannotmoveup: '无法上移', // 无法上移
      cannotgodown: '无法下移', // 无法下移
      moveUpSuccess: '上移成功', // 上移成功
      moveUpFail: '上移失败', // 上移失败
      downMoveSuccess: '下移成功', // 下移成功
      downMoveFail: '下移失败', // 下移失败
      deleteSuccess: '删除成功', // 删除成功
      deleteFail: '删除失败', // 删除失败
      updateSuccess: '修改成功', // 修改成功
      updateFail: '修改失败', // 修改失败
      copySuccess: '复制成功', // 复制成功
      pleaseselectUser: '请选择用户', // 请选择用户
      saveSuccess: '保存成功', // 保存成功
      chooseTemplate: '选择模板', // 选择模板
      reselectTheTemplate: '重新选择模板', // 重新选择模板
      settingLanguage:'设置其他语言',//设置其他语言
      moreTemplatesExpect: '更多模板 敬请期待', // 更多模板 敬请期待
      PleaseSelectaTemplate: '请选择一个模板！', // 请选择一个模板！
      noMoreTemplatesYet: '暂无更多模板！', // 暂无更多模板！
      clickUpload: '点击上传', // 点击上传
      deleteOruploading: '请删除已存在图片后再进行上传操作', // 请删除已存在图片后再进行上传操作
      UploadPleaseWait: '上传中，请稍候...', // 上传中，请稍候...
      uploadedFileSuccess: '上传文件成功', // 上传文件成功
      uploadedFileFail: '上传文件失败', // 上传文件失败
      pleaseUploadType: '请上传jpg，png，jpeg，psd 类型的图片', // 请上传jpg，png，jpeg，psd 类型的图片
      fileType: '文件类型', // 文件类型
      sort: '排序', // 排序
      fileName: '文件名称', // 文件名称
      selectFolder: '请选择文件夹', // 请选择文件夹
      picture: '图片', // 图片
      video: '视频', // 视频
      ascendingUploadTime: '按上传时间升序', // 按上传时间升序
      DescendUploadTime: '按上传时间降序', // 按上传时间降序
      loading: '加载中', // 加载中
      moduleTitle: '模块标题', // 模块标题
      enterModuleTitle: '请输入模块标题', // 请输入模块标题
      moduleType: '模块类型', // 模块类型
      apply:'站内页面',//站内页面
      selectApply:'请选择站内页面',//请选择站内页面
      selectmoduleType: '请选择模块类型', // 请选择模块类型
      selectThePage: '选择页面', // 选择页面
      selectPage: '请选择页面', // 请选择页面
      backLink: '站外链接', // 站外链接
      enterExternalLink: '请输入站外链接', // 请输入站外链接
      backgroundSetting: '背景设置', // 背景设置
      default: '默认', // 默认
      hide: '隐藏', // 隐藏
      custom: '自定义', // 自定义
      icon: '图标', // 图标
      upload: '上传', // 上传
      onlyUploadType: '只能上传jpeg/png/jpg/psd文件', // 只能上传jpeg/png/jpg/psd文件
      selectMaterialLibrary: '从素材库选择', // 从素材库选择
      add: '新增', // 新增
      materialSelection: '素材选择', // 素材选择
      canel: '取 消', // 取 消
      confirm: '确 定', // 确 定
      inputModuleTitle: '请输入模块标题', // 请输入模块标题
      inputModuleType: '请选择模块类型', // 请选择模块类型
      pleaseSelectPage: '请选择页面', // 请选择页面
      addSuccess: '新增成功', // 新增成功
      mainHeading: '主标题', // 主标题
      subtitle: '副标题', // 副标题
      enterMainHeading: '请输入主标题', // 请输入主标题
      lengthRanges: '长度在 2 到 100 个字符', // 请输入主标题
      titleSaveSuccess: '标题保存成功', // 请输入主标题
      titleSaveFail: '标题保存失败' // 请输入主标题

    }
  }
}
