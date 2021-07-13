import axios from 'axios';
import {BASE_API_URL} from "./API";

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    common: {
      ...axios.defaults.headers.common,
      Authorization: localStorage.getItem("LinkedinToken") || ''
    },
    Authorization: localStorage.getItem("LinkedinToken") || ''
  }
});

export default instance;
