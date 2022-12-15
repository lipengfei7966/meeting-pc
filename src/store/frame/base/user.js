import { platLogin, userLogin, groupLogin, customLogin, guestLogin, login, logout, getInfo, getUser, getTitles, getMenus, getRoutes, getSubRoutes, switchTo, switchBack } from '@/api/frame/login'
import { listSelectData } from '@/api/frame/base/sys/data'
import { getMd5, setMd5, removeMd5, getToken, setToken, removeToken } from '@/utils/frame/base/auth'
import session from '@/utils/frame/base/sessionStorage'
import Vue from 'vue'
import { resetRouter } from '@/router'

const user = {
  state: {
    token: getToken(),
    md5: getMd5(),
    id: '',
    identity: '',
    activeFlag: '',
    name: '',
    tenantCodeHash: '',
    account: '',
    userDeptCode: '',
    userOrganCode: '',
    userEmployeeCode: '',
    avatar: '',
    currencyList: []
  },

  mutations: {

    SET_TOKEN(state, data) {
      state.token = data.accessToken
      state.md5 = data.md5Token
    },

    SET_ACCESS_TOKEN(state, accessToken) {
      state.token = accessToken
    },

    REMOVE_TOKEN: state => {
      state.token = ''
      state.md5 = ''
    },

    SET_ID(state, id) {
      state.id = id
    },

    SET_IDENTITY(state, identity) {
      state.identity = identity
    },

    SET_ACTIVE_FLAG(state, activeFlag) {
      state.activeFlag = activeFlag
    },

    SET_NAME(state, name) {
      state.name = name
    },

    SET_ACCOUNT(state, account) {
      state.account = account
    },

    SET_AVATAR(state, avatar) {
      state.avatar = avatar
    },

    SET_TENANT_CODE_HASH(state, tenantCodeHash) {
      state.tenantCodeHash = tenantCodeHash
    },

    SET_USER_ORGAN_CODE(state, userOrganCode) {
      state.userOrganCode = userOrganCode
    },

    SET_USER_DEPT_CODE(state, userDeptCode) {
      state.userDeptCode = userDeptCode
    },

    SET_USER_EMPLOYEE_CODE(state, userEmployeeCode) {
      state.userEmployeeCode = userEmployeeCode
    },

    SET_CURRENCY_LIST(state, list) {
      state.currencyList = list
    }

  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const data = response.data
            setToken(data.accessToken)
            setMd5(data.md5Token)
            commit('SET_TOKEN', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登录
    PlatLogin({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        platLogin(username, userInfo.password, userInfo.captcha, userInfo.captchaToken)
          .then(response => {
            const data = response.data
            setToken(data.accessToken)
            setMd5(data.md5Token)
            commit('SET_TOKEN', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登录
    UserLogin({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        userLogin(username, userInfo.password, userInfo.tenantHashCode, userInfo.captcha, userInfo.captchaToken, userInfo.enterpriseName)
          .then(response => {
            const data = response.data
            setToken(data.accessToken)
            setMd5(data.md5Token)
            commit('SET_TOKEN', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登录
    CustomLogin({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        customLogin(username, userInfo.password, userInfo.captcha, userInfo.captchaToken, userInfo.customCode, userInfo.customHashCode)
          .then(response => {
            const data = response.data
            setToken(data.accessToken)
            setMd5(data.md5Token)
            commit('SET_TOKEN', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 登录
    GroupLogin({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        groupLogin(username, userInfo.password, userInfo.captcha, userInfo.captchaToken)
          .then(response => {
            const data = response.data
            setToken(data.accessToken)
            setMd5(data.md5Token)
            commit('SET_TOKEN', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登录
    GuestLogin({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        guestLogin(username, userInfo.password, userInfo.captcha, userInfo.captchaToken, userInfo.eventHashCode)
          .then(response => {
            const data = response.data
            setToken(data.accessToken)
            setMd5(data.md5Token)
            commit('SET_TOKEN', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 切换身份
    SwitchTo({ commit }, account) {
      return new Promise((resolve, reject) => {
        switchTo(account)
          .then(response => {
            const data = response.data
            setToken(data)
            commit('SET_ACCESS_TOKEN', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 切回身份
    SwitchBack({ commit }) {
      return new Promise((resolve, reject) => {
        switchBack()
          .then(response => {
            const data = response.data
            setToken(data)
            commit('SET_ACCESS_TOKEN', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const { data } = response

            commit('SET_ID', data.id)
            commit('SET_ACTIVE_FLAG', data.activeFlag)
            commit('SET_NAME', data.name)
            commit('SET_ACCOUNT', data.account)
            commit('SET_USER_EMPLOYEE_CODE', data.userEmployeeCode)
            commit('SET_USER_DEPT_CODE', data.userDeptCode)

            commit('SET_USER_ORGAN_CODE', data.loginOrganCode)

            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetUser({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUser(state.token)
          .then(response => {
            const { data } = response
            commit('SET_ID', data.id)
            commit('SET_ACTIVE_FLAG', data.activeFlag)
            commit('SET_NAME', data.name)
            commit('SET_ACCOUNT', data.account)
            commit('SET_TENANT_CODE_HASH', data.tenantCodeHash)
            commit('SET_USER_EMPLOYEE_CODE', data.userEmployeeCode)
            commit('SET_USER_DEPT_CODE', data.userDeptCode)
            commit('SET_USER_ORGAN_CODE', data.loginOrganCode)

            commit('SET_IDENTITY', data.identity)
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取菜单信息
    GetMenus({ state }) {
      return new Promise((resolve, reject) => {
        getMenus(state.token)
          .then(response => {
            const { data } = response
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取路由信息
    GetRoutes({ state }) {
      return new Promise((resolve, reject) => {
        getRoutes(state.token)
          .then(response => {
            const { data } = response
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取路由信息
    GetSubRoutes({ state }) {
      return new Promise((resolve, reject) => {
        getSubRoutes(state.token)
          .then(response => {
            const { data } = response
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取标题信息
    GetTitles({ state }) {
      return new Promise((resolve, reject) => {
        getTitles(state.token)
          .then(response => {
            const { data } = response
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('REMOVE_TOKEN', '')
            removeToken()
            removeMd5()
            resetRouter()

            session.removeSet()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('REMOVE_TOKEN', '')
        removeToken()
        removeMd5()
        commit('SET_ID', '')
        commit('SET_ACTIVE_FLAG', '')
        commit('SET_NAME', '')
        commit('SET_ACCOUNT', '')
        commit('SET_USER_EMPLOYEE_CODE', '')
        commit('SET_USER_DEPT_CODE', '')
        commit('SET_USER_ORGAN_CODE', '')
        commit('SET_IDENTITY', '')
        resetRouter()

        session.removeSet()
        resolve()
      })
    },

    // 设置登录后选择的机构ID
    SetOrgan({ commit }, organId) {
      return new Promise((resolve, reject) => {
        commit('SET_LOGIN_ORGAN_ID', organId)
        resolve()
      })
    },

    // 获取币种名称
    GetCurrencyCode({ commit, state }, { funcModule, name }) {
      return new Promise(async (resolve, reject) => {
        if (state.currencyList.length === 0) {
          const { data } = await listSelectData({
            funcModule,
            funcOperation: '查询',
            data: {
              type: 'CURRENCY'
            }
          })
          commit('SET_CURRENCY_LIST', data)
          if (data.filter(item => item.name === name)[0]) {
            resolve(data.filter(item => item.name === name)[0].code)
          }
        } else {
          if (state.currencyList.filter(item => item.name === name)[0]) {
            resolve(state.currencyList.filter(item => item.name === name)[0].code)
          }
        }
      })
    },

    // 设置基础档案下拉选初始化数据
    SetBaseSelectList({ commit }, obj) {
      Vue.ls.set(obj.key, obj.value, 1 * 60 * 1000) // 有效5分钟
    },

    // 获取基础档案下拉选初始化数据
    GetBaseSelectList({ state }, key) {
      return Vue.ls.get(key)
    }
  }
}

export default user
