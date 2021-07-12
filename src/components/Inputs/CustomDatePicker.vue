<template>
  <v-menu
    v-model="datePickerMenu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :value="date"
        :label="label"
        readonly
        outlined
        v-bind="attrs"
        v-on="on"
        :required="required"
        dense
        clearable
        @input="updateDate"
      ></v-text-field>
    </template>
    <v-date-picker
      :value="date"
      @input="updateDate"
    ></v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    name: "CustomDatePicker",
    props: {
      label: {type: String, default: ""},
      required: {type: Boolean, default: false},
      date: {type: String, default: ""}
    },
    data() {
      return {
        datePickerMenu: false,
      }
    },

    methods: {
      updateDate(value) {
        this.datePickerMenu = false;
        this.$emit('input', value)
      }
    }
  }
</script>

<style scoped>

</style>
