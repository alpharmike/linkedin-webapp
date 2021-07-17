import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from "vuetify/lib/util/colors";
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.indigo.darken3
      },

      light: {
        secondary: colors.shades.lighten1
      }
    },
    icons: {
      iconfont: 'mdi'
    },
  }
})
