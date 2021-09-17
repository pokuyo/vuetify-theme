import axios from '@/plugins/axios'

function retrieveSampleData() {
  return axios.get('http://localhost:9000/api/sample/dashboardsample')
}

export {
  // eslint-disable-next-line import/prefer-default-export
  retrieveSampleData,
}
