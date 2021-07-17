<template>
  <custom-card no-header>
    <template v-slot:body>
      <v-row>
        <v-col cols="4">
          <chat-list :chats="chats" />
        </v-col>
        <v-col cols="8" v-if="currChat">
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
      chats: {type: Array}
    },

    methods: {
      ...mapActions({
        getChat: "chatModule/getChat"
      }),

      async fetchChat() {
        await this.getChat(this.currChat.id);
      }
    }
  }
</script>

<style scoped>

</style>
