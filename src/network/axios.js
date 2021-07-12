import axios from 'axios';
import {BASE_API_URL} from "@/network/API";

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: localStorage.getItem("Token") || ''
  }
});

export default instance;
