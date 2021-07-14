import axios from '../../../network/axios';
import {BACKGROUND_TYPE, BACKGROUND} from "../../../network/API";
import {errors} from "../../../network/errors";

const state = {
  sections: [
    {
      title: "Intro",
      children: []
    },
    {
      title: "Background",
      children: [
        "Work Experience",
        "Volunteer Experience"
      ]
    },
    {
      title: "Accomplishments",
      children: []
    },
    {
      title: "Skills",
      children: [
        "SQL",
        "Back-End Web Development",
        "Artificial Intelligence",
        "jQuery",
        "Information Technology",
        "Convolutional Neural Networks",
        "Web Design",
        "User Experience",
        "Date Mining"
      ]
    },
  ]
};

const mutations = {
  setChildren(state, payload) {
    state.sections.forEach(section => {
      if (section.title.toLowerCase() === payload.title.toLowerCase()) {
        section.children = payload.items;
      }
    })
  },
};

const actions = {
  async setChildren(context, payload) {
    try {
      // payload is the section name
      const url = getTypeAPI(payload)
      let response = await axios.get(url);
      context.commit('setChildren', {items: [...response.data], title: payload});
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async createBackground(context, payload) {
    try {
      let response = await axios.post(BACKGROUND, payload);
      console.log(response);
    } catch (e) {
      console.log(e);
      throw Error(errors[e.response.status.toString()])
    }
  }
};

const getters = {
  sections: (state) => {
    return state.sections
  },
  backgroundSection: (state) => {
    const index = state.sections.findIndex(section => section.title.toLowerCase() === "background");
    return state.sections[index];
  },
  accomplishmentsSection: (state) => {
    const index = state.sections.findIndex(section => section.title.toLowerCase() === "accomplishments");
    return state.sections[index];
  },
  skillsSection: (state) => {
    const index = state.sections.findIndex(section => section.title.toLowerCase() === "skills");
    return state.sections[index];
  },
};

function getTypeAPI(section) {
  switch (section) {
    case 'background':
      return BACKGROUND_TYPE

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
