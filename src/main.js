// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/Vuex/store'
import '@/assets/scss/index.scss'
import Box from '@/components/Box'
import Tit from '@/components/Tit'
Vue.component('Box', Box)
Vue.component('Tit', Tit)
Vue.config.productionTip = false
import RWS from '@/assets/modules/reconnecting-websocket'
import post from '@/assets/modules/fetch'
Vue.fetch = Vue.prototype.$fetch = RWS
Vue.post = Vue.prototype.$post = post

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
