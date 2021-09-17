import { login } from '../../../api/authentication/auth'

export const loginModule = {

  // state
  state: {
    host: 'http://localhost:9000/api/user/signin',
    accessToken: null,
    refreshToken: null,
  },

  // mutation
  mutations: {
    SET_LOGIN(state, accessToken) {
      state.accessToken = accessToken
    },
    SET_LOGOUT(state, accessToken) {
      state.accessToken = accessToken
    },
  },

  // actions
  actions: {
    retrieveLogin({ commit }, params) {
      login(params)
        .then(response => {
          console.log(response)
          commit('SET_LOGIN')
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}

export default {
  loginModule,
}
