<template>
  <v-snackbar
    v-if="value"
    :timeout="2000"
    shaped
    :color="type"
    :value="value"
    @input="$emit('input', value)"
  >
    {{message}}
  </v-snackbar>
</template>

<script>
  export default {
    name: "CustomAlert",
    props: {
      type: {type: String, default: 'info'},
      value: {type: Boolean, default: false},
      message: {type: String, default: ""}
    },

  }
</script>

<style scoped>

</style>
