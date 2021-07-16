<template>
  <custom-card title="Featured">
    <template v-slot:body>
      <v-row>
        <v-col v-for="post in myPosts" cols="4" sm="5" :key="post.createdDate + post.id">
          <post-item @toggle-like="fetchPosts" @error="(alert) => reqStatus = alert" :post="post" />
        </v-col>
      </v-row>

      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message" :type="reqStatus.type" />
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
    },

    computed: {
      ...mapGetters({
        myPosts: "postModule/myPosts"
      })
    },

    data() {
      return {
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
      }
    },

    methods: {
      ...mapActions({
        getPosts: "postModule/getPosts"
      }),
      async fetchPosts() {
        await this.getPosts();
      }
    }


  }
</script>

<style scoped>

</style>
