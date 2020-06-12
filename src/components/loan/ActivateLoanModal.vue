<template>
  <v-row justify="center">
    <BaseDialog
      width="960px"
      activator-text="Activate Loan"
      title="Activate Loan"
      action-text="Save"
      :action-handler="activateLoan">

      <template v-slot:content>
        <v-container fluid>
          <v-row>
            <v-col lg="4" xs="12">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title">{{ loan.borrower.name }}</v-list-item-title>
                  <v-list-item-subtitle>Borrower</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title">{{ loan.amount|currency }}</v-list-item-title>
                  <v-list-item-subtitle>Amount</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title">{{ loan.dateCreated|formatDate('MMMM D, YYYY') }}</v-list-item-title>
                  <v-list-item-subtitle>Transaction Date</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-form ref="form">
                <v-container>
                  <FundSelect @change="changeFund"></FundSelect>
                </v-container>
              </v-form>
            </v-col>

            <v-col lg="8" xs="12">
              <v-row>
                <v-col md="6">
                  <v-text-field
                    v-model="loan.monthlyInterest"
                    label="Monthly Interest"
                    type="number"
                    col="6"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col md="6">
                  <v-text-field
                    v-model="loan.installmentCount"
                    label="Installment Count"
                    type="number"
                    col="6"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

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
      ],
      paymentSchedules: [
        {dueDate: "06-15-2020", amount: 3100},
        {dueDate: "06-30-2020", amount: 3100},
        {dueDate: "07-15-2020", amount: 3100},
        {dueDate: "07-30-2020", amount: 3100}
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
