<template>
    <v-container fluid>
      <v-row >
        <v-col>
          <ProfileSummary />
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
    import ProfileSummary from "../../components/Profile/ProfileSummary";
    export default {
        name: "Profile",
      components: {ProfileSummary}
    }
</script>

<style scoped>

</style>
