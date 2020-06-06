<template>
  <v-dialog v-model="showDialog" persistent max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark class="mb-2" v-on="on">Register new loaner</v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">New Loaner</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-text-field
              v-model="loaner.name"
              :rules="rules.name"
              label="Name"
              outlined
              required
            ></v-text-field>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="pb-6 pr-6">
        <v-spacer></v-spacer>
        <v-btn outlined @click="close">Cancel</v-btn>
        <v-btn color="primary" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { LoanerRepository } from '@/repositories/repository'

export default {
  data() {
    return  {
      showDialog: false,
      loaner: {
        name: ''
      }
    }
  },
  computed: {
    rules() {
      return {
        name: [
          v => !!v && !!v.trim() || 'Name of loaner is required'
        ]
      }
    }
  },
  methods: {
    close() {
      this.resetData()
      this.showDialog = false
    },
    async save() {
      if(this.$refs.form.validate()) {
        const loaner = await LoanerRepository.create({ name: this.loaner.name.trim() })
        this.close()
        this.$emit('loaner-created', loaner)
      }
    },
    resetData() {
      this.$refs.form.reset();
      this.loaner.name = ''
    }
  }
}
</script>
