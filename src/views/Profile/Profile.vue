<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <ProfileSummary @section-selected="openSectionDialog" />
      </v-col>
    </v-row>

    <background-dialog :show.sync="dialogs.background" />
  </v-container>
</template>

<script>
  import ProfileSummary from "../../components/Profile/ProfileSummary";
  import BackgroundDialog from "../../components/Dialogs/BackgroundDialog";

  export default {
    name: "Profile",
    components: {BackgroundDialog, ProfileSummary},
    data() {
      return {
        dialogs: {
          background: false
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
