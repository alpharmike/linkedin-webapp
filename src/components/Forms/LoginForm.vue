<template>
  <custom-card title="Login" sub-section center-title>
    <template v-slot:body>
      <validation-observer ref="loginObserver" v-slot="">
        <v-form @submit.prevent="submitLoginForm">
          <v-row>
            <v-col cols="12" v-for="(field, index) in fields" :key="index">
              <validation-provider
                v-slot="{ errors }"
                :name="field.name"
                :rules="field.rules"
              >
                <v-text-field
                  v-model="userInfo[field.model]"
                  :error-messages="errors"
                  :label="field.name"
                  clearable
                  required
                  outlined
                  dense
                  :type="field.type"
                ></v-text-field>
              </validation-provider>
            </v-col>

          </v-row>

          <v-row class="justify-center">
            <v-btn
              class="mx-4 px-5 my-1"
              large
              color="primary"
              rounded
              width="150"
              type="submit"
              :loading="loading"
            >
              Login
            </v-btn>
          </v-row>
        </v-form>

      </validation-observer>
    </template>
    <template v-slot:actions>
      <v-row justify="center" align="center" class="py-2">
        <span class="text-subtitle-2">
        Don't have an account?
      </span>
        <span>
          <v-btn
            class="mx-2 my-1 text--lighten-2"
            small
            outlined
            color="primary"
            plain
            type="submit"
            to="/register"
          >
            Register
          </v-btn>
      </span>
      </v-row>
      <custom-alert v-model="error.status" @input="error.status = !error.status" :message="error.message" :type="error.type" />
    </template>
  </custom-card>
</template>

<script>
  import {required} from 'vee-validate/dist/rules'
  import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
  import CustomCard from "../Cards/CustomCard";
  import {mapActions} from "vuex";
  import {enableError} from "../../utils/error_utils";
  import CustomAlert from "../Alerts/CustomAlert";

  setInteractionMode('eager');

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  export default {
    name: "LoginForm",
    components: {CustomAlert, CustomCard, ValidationProvider, ValidationObserver},

    computed: {
      fields() {
        return [
          {
            name: "Username",
            rules: "required",
            required: true,
            type: "text",
            model: "username"
          },
          {
            name: "Password",
            rules: "required",
            required: true,
            type: "password",
            model: "password"
          },
        ]
      },
    },

    data() {
      return {
        userInfo: {
          username: "",
          password: "",
        },
        loading: false,
        error: {
          status: false,
          message: "",
          type: ""
        },
      }
    },

    methods: {
      ...mapActions("authModule", ["login"]),
      submitLoginForm() {
        this.loading = true;
        this.$refs.loginObserver.validate().then(result => {
          if (result) { // if data is validated and has no problem
            let payload = {
              ...this.userInfo
            }
            // Add API Code
            this.login(payload).then(() => {
              this.$router.replace({name: "Home"})
            }).catch(err => {
              enableError(this.error, err.message, "error")
            }).finally(() => {
              console.log("here");
              this.loading = false;
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
