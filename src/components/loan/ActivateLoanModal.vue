<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn
          color="success"
          v-on="on"
          small>
          Activate
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Activate Loan</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <FundSelect @change="changeFund"></FundSelect>
            </v-container>
          </v-form>
        </v-card-text>
      <v-card-actions class="pb-6 pr-6">
          <v-spacer></v-spacer>
          <v-btn outlined text @click="cancel">Cancel</v-btn>
          <v-btn color="primary" @click="activateLoan">Activate</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import FundSelect from './LoanFormFundSelect'
import { LoanRepository } from '@/repositories/repository'

export default {
  components: {
    FundSelect
  },
  props: {
    loan: {}
  },
  data() {
    return {
      dialog: false,
      fundId: null
    }
  },
  methods: {
    changeFund(id) {
      this.fundId = id
    },
    resetData() {
      this.fundId = null
    },
    close() {
      this.resetData();
      this.dialog = false;
    },
    cancel() {
      this.close()
    },
    async activateLoan() {
      const data = {
        id: this.loan.id,
        borrowerId: this.loan.borrower.id,
        amount: this.loan.amount,
        monthlyInterest: this.loan.monthlyInterest,
        installmentCount: this.loan.installmentCount,
        fundId: this.fundId
      }
      const loan = await LoanRepository.update(data)
      const activatedLoan = await LoanRepository.activate(loan)
      this.$emit('loan-activated', activatedLoan)
      this.close();
    }
  }
}
</script>
