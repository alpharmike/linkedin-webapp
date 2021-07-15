<template>
  <custom-card title="Invitations">
    <template v-slot:body>
      <v-list>
        <v-list-item
          v-for="(request, index) in pendingRequestsReceived"
          :key="request.profileRequest.firstName + index"
        >
          <v-list-item-avatar size="48">
            <user-avatar :initials="request.profileRequest.firstName[0] + request.profileRequest.lastName[0]" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{`${request.profileRequest.firstName} ${request.profileRequest.lastName}`}}</v-list-item-title>

            <v-list-item-subtitle>{{request.profileRequest.headline}}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-row align="center">
              <v-btn
                color="primary"
                rounded
                outlined
                depressed
                class="mx-2"
                small
                :loading="loadings.block"
                :disabled="loadings.accept || loadings.block"
                @click="() => respond(request, 'block')"
              >
                Ignore
              </v-btn>
              <v-btn
                color="primary"
                rounded
                depressed
                small
                :loading="loadings.accept"
                :disabled="loadings.accept || loadings.block"
                @click="() => respond(request, 'accept')"
              >
                Accept
              </v-btn>
            </v-row>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </template>
  </custom-card>
</template>

<script>
  import CustomCard from "../Cards/CustomCard";
  import UserAvatar from "../Avatars/UserAvatar";
  import {mapActions, mapGetters} from "vuex";
  import {enableSnackbar} from "../../utils/error_utils";
  export default {
    name: "InvitationsCard",
    components: {UserAvatar, CustomCard},
    computed: {
      ...mapGetters({
        pendingRequestsReceived: "networkModule/pendingRequestsReceived",
        connectTypes: "typeModule/connectTypes"
      }),
      invitations() {
        return [
          {
            firstName: "Alireza",
            lastName: "Moeini",
            headline: "Student at Shiraz University"
          },
          {
            firstName: "Alireza",
            lastName: "Moeini",
            headline: "Student at Shiraz University"
          },
          {
            firstName: "Alireza",
            lastName: "Moeini",
            headline: "Student at Shiraz University"
          },
        ]
      }
    },

    data() {
      return {
        loadings: {
          accept: false,
          block: false,
        },
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
      }
    },

    methods: {
      ...mapActions({
        respondToConnRequest: "networkModule/respondToConnRequest",
      }),
      respond(request, response) {
        // this.loadings[response] = true;
        const index = this.connectTypes.findIndex(type => type.name === response);
        const payload = {
          profileIdReceive: request.profileReceiver.id,
          connectType: this.connectTypes[index].id,
          profileIdRequest: request.profileRequest.id
        }
        console.log(payload);
        this.respondToConnRequest(payload).then(() => {
          this.loadings[response] = false;
          enableSnackbar(this.reqStatus, "Connection successfully added to your network!", "info")
          this.$emit('respond', this.reqStatus)
        }).catch(err => {
          enableSnackbar(this.reqStatus, err.message, "error")
          this.$emit('error', this.reqStatus)
        }).finally(() => {
          this.loadings[response] = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
