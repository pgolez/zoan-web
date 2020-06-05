<template>
  <v-select placeholder="Select loan" item-id="id" item-value="id" item-text="name" outlined></v-select>
</template>

<script>
import { LoanRepository } from "@/repositories/repository";

export default {
  data() {
    return {
      loans: []
    };
  },
  created() {
    this.fetchLoans();
  },
  methods: {
    async fetchLoans() {
      this.loans = await LoanRepository.list();
    }
  }
};
</script>
