<template>
  <custom-card no-header>
    <template v-slot:body>
      <v-row>
        <v-col cols="5">
          <chat-search-bar class="mt-7 ml-4 mr-2" @search-chat="(keyword) => filterChats(keyword)" />
          <chat-list @toggle="(chatId) => onToggle(chatId)" :chats="chats" />
        </v-col>
        <v-col cols="7" v-if="currChat">
          <message-search-bar @search-message="(keyword) => filterMessages(keyword)" />
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
  import MessageSearchBar from "./MessageSearchBar";

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
        searchChatUser: "chatModule/searchChatUser",
        searchChatMessage: "chatModule/searchChatMessage"
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
          const payload = {
            keyword: keyword,
            chatType: this.section
          }
          await this.searchChatUser(payload);
        }
      },

      async filterMessages(keyword) {
        if (!keyword || keyword === '') {
          // get the chat with all its messages
          await this.fetchChat();
        } else {
          const payload = {
            chatId: this.currChat.id,
            keyword: keyword,
          }
          await this.searchChatMessage(payload);
        }
      }
    }
  }
</script>

<style scoped>

</style>
