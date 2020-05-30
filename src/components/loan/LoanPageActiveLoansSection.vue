<template>
  <v-card>
    <v-card-title>Active Loans</v-card-title>
    <v-data-table
      :headers="headers"
      :items="loans"
      class="elevation-1">

      <template v-slot:item.monthlyInterest="{ item }">
        <span>{{ `${item.monthlyInterest * 100}%` }}</span>
      </template>

      <template v-slot:item.dateCreated="{ item }">
        <span>{{ item.dateCreated|formatDate }}</span>
      </template>

      <template v-slot:item.amount="{ item }">
        <span class="text-right">{{ item.amount|formatCurrency(2) }}</span>
      </template>

      <template v-slot:item.paid_amount="{ item }">
        <v-progress-linear
          :value="loanProgress(item)"
          rounded color="red accent-4">
        </v-progress-linear>
      </template>

      <template v-slot:item.installmentPayable="{ item }">
        <span>
          {{ computeInstallmentPayable(item)|formatCurrency(2) }}
        </span>
      </template>
    </v-data-table>
  </v-card>
</template>


<script>
export default {
  props: {
    loans: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headers: [
        { text: "Borrower", sortable: true, value: "borrower.name" },
        { text: "Loan Amount", sortable: true, value: "amount" },
        { text: "Loan Date", sortable: true, value: "dateCreated" },
        { text: "# of Installments", sortable: true, value: "installmentCount" },
        { text: "Installment Payable", sortable: true, value: "installmentPayable" },
        { text: "Status", sortable: true, value: "paid_amount" },
      ]
    };
  },
  methods: {
    computeInstallmentPayable(loan) {
      const totalPayable = loan.amount * (1 + (loan.monthlyInterest * loan.installmentCount/2))
      return totalPayable / loan.installmentCount
    },
    loanProgress(loan) {
      return (loan.paid_amount / loan.amount) * 100;
    },
    loanStatusClassObject(loan) {
      if(loan.status == 'ACTIVE') {
        return 'red accent-4'
      }
    },
    propagateLoanCreated(loan) {
      this.$emit('loan-created', loan)
    },
    propagateLoanActivated(loan) {
      this.$emit('loan-activated', loan)
    }
  }
};
</script>
