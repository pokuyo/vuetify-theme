import axios from '@/plugins/axios'
import router from '@/router'

function test(parmas) {
  return axios.post('/api/sample/requestdata', parmas)
    .catch(res => {
      if (res.status === 401) {
        console.log('auth res', res)
        router.push({ path: '/pages/login' })
      }
    })
}

export {
  // eslint-disable-next-line import/prefer-default-export
  test,
}
