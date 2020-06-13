<template>
  <v-select
    v-model="loanerId"
    label="Fund Source"
    placeholder="Select a fund source"
    item-value="id"
    item-text="name"
    :items="loanerOptions"
    :rules="rules"
    @change="propagateChange"
    outlined>
  </v-select>
</template>

<script>
import { LoanerRepository } from '@/repositories/repository.js'

export default {
  props: {
    rules: {
      type: Array,
      default() { return [] },
      required: false
    },
    loan: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loanerId: null,
      loaners: []
    }
  },
  computed: {
    loanerOptions() {
      return this.loaners.filter( (loaner) => loaner.amountFree >= this.loan.amount)
    }
  },
  created() {
    this.loadLoaners()
  },
  methods: {
    async loadLoaners() {
      const loaners = await LoanerRepository.list()
      this.loaners = loaners
    },
    propagateChange() {
      const loaner = this.loaners.find((loaner) => { return loaner.id == this.loanerId })
      this.$emit('change', {...loaner})
    }
  }
}
</script>
