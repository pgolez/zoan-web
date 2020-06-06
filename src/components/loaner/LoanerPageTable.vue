<template>
  <v-card>
    <v-card-title>Loaners</v-card-title>
    <v-data-table
      :headers="headers"
      :items="loaners"
      :disable-pagination="true"
      :show-select="true"
      :single-select="true"
      :hide-default-footer="true"
      @item-selected="handleItemSelected"
      class="elevation-1">

     <template v-slot:top>
        <v-toolbar flat color="white">
          <v-spacer></v-spacer>
          <CreateLoanerDialog
            @loaner-created="refreshLoaners"/>
        </v-toolbar>
      </template>

      <template v-slot:item.name="{ value }">
        <v-avatar color="orange darken-4" size="40" class="mr-2">
          <span class="white--text text-center headline">
            {{ value|acronym }}
          </span>
        </v-avatar>
        <span class="text-right">{{value}}</span>
      </template>

      <template v-slot:item.capital="{ item: loaner }">
        <div>
          {{ totalCapital(loaner)|currency }}
        </div>
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
import CreateLoanerDialog from './CreateLoanerDialog'

export default {
  components: {
    CreateLoanerDialog
  },
  props: {
    loaners: {
      type: Array,
      default() { return [] }
    }
  },
  data() {
    return {
      headers: [
        { text: "Name", sortable: true, value: "name" },
        { text: "Total Capital", sortable: true, value: "capital" },
        { text: "Status", sortable: true, value: "status" },
      ]
    }
  },
  methods: {
    totalCapital(loaner) {
      return loaner.amountFree + loaner.amountLoaned
    },
    handleItemSelected(event) {
      const isSelected = event.value
      if(isSelected) {
        const loaner = event.item
        this.$emit('loaner-selected', loaner)
      } else {
        this.$emit('loaner-selected', {})
      }
    },
    refreshLoaners() {
      this.$emit('loaner-created')
    }
  }
}
</script>
