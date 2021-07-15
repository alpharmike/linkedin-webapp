<template>
  <custom-card title="Add Skills" :card-loading="submitLoading">
    <template v-slot:body>
      <v-form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12">
            <v-textarea
              label="Summary"
              v-model="info.about"
              clearable
              outlined
              dense
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
        :disabled="submitLoading || info.about === ''"
        @click="submitForm"
        small
      >
        Submit
      </v-btn>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import {mapActions, mapGetters} from "vuex";
  import {enableSnackbar} from "../../utils/error_utils";

  export default {
    name: "AboutForm",
    components: {CustomCard},
    computed: {
      ...mapGetters({
        profile: "profileModule/profile"
      }),
    },
    data() {
      return {
        // Set it to value from profile at mounted/created
        info: {
          about: "",
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
        editProfile: "profileModule/editProfile",
        getProfile: "profileModule/getProfile",
      }),
      submitForm() {
        this.submitLoading = true;
        let payload = {...this.info};
        this.editProfile(payload).then(async () => {
          this.$emit('close');
          enableSnackbar(this.reqStatus, "About section updated successfully!", "info");
          this.$emit('show-alert', this.reqStatus);
          await this.getProfile();
          this.$emit('edited');
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
