<template>
  <custom-card no-header>
    <template v-slot:body>
      <v-row justify="center" class="my-1">
        <div>
          <user-avatar size="60" :initials="profile.firstName[0] + profile.lastName[0]" />
        </div>
      </v-row>

      <v-row class="mx-1">
        <v-col cols="12">
          <span>
            <v-icon class="mx-1">mdi-account-circle</v-icon>
            {{`Name: ${profile.firstName} ${profile.lastName}`}}
          </span>
        </v-col>
        <v-col cols="12">
          <span>
            <v-icon class="mx-1">mdi-city</v-icon>
            {{`Location: ${profile.locationInCountry}`}}
          </span>
        </v-col>
        <v-col cols="12">
          <span>
            <v-icon class="mx-1">mdi-email</v-icon>
            {{`Email: ${profile.email}`}}
          </span>
        </v-col>
        <v-col cols="12">
          <span>
            <v-icon class="mx-1">mdi-account-group</v-icon>
            {{`Connections: ${profile.conn}`}}
          </span>
        </v-col>
      </v-row>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "./CustomCard";
  import UserAvatar from "../Avatars/UserAvatar";
  import {mapGetters} from "vuex";

  export default {
    name: "UserInfoCard",
    components: {UserAvatar, CustomCard},
    computed: {
      ...mapGetters({
        profile: "profileModule/profile"
      })
    }
  }
</script>

<style scoped>

</style>
