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
              <a href="/register" style="text-decoration: none;">
                <span class="text-subtitle-2 text--lighten-5">{{ profile.conn + " Connections" }}</span>
              </a>
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

  export default {
    name: "ProfileSummary",
    components: {CustomAlert, AddSectionDropdown, CustomCard},
    computed: {
      ...mapGetters({
        myProfile: "profileModule/profile",
        connectionsSent: "networkModule/connectionsSent",
        connectionsReceived: "networkModule/connectionsReceived",
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
        connectLoading: false
      }
    },

    methods: {
      ...mapActions({
        setChildren: "sectionModule/setChildren",
        requestConnection: "networkModule/requestConnection"
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
        }).catch(err => {
          enableSnackbar(this.reqStatus, err.message, "error")
        }).finally(() => {
          this.connectLoading = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
