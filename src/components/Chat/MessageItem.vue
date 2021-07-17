<template>
  <v-row :justify="isMe ? 'end' : 'start'">
    <v-card
      :class="[color]"
      class="pa-2 chat-bubble mb-2 no-shadow"
      max-width="250"
    >
      <slot></slot>
    </v-card>
  </v-row>
</template>
<script>
  export default {
    name: 'MessageItem',
    props: {
      isMe: {type: Boolean},
    },
    computed: {
      color() {
        return !this.isMe
          ? 'cyan cyan--text darken-1 text--lighten-5'
          : 'indigo indigo--text darken-1 text--lighten-5';
      },
      side() {
        return !this.isMe ? 'align-self-end' : 'align-self-start';
      },
    },
  };
</script>
<style lang="scss" scoped>
  .chat-bubble {
    border-radius: 10px;
    max-width: 70%;
  }
</style>
