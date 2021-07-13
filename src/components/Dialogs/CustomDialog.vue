<template>
  <v-dialog v-model="dialog" max-width="75%" transition="dialog-transition">
    <slot name="body"></slot>
  </v-dialog>
</template>

<script>
  export default {
    name: "CustomDialog",
    props: {
      show: {type: Boolean, default: false}
    },
    data() {
      return {
        dialog: this.show
      }
    },

    watch: {
      show: function (value) {
        this.dialog = value;
      },
      dialog: function () {
        this.$emit('update:show', this.dialog);
      },
    }
  }
</script>

<style scoped>

</style>
