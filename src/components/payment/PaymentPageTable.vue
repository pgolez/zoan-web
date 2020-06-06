<template>
  <v-card>
    <v-card-title>Payments</v-card-title>
    <v-data-table
      :headers="headers"
      :items="payments"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <CreatePaymentModal />
        </v-toolbar>
      </template>

      <template v-slot:item.transactionDate="{ item }">
        <span>{{ item.transactionDate|formatDate }}</span>
      </template>

      <template v-slot:item.loan="{ item }">
        <v-chip v-if="item.loan.status === 'COMPLETE'" color="green" text-color="white">
          <v-avatar left>
            <v-icon>mdi-checkbox-marked-circle</v-icon>
          </v-avatar>
          {{ loanText(item.loan) }}
        </v-chip>

        <v-chip v-else color="red" texts-color="white" outlined>
          <v-avatar left>
            <v-icon left>mdi-label</v-icon>
          </v-avatar>
          {{ loanText(item.loan) }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>


<script>
import CreatePaymentModal from "./CreatePaymentModal";

export default {
  components: {
    CreatePaymentModal
  },
  props: {
    payments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sortBy: 'transactionDate',
      sortDesc: true,
      headers: [
        { text: "Transaction Date", sortable: true, value: "transactionDate" },
        { text: "Payer", sortable: true, value: "payer.name" },
        { text: "Amount Paid", sortable: true, value: "amount" },
        { text: "Loan", sortable: true, value: "loan" }
      ]
    };
  },
  methods: {
    loanText(loan) {
      const loanId = String(loan.id).padStart(5, "0");
      const fundName = loan.loaners.join(",");
      return `${loanId} (${fundName})`;
    }
  }
};
</script>
