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
      </v-card-text>
    </template>
    <template v-slot:actions>
      <v-row justify="space-between" align="center" class="py-1 px-4">
        <v-col cols="12" md="2" sm="2">
          <v-btn
            small
            outlined
            color="primary lighten-2"
          >
            Add Comment
          </v-btn>
        </v-col>
        <v-col cols="12" md="3" sm="4">
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
            >
              <v-icon>mdi-comment</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import {mapActions, mapGetters} from "vuex";
  import {enableSnackbar} from "../../utils/error_utils";

  export default {
    name: "PostItem",
    components: {CustomCard},
    props: {
      post: {type: Object}
    },

    computed: {
      ...mapGetters({
        profile: "profileModule/profile"
      }),
      alreadyLiked() {
        const index = this.post.likeJsons.findIndex(likeItem => likeItem.profileId === this.profile.id);
        console.log(index)
        return index >= 0;
      },

      myPostLike() {
        const index = this.post.likeJsons.findIndex(likeItem => likeItem.profileId === this.profile.id);
        return this.post.likeJsons[index];
      }
    },

    methods: {
      ...mapActions({
        likePost: "postModule/likePost",
        removePostLike: "postModule/removePostLike"
      }),
      toggleLike() {
        console.log(this.post);
        console.log(this.myPostLike);
        if (this.alreadyLiked) {
          this.removePostLike(this.myPostLike.id).then(() => {
            this.$emit('toggle-like');
          }).catch(err => {
            enableSnackbar(this.reqStatus, err.message, "error")
            this.$emit('error', this.reqStatus)
          })
        } else {
          const payload = {
            postId: this.post.id
          }
          this.likePost(payload).then(() => {
            this.$emit('toggle-like');
          }).catch(err => {
            enableSnackbar(this.reqStatus, err.message, "error")
            this.$emit('error', this.reqStatus)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
