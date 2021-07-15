<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      v-if="isAuthenticated"
      max-height="100"
    >
      <v-row align="center">
        <profile-dropdown class="ml-2"/>
      </v-row>

      <v-spacer></v-spacer>

      <v-row align="center" justify="end" class="mx-2">
        <v-btn
          class="ma-2"
          fab
          plain
          tile
          to="/feed"
        >
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn
          class="ma-2"
          fab
          plain
          tile
          to="/network"
        >
          <v-icon>mdi-account-group</v-icon>
        </v-btn>

        <v-btn
          class="ma-2"
          fab
          plain
          tile
          to="/chatroom"
        >
          <v-icon>mdi-message</v-icon>
        </v-btn>

        <v-badge
          class="ma-2"
          color="accent"
          content="2"
          transition="slide-x-transition"
          style="cursor: pointer;"
          dot
        >
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-row>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

  import ProfileDropdown from "./components/Dropdown/ProfileDropdown";
  import {mapGetters} from "vuex";

  export default {
    name: 'App',
    components: {ProfileDropdown},
    computed: {
      ...mapGetters("authModule", ["isAuthenticated"])
    },
    data: () => ({
      //
    })
  }
</script>
