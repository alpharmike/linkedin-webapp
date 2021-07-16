import axios from '../../../network/axios';
import {errors} from "../../../network/errors";
import {CREATE_COMMENT, LIKE_COMMENT, LIKE_POST, NETWORK_POST, POST} from "../../../network/API";

const state = {
  posts: [],
  networkPosts: [],
  networkLikedPosts: [],
  networkCommentedPosts: []
};

const mutations = {
  // for my profile or visiting profile
  setPosts(state, payload) {
    state.myPosts = payload;
  },

  // posts created by people in my network
  setNetworkPosts(state, payload) {
    state.networkPosts = payload;
  },

  // posts people in my network have liked
  setNetworkLikedPosts(state, payload) {
    state.networkLikedPosts = payload;
  },

  // posts people in my network have commented on
  setNetworkCommentedPosts(state, payload) {
    state.networkCommentedPosts = payload;
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

  async getNetworkPosts(context) {
    try {
      let response = await axios.get(NETWORK_POST);
      console.log(response.data)
      await context.commit('setNetworkPosts', response.data);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  }


};

const getters = {
  posts: (state) => {
    return state.myPosts;
  },

  networkPosts: (state) => {
    return state.networkPosts;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
