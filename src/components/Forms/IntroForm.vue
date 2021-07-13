<template>
  <custom-card title="Edit Into" :card-loading="submitLoading">
    <template v-slot:body>
      <validation-observer ref="intoObserver" v-slot="">
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
    </template>
  </custom-card>
</template>

<script>
  import {required} from 'vee-validate/dist/rules'
  import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
  import CustomCard from "../Cards/CustomCard";
  import {mapGetters} from "vuex";
  import CustomDatePicker from "../Inputs/CustomDatePicker";

  setInteractionMode('eager');

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  export default {
    name: "ProfileForm",
    components: {CustomDatePicker, CustomCard, ValidationObserver, ValidationProvider},
    computed: {
      ...mapGetters({
        industries: "typeModule/industries"
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
            name: "Region",
            rules: "",
            required: false,
            type: "textarea",
            rows: 2,
            model: "region"
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
          headline: "",
          country: "",
          region: "",
          address: "",
          industry: "",
          dateOfBirth: ""
        },

        submitLoading: false,
      }
    },

    methods: {
      submitProfileForm() {

      }
    }
  }
</script>

<style scoped>

</style>
