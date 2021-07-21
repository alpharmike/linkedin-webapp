<template>
  <v-text-field
    append-icon="mdi-magnify"
    chips
    rounded
    outlined
    dense
    @input="(event) => $emit('search-message', event)"
    no-filter
    color="blue-grey lighten-2"
    label="Search messages"
  />
</template>

<script>
    export default {
        name: "SearchMessageBar"
    }
</script>

<style scoped>

</style>
