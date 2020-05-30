<template>
  <v-card>
    <v-card-title>Payments</v-card-title>
    <v-data-table
      :headers="headers"
      class="elevation-1">
    </v-data-table>
  </v-card>
</template>


<script>
export default {
  props: {
    loans: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      headers: [
        { text: "Transaction Date", sortable: true, value: "borrower.name" },
        { text: "Loan Amount", sortable: true, value: "amount" },
        { text: "Loan Date", sortable: true, value: "dateCreated" },
        { text: "# of Installments", sortable: true, value: "installmentCount" },
        { text: "Installment Payable", sortable: true, value: "installmentPayable" },
        { text: "Status", sortable: true, value: "paid_amount" },
      ]
    };
  },
  methods: {}
};
</script>
