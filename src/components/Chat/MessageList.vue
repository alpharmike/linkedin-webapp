<template>
  <custom-card :title="chattingUserInfo">
    <template v-slot:body>
      <message-item
        v-for="message in currChat.messageJsons"
        :key="message.id"
        :is-me="isMyMessage(message)"
      >
        <div>
          <span class="mb-0">{{message.body}}</span>
        </div>
      </message-item>
    </template>

    <template v-slot:actions>
      <v-row class="mt-5" align="center">
        <v-col cols="10">
          <v-textarea
            label="Reply the comment"
            v-model="message.text"
            clearable
            outlined
            dense
            rows="2"
            auto-grow
          ></v-textarea>
        </v-col>
        <v-col cols="2">
          <v-btn
            class="mx-2"
            color="primary"
            rounded
            large
            icon
            @click="sendMessage"
            :loading="message.loading"
            :disabled="message.loading || message.text === ''"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>

  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import MessageItem from "./MessageItem";
  import {mapGetters} from "vuex";

  export default {
    name: "MessageList",
    components: {MessageItem, CustomCard},
    computed: {
      ...mapGetters({
        currChat: "chatModule/currChat",
        profile: "profileModule/profile"
      }),

      chattingUserInfo() {
        return this.currChat.otherProfile.firstName + " " + this.currChat.otherProfile.lastName;
      },
    },

    data() {
      return {
        message: {
          text: "",
          loading: false,
        }
      }
    },

    methods: {
      isMyMessage(message) {
        return this.profile.id === message.senderId;
      },

      sendMessage() {

      }
    }
  }
</script>

<style scoped>

</style>
