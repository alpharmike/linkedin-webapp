<template>
  <custom-card title="About" :header-button="isMe" header-button-icon="mdi-pencil" @header-button-click="$emit('edit')">
    <template v-slot:body>
      <span>
        {{about}}
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
      isMe: {type: Boolean, default: true}
    },
    data() {
      return {
        // Set it to value from profile at mounted/created
        about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }
    }
  }
</script>

<style scoped>

</style>
