<template>
  <custom-card title="Add Background" :card-loading="submitLoading">
    <template v-slot:body>
      <validation-observer ref="accomplishmentObserver" v-slot="">
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
                  :items="field.items"
                  :label="field.name"
                  v-model="backgroundInfo[field.model]"
                  :value="backgroundInfo[field.model]"
                  dense
                  outlined
                  clearable
                  :error-messages="errors"
                ></v-select>
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
    components: {CustomCard, ValidationObserver, ValidationProvider}
  }
</script>

<style scoped>

</style>
