<template>
  <custom-card :title="edit ? 'Edit Background': 'Add Background'" :card-loading="submitLoading">
    <template v-slot:body>
      <validation-observer ref="backgroundObserver" v-slot="">
        <v-form @submit.prevent="submitBackgroundForm">
          <v-row>
            <v-col cols="12" v-for="(field, index) in fields" :key="field.name + index">
              <validation-provider
                v-slot="{ errors }"
                :name="field.name"
                :rules="field.rules"
              >
                <v-select
                  v-if="field.type === 'select'"
                  :items="field.items"
                  :label="field.name"
                  v-model="backgroundInfo[field.model]"
                  :value="backgroundInfo[field.model]"
                  :item-value="field.value"
                  :item-text="field.text"
                  dense
                  outlined
                  clearable
                  :error-messages="errors"
                ></v-select>
                <custom-date-picker v-else-if="field.type === 'date'" :label="field.name" :required="field.required" v-model="backgroundInfo[field.model]" />
                <v-textarea
                  v-else-if="field.type === 'textarea'"
                  :error-messages="errors"
                  :label="field.name"
                  v-model="backgroundInfo[field.model]"
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
                  v-model="backgroundInfo[field.model]"
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
        @click="submitBackgroundForm"
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
  import CustomDatePicker from "../Inputs/CustomDatePicker";
  import {mapActions, mapGetters} from "vuex";
  import {enableSnackbar} from "../../utils/error_utils";
  import CustomAlert from "../Alerts/CustomAlert";

  setInteractionMode('eager');

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  export default {
    name: "BackgroundForm",
    components: {CustomAlert, CustomDatePicker, CustomCard, ValidationObserver, ValidationProvider},
    props: {
      edit: {type: Boolean, default: false},
      editingBackground: {type: Object}
    },
    computed: {
      ...mapGetters({
        backgroundSection: "sectionModule/backgroundSection"
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
            name: "Background Type",
            rules: "required",
            required: true,
            type: "select",
            text: "name",
            value: "id",
            items: this.backgroundSection.children,
            model: "backgroundType"
          },
          {
            name: "Start Date",
            rules: "required",
            required: true,
            type: "date",
            model: "startDate"
          },
          {
            name: "End Date",
            rules: "required",
            required: true,
            type: "date",
            model: "endDate"
          },
          {
            name: "Description",
            rules: "",
            required: false,
            type: "textarea",
            model: "description"
          }
        ]
      }
    },

    data() {
      return {
        backgroundInfo: {
          title: "",
          backgroundType: "",
          startDate: "",
          endDate: "",
          description: "",
        },
        submitLoading: false,
        editingBg: this.editingBackground,
        reqStatus: {
          message: "",
          type: "",
          status: false
        }
      }
    },

    methods: {
      ...mapActions({
        createBackground: "sectionModule/createBackground"
      }),
      submitBackgroundForm() {
        this.submitLoading = true;
        this.$refs.backgroundObserver.validate().then(result => {
          if (result) { // if data is validated and has no problem
            let payload = {
              ...this.backgroundInfo
            }
            // Code for API nad store
            this.createBackground(payload).then(() => {
              this.$emit('close');
              enableSnackbar(this.reqStatus, "Background created successfully!", "info");
              this.$emit('show-alert', this.reqStatus);
            }).catch(err => {
              enableSnackbar(this.reqStatus, err.message, "error")
            }).finally(() => {
              this.submitLoading = false;
            })
          }
        })
      }
    },

    watch: {
      editingBackground: function (newValue) {
        this.editingBg = {...newValue};
      },
      editingBg: function (newValue) {
        if (this.edit) {
          this.backgroundInfo = {...newValue};
        }
      }
    },

    created() {
      if (this.edit) {
        this.backgroundInfo = {...this.editingBackground};
      }
      console.log(this.backgroundSection)
    }
  }
</script>

<style scoped>

</style>
