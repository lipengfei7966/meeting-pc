import router, { resetRouter } from '@/router'
import store from './store'
import i18n from '@/lang/index' // Internationalization

import { Notification, Message } from 'element-ui'
import { notifyError } from '@/utils/frame/base/notifyParams'

// frame路由
import zhFrameRoute from '@/lang/frame/base/modules/route_zh'
import enFrameRoute from '@/lang/frame/base/modules/route_en'

// proj路由

import session from '@/utils/frame/base/sessionStorage'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getToken, setToken, isExpired, getLoginUrl } from '@/utils/frame/base/auth' // 验权

const whiteList = ['/platform/login', '/old/login', '/group/login', '/user/login', '/custom/login', '/guest/login', '/login', '/401', '/404'] // 不重定向白名单
const logninList = ['/login', '/platform/login', '/old/login', '/group/login', '/user/login', '/custom/login', '/guest/login'] // 不重定向白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (to.query.token) {
    setToken(to.query.token)
    store.commit('SET_ACCESS_TOKEN', to.query.token)
  }
  const userRegex = '^/[A-Za-z0-9]*/login$'
  const userRegUrl = new RegExp(userRegex, 'i')

  const customRegex = '^/custom/[A-Za-z0-9]*/login$'
  const customRegUrl = new RegExp(customRegex, 'i')

  if (getToken()) {
    // 登陆页面
    if ((logninList.indexOf(to.path) !== -1) || customRegUrl.test(to.path) || userRegUrl.test(to.path)) {
      if (isExpired()) {
        await store.dispatch('FedLogOut')
        Notification(notifyError({
          msg: '验证过期，重新登陆'
        }))
        next(getLoginUrl())
      } else {
        const loginType = session.get('loginType')
        if (loginType === 'custom' && to.path === '/custom/login') {
          // plat 匹配
          next(from.path)
        } else if (loginType === 'custom' && session.get('customHashCode') && to.path === '/custom/' + session.get('customHashCode') + '/login') {
          // user 租户匹配
          next(from.path)
        } else if (loginType === 'guest' && to.path === '/guest/login') {
          // plat 匹配
          next(from.path)
        } else if (loginType === 'plat' && to.path === '/platform/login') {
          // plat 匹配
          next(from.path)
        } else if (loginType === 'group' && to.path === '/group/login') {
          // group 匹配
          next(from.path)
        } else if (loginType === 'user' && (to.path === '/user/login' || to.path === '/login')) {
          // user 匹配
          next(from.path)
        } else if (loginType === 'user' && session.get('tenantHashCode') && to.path === '/' + session.get('tenantHashCode') + '/login') {
          // user 租户匹配
          next(from.path)
        } else {
          // 登陆不匹配
          await store.dispatch('FedLogOut')
          await store.dispatch('delAllViews')
          Notification(notifyError({
            msg: '正在切换登陆用户...'
          }))
          next(to.path)
        }
      }
      NProgress.done()
    } else {
      try {
        // 用户是否登陆的判断
        const account = store.getters.account || ''
        if (account.length < 1) {
          if (isExpired()) {
            await store.dispatch('FedLogOut')
            Notification(notifyError({
              msg: '验证过期，重新登陆'
            }))
            next(getLoginUrl())
          } else {
            // 取得用户信息
            const userInfo = await store.dispatch('GetUser')
            // 初始化字典、物资属性字段取得和 初始化路由
            await Promise.all([
              store.dispatch('GetMenus').then((data) => {
                userInfo['menus'] = data.menus
              }),
              store.dispatch('GetRoutes').then((data) => {
                userInfo['routes'] = data.routes
              }),
              // store.dispatch('GetSubRoutes').then((data) => {
              //   userInfo['subRoutes'] = data.subRoutes
              // }),
              store.dispatch('GetTitles').then((data) => {
                // 初始化路由多语言
                initRouteName(data.titleCNameMap, data.titleENameMap)
              }),
              store.dispatch('initData'),
              store.dispatch('initDataDict')
            ])
            await store.dispatch('NewGenerateRoutes', userInfo)

            resetRouter()
            // 根据功能权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            // 提醒上次登陆时间
            if (userInfo && userInfo.lastLoginTime) {
              Message({
                message: '上次登陆时间:' + userInfo.lastLoginTime,
                type: 'warning',
                showClose: true
              })
            }
            next({
              ...to,
              replace: true
            })
          }
        } else {
          if (isExpired()) {
            // Token失效临时刷新Token保留页面
            if ($('#relogin-dialog').length) {
              if ($('#relogin-dialog').is(':hidden')) {
                $('#relogin-dialog').show()
                next({
                  ...from
                })
                NProgress.done()
              }
            }
          } else {
            if (to.meta) {
              if (to.meta.subMenuFlag && to.meta.subMenuFlag === '1') {
                if (!to.params || typeof to.params === {} || Object.keys(to.params).length === 0) {
                  next({
                    path: '/401',
                    replace: true
                  })
                }
              }
              session.set('permissionButtons', to.meta.buttons)
              session.set('bpmModule', to.meta.bpmModule || '')
              session.set('bizCode', to.meta.bizCode)
              session.set('seqMode', to.meta.seqMode)
            } else {
              session.set('permissionButtons', [])
              session.set('bpmModule', '')
              session.set('bizCode', '')
              session.set('seqMode', '')
            }
            session.set('errorMsgId', '')

            next()
          }
        }
      } catch (error) {
        console.error(error)
        NProgress.done()
        await store.dispatch('FedLogOut')
        Notification(notifyError({
          msg: '初始化失败，重新登陆'
        }))
        next(getLoginUrl())
      }
    }
  } else {
    if ((whiteList.indexOf(to.path) !== -1) || customRegUrl.test(to.path) || userRegUrl.test(to.path)) {
      next()
    } else {
      // 跳转
      next(getLoginUrl())
      NProgress.done()
    }
  }
})

router.afterEach((to, from, next) => {
  NProgress.done() // 结束Progress
})

/**
 * 初始化路由多语言
 * @param {*} titleCNameMap
 * @param {*} titleENameMap
 */
function initRouteName(titleCNameMap, titleENameMap) {
  // 路由多语言
  const zhRoute = {
    route: {
      ...zhFrameRoute,
      ...titleCNameMap
    }
  }
  // 路由多语言
  const enRoute = {
    route: {
      ...enFrameRoute,
      ...titleENameMap
    }
  }
  // 路由多语言
  i18n.mergeLocaleMessage('en', enRoute)
  i18n.mergeLocaleMessage('zh', zhRoute)
}
