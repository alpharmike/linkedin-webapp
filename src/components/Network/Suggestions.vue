<template>
  <custom-card title="People you may know">
    <template v-slot:body>
      <v-row>
        <v-col v-for="i in 12" cols="4" :key="i * 10">
          <suggestion-card :user-info="profile" />
        </v-col>
      </v-row>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import {mapGetters} from "vuex";
  import SuggestionCard from "../Cards/SuggestionCard";

  export default {
    name: "Suggestions",
    components: {SuggestionCard, CustomCard},
    computed: {
      ...mapGetters({
        profile: "profileModule/profile"
      })
    }
  }
</script>

<style scoped>

</style>
