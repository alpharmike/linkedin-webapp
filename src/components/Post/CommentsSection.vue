<template>
  <custom-card title="Comments">
    <template v-slot:body>
      <v-list three-line>
        <template v-for="comment in comments">
          <v-list-item
            :key="comment.body + comment.id"
            :class="{'primary': comment.id === reply.commentId}"
          >
            <v-list-item-avatar>
              <user-avatar font-class="white--text" size="42" :initials="comment.profileJson.firstName[0] + comment.profileJson.lastName[0]" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{`${comment.profileJson.firstName} ${comment.profileJson.lastName}`}}</v-list-item-title>
              <v-list-item-subtitle>{{comment.body}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{comment.createdDate}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-row>
                <v-btn @click="() => initReply(comment)" icon color="primary lighten-4">
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
              </v-row>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </template>
    <template v-slot:actions v-if="reply.open">
      <v-row class="my-2">
        <v-col cols="12">
          <v-textarea
            label="Reply the comment"
            v-model="reply.text"
            clearable
            outlined
            dense
            rows="2"
            auto-grow
          ></v-textarea>
        </v-col>
        <v-btn
          class="mx-4 px-5 my-1"
          color="primary"
          rounded
          :disabled="submitLoading"
          @click="cancelReply"
          outlined
        >
          Cancel
        </v-btn>
        <v-spacer/>
        <v-btn
          class="mx-4 px-5 my-1"
          color="primary"
          rounded
          width="150"
          type="submit"
          :loading="submitLoading"
          :disabled="submitLoading || reply.text === ''"
          @click="submitReply"
        >
          Submit
        </v-btn>
      </v-row>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import UserAvatar from "../Avatars/UserAvatar";
  import {mapActions, mapGetters} from "vuex";
  import {enableSnackbar} from "../../utils/error_utils";

  export default {
    name: "CommentsSection",
    components: {UserAvatar, CustomCard},
    props: {
      comments: {type: Array, required: true}
    },

    computed: {
      ...mapGetters({
        profile: "profileModule/profile"
      })
    },

    data() {
      return {
        reply: {
          text: "",
          commentId: null,
          open: false,
        },
        submitLoading: false
      }
    },

    methods: {
      ...mapActions({
        likeComment: "postModule/likeComment",
        removeCommentLike: "postModule/removeCommentLike"
      }),

      toggleLike(comment) {
        console.log(comment);
        if (this.alreadyLiked(comment)) {
          const likeItem = this.getMyCommentLike(comment);
          this.removeCommentLike(likeItem.id).then(async () => {
            this.$emit('comment-action');
          }).catch(err => {
            enableSnackbar(this.reqStatus, err.message, "error")
            this.$emit('error', this.reqStatus)
          })
        } else {
          const payload = {
            commentId: comment.id
          }
          this.likePost(payload).then(async () => {
            this.$emit('comment-action');
          }).catch(err => {
            enableSnackbar(this.reqStatus, err.message, "error")
            this.$emit('error', this.reqStatus)
          })
        }
      },

      alreadyLiked(comment) {
        const index = comment.likeJsons.findIndex(item => item.profileId === this.profile.id);
        return index >= 0;
      },

      getMyCommentLike(comment) {
        const index = comment.likeJsons.findIndex(likeItem => likeItem.profileId === this.profile.id);
        return comment.likeJsons[index];
      },

      initReply(comment) {
        this.reply.commentId = comment.id;
        this.reply.open = true;
      },

      cancelReply() {
        this.reply.commentId = null;
        this.reply.open = false;
      },

      submitReply() {
        this.submitLoading = true;
        // CONNECT TO API


        this.submitLoading = false;
      }
    }
  }
</script>

<style scoped>

</style>
