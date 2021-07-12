<template>
  <v-container fluid>
    <sign-up-form />
  </v-container>
</template>

<script>
  import SignUpForm from "../../components/Forms/SignUpForm";
  export default {
    name: "Registration",
    components: {SignUpForm},
  }
</script>

<style scoped>

</style>
