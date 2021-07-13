import axios from '../../../network/axios';
import {BACKGROUND_TYPES} from "../../../network/API";

const state = {
  industries: []
};

const mutations = {
  setChildren(state, payload) {
    state[payload.title] = payload.items;
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
  industries: (state) => {
    return state.industries;
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
