<template>
  <v-container fluid>
    <v-row dense>
      <v-col :cols="4">
        <LoanerTable
          :loaners="loaners"/>
      </v-col>
      <v-col :cols="8">
        <LoanerDetails
          :loaner="selectedLoaner" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoanerTable from './LoanerPageTable'
import LoanerDetails from './LoanerPageDetails'

import { LoanerRepository } from '@/repositories/repository'

export default {
  components: {
    LoanerTable,
    LoanerDetails
  },
  data() {
    return {
      loaners: [],
      selectedLoaner: {}
    }
  },
  created() {
    this.fetchLoaners()
  },
  methods: {
    async fetchLoaners() {
      this.loaners = await LoanerRepository.list()
    }
  }
}
</script>
