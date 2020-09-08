import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import events from 'events-vue-allin'
import jwt from "@allinmkt/jwt"
import api from './utils/api'

Vue.config.productionTip = false
Vue.prototype.$api = api
api.init()
Vue.use(events)

new Vue({
    router,
    store,
    events,
    jwt,
    render: h => h(App)
}).$mount('#app')