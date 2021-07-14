<template>
  <custom-card title="Edit Intro" :card-loading="submitLoading">
    <template v-slot:body>
      <validation-observer ref="introObserver" v-slot="">
        <v-form @submit.prevent="submitProfileForm">
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
                  v-model="profileInfo[field.model]"
                  :value="profileInfo[field.model]"
                  dense
                  :item-text="field.text"
                  :item-value="field.value"
                  outlined
                  clearable
                  :error-messages="errors"
                ></v-select>
                <custom-date-picker v-else-if="field.type === 'date'" :label="field.name" :required="field.required" v-model="profileInfo[field.model]" />
                <v-textarea
                  v-else-if="field.type === 'textarea'"
                  :error-messages="errors"
                  :label="field.name"
                  v-model="profileInfo[field.model]"
                  clearable
                  :required="field.required"
                  outlined
                  dense
                  auto-grow
                  :rows="field.rows"
                  :type="field.type"
                ></v-textarea>
                <v-text-field
                  v-else
                  :error-messages="errors"
                  :label="field.name"
                  v-model="profileInfo[field.model]"
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
        :disabled="submitLoading"
        @click="submitProfileForm"
        small
      >
        Submit
      </v-btn>

      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message" :type="reqStatus.type" />
    </template>
  </custom-card>
</template>

<script>
  import {required} from 'vee-validate/dist/rules'
  import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
  import CustomCard from "../Cards/CustomCard";
  import {mapActions, mapGetters} from "vuex";
  import CustomDatePicker from "../Inputs/CustomDatePicker";
  import {enableSnackbar} from "../../utils/error_utils";
  import CustomAlert from "../Alerts/CustomAlert";

  setInteractionMode('eager');

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  export default {
    name: "ProfileForm",
    components: {CustomAlert, CustomDatePicker, CustomCard, ValidationObserver, ValidationProvider},
    computed: {
      ...mapGetters({
        industries: "typeModule/industries",
        formerNameVisTypes: "typeModule/formerNameVisTypes",
        profile: "profileModule/profile"
      }),
      fields() {
        return [
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
          {
            name: "Former Name",
            rules: "",
            required: false,
            type: "text",
            model: "formerName"
          },
          {
            name: "Former Name Visibility",
            rules: "",
            required: false,
            type: "select",
            text: "name",
            value: "id",
            items: this.formerNameVisTypes,
            model: "formerNameVisibilityType"
          },
          {
            name: "Headline",
            rules: "required",
            required: true,
            type: "textarea",
            rows: 2,
            model: "headline"
          },
          {
            name: "Country",
            rules: "required",
            required: true,
            type: "text",
            model: "country"
          },
          {
            name: "Location in Country",
            rules: "",
            required: false,
            type: "textarea",
            rows: 2,
            model: "locationInCountry"
          },
          {
            name: "Address",
            rules: "",
            required: false,
            type: "textarea",
            rows: 2,
            model: "address"
          },
          {
            name: "Industry",
            rules: "required",
            required: true,
            type: "select",
            text: "name",
            value: "id",
            items: this.industries,
            model: "industry"
          },
          {
            name: "Date of Birth",
            rules: "",
            required: false,
            type: "date",
            model: "dateOfBirth"
          },
        ]
      }
    },

    data() {
      return {
        profileInfo: {
          firstName: "",
          lastName: "",
          formerName: "",
          formerNameVisibilityType: "",
          headline: "",
          country: "",
          locationInCountry: "",
          address: "",
          industry: "",
          dateOfBirth: ""
        },
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
        submitLoading: false,
      }
    },

    methods: {
      ...mapActions({
        editProfile: "profileModule/editProfile",
        getProfile: "profileModule/getProfile",
      }),
      submitProfileForm() {
        this.submitLoading = true;
        this.$refs.introObserver.validate().then(result => {
          if (result && this.validate()) { // if data is validated and has no problem
            console.log(result)
            let payload = {
              ...this.profileInfo
            }
            console.log(payload);
            // Code for API and store
            this.editProfile(payload).then(async () => {
              this.$emit('close');
              enableSnackbar(this.reqStatus, "Intro updated successfully!", "info");
              this.$emit('show-alert', this.reqStatus);
              await this.getProfile();
              this.$emit('edited')
            }).catch(err => {
              enableSnackbar(this.reqStatus, err.message, "error")
            }).finally(() => {
              this.submitLoading = false;
            })
          } else {
            this.submitLoading = false;
          }
        }).catch(err => {
          this.submitLoading = false;
          enableSnackbar(this.reqStatus, err.message, "error")
        })
      },
      validate() {
        if (this.profileInfo.dateOfBirth === "" || this.profileInfo.dateOfBirth === null) {
          enableSnackbar(this.reqStatus, "Date of birth can not be empty!", "error")
          return false;
        }
        return true;
      },
    },

    mounted() {
      this.profileInfo = {...this.profile};
    }
  }
</script>

<style scoped>

</style>
