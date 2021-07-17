<template>
  <custom-card :title="chattingUserInfo">
    <template v-slot:body>
      <message-item
        v-for="message in currChat.messageJsons"
        :key="message.id"
        :is-me="isMyMessage(message)"
        class="mx-2"
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
            label="Type a message"
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
  import {mapActions, mapGetters} from "vuex";
  import {enableSnackbar} from "../../utils/error_utils";

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
        },

        reqStatus: {
          message: "",
          type: "",
          status: false
        },
      }
    },

    methods: {
      ...mapActions({
        createMessage: "chatModule/createMessage"
      }),
      isMyMessage(message) {
        return this.profile.id === message.senderId;
      },

      sendMessage() {
        this.message.loading = true;
        const payload = {
          chatId: this.currChat.id,
          body: this.message.text
        }

        this.createMessage(payload).then(async () => {
          this.message.loading = false;
          this.$emit('send-message');
          this.clearMessage();
        }).catch(err => {
          enableSnackbar(this.reqStatus, err.message, "error")
        }).finally(() => {
          this.message.loading = false;
        })
      },

      clearMessage() {
        this.message.text = "";
        this.message.loading = false;
      }
    }
  }
</script>

<style scoped>

</style>
