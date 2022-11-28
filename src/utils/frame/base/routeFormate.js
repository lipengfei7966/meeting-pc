import { Notification } from 'element-ui'
import { notifyError } from '@/utils/frame/base/notifyParams'
import Layout from '@/views/frame/layout/Layout'

export const formatRoutes = aMenu => {
  const aRouter = [
    {
      path: '',
      component: Layout,
      hidden: false,
      children: []
    }
  ]
  if (aMenu instanceof Array) {
    // if (process.env.NODE_ENV === 'production') {
    //   aMenu.forEach(oMenu => {
    //     if (oMenu.component) {
    //       const {
    //         name,
    //         componentName,
    //         path,
    //         meta,
    //         iframeFlag,
    //         reuseFlag
    //       } = oMenu
    //       let oRouter = {}
    //       meta.title = name
    //       let component

    //       if (asyncRoutes.filter(item => item.name === componentName)[0]) {
    //         component = asyncRoutes.filter(item => item.name === componentName)[0].component
    //       }
    //       if (component) {
    //         oRouter = {
    //           iframeFlag,
    //           reuseFlag,
    //           component,
    //           name,
    //           path,
    //           meta: meta
    //         }
    //         aRouter[0].children.push(oRouter)
    //       }
    //     }
    //   })
    // } else {
    aMenu.forEach(oMenu => {
      if (oMenu.component) {
        const { name, path, component, meta, iframeFlag, reuseFlag } = oMenu
        let oRouter = {}
        meta.title = name

        oRouter = {
          iframeFlag,
          reuseFlag,
          name,
          path,
          component(resolve) {
            if (component.includes('views/frame/base/')) {
              require([`@/views/frame/base/${component.split('views/frame/base/')[1]}.vue`], resolve, e => {
                Notification(
                  notifyError({
                    msg: `${component}找不到文件`
                  })
                )
              })
            } else if (component.includes('views/frame/dashboard/')) {
              require([`@/views/frame/dashboard/${component.split('views/frame/dashboard/')[1]}.vue`], resolve, e => {
                Notification(
                  notifyError({
                    msg: `${component}找不到文件`
                  })
                )
              })
            } else if (component.includes('views/frame/iframe/')) {
              require([`@/views/frame/iframe/${component.split('views/frame/iframe/')[1]}.vue`], resolve, e => {
                Notification(
                  notifyError({
                    msg: `${component}找不到文件`
                  })
                )
              })
            } else if (component.includes('views/frame/layout/')) {
              require([`@/views/frame/layout/${component.split('views/frame/layout/')[1]}.vue`], resolve, e => {
                Notification(
                  notifyError({
                    msg: `${component}找不到文件`
                  })
                )
              })
            } else if (component.includes('views/frame/login/')) {
              require([`@/views/frame/login/${component.split('views/frame/login/')[1]}.vue`], resolve, e => {
                Notification(
                  notifyError({
                    msg: `${component}找不到文件`
                  })
                )
              })
            } else if (component.includes('views/common/')) {
              require([`@/views/common/${component.split('views/common/')[1]}.vue`], resolve, e => {
                Notification(
                  notifyError({
                    msg: `${component}找不到文件`
                  })
                )
              })
            } else if (component.includes('views/frame/sys/')) {
              require([`@/views/frame/sys/${component.split('views/frame/sys/')[1]}.vue`], resolve, e => {
                Notification(
                  notifyError({
                    msg: `${component}找不到文件`
                  })
                )
              })
            } else if (component.includes('views/frame/website/')) {
              require([`@/views/frame/website/${component.split('views/frame/website/')[1]}.vue`], resolve, e => {
                Notification(
                  notifyError({
                    msg: `${component}找不到文件`
                  })
                )
              })
              // 0902
            } else if (component.includes('views/frame/biz/register/')) {
              require([`@/views/frame/biz/register/${component.split('views/frame/biz/register/')[1]}.vue`], resolve, e => {
                Notification(
                  notifyError({
                    msg: `${component}找不到文件`
                  })
                )
              })
              // 0902
            } else if (component.includes('views/frame/biz/custom/')) {
              require([`@/views/frame/biz/custom/${component.split('views/frame/biz/custom/')[1]}.vue`], resolve, e => {
                Notification(
                  notifyError({
                    msg: `${component}找不到文件`
                  })
                )
              })
              // 0902
            } else if (component.includes('views/frame/biz/func/')) {
              require([`@/views/frame/biz/func/${component.split('views/frame/biz/func/')[1]}.vue`], resolve, e => {
                Notification(
                  notifyError({
                    msg: `${component}找不到文件`
                  })
                )
              })
              // 0902
            } else {
              if (process.env.NODE_ENV === 'development') {
                if (component.includes('views/example/')) {
                  require([`@/views/example/${component.split('views/example/')[1]}.vue`], resolve, e => {
                    Notification(
                      notifyError({
                        msg: `${component}找不到文件`
                      })
                    )
                  })
                }
              }
            }
          },
          meta: meta
        }
        aRouter[0].children.push(oRouter)
      }
    })
    // }
  }

  return aRouter
}
