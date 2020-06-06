<template>
  <v-container fluid>
    <v-row dense>
      <v-col :cols="showLoanerDetails ? 5 : 12">
        <LoanerTable
          :loaners="loaners"
          @loaner-selected="handleSelectedLoaner"/>
      </v-col>
      <v-col v-show="showLoanerDetails" :cols="7">
        <LoanerDetails
          :loaner="selectedLoaner" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoanerTable from './LoanerPageTable'
import LoanerDetails from './LoanerPageDetails'
import _ from 'lodash'

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
  computed: {
    showLoanerDetails() {
      return !_.isEmpty(this.selectedLoaner)
    }
  },
  created() {
    this.fetchLoaners()
  },
  methods: {
    async fetchLoaners() {
      this.loaners = await LoanerRepository.list()
    },
    handleSelectedLoaner(loaner) {
      this.selectedLoaner = loaner
    }
  }
}
</script>
