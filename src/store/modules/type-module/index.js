import axios from '../../../network/axios';
import {
  ACCOMPLISHMENT_TYPE,
  BACKGROUND_TYPE, CONNECT_TYPE,
  FORMER_NAME_VISIBILITY_TYPE,
  INDUSTRY_TYPE, LANGUAGE_LEVEL_TYPE, NOTIFICATION_TYPE, POST_VISIBILITY_TYPE, RELATION_KNOWLEDGE_TYPE, SKILL_LEVEL_TYPE
} from "../../../network/API";
import {errors} from "../../../network/errors";

const state = {
  industries: [],
  formerNameVisTypes: [],
  postVisTypes: [],
  skillLevels: [],
  relationKnowledgeTypes: [],
  connectTypes: [],
  languageLevels: [],
};

const mutations = {
  setTypeItems(state, payload) {
    state[payload.title] = payload.items;
  },
};

const actions = {
  async setTypeItems(context, payload) {
    try {
      // payload is the type name
      const url = getTypeAPI(payload)
      let response = await axios.get(url);
      context.commit('setTypeItems', {items: response.data, title: payload});
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },
};

const getters = {
  sections: (state) => {
    return state.sections
  },
  industries: (state) => {
    return state.industries;
  },
  formerNameVisTypes: (state) => {
    return state.formerNameVisTypes;
  },
  postVisTypes: (state) => {
    return state.postVisTypes;
  },
  skillLevels: (state) => {
    return state.skillLevels;
  },
  relationKnowledgeTypes: (state) => {
    return state.relationKnowledgeTypes;
  },
  connectTypes: (state) => {
    return state.connectTypes;
  },
  languageLevels: (state) => {
    return state.languageLevels;
  },
};

function getTypeAPI(type) {
  switch (type) {
    case 'industries':
      return INDUSTRY_TYPE
    case 'formerNameVisTypes':
      return FORMER_NAME_VISIBILITY_TYPE
    case 'postVisTypes':
      return POST_VISIBILITY_TYPE;
    case 'skillLevels':
      return SKILL_LEVEL_TYPE;
    case 'relationKnowledgeTypes':
      return RELATION_KNOWLEDGE_TYPE;
    case 'connectTypes':
      return CONNECT_TYPE;
    case 'languageLevels':
      return LANGUAGE_LEVEL_TYPE;
    case 'notificationTypes':
      return NOTIFICATION_TYPE;

  }
}



export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
