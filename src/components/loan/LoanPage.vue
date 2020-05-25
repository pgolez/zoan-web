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
          <v-data-table :headers="headers" :items="draftLoans" class="elevation-1">

           <template v-slot:top>
            <v-toolbar flat color="white">
              <v-spacer></v-spacer>
              <CreateLoanModal @loan-created="appendLoan" />
            </v-toolbar>

          </template>
            <template v-slot:item.monthlyInterest="{ item }">
              <span>{{ `${item.monthlyInterest * 100}%` }}</span>
            </template>

            <template v-slot:item.amount="{ item }">
              <span>{{ item.amount }}</span>
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

            <template v-slot:item.options="{ item }">
              <ActivateLoanModal :loan="item" @loan-activated="updateLoan" />
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateLoanModal from './CreateLoanModal';
import ActivateLoanModal from './ActivateLoanModal';
import { LoanRepository } from "@/repositories/repository";

export default {
  components: {
    CreateLoanModal,
    ActivateLoanModal
  },
  data() {
    return {
      headers: [
        { text: "Borrower", sortable: true, value: "borrower.name" },
        { text: "Loan Date", sortable: true, value: "date_loaned" },
        { text: "Interest", sortable: true, value: "monthlyInterest" },
        { text: "# of Installments", sortable: true, value: "installmentCount" },
        { text: "Amount", sortable: true, value: "amount" },
        { text: "Status", sortable: true, value: "paid_amount" },
        { text: "Options", value: 'options'}
      ],
      loans: [],
      loan: {
        borrower: "",
        amount: null,
        installmentCount: 2,
        interestRate: 0.12,
      },
      activateDialog: false
    };
  },
  computed: {
    draftLoans() {
      return this.loans.filter( loan => loan.status === 'DRAFT')
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
    },
    loanStatusClassObject(loan) {
      if(loan.status == 'ACTIVE') {
        return 'red accent-4'
      }
    },
    appendLoan(loan) {
      this.loans.push(loan)
    },
    updateLoan(activatedLoan) {
      const targetLoan = this.loans.find(e => { return e.id === activatedLoan.id });

      targetLoan.borrower = activatedLoan.borrower
      targetLoan.amount = activatedLoan.amount
      targetLoan.installmentCount= activatedLoan.installmentCount
      targetLoan.monthlyInterest= activatedLoan.monthlyInterest
      targetLoan.fund = activatedLoan.fund
      targetLoan.status = activatedLoan.status
    }
  }
};
</script>
