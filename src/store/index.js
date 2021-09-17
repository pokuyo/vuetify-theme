import Vue from 'vue'
import Vuex from 'vuex'

import userStore from '@/store/module/auth/userStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore,
  },
})
