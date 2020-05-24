<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div>fucking breadcrumbs here</div>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col :cols="12">
        <v-card>
          <v-card-title>Loans</v-card-title>
          <v-data-table :headers="headers" :items="activeLoans" class="elevation-1">
            <template v-slot:item.monthlyInterest="{ item }">
              <span>{{ `${item.monthlyInterest * 100}%` }}</span>
            </template>

            <template v-slot:item.paid_amount="{ item }">
              <v-progress-linear :value="loanProgress(item)" rounded color="red accent-4"></v-progress-linear>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoanRepository from "@/repositories/loan.repository";

export default {
  data() {
    return {
      headers: [
        { text: "Borrower", sortable: true, value: "borrower.name" },
        { text: "Date Loaned", sortable: true, value: "date_loaned" },
        { text: "Interest", sortable: true, value: "monthlyInterest" },
        { text: "# of Installments", sortable: true, value: "installmentCount" },
        { text: "Amount", sortable: true, value: "amount" },
        { text: "Status", sortable: true, value: "paid_amount" }
      ],
      loans: []
    };
  },
  computed: {
    activeLoans() {
      return this.loans.filter( loan => loan.status === 'ACTIVE')
    }
  },
  created() {
    this.fetchLoans();
  },
  methods: {
    async fetchLoans() {
      this.loans = await LoanRepository.list();
    },
    loanProgress(loan) {
      return (loan.paid_amount / loan.amount) * 100;
    }
  }
};
</script>
