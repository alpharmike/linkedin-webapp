<template>
  <div class="fill-height">
    <v-container v-if="!loading" fluid>
      <v-row justify="center" align="center">
        <v-col cols="7">
          <create-post-section />
        </v-col>
      </v-row>

    </v-container>
    <spinner v-else/>
  </div>
</template>

<script>
import CreatePostSection from "../components/Feed/CreatePostSection";
import Spinner from "../components/Loaders/Spinner";
import {mapActions} from "vuex";

export default {
  name: 'Home',

  components: {
    Spinner,
    CreatePostSection,
  },
  data() {
    return {
      loading: false,
    }
  },

  methods: {
    ...mapActions("typeModule", ["setTypeItems"]),
    ...mapActions("profileModule", ["getProfile"])
  },

  async created() {
    this.loading = true;
    await this.getProfile();
    await this.setTypeItems("postVisTypes")
    this.loading = false;
  }
}
</script>
