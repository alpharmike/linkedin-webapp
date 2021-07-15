<template>
  <custom-card no-header>
    <template v-slot:body>
      <v-row justify="center">
        <v-col cols="2">
          <user-avatar :initials="profile.firstName[0] + profile.lastName[0]"/>
        </v-col>
        <v-col cols="8">
          <v-text-field
            label="Start a post"
            outlined
            dense
            rounded
            readonly
            @click.prevent="postDialog = true"
          />
        </v-col>
      </v-row>
      <custom-dialog :show.sync="postDialog" width="50%">
        <template v-slot:body>
          <post-form @close="postDialog = false" @show-alert="(alert) => reqStatus = alert" />
        </template>
      </custom-dialog>
      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message" :type="reqStatus.type" />
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import UserAvatar from "../Avatars/UserAvatar";
  import {mapGetters} from "vuex";
  import PostForm from "../Forms/PostForm";
  import CustomDialog from "../Dialogs/CustomDialog";
  import CustomAlert from "../Alerts/CustomAlert";

  export default {
    name: "CreatePostSection",
    components: {CustomAlert, CustomDialog, PostForm, UserAvatar, CustomCard},
    computed: {
      ...mapGetters({
        profile: "profileModule/profile"
      })
    },

    data() {
      return {
        postDialog: false,
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
