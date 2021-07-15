<template>
  <custom-card title="Invitations">
    <template v-slot:body>
      <v-list>
        <v-list-item
          v-for="(profile, index) in invitations"
          :key="profile.firstName + index"
        >
          <v-list-item-avatar size="48">
            <user-avatar :initials="profile.firstName[0] + profile.lastName[0]" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{`${profile.firstName} ${profile.lastName}`}}</v-list-item-title>

            <v-list-item-subtitle>{{profile.headline}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-row align="center">
              <v-btn
                color="primary"
                rounded
                outlined
                depressed
                class="mx-2"
                small
              >
                Ignore
              </v-btn>
              <v-btn
                color="primary"
                rounded
                depressed
                small
              >
                Accept
              </v-btn>
            </v-row>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import UserAvatar from "../Avatars/UserAvatar";
  export default {
    name: "InvitationsCard",
    components: {UserAvatar, CustomCard},
    computed: {
      invitations() {
        return [
          {
            firstName: "Alireza",
            lastName: "Moeini",
            headline: "Student at Shiraz University"
          },
          {
            firstName: "Alireza",
            lastName: "Moeini",
            headline: "Student at Shiraz University"
          },
          {
            firstName: "Alireza",
            lastName: "Moeini",
            headline: "Student at Shiraz University"
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
