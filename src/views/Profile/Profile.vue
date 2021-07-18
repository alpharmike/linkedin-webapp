<template>
  <div class="fill-height">
    <v-container v-if="!loading" fluid>
      <v-row>
        <v-col cols="8">
          <v-row justify="space-between">
            <v-col cols="12">
              <ProfileSummary :is-me="isMyProfile" :profile="currProfile" @section-selected="openSectionDialog"/>
            </v-col>

            <v-col cols="12">
              <about-section :about="currProfile.about" :is-me="isMyProfile" @edit="dialogs.about = true"/>
            </v-col>

            <v-col cols="12">
              <featured-section :profile="currProfile" :is-me="isMyProfile" />
            </v-col>

            <v-col cols="12">
              <background-section :is-me="isMyProfile"  @edited="(alert) => reqStatus = alert" @add="() => openSectionDialog('background')"/>
            </v-col>

            <v-col cols="12">
              <accomplishment-section :is-me="isMyProfile" @edited="(alert) => reqStatus = alert"
                                      @add="() => openSectionDialog('accomplishments')"/>
            </v-col>

            <v-col cols="12">
              <skill-section :is-me="isMyProfile" @edited="(alert) => reqStatus = alert"
                                      @add="() => openSectionDialog('skills')"/>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <user-info-card />
        </v-col>
      </v-row>

      <custom-dialog :show.sync="dialogs.intro">
        <template v-slot:body>
          <intro-form @edited="currProfile = {...profile}" @show-alert="(alert) => reqStatus = alert" @close="dialogs.intro = false"/>
        </template>
      </custom-dialog>
      <custom-dialog :show.sync="dialogs.background">
        <template v-slot:body>
          <background-form @show-alert="(alert) => reqStatus = alert" @close="dialogs.background = false"/>
        </template>
      </custom-dialog>
      <custom-dialog :show.sync="dialogs.accomplishments">
        <template v-slot:body>
          <accomplishment-form @show-alert="(alert) => reqStatus = alert" @close="dialogs.accomplishments = false"/>
        </template>
      </custom-dialog>
      <custom-dialog :show.sync="dialogs.skills">
        <template v-slot:body>
          <skill-form @show-alert="(alert) => reqStatus = alert" @close="dialogs.skills = false"/>
        </template>
      </custom-dialog>
      <custom-dialog :show.sync="dialogs.languages">
        <template v-slot:body>
          <language-form @show-alert="(alert) => reqStatus = alert" @close="dialogs.languages = false"/>
        </template>
      </custom-dialog>
      <custom-dialog :show.sync="dialogs.about">
        <template v-slot:body>
          <about-form @edited="currProfile = {...profile}" @show-alert="(alert) => reqStatus = alert" @close="dialogs.about = false"/>
        </template>
      </custom-dialog>

      <custom-alert v-model="reqStatus.status" @input="reqStatus.status = !reqStatus.status"
                    :message="reqStatus.message" :type="reqStatus.type"/>

    </v-container>
    <spinner v-else/>
  </div>
</template>

