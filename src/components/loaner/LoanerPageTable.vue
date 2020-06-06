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

      <template v-slot:item.name="{ value }">
        <v-avatar color="orange darken-4" size="40" class="mr-2">
          <span class="white--text text-center headline">
            {{ value|acronym }}
          </span>
        </v-avatar>
        <span class="text-right">{{value}}</span>
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
  },
  methods: {
    handleItemSelected(event) {
      const isSelected = event.value
      if(isSelected) {
        const loaner = event.item
        this.$emit('loaner-selected', loaner)
      } else {
        this.$emit('loaner-selected', {})
      }
    },
  }
}
</script>
