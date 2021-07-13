<template>
  <custom-card title="Add Skills" :card-loading="submitLoading">
    <template v-slot:body>
      <v-form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12">
            <v-textarea
              label="Summary"
              v-model="summary"
              clearable
              outlined
              dense
              auto-grow
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
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
  import CustomCard from "../Cards/CustomCard";

  export default {
    name: "AboutForm",
    components: {CustomCard},
    data() {
      return {
        // Set it to value from profile at mounted/created
        summary: "",
        submitLoading: false
      }
    },

    methods: {
      submitForm() {
        this.submitLoading = true;


      }
    }
  }
</script>

<style scoped>

</style>
