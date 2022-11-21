import request from '@/utils/frame/base/request'

export function login(account, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      isEncrypt: true,
      funcModule: '登录页面',
      funcOperation: '登录',
      data: {
        'terminal': 'PC',
        'account': account,
        'password': password
      }
    }
  })
}
export function groupLogin(account, password, captcha, captchaToken) {
  return request({
    url: '/api/group/login',
    method: 'post',
    data: {
      funcModule: '登录页面',
      funcOperation: '登录',
      isEncrypt: true,
      data: {
        'terminal': 'PC',
        'account': account,
        'password': password,
        'captcha': captcha,
        'captchaToken': captchaToken
      }
    }
  })
}
export function guestLogin(account, password, captcha, captchaToken, eventHashCode) {
  return request({
    url: '/api/guest/login',
    method: 'post',
    data: {
      funcModule: '登录页面',
      funcOperation: '登录',
      // isEncrypt: true,
      data: {
        'terminal': 'PC',
        'account': account,
        'password': password,
        'eventHashCode': eventHashCode,
        'captcha': captcha,
        'captchaToken': captchaToken
      }
    }
  })
}
export function userLogin(account, password, tenantHashCode, captcha, captchaToken, enterpriseName) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: {
      isEncrypt: true,
      funcModule: '登录页面',
      funcOperation: '登录',
      data: {
        'terminal': 'PC',
        'tenantHashCode': tenantHashCode,
        'account': account,
        'password': password,
        'captcha': captcha,
        'captchaToken': captchaToken,
        'enterpriseName': enterpriseName
      }
    }
  })
}

export function customLogin(account, password, captcha, captchaToken, customCode) {
  return request({
    url: '/api/custom/login',
    method: 'post',
    data: {
      isEncrypt: true,
      funcModule: '登录页面',
      funcOperation: '登录',
      data: {
        'terminal': 'PC',
        'account': account,
        'password': password,
        'captcha': captcha,
        'captchaToken': captchaToken,
        'customCode': customCode,
        'customHashCode': '7019'
      }
    }
  })
}
export function platLogin(account, password, captcha, captchaToken) {
  return request({
    url: '/api/platform/login',
    method: 'post',
    data: {
      isEncrypt: true,
      funcModule: '登录页面',
      funcOperation: '登录',
      data: {
        'terminal': 'PC',
        'account': account,
        'password': password,
        'captcha': captcha,
        'captchaToken': captchaToken

      }
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user',
    method: 'post',
    data: {
      funcModule: '登录页面',
      funcOperation: '查询',
      data: '0'
    }
  })
}

export function getUser(token) {
  return request({
    url: '/api/user',
    method: 'post',
    data: {
      funcModule: '登录页面',
      funcOperation: '查询',
      data: '0'
    }
  })
}
export function getMenus(token) {
  return request({
    url: '/api/user/menus',
    method: 'post',
    data: {
      funcModule: '登录页面',
      funcOperation: '查询',
      data: '0'
    }
  })
}
export function getTitles(token) {
  return request({
    url: '/api/user/titles',
    method: 'post',
    data: {
      funcModule: '登录页面',
      funcOperation: '查询',
      data: '0'
    }
  })
}
export function getRoutes(token) {
  return request({
    url: '/api/user/routes',
    method: 'post',
    data: {
      funcModule: '登录页面',
      funcOperation: '查询',
      data: '0'
    }
  })
}
export function getSubRoutes(token) {
  return request({
    url: '/api/user/subRoutes',
    method: 'post',
    data: {
      funcModule: '登录页面',
      funcOperation: '查询',
      data: '0'
    }
  })
}
export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}

export function switchTo(account) {
  return request({
    url: '/api/switchTo',
    method: 'post',
    data: {
      data: {
        'account': account,
        'terminal': 'PC'
      }
    }
  })
}

export function switchBack() {
  return request({
    url: '/api/switchBack',
    method: 'post'
  })
}

