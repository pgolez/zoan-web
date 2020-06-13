<template>
  <v-container>
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
        {{schedules}}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentScheduleGenerator from '@/services/payment-schedule-generator.service'

export default {
  props: {
    loan: {
      type: Object,
      default() { return null },
      required: true
    }
  },
  data() {
    return {
      headers: [
        {text: "", value: "order"},
        {text: "Due Date", value: "dueDate"},
        {text: "Amount Payable", value: "amount"},
        {text: "Profit", value: "profit"},
      ]
    }
  },
  computed: {
    paymentSchedules() {
     return (new PaymentScheduleGenerator(this.loan)).generate()
    }
  }
}
</script>
