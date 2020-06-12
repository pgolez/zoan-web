<template>
  <v-container fluid>
    <v-row>
      <v-col lg="3">
        <v-select
          v-model="calendar.type"
          label="Calendar View"
          :items="calendar.typeOptions"
          item-text="name"
          outlined>
        </v-select>
      </v-col>
      <v-col lg="9">
        <v-row>
          <v-col>
            <v-btn
              class="mr-2 primary"
              @click="moveToday">
              Today
            </v-btn>
            <v-btn
              icon
              @click="movePrevious">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              icon
              @click="moveNext">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
            <span class="title">
              {{ calendarTitle }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-sheet height="600">
              <v-calendar
                ref="calendar"
                v-model="calendar.value"
                :events="events"
                :event-color="getEventColor"
                color="orange lighten-1"
                :type="calendar.type"
              ></v-calendar>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { PaymentScheduleRepository } from '@/repositories/repository'
import moment from 'moment'

const EventType = Object.freeze({
  PAYMENT_SCHEDULE: "PAYMENT_SCHEDULE"
})


export default {
  data() {
    return {
      paymentSchedules: [],
      calendar: {
        value: moment().format('YYYY-MM-DD'),
        type: "month",
        typeOptions: [
          { name: "Month", value: "month" },
          { name: "Week", value: "week" },
          { name: "Day", value: "day" }
        ]
      }
    }
  },
  computed: {
    events() {
      return this.paymentSchedules.map((paymentSchedule) => {
        return {
          name: paymentSchedule.loan.borrower.name,
          start: moment(paymentSchedule.dateDue).format('YYYY-MM-DD'),
          type: EventType.PAYMENT_SCHEDULE
        }
      })
    },
    calendarTitle() {
      return moment(this.calendar.value).format('MMMM YYYY')
    }
  },
  created() {
    this.reloadPaymentSchedules()
  },
  methods: {
    async reloadPaymentSchedules() {
      this.paymentSchedules = await PaymentScheduleRepository.query('01-01-2020', '12-31-2020')
    },
    movePrevious() {
      this.$refs.calendar.prev()
    },
    moveNext() {
      this.$refs.calendar.next()
    },
    moveToday() {
      this.calendar.value = moment().format('YYYY-MM-DD')
    },
    getEventColor(event) {
      return {
        [EventType.PAYMENT_SCHEDULE]: 'purple'
      }[event.type]
    }
  }
}
</script>
