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
            :grid-data="riskGridData"
            @movePage="movenext"
          >
          </datatable>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        align="right"
      >
        <v-btn
          color="primary"
          class="me-3"
          @click="retrieveEvaluation"
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
            평가지표 관리
          </v-card-title>
          <datatable
            ref="evaluationGrid"
            :grid-data="evaluationGridData"
            @movePage="movenext"
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
import datatable from '@/components/ui-components/DataTableWIthEditPaginationTest.vue'

// dropdown items 설정
function usable() {
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

      // [S]risk grid
      riskGridData: {
        // GRID header
        header: [
          { text: '위험도 코드', align: 'center', value: 'RISK_CD', width: '15%', sortable: false },
          { text: '위험도 상위코드', align: 'center', value: 'UPPER_RISK_CD', width: '15%', sortable: false },
          { text: '위험도 내용', align: 'center', value: 'RISK_NM', width: '25%', sortable: false },
          { text: '위험도 비중', align: 'center', value: 'RISK_RELIMP', width: '10%', sortable: false },
          { text: '위험도 점수', align: 'center', value: 'RISK_PNT', width: '10%', sortable: false },
          { text: '자동매핑 적용', align: 'center', value: 'META_3', sortable: false, width: '10%', dropdown: true, dropitems: usable(), defaultvalue: 'N' },
          { text: '위험도 사용여부', align: 'center', value: 'USE_YN', sortable: false, width: '10%', dropdown: true, dropitems: usable(), defaultvalue: 'N' },
        ],

        // GIRD body
        items: [],

        selectFlag: false, // GRID 선택(checkbox) 사용여부(default: false) : 미사용 시 선언 && 값 전달 제외
        multiSelectFlag: false, //  GRID 단일, 다중 선택 (single || multi select) : 미사용 시 선언 && 값 전달 제외 : TODO: 미작동

        // 조회 데이터 카운트
        dataCount: 0,

        // pagination
        page: 1,
        itemPerSize: 10,
      },

      // [S]test grid
      evaluationGridData: {
        header: [
          { text: '일이삼사', align: 'center', value: 'RISK_CD', width: '15%', sortable: false },
          { text: '위험도 상위코드2', align: 'center', value: 'UPPER_RISK_CD', width: '15%', sortable: false },
          { text: '위험도 내용2', align: 'center', value: 'RISK_NM', width: '25%', sortable: false },
          { text: '위험도 비중', align: 'center', value: 'RISK_RELIMP', width: '10%', sortable: false },
          { text: '위험도 점수', align: 'center', value: 'RISK_PNT', width: '10%', sortable: false },
          { text: '자동매핑 적용', align: 'center', value: 'META_3', sortable: false, width: '10%', dropdown: true, dropitems: usable(), defaultvalue: 'N' },
          { text: '위험도 사용여부', align: 'center', value: 'USE_YN', sortable: false, width: '10%', dropdown: true, dropitems: usable(), defaultvalue: 'N' },
        ],

        items: [],

        selectFlag: false,
        multiSelectFlag: false,

        page: 1,
        itemPerSize: 10,
      },

      loading: false,

      // ICON
      icons: { icon: mdiAlertDecagramOutline, name: 'mdiAlertDecagramOutline' },
    }
  },

  mounted() {
    this.$refs.riskGrid.init(this.riskGridData)
    this.$refs.evaluationGrid.init(this.evaluationGridData)
  },

  methods: {
    // 위험도관리 데이터 조회
    retrieveRisk() {
      this.loading = true

      const params = {
        page: this.riskGridData.page,
        pagePerSize: this.riskGridData.itemPerSize,
      }

      retrieveRiskList(params)
        .then(response => {
          console.log('response data: ', response)
          this.riskGridData.items = response.data.RISK_LIST
          this.riskGridData.dataCount = response.data.RISK_LIST_COUNT
          this.$refs.riskGrid.setItems(this.riskGridData)

          // console.log(this.gridPage, this.gridPageCount)
        })
    },

    // 평가지표 데이터 조회
    retrieveEvaluation() {
      this.loading = true

      const params = {
        page: this.evaluationGridData.page,
        pagePerSize: this.evaluationGridData.itemPerSize,
      }

      retrieveRiskList(params)
        .then(response => {
          console.log('response data: ', response)
          this.evaluationGridData.items = response.data.RISK_LIST
          this.evaluationGridData.dataCount = response.data.RISK_LIST_COUNT
          this.$refs.evaluationGrid.setItems(this.evaluationGridData)

          // console.log(this.gridPage, this.gridPageCount)
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

    movenext(data) {
      console.log('movePage', data)
      this.riskGridData.page = data
      this.retrieveRisk()
    },
  },
}
</script>
