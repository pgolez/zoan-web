<template>
  <v-dialog
    ref="dialog"
    v-model="showModal "
    :return-value.sync="transactionDate"
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
    <v-date-picker
      v-model="transactionDate"
      scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="showModal = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.dialog.save(transactionDate)">OK</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      showModal: false,
      transactionDate: new Date().toISOString().substr(0, 10)
    }
  },
  computed: {
    formattedTransactionDate() {
      return moment(this.transactionDate).format('MMMM D, YYYY')
    }
  },
  watch: {
    transactionDate() {
      this.$emit('change', moment(this.transactionDate))
    }
  }
}
</script>
