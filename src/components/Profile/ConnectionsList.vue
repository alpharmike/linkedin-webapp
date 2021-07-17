<template>
  <custom-card title="Connections">
    <template v-slot:body>
      <v-list three-line>
        <template v-for="profile in connections">
          <v-list-item
            :key="profile.firstName + profile.lastName + profile.id"
          >
            <v-list-item-avatar>
              <user-avatar font-class="white--text" size="42"
                           :initials="profile.firstName[0] + profile.lastName[0]"/>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{`${profile.firstName} ${profile.lastName}`}}
              </v-list-item-title>
              <v-list-item-subtitle>{{'@' +  profile.username}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import UserAvatar from "../Avatars/UserAvatar";

  export default {
    name: "ConnectionsList",
    components: {UserAvatar, CustomCard},
    props: {
      connections: {type: Array}
    }
  }
</script>

<style scoped>

</style>
