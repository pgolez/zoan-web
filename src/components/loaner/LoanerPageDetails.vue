<template>
  <v-card>
    <v-card-title>{{ loaner.name }}</v-card-title>
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
