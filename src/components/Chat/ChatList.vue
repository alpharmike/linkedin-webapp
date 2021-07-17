<template>
  <custom-card no-header color="secondary darken-1">
    <template v-slot:body>
      <v-list three-line dense rounded>
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
            <!--<v-list-item-action v-if="itemType === 'comment'">
              <v-row>
                <v-btn v-if="!isMyComment(comment)" @click="() => initReply(comment)" icon color="primary lighten-4">
                  <v-icon>mdi-reply</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="red"
                  @click="() => toggleLike(comment)"
                >
                  <v-icon v-if="alreadyLiked(comment)">mdi-heart</v-icon>
                  <v-icon v-else>mdi-heart-outline</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="primary"
                  v-if="comment.commentJsonsChild && comment.commentJsonsChild.length > 0"
                  @click="() => initViewReplies(comment)"
                >
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </v-row>
            </v-list-item-action>-->
          </v-list-item>
        </template>
      </v-list>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import {mapActions, mapGetters} from "vuex";
  import UserAvatar from "../Avatars/UserAvatar";
  // import UserAvatar from "../Avatars/UserAvatar";

  export default {
    name: "ChatList",
    components: {
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
        tab: 1
      }
    },

    methods: {
      ...mapActions({
        setCurrChat: "chatModule/setCurrChat"
      }),
      async setCurrentChat(chat) {
        await this.setCurrChat(chat)
      }
    }
  }
</script>

<style scoped>

</style>
