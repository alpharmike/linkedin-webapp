<template>
  <custom-card title="Notifications">
    <template v-slot:body>
      <v-list two-line>
        <template v-for="(notification, index) in notifications">
          <div :key="notification.body + notification.id">
            <v-divider v-if="index > 0" inset></v-divider>
            <v-list-item
              :key="notification.body + notification.id"
            >
              <v-list-item-avatar size="48">
                <user-avatar :initials="notification.profileJson.firstName[0] + notification.profileJson.lastName[0]" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="text-capitalize" v-html="notification.notificationTypeName"></v-list-item-title>
                <v-list-item-subtitle v-html="notification.body"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </template>
      </v-list>
    </template>
  </custom-card>
</template>

<script>
  import UserAvatar from "../Avatars/UserAvatar";
  import {mapGetters} from "vuex";
  import CustomCard from "../Cards/CustomCard";
  export default {
    name: "NotificationList",
    components: {CustomCard, UserAvatar},
    computed: {
      ...mapGetters({
        notifications: "notificationModule/notifications"
      })
    }
  }
</script>

<style scoped>

</style>