<script>
  import ProfileSummary from "../../components/Profile/ProfileSummary";
  import CustomDialog from "../../components/Dialogs/CustomDialog";
  import BackgroundForm from "../../components/Forms/BackgroundForm";
  import IntroForm from "../../components/Forms/IntroForm";
  import AccomplishmentForm from "../../components/Forms/AccomplishmentForm";
  import SkillForm from "../../components/Forms/SkillForm";
  import AboutSection from "../../components/Profile/AboutSection";
  import AboutForm from "../../components/Forms/AboutForm";
  import BackgroundSection from "../../components/Profile/BackgroundSection";
  import AccomplishmentSection from "../../components/Profile/AccomplishmentSection";
  import {mapActions, mapGetters} from "vuex";
  import Spinner from "../../components/Loaders/Spinner";
  import CustomAlert from "../../components/Alerts/CustomAlert";
  import SkillSection from "../../components/Profile/SkillSection";
  import LanguageForm from "../../components/Forms/LanguageForm";
  import FeaturedSection from "../../components/Profile/FeaturedSection";
  import UserInfoCard from "../../components/Cards/UserInfoCard";

  export default {
    name: "Profile",
    components: {
      UserInfoCard,
      FeaturedSection,
      LanguageForm,
      SkillSection,
      CustomAlert,
      Spinner,
      AccomplishmentSection,
      BackgroundSection,
      AboutForm,
      AboutSection, SkillForm, AccomplishmentForm, IntroForm, BackgroundForm, CustomDialog, ProfileSummary
    },

    computed: {
      ...mapGetters("profileModule", ["profile", "visitingProfile"]),
      ...mapGetters("typeModule", ["industries"]),
      ...mapGetters("sectionModule", ["skills"]),
      ...mapGetters("postModule", ["posts"]),
    },

    data() {
      return {
        dialogs: {
          background: false,
          intro: false,
          accomplishments: false,
          skills: false,
          languages: false,
          about: false
        },
        reqStatus: {
          message: "",
          type: "",
          status: false
        },
        loading: false,
        currProfile: {},
        currPosts: {},
        isMyProfile: true,
      }
    },

    methods: {
      ...mapActions({
        getProfile: "profileModule/getProfile",
        getProfileByUsername: "profileModule/getProfileByUsername",
        setChildren: "sectionModule/setChildren",
        setTypeItems: "typeModule/setTypeItems",
        getBackgrounds: "sectionModule/getBackgrounds",
        getAcc: "sectionModule/getAcc",
        getSkills: "sectionModule/getSkills",
        getConnectionsSent: "networkModule/getConnectionsSent",
        getConnectionsReceived: "networkModule/getConnectionsReceived",
        getPosts: "postModule/getPosts",
        getPeopleInNetwork: "networkModule/getPeopleInNetwork"
      }),
      openSectionDialog(section) {
        console.log(section)
        this.dialogs[section.toLowerCase()] = true
      },

      async setSectionChildren(section) {
        await this.setChildren(section)
      },

      async initSubSections() {
        await this.setSectionChildren("background");
        await this.setSectionChildren("accomplishments");
      },

      async initTypes() {
        await this.setTypeItems("industries");
        await this.setTypeItems("formerNameVisTypes");
        await this.setTypeItems("skillLevels");
        await this.setTypeItems("relationKnowledgeTypes");
        await this.setTypeItems("languageLevels");
      },

      async getProfileBackgrounds(id) {
        await this.getBackgrounds(id);
      },

      async getProfileAcc(id) {
        await this.getAcc(id);
      },

      async getUserProfile(username) {
        console.log(username)
        await this.getProfileByUsername(username);
      }
    },

    async created() {
      this.loading = true;
      await this.getProfile();
      await this.initSubSections();
      await this.initTypes();
      await this.getProfileBackgrounds();
      await this.getProfileAcc();
      const username = this.$route.params.username;
      if (username !== this.profile.username) {
        this.isMyProfile = false;
        await this.getUserProfile(username);
        await this.getProfileBackgrounds(this.visitingProfile.id);
        await this.getProfileAcc(this.visitingProfile.id);
        await this.getSkills(this.visitingProfile.id);
        await this.getPosts(this.visitingProfile.id);
        await this.getConnectionsSent(); // to check if I have sent conn request to the user
        await this.getConnectionsReceived(); // to check if I have sent conn request to the user
        await this.getPeopleInNetwork();
        this.getPeopleInNetwork(this.visitingProfile.id);
        this.currProfile = this.visitingProfile;
      } else {
        await this.getProfileBackgrounds();
        await this.getProfileAcc();
        await this.getSkills();
        console.log("IN PROFILE")
        await this.getPosts();
        await this.getPeopleInNetwork();
        console.log(this.skills);
        this.currProfile = {...this.profile};
        console.log(this.currProfile)
      }
      this.loading = false;
    }
  }
</script>

<style scoped>

</style>
