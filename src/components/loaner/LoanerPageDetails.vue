<template>
  <v-card>
    <v-card-title>Loaner</v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    loaner: {
      type: Object,
      default() { return null }
    }
  }
}
</script>
