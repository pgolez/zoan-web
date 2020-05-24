<template>
  <v-select
    v-model="borrowerId"
    label="Borrower"
    placeholder="Select a borrower"
    item-id="id"
    item-value="id"
    item-text="name"
    :items="borrowerOptions"
    :rules="rules"
    outlined
    @change="propagateChange">
  </v-select>
</template>

<script>
import { BorrowerRepository } from '@/repositories/repository.js'

export default {
  props: {
    rules: {
      type: Array,
      default() { return [] }
    }
  },
  data() {
    return {
      borrowerId: null,
      borrowerOptions: []
    }
  },
  created() {
    this.populateBorrowerOptions()
  },
  methods: {
    async populateBorrowerOptions() {
      const borrowers = await BorrowerRepository.list();
      this.borrowerOptions = borrowers.map( borrower => {
        return {
          value: borrower.id,
          text: borrower.name
        }
      })
      this.borrowerOptions = borrowers
    },
    propagateChange() {
      this.$emit('change', this.borrowerId)
    }
  }
}
</script>
