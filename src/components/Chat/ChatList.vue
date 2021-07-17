<template>
  <custom-card no-header color="secondary darken-1">
    <template v-slot:body>
      <v-list three-line dense >
        <template v-for="chat in chats">
          <v-list-item
            :key="`${chat.id}-${chat.myProfileId}-${chat.otherProfileId}`"
            dense
            ripple
            @click="() => setCurrentChat(chat)"
          >
            <v-list-item-avatar>
              <user-avatar font-class="white--text" size="42" :initials="chat.otherProfile.firstName[0] + chat.otherProfile.lastName[0]" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{`${chat.otherProfile.firstName} ${chat.otherProfile.lastName}`}}</v-list-item-title>
              <v-list-item-subtitle>{{'@' + chat.otherProfile.username}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-row>
                <v-btn icon color="primary lighten-4">
                  <v-icon>mdi-archive</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="red"
                  @click.stop="() => initToggleUnread(chat)"
                >
                  <v-icon v-if="chat.markUnread">mdi-eye</v-icon>
                  <v-icon v-else>mdi-eye-off</v-icon>
                </v-btn>
              </v-row>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>

      <dialog-alert
        title="Toggle Unread"
        msg="Are you sure you want to toggle the selected chat's unread status?"
        :show.sync="unreadStatus.dialog"
        :is-loading="unreadStatus.loading"
        @cancel="cancelUnread"
        @accept="toggleUnread"
      />

      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message" :type="reqStatus.type" />

    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import {mapActions, mapGetters} from "vuex";
  import UserAvatar from "../Avatars/UserAvatar";
  import DialogAlert from "../Alerts/DialogAlert";
  import {enableSnackbar} from "../../utils/error_utils";
  import CustomAlert from "../Alerts/CustomAlert";
  // import UserAvatar from "../Avatars/UserAvatar";

  export default {
    name: "ChatList",
    components: {
      CustomAlert,
      DialogAlert,
      UserAvatar,
      /*UserAvatar, */CustomCard},
    props: {
      chats: {type: Array}
    },
    computed: {
      ...mapGetters({
        curChat: "chatModule/currChat",
        allChats: "chatModule/chats"
      })
    },

    data() {
      return {
        tab: 1,
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
        unreadStatus: {
          loading: false,
          dialog: false,
          chat: null,
        }
      }
    },

    methods: {
      ...mapActions({
        setCurrChat: "chatModule/setCurrChat",
        toggleUnreadStatus: "chatModule/toggleUnreadStatus"
      }),
      async setCurrentChat(chat) {
        await this.setCurrChat(chat)
      },

      toggleUnread() {
        this.unreadStatus.loading = true;
        this.toggleUnreadStatus(this.unreadStatus.chat.id).then(async () => {
          this.unreadStatus.loading = false;
          this.unreadStatus.dialog = false;
          enableSnackbar(this.reqStatus, "Chat unread status toggled successfully!", "info");
          const chatId = this.unreadStatus.chat.id;
          this.$emit('toggle', chatId);
          this.unreadStatus.chat = null;
        }).catch(err => {
          enableSnackbar(this.reqStatus, err.message, "error")
        }).finally(() => {
          this.unreadStatus.loading = false;
        })
      },

      initToggleUnread(chat) {
        this.unreadStatus.chat = {...chat};
        this.unreadStatus.dialog = true;
      },

      cancelUnread() {
        this.unreadStatus.chat = null;
      }
    }
  }
</script>

<style scoped>

</style>
