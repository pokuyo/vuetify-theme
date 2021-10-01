import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'

// vuetify dialog
import VuetifyDialog from 'vuetify-dialog'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

// import axios from 'axios'
import axios from './plugins/axios'

Vue.use(VuetifyDialog, { context: vuetify })

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$EventBus = new Vue()

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App),
}).$mount('#app')
