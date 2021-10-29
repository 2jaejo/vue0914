// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './assets/css/custom.css';

import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import VueOnsen from 'vue-onsenui'; // This imports 'onsenui', so no need to import it separately
import VueTheMask from 'vue-the-mask'
import axios from 'axios'
Vue.prototype.$axios = axios;
Vue.use(VueTheMask);
Vue.use(VueOnsen);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueOnsen,
  render: h => h(App),
}).$mount('#app')
