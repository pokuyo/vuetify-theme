import axios from '@/plugins/axios'

function retrieveRiskList(params) {
  return axios.post('/api/datatable/retrieveRiskList', params)
}

export {
  // eslint-disable-next-line import/prefer-default-export
  retrieveRiskList,
}
