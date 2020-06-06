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

            <LoanSelect
              :rules="rules.loan"
              @change="changeLoan"/>

            <v-text-field
              v-model="payment.amount"
              label="Amount"
              type="number"
              :rules="rules.amount"
              outlined
              required
            ></v-text-field>

            <TransactionDatePicker @change="changeTransactionDate"/>

          </v-container>
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
import moment from 'moment'
import LoanSelect from "./PaymentFormLoanSelect";
import TransactionDatePicker from "./PaymentFormTransactionDate"
import { PaymentRepository } from "@/repositories/repository";

export default {
  components: {
    LoanSelect,
    TransactionDatePicker
  },
  data() {
    return {
      showDialog: false,
      payment: initialPaymentData(),
    };
  },
  computed: {
    rules() {
      return {
        loan: [
          v => !!v || "Select the loan for payment",
        ],
        amount: [
          v => !!v || "Loan amount is required",
          v => v >= 100 || "Loan amount should at least be 100.00"
        ]
      }
    }
  },
  methods: {
    changeLoan(loan) {
      this.payment.loan = loan
    },
    changeTransactionDate(transactionDate) {
      this.payment.transactionDate = transactionDate
    },
    close() {
      this.showDialog = false
    },
    resetData() {
      this.payment = initialPaymentData()
    },
    async save() {
      if(this.$refs.form.validate()) {
        const savedPayment = await PaymentRepository.create(this.payment);
        this.resetData();
        this.close();
        this.$emit("payment-created", savedPayment);
      }
    }
  }
};

function initialPaymentData() {
  return {
    loan: null,
    amount: 0.0,
    transactionDate: moment()
  }
}
</script>
