<template>
  <v-row justify="center">
    <BaseDialog
      activator-text="Activate Loan"
      title="Activate Loan"
      action-text="Save"
      :action-handler="activateLoan">

      <template v-slot:content>
        <v-form ref="form">
          <v-container>
            <FundSelect @change="changeFund"></FundSelect>
          </v-container>
        </v-form>
      </template>

    </BaseDialog>
  </v-row>
</template>

<script>
import BaseDialog from '@/components/base/BaseDialog'
import FundSelect from './LoanFormFundSelect'
import { LoanRepository } from '@/repositories/repository'

export default {
  components: {
    BaseDialog,
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
