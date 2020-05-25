<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn
          color="success"
          v-on="on"
          small>
          Activate
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Activate Loan</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-container>
              <v-text-field
                label="Fund Source"
                outlined>
              </v-text-field>
            </v-container>
          </v-form>
        </v-card-text>
      <v-card-actions class="pb-6 pr-6">
          <v-spacer></v-spacer>
          <v-btn outlined text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="dialog = false">Activate</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    loan: {}
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>
