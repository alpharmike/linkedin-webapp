<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        rounded
        outlined
      >
        Add Section
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="section in sections"
        :key="section.title"
        style="cursor: pointer;"
        ripple
        @click="$emit('choose-section', section.title)"
      >
        <v-list-item-title>{{ section.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "AddSectionDropdown",
    computed: {
      ...mapGetters({
        sections: "sectionModule/sections"
      })
    },
  }
</script>

<style scoped>

</style>
