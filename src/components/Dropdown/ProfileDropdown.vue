<template>
  <div class="text-center">
    <v-menu
      bottom
      min-width="200px"
      rounded
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          x-large
          v-on="on"
        >
          <v-avatar
            color="accent"
            size="48"
          >
            <span class="white--text text-h5">{{ profile.firstName[0] + profile.lastName[0] }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar
              color="accent"
              class="mb-2"
            >
              <span class="white--text text-h5">{{ profile.firstName[0] + profile.lastName[0] }}</span>
            </v-avatar>
            <h3>{{ profile.firstName + " " + profile.lastName }}</h3>
            <p class="text-caption mt-1">
              {{ profile.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn
              depressed
              rounded
              text
              @click="exitApp"
            >
              Logout
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "ProfileDropdown",
    computed: {
      ...mapGetters("profileModule", ["profile"])
    },

    methods: {
      ...mapActions("authModule", ["logout"]),
      async exitApp() {
        await this.logout();
      }
    }
  }
</script>

<style scoped>

</style>
