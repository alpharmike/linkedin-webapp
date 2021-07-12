<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="8">
        <sign-up-form />
      </v-col>
    </v-row>
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
