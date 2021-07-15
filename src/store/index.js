import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth-module'
import sectionModule from './modules/section-module'
import typeModule from './modules/type-module'
import profileModule from './modules/profile-module'
import networkModule from './modules/network-module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authModule,
    sectionModule,
    typeModule,
    profileModule,
    networkModule
  }
})

