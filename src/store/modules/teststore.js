import { login } from '../../api/authentication/auth'

const teststore = {
  // namespaced: true,

  // state
  state: {
    host: 'http://localhost:9000/api/user/signin',
    accessToken: null,
    refreshToken: null,
  },

  // mutation
  mutations: {
    SET_TEST(state, accessToken) {
      state.accessToken = accessToken
    },
  },

  // actions
  actions: {
    async retrieveTest({ commit }, payload) {
      login(payload)
        .then(response => {
          console.log(response)
          commit('SET_TEST')
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}

export default teststore
