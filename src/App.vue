<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      v-if="isAuthenticated"
    >

      <profile-dropdown />


      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
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
