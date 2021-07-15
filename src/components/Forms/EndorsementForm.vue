<template>
  <custom-card :title="`Thanks for endorsing ${visitingProfile.firstName} ${visitingProfile.lastName}` "
                 :card-loading="submitLoading">
    <template v-slot:body>
      <validation-observer ref="endorsementObserver" v-slot="">
        <v-form @submit.prevent="submitForm">
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
                  v-model="endorsementInfo[field.model]"
                  :value="endorsementInfo[field.model]"
                  :item-value="field.value"
                  :item-text="field.text"
                  dense
                  outlined
                  clearable
                  :error-messages="errors"
                ></v-select>
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
  import {mapActions, mapGetters} from "vuex";
  import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
  import {required} from "vee-validate/dist/rules";
  import {enableSnackbar} from "../../utils/error_utils";
  import CustomCard from "../Cards/CustomCard";

  setInteractionMode('eager');

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  export default {
    name: "EndorsementForm",
    components: {CustomCard, ValidationObserver, ValidationProvider},
    props: {
      skill: {type: Object}
    },
    computed: {
      ...mapGetters({
        visitingProfile: "profileModule/visitingProfile",
        skillLevels: "typeModule/skillLevels",
        relationKnowledgeTypes: "typeModule/relationKnowledgeTypes"
      }),

      fields() {
        return [
          {
            name: `How good is ${this.visitingProfile.firstName} at ${this.skill.name}?`,
            rules: "required",
            required: true,
            type: "select",
            text: "name",
            value: "id",
            items: this.skillLevels,
            model: "skillLevel"
          },
          {
            name: `How do you know about ${this.visitingProfile.firstName}’s ${this.skill.name} skills??`,
            rules: "required",
            required: true,
            type: "select",
            text: "name",
            value: "id",
            items: this.relationKnowledgeTypes,
            model: "relationKnowledge"
          },
        ]
      },
    },

    data() {
      return {
        endorsementInfo: {
          skillLevel: "",
          relationKnowledge: "",
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
        getSkills: "sectionModule/getSkills",
        endorseSkill: "sectionModule/endorseSkill"
      }),
      submitForm() {
        this.submitLoading = true;
        this.$refs.endorsementObserver.validate().then(result => {
          if (result) { // if data is validated and has no problem
            console.log(result)
            let payload = {
              ...this.endorsementInfo,
              skillId: this.skill.id
            }
            // Code for API nad store
            this.endorseSkill(payload).then(async () => {
              this.$emit('close');
              enableSnackbar(this.reqStatus, "You have endorsed the skill successfully!", "info");
              this.$emit('show-alert', this.reqStatus);
              await this.getSkills(this.visitingProfile.id);
            }).catch(err => {
              enableSnackbar(this.reqStatus, err.message, "error")
            }).finally(() => {
              this.submitLoading = false;
            })
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
