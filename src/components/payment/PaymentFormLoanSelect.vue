<template>
  <v-select
    placeholder="Select loan"
    item-id="id"
    item-value="id"
    :items="loanOptions"
    :rules="rules"
    v-model="loanId"
    @change="propagateSelectedLoan"
    outlined>

    <template v-slot:selection="{ item: loan }">
      <v-chip color="red" text-color="white" class="mr-3">
        {{ loan.id }}
      </v-chip>
      <v-chip color="green" text-color="white" class="mr-2">
        <v-icon class="mr-1">mdi-calendar-today</v-icon>
        {{ loan.dateCreated|formatDate }}
      </v-chip>
      <v-chip color="blue" text-color="white">
        <v-icon class="mr-1">mdi-bank</v-icon>
        {{ loanerNames(loan) }}
      </v-chip>
    </template>

    <template v-slot:item="{ item: loan }">
      <v-chip color="red" text-color="white" class="mr-3">
        {{ loan.id }}
      </v-chip>
      <v-chip color="green" text-color="white" class="mr-2">
        <v-icon class="mr-1">mdi-calendar-today</v-icon>
        {{ loan.dateCreated|formatDate }}
      </v-chip>
      <v-chip color="blue" text-color="white">
        <v-icon class="mr-1">mdi-bank</v-icon>
        {{ loanerNames(loan) }}
      </v-chip>
    </template>

  </v-select>
</template>

<script>
import { LoanRepository } from "@/repositories/repository";

export default {
  props: {
    rules: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      loans: [],
      loanId: null
    };
  },
  created() {
    this.fetchLoans();
  },
  computed: {
    loanOptions() {
      const activeLoans = this.loans.filter(loan => { return loan.status === 'ACTIVE' })
      return activeLoans.map(loan => {
        return {
          ...loan,
          selectedLoanText: `${loan.id}`
        }
      })
    }
  },
  methods: {
    async fetchLoans() {
      this.loans = await LoanRepository.list();
    },
    loanerNames(loan) {
      const loaners = loan.fund.loaners.map(loaner => { return loaner.name }).join(',')
      return loaners
    },
    propagateSelectedLoan() {
      const loan = this.loans.find(loan => { return loan.id === this.loanId })
      this.$emit('change', {...loan})
    }
  }
};
</script>
