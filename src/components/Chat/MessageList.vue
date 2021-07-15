<template>
  <custom-card>
    <template v-slot:body>
      Title will be name of the user chatting with
      <message-item
        v-for="message in messages"
      >
        info of message and sender
      </message-item>
    </template>

  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import MessageItem from "./MessageItem";

  export default {
    name: "MessageList",
    components: {MessageItem, CustomCard}
  }
</script>

<style scoped>

</style>
