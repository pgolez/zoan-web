<template>
  <v-row justify="center">
    <BaseDialog
      width="840px"
      activator-text="Activate"
      title="Activate Loan"
      action-text="Save"
      :action-handler="submit">

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
              <PaymentScheduleTable
                :loan="loan"/>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-spacer></v-spacer>
            <v-col lg="6">
              <v-form
                ref="form"
                class="float-right">
                <v-container>
                  <FundSelect
                    :rules="rules.fund"
                    :loan="loan"
                    @change="changeLoaner"/>
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
import { FundRepository, LoanRepository } from '@/repositories/repository'
import PaymentScheduleTable from './LoanFormPaymentScheduleTable'

export default {
  components: {
    BaseDialog,
    FundSelect,
    PaymentScheduleTable
  },
  props: {
    loan: {
      type: Object,
      default() { return null },
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      loanerId: null,
      headers: [
        {text: "", value: "order"},
        {text: "Due Date", value: "dueDate"},
        {text: "Amount Payable", value: "amount"},
        {text: "Profit", value: "profit"},
      ]
    }
  },
  computed: {
    rules() {
      return {
        fund: [
          v => !!v || 'Source fund is required'
        ]
      }
    }
  },
  methods: {
    changeLoaner(loaner) {
      this.loaner = loaner
    },
    async submit() {
      if(this.$refs.form.validate()) {
        const fund = await createFundForLoan(this.loaner, this.loan)
        const loan = await updateLoanFunds(this.loan, fund)
        const activatedLoan = await activateLoan(loan)
        this.$emit('loan-activated', activatedLoan)
        return true
      }

      return false;
    }
  }
}


async function activateLoan(loan) {
  return await LoanRepository.activate(loan)
}

async function createFundForLoan(loaner, loan) {
  const fund = {
    owners: [
      {
        loanerId: loaner.id,
        amount: loan.amount
      }
    ]
  }

  return await FundRepository.create(fund)
}

async function updateLoanFunds(loan, fund) {
  const data = {
    id: loan.id,
    borrowerId: loan.borrower.id,
    amount: loan.amount,
    monthlyInterest: loan.monthlyInterest,
    installmentCount: loan.installmentCount,
    fundId: fund.id
  }
  return await LoanRepository.update(data)
}
</script>
