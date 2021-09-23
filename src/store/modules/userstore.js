// // state
// const state = {
//   host: 'http://localhost:9000/api/user/signin',
//   accessToken: null,
//   refreshToken: null,
// }

// // mutation
// const mutations = {
//   // eslint-disable-next-line no-shadow
//   SET_LOGIN(state, accessToken) {
//     state.accessToken = accessToken
//   },
//   // eslint-disable-next-line no-shadow
//   SET_LOGOUT(state, accessToken) {
//     state.accessToken = accessToken
//   },
// }

// // actions
// const actions = {
//   retrieveLogin({ commit }, payload) {
//     console.log('RETRIEVE_LOGIN IN')
//     login(payload)
//       .then(response => {
//         console.log(response)
//         commit('SET_LOGIN')
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   },
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
// }

const userstore = {
  namespaced: true,

  // state
  state: {
    host: 'http://localhost:9000/api/user/signin',
    accessToken: null,
    refreshToken: null,
  },

  // mutation
  mutations: {
    setLogin(state, accessToken) {
      state.accessToken = accessToken
    },
    setLogout(state, accessToken) {
      state.accessToken = accessToken
    },
  },

  // actions
  actions: {
    async retrieveLogin({ commit }, payload) {
      console.log('▶ userstore payload', payload)
      commit('setLogin', payload)
    },
  },
}

export default userstore
