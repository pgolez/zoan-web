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

            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="payment.transactionDate"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="formattedTransactionDate"
                  label="Picker in dialog"
                  append-icon="mdi-calendar-today"
                  required
                  readonly
                  outlined
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="payment.transactionDate" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(payment.transactionDate)">OK</v-btn>
              </v-date-picker>
            </v-dialog>

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
import moment from 'moment'

export default {
  components: {
    LoanSelect
  },
  data() {
    return {
      showDialog: false,
      payment: {
        loan: {},
        amount: 0.0,
        transactionDate: new Date().toISOString().substr(0, 10)
      },
      modal: false
    };
  },
  computed: {
    formattedTransactionDate() {
      return moment(this.payment.transactionDate).format('MMMM d, YYYY')
    }
  },
  methods: {
    changeLoan(loan) {
      this.payment.loan = loan
    }
  }
};
</script>
