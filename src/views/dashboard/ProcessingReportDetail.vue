<template>
  <div>
    <!-- <p class="text-2xl font-weight-semibold text--primary mb-2">마이페이지</p> -->
    <h4 @click="getData">
      처리현황 목록
    </h4>
    <v-simple-table
      fixed-header
      height="340px"
      class="myinfo-table"
    >
      <thead>
        <tr>
          <th>프로젝트번호</th>
          <th>단계</th>
          <th>프로젝트명</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in projectList"
          :key="item.projectNo"
        >
          <td>{{ item.projectno }}</td>
          <td>{{ item.projectstep }}</td>
          <td>{{ item.projectname }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
// eslint-disable-next-line import/named
import { requestdata } from '../../api/test/test'

// const tempList = [
//   { projectno: '0000-0001', projectstep: 200, projectname: '테스트데이터1' },
//   { projectno: '0000-0002', projectstep: 200, projectname: '테스트데이터2' },
//   { projectno: '0000-0003', projectstep: 200, projectname: '테스트데이터3' },
//   { projectno: '0000-0004', projectstep: 200, projectname: '테스트데이터4' },
//   { projectno: '0000-0005', projectstep: 200, projectname: '테스트데이터5' },
//   { projectno: '0000-0006', projectstep: 200, projectname: '테스트데이터6' },
//   { projectno: '0000-0007', projectstep: 200, projectname: '테스트데이터7' },
//   { projectno: '0000-0008', projectstep: 200, projectname: '테스트데이터8' },
//   { projectno: '0000-0009', projectstep: 200, projectname: '테스트데이터9' },
//   { projectno: '0000-0010', projectstep: 200, projectname: '테스트데이터10' },
// ]
export default {
  data() {
    return {
      projectList: {},
    }
  },
  created() {
    this.retrieveProjectListByStep(200)
  },
  methods: {
    retrieveProjectListByStep(stepCd) {
      console.log(stepCd)

      // this.projectList = tempList
    },
    getData() {
      console.log('getData')
      requestdata()
        .then(response => {
          console.log(response)
          this.projectList = response.data.data.contents
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
