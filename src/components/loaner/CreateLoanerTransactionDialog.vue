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

          <v-select
            placeholder="Select transaction type"
            v-model="transaction.type"
            :items="[{name: 'CREDIT'}, {name: 'DEBIT'}]"
            :rules="rules.type"
            item-value="name"
            outlined>

            <template v-slot:selection="{ item }">
              <v-avatar
                v-if="item.name=='CREDIT'"
                size="28"
                color="blue"
                tile>
                <v-icon dark>mdi-plus</v-icon>
              </v-avatar>
              <v-avatar
                v-else
                color="red"
                size="28"
                tile>
                <v-icon dark>mdi-minus</v-icon>
              </v-avatar>
              <span class="mx-2">
                {{ item.name }}
              </span>
            </template>

            <template v-slot:item="{ item }">
              <v-avatar
                v-if="item.name=='CREDIT'"
                size="28"
                color="blue"
                tile>
                <v-icon dark>mdi-plus</v-icon>
              </v-avatar>
              <v-avatar
                v-else
                color="red"
                size="28"
                tile>
                <v-icon dark>mdi-minus</v-icon>
              </v-avatar>
              <span class="mx-2">
                {{ item.name }}
              </span>
            </template>

          </v-select>

          <v-text-field
            v-model="transaction.amount"
            :rules="rules.amount"
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
import { LoanerRepository } from '@/repositories/repository'

export default {
  components: {
    Modal,
    TransactionDatePicker
  },
  props:  {
    loaner: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      transaction: {
        type: null,
        amount: 0.0,
        date: moment()
      }
    }
  },
  computed: {
    rules() {
      return {
        type: [
          v => !!v || 'Transaction type is required'
        ],
        amount: [
          v => !!v || 'Transactio amount is required',
          v => v > 0 || 'Transaction amount should not be zero or less'
        ]
      }
    }
  },
  methods: {
    save() {
      if(this.$refs.form.validate()) {
        submitForm(this.loaner, this.transaction)
        this.resetForm();
        return true;
      }
      return false;
    },
    changeTransactionDate(transactionDate) {
      this.transaction.date = transactionDate
    },
    resetForm() {
      this.$refs.form.reset()
    }
  }
}

async function submitForm(loaner, transaction) {
  const requestBody = {
    amount: Number.parseFloat(transaction.amount),
    type: transaction.type,
    transactionDate: transaction.date.format('MM-DD-YYYY'),
    notes: null
  }

  await LoanerRepository.postTransaction(loaner, requestBody)
}
</script>
