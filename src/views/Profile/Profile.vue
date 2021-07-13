<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <ProfileSummary @section-selected="openSectionDialog" />
      </v-col>
    </v-row>

    <custom-dialog :show.sync="dialogs.intro">
      <template v-slot:body>
        <intro-form @close="dialogs.intro = false" />
      </template>
    </custom-dialog>
    <custom-dialog :show.sync="dialogs.background">
      <template v-slot:body>
        <background-form @close="dialogs.background = false" />
      </template>
    </custom-dialog>
    <custom-dialog :show.sync="dialogs.accomplishments">
      <template v-slot:body>
        <accomplishment-form @close="dialogs.accomplishments = false" />
      </template>
    </custom-dialog>
    <custom-dialog :show.sync="dialogs.skills">
      <template v-slot:body>
        <skill-form @close="dialogs.skills = false" />
      </template>
    </custom-dialog>
  </v-container>
</template>

<script>
  import ProfileSummary from "../../components/Profile/ProfileSummary";
  import CustomDialog from "../../components/Dialogs/CustomDialog";
  import BackgroundForm from "../../components/Forms/BackgroundForm";
  import IntroForm from "../../components/Forms/IntroForm";
  import AccomplishmentForm from "../../components/Forms/AccomplishmentForm";
  import SkillForm from "../../components/Forms/SkillForm";

  export default {
    name: "Profile",
    components: {SkillForm, AccomplishmentForm, IntroForm, BackgroundForm, CustomDialog, ProfileSummary},
    data() {
      return {
        dialogs: {
          background: false,
          intro: false,
          accomplishments: false,
          skills: false,
        }
      }
    },

    methods: {
      openSectionDialog(section) {
        console.log(section)
        this.dialogs[section.toLowerCase()] = true
      }
    }
  }
</script>

<style scoped>

</style>
