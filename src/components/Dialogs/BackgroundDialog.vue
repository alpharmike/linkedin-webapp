<template>
  <v-dialog v-model="dialog" max-width="75%" transition="dialog-transition">
    <background-form @close="dialog = false" />
  </v-dialog>
</template>

<script>
  import BackgroundForm from "../Forms/BackgroundForm";
  export default {
    name: "BackgroundDialog",
    components: {BackgroundForm},
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
