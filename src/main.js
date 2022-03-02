import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vmodal from 'vue-js-modal'
// import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false
Vue.use(vmodal)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
