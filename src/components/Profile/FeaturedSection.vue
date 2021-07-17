<template>
  <custom-card title="Featured" :card-loading="loading">
    <template v-slot:body>
      <v-row justify="space-around">
        <v-col v-for="post in posts" cols="4" sm="5" :key="post.createdDate + post.id">
          <post-item @post-action="fetchPosts" @error="(alert) => reqStatus = alert" :post="post"/>
        </v-col>
      </v-row>

      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status"
                    :message="reqStatus.message" :type="reqStatus.type"/>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import {mapActions, mapGetters} from "vuex";
  import PostItem from "../Post/PostItem";
  import CustomAlert from "../Alerts/CustomAlert";

  export default {
    name: "FeaturedSection",
    components: {CustomAlert, PostItem, CustomCard},
    props: {
      isMe: {type: Boolean, default: true},
      profile: {type: Object}
    },

    computed: {
      ...mapGetters({
        posts: "postModule/posts",
      }),
    },

    data() {
      return {
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
        loading: false,
      }
    },

    methods: {
      ...mapActions({
        getPosts: "postModule/getPosts"
      }),
      async fetchPosts() {
        this.loading = true;
        if (this.isMe) {
          await this.getPosts();
        } else {
          await this.getPosts(this.profile.id);
        }
        this.loading = false;
      }
    }


  }
</script>

<style scoped>

</style>
