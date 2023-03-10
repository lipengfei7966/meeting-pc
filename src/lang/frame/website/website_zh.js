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
        eventName: '会议名称',
        customerName: '客户名称',
        startDate: '开始时间',
        endDate: '结束时间',
        eventPlace: '活动地点'
      },
      edit: {
        eventName: '会议名称',
        customerName: '客户名称',
        contactCode: '联系人',
        startDate: '开始时间',
        endDate: '结束时间',
        eventPlace: '活动地点',
        eventDate: '会议时间'
      },
      btn: {
        design: '微站设计',
        set: '参会人编码设置'
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
    customer: {
      title: '客户管理',
      query: {
        name: '客户名称'
      },
      list: {
        name: '客户名称',
        shortName: '客户简称',
        customerCompanyName: '客户归属'
      },
      edit: {
        name: '客户名称',
        shortName: '客户简称',
        orgCode: '客户归属'
      }
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
      list: {
        code: '编码',
        name: '部门名称',
        parentCode: '部门父节点',
        customerCode: '客户',
        createDate: '创建时间'
      },
      edit: {
        name: '部门名称',
        parentCode: '部门父节点',
        customerCode: '客户'
      }
    },
    customerContact: {
      title: '客户联系人管理',
      query: {},
      list: {
        code: '客户联系人编码',
        name: '姓名',
        mobile: '手机',
        email: '邮箱',
        department: '部门',
        customer: '客户',
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
    }
  }
}
