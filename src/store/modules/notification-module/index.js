import axios from '../../../network/axios';
import {errors} from "../../../network/errors";
import {BIRTHDAY_NOTIFICATION, NOTIFICATION} from "../../../network/API";

const state = {
  notifications: [],
};

const mutations = {
  setNotifications(state, payload) {
    state.notifications = payload;
  },

  setBirthdayNotifications(state, payload) {
    payload.forEach(notification => {
      state.notifications.push(notification);
    })
  }
};

const actions = {
  async getNotifications(context) {
    try {
      let response = await axios.get(NOTIFICATION);
      console.log(response.data);
      context.commit('setNotifications', response.data);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async getBirthdayNotifications(context) {
    try {
      let response = await axios.get(BIRTHDAY_NOTIFICATION);
      console.log(response.data);
      context.commit('setBirthdayNotifications', response.data);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },
};

const getters = {
  notifications: (state) => {
    return state.notifications;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
