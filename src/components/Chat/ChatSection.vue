<template>
  <custom-card no-header>
    <template v-slot:body>
      <v-row>
        <v-col cols="5">
          <chat-search-bar class="mt-7 ml-4 mr-2" @search-chat="(keyword) => filterChats(keyword)" />
          <chat-list @toggle="(chatId) => onToggle(chatId)" :chats="chats" />
        </v-col>
        <v-col cols="7" v-if="currChat">
          <message-search-bar @search-message="(keyword) => filterMessages(currChat, keyword)" />
          <message-list @send-message="fetchChat" />
        </v-col>
      </v-row>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import ChatList from "./ChatList";
  import {mapActions, mapGetters} from "vuex";
  import MessageList from "./MessageList";
  import ChatSearchBar from "./ChatSearchBar";
  import MessageSearchBar from "./ChatSearchBar";

  export default {
    name: "ChatSection",
    components: {MessageSearchBar, ChatSearchBar, MessageList, ChatList, CustomCard},
    computed: {
      ...mapGetters({
        currChat: "chatModule/currChat",
      })
    },
    props: {
      chats: {type: Array},
      section: {type: String}
    },

    methods: {
      ...mapActions({
        getChat: "chatModule/getChat",
        getAllChats: "chatModule/getAllChats",
        getUnreadChats: "chatModule/getUnreadChats",
        getArchivedChats: "chatModule/getArchivedChats",
        resetChat: "chatModule/resetChat",
        searchChatUser: "chatModule/searchChatUser"
      }),

      async fetchChat() {
        await this.getChat(this.currChat.id);
      },

      async onToggle(chatId) {
        if (this.section === 'chats') {
          await this.getAllChats();
        } else if (this.section === 'unread') {
          await this.getUnreadChats();
        } else if (this.section === 'archive') {
          await this.getArchivedChats();
        }
      },

      async filterChats(keyword) {
        if (!keyword || keyword === '') {
          await this.onToggle();
        } else {
          await this.searchChatUser(keyword);
        }
      },

      filterMessages(currChat, keyword) {

      }
    }
  }
</script>

<style scoped>

</style>
