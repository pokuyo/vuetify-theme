import Vue from 'vue'
import Vuex from 'vuex'

import userstore from './modules/userstore'

// import { login } from '../api/authentication/auth'

// TODO: store목록 미호출, 서버 기동시 항목 호출 개선 필요
// import modules from '@/store/modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  // modules,

  modules: {
    userstore,
  },
})

export default store
