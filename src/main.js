import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import events from 'events-vue-allin'
import jwt from "@allinmkt/jwt"
import api from './utils/api'
import Notifications from "vue-notification";

Vue.config.productionTip = false
Vue.prototype.$api = api
api.init()
Vue.use(events)
Vue.use(Notifications);

new Vue({
    data() {
        return {
            user: null,
            verification: false
        }
    },
    created() {
        if (this.$route.query.newSession) {
            localStorage.removeItem('_user')
            this.user = null
            this.$router.push('/')
        }
        if (localStorage.getItem('_user')) {
            let _user = localStorage.getItem('_user')
            let _verification = localStorage.getItem('_verification')
            this.user = jwt(_user, process.env.VUE_APP_SECRET).verify()
            this.verification = jwt(_verification, process.env.VUE_APP_SECRET).verify()
            if (this.user.id && !this.verification && this.$route.name != 'Validate') {
                let code = this.$route.query.code ? `?code=${this.$route.query.code}` : ''
                this.$router.push(`/validate${code}`)
            }
        }
    },
    router,
    store,
    events,
    jwt,
    render: h => h(App)
}).$mount('#app')