<template>
  <custom-card title="Create a post" :card-loading="submitLoading">
    <template v-slot:body>
      <validation-observer ref="postObserver" v-slot="">
        <v-form @submit.prevent="submitForm">
          <v-row>
            <v-col cols="12" v-for="(field, index) in fields" :key="index">
              <validation-provider
                v-slot="{ errors }"
                :name="field.name"
                :rules="field.rules"
              >
                <v-select
                  v-if="field.type === 'select'"
                  :items="field.items"
                  :label="field.name"
                  v-model="postInfo[field.model]"
                  :value="postInfo[field.model]"
                  :item-text="field.text"
                  :item-value="field.value"
                  dense
                  outlined
                  clearable
                  :error-messages="errors"
                ></v-select>
                <v-textarea
                  v-else-if="field.type === 'textarea'"
                  :error-messages="errors"
                  :label="field.name"
                  v-model="postInfo[field.model]"
                  clearable
                  :required="field.required"
                  outlined
                  dense
                  :type="field.type"
                ></v-textarea>
                <v-text-field
                  v-else
                  :error-messages="errors"
                  :label="field.name"
                  v-model="postInfo[field.model]"
                  clearable
                  :required="field.required"
                  outlined
                  dense
                  :type="field.type"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
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
        Discard
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
        :disabled="submitLoading"
        @click="submitForm"
        small
      >
        Post
      </v-btn>

      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message" :type="reqStatus.type" />
    </template>
  </custom-card>
</template>

<script>
  import {required} from 'vee-validate/dist/rules'
  import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
  import {mapActions, mapGetters} from "vuex";
  import CustomDatePicker from "../Inputs/CustomDatePicker";
  import CustomCard from "../Cards/CustomCard";
  import {enableSnackbar} from "../../utils/error_utils";
  import CustomAlert from "../Alerts/CustomAlert";

  setInteractionMode('eager');

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  export default {
    name: "PostForm",
    components: {CustomAlert, CustomCard, ValidationObserver, ValidationProvider},
    /*props: {
      edit: {type: Boolean, default: false},
      editingPost: {type: Object}
    },*/
    computed: {
      ...mapGetters({
        postVisTypes: "typeModule/postVisTypes",
        profile: "profileModule/profile"
      }),
      fields() {
        return [
          {
            name: "Title",
            rules: "required",
            required: true,
            type: "text",
            model: "title"
          },
          {
            name: "Post Visibility Type",
            rules: "required",
            required: true,
            type: "select",
            text: "name",
            value: "id",
            items: this.postVisTypes,
            model: "showPostType"
          },
          {
            name: "What do you want to talk about?",
            rules: "",
            required: false,
            type: "textarea",
            model: "body"
          }
        ]
      },
    },

    data() {
      return {
        postInfo: {
          title: "",
          showPostType: "",
          body: ""
        },
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
        submitLoading: false,
        currEditingPost: null,
      }
    },

    methods: {
      ...mapActions({
        createPost: "postModule/createPost",
      }),
      submitForm() {
        this.submitLoading = true;
        this.$refs.postObserver.validate().then(result => {
          if (result) { // if data is validated and has no problem
            let payload = {
              ...this.postInfo,
              profileId: this.profile.id
            }
            // Code for API nad store
            this.createPost(payload).then(async () => {
              this.$emit('close');
              enableSnackbar(this.reqStatus, "Post created successfully!", "info");
              this.$emit('show-alert', this.reqStatus);
              // await this.getProfile();
              // this.$emit('edited')
            }).catch(err => {
              enableSnackbar(this.reqStatus, err.message, "error")
            }).finally(() => {
              this.submitLoading = false;
            })
          }
        }).catch(err => {
          this.submitLoading = false;
          enableSnackbar(this.reqStatus, err.message, "error")
        })
      }
    },
  }
</script>

<style scoped>

</style>
