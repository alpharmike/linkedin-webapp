<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="6">
        <login-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import LoginForm from "../../components/Forms/LoginForm";

  export default {
    name: "Login",
    components: {LoginForm}
  }
</script>

<style scoped>

</style>
