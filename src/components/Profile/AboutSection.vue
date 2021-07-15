<template>
  <custom-card title="About" :header-button="isMe" header-button-icon="mdi-pencil" @header-button-click="$emit('edit')">
    <template v-slot:body>
      <span>
        {{about ? about : "Nothing has been added yet!"}}
      </span>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";

  export default {
    name: "AboutSection",
    components: {CustomCard},
    props: {
      isMe: {type: Boolean, default: true},
      about: {type: String, default: ""}
    },
  }
</script>

<style scoped>

</style>
