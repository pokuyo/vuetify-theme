import axios from '@/plugins/axios'

// login
function login(params) {
  return axios.post('http://localhost:9000/api/user/signin', params)
}

export {
  // eslint-disable-next-line import/prefer-default-export
  login,
}
