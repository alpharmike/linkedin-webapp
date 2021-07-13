<template>
  <custom-card title="Add Skills" :card-loading="submitLoading">
    <template v-slot:body>
      <v-form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12">
            <v-combobox
              v-model="skills.selected"
              :items="skillsSection.children"
              label="Skill"
              multiple
              chips
              dense
              outlined
              clearable
            ></v-combobox>
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
        :disabled="submitLoading || skills.selected.length === 0"
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


  export default {
    name: "SkillForm",
    components: {CustomCard},
    computed: {
      ...mapGetters({
        skillsSection: "sectionModule/skillsSection"
      })
    },
    data() {
      return {
        skills: {
          selected: [],
        },
        submitLoading: false,
      }
    },

    methods: {
      ...mapActions('sectionModule', ['createItem']),

      submitForm() {
        this.submitLoading = true;
        const payload = {
          title: "skills",
          data: []
        }
        this.skills.selected.forEach(skill => {
          payload.data.push({
            name: skill
          })
        })

        this.createItem(payload).then(() => {

        }).catch(error => {

        }).finally(() => {
          this.submitLoading = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
