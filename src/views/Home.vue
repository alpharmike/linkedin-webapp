<template>
  <div class="fill-height">
    <v-container v-if="!loading" fluid>
      <v-row justify="center" align="center">
        <v-col cols="7">
          <create-post-section/>
        </v-col>
        <v-col cols="7">
          <posts-section @post-action="() => fetchNetworkPosts('network')" show-author :posts="networkPosts" title="Network Posts" related-to="network" />
        </v-col>
        <v-col cols="7">
          <posts-section @post-action="() => fetchNetworkPosts('network-commented')" show-author :posts="networkCommentedPosts" title="Commented Posts" related-to="network-commented" />
        </v-col>
        <v-col cols="7">
          <posts-section @post-action="() => fetchNetworkPosts('network-liked')" show-author :posts="networkLikedPosts" title="Liked Posts" related-to="network-liked" />
        </v-col>
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
        networkPosts: "postModule/networkPosts",
        networkCommentedPosts: "postModule/networkCommentedPosts",
        networkLikedPosts: "postModule/networkLikedPosts"
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
      ...mapActions("postModule", ["getNetworkPosts", "getNetworkCommentedPosts", "getNetworkLikedPosts"]),
      ...mapActions("networkModule", ["getPeopleInNetwork"]),

      async fetchNetworkPosts(relatedTo) {
        if (relatedTo === 'network') {
          await this.getNetworkPosts();
        } else if (relatedTo === 'network-commented') {
          await this.getNetworkCommentedPosts();
        } else if (relatedTo === 'network-liked') {
          await this.getNetworkLikedPosts();
        }
      }
    },

    async created() {
      this.loading = true;
      await this.getProfile();
      await this.setTypeItems("postVisTypes");
      await this.getPeopleInNetwork();
      await this.getNetworkPosts();
      await this.getNetworkCommentedPosts();
      await this.getNetworkLikedPosts();
      this.loading = false;
    }
  }
</script>
