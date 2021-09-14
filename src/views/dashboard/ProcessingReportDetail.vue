<template>
  <div>
    <!-- <p class="text-2xl font-weight-semibold text--primary mb-2">마이페이지</p> -->
    <v-simple-table
      fixed-header
      height="300px"
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
          <td>{{ item.projectNo }}</td>
          <td>{{ item.projectStep }}</td>
          <td>{{ item.project }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
const tempList = [
  { projectNo: '0000-0001', projectStep: 200, project: '테스트데이터1' },
  { projectNo: '0000-0002', projectStep: 200, project: '테스트데이터2' },
  { projectNo: '0000-0003', projectStep: 200, project: '테스트데이터3' },
  { projectNo: '0000-0004', projectStep: 200, project: '테스트데이터4' },
  { projectNo: '0000-0005', projectStep: 200, project: '테스트데이터5' },
  { projectNo: '0000-0006', projectStep: 200, project: '테스트데이터6' },
  { projectNo: '0000-0007', projectStep: 200, project: '테스트데이터7' },
  { projectNo: '0000-0008', projectStep: 200, project: '테스트데이터8' },
  { projectNo: '0000-0009', projectStep: 200, project: '테스트데이터9' },
  { projectNo: '0000-0010', projectStep: 200, project: '테스트데이터10' },
]

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
      this.projectList = tempList
    },
  },
}
</script>
