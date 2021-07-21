<template>
  <v-row align="center">
    <v-autocomplete
      append-icon="mdi-magnify"
      :items="filteredUsers"
      @update:search-input="filterUsers"
      chips
      class="align-center mt-7 ml-4 mr-2"
      rounded
      outlined
      dense
      no-filter
      color="blue-grey lighten-2"
      label="Search People"
      item-text="username"
      item-value="username"
    >

      <!--            this template can be removed-->
      <!--<template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="remove(data.item)"
        >
          <v-avatar left>
            <v-img v-if="data.item.avatar" :src="data.item.avatar"></v-img>
            <v-icon v-else dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
          {{ data.item.username }}
        </v-chip>
      </template>-->
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item @click="() => routeToProfile(data.item.username)" dense>
            <v-list-item-avatar>
              <user-avatar size="30" font-class="white--text text-sm-subtitle-2" :initials="data.item.firstName[0] + data.item.lastName[0]" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{data.item.firstName + " " + data.item.lastName}}</v-list-item-title>
              <v-list-item-subtitle>{{'@' + data.item.username}}</v-list-item-subtitle>
              <v-list-item-subtitle v-if="findEnabledFilter().model === 'sortedName'">{{`${data.item.mutualConnectionsCount} mutual connections`}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
    </v-autocomplete>

    <v-menu
      v-model="filterMenu"
      :close-on-content-click="false"
      :nudge-width="200"
      open-on-hover
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon>mdi-tune</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item v-for="filter in filters" :key="filter.name">
            <v-list-item-action>
              <v-switch
                @change="() => updateFilters(filter)"
                :value="filter.value"
                color="accent darken-2"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-title>{{filter.name}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-row>

</template>

<script>
  import UserAvatar from "../Avatars/UserAvatar";
  import {mapActions} from "vuex";
  export default {
    name: "SearchBar",
    components: {UserAvatar},
    computed: {
    },

    data() {
      return {
        pageLoading: true,
        disable: false,
        filterMenu: false,
        filteredUsers: [],
        keyword: "",
        filters: [
          {
            name: "Name / Username",
            model: "name",
            value: true
          },
          {
            name: "Name / Username (Sorted by connection)",
            model: "sortedName",
            value: false
          },
          {
            name: "Current company",
            model: "company",
            value: false
          },
          {
            name: "Location",
            model: "location",
            value: false
          },
          {
            name: "Language",
            model: "language",
            value: false
          }
        ]
      }
    },

    methods: {
      ...mapActions({
        searchProfiles: "profileModule/searchProfiles"
      }),
      test() {
        console.log("asdas")
      },

      routeToProfile(username) {
        this.$router.push(`/profile/${username}`);
        location.reload();
      },

      loadPosts() {
        /*++this.page;
        this.getAllPosts(this.page).then(() => {

        })*/
      },

      filterUsers(event) {
        this.keyword = event;
        if (!event || event === "") {
          return;
        }


        let filter = this.findEnabledFilter();
        this.applyFilter(filter);
      },

      applyFilter(enabledFilter) {
        const payload = {
          keyword: this.keyword,
          filter: enabledFilter.model
        };

        this.searchProfiles(payload).then((profiles) => {
          console.log(profiles)
          this.filteredUsers = profiles;
        })
      },

      updateFilters(filter) {
        if (filter.model === "name" && filter.value) {
          return;
        }
        let index = this.filters.findIndex(item => item.model === filter.model);
        const prevValue = this.filters[index].value;
        this.filters.forEach(item => item.value = false);
        index = this.filters.findIndex(item => item.model === filter.model);
        this.filters[index].value = !prevValue;
        index = this.filters.findIndex(item => item.value);
        if (index < 0) {
          this.filters[0].value = true;
        }
      },

      findEnabledFilter() {
        const index = this.filters.findIndex(item => item.value);
        if (index < 0) {
          // filter by name
          return this.filters[0];
        }
        return this.filters[index];
      },

      remove (item) {
        console.log(item)
        const index = this.filteredUsers.indexOf(item)
        if (index >= 0) this.filteredUsers.splice(index, 1)
      },
    },


  }
</script>

<style scoped>

</style>
