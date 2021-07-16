<template>
  <custom-card title="Comments">
    <template v-slot:body>
      <v-list three-line>
        <template v-for="comment in comments">
          <v-list-item
            :key="comment.body + comment.id"
          >
            <v-list-item-avatar>
              <user-avatar font-class="white--text" size="42" :initials="comment.profileJson.firstName[0] + comment.profileJson.lastName[0]" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{`${comment.profileJson.firstName} ${comment.profileJson.lastName}`}}</v-list-item-title>
              <v-list-item-subtitle>{{comment.body}}</v-list-item-subtitle>
              <v-list-item-subtitle>{{comment.createdDate}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import UserAvatar from "../Avatars/UserAvatar";

  export default {
    name: "CommentsSection",
    components: {UserAvatar, CustomCard},
    props: {
      comments: {type: Array, required: true}
    }
  }
</script>

<style scoped>

</style>
