<template>
  <custom-card title="Chats">
    <template v-slot:body>
      <v-tabs
        v-model="tab"
        centered
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1">
          Chat
          <v-icon>mdi-chat</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Unread
          <v-icon>mdi-email-mark-as-unread </v-icon>
        </v-tab>

        <v-tab href="#tab-3">
          Archive
          <v-icon>mdi-archive</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="i in 3"
          :key="i"
          :value="'tab-' + i"
        >
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>


      <!--All with same type-->
      <!--<v-list three-line>
        <template v-for="(item, index) in items">
          <v-list-item
            v-else
            :key="item.title"
          >
            <v-list-item-avatar>
              <user-avatar/>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>-->
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import UserAvatar from "../Avatars/UserAvatar";

  export default {
    name: "Chat",
    components: {UserAvatar, CustomCard},
    computed: {
      chats() {

      }
    },

    data() {
      return {
        tab: 1
      }
    }
  }
</script>

<style scoped>

</style>
