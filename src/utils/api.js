import Vue from "vue";
import axios from "axios";
import sToken from "./token";
import VueAxios from "vue-axios";

const api = {
    async init() {
        Vue.prototype.$api = api;
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = process.env.VUE_APP_API;
    },

    async setData(data) {
        let token = await sToken.encrypt(data);
        this.setHeader("x-access-token", token);
    },

    setHeader(name, token) {
        Vue.axios.defaults.headers.common[name] = token;
    },

    async call(method, resource, data) {
        if (data) {
            await this.setData(data);
        }
        return Vue.axios[method](resource).catch(err => {
            throw new Error(err);
        });
    }
};

export default api;