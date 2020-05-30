<template>
        <v-card>
          <v-card-title>Loans</v-card-title>
          <v-data-table
            :headers="headers"
            :items="loans"
            class="elevation-1">

           <template v-slot:top>
              <v-toolbar flat color="white">
                <v-spacer></v-spacer>
                <CreateLoanModal
                  @loan-created="propagateLoanCreated"/>
              </v-toolbar>
            </template>

            <template v-slot:item.monthlyInterest="{ item }">
              <span>{{ `${item.monthlyInterest * 100}%` }}</span>
            </template>

            <template v-slot:item.dateCreated="{ item}">
              <span>{{ item.dateCreated|formatDate }}</span>
            </template>

            <template v-slot:item.amount="{ item }" class="text-right">
              <span>{{ item.amount|formatCurrency(2) }}</span>
            </template>

            <template v-slot:item.paid_amount="{ item }">
              <v-progress-linear
                v-if="item.status === 'ACTIVE'"
                :value="loanProgress(item)"
                rounded color="red accent-4">
              </v-progress-linear>
              <v-chip
                v-else
                small>
                {{ item.status }}
              </v-chip>
            </template>

            <template v-slot:item.installmentPayable="{ item }">
              <span>
                {{ computeInstallmentPayable(item)|formatCurrency(2) }}
              </span>
            </template>

            <template v-slot:item.options="{ item }">
              <ActivateLoanModal
                :loan="item"
                @loan-activated="propagateLoanActivated"/>
            </template>

          </v-data-table>
        </v-card>
</template>


<script>
import CreateLoanModal from './CreateLoanModal';
import ActivateLoanModal from './ActivateLoanModal';

export default {
  components: {
    CreateLoanModal,
    ActivateLoanModal
  },
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
        { text: "Amount", sortable: true, value: "amount" },
        { text: "Interest", sortable: true, value: "monthlyInterest" },
        { text: "# of Installments", sortable: true, value: "installmentCount" },
        { text: "Installment Payable", sortable: true, value: "installmentPayable" },
        { text: "Loan Date", sortable: true, value: "dateCreated" },
        { text: "Status", sortable: true, value: "paid_amount" },
        { text: "Options", value: 'options'}
      ],
      loan: {
        borrower: "",
        amount: null,
        installmentCount: 2,
        interestRate: 0.12,
      }
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
