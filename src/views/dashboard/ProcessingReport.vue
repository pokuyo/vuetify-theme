<template>
  <div>
    <!-- <p class="text-2xl font-weight-semibold text--primary mb-2">마이페이지</p> -->
    <h4>처리현황</h4>
    <div>
      <v-simple-table class="myinfo-table">
        <tbody>
          <tr>
            <th>사전준비단계</th>
            <td @click="retrieveDetail">
              28건수
            </td>
          </tr>
          <tr>
            <th>가명처리단계</th>
            <td @click="retrieveDetail">
              57건수
            </td>
          </tr>
          <tr>
            <th>적정성검토단계</th>
            <td @click="retrieveDetail">
              78건수
            </td>
          </tr>
          <tr>
            <th>결합 및 추가처리</th>
            <td @click="retrieveDetail">
              120건수
            </td>
          </tr>
          <tr>
            <th>활용 및 사후처리</th>
            <td @click="retrieveDetail">
              84건수
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    retrieveDetail() {
      // this.$emit('retrieveDetail')
      // EventBus 사용시 동일 레벨간 이벤트 전달이 가능
      this.$EventBus.$emit('retrieveDetail')
    },
  },
}
</script>
