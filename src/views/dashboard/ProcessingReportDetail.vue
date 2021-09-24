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
import { dashboardsample } from '@/api/dashboard/dashboard'

export default {
  data() {
    return {
      projectList: {},
    }
  },
  created() {
    this.retrieveProjectListByStep(200)

    // EventBus 사용시 동일 레벨간 이벤트 전달이 가능
    this.$EventBus.$on('retrieveDetail', () => {
      this.getData()
    })
  },
  methods: {
    retrieveProjectListByStep(stepCd) {
      console.log(stepCd)

      // this.projectList = tempList
    },
    getData() {
      console.log('getData')
      dashboardsample()
        .then(response => {
          console.log(response)
          if (response.data.result) {
            this.projectList = response.data.data.contents
          } else {
            this.projectList = {}
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    testdata() {
      console.log('message receive')
    },
  },
}
</script>
