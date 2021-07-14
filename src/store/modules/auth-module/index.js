import axios from '../../../network/axios';
import {SIGN_UP, LOGIN} from "../../../network/API";
import {errors} from "../../../network/errors";

const state = {
  token: localStorage.getItem("LinkedinToken") || '',
};

const mutations = {
  setToken(state, payload) {
    state.token = payload;
  }
};

const actions = {
  async login(context, payload) {
    try {
      let response = await axios.post(LOGIN, payload);
      context.commit("setToken", "Bearer " + response.data.token);
      localStorage.setItem("LinkedinToken", state.token);
      axios.defaults.headers.common['Authorization'] = state.token;
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        throw Error("Invalid Credentials!");
      } else if (e.response.status === 401 ){
        throw Error(errors["401"]);
      } else {
        throw Error(errors["500"]);
      }
    }

  },
  async signUp(context, payload) {
    try {
      let response = await axios.post(SIGN_UP, payload);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },
  async logout(context) {
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem("LinkedinToken");
    context.commit('setToken', "");
  },
};

const getters = {
  isAuthenticated: (state) => {
    return state.token !== ""
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
