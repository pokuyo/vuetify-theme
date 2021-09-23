import axios from 'axios'

const stoarge = window.sessionStorage
const prefix = 'Bearer '

// request interceptor
axios.interceptors.request.use(config => {
  console.log('■ request interceptor ----------[S]')
  console.log('config', config)

  // eslint-disable-next-line no-alert
  console.log('get authorization :: ', stoarge.getItem('authorization'))

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = prefix + stoarge.getItem('authorization')

  console.log('▶ interceptor config', config)

  console.log('■ request interceptor ----------[E]')

  return config
}, error => {
  console.log('■ request interceptor error')

  return Promise.reject(error)
})

// response interceptor
axios.interceptors.response.use(response => {
  console.log('■ response interceptor ----------[S]')
  console.log('▶ interceptor response', response)
  // eslint-disable-next-line no-alert
  console.log('set authorization :: ', response.headers.authorization)
  stoarge.setItem('authorization', response.headers.authorization)
  console.log('■ response interceptor ----------[E]')

  return response
}, error => {
  console.log('■ request interceptor error', error)

  return Promise.reject(error.response)
})

export default axios
