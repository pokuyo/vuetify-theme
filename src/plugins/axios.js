import axios from 'axios'

// axios.defaults.baseURL = ''

axios.interceptors.request.use(config => {
  console.log('■ request interceptor')
  console.log('config', config)

  return config
}, error => {
  console.log('■ request interceptor error')

  return Promise.reject(error)
})

// Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     console.log('■ request interceptor')
//     return response;
// }, function (error) {
//     console.log('■ request interceptor error')
//     return Promise.reject(error);
// });

export default axios
