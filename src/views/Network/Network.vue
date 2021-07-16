<template>
  <div class="fill-height">
    <v-container v-if="!loading" fluid>
      <v-row justify="center">
        <v-col cols="8">
          <invitations-card @respond="updateConnections" @error="(alert) => reqStatus = alert"/>
        </v-col>

        <v-col cols="8">
          <suggestions/>
        </v-col>
      </v-row>
    </v-container>
    <spinner v-else/>

    <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status" :message="reqStatus.message"
                  :type="reqStatus.type"/>
  </div>
</template>

<script>
  import Spinner from "../../components/Loaders/Spinner";
  import InvitationsCard from "../../components/Network/InvitationsCard";
  import Suggestions from "../../components/Network/Suggestions";
  import {mapActions, mapGetters} from "vuex";
  import CustomAlert from "../../components/Alerts/CustomAlert";

  export default {
    name: "Network",
    components: {CustomAlert, Suggestions, InvitationsCard, Spinner},
    data() {
      return {
        loading: false,

        reqStatus: {
          message: "",
          type: "",
          status: false
        },
      }
    },

    methods: {
      ...mapActions({
        getPendingRequestsReceived: "networkModule/getPendingRequestsReceived",
        setTypeItems: "typeModule/setTypeItems",
      }),

      async initTypes() {
        await this.setTypeItems("connectTypes");
      },

      async updateConnections(alert) {
        this.reqStatus = alert;
        await this.getPendingRequestsReceived();
      }
    },

    async created() {
      this.loading = true;
      await this.getPendingRequestsReceived();
      await this.initTypes();
      this.loading = false;
    }
  }
</script>

<style scoped>

</style>
