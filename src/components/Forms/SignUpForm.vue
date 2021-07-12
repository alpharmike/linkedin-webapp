<template>
  <custom-card title="Registration" center-title>
    <template v-slot:body>
      <validation-observer ref="observer" v-slot="">
        <v-form @submit.prevent="submitForm">
          <v-row justify="space-between" v-for="(fieldGroup, index) in fieldGroups" :key="index">
            <v-col cols="6" v-for="field in fieldGroup" :key="field.name">
              <validation-provider
                v-slot="{ errors }"
                :name="field.name"
                :rules="field.rules"
                :vid="field.vid ? field.vid : ''"
                :ref="field.ref ? field.ref : ''"
              >
                <vue-tel-input v-if="field.type === 'phone'" v-model="userInfo[field.model]" :error-messages="errors" />
                <v-menu
                  v-else-if="field.type === 'DOB'"
                  v-model="datePickerMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="userInfo[field.model]"
                      :label="field.name"
                      :error-messages="errors"
                      readonly
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      :required="field.required"
                      dense
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="userInfo[field.model]"
                    @input="datePickerMenu = false"
                  ></v-date-picker>
                </v-menu>
                <v-text-field
                  v-else
                  v-model="userInfo[field.model]"
                  :error-messages="errors"
                  :label="field.name"
                  clearable
                  outlined
                  :type="field.type"
                  :required="field.required"
                  dense
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
              Register
            </v-btn>
          </v-row>

        </v-form>
      </validation-observer>
    </template>

  </custom-card>
</template>

<script>

  import {required, email, max, min, numeric} from 'vee-validate/dist/rules'
  import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
  import CustomCard from "../Cards/CustomCard";

  setInteractionMode('eager');

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('email', {
    ...email,
    message: 'Email is not valid',
  })

  extend('numeric', {
    ...numeric,
    message: '{_field_} must be numeric only',
  })

  extend('min', {
    ...min,
    message: '{_field_} must contain at least 5 characters',
  })

  extend('match', { // this is for password matching
    validate: (value,  [compare] ) => {
      return compare && value === compare;
    },

    message: 'Passwords do not match'
  });

  export default {
    name: "SignUpForm",
    components: {CustomCard, ValidationProvider, ValidationObserver},
    computed: {
      fieldGroups() {
        return [
          [
            {
              name: "First Name",
              rules: "required",
              required: true,
              type: "text",
              model: "firstName"
            },
            {
              name: "Last Name",
              rules: "required",
              required: true,
              type: "text",
              model: "lastName"
            },
          ],
          [
            {
              name: "Username",
              rules: "required",
              required: true,
              type: "text",
              model: "username"
            },
            {
              name: "Email",
              rules: "required|email",
              required: true,
              type: "email",
              model: "email"
            },
          ],
          [
            {
              name: "Password",
              rules: "required|min:5",
              required: true,
              vid: "password",
              ref: "password",
              type: "password",
              model: "password"
            },
            {
              name: "Confirm Password",
              rules: `required|match:${this.userInfo.password}`,
              required: true,
              type: "password",
              model: "confirmPassword"
            },
          ],
          [
            {
              name: "Phone Number",
              rules: "required|numeric",
              required: true,
              type: "phone",
              model: "phoneNumber"
            },
            {
              name: "Date of Birth",
              rules: "required",
              required: true,
              type: "DOB",
              model: "dateOfBirth"
            },
          ],
          [
            {
              name: "Country",
              rules: "required",
              required: true,
              type: "country",
              model: "country"
            },
            {
              name: "Region",
              rules: "required",
              required: true,
              type: "region",
              model: "region"
            },
          ]
        ]
      }
    },
    data() {
      return {
        userInfo: {
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          dateOfBirth: "",
          country: "",
          region: ""
        },
        loading: false,
        datePickerMenu: false,

      }
    },

    methods: {
      submitForm() {
        this.loading = true;
        this.$refs.observer.validate().then(result => {
          if (result) { // if data is validated and has no problem
            let payload = {
              ...this.userInfo
            }
            delete payload.confirmPassword
            // Code for API
          }
        }).finally(() => {
          this.loading = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
