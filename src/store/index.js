import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth-module'
import sectionModule from './modules/section-module'
import typeModule from './modules/type-module'
import profileModule from './modules/profile-module'
import networkModule from './modules/network-module'
import postModule from './modules/post-module'
import chatModule from './modules/chat-module'
import notificationModule from './modules/notification-module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authModule,
    sectionModule,
    typeModule,
    profileModule,
    networkModule,
    postModule,
    chatModule,
    notificationModule
  }
})

