<template>
  <custom-card
    class="mx-auto"
    no-header
    color="secondary darken-1"
  >
    <template v-slot:body>
      <v-card-text class="text--primary">
        <div class="text-h6">{{post.title}}</div>
        <div class="text-body-1">{{post.body}}</div>
        <v-card-subtitle class="pb-0 ma-0 pa-0">{{post.createdDate}}</v-card-subtitle>
        <v-card-subtitle v-if="showAuthor" class="pb-0 ma-0 pa-0">{{`By ${post.profileJson.firstName} ${post.profileJson.lastName}`}}</v-card-subtitle>
        <v-row class="mt-1">
          <v-col cols="6" v-if="post.likeJsons.length > 0">
            <v-card-subtitle class="pb-0 ma-0 pa-0 grey--text">{{ `Liked by ${post.likeJsons.length} people`}}</v-card-subtitle>
          </v-col>
          <v-col cols="6" v-if="post.commentJsons.length > 0">
            <v-card-subtitle class="pb-0 ma-0 pa-0 grey--text">{{ `Commented by ${post.likeJsons.length} people`}}</v-card-subtitle>
          </v-col>
        </v-row>
        <v-card-subtitle v-if="post.sharedId" class="pb-0 my-2 pa-0">{{`Shared from ${post.sharedIdJson.profileJson.firstName} ${post.sharedIdJson.profileJson.lastName}`}}</v-card-subtitle>
      </v-card-text>

    </template>
    <template v-slot:actions>
      <v-row justify="space-between" align="center" class="py-1 px-4" v-if="actionsAllowed">
        <v-col cols="12" md="2" sm="2">
          <v-btn
            small
            outlined
            color="primary lighten-2"
            @click="dialogs.addCommentDialog = true"
          >
            Add Comment
          </v-btn>
        </v-col>
        <v-spacer />
        <v-col cols="12" md="5" sm="4">
          <v-row>
            <v-btn
              icon
              color="red"
              @click="toggleLike"
            >
              <v-icon v-if="alreadyLiked">mdi-heart</v-icon>
              <v-icon v-else>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn
              icon
              color="primary lighten-4"
              @click="dialogs.commentsDialog = true"
            >
              <v-icon>mdi-comment</v-icon>
            </v-btn>
            <v-btn
              v-if="!isMyPost"
              icon
              color="primary lighten-4"
              @click="share.dialog = true"
            >
              <v-icon>mdi-share</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>

      <custom-dialog :show.sync="dialogs.addCommentDialog" width="40%">
        <template v-slot:body>
          <comment-form :post="post" @close="dialogs.addCommentDialog = false" @show-alert="(alert) => reqStatus = alert" @comment="$emit('post-action')" />
        </template>
      </custom-dialog>
      <custom-dialog :show.sync="dialogs.commentsDialog" width="60%">
        <template v-slot:body>
          <comments-section @comment-action="$emit('post-action')" :comments="post.commentJsons" @close="dialogs.commentsDialog = false" @show-alert="(alert) => reqStatus = alert" @comment="$emit('post-action')" />
        </template>
      </custom-dialog>
      <dialog-alert
        title="Post Share"
        msg="Are you sure you want to share the post?"
        :show.sync="share.dialog"
        :is-loading="share.loading"
        @cancel="share.dialog = false"
        @accept="sharePost"
      />
      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message" :type="reqStatus.type" />
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import {mapActions, mapGetters} from "vuex";
  import {enableSnackbar} from "../../utils/error_utils";
  import CustomDialog from "../Dialogs/CustomDialog";
  import CommentForm from "../Forms/CommentForm";
  import CustomAlert from "../Alerts/CustomAlert";
  import CommentsSection from "./CommentsSection";
  import DialogAlert from "../Alerts/DialogAlert";

  export default {
    name: "PostItem",
    components: {DialogAlert, CommentsSection, CustomAlert, CommentForm, CustomDialog, CustomCard},
    props: {
      post: {type: Object},
      showAuthor: {type: Boolean, default: false},
    },

    computed: {
      ...mapGetters({
        profile: "profileModule/profile",
        peopleInNetwork: "networkModule/peopleInNetwork",
      }),

      actionsAllowed() {
        if (this.post.profileId === this.profile.id) return true;
        // another user, in this case, check if the user in my network
        const index = this.peopleInNetwork.findIndex(userProfile => userProfile.id === this.post.profileId);
        return index >= 0;
      },
      alreadyLiked() {
        console.log(this.post)
        const index = this.post.likeJsons.findIndex(likeItem => likeItem.profileId === this.profile.id);
        console.log(index)
        return index >= 0;
      },

      myPostLike() {
        const index = this.post.likeJsons.findIndex(likeItem => likeItem.profileId === this.profile.id);
        return this.post.likeJsons[index];
      },

      isMyPost() {
        return this.post.profileId === this.profile.id;
      }
    },

    data() {
      return {
        dialogs: {
          addCommentDialog: false,
          commentsDialog: false,

        },
        share: {
          dialog: false,
          loading: false
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
        likePost: "postModule/likePost",
        removePostLike: "postModule/removePostLike",
        createPost: "postModule/createPost"
      }),
      toggleLike() {
        console.log(this.post);
        console.log(this.myPostLike);
        if (this.alreadyLiked) {
          this.removePostLike(this.myPostLike.id).then(async () => {
            this.$emit('post-action');
          }).catch(err => {
            enableSnackbar(this.reqStatus, err.message, "error")
            this.$emit('error', this.reqStatus)
          })
        } else {
          const payload = {
            postId: this.post.id
          }
          this.likePost(payload).then(async () => {
            this.$emit('post-action');
          }).catch(err => {
            enableSnackbar(this.reqStatus, err.message, "error")
            this.$emit('error', this.reqStatus)
          })
        }
      },

      sharePost() {
        this.share.loading = true;
        let payload = {
          profileId: this.profile.id,
          sharedId: this.post.id,
          showPostType: this.post.showPostType,
          body: this.post.body,
          title: this.post.title,
        }
        // Code for API nad store
        this.createPost(payload).then(async () => {
          this.share.loading = false;
          this.$emit('close');
          enableSnackbar(this.reqStatus, "Post shared successfully!", "info");
          this.$emit('show-alert', this.reqStatus);
          // await this.getProfile();
          // this.$emit('edited')
        }).catch(err => {
          enableSnackbar(this.reqStatus, err.message, "error")
        }).finally(() => {
          this.share.loading = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
