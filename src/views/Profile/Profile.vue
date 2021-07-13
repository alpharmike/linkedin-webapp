<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <ProfileSummary @section-selected="openSectionDialog" />
      </v-col>
    </v-row>

    <custom-dialog :show.sync="dialogs.background">
      <template v-slot:body>
        <background-form @close="dialogs.background = false" />
      </template>
    </custom-dialog>
    <custom-dialog :show.sync="dialogs.intro">
      <template v-slot:body>
        <intro-form @close="dialogs.intro = false" />
      </template>
    </custom-dialog>
  </v-container>
</template>

<script>
  import ProfileSummary from "../../components/Profile/ProfileSummary";
  import CustomDialog from "../../components/Dialogs/CustomDialog";
  import BackgroundForm from "../../components/Forms/BackgroundForm";
  import IntroForm from "../../components/Forms/IntroForm";

  export default {
    name: "Profile",
    components: {IntroForm, BackgroundForm, CustomDialog, ProfileSummary},
    data() {
      return {
        dialogs: {
          background: false,
          intro: false,
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
