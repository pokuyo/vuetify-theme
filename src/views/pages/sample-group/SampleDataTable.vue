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
          >
          </datatable>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { retrieveRiskList } from '@/api/sample/datatable'
import datatable from '@/components/ui-components/DataTableWIthEdit.vue'

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
        {
          text: '삭제', align: 'center', value: 'RISK_CD', sortable: false,
        },
        {
          text: '위험도 코드', align: 'center', value: 'UPPER_RISK_CD', sortable: false,
        },
        {
          text: '위험도 상위코드', align: 'center', value: 'RISK_NM', sortable: false,
        },
        {
          text: '위험도 내용', align: 'center', value: 'RISK_RELIMP', sortable: false,
        },
        {
          text: '위험도 비중', align: 'center', value: 'RISK_PNT', sortable: false,
        },
        {
          text: '위험도 점수', align: 'center', value: 'META_3', sortable: false,
        },
        {
          text: '위험도 사용여부', align: 'center', value: 'USE_YN', sortable: false,
        },
      ],
      riskGridItems: [],
      riskGridDefaultItems: {
        RISK_CO: '1',
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
      retrieveRiskList()
        .then(response => {
          this.riskGridItems = response.data.RISK_LIST
          console.log(this.riskGridValues)
          this.loading = false
        })
    },

    // ROW 추가
    addRowRisk() {
      console.log('addRow')
      const addRowObject = { ...this.riskGridDefaultItems }
      addRowObject.isNew = true
      this.riskGridItems.unshift(addRowObject)
    },

    // ROW 삭제
    removeRowRisk() {
      console.log('removeRow')
    },

    // TEST
    // open() {},
    // save() {},
    // cancel() {},
    // close() {},
  },
}
</script>
