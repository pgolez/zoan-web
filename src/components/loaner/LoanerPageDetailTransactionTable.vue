<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="transactions"
      :disable-pagination="true"
      :disable-sort="true"
      :disable-filtering="true"
      :hide-default-footer="true"
      class="elevation-3">

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <CreateTransactionDialog
            :loaner="loaner"
            @transaction-posted="reloadTransactions"/>
        </v-toolbar>
      </template>

      <template v-slot:item.type="{ value }">
        <v-avatar
          v-if="value=='CREDIT'"
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
      </template>

      <template v-slot:item.transactionDate="{ value }">
        <span>{{ value|formatDate }}</span>
      </template>

      <template v-slot:item.amount="{ value }">
        <div class="text-right">{{ value|currency }}</div>
      </template>

      <template v-slot:footer>
        <v-container class="white--text brown darken-4">
          <v-row no-gutters>
            <v-col :cols="8">
              <div class="font-weight-medium text-right">Total capital</div>
            </v-col>
            <v-col :cols="4" class="font-weight-bold text-right">
                {{ totalCapital|currency }}
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import CreateTransactionDialog from './CreateLoanerTransactionDialog'
import { LoanerRepository } from '@/repositories/repository'

export default {
  components: {
    CreateTransactionDialog
  },
  props:  {
    loaner: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      headers: [
        { text: "", value: "type" },
        { text: "Transaction Date", value: "transactionDate" },
        { text: "Amount", value: "amount", align: 'end'},
      ],
      transactions: []
    }
  },
  computed: {
    totalCapital() {
      return this.transactions.reduce((sum, transaction) => {
        if(transaction.type === 'CREDIT') {
          return sum + transaction.amount
        } else {
          return sum - transaction.amount
        }
      }, 0)
    }
  },
  watch: {
    loaner() {
      this.reloadTransactions()
    }
  },
  methods: {
    async reloadTransactions() {
      this.transactions = await LoanerRepository.listTransactions(this.loaner)
    }
  }
}
</script>
