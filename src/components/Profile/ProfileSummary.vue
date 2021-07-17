<template>
  <custom-card>
    <template v-slot:body>
      <v-row justify="space-between">
        <v-col cols="10">
          <v-row>
            <v-col cols="11">
            <span class="text-h5">
              {{ profile.firstName + " " + profile.lastName }}
            </span>
            </v-col>
            <v-col cols="12">
              <v-row justify="space-between">
                <v-col cols="7" v-if="profile.headline">
                  <span class="text-body-1">
                  {{ profile.headline }}
                  </span>
                </v-col>
                <v-col cols="5" v-if="profile.showCurrentPositionId && profile.currentPositionId">
                  <span>{{profile.currentPosition.title}}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-col cols="12">
                <v-row justify="space-between">
                  <v-col cols="7">
                    <span class="text-subtitle-2">
                      {{ profile.locationInCountry }}
                    </span>
                  </v-col>
                  <v-col cols="5" v-if="profile.showCurrentEducationId && profile.currentEducationId">
                    <span>{{profile.currentEducation.title}}</span>
                  </v-col>
                </v-row>
              </v-col>
            </v-col>
            <v-col cols="12">
              <div @click="connectionsDialog = true" style="text-decoration: none; cursor: pointer;">
                <span class="text-subtitle-2 primary--text text--lighten-5">{{ profile.conn + " Connections" }}</span>
              </div>
            </v-col>
            <v-col cols="3" v-if="isMe">
              <add-section-dropdown @choose-section="getSubSections" />
            </v-col>
            <v-col cols="3" v-if="!isMe">
              <v-btn
                v-if="hasBeenRequested"
                color="primary"
                dark
                rounded
                disabled
              >
                Pending
              </v-btn>
              <v-btn
                v-else-if="hasAlreadyRequested"
                color="primary"
                dark
                rounded
                to="/network"
              >
                Respond
              </v-btn>
              <v-btn
                v-else-if="!alreadyInNetwork"
                color="primary"
                dark
                rounded
                :loading="connectLoading"
                @click="sendConnRequest"
              >
                Connect
              </v-btn>
              <v-btn
                v-if="alreadyInNetwork"
                color="primary lighten-1"
                dark
                rounded
                outlined
                :loading="messageLoading"
                :disabled="connectLoading || messageLoading"
                @click="startChat"
              >
                Message
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="1" v-if="isMe">
          <v-btn
            icon
            @click="$emit('section-selected', 'intro')"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <custom-dialog :show.sync="connectionsDialog">
        <template v-slot:body>
          <connections-list :connections="connections" />
        </template>
      </custom-dialog>

      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message"
                    :type="reqStatus.type"/>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import AddSectionDropdown from "./AddSectionDropdown";
  import {mapActions, mapGetters} from "vuex";
  import {enableSnackbar} from "../../utils/error_utils";
  import CustomAlert from "../Alerts/CustomAlert";
  import CustomDialog from "../Dialogs/CustomDialog";
  import ConnectionsList from "./ConnectionsList";

  export default {
    name: "ProfileSummary",
    components: {ConnectionsList, CustomDialog, CustomAlert, AddSectionDropdown, CustomCard},
    computed: {
      ...mapGetters({
        myProfile: "profileModule/profile",
        connectionsSent: "networkModule/connectionsSent",
        connectionsReceived: "networkModule/connectionsReceived",
        peopleInNetwork: "networkModule/peopleInNetwork",
        peopleInOtherNetwork: "networkModule/peopleInOtherNetwork"
      }),

      hasAlreadyRequested() {
        // the user has already request you
        if (this.isMe) return false;
        const index = this.connectionsReceived.findIndex(conn => conn.profileIdRequest === this.profile.id && conn.typeName === 'pending');
        return index >= 0;
      },

      alreadyInNetwork() {
        if (this.isMe) return false;
        console.log(this.connectionsSent)
        console.log(this.connectionsReceived)
        const firstIndex = this.connectionsSent.findIndex(conn => (conn.profileIdReceive === this.profile.id) && conn.typeName === 'accept');
        const secIndex = this.connectionsReceived.findIndex(conn => (conn.profileIdRequest === this.profile.id) && conn.typeName === 'accept');
        return firstIndex >= 0 || secIndex >= 0;
      },

      hasBeenRequested() {
        // you have already request the user
        if (this.isMe) return false;
        console.log(this.connectionsSent);
        const index = this.connectionsSent.findIndex(conn => conn.profileIdReceive === this.profile.id && conn.typeName === 'pending');
        return index >= 0;
      },

      connections() {
        if (this.profile.id === this.myProfile.id) {
          return this.peopleInNetwork;
        } else {
          return this.peopleInOtherNetwork;
        }
      }

    },
    props: {
      profile: {type: Object, required: true},
      isMe: {type: Boolean, default: true}
    },
    data() {
      return {
        profileInfo: {
          firstName: "Erfan",
          lastName: "Moeini",
          headline: "Teacher Assistant at Shiraz University",
          location: "Fars, Iran",
          connections: 178
        },
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
        connectLoading: false,
        messageLoading: false,
        connectionsDialog: false,
      }
    },

    methods: {
      ...mapActions({
        setChildren: "sectionModule/setChildren",
        requestConnection: "networkModule/requestConnection",
        getConnectionsSent: "networkModule/getConnectionsSent",
        createChat: "chatModule/createChat",
        getChat: "chatModule/getChat"
      }),
      async getSubSections(section) {
        /* Store */
        // await this.setChildren(section);
        this.$emit('section-selected', section)
      },

      sendConnRequest() {
        this.connectLoading = true;
        const payload = {
          profileIdRequest: this.myProfile.id,
          profileIdReceive: this.profile.id
        }
        this.requestConnection(payload).then(async () => {
          this.connectLoading = false;
          enableSnackbar(this.reqStatus, "Connection request successfully sent!", "info")
          await this.getConnectionsSent();
        }).catch(err => {
          enableSnackbar(this.reqStatus, err.message, "error")
        }).finally(() => {
          this.connectLoading = false;
        })
      },

      startChat() {
        this.messageLoading = true;
        this.createChat(this.profile.id).then(async (chat) => {
          this.messageLoading = false;
          await this.getChat(chat.id);
          await this.$router.push({name: 'ChatRoom'});
        }).catch(err => {
          enableSnackbar(this.reqStatus, err.message, "error")
        }).finally(() => {
          this.messageLoading = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
