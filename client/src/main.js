import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://35.187.249.89'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
