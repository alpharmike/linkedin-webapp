import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
import VueCountryRegionSelect from 'vue-country-region-select'

Vue.use(VueTelInput);
Vue.use(VueCountryRegionSelect)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  mounted: async function () {
    await store.dispatch("profileModule/getProfile");
  }
}).$mount('#app')
