<template>
  <v-avatar
    color="accent"
    :size="size"
  >
    <span :class="fontClass">{{ initials }}</span>
  </v-avatar>
</template>

<script>
  export default {
    name: "UserAvatar",
    props: {
      initials: {type: String, default: ''},
      size: {type: String, default: '48'},
      fontClass: {type: String, default: 'white--text text-h5'},
    }
  }
</script>

<style scoped>

</style>
