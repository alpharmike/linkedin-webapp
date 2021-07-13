<template>
  <v-container fluid>
    <v-row>
      <v-col cols="7">
        <v-row justify="space-between">
          <v-col cols="12">
            <ProfileSummary @section-selected="openSectionDialog" />
          </v-col>

          <v-col cols="12">
            <about-section @edit="dialogs.about = true" />
          </v-col>

          <v-col cols="12">
            <background-section @add="() => openSectionDialog('background')" />
          </v-col>

          <v-col cols="12">
            <accomplishment-section @add="() => openSectionDialog('accomplishments')" />
          </v-col>
        </v-row>
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
    <custom-dialog :show.sync="dialogs.about">
      <template v-slot:body>
        <about-form @close="dialogs.about = false" />
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
  import AboutSection from "../../components/Profile/AboutSection";
  import AboutForm from "../../components/Forms/AboutForm";
  import BackgroundSection from "../../components/Profile/BackgroundSection";
  import AccomplishmentSection from "../../components/Profile/AccomplishmentSection";

  export default {
    name: "Profile",
    components: {
      AccomplishmentSection,
      BackgroundSection,
      AboutForm,
      AboutSection, SkillForm, AccomplishmentForm, IntroForm, BackgroundForm, CustomDialog, ProfileSummary},
    data() {
      return {
        dialogs: {
          background: false,
          intro: false,
          accomplishments: false,
          skills: false,
          about: false
        }
      }
    },

    methods: {
      openSectionDialog(section) {
        console.log(section)
        this.dialogs[section.toLowerCase()] = true
      },
    }
  }
</script>

<style scoped>

</style>
