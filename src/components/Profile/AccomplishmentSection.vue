<template>
  <div>
    <custom-card title="Accomplishments" header-button header-button-icon="mdi-plus" @header-button-click="$emit('add')">
      <template v-slot:body>
        <v-list dense>
          <v-list-group
            v-for="accType in accomplishmentsSection.children"
            :key="accType.name + accType.id"
          >
            <template v-slot:prependIcon>
              <v-row align="center" justify="center">
                <v-avatar
                  left
                  size="30"
                  class="primary"
                >
                  <span class="white--text">{{categorizedAcc[accType.id].length}}</span>
                </v-avatar>
              </v-row>

            </template>
            <template v-slot:activator>
              <v-list-item-title>{{accType.name}}</v-list-item-title>
            </template>

            <v-list-item class="ml-5" v-for="acc in categorizedAcc[accType.id]" :key="acc.subject + acc.id">
              <v-list-item-content>
                <v-list-item-title>{{acc.subject}}</v-list-item-title>
                <v-list-item-subtitle>{{acc.description}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon @click="() => editAcc(acc)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
        </v-list>
      </template>
    </custom-card>
    <custom-dialog :show.sync="accDialog">
      <template v-slot:body>
        <accomplishment-form edit :editing-accomplishment="editingAcc" @show-alert="(alert) => $emit('edited', alert)" @close="accDialog = false" />
      </template>
    </custom-dialog>
  </div>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import {mapGetters} from "vuex";
  import CustomDialog from "../Dialogs/CustomDialog";
  import AccomplishmentForm from "../Forms/AccomplishmentForm";

  export default {
    name: "AccomplishmentSection",
    components: {AccomplishmentForm, CustomDialog, CustomCard},
    computed: {
      ...mapGetters("sectionModule", ["accomplishmentsSection", "accomplishments"]),

      categorizedAcc() {
        const categorized = {};
        this.accomplishmentsSection.children.forEach(accType => {
          console.log("ACC TYPE: ")
          console.log(accType)
          const items = [];
          this.accomplishments.forEach(acc => {
            console.log(acc)
            if (accType.id === acc.accomplishmentType) {
              items.push(acc);
            }
          })
          categorized[accType.id] = items;
        })
        console.log(categorized);
        return categorized;
      }
    },

    data() {
      return {
        accDialog: false,
        editingAcc: null,
      }
    },

    methods: {
      editAcc(acc) {
        this.editingAcc = acc;
        this.accDialog = true;
      }
    },

    watch: {
      accDialog: function (value) {
        if (!value) {
          this.editingAcc = null;
        }
      }
    },


  }
</script>

<style scoped>

</style>
