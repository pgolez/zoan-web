<template>
  <Modal
    activator-text="Add new transaction"
    title="New Transaction"
    @close="resetForm"
    action-text="Save"
    :action-handler="save">

    <template v-slot:content>
      <v-form ref="form">
        <v-container>

          <v-text-field
            v-model="transaction.amount"
            :rules="[]"
            type="number"
            label="Amount"
            outlined
            required
          ></v-text-field>

          <TransactionDatePicker
            @change="changeTransactionDate"/>

        </v-container>
      </v-form>
    </template>

  </Modal>
</template>

<script>
import moment from 'moment'
import Modal from '@/components/base/BaseModal'
import TransactionDatePicker from '@/components/payment/PaymentFormTransactionDate'

export default {
  components: {
    Modal,
    TransactionDatePicker
  },
  data() {
    return {
      showDialog: false,
      transaction: {
        amount: 0.0,
        date: moment()
      }
    }
  },
  methods: {
    save() {
      alert(this.transaction.amount)
    },
    changeTransactionDate(transactionDate) {
      this.transaction.date = transactionDate
    },
    resetForm() {
      this.$refs.form.reset()
    }
  }
}
</script>
