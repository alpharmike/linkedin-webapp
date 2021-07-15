<template>
  <div>
    <custom-card title="Skills & Endorsements" header-button header-button-icon="mdi-plus"
                 @header-button-click="$emit('add')">
      <template v-slot:body>
        <v-list dense v-if="skills.length > 0">
          <v-list-group
            v-for="skill in skills"
            :key="skill.name + skill.id"
          >
            <template v-slot:prependIcon>
              <v-row align="center" justify="space-between" dense no-gutters>
                <v-col cols="1" align-self="center" align="center">
                  <v-avatar
                    left
                    size="25"
                    class="primary"
                  >
                    <span class="white--text">{{skill.endorsementList.length}}</span>
                  </v-avatar>
                </v-col>
                <v-col cols="2" align-self="center" align="center">
                  <v-btn
                    v-if="!isMe"
                    text
                    icon
                    small
                    color="accent"
                    @click.stop="() => initEndorsement(skill)"
                  >
                    <v-icon>mdi-thumb-up</v-icon>
                  </v-btn>

                  <v-btn small v-else icon @click.stop="() => initRemoval(skill)">
                    <v-icon color="error">mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>

            </template>
            <template v-slot:activator>
              <v-list-item-title>{{skill.name}}</v-list-item-title>
            </template>

            <v-list-item class="ml-5" v-for="endorsement in skill.endorsementList" :key="endorsement.id">
              <v-list-item-content>
                <v-list-item-title>{{`Endorsed by ${endorsement.profileJson.firstName}
                  ${endorsement.profileJson.lastName}`}}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>

        <span v-else>
          No skill has been added yet!
        </span>
      </template>
    </custom-card>
    <custom-dialog width="40%" :show.sync="dialogs.endorsementDialog">
      <template v-slot:body>
        <endorsement-form :skill="endorsedSkill" @show-alert="(alert) => reqStatus = alert"
                          @close="dialogs.endorsementDialog = false"/>
      </template>
    </custom-dialog>

    <dialog-alert
      title="Skill Removal"
      msg="Are you sure you wan to remove the selected skill?"
      :show.sync="remove.dialog"
      :is-loading="remove.loading"
      @cancel="remove.dialog = false"
      @accept="deleteSkill"
    />
    <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message"
                  :type="reqStatus.type"/>
  </div>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import {mapActions, mapGetters} from "vuex";
  import {enableSnackbar} from "../../utils/error_utils";
  import CustomDialog from "../Dialogs/CustomDialog";
  import EndorsementForm from "../Forms/EndorsementForm";
  import DialogAlert from "../Alerts/DialogAlert";
  import CustomAlert from "../Alerts/CustomAlert";

  export default {
    name: "SkillSection",
    components: {CustomAlert, DialogAlert, EndorsementForm, CustomDialog, CustomCard},

    computed: {
      ...mapGetters({
        skillsSection: "sectionModule/skillsSection",
        skills: "sectionModule/skills",
      }),
    },

    props: {
      isMe: {type: Boolean, default: true}
    },

    data() {
      return {
        dialogs: {
          skillsDialog: false,
          endorsementDialog: false,
        },
        endorsedSkill: null,
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
        remove: {
          loading: false,
          dialog: false,
          skillId: ''
        }
      }
    },

    methods: {
      ...mapActions("sectionModule", ["removeSkill", "getSkills"]),
      initRemoval(skill) {
        this.remove.skillId = skill.id;
        this.remove.dialog = true;
      },

      deleteSkill() {
        // TODO: ADD API
        this.remove.loading = true;
        this.removeSkill(this.remove.skillId).then(async () => {
          this.remove.loading = false;
          this.remove.dialog = false;
          this.remove.skillId = '';
          enableSnackbar(this.reqStatus, "Skill deleted successfully!", "error")
          await this.getSkills();
        }).catch(err => {
          enableSnackbar(this.reqStatus, err.message, "error")
        }).finally(() => {
          this.remove.loading = false;
        })
      },

      initEndorsement(skill) {
        this.endorsedSkill = skill
        this.dialogs.endorsementDialog = true
      }
    },
  }
</script>

<style scoped>

</style>
