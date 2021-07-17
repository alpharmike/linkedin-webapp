<template>
  <div class="fill-height">
    <v-container v-if="!loading" fluid>
      <v-row justify="center">
        <v-col cols="10">
          <v-tabs
            v-model="tab"
            @change="onTabChange"
            centered
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#chats">
              <v-icon class="mx-1">mdi-chat</v-icon>
              Chat
            </v-tab>

            <v-tab href="#unread">
              <v-icon class="mx-1">mdi-email-mark-as-unread </v-icon>
              Unread
            </v-tab>

            <v-tab href="#archive">
              <v-icon class="mx-1">mdi-archive</v-icon>
              Archive
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item
              value="chats"
            >
              <chat-section section="chats" :chats="allChats" />
            </v-tab-item>

            <v-tab-item
              value="unread"
            >
              <chat-section section="unread" :chats="unreadChats" />
            </v-tab-item>

            <v-tab-item
              value="archive"
            >
              <chat-section section="archive" :chats="archivedChats" />
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
        allChats: "chatModule/chats",
        unreadChats: "chatModule/unreadChats",
        archivedChats: "chatModule/archivedChats",
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
        getAllChats: "chatModule/getAllChats",
        getUnreadChats: "chatModule/getUnreadChats",
        getArchivedChats: "chatModule/getArchivedChats",
      }),

      async onTabChange(newTab) {
        this.loading = true;
        console.log(newTab)
        if (newTab === 'chats') {
          await this.getAllChats();
        } else if (newTab ==='unread') {
          console.log("here")
          await this.getUnreadChats();
        } else if (newTab === 'archive') {
          await this.getArchivedChats();
        }
        this.loading = false;
      }
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
