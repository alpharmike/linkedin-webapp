<template>
  <custom-card :title="edit ? 'Edit Accomplishments' : 'Add Accomplishments'" :card-loading="submitLoading">
    <template v-slot:body>
      <validation-observer ref="accomplishmentObserver" v-slot="">
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
                  v-model="accomplishmentsInfo[field.model]"
                  :value="accomplishmentsInfo[field.model]"
                  dense
                  outlined
                  clearable
                  :error-messages="errors"
                ></v-select>
                <v-textarea
                  v-else-if="field.type === 'textarea'"
                  :error-messages="errors"
                  :label="field.name"
                  v-model="accomplishmentsInfo[field.model]"
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
                  v-model="accomplishmentsInfo[field.model]"
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
        @click="submitForm"
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
  import {mapGetters} from "vuex";
  import CustomDatePicker from "../Inputs/CustomDatePicker";
  import CustomCard from "../Cards/CustomCard";

  setInteractionMode('eager');

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  export default {
    name: "AccomplishmentForm",
    components: {CustomCard, ValidationObserver, ValidationProvider},
    props: {
      edit: {type: Boolean, default: false},
      editingAccomplishment: {type: Object}
    },
    computed: {
      ...mapGetters({
        accomplishmentsSection: "sectionModule/accomplishmentsSection"
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
            name: "Accomplishment Type",
            rules: "required",
            required: true,
            type: "select",
            items: this.accomplishmentsSection.children,
            model: "type"
          },
          {
            name: "Description",
            rules: "",
            required: false,
            type: "textarea",
            model: "description"
          }
        ]
      },
    },

    data() {
      return {
        accomplishmentsInfo: {
          title: "",
          type: "",
          description: ""
        },

        submitLoading: false,
        editingAcc: null,
      }
    },

    methods: {
      submitForm() {
        this.submitLoading = true;
        this.$refs.accomplishmentObserver.validate().then(result => {
          if (result) { // if data is validated and has no problem
            let payload = {
              ...this.accomplishmentsInfo
            }
            // Code for API nad store

          }
        }).finally(() => {
          this.submitLoading = false;
        })
      }
    },

    watch: {
      editingAccomplishment: function (newValue) {
        this.editingAcc = {...newValue};
      },
      editingAcc: function (newValue) {
        if (this.edit) {
          this.accomplishmentsInfo = {...newValue};
        }
      }
    },

    created() {
      if (this.edit) {
        this.accomplishmentsInfo = {...this.editingAccomplishment};
      }
    }
  }
</script>

<style scoped>

</style>
