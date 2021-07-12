<template>
  <custom-card>
    <template v-slot:body>
      <v-row>
        <v-col cols="12">
            <span class="text-h5">
              {{ profile.firstName + " " + profile.lastName }}
            </span>
        </v-col>
        <v-col cols="12">
            <span class="text-body-1">
              {{ profile.headline }}
            </span>
        </v-col>
        <v-col cols="12">
            <span class="text-subtitle-2">
              {{ profile.location }}
            </span>
        </v-col>
        <v-col cols="12">
          <a href="/register" style="text-decoration: none;">
            <span class="text-subtitle-2 text--lighten-5">{{ profile.connections + " Connections" }}</span>
          </a>
        </v-col>
        <v-col cols="3">
          <add-section-dropdown @choose-section="getSubSections" />
        </v-col>
      </v-row>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import AddSectionDropdown from "./AddSectionDropdown";
  import {mapActions} from "vuex";

  export default {
    name: "ProfileSummary",
    components: {AddSectionDropdown, CustomCard},
    data() {
      return {
        profile: {
          firstName: "Erfan",
          lastName: "Moeini",
          headline: "Teacher Assistant at Shiraz University",
          location: "Fars, Iran",
          connections: 178
        }
      }
    },

    methods: {
      ...mapActions({
        setChildren: "sectionModule/setChildren"
      }),
      async getSubSections(section) {
        /* Store */
        await this.setChildren(section);
      }
    }
  }
</script>

<style scoped>

</style>
