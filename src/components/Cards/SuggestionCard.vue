<template>
  <custom-card no-header color="secondary darken-1">
    <template v-slot:body>
      <v-row justify="center" dense class="py-3">
        <v-col cols="3">
          <user-avatar :initials="userInfo.firstName[0] + userInfo.lastName[0]" />
        </v-col>
        <v-col cols="12">
          <span class="text-body-1 white--text">{{userInfo.firstName + " " + userInfo.lastName}}</span>
        </v-col>
        <v-col cols="12">
          <span class="text-subtitle-2 grey--text">{{userInfo.headline}}</span>
        </v-col>
      </v-row>
    </template>

    <template v-slot:actions>
      <v-row justify="center" align="center" class="py-3">
        <v-btn
          color="primary"
          rounded
          depressed
          small
        >
          Connect
        </v-btn>
      </v-row>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "./CustomCard";
  import UserAvatar from "../Avatars/UserAvatar";
  export default {
    name: "SuggestionCard",
    components: {UserAvatar, CustomCard},
    props: {
      userInfo: {type: Object, required: true}
    }
  }
</script>

<style scoped>

</style>
