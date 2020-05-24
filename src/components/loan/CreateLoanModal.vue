<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark class="mb-2" v-on="on">
        Draft a new loan
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">New Loan</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <BorrowerSelect @change="changeBorrower"/>
          <v-text-field
            v-model="loan.amount"
            label="Amount"
            type="number"
            :rules="rules.amount"
            outlined
            required>
          </v-text-field>
          <v-text-field
            v-model="loan.installmentCount"
            label="Number of Installments"
            type="number"
            outlined
            required>
          </v-text-field>
          <v-text-field
            v-model="loan.monthlyInterest"
            label="Monthly Interest Rate"
            type="number"
            readonly
            outlined
            required>
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-6 pr-6">
        <v-spacer></v-spacer>
        <v-btn outlined @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { LoanRepository } from "@/repositories/repository";
import BorrowerSelect from './LoanFormBorrowerSelect';

export default {
  components: {
    BorrowerSelect
  },
  data() {
    return {
      valid: true,
      dialog: false,
      loan: {
        borrowerId: null,
        amount: 1000,
        installmentCount: 2,
        monthlyInterest: 0.12,
      }
    };
  },
  computed: {
    rules() {
      return {
        amount: [
          amt => !!amt || 'Loan amount is required',
          amt => amt >= 1000 || 'Loan amount should at least be 1000.00'
        ]
      }
    }
  },
  methods: {
    changeBorrower(borrowerId) {
      this.loan.borrowerId = borrowerId
    },
    resetData() {
      this.loan = {
        borrowerId: null,
        amount: 0,
        installmentCount: 2,
        monthlyInterest: 0.12,
      }
    },
    close() {
      this.dialog = false;
    },
    cancel() {
      this.resetData()
      this.close()
    },
    async save() {
      const savedLoan = await LoanRepository.create(this.loan)
      this.resetData()
      this.close()
      this.$emit('loan-created', savedLoan)
    }
  }
}
</script>
