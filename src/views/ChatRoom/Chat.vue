<template>
  <div class="fill-height">
    <v-container v-if="!loading" fluid>
      <v-row justify="center">
        <v-col cols="10">
          <v-tabs
            v-model="tab"
            centered
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#chats">
              Chat
              <v-icon>mdi-chat</v-icon>
            </v-tab>

            <v-tab href="#unread">
              Unread
              <v-icon>mdi-email-mark-as-unread </v-icon>
            </v-tab>

            <v-tab href="#archive">
              Archive
              <v-icon>mdi-archive</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item
              value="chats"
            >
              <chat-section :chats="allChats" />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>



      <!--All with same type-->
      <!--<v-list three-line>
        <template v-for="(item, index) in items">
          <v-list-item
            v-else
            :key="item.title"
          >
            <v-list-item-avatar>
              <user-avatar/>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>-->
    </v-container>
    <spinner v-else />
  </div>
</template>

<script>

  import {mapActions, mapGetters} from "vuex";
  import Spinner from "../../components/Loaders/Spinner";
  // import CustomCard from "../../components/Cards/CustomCard";
  import ChatSection from "../../components/Chat/ChatSection";

  export default {
    name: "Chat",
    components: {ChatSection, Spinner},

    computed: {
      ...mapGetters({
        curChat: "chatModule/currChat",
        allChats: "chatModule/chats"
      })
    },

    data() {
      return {
        loading: false,
        tab: 1,
      }
    },

    methods: {
      ...mapActions({
        getAllChats: "chatModule/getAllChats"
      })
    },

    async created() {
      this.loading = true;
      await this.getAllChats();
      this.loading = false;
    }
  }
</script>

<style scoped>

</style>
