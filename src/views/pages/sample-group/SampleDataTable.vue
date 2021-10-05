<template>
  <div>
    <v-row>
      <v-col cols="4">
        <p class="text-2xl mb-6">
          데이터 데이터 짜란짜란
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
          <v-card-title>위험도관리</v-card-title>
          <datatable
            :grid-headers="riskGridHeader"
            :grid-items="riskGridItems"
            :grid-default-items="riskGridDefaultItems"
            :loading="loading"
            :page="gridPage"
            :page-count="gridPageCount"
            :items-per-page="gridItemPerSize"
            @addDataRow="addRowRisk"
          >
          </datatable>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>위험도관리</v-card-title>
          <datatable
            :grid-headers="riskGridHeader"
            :grid-items="riskGridItems"
            :grid-default-items="riskGridDefaultItems"
            :loading="loading"
            :page="gridPage"
            :pagesize="gridPageCount"
            :items-per-page="gridItemPerSize"
          >
          </datatable>
        </v-card>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import { retrieveRiskList } from '@/api/sample/datatable'
import datatable from '@/components/ui-components/DataTableWIthEdit.vue'

// dropdown items 설정
function usable() {
  return ['Y', 'N']
}

export default {
  name: 'SampleDataTable',
  components: {
    // tableDialog,
    datatable,
  },
  data() {
    return {
      receiveData: {},

      // [S]RISK GRID
      riskGridHeader: [
        { text: '위험도 코드', align: 'center', value: 'RISK_CD', sortable: false },
        { text: '위험도 상위코드', align: 'center', value: 'UPPER_RISK_CD', sortable: false },
        { text: '위험도 내용', align: 'center', value: 'RISK_NM', sortable: false },
        { text: '위험도 비중', align: 'center', value: 'RISK_RELIMP', sortable: false },
        { text: '위험도 점수', align: 'center', value: 'RISK_PNT', sortable: false },
        { text: '자동매핑 적용', align: 'center', value: 'META_3', sortable: false },
        { text: '위험도 사용여부', align: 'center', value: 'USE_YN', sortable: false, dropdown: true, dropitems: usable() },
      ],

      riskGridItems: [],

      // test
      gridPage: 1,
      gridPageCount: 0,
      gridItemPerSize: 10,

      riskGridDefaultItems: {
        RISK_CD: '',
        UPPER_RISK_CD: '',
        RISK_NM: '',
        RISK_RELIMP: '',
        RISK_PNT: '',
        META_3: '',
        USE_YN: '',
      },

      // [E]RISK GRID
      loading: false,
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
          this.gridPageCount = response.data.RISK_LIST_COUNT

          // [e]paging test

          console.log(this.gridPage, this.gridPageCount)
          this.loading = false
          this.setTest()
        })
    },

    // ROW 추가
    addRowRisk() {
      console.log('sampleDataTable addRow in')

      // const addRowObject = { ...this.riskGridDefaultItems }
      // addRowObject.isNew = true
      // this.riskGridItems.unshift(addRowObject)
    },

    // ROW 삭제
    removeRowRisk() {
      console.log('removeRow')
    },

    // pageChangeHandle(page) {
    //   console.log('page', page)
    //   this.gridItemPerSize = page
    // },

    // TEST
    // open() {},
    // save() {},
    // cancel() {},
    // close() {},
  },
}
</script>
