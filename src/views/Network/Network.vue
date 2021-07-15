<template>
  <div class="fill-height">
    <v-container v-if="!loading" fluid>
      <v-row justify="center">
        <v-col cols="8">
          <invitations-card/>
        </v-col>

        <v-col cols="8">
          <suggestions />
        </v-col>
      </v-row>
    </v-container>
    <spinner v-else/>
  </div>
</template>

<script>
  import Spinner from "../../components/Loaders/Spinner";
  import InvitationsCard from "../../components/Network/InvitationsCard";
  import Suggestions from "../../components/Network/Suggestions";

  export default {
    name: "Network",
    components: {Suggestions, InvitationsCard, Spinner},

    data() {
      return {
        loading: false
      }
    }
  }
</script>

<style scoped>

</style>
