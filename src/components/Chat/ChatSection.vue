<template>
  <custom-card no-header>
    <template v-slot:body>
      <v-row>
        <v-col cols="5">
          <chat-list @toggle="(chatId) => onToggle(chatId)" :chats="chats" />
        </v-col>
        <v-col cols="7" v-if="currChat">
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

  export default {
    name: "ChatSection",
    components: {MessageList, ChatList, CustomCard},
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
        resetChat: "chatModule/resetChat"
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
      }
    }
  }
</script>

<style scoped>

</style>
