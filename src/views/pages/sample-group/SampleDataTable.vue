<template>
  <div>
    <v-row>
      <v-col cols="4">
        <p class="text-2xl mb-6">
          위험도 관리
        </p>
      </v-col>
      <v-col
        cols="8"
        align="right"
      >
        <v-btn
          color="primary"
          class="me-3"
          @click="retrieveRisk"
        >
          <span>조회</span>
        </v-btn>
        <v-btn
          color="primary"
          class="me-3"
          @click="addRowRisk"
        >
          <span>신규</span>
        </v-btn>
        <v-btn
          color="primary"
          class="me-3"
          @click="removeRowRisk"
        >
          <span>삭제</span>
        </v-btn>
        <v-btn
          color="primary"
          class="me-2"
          @click="retrieveRisk"
        >
          <span>저장</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon size="30">
              {{ icons.icon }}
            </v-icon>
            위험도관리
          </v-card-title>
          <datatable
            ref="riskGrid"
            :grid-headers="riskGridHeader"
            :grid-items="riskGridItems"
            :show-select="gridSelectFlag"
            :single-select="gridSingleSelect"
            :page="gridPage"
            :page-count="gridPageCount"
            :items-per-page="gridItemPerSize"
          >
          </datatable>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiAlertDecagramOutline } from '@mdi/js'
import { retrieveRiskList } from '@/api/sample/datatable'
import datatable from '@/components/ui-components/DataTableWIthEdit.vue'

// dropdown items 설정
function usable() {
  // return ['Y', 'N']
  return [
    { name: '사용', value: 'Y' },
    { name: '미사용', value: 'N' },
  ]
}

export default {
  name: 'SampleDataTable',
  components: {
    datatable,
  },

  data() {
    return {
      receiveData: {},

      // [S]RISK GRID
      // GRID Header
      riskGridHeader: [
        { text: '위험도 코드', align: 'center', value: 'RISK_CD', width: '15%', sortable: false },
        { text: '위험도 상위코드', align: 'center', value: 'UPPER_RISK_CD', width: '15%', sortable: false },
        { text: '위험도 내용', align: 'center', value: 'RISK_NM', width: '30%', sortable: false },
        { text: '위험도 비중', align: 'center', value: 'RISK_RELIMP', width: '10%', sortable: false },
        { text: '위험도 점수', align: 'center', value: 'RISK_PNT', width: '10%', sortable: false },
        { text: '자동매핑 적용', align: 'center', value: 'META_3', sortable: false, width: '10%', dropdown: true, dropitems: usable() },
        { text: '위험도 사용여부', align: 'center', value: 'USE_YN', sortable: false, width: '10%', dropdown: true, dropitems: usable() },
      ],

      // GRID body
      riskGridItems: [],

      // pagination
      gridPage: 1,
      gridPageCount: 0,
      gridItemPerSize: 10,

      // GRID 선택(checkbox) 사용여부(default: false) : 미사용 시 선언 && 값 전달 제외
      gridSelectFlag: true,

      //  GRID 단일, 다중 선택 (single || multi select) : 미사용 시 선언 && 값 전달 제외
      gridSingleSelect: true,

      // [E]RISK GRID

      loading: false,

      // ICON
      icons: { icon: mdiAlertDecagramOutline, name: 'mdiAlertDecagramOutline' },
    }
  },

  methods: {
    // 데이터 조회
    retrieveRisk() {
      this.loading = true

      const params = {}
      params.page = this.gridPage
      params.pagePerSize = this.gridItemPerSize

      retrieveRiskList(params)
        .then(response => {
          console.log('testdata: ', response.data)
          this.riskGridItems = response.data.RISK_LIST

          // [s]paging test
          this.gridPage = 1
          console.log(response.data.RISK_LIST_COUNT, this.gridItemPerSize)
          this.gridPageCount = Math.ceil(response.data.RISK_LIST_COUNT / this.gridItemPerSize)
          console.log('retrieveRiskList', this.gridPage, this.gridPageCount)

          // const pageInfo = {}
          // pageInfo.curPage = this.gridPage
          // pageInfo.totPage = this.gridPageCount
          // this.$refs.riskGrid.setPageInfo(pageInfo)

          // [e]paging test

          console.log(this.gridPage, this.gridPageCount)
          this.loading = false
        })
    },

    // ROW 추가
    addRowRisk() {
      // grid component addRow() 함수 호출
      this.$refs.riskGrid.addRow()
    },

    // ROW 삭제
    removeRowRisk() {
      console.log('removeRow')
    },
  },
}
</script>
