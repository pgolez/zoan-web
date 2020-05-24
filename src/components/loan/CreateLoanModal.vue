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
          <BorrowerSelect />
          <v-text-field
            v-model="loan.amount"
            label="Amount"
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
            v-model="loan.interestRate"
            label="Monthly Interest Rate"
            type="number"
            disabled
            outlined
            required>
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-6 pr-6">
        <v-spacer></v-spacer>
        <v-btn outlined @click="close">Cancel</v-btn>
        <v-btn color="primary">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import BorrowerSelect from './LoanFormBorrowerSelect';

export default {
  components: {
    BorrowerSelect
  },
  data() {
    return {
      dialog: false,
      loan: {
        borrower: "",
        amount: null,
        installmentCount: 2,
        interestRate: 0.12,
      }
    };
  },
  methods: {
    close() {
      this.dialog = false;
    }
  }
}
</script>
