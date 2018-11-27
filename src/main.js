import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from "./router/"
import BootstrapVue from 'bootstrap-vue'
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'
Vue.component('datetime', Datetime);

Vue.prototype.$http = Axios;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
    router
}).$mount('#app')

Vue.use(BootstrapVue)

