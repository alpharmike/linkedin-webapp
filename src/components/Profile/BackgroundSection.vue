<template>
  <div>
    <custom-card title="Backgrounds" header-button header-button-icon="mdi-plus" @header-button-click="$emit('add')">
      <template v-slot:body>
        <v-list
          subheader
        >
          <div v-for="backgroundType in backgroundSection.children" :key="backgroundType.name + backgroundType.id">
            <v-subheader class="font-weight-bold text-body-1 text--primary">{{backgroundType.name}}</v-subheader>
            <div
              v-for="(background) in backgrounds"
              :key="background.title + background.id"
              class="ml-5"
            >
              <v-list-item  v-if="background.backgroundType === backgroundType.id">
                <v-list-item-content>
                  <v-list-item-title v-text="background.title"></v-list-item-title>
                  <v-list-item-subtitle v-text="background.description"></v-list-item-subtitle>
                  <v-list-item-subtitle>{{`${background.startDate} - ${background.endDate ? background.endDate : "Present"}`}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-row>
                    <v-btn icon @click="() => editBackground(background)">
                      <v-icon >mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn icon @click="() => initRemoval(background)">
                      <v-icon color="error">mdi-delete</v-icon>
                    </v-btn>
                  </v-row>

                </v-list-item-action>
              </v-list-item>
            </div>
          </div>
        </v-list>
      </template>


    </custom-card>
    <custom-dialog :show.sync="backgroundDialog">
      <template v-slot:body>
        <background-form edit :editing-background="editingBackground" @show-alert="(alert) => $emit('edited', alert)" @close="backgroundDialog = false" />
      </template>
    </custom-dialog>
    <dialog-alert
      title="Background Removal"
      msg="Are you sure you wan to remove the selected background?"
      :show.sync="remove.dialog"
      :is-loading="remove.loading"
      @cancel="remove.dialog = false"
      @accept="deleteBackground"
    />
    <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message" :type="reqStatus.type" />
  </div>

</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import CustomCard from "../Cards/CustomCard";
  import CustomDialog from "../Dialogs/CustomDialog";
  import BackgroundForm from "../Forms/BackgroundForm";
  import DialogAlert from "../Alerts/DialogAlert";
  import {enableSnackbar} from "../../utils/error_utils";
  import CustomAlert from "../Alerts/CustomAlert";

  export default {
    name: "BackgroundSection",
    components: {CustomAlert, DialogAlert, BackgroundForm, CustomDialog, CustomCard},
    computed: {
      ...mapGetters({
        backgroundSection: "sectionModule/backgroundSection",
        backgrounds: "sectionModule/backgrounds",
      }),
    },

    data() {
      return {
        backgroundDialog: false,
        editingBackground: null,
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
        remove: {
          loading: false,
          dialog: false,
          backgroundId: ''
        }
      }
    },

    methods: {
      ...mapActions("sectionModule", ["removeBackground", "getBackgrounds"]),
      editBackground(background) {
        this.editingBackground = background;
        this.backgroundDialog = true;
      },

      initRemoval(background) {
        this.remove.backgroundId = background.id;
        this.remove.dialog = true;
      },

      deleteBackground() {
        this.remove.loading = true;
        this.removeBackground(this.remove.backgroundId).then(async () => {
          this.remove.loading = false;
          this.remove.dialog = false;
          this.remove.backgroundId = '';
          enableSnackbar(this.reqStatus, "Background deleted successfully!", "error")
          await this.getBackgrounds();
        }).catch(err => {
          enableSnackbar(this.reqStatus, err.message, "error")
        }).finally(() => {
          this.remove.loading = false;
        })
      }
    },

    watch: {
      backgroundDialog: function (value) {
        if (!value) {
          this.editingBackground = null;
        }
      }
    },
  }
</script>

<style scoped>

</style>
