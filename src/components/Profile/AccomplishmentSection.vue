<template>
  <custom-card title="Accomplishments" header-button header-button-icon="mdi-plus" @header-button-click="$emit('add')">
    <template v-slot:body>
      <v-list dense>
        <v-list-group
        >
          <template v-slot:prependIcon>
            <v-row align="center" justify="center">
              <v-avatar
                left
                size="30"
                class="primary"
              >
                <span class="white--text">1</span>
              </v-avatar>
            </v-row>

          </template>
          <template v-slot:activator>
            <v-list-item-title>Projects</v-list-item-title>
          </template>

          <v-list-item class="ml-5">
            <v-list-item-content>
              <v-list-item-title>Title</v-list-item-title>
              <v-list-item-subtitle>Description</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon >mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  export default {
    name: "AccomplishmentSection",
    components: {CustomCard}
  }
</script>

<style scoped>

</style>
