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
            <v-text-field v-model="payment.payer" label="Payer" :rules="[]" outlined required></v-text-field>
            <v-text-field
              v-model="payment.amount"
              label="Amount"
              type="number"
              :rules="[]"
              outlined
              required
            ></v-text-field>
            <v-text-field
              v-model="payment.transactionDate"
              label="Transaction Date"
              :rules="[]"
              outlined
              required
            ></v-text-field>
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
export default {
  data() {
    return {
      showDialog: false,
      payment: {
        payer: "",
        amount: 0.0,
        transactionDate: "May 31, 2020"
      }
    };
  }
};
</script>
