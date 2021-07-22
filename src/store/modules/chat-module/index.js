import axios from '../../../network/axios';
import {errors} from "../../../network/errors";
import {
  ALL_CHATS,
  CHAT, CHAT_ARCHIVE, CHAT_BASE,
  CHAT_MESSAGES, CHAT_SEARCH_MESSAGE, CHAT_SEARCH_USER,
  CHAT_TOKEN,
  CHAT_UNREAD,
  GET_CHATS_ARCHIVED,
  GET_CHATS_UNREAD,
  MESSAGE
} from "../../../network/API";

const state = {
  chats: [],
  currChat: null,
  chatMessages: [],
  unreadChats: [],
  archivedChats: []
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
  },

  setUnreadChats(state, payload) {
    state.unreadChats = payload;
  },

  setArchivedChats(state, payload) {
    state.archivedChats = payload;
  },
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

  async getUnreadChats(context) {
    try {
      let response = await axios.get(GET_CHATS_UNREAD);
      console.log(response.data)
      context.commit('setUnreadChats', response.data);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async getArchivedChats(context) {
    try {
      let response = await axios.get(GET_CHATS_ARCHIVED);
      console.log(response.data)
      context.commit('setArchivedChats', response.data);
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
  },

  async toggleUnreadStatus(context, payload) {
    try {
      // payload is the chat id
      let response = await axios.put(`${CHAT_UNREAD}/${payload}`);
      console.log(response.data)
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async toggleArchiveStatus(context, payload) {
    try {
      // payload is the chat id
      let response = await axios.put(`${CHAT_ARCHIVE}/${payload}`);
      console.log(response.data)
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async removeChat(context, payload) {
    try {
      // payload is the chat id
      let response = await axios.delete(`${CHAT_BASE}/${payload}`);
      console.log(response.data)
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async searchChatUser(context, payload) {
    try {
      // payload is the user's name or username and the chat type (chats, unread, archive)
      let response = await axios.post(CHAT_SEARCH_USER, payload);
      const chatCommitment = payload.chatType === 'unread' ? 'setUnreadChats' : payload.chatType === 'archive' ? 'setArchivedChats' : 'setChats';
      context.commit(chatCommitment, response.data);
      console.log(response.data)
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async searchChatMessage(context, payload) {
    try {
      let response = await axios.post(`${CHAT_SEARCH_MESSAGE}/${payload.chatId}`, payload);
      context.commit('setCurrentChat', response.data);
      console.log(response.data)
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },
};

const getters = {
  chats: (state) => {
    return state.chats;
  },

  currChat: (state) => {
    return state.currChat;
  },

  unreadChats: (state) => {
    return state.unreadChats;
  },

  archivedChats: (state) => {
    return state.archivedChats;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
