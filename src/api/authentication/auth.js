import axios from '@/plugins/axios'

// import { httpSend } from '@/api'

// login
function login(params) {
  return axios.post('/api/user/signin', params)
}

export {
  // eslint-disable-next-line import/prefer-default-export
  login,
}
