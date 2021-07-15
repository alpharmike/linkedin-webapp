import axios from '../../../network/axios';
import {
  NUM_OF_CONN, PENDING_CONNECTION_REQUESTS,
  PROFILE,
  PROFILE_BY_USERNAME,
  REQUEST_CONNECTION, REQUEST_CONNECTIONS_RECEIVED,
  REQUEST_CONNECTIONS_SENT, RESPOND_REQUEST
} from "../../../network/API";
import {errors} from "../../../network/errors";

const state = {
  connectionsReceived: [],
  connectionsSent: [],
  pendingRequestsReceived: []
};

const mutations = {
  setConnectionsSent(state, payload) {
    state.connectionsSent = payload;
  },

  setConnectionsReceived(state, payload) {
    state.connectionsReceived = payload;
  },

  setPendingRequestsReceived(state, payload) {
    state.pendingRequestsReceived = payload;
  }
};

const actions = {
  async requestConnection(context, payload) {
    try {
      let response = await axios.post(REQUEST_CONNECTION, payload);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async getConnectionsSent(context) {
    try {
      let response = await axios.get(REQUEST_CONNECTIONS_SENT);
      console.log(response.data)
      context.commit('setConnectionsSent', response.data);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async getConnectionsReceived(context) {
    try {
      let response = await axios.get(REQUEST_CONNECTIONS_RECEIVED);
      const data = response.data;
      context.commit('setConnectionsReceived', data);

      /*const pendingConnections = findConnectionsByType(data, 'pending', 'receiver')
      context.commit('setPendingConnectionsReceived', pendingConnections)*/
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async getPendingRequestsReceived(context) {
    try {
      let response = await axios.get(PENDING_CONNECTION_REQUESTS);
      context.commit('setPendingRequestsReceived', response.data);

      /*const pendingConnections = findConnectionsByType(data, 'pending', 'receiver')
      context.commit('setPendingConnectionsReceived', pendingConnections)*/
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  },

  async respondToConnRequest(context, payload) {
    try {
      let response = await axios.post(RESPOND_REQUEST, payload);
    } catch (e) {
      throw Error(errors[e.response.status.toString()])
    }
  }
};

const getters = {
  connectionsSent: (state) => {
    return state.connectionsSent;
  },

  connectionsReceived: (state) => {
    return state.connectionsReceived;
  },

  pendingRequestsReceived: (state) => {
    return state.pendingRequestsReceived;
  },
};

function findConnectionsByType(connections, type, side) {
  const result = [];
  connections.forEach(conn => {
    if (conn.typeName === type) {
      result.push(conn[side]);
    }
  })

  return result;
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
