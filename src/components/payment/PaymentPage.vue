<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div>fucking breadcrumbs here</div>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col :cols="12">
        <PaymentsTable />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col :cols="12">
        <ActiveLoansSection
          :loans="activeLoans"/>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import PaymentsTable from './PaymentPageTable'

export default {
  components: {
    PaymentsTable
  }
};
</script>
