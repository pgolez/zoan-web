<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div>fucking breadcrumbs here</div>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col :cols="12">
        <PaymentsTable
          :payments= "payments"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PaymentsTable from './PaymentPageTable'
import { PaymentRepository } from "@/repositories/repository";

export default {
  components: {
    PaymentsTable
  },
  data() {
    return  {
      payments: []
    }
  },
  created() {
    this.fetchPayments()
  },
  methods: {
    async fetchPayments() {
      this.payments = await PaymentRepository.list()
    }
  }
};
</script>
