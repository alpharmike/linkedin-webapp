<template>
  <v-container v-if="!loading" fluid>
    <v-row>
      <v-col cols="4">
        <user-info-card/>
      </v-col>
      <v-col cols="8">
        <v-row justify="center">
          <v-col cols="12">
            <notification-list/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <spinner v-else/>
</template>

<script>
  import {mapActions} from "vuex";
  import Spinner from "../../components/Loaders/Spinner";
  import NotificationList from "../../components/Notification/NotificationList";
  import UserInfoCard from "../../components/Cards/UserInfoCard";

  export default {
    name: "Notification",
    components: {UserInfoCard, NotificationList, Spinner},
    methods: {
      ...mapActions({
        getNotifications: "notificationModule/getNotifications",
        // getBirthdayNotifications: "notificationModule/getBirthdayNotifications",
      })
    },

    data() {
      return {
        loading: false,
      }
    },

    async created() {
      this.loading = true;
      await this.getNotifications();
      // await this.getBirthdayNotifications();
      this.loading = false;
    }
  }
</script>

<style scoped>

</style>
