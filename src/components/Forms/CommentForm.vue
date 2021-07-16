<template>
  <custom-card title="Write your comment" :card-loading="submitLoading">
    <template v-slot:body>
      <v-form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12">
            <v-textarea
              label="Write your comment"
              v-model="commentInfo.body"
              clearable
              outlined
              dense
              rows="2"
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </template>
    <template v-slot:actions>
      <v-btn
        class="mx-4 px-5 my-1"
        large
        color="primary"
        rounded
        type="submit"
        :disabled="submitLoading"
        @click="$emit('close')"
        small
        outlined

      >
        Cancel
      </v-btn>
      <v-spacer/>
      <v-btn
        class="mx-4 px-5 my-1"
        large
        color="primary"
        rounded
        width="150"
        type="submit"
        :loading="submitLoading"
        :disabled="submitLoading || commentInfo.body === ''"
        @click="submitForm"
        small
      >
        Submit
      </v-btn>

      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message" :type="reqStatus.type" />
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import {mapActions, mapGetters} from "vuex";
  import {enableSnackbar} from "../../utils/error_utils";
  import CustomAlert from "../Alerts/CustomAlert";

  export default {
    name: "CommentForm",
    components: {CustomAlert, CustomCard},
    computed: {
      ...mapGetters({
        profile: "profileModule/profile"
      }),
    },
    props: {
      post: {type: Object, required: true}
    },
    data() {
      return {
        // Set it to value from profile at mounted/created
        commentInfo: {
          body: "",
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
        createComment: "postModule/createComment"

      }),
      submitForm() {
        this.submitLoading = true;
        let payload = {...this.commentInfo, postId: this.post.id};
        this.createComment(payload).then(async () => {
          this.$emit('close');
          enableSnackbar(this.reqStatus, "Comment added successfully!", "info");
          this.$emit('comment');
          this.$emit('show-alert', this.reqStatus);
        }).catch(err => {
          enableSnackbar(this.reqStatus, err.message, "error")
        }).finally(() => {
          this.submitLoading = false;
        })
      }
    },

    mounted() {
      this.info = {...this.profile};
    }
  }
</script>

<style scoped>

</style>
