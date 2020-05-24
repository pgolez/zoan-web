<template>
  <v-select
    v-model="borrower"
    label="Borrower"
    placeholder="Select a borrower"
    :items="borrowerOptions"
    outlined>
  </v-select>
</template>

<script>
import { BorrowerRepository } from '@/repositories/repository.js'

export default {
  data() {
    return {
      borrower: {},
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
          id: borrower.id,
          text: borrower.name
        }
      })
    }
  }
}
</script>
