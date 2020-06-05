<template>
  <v-dialog v-model="showDialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark class="mb-2" v-on="on">Create payment</v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">New Payment</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>

            <LoanSelect @change="changeLoan"/>

            <v-text-field
              v-model="payment.amount"
              label="Amount"
              type="number"
              :rules="[]"
              outlined
              required
            ></v-text-field>

            <TransactionDatePicker @change="changeTransactionDate"/>

          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-6 pr-6">
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import LoanSelect from "./PaymentFormLoanSelect";
import TransactionDatePicker from "./PaymentFormTransactionDate"

export default {
  components: {
    LoanSelect,
    TransactionDatePicker
  },
  data() {
    return {
      showDialog: false,
      payment: {
        loan: {},
        amount: 0.0,
        transactionDate: {}
      },
    };
  },
  methods: {
    changeLoan(loan) {
      this.payment.loan = loan
    },
    changeTransactionDate(transactionDate) {
      this.payment.transactionDate = transactionDate
    }
  }
};
</script>
