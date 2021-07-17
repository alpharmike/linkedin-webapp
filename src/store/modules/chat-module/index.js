import axios from '../../../network/axios';
import {errors} from "../../../network/errors";
import {ALL_CHATS, CHAT, CHAT_MESSAGES, CHAT_TOKEN, MESSAGE} from "../../../network/API";

const state = {
  chats: [],
  currChat: null,
  chatMessages: [],
};

const mutations = {
  setChats(state, payload) {
    state.chats = payload;
  },

  // set current chat messages
  setChatMessages(state, payload) {
    state.chatMessages = payload;
  },

  setCurrentChat(state, payload) {
    state.currChat = payload;
  },

  resetChat(state) {
    state.currChat = null;
  }
};

const actions = {
  async createChat(context, payload) {
    try {
      // payload is the id of the other profile
      let response = await axios.post(`${CHAT_TOKEN}/${payload}`);
      console.log(response.data);
      return response.data
      // context.commit('setCurrentChat', response.data);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async getChatMessages(context, payload) {
    // payload is the chat id
    try {
      let response = await axios.get(`${CHAT_MESSAGES}/${payload}`);
      context.commit('setChatMessages', response.data);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async getAllChats(context) {
    try {
      let response = await axios.get(ALL_CHATS);
      console.log(response.data)
      context.commit('setChats', response.data);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async setCurrChat(context, payload) {
    context.commit('setCurrentChat', payload)
  },

  async resetChat(context) {
    context.commit('resetChat')
  },

  async createMessage(context, payload) {
    try {
      let response = await axios.post(`${MESSAGE}/${payload.chatId}`, payload);
      console.log(response.data)
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async getChat(context, payload) {
    try {
      // payload is the chat id
      let response = await axios.get(`${CHAT}/${payload}`);
      console.log(response.data)
      context.commit('setCurrentChat', response.data);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  }
};

const getters = {
  chats: (state) => {
    return state.chats;
  },

  currChat: (state) => {
    return state.currChat;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
