import axios from '../../../network/axios';
import {errors} from "../../../network/errors";
import {CREATE_COMMENT, LIKE_COMMENT, LIKE_POST, POST} from "../../../network/API";

const state = {
  posts: [],
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

  async getPosts(context, payload) {
    try {
      let response = await axios.get(payload ? `${POST}/${payload}` : POST);
      await context.commit('setPosts', response.data);
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
      let response = await axios.delete(`${LIKE_POST}/${payload}`);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async createComment(context, payload) {
    try {
      let response = await axios.post(CREATE_COMMENT, payload);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async likeComment(context, payload) {
    try {
      let response = await axios.post(LIKE_COMMENT, payload);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async removeCommentLike(context, payload) {
    try {
      // payload is the like comment id
      let response = await axios.delete(`${LIKE_COMMENT}/${payload}`);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },


};

const getters = {
  posts: (state) => {
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
