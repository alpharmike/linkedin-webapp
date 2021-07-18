<template>
  <v-container v-if="!loading" fluid>
    <v-row justify="center">
      <v-col cols="8">
        <notification-list />
      </v-col>
    </v-row>
  </v-container>
  <spinner v-else/>
</template>

<script>
  import {mapActions} from "vuex";
  import Spinner from "../../components/Loaders/Spinner";
  import NotificationList from "../../components/Notification/NotificationList";

  export default {
    name: "Notification",
    components: {NotificationList, Spinner},
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
