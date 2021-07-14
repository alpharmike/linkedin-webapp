<template>
  <div>
    <custom-card title="Skills & Endorsements" header-button header-button-icon="mdi-plus" @header-button-click="$emit('add')">

    </custom-card>
  </div>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  export default {
    name: "SkillSection",
    components: {CustomCard}
  }
</script>

<style scoped>

</style>
