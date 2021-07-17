<template>
  <custom-card no-header color="secondary darken-1">
    <template v-slot:body>
      <v-row justify="center" dense class="py-3">
        <v-col cols="3">
          <user-avatar :initials="userInfo.firstName[0] + userInfo.lastName[0]" />
        </v-col>
        <v-col cols="12">
          <span class="text-body-1 white--text">{{userInfo.firstName + " " + userInfo.lastName}}</span>
        </v-col>
        <v-col cols="12">
          <span class="text-subtitle-2 grey--text">{{userInfo.headline}}</span>
        </v-col>
      </v-row>
    </template>

    <template v-slot:actions>
      <v-row justify="center" align="center" class="py-3">
        <v-btn
          v-if="!hasAlreadyRequested"
          color="primary"
          rounded
          depressed
          small
          :disabled="hasBeenRequested"
          @click="sendConnRequest"
        >
          {{hasBeenRequested ? 'Pending' : 'Connect'}}
        </v-btn>
      </v-row>

      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message"
                    :type="reqStatus.type"/>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "./CustomCard";
  import UserAvatar from "../Avatars/UserAvatar";
  import {enableSnackbar} from "../../utils/error_utils";
  import {mapActions, mapGetters} from "vuex";
  import CustomAlert from "../Alerts/CustomAlert";
  export default {
    name: "SuggestionCard",
    components: {CustomAlert, UserAvatar, CustomCard},
    props: {
      userInfo: {type: Object, required: true}
    },
    computed: {
      ...mapGetters({
        myProfile: "profileModule/profile",
        connectionsSent: "networkModule/connectionsSent",
        connectionsReceived: "networkModule/connectionsReceived",
      }),

      hasAlreadyRequested() {
        // the user has already request you
        const index = this.connectionsReceived.findIndex(conn => conn.profileIdRequest === this.userInfo.id && conn.typeName === 'pending');
        return index >= 0;
      },

      hasBeenRequested() {
        // you have already request the user
        console.log(this.connectionsSent);
        const index = this.connectionsSent.findIndex(conn => conn.profileIdReceive === this.userInfo.id && conn.typeName === 'pending');
        return index >= 0;
      },
    },
    data() {
      return {
        connectLoading: false,
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
      }
    },
    methods: {
      ...mapActions({
        setChildren: "sectionModule/setChildren",
        requestConnection: "networkModule/requestConnection",
        getConnectionsSent: "networkModule/getConnectionsSent"
      }),
      sendConnRequest() {
        this.connectLoading = true;
        const payload = {
          profileIdRequest: this.myProfile.id,
          profileIdReceive: this.userInfo.id
        }
        console.log(payload)
        this.requestConnection(payload).then(async () => {
          this.connectLoading = false;
          enableSnackbar(this.reqStatus, "Connection request successfully sent!", "info")
          await this.getConnectionsSent();
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
