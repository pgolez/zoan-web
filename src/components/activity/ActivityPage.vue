<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div>fucking breadcrumbs here</div>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col :cols="12">
        <v-card>
          <v-card-title>Calendar</v-card-title>
          <CalendarPage />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CalendarPage from './ActivityPageCalendar'

export default {
  components: {
    CalendarPage
  }
}
</script>
