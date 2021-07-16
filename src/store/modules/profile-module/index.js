import axios from '../../../network/axios';
import {FULL_PROFILE, NUM_OF_CONN, PROFILE, PROFILE_BY_USERNAME, SEARCH_PROFILE} from "../../../network/API";
import {errors} from "../../../network/errors";

const state = {
  profile: {
    username: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    formerName: "",
    headline: "",
    about: "",
    address: "",
    country: "",
    locationInCountry: "",
    industry: "",
    dateOfBirth: "",
    urlToProfile: "",
    formerNameVisibilityType: "",
    phoneType: ""
  },
  visitingProfile: {
    username: "",
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    formerName: "",
    headline: "",
    about: "",
    address: "",
    country: "",
    locationInCountry: "",
    industry: "",
    dateOfBirth: "",
    urlToProfile: "",
    formerNameVisibilityType: "",
    phoneType: ""
  },
};

const mutations = {
  setProfile(state, payload) {
    state.profile = {...payload}
  },

  setVisitingProfile(state, payload) {
    state.visitingProfile = {...payload}
  },

  verifyAcc(state) {
    state.profile.verified = true;
  }
};

const actions = {
  async getProfile(context) {
    try {
      let response = await axios.get(FULL_PROFILE);
      let numOfConn = await axios.get(NUM_OF_CONN);
      const payload = response.data;
      delete payload.password;
      payload.conn = numOfConn.data;
      context.commit('setProfile', payload);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async editProfile(context, payload) {
    try {
      let response = await axios.put(
        PROFILE,
        payload
      );
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async getProfileByUsername(context, payload) {
    try {
      // payload is the username
      console.log(payload)
      let response = await axios.get(`${PROFILE_BY_USERNAME}/${payload}`);
      const data = response.data;
      let numOfConn = await axios.get(`${NUM_OF_CONN}/${data.id}`);
      data.conn = numOfConn.data;
      await context.commit('setVisitingProfile', data);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async searchProfiles(context, payload) {
    try {
      // filter profiles based on given filter and keyword
      console.log(payload)
      let response = await axios.post(SEARCH_PROFILE, payload);
      console.log(response.data)
      return response.data;
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  }
  /*async getAllUsers(context, filterKey) {
    try {
      let response = await axios.get(
        GET_ALL_USERS, {
          params: {
            filterKey: filterKey
          }
        }
      );

      let users = response.data;

      users.forEach(user => {
        user.avatar = user.avatar ? BASE_URL + '/' + user.avatar : null;
      })

      return response.data;
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
  },*/
};

const getters = {
  profile: (state) => {
    return state.profile
  },
  visitingProfile: (state) => {
    return state.visitingProfile
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
