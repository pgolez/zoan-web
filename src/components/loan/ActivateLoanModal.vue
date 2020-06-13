<template>
  <v-row justify="center">
    <BaseDialog
      width="840px"
      activator-text="Activate Loan"
      title="Activate Loan"
      action-text="Save"
      :action-handler="activateLoan">

      <template v-slot:content>
        <v-container fluid>
          <v-row>

            <v-col lg="4">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-subtitle>Borrower</v-list-item-subtitle>
                  <v-list-item-title class="title">{{ loan.borrower.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-subtitle>Transaction Date</v-list-item-subtitle>
                  <v-list-item-title class="title">{{ loan.dateCreated|formatDate('MMMM D, YYYY') }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-subtitle>Amount</v-list-item-subtitle>
                  <v-list-item-title class="title">{{ loan.amount|currency }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-subtitle>Monthly Interest</v-list-item-subtitle>
                  <v-list-item-title class="title">{{ loan.monthlyInterest }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-subtitle>Number of installments</v-list-item-subtitle>
                  <v-list-item-title class="title">{{ loan.installmentCount }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <v-col lg="8">
              <v-row>
                <v-col>
                  <h1>Payment Schedule</h1>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-data-table
                    :headers="headers"
                    :items="paymentSchedules"
                    :disable-pagination="true"
                    :disable-sort="true"
                    :disable-filtering="true"
                    :hide-default-footer="true"
                    class="elevation-3">
                  </v-data-table>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-spacer></v-spacer>
            <v-col lg="6">
              <v-form ref="form" class="float-right">
                <v-container>
                  <FundSelect @change="changeFund"></FundSelect>
                </v-container>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
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
      fundId: null,
      headers: [
        {text: "", value: "order"},
        {text: "Due Date", value: "dueDate"},
        {text: "Amount Payable", value: "amount"},
        {text: "Profit", value: "profit"},
      ],
      paymentSchedules: [
        {dueDate: "06-15-2020", amount: 3100.0, profit: 600.0},
        {dueDate: "06-30-2020", amount: 3100.0, profit: 600.0},
        {dueDate: "07-15-2020", amount: 3100.0, profit: 600.0},
        {dueDate: "07-30-2020", amount: 3100.0, profit: 600.0}
      ]
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
      if(this.$refs.form.validate()) {
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
        return true
      }

      return false;
    }
  }
}
</script>
