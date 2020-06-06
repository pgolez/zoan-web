<template>
  <v-card>
    <v-card-title>Loaners</v-card-title>
    <v-data-table
      :headers="headers"
      :items="loaners"
      :disable-pagination="true"
      :hide-default-footer="true"
      class="elevation-1">

      <template v-slot:item.name="{ item }">
        <v-avatar color="orange darken-4" size="40" class="mr-2">
          <span class="white--text text-center headline">
            {{ item.name|acronym }}
          </span>
        </v-avatar>
        <span class="text-right">{{ item.name }}</span>
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
import { LoanerRepository } from '@/repositories/repository'

export default {
  data() {
    return {
      headers: [
        { text: "Name", sortable: true, value: "name" },
        { text: "Amount in Loan", sortable: true, value: "amountLoaned" },
        { text: "Status", sortable: true, value: "status" },
      ],
      loaners: []
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
