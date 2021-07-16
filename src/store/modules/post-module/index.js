import axios from '../../../network/axios';
import {errors} from "../../../network/errors";
import {CREATE_COMMENT, LIKE_POST, POST, REMOVE_POST_LIKE} from "../../../network/API";

const state = {
  myPosts: [],
};

const mutations = {
  setPosts(state, payload) {
    state.myPosts = payload;
  },
};

const actions = {
  async createPost(context, payload) {
    try {
      let response = await axios.post(POST, payload);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async getPosts(context) {
    try {
      let response = await axios.get(POST);
      context.commit('setPosts', response.data);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async likePost(context, payload) {
    try {
      let response = await axios.post(LIKE_POST, payload);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async removePostLike(context, payload) {
    try {
      // payload is the like post id
      let response = await axios.delete(`${REMOVE_POST_LIKE}/${payload}`);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async createComment(context, payload) {
    try {
      // payload is the like post id
      let response = await axios.delete(`${CREATE_COMMENT}/${payload}`);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  }


};

const getters = {
  myPosts: (state) => {
    return state.myPosts;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
