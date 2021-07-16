<template>
  <custom-card title="Add Skills" :card-loading="submitLoading">
    <template v-slot:body>
      <validation-observer ref="introObserver" v-slot="">
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
                  v-model="info[field.model]"
                  :value="info[field.model]"
                  dense
                  :item-text="field.text"
                  :item-value="field.value"
                  outlined
                  clearable
                  :error-messages="errors"
                ></v-select>
                <v-text-field
                  v-else
                  :error-messages="errors"
                  :label="field.name"
                  v-model="info[field.model]"
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
  import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
  import {required} from "vee-validate/dist/rules";


  setInteractionMode('eager');

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })


  export default {
    name: "LanguageForm",
    components: {CustomCard, ValidationObserver, ValidationProvider},
    computed: {
      ...mapGetters({
        profile: "profileModule/profile",
        languageLevels: "typeModule/languageLevels"
      }),

      fields() {
        return [
          {
            name: "Language",
            rules: "required",
            required: true,
            type: "text",
            model: "language"
          },
          {
            name: "Language Level",
            rules: "required",
            required: true,
            type: "select",
            text: "name",
            value: "id",
            items: this.languageLevels,
            model: "languageLevel"
          },
        ]
      }
    },
    data() {
      return {
        // Set it to value from profile at mounted/created
        info: {
          language: "",
          languageLevel: ""
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
        addLanguage: "sectionModule/addLanguage",
        getProfile: "profileModule/getProfile",
      }),
      submitForm() {
        this.submitLoading = true;
        let payload = {...this.info};
        this.addLanguage(payload).then(async () => {
          this.$emit('close');
          enableSnackbar(this.reqStatus, "New Language added successfully!", "info");
          this.$emit('show-alert', this.reqStatus);
        }).catch(err => {
          enableSnackbar(this.reqStatus, err.message, "error")
        }).finally(() => {
          this.submitLoading = false;
        })
      }
    },
  }
</script>

<style scoped>

</style>
