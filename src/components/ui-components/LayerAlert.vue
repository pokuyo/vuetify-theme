<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        :value="notice"
      >
        <v-card>
          <v-card-text>
            <div class="d-flex align-center justify-center flex-wrap mt-2">
              <span class="me-2">{{ displayMessage }}</span>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              text
              @click="closeDialog"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
        <!-- </template> -->
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: [
    // eslint-disable-next-line vue/require-prop-types
    'message',
  ],
  data() {
    return {
      value: false,
      displayMessage: this.message,
    }
  },
  methods: {
    notice() {
      console.log('popup msg')
    },
    closeDialog() {
      console.log('close event')
      this.$emit('closeDialog')
    },
  },
}
</script>
