<template>
  <custom-card :title="itemType === 'comment' ? 'Comments' : 'Replies'">
    <template v-slot:body>
      <v-list three-line>
        <template v-for="comment in comments">
          <v-list-item
            :key="comment.body + comment.id"
            :class="{'primary': reply.comment !== null && comment.id === reply.comment.id}"
          >
            <v-list-item-avatar>
              <user-avatar font-class="white--text" size="42" :initials="comment.profileJson.firstName[0] + comment.profileJson.lastName[0]" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{`${comment.profileJson.firstName} ${comment.profileJson.lastName}`}}</v-list-item-title>
              <v-list-item-subtitle>{{comment.body}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{comment.createdDate}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action v-if="itemType === 'comment'">
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
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>

      <custom-dialog :show.sync="viewReplies.dialog" width="40%" v-if="viewReplies.comment">
        <template v-slot:body>
          <comments-section item-type="reply" @comment-action="$emit('post-action')" :comments="viewReplies.comment.commentJsonsChild" @close="closeViewReplies" @show-alert="(alert) => reqStatus = alert"  />
        </template>
      </custom-dialog>
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
  import CustomDialog from "../Dialogs/CustomDialog";

  export default {
    name: "CommentsSection",
    components: {CustomDialog, UserAvatar, CustomCard},
    props: {
      comments: {type: Array, required: true},
      itemType: {type: String, required: true} // comment or reply
    },

    computed: {
      ...mapGetters({
        profile: "profileModule/profile"
      }),
    },

    data() {
      return {
        reply: {
          text: "",
          comment: null,
          open: false,
        },

        viewReplies: {
          comment: null,
          dialog: false,
        },

        reqStatus: {
          message: "",
          type: "",
          status: false
        },

        submitLoading: false
      }
    },

    methods: {
      ...mapActions({
        likeComment: "postModule/likeComment",
        removeCommentLike: "postModule/removeCommentLike",
        createComment: "postModule/createComment"
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
          this.likeComment(payload).then(async () => {
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
        this.reply.comment = {...comment};
        this.reply.open = true;
      },

      cancelReply() {
        this.reply.open = false;
        this.reply.comment = null;
      },

      submitReply() {
        this.submitLoading = true;
        // CONNECT TO API
        let payload = {
          profileId: this.profile.id,
          body: this.reply.text,
          reCommentId: this.reply.comment.id,
          postId: this.reply.comment.postId,
        };
        this.createComment(payload).then(async () => {
          this.$emit('close');
          enableSnackbar(this.reqStatus, "Comment replied successfully!", "info");
          this.$emit('comment');
          this.$emit('show-alert', this.reqStatus);
          this.reply.text = "";
          this.reply.comment = null;
          this.reply.open = false;
        }).catch(err => {
          enableSnackbar(this.reqStatus, err.message, "error")
        }).finally(() => {
          this.submitLoading = false;
        })

        this.submitLoading = false;
      },

      isMyComment(comment) {
        return comment.profileId === this.profile.id;
      },

      initViewReplies(comment) {
        this.viewReplies.comment = {...comment};
        this.viewReplies.dialog = true
      },

      closeViewReplies() {
        this.viewReplies.comment = null;
        this.viewReplies.dialog = false;
      }
    },
    mounted() {
      console.log(this.comments)
    }
  }
</script>

<style scoped>

</style>
