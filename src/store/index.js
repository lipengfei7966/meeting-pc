import Vue from 'vue'
import Vuex from 'vuex'
import app from './frame/base/app'
import user from './frame/base/user'
import permission from './frame/base/permission'
import tagsView from './frame/base/tagsView'
import sys from './frame/base/sys'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    tagsView,
    sys,
    user
  },
  getters
})

export default store

