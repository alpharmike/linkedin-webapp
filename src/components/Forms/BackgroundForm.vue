<template>
  <custom-card title="Add Background" :card-loading="submitLoading">
    <template v-slot:body>
      <validation-observer ref="backgroundObserver" v-slot="">
        <v-form @submit.prevent="submitBackgroundForm">
          <v-row>
            <v-col cols="12" v-for="(field, index) in fields" :key="index">
              <validation-provider
                v-slot="{ errors }"
                :name="field.name"
                :rules="field.rules"
              >
                <v-select
                  v-if="field.type === 'select'"
                  :items="items"
                  :label="field.name"
                  v-model="backgroundInfo[field.model]"
                  dense
                  outlined
                  :rules="field.rules"
                  clearable
                  :error-messages="errors"
                ></v-select>
                <custom-date-picker v-else-if="field.type === 'date'" v-model="backgroundInfo[field.model]" />
                <v-text-field
                  v-else
                  v-model="backgroundInfo[field.model]"
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
        </v-form>
      </validation-observer>
    </template>
    <template v-slot:actions>
      <v-btn
        class="mx-4 px-5 my-1"
        large
        color="primary"
        rounded
        width="150"
        type="submit"
        :disabled="submitLoading"
        @click="$emit('close')"

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
      >
        Submit
      </v-btn>
    </template>
  </custom-card>
</template>

<script>
  import {required, email, max, min, numeric} from 'vee-validate/dist/rules'
  import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
  import CustomCard from "../Cards/CustomCard";
  import CustomDatePicker from "../Inputs/CustomDatePicker";

  setInteractionMode('eager');

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  export default {
    name: "BackgroundForm",
    components: {CustomDatePicker, CustomCard, ValidationObserver, ValidationProvider},
    computed: {
      fields() {
        return [
          [
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
              model: "type"
            },
          ],
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
          type: "",
          startDate: "",
          endDate: "",
          description: "",
        },
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        submitLoading: false,
      }
    },

    methods: {
      submitBackgroundForm() {

      }
    }
  }
</script>

<style scoped>

</style>
