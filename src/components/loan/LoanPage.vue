<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div>fucking breadcrumbs here</div>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col :cols="12">
        <DraftLoansSection
          :loans="draftLoans"
          @loan-created="appendLoan"
          @loan-activated="updateLoan"/>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col :cols="12">
        <ActiveLoansSection
          :loans="activeLoans"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DraftLoansSection from './LoanPageDraftLoansSection';
import ActiveLoansSection from './LoanPageActiveLoansSection';
import { LoanRepository } from "@/repositories/repository";

export default {
  components: {
    DraftLoansSection,
    ActiveLoansSection
  },
  data() {
    return {
      loans: []
    };
  },
  computed: {
    draftLoans() {
      return this.loans.filter( loan => loan.status === 'DRAFT')
    },
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
