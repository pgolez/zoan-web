<template>
  <v-card>
    <v-card-title>Loaners</v-card-title>
    <v-data-table
      :headers="headers"
      :items="loaners"
      :disable-pagination="true"
      :hide-default-footer="true"
      class="elevation-1">

      <template v-slot:item.name="{ item }">
        <v-avatar color="orange darken-4" size="40" class="mr-2">
          <span class="white--text text-center headline">
            {{ item.name|acronym }}
          </span>
        </v-avatar>
        <span class="text-right">{{ item.name }}</span>
      </template>

    </v-data-table>
  </v-card>
</template>

<script>
export default {
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
        { text: "Amount in Loan", sortable: true, value: "amountLoaned" },
        { text: "Status", sortable: true, value: "status" },
      ]
    }
  }
}
</script>
