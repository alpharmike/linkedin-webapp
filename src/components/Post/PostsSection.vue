<template>
  <custom-card :title="title">
    <template v-slot:body>
      <v-row justify="space-around">
        <v-col v-for="post in posts" cols="4" sm="5" :key="post.createdDate + post.id">
          <post-item @post-action="$emit('post-action')" :show-author="showAuthor" @error="(alert) => reqStatus = alert" :post="post"/>
        </v-col>
      </v-row>

      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status"
                    :message="reqStatus.message" :type="reqStatus.type"/>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import PostItem from "./PostItem";
  import CustomAlert from "../Alerts/CustomAlert";

  export default {
    name: "PostsSection",
    components: {CustomAlert, PostItem, CustomCard},
    props: {
      title: {type: String, default: ''},
      posts: {type: Array, required: true},
      relatedTo: {type: String, required: true},
      showAuthor: {type: Boolean, default: false}
    },

    data() {
      return {
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
      }
    }
  }
</script>

<style scoped>

</style>
