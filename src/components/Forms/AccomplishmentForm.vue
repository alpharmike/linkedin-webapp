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
                  :item-text="field.text"
                  :item-value="field.value"
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

      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message" :type="reqStatus.type" />
    </template>
  </custom-card>
</template>

<script>
  import {required} from 'vee-validate/dist/rules'
  import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
  import {mapActions, mapGetters} from "vuex";
  import CustomDatePicker from "../Inputs/CustomDatePicker";
  import CustomCard from "../Cards/CustomCard";
  import {enableSnackbar} from "../../utils/error_utils";
  import CustomAlert from "../Alerts/CustomAlert";

  setInteractionMode('eager');

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  export default {
    name: "AccomplishmentForm",
    components: {CustomAlert, CustomCard, ValidationObserver, ValidationProvider},
    props: {
      edit: {type: Boolean, default: false},
      editingAccomplishment: {type: Object}
    },
    computed: {
      ...mapGetters({
        accomplishmentsSection: "sectionModule/accomplishmentsSection",
      }),
      fields() {
        return [
          {
            name: "Subject",
            rules: "required",
            required: true,
            type: "text",
            model: "subject"
          },
          {
            name: "Accomplishment Type",
            rules: "required",
            required: true,
            type: "select",
            text: "name",
            value: "id",
            items: this.accomplishmentsSection.children,
            model: "accomplishmentType"
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
          subject: "",
          accomplishmentType: "",
          description: ""
        },
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
        submitLoading: false,
        editingAcc: null,
      }
    },

    methods: {
      ...mapActions({
        createAcc: "sectionModule/createAcc",
        editAcc: "sectionModule/editAcc",
        getAcc: "sectionModule/getAcc"
      }),
      submitForm() {
        this.submitLoading = true;
        this.$refs.accomplishmentObserver.validate().then(result => {
          if (result) { // if data is validated and has no problem
            let payload = {
              ...this.accomplishmentsInfo
            }
            // Code for API nad store
            if (!this.edit) {
              this.createAcc(payload).then(async () => {
                this.$emit('close');
                enableSnackbar(this.reqStatus, "Accomplishment created successfully!", "info");
                this.$emit('show-alert', this.reqStatus);
                await this.getAcc();
              }).catch(err => {
                enableSnackbar(this.reqStatus, err.message, "error")
              }).finally(() => {
                this.submitLoading = false;
              })
            } else {
              this.editAcc(payload).then(async () => {
                this.$emit('close');
                enableSnackbar(this.reqStatus, "Accomplishment edited successfully!", "info");
                this.$emit('show-alert', this.reqStatus);
                await this.getAcc();
              }).catch(err => {
                enableSnackbar(this.reqStatus, err.message, "error")
              }).finally(() => {
                this.submitLoading = false;
              })
            }
          }
        }).catch(err => {
          this.submitLoading = false;
          enableSnackbar(this.reqStatus, err.message, "error")
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
