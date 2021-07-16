<template>
  <div class="fill-height">
    <v-container v-if="!loading" fluid>
      <v-row justify="center" align="center">
        <v-col cols="7">
          <create-post-section/>
        </v-col>
        <v-col cols="7">
          <posts-section @post-action="fetchNetworkPosts" show-author :posts="networkPosts" title="Network Posts" related-to="network" />
        </v-col>
        <!--<v-col cols="7">
          <create-post-section/>
        </v-col>
        <v-col cols="7">
          <create-post-section/>
        </v-col>-->
      </v-row>

    </v-container>
    <spinner v-else/>
  </div>
</template>

<script>
  import CreatePostSection from "../components/Feed/CreatePostSection";
  import Spinner from "../components/Loaders/Spinner";
  import {mapActions, mapGetters} from "vuex";
  import PostsSection from "../components/Post/PostsSection";

  export default {
    name: 'Home',
    components: {
      PostsSection,
      Spinner,
      CreatePostSection,
    },
    computed: {
      ...mapGetters({
        networkPosts: "postModule/networkPosts"
      })
    },
    data() {
      return {
        loading: false,
      }
    },

    methods: {
      ...mapActions("typeModule", ["setTypeItems"]),
      ...mapActions("profileModule", ["getProfile"]),
      ...mapActions("postModule", ["getNetworkPosts"]),
      ...mapActions("networkModule", ["getPeopleInNetwork"]),

      async fetchNetworkPosts() {
        await this.getNetworkPosts();
      }
    },

    async created() {
      this.loading = true;
      await this.getProfile();
      await this.setTypeItems("postVisTypes");
      await this.getPeopleInNetwork();
      await this.getNetworkPosts();
      this.loading = false;
    }
  }
</script>
