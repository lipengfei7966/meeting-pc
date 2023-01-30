export default {
  website: {
    version: 'Version', // 版本
    unpublished: 'Unpublished', // 未发布
    eventInfo: {
      title: 'Conference Management ', // 会议管理
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
        mainLanguage: 'Main Language', // 主语言
        multiLanguage: 'Multi-language', // 多语言
        eventHashCode: 'Conference Hashing'// 会议哈希
      },
      btn: {
        design: 'Micro Station Design', // 微站设计
        set: 'Participants Coding Settings'// 参会人编码设置
      }
    },
    customlanguage:{
      title:'customlanguage',//自定义数据多语言设置
      query:{
        dictionariesId:'Dictionaries Id',//字典ID
        dataFunction:'Data Function',//功能
        superiorSettingId:'Superior SettingId',//上级设置ID
        settingItem:'Setting Item',//设置项
        dictionaryContent:'Dictionary Content'//字典内容
      },
      btn:{
        batchEditing:'Batch editing',//批量编辑
        edit:'Edit',//编辑
        cancel:'Cancel',//取消
        save:'Save',//保存
        export:'Export',//导出
        functionSet:'Function Set',//功能设置
      },
      list:{
        dataFunction:'Data Function',//功能
        module:'Module',//模块
        settingItem:'Setting item',//设置项
        simplifiedChinese:'Simplified Chinese',//中文简体
        english:'English',//英文
        hostLanguage:'Host language',//主语言
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
     atlas: {
       atlasTitle:"Atlas title",
       atlasIntroduction:"Atlas introduction",
       numberOfPictures:"Number of pictures",
       operation:"Operation",
       details:"Details",
       delete:"Delete",
       deletionConfirmation:"Deletion confirmation",
       deleteInformation:"After deletion, all images and information in the album will be deleted。",
       ConfirmDelete:"Please confirm whether to delete it？",
       determine:"Determine",
       cancel:"Cancel",
       save:"Save",
       deleting:"Deleting",
       deletSuccess:"Deleting the atlas succeeded",
       cancelDelete:"Cancel delete",
       add:{
         atlasAddition:"Atlas addition",
         save:"Save",
         saveSuccessfully:"Save successfully"
       },
       edit:{
         atlasEditor:"Atlas editor"
       }
     },
    atlasAndPicture:{
      editInformation:"Edit the brochure information",
      picture:{
        atlasDetails:"Atlas details",
        pictureInformation: "Picture information",
        searchInfo:"Please enter keywords to search for image descriptions",
        search:"Search",
        reset:"Reset",
        batchUpload:"Batch upload",
        addAPicture:"Add a picture",
        loading: 'Loading', // 加载中
        picture:"Picture",
        pictureDescription:"Picture description",
        clickEffect:"Click effect",
        imageClickEffect:'Image click effect',
        not:"Not",
        ViewEnlargedImage:"View enlarged image",
        skipColumn:"Skip column",
        OpenTheArticle:"Open the article",
        customLink:"Custom link",
        jumpPosition:"Jump position",
        language:"Language",
        operation:"Operation",
        edit:"edit",
        delete:"Delete",
        requireAtals:"Please enter the name of the album",
        saveSuccess: 'Save Success'
      },
      del:{
        delPrompt:"After deletion, the image will be deleted from the referenced page。",
        confirmDelete:'Please confirm whether to delete it？',
        delSuccess:"Image deleted successfully",

      }
    },
    pictureView:{
      loadFailure:"Load failure",
      reupload:"Reupload",
      clickUpload:"Click upload",
      editPicture:"Edit picture",
      addAPicture:"Add a picture",
      viewPictures:"查看图片",
      add:{
        seletLanguage:"Please select a language",
        selectImage:"Please select image click effect",
        uploading:"Uploading, please hold on",
        uploadSuccess:"Picture uploaded successfully",
        noPicture:"Please upload pictures",
        addSuccess:"Picture added successfully",
        addFail:"Picture editing success",
        batchUpload:"Batch upload success",
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
      },
      placeholder: {
        length: 'The minimum is 2 and the maximum is 16'
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
    },
    microStationDesign: {
      carouselGraphManagement: 'Carousel Graph Management', // 轮播图管理
      baseMapManagement: 'Base Map Management', // 底图管理
      TitleManagement: 'Title Management', // 标题管理
      moduleSetup: 'Module Setup', // 模块设置
      addModules: 'Add Modules', // 新增模块
      moduleAdd: 'Please select module to add/edit', // 请选择模块进行新增/编辑
      sharingSetting: 'Sharing Setting', // 分享设置
      microStationName: 'Name of micro station', // 微站名称
      enterMicroStationName: 'Please enter the name of the micro station', // 请输入微站名称
      micrositeLinks: 'Microsite Links', // 微站链接
      copyLink: 'Copy Link', // 复制链接
      return: 'Return', // 返回
      save: 'Save', // 保存
      accessPermission: 'Access Permission', // 访问权限
      siteAccessSettings: 'Site Access Settings', // 网站访问权限设置
      public: 'Public', // 公开
      usersOnly: 'Users Only', // 仅注册用户
      onlyApprovedusers: 'Only approved users are approved', // 仅审核通过用户
      someUsers: 'Some Users', // 部分用户
      cannotmoveup: 'Can not move up', // 无法上移
      cannotgodown: 'Can not go down', // 无法下移
      moveUpSuccess: 'Move Up Success', // 上移成功
      moveUpFail: 'Move Up Fail', // 上移失败
      downMoveSuccess: 'Down Move Success', // 下移成功
      downMoveFail: 'Down Move Fail', // 下移失败
      deleteSuccess: 'Delete Success', // 删除成功
      deleteFail: 'Delete Fail', // 删除失败
      updateSuccess: 'Update Success', // 修改成功
      updateFail: 'Update Fail', // 修改失败
      copySuccess: 'Copy Success', // 复制成功
      pleaseselectUser: 'Please select user', // 请选择用户
      saveSuccess: 'Save Success', // 保存成功
      chooseTemplate: 'Choose Template', // 选择模板
      reselectTheTemplate: 'Reselect the template', // 重新选择模板
      settingLanguage:'Setting language',//设置其他语言
      moreTemplatesExpect: 'More Templates Expect', // 更多模板 敬请期待
      PleaseSelectaTemplate: 'Please select a template!', // 请选择一个模板！
      noMoreTemplatesYet: 'No more templates yet!', // 暂无更多模板！
      clickUpload: 'Click Upload', // 点击上传
      deleteOruploading: 'Please delete the existing images before uploading', // 请删除已存在图片后再进行上传操作
      UploadPleaseWait: 'Upload, please wait...', // 上传中，请稍候...
      uploadedFileSuccess: 'Upload File Success', // 上传文件成功
      uploadedFileFail: 'Upload File Fail', // 上传文件失败
      pleaseUploadType: 'Please upload jpg, png, jpeg, psd type images', // 请上传jpg，png，jpeg，psd 类型的图片
      fileType: 'File Type', // 文件类型
      sort: 'Sort', // 排序
      fileName: 'File Name', // 文件名称
      selectFolder: 'Please select a folder', // 请选择文件夹
      picture: 'Picture', // 图片
      video: 'Video', // 视频
      ascendingUploadTime: 'Ascending by upload time', // 按上传时间升序
      DescendUploadTime: 'Descending order by upload time', // 按上传时间降序
      loading: 'Loading', // 加载中
      moduleTitle: 'Module Title', // 模块标题
      enterModuleTitle: 'Please enter a module title', // 请输入模块标题
      moduleType: 'Module Type', // 模块类型
      apply: 'In-site page', // 站内页面
      selectApply: 'Please select page', // 请选择站内页面
      selectmoduleType: 'Please select the module type', // 请选择模块类型
      selectThePage: 'Select the page', // 选择页面
      selectPage: 'Please select page', // 请选择页面
      backLink: 'Back Link', // 站外链接
      enterExternalLink: 'Please enter the external link', // 请输入站外链接
      backgroundSetting: 'Background Setting', // 背景设置
      default: 'Default', // 默认
      hide: 'Hide', // 隐藏
      custom: 'Custom', // 自定义
      icon: 'Icon', // 图标
      upload: 'Upload', // 上传
      onlyUploadType: 'Only jpeg/png/jpg/psd files can be uploaded', // 只能上传jpeg/png/jpg/psd文件
      selectMaterialLibrary: 'Select from the material library', // 从素材库选择
      add: 'Add', // 新增
      materialSelection: 'Material selection', // 素材选择
      canel: 'Canel', // 取 消
      confirm: 'Confirm', // 确 定
      inputModuleTitle: 'Please enter a module title', // 请输入模块标题
      inputModuleType: 'Please select the module type', // 请选择模块类型
      pleaseSelectPage: 'Please select page', // 请选择页面
      addSuccess: 'Add Success', // 新增成功
      mainHeading: 'Main Head', // 主标题
      subtitle: 'Subtitle', // 副标题
      enterMainHeading: 'Please enter a main title', // 请输入主标题
      lengthRanges: 'The length ranges from 2 to 100 characters', // 请输入主标题
      titleSaveSuccess: 'Title Save Success', // 请输入主标题
      titleSaveFail: 'Title Save Fail' // 请输入主标题
    }
  }
}
