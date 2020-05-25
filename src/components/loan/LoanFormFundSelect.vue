<template>
  <v-select
    v-model="fundId"
    label="Fund Source"
    placeholder="Select a fund source"
    item-value="id"
    item-text="text"
    :items="fundOptions"
    @change="propagateChange"
    outlined>
  </v-select>
</template>

<script>
import { FundRepository } from '@/repositories/repository.js'

export default {
  data() {
    return {
      fundId: null,
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
    },
    propagateChange() {
      this.$emit('change', this.fundId)
    }
  }
}
</script>
