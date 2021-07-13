import axios from '../../../network/axios';
import {PROFILE} from "../../../network/API";
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
  }
};

const mutations = {
  setProfile(state, payload) {
    state.profile = {...payload}
  },

  verifyAcc(state) {
    state.profile.verified = true;
  }
};

const actions = {
  async getProfile(context) {
    try {
      console.log(axios.defaults.headers);
      let response = await axios.get(PROFILE);
      const payload = response.data;
      delete payload.password;
      context.commit('setProfile', payload);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  /*async editProfile(context, payload) {
    try {
      let response = await axios.post(
        EDIT_PROFILE,
        payload
      );
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
*/
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
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
