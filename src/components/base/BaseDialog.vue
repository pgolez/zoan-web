<template>
  <v-dialog
    v-model="showDialog"
    :max-width="width"
    persistent>
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        dark
        v-on="on">
        {{ activatorText }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">
          {{ title }}
        </span>
      </v-card-title>

      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>

      <v-card-actions class="pb-6 pr-6">
        <v-spacer></v-spacer>
        <v-btn
          outlined
          @click="close">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="triggerActionHandler">
          {{ actionText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default() { return '500px' },
      required: false
    },
    activatorText: {
      type: String,
      default() { return 'Open Modal' },
      required: false
    },
    title: {
      type: String,
      default() { return '' },
      required: false
    },
    actionText: {
      type: String,
      default() { return 'OK' },
      required: false
    },
    actionHandler: {
      type: Function,
      default() { return async () => true },
      required: false
    }
  },
  data() {
    return {
      showDialog: false
    }
  },
  methods: {
    close() {
      this.showDialog = false
      this.$emit('close')
    },
    async triggerActionHandler() {
      const shouldClose = await this.actionHandler()
      if(shouldClose) {
        this.close()
      }
    }
  }
}
</script>
