<template>
  <custom-card title="People you may know">
    <template v-slot:body>
      <v-row>
        <v-col v-for="suggestedProfile in networkSuggestions" :key="suggestedProfile.username" cols="4">
          <suggestion-card :user-info="suggestedProfile" />
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
        profile: "profileModule/profile",
        networkSuggestions: "networkModule/networkSuggestions"
      })
    }
  }
</script>

<style scoped>

</style>
