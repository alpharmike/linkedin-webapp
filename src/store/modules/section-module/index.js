import axios from '../../../network/axios';
import {BACKGROUND_TYPES} from "../../../network/API";

const state = {
  sections: [
    {
      title: "Background",
      children: []
    },
    {
      title: "Accomplishments",
      children: []
    },
    {
      title: "Skills",
      children: []
    },
  ]
};

const mutations = {
  setChildren(state, payload) {
    state.sections.forEach(section => {
      if (section.title === payload.title) {
        section.children = payload.items;
      }
    })
  },
};

const actions = {
  async setChildren(context, payload) {
    try {
      let response = await axios.get(BACKGROUND_TYPES);
      context.commit('setChildren', response.data);
    } catch (e) {
      if (e.response.status === 401) {
        throw Error("Not Authorized!")
      } else if (e.response.status === 422) {
        let errors = e.response.data.data;
        if (errors && errors.length !== 0) {
          let errMsg = errors[0].msg;
          throw Error(errMsg);
        }
      } else if (e.response.status >= 500) {
        throw Error("Network Error!")
      }
    }
  },
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


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
