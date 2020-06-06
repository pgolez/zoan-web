<template>
  <v-card>
    <v-card-title>{{ loaner.name }}</v-card-title>
    <v-card-text>
      <div>
        <v-row class="text-center">
          <v-col :cols="4">
            Total capital: {{ totalCapital }}
          </v-col>
          <v-col :cols="4">
            Amount in loan: {{ amountLoaned }}
          </v-col>
          <v-col :cols="4">
            Amount free: {{ amountFree }}
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    loaner: {
      type: Object,
      default() { return null }
    }
  },
  computed: {
    totalCapital() {
      return this.amountFree + this.amountLoaned
    },
    amountLoaned() {
      return this.loaner.amountLoaned
    },
    amountFree() {
      return this.loaner.amountFree
    }
  }
}
</script>
