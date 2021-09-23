<template>
  <v-row>
    <v-col cols="12">
      <p class="text-2xl font-weight-semibold text--primary mb-2">
        마이페이지
      </p>
    </v-col>
    <v-col
      cols="12"
      md="3"
    >
      <user-profile></user-profile>
    </v-col>
    <v-col
      cols="12"
      md="3"
    >
      <processing-report></processing-report>
    </v-col>

    <v-col
      cols="12"
      sm="4"
      md="6"
    >
      <processing-report-detail></processing-report-detail>
    </v-col>

    <v-col cols="12">
      <dashboard-datatable></dashboard-datatable>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'

// demos
import UserProfile from './UserProfile.vue'
import ProcessingReport from './ProcessingReport.vue'
import ProcessingReportDetail from './ProcessingReportDetail.vue'
import DashboardDatatable from './DashboardDatatable.vue'

import * as test from '@/api/test/test'

export default {
  components: {
    UserProfile,
    ProcessingReport,
    ProcessingReportDetail,
    DashboardDatatable,
  },
  setup() {
    const totalProfit = {
      statTitle: 'Total Profit',
      icon: mdiPoll,
      color: 'success',
      subtitle: 'Weekly Project',
      statistics: '$25.6k',
      change: '+42%',
    }

    const totalSales = {
      statTitle: 'Refunds',
      icon: mdiCurrencyUsd,
      color: 'secondary',
      subtitle: 'Past Month',
      statistics: '$78',
      change: '-15%',
    }

    // vertical card options
    const newProject = {
      statTitle: 'New Project',
      icon: mdiLabelVariantOutline,
      color: 'primary',
      subtitle: 'Yearly Project',
      statistics: '862',
      change: '-18%',
    }

    const salesQueries = {
      statTitle: 'Sales Quries',
      icon: mdiHelpCircleOutline,
      color: 'warning',
      subtitle: 'Last week',
      statistics: '15',
      change: '-18%',
    }

    return {
      totalProfit,
      totalSales,
      newProject,
      salesQueries,
    }
  },
  created() {
    const params = {
      page: 1,
    }
    test.test(params)
  },
}
</script>
