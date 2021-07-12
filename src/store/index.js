import Vue from 'vue'
import Vuex from 'vuex'
import sectionModule from './modules/section-module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sectionModule
  }
})

