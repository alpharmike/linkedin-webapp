<template>
  <v-text-field
    append-icon="mdi-magnify"
    chips
    rounded
    outlined
    dense
    @input="(event) => $emit('search-chat', event)"
    no-filter
    color="blue-grey lighten-2"
    label="Search chats"
  />
</template>

<script>
  export default {
    name: "ChatSearchBar",
  }
</script>

<style scoped>

</style>
