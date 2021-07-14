import axios from '../../../network/axios';
import {ACCOMPLISHMENT, ACCOMPLISHMENT_TYPE, BACKGROUND, BACKGROUND_TYPE} from "../../../network/API";
import {errors} from "../../../network/errors";

const state = {
  sections: [
    {
      title: "Intro",
      children: []
    },
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
  ],

  backgrounds: [],
  accomplishments: [],
};

const mutations = {
  setChildren(state, payload) {
    state.sections.forEach(section => {
      if (section.title.toLowerCase() === payload.title.toLowerCase()) {
        section.children = payload.items;
      }
    })
  },

  setBackgrounds(state, payload) {
    state.backgrounds = payload;
  },

  setAcc(state, payload) {
    state.accomplishments = payload;
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
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async getBackgrounds(context, payload) {
    try {
      // get background for the logged in profile or other users (the payload can be profile id of another user)
      const url = payload ? `${BACKGROUND}/${payload}` : BACKGROUND;
      let response = await axios.get(url);
      console.log(response);
      context.commit('setBackgrounds', response.data);
    } catch (e) {
      console.log(e);
      throw Error(errors[e.response.status.toString()])
    }
  },

  async editBackground(context, payload) {
    try {
      console.log(payload)
      const id = payload.id;
      delete payload.id;
      delete  payload.profileId;
      let response = await axios.put(`${BACKGROUND}/${id}`, payload);
      console.log(response);
    } catch (e) {
      console.log(e);
      throw Error(errors[e.response.status.toString()])
    }
  },

  async removeBackground(context, payload) {
    try {
      // payload is the id of te background to be deleted
      let response = await axios.delete(`${BACKGROUND}/${payload}`);
      console.log(response);
    } catch (e) {
      console.log(e);
      throw Error(errors[e.response.status.toString()])
    }
  },

  async createAcc(context, payload) {
    try {
      let response = await axios.post(ACCOMPLISHMENT, payload);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async getAcc(context, payload) {
    try {
      const url = payload ? `${ACCOMPLISHMENT}/${payload}` : ACCOMPLISHMENT;
      let response = await axios.get(url);
      console.log(response);
      context.commit('setAcc', response.data);
    } catch (e) {
      console.log(e);
      throw Error(errors[e.response.status.toString()])
    }
  },

  async editAcc(context, payload) {
    try {
      console.log(payload)
      const id = payload.id;
      delete payload.id;
      delete  payload.profileId;
      let response = await axios.put(`${ACCOMPLISHMENT}/${id}`, payload);
      console.log(response);
    } catch (e) {
      console.log(e);
      throw Error(errors[e.response.status.toString()])
    }
  },

  async removeAcc(context, payload) {
    try {
      // payload is the id of the background to be deleted
      let response = await axios.delete(`${ACCOMPLISHMENT}/${payload}`);
      console.log(response);
    } catch (e) {
      console.log(e);
      throw Error(errors[e.response.status.toString()])
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
  backgrounds: (state) => {
    return state.backgrounds;
  },
  accomplishments: (state) => {
    return state.accomplishments;
  }
};

function getTypeAPI(section) {
  switch (section) {
    case 'background':
      return BACKGROUND_TYPE
    case 'accomplishments':
      return ACCOMPLISHMENT_TYPE
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
