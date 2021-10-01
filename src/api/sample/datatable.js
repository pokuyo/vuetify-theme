import axios from '@/plugins/axios'

function retrieveRiskList() {
  return axios.post('/api/datatable/retrieveRiskList')
}

export {
  // eslint-disable-next-line import/prefer-default-export
  retrieveRiskList,
}
