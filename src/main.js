import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
import VueCountryRegionSelect from 'vue-country-region-select'
import axios from "./network/axios"

Vue.use(VueTelInput);
Vue.use(VueCountryRegionSelect)

Vue.config.productionTip = false

axios.interceptors.request.use(function (config) {
  config.headers.Authorization =  window.$token();

  return config;
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  mounted: async function () {
    if (store.getters["authModule/isAuthenticated"]) {
      await store.dispatch("profileModule/getProfile");
    }
  },

  beforeCreate() {
    window.$token = () => {
      return localStorage.getItem("LinkedinToken")
    }
  }
}).$mount('#app')
