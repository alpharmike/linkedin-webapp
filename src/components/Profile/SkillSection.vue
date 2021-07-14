<template>
  <div>
    <custom-card title="Skills & Endorsements" header-button header-button-icon="mdi-plus" @header-button-click="$emit('add')">
      <template v-slot:body>
        <v-list dense>
          <v-list-group
            v-for="skill in skills"
            :key="skill.name + skill.id"
          >
            <template v-slot:prependIcon>
              <v-row align="center" justify="center">
                <v-avatar
                  left
                  size="30"
                  class="primary"
                >
                  <span class="white--text">{{skill.endorsements.length}}</span>
                </v-avatar>
              </v-row>

            </template>
            <template v-slot:activator>
              <v-list-item-title>{{skill.name}}</v-list-item-title>
            </template>

            <v-list-item class="ml-5" v-for="endorsement in skill.endorsements" :key="endorsement.id">
              <v-list-item-content>
                <v-list-item-title>{{`Endorsed by ${endorsement.endorser.firstName} + " " + ${endorsement.endorser.lastName}`}}</v-list-item-title>
                <v-list-item-subtitle>{{endorsement.skillLevel}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>


                <v-row>
                  <v-btn icon @click="() => {}">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="() => {}">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </v-row>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list>
      </template>
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
