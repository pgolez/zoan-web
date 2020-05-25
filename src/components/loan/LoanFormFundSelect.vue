<template>
  <v-select
    v-model="fund"
    label="Fund Source"
    placeholder="Select a fund source"
    :items="fundOptions"
    outlined>
  </v-select>
</template>

<script>
import { FundRepository } from '@/repositories/repository.js'

export default {
  data() {
    return {
      fund: {},
      fundOptions: []
    }
  },
  created() {
    this.populateFundOptions()
  },
  methods: {
    async populateFundOptions() {
      const funds = await FundRepository.list();
      const availableFunds = funds.filter( fund => {
        return fund.status === 'FREE'
      })
      this.fundOptions = availableFunds.map( fund => {
        return {
          id: fund.id,
          text: `${fund.id} (${fund.totalAmount})`
        }
      })
    }
  }
}
</script>
