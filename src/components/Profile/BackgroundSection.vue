<template>
  <div>
    <custom-card title="Backgrounds" header-button header-button-icon="mdi-plus" @header-button-click="$emit('add')">
      <template v-slot:body>
        <v-list
          subheader
        >
          <div v-for="backgroundType in backgroundSection.children" :key="backgroundType">
            <v-subheader class="font-weight-bold text-body-1 text--primary">{{backgroundType}}</v-subheader>
            <div
              v-for="(background, index) in items"
              :key="background.title + index"
              class="ml-5"
            >
              <v-list-item  v-if="background.type === backgroundType">
                <v-list-item-content>
                  <v-list-item-title v-text="background.title"></v-list-item-title>
                  <v-list-item-subtitle v-text="background.description"></v-list-item-subtitle>
                  <v-list-item-subtitle>{{background.date}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="() => editBackground(background)">
                    <v-icon >mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </div>
          </div>
        </v-list>
      </template>


    </custom-card>
    <custom-dialog :show.sync="backgroundDialog">
      <template v-slot:body>
        <background-form edit :editing-background="editingBackground" @close="backgroundDialog = false" />
      </template>
    </custom-dialog>
  </div>

</template>

<script>
  import {mapGetters} from "vuex";
  import CustomCard from "../Cards/CustomCard";
  import CustomDialog from "../Dialogs/CustomDialog";
  import BackgroundForm from "../Forms/BackgroundForm";

  export default {
    name: "BackgroundSection",
    components: {BackgroundForm, CustomDialog, CustomCard},
    computed: {
      ...mapGetters({
        backgroundSection: "sectionModule/backgroundSection"
      }),

      items() {
        return [
          {
            type: "Work Experience",
            title: 'Amateur Assistant',
            description: "Hello World",
            startDate: "2019-10-12",
            endDate: "2020-10-05"
          },
          {
            type: "Work Experience",
            title: 'Junior Assistant',
            description: "Hello World",
            startDate: "2019-10-12",
            endDate: "2020-10-05"
          },
          {
            type: "Volunteer Experience",
            title: 'Senior Assistant',
            description: "Hello World",
            startDate: "2019-10-12",
            endDate: "2020-10-05"
          },
        ]

      }
    },

    data() {
      return {
        backgroundDialog: false,
        editingBackground: null,
      }
    },

    methods: {
      editBackground(background) {
        this.editingBackground = background;
        this.backgroundDialog = true;
      }
    },

    watch: {
      backgroundDialog: function (value) {
        if (!value) {
          this.editingBackground = null;
        }
      }
    }
  }
</script>

<style scoped>

</style>
